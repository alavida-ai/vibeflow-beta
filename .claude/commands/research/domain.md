---
argument-hint: [research domain] [optional - add any additional information here]
---
# Discovery Research

## Purpose

Shortcut command that wraps `/plan` to set up research planning with correct context.

## Variables
RESEARCH_DOMAIN: $1 (e.g., "customer-insights", "category-landscape")
ADDITIONAL_INFO: $2 (optional - any extra context from user)
BASE_DIR: `/research/`

## Instructions

This is a **wrapper command** that constructs a task description for `/plan`. Follow these steps:

1. **Construct TASK_DESCRIPTION** that tells the planner to:
   - Use the `researching` skill
   - Reference the workflow for `RESEARCH_DOMAIN` within that skill
   - Create the plan in `BASE_DIR/RESEARCH_DOMAIN/` (e.g., `/research/customer-insights/`)
   - Incorporate any `ADDITIONAL_INFO` provided by the user

2. **Pass to /plan** using:
   ```
   SlashCommand(`/plan "[TASK_DESCRIPTION]"`)
   ```

**Example TASK_DESCRIPTION format:**
"Create a research plan for [RESEARCH_DOMAIN] using the researching skill and the [RESEARCH_DOMAIN] workflow. The execution folder (where the PLAN.md will be created) should be created in /research/[RESEARCH_DOMAIN]/. [ADDITIONAL_INFO if provided]"

**Note:** This command does NOT use the researching skill directly—it tells `/plan` to use it.