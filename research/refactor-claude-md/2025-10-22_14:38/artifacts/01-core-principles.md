# Core Architectural Principles

These principles govern all file structure and organizational decisions in the Agentic Marketing Architecture.

## 1. Organize by Concern, Navigate by Entry Point, Reference by Path

**What it means:**
- Directory structure reflects logical separation (strategy vs research vs configuration)
- UPPERCASE.md files serve as navigation tables of contents
- Files are referenced by path, not duplicated across locations

**Enables:**
- Clear boundaries between polished strategy and raw research
- Agents can quickly find what they need without searching
- Single source of truth for every piece of information

**Example:**
```
/strategy/     ← Concern: Brand bible
  STRATEGY.md  ← Entry point: Navigation guide
    → points to /messaging/pillars.md  ← Reference: Specific file
```

---

## 2. Progressive Disclosure: Pass Paths Not Content

**What it means:**
- Information is hierarchical—overview first, details on demand
- Agents load only the files they need for their specific task
- Entry points guide to specific files rather than inlining everything

**Enables:**
- Efficient token usage (load what you need)
- Scalability (system can grow without context bloat)
- Clear information architecture (hierarchy prevents confusion)

**Example:**
Instead of loading all strategy files, agent reads `STRATEGY.md` which says:
"Need brand voice? → `/voice/tone-guidelines.md`"

---

## 3. Temporal Elements Get Date-Stamped, Timeless Elements Use Version Control

**What it means:**
- Research is time-stamped (`/2025-10-20/`) because markets and insights evolve
- Strategy is versioned through git because it's polished, not experimental
- Temporal folders preserve historical context for comparison

**Enables:**
- Trend analysis (compare October vs November findings)
- Evidence preservation (what we knew when)
- Clear distinction between "work in progress" and "source of truth"

**Example:**
```
/research/competitor-analysis/
  /2025-10-01/  ← Q4 snapshot
  /2025-11-01/  ← Can compare: what changed?

/strategy/messaging/pillars.md  ← Evolves via git commits
```

---

## 4. Input → Process → Output (Three-Folder Pattern)

**What it means:**
- Research domains follow clear information flow
- `/data/` contains raw inputs (transcripts, surveys)
- `/{YYYY-MM-DD}/` is where analysis happens
- `/exports/` holds polished deliverables

**Enables:**
- Clear data provenance (where did this insight come from?)
- Separation of raw vs analyzed vs delivered
- Agents know exactly where to look for each stage

**Example:**
```
/data/interviews/customer-005.md  ← INPUT
    ↓ analyzed in
/2025-10-21/findings.md          ← PROCESS
    ↓ produces
/exports/customer-report.pdf     ← OUTPUT
```

---

## 5. Verifiable Audit Trails: Every Claim Has Evidence

**What it means:**
- Strategy claims link back to research findings via footnotes
- Research findings reference raw data sources
- Complete chain: Content → Strategy → Research → Raw Data

**Enables:**
- Defensible strategy (not generic AI assertions)
- Research utilization (insights aren't lost)
- Transparency (can verify every claim)

**Example:**
```markdown
Strategy claim:
"Customers struggle with tool complexity"[^productivity-paradox]

[^productivity-paradox]: Customer research,
`/research/customer-insight/2025-10-21/findings.md:42`
```

---

## Decision-Making Heuristics

These principles enable agents to make structural decisions without exhaustive rules:

**When deciding where a file belongs:**
- Is it polished and client-ready? → `/strategy/`
- Is it research or investigation? → `/research/{domain}/`
- Does it define system behavior? → `/.claude/`

**When deciding if something needs a date:**
- Does it change over time (research, market data)? → Date-stamp it
- Is it a polished deliverable (strategy, documentation)? → Version control

**When deciding how to structure information:**
- Will this be referenced frequently? → Create entry point (UPPERCASE.md)
- Does it flow through stages? → Use three-folder pattern
- Should claims be verifiable? → Add footnotes to research

**When deciding what context to load:**
- Start with entry point (UPPERCASE.md)
- Load only files needed for current task
- Reference other files by path (don't duplicate)
