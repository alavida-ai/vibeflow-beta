# Implementation

Implementation is executing a plan by following PLAN.md, delegating phases to agents with focused context, and tracking progress.

## Purpose

Execute a structured plan through:
- Reading PLAN.md as the execution blueprint
- Delegating each phase to the specified agent with progressive disclosure
- Tracking progress in TODO.md
- Synthesizing final output

## Core Concept

**PLAN.md is the source of truth.** It contains everything needed to execute:
- Phase breakdown with sequencing
- Agent type for each phase
- Instructions (file path or inline)
- Input artifacts each phase needs
- Output artifact path for each phase

Simply follow the plan, delegate to agents as specified, and track progress.

## Implementation Process

### Step 1: Read PLAN.md

PLAN.md is your execution blueprint.

It specifies for each phase:
- Which agent to delegate to
- Where to find instructions
- What input artifacts are needed
- Where to write output

### Step 3: Create TODO.md

Use [TODO.md template](/.claude/skills/agentic-orchestrating/assets/TODO_template.md) to initialize progress tracking with all phases from PLAN.md.

See [Progress Tracking](progress-tracking.md) for details.

### Step 4: Execute Each Phase

For each phase in PLAN.md:

1. **Read phase definition** - Agent type, instructions, inputs, output
2. **Load instructions** (if external file path specified)
3. **Delegate to agent** using Task tool with:
   - Agent type from PLAN.md
   - Instructions content
   - Input artifact file paths (progressive disclosure)
   - Output artifact file path (for subagent to run)
   - Execution folder path
4. **Wait for completion**
5. **Update TODO.md** - Check off phase, update current phase

See [Delegation](delegation.md) for delegation patterns.

**Sequential phases:** Execute one at a time, waiting for completion before starting next.

**Parallel phases:** Launch all in a single message with multiple Task calls, wait for ALL to complete.

### Step 5: Finalize TODO.md

Mark workflow complete with summary and timestamp.

See [Progress Tracking](progress-tracking.md) for finalization structure.

## Key Principles

1. **Follow the plan** - PLAN.md specifies everything
2. **Progressive disclosure** - Pass file paths to agents, let them load context
3. **Track immediately** - Update TODO.md after each phase completes
4. **Execute faithfully** - Delegate as PLAN.md specifies

## Integration Points

### Inputs
- PLAN.md from execution folder
- Phase instruction files (paths in PLAN.md)
- Previous phase artifacts (paths in PLAN.md)

### Outputs
- Phase artifacts in `{execution-folder}/artifacts/`
- TODO.md with progress tracking
- Final RESEARCH.md