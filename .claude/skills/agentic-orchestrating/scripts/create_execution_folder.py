#!/usr/bin/env python3
"""
Create timestamped execution folder for workflow orchestration.

Usage:
    python create_execution_folder.py <workflow-name> [--base-dir /path/to/base-dir]

Creates folder structure:
    /{base-dir}/{workflow-name}/{YYYY-MM-DD@HH:MM}/
        ├── data/
        └── artifacts/

Returns the created execution folder path.
"""

import argparse
import os
from datetime import datetime
from pathlib import Path


def create_execution_folder(workflow_name: str, base_dir: str) -> str:
    """
    Create timestamped execution folder with required subdirectories.

    Args:
        workflow_name: Kebab-case workflow name (e.g., "discover-category-landscape")
        base_dir: Base directory (e.g., "research", "content", "strategy")

    Returns:
        Absolute path to created execution folder
    """
    # Generate timestamp in format: YYYY-MM-DD@HH:MM
    timestamp = datetime.now().strftime("%Y-%m-%d@HH:MM")

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
        required=True,
        help="Workflow name in kebab-case (e.g., discover-category-landscape)"
    )
    parser.add_argument(
        "--base-dir",
        required=True,
        help="Base directory (e.g., research, content, strategy)"
    )

    args = parser.parse_args()

    execution_path = create_execution_folder(args.workflow_name, args.base_dir)
    print(execution_path)


if __name__ == "__main__":
    main()
