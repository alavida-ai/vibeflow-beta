# Agent File Structure Guide

**Context:** You are an agent working in the context of a file structure that follows the conventions of the Agentic Marketing Architecture Methodology. Also known as AMA. You must adhere to the AMA Methodology. 

---

## Core Principles

These principles govern all file structure and organizational decisions:

### 1. Organize by Concern, Navigate by Entry Point, Reference by Path

- Directory structure reflects logical separation (strategy vs research vs content vs .claude (this is the config folder))
- UPPERCASE.md files serve as main content documents (STRATEGY.md, RESEARCH.md, CONTENT.md etc) and extensions (EXTENSION.md)
- Files are referenced by path, not duplicated across locations

**Example:** `/strategy/voice/` (concern) → `STRATEGY.md` (main content) → `/twitter/EXTENSION.md` (extension)

### 2. Progressive Disclosure: Pass Paths Not Content

- Information is hierarchical. highlevel first, details on demand. Preserving context and enabling specificity on a need-to-know basis. 
- Agents load only the files they need for their specific task
- Entry points guide to specific files rather than inlining everything

**Result:** Efficient token usage, scalability, clear information architecture

### 3. Temporal Elements Get Date-Stamped, Timeless Elements Use Version Control

- Research is time-stamped (`/YYYY-MM-DD@HH:mm/`) because markets and insights evolve
- Content is time-stamped (`/YYYY-MM-DD@HH:mm-content-slug-title`) because content is system generated output
- Strategy is versioned through git because it's polished, not experimental
- Temporal folders preserve historical context for comparison

**Result:** Trend analysis, evidence preservation, clear distinction between WIP and source of truth

### 4. Verifiable Audit Trails: Every Claim Has Evidence

- Strategy claims link back to research findings via markdown references `[descriptive text](/path/to/file.md)`
- Research findings reference raw data sources using same format
- Content generation loads strategy into execution context (PLAN.md/TODO.md) to ensure on-brand outputs
- Complete chain: Content (uses Strategy as context) → Strategy (synthezied from and cites Research) → Research (analyzed from Data)
- Markdown references enable human navigation AND progressive disclosure for AI agents

**Result:** Defensible strategy, traceable content, research utilization, transparency

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
│   ├── /brand-fundamentals/          ← STRATEGY.md (mission, values, purpose)
│   ├── /positioning/                 ← STRATEGY.md (market position, differentiation)
│   ├── /messaging/                   ← STRATEGY.md + optional extension folders
│   │   └── /{audience}/              ← EXTENSION.md (extends parent)
│   ├── /voice/                       ← STRATEGY.md + optional extension folders
│   │   └── /{platform}/              ← EXTENSION.md (extends parent)
│   └── /audience/                    ← STRATEGY.md + optional persona subfolders
│       └── /{persona-name}/          ← EXTENSION.md (specific persona)
│
├── /research/                        ← Research domains (temporal, date-stamped, raw findings)
│   └── /{domain}/                    ← e.g., category-landscape, customer-insight
│       ├── RESEARCH.md               ← Index: accumulated knowledge (MA approved)
│       ├── CHANGELOG.md              ← Tracks evolution of findings
│       ├── /{YYYY-MM-DD@HH:mm}/      ← Execution folders
│       │   ├── PLAN.md               ← Approach for this execution
│       │   ├── TODO.md               ← Progress tracking
│       │   ├── RESEARCH.md           ← Execution findings (high-level)
│       │   └── /artifacts/           ← Detailed evidence and analysis
│       └── /data/                    ← Raw materials (transcripts, surveys, reports)
│
├── /content/                         ← Content creation (temporal, strategy-guided outputs)
│   └── /{type}/                      ← e.g., blog-posts, tweets, linkedin-posts
│       └── /{YYYY-MM-DD@HH:mm-content-slug-title}/      ← Execution folders
│           ├── PLAN.md               ← Content brief (strategy files used as context)
│           ├── TODO.md               ← Creation tracking
│           ├── /artifacts/           ← Subtasks/subagent outputs (research, keywords)
│           └── CONTENT.md            ← Final content to review/publish
│
├── .mcp.json                         ← Tool integrations (MCP server config)
├── CLAUDE.md                         ← This file (agent structural guide)
└── MANIFESTO.md                      ← System philosophy and vision
```

### Directory Characteristics

| Directory | Purpose | Key Trait |
|-----------|---------|-----------|
| `/.claude/` | System configuration | Defines WHO (agents), WHAT (skills), HOW (workflows) |
| `/strategy/` | Brand bible | Polished, timeless (git versioned), references research |
| `/research/` | Research domains | Temporal (date-stamped), raw, preserves historical context |
| `/content/` | Content creation | Temporal (date-stamped) with slug, strategy-guided, final outputs |

### Information Flow (Content Framework)

```
/research/{domain}/{YYYY-MM-DD@HH:mm}/   ← Research executions (temporal)
         ↓ updates 
/research/{domain}/RESEARCH.md           ← Index (accumulated knowledge, MA approved)
         ↓ synthesizes into
/strategy/{domain}/STRATEGY.md           ← Strategy documents (current truth)
         ↓ guides every
/content/{type}/{YYYY-MM-DD@HH:mm-content-slug-title}/      ← Content creation (strategy as context)
```

**Key Rules:**
- Research → Strategy → Content (never skip layers)
- Strategy synthesis reads from index RESEARCH.md (not executions)
- Content generated from strategy (not research directly)
- Extensions extend (not replace) parent STRATEGY.md (e.g., /voice/twitter/EXTENSION.md)

---

## Progressive Disclosure Pattern

**Concept:** Information is hierarchical. Agents load exactly what they need, when needed.

### The Pattern

1. **Load base document** (`STRATEGY.md`) for core principles
2. **Check for extensions** in subfolders if platform-specific
3. **Extension extends base** (additive, not replacement)
4. **Reference by path with markdown refernces**, don't duplicate content

### Extension Pattern (Like Next.js Layouts)

```
Parent STRATEGY.md + Child EXTENSION.md = Complete Context

Example:
/strategy/voice/STRATEGY.md            # Base voice (like layout.tsx)
+ /strategy/voice/twitter/EXTENSION.md # Twitter additions (like page.tsx)
= Complete Twitter voice guide

Note: EXTENSION.md only contains what's ADDITIONAL for that context
```

### Entry Point Files

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/strategy/STRATEGY.md` | Navigate brand strategy files |
| `RESEARCH.md` | `/research/{domain}/RESEARCH.md` | Navigate research domain |
| `SKILL.md` | `.claude/skills/{skill}/SKILL.md` | Define skill capabilities |
| `PLAN.md` | Execution folders | Document workflow approach |
| `TODO.md` | Execution folders | Track workflow progress |
| `CHANGELOG.md` | Research domain root | Track evolution of findings |
| `CONTENT.md` | Content execution folders | Final content to review/publish |

## Temporal Research & Three-Folder Patterns

### Temporal Research Pattern

Research is date-stamped to enable historical comparison and trend analysis.

**Format:** `/research/{domain}/{YYYY-MM-DD@HH:mm}/`

**Why:** Research evolves—markets shift, competitors pivot, customer needs change. Date-stamped executions preserve this evolution.

**Enables:**
- Historical comparison (October vs November: what changed?)
- Trend identification
- Context preservation (what we knew when)
- Evidence trails

**Each execution contains:**
- `PLAN.md` - Research approach and objectives
- `TODO.md` - Progress tracking
- `RESEARCH.md` - Execution findings (high-level)
- `/artifacts/` - Detailed evidence and analysis from subtasks and subagents

### Index Pattern: Accumulated Knowledge

Each research domain maintains an **index RESEARCH.md** at the domain level that represents accumulated knowledge, separate from individual execution findings:

```
/research/{domain}/
├── RESEARCH.md               ← INDEX: Accumulated knowledge (MA approved)
├── CHANGELOG.md              ← Tracks evolution of findings
├── /{YYYY-MM-DD@HH:mm}/      ← Execution 1
│   ├── PLAN.md
│   ├── TODO.md
│   ├── RESEARCH.md           ← Execution findings
│   └── /artifacts/
└── /{YYYY-MM-DD@HH:mm}/      ← Execution 2
    ├── PLAN.md
    ├── TODO.md
    ├── RESEARCH.md           ← Execution findings
    └── /artifacts/
```

**How it works:**
1. New research execution generates findings in timestamped folder
2. AI compares new findings with existing index (contradictions, additions, validations)
3. Marketing Architect approves updates to index
4. CHANGELOG.md tracks all changes for audit trail

**Why this matters:**
- Knowledge accumulates (not replaced)
- Strategy synthesis reads from clean, validated index
- Full history preserved in execution folders
- Contradictions handled gracefully with MA oversight

### Three-Folder Pattern

Research domains follow Input → Process → Output structure:

```
/research/{domain}/
├── RESEARCH.md              ← INDEX: Current accumulated knowledge
├── CHANGELOG.md             ← Evolution tracking
├── /data/                   ← INPUT: Raw materials (static, organized by type)
└── /{YYYY-MM-DD@HH:mm}/     ← PROCESS: Date-stamped execution (PLAN.md, findings, artifacts)
```

**Information flow:**
```
/data/ → /{YYYY-MM-DD@HH:mm}/ → (updates) → RESEARCH.md (index) → /exports/ → /strategy/
```

For detailed workflow execution guidance, see the **orchestration skill** at `.claude/skills/orchestration/`.

---

## Audit Trail Pattern

**Concept:** Create verifiable chains of evidence from content → strategy → research → data.

### The Chain

```
Content (Output)
    ↓ generated with
Strategy (Brand guidelines)
    ↓ references
Research (Insights)
    ↓ analyzed from
Raw Data (Source material)
```

### Markdown Reference Format (REQUIRED)

**Standard format:**
```markdown
[descriptive text](/path/to/file.md)
```

**Why this format:**
- Human-navigable (clickable in editors)
- Enables progressive disclosure for AI agents
- Consistent across all documents

**Example:**
```markdown
Our customers are drowning in [complex tools that overwhelm them](/research/customer-insights/RESEARCH.md).
```

---

## Navigation Heuristics

**Need brand strategy?**
→ Start: Navigate to domain strategy file directly `/strategy/{domain}/STRATEGY.md`
→ Optional: read extension if available from reference in `STRATEGY.md` using ref: e.g. "View specific guidelines for: [twitter](twitter/EXTENSION.md)."

**Need research findings?**
→ Start: `/research/{domain}/RESEARCH.md` (index with accumulated knowledge from previous executions)

**Need evidence for a claim?**
→ Follow markdown reference links: Strategy → Research Index → Raw data

---

## Naming Conventions & Quick Reference

### File Naming Rules

**File Types by Directory:**

Within `/strategy/` folders (only 2 types):
- `STRATEGY.md` - Main content (folder name defines what it is)
- `EXTENSION.md` - Extends parent STRATEGY.md (additive only)

Within `/research/` folders:
- `RESEARCH.md` - Research findings (index or execution) - index is the current up-to-date level
- `CHANGELOG.md` - Evolution tracking (at domain level)
- `PLAN.md` - Execution approach (in dated folders)
- `TODO.md` - Progress tracking (in dated folders)
- `/artifacts/` - Subtasks/subagent outputs

Within `/content/` folders:
- `CONTENT.md` - Final content to review/publish
- `PLAN.md` - Content brief (strategy references)
- `TODO.md` - Creation tracking
- `/artifacts/` - Subtasks/subagent outputs

**Date-stamped directories:**
- Research: `YYYY-MM-DD@HH:mm` (e.g., `/2024-02-20@18:43/`)
- Content: `YYYY-MM-DD@HH:mm-content-slug-title` (e.g., `/2024-02-20@18:43-top-10-ai-tools/`)
  - Includes slug for human-readable organization

**Avoid:**
- Spaces: `Brand Narrative`
- Underscores: `brand_narrative`
- camelCase: `brandNarrative`
- index.md (use STRATEGY.md / RESEARCH.md / CONTENT.md etc instead)

### Quick Reference Tables

| Directory | Purpose | Key Trait |
|-----------|---------|-----------|
| `/.claude/` | System configuration | Defines agents, skills, workflows |
| `/strategy/` | Brand bible | Polished, timeless, versioned, with markdown references |
| `/research/` | Research domains | Temporal, date-stampe executions, index with accumulated knowledge |
| `/content/` | Content outputs | Temporal, strategy-guided, with execution details |


## Decision-Making Heuristics

These principles enable agents to make structural decisions without exhaustive rules:

**When to use markdown references:**
- Always use `[descriptive text](/path/to/file.md)` format for linking
- Always make the path to file relative to this project root NEVER THE COMPLETE FILE PATH as this is a nightmare for collaboration
- Never use footnotes format `[^ref]`
- References enable both human navigation and AI progressive disclosure