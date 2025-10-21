# Artifact Naming Conventions

## Overview

All workflow artifacts follow a standardized naming pattern to ensure consistency, clarity, and proper sequencing across executions.

## Naming Pattern

```
{phase-number}{suffix}-{descriptive-name}.md
```

### Components

| Component | Description | Examples |
|-----------|-------------|----------|
| `{phase-number}` | Two-digit phase number | `01`, `02`, `03` |
| `{suffix}` | Optional letter for parallel phases | `a`, `b`, `c` (empty for sequential) |
| `{descriptive-name}` | Kebab-case description | `competitor-research`, `positioning-analysis` |

## Phase Numbering

Phase numbers match the workflow's WORKFLOW.md phase definitions:

- **Phase 1** → `01-*`
- **Phase 2** → `02-*`
- **Phase 3** → `03-*`
- etc.

## Sequential vs Parallel Phases

### Sequential Phases
No suffix needed. Each phase runs after the previous completes.

**Examples:**
- `01-competitor-identification.md`
- `02-market-analysis.md`
- `03-strategic-synthesis.md`

### Parallel Phases
Use letter suffixes (`a`, `b`, `c`, etc.) for phases that run concurrently.

**Examples:**
- `02a-research-analyst-findings.md` (runs in parallel)
- `02b-content-analyst-findings.md` (runs in parallel)
- `02c-pricing-analysis.md` (runs in parallel)

## Special Files

### Session Metadata
**File:** `00-session-metadata.md`
**Purpose:** Session context and configuration (optional)
**Created:** During `/plan` if needed by workflow

### Final Output
**File:** `RESEARCH.md`
**Purpose:** Final consolidated workflow output
**Created:** During Phase 3 or final synthesis step
**Location:** Execution folder root (not in `artifacts/`)

## Naming Translation Algorithm

When translating conceptual artifact names from WORKFLOW.md to file paths:

1. **Extract phase number** from phase definition
   - "Phase 1" → `01`
   - "Phase 2A" → `02a`
   - "Phase 3" → `03`

2. **Convert name to kebab-case**
   - "Competitor Identification Report" → `competitor-identification-report`
   - "Positioning Analysis" → `positioning-analysis`

3. **Combine components**
   - Phase `01` + "Competitor Identification Report" → `01-competitor-identification-report.md`
   - Phase `02a` + "Research Findings" → `02a-research-findings.md`

## Examples by Workflow

### Discover Category Landscape

| Phase | Artifact Name (Conceptual) | File Name |
|-------|---------------------------|-----------|
| Metadata | Session configuration | `00-session-metadata.md` |
| Phase 1 | Competitor identification | `01-competitors-identified.md` |
| Phase 2A | Research analyst findings | `02a-research-analyst-findings.md` |
| Phase 2B | Content analyst findings | `02b-content-analyst-findings.md` |
| Phase 3 | Synthesis draft | `03-synthesis-draft.md` |
| Final | Final research output | `RESEARCH.md` |

### Founder Interview

| Phase | Artifact Name (Conceptual) | File Name |
|-------|---------------------------|-----------|
| Phase 1 | Interview transcript | `01-interview-transcript.md` |
| Phase 2 | Interview analysis | `02-analysis.md` |
| Final | Research report | `RESEARCH.md` |

### Market Research

| Phase | Artifact Name (Conceptual) | File Name |
|-------|---------------------------|-----------|
| Phase 1 | Market data collection | `01-market-data.md` |
| Phase 2A | Competitor analysis | `02a-competitor-analysis.md` |
| Phase 2B | Trend analysis | `02b-trend-analysis.md` |
| Phase 2C | Customer analysis | `02c-customer-analysis.md` |
| Phase 3 | Strategic insights | `03-strategic-insights.md` |
| Final | Market research report | `RESEARCH.md` |

## Draft Files

Use `-draft` suffix for working drafts before finalization.

**Examples:**
- `03-synthesis-draft.md` (working version)
- `03-synthesis.md` (finalized version)

## Guidelines

1. **Phase numbering matches WORKFLOW.md phases** exactly
2. **Use suffixes for parallel execution** (`02a-*`, `02b-*`, `02c-*`)
3. **Final output is always `RESEARCH.md`** (no phase prefix)
4. **Session metadata is always `00-session-metadata.md`** (if needed)
5. **Use kebab-case for descriptive names** (lowercase, hyphens)
6. **All artifacts end in `.md`** (Markdown format)

## File Location

All artifacts (except `RESEARCH.md`) are stored in the `artifacts/` subdirectory:

```
/research/{workflow-name}/{timestamp}/
├── artifacts/
│   ├── 01-competitors-identified.md
│   ├── 02a-research-analyst-findings.md
│   ├── 02b-content-analyst-findings.md
│   └── 03-synthesis-draft.md
└── RESEARCH.md  ← Root of execution folder
```

## Referencing Artifacts

### In TODO.md
Use relative links with checkboxes:

```markdown
- [x] [01-competitors-identified.md](artifacts/01-competitors-identified.md) - 7 competitors identified
- [x] [02a-research-findings.md](artifacts/02a-research-findings.md) - Market positioning analysis
```

### In Agent Prompts
Provide absolute paths:

```
Input: /research/discover-category-landscape/2025-10-21_14:30/artifacts/01-competitors-identified.md
Output: /research/discover-category-landscape/2025-10-21_14:30/artifacts/02a-research-findings.md
```

## Validation

Before creating an artifact file, verify:
- [ ] Phase number matches WORKFLOW.md phase
- [ ] Suffix used correctly for parallel phases
- [ ] Descriptive name is kebab-case
- [ ] File extension is `.md`
- [ ] File is created in `artifacts/` subdirectory (except RESEARCH.md)
