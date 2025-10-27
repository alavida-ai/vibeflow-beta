---
argument-hint: Path to PLAN.md
---
# Implement

## Purpose

Execute a workflow plan by following PLAN.md, delegating to agents, and tracking progress.

## Variables

PLAN_PATH: $ARGUMENTS

## Instructions

- This task requires the `orchestration` skill to understand HOW to implement plans effectively
- If `PLAN_PATH` is provided not provided then ask the user for a plan file to implement.
- Read the PLAN.md file - this is your execution blueprint
- Use the orchestration skill to guide you to implement this plan effectively
- Follow PLAN.md as the source of truth for all execution decisions
- Report results when complete with links to artifacts and final output
