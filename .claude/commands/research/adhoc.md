---
argument-hint: [research task description]
---
# Ad-hoc Discovery Research

## Purpose

Shortcut command that wraps `/plan` for custom research tasks that don't follow a specific workflow.

## Variables
USER_TASK: $1 (user's custom research task description)
RESEARCH_DOMAIN: `adhoc` (fixed)
BASE_DIR: `/research/`

## Instructions

This is a **wrapper command** that constructs a task description for `/plan`. Follow these steps:

1. **Construct TASK_DESCRIPTION** that tells the planner to:
   - Use the `researching` skill
   - Execute the custom research task provided by user (`USER_TASK`)
   - Create the plan in `BASE_DIR/RESEARCH_DOMAIN/` (i.e., `/research/adhoc/`)
   - Note: This is ad-hoc research, so do NOT reference a specific workflow

2. **Pass to /plan** using:
   ```
   SlashCommand(`/plan "[TASK_DESCRIPTION]"`)
   ```

**Example TASK_DESCRIPTION format:**
"Create an ad-hoc research plan using the researching skill. Task: [USER_TASK]. The execution folder (where the PLAN.md will be created) should be created in /research/adhoc/. This is custom research that doesn't follow a predefined workflow."

**Note:** This command does NOT use the researching skill directly—it tells `/plan` to use it.