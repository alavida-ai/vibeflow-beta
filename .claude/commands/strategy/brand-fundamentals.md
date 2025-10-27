---
description: Synthesize brand fundamentals strategy from founder interview research
tags: [strategy, synthesis]
---

# Synthesize Brand Fundamentals Strategy

Execute the brand fundamentals synthesis workflow to transform founder interview research into actionable brand strategy.

## Your Task

Load and execute the brand fundamentals synthesis workflow following the plan-implement pattern from the orchestration skill.

## Workflow Reference

The synthesis workflow is defined at: `.claude/skills/strategy-synthesis/workflows/brand-fundamentals/WORKFLOW.md`

## Process

1. **Load the workflow** to understand synthesis requirements
2. **Check prerequisites:**
   - Verify `/research/founder-interview/RESEARCH.md` exists
   - Check research `last_updated` date (frontmatter)
   - Check strategy `last_updated` date if exists
   - Only proceed if research is newer OR strategy doesn't exist
3. **Create execution plan:**
   - Use orchestration skill planning approach
   - Define synthesis steps
4. **Execute synthesis:**
   - Load research by path (progressive disclosure)
   - Synthesize into prescriptive strategy
   - Use template from `.claude/skills/strategy-synthesis/templates/brand-fundamentals.md`
   - Write to `/strategy/brand-fundamentals/STRATEGY.md`
   - Update `/strategy/brand-fundamentals/CHANGELOG.md`
5. **Confirm completion** with user

## Expected Output

- `/strategy/brand-fundamentals/STRATEGY.md` created or updated
- CHANGELOG.md updated with changes
- Strategy includes frontmatter with `last_updated` date
- Cross-references to research maintained

## Notes

- This is a **strategist's perspective** - be opinionated and prescriptive
- Maintain audit trail with markdown references to research
- Strategy should be actionable and clear
