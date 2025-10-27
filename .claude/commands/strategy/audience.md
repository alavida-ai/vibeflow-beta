---
description: Synthesize audience strategy from customer insights and founder interview research
tags: [strategy, synthesis]
---

# Synthesize Audience Strategy

Execute the audience synthesis workflow to transform customer research into detailed audience profiles and strategy.

## Your Task

Load and execute the audience synthesis workflow following the plan-implement pattern from the orchestration skill.

## Workflow Reference

The synthesis workflow is defined at: `.claude/skills/strategy-synthesis/workflows/audience/WORKFLOW.md`

## Process

1. **Load the workflow** to understand synthesis requirements
2. **Check prerequisites:**
   - Verify `/research/customer-insights/RESEARCH.md` exists
   - Verify `/research/founder-interview/RESEARCH.md` exists
   - Check research `last_updated` dates (frontmatter)
   - Check strategy `last_updated` date if exists
   - Only proceed if research is newer OR strategy doesn't exist
3. **Create execution plan:**
   - Use orchestration skill planning approach
   - Define synthesis steps
4. **Execute synthesis:**
   - Load research files by path (progressive disclosure)
   - Synthesize into prescriptive audience strategy
   - Use template from `.claude/skills/strategy-synthesis/templates/audience.md`
   - Write to `/strategy/audience/STRATEGY.md`
   - Update `/strategy/audience/CHANGELOG.md`
5. **Confirm completion** with user

## Expected Output

- `/strategy/audience/STRATEGY.md` created or updated
- CHANGELOG.md updated with changes
- Strategy includes frontmatter with `last_updated` date
- Cross-references to research sources maintained
- Clear audience profile with pain points, goals, and preferences

## Notes

- This is a **strategist's perspective** - be opinionated and prescriptive
- Create actionable audience profiles, not just demographics
- Include jobs-to-be-done framework
- Identify key channels and touchpoints
- Note if additional persona extensions would be valuable
