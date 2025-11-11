# Existing AMA Documentation

This document lists all current AMA documentation that should be referenced when creating course materials.

## Core Documentation

### System Architecture
- [CLAUDE.md](/CLAUDE.md) - Complete agent file structure guide, core principles, and navigation heuristics
- [MANIFESTO.md](/MANIFESTO.md) - System philosophy and vision

### Agentic Framework (/.claude/)

**Hooks:**
- [.claude/output-styles/operations-manager.md](/.claude/output-styles/operations-manager.md) - Operations Manager identity definition

**Skills:**
- [.claude/skills/agentic-orchestrating/SKILL.md](/.claude/skills/agentic-orchestrating/SKILL.md) - Main orchestration skill
- [.claude/skills/agentic-orchestrating/references/planning.md](/.claude/skills/agentic-orchestrating/references/planning.md) - Planning methodology
- [.claude/skills/agentic-orchestrating/references/implementation.md](/.claude/skills/agentic-orchestrating/references/implementation.md) - Implementation patterns
- [.claude/skills/agentic-orchestrating/references/resuming.md](/.claude/skills/agentic-orchestrating/references/resuming.md) - Resumption patterns
- [.claude/skills/agentic-orchestrating/references/delegation.md](/.claude/skills/agentic-orchestrating/references/delegation.md) - Delegation strategies
- [.claude/skills/agentic-orchestrating/references/artifacts.md](/.claude/skills/agentic-orchestrating/references/artifacts.md) - Artifact management
- [.claude/skills/agentic-orchestrating/references/progress-tracking.md](/.claude/skills/agentic-orchestrating/references/progress-tracking.md) - Progress tracking patterns

**Sub-agents:**
- [.claude/agents/analyst.md](/.claude/agents/analyst.md) - Research specialist
- [.claude/agents/strategist.md](/.claude/agents/strategist.md) - Strategy synthesis specialist
- (other agents as needed)

**Commands:**
- [.claude/commands/plan.md](/.claude/commands/plan.md) - /plan command
- [.claude/commands/implement.md](/.claude/commands/implement.md) - /implement command

### Marketing Framework (/brand/)

**Example Structures:**
- Research domains: `/brand/research/competitive-analysis/`, `/brand/research/customer-insights/`
- Strategy domains: `/brand/strategy/positioning/`, `/brand/strategy/voice/`
- Content types: `/brand/content/twitter-posts/`, `/brand/content/blogs/`

**Example Files:**
- Index files: `RESEARCH.md`, `STRATEGY.md`, `CONTENT.md`
- Evolution tracking: `CHANGELOG.md`
- Extensions: `twitter/EXTENSION.md`, `linkedin/EXTENSION.md`
- Executions: `2025-10-30@14:59/PLAN.md`, `TODO.md`, etc.

## Key Concepts to Reference

1. **Progressive Disclosure** - Load what's needed, when needed
2. **Temporal Execution** - Timestamped folders for iteration tracking
3. **Extension Pattern** - Base + Extension composition
4. **Markdown References** - Verifiable audit trails
5. **Three-Layer Framework** - Research → Strategy → Content
6. **Agent Coordination** - Operations Manager + specialists
7. **Execution vs Index** - Iterative work vs approved state

## Course Integration Notes

- Start with why these patterns exist (LLM limitations, context management)
- Show real examples from the workspace
- Reference specific files as learning materials
- Use existing workflows as case studies
