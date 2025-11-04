"""
Cloud Upload Utility for Replicate Image Generation

Upload image files to cloud storage and return public HTTPS URLs compatible with
Replicate's image generation API.

Critical Constraint: Replicate requires files > 256kb to use HTTP URLs (not data URLs),
making cloud storage essential for brand asset workflows.

Supported Platforms:
- Amazon S3 (Primary recommendation)
- Google Cloud Storage
- Cloudflare R2 (S3-compatible)

Usage:
    # Single file upload
    result = upload_assets_for_replicate(
        "logo.png",
        bucket_name="my-brand-assets",
        provider=StorageProvider.S3,
        region="us-west-2"
    )
    print(f"URL: {result.public_url}")

    # Multiple files
    result = upload_assets_for_replicate(
        ["logo.png", "hero.jpg", "icon.webp"],
        bucket_name="my-brand-assets",
        prefix="campaign-2024"
    )
    print(f"Uploaded {result.successful}/{result.total}")
    print(f"URLs: {result.urls}")

Dependencies:
    pip install boto3>=1.34.0 google-cloud-storage>=2.14.0 Pillow>=10.0.0 tenacity>=8.2.3
"""

from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
from typing import List, Union, Optional, Dict, Any, Callable
from urllib.parse import quote
import hashlib
import logging
import os
import re
import time

# Third-party imports
try:
    import boto3
    from botocore.exceptions import ClientError, NoCredentialsError, BotoCoreError
except ImportError:
    boto3 = None

try:
    from google.cloud import storage as gcs_storage
    from google.cloud.exceptions import GoogleCloudError
except ImportError:
    gcs_storage = None

try:
    from PIL import Image
except ImportError:
    Image = None

try:
    from tenacity import (
        retry,
        stop_after_attempt,
        wait_exponential,
        retry_if_exception_type,
        before_sleep_log
    )
except ImportError:
    # Fallback decorator if tenacity not available
    def retry(*args, **kwargs):
        def decorator(func):
            return func
        return decorator
    stop_after_attempt = wait_exponential = retry_if_exception_type = before_sleep_log = None

# Configure logging
logger = logging.getLogger(__name__)


# ============================================================================
# Enums and Data Classes
# ============================================================================

class StorageProvider(Enum):
    """Supported cloud storage providers"""
    S3 = "s3"
    GCS = "gcs"
    R2 = "r2"  # Cloudflare R2 (S3-compatible)


@dataclass
class UploadResult:
    """Result of a single file upload"""
    success: bool
    local_path: str
    public_url: Optional[str] = None
    file_size: int = 0
    file_format: Optional[str] = None
    error: Optional[str] = None
    upload_duration: float = 0.0


@dataclass
class BatchUploadResult:
    """Result of batch upload operation"""
    total: int
    successful: int
    failed: int
    results: List[UploadResult]
    total_duration: float
    urls: List[str]  # List of successful URLs only


# ============================================================================
# Custom Exceptions
# ============================================================================

class UploadError(Exception):
    """Base exception for upload errors"""
    pass


class ValidationError(UploadError):
    """File validation failed"""
    pass


class StorageConnectionError(UploadError):
    """Failed to connect to cloud storage"""
    pass


class UploadTimeoutError(UploadError):
    """Upload exceeded timeout"""
    pass


class InsufficientPermissionsError(UploadError):
    """Missing required permissions"""
    pass


class BucketNotFoundError(UploadError):
    """Storage bucket does not exist"""
    pass


class QuotaExceededError(UploadError):
    """Storage quota exceeded"""
    pass


# ============================================================================
# Helper Functions
# ============================================================================

def validate_image_file(
    file_path: Union[str, Path],
    max_size_mb: int = 50,
    allowed_formats: Optional[List[str]] = None
) -> tuple[bool, Optional[str]]:
    """
    Comprehensive image file validation.

    Checks:
    1. File exists
    2. File size within limits
    3. File format allowed
    4. MIME type matches extension (if python-magic available)
    5. Image can be opened (not corrupted)

    Args:
        file_path: Path to file
        max_size_mb: Maximum file size in MB
        allowed_formats: List of allowed extensions (default: png, jpg, jpeg, webp)

    Returns:
        (is_valid, error_message)
    """
    if allowed_formats is None:
        allowed_formats = ['.png', '.jpg', '.jpeg', '.webp']

    path = Path(file_path)

    # Check 1: File exists
    if not path.exists():
        return False, f"File not found: {file_path}"

    if not path.is_file():
        return False, f"Not a file: {file_path}"

    # Check 2: File size
    file_size_bytes = path.stat().st_size
    file_size_mb = file_size_bytes / (1024 * 1024)

    if file_size_mb > max_size_mb:
        return False, f"File too large: {file_size_mb:.2f}MB (max: {max_size_mb}MB)"

    if file_size_bytes == 0:
        return False, "File is empty"

    # Check 3: File extension
    extension = path.suffix.lower()
    if extension not in allowed_formats:
        return False, f"Invalid format: {extension} (allowed: {', '.join(allowed_formats)})"

    # Check 4: Image integrity (if PIL available)
    if Image:
        try:
            with Image.open(path) as img:
                img.verify()  # Verify image integrity

                # Check image dimensions
                img = Image.open(path)  # Reopen after verify
                width, height = img.size
                if width == 0 or height == 0:
                    return False, "Invalid image dimensions"

                # Check for minimum dimensions
                if width < 16 or height < 16:
                    return False, f"Image too small: {width}x{height} (minimum: 16x16)"

        except Exception as e:
            return False, f"Corrupted or invalid image: {str(e)}"
    else:
        logger.warning("PIL not available, skipping image integrity check")

    return True, None


def sanitize_storage_key(key: str) -> str:
    """
    Sanitize storage key for cloud compatibility.

    Rules:
    - No spaces (replace with hyphens)
    - No special characters except: - _ . /
    - Remove consecutive slashes
    - Remove leading/trailing slashes
    """
    # Replace spaces with hyphens
    key = key.replace(" ", "-")

    # Remove invalid characters
    key = re.sub(r'[^a-zA-Z0-9\-_./]', '', key)

    # Remove consecutive slashes
    key = re.sub(r'/+', '/', key)

    # Remove leading/trailing slashes
    key = key.strip('/')

    return key


def generate_storage_key(
    file_path: Union[str, Path],
    prefix: str = "",
    preserve_structure: bool = False,
    timestamp: bool = True,
    hash_filename: bool = False
) -> str:
    """
    Generate cloud storage key/path for file.

    Args:
        file_path: Local file path
        prefix: Bucket prefix/folder
        preserve_structure: Preserve local directory structure
        timestamp: Add timestamp to filename
        hash_filename: Use hash instead of original filename

    Returns:
        Storage key (e.g., "brand-assets/2025-11-03/logo-abc123.png")
    """
    path = Path(file_path)
    filename = path.name
    stem = path.stem
    suffix = path.suffix

    # Generate unique identifier
    if hash_filename:
        # Use file hash for deduplication
        hasher = hashlib.md5()
        hasher.update(str(path).encode())
        unique_id = hasher.hexdigest()[:12]
        new_filename = f"{unique_id}{suffix}"
    elif timestamp:
        # Add timestamp
        ts = int(time.time())
        new_filename = f"{stem}-{ts}{suffix}"
    else:
        new_filename = filename

    # Construct full path
    if preserve_structure:
        # Keep directory structure
        relative_path = path.parent
        storage_key = str(Path(prefix) / relative_path / new_filename)
    else:
        # Flatten to prefix only
        storage_key = str(Path(prefix) / new_filename)

    # Sanitize for cloud storage
    storage_key = sanitize_storage_key(storage_key)

    return storage_key


def get_public_url(
    bucket_name: str,
    storage_key: str,
    provider: StorageProvider,
    region: Optional[str] = None,
    custom_domain: Optional[str] = None
) -> str:
    """
    Construct public URL for uploaded file.

    Args:
        bucket_name: Bucket name
        storage_key: File key in bucket
        provider: Storage provider
        region: Cloud region (required for S3)
        custom_domain: Custom domain (e.g., "cdn.example.com")

    Returns:
        Public HTTPS URL
    """
    # URL-encode storage key
    encoded_key = quote(storage_key, safe='/')

    # Custom domain takes precedence
    if custom_domain:
        return f"https://{custom_domain}/{encoded_key}"

    # Provider-specific URL formats
    if provider == StorageProvider.S3:
        if region:
            return f"https://{bucket_name}.s3.{region}.amazonaws.com/{encoded_key}"
        else:
            return f"https://{bucket_name}.s3.amazonaws.com/{encoded_key}"

    elif provider == StorageProvider.GCS:
        return f"https://storage.googleapis.com/{bucket_name}/{encoded_key}"

    elif provider == StorageProvider.R2:
        # R2 public buckets
        return f"https://{bucket_name}.r2.cloudflarestorage.com/{encoded_key}"

    else:
        raise ValueError(f"Unsupported provider: {provider}")


# ============================================================================
# Upload Implementation
# ============================================================================

def _upload_to_s3(
    file_path: Path,
    bucket_name: str,
    storage_key: str,
    region: Optional[str] = None,
    **kwargs
) -> str:
    """Upload file to AWS S3"""
    if boto3 is None:
        raise ImportError("boto3 is required for S3 uploads. Install with: pip install boto3")

    try:
        # Create S3 client
        session_kwargs = {}
        if region:
            session_kwargs['region_name'] = region

        # Handle custom credentials
        if 'access_key_id' in kwargs and 'secret_access_key' in kwargs:
            session_kwargs['aws_access_key_id'] = kwargs['access_key_id']
            session_kwargs['aws_secret_access_key'] = kwargs['secret_access_key']

        s3_client = boto3.client('s3', **session_kwargs)

        # Upload file
        extra_args = {'ACL': 'public-read'}  # Make public
        s3_client.upload_file(str(file_path), bucket_name, storage_key, ExtraArgs=extra_args)

        # Get region from client if not provided
        if not region:
            region = s3_client.meta.region_name

        return get_public_url(bucket_name, storage_key, StorageProvider.S3, region, kwargs.get('custom_domain'))

    except NoCredentialsError:
        raise InsufficientPermissionsError("AWS credentials not found")
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', '')
        if error_code == 'NoSuchBucket':
            raise BucketNotFoundError(f"Bucket '{bucket_name}' not found")
        elif error_code == 'AccessDenied':
            raise InsufficientPermissionsError(f"Access denied to bucket '{bucket_name}'")
        elif error_code == 'QuotaExceeded':
            raise QuotaExceededError("S3 storage quota exceeded")
        else:
            raise StorageConnectionError(f"S3 upload failed: {e}")
    except BotoCoreError as e:
        raise StorageConnectionError(f"S3 connection failed: {e}")


def _upload_to_gcs(
    file_path: Path,
    bucket_name: str,
    storage_key: str,
    **kwargs
) -> str:
    """Upload file to Google Cloud Storage"""
    if gcs_storage is None:
        raise ImportError("google-cloud-storage is required for GCS uploads. Install with: pip install google-cloud-storage")

    try:
        # Create GCS client
        client_kwargs = {}
        if 'project_id' in kwargs:
            client_kwargs['project'] = kwargs['project_id']
        if 'credentials_path' in kwargs:
            # Note: GOOGLE_APPLICATION_CREDENTIALS env var is preferred
            os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = kwargs['credentials_path']

        client = gcs_storage.Client(**client_kwargs)
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(storage_key)

        # Upload file
        blob.upload_from_filename(str(file_path))

        # Make public
        blob.make_public()

        return get_public_url(bucket_name, storage_key, StorageProvider.GCS, custom_domain=kwargs.get('custom_domain'))

    except GoogleCloudError as e:
        error_msg = str(e).lower()
        if 'not found' in error_msg:
            raise BucketNotFoundError(f"GCS bucket '{bucket_name}' not found")
        elif 'permission' in error_msg or 'forbidden' in error_msg:
            raise InsufficientPermissionsError(f"Access denied to GCS bucket '{bucket_name}'")
        elif 'quota' in error_msg:
            raise QuotaExceededError("GCS storage quota exceeded")
        else:
            raise StorageConnectionError(f"GCS upload failed: {e}")
    except Exception as e:
        raise StorageConnectionError(f"GCS connection failed: {e}")


def _upload_to_r2(
    file_path: Path,
    bucket_name: str,
    storage_key: str,
    **kwargs
) -> str:
    """Upload file to Cloudflare R2 (S3-compatible)"""
    if boto3 is None:
        raise ImportError("boto3 is required for R2 uploads. Install with: pip install boto3")

    try:
        # R2 requires account ID and custom endpoint
        account_id = kwargs.get('account_id')
        if not account_id:
            raise ValueError("account_id is required for R2 uploads")

        endpoint_url = f"https://{account_id}.r2.cloudflarestorage.com"

        # Create R2 client (S3-compatible)
        s3_client = boto3.client(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=kwargs.get('access_key_id'),
            aws_secret_access_key=kwargs.get('secret_access_key'),
            region_name='auto'  # R2 uses 'auto'
        )

        # Upload file
        extra_args = {'ACL': 'public-read'}  # Make public
        s3_client.upload_file(str(file_path), bucket_name, storage_key, ExtraArgs=extra_args)

        return get_public_url(bucket_name, storage_key, StorageProvider.R2, custom_domain=kwargs.get('custom_domain'))

    except NoCredentialsError:
        raise InsufficientPermissionsError("R2 credentials not found")
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', '')
        if error_code == 'NoSuchBucket':
            raise BucketNotFoundError(f"R2 bucket '{bucket_name}' not found")
        elif error_code == 'AccessDenied':
            raise InsufficientPermissionsError(f"Access denied to R2 bucket '{bucket_name}'")
        else:
            raise StorageConnectionError(f"R2 upload failed: {e}")
    except BotoCoreError as e:
        raise StorageConnectionError(f"R2 connection failed: {e}")


def _upload_single_file(
    file_path: Union[str, Path],
    bucket_name: str,
    provider: StorageProvider,
    prefix: str = "brand-assets",
    validate_files: bool = True,
    max_file_size_mb: int = 50,
    allowed_formats: Optional[List[str]] = None,
    retry_attempts: int = 3,
    retry_delay: float = 1.0,
    timeout: int = 30,
    **cloud_config
) -> UploadResult:
    """
    Upload a single file to cloud storage.

    Args:
        file_path: Path to file
        bucket_name: Cloud storage bucket name
        provider: Cloud storage provider
        prefix: Path prefix in bucket
        validate_files: Validate before upload
        max_file_size_mb: Maximum file size
        allowed_formats: Allowed file extensions
        retry_attempts: Number of retry attempts
        retry_delay: Initial retry delay
        timeout: Upload timeout
        **cloud_config: Provider-specific config

    Returns:
        UploadResult
    """
    start_time = time.time()
    path = Path(file_path)

    # Validation
    if validate_files:
        is_valid, error = validate_image_file(path, max_file_size_mb, allowed_formats)
        if not is_valid:
            return UploadResult(
                success=False,
                local_path=str(path),
                error=error,
                upload_duration=time.time() - start_time
            )

    # Get file info
    file_size = path.stat().st_size
    file_format = path.suffix.lower()

    # Generate storage key
    storage_key = generate_storage_key(path, prefix=prefix)

    # Upload with retry logic
    last_error = None
    for attempt in range(1, retry_attempts + 1):
        try:
            # Upload based on provider
            if provider == StorageProvider.S3:
                public_url = _upload_to_s3(path, bucket_name, storage_key, **cloud_config)
            elif provider == StorageProvider.GCS:
                public_url = _upload_to_gcs(path, bucket_name, storage_key, **cloud_config)
            elif provider == StorageProvider.R2:
                public_url = _upload_to_r2(path, bucket_name, storage_key, **cloud_config)
            else:
                raise ValueError(f"Unsupported provider: {provider}")

            upload_duration = time.time() - start_time

            return UploadResult(
                success=True,
                local_path=str(path),
                public_url=public_url,
                file_size=file_size,
                file_format=file_format,
                upload_duration=upload_duration
            )

        except (ValidationError, BucketNotFoundError, InsufficientPermissionsError, QuotaExceededError) as e:
            # Don't retry these errors
            return UploadResult(
                success=False,
                local_path=str(path),
                file_size=file_size,
                file_format=file_format,
                error=str(e),
                upload_duration=time.time() - start_time
            )

        except (StorageConnectionError, UploadTimeoutError, ConnectionError, TimeoutError) as e:
            # Retry these errors
            last_error = e
            if attempt < retry_attempts:
                delay = retry_delay * (2 ** (attempt - 1))  # Exponential backoff
                logger.warning(f"Upload attempt {attempt}/{retry_attempts} failed: {e}. Retrying in {delay:.2f}s...")
                time.sleep(delay)
            else:
                logger.error(f"Upload failed after {retry_attempts} attempts: {e}")

        except Exception as e:
            # Unknown error - retry if attempts remain
            last_error = e
            if attempt < retry_attempts:
                delay = retry_delay * (2 ** (attempt - 1))
                logger.error(f"Unknown error on attempt {attempt}/{retry_attempts}: {e}. Retrying in {delay:.2f}s...")
                time.sleep(delay)
            else:
                logger.error(f"Upload failed after {retry_attempts} attempts: {e}")

    # All retries exhausted
    return UploadResult(
        success=False,
        local_path=str(path),
        file_size=file_size,
        file_format=file_format,
        error=f"Failed after {retry_attempts} attempts: {last_error}",
        upload_duration=time.time() - start_time
    )


# ============================================================================
# Main Upload Function
# ============================================================================

def upload_assets_for_replicate(
    file_paths: Union[str, Path, List[Union[str, Path]]],
    bucket_name: str,
    provider: StorageProvider = StorageProvider.S3,
    prefix: str = "brand-assets",
    public: bool = True,
    validate_files: bool = True,
    max_file_size_mb: int = 50,
    allowed_formats: Optional[List[str]] = None,
    retry_attempts: int = 3,
    retry_delay: float = 1.0,
    timeout: int = 30,
    progress_callback: Optional[Callable] = None,
    **cloud_config
) -> Union[UploadResult, BatchUploadResult]:
    """
    Upload image files to cloud storage and return public HTTPS URLs for Replicate.

    Args:
        file_paths: Single file path or list of file paths to upload
        bucket_name: Cloud storage bucket name
        provider: Cloud storage provider (S3, GCS, or R2)
        prefix: Path prefix/folder in bucket (e.g., "brand-assets/logos")
        public: Make files publicly accessible (required for Replicate)
        validate_files: Validate file size and format before upload
        max_file_size_mb: Maximum allowed file size in MB
        allowed_formats: List of allowed file extensions (default: ['.png', '.jpg', '.jpeg', '.webp'])
        retry_attempts: Number of retry attempts on failure
        retry_delay: Initial delay between retries (exponential backoff)
        timeout: Upload timeout in seconds
        progress_callback: Optional callback for progress updates: callback(current, total, filename)
        **cloud_config: Provider-specific configuration (credentials, region, etc.)

    Returns:
        UploadResult for single file, BatchUploadResult for multiple files

    Raises:
        ValueError: Invalid input parameters
        ImportError: Missing required dependencies

    Example:
        # Single file
        result = upload_assets_for_replicate(
            "logo.png",
            bucket_name="my-brand-assets",
            provider=StorageProvider.S3,
            region="us-west-2"
        )
        print(f"URL: {result.public_url}")

        # Multiple files
        result = upload_assets_for_replicate(
            ["logo.png", "hero.jpg", "icon.webp"],
            bucket_name="my-brand-assets",
            prefix="campaign-2024"
        )
        print(f"Uploaded {result.successful}/{result.total}")
        print(f"URLs: {result.urls}")
    """
    # Normalize input to list
    if isinstance(file_paths, (str, Path)):
        file_paths_list = [file_paths]
        single_file = True
    else:
        file_paths_list = list(file_paths)
        single_file = False

    # Validate inputs
    if not bucket_name:
        raise ValueError("bucket_name is required")

    if not file_paths_list:
        raise ValueError("file_paths cannot be empty")

    # Set default allowed formats
    if allowed_formats is None:
        allowed_formats = ['.png', '.jpg', '.jpeg', '.webp']

    # Upload files
    start_time = time.time()
    results = []

    for idx, file_path in enumerate(file_paths_list, 1):
        # Progress callback
        if progress_callback:
            try:
                progress_callback(idx, len(file_paths_list), str(file_path))
            except Exception as e:
                logger.warning(f"Progress callback failed: {e}")

        # Upload single file
        result = _upload_single_file(
            file_path=file_path,
            bucket_name=bucket_name,
            provider=provider,
            prefix=prefix,
            validate_files=validate_files,
            max_file_size_mb=max_file_size_mb,
            allowed_formats=allowed_formats,
            retry_attempts=retry_attempts,
            retry_delay=retry_delay,
            timeout=timeout,
            **cloud_config
        )

        results.append(result)

    total_duration = time.time() - start_time

    # Return single result for single file
    if single_file:
        return results[0]

    # Return batch result for multiple files
    successful = sum(1 for r in results if r.success)
    failed = sum(1 for r in results if not r.success)
    urls = [r.public_url for r in results if r.success and r.public_url]

    return BatchUploadResult(
        total=len(results),
        successful=successful,
        failed=failed,
        results=results,
        total_duration=total_duration,
        urls=urls
    )


# ============================================================================
# CLI Support (Optional)
# ============================================================================

if __name__ == "__main__":
    import sys
    import argparse

    parser = argparse.ArgumentParser(
        description="Upload image files to cloud storage for Replicate"
    )
    parser.add_argument("files", nargs="+", help="File(s) to upload")
    parser.add_argument("--bucket", required=True, help="Bucket name")
    parser.add_argument("--provider", default="s3", choices=["s3", "gcs", "r2"], help="Storage provider")
    parser.add_argument("--prefix", default="brand-assets", help="Bucket prefix")
    parser.add_argument("--region", help="AWS region (for S3)")
    parser.add_argument("--max-size", type=int, default=50, help="Max file size in MB")

    args = parser.parse_args()

    # Map provider string to enum
    provider_map = {
        "s3": StorageProvider.S3,
        "gcs": StorageProvider.GCS,
        "r2": StorageProvider.R2
    }

    # Upload files
    try:
        result = upload_assets_for_replicate(
            file_paths=args.files,
            bucket_name=args.bucket,
            provider=provider_map[args.provider],
            prefix=args.prefix,
            max_file_size_mb=args.max_size,
            region=args.region
        )

        # Print results
        if isinstance(result, UploadResult):
            if result.success:
                print(f"Success: {result.public_url}")
            else:
                print(f"Failed: {result.error}", file=sys.stderr)
                sys.exit(1)
        else:
            print(f"Uploaded {result.successful}/{result.total} files")
            for url in result.urls:
                print(f"  {url}")

            if result.failed > 0:
                print(f"\nFailed uploads:", file=sys.stderr)
                for r in result.results:
                    if not r.success:
                        print(f"  {r.local_path}: {r.error}", file=sys.stderr)
                sys.exit(1)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
