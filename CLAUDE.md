# Agent File Structure Guide

**Brand Context:** Agents in this repository are employees of the agency managing the **Noncitizen** brand.

**Context:** You are an agent working in the context of a file structure that follows the conventions of the Agentic Marketing Architecture Methodology. Also known as AMA. You must adhere to the AMA Methodology. 

---

## Core Principles

These principles govern all file structure and organizational decisions:

### 1. Organize by Concern, Navigate by Entry Point, Reference by Path

- Directory structure reflects logical separation (strategy vs research vs configuration)
- UPPERCASE.md files serve as navigation tables of contents
- Files are referenced by path, not duplicated across locations

**Example:** `/strategy/` (concern) → `STRATEGY.md` (entry point) → `/messaging/pillars.md` (reference)

### 2. Progressive Disclosure: Pass Paths Not Content

- Information is hierarchical—overview first, details on demand. Preserving context and enabling specificity on a need-to-know basis. 
- Agents load only the files they need for their specific task
- Entry points guide to specific files rather than inlining everything

**Result:** Efficient token usage, scalability, clear information architecture

### 3. Temporal Elements Get Date-Stamped, Timeless Elements Use Version Control

- Research is time-stamped (`/2025-10-20/`) because markets and insights evolve
- Strategy is versioned through git because it's polished, not experimental
- Temporal folders preserve historical context for comparison

**Result:** Trend analysis, evidence preservation, clear distinction between WIP and source of truth

### 4. Input → Process → Output (Three-Folder Pattern)

- Research domains follow clear information flow
- `/data/` contains raw inputs, `/{YYYY-MM-DD}/` is where analysis happens, `/exports/` holds deliverables

**Result:** Clear data provenance, separation of stages, agents know where to look

### 5. Verifiable Audit Trails: Every Claim Has Evidence

- Strategy claims link back to research findings via footnotes
- Research findings reference raw data sources
- Complete chain: Content → Strategy → Research → Raw Data

**Result:** Defensible strategy, research utilization, transparency

---

## Workspace Architecture

```
/workspace-root/
├── .claude/                          ← System behavior & capabilities
│   ├── output-styles/                ← Primary agent definitions
│   ├── agents/                       ← Sub-agent specialists
│   ├── skills/                       ← Reusable workflows (see orchestration skill)
│   └── commands/                     ← Workflow triggers (/onboarding, /campaigns)
│
├── /strategy/                        ← Brand bible (polished, client-ready, footnoted to research)
│   ├── STRATEGY.md                   ← Entry point (progressive disclosure)
│   ├── /core/                        ← narrative.md, positioning.md
│   ├── /messaging/                   ← pillars.md, value-propositions.md
│   ├── /voice/                       ← tone-guidelines.md, vocabulary.md
│   └── /audience/                    ← personas/ (agency-owner.md, in-house-marketer.md)
│
├── /research/                        ← Research domains (temporal, date-stamped, raw findings)
│   └── /{domain}/                    ← e.g., category-landscape, customer-insight
│       ├── RESEARCH.md               ← Entry point (guides to latest run, data, exports)
│       ├── /data/                    ← INPUT: Raw materials (transcripts, surveys, reports)
│       ├── /{YYYY-MM-DD}/            ← PROCESS: Date-stamped runs (PLAN.md, TODO.md, findings)
│       └── /exports/                 ← OUTPUT: Polished deliverables (reports, summaries)
│
├── .mcp.json                         ← Tool integrations (MCP server config)
├── CLAUDE.md                         ← This file (agent structural guide)
└── MANIFESTO.md                      ← System philosophy and vision
```

### Directory Characteristics

| Directory | Purpose | Key Trait |
|-----------|---------|-----------|
| `/.claude/` | System configuration | Defines WHO (agents), WHAT (skills), HOW (workflows) |
| `/strategy/` | Brand bible | Polished, timeless (git versioned), footnoted to research |
| `/research/` | Research domains | Temporal (date-stamped), raw, preserves historical context |

### Information Flow

```
/research/{domain}/data/           ← Raw materials (interviews, surveys)
         ↓ analyzed in
/research/{domain}/{YYYY-MM-DD}/   ← Research execution (findings, analysis)
         ↓ produces
/research/{domain}/exports/        ← Deliverable reports
         ↓ informs (via footnotes)
/strategy/                         ← Brand strategy claims
         ↓ guides
Content output                     ← Blog posts, campaigns, messaging
```

---

## Progressive Disclosure Pattern

**Concept:** Information is hierarchical—agents load exactly what they need, when needed.

### The Pattern

1. **Entry point** (UPPERCASE.md) provides overview + navigation
2. **Agent reads entry point** to understand what's available
3. **Agent loads specific files** based on task needs
4. **Reference by path**, don't duplicate content

### Entry Point Files

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/strategy/STRATEGY.md` | Navigate brand strategy files |
| `RESEARCH.md` | `/research/{domain}/RESEARCH.md` | Navigate research domain |
| `SKILL.md` | `.claude/skills/{skill}/SKILL.md` | Define skill capabilities |
| `PLAN.md` | Execution folders | Document workflow approach |
| `TODO.md` | Execution folders | Track workflow progress |

**STRATEGY.md structure:**
```markdown
# Brand Strategy

## Overview
[1-2 paragraphs: what this strategy covers]

## Quick Navigation
**Need brand voice?** → `/voice/tone-guidelines.md`
**Need messaging themes?** → `/messaging/pillars.md`

## Related Research
[Links to research domains that inform this strategy]
```

**RESEARCH.md structure:**
```markdown
# Research: [Domain Name]

## Latest Findings
**Most recent run:** `/research/{domain}/{YYYY-MM-DD}/`
**Key insights:** [3-5 bullet points]

## Research Runs
- `/{YYYY-MM-DD}/` - [Description]

## Data & Deliverables
**Raw data:** `/research/{domain}/data/`
**Reports:** `/research/{domain}/exports/`
```

For PLAN.md and TODO.md formats, see the orchestration skill.

---

## Temporal Research & Three-Folder Patterns

### Temporal Research Pattern

Research is date-stamped to enable historical comparison and trend analysis.

**Format:** `/research/{domain}/{YYYY-MM-DD}/`

**Why:** Research evolves—markets shift, competitors pivot, customer needs change. Date-stamped executions preserve this evolution.

**Enables:**
- Historical comparison (October vs November: what changed?)
- Trend identification
- Context preservation (what we knew when)
- Evidence trails

**Each execution contains:**
- `PLAN.md` - Research approach and objectives
- `TODO.md` - Progress tracking
- Analysis files (findings, notes, insights)

### Three-Folder Pattern

Research domains follow Input → Process → Output structure:

```
/research/{domain}/
├── /data/           ← INPUT: Raw materials (static, organized by type)
├── /{YYYY-MM-DD}/   ← PROCESS: Date-stamped execution (PLAN.md, findings, notes)
└── /exports/        ← OUTPUT: Polished deliverables (reports, summaries)
```

**Information flow:**
```
/data/ → /{YYYY-MM-DD}/ → /exports/ → /strategy/
```

For detailed workflow execution guidance, see the **orchestration skill** at `.claude/skills/orchestration/`.

---

## Audit Trail Pattern

**Concept:** Create verifiable chains of evidence from content → strategy → research → data.

### The Chain

```
Content (Output)
    ↓ references
Strategy (Brand guidelines)
    ↓ footnotes
Research (Insights)
    ↓ analyzed from
Raw Data (Source material)
```

### Footnote Format

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

### Complete Example

**Raw Data:**
```
/research/customer-insight/data/interviews/customer-005.md:
"I tried 3 different productivity tools and they all made my life MORE complicated."
```

**Research Finding:**
```
/research/customer-insight/2025-10-21/findings.md:42
Pattern identified: 8 out of 10 customers described existing tools as "adding complexity".
```

**Strategy Claim:**
```
/strategy/messaging/value-propositions.md:
Our customers are drowning in complex tools.[^productivity-paradox]

[^productivity-paradox]: Customer research,
`/research/customer-insight/2025-10-21/findings.md:42`
```

---

## Navigation Heuristics

### Finding Information

**Need brand strategy?**
→ Start: `/strategy/STRATEGY.md` → Navigate to specific file

**Need research findings?**
→ Start: `/research/{domain}/RESEARCH.md` → Latest run or exports

**Need evidence for a claim?**
→ Follow footnote chain: Strategy → Research → Raw data

**Need system behavior/workflow?**
→ Check: `/.claude/output-styles/` or `/.claude/skills/`

**Need orchestration guidance?**
→ See: `.claude/skills/orchestration/SKILL.md`

### Quick Decision Tree

```
What do I need?

├─ Brand strategy information?
│  └─ Start: /strategy/STRATEGY.md → Navigate to specific file
│
├─ Research findings?
│  └─ Start: /research/{domain}/RESEARCH.md → Latest run or exports
│
├─ Evidence for a claim?
│  └─ Follow footnote chain: Strategy → Research → Raw data
│
├─ System behavior/workflow?
│  └─ Check: /.claude/output-styles/ or /.claude/skills/
│
└─ How to structure work?
   └─ See: Orchestration skill for execution patterns
```

### When to Create New Files

**Create in `/strategy/` when:**
- Content is polished and client-ready
- It's a brand source of truth (not exploratory)
- It should be versioned via git (not date-stamped)

**Create in `/research/{domain}/` when:**
- Conducting temporal research
- Analyzing raw data
- Producing insights that evolve over time

**Create in `/.claude/` when:**
- Defining agent behavior (output-styles, agents)
- Building reusable workflows (skills, commands)

**Create execution folder (`/{YYYY-MM-DD}/`) when:**
- Running a multi-phase workflow
- Need progress tracking (PLAN.md, TODO.md)
- Producing artifacts that flow between phases

---

## Naming Conventions & Quick Reference

### File Naming Rules

**Regular files:** kebab-case (`brand-narrative.md`, `customer-insight.md`)

**Entry points & workflow:** UPPERCASE.md (`STRATEGY.md`, `RESEARCH.md`, `PLAN.md`, `TODO.md`)

**Date-stamped directories:** YYYY-MM-DD (`/2025-10-20/`) for research executions

**Avoid:**
- Spaces: `Brand Narrative.md`
- Underscores: `brand_narrative.md`
- camelCase: `brandNarrative.md`

### Path Examples

**Strategy:**
```
/strategy/STRATEGY.md
/strategy/core/narrative.md
/strategy/messaging/pillars.md
```

**Research:**
```
/research/category-landscape/RESEARCH.md
/research/category-landscape/data/surveys/q4-2025.csv
/research/category-landscape/2025-10-20/findings.md
/research/category-landscape/exports/final-report.pdf
```

**Configuration:**
```
.claude/output-styles/marketing-operations-manager.md
.claude/skills/orchestration/SKILL.md
.claude/commands/onboarding/discover-brand-story.md
```

### Quick Reference Tables

**Directory Lookup:**

| Directory | Purpose | Key Trait |
|-----------|---------|-----------|
| `/.claude/` | System configuration | Defines agents, skills, workflows |
| `/strategy/` | Brand bible | Polished, timeless, footnoted |
| `/research/` | Research domains | Temporal, date-stamped, raw |

**Entry Point Files:**

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/strategy/` | Navigate brand strategy |
| `RESEARCH.md` | `/research/{domain}/` | Navigate research domain |
| `SKILL.md` | `.claude/skills/{skill}/` | Define skill capabilities |

**Three-Folder Pattern:**

| Folder | Purpose | Contains |
|--------|---------|----------|
| `/data/` | Input | Raw materials (transcripts, surveys) |
| `/{YYYY-MM-DD}/` | Process | Research execution (PLAN.md, findings) |
| `/exports/` | Output | Polished deliverables (reports) |

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
└── [analysis-files]     # Findings, notes
```

---

## Decision-Making Heuristics

These principles enable agents to make structural decisions without exhaustive rules:

**Where does a file belong?**
- Polished and client-ready? → `/strategy/`
- Research or investigation? → `/research/{domain}/`
- Defines system behavior? → `/.claude/`

**Does it need a date?**
- Changes over time (research, market data)? → Date-stamp it
- Polished deliverable (strategy, docs)? → Version control

**How to structure information?**
- Referenced frequently? → Create entry point (UPPERCASE.md)
- Flows through stages? → Use three-folder pattern
- Claims verifiable? → Add footnotes to research

**What context to load?**
- Start with entry point (UPPERCASE.md)
- Load only files needed for current task
- Reference other files by path (don't duplicate)
