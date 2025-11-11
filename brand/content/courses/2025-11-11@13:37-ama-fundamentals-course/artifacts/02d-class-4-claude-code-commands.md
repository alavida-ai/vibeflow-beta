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

Without commands, every marketing workflow looks like this:

**You:** *Finds that perfect prompt from 3 weeks ago in Slack*

```
"Read the interview transcript, extract pain points and desired outcomes,
categorize by emotional intensity, reference specific quotes with line numbers,
format as markdown with our research template..."
```

**You:** *Copy-pastes prompt, changes file path, hopes it works the same way*

**Result:**
- ❌ Prompts get lost in chat history
- ❌ Team members use different approaches for the same task
- ❌ Quality varies based on who wrote the prompt
- ❌ New team members don't know the "right way" to do things
- ❌ Improvements to one prompt don't propagate to the team

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

### 2. Repeatable Execution Across Your Team

**Scenario:** Your team creates customer insight research every week.

**Without a command:**
- Sarah uses one extraction framework
- Marcus uses a different one
- New hire asks "What's the process?"
- Results are inconsistent, hard to compare
- No shared mental model

**With a command (`/research:extract-insights`):**
- Everyone uses the same extraction framework
- Results are comparable across time
- Process improves in one place (the command file)
- New hires run `/research:extract-insights` and get it right first time
- The command references your research methodology from files

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

**Your team's marketing playbook is now executable code.**

### 3. Process Evolution in Version Control

Commands are files. Files go in Git. Git tracks evolution.

**What this enables:**
```bash
# See how competitor analysis evolved
git log /.claude/commands/research/analyze-competitor.md

# Compare research workflow from 2 months ago vs now
git diff HEAD~10 /.claude/commands/research/domain.md

# Roll back to previous version if new approach isn't working
git checkout HEAD~1 /.claude/commands/content/twitter-thread.md
```

**Why this matters:** Your marketing processes aren't static. They improve. Commands let you track that improvement over time and rollback when experiments fail.

### The Power Multiplier (Preview)

Simple commands like `/format-tweet` execute direct instructions. But commands can also be **entry points to complex workflows**.

Later in this course (Classes 7-9), you'll learn about **skills** and **orchestration patterns**. When you combine commands with these concepts, a simple command like `/research domain customer-insights` can trigger:

- Multi-phase research workflows
- Sub-agent delegation
- Automatic file organization
- Strategy synthesis

**Result:** Complex workflows feel as simple as basic ones. Type a slash command, get sophisticated execution.

For now, focus on commands as **quick, repeatable prompts**. The orchestration power comes later.

---

## Command Organization: Discovery at Scale

As you create more commands, organization becomes critical.

### Domain-Based Structure (Recommended for AMA)

```
/.claude/commands/
├── research/                        # Research workflows
│   ├── domain.md                    # /research domain customer-insights
│   ├── extract-quotes.md            # /research extract-quotes [path]
│   └── synthesize.md                # /research synthesize [paths]
├── strategy/                        # Strategy workflows
│   ├── synthesize-research.md       # /strategy synthesize-research [domain]
│   └── alignment-check.md           # /strategy alignment-check [type] [topic]
├── content/                         # Content workflows
│   ├── twitter-thread.md            # /content twitter-thread [source]
│   ├── blog-outline.md              # /content blog-outline [topic]
│   └── linkedin-post.md             # /content linkedin-post [source]
└── changelog/                       # Change management
    └── update.md                    # /changelog update [domain] [execution-path]
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

## Commands vs Skills: A Preview

You'll learn about **skills** in Class 7. Here's how they differ from commands:

| Aspect | Commands | Skills |
|--------|----------|--------|
| Complexity | Simple, direct tasks | Complex, multi-phase workflows |
| Structure | Markdown file with instructions | Package with references, workflows, patterns |
| Examples | `/analyze-competitor`, `/extract-quotes` | `researching`, `synthesizing-strategy`, `agentic-orchestrating` |
| When to Use | Direct, repeatable tasks | Workflows requiring orchestration, sub-agents, multiple phases |

**Simple rule:** Commands for tasks, skills for complex workflows.

In Classes 7-9, you'll learn how commands and skills work together to orchestrate sophisticated marketing workflows.

---

## Common Mistakes to Avoid

### 1. Over-Commanding

❌ Creating commands for one-off tasks
✅ Use the Three-Uses Rule

### 2. Vague Instructions

❌ "Analyze the content and make it better"
✅ "Check for: clarity (main point obvious?), evidence (claims supported?), voice (matches brand guidelines?). Provide specific suggestions with before/after examples."

### 3. Missing Argument Hints

❌ No frontmatter guidance
✅ Always include: `argument-hint: What the user needs to provide`

### 4. Ignoring AMA Structure

❌ Commands save outputs randomly
✅ Commands specify AMA-compliant paths: `/brand/research/[domain]/data/`

### 5. No Approval Loops

❌ Commands execute blindly
✅ Include checkpoints: "Present findings and ask: Does this look accurate? Proceed?"

---

## Summary & Key Takeaways

Commands are **marketing playbooks as executable code.**

### What You Learned

1. **Commands solve process chaos** - Tribal knowledge → Executable workflows
2. **Commands enable team scale** - Consistent execution across team members
3. **Commands evolve in Git** - Track improvement, rollback experiments
4. **Three-Uses Rule** - Make it a command after 3rd manual execution

### How This Transforms Marketing Operations

**Before commands:**
- Marketing processes in people's heads
- Inconsistent execution
- New team members struggle to learn "the right way"
- No process improvement tracking

**With commands:**
- Marketing playbook in `/.claude/commands/`
- Consistent execution via reusable triggers
- New team members browse commands to learn workflows
- Git tracks process evolution

**Commands are how you scale marketing excellence.**

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
