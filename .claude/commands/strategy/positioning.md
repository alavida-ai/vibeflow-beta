---
description: Synthesize positioning strategy from category landscape and customer insights research
tags: [strategy, synthesis]
---

# Synthesize Positioning Strategy

Execute the positioning synthesis workflow to transform market and customer research into clear positioning strategy.

## Your Task

Load and execute the positioning synthesis workflow following the plan-implement pattern from the orchestration skill.

## Workflow Reference

The synthesis workflow is defined at: `.claude/skills/strategy-synthesis/workflows/positioning/WORKFLOW.md`

## Process

1. **Load the workflow** to understand synthesis requirements
2. **Check prerequisites:**
   - Verify `/research/category-landscape/RESEARCH.md` exists
   - Verify `/research/customer-insights/RESEARCH.md` exists
   - Verify `/research/founder-interview/RESEARCH.md` exists
   - Check all research `last_updated` dates (frontmatter)
   - Check strategy `last_updated` date if exists
   - Only proceed if any research is newer OR strategy doesn't exist
3. **Create execution plan:**
   - Use orchestration skill planning approach
   - Define synthesis steps
4. **Execute synthesis:**
   - Load all three research files by path (progressive disclosure)
   - Synthesize into prescriptive positioning strategy
   - Use template from `.claude/skills/strategy-synthesis/templates/positioning.md`
   - Write to `/strategy/positioning/STRATEGY.md`
   - Update `/strategy/positioning/CHANGELOG.md`
5. **Confirm completion** with user

## Expected Output

- `/strategy/positioning/STRATEGY.md` created or updated
- CHANGELOG.md updated with changes
- Strategy includes frontmatter with `last_updated` date
- Cross-references to all three research sources maintained

## Notes

- This is a **strategist's perspective** - be opinionated and prescriptive
- Validate founder hypotheses against market reality
- Identify clear differentiation based on white space
- Strategy should be defensible and evidence-based
