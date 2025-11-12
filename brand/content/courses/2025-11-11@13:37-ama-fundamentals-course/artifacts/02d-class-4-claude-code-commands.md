# Class 3: Commands as Your Prompt Management

**Course:** AMA Fundamentals
**Class Number:** 3 of 7
**Estimated Time:** 45 minutes
**Prerequisites:** Class 1 (MCP), Class 2 (IDE & File System)

---

## Class Overview

You've escaped the chat window. You're using Claude Code with an IDE, generating files, using MCP to fetch real-world data. **But now you're facing a new problem: you're rewriting the same prompts over and over again.**

Every time you want to analyze a competitor, format a tweet, or extract customer insights, you type out the entire workflow from scratch. Your best processes exist only in your head or buried in old file comments.

**This class is about turning those repeated prompts into reusable commands** - simple shortcuts that make your system more efficient every time you use them.

By the end of this class, you'll understand:
- Why rewriting prompts creates friction and inconsistency
- What the "cold start problem" is and why it kills momentum
- How commands transform tribal knowledge into executable playbooks
- How your system gets more powerful over time as you templatize workflows

### Learning Objectives

By the end of this class, you will be able to:
- Identify when you're experiencing the cold start problem
- Turn repetitive marketing prompts into reusable commands
- Understand how commands reduce friction and improve maintainability
- Know when to create a command vs use ad-hoc prompts
- See how your system compounds in value over time

---

## Part 1: Where You Are Right Now

### The Post-IDE Experience

**From Class 2, you now have:**
- ✅ Claude Code integrated with your IDE
- ✅ MCP for fetching real-world data
- ✅ Files that persist between sessions
- ✅ A file system that scales without performance degradation

**You've solved:**
- Groundedness (MCP gives you real data)
- Friction (automated data fetching)
- Scalability (files don't degrade like chat windows)
- Visibility (file tree shows your work)

**This is a huge leap forward.** But now you're experiencing a new kind of friction...

### What You're Doing Now

You're working in your IDE, generating marketing work. **But every time you start a task:**

```
You: "Analyze this competitor's positioning. Read their homepage at
[URL], extract their value prop, identify their target audience,
note their messaging patterns, compare against our positioning
framework in /brand/strategy/positioning.md, and save the analysis
to /brand/research/competitive-analysis/..."
```

**Then tomorrow, you do another competitor:**

```
You: "Analyze this competitor's positioning. Read their homepage at
[URL], extract their value prop, identify their target audience..."
[typing the same thing again]
```

**And next week, a teammate asks:**

"How do you do competitor analysis?"

You: "Oh, just ask Claude to... um... read the homepage, extract the... you know what, let me just show you the prompt I used last time... where did I put that?"

**Sound familiar?**

---

## Part 2: The Problems (And Why They Matter for Design Attributes)

### Problem 1: Lack of Maintainability

**What is maintainability?**
Maintainability is how easily you can improve, update, and share your marketing processes across your team.

**The problem without commands:**
- Your best prompts exist in file comments, Slack threads, or your head
- When you discover a better approach, you have to remember to use it next time
- Different team members develop different processes for the same task
- New hires have to "figure out how we do things" through trial and error
- Process improvements don't propagate (you fixed it in one place, forgot to fix it everywhere else)

**Real example you've probably experienced:**

```
Week 1: You write a great competitor analysis prompt
Week 2: You refine it (add pricing analysis)
Week 3: You refine it more (add messaging patterns)
Week 4: You can't remember the refined version, use the old one
Week 5: Your teammate asks how you do it, you show them Week 1's version
Week 6: You're hunting through files trying to find "that good prompt from before"
```

**Why this matters:** Your marketing processes should get better over time, not lost over time.

---

### Problem 2: Friction Due to the Cold Start Problem

**What is the cold start problem?**
The cold start problem is the friction of starting every task from zero - having to explain the entire workflow every time, even for tasks you've done dozens of times before.

**The problem:**
- Every competitor analysis starts with "Here's how to analyze competitors..."
- Every tweet formatting starts with "Remove hashtags and m-dashes and..."
- Every customer insight extraction starts with "Look for pain points, desired outcomes..."
- **You're spending mental energy on boilerplate instead of strategy**

**The cold start friction cycle:**
1. Need to do a task (analyze competitor)
2. Try to remember the perfect prompt from last time
3. Can't remember everything, wing it
4. Get okay results (but not as good as last time)
5. Make mental note to "save that prompt for next time"
6. Never actually save it
7. Repeat cycle next time

**Real example:**

```
You (tired, 4pm on Friday):
"Just analyze this competitor and save it somewhere"

Claude: [does basic analysis, misses nuance you normally catch]

You: "Wait, also check their pricing and messaging patterns"

Claude: [adds those]

You: "And compare it to our framework in... what's that file path again?"

[5 minutes searching for the file]

You: "You know what, good enough for today"
```

**The cost of cold starts:**
- 5-10 minutes per task just getting the prompt right
- Mental exhaustion from repetitive instruction-giving
- Inconsistent quality (depends on how tired/rushed you are)
- Momentum killer (you delay tasks because typing the prompt feels like work)

**Why this matters:** You're solving the same problem over and over instead of building on what you already know.

---

## Part 3: The Common Workarounds (And Why They Don't Work)

### Workaround 1: Saving Prompts as Markdown Files

**What people do:**
Create a `prompts.md` file with their best prompts documented.

**Example:**
```markdown
## Competitor Analysis Prompt

"Read the competitor's homepage at [URL] and extract:
1. Value proposition
2. Target audience
3. Messaging patterns
..."
```

**Why it doesn't quite work:**
- ✅ Better than keeping it in your head
- ❌ Still requires copy-paste every time (friction)
- ❌ Have to manually edit [URL] and file paths for each use
- ❌ No built-in discovery (teammates don't know the file exists)
- ❌ File gets messy with dozens of prompts (hard to find the right one)

**You've reduced the problem but not solved it.**

---

### Workaround 2: Referencing Entire Folders for Context

**What people do:**
"Just reference the /brand/research/ folder" thinking Claude will figure it out.

**Why it doesn't work:**
- ❌ Too much context (Claude reads 50 files when it only needs 2)
- ❌ No specific instructions (Claude guesses what you want)
- ❌ Slower performance (loading unnecessary context)
- ❌ Inconsistent results (different starting context each time)

**Example of the problem:**

```
You: "Analyze this competitor using the research folder"

Claude: [reads 47 files]
Claude: "I've reviewed your research folder. What specifically
        would you like me to analyze?"

You: [now you have to type the full prompt anyway]
```

**You're trying to solve the cold start problem by front-loading context, but it creates new problems.**

---

## Part 4: The Solution - Claude Code Commands

### What Are Commands?

**Commands are reusable prompts stored as files** that you trigger with a simple slash command.

Think of them as shortcuts for your best marketing processes.

**Without commands:**
```
You: "Analyze this competitor's positioning. Read their homepage at
[URL], extract their value prop, identify their target audience,
note their messaging patterns, compare against our positioning
framework in /brand/strategy/positioning.md, and save the analysis
to /brand/research/competitive-analysis/..."
```

**With commands:**
```
You: /research:analyze-competitor [URL]

Claude: [executes your perfected workflow]
Claude: "Analysis complete. Saved to /brand/research/competitive-analysis/..."
```

**The difference:** 10 seconds vs 5 minutes. Every time.

---

### How Commands Solve the Problems

**Problem 1: Lack of Maintainability**

Commands turn tribal knowledge into executable code:

```
Before: Your best process exists in your head or scattered across files
After: Your best process lives in /.claude/commands/research/analyze-competitor.md

Result:
- One place to improve (edit the command file)
- Teammates discover commands (type / to see options)
- Process improvements propagate automatically (everyone uses the updated command)
- New hires learn by reading command files
```

✅ **Maintainable across team and time**

---

**Problem 2: Friction Due to Cold Start Problem**

Commands eliminate repetitive instruction-giving:

```
Before: Every task starts from zero, explaining the full workflow
After: Type /command-name, workflow executes instantly

Result:
- 5-10 minutes → 10 seconds per task
- Mental energy spent on strategy, not boilerplate
- Consistent quality (same workflow every time)
- Momentum maintained (starting tasks feels effortless)
```

✅ **Friction reduced by 95%**

---

### Real Example: Competitor Analysis

**Scenario:** Analyze 5 competitors' positioning

**Without commands (3 hours):**
1. Competitor A: Type full prompt (10 min) + analysis (20 min)
2. Competitor B: Try to remember prompt (5 min) + type variations (10 min) + analysis (20 min)
3. Competitor C: Hunt for "that good prompt" (10 min) + type it (5 min) + analysis (20 min)
4. Competitor D: Realize you forgot to include pricing, add it (15 min) + analysis (25 min)
5. Competitor E: Finally have the prompt right (5 min) + analysis (20 min)

**Total:** 3 hours (1 hour prompt management, 2 hours actual analysis)

**With commands (1.5 hours):**
```
/research:analyze-competitor notion.com
/research:analyze-competitor airtable.com
/research:analyze-competitor coda.io
/research:analyze-competitor clickup.com
/research:analyze-competitor monday.com
```

Each execution: 2 minutes prompt + 20 minutes analysis = 22 minutes × 5 = 110 minutes

**Total:** 1.5 hours (10 minutes command execution, 1 hour 40 minutes actual analysis)

**Time saved:** 1.5 hours (50% reduction)
**Mental exhaustion:** Eliminated (no prompt fatigue)
**Quality:** Consistent (same framework every time)

---

### How Commands Work (The Technical Basics)

Commands are markdown files stored in `/.claude/commands/` that tell Claude what to do when you type a slash command.

### Minimal Command Structure

```markdown
---
argument-hint: What arguments this command needs
---
# Command Name

## Instructions
1. Step-by-step what the AI should do
2. Where to save outputs (following AMA structure)
3. What to ask the user for approval
```

**That's it.** Simple instructions in a markdown file.

### Real Example: `/format-tweet`

**File:** `/.claude/commands/format-tweet.md`

```markdown
---
argument-hint: Path to tweet file to format
---
# Format Tweet

## Purpose

Clean up tweet formatting by removing m-dashes and hashtags, making it ready for manual posting.

## Variables

TWEET_FILE: $ARGUMENTS

## Instructions

1. Read the tweet file at `TWEET_FILE`
2. Remove all m-dashes (—) and hyphens (-)
3. Remove all hashtags (anything starting with #)
4. Preserve line breaks and other formatting
5. Display the formatted tweet to the user
6. Ask if they want to save the formatted version
```

**Usage:**
```
/format-tweet /brand/content/twitter-posts/2025-11-11@14:30-ai-tips/CONTENT.md
```

**What's happening here:**

1. **Frontmatter** (`---` section) provides a hint shown when typing the command
2. **Purpose** explains what the command does (documentation for humans)
3. **Variables** capture the file path argument using `$ARGUMENTS`
4. **Instructions** tell the AI exactly what to do, step by step

When you execute the command the AI:
- Reads the file at that path
- Removes m-dashes and hashtags
- Shows you the cleaned-up tweet
- Asks if you want to save it

**Why this matters for marketing:** You don't remember the exact formatting rules every time. The command does.

---

## Why Commands Matter for Marketing Architects

Commands are the **quick, ergonomic interface** to your marketing workflows. Instead of typing paragraphs of boilerplate every time, you type a slash command.

**The core benefit: Speed without sacrificing quality.**

### 1. No More Prompt Boilerplate

**Without a command**, every time you want to extract customer insights:

```
"Read the interview transcript at /brand/research/customer-insights/data/interview-nov-8.md
and extract key insights across these categories: pain points, desired outcomes, emotional
states, and jobs to be done. For each insight, quote specific evidence with context, rate
emotional intensity, and note implications for positioning. Format the output following our
research template with proper markdown references..."
```

**With a command**, you type:

```
/research:extract-quotes /brand/research/customer-insights/data/interview-nov-8.md
```

**Same result. Zero boilerplate.**

The command file contains your perfected workflow. You just trigger it.

### 2. Team Consistency: Everyone Uses the Same Process

When your team creates customer insights every week, commands ensure everyone follows the same framework. Results become comparable. Process improvements happen in one place (the command file). New hires get it right first time.

**Example command library:**
```
/.claude/commands/
├── research/
│   ├── extract-quotes.md          # Everyone extracts quotes the same way
│   ├── analyze-competitor.md       # Competitor analysis follows your framework
│   └── synthesize-findings.md      # Research synthesis uses your structure
├── content/
│   ├── twitter-thread.md           # Thread creation follows brand voice
│   └── blog-outline.md             # Blog outlines hit all messaging pillars
└── strategy/
    └── alignment-check.md          # Content aligns with positioning
```

**Your team's marketing playbook is now executable code.** And since commands are files in Git, you can track how your processes evolve over time.

### The Power Multiplier (Preview)

Simple commands like `/format-tweet` execute direct instructions. But commands can also be **entry points to complex workflows**.

Later in this course (Classes 7-9), you'll learn about **skills** and **orchestration patterns**. When you combine commands with these concepts, a simple command like `/research:domain customer-insights` can trigger:

- Multi-phase research workflows
- Sub-agent delegation
- Automatic file organization

**Result:** Complex workflows feel as simple as basic ones. Type a slash command, get sophisticated execution.

For now, focus on commands as **quick, repeatable prompts**. The orchestration power comes later.

---

## Command Organization: Discovery at Scale

As you create more commands, organization becomes critical.

### Domain-Based Structure (Recommended for AMA)

```
/.claude/commands/
├── research/                        # Research workflows
│   ├── domain.md                    # /research:domain [domain]
│   ├── extract-quotes.md            # /research:extract-quotes [path]
│   └── synthesize.md                # /research:synthesize [paths]
├── strategy/                        # Strategy workflows
│   ├── synthesize-research.md       # /strategy:synthesize-research [domain]
│   └── alignment-check.md           # /strategy:alignment-check [type] [topic]
├── content/                         # Content workflows
│   ├── twitter-thread.md            # /content:twitter-thread [source]
│   ├── blog-outline.md              # /content:blog-outline [topic]
│   └── linkedin-post.md             # /content:linkedin-post [source]
└── changelog/                       # Change management
    └── update.md                    # /changelog:update [domain] [execution-path]
```

**This mirrors your `/brand/` structure.** Teammates know where to find workflows based on what they're trying to do.

---

## When to Create a Command: The Three-Uses Rule

**Not every prompt needs to be a command.**

### Use Commands When:

✅ You've done it 3+ times
✅ The workflow has multiple steps
✅ Your team needs consistency
✅ The prompt is complex enough to forget
✅ Output needs to follow AMA structure

**Example:** Analyzing competitor landing pages → Command (repeatable, multi-step, team uses it)

### Use Ad-Hoc Prompts When:

✅ Exploring new ideas
✅ One-off questions
✅ Rapid iteration
✅ Unique, non-repeatable task

**Example:** "What are AI marketing trends in 2025?" → Ad-hoc (exploratory, one-time)

**The Three-Uses Rule: If you've done something manually three times, make it a command.**

---

## Writing Effective Commands: Patterns from the Field

Good commands follow clear structural patterns. Here's what makes commands maintainable and effective:

### The Standard Command Structure

```markdown
---
argument-hint: What arguments this command needs
---
# Command Name

## Purpose

One sentence explaining what this command does.

## Variables

VARIABLE_NAME: $ARGUMENTS (or $1, $2 for specific arguments)

## Instructions

1. Clear, numbered steps
2. Use **bold** for key actions
3. Reference `code` for paths and technical terms
4. Keep it concise - let skills handle complexity
```

### Real Pattern: Wrapper Commands

Commands can be **entry points** that delegate to skills or other commands:

```markdown
## Instructions

This is a **wrapper command** that constructs a task description for `/plan`:

1. **Construct TASK_DESCRIPTION** that tells the planner to:
   - Use the `researching` skill
   - Reference the workflow for `RESEARCH_DOMAIN`
   - Create the plan in `BASE_DIR/RESEARCH_DOMAIN/`

2. **Pass to /plan** using:
   ```
   SlashCommand(`/plan "[TASK_DESCRIPTION]"`)
   ```
```

### Key Techniques

**Use frontmatter for discoverability:**
```yaml
---
argument-hint: [research domain] [optional context]
---
```

**Name variables clearly (UPPERCASE):**
```markdown
RESEARCH_DOMAIN: $1
ADDITIONAL_INFO: $2
BASE_DIR: `/research/`
```

**Structure with H2 sections:**
- `## Purpose` - What it does
- `## Variables` - What data it captures
- `## Instructions` - How it executes

**Keep instructions concise:**
- Numbered steps for clarity
- Bold key actions (`**Construct**`, `**Pass to**`)
- Delegate complexity to skills (don't embed methodology in commands)

**Show examples when patterns are complex:**
```markdown
**Example TASK_DESCRIPTION format:**
"Create a research plan for [RESEARCH_DOMAIN] using the researching skill..."
```

**Result:** Commands become readable, maintainable entry points to workflows.

---

## Part 5: Design Attributes - Before and After

These are the benchmarks that matter for your AI-assisted marketing system. Think of them as your KPIs for system performance.

**Note:** Groundedness, Friction, Scalability, and Visibility were solved in Classes 1-2. Those stay good. This class solves two NEW attributes: Maintainability and further reduces Friction (cold start problem).

### Attribute 1: Groundedness (Stays High ✅)

**From Class 1:** MCP gave you grounded, data-backed outputs.
**Status:** Solved in Class 1, stays solved ✅

| Class 2 End State | Class 3 with Commands |
|-------------------|----------------------|
| ✅ Real-world data access via MCP | ✅ Still grounded (MCP still works) |
| ✅ Cited sources | ✅ Commands use MCP, maintain groundedness |

---

### Attribute 2: Friction (Further Reduced ✅)

**From Class 1:** MCP reduced data-fetching friction (no more copy-paste).
**Class 3 improvement:** Commands eliminate prompt-writing friction (cold start problem solved).

| Class 2 End State | Class 3 with Commands |
|-------------------|----------------------|
| ✅ Low data-fetching friction (MCP) | ✅ Data-fetching friction stays low |
| ❌ High prompt-writing friction (5-10 min per task) | ✅ Prompt-writing friction eliminated (10 seconds) |
| ❌ Cold start problem (every task from zero) | ✅ Cold start solved (reusable workflows) |

**Improvement:** Friction reduced by another 95% for prompt management

---

### Attribute 3: Scalability (Stays High ✅)

**From Class 2:** Files scale without performance degradation.
**Status:** Solved in Class 2, stays solved ✅

| Class 2 End State | Class 3 with Commands |
|-------------------|----------------------|
| ✅ Files don't degrade like chat windows | ✅ Still scales (files still work) |
| ✅ Can start fresh anytime | ✅ Commands make starting fresh faster |

---

### Attribute 4: Visibility (Stays High ✅)

**From Class 2:** File tree shows all your work.
**Class 3 improvement:** Commands are discoverable (type `/` to see options).

| Class 2 End State | Class 3 with Commands |
|-------------------|----------------------|
| ✅ File tree shows work | ✅ File tree + command menu shows work |
| ❌ Workflows hidden in memory | ✅ Workflows visible as command files |

**Improvement:** Visibility extended from files to processes

---

### Attribute 5: Maintainability (NEW - Now Solved ✅)

**Definition:** How easily you can improve, update, and share your marketing processes across your team.

| Class 2 End State | Class 3 with Commands |
|-------------------|----------------------|
| ❌ Best processes in your head | ✅ Best processes in command files |
| ❌ No central place to improve prompts | ✅ One file to edit (propagates everywhere) |
| ❌ Team uses different processes | ✅ Team uses same command (consistency) |
| ❌ New hires figure it out themselves | ✅ New hires read command files (documentation) |

**Improvement:** Maintainability increases exponentially with each command created

---

### The Measurable Impact

**Time saved:**
- Prompt writing: 5-10 min → 10 seconds per task (30x faster)
- Team onboarding: Days → Hours (commands are self-documenting)
- Process improvement: Manual propagation → Automatic (edit one file)

**Quality improved:**
- Consistency: Varies by person → Same every time
- Process evolution: Lost improvements → Captured improvements
- Discoverability: Tribal knowledge → Type `/` to see options

**Scalability unlocked:**
- 1 person using best process → Entire team using best process
- Process improvement benefits 1 execution → Benefits all future executions
- Your system gets more powerful over time (compound effect)

---

## Part 6: Where You Are At the End of This Class

### Your New Capabilities

You're now using Claude Code with commands in addition to MCP and files. You can:

**✅ Eliminate prompt boilerplate**
- Turn 5-minute prompts into 10-second commands
- Stop rewriting the same instructions
- Start tasks instantly (no cold start)

**✅ Maintain processes as code**
- One file per workflow (easy to improve)
- Team uses same process (consistency)
- Version-controlled (track evolution)

**✅ Discover workflows easily**
- Type `/` to see all available commands
- Read command files to learn how things work
- New hires get up to speed faster

**✅ Compound value over time**
- Each command you create makes the system more powerful
- Process improvements benefit all future work
- Your marketing playbook grows with use

### What You've Unlocked

**The shift:**
```
Before: "What was that prompt I used last time? Where did I save it?"
After:  "/command-name [arguments]" → workflow executes perfectly
```

**Your role changes:**
- From prompt-writer → Command-creator
- From remembering processes → Discovering processes (type `/`)
- From one-off tasks → Building reusable systems

**The compound effect:**

Week 1: Create 3 commands → Save 30 minutes
Week 4: 12 commands → Save 2 hours per week
Week 12: 40 commands → Save 8 hours per week
Year 1: 100+ commands → Your entire marketing playbook is executable code

**The system gets more powerful every time you use it.**

### But You're Still Doing Everything Yourself

Commands solved **maintainability** and **cold start friction**. But you still have:
- ❌ All work done by one agent (you)
- ❌ Context fills up quickly with complex workflows
- ❌ No specialization (same agent does research, strategy, content)
- ❌ Files scattered in root folder (no organization pattern)

**Next steps:**
- **Class 4** will show you how to delegate work to specialized sub-agents
- **Class 5** will introduce the AMA framework for organizing your growing system

---

## Summary & Key Takeaways

### The Journey So Far

**Where you started (Class 2 end):**
- Using Claude Code with IDE and MCP
- Generating files, fetching real-world data
- But rewriting prompts every time (cold start problem)
- Best processes locked in your head (maintainability problem)

**Where you are now (Class 3 end):**
- Using commands to eliminate prompt boilerplate
- Workflows stored as reusable, discoverable files
- Cold start problem solved (10 seconds vs 5 minutes)
- System gets more powerful over time (compound effect)

**What improved:**

| Design Attribute | Class 2 End | Class 3 End |
|-----------------|-------------|-------------|
| Groundedness | ✅ High (MCP) | ✅ Stays high |
| Friction | ✅ Low (data fetching) | ✅ Even lower (prompt writing solved) |
| Scalability | ✅ High (files) | ✅ Stays high |
| Visibility | ✅ High (file tree) | ✅ Higher (command discovery) |
| Maintainability | ❌ Low (tribal knowledge) | ✅ High (commands as code) |

### Key Concepts You Learned

**1. Cold Start Problem**
- Starting every task from zero, rewriting prompts
- Commands eliminate this by storing workflows as reusable files
- 5-10 minutes → 10 seconds per task

**2. Maintainability**
- How easily you can improve and share processes
- Commands turn tribal knowledge into executable code
- One file to improve → benefits all future executions

**3. Commands as Marketing Playbooks**
- Simple markdown files in `/.claude/commands/`
- Type `/command-name` → workflow executes
- Discoverable (type `/` to see options)

**4. The Compound Effect**
- Each command makes your system more powerful
- Your marketing playbook grows with use
- Time savings multiply with every command created

**5. The Three-Uses Rule**
- If you've done something 3+ times → make it a command
- Captures best practices before they're lost
- System improves through use

### What's Next

Class 4 addresses the remaining problems:
- ❌ All work done by one agent
- ❌ Context fills up with complex workflows
- ❌ No specialization (research vs strategy vs content)
- ❌ Files scattered without organization

**The solutions:**
- **Class 4:** Sub-agents for specialized work and context separation
- **Class 5:** AMA framework for organizing your system

---

## Practice Exercise

**Create your first command:**

1. Identify a marketing task you've done 3+ times this month
2. Write down the exact steps you follow
3. Create a command file at `/.claude/commands/[category]/[task-name].md`
4. Test it on real work
5. Iterate based on results

**Start simple.** Even a basic command that saves 5 minutes of prompt-writing is valuable when you use it 20 times.

**Your marketing processes should be code, not memory.**

---

## Next Steps

**You now understand how commands turn marketing processes into reusable workflows.**

In **Class 4**, you'll learn how to delegate work to specialized sub-agents for context separation and specialized expertise. See you there!
