---
argument-hint: Path to TODO.md file in execution folder
type: prompt
---
# Resume

## Purpose

Resume or redo a workflow execution from a specific phase, intelligently handling existing artifacts and determining what needs to be regenerated.

## Variables

EXECUTION_PATH: $ARGUMENTS

## Instructions

- This command requires the `agentic-orchestrating` skill to understand HOW to resume workflows effectively
- If `EXECUTION_PATH` is not provided, ask the user for the execution folder path to resume
- Read the execution folder's PLAN.md and TODO.md to understand the workflow structure and current state
- Ask the user which phase they want to resume from (show them the list of phases) if it has not been provided
- Determine which artifacts need to be regenerated based on the phase dependency chain
- Update TODO.md to reflect the resume point
- Use the orchestration skill to guide the resumption process
- Execute phases from the resume point forward, delegating to agents as specified in PLAN.md
- Report results when complete with links to updated artifacts and final output

## How Resumption Works

When resuming from a specific phase:

1. **Read execution state:**
   - PLAN.md (workflow definition)
   - TODO.md (current progress)
   - existing artifacts/ (what's already been created)

2. **Determine resume strategy:**
   - Ask user which phase to resume from
   - Identify which artifacts depend on that phase
   - Mark affected artifacts as "needs regeneration"
   - Keep unaffected artifacts (phases before the resume point)

3. **Update TODO.md:**
   - Uncheck phases from resume point forward
   - Add note about resumption with timestamp
   - Mark which artifacts will be regenerated

4. **Execute from resume point:**
   - Follow PLAN.md for each phase starting from resume point
   - Delegate to agents as originally specified
   - Overwrite affected artifacts
   - Track progress in TODO.md

## Example Scenarios

**Scenario 1: Unhappy with Phase 5, redo just that phase**
- User: "Resume from Phase 5"
- System identifies: Only Phase 5 and final output need regeneration
- System keeps: Phases 1-4 artifacts unchanged
- System executes: Phase 5 with existing Phase 4 artifacts as input

**Scenario 2: Found issue in Phase 2, need to redo everything after**
- User: "Resume from Phase 2"
- System identifies: Phases 2-5 and all dependent artifacts need regeneration
- System keeps: Phase 1 artifacts unchanged
- System executes: Phases 2-5 in sequence

**Scenario 3: New research data available, redo from data collection**
- User updates data/ folder with new sources
- User: "Resume from Phase 2"
- System uses updated data/ as input
- System regenerates all subsequent phases with new data

## Usage Examples

### Basic Usage
```
/resume research/voice-benchmarking/2025-10-28@18:04
```
System will ask which phase to resume from.

### With Phase Specification
```
/resume research/voice-benchmarking/2025-10-28@18:04 --phase 5
```
Directly resume from Phase 5.

### Interactive Mode
```
/resume
```
System will ask for execution folder path, then which phase.

## Important Notes

- Resumption preserves work that doesn't need to be redone
- The phase dependency chain (defined in PLAN.md) determines what needs regeneration
- Artifacts before the resume point are kept as-is (efficient token usage)
- TODO.md maintains full audit trail including resumption events
- This enables iterative refinement without full workflow re-runs
