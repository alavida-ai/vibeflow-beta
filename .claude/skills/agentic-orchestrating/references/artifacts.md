# Artifacts

Artifacts are the standardized outputs produced by each workflow phase. They serve as inputs to subsequent phases, creating a data flow through the workflow.

## Purpose

Artifacts provide:
- **Tangible outputs** from each phase
- **Inputs** for subsequent phases
- **Progress tracking** through TODO.md
- **Audit trail** of workflow execution
- **Resumability** if workflow is interrupted

## Naming Convention

All artifacts follow a standardized naming pattern:

```
{phase-number}{suffix}-{descriptive-name}.md
```

### Components

| Component | Description | Examples |
|-----------|-------------|----------|
| `{phase-number}` | Two-digit phase number | `01`, `02`, `03` |
| `{suffix}` | Optional letter for parallel phases | `a`, `b`, `c` (empty for sequential) |
| `{descriptive-name}` | Kebab-case description | `competitors`, `positioning-analysis` |
| `.md` | File extension | Always markdown |

### Examples

**Sequential phases:**
- `01-competitors.md`
- `02-market-analysis.md`
- `03-synthesis.md`

**Parallel phases:**
- `02a-positioning-analysis.md`
- `02b-content-analysis.md`
- `02c-pricing-analysis.md`

**Special case - Final output:**
- `RESEARCH.md` (no phase prefix, lives in execution folder root)

## Phase Numbering

Phase numbers match the PLAN.md phase definitions:

- **Phase 1** → `01-*`
- **Phase 2** → `02-*`
- **Phase 2a** (parallel) → `02a-*`
- **Phase 2b** (parallel) → `02b-*`
- **Phase 3** → `03-*`

## Artifact Location

### Phase Artifacts

All phase artifacts go in the `artifacts/` subdirectory:

```
/research/{workflow-name}/{timestamp}/artifacts/
├── 01-competitors.md
├── 02a-positioning-analysis.md
├── 02b-content-analysis.md
└── 03-synthesis.md
```

### Final Output

The final RESEARCH.md lives in the execution folder root:

```
/research/{workflow-name}/{timestamp}/
├── artifacts/
│   └── (phase artifacts)
├── PLAN.md
├── TODO.md
└── RESEARCH.md  ← Root level
```

## Naming Translation

When translating conceptual artifact names from PLAN.md to concrete file paths:

### Step 1: Extract Phase Number

From PLAN.md phase heading:
- "Phase 1" → `01`
- "Phase 2a" → `02a`
- "Phase 3" → `03`

### Step 2: Convert Name to Kebab-Case

From conceptual name to file-friendly format:
- "Competitor Identification Report" → `competitor-identification-report`
- "Positioning Analysis" → `positioning-analysis`
- "Strategic Synthesis" → `strategic-synthesis`

### Step 3: Combine Components

```
Phase {01} + "Competitor Identification" → 01-competitor-identification.md
Phase {02a} + "Positioning Analysis" → 02a-positioning-analysis.md
Phase {03} + "Strategic Synthesis" → 03-strategic-synthesis.md
```

### Step 4: Construct Full Path

```
{execution-folder}/artifacts/{phase-number}{suffix}-{artifact-name}.md
```

**Example:**
```
/research/discover-category-landscape/2025-10-22_14:30/artifacts/02a-positioning-analysis.md
```

## Artifact Contents

### Phase Artifacts

Each phase artifact should contain:
- **Findings** specific to that phase
- **Structured data** (lists, tables, etc.)
- **Analysis** or insights
- **Markdown formatting** for readability

**Example structure:**
```markdown
# Phase 2a: Market Positioning Analysis

## Overview
Brief summary of findings.

## Key Findings

### Finding 1
Details...

### Finding 2
Details...

## Competitive Positioning Matrix

| Competitor | Position | Differentiation |
|------------|----------|-----------------|
| ...        | ...      | ...             |

## Recommendations
Key takeaways for next phase.
```

### Final RESEARCH.md

The final output should:
- **Synthesize** all phase findings
- **Tell a story** with clear narrative flow
- **Provide recommendations** or conclusions
- **Reference** specific findings from phase artifacts

## Referencing Artifacts

### In TODO.md

Use relative links with checkboxes:

```markdown
## Artifacts

- [x] [01-competitors.md](artifacts/01-competitors.md) - 7 competitors identified
- [x] [02a-positioning.md](artifacts/02a-positioning.md) - Market positioning analysis
- [ ] [03-synthesis.md](artifacts/03-synthesis.md) - Strategic synthesis
```

### In Agent Delegation

Provide absolute paths:

```
Input: /research/discover-category-landscape/2025-10-22_14:30/artifacts/01-competitors.md
Output: /research/discover-category-landscape/2025-10-22_14:30/artifacts/02a-positioning.md
```

### In Phase Instructions

Reference conceptually, let orchestration resolve:

```markdown
**Input:** Competitor list from Phase 1
**Output:** Positioning analysis report
```

## Artifact Flow

Artifacts flow between phases as inputs and outputs:

```
Phase 1 → produces: 01-competitors.md
    ↓ (input to Phase 2a)
Phase 2a → produces: 02a-positioning.md
    ↓ (input to Phase 3)
Phase 3 → produces: 03-synthesis.md
    ↓ (inputs to final synthesis)
RESEARCH.md ← synthesizes all artifacts
```

## Naming Principles

1. **Phase numbers match PLAN.md** exactly
2. **Use letter suffixes for parallel phases** (`02a-*`, `02b-*`)
3. **Final output is always `RESEARCH.md`** (no phase prefix)
4. **Use kebab-case for names** (lowercase, hyphens)
5. **All artifacts end in `.md`** (Markdown format)
6. **Descriptive names** that indicate content
7. **Consistent with PLAN.md** artifact definitions

## Validation Checklist

Before creating an artifact file, verify:
- [ ] Phase number matches PLAN.md phase
- [ ] Suffix used correctly for parallel phases
- [ ] Descriptive name is kebab-case
- [ ] File extension is `.md`
- [ ] File is in `artifacts/` subdirectory (except RESEARCH.md)
- [ ] Absolute path is used in delegation
- [ ] Artifact is referenced in TODO.md

## Example Workflow Artifacts

### Discover Category Landscape

| Phase | Artifact Name | File Name |
|-------|--------------|-----------|
| Phase 1 | Competitor identification | `01-competitors.md` |
| Phase 2a | Research analyst findings | `02a-research-findings.md` |
| Phase 2b | Content analyst findings | `02b-content-findings.md` |
| Phase 3 | Strategic synthesis | `03-synthesis.md` |
| Final | Consolidated research | `RESEARCH.md` |

### Founder Interview

| Phase | Artifact Name | File Name |
|-------|--------------|-----------|
| Phase 1 | Interview transcript | `01-transcript.md` |
| Phase 2 | Interview analysis | `02-analysis.md` |
| Final | Research report | `RESEARCH.md` |

## See Also

- [Planning](planning.md) - How artifacts are defined in plans
- [Implementation](implementation.md) - How artifacts are created during execution
- [Delegation](delegation.md) - How artifacts are passed between agents
- [Progress Tracking](progress-tracking.md) - How artifacts are tracked in TODO.md
