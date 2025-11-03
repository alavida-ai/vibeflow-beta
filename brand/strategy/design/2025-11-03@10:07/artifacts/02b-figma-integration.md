# Figma Integration Guide: Token Export Options

## Overview

This guide covers three approaches for exporting Figma variables (design tokens) to your codebase. Each approach offers different trade-offs between automation, ease of use, and developer ownership.

**Quick Recommendation:**
- **Starting out?** Use **Plugins** (VarVar or Design Tokens Manager) for immediate results with zero setup
- **Need automation?** Migrate to **Figma MCP Server** for command-line token exports
- **Advanced automation?** Use **REST API** for CI/CD pipelines and custom workflows

---

## Approach Comparison

| Approach | Setup Time | Automation Level | Best For | Ownership |
|----------|-----------|------------------|----------|-----------|
| **Figma MCP Server** | Medium (15-30 min) | High - CLI automation | AI-assisted workflows, dev-owned tokens | Full ownership |
| **Plugins** | Low (5 min) | Manual export | Designer-driven workflows, quick start | Shared responsibility |
| **REST API** | High (1-2 hours) | Full automation | CI/CD pipelines, advanced automation | Full ownership |

---

## 1. Figma MCP Server (Recommended for Automation)

The Model Context Protocol (MCP) server from Figma enables AI-assisted design-to-code workflows with access to Figma data directly in your IDE or AI tools.

### Key Benefits

- **AI-Native Integration**: Works with Claude Code, VS Code, Cursor, Windsurf
- **Design Context in Code**: Access frames, components, variables, and FigJam resources
- **Dev Mode Features**: Extract design context, generate code from frames
- **Code Connect Support**: Keep generated code consistent with your component library

### Limitations

**Important**: The Figma MCP Server is **NOT** designed for token export automation. According to Figma's official documentation, the MCP server provides:

- Generate code from selected frames
- Extract design context (variables, components, layout data)
- Retrieve FigJam and Make resources
- Code Connect integration

**However**, it does **NOT** provide:
- Direct token/variable export endpoints
- File download capabilities
- Batch variable extraction
- Token transformation tools

### Setup: Desktop MCP Server (Local)

**Requirements:**
- Figma Desktop App (latest version)
- Dev Mode seat (Professional, Organization, or Enterprise plans)
- MCP-compatible IDE (VS Code, Cursor, Windsurf, Claude Code)

**Step 1: Enable Desktop MCP Server in Figma**

1. Open Figma Desktop App
2. Create or open a Design file
3. Toggle to Dev Mode (`Shift + D`)
4. In the inspect panel, click **Enable desktop MCP server**
5. Server runs at `http://127.0.0.1:3845/mcp`

**Step 2: Configure in Your IDE**

For **Claude Code**, add to `.mcp.json`:

```json
{
  "mcpServers": {
    "figma-desktop": {
      "command": "figma",
      "args": ["mcp"],
      "transport": "stdio"
    }
  }
}
```

For **VS Code** or **Cursor**, follow their respective MCP configuration docs.

**Step 3: Usage with AI Assistants**

Once configured, you can prompt AI assistants to:

```
"Generate code from my current Figma selection"
"Extract component props from this frame"
"Show me all variables used in this design"
```

### Setup: Remote MCP Server (Cloud)

**Requirements:**
- Figma account (any plan)
- MCP-compatible IDE

**Configuration for Claude Code** (`.mcp.json`):

```json
{
  "mcpServers": {
    "figma-remote": {
      "url": "https://mcp.figma.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_FIGMA_ACCESS_TOKEN"
      }
    }
  }
}
```

**Getting Your Access Token:**

1. Go to Figma → Settings → Personal Access Tokens
2. Generate new token with `file_content:read` scope
3. Store securely in environment variable
4. Token expires in 90 days (non-expiring tokens no longer available)

### When to Use MCP Server

**Use MCP Server for:**
- AI-assisted code generation from designs
- Design system component consistency (with Code Connect)
- Exploring design context during development
- Prototyping with AI tools

**Don't use MCP Server for:**
- Automated token export workflows
- CI/CD token synchronization
- Batch variable extraction
- Token transformation pipelines

**For token export automation**, use the REST API (approach #3) instead.

---

## 2. Figma Plugins (Quick Start)

Plugins offer the fastest path to exporting Figma variables with zero configuration. Perfect for designers and teams starting their token workflow.

### Option A: VarVar (Most Versatile)

**GitHub**: [github.com/atropical/varvar](https://github.com/atropical/varvar)
**Install**: [Figma Community - VarVar](https://www.figma.com/community/plugin/1341506281991381482/varvar)

**Export Formats:**
- JSON (with `$.VARIABLE.PATH` for linked variables)
- JavaScript (direct variable references)
- CSV (with `=VARIABLE/PATH` for spreadsheet formulas)
- CSS (CSS custom properties)
- Tailwind CSS (Tailwind naming conventions)

**Usage:**

1. Open Figma file with variables
2. Run VarVar plugin from Plugins menu
3. Choose export format (or use menu shortcuts)
4. Click "Export Variables"
5. Preview output (optional)
6. Click "Download File"

**Linked Variable Handling:**

```json
// JSON format
{
  "primary": {
    "500": "#3B82F6"
  },
  "button": {
    "background": "$.primary.500"
  }
}
```

```css
/* CSS format */
--primary-500: #3B82F6;
--button-background: var(--primary-500);
```

**Pros:**
- Multiple format support
- Open source
- No network access required
- Works in Design Mode and Dev Mode
- Preview before export

**Cons:**
- Manual export step
- Requires designer intervention
- No automation

### Option B: Design Tokens Manager (W3C Standards)

**Install**: [Figma Community - Design Tokens Manager](https://www.figma.com/community/plugin/1263743870981744253/design-tokens-manager)

**Features:**
- Export to W3C Design Tokens Format Module standard
- Each mode exports as separate JSON file
- Manifest.json describes file relationships
- Import tokens back to Figma
- Import from Google Sheets

**Export Capabilities:**

**Variables:**
- Color, Number, String, Boolean

**Styles:**
- Text styles (font family, size, weight, line height)
- Effect styles (shadows, blur - with variable support)
- Color styles (solid, gradients)
- Grid styles

**Usage:**

1. Open Figma file
2. Run Design Tokens Manager
3. Click "Export Variables to JSON"
4. Download ZIP file with:
   - `collection-name.mode-name.tokens.json` (per mode)
   - `manifest.json` (relationships)

**Example Export Structure:**

```
tokens/
├── manifest.json
├── primitives.light.tokens.json
├── primitives.dark.tokens.json
├── semantic.default.tokens.json
├── text-styles.tokens.json
└── effect-styles.tokens.json
```

**W3C Format Example:**

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#3B82F6"
    }
  },
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": "8px"
    }
  }
}
```

**Pros:**
- Standards-compliant (W3C DTCG format)
- Import/export round-trip
- Google Sheets integration
- Style export support
- Active development

**Cons:**
- Manual export
- Font weight issues with multi-word weights (e.g., "Semi Bold")
- Not open source

### Option C: Figma Token Exporter (Direct to Code)

**Install**: [Figma Community - Token Exporter](https://www.figma.com/community/plugin/1345069854741911632/figma-token-exporter)

**Features:**
- Export directly to CSS, SASS, SCSS, LESS
- No intermediate JSON step
- Developer handoff focus

**Best for:**
- Quick CSS variable generation
- Simple token structures
- Direct developer handoff

### Plugin Workflow Recommendation

**Step 1: Initial Setup (Designer)**

1. Install VarVar or Design Tokens Manager
2. Set up Figma variables in collections
3. Organize with semantic naming (e.g., `color/primary/500`)

**Step 2: Export Process**

```bash
# Designer exports tokens
# 1. Open Figma file
# 2. Run plugin → Export
# 3. Download JSON

# Developer receives JSON
mkdir -p tokens/figma
# Copy exported files to tokens/figma/
```

**Step 3: Integration**

```bash
# Process tokens with Style Dictionary
npm run tokens:build

# Generates:
# - tokens/css/variables.css
# - tokens/js/tokens.js
# - tokens/ios/tokens.swift
```

**Step 4: Sync Strategy**

- Export weekly/monthly (low-frequency changes)
- Store exported JSON in git
- Use CHANGELOG to track token updates
- Automate build step, not export step

---

## 3. Figma REST API (Full Automation)

The REST API provides complete programmatic access to Figma data, enabling CI/CD integration and custom automation workflows.

### API Endpoint: GET Local Variables

```
GET https://api.figma.com/v1/files/{file_key}/variables/local
```

**Authentication:**

```bash
curl -H "X-Figma-Token: YOUR_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY/variables/local"
```

### Getting Started

**Step 1: Generate Access Token**

1. Figma → Settings → Personal Access Tokens
2. Create token with scopes:
   - `file_content:read` (for variables)
   - `file_metadata:read` (for file info)
3. Token expires in 90 days (as of April 2024)
4. Store in environment variable: `FIGMA_ACCESS_TOKEN`

**Step 2: Get File Key**

From Figma file URL:
```
https://www.figma.com/design/ABC123DEF456/My-Design-System
                              ^^^^^^^^^^^^
                              This is your file_key
```

**Step 3: Test API Access**

```bash
export FIGMA_ACCESS_TOKEN="figd_your_token_here"
export FIGMA_FILE_KEY="ABC123DEF456"

curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/variables/local"
```

### Example Response Structure

```json
{
  "status": 200,
  "error": false,
  "meta": {
    "variableCollections": {
      "VariableCollectionId:123": {
        "id": "VariableCollectionId:123",
        "name": "Primitives",
        "key": "abc123",
        "modes": [
          {
            "modeId": "123:0",
            "name": "Light"
          },
          {
            "modeId": "123:1",
            "name": "Dark"
          }
        ],
        "defaultModeId": "123:0",
        "variableIds": ["VariableID:1:1", "VariableID:1:2"]
      }
    },
    "variables": {
      "VariableID:1:1": {
        "id": "VariableID:1:1",
        "name": "color/primary/500",
        "key": "def456",
        "variableCollectionId": "VariableCollectionId:123",
        "resolvedType": "COLOR",
        "valuesByMode": {
          "123:0": {
            "r": 0.231,
            "g": 0.510,
            "b": 0.965,
            "a": 1
          },
          "123:1": {
            "r": 0.529,
            "g": 0.694,
            "b": 1,
            "a": 1
          }
        },
        "scopes": ["ALL_FILLS"],
        "codeSyntax": {
          "WEB": "primary-500",
          "ANDROID": "colorPrimary500"
        }
      }
    }
  }
}
```

### Node.js Automation Script

**Install Dependencies:**

```bash
npm install --save-dev node-fetch dotenv
```

**Create `.env` file:**

```bash
FIGMA_ACCESS_TOKEN=figd_your_token_here
FIGMA_FILE_KEY=ABC123DEF456
```

**Script: `scripts/fetch-tokens.js`**

```javascript
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const OUTPUT_DIR = path.join(__dirname, '../tokens/figma');

// Fetch variables from Figma API
async function fetchFigmaVariables() {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`;

  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN
    }
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Convert RGBA to hex
function rgbaToHex({ r, g, b, a }) {
  const toHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}

// Transform Figma response to token format
function transformToTokens(figmaData) {
  const { variableCollections, variables } = figmaData.meta;
  const tokens = {};

  // Group by collection and mode
  Object.values(variableCollections).forEach(collection => {
    collection.modes.forEach(mode => {
      const collectionTokens = {};

      // Get variables for this collection
      collection.variableIds.forEach(varId => {
        const variable = variables[varId];
        if (!variable) return;

        const value = variable.valuesByMode[mode.modeId];

        // Create nested structure from variable name
        const nameParts = variable.name.split('/');
        let current = collectionTokens;

        nameParts.forEach((part, index) => {
          if (index === nameParts.length - 1) {
            // Last part - assign value
            current[part] = {
              $type: variable.resolvedType.toLowerCase(),
              $value: variable.resolvedType === 'COLOR' ? rgbaToHex(value) : value,
              $description: variable.description || undefined,
              codeSyntax: variable.codeSyntax || undefined
            };
          } else {
            // Create nested object
            current[part] = current[part] || {};
            current = current[part];
          }
        });
      });

      // Store by collection and mode
      const collectionName = collection.name.toLowerCase().replace(/\s+/g, '-');
      const modeName = mode.name.toLowerCase().replace(/\s+/g, '-');
      tokens[`${collectionName}.${modeName}`] = collectionTokens;
    });
  });

  return tokens;
}

// Main execution
async function main() {
  console.log('Fetching Figma variables...');

  const figmaData = await fetchFigmaVariables();
  const tokens = transformToTokens(figmaData);

  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Write each collection.mode to separate file
  for (const [key, tokenData] of Object.entries(tokens)) {
    const filename = `${key}.tokens.json`;
    const filepath = path.join(OUTPUT_DIR, filename);

    await fs.writeFile(
      filepath,
      JSON.stringify(tokenData, null, 2),
      'utf-8'
    );

    console.log(`✓ Wrote ${filename}`);
  }

  console.log(`\n✓ Successfully fetched tokens from Figma`);
  console.log(`  Output: ${OUTPUT_DIR}`);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
```

**Add to `package.json`:**

```json
{
  "scripts": {
    "tokens:fetch": "node scripts/fetch-tokens.js",
    "tokens:build": "style-dictionary build",
    "tokens:sync": "npm run tokens:fetch && npm run tokens:build"
  }
}
```

**Usage:**

```bash
# Fetch tokens from Figma
npm run tokens:fetch

# Build tokens for platforms
npm run tokens:build

# Fetch and build in one command
npm run tokens:sync
```

### CI/CD Integration

**GitHub Actions Example (`.github/workflows/sync-tokens.yml`):**

```yaml
name: Sync Design Tokens

on:
  schedule:
    # Run daily at 9 AM UTC
    - cron: '0 9 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  sync-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Fetch tokens from Figma
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
        run: npm run tokens:fetch

      - name: Build tokens
        run: npm run tokens:build

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'chore: update design tokens from Figma'
          title: 'Design Tokens Update'
          body: 'Automated token sync from Figma API'
          branch: 'tokens/auto-update'
```

**Store Secrets:**

1. Go to GitHub repo → Settings → Secrets
2. Add `FIGMA_ACCESS_TOKEN`
3. Add `FIGMA_FILE_KEY`

### Rate Limits

**Tier 1 Limits (Dev/Full seats on paid plans):**
- Per-minute rate limits
- Same as Figma REST API standard limits

**Starter Plan / View/Collab Seats:**
- Limited to 6 tool calls per month

**Best Practices:**
- Cache responses when possible
- Use webhooks for change detection
- Batch requests where applicable
- Implement exponential backoff

### When to Use REST API

**Use REST API for:**
- CI/CD token synchronization
- Scheduled automated updates
- Custom token transformation
- Integration with build systems
- Programmatic token management

**Don't use REST API for:**
- One-off manual exports (use plugins)
- Designer-driven workflows
- AI-assisted code generation (use MCP)

---

## Recommended Workflow Evolution

### Phase 1: Getting Started (Weeks 1-4)

**Goal**: Establish token workflow with minimal friction

**Approach**: Plugins (VarVar or Design Tokens Manager)

**Process**:
1. Designer exports tokens via plugin
2. Save JSON to `tokens/figma/` directory
3. Commit to git
4. Run `npm run tokens:build` locally
5. Manual sync frequency: Weekly

**Pros**: Fast setup, designer-friendly, low commitment
**Cons**: Manual process, requires coordination

### Phase 2: Automation Foundation (Months 2-3)

**Goal**: Reduce manual steps, increase consistency

**Approach**: REST API + npm scripts

**Process**:
1. Set up `.env` with Figma credentials
2. Create `fetch-tokens.js` script
3. Add `npm run tokens:fetch` command
4. Developers run script when needed
5. Manual sync frequency: On-demand

**Pros**: Developer-owned, reproducible, scriptable
**Cons**: Still requires manual trigger

### Phase 3: Full Automation (Month 4+)

**Goal**: Zero-friction token synchronization

**Approach**: REST API + CI/CD

**Process**:
1. Set up GitHub Actions workflow
2. Schedule daily token sync
3. Automatic PR creation on changes
4. Team reviews and merges
5. Tokens deploy with application

**Pros**: Fully automated, always up-to-date, audit trail
**Cons**: Requires CI/CD setup, token expiration management

---

## Migration Path: Plugin → REST API

**Step 1: Parallel Running (Week 1-2)**

```bash
# Designer continues using plugin
# Developer tests API script

npm run tokens:fetch  # Fetch via API
# Compare output with plugin export
diff tokens/figma/plugin-export.json tokens/figma/api-export.json
```

**Step 2: Validation (Week 3-4)**

```bash
# Run both methods for 2 weeks
# Verify identical output
# Confirm variable references work
# Test all modes export correctly
```

**Step 3: Switch Over (Week 5)**

```bash
# Update documentation
# Train team on new process
# Archive plugin exports
# Enable automated sync
```

**Step 4: Full Automation (Week 6+)**

```bash
# Enable CI/CD workflow
# Set up token expiration alerts
# Document emergency manual process
```

---

## Troubleshooting

### MCP Server Issues

**Problem**: "Enable desktop MCP server" button not showing
**Solution**:
- Update Figma Desktop to latest version
- Ensure you have Dev Mode seat
- Toggle to Dev Mode (`Shift + D`)

**Problem**: MCP client can't connect to desktop server
**Solution**:
- Verify server is running (green indicator in Figma)
- Check `http://127.0.0.1:3845/mcp` is accessible
- Restart Figma Desktop App

### Plugin Issues

**Problem**: VarVar not exporting all variables
**Solution**:
- Check variable scopes (hidden variables won't export)
- Verify collection is not hidden from publishing
- Try exporting individual collections

**Problem**: Design Tokens Manager font weight incorrect
**Solution**:
- Known issue with multi-word weights ("Semi Bold")
- Manually fix in JSON post-export
- Use single-word font weights where possible

### REST API Issues

**Problem**: 401 Unauthorized
**Solution**:
- Verify token hasn't expired (90-day limit)
- Check token has correct scopes (`file_content:read`)
- Ensure token is in `X-Figma-Token` header

**Problem**: 500 Internal Server Error on `/variables/local`
**Solution**:
- Known issue post-UI3 rollout (October 2024)
- Wait for Figma to resolve
- Try again in 24 hours
- Fall back to plugin export

**Problem**: Rate limit exceeded
**Solution**:
- Implement exponential backoff
- Cache responses
- Reduce request frequency
- Upgrade to paid plan for higher limits

---

## Security Best Practices

### Token Storage

**Never commit access tokens to git:**

```bash
# Add to .gitignore
.env
.env.local
.figma-token
```

**Use environment variables:**

```bash
# .env.example (commit this)
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_FILE_KEY=your_file_key_here

# .env (never commit)
FIGMA_ACCESS_TOKEN=figd_actual_token_12345
FIGMA_FILE_KEY=ABC123DEF456
```

**Use CI secrets:**
- GitHub Secrets
- GitLab CI/CD Variables
- CircleCI Environment Variables

### Token Rotation

**Set calendar reminder:**
- Tokens expire in 90 days
- Rotate 1 week before expiration
- Update in all environments (local, CI, docs)

**Monitor expiration:**

```javascript
// Add to fetch script
const TOKEN_CREATED = '2024-11-03';
const EXPIRY_DAYS = 90;

function checkTokenExpiry() {
  const created = new Date(TOKEN_CREATED);
  const now = new Date();
  const daysSince = (now - created) / (1000 * 60 * 60 * 24);
  const daysRemaining = EXPIRY_DAYS - daysSince;

  if (daysRemaining < 7) {
    console.warn(`⚠️  Figma token expires in ${Math.floor(daysRemaining)} days`);
  }
}
```

### Scope Limitation

**Principle of least privilege:**

```bash
# Minimal scopes for token export
file_content:read     # Read variables
file_metadata:read    # Read file info (optional)

# Don't include unless needed
file_comments:write   # Write comments
webhooks:write        # Create webhooks
dev_resources:write   # Write dev resources
```

---

## Next Steps

**After setting up Figma integration:**

1. **Configure Style Dictionary** - Transform tokens to platform formats
2. **Set up build pipeline** - Automate token → CSS/JS conversion
3. **Create documentation** - Document token usage for team
4. **Establish naming conventions** - Standardize token naming
5. **Set up monitoring** - Alert on token expiration

**Related Documentation:**
- Style Dictionary Configuration → `03-style-dictionary-setup.md`
- Token Build Pipeline → `04-build-automation.md`
- Naming Conventions → `05-naming-conventions.md`

---

## Summary

**Choose Your Path:**

| Situation | Recommended Approach |
|-----------|---------------------|
| Just starting with tokens | **Plugins** (VarVar) |
| Need designer-driven workflow | **Plugins** (Design Tokens Manager) |
| Want AI-assisted workflows | **MCP Server** (for design context only) |
| Building automation | **REST API** + scripts |
| Enterprise CI/CD | **REST API** + GitHub Actions |

**Key Takeaway**: Start simple with plugins, evolve to REST API as automation needs grow. The MCP Server is excellent for AI-assisted design-to-code workflows but is not designed for token export automation.
