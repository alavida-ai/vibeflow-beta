# Progressive Disclosure Pattern

**Concept:** Information is hierarchical—agents load exactly what they need, when needed.

## The Pattern

1. **Entry point** (UPPERCASE.md) provides overview + navigation
2. **Agent reads entry point** to understand what's available
3. **Agent loads specific files** based on task needs
4. **Reference by path**, don't duplicate content

## Entry Point Files

Entry points use UPPERCASE.md naming and serve as "tables of contents":

| File | Location | Purpose |
|------|----------|---------|
| `STRATEGY.md` | `/strategy/STRATEGY.md` | Navigate brand strategy files |
| `RESEARCH.md` | `/research/{domain}/RESEARCH.md` | Navigate research domain |
| `SKILL.md` | `.claude/skills/{skill}/SKILL.md` | Define skill capabilities |
| `PLAN.md` | Execution folders | Document workflow approach |
| `TODO.md` | Execution folders | Track workflow progress |

### STRATEGY.md Structure

```markdown
# Brand Strategy

## Overview
[1-2 paragraphs: what this strategy covers]

## Quick Navigation

**Need brand voice?** → `/voice/tone-guidelines.md`
**Need messaging themes?** → `/messaging/pillars.md`
**Need brand narrative?** → `/core/narrative.md`
**Need positioning?** → `/core/positioning.md`
**Need personas?** → `/audience/personas/`

## Related Research
[Links to research domains that inform this strategy]
```

### RESEARCH.md Structure

```markdown
# Research: [Domain Name]

**Last Updated:** [Date]

## Overview
[1-2 paragraphs: scope and purpose]

## Latest Findings
**Most recent run:** `/research/{domain}/{YYYY-MM-DD}/`
**Key insights:** [3-5 bullet points]

## Research Runs
- `/{YYYY-MM-DD}/` - [Description]
- `/{YYYY-MM-DD}/` - [Description]

## Data & Deliverables
**Raw data:** `/research/{domain}/data/`
**Reports:** `/research/{domain}/exports/`

## Strategy Impact
**Referenced in:**
- `/strategy/[file]` - [What claims this supports]
```

### SKILL.md Structure

See `.claude/skills/orchestration/SKILL.md` for skill definition patterns.

### PLAN.md and TODO.md

For workflow execution tracking, see the orchestration skill.

## Why Progressive Disclosure

**Efficiency:**
- Agents load only necessary files
- Reduces token usage
- Maintains high signal-to-noise ratio

**Quality:**
- Clear information hierarchy
- No guessing where things are
- Reduces hallucination risk

**Scalability:**
- System grows without context bloat
- New domains added cleanly
- Performance stays consistent

## Usage Pattern

**Typical agent workflow:**

1. Start: "I need brand messaging guidance"
2. Load: `/strategy/STRATEGY.md`
3. Read: "For messaging themes → `/messaging/pillars.md`"
4. Load: `/strategy/messaging/pillars.md`
5. Use: Apply pillars to task

**Not this:**
1. Load entire `/strategy/` directory (wasteful)
2. Search through all files (slow)
3. Guess which file has what (error-prone)
