 # Initialize Marketing Architecture

Create the complete vibeflow marketing architecture folder structure with starter files.

## Task

Create the following directory structure with index.md placeholder files:

### /strategy/ structure:
- `/strategy/index.md` - Brand overview and entry point
- `/strategy/core/index.md` - Foundational brand elements
- `/strategy/voice/index.md` - Universal tone of voice
- `/strategy/voice/extensions/` - Platform-specific tone (empty folder for now)
- `/strategy/messaging/index.md` - Messaging overview
- `/strategy/messaging/pillars.md` - Brand pillars/themes
- `/strategy/messaging/extensions/` - Platform-specific messaging (empty folder)
- `/strategy/audience/index.md` - Target personas

### /research/ structure:
- `/research/index.md` - Research overview
- `/research/category-landscape/index.md` - Market/category research
- `/research/customer-insights/index.md` - Customer research and pain points
- `/research/competitive-analysis/index.md` - Competitor insights

## Requirements

Each index.md file should include:

1. **YAML frontmatter** with:
   ```yaml
   ---
   scope: [path-to-file]
   extends: [parent-path or null]
   last_validated: [today's date]
   validation_status: clean
   ---
   ```

2. **Placeholder content** with:
   - Brief description of what this file contains
   - Section headers for key content areas
   - Instructions for what to add

3. **Clear structure** following the 3-level hierarchy rule (no deeper than /strategy/{domain}/extensions/)

Create all folders and files, then confirm completion with a summary of what was created.

And create a .mcp.json at the root:
`{
  "mcpServers": {
    "firecrawl": {
      "type": "http",
      "url": "https://mcp.firecrawl.dev/YOUR_KEY_HERE/v2/mcp"
    },
    "replicate": {
      "command": "npx",
      "args": ["-y", "replicate-mcp"],
      "env": {
        "REPLICATE_API_TOKEN": "YOUR_REPLICATE_API_TOKEN"
      }
    },
    "twitter-scraper": {
      "type": "http",
      "url": "https://test-server.vibeflow.workers.dev/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_BEARER_TOKEN"
      }
    },
    "dataforseo": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@smithery/cli@latest",
        "run",
        "@moaiandin/mcp-dataforseo",
        "--key",
        "YOUR_DATAFORSEO_KEY",
        "--profile",
        "YOUR_PROFILE_ID"
      ]
    },
    "perplexity": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@perplexity-ai/mcp-server"
      ],
      "env": {
        "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY"
      }
    }
  }
}
`