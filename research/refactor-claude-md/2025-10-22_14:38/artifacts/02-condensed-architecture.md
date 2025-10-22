# Workspace Architecture

```
/workspace-root/
├── .claude/                          ← System behavior & capabilities
│   ├── output-styles/                ← Primary agent definitions
│   ├── agents/                       ← Sub-agent specialists
│   ├── skills/                       ← Reusable workflows (see orchestration skill)
│   └── commands/                     ← Workflow triggers (/onboarding, /campaigns)
│
├── /strategy/                        ← Brand bible (polished, client-ready, footnoted to research)
│   ├── STRATEGY.md                   ← Entry point (progressive disclosure)
│   ├── /core/                        ← narrative.md, positioning.md
│   ├── /messaging/                   ← pillars.md, value-propositions.md
│   ├── /voice/                       ← tone-guidelines.md, vocabulary.md
│   └── /audience/                    ← personas/ (agency-owner.md, in-house-marketer.md)
│
├── /research/                        ← Research domains (temporal, date-stamped, raw findings)
│   └── /{domain}/                    ← e.g., category-landscape, customer-insight
│       ├── RESEARCH.md               ← Entry point (guides to latest run, data, exports)
│       ├── /data/                    ← INPUT: Raw materials (transcripts, surveys, reports)
│       ├── /{YYYY-MM-DD}/            ← PROCESS: Date-stamped runs (PLAN.md, TODO.md, findings)
│       └── /exports/                 ← OUTPUT: Polished deliverables (reports, summaries)
│
├── /docs/                            ← Architecture documentation (system meta-docs)
│
├── .mcp.json                         ← Tool integrations (MCP server config)
├── .env                              ← API keys (gitignored)
├── .env.example                      ← API key template (committed)
├── CLAUDE.md                         ← This file (agent structural guide)
└── MANIFESTO.md                      ← System philosophy and vision
```

## Directory Characteristics

| Directory | Purpose | Key Trait |
|-----------|---------|-----------|
| `/.claude/` | System configuration | Defines WHO (agents), WHAT (skills), HOW (workflows) |
| `/strategy/` | Brand bible | Polished, timeless (git versioned), footnoted to research |
| `/research/` | Research domains | Temporal (date-stamped), raw, preserves historical context |
| `/docs/` | Architecture docs | Meta-documentation about the system itself |

## Information Flow

```
/research/{domain}/data/           ← Raw materials (interviews, surveys)
         ↓ analyzed in
/research/{domain}/{YYYY-MM-DD}/   ← Research execution (findings, analysis)
         ↓ produces
/research/{domain}/exports/        ← Deliverable reports
         ↓ informs (via footnotes)
/strategy/                         ← Brand strategy claims
         ↓ guides
Content output                     ← Blog posts, campaigns, messaging
```

## Ownership Model

**Infrastructure team:**
- `/.claude/output-styles/` - Core agent definitions
- `/.claude/skills/` (core) - Foundational skills like orchestration
- Meta workflows and architecture

**Marketing architects:**
- `/.claude/agents/` - Specialized sub-agents
- `/.claude/skills/` (domain) - Domain-specific capabilities
- `/.claude/commands/` (domain) - Domain workflows
- `/strategy/` - Brand strategy content
- `/research/` - Research execution and findings

## When to Use Each Directory

**Use `/.claude/` when:**
- Defining agent behavior (output-styles, agents)
- Creating reusable workflows (skills, commands)
- Configuring system capabilities

**Use `/strategy/` when:**
- Creating polished, client-ready brand materials
- Documenting final positioning, messaging, voice
- Establishing brand source of truth (referenced by agents)

**Use `/research/` when:**
- Conducting market/customer/competitor research
- Running temporal investigations (trends over time)
- Analyzing raw data to produce insights
- Creating audit trails for strategy claims

**Use `/docs/` when:**
- Documenting system architecture
- Explaining workflow patterns
- Creating reference materials about the system itself
