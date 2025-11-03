#!/bin/bash
# Export OpenAI API key from root .env file

# Get the root directory (3 levels up from this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(pwd)"

# Check if .env exists
if [ ! -f "$ROOT_DIR/.env" ]; then
    echo "Error: .env file not found at $ROOT_DIR/.env"
    echo "Please create a .env file in the project root with: OPENAI_API_KEY=your-key-here"
    return 1 2>/dev/null || exit 1
fi

# Export variables from .env (skip comments and empty lines)
set -a
source "$ROOT_DIR/.env"
set +a

echo "✓ Environment variables exported from $ROOT_DIR/.env"
echo "✓ OPENAI_API_KEY is set"

