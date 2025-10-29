---
name: agentic-orchestrating
description: Provides the "how-to" for workflow / task execution orchestration. Defines methods for planning multi-phase task/workflows, implementing them through agent delegation, managing artifacts, and tracking progress.
---

# Workflow Orchestration

Knowledge base for orchestrating multi-phase workflow executions with standardized folder structures, progress tracking, and agent delegation.

## Core Concepts

This skill embodies six key orchestration principles:

1. **[Planning](references/planning.md)** - HOW to create execution plans with phase breakdown and artifact definition
2. **[Implementation](references/implementation.md)** - HOW to execute plans through agent delegation, progress tracking and artifact management
3. **[Resuming](references/resuming.md)** - HOW to restart workflows from specific phases with selective regeneration
4. **[Delegation](references/delegation.md)** - HOW to maintain focused context through strategic agent handoffs
5. **[Artifacts](references/artifacts.md)** - HOW to standardize outputs that flow between phases
6. **[Progress Tracking](references/progress-tracking.md)** - HOW to maintain execution state and resumability

### Progressive Disclosure

A core architectural principle that emerges from delegation: **pass file paths, not content**. This enables agents to load context when needed, maintaining high signal-to-noise ratio. Instead of inlining everything upfront, each agent reads only the files it needs for its specific task.

## Standard Execution Folder

All task/workflow executions follow this structure:

```
/{base-dir}/{task/workflow-name}/{YYYY-MM-DD_HH:MM}/
├── data/              # Input files (optional)
├── artifacts/         # Phase outputs
│   ├── 01-*.md
│   ├── 02a-*.md
│   ├── 02b-*.md
│   └── 03-*.md
├── PLAN.md           # Initial plan
├── TODO.md           # Progress tracking
└── RESEARCH.md/STRATEGY.md/CONTENT.md       # Final output
```

Where `base-dir` is either `research`, `strategy` or `content`.


See [Artifacts](references/artifacts.md) for naming conventions and [Progress Tracking](references/progress-tracking.md) for folder structure details.

## Orchestration Workflows

### Planning Phase
**Purpose:** Create a structured execution plan

**Inputs:**
- Task description or workflow definition
- User requirements and context

**Process:** See [Planning](references/planning.md)

**Outputs:**
- Execution folder structure
- PLAN.md with phase breakdown
- Expected artifact definitions

### Implementation Phase
**Purpose:** Execute the plan through [agent delegation](references/delegation.md)

**Inputs:**
- PLAN.md from execution folder
- data/ (optional, created in planning phase)

**Process:** See [Implementation](references/implementation.md)

**Outputs:**
- Phase artifacts in execution folder
- Updated TODO.md tracking progress
- Final RESEARCH.md with synthesized findings

### Resumption Phase
**Purpose:** Restart execution from specific phase with selective regeneration

**Inputs:**
- Existing execution folder with PLAN.md and TODO.md
- User specification of resume point
- Existing artifacts/ (some preserved, some regenerated)

**Process:** See [Resuming](references/resuming.md)

**Outputs:**
- Updated TODO.md with resumption log
- Regenerated artifacts from resume point forward
- Preserved artifacts from before resume point
- Updated final output

## Tools and Resources

### Scripts
- `scripts/create_execution_folder.py` - Creates timestamped execution folders

### Templates
- `assets/TODO_template.md` - Progress tracking template
- `assets/PLAN_template.md` - Workflow plan template