# Agent File Structure Guide

**Context:** You are an agent working in the context of a file structure that follows the conventions of the Agentic Marketing Architecture Methodology. Also known as AMA. You must adhere to the AMA Methodology. 

---

## Core Principles

These principles govern all file structure and organizational decisions:

### 1. Organize by Concern, Navigate by Entry Point, Reference by Path

- Directory structure reflects logical separation (strategy vs research vs configuration)
- UPPERCASE.md files serve as main content documents (STRATEGY.md, RESEARCH.md) and extensions (EXTENSION.md)
- Files are referenced by path, not duplicated across locations

**Example:** `/strategy/voice/` (concern) → `STRATEGY.md` (main content) → `/twitter/EXTENSION.md` (extension)

### 2. Progressive Disclosure: Pass Paths Not Content

- Information is hierarchical—overview first, details on demand. Preserving context and enabling specificity on a need-to-know basis. 
- Agents load only the files they need for their specific task
- Entry points guide to specific files rather than inlining everything

**Result:** Efficient token usage, scalability, clear information architecture

### 3. Temporal Elements Get Date-Stamped, Timeless Elements Use Version Control

- Research is time-stamped (`/YYYY-MM-DD@HH:mm/`) because markets and insights evolve
- Strategy is versioned through git because it's polished, not experimental
- Temporal folders preserve historical context for comparison

**Result:** Trend analysis, evidence preservation, clear distinction between WIP and source of truth

### 4. Input → Process → Output (Three-Folder Pattern)

- Research domains follow clear information flow: `/data/` (input) → `/{YYYY-MM-DD@HH:mm}/` (execution) → `/exports/` (output)

**Result:** Clear data provenance, separation of stages, agents know where to look

### 5. Verifiable Audit Trails: Every Claim Has Evidence

- Strategy claims link back to research findings via footnotes
- Research findings reference raw data sources
- Content generation loads strategy into execution context (PLAN.md/TODO.md) to ensure on-brand outputs
- Complete chain: Content (uses Strategy as context) → Strategy (cites Research) → Research (analyzed from Data)

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
│   ├── STRATEGY.md                   ← Main strategy overview
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
| `/strategy/` | Brand bible | Polished, timeless (git versioned), footnoted to research |
| `/research/` | Research domains | Temporal (date-stamped), raw, preserves historical context |
| `/content/` | Content creation | Temporal (date-stamped), strategy-guided, final outputs |

### Information Flow (Content Framework)

```
/research/{domain}/{YYYY-MM-DD@HH:mm}/   ← Research executions (temporal)
         ↓ synthesizes into
/research/{domain}/RESEARCH.md           ← Index (accumulated knowledge, MA approved)
         ↓ informs periodically
/strategy/{domain}/STRATEGY.md           ← Strategy documents (current truth)
         ↓ guides every
/content/{type}/{YYYY-MM-DD@HH:mm}/      ← Content creation (strategy as context)
```

**Key Rules:**
- Research → Strategy → Content (never skip layers)
- Strategy synthesis reads from index RESEARCH.md (not executions)
- Content references strategy (not research directly)
- Extensions extend (not replace) parent STRATEGY.md (e.g., /voice/twitter/EXTENSION.md)

---

## Progressive Disclosure Pattern

**Concept:** Information is hierarchical. Agents load exactly what they need, when needed.

### The Pattern

1. **Load base document** (`STRATEGY.md`) for core principles
2. **Check for extensions** in subfolders if platform-specific
3. **Extension extends base** (additive, not replacement)
4. **Reference by path**, don't duplicate content

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
- `/artifacts/` - Detailed evidence and analysis

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

**File Types by Directory:**

Within `/strategy/` folders (only 2 types):
- `STRATEGY.md` - Main content (folder name defines what it is)
- `EXTENSION.md` - Extends parent STRATEGY.md (additive only)

Within `/research/` folders:
- `RESEARCH.md` - Research findings (index or execution)
- `CHANGELOG.md` - Evolution tracking (at domain level)
- `PLAN.md` - Execution approach (in dated folders)
- `TODO.md` - Progress tracking (in dated folders)

**Folder names:** kebab-case
- Strategy domains: `brand-fundamentals`, `positioning`, `voice`
- Research domains: `competitor-analysis`, `customer-insights`
- Extensions: `twitter`, `linkedin`, `technical-audience`

**Date-stamped directories:** YYYY-MM-DD (`/2024-02-20/`) for executions

**Avoid:**
- Spaces: `Brand Narrative`
- Underscores: `brand_narrative`
- camelCase: `brandNarrative`
- index.md (use STRATEGY.md or RESEARCH.md instead)

### Path Examples

**Strategy with Extensions:**
```
/strategy/STRATEGY.md                          # Main overview
/strategy/voice/STRATEGY.md                    # Main voice doc
/strategy/voice/twitter/EXTENSION.md           # Twitter-specific
/strategy/messaging/STRATEGY.md                # Main messaging
/strategy/messaging/technical-audience/EXTENSION.md  # Tech audience variant
```

**Research with Index:**
```
/research/competitor-analysis/RESEARCH.md      # Index (accumulated)
/research/competitor-analysis/CHANGELOG.md     # Evolution tracking
/research/competitor-analysis/2024-02-20/RESEARCH.md  # Execution findings
/research/competitor-analysis/2024-02-20/artifacts/   # Detailed evidence
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
<ADD FOR CONTENT>

**Entry Point Files:**

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/strategy/` | Navigate brand strategy | <ADD NOTE ON OPTIONAL EXTENSIONS>
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

<ADD HERE>