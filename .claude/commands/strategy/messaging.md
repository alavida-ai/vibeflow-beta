---
description: Synthesize messaging strategy from customer insights and competitive research
tags: [strategy, synthesis]
---

# Synthesize Messaging Strategy

Execute the messaging synthesis workflow to transform customer insights into resonant messaging strategy.

## Your Task

Load and execute the messaging synthesis workflow following the plan-implement pattern from the orchestration skill.

## Workflow Reference

The synthesis workflow is defined at: `.claude/skills/strategy-synthesis/workflows/messaging/WORKFLOW.md`

## Process

1. **Load the workflow** to understand synthesis requirements
2. **Check prerequisites:**
   - Verify `/research/customer-insights/RESEARCH.md` exists
   - Verify `/research/category-landscape/RESEARCH.md` exists
   - Verify `/strategy/positioning/STRATEGY.md` exists (needed for context)
   - Check research `last_updated` dates (frontmatter)
   - Check strategy `last_updated` date if exists
   - Only proceed if research is newer OR strategy doesn't exist
3. **Create execution plan:**
   - Use orchestration skill planning approach
   - Define synthesis steps
4. **Execute synthesis:**
   - Load research files and positioning strategy by path (progressive disclosure)
   - Synthesize into prescriptive messaging strategy
   - Use customer language from research
   - Use template from `.claude/skills/strategy-synthesis/templates/messaging.md`
   - Write to `/strategy/messaging/STRATEGY.md`
   - Update `/strategy/messaging/CHANGELOG.md`
5. **Confirm completion** with user

## Expected Output

- `/strategy/messaging/STRATEGY.md` created or updated
- CHANGELOG.md updated with changes
- Strategy includes frontmatter with `last_updated` date
- Cross-references to research sources and positioning strategy
- Customer language authentically incorporated

## Notes

- This is a **strategist's perspective** - be opinionated and prescriptive
- Use actual customer language from research for authenticity
- Differentiate from competitive messaging patterns
- Messages should be clear, resonant, and provable
