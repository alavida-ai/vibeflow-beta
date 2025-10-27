#!/usr/bin/env python3
"""
Create timestamped execution folder for workflow orchestration.

Usage:
    python create_execution_folder.py <workflow-name> [--base-dir /path/to/research]

Creates folder structure:
    /research/{workflow-name}/{YYYY-MM-DD_HH:MM}/
        ├── data/
        └── artifacts/

Returns the created execution folder path.
"""

import argparse
import os
from datetime import datetime
from pathlib import Path


def create_execution_folder(workflow_name: str, base_dir: str = "research") -> str:
    """
    Create timestamped execution folder with required subdirectories.

    Args:
        workflow_name: Kebab-case workflow name (e.g., "discover-category-landscape")
        base_dir: Base research directory (default: "research")

    Returns:
        Absolute path to created execution folder
    """
    # Generate timestamp in format: YYYY-MM-DD_HH:MM
    timestamp = datetime.now().strftime("%Y-%m-%d_%H:%M")

    # Construct paths
    workflow_dir = Path(base_dir) / workflow_name
    execution_dir = workflow_dir / timestamp

    # Create directories
    execution_dir.mkdir(parents=True, exist_ok=True)
    (execution_dir / "data").mkdir(exist_ok=True)
    (execution_dir / "artifacts").mkdir(exist_ok=True)

    return str(execution_dir.resolve())


def main():
    parser = argparse.ArgumentParser(
        description="Create timestamped execution folder for workflow orchestration"
    )
    parser.add_argument(
        "workflow_name",
        help="Workflow name in kebab-case (e.g., discover-category-landscape)"
    )
    parser.add_argument(
        "--base-dir",
        default="research",
        help="Base directory for research folders (default: research)"
    )

    args = parser.parse_args()

    execution_path = create_execution_folder(args.workflow_name, args.base_dir)
    print(execution_path)


if __name__ == "__main__":
    main()
