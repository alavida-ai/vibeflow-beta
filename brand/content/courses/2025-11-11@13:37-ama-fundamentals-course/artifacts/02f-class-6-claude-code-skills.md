# Class 7: Claude Code Skills

**Course:** AMA Fundamentals
**Class Number:** 7 of 9
**Estimated Time:** 30 minutes
**Prerequisites:** Class 1 (LLM Fundamentals), Class 5 (Commands)

---

## Class Overview

In Class 1, you learned about the context window problem - LLMs can't hold unlimited information. In Class 5, you learned commands solve this by storing prompts in files.

Now you'll learn about **skills** - organized folders that can package complete marketing workflows with reference materials, templates, and frameworks. Skills solve the context problem at scale while making your marketing work organized and repeatable.

### Learning Objectives

By the end of this class, you'll understand:
- What skills are and how they solve the context problem through progressive disclosure
- How skills package marketing workflows into organized folders
- When to use skills vs commands
- How to navigate existing skills in your workspace

---

## The Context Problem (Revisited)

Remember from Class 1: LLMs have limited context windows. You can't load everything at once.

**The challenge for marketing architects:**

Your marketing workflows need access to:
- Research findings and insights
- Brand strategy and positioning
- Voice guidelines and messaging frameworks
- Content templates and examples
- Process methodologies and best practices

**If you try to load all this context at once:** Context overflow. The LLM can't process it.

**If you load nothing:** Generic outputs. No brand consistency.

**Skills solve this through progressive disclosure.**

---

## What Are Skills?

**Skills are organized folders** in `/.claude/skills/` that package complete marketing workflows with supporting materials.

### Basic Structure

```
/.claude/skills/
└── {skill-name}/
    ├── SKILL.md          ← Contains frontmatter + instructions
    ├── /references/      ← Supporting context (frameworks, methodologies, guides)
    ├── /data/            ← Templates, examples, datasets
    └── /scripts/         ← Executable code (optional)
```

**SKILL.md frontmatter** (required):
```yaml
---
name: skill-name
description: What this skill does and when Claude should use it (max 1024 chars)
allowed-tools: Read, Grep, Glob  # Optional: restrict tools when skill is active
---
```

**How skill discovery works:**
- Claude has all skill **descriptions** in its context (like MCP tool descriptions)
- When you make a request, Claude autonomously decides which skill matches based on the description
- Only THEN does Claude load the full SKILL.md file and supporting materials (progressive disclosure)

**Think of it this way:**
- Skill **description** = Always in Claude's context (helps Claude decide when to use it)
- `SKILL.md` file = Loaded only when skill is invoked (progressive disclosure)
- `/references/` = Loaded only when specific context is needed (progressive disclosure)

---

## How Skills Solve the Context Problem

Skills use **progressive disclosure** - load exactly what you need, when you need it.

### Without a Skill (Context Chaos)

You try to conduct customer research:

```
"Here's our research methodology [paste 10 pages]
and our analysis framework [paste 5 pages]
and past research examples [paste 15 pages]
and our synthesis patterns [paste 8 pages]...
now analyze this interview transcript."
```

**Result:** Context overflow. LLM overwhelmed. Poor output.

### With a Skill (Progressive Disclosure)

You make a request:

```
Research this new competitor <competitor name>
```

**What happens (progressive disclosure in action):**
1. Claude checks skill descriptions in its context → finds `researching` skill matches (based on description)
2. Claude invokes the `researching` skill → loads `SKILL.md` file
3. Claude reads SKILL.md instructions → identifies it needs research methodology
4. Claude loads `/workflows/competitor-analysis.md` (only this specific reference, not all files)
5. Claude completes research following the methodology
6. Claude produces output, having loaded only what was needed for this specific task

**Result:** Efficient context usage. Professional output. Consistent methodology.

**Key insight:** Skill description is always in context (like a tool description). SKILL.md and supporting files load only when needed.

---

## Why This Is Transformative for Marketing Architects

Skills organize your marketing knowledge into **discoverable, reusable packages**.

### Before Skills: Knowledge Scattered Everywhere

Your team's marketing expertise is:
- In Sarah's head (she knows how to analyze competitors)
- In Marcus's Google Doc (he has the content template)
- In old Slack threads (that one time someone figured out positioning synthesis)
- Buried in chat history (prompts that worked 3 months ago)

**Problems:**
- No single source of truth
- Knowledge isn't discoverable
- Can't reuse workflows consistently
- New team members struggle to learn "how we do things"

### With Skills: Marketing Knowledge as Organized Packages

```
/.claude/skills/
├── researching/
│   ├── SKILL.md                      # How to conduct research
│   └── /workflows/
│       ├── methodology.md            # Research methodology
│       ├── competitive-analysis.md   # How to analyze competitors
│       └── customer-interviews.md    # How to extract insights
├── synthesizing-strategy/
│   ├── SKILL.md                      # How to create strategy
│   └── /references/
│       ├── positioning.md            # Positioning frameworks
│       ├── messaging.md              # Messaging synthesis patterns
│       └── voice.md                  # Voice development guide
└── creating-content/
    ├── SKILL.md                      # How to create content
    └── /data/
        ├── twitter-template.md       # Content templates
        ├── blog-template.md
        └── linkedin-template.md
```

**Benefits:**
- ✅ All marketing workflows in one place
- ✅ Organized by domain (research, strategy, content)
- ✅ Discoverable (browse `/.claude/skills/`)
- ✅ Reusable (invoke the same skill repeatedly)
- ✅ Version-controlled (track evolution in Git)
- ✅ Onboarding-friendly (new team members explore skill folders)

**Your marketing playbook is now an organized file system, not tribal knowledge.**

---

## Skills vs Commands: When to Use Each

You learned about commands in Class 5. Here's when to use each:

### Use a Command When:
- Simple, repeatable prompt (1-2 steps)
- No supporting materials needed
- Direct execution

**Example:** `/format-tweet [path]` - Simple formatting, no complex context

### Use a Skill When:
- Complex workflow (3+ steps)
- Needs methodology, frameworks, or templates
- Requires specialized knowledge
- Benefits from organized reference materials

**Example:** Conducting competitive research - needs methodology, analysis frameworks, synthesis patterns

### The Simple Rule

**Command** = Quick trigger for simple tasks
**Skill** = Organized package for complex workflows

**For detailed documentation on commands vs skills, see:** [Claude Code Skills Docs](https://code.claude.com/docs/en/skills)

### How Commands and Skills Work Together

Commands can **trigger skills** as part of their workflow:

**Example command** (`/.claude/commands/research/domain.md`):
```markdown
---
argument-hint: [research-domain] [optional context]
---
# Research Domain

## Instructions

This command triggers the researching skill with proper context:

1. Construct task description for the researching skill
2. Include domain-specific context from user
3. Invoke the researching skill to execute research workflow
```

**When you run:** `/research:domain customer-insights`
- Command executes
- Command invokes the `researching` skill
- Skill loads its methodology and references progressively
- Research workflow completes following skill patterns

**Similarly, skills can reference sub-agents** in their instructions:

**Example from SKILL.md:**
```markdown
## Instructions

When conducting competitive research:
1. Load competitive analysis methodology from /references/
2. Delegate detailed analysis to the Analyst sub-agent
3. Have Analyst follow the methodology framework
4. Synthesize findings into structured output
```

**The hierarchy:**
```
User → Command → Skill → Sub-agent
          ↓        ↓         ↓
     Quick     Complex   Specialized
     trigger   workflow  execution
```

**Result:** Commands provide ergonomic triggers, skills provide methodology, sub-agents provide specialized execution.

---

## Real Example: The `researching` Skill

Let's look at how the `researching` skill packages marketing research workflows:

### Structure

```
/.claude/skills/researching/
├── SKILL.md                          # Entry point
└── /references/
    ├── competitive-analysis.md       # How to analyze competitors
    ├── customer-insights.md          # How to extract customer insights
    ├── category-landscape.md         # How to research market landscape
    └── synthesis.md                  # How to synthesize findings
```

### How It Works

**You make a request:**
```
Analyze competitor X's positioning and messaging strategy.
```

**Progressive disclosure in action:**
1. Claude sees "competitor" + "positioning" keywords
2. Claude checks skill descriptions → `researching` skill description mentions competitive analysis
3. Claude invokes skill → loads `SKILL.md` file
4. Claude reads SKILL.md → identifies competitive analysis workflow is needed
5. Claude loads `/references/competitive-analysis.md` (specific reference for this task)
6. Claude follows the competitive analysis methodology
7. Claude produces structured research following AMA patterns

**Without the skill:** You'd need to paste the competitive analysis methodology every time or hope the AI remembers.

**With the skill:** Methodology is packaged, reusable, and consistently applied.

---

## The `agentic-orchestrating` Skill (Preview)

There's one skill that's different from the rest: `agentic-orchestrating`.

**What it does:** Teaches AI agents how to manage complex, multi-step workflows.

**Why it matters:** Without it, every AI agent would orchestrate work differently. With it, all agents follow the same patterns:
- Create PLAN.md before starting complex work
- Track progress with TODO.md
- Delegate to specialized sub-agents appropriately
- Organize artifacts systematically
- Make work visible and auditable

**You'll learn this skill in depth in Classes 8-9** where we cover orchestration fundamentals and advanced patterns.

For now, just know: This skill ensures all marketing workflows are executed with the same systematic approach.

---

## Navigating Skills in Your Workspace

### Step 1: Discover Available Skills

```bash
ls .claude/skills/
```

You'll see your skill folders:
```
agentic-orchestrating/
researching/
synthesizing-strategy/
creating-content/
change-management/
```

### Step 2: Read SKILL.md First

Always start with the entry point:

```
Read: .claude/skills/researching/SKILL.md
```

This tells you:
- What the skill does
- When to use it
- What references are available
- How to invoke it

### Step 3: Explore /references/ for Methodology

If you need deeper understanding:

```
.claude/skills/researching/references/
├── competitive-analysis.md    ← Read this if doing competitor research
├── customer-insights.md       ← Read this if analyzing customer data
└── synthesis.md               ← Read this if synthesizing findings
```

**Progressive disclosure:** Only read what you need for your current task.

---

## When NOT to Use Skills

Don't over-engineer. Skills are powerful but not always necessary.

### Skip Skills For:
- ✅ Simple one-off questions ("What's AI marketing?")
- ✅ Quick formatting tasks ("/format-tweet [path]")
- ✅ Exploratory work where you're still figuring out the process
- ✅ Tasks you'll only do once

### Use Skills For:
- ✅ Workflows you repeat regularly
- ✅ Complex processes with multiple steps
- ✅ Work requiring methodology or frameworks
- ✅ Team collaboration (everyone uses same process)

**The "Three Uses Rule" from Class 5 applies to skills too:**
If you've done a complex workflow 3+ times, package it as a skill.

---

## Summary & Key Takeaways

### What You Learned

1. **Skills solve the context problem** - Progressive disclosure loads only what's needed
2. **Skills organize marketing knowledge** - Workflows packaged in discoverable folders
3. **Skills enable consistency** - Team uses same methodology repeatedly
4. **Skills work across AMA layers** - Research, strategy, and content workflows
5. **Skills vs commands** - Complex workflows vs simple prompts

### How This Connects to Class 1

**Class 1 problem:** LLMs have limited context windows. Can't load everything at once.

**Skills solution:** Package all the context in organized folders. Load progressively as needed.

**Result:** Access deep expertise without context overflow.

### The Progressive Disclosure Pattern

```
SKILL.md (entry point - small)
    ↓ references
/references/methodology.md (loaded when needed)
    ↓ references
/data/template.md (loaded when creating output)
```

**Load what you need, when you need it. Nothing more.**

---

## Next Steps

### In Class 8: Agent Orchestration Fundamentals

You'll learn the `agentic-orchestrating` skill in depth:
- How to create PLAN.md for complex work
- How to track progress with TODO.md
- When orchestration is needed vs overkill
- How to structure execution folders

### In Class 9: Advanced Orchestration Patterns

You'll master advanced workflow patterns:
- Multi-phase workflows
- Dynamic task generation
- Feedback loops and validation
- Custom orchestration for your needs

**The `agentic-orchestrating` skill is the foundation for both classes.**

---

## Additional Resources

**Claude Code Documentation:**
- [Skills Overview](https://code.claude.com/docs/en/skills) - Official documentation
- [Creating Skills](https://code.claude.com/docs/en/skills#creating-skills) - How to build your own

**In Your Workspace:**
- Browse: `/.claude/skills/` - Explore available skills
- Read: `/.claude/skills/agentic-orchestrating/SKILL.md` - Core orchestration skill
