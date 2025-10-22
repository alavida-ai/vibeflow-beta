# Naming Conventions & Quick Reference

## File Naming Rules

### Regular Files: kebab-case

**Format:** `lowercase-with-hyphens.md`

**Examples:**
- `brand-narrative.md`
- `customer-insight-analysis.md`
- `agency-owner-persona.md`

**Avoid:**
- `Brand Narrative.md` (spaces)
- `brand_narrative.md` (underscores)
- `brandNarrative.md` (camelCase)

### Entry Points & Workflow Files: UPPERCASE.md

**Entry points** (navigation guides):
- `STRATEGY.md` - Strategy directory entry point
- `RESEARCH.md` - Research domain entry point
- `SKILL.md` - Skill capability definition

**Workflow tracking:**
- `PLAN.md` - Workflow execution plan
- `TODO.md` - Progress tracking

### Date-Stamped Directories: YYYY-MM-DD

**Format:** `/2025-10-20/` or `/2025-10-20_14:30/` (with timestamp if needed)

**Use for:**
- Research execution folders
- Temporal investigations
- Any time-series analysis

**Don't use for:**
- Strategy files (use git versioning)
- Configuration files
- System documentation

---

## Path Examples

### Strategy Paths
```
/strategy/STRATEGY.md
/strategy/core/narrative.md
/strategy/messaging/pillars.md
/strategy/voice/tone-guidelines.md
/strategy/audience/personas/agency-owner.md
```

### Research Paths
```
/research/category-landscape/RESEARCH.md
/research/category-landscape/data/surveys/q4-2025.csv
/research/category-landscape/2025-10-20/PLAN.md
/research/category-landscape/2025-10-20/findings.md
/research/category-landscape/exports/final-report.pdf
```

### Configuration Paths
```
.claude/output-styles/marketing-operations-manager.md
.claude/agents/brand-analyst.md
.claude/skills/orchestration/SKILL.md
.claude/commands/onboarding/discover-brand-story.md
```

---

## Quick Reference Tables

### Directory Lookup

| Directory | Purpose | Key Trait |
|-----------|---------|-----------|
| `/.claude/` | System configuration | Defines agents, skills, workflows |
| `/strategy/` | Brand bible | Polished, timeless, footnoted |
| `/research/` | Research domains | Temporal, date-stamped, raw |
| `/docs/` | Architecture docs | System meta-documentation |

### Entry Point Files

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/strategy/` | Navigate brand strategy |
| `RESEARCH.md` | `/research/{domain}/` | Navigate research domain |
| `SKILL.md` | `.claude/skills/{skill}/` | Define skill capabilities |
| `PLAN.md` | Execution folders | Document workflow approach |
| `TODO.md` | Execution folders | Track progress |

### Three-Folder Pattern

| Folder | Purpose | Contains |
|--------|---------|----------|
| `/data/` | Input | Raw materials (transcripts, surveys, reports) |
| `/{YYYY-MM-DD}/` | Process | Research execution (PLAN.md, findings, notes) |
| `/exports/` | Output | Polished deliverables (reports, summaries) |

### Common Structure Templates

**Research domain setup:**
```bash
/research/{domain-name}/
├── RESEARCH.md          # Entry point
├── /data/               # Input materials
├── /{YYYY-MM-DD}/       # Execution runs
└── /exports/            # Deliverables
```

**Execution folder:**
```bash
/research/{domain}/{YYYY-MM-DD}/
├── PLAN.md              # Approach
├── TODO.md              # Progress
└── [analysis-files]     # Findings, notes, etc.
```

**Strategy organization:**
```bash
/strategy/{category}/
├── [entry-point.md]     # Optional category guide
└── [files.md]           # All in kebab-case
```

**Skill organization:**
```bash
.claude/skills/{skill-name}/
├── SKILL.md             # Entry point
└── [supporting-files]   # References, examples
```

---

## Footnote Reference Format

**Standard format:**
```markdown
[^reference-name]: [Context description],
`/path/to/file.md:line-number`
```

**Example:**
```markdown
Customers struggle with tool complexity.[^productivity-paradox]

[^productivity-paradox]: Customer research,
`/research/customer-insight/2025-10-21/findings.md:42`
```

---

## File Reference Examples

**From strategy to research:**
```markdown
Our positioning is backed by market research[^market-research]

[^market-research]: Category landscape analysis,
`/research/category-landscape/2025-10-15/findings.md:89`
```

**From RESEARCH.md to execution:**
```markdown
**Latest findings:** See `/research/{domain}/2025-10-25/findings.md`
```

**From STRATEGY.md to specific files:**
```markdown
**Need brand voice?** → `/voice/tone-guidelines.md`
**Need messaging?** → `/messaging/pillars.md`
```
