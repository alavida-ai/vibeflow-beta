#!/usr/bin/env python3
"""
Create timestamped execution folder for workflow orchestration following AMA methodology.

Usage:
    # Research domain (standard timestamp)
    python create_execution_folder.py --base-dir brand/research --domain category-landscape

    # Research adhoc (timestamp with slug - REQUIRED)
    python create_execution_folder.py --base-dir brand/research --domain adhoc --slug competitor-analysis

    # Strategy domain (standard timestamp)
    python create_execution_folder.py --base-dir brand/strategy --domain positioning

    # Content type (timestamp with slug - REQUIRED)
    python create_execution_folder.py --base-dir brand/content --domain twitter --slug claude-code-agentic-marketing

Architecture:
    Research: /brand/research/{domain}/{YYYY-MM-DD@HH:mm}/
              /brand/research/adhoc/{YYYY-MM-DD@HH:mm-slug}/

    Strategy: /brand/strategy/{domain}/{YYYY-MM-DD@HH:mm}/

    Content:  /brand/content/{type}/{YYYY-MM-DD@HH:mm-slug}/

Returns the created execution folder path.
"""

import argparse
import sys
from datetime import datetime
from pathlib import Path


def create_execution_folder(base_dir: str, domain: str, slug: str = None) -> str:
    """
    Create timestamped execution folder following AMA methodology.

    Args:
        base_dir: Base directory path (e.g., "brand/research", "brand/strategy", "brand/content")
        domain: Domain or type name (e.g., "category-landscape", "positioning", "twitter")
        slug: Optional descriptive slug (REQUIRED for content and research/adhoc)

    Returns:
        Absolute path to created execution folder

    Raises:
        ValueError: If slug is missing when required (content or research/adhoc)
    """
    # Normalize base_dir to ensure it starts with brand/
    base_path = Path(base_dir)

    # Validate that path starts with 'brand/' (core AMA principle)
    path_parts = base_path.parts
    if not path_parts or path_parts[0] != "brand":
        raise ValueError(
            f"base-dir must start with 'brand/' (got: {base_dir}).\n"
            "All execution work MUST be within /brand/ directory.\n"
            "Valid examples: brand/research, brand/strategy, brand/content"
        )

    # Determine which base directory type we're in
    if "content" in str(base_path):
        base_type = "content"
    elif "strategy" in str(base_path):
        base_type = "strategy"
    elif "research" in str(base_path):
        base_type = "research"
    else:
        raise ValueError(f"base-dir must be one of: brand/research, brand/strategy, brand/content")

    # Generate timestamp in format: YYYY-MM-DD@HH:mm
    timestamp = datetime.now().strftime("%Y-%m-%d@%H:%M")

    # Apply slug rules based on base type and domain
    if base_type == "content":
        # Content ALWAYS requires slug
        if not slug:
            raise ValueError(
                "Content executions require --slug parameter.\n"
                f"Example: python {Path(__file__).name} --base-dir brand/content --domain twitter --slug my-tweet-topic"
            )
        timestamp_folder = f"{timestamp}-{slug}"
    elif base_type == "research" and domain == "adhoc":
        # Research/adhoc ALWAYS requires slug
        if not slug:
            raise ValueError(
                "Research adhoc executions require --slug parameter.\n"
                f"Example: python {Path(__file__).name} --base-dir brand/research --domain adhoc --slug competitor-analysis"
            )
        timestamp_folder = f"{timestamp}-{slug}"
    else:
        # Research domains and Strategy domains use standard timestamp (no slug)
        if slug:
            print(
                f"Warning: --slug parameter ignored for {base_type}/{domain} (only used for content and research/adhoc)",
                file=sys.stderr
            )
        timestamp_folder = timestamp

    # Construct paths
    domain_dir = base_path / domain
    execution_dir = domain_dir / timestamp_folder

    # Create directories
    execution_dir.mkdir(parents=True, exist_ok=True)
    (execution_dir / "data").mkdir(exist_ok=True)
    (execution_dir / "artifacts").mkdir(exist_ok=True)

    return str(execution_dir.resolve())


def main():
    parser = argparse.ArgumentParser(
        description="Create timestamped execution folder following AMA methodology",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Research domain
  python %(prog)s --base-dir brand/research --domain category-landscape

  # Research adhoc (requires slug)
  python %(prog)s --base-dir brand/research --domain adhoc --slug competitor-analysis

  # Strategy domain
  python %(prog)s --base-dir brand/strategy --domain positioning

  # Content type (requires slug)
  python %(prog)s --base-dir brand/content --domain twitter --slug claude-code-marketing
        """
    )
    parser.add_argument(
        "--base-dir",
        required=True,
        help="Base directory: brand/research, brand/strategy, or brand/content"
    )
    parser.add_argument(
        "--domain",
        required=True,
        help="Domain or type name (e.g., category-landscape, positioning, twitter, adhoc)"
    )
    parser.add_argument(
        "--slug",
        help="Descriptive slug (REQUIRED for content and research/adhoc, ignored for others)"
    )

    args = parser.parse_args()

    try:
        execution_path = create_execution_folder(args.base_dir, args.domain, args.slug)
        print(execution_path)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
