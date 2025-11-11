# Class 7: Claude Code Skills

**Course:** AMA Fundamentals
**Class Number:** 7 of 9
**Estimated Time:** 75 minutes
**Prerequisites:** Class 5 (Commands), Class 6 (Sub-agents)

---

## Class Overview

In Class 5, you learned about commands - reusable prompts that trigger specific workflows. In Class 6, you learned about sub-agents - specialized AI personas that handle domain-specific work. Now it's time to combine these concepts into something more powerful: **skills**.

**What you'll learn:**
- What skills are and when to use them vs commands
- How skills package complete workflows with context, data, and instructions
- The anatomy of a skill (SKILL.md, /references/, /data/)
- How to navigate and use existing skills effectively
- Introduction to the agentic-orchestrating skill (the foundation for Classes 8-9)

**Why this matters:**
Skills are the "apps" of your AMA system. While commands are single prompts and sub-agents are specialized personas, skills are complete workflow packages that combine prompts, context, data, and specialized instructions into reusable tools. They're how you scale marketing operations from "one-off tasks" to "repeatable systems."

---

## Learning Objectives

By the end of this class, you will:

1. **Understand** what skills are and when to use them
2. **Navigate** skill structure (SKILL.md, /references/, /data/)
3. **Distinguish** between skills and commands (workflows vs prompts)
4. **Use** existing skills effectively in your workflows
5. **Recognize** the agentic-orchestrating skill as the orchestration foundation
6. **Know** when to invoke a skill vs create a custom command

---

## What Are Skills?

### The Simple Definition

**Skills are packaged, reusable workflows stored in `/.claude/skills/`.**

Think of them as specialized "apps" that extend Claude's capabilities with domain-specific knowledge, workflows, and tools.

### Skills vs Commands: The Key Difference

You already learned about commands in Class 5. Here's how skills differ:

| Feature | Commands | Skills |
|---------|----------|--------|
| **Purpose** | Single prompt trigger | Complete workflow package |
| **Structure** | One file (`.md`) | Multiple files + folders |
| **Complexity** | Simple (1-2 steps) | Complex (multi-step workflows) |
| **Context** | Minimal | Rich (references, data, examples) |
| **When to use** | Repeated prompts | Repeated workflows |
| **Example** | "Generate tweet" | "Full content creation workflow" |

**Simple analogy:**
- **Command** = A calculator app (does one thing, does it well)
- **Skill** = Microsoft Excel (complete toolkit with formulas, templates, data)

### Why This Matters for AMA

In marketing, many workflows are complex:
- **Research** requires methodology, templates, analysis frameworks
- **Strategy synthesis** requires reference to multiple research sources, strategic frameworks, and synthesis patterns
- **Content creation** requires brand voice, messaging, audience context, platform guidelines

Commands can't hold all this context. Skills can.

---

## When to Use Skills vs Commands

### Use a Command When:
- You have a simple, repeatable prompt
- The workflow is 1-2 steps max
- You don't need supporting data or reference materials
- Examples: "/generate-tweet", "/summarize-research", "/check-grammar"

### Use a Skill When:
- The workflow requires multiple steps
- You need supporting reference materials, templates, or data
- The workflow requires specialized knowledge or frameworks
- You want to package a complete methodology
- Examples: Content creation workflows, research analysis, strategy synthesis

### The Decision Tree

```
Do you need supporting context (templates, data, frameworks)?
├─ No → Use a command
└─ Yes → Use a skill
    │
    Does the workflow have 3+ distinct steps?
    ├─ No → Consider a command (keep it simple)
    └─ Yes → Use a skill
```

---

## Anatomy of a Skill

Skills live in `/.claude/skills/` and follow a standard structure:

```
/.claude/skills/
└── {skill-name}/
    ├── SKILL.md          ← Main skill definition (required)
    ├── /references/      ← Supporting context files (optional)
    │   ├── guide-1.md
    │   └── guide-2.md
    └── /data/            ← Templates, examples, datasets (optional)
        ├── template.md
        └── examples.csv
```

### SKILL.md - The Entry Point

`SKILL.md` is the main file that defines:
1. **What the skill does** (purpose and capabilities)
2. **When to use it** (scenarios and triggers)
3. **How to use it** (instructions for the agent)
4. **What resources are available** (references to /references/ and /data/)

**Think of SKILL.md as:**
- An instruction manual for the AI agent
- A workflow definition document
- A reference guide to supporting materials

### /references/ - Supporting Context

The `/references/` folder contains supporting context that helps the agent execute the skill:
- Methodologies and frameworks
- Best practices and guidelines
- Domain-specific knowledge
- Step-by-step instructions for complex workflows

**Progressive disclosure pattern:**
- SKILL.md references specific files in `/references/`
- Agent loads only what's needed for the current task
- Keeps context window efficient while providing deep capabilities

### /data/ - Templates and Examples

The `/data/` folder contains:
- Templates (markdown, forms, structures)
- Examples (reference materials, case studies)
- Datasets (CSV, JSON, structured data)

**Example use cases:**
- Content templates for consistent structure
- Example outputs for tone/style reference
- Data sets for analysis or synthesis

---

## Real Example: The agentic-orchestrating Skill

Let's look at the most important skill in AMA: **agentic-orchestrating**.

### Location
```
/.claude/skills/agentic-orchestrating/
├── SKILL.md
└── /references/
    ├── planning.md
    ├── implementation.md
    ├── resuming.md
    ├── delegation.md
    ├── artifacts.md
    └── progress-tracking.md
```

### What It Does

The agentic-orchestrating skill defines **how to manage complex, multi-step workflows** in AMA. It's the foundation for everything you'll learn in Classes 8-9 about orchestration.

**Core capabilities:**
1. **Planning** - How to create PLAN.md for complex work
2. **Implementation** - How to execute plans with TODO.md tracking
3. **Delegation** - When and how to delegate to sub-agents
4. **Artifact Management** - How to organize outputs and supporting materials
5. **Progress Tracking** - How to mark tasks complete and update status
6. **Resuming** - How to pick up incomplete work

### Why It Matters

Without agentic-orchestrating, every agent would orchestrate work differently. This skill provides:
- **Consistency** - All agents follow the same orchestration patterns
- **Predictability** - You know what to expect from complex workflows
- **Auditability** - Clear PLAN.md and TODO.md show exactly what happened
- **Scalability** - Patterns work for simple and complex projects

**You'll dive deep into this skill in Classes 8-9.**

---

## How Skills Work: The Invocation Pattern

### Invoking a Skill

Skills are invoked using the `Skill` tool:

```
Use the "researching" skill to conduct competitive analysis.
```

When invoked:
1. Agent loads SKILL.md as context
2. Agent follows instructions defined in SKILL.md
3. Agent loads referenced files from /references/ as needed
4. Agent uses templates/data from /data/ as needed
5. Agent executes the workflow

### Progressive Loading

Skills use **progressive disclosure** to manage context efficiently:

```
Agent reads: SKILL.md
    ↓ references
Agent loads: /references/planning.md (only when planning)
    ↓ references
Agent loads: /data/template.md (only when creating output)
```

This keeps context windows lean while providing deep capabilities.

---

## Example Skills in AMA

Let's look at common skills you might encounter:

### 1. researching
**Purpose:** Conduct structured research with proper methodology
**When to use:** Any research workflow (competitive analysis, customer insights, market analysis)
**Contains:**
- Research methodologies
- Analysis frameworks
- Source evaluation criteria
- Synthesis patterns

### 2. synthesizing-strategy
**Purpose:** Transform research into actionable strategy
**When to use:** Creating or updating strategy documents
**Contains:**
- Synthesis frameworks
- Strategy templates
- Reference patterns for citing research
- Validation criteria

### 3. creating-content
**Purpose:** Generate on-brand content guided by strategy
**When to use:** Content creation workflows across channels
**Contains:**
- Content structure templates
- Brand voice guidelines
- Platform-specific best practices
- Quality check criteria

### 4. change-management
**Purpose:** Track and communicate changes to strategy documents
**When to use:** Updating STRATEGY.md or RESEARCH.md with new findings
**Contains:**
- CHANGELOG update patterns
- Comparison methodologies
- Communication templates

---

## Navigating Skills: A Practical Guide

### Step 1: Find Available Skills

Skills are located in `/.claude/skills/`.

**To discover skills:**
```bash
ls .claude/skills/
```

**You'll see:**
```
agentic-orchestrating/
researching/
synthesizing-strategy/
creating-content/
change-management/
```

### Step 2: Read SKILL.md First

Always start with SKILL.md to understand:
- What the skill does
- When to use it
- What resources are available

**Example:**
```
Read: .claude/skills/researching/SKILL.md
```

### Step 3: Explore /references/ for Depth

If you need deeper context, look at `/references/`:

```
.claude/skills/researching/
└── /references/
    ├── methodology.md       ← How to structure research
    ├── source-evaluation.md ← How to assess sources
    └── synthesis.md         ← How to synthesize findings
```

### Step 4: Check /data/ for Templates

If the skill has templates or examples:

```
.claude/skills/creating-content/
└── /data/
    ├── blog-template.md
    ├── twitter-template.md
    └── linkedin-template.md
```

---

## Skills vs Commands vs Sub-agents: The Complete Picture

You've now learned three delegation mechanisms. Here's how they fit together:

### Commands (Class 5)
- **What:** Reusable prompts
- **When:** Simple, repeated tasks
- **Example:** `/generate-tweet "topic"`

### Sub-agents (Class 6)
- **What:** Specialized AI personas
- **When:** Domain-specific expertise needed
- **Example:** Analyst agent for research work

### Skills (Class 7)
- **What:** Packaged workflows with context
- **When:** Complex, multi-step processes
- **Example:** Full content creation workflow

### How They Work Together

```
You → /research (Command)
    ↓ invokes
Skills: "researching" skill
    ↓ delegates to
Sub-agents: Analyst agent
    ↓ follows
Workflow: agentic-orchestrating skill patterns
    ↓ produces
Output: Research execution in /brand/research/{domain}/{timestamp}/
```

**Real workflow example:**
1. You run `/research competitive-analysis`
2. Command invokes "researching" skill
3. Skill delegates to Analyst sub-agent
4. Analyst follows agentic-orchestrating patterns (PLAN.md → TODO.md)
5. Output: Structured research in temporal execution folder

**All three work together.**

---

## Common Skill Patterns

### Pattern 1: Methodology Skills

**Purpose:** Provide frameworks and methodologies for specialized work

**Structure:**
```
/skill-name/
├── SKILL.md (overview of methodology)
└── /references/
    ├── framework.md
    ├── process.md
    └── checklist.md
```

**Example:** researching, synthesizing-strategy

### Pattern 2: Template Skills

**Purpose:** Provide templates and examples for consistent outputs

**Structure:**
```
/skill-name/
├── SKILL.md (how to use templates)
└── /data/
    ├── template-1.md
    ├── template-2.md
    └── examples/
```

**Example:** creating-content, landing-page-conversion

### Pattern 3: Orchestration Skills

**Purpose:** Define how to coordinate complex, multi-step workflows

**Structure:**
```
/skill-name/
├── SKILL.md (orchestration overview)
└── /references/
    ├── planning.md
    ├── execution.md
    ├── delegation.md
    └── tracking.md
```

**Example:** agentic-orchestrating (the primary orchestration skill)

---

## The agentic-orchestrating Skill: A Preview

This skill is so important it gets its own section. You'll spend Classes 8-9 mastering it.

### What It Teaches Agents

The agentic-orchestrating skill teaches every agent how to:

1. **Plan before executing** (PLAN.md pattern)
2. **Track progress transparently** (TODO.md pattern)
3. **Break down complexity** (progressive task breakdown)
4. **Delegate appropriately** (when to use sub-agents)
5. **Manage artifacts** (where to put supporting materials)
6. **Resume interrupted work** (pick up where you left off)

### Why It's Essential

Without this skill:
- Every agent would orchestrate differently
- Complex work would be chaotic
- Progress would be invisible
- Resuming work would be impossible

With this skill:
- Consistent patterns across all workflows
- Transparent progress tracking
- Clear artifacts and outputs
- Predictable, auditable execution

### Preview: PLAN.md and TODO.md

**PLAN.md** = Your workflow blueprint
- What you're building
- Why you're building it
- How you'll execute (phases, tasks, delegation)
- What success looks like

**TODO.md** = Your progress tracker
- Tasks listed (one per line)
- Current status (pending, in_progress, completed)
- Real-time updates as work progresses

**You'll learn this pattern in depth in Class 8.**

---

## When to Create a Skill (vs Using Commands)

### Don't Create a Skill If:
- A command would work (keep it simple)
- The workflow is used only once or twice
- You don't have supporting materials (references/data)
- The workflow is still experimental (use commands to iterate first)

### Create a Skill If:
- The workflow is used frequently across projects
- You have substantial supporting context (templates, frameworks, examples)
- Multiple people will use the workflow (skills are team-scalable)
- The workflow has proven value and stability

### The Skill Creation Journey

```
Ad-hoc prompt
    ↓ (repeated use)
Extract to Command
    ↓ (add complexity)
Add supporting context
    ↓ (package everything)
Create Skill
```

**Start simple. Evolve to skills only when necessary.**

---

## Skills and the AMA Marketing Framework

Skills operate at every layer of the AMA framework:

### Research Layer
**Skills used:**
- `researching` - Structured research methodologies
- `agentic-orchestrating` - Complex research executions

**Output:** `/brand/research/{domain}/{timestamp}/`

### Strategy Layer
**Skills used:**
- `synthesizing-strategy` - Research → strategy synthesis
- `change-management` - Update STRATEGY.md with CHANGELOG
- `agentic-orchestrating` - Complex strategy development

**Output:** `/brand/strategy/{domain}/{timestamp}/`

### Content Layer
**Skills used:**
- `creating-content` - Strategy-guided content creation
- Platform-specific skills (e.g., `landing-page-conversion`)
- `agentic-orchestrating` - Complex content workflows

**Output:** `/brand/content/{type}/{timestamp-slug}/`

### The Connection

```
Research skill
    ↓ generates
RESEARCH.md (index)
    ↓ feeds into
Strategy skill
    ↓ generates
STRATEGY.md (index)
    ↓ guides
Content skill
    ↓ generates
CONTENT.md (final output)
```

**Skills move work through the three-layer framework.**

---

## Practical Examples

### Example 1: Using the researching Skill

**Scenario:** You need to conduct competitive analysis.

**Without skill (ad-hoc):**
```
"Research our top 3 competitors and summarize their positioning."
```

**Result:** Inconsistent structure, no methodology, hard to compare with past research.

**With skill:**
```
Use the "researching" skill to conduct competitive analysis on competitors X, Y, Z.
```

**Result:**
- Structured methodology from skill
- Consistent output format
- Proper citations and references
- Temporal execution folder created
- PLAN.md and TODO.md for transparency
- Output integrates with existing research index

### Example 2: Using the synthesizing-strategy Skill

**Scenario:** You need to update brand positioning based on new research.

**Without skill:**
```
"Create a positioning strategy based on the latest competitive analysis."
```

**Result:** Strategy lacks references to research, no evolution tracking, no change management.

**With skill:**
```
Use the "synthesizing-strategy" skill to update positioning based on research findings in /brand/research/competitive-analysis/RESEARCH.md.
```

**Result:**
- Strategy references specific research findings (audit trail)
- CHANGELOG.md tracks what changed and why
- Proper comparison with existing STRATEGY.md
- Clear markdown references for traceability
- Follows AMA synthesis patterns

### Example 3: When NOT to Use a Skill

**Scenario:** You need to generate a single tweet.

**Wrong approach:**
```
Use the "creating-content" skill to generate a tweet.
```

**Why wrong:** Overkill. Skills are for complex workflows, not one-off simple tasks.

**Right approach:**
```
/generate-tweet "AI in marketing"
```

Or just ask directly:
```
Generate a tweet about AI in marketing using our brand voice.
```

**Rule:** Don't over-engineer. Use the simplest tool that works.

---

## Common Pitfalls to Avoid

### Pitfall 1: Using Skills for Simple Tasks
**Problem:** Invoking a complex skill for a simple prompt
**Solution:** Ask yourself: "Does this need workflow orchestration?" If no, use a command or direct prompt.

### Pitfall 2: Ignoring Skill References
**Problem:** Using a skill without reading SKILL.md or /references/
**Solution:** Always read SKILL.md first to understand capabilities and patterns.

### Pitfall 3: Creating Too Many Skills Too Soon
**Problem:** Creating skills before patterns are proven
**Solution:** Start with commands, evolve to skills only when patterns stabilize.

### Pitfall 4: Not Following Skill Instructions
**Problem:** Invoking a skill but ignoring its defined workflow
**Solution:** Trust the skill. If it says "create PLAN.md first," do it.

### Pitfall 5: Confusing Skills with Sub-agents
**Problem:** Thinking skills are personas (they're not)
**Solution:** Skills = workflows. Sub-agents = personas. They work together.

---

## Knowledge Check

Test your understanding:

### Question 1: Skills vs Commands
**Q:** You have a prompt you use weekly: "Generate a LinkedIn post about [topic] using our brand voice." Should this be a command or a skill?

**A:** Command. It's simple, repeatable, and doesn't require supporting context or multi-step workflows.

---

### Question 2: Skill Structure
**Q:** You're looking at a skill and see:
```
/new-skill/
├── SKILL.md
├── /references/
│   └── guide.md
└── /data/
    └── template.md
```

What should you read first to understand what this skill does?

**A:** SKILL.md - it's the entry point that explains purpose, usage, and references to supporting materials.

---

### Question 3: When to Invoke
**Q:** You need to conduct a multi-phase research project with 5+ data sources and synthesis into strategy. Should you:
- A) Write a long prompt
- B) Create a custom command
- C) Invoke a skill
- D) Delegate to a sub-agent directly

**A:** C - Invoke a skill. This is complex work requiring methodology, orchestration, and supporting context. The "researching" skill + "agentic-orchestrating" skill would handle this.

---

### Question 4: The agentic-orchestrating Skill
**Q:** What does the agentic-orchestrating skill teach agents to do?

**A:** It teaches how to manage complex, multi-step workflows using PLAN.md, TODO.md, delegation, artifact management, and progress tracking patterns.

---

### Question 5: Progressive Disclosure
**Q:** Why do skills use /references/ folders instead of putting everything in SKILL.md?

**A:** Progressive disclosure - agents load only what they need, when they need it. This keeps context windows efficient while providing deep capabilities when required.

---

## Practical Exercise

### Exercise: Explore a Skill

**Goal:** Understand how to navigate and use an existing skill.

**Steps:**
1. Pick a skill: `/.claude/skills/agentic-orchestrating/`
2. Read `SKILL.md` - understand what it does
3. List files in `/references/` - see what supporting context exists
4. Read one reference file (e.g., `planning.md`)
5. Identify: When would you invoke this skill?

**Expected outcome:**
- You can describe what the skill does
- You know what supporting materials are available
- You understand when to use it vs a simple command

---

## Summary & Key Takeaways

### What You Learned

1. **Skills are packaged workflows** - They combine prompts, context, data, and instructions into reusable tools
2. **Skills solve complex problems** - When commands are too simple and sub-agents need guidance, skills provide the methodology
3. **Skills have structure** - SKILL.md (entry point) + /references/ (context) + /data/ (templates/examples)
4. **Progressive disclosure matters** - Skills load only what's needed, keeping context efficient
5. **Skills enable consistency** - The agentic-orchestrating skill ensures all agents orchestrate work the same way

### Skills in the AMA Ecosystem

```
Commands → Skills → Orchestration
   ↓         ↓           ↓
Simple   Complex    Multi-agent
prompts  workflows  coordination
```

### The Hierarchy of Delegation

```
You
 ├─ Commands (simple prompts)
 ├─ Skills (packaged workflows)
 │   └─ Sub-agents (specialized personas)
 │       └─ Orchestration (complex coordination)
 └─ Direct prompts (ad-hoc work)
```

**Choose the right level for the job.**

---

## Connection to Previous Classes

### Classes 1-2: The Foundation
- **Class 1:** You learned about context windows and their limits
- **Class 2:** You learned how files solve context segmentation
- **Class 7:** Skills leverage files to package workflows with rich context while managing context windows efficiently

### Classes 3-4: The Organization
- **Class 3:** You learned the three-layer AMA framework
- **Class 4:** You learned Git for version control
- **Class 7:** Skills operate within this structure and are versioned in Git

### Classes 5-6: The Delegation
- **Class 5:** You learned commands for simple prompts
- **Class 6:** You learned sub-agents for specialization
- **Class 7:** Skills package commands, guide sub-agents, and define workflows

---

## Preview: Classes 8-9

### Class 8: Agent Orchestration Fundamentals
You'll dive deep into the agentic-orchestrating skill and learn:
- How to create PLAN.md for complex work
- How to track progress with TODO.md
- How to structure execution folders
- When orchestration is needed vs overkill

### Class 9: Advanced Orchestration Patterns
You'll master advanced patterns:
- Wrapper commands that invoke skills
- Multi-phase workflows with dynamic task generation
- Feedback loops and validation stages
- Custom workflows for your specific needs

**The agentic-orchestrating skill is the foundation for both classes.**

---

## Success Criteria

You've mastered Class 7 when you can:

✓ **Explain** what skills are and how they differ from commands
✓ **Navigate** skill structure (SKILL.md, /references/, /data/)
✓ **Decide** when to use a skill vs a command vs a direct prompt
✓ **Invoke** existing skills effectively in workflows
✓ **Understand** the agentic-orchestrating skill as the orchestration foundation
✓ **Recognize** how skills fit into the AMA ecosystem

---

## Additional Resources

### In This Course
- [Class 5: Claude Code Commands](/brand/content/courses/2025-11-11@13:37-ama-fundamentals-course/artifacts/02e-class-5-claude-code-commands.md) - Review commands for comparison
- [Class 6: Agent Delegation & Sub-agents](/brand/content/courses/2025-11-11@13:37-ama-fundamentals-course/artifacts/02f-class-6-agent-delegation-sub-agents.md) - Review delegation patterns

### In the AMA System
- [/.claude/skills/agentic-orchestrating/SKILL.md](/.claude/skills/agentic-orchestrating/SKILL.md) - The core orchestration skill
- [CLAUDE.md](/CLAUDE.md) - Complete system architecture reference

### Next Steps
- Move to Class 8 to learn orchestration fundamentals
- Practice: Explore existing skills in your workspace
- Experiment: Invoke a skill in a real workflow

---

**Ready for orchestration? Class 8 teaches you the PLAN.md/TODO.md pattern.**
