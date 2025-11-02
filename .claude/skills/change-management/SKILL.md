---
name: Change Management
description: Automate CHANGELOG maintenance and stakeholder communication for brand strategy changes. This skill should be used when updating strategy documents to ensure proper documentation and change tracking.
---

# Change Management

## Purpose

Manage changes to brand strategy documents by automating CHANGELOG maintenance and ensuring stakeholders are informed of updates. This skill handles the documentation workflow for strategy evolution, maintaining audit trails and facilitating communication.

## When to Use This Skill

Use this skill when:
- Updating strategy documents (`STRATEGY.md` files in `/brand/strategy/` domains)
- Needing to document strategy changes for stakeholder communication
- Migrating historical changes to CHANGELOG format
- Ensuring proper audit trails for strategy evolution

## Instructions

### Available Workflows

- [Update CHANGELOG](workflows/update-changelog/WORKFLOW.md) - Analyze strategy changes and update CHANGELOG entries
- [Migrate CHANGELOG](workflows/migrate-changelog/WORKFLOW.md) - Backfill historical CHANGELOG entries from git history

### Key Principles

Follow these principles when managing changes:

1. **One entry per PR** - Consolidate all changes in a pull request into a single CHANGELOG entry
2. **Smart detection** - Only update CHANGELOG if existing entries don't adequately reflect the changes
3. **Stakeholder-focused** - Write for Marketing Architects, not developers; focus on "why it matters"
4. **Evidence-based** - Reference research that informed changes when applicable
5. **Progressive disclosure** - Link to detailed research rather than duplicating content

### CHANGELOG Format

All CHANGELOG entries must follow this structure:

```markdown
## [YYYY-MM-DD] - Brief descriptive title

**Type:** Created | Updated | Refined
**PR:** #{number} (if applicable)

**Changes:**
- Specific change 1 (what was added/modified/removed)
- Specific change 2
- Specific change 3

**Why it matters:**
1-2 sentences explaining impact on content creation, positioning, or messaging.

**Research trigger:** (optional)
Reference to research that prompted this change, if applicable.
Example: [Customer insights research](/brand/research/customer-insights/RESEARCH.md)
```

### Tone Guidelines

When writing CHANGELOG entries:
- **Clear and direct** - No marketing fluff or unnecessary jargon
- **Impact-focused** - Explain practical implications, not just technical changes
- **Respectful** - Marketing Architects value intellectual rigor; avoid patronizing language
- **Professional** - Maintain consistency with brand voice (see `/brand/strategy/voice/STRATEGY.md`)

### Domain Context

Strategy domains this skill manages:
- `/brand/strategy/voice/` - Brand voice and tone guidelines
- `/brand/strategy/messaging/` - Messaging themes and narratives
- `/brand/strategy/positioning/` - Market positioning and differentiation
- `/brand/strategy/audience/` - Target audience profiles and insights
- `/brand/strategy/brand-fundamentals/` - Core brand identity and values

For each domain, load the current `STRATEGY.md` to understand context before generating CHANGELOG entries.
