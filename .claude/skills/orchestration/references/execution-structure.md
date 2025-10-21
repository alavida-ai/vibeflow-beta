# Execution Folder Structure

## Overview

All workflow executions follow a standardized folder structure to ensure consistency, resumability, and clear artifact organization.

## Folder Pattern

```
/research/{workflow-name}/{YYYY-MM-DD_HH:MM}/
├── data/              # Input files and context
├── artifacts/         # Output files from subtasks
├── PLAN.md           # Initial signed-off plan
├── TODO.md           # Progress tracking
└── RESEARCH.md       # Final output (created at completion)
```

## Directory Breakdown

### Root: `/research/`
Base directory for all workflow executions.

### Workflow Directory: `{workflow-name}/`
Named after the workflow being executed (kebab-case).
- Examples: `discover-category-landscape/`, `founder-interview/`, `market-research/`

### Execution Directory: `{YYYY-MM-DD_HH:MM}/`
Timestamped folder for each execution.
- Format: `YYYY-MM-DD_HH:MM` (e.g., `2025-10-21_14:30`)
- Human-readable timestamp
- Unique per execution (minute-level granularity)

### Subdirectories

#### `data/`
Contains input files and external context needed for workflow execution.
- User-provided files
- Scraped/fetched external data
- Reference materials
- Configuration files

**Created:** During `/plan` command (if needed)

#### `artifacts/`
Contains all outputs generated during workflow execution.
- Phase outputs (e.g., `01-competitors.md`, `02a-analysis.md`)
- Draft files (e.g., `03-synthesis-draft.md`)
- Intermediate outputs
- Agent-generated artifacts

**Created:** During `/implement` command

## File Breakdown

### `PLAN.md`
Initial workflow plan signed off by user before execution.

**Contains:**
- Workflow objectives
- Approach and methodology
- Phase breakdown
- Expected outputs
- Success criteria

**Created:** During `/plan` command
**Referenced:** By `/implement` when executing workflow

### `TODO.md`
Progress tracking file updated throughout execution.

**Contains:**
- Task progress checkboxes
- Current phase status
- Artifacts created (with links)
- Notes and blockers

**Created:** During `/implement` command
**Updated:** Throughout execution as phases complete
**Referenced:** By `/resume` to determine resumption point

### `RESEARCH.md`
Final consolidated output from workflow execution.

**Contains:**
- Synthesized findings
- Key insights
- Recommendations
- Final deliverable

**Created:** During Phase 3 (synthesis) or final step of `/implement`

## Example: Complete Execution Folder

```
/research/discover-category-landscape/2025-10-21_14:30/
├── data/
│   ├── competitor-urls.txt
│   └── scraped-content/
│       ├── competitor-a.md
│       └── competitor-b.md
├── artifacts/
│   ├── 01-competitors-identified.md
│   ├── 02a-research-analyst-findings.md
│   ├── 02b-content-analyst-findings.md
│   └── 03-synthesis-draft.md
├── PLAN.md
├── TODO.md
└── RESEARCH.md
```

## Creation Workflow

### `/plan` Command
1. Creates workflow directory (if doesn't exist)
2. Creates timestamped execution directory
3. Creates `data/` subdirectory (if needed)
4. Writes `PLAN.md` with workflow plan

### `/implement` Command
1. Reads `PLAN.md` from execution directory
2. Creates `artifacts/` subdirectory
3. Writes `TODO.md` with progress tracking
4. Executes workflow phases
5. Creates phase artifacts in `artifacts/`
6. Creates final `RESEARCH.md`

### `/resume` Command (Future)
1. Finds most recent execution directory
2. Reads `TODO.md` to determine state
3. Identifies incomplete phases
4. Resumes execution from incomplete phase
