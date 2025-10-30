# Agent File Structure Guide

**Context:** You are an agent working in the context of a file structure that follows the conventions of the Agentic Marketing Architecture Methodology (AMA). You must adhere to the AMA Methodology.

---

## The AMA Methodology

The Agentic Marketing Architecture consists of **two distinct frameworks**:

### 1. Agentic Framework (System Configuration)
Located in `/.claude/`, this framework defines the agent orchestration system:
- **Output Styles** - Primary agent definitions (Operations Manager, etc.)
- **Sub-agents** - Specialist agents (Brand Analyst, Content Writer, etc.)
- **Skills** - Reusable workflows
- **Commands** - Workflow triggers (`/plan`, `/implement`, etc.)

**Purpose:** Defines WHO (agents), WHAT (skills), and HOW (workflows) the system operates.

### 2. Marketing Framework (Content Architecture)
Located in `/research/`, `/strategy/`, and `/content/`, this is our **opinionated marketing framework** with three core base directories:

#### The Three-Layer Framework

```
/research/     ← Pure, unopinionated factual gathering
     ↓ synthesizes into
/strategy/     ← Strategic synthesis of research into actionable insights (the farmland)
     ↓ guides creation of
/content/      ← System-generated outputs (the produce grown on that farmland)
```

**Key Characteristics:**

- **Research** - Pure, unopinionated factual gathering (all executions are temporal/date-stamped)
- **Strategy** - Strategic synthesis of research into actionable insights (all executions are temporal/date-stamped)
- **Content** - Final outputs guided by strategy (all executions are temporal/date-stamped with slug)

**Domain Structure:**

Within each base directory, **domains** organize specific areas of work:
- **Research domains** - e.g., `founder-interviews`, `competitive-analysis`, `customer-insights`
  - Special domain: `adhoc` - For research that doesn't fit or update a specific domain's RESEARCH.md file
- **Strategy domains** - e.g., `positioning`, `voice`, `messaging`, `audience`
- **Content domains** - e.g., `twitter-posts`, `blog-posts`, `linkedin-posts`

**Important:** with the exception of research/adhoc - these domains are **configurable by the Marketing Architect**.

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

### 3. Temporal Execution Pattern with CHANGELOG Tracking

**All three base directories use temporal executions** with date-stamped folders:

- **Standard format:** `/YYYY-MM-DD@HH:mm/` (research domains, strategy domains)
- **With-slug format:** `/YYYY-MM-DD@HH:mm-descriptive-slug/` (content domains, research/adhoc)

**CHANGELOG.md files** at domain root track evolution of index files (RESEARCH.md, STRATEGY.md):
- Record what changed and why
- Link to execution folders that prompted updates
- Create audit trail for approved changes
- Enable understanding of strategic evolution over time

**Result:** Temporal executions provide iteration history, CHANGELOG.md provides curated narrative of approved changes, git versioning preserves everything

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
│   └── commands/                     ← Workflow triggers (/plan, /implement)
│
├── /strategy/                        ← Strategic synthesis (iterative, research-backed)
│   └── /{domain}/                    ← e.g., positioning, voice, messaging, audience
│       ├── STRATEGY.md               ← Index: current approved strategy (MA approved)
│       ├── CHANGELOG.md              ← Tracks evolution of strategy
│       ├── /{YYYY-MM-DD@HH:mm}/      ← Execution folders (iterative development)
│       │   ├── PLAN.md               ← Approach for this execution
│       │   ├── TODO.md               ← Progress tracking
│       │   ├── STRATEGY.md           ← Execution strategy (draft/iteration)
│       │   └── /artifacts/           ← Supporting materials and analysis
│       └── /{extension}/             ← Optional: platform/audience-specific extensions
│           └── EXTENSION.md          ← Extends parent STRATEGY.md (additive only)
│
├── /research/                        ← Research domains (temporal, date-stamped, raw findings)
│   ├── /{domain}/                    ← e.g., category-landscape, customer-insight
│   │   ├── RESEARCH.md               ← Index: accumulated knowledge (MA approved)
│   │   ├── CHANGELOG.md              ← Tracks evolution of findings
│   │   ├── /{YYYY-MM-DD@HH:mm}/      ← Standard execution folders
│   │   │   ├── PLAN.md               ← Approach for this execution
│   │   │   ├── TODO.md               ← Progress tracking
│   │   │   ├── RESEARCH.md           ← Execution findings (high-level)
│   │   │   └── /artifacts/           ← Detailed evidence and analysis
│   │   └── /data/                    ← Raw materials (transcripts, surveys, reports)
│   └── /adhoc/                       ← Special domain: research that doesn't fit other domains
│       └── /{YYYY-MM-DD@HH:mm-slug}/ ← With-slug execution folders
│           ├── PLAN.md
│           ├── TODO.md
│           ├── RESEARCH.md           ← Standalone findings (not indexed)
│           └── /artifacts/
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
| `/.claude/` | Agentic Framework | Defines WHO (agents), WHAT (skills), HOW (workflows) |
| `/research/` | Marketing Framework: Input | Temporal (date-stamped), unopinionated factual gathering, preserves historical context |
| `/strategy/` | Marketing Framework: Processing | Temporal (date-stamped), iterative refinement, synthesizes research, references research |
| `/content/` | Marketing Framework: Output | Temporal (date-stamped) with slug, strategy-guided, final deliverables |

### Information Flow (Marketing Framework)

```
/research/{domain}/{YYYY-MM-DD@HH:mm}/          ← Research executions (temporal)
         ↓ updates
/research/{domain}/RESEARCH.md                  ← Research index (accumulated knowledge, MA approved)
         ↓ synthesizes into (via execution)
/strategy/{domain}/{YYYY-MM-DD@HH:mm}/          ← Strategy executions (iterative development)
         ↓ updates
/strategy/{domain}/STRATEGY.md                  ← Strategy index (current approved strategy, MA approved)
         ↓ guides every
/content/{type}/{YYYY-MM-DD@HH:mm-content-slug-title}/      ← Content creation (strategy as context)
```

**Key Rules:**
- Context flow: Research → Strategy → Content (never skip layers)
- Each layer has **executions** (temporal, iterative) and an **index** (approved, current state)
- Strategy synthesis reads from research index RESEARCH.md (not research executions)
- Strategy development happens in executions, approved versions become the index
- Content generated from strategy index (not strategy executions or research directly)
- Extensions extend (not replace) parent STRATEGY.md (e.g., `/strategy/voice/twitter/EXTENSION.md`)

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
| `STRATEGY.md` | `/strategy/{domain}/STRATEGY.md` | Index: current approved strategy |
| `RESEARCH.md` | `/research/{domain}/RESEARCH.md` | Index: accumulated research knowledge |
| `CONTENT.md` | `/content/{type}/{timestamp-slug}/CONTENT.md` | Final content to review/publish |
| `SKILL.md` | `.claude/skills/{skill}/SKILL.md` | Define skill capabilities |
| `PLAN.md` | Execution folders | Document workflow approach |
| `TODO.md` | Execution folders | Track workflow progress |
| `CHANGELOG.md` | Domain root (research/strategy) | Track evolution of findings/strategy |
| `EXTENSION.md` | Extension subfolders | Platform/audience-specific additions |

## Temporal Execution Pattern (Research, Strategy, Content)

All three base directories in the **Marketing Framework** use temporal executions to enable iteration, comparison, and evolution tracking.

### Universal Execution Pattern

**Format:** `/{domain}/{YYYY-MM-DD@HH:mm}/`

**Why Temporal:**
- **Research** - Markets shift, competitors pivot, customer needs evolve
- **Strategy** - Strategy requires iteration, refinement, and A/B testing of approaches
- **Content** - Content is versioned, timestamped output for publication

**Enables:**
- Historical comparison (what changed over time?)
- Trend identification and pattern recognition
- Context preservation (what we knew when)
- Evidence trails and audit capability
- Iterative refinement and improvement

**Each execution contains:**
- `PLAN.md` - Approach and objectives for this execution
- `TODO.md` - Progress tracking during execution
- `{TYPE}.md` - Execution output (RESEARCH.md, STRATEGY.md, or CONTENT.md)
- `/artifacts/` - Detailed supporting materials from subtasks and subagents

### Index Pattern: Accumulated Knowledge

**Both research and strategy domains** maintain an **index file** at the domain level that represents the current approved state, separate from individual execution iterations:

```
/{base-dir}/{domain}/
├── {TYPE}.md                 ← INDEX: Current approved state (MA approved)
│                                (RESEARCH.md or STRATEGY.md)
├── CHANGELOG.md              ← Tracks evolution over time
├── /{YYYY-MM-DD@HH:mm}/      ← Execution 1 (iteration/development)
│   ├── PLAN.md
│   ├── TODO.md
│   ├── {TYPE}.md             ← Execution output
│   └── /artifacts/
└── /{YYYY-MM-DD@HH:mm}/      ← Execution 2 (iteration/development)
    ├── PLAN.md
    ├── TODO.md
    ├── {TYPE}.md             ← Execution output
    └── /artifacts/
```

**How it works:**
1. New execution (research or strategy) generates output in timestamped folder
2. AI compares new output with existing index (contradictions, additions, validations)
3. Marketing Architect reviews and approves updates to index
4. CHANGELOG.md tracks all changes for audit trail

**Why this matters:**
- **Research** - Knowledge accumulates (not replaced), preserves evidence
- **Strategy** - Strategy evolves through iteration, approved versions become current truth
- **Downstream use** - Strategy synthesis reads from research index, content generation reads from strategy index
- Full history preserved in execution folders
- Contradictions and improvements handled gracefully with MA oversight

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

**Important Note:**
- Always use relative paths from the workspace root (e.g., `/research/domain/RESEARCH.md`)
- Never use absolute file system paths (e.g., `/Users/name/project/research/...`)
- Relative paths enable seamless collaboration when Marketing Architects clone the repository

**Example:**
```markdown
Our customers are drowning in [complex tools that overwhelm them](/research/customer-insights/RESEARCH.md).
```

---

## Navigation Heuristics

**Need current approved strategy?**
→ Start: `/strategy/{domain}/STRATEGY.md` (index with current approved strategy)
→ Optional: Read extension if available from reference in `STRATEGY.md`, e.g., "View specific guidelines for: [twitter](twitter/EXTENSION.md)"

**Need strategy development context?**
→ Look in: `/strategy/{domain}/{YYYY-MM-DD@HH:mm}/` (execution folders show iteration history)

**Need research findings?**
→ Start: `/research/{domain}/RESEARCH.md` (index with accumulated knowledge)

**Need research execution context?**
→ Look in: `/research/{domain}/{YYYY-MM-DD@HH:mm}/` (execution folders preserve historical findings)

**Need adhoc research?**
→ Look in: `/research/adhoc/{YYYY-MM-DD@HH:mm-slug}/` (standalone research not tied to domains)

**Need evidence for a claim?**
→ Follow markdown reference links: Strategy Index → Research Index → Raw data

**Building new strategy?**
→ Read research index → Create strategy execution → Iterate → Approve to index

---

## Naming Conventions & Quick Reference

### File Naming Rules

**Execution Folder Structure:**

All three base directories use temporal execution folders with consistent internal structure:

```
/{base-dir}/{domain}/{YYYY-MM-DD@HH:mm}/  or  /{YYYY-MM-DD@HH:mm-slug}/
├── PLAN.md           ← Execution approach and objectives
├── TODO.md           ← Progress tracking during execution
├── {TYPE}.md         ← Execution output (RESEARCH.md, STRATEGY.md, or CONTENT.md)
└── /artifacts/       ← Supporting materials from subtasks/subagents
```

**File Types by Base Directory:**

**Within `/research/` domains:**
- Domain root level:
  - `RESEARCH.md` - Index (accumulated knowledge, MA approved)
  - `CHANGELOG.md` - Evolution tracking
  - `/data/` - Raw materials (transcripts, surveys, reports)
- Execution folders (`/{YYYY-MM-DD@HH:mm}/`):
  - `PLAN.md`, `TODO.md`, `RESEARCH.md`, `/artifacts/`
- Special: `/adhoc/` uses with-slug format (`/{YYYY-MM-DD@HH:mm-slug}/`)

**Within `/strategy/` domains:**
- Domain root level:
  - `STRATEGY.md` - Index (current approved strategy, MA approved)
  - `CHANGELOG.md` - Evolution tracking
  - Optional: Extension subfolders with `EXTENSION.md`
- Execution folders (`/{YYYY-MM-DD@HH:mm}/`):
  - `PLAN.md`, `TODO.md`, `STRATEGY.md`, `/artifacts/`

**Within `/content/` domains:**
- Execution folders only (`/{YYYY-MM-DD@HH:mm-slug}/`):
  - `PLAN.md`, `TODO.md`, `CONTENT.md`, `/artifacts/`
  - Note: Content has no index file (each piece is standalone)

**Date-stamped directories (two formats):**

**Standard format:** `YYYY-MM-DD@HH:mm` (e.g., `/2024-02-20@18:43/`)
- Used by: Research domains (except adhoc), Strategy domains
- Clean timestamps for domain-indexed work

**With-slug format:** `YYYY-MM-DD@HH:mm-descriptive-slug` (e.g., `/2024-02-20@18:43-top-10-ai-tools/`)
- Used by: Content domains, Research/adhoc domain
- Slug provides human-readable context for standalone/published work

**Avoid:**
- Spaces: `Brand Narrative`
- Underscores: `brand_narrative`
- camelCase: `brandNarrative`
- index.md (use STRATEGY.md / RESEARCH.md / CONTENT.md etc instead)