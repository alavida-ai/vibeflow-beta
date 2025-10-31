# Agent File Structure Guide

**Context:** You are an agent working in the context of a file structure that follows the conventions of the Agentic Marketing Architecture Methodology (AMA). You must adhere to the AMA Methodology.

---

## The AMA Methodology

The Agentic Marketing Architecture consists of **two distinct frameworks**:

### 1. Agentic Framework (System Configuration)
Located in `/.claude/`, this framework defines the agent orchestration system:
- **Hooks** - SessionStart hook defines Operations Manager identity (replaces deprecated output styles)
- **Sub-agents** - Specialist agents (Analyst, Strategist, etc.)
- **Skills** - Reusable marketing workflows, and agentic-orchestration for agentic best practices
- **Commands** - Workflow triggers (`/plan`, `/implement`, etc.)

**Purpose:** Defines WHO (agents), WHAT (skills), and HOW (workflows) the system operates.

### 2. Marketing Framework (Content Architecture)
Located in `/brand/`, this is our **opinionated marketing framework** with three core base directories organized within a single brand folder (similar to an `src/` folder in development projects):

#### The Three-Layer Framework

```
/brand/
├── /research/     ← Pure, unopinionated factual gathering
│        ↓ synthesizes into
├── /strategy/     ← Strategic synthesis of research into actionable insights (the farmland)
│        ↓ guides creation of
└── /content/      ← System-generated outputs (the produce grown on that farmland)
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

The AMA methodology is built on principles that govern both frameworks:

---

### 1. Agentic Framework Principles

These principles govern how agents coordinate, execute workflows, and manage work visibility:

#### Agent Coordination & Delegation
- **Clear separation of concerns** - Operations Manager orchestrates, sub-agents specialize
- **Progressive task breakdown** - Complex work decomposed into manageable steps
- **Context-aware delegation** - Right work to right specialist based on domain expertise
- **Stateless execution** - Each agent works independently with clear inputs/outputs

**Result:** Efficient orchestration, appropriate specialization, scalable coordination

#### Workflow Execution (PLAN.md/TODO.md Pattern)
- **Plan before execution** - Complex work requires explicit PLAN.md for approval
- **Track progress transparently** - TODO.md updates show work in progress
- **Mark completion immediately** - Tasks marked done as soon as finished
- **One task in-progress** - Focus on current work, complete before moving forward
- **Timestamped execution folders** - All workflows executed within date-stamped folders for iteration tracking

**Result:** Visible work, manageable complexity, clear progress tracking, complete execution history

#### Progressive Disclosure: Load What's Needed, When Needed

Agents load exactly what they need for their task, avoiding context overflow:

**The Pattern:**
1. **Load base document** first (e.g., `STRATEGY.md` for core principles)
2. **Check for extensions** in subfolders if platform/audience-specific details needed
3. **Follow references** to load related files only when required
4. **Pass paths, not content** - Provide file references for agents to load progressively

**Example workflow:**
- Agent needs Twitter content → Loads `/brand/strategy/voice/STRATEGY.md` (base)
- Checks for Twitter-specific → Loads `/brand/strategy/voice/twitter/EXTENSION.md` (platform details)
- Needs brand themes → Loads `/brand/strategy/messaging/STRATEGY.md` (additional context)
- Total: 3 files instead of entire strategy directory

**Result:** Efficient token usage, focused context, scalable to large knowledge bases

**Full documentation:** See [agentic-orchestrating skill](.claude/skills/agentic-orchestrating/SKILL.md) for comprehensive guidance.

---

### 2. Marketing Framework Principles

These principles govern the organization and flow of marketing/brand work:

#### Organize by Concern, Navigate by Entry Point, Reference by Path

- **Logical separation** - `/brand/` contains three distinct layers: research, strategy, content
- **Entry point files** - UPPERCASE.md files (RESEARCH.md, STRATEGY.md, CONTENT.md) serve as indexes
- **Reference by path** - Files linked via markdown references, not duplicated
- **Domain organization** - Work organized into configurable domains within each base directory

**Example:** `/brand/strategy/voice/` (concern) → `STRATEGY.md` (index) → `/twitter/EXTENSION.md` (extension)

**Result:** Clear organization, easy navigation, no duplication

#### Progressive Disclosure: Pass Paths Not Content

- **Hierarchical information** - High-level first, details on demand
- **Load what's needed** - Agents read only files required for their specific task
- **Path-based references** - Guide to specific files rather than inlining everything
- **Extension pattern** - Platform-specific details extend base strategy (additive only)

**Result:** Efficient token usage, scalability, clear information architecture

#### Extension Pattern: Platform/Audience-Specific Additions

Extensions allow platform or audience-specific details to extend base strategy documents without duplication:

```
Parent STRATEGY.md + Child EXTENSION.md = Complete Context

Example:
/brand/strategy/voice/STRATEGY.md            # Base voice (like layout.tsx)
+ /brand/strategy/voice/twitter/EXTENSION.md # Twitter additions (like page.tsx)
= Complete Twitter voice guide

Note: EXTENSION.md only contains what's ADDITIONAL for that context
```

**Key principles:**
- Extensions are **additive only** - they extend, not replace
- Base STRATEGY.md contains universal principles
- EXTENSION.md contains platform/audience-specific details
- Pattern inspired by Next.js layouts (composition over duplication)

**Result:** No duplication, clear separation of universal vs specific, maintainable at scale

#### Temporal Execution Pattern with CHANGELOG Tracking

**All three base directories use temporal executions** with date-stamped folders:

- **Standard format:** `/YYYY-MM-DD@HH:mm/` (research domains, strategy domains)
- **With-slug format:** `/YYYY-MM-DD@HH:mm-descriptive-slug/` (content domains, research/adhoc)

**Execution → Index workflow:**
- Executions are temporal, iterative development work
- Index files are located at the domain level and represent current approved state
  - `/brand/research/{domain}/RESEARCH.md` = index file for domain
  - `/brand/research/{domain}/{YYYY-MM-DD@HH:mm}/RESEARCH.md` NOT index file for domain
- CHANGELOG.md tracks evolution of index over time
- Marketing Architect approves updates from execution to index


#### Verifiable Audit Trails: Every Claim Has Evidence

Markdown references allow for verifiable chains of evidence from content → strategy → research → data:

```
Content (Output)
    ↓ generated with
Strategy (Brand guidelines)
    ↓ references
Research (Insights)
    ↓ analyzed from
Raw Data (Source material)
```

**The audit trail:**
- **Strategy → Research** - Strategy claims link to research findings via `[text](/path/to/file.md)`
- **Research → Data** - Research findings reference raw data sources
- **Content → Strategy** - Content loads strategy as context in PLAN.md/TODO.md
- **Complete chain** - Content (uses Strategy) → Strategy (cites Research) → Research (analyzes Data)
- **Human + AI navigation** - Markdown references work for both people and agents

**Markdown Reference Format (REQUIRED):**

```markdown
[descriptive text](/path/to/file.md)
```

**Why this format:**
- Human-navigable (clickable in editors)
- Enables progressive disclosure for AI agents
- Consistent across all documents

**Important - Use Relative Paths:**
- ✅ Always use relative paths from workspace root: `/brand/research/{domain}/RESEARCH.md`
- ❌ Never use absolute file system paths: `/Users/name/project/brand/research/{domain}/RESEARCH.md`
- Relative paths enable seamless collaboration when Marketing Architects clone the repository

**Example:**
```markdown
Our customers are drowning in [complex tools that overwhelm them](/brand/research/customer-insights/RESEARCH.md).
```

**Result:** Defensible strategy, traceable content, transparent reasoning, verifiable claims

---

## Workspace Architecture

```
/workspace-root/
├── .claude/                          ← Agentic Framework: System behavior & capabilities
│   ├── output-styles/                ← Primary agent definitions
│   ├── agents/                       ← Sub-agent specialists
│   ├── skills/                       ← Reusable workflows (see agentic-orchestrating skill)
│   └── commands/                     ← Workflow triggers (/plan, /implement)
│
├── /brand/                           ← Marketing Framework: All brand/marketing work (like src/)
│   │
│   ├── /research/                    ← Input: Unopinionated factual gathering
│   │   ├── /{domain}/                ← e.g., category-landscape, customer-insight
│   │   │   ├── RESEARCH.md           ← Index: accumulated knowledge (MA approved)
│   │   │   ├── CHANGELOG.md          ← Tracks evolution of findings
│   │   │   ├── /{YYYY-MM-DD@HH:mm}/  ← Standard execution folders
│   │   │   │   ├── PLAN.md
│   │   │   │   ├── TODO.md
│   │   │   │   ├── RESEARCH.md
│   │   │   │   └── /artifacts/
│   │   │   └── /data/                ← Raw materials (transcripts, surveys, reports)
│   │   └── /adhoc/                   ← Special: standalone research
│   │       └── /{YYYY-MM-DD@HH:mm-slug}/
│   │           ├── PLAN.md
│   │           ├── TODO.md
│   │           ├── RESEARCH.md
│   │           └── /artifacts/
│   │
│   ├── /strategy/                    ← Processing: Strategic synthesis
│   │   └── /{domain}/                ← e.g., positioning, voice, messaging, audience
│   │       ├── STRATEGY.md           ← Index: current approved strategy (MA approved)
│   │       ├── CHANGELOG.md          ← Tracks evolution of strategy
│   │       ├── /{YYYY-MM-DD@HH:mm}/  ← Execution folders (iterative development)
│   │       │   ├── PLAN.md
│   │       │   ├── TODO.md
│   │       │   ├── STRATEGY.md       ← Strategy synthesized in this execution
│   │       │   └── /artifacts/
│   │       └── /{extension}/         ← Optional: platform/audience-specific extensions
│   │           └── EXTENSION.md      ← Extends parent STRATEGY.md (additive only)
│   │
│   └── /content/                     ← Output: Final deliverables
│       └── /{type}/                  ← e.g., blog-posts, twitter-posts, linkedin-posts
│           └── /{YYYY-MM-DD@HH:mm-slug}/
│               ├── PLAN.md
│               ├── TODO.md
│               ├── CONTENT.md
│               └── /artifacts/
│
├── .mcp.json                         ← Tool integrations (MCP server config)
├── CLAUDE.md                         ← This file (agent structural guide)
└── MANIFESTO.md                      ← System philosophy and vision
```

### Directory Characteristics

| Directory | Purpose | Key Trait |
|-----------|---------|-----------|
| `/.claude/` | Agentic Framework | Defines WHO (agents), WHAT (skills), HOW (workflows) |
| `/brand/` | Marketing Framework Container | Like `src/` for development - contains all brand/marketing work |
| `/brand/research/` | Marketing Framework: Input | Temporal (date-stamped), unopinionated factual gathering, preserves historical context |
| `/brand/strategy/` | Marketing Framework: Processing | Temporal (date-stamped), iterative refinement, synthesizes research, references research |
| `/brand/content/` | Marketing Framework: Output | Temporal (date-stamped) with slug, strategy-guided, final deliverables |

### Information Flow (Marketing Framework)

```
/brand/research/{domain}/{YYYY-MM-DD@HH:mm}/          ← Research executions (temporal)
         ↓ updates
/brand/research/{domain}/RESEARCH.md                  ← Research index (accumulated knowledge, MA approved)
         ↓ synthesizes into (via execution)
/brand/strategy/{domain}/{YYYY-MM-DD@HH:mm}/          ← Strategy executions (iterative development)
         ↓ updates
/brand/strategy/{domain}/STRATEGY.md                  ← Strategy index (current approved strategy, MA approved)
         ↓ guides every
/brand/content/{type}/{YYYY-MM-DD@HH:mm-slug}/        ← Content creation (strategy as context)
```

**Key Rules:**
- Context flow: Research → Strategy → Content (never skip layers)
- Each layer has **executions** (temporal, iterative) and an **index** (approved, current state)
- Strategy synthesis reads from research index RESEARCH.md (not research executions)
- Strategy development happens in executions, approved versions become the index
- Content generated from strategy index (not strategy executions or research directly)
- Extensions extend (not replace) parent STRATEGY.md (e.g., `/brand/strategy/voice/twitter/EXTENSION.md`)

---

## Entry Point Files

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/brand/strategy/{domain}/STRATEGY.md` | Index: current approved strategy |
| `RESEARCH.md` | `/brand/research/{domain}/RESEARCH.md` | Index: accumulated research knowledge |
| `CONTENT.md` | `/brand/content/{type}/{timestamp-slug}/CONTENT.md` | Final content to review/publish |
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

**Note:** For detailed workflow execution guidance, see the **agentic-orchestrating skill** at `.claude/skills/agentic-orchestrating/`.

---

## Naming Conventions & Quick Reference

### File Naming Rules

#### Date-stamped Directories

**Standard format:** `YYYY-MM-DD@HH:mm` (e.g., `/2024-02-20@18:43/`)
- Used by: Research domains (except adhoc), Strategy domains
- Clean timestamps for domain-indexed work

**With-slug format:** `YYYY-MM-DD@HH:mm-descriptive-slug` (e.g., `/2024-02-20@18:43-top-10-ai-tools/`)
- Used by: Content domains, Research/adhoc domain
- Slug provides human-readable context for standalone/published work

#### Naming Conventions to Avoid

**Do not use:**
- Spaces: `Brand Narrative`
- Underscores: `brand_narrative`
- camelCase: `brandNarrative`
- Generic names: `index.md` (use STRATEGY.md / RESEARCH.md / CONTENT.md etc instead)

**Instead use:**
- Kebab-case for folders/slugs: `brand-narrative`
- UPPERCASE.md for entry files: `STRATEGY.md`, `RESEARCH.md`, `CONTENT.md`


## Navigation Heuristics

**Need current approved strategy?**
→ Start: `/brand/strategy/{domain}/STRATEGY.md` (index with current approved strategy)
→ Optional: Read extension if available from reference in `STRATEGY.md`, e.g., "View specific guidelines for: [twitter](twitter/EXTENSION.md)"

**Need strategy development context?**
→ Look in: `/brand/strategy/{domain}/{YYYY-MM-DD@HH:mm}/` (execution folders show iteration history)

**Need research findings?**
→ Start: `/brand/research/{domain}/RESEARCH.md` (index with accumulated knowledge)

**Need research execution context?**
→ Look in: `/brand/research/{domain}/{YYYY-MM-DD@HH:mm}/` (execution folders preserve historical findings)

**Need adhoc research?**
→ Look in: `/brand/research/adhoc/{YYYY-MM-DD@HH:mm-slug}/` (standalone research not tied to domains)

**Need evidence for a claim?**
→ Follow markdown reference links: Strategy Index → Research Index → Raw data

**Building new strategy?**
→ Read research index → Create strategy execution → Iterate → Approve to index