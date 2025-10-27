---
description: Synthesize voice strategy from voice benchmarking and customer insights research
tags: [strategy, synthesis]
---

# Synthesize Voice Strategy

Execute the voice synthesis workflow to transform voice research into clear brand voice guidelines.

## Your Task

Load and execute the voice synthesis workflow following the plan-implement pattern from the orchestration skill.

## Workflow Reference

The synthesis workflow is defined at: `.claude/skills/strategy-synthesis/workflows/voice/WORKFLOW.md`

## Process

1. **Load the workflow** to understand synthesis requirements
2. **Check prerequisites:**
   - Verify `/research/voice-benchmarking/RESEARCH.md` exists
   - Verify `/research/customer-insights/RESEARCH.md` exists
   - Verify `/strategy/brand-fundamentals/STRATEGY.md` exists (needed for values alignment)
   - Check research `last_updated` dates (frontmatter)
   - Check strategy `last_updated` date if exists
   - Only proceed if research is newer OR strategy doesn't exist
3. **Create execution plan:**
   - Use orchestration skill planning approach
   - Define synthesis steps
4. **Execute synthesis:**
   - Load research files and brand fundamentals by path (progressive disclosure)
   - Synthesize into prescriptive voice strategy
   - Ensure voice aligns with brand values
   - Use template from `.claude/skills/strategy-synthesis/templates/voice.md`
   - Write to `/strategy/voice/STRATEGY.md`
   - Update `/strategy/voice/CHANGELOG.md`
5. **Confirm completion** with user

## Expected Output

- `/strategy/voice/STRATEGY.md` created or updated
- CHANGELOG.md updated with changes
- Strategy includes frontmatter with `last_updated` date
- Cross-references to research sources and brand fundamentals
- Clear voice attributes, tone guidance, and writing principles
- Concrete examples included

## Notes

- This is a **strategist's perspective** - be opinionated and prescriptive
- Voice should align with brand values
- Include concrete before/after examples
- Note that extensions can be added for platform-specific voice adaptations
