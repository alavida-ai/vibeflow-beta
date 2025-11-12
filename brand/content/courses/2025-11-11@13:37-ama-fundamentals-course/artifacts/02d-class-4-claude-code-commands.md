# Class 5: Claude Code Commands

**Course:** AMA Fundamentals
**Class Number:** 5 of 9
**Estimated Time:** 45 minutes
**Prerequisites:** Classes 2 (File System), 3 (AMA Structure), 4 (Git)

---

## Class Overview

Commands are your custom shortcuts that transform repetitive marketing workflows into simple slash commands. Instead of retyping complex prompts every time, you type `/analyze-competitor notion` and the AI knows exactly what to do.

**For marketing architects**, commands solve a critical problem: **your best marketing processes stay locked in your head or scattered across chat history.** Commands turn those processes into reusable, shareable, version-controlled workflows.

### Learning Objectives

By the end of this class, you'll be able to:
- Turn repetitive marketing prompts into reusable commands
- Understand how commands fit into the AMA methodology
- Organize commands for team collaboration
- Know when to create a command vs use ad-hoc prompts

---

## The Problem: Marketing Process Chaos

Without commands, you're hunting for "that perfect prompt from 3 weeks ago" in Slack, copy-pasting it, changing file paths, hoping it works.

**Result:** Prompts get lost. Team members use different approaches. Quality varies. New hires struggle. Improvements don't propagate.

**This is marketing process chaos.**

---

## The Solution: Commands as Marketing Playbooks

Commands transform your marketing processes from "tribal knowledge" into executable playbooks:

```
/research:extract-quotes /brand/research/customer-insights/data/interview-nov-8.md
```

**What just happened:**
1. The AI loaded your perfected quote extraction process
2. Followed your exact workflow (categorization, formatting, evidence standards)
3. Produced consistent output following AMA structure
4. Made your process discoverable (teammates just type `/` to see options)

**This is marketing process excellence.**

---

## How Commands Work (The Basics)

Commands are markdown files in `/.claude/commands/` that tell the AI what to do when you type a slash command.

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

## Summary & Key Takeaways

Commands are **marketing playbooks as executable code.**

### What You Learned

1. **Commands solve process chaos** - Tribal knowledge → Executable workflows
2. **Commands enable team scale** - Consistent execution across team members
3. **Commands evolve in Git** - Track improvement, rollback experiments
4. **Three-Uses Rule** - Make it a command after 3rd manual execution

**Bottom line:** Commands transform your marketing processes from scattered tribal knowledge into organized, version-controlled code that your entire team can discover and use.

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

**You now understand how commands turn marketing processes into reusable workflows. In Class 6, you'll learn how commands orchestrate work across specialized agents. See you there!**
