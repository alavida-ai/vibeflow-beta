---
argument-hint: [strategy domain] [optional - add any additional information here]
---
# Strategy Synthesis

## Purpose

Shortcut command that wraps `/plan` to set up strategy synthesis planning with correct context.

## Variables
STRATEGY_DOMAIN: $1 (e.g., "voice", "messaging", "positioning")
ADDITIONAL_INFO: $2 (optional - any extra context from user)
BASE_DIR: `/strategy/`

## Instructions

This is a **wrapper command** that constructs a task description for `/plan`. Follow these steps:

1. **Construct TASK_DESCRIPTION** that tells the planner to:
   - Use the `synthesizing-strategy` skill
   - Reference the workflow for `STRATEGY_DOMAIN` within that skill
   - Create the plan in `BASE_DIR/STRATEGY_DOMAIN/` (e.g., `/strategy/voice/`)
   - Incorporate any `ADDITIONAL_INFO` provided by the user

2. **Pass to /plan** using:
   ```
   SlashCommand(`/plan "[TASK_DESCRIPTION]"`)
   ```

**Example TASK_DESCRIPTION format:**
"Create a strategy synthesis plan for [STRATEGY_DOMAIN] using the synthesizing-strategy skill and the [STRATEGY_DOMAIN] workflow. The execution folder (where the PLAN.md will be created) should be created in /strategy/[STRATEGY_DOMAIN]/. [ADDITIONAL_INFO if provided]"

**Note:** This command does NOT use the synthesizing-strategy skill directly-it tells `/plan` to use it.
