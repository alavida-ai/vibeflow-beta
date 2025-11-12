# Class 8: Agent Orchestration Fundamentals

**Course:** AMA Fundamentals Course
**Duration:** 90 minutes
**Format:** Theory + Hands-on Practice

---

## Class Overview

You've learned how to organize your marketing work (Classes 1-3), how to delegate to specialized agents (Class 6), and how to package reusable workflows as skills (Class 7). Now it's time to understand **how to coordinate complex, multi-phase work** through orchestration.

In this class, you'll learn the PLAN/IMPLEMENT pattern that makes complex marketing workflows manageable, visible, and resumable. You'll understand when orchestration is necessary (and when it's overkill), how to structure execution folders, and how to break down complex work into focused, delegated phases.

### Learning Objectives

By the end of this class, you will be able to:
- Implement the PLAN/IMPLEMENT orchestration pattern
- Determine when orchestration is required versus simple execution
- Create properly structured execution folders with artifacts
- Delegate to sub-agents within orchestrated workflows
- Break down complex tasks into manageable, focused phases
- Track progress transparently throughout execution

### Prerequisites

Before starting this class, you should have completed:
- **Class 3:** Marketing File Structure (AMA Framework) - Understand where executions live
- **Class 6:** Agent Delegation & Sub-agents - Know how to delegate work
- **Class 7:** Claude Code Skills - Understand what skills are and how to use them

### Estimated Time

- Theory and concepts: 30 minutes
- Practical walkthrough: 45 minutes
- Knowledge checks and exercises: 15 minutes

---

## Part 1: Why Orchestration Matters

### The Problem: Complex Work Breaks Context

Remember from Class 1 that context windows are limited. Complex work creates three problems:

1. **Context overload** - Everything competing for attention
2. **Lost progress** - Failures mean starting from scratch
3. **No visibility** - Can't see what's done or what's happening

**Example:** "Analyze 5 competitors - positioning, messaging, pricing, content strategy, then synthesize recommendations."

Single-prompt approach breaks: agent holds ALL instructions at once, competing priorities, no progress tracking.

### The Solution: Break Into Phases

Orchestration breaks work into **phases** with clear inputs/outputs:

```
Phase 1: Identify competitors → 01-competitors.md
Phase 2: Analyze (parallel) → 02a-positioning.md, 02b-content.md, 02c-pricing.md
Phase 3: Synthesize → 03-synthesis.md
Final: Consolidate → RESEARCH.md
```

**Result:** Focused context per phase, visible progress, resumable if interrupted.

### The AMA Connection

Those `YYYY-MM-DD@HH:mm/` folders from Class 3? They're orchestrated workflows:

```
/brand/research/competitive-analysis/2025-10-30@14:30/
├── PLAN.md          ← Blueprint
├── TODO.md          ← Progress
├── artifacts/       ← Phase outputs
└── RESEARCH.md      ← Final result
```

---

## Part 2: The Orchestration Pattern

### Three Core Components

**1. PLAN.md** - Blueprint created before execution
- Objective, approach, phase breakdown
- Expected artifacts per phase
- Success criteria

**2. TODO.md** - Progress tracker updated throughout execution
- Current status and timestamps
- Phase checklist with artifact links
- Notes and observations

**3. Artifacts/** - Phase outputs
- Naming: `{phase-number}{letter}-{name}.md`
- Examples: `01-competitors.md`, `02a-positioning.md`, `02b-content.md`
- Create data flow: each phase reads previous artifacts, produces new ones

### Execution Flow

```
Planning: User request → AI creates PLAN.md → User approves
Implementation: AI creates TODO.md → Executes phases → Updates TODO after each → Final output
Review: User reviews output and traces claims through artifacts
```

---

## Part 3: When to Use Orchestration

### Use Orchestration For:

✅ **3+ distinct phases** producing intermediate outputs
✅ **Parallel work** that converges later
✅ **Long-running work** (>15 minutes) needing progress tracking
✅ **Complex tasks** where losing progress midway is costly

### Skip Orchestration For:

❌ **Simple edits** (read, update, write - use Edit tool)
❌ **Single tasks** with no phases (delegate directly to agent)
❌ **Quick work** (<5 minutes with one output)

### Decision Rule

**If you're thinking "I should write this down before starting" → Use orchestration.**

---

## Part 4: Execution Folder Structure

### Standard Pattern

```
/brand/{base-dir}/{domain}/{YYYY-MM-DD@HH:mm}/
├── data/              ← Input files (optional)
├── artifacts/         ← Phase outputs (required)
│   ├── 01-*.md        ← Sequential phases
│   ├── 02a-*.md       ← Parallel phases
│   ├── 02b-*.md
│   └── 03-*.md
├── PLAN.md           ← Blueprint
├── TODO.md           ← Progress
└── OUTPUT.md         ← Final result (RESEARCH.md, STRATEGY.md, or CONTENT.md)
```

**Base directory:** `/brand/research/`, `/brand/strategy/`, or `/brand/content/`
**Artifact naming:** `{phase-number}{letter}-{name}.md` (automatically sorts by execution order)

---

## Part 5: Progressive Task Breakdown

### Decomposition Principles

**1. Single Responsibility** - Each phase has ONE clear task
**2. Clear I/O** - Explicit inputs and outputs
**3. Parallelization** - Independent tasks run simultaneously (Phase 2a, 2b, 2c)
**4. Logical Flow** - Natural progression (Research → Analysis → Synthesis)

### Breakdown Process

1. **List major activities** - What needs to happen?
2. **Group related work** - Which activities belong together?
3. **Identify dependencies** - What must happen before what?
4. **Find parallelization** - What can run simultaneously?
5. **Define phases** - Specify inputs, task, and output for each phase

---

## Part 6: Artifact Management

### Purpose

Artifacts are tangible phase outputs that create a data pipeline through your workflow. Each phase reads artifacts, processes them, and produces new ones.

### Naming Pattern

```
{phase-number}{letter}-{descriptive-name}.md

Examples:
01-competitors.md       (sequential)
02a-positioning.md      (parallel)
02b-content.md          (parallel)
03-synthesis.md         (sequential)
```

### Flow Patterns

**Sequential:** Phase 1 → Phase 2 → Phase 3 (each builds on previous)
**Parallel Divergence:** One artifact → Multiple parallel analyses
**Parallel Convergence:** Multiple artifacts → One synthesis

---

## Part 7: The Agentic-Orchestrating Skill

### What It Is

AMA's packaged orchestration knowledge at `/.claude/skills/agentic-orchestrating/`:
- Planning methodology
- Implementation patterns
- Delegation strategies
- Templates and examples

### How It Works

**Progressive disclosure:** AI loads only relevant reference files when needed
- Planning request → Loads `planning.md`
- Execution request → Loads `implementation.md` + `delegation.md`
- Questions → Loads specific reference

You get orchestrated workflows without manually coordinating everything.

---

## Part 8: Putting It Together

Here's how orchestration works in practice using competitive research as an example.

### The Scenario

"Analyze the competitive landscape for eco-friendly skincare - identify competitors and analyze positioning + content strategy."

### The Workflow

**Planning:** AI decomposes task into phases:
```
Phase 1: Identify competitors
Phase 2a & 2b: Analyze positioning + content (parallel)
Phase 3: Synthesize findings
```

Creates PLAN.md with objectives, phases, expected artifacts, and success criteria. You review and approve.

**Execution:** AI creates TODO.md and executes phases:
- Phase 1 produces `01-competitors.md` (7 competitors identified)
- Phases 2a & 2b run in parallel, produce `02a-positioning.md` and `02b-content.md`
- Phase 3 reads both artifacts, produces `03-synthesis.md`
- Final consolidation creates `RESEARCH.md`

TODO.md updates after each phase showing progress.

**Result:** Complete research with:
- Final `RESEARCH.md` summarizing findings and recommendations
- Artifact trail showing how conclusions were reached
- Markdown references connecting claims to evidence
- Clear next steps based on findings

**What you get:**
- Complete audit trail (PLAN → TODO → Artifacts → Final output)
- Traceable insights (every claim links to supporting analysis)
- Reusable artifacts (can update competitor list, reuse analyses)
- Structured knowledge (ready to inform strategy work)

---

## Part 9: Common Pitfalls

**1. Over-Orchestrating Simple Tasks**
- Creating elaborate plans for 5-minute edits
- Fix: If planning takes longer than doing → don't orchestrate

**2. Under-Orchestrating Complex Work**
- Trying to do multi-step research in one prompt
- Fix: If 3+ distinct activities or >15 minutes → orchestrate

**3. Vague Phase Definitions**
- "Phase 1: Research stuff" (too broad)
- Fix: Specify inputs, outputs, and success criteria

**4. Missing Parallelization**
- Running independent analyses sequentially
- Fix: If phases read same input but produce different outputs → run in parallel (2a, 2b, 2c)

**5. Broken Artifact Naming**
- `competitors.md`, `positioning_analysis.md` (inconsistent)
- Fix: Always use `{phase-number}{letter}-{name}.md` format

**6. TODO.md Not Updated**
- Phases complete but progress not tracked
- Fix: Update TODO.md immediately after each phase

**7. Lost Context Between Phases**
- Later phases don't reference earlier artifacts
- Fix: Always specify input artifact paths in PLAN.md

**8. No Final Synthesis**
- Artifacts exist but no consolidated output
- Fix: Always create final RESEARCH/STRATEGY/CONTENT.md with synthesized insights

---

## Summary

### Core Concepts

**Orchestration** breaks complex work into phases with:
- **PLAN.md** - Blueprint (objectives, phases, artifacts, success criteria)
- **TODO.md** - Progress tracker (updated after each phase)
- **Artifacts/** - Phase outputs (`{phase-number}{letter}-{name}.md`)

**When to orchestrate:** 3+ distinct phases, >15 minutes, needs progress tracking

**Key patterns:**
- Single responsibility per phase
- Clear inputs/outputs
- Parallelization (2a, 2b, 2c for independent tasks)
- Final synthesis (RESEARCH/STRATEGY/CONTENT.md)

### Connection to AMA

- Solves context overload (Class 1)
- Those `YYYY-MM-DD@HH:mm/` folders from Class 3? Orchestrated workflows
- Coordinates agent delegation (Class 6)
- Packaged in agentic-orchestrating skill (Class 7)

### Next: Class 9

Advanced patterns - wrapper commands, feedback loops, dynamic task generation, quality review stages.
