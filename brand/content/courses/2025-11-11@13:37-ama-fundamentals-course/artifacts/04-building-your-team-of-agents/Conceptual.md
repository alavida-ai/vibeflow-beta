# Class 4: Sub-agents as Context Separation

**Course:** AMA Fundamentals  
**Class Number:** 4 of 7  
**Estimated Time:** 60 minutes  
**Prerequisites:** Class 1 (MCP), Class 2 (IDE & Files), Class 3 (Commands)  

---

## Class Overview

You've built a powerful system: MCP for data access, files for persistence, commands for reusable workflows. But there's a problem brewing.

**You're using one agent to do everything.**

That agent is conducting research, synthesizing strategy, writing content, formatting tweets—all in a single conversation. The context window is filling up fast. And worse, research data is contaminating your content creation, strategic thinking is interfering with objective analysis.

**This class is about context separation through sub-agents** - specialized agents that get fresh context for focused work.

By the end of this class, you'll understand:
- Why one agent can't do everything well
- How context contamination degrades quality
- What sub-agents are and when to use them
- How specialization improves both speed and quality

### Learning Objectives

- Recognize when context contamination is affecting quality
- Understand how sub-agents provide fresh, focused context
- Know when to delegate vs execute directly
- Create specialized sub-agents for your workflows

---

## Part 1: Where You Are Right Now

### The Command-Powered Single Agent

**From Class 3, you now have:**
- ✅ Complex multi-step workflows as reusable commands
- ✅ Commands that orchestrate MCP tool calls (web scraping, research, analysis)
- ✅ A system you've crafted and iterated to push what AI can do

**This is already ahead of 95% of marketers.** You're pushing the limits of what one agent can handle.

### Complex Workflows You've Built

Your commands have evolved into sophisticated workflows. A typical command now looks like:

```markdown
# /research-competitor command

1. Use Firecrawl to scrape competitor website
2. Use Perplexity to research their market positioning
3. Read our positioning framework from /brand/strategy/positioning.md
4. Analyze patterns across their homepage, pricing, messaging
5. Compare against 3 other competitors
6. Synthesize findings into structured report
7. Save to /brand/research/competitive-analysis/
```

**Each step requires specific skillsets:**
- Web scraping expertise (MCP tool selection, data extraction)
- Research methodology (knowing what to look for, how to analyze)
- Strategic thinking (pattern recognition, synthesis)
- Writing (clear, structured reporting)

**You trust your agent (a generalist) can handle all of this** as long as it has access to the right MCP tools and clear step-by-step instructions.

### What's Breaking

**You've been crafting and iterating these workflows.** They work. But as they get longer and more complex, you notice:

**Problem: The agent can't keep up.**

```
You: /research-competitor-landscape [5 competitors]
Claude: [Scrapes site 1... analyzes... writes notes...]
Claude: [Scrapes site 2... analyzes... writes notes...]
Claude: [Scrapes site 3... slowing down...]
Claude: [Scrapes site 4... very slow now...]
Claude: "I've reached my context limit. Please start a new conversation."
You: "WHAT? You didn't even finish!"
```

**The workflow fills up the context window BEFORE the task completes.**

- Tool calling outputs (scraped data)
- File reading (strategy docs loaded for comparison)
- Analysis (intermediate thinking)
- Chat history (each step recorded)

By step 4 of a 7-step workflow, the context is full. The agent didn't even get to synthesis.

**You've also noticed:**
- Complex workflows slow to a crawl midway through
- Earlier context bleeds into later tasks (competitor research → content creation)
- Agent gives surface-level analysis instead of deep dives (the more stuff it has to do the less it focuses on a specific thing)

---

## Part 2: The Problems (And How They Affect Design Attributes)

### Problem 1: Context Windows Running Out Quickly

**What's happening:**
With multistep workflows in commands, you're asking your agent to do MUCH MORE. Each step will require multiple of the following:
- Loads files
- Calling MCP tools
- Generates outputs

All of this consumes context extremely quickly.

Remember from Class 2? Files solved persistence. But commands accelerated how fast you use context.

**Why this matters:** You can't build complex workflows if you hit context limits mid-execution.

---

### Problem 2: Context Overload (Spreading Too Thin)

**What is context overload?**
When you ask your agent to handle too many different tasks in one workflow, it can't go deep on any single task.

Think about yourself: if someone asked you to do 7 complex tasks in a row, could you go deep on each one?

- **1 task:** You can spend 2 hours doing thorough, deep work
- **7 tasks:** You rush through each in 15 minutes, surface-level only

**Your agent does the same thing.** The more steps in your command, the less effort and context budget it allocates to each step.

```
Complex command with 7 steps:
Step 1: Research (rushed - saving context for steps 2-7)
Step 2: Analysis (shallow - already used context, saving for 3-7)
Step 3: Strategy (generic - context filling, can't go deep)
Step 4: Content (surface-level - need context for steps 5-7)
...

Result: Mediocre work at every step
```

**Why this matters:** You can't do thorough analysis when you need to conserve context for 6 more steps. Every task gets surface-level treatment.

---

## Part 3: The Common Workaround (And Why It Adds Friction)

### Workaround: Split Commands and Chain Sequentially

**What people do:**
Break the complex workflow into smaller commands, execute each in a new chat, save outputs as files.

```
# Instead of one command:
/research-competitor-landscape [5 competitors, full analysis]

# You split into multiple:
Chat 1: /scrape-competitor-data [5 competitors] → saves to /competitor-data.md
Chat 2: [NEW CHAT] /analyze-competitor-data /competitor-data.md → saves to /analysis.md
Chat 3: [NEW CHAT] /synthesize-findings /analysis.md → saves to /report.md
```

**Why this creates massive friction:**

- ❌ **More commands to maintain** - What was 1 command is now 3+ commands
- ❌ **Can't run in parallel** - Must wait for each task to finish before starting the next
- ❌ **Manual orchestration** - You're the coordinator, babysitting each step
- ❌ **Lost context between phases** - Each new chat loses the flow
- ❌ **Breaks momentum** - Wait, switch chats, paste file path, wait again...

**The cost:**
```
Original workflow: 1 command, 10 minutes (but hits context limit)
Split workflow: 3 commands, 3 new chats, 25 minutes total (10min + 15min overhead)
```

**You traded one problem (context limits) for another (friction and wait time).**

---

## Part 4: The Solution - Sub-agents for Context Separation

### What Are Sub-agents?

**Sub-agents are agents that work under your main agent.**

Your main agent (Operations Manager) still handles your conversation and executes work for you. But now it can **offload heavy tasks to sub-agents** instead of doing everything itself.

**How it works:**
```
You: /research-competitor-landscape

Main agent: "I'll delegate this to my Analyst sub-agent"
→ Analyst sub-agent:
  - Gets fresh 200K context window
  - Loads only what's needed for research
  - Deep dive on all 5 competitors
  - Writes comprehensive report
  - Returns summary to main agent (2K tokens)

Main agent: "Analysis complete. Here's what we found..."
```

**What this solves:**

- **Problem 1 (Context Running Out):** Sub-agent has fresh context to complete the full workflow.
- **Problem 2 (Spreading Thin):** Sub-agent focuses entirely on one task, can go deep.
- **Main agent preservation:** Main agent's context window clean. Tasks specific MCP tools and analysis done on subagent context windows.

✅ **Workflows that complete + deep analysis on each task**

---

### The Added Benefit: Specialization

Sub-agents don't just offload work—they're also **specialized** for their tasks.

**Why specialization matters:**

**1. Focused MCP toolset**
```
Main agent (generalist):
Tools: [Firecrawl, Perplexity, Brave, Notion, Slack, Gmail, Drive, ...]
Problem: 15+ tool definitions loaded from the start (10K+ tokens)

Analyst sub-agent (specialist):
Tools: [Firecrawl, Perplexity, Grep, Read, Write]
Benefit: 5 tool definitions (3K tokens) - cleaner initial context
```

**Result:**
- **Smaller initial contex footprint** - Loads only relevant tool definitions
- **Reduced error rate** - Fewer tool options means less confusion, right tool chosen
- **Less noise from tool calls** - Fewer tools = cleaner context (less clutter from tool calling)

**2. Custom system prompts with identity/mindset**
```
Analyst sub-agent:
"You are a Research Analyst. You conduct objective, thorough research.
Focus on patterns, evidence, and data-backed insights"

Strategist sub-agent:
"You are a Brand Strategist. You synthesize research into frameworks.
Focus on differentiation, positioning, and strategic recommendations."
```

**Result:** Each sub-agent thinks differently, works differently, produces specialized outputs.

✅ **Cleaner context + focused tools + specialized thinking = higher quality**

---

### How Sub-agents Work

**Sub-agents are defined in `/.claude/agents/`:**

```
/.claude/
├── agents/
│   ├── analyst.md           ← Research specialist
│   ├── strategist.md        ← Strategy specialist
│   └── content-creator.md   ← Content specialist
└── commands/
    └── research-competitor.md  ← Commands delegate to agents
```

**Anatomy of a sub-agent file:**

```yaml
---
name: "Analyst"
description: "Conducts objective research and analysis"
model: "sonnet"
tools: ["Read", "Write", "WebFetch", "Grep"]
---

# Identity
You are a Research Analyst specializing in marketing research.

# Responsibilities
- Conduct competitive analysis
- Research market trends
- Synthesize findings into structured reports

# Constraints (What You Don't Do)
- You don't create strategy (that's Strategist's role)
- You don't write content (that's Content Creator's role)
- You present objective findings only
```

**Why this structure matters:**
- **Fresh context** - New conversation, no accumulated history
- **Specialized identity** - Analyst thinks differently than Strategist
- **Clear boundaries** - Each agent knows what NOT to do
- **Focused tools** - Only the tools needed for their work

---

### Real Example: Multi-Phase Workflow

**Without sub-agents (single agent):**
```
You: /analyze-competitor notion.com
[Agent loads site, analyzes, context fills]

You: /create-positioning-strategy
[Agent references research... but context contaminated]

You: /write-twitter-thread
[Agent writes... but now has competitor AND strategy context]
[Output: confused, contaminated, less focused]
```

**With sub-agents:**
```
You: /analyze-competitor notion.com
→ Delegates to Analyst agent
→ Fresh context, research-focused
→ Saves findings to /brand/research/

You: /create-positioning-strategy
→ Delegates to Strategist agent
→ Fresh context, loads research findings only
→ Saves strategy to /brand/strategy/

You: /write-twitter-thread
→ Delegates to Content Creator agent
→ Fresh context, loads strategy only
→ Pure creative focus, no research contamination
```

**The difference:**
- ⏱️ **Speed:** 
   - Reducesd context degradation = reduced slowness 
   - can run multiple analysts in parallel (e.g. analysis on separate competitors in parallel)
- 🎯 **Quality:** Each agent specialized, no contamination and less context degradation across phases
- 👁️ **Clarity:** You know which agent has what context
- 🔄 **Scalability:** you can do more tasks with your agents
- **Control:** You can define how to approach specifics in more detail

---

## Part 5: What Changed

Sub-agents solve two new problems while maintaining what you already gained:

| Design Attribute | Class 3 End | Class 4 with Sub-agents |
|-----------------|-------------|-------------------------|
| Groundedness | ✅ High | ✅ Stays high |
| Friction | ✅ Low | ✅ Stays low |
| Scalability | ❌ Context fills with complex workflows | ✅ **Improved** (fresh context per task) |
| Maintainability | ✅ High | ✅ Stays high |
| Control | ❌ Low | ✅ **NEW - Solved** (specialized agents) |

---

## Part 6: Where You Are Now

**The shift:**
```
Before: One agent does everything (context fills, spreads thin)
After:  Commands delegate to specialists (deep work, fresh context)
```

Your system now has:
- Commands that delegate to specialized sub-agents
- Fresh context per subtask
- Focused tools per agent (less noise, faster execution)
- Specialized thinking modes (each agent has distinct expertise)

**But you still have:**
- ❌ Files scattered everywhere (no consistent structure)
- ❌ Hard to navigate as system grows
- ❌ No clear information hierarchy

**Next:** Class 5 introduces the AMA framework for information architecture.

---

## Summary

**What you learned:**
- **Context separation:** Sub-agents get fresh context, enabling deep work on each task
- **Specialization:** Different agents for different work (Analyst, Strategist, Content Creator)
- **The compounding effect:** Each agent makes your system more capable

**Key pattern:** Complex multi-step workflows? Delegate to specialized sub-agents.

**Next class:** AMA framework for organizing your growing system
