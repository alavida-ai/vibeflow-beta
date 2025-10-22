# {Workflow Name}

**Created:** {timestamp}
**Execution Folder:** {execution-folder-path}

## Objective

{Clear statement of what this workflow accomplishes}

## Approach

{High-level methodology for achieving the objective}

## Input Data

**Location:** `data/`

{Description of any input files, external data, or context files needed for this workflow}

Examples:
- `data/competitor-urls.txt` - List of competitor URLs to analyze
- `data/brand-context.md` - Brand positioning and context information
- `data/interview-transcript.md` - Raw interview recording transcript

{If no external data needed, state "None - workflow generates data from scratch"}

## Step by Step Tasks

### 1. {Phase 1 Name}

{Description of phase 1 activities and what the agent should do}

**Agent:** {agent-type or "general-purpose"}
**Instructions:** {path-to-instruction-file or "inline instructions below"}
**Input Artifacts:**
- {None or list of artifact paths from previous phases or input data}

**Output Artifact:** `artifacts/01-{artifact-name}.md`

**Task Details:**
{Detailed instructions for the agent - what to analyze, what to look for, what format to use}

---

### 2a. {Parallel Phase A Name}

{Description of parallel activity A}

**Agent:** {agent-type or "general-purpose"}
**Instructions:** {path-to-instruction-file or "inline instructions below"}
**Input Artifacts:**
- `artifacts/01-{previous-artifact}.md`

**Output Artifact:** `artifacts/02a-{artifact-name}.md`

**Task Details:**
{Detailed instructions for the agent}

---

### 2b. {Parallel Phase B Name}

{Description of parallel activity B}

**Agent:** {agent-type or "general-purpose"}
**Instructions:** {path-to-instruction-file or "inline instructions below"}
**Input Artifacts:**
- `artifacts/01-{previous-artifact}.md`

**Output Artifact:** `artifacts/02b-{artifact-name}.md`

**Task Details:**
{Detailed instructions for the agent}

---

### 3. {Final Synthesis Phase Name}

{Description of final consolidation phase}

**Agent:** general-purpose
**Instructions:** {path-to-instruction-file or "inline instructions below"}
**Input Artifacts:**
- `artifacts/02a-{artifact-from-phase-2a}.md`
- `artifacts/02b-{artifact-from-phase-2b}.md`

**Output Artifact:** `artifacts/03-{synthesis-artifact}.md` and `RESEARCH.md`

**Task Details:**
{Detailed instructions for synthesizing all findings into final output}

## Success Criteria

- {Criterion 1 - how to evaluate if workflow achieved its objective}
- {Criterion 2}
- {Criterion 3}
