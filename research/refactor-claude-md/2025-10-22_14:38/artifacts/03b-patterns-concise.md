# Temporal Research & Three-Folder Patterns

## Temporal Research Pattern

**Concept:** Research is date-stamped to enable historical comparison and trend analysis.

### Why Date-Stamping Matters

Research evolves—markets shift, competitors pivot, customer needs change. Date-stamped executions preserve this evolution.

**Format:** `/research/{domain}/{YYYY-MM-DD}/`

**Enables:**
- Historical comparison (October vs November: what changed?)
- Trend identification (acceleration, deceleration, emergence)
- Context preservation (what we knew when decisions were made)
- Evidence trails (can trace back to specific moments)

**Example:**
```
/research/competitor-analysis/
├── /2025-10-01/  ← Q4 baseline
├── /2025-11-01/  ← Month 2: can compare
└── /2025-12-01/  ← Month 3: trend analysis
```

**Each execution contains:**
- `PLAN.md` - Research approach and objectives
- `TODO.md` - Progress tracking
- Analysis files (findings, notes, insights)

---

## Three-Folder Pattern

**Concept:** Research domains follow Input → Process → Output structure.

### The Structure

```
/research/{domain}/
├── /data/           ← INPUT: Raw materials
├── /{YYYY-MM-DD}/   ← PROCESS: Date-stamped execution
└── /exports/        ← OUTPUT: Polished deliverables
```

### 1. /data/ (Input)

**Contains:** Raw materials that research will analyze
- Interview transcripts
- Survey data (CSV, JSON)
- Competitor documents
- Market reports
- Source datasets

**Characteristics:**
- Static (doesn't change during research)
- Organized by type or source
- Referenced by executions
- Preserved as-is (originals not modified)

### 2. /{YYYY-MM-DD}/ (Process)

**Contains:** Where research work happens
- `PLAN.md` - Research approach
- `TODO.md` - Progress tracking
- Working notes
- Analysis files
- Findings

**Characteristics:**
- Temporal (each run gets new date)
- Complete (includes plan, process, results)
- Preserves context (notes show reasoning)
- Never overwritten (history preserved)

### 3. /exports/ (Output)

**Contains:** Polished, client-ready deliverables
- Final reports
- Executive summaries
- Visualizations
- Deliverable assets

**Characteristics:**
- Polished (client-facing quality)
- Versioned by source execution date
- May synthesize multiple runs
- Various formats (PDF, MD, PPTX)

### Information Flow

```
/data/ (raw interviews)
    ↓ analyzed in
/{YYYY-MM-DD}/ (findings.md)
    ↓ produces
/exports/ (final-report.pdf)
    ↓ informs (via footnotes)
/strategy/ (brand claims)
```

---

## Workflow Execution Details

For detailed guidance on PLAN.md/TODO.md structure and execution folder management, see the **orchestration skill** at `.claude/skills/orchestration/`.

The orchestration skill covers:
- How to structure execution folders
- PLAN.md and TODO.md formats
- Artifact naming conventions
- Phase-based workflow patterns
- Progress tracking methods
