# Class 7: Agentic Orchestration

**Course:** AMA Fundamentals
**Class Number:** 7 of 7
**Estimated Time:** 60-90 minutes
**Prerequisites:** Classes 1-6 (MCP, IDE, Commands, Sub-agents, AMA Framework, Skills)

---

## Class Overview

You've built a powerful system. MCP brings in real-world data. Commands trigger workflows. Sub-agents specialize. The AMA framework organizes everything. Skills package your methodology. **But you're still the coordinator.**

Every complex task requires you to:
- Remember to create the execution folder with correct timestamp
- Tell Claude to create PLAN.md before starting
- Remind it to follow AMA structure (`/brand/research/{domain}/{timestamp}/`)
- Track which phase it's on manually
- Ensure it's updating TODO.md
- Fix it when files end up in the wrong place

**You've automated the work, but not the coordination.** You're babysitting the system to make sure it follows its own rules.

**This class introduces orchestration—the pattern that makes the system self-coordinating.**

### Learning Objectives

By the end of this class, you will:

1. **Identify the problems:** Why manual coordination creates overhead: inconsistent execution, high cognitive load, fragile adherence to AMA conventions
2. **Understand the solution:**
    - How the PLAN → IMPLEMENT pattern structures complex work
    - How the `agentic-orchestrating` skill automates AMA compliance
    - When orchestration is necessary (and when it's overkill)
3. **Recognize the improvement:**
    - Reliability (system follows conventions automatically)
    - Visibility (work is broken down transparently with progress tracking)
    - Reduced overhead (approve plan, system executes correctly)

---

## Part 1: Where You Are Right Now

### The Fully-Featured Manual System

**From Classes 1-6, you now have:**
- ✅ **MCP** - Real-world data access (Class 1)
- ✅ **File system** - Persistent shared memory (Class 2)
- ✅ **Commands** - Reusable workflows (Class 3)
- ✅ **Sub-agents** - Specialized workers (Class 4)
- ✅ **AMA framework** - Organized structure (Class 5)
- ✅ **Skills** - Packaged methodology (Class 6)

**This is a complete system.** You have all the pieces.

### What You're Doing Now

When you run a complex workflow:

```
You: /research:competitive-landscape [5 competitors]

You: "Create the execution folder in /brand/research/competitive-analysis/"
You: "Use the timestamp format YYYY-MM-DD@HH:mm"
You: "Create a PLAN.md first before starting"
You: "Remember to delegate to the Analyst agent"
You: "Save artifacts to the artifacts/ folder"
You: "Update TODO.md as you go"
You: "Make sure the final output is RESEARCH.md"

Claude: [Starts work]

Claude: [Saves file to /brand/research/competitor-analysis.md]
You: "No, that should be in /brand/research/competitive-analysis/2025-11-13@14:30/RESEARCH.md"

Claude: [Fixes it, continues]
Claude: [Creates artifact as analysis-positioning.md]
You: "Use the phase naming pattern: 01-positioning.md"

Claude: [Fixes it, continues]
You: [Checking constantly to make sure it's following the rules]
```

**Sound familiar?**

You're spending mental energy on **coordination and compliance** instead of strategic decisions.

---

## Part 2: The Problems (And How They Affect Design Attributes)

### Problem 1: System Lacks Reliability - Not Properly Adhering to AMA Principles

**What is reliability?**
Reliability means the system consistently follows its own conventions without constant human intervention.

**The problem:**

You have well-defined conventions from Class 5 (AMA Framework):
- Execution folders use temporal format: `{YYYY-MM-DD@HH:mm}/`
- Files go in specific locations: `/brand/{base-dir}/{domain}/{timestamp}/`
- Complex work needs PLAN.md before execution
- Progress tracked in TODO.md
- Artifacts named with phase pattern: `{phase-number}{letter}-{name}.md`

**But Claude doesn't automatically follow these conventions.** You have to remind it every time.

```
Expected behavior:
/brand/research/competitive-analysis/2025-11-13@14:30/
├── PLAN.md
├── TODO.md
├── artifacts/
│   ├── 01-competitors.md
│   ├── 02a-positioning.md
│   └── 02b-messaging.md
└── RESEARCH.md

Actual behavior (without orchestration):
/brand/research/
├── competitor-analysis.md        ← Wrong location
├── competitive-landscape.md      ← Wrong location
└── research-output.md            ← Wrong location, wrong name
```

**Why this matters:** You can't scale if you're manually fixing file locations and folder structures every session.

---

### Problem 2: High Managerial Overhead

**What is managerial overhead?**
The mental and time cost of coordinating work that should be automated.

**The problem:**

Complex workflows require you to:
- **Pre-execution:** Remember to create execution folder, request PLAN.md, verify structure
- **During execution:** Track progress, remind about TODO updates, check file locations
- **Post-execution:** Verify artifacts are properly named, output is in right place

**The cost:**
```
Complex competitive research workflow:
- Core work: 20 minutes (scraping, analysis, synthesis)
- Coordination overhead: 15 minutes (reminding, fixing, checking)
→ 43% of time spent on coordination, not strategy
```

**Why this matters:** You hired AI to automate work, but you're manually coordinating the AI. The system should coordinate itself.

---

### Problem 3: Lack of Visibility Into Work To Be Done

**What's happening:**

Complex work happens as a black box:
- You don't see the breakdown before execution starts
- No progress tracking during execution
- Can't tell what phase it's on or what's left
- If it fails midway, you don't know what was completed

**Example:**
```
You: "Analyze 5 competitors across positioning, messaging, and pricing"

Claude: [Working... 10 minutes pass]
Claude: "I've encountered an error. Should I continue?"

You: "What did you finish? What's left?"
Claude: "I analyzed 3 competitors for positioning... I think?"
```

**Why this matters:** Complex work without visibility is risky. You can't resume if interrupted, can't see progress, can't verify completeness.

---

## Part 3: The Common Workaround (And Why It Adds Overhead)

### Workaround: Being Very Explicit Every Time

**What people do:**

Manually tell Claude what to do at each step:

```
Session 1:
You: "Create folder /brand/research/competitive-analysis/2025-11-13@14:30/"
You: "Create PLAN.md with 3 phases..."
You: "Now execute phase 1 and save to artifacts/01-competitors.md"
You: "Update TODO.md"
You: "Now phase 2..."

Session 2 (next day):
You: "Create folder /brand/research/competitive-analysis/2025-11-14@10:15/"
You: [Repeats all the same instructions again]
```

**Why this creates massive overhead:**

❌ **Every complex task = 10+ coordination messages** - You're explaining the process every time
❌ **Can't scale** - Only works if you're hands-on every session
❌ **Easy to forget steps** - Miss TODO update, forget artifact naming pattern
❌ **Context filled with coordination** - Instructions about folder structure, not strategic thinking
❌ **Teammates can't use the system** - They don't know the incantations

**The cost:**
```
Without orchestration: 15 minutes overhead per complex task
With orchestration: 2 minutes (review plan, approve, done)

10 complex tasks/week:
Without: 150 minutes overhead
With: 20 minutes overhead
→ 130 minutes saved/week on coordination alone
```

**You've built powerful tools but you're manually operating them every time.**

---

## Part 4: The Solution - Orchestration as Self-Coordination

### What Is Orchestration?

**Orchestration means the system coordinates itself according to its own conventions.**

Instead of you reminding Claude about AMA structure, temporal folders, PLAN.md, TODO.md, and artifact naming—the system automatically follows these patterns for complex work.

**How it works:**
```
You: /research:competitive-landscape [5 competitors]

Claude: [Recognizes this is complex, multi-phase work]
Claude: [Automatically creates execution folder with timestamp]
Claude: [Generates PLAN.md with phase breakdown]
Claude: "Here's my plan. Approve to proceed?"

You: "Approved"

Claude: [Creates TODO.md, executes phases systematically]
Claude: [Updates TODO.md after each phase]
Claude: [Names artifacts correctly: 01-competitors.md, 02a-positioning.md]
Claude: [Saves final output to RESEARCH.md]
Claude: "Complete. Results in /brand/research/competitive-analysis/2025-11-13@14:30/"
```

**The difference:**
- **Before:** You coordinate every step (15 messages, 15 minutes overhead)
- **After:** System coordinates itself (1 approval, 2 minutes)

---

### The PLAN → IMPLEMENT Pattern

Orchestration uses a two-phase approach for complex work:

**Phase 1: PLAN (Before execution)**

System automatically:
1. Creates execution folder: `/brand/{base-dir}/{domain}/{timestamp}/`
2. Generates `PLAN.md` with:
   - Objective (what we're trying to achieve)
   - Approach (how we'll do it)
   - Phase breakdown (sequential work broken into focused steps)
   - Expected artifacts (what each phase produces)
   - Success criteria (how we know it's done right)
3. Shows you the plan for approval

**Phase 2: IMPLEMENT (After approval)**

System automatically:
1. Creates `TODO.md` with phase checklist
2. Executes each phase systematically
3. Names artifacts using phase pattern: `{phase-number}{letter}-{name}.md`
4. Updates `TODO.md` after each phase completion
5. Produces final output: `RESEARCH.md`, `STRATEGY.md`, or `CONTENT.md`
6. Reports completion with file path

**Why this pattern works:**
- ✅ **Visibility** - You see the breakdown before execution starts
- ✅ **Reliability** - System follows AMA conventions automatically
- ✅ **Resumability** - If interrupted, TODO.md shows what's done
- ✅ **Reduced overhead** - Approve once, system handles coordination

---

### The `agentic-orchestrating` Skill

Remember from Class 6 that skills package complex methodology? The `agentic-orchestrating` skill packages **how to coordinate complex work** following AMA conventions.

**What it contains:**
```
/.claude/skills/agentic-orchestrating/
├── SKILL.md                    ← When to orchestrate, overview
├── /references/
│   ├── planning.md             ← How to create effective PLAN.md
│   ├── implementation.md       ← How to execute with TODO.md tracking
│   ├── delegation.md           ← How to coordinate sub-agents
│   └── artifact-management.md  ← How to name and organize artifacts
└── /data/
    └── templates/
        ├── PLAN-template.md
        └── TODO-template.md
```

**How it works:**

When Claude recognizes complex work, it:
1. Invokes the `agentic-orchestrating` skill automatically
2. Loads `planning.md` reference → generates proper PLAN.md
3. After approval, loads `implementation.md` → executes with TODO tracking
4. Follows AMA conventions from references → files go in right places
5. Uses `delegation.md` → coordinates sub-agents effectively

**Result:** You get AMA-compliant orchestration without manually coordinating every step.

---

### When to Use Orchestration

Orchestration is powerful but has overhead. Use it strategically:

**Use orchestration for:**

✅ **3+ distinct phases** - Multiple steps that produce intermediate outputs
✅ **Parallel work** - Independent analyses that converge later (2a, 2b, 2c)
✅ **Long-running work** - Tasks >15 minutes where progress tracking matters
✅ **Complex delegation** - Work requiring multiple sub-agents
✅ **AMA-compliant executions** - Any work going into `/brand/` structure

**Skip orchestration for:**

❌ **Simple edits** - Read file, make change, write (use Edit tool directly)
❌ **Single-step tasks** - No phases, just direct execution
❌ **Quick work** - <5 minutes with one output

**The decision rule:**

```
Ask: "Would I want to see a plan before this starts?"

If YES → Orchestrate
If NO → Execute directly
```

---

### Real Example: Competitive Landscape Research

**Without orchestration (manual coordination):**

```
You: "Research 5 eco-friendly skincare competitors"
You: "Create /brand/research/competitive-analysis/2025-11-13@14:30/"
You: "Create PLAN.md first"
You: "Phase 1: identify competitors, save to artifacts/01-competitors.md"
You: "Update TODO.md after phase 1"
You: "Phase 2: analyze each, use parallel: 02a-02e for each competitor"
You: "Don't forget the phase naming convention"
You: "Phase 3: synthesize to 03-synthesis.md"
You: "Final output to RESEARCH.md"
[10 messages, 15 minutes coordination overhead]
```

**With orchestration (self-coordinating):**

```
You: /research:competitive-landscape eco-friendly skincare (5 competitors)

Claude: [Creates /brand/research/competitive-analysis/2025-11-13@14:30/]
Claude: [Generates PLAN.md]

PLAN.md preview:
Objective: Analyze competitive landscape for eco-friendly skincare
Approach: Identify competitors, parallel analysis, synthesis
Phases:
- Phase 1: Identify 5 competitors → 01-competitors.md
- Phase 2: Analyze each (parallel) → 02a-brandA.md through 02e-brandE.md
- Phase 3: Synthesize findings → 03-synthesis.md
Success: Positioning gaps identified, strategic recommendations provided

Claude: "Plan created. Approve to proceed?"

You: "Approved"

Claude: [Creates TODO.md, executes systematically]
Claude: [Updates TODO after each phase]
Claude: [Completes] "Research complete: /brand/research/competitive-analysis/2025-11-13@14:30/RESEARCH.md"

[2 messages, 2 minutes coordination]
```

**The difference:**
- Time: 15 minutes → 2 minutes
- Messages: 10 coordination messages → 1 approval
- Reliability: Manual folder creation → Automatic AMA compliance
- Visibility: Black box → Clear phase breakdown and progress tracking

---

## Part 5: What Changed

Orchestration solves the coordination problem while maintaining everything you've built:

| Design Attribute | Class 6 End | Class 7 with Orchestration |
|-----------------|-------------|----------------------------|
| Groundedness | ✅ High | ✅ Stays high |
| Friction | ✅ Low | ✅ **Even lower** (no coordination overhead) |
| Scalability | ✅ High | ✅ Stays high |
| Navigability | ✅ High | ✅ Stays high |
| Maintainability | ✅ High | ✅ Stays high |
| Modularity | ✅ High | ✅ Stays high |
| Reliability | ❌ Inconsistent AMA compliance | ✅ **NEW - Solved** (automatic conventions) |
| Visibility | ❌ Black box execution | ✅ **NEW - Solved** (PLAN + TODO tracking) |
| Managerial Overhead | ❌ High (manual coordination) | ✅ **NEW - Solved** (self-coordinating) |

**Core improvement:** The system now coordinates itself according to its own conventions. You approve plans, the system executes reliably.

---

## Part 6: Where You Are Now

**The shift:**
```
Before: Powerful tools, manual coordination every session
After:  Self-coordinating system following AMA conventions automatically
```

Your system now:
- **Coordinates itself** - Recognizes complex work, creates proper structure
- **Plans before executing** - Shows you the approach for approval
- **Tracks progress** - TODO.md updated throughout execution
- **Follows conventions** - AMA structure, temporal folders, artifact naming
- **Visible** - You see what's happening, what's done, what's left
- **Reliable** - Consistent execution, no manual fixing

**What you've built across 7 classes:**

```
Class 1: MCP                  → Real-world data access
Class 2: IDE + Files          → Persistent shared memory
Class 3: Commands             → Reusable workflows
Class 4: Sub-agents           → Specialized workers
Class 5: AMA Framework        → Organized structure
Class 6: Skills               → Packaged methodology
Class 7: Orchestration        → Self-coordinating system
                                ↓
                    A Complete Agentic Marketing System
```

You now have a **100x marketing system**—every piece working together, coordinating automatically, following conventions reliably.

---

## Summary

**What you learned:**
- **Orchestration** - The system coordinates itself according to AMA conventions
- **PLAN → IMPLEMENT** - Two-phase pattern for visible, reliable execution
- **agentic-orchestrating skill** - Packages coordination methodology
- **When to orchestrate** - Complex multi-phase work (3+ phases, >15 minutes)

**Key insight:** The final piece isn't another tool—it's making the system self-coordinating.

**What this means:**

You're no longer a prompt engineer manually coordinating AI every session.

**You're a Marketing Architect with self-coordinating infrastructure.**

Your commands trigger workflows. Your skills package methodology. Your framework organizes knowledge. Your orchestration coordinates execution.

Type `/research:competitive-landscape [topic]` → Approve plan → Get AMA-compliant research.
Type `/strategy:positioning` → Approve plan → Get strategy synthesized from research.
Type `/content:twitter-thread [topic]` → Approve plan → Get on-brand content.

**The system scales with you, not against you.**

---

## Next Steps

**You've completed the AMA Fundamentals course.** You now understand:
- Why traditional AI approaches fail at scale (context limits, hallucination, friction)
- How file-based systems solve these problems (persistence, groundedness, progressive disclosure)
- How to build self-coordinating marketing infrastructure (commands, agents, skills, orchestration)

**From here:**
- **Implement your system** - Set up your own AMA architecture
- **Develop your domains** - Build research, strategy, content specific to your brand
- **Create your skills** - Package your unique methodology and frameworks
- **Scale your leverage** - Become a 100x marketer through infrastructure, not hustle

**The difference between you and everyone else using ChatGPT:**

They have a chat window that forgets.
**You have infrastructure that compounds.**
