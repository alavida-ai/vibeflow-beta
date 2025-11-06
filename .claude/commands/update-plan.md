---
argument-hint: Path to PLAN.md to update, followed by modification instructions
type: prompt
---
# Update Plan

## Purpose

Modify an existing PLAN.md file and update its associated TODO.md to reflect the changes. This allows iterative refinement of execution plans without starting from scratch.

## Variables

PLAN_PATH_AND_INSTRUCTIONS: $ARGUMENTS

## Instructions

- This command requires the `agentic-orchestrating` skill to understand HOW to update plans effectively
- Parse `PLAN_PATH_AND_INSTRUCTIONS` to extract:
  - Path to the PLAN.md file to update (first argument)
  - Modification instructions (remaining arguments or ask user if not provided)
- If PLAN_PATH is not provided, ask the user for the execution folder path
- If modification instructions are not provided, ask the user what changes they want to make

### Update Process

1. **Read existing execution state:**
   - Read the specified PLAN.md (current plan)
   - Read the associated TODO.md (current progress)
   - Understand existing phases, dependencies, and artifacts

2. **Apply modifications:**
   - Use the `agentic-orchestrating` skill to guide plan modifications
   - Modify PLAN.md according to user instructions while maintaining:
     - Phase structure and dependencies
     - Agent delegation patterns
     - Artifact organization
     - Success criteria
   - Present the updated PLAN.md to the user for approval
   - Iterate based on feedback until approved

3. **Update TODO.md:**
   - Regenerate TODO.md based on the updated PLAN.md
   - Preserve any completed phases that are still relevant
   - Mark affected phases as "needs update" or "unchecked"
   - Add a note about the plan update with timestamp
   - Show the user what changed in TODO.md

4. **Next steps:**
   - Inform user to run `/redo-implementation` to execute the updated plan
   - Provide the execution folder path for the redo-implementation command

## Example Scenarios

**Scenario 1: Add a new phase**
```
/update-plan /brand/research/voice-benchmarking/2025-10-28@18:04/PLAN.md Add Phase 6 to analyze competitor social media presence
```

**Scenario 2: Change agent delegation**
```
/update-plan /brand/strategy/positioning/2025-10-28@14:30/PLAN.md Change Phase 3 to use the strategist agent instead of analyst
```

**Scenario 3: Modify success criteria**
```
/update-plan /brand/content/twitter-posts/2025-10-28@16:45-product-launch/PLAN.md Update Phase 2 success criteria to require 3 variations instead of 5
```

**Scenario 4: Interactive mode**
```
/update-plan
```
System will ask for PLAN.md path, then modification instructions.

## Important Notes

- Plan updates preserve the core structure while allowing targeted modifications
- TODO.md is automatically regenerated to reflect plan changes
- Use `/redo-implementation` (not `/implement`) after updating a plan
- This enables iterative refinement of workflow structure
- The execution folder remains the same (no new timestamp folder created)
- Full audit trail maintained through PLAN.md changes and TODO.md notes

## Common Modifications

- **Add/remove phases** - Extend or streamline workflow
- **Change agent delegation** - Route work to different specialists
- **Modify artifacts** - Adjust what each phase produces
- **Update success criteria** - Refine quality standards
- **Adjust dependencies** - Reorder or restructure phase relationships
- **Change input sources** - Point to different research/strategy files
