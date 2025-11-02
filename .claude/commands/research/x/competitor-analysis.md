---
argument-hint: [username-to-analysis] [optional - background task]
---
# Competitior Analysis

## Purpose

Shortcut command that wraps `/plan` to set up x-analysis competitor analysis planning with correct context.

## Variables
USERNAME: $1 
BACKGROUND_TASK: $2 (optional - any extra context from user)
BASE_DIR: `/research/`

## Instructions

This is a **wrapper command** that constructs a task description for `/plan`. Follow these steps:

1. **Construct TASK_DESCRIPTION** that tells the planner to:
   - Use the `x-analysis` skill
   - Performe a competitor analsysi for the USERNAME

2. **Pass to /plan** using:
   ```
   Please run the SlashCommand(`/plan "[TASK_DESCRIPTION]"`) to perform a plan, and then run an SlashCommand(`/implement "<PLAN_FILE_LOCATION>) to implement the plan
   ```

3. 

If the BACKGROUND_TASK is true please run everything in headless bash mode.

Here is an example `!claude -p "Build an application" --output-format stream-json`