# Agent File Structure Guide

**Purpose:** Technical reference guide for AI agents working within the Agentic Marketing Architecture. This document provides authoritative specifications for file organization, naming conventions, directory structure, and navigation patterns.

**Scope:** Structural and organizational guidance only—no behavioral instructions for agent conduct or communication.

---

## Table of Contents

1. [Complete Directory Structure](#complete-directory-structure)
2. [Directory Purposes](#directory-purposes)
3. [File Naming Conventions](#file-naming-conventions)
4. [Progressive Disclosure Pattern](#progressive-disclosure-pattern)
5. [Temporal Research Pattern](#temporal-research-pattern)
6. [Three-Folder Pattern](#three-folder-pattern)
7. [Audit Trail Pattern](#audit-trail-pattern)
8. [File Path Examples](#file-path-examples)
9. [Quick Reference](#quick-reference)
10. [Glossary](#glossary)

---

## Complete Directory Structure

```
/workspace-root/
├── .claude/                          ← Architecture configuration
│   ├── output-styles/                ← Primary agent behavior
│   ├── agents/                       ← Sub-agent definitions
│   ├── skills/                       ← Reusable capabilities
│   └── commands/                     ← Workflow triggers
│
├── /strategy/                        ← Brand bible (polished, client-ready)
│   ├── STRATEGY.md                   ← Progressive disclosure entry point
│   ├── /core/                        ← Foundational brand elements
│   ├── /messaging/                   ← Value props, pillars
│   ├── /voice/                       ← Tone guidelines
│   └── /audience/                    ← Personas, psychographics
│
├── /research/                        ← Research domains (temporal, raw)
│   ├── /{domain}/                    ← Research domain (e.g., category-landscape)
│   │   ├── RESEARCH.md               ← Progressive disclosure guide
│   │   ├── /data/                    ← Input materials
│   │   ├── /execution/               ← Temporal research runs
│   │   │   └── /{YYYY-MM-DD}/        ← Date-stamped execution
│   │   │       ├── PLAN.md
│   │   │       ├── TODO.md
│   │   │       └── notes.md
│   │   └── /exports/                 ← Deliverables
│   │
├── /docs/                            ← Architecture documentation
│
├── .mcp.json                         ← Tool integrations (MCP config)
├── .env                              ← API keys (not committed)
├── .env.example                      ← API key template (committed)
├── CLAUDE.md                         ← This file
└── MANIFESTO.md                      ← Philosophy and vision
```

---

## Directory Purposes

### /.claude/ (Architecture Configuration)

**Purpose:** Defines the system's behavior and capabilities

**Structure:**
```
.claude/
├── output-styles/
│   └── marketing-operations-manager.md  ← Primary agent system prompt
│
├── agents/
│   ├── brand-analyst.md                 ← Sub-agent: Research specialist
│   ├── content-writer.md                ← Sub-agent: Content specialist
│   └── campaign-strategist.md           ← Sub-agent: Campaign specialist
│
├── skills/
│   ├── conducting-market-research/
│   │   ├── SKILL.md                     ← Entry point
│   │   ├── competitive-analysis.md
│   │   └── customer-research.md
│   │
│   ├── writing-brand-consistent-content/
│   │   ├── SKILL.md
│   │   ├── voice-guidelines.md
│   │   └── content-types/
│   │
│   └── orchestrating-projects/          ← Core skill
│       └── SKILL.md
│
└── commands/
    ├── /onboarding/                     ← Domain: Onboarding workflows
    │   ├── build-messaging.md
    │   └── discover-brand-story.md
    │
    └── /campaigns/                      ← Domain: Campaign workflows
        └── launch-sequence.md
```

**Ownership:**
- Infrastructure team: `output-styles/`, core `skills/`, meta commands
- Marketing architects: `agents/`, domain `skills/`, domain `commands/`

**Key characteristics:**
- Defines the org chart implementation
- Contains system prompts and behavior definitions
- Specifies reusable workflows and capabilities

---

### /strategy/ (Brand Bible)

**Purpose:** Polished, client-ready brand strategy that agents reference for brand consistency

**Structure:**
```
strategy/
├── STRATEGY.md                        ← Entry point (progressive disclosure)
│
├── /core/
│   ├── narrative.md                   ← Brand story (tension, belief, promise)
│   └── positioning.md                 ← Market position
│
├── /messaging/
│   ├── pillars.md                     ← Core brand themes
│   └── value-propositions.md          ← Value props by audience
│
├── /voice/
│   ├── tone-guidelines.md             ← Voice principles
│   └── vocabulary.md                  ← Approved/banned terms
│
└── /audience/
    └── personas/
        ├── agency-owner.md
        └── in-house-marketer.md
```

**Characteristics:**
- **Polished:** Client-facing quality
- **Timeless:** Not date-stamped (evolves via version control)
- **Backed by research:** Footnotes reference `/research/`
- **Progressive disclosure:** STRATEGY.md guides to specific files

**Example footnote format:**
```markdown
[^productivity-paradox]: Customer research (William),
`/research/discover-customer-insight/execution/2025-10-15/insights.md:42`
```

---

### /research/ (Research Domains)

**Purpose:** Temporal research that backs up strategy and provides ongoing insights

**Structure:**
```
research/
├── /category-landscape/               ← Research domain
│   ├── RESEARCH.md                    ← Progressive disclosure guide
│   │
│   ├── /data/                         ← Input materials
│   │   ├── transcripts/
│   │   ├── surveys/
│   │   └── datasets/
│   │
│   ├── /execution/                    ← Temporal research runs
│   │   ├── /2025-10-20/               ← First research run
│   │   │   ├── PLAN.md
│   │   │   ├── TODO.md
│   │   │   └── analyst-notes.md
│   │   │
│   │   └── /2025-10-25/               ← Follow-up research
│   │       ├── PLAN.md
│   │       ├── TODO.md
│   │       └── updated-analysis.md
│   │
│   └── /exports/                      ← Deliverables
│       └── final-report.md
│
└── /competitor-analysis/              ← Another research domain
    └── ... (same structure)
```

**Why date-stamped executions:**
- Research is temporal—markets change, competitors evolve
- Can compare `/2025-10-20/` vs `/2025-10-25/` to see evolution
- Historical context preserved (not overwritten)
- Multiple runs enable trend analysis

---

### /docs/ (Architecture Documentation)

**Purpose:** Documentation for the Agentic Marketing Architecture system itself

**Contains:**
- System architecture documentation
- Layer descriptions (Marketing Architect, Operations Manager, etc.)
- Workflow patterns (Plan/Implement, Research, Content Generation)
- Reference materials (Principles, Ownership, Roadmap)

**Note:** This is meta-documentation about the system, not brand strategy or research.

---

## File Naming Conventions

### General Rules

**✅ Use kebab-case for regular files:**
- `brand-narrative.md`
- `value-propositions.md`
- `agency-owner-persona.md`
- `customer-insights-analysis.md`

**❌ Avoid:**
- `Brand Narrative.md` (spaces)
- `brand_narrative.md` (underscores)
- `brandNarrative.md` (camelCase)

### Special Files (UPPERCASE.md)

**Entry point files use UPPERCASE.md naming:**
- `STRATEGY.md` - Entry point for strategy directory
- `RESEARCH.md` - Entry point for research domain
- `SKILL.md` - Entry point for skill directory
- `PLAN.md` - Planning document for execution
- `TODO.md` - Progress tracking document

**Purpose:** These files serve as "tables of contents" that guide navigation using the progressive disclosure pattern.

### Date-Stamped Directories

**Use YYYY-MM-DD format for temporal executions:**
- `/execution/2025-10-20/`
- `/execution/2025-11-15/`
- `/execution/2025-12-10/`

**❌ Avoid:**
- `/execution/first-run/` (not temporal)
- `/execution/latest/` (gets overwritten)
- `/execution/v1/` (not clear when it happened)
- `/execution/10-20-2025/` (wrong date format)

---

## Progressive Disclosure Pattern

**Concept:** Information is organized hierarchically so agents can load exactly what they need, when they need it, without overwhelming context limits.

### How It Works

1. **Entry point file** (UPPERCASE.md) provides overview and navigation
2. **Agent reads entry point** to understand what's available
3. **Agent loads specific files** based on task requirements
4. **Agent references only needed context** instead of loading everything

### Entry Point Files

#### STRATEGY.md

**Location:** `/strategy/STRATEGY.md`

**Purpose:** Guide agents to relevant strategy files

**Standard sections:**
```markdown
# Brand Strategy

## Overview
[Brief description of brand strategy]

## Quick Navigation

### Need brand voice?
See: `/voice/tone-guidelines.md`

### Need messaging themes?
See: `/messaging/pillars.md`

### Need brand narrative?
See: `/core/narrative.md`

### Need positioning?
See: `/core/positioning.md`

### Need audience personas?
See: `/audience/personas/`

## Using This Strategy

[Guidance on when to reference which files]

## Validation Status
Last updated: [Date]
Backed by research in: [Research domain paths]

## Related Research
[Links to research domains that inform this strategy]
```

#### RESEARCH.md

**Location:** `/research/{domain}/RESEARCH.md`

**Purpose:** Guide agents to relevant research within a domain

**Standard sections:**
```markdown
# Research: [Domain Name]

**Domain:** [Brief description]
**Last Updated:** [Date]

## Overview
[1-2 paragraphs explaining scope and purpose]

## Current State

**Latest execution:** [Link to most recent run]
**Status:** [Active | Archived | In Progress]
**Key findings:** [Bullet points from latest run]

## Research Runs

### Active
- **[2025-11-15]** - [Description] - [Link to execution]

### Historical
- **[2025-10-20]** - [Description] - [Link to execution]

## Data Sources

**Location:** `/research/{domain}/data/`

**Available data:**
- [Data type] - [Description] - [Last updated]

## Exported Deliverables

**Location:** `/research/{domain}/exports/`

**Available reports:**
- [Report name] - [Date] - [Link]

## How This Research Informs Strategy

**Referenced in:**
- [Strategy file path] - [Which claims reference this]

## Related Research Domains
- [Related domain] - [How it connects]
```

#### SKILL.md

**Location:** `.claude/skills/{skill-name}/SKILL.md`

**Purpose:** Define skill capabilities and usage

**Standard sections:**
```markdown
# Skill: [Skill Name]

## Purpose
[What this skill enables]

## When to Use
[Scenarios where this skill applies]

## Prerequisites
[Required context, files, or tools]

## Process
[Step-by-step methodology]

## Outputs
[What this skill produces]

## Related Skills
[Connected capabilities]
```

### Benefits of Progressive Disclosure

**Efficiency:**
- Agents load only necessary context
- Reduced token usage
- Faster response times

**Quality:**
- Agents understand information hierarchy
- Clear navigation prevents guessing
- Reduces hallucination risk

**Scalability:**
- System can grow without overwhelming agents
- New domains added without context bloat
- Maintains performance as content expands

---

## Temporal Research Pattern

**Concept:** Research is time-stamped and preserved to enable historical comparison and trend analysis.

### Date-Stamped Executions

**Format:** `/research/{domain}/execution/{YYYY-MM-DD}/`

**Example:**
```
/research/competitor-analysis/execution/
├── /2025-10-01/  ← Q4 start
├── /2025-11-01/  ← Month 2
├── /2025-12-01/  ← Month 3
└── /2026-01-01/  ← Q1 start
```

### Why Temporal

**Research evolves over time:**
- Markets shift
- Competitors change positioning
- Customer needs evolve
- Industry trends emerge

**Temporal pattern enables:**
- Historical comparison (October vs November)
- Trend analysis (acceleration/deceleration)
- Context preservation (why decisions were made)
- Evidence trail (what we knew when)

### Execution Run Contents

**Each dated execution contains:**
- `PLAN.md` - Research approach and objectives
- `TODO.md` - Progress tracking
- Analysis files (notes, findings, insights)
- Supporting documents specific to that run

**Example:**
```
/research/customer-insight/execution/2025-10-20/
├── PLAN.md
├── TODO.md
├── interview-analysis.md
├── themes-identified.md
└── findings.md
```

### Comparing Temporal Runs

**Agents can reference multiple execution dates:**
```markdown
# Comparison: October 2025 vs November 2025

## What Changed

**October findings:**
- Pain point: Complex onboarding (8/10 customers)

**November findings:**
- Pain point: Complex onboarding (5/10 customers)
- NEW: Integration challenges (7/10 customers)

## Interpretation
Customer pain shifted from onboarding to integrations,
suggesting onboarding improvements are working.
```

---

## Three-Folder Pattern

**Concept:** Research domains follow Input → Process → Output structure for clear information flow.

### The Three Folders

```
/research/{domain}/
├── /data/       ← INPUT: Raw materials
├── /execution/  ← PROCESS: Research runs
└── /exports/    ← OUTPUT: Deliverables
```

### 1. /data/ (Input)

**Purpose:** Store raw materials that research will analyze

**Contains:**
- Customer interview transcripts
- Survey data (CSV, JSON)
- Competitor documents
- Market reports (PDFs)
- User feedback
- Source datasets

**Characteristics:**
- Static (doesn't change during research)
- Organized by type or source
- Referenced by execution runs
- Preserved as-is (originals not modified)

**Example structure:**
```
/research/customer-insight/data/
├── /interviews/
│   ├── customer-001-transcript.md
│   ├── customer-002-transcript.md
│   └── customer-003-transcript.md
├── /surveys/
│   └── q4-satisfaction-survey.csv
└── /feedback/
    └── support-tickets-oct-2025.json
```

### 2. /execution/ (Process)

**Purpose:** Date-stamped research runs where work happens

**Contains:**
- `PLAN.md` (research approach)
- `TODO.md` (progress tracking)
- Working notes
- Analysis files
- Findings documents

**Naming:** `/execution/{YYYY-MM-DD}/`

**Characteristics:**
- Temporal (each run is date-stamped)
- Complete (includes plan, process, findings)
- Preserves context (notes show reasoning)
- Never overwritten (new dates for new runs)

**Example structure:**
```
/research/customer-insight/execution/
├── /2025-10-20/
│   ├── PLAN.md
│   ├── TODO.md
│   ├── notes.md
│   └── findings.md
└── /2025-11-15/
    ├── PLAN.md
    ├── TODO.md
    ├── comparison-to-oct.md
    └── findings.md
```

### 3. /exports/ (Output)

**Purpose:** Polished, client-ready deliverables

**Contains:**
- Final reports
- Presentation decks
- Executive summaries
- Data visualizations
- Deliverable assets

**Characteristics:**
- Polished (client-facing quality)
- Versioned by source execution
- May synthesize multiple runs
- Various formats (PDF, PPTX, MD)

**Example structure:**
```
/research/customer-insight/exports/
├── customer-insight-report-2025-10-20.pdf
├── customer-insight-report-2025-11-15.pdf
├── executive-summary-q4-2025.md
└── trend-analysis-oct-dec-2025.pdf
```

### Information Flow

```
/data/ (Input)
    ↓ analyzed by
/execution/{date}/ (Process)
    ↓ produces
/exports/ (Output)
    ↓ informs
/strategy/ (Brand Bible)
```

---

## Audit Trail Pattern

**Concept:** Create verifiable chains of evidence from content → strategy → research → data.

### The Chain

```
Layer 1: Content (Output)
    ↓ references
Layer 2: Strategy (Brand guidelines)
    ↓ references (footnotes)
Layer 3: Research (Insights)
    ↓ analyzed from
Layer 4: Raw Data (Source material)
```

### How to Create Audit Trails

**In strategy files, use footnotes:**
```markdown
Our customers struggle with productivity tools that add
complexity instead of reducing it.[^productivity-paradox]

[^productivity-paradox]: Customer research,
`/research/customer-insight/execution/2025-10-21/findings.md:42`
```

**Footnote format:**
```
[^reference-name]: [Context description],
`/path/to/file.md:line-number`
```

### Complete Example

**1. Raw Data:**
```
/research/customer-insight/data/interviews/customer-005.md:

"I tried 3 different productivity tools and they all made
my life MORE complicated."
```

**2. Research Finding:**
```
/research/customer-insight/execution/2025-10-21/findings.md:42

Pattern identified: 8 out of 10 customers described existing
tools as "adding complexity" rather than reducing it.
```

**3. Strategy Claim:**
```
/strategy/messaging/value-propositions.md:

Our customers are drowning in complex tools that promise
simplicity but deliver confusion.[^productivity-paradox]

[^productivity-paradox]: Customer research,
`/research/customer-insight/execution/2025-10-21/findings.md:42`
```

**4. Content Output:**
```
Blog post:

"Tired of productivity tools that add more work to your plate?
You're not alone. We built [Product] differently—no complex
setup, just the simplicity you actually need."
```

### Benefits

**Verifiability:**
- Every claim can be traced to evidence
- Strategy is defensible
- No made-up assertions

**Quality:**
- Prevents generic AI outputs
- Ensures brand consistency
- Creates specificity and credibility

**Visibility:**
- Research is utilized, not lost
- Clear lineage of every claim
- Transparent decision-making

---

## File Path Examples

### Strategy Files

**Correct placement:**
```
/strategy/core/narrative.md
/strategy/core/positioning.md
/strategy/messaging/pillars.md
/strategy/messaging/value-propositions.md
/strategy/voice/tone-guidelines.md
/strategy/voice/vocabulary.md
/strategy/audience/personas/agency-owner.md
/strategy/audience/personas/in-house-marketer.md
```

### Research Files

**Correct placement:**
```
/research/category-landscape/RESEARCH.md
/research/category-landscape/data/reports/industry-report-2025.pdf
/research/category-landscape/execution/2025-10-20/PLAN.md
/research/category-landscape/execution/2025-10-20/TODO.md
/research/category-landscape/execution/2025-10-20/findings.md
/research/category-landscape/exports/landscape-report-2025-10-20.pdf
```

### Configuration Files

**Correct placement:**
```
.claude/output-styles/marketing-operations-manager.md
.claude/agents/brand-analyst.md
.claude/agents/content-writer.md
.claude/skills/conducting-market-research/SKILL.md
.claude/skills/conducting-market-research/competitive-analysis.md
.claude/commands/onboarding/build-messaging.md
.claude/commands/campaigns/launch-sequence.md
```

### Work Visibility Files

**Correct placement:**
```
/research/competitor-analysis/execution/2025-10-21/PLAN.md
/research/competitor-analysis/execution/2025-10-21/TODO.md
```

### References Between Files

**From strategy to research:**
```markdown
In /strategy/messaging/value-propositions.md:

See customer research[^customer-insight]

[^customer-insight]:
`/research/customer-insight/execution/2025-10-15/findings.md:42`
```

**From RESEARCH.md to execution:**
```markdown
In /research/category-landscape/RESEARCH.md:

Latest research: See `/execution/2025-10-25/findings.md`
```

**From STRATEGY.md to specific files:**
```markdown
In /strategy/STRATEGY.md:

For brand voice guidelines: See `/voice/tone-guidelines.md`
For messaging pillars: See `/messaging/pillars.md`
```

---

## Quick Reference

### Directory Lookup

| Directory | Purpose | Characteristics |
|-----------|---------|----------------|
| `/.claude/` | System configuration | Owned by infra/architects |
| `/strategy/` | Brand bible | Polished, timeless, footnoted |
| `/research/` | Research domains | Temporal, raw, date-stamped |
| `/docs/` | System documentation | Architecture reference |

### Naming Rules

| File Type | Convention | Examples |
|-----------|-----------|----------|
| Regular files | kebab-case | `brand-narrative.md`, `value-props.md` |
| Entry points | UPPERCASE.md | `STRATEGY.md`, `RESEARCH.md`, `SKILL.md` |
| Work tracking | UPPERCASE.md | `PLAN.md`, `TODO.md` |
| Temporal dirs | YYYY-MM-DD | `/execution/2025-10-20/` |

### Entry Point Files

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/strategy/STRATEGY.md` | Navigate brand strategy |
| `RESEARCH.md` | `/research/{domain}/RESEARCH.md` | Navigate research domain |
| `SKILL.md` | `.claude/skills/{skill}/SKILL.md` | Define skill capabilities |
| `PLAN.md` | `/execution/{date}/PLAN.md` | Document approach |
| `TODO.md` | `/execution/{date}/TODO.md` | Track progress |

### Three-Folder Pattern

| Folder | Purpose | Contents |
|--------|---------|----------|
| `/data/` | Input | Raw materials, transcripts, datasets |
| `/execution/` | Process | Date-stamped research runs |
| `/exports/` | Output | Polished deliverables, reports |

### Common Patterns

**Research domain setup:**
```bash
/research/{domain-name}/
├── RESEARCH.md
├── /data/
├── /execution/
└── /exports/
```

**Temporal execution:**
```bash
/research/{domain}/execution/{YYYY-MM-DD}/
├── PLAN.md
├── TODO.md
└── [analysis files]
```

**Strategy organization:**
```bash
/strategy/{category}/
├── [files in kebab-case]
```

**Skill organization:**
```bash
.claude/skills/{skill-name}/
├── SKILL.md
└── [supporting files]
```

---

## Glossary

### Architectural Terms

**Agentic Marketing Architecture**
A practice of building and owning marketing AI infrastructure, using layered agents, structured context, and version-controlled workflows instead of renting SaaS tools.

**Context Architecture**
The structured organization of brand, strategy, and research files that agents reference to maintain consistency. The finite resource that separates brand-consistent outputs from AI slop.

**Information Hierarchy**
The structured relationship between files and directories, flowing from raw data → research → strategy → content, with clear dependencies and references.

**Marketing Architect**
Human role that designs, builds, and operates the marketing system. Not a "tool user" but a systems designer who owns infrastructure.

**Operations Manager**
Primary AI agent that orchestrates work, ensures compliance, delegates to sub-agents, and makes work visible through PLAN.md and TODO.md.

**Progressive Disclosure**
Pattern where information is organized hierarchically so agents load only what's needed, using entry point files (UPPERCASE.md) to guide navigation.

**Sub-agent**
Specialized AI agent that handles specific domains (Brand Analyst, Content Writer, Campaign Strategist), working below the Operations Manager in the org chart.

**Temporal Execution**
Pattern where work is date-stamped (YYYY-MM-DD) to preserve historical context, enable comparison over time, and prevent overwriting previous insights.

### Structural Terms

**Audit Trail**
Chain of references from content → strategy → research → data, enabling verification of claims and creating accountability for assertions.

**Entry Point File**
UPPERCASE.md file that serves as table of contents for a directory or domain (STRATEGY.md, RESEARCH.md, SKILL.md), guiding agents to relevant files.

**Execution Run**
Date-stamped instance of research work within a domain, containing PLAN.md, TODO.md, and analysis files. Located in `/research/{domain}/execution/{YYYY-MM-DD}/`.

**Research Domain**
Organized area of investigation (e.g., category-landscape, competitor-analysis) following the three-folder pattern: data/execution/exports.

**Three-Folder Pattern**
Structural pattern for research domains: /data/ (input materials), /execution/ (date-stamped research runs), /exports/ (deliverables).

**Work Visibility Files**
PLAN.md (approach before execution) and TODO.md (progress during execution) that make work transparent and trackable.

### File Types

**Brand Bible**
The `/strategy/` directory containing polished, client-ready brand strategy files (narrative, positioning, messaging, voice) that agents reference for consistency.

**Footnote Reference**
Markdown footnote in strategy files linking claims to research evidence, format: `[^name]: Description, \`/path/to/file.md:line\``

**PLAN.md**
Planning document created before complex work begins, outlining objective, approach, resources (skills/agents/files/tools), and estimated effort.

**RESEARCH.md**
Entry point file for a research domain, providing overview, navigation to execution runs, data sources, exports, and strategy connections.

**SKILL.md**
Entry point file for a skill directory, defining purpose, usage, prerequisites, process, and outputs of the capability.

**STRATEGY.md**
Entry point file for the strategy directory, providing quick navigation to brand voice, messaging, narrative, positioning, and audience files.

**TODO.md**
Progress tracking document created during execution, showing completed tasks, work in progress, pending items, progress percentage, and blockers.

### Pattern Terms

**Date-Stamped Directory**
Directory named with YYYY-MM-DD format, used for temporal executions: `/execution/2025-10-20/`

**Domain Command**
Reusable workflow trigger stored in `.claude/commands/{domain}/`, defining predefined steps for recurring tasks.

**Kebab-Case**
Naming convention using lowercase letters with hyphens: `brand-narrative.md`, `value-propositions.md`

**Marketing Debt**
Accumulated technical debt from orphaned files, inconsistent outputs, lost research, and poor organization. Prevented by structured file architecture.

**One-Way Dependency**
Architectural principle where layers reference "down" the hierarchy (agents reference skills, strategy references research) but not up, preventing circular dependencies.

**Skill**
Reusable capability that agents can invoke to perform specialized work (Conducting Market Research, Writing Brand-Consistent Content).

**Temporal Pattern**
Organizing work by date to preserve historical context and enable comparison over time. Used in research executions: `/execution/{YYYY-MM-DD}/`

### Workflow Terms

**Implementation**
Execution phase after plan approval, where TODO.md tracks progress and work is systematically completed.

**Plan/Implement Pattern**
Workflow where Operations Manager creates PLAN.md before starting work, gets approval, then creates TODO.md during implementation for visibility.

**Research Workflow**
Systematic approach to conducting temporal research: define domain → add data → run dated execution → export deliverables → reference in strategy.

**Strategy-Research Connection**
Relationship where strategy files contain footnotes referencing research files, creating audit trail and ensuring claims are evidence-based.

---

## Notes for Agents

**When navigating the file structure:**
1. Always start with entry point files (STRATEGY.md, RESEARCH.md)
2. Load specific files based on task requirements
3. Use progressive disclosure to manage context efficiently
4. Reference temporal executions by date for historical context

**When creating new files:**
1. Use kebab-case for regular files
2. Use UPPERCASE.md for entry points only
3. Place files in appropriate directories per this guide
4. Follow the three-folder pattern for research domains

**When referencing files:**
1. Use audit trail pattern (footnotes with file paths)
2. Include line numbers when referencing specific content
3. Maintain clear chain from data → research → strategy
4. Create verifiable, defensible claims

**When organizing research:**
1. Always date-stamp execution runs (YYYY-MM-DD)
2. Never overwrite previous executions
3. Keep data/execution/exports folders separate
4. Create RESEARCH.md for each domain

**This guide is authoritative for file structure decisions.** When in doubt about placement, naming, or organization, consult this document.

---

*Last updated: 2025-10-22*
