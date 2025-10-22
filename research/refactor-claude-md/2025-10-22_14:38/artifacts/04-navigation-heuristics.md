# Navigation Heuristics

Decision-tree guidance for finding information in the workspace.

## Finding Strategy Information

**Need brand positioning or narrative?**
→ Start: `/strategy/STRATEGY.md`
→ Navigate to: `/strategy/core/narrative.md` or `/strategy/core/positioning.md`

**Need messaging themes or value props?**
→ Start: `/strategy/STRATEGY.md`
→ Navigate to: `/strategy/messaging/pillars.md` or `/strategy/messaging/value-propositions.md`

**Need brand voice guidelines?**
→ Start: `/strategy/STRATEGY.md`
→ Navigate to: `/strategy/voice/tone-guidelines.md` or `/strategy/voice/vocabulary.md`

**Need audience personas?**
→ Start: `/strategy/STRATEGY.md`
→ Navigate to: `/strategy/audience/personas/{persona-name}.md`

## Finding Research Information

**Need latest research findings in a domain?**
→ Start: `/research/{domain}/RESEARCH.md`
→ Check: "Latest execution" section
→ Navigate to: `/research/{domain}/{YYYY-MM-DD}/findings.md`

**Need raw research data?**
→ Start: `/research/{domain}/RESEARCH.md`
→ Navigate to: `/research/{domain}/data/{data-type}/`

**Need final research reports?**
→ Start: `/research/{domain}/RESEARCH.md`
→ Navigate to: `/research/{domain}/exports/{report-name}`

**Need to compare research over time?**
→ Start: `/research/{domain}/RESEARCH.md`
→ Check: "Research Runs" section
→ Compare: Multiple `/{YYYY-MM-DD}/findings.md` files

## Verifying Strategy Claims

**Need to trace a strategy claim back to evidence?**
→ Find: Footnote in strategy file (e.g., `[^reference-name]`)
→ Follow: Path to research file (`/research/{domain}/{date}/findings.md:line`)
→ Verify: Research finding
→ Optional: Trace further to raw data in `/research/{domain}/data/`

**Chain of evidence:**
```
Strategy claim (e.g., /strategy/messaging/value-propositions.md)
    ↓ footnote [^ref]
Research finding (e.g., /research/customer-insight/2025-10-21/findings.md:42)
    ↓ reference
Raw data (e.g., /research/customer-insight/data/interviews/customer-005.md)
```

## Understanding System Configuration

**Need to understand agent behavior?**
→ Check: `/.claude/output-styles/{agent-name}.md`
→ For sub-agents: `/.claude/agents/{agent-name}.md`

**Need to understand a workflow?**
→ Start: `/.claude/skills/{skill-name}/SKILL.md`
→ Or: `/.claude/commands/{domain}/{command-name}.md`

**Need orchestration guidance (PLAN.md, TODO.md formats)?**
→ See: `.claude/skills/orchestration/SKILL.md`

## Running a Workflow

**Executing a planned workflow?**
→ See: Orchestration skill (`.claude/skills/orchestration/`)
→ Follow: PLAN.md in execution folder
→ Track: TODO.md for progress

**Creating a new research domain?**
→ Create: `/research/{domain-name}/`
→ Add: `RESEARCH.md` (entry point)
→ Add: `/data/`, `/{YYYY-MM-DD}/`, `/exports/` (three-folder structure)

## Quick Decision Tree

```
What do I need?

├─ Brand strategy information?
│  └─ Start: /strategy/STRATEGY.md → Navigate to specific file
│
├─ Research findings?
│  └─ Start: /research/{domain}/RESEARCH.md → Latest run or exports
│
├─ Evidence for a claim?
│  └─ Follow footnote chain: Strategy → Research → Raw data
│
├─ System behavior/workflow?
│  └─ Check: /.claude/output-styles/ or /.claude/skills/
│
└─ How to structure work?
   └─ See: Orchestration skill for execution patterns
```

## When to Create New Files

**Create in `/strategy/` when:**
- Content is polished and client-ready
- It's a brand source of truth (not exploratory)
- It should be versioned via git (not date-stamped)

**Create in `/research/{domain}/` when:**
- Conducting temporal research
- Analyzing raw data
- Producing insights that evolve over time

**Create in `/.claude/` when:**
- Defining agent behavior (output-styles, agents)
- Building reusable workflows (skills, commands)
- Configuring system capabilities

**Create execution folder (`/{YYYY-MM-DD}/`) when:**
- Running a multi-phase workflow
- Need progress tracking (PLAN.md, TODO.md)
- Producing artifacts that flow between phases

## Naming Decisions

**Use UPPERCASE.md for:**
- Entry points (STRATEGY.md, RESEARCH.md, SKILL.md)
- Workflow tracking (PLAN.md, TODO.md)

**Use kebab-case.md for:**
- All other files (brand-narrative.md, customer-insight.md)

**Use YYYY-MM-DD format for:**
- Research execution folders (`/2025-10-20/`)
- Not for strategy (use git versioning instead)
