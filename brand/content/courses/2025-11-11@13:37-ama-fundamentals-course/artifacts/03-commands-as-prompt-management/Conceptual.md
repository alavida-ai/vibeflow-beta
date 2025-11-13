# Class 3: Commands as Your Prompt Management

**Course:** AMA Fundamentals  
**Class Number:** 3 of 7  
**Estimated Time:** 45 minutes  
**Prerequisites:** Class 1 (MCP), Class 2 (IDE & File System)  

---

## Class Overview

You've escaped the chat window. You're using Claude Code with an IDE, generating files, using MCP to fetch real-world data. **But you're rewriting the same prompts over and over.**

Every time you analyze a competitor or format content, you copy the prompt from some file in google docs (or was it notion?, goddamit where is that file) or worse, write the entire workflow from scratch.

**This class is about turning repeated prompts into reusable commands** - shortcuts that make you more efficient.

By the end of this class, you'll understand:
- Why rewriting prompts creates friction and inconsistency
- What the "cold start problem" is and why it kills momentum
- How commands transform tribal knowledge into executable workflows
- How your system compounds in value over time

### Learning Objectives

- Identify when you're experiencing the cold start problem
- Turn repetitive prompts into reusable commands
- Understand how commands reduce friction and improve maintainability
- See how your system compounds in value over time

---

## Part 1: Where You Are Right Now

### The Post-IDE Experience

**From Class 2, you now have:**
- ✅ Claude Code integrated with your IDE
- ✅ MCP for fetching real-world data
- ✅ A file system that both you and your agent interact with

**This is a huge leap forward.** But now you're experiencing a new kind of friction...

### What You're Doing Now

Every time you start a task:

```
You: "Analyze this competitor's positioning. Read their homepage,
extract their value prop, identify their target audience, compare
against our framework in @brand/strategy/positioning.md, and save
the analysis to @brand/research/competitive-analysis/..."
```

**Then tomorrow, another competitor:**

```
You: "Analyze this competitor's positioning. Read their homepage..."
[typing the same thing again]
```

**And next week, a teammate asks:** "Hey that competitor analysis you did on [COMPETITOR] was awesome you did it with AI didn't you, can you send me the prompt would like to do something for another competitor"

You: "Oh yeah, let me find the chat where I did this, um... maybe I saved it in google docs or notion let me find it one sec"

Teammate: "Ah ok yeah nah don't worry about it" (leaves)

You: "No no this won't take long I'm pretty sure its in this chat let me just scroll up, one sec"

...

You: "Here it is, I sent it to my self on Slack a few weeks ago ahhah, oh. Bob?"

**Sound familiar?**

---

## Part 2: The Problems (And How They Affect Design Attributes)

### Problem 1: Lack of Maintainability

>**What is maintainability?**  
>How easily you can improve, update, and share your marketing processes.

**The problem:**
- Your best prompts exist in your head or stored in a file somewhere
- If you've stored the prompt somewhere you need load the prompt to the chat everytime
- When you discover a better approach, you forget to use it next time
- Different team members develop different processes

**Why this matters:** Your processes should get better over time, not lost over time.

---

### Problem 2: Friction Due to the Cold Start Problem

>**What is the cold start problem?**  
>Starting every task from zero - explaining the entire workflow every time, even for tasks you've done dozens of times.

**The problem:**
- Every competitor analysis starts with "Here's how to analyze..."
- Every content formatting starts with "Remove hashtags and..."
- **You're spending mental energy on boilerplate instead of strategy**

**The cold start friction cycle:**
1. Need to do a task
2. Try to remember the perfect prompt from last time
3. Can't remember everything, wing it
4. Get okay results (not as good as last time)
5. Make mental note to "save that prompt"
6. Never actually save it
7. Repeat next time

**The cost:**
- 5-10 minutes per task just getting the prompt right
- Mental exhaustion from repetitive instruction-giving
- Inconsistent quality
- Momentum killer (typing the prompt feels like work)

**Why this matters:** You're solving the same problem over and over instead of building on what you know.

---

## Part 3: Workaround - Saving Prompts as Files

**What people do:**
You saved your prompts in one or many files either as markdown or google drive (maybe even connect google drive MCP to the agent)

**Why it doesn't quite work:**
- ✅ Better than keeping it in your head
- ❌ Still requires copy-paste every time or referencing the file in the chat
- ❌ No built-in discovery (you can find it and your teammates don't know it exists)

**You've reduced the problem but not solved it.**

---

## Part 4: The Solution - Claude Code Commands

### What Are Commands?

**Commands are reusable prompts stored as files** that you trigger with a slash `/` in the agent chat.

**Without commands:**
```
You: "Analyze this competitor's positioning. Read their homepage,
extract value prop, identify target audience, compare against our
framework in /brand/strategy/positioning.md..."
```

**With commands:**
```
You: /analyze-competitor [URL WOULD GO HERE]

Claude: [executes your perfected workflow]
Claude: "Analysis complete. Saved to /brand/research/..."
```

**The difference:** 10 seconds vs 5 minutes. Every time.

---

### How Commands Solve the Problems

**Problem 1: Lack of Maintainability**

Commands turn tribal knowledge into executable code:

```
Before: Best process exists in your head
After: Best process lives in /.claude/commands/analyze-competitor.md

Result:
- One place to improve (edit the command file)
- Teammates discover commands (type / to see options)
- Process improvements propagate automatically
- New hires learn by reading command files
```

✅ **Maintainable across team and time**

---

**Problem 2: Friction Due to Cold Start Problem**

Commands eliminate repetitive instruction-giving:

```
Before: Every task starts from zero
After: Type /command-name, workflow executes instantly

Result:
- 5-10 minutes → 10 seconds per task
- Mental energy spent on strategy, not boilerplate
- Consistent quality every time
- Momentum maintained
```

✅ **Friction reduced by 95%**

---

### How Commands Work

Commands are markdown files in `/.claude/commands/` in your IDE that tell Claude what to do when you type a slash command.

**Minimal structure:**

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

**Real example:** `/format-tweet`

**File:** `/.claude/commands/format-tweet.md`

```markdown
---
argument-hint: Path to tweet file to format
---

# Format Tweet

## Purpose
Clean up tweet formatting by removing m-dashes and hashtags.

## Variables
TWEET_FILE: $ARGUMENTS

## Instructions
1. Read the tweet file at `TWEET_FILE`
2. Remove all m-dashes (—) and hyphens (-)
3. Remove all hashtags (#)
4. Preserve line breaks
5. Display the formatted tweet
6. Ask if they want to save it
```

**Usage:**
```
/format-tweet /brand/content/twitter-posts/why-commands-rule.md
```

**Why this matters:** You don't have to tell claude to how to format the tweet everytime, you just execute the command.

---

### When to Create a Command (The Three-Uses Rule)

**Create a command when:**
- You've done it 3+ times
- The workflow has multiple steps
- Your team needs consistency

**Use ad-hoc prompts when:**
- Exploring new ideas
- One-off questions
- Unique, non-repeatable tasks

**The rule:** If you've done something manually three times, make it a command.

---

### Organizing Commands for Discovery

Commands should mirror your `/brand/` structure:

```
/.claude/commands/
├── research/          # Mirrors /brand/research/
├── strategy/          # Mirrors /brand/strategy/
└── content/           # Mirrors /brand/content/
```

**Why:** Teammates know where to look. Type `/research:` to see all research commands.

---

### Commands Grow with Your System

Right now, commands are simple shortcuts. But commands can also be **entry points to complex workflows**.

Later in this course (Classes 4-7), you'll combine commands with sub-agents, skills, and orchestration. A simple command like `/research:domain customer-insights` can trigger multi-phase workflows with specialized agents.

**For now:** Focus on commands as reusable prompts. The orchestration power comes later.

---

## Part 5: What Changed

Commands solve two new problems while maintaining what you already gained:

| Design Attribute | Class 2 End | Class 3 with Commands |
|-----------------|-------------|----------------------|
| Groundedness | ✅ High | ✅ Stays high |
| Friction | ✅ Low (data fetching) | ✅ **Even lower** (prompts: 5-10min → 10sec) |
| Scalability | ✅ High | ✅ Stays high |
| Visibility | ✅ High | ✅ **Enhanced** (workflows now discoverable via `/`) |
| Maintainability | ❌ Low | ✅ **NEW - Solved** (processes as code) |

**Core improvement:** Your marketing processes are now code, not memory. The system compounds—each command makes future work faster.

---

## Part 6: Where You Are Now

**The shift:**
```
Before: "What was that prompt? Where did I save it?"
After:  "/command-name" → workflow executes
```

Your processes are now:
- Reusable (type `/` to run)
- Discoverable (type `/` to see all)
- Frictionless (type `/anal` and press `tab` to autofill `analyze-competitor`)
- Maintainable (edit one file, improves everywhere)
- Compounding (Week 1: 3 commands → Week 10: 20+ commands)

**But you still have:**
- ❌ All work done by one agent
- ❌ Context fills up with complex workflows
- ❌ No specialization

**Next:** Class 4 shows you how to delegate work to specialized sub-agents.

---

## Summary

**What you learned:**
- **Cold start problem:** Rewriting prompts every time → Commands eliminate this
- **Maintainability:** Tribal knowledge → Processes as code
- **The compound effect:** Each command makes your system more powerful

**Key pattern:** Done something 3+ times? Make it a command.

**Next class:** Sub-agents for context separation and specialization
