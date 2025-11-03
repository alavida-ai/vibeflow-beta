#!/usr/bin/env python3
"""
Generate or refine images using OpenAI's image generation API.

This script supports:
- Initial image generation with a prompt
- Reference images to guide the generation
- Follow-up requests to refine previous generations
- Saving generated images to disk

Usage:
    # Generate a new image
    python gen-image.py --prompt "A cat hugging an otter" --output cat_otter.png
    
    # Generate with reference images
    python gen-image.py --prompt "Create this style" --references img1.jpg img2.png --output result.png
    
    # Follow up on a previous generation
    python gen-image.py --previous-response-id resp_abc123 --prompt "Make it realistic" --output result_v2.png
"""

import argparse
import base64
import sys
from pathlib import Path
from typing import List, Optional

from openai import OpenAI


def encode_image(image_path: str) -> str:
    """Encode an image file to base64 string.
    
    Args:
        image_path: Path to the image file
        
    Returns:
        Base64 encoded string of the image
    """
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def build_content_list(prompt: str, reference_images: Optional[List[str]] = None) -> List[dict]:
    """Build the content list for the API request.
    
    Args:
        prompt: The text prompt for image generation
        reference_images: Optional list of paths to reference images
        
    Returns:
        List of content items for the API request
    """
    content = [{"type": "input_text", "text": prompt}]
    
    if reference_images:
        for img_path in reference_images:
            if not Path(img_path).exists():
                print(f"Warning: Reference image not found: {img_path}")
                continue
                
            # Encode and add as base64 image
            base64_image = encode_image(img_path)
            
            # Determine image format from extension
            ext = Path(img_path).suffix.lower()
            mime_type = "image/jpeg"
            if ext in [".png"]:
                mime_type = "image/png"
            elif ext in [".webp"]:
                mime_type = "image/webp"
            elif ext in [".gif"]:
                mime_type = "image/gif"
            
            content.append({
                "type": "input_image",
                "image_url": f"data:{mime_type};base64,{base64_image}",
            })
    
    return content


def generate_image(
    prompt: str,
    output_path: str,
    reference_images: Optional[List[str]] = None,
    previous_response_id: Optional[str] = None,
    model: str = "gpt-4",
) -> str:
    """Generate or refine an image using OpenAI's API.
    
    Args:
        prompt: The text prompt for image generation
        output_path: Where to save the generated image
        reference_images: Optional list of paths to reference images
        previous_response_id: Optional ID of a previous response to refine
        model: The model to use (default: gpt-4)
        
    Returns:
        The response ID for potential follow-up requests
    """
    client = OpenAI()
    
    # Build the request parameters
    request_params = {
        "model": model,
        "tools": [{"type": "image_generation"}],
    }
    
    # Handle follow-up vs initial request
    if previous_response_id:
        # Follow-up request
        request_params["previous_response_id"] = previous_response_id
        request_params["input"] = prompt
        print(f"Refining previous image (ID: {previous_response_id})...")
    else:
        # Initial request
        content = build_content_list(prompt, reference_images)
        request_params["input"] = [{"role": "user", "content": content}]
        print("Generating new image...")
    
    # Make the API call
    response = client.responses.create(**request_params)
    
    # Extract image data
    image_data = [
        output.result
        for output in response.output
        if output.type == "image_generation_call"
    ]
    
    # Save the image
    if image_data:
        image_base64 = image_data[0]
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, "wb") as f:
            f.write(base64.b64decode(image_base64))
        
        print(f"Image saved to: {output_path}")
        print(f"Response ID: {response.id}")
        return response.id
    else:
        # No image generated, print the text response
        print("No image generated. Response:")
        print(response.output.content if hasattr(response.output, 'content') else response.output)
        return response.id


def main():
    """Main entry point for command-line usage."""
    parser = argparse.ArgumentParser(
        description="Generate or refine images using OpenAI's image generation API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate a new image
  python gen-image.py --prompt "A gray tabby cat hugging an otter" --output cat_otter.png
  
  # Generate with reference images
  python gen-image.py --prompt "Create in this style" --references style1.jpg style2.png --output result.png
  
  # Follow up on a previous generation
  python gen-image.py --previous-response-id resp_abc123 --prompt "Make it look realistic" --output result_v2.png
  
  # Combine follow-up with new references
  python gen-image.py --previous-response-id resp_abc123 --prompt "Add these elements" --references new_ref.png --output result_v3.png
        """,
    )
    
    parser.add_argument(
        "--prompt",
        required=True,
        help="Text prompt describing the image to generate or modifications to make"
    )
    
    parser.add_argument(
        "--output",
        "-o",
        required=True,
        help="Output path for the generated image (e.g., output.png)"
    )
    
    parser.add_argument(
        "--references",
        "-r",
        nargs="+",
        help="List of reference image paths to guide the generation"
    )
    
    parser.add_argument(
        "--previous-response-id",
        "-p",
        help="ID of a previous response to refine (for follow-up requests)"
    )
    
    parser.add_argument(
        "--model",
        "-m",
        default="gpt-4",
        help="Model to use for image generation (default: gpt-4)"
    )
    
    args = parser.parse_args()
    
    try:
        response_id = generate_image(
            prompt=args.prompt,
            output_path=args.output,
            reference_images=args.references,
            previous_response_id=args.previous_response_id,
            model=args.model,
        )
        
        print("\nTo refine this image, use:")
        print(f"python gen-image.py --previous-response-id {response_id} --prompt \"<your refinement>\" --output <new_output.png>")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()