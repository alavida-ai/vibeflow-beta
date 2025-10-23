# Visualize Architecture Command

## Objective
Generate an interactive D3.js visualization of the current user's Agentic Marketing Architecture system by scanning their `.claude/` directory structure.

## What to Visualize
Scan and include:
- **Output Styles** (`.claude/output-styles/*.md`) - The primary orchestration agent (MOM)
- **Agents** (`.claude/agents/*.md`) - Sub-agent specialists
- **Skills** (`.claude/skills/*/SKILL.md`) - Reusable workflows and capabilities
- **Commands** (`.claude/commands/**/*.md`) - Workflow triggers
- **Tools** (`.mcp.json`) - External integrations

## Implementation Steps

### 1. Scan the `.claude/` Directory Structure
Use the Glob and Read tools to discover:
```
.claude/
├── output-styles/
│   └── *.md (e.g., operations-manager.md)
├── agents/
│   └── *.md (e.g., strategist-marketer.md, content-lead.md)
├── skills/
│   └── */SKILL.md (e.g., orchestration/SKILL.md)
└── commands/
    └── **/*.md (e.g., onboarding/discover-brand-story.md)
```

Also check for `.mcp.json` to find tools.

### 2. Parse Metadata from Files
For each discovered file, extract:
- **Name** - From filename or YAML frontmatter
- **Description** - From frontmatter or first paragraph
- **Type** - Based on location (agent, skill, command, etc.)
- **Relationships** - Skills used by agents, tools used by skills

### 3. Generate D3.js Visualization HTML
Create a standalone HTML file at:
```
.claude/skills/visualization/output/architecture-{YYYY-MM-DD-HHMMSS}.html
```

The HTML should:
- Use D3.js from CDN (no dependencies)
- Include custom SVG icons from `.claude/skills/visualization/assets/components/`
- Be fully interactive (zoom, pan, hover tooltips)
- Show the actual system structure (not a hardcoded example)
- Use brand colors:
  - Blue (#4A90E2) - Marketing Architect
  - Orange (#FF6B35) - MOM/Output Styles
  - Green (#50C878) - Agents/Subagents
  - Purple (#9B59B6) - Skills
  - Yellow (#F9CA24) - Commands/Folders

### 4. Open in Browser
Use the Bash tool to open the generated HTML file in the user's default browser.

## Output
The Marketing Architect should see:
- **Interactive visualization** of their system
- **Accurate representation** of their actual agents, skills, commands
- **Tooltips** showing descriptions from markdown files
- **Export options** (PNG, SVG)
- **Timestamp** showing when it was generated

## Example Usage
```
Marketing Architect: /visualize architecture

You respond:
1. "Scanning your .claude/ directory..."
2. "Found: 1 output style (MOM), 3 agents, 5 skills, 12 commands, 3 tools"
3. "Generating visualization..."
4. Generate HTML file
5. Open in browser
6. "✅ Visualization opened in browser!"
```

## Notes
- Always scan the ACTUAL directory structure (don't use hardcoded data)
- If files are missing, show them as grayed out or skip them
- Include file paths in tooltips so users know where things are defined
- Make it clear this is a snapshot in time (add timestamp)
