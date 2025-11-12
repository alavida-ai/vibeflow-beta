# Class 1: LLM Fundamentals & The Context Problem

**Course:** AMA Fundamentals  
**Class Number:** 1 of 9  
**Estimated Time:** 60 minutes  
**Prerequisites:** None - starts from basics  

---

## Class Overview

Welcome to the first class of the AMA Fundamentals Course. Before we dive into building scalable marketing systems with AI, we need to understand a fundamental limitation that shapes everything in this course: **the context window**.

Think of working with AI like having a conversation with someone who has a perfect memory... but only for the last hour. After that hour, you need to start over and remind them of everything. This limitation isn't a bug—it's a fundamental characteristic of how Large Language Models (LLMs) work.

In this class, you'll learn why the exciting demos you see online often fall apart when you try to scale them to real marketing work. More importantly, you'll understand the specific problems that the rest of this course solves.

### What You'll Learn

By the end of this class, you will:

1. **Understand what a context window is and why it matters** - The fundamental "working memory" limitation of all LLMs
2. **Identify the five components that fill a context window** - What's actually consuming that precious memory space
3. **Recognize context limitations** - The three ways context breaks: rot, segmentation, and hard limits
4. **Understand how MCPs amplify the context problem** - Why giving AI "tools" makes the problem worse
5. **Frame the challenges that the rest of the course solves** - Connect problems to solutions you'll learn

### Learning Objectives

- Can explain what fills a context window
- Can identify when context limits will become a problem
- Understands why chat history alone isn't scalable for marketing

---

## The Context Window: Your AI's "Working Memory"

### What is a Context Window?

**The context window is the total amount of information an LLM can hold in its "working memory" at one time.**

**Key characteristics:**
- **Fixed size** - Claude 3.5 Sonnet: 200,000 tokens (~150,000 words)
- **Temporary** - Exists only for a single conversation
- **Shared space** - Everything competes for the same limited memory
- **Token-based** - Measured in "tokens" (roughly 0.75 words per token)

### Why This Matters for Marketing

150,000 words sounds like plenty. But generating a Twitter thread requires:

- Brand voice guidelines (2,000 words)
- Messaging framework (3,000 words)
- Competitive positioning (5,000 words)
- Product info (4,000 words)
- Previous tweets (3,000 words)
- Customer research (6,000 words)
- Conversation history (5,000 words)
- Current prompt (500 words)

**Total: 28,500 words already consumed**—and we haven't even included the tools the AI might use or started the actual output yet.

Now multiply that across:
- 10 different content types (blog posts, LinkedIn, case studies, email sequences...)
- 5 different audience segments
- Ongoing conversations that span days or weeks
- Multiple team members asking questions
- Iterations and revisions

**You see the problem.**

---

## The Five Components That Fill a Context Window

Every interaction with an LLM fills the context window with five distinct components. Understanding these helps you recognize why certain workflows break at scale.

### Component 1: System Prompt (The AI's "Instructions")

**What it is:** Initial instructions that tell the AI who it is and how to behave.

**Example:**
```
You are a marketing strategist for B2B SaaS companies. You help craft
positioning, messaging, and content strategy. You think deeply about
customer pain points and competitive differentiation. When providing
recommendations, you always reference research and explain your reasoning.
```

**Typical size:** 500-2,000 tokens (375-1,500 words)

**Problem:** Packing all brand guidelines into the system prompt consumes 10,000+ tokens before you start.

---

### Component 2: MCP Tool Definitions (The AI's "Capabilities")

**What it is:** Descriptions of every tool the AI can use (read files, search web, access databases, etc.).

The Model Context Protocol (MCP) allows AI to interact with your environment—reading files, searching the web, accessing databases, etc. But every tool you give the AI requires a detailed definition that consumes context space.

<make this a collapsible>
**Example tool definition:**
```json
{
  "name": "read_file",
  "description": "Reads a file from the local filesystem. You can access any
  file directly by using this tool. Supports line offsets and limits for
  large files...",
  "parameters": {
    "file_path": "The absolute path to the file to read",
    "offset": "Optional line number to start reading from",
    "limit": "Optional number of lines to read"
  }
}
```

**Typical size per tool:** 100-500 tokens

**Problem at scale:**
- 5 default tools (Read, Write, Edit, Glob, Grep, Bash): ~1,000 tokens
- Add Notion MCP (20 tools): +4,000 tokens
- Add Slack MCP (15 tools): +3,000 tokens
- Add web scraper (8 tools): +2,000 tokens

**Total: 10,000 tokens consumed defining capabilities before conversation begins.**

More tools = less space for strategy and content.

---

### Component 3: Chat History (The Conversation So Far)

**What it is:** The entire conversation—every prompt, response, tool call, and result.

**Typical size:** Grows continuously until exceeding context limit.

**Example single conversation:**
1. Read positioning strategy (5,000 tokens)
2. Review voice guidelines (3,000 tokens)
3. Generate blog outline (2,000 tokens)
4. Revise (2,000 tokens)
5. Read competitive research (8,000 tokens)
6. Generate final draft (4,000 tokens)

**Total: 24,000 tokens**—for one piece of content.

**Problem:** History keeps growing until:
- AI "forgets" earlier context (context rot)
- You hit the limit and conversation breaks
- Contradictory information creates confusion

---

### Component 4: User Prompt (Your Current Request)

**What it is:** Your current message or request.

**Example:** "Create a Twitter thread about our new feature. Hook with pain point, explain in simple terms, show use case, CTA to demo, use data-driven voice, 2 emojis max, under 240 chars per tweet."

**Typical size:** 100-2,000 tokens

**Why this matters:** Detailed prompts are essential but consume context. AMA solves this with **commands** (reusable prompts) and **skills** (packaged workflows).

---

### Component 5: Output (The AI's Response)

**What it is:** The AI's response—content generated, tool calls, reasoning, formatting.

**Typical size:** 500-10,000+ tokens

**Problem:** Long-form content (blog posts, strategy docs, research reports) consumes 5,000-10,000 tokens per output. Generate 5 blog posts in one conversation = 25,000-50,000 tokens, leaving little room for strategy context.

---

## Context Window Anatomy Diagram

Here's how these five components compete for the same shared space:

```
┌─────────────────────────────────────────────────────────────┐
│               CONTEXT WINDOW (200,000 tokens)               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  System Prompt (1,500 tokens)                               │
│  "You are a marketing strategist..."                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  MCP Tool Definitions (8,000 tokens)                        │
│  Read, Write, Edit, Notion, Slack, Web Scraper...           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Chat History (45,000 tokens - growing)                     │
│  - User: "Read my voice guidelines"                         │
│  - AI: [reads file, 3,000 tokens]                           │
│  - User: "Generate a blog post"                             │
│  - AI: [generates 5,000 tokens]                             │
│  - User: "Revise to be more concise"                        │
│  - AI: [generates 4,000 tokens]                             │
│  - User: "Now create a Twitter version"                     │
│  - AI: [reads guidelines again, 2,000 tokens]               │
│  ...                                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Prompt (800 tokens)                                   │
│  "Create a LinkedIn post about our case study with..."      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Output (Being Generated - 3,000 tokens)                    │
│  [AI generates the LinkedIn post...]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Total Used: 58,300 tokens
Remaining: 141,700 tokens
```

**The problem:** As the conversation continues, chat history grows and remaining space shrinks. Eventually, the AI starts "forgetting" earlier context or you hit the hard limit.

---

## Three Ways Context Breaks

Now that you understand what fills a context window, let's explore the three specific ways this limitation breaks marketing workflows at scale.

### Problem 1: Context Rot (Degradation Over Long Conversations)

**What it is:** AI performance degrades as conversations grow longer—earlier context gets "pushed out," AI prioritizes recent info, contradictions create confusion.

**Why:** LLMs weight recent information more heavily. Early context becomes "fuzzy." AI pattern-matches on recent outputs instead of original guidelines.

**Symptoms:** "AI keeps drifting from brand voice," "It contradicts what I said earlier," "I keep reminding it of the same things."

---

### Problem 2: Context Segmentation (No Memory Between Sessions)

**What it is:** Every new chat session starts blank. Zero memory of previous conversations.

**Example:**
- Monday morning: Develop Q2 content strategy (2 hours)
- Monday afternoon (new session): "Let's write the first blog post for that Q2 strategy."
- AI: "I don't have context on your Q2 strategy. Could you provide details?"

**Why:** LLMs are stateless. Chat apps show history, but AI doesn't "remember" it.

**Symptoms:** "I have to explain everything again," "Why can't it remember yesterday?" "Constantly copying/pasting context."

---

### Problem 3: Context Limits (Hard Ceiling)

**What it is:** Context window has a fixed max. When you hit it, things break.

**What happens:**
- Errors: "Context length exceeded"
- Incomplete/incoherent responses
- AI removes earlier conversation parts
- Tool calls fail (no space to return results)

<Add here what happens if the AI chat app remvoves previous messagesd>

---

## How MCPs Amplify the Context Problem

### What is MCP?

MCP (Model Context Protocol) gives AI "hands" to interact with external systems—read/write files, search web, access databases, query APIs, run commands, use Notion/Slack/GitHub.

**Sounds amazing. But every tool consumes context.**

### The MCP Context Trade-off

Every MCP tool requires a definition (how to use it, parameters, examples, return types).

**Example: Notion MCP with 20 tools**
- `notion-search`, `notion-fetch`, `notion-create-pages`, `notion-update-page`, etc.
- Each tool: 200-400 tokens
- **Total: 4,000-8,000 tokens before you even use Notion**

### The Cascading Effect

**"Tool-rich" environment:**
- Default tools (Read, Write, Edit, Glob, Grep, Bash): ~1,000 tokens
- Notion MCP (20 tools): +5,000 tokens
- Slack MCP (15 tools): +3,000 tokens
- Perplexity MCP (8 tools): +2,000 tokens
- Firecrawl MCP (12 tools): +3,000 tokens

**TOTAL: 14,000 tokens (10,500 words) consumed just defining capabilities.**

**The trade-off:** More tools = more power, but less space for strategy and faster context limits.

### Why This Matters for AMA

**AMA uses a selective approach:**

**Core MCPs (always loaded):** File system tools + Bash

**Domain-specific MCPs (load when needed):** Notion, web scraping, social APIs

**The principle: Load what you need, when you need it.**

This is why AMA uses a **file-based system** (strategy in markdown) rather than heavy MCP reliance.

---

## Why This Matters for AMA: Framing the Solution

Every pattern exists to address context limitations. Here's how the rest of the course solves these problems:

### Context Rot → File-Based System (Classes 2-3)

**Problem:** Long conversations degrade; AI forgets earlier context.

**Solution:** Store strategy, research, guidelines in **markdown files** loaded on-demand. AI reads files when needed, not degraded chat history.

**Result:** Always fresh, accurate information.

---

### Context Segmentation → CLAUDE.md as Persistent Memory (Class 2)

**Problem:** Each session starts with zero context.

**Solution:** `CLAUDE.md` as persistent instruction file Claude reads every session (architecture, navigation, principles).

**Result:** Every session starts with the same foundation.

---

### Context Limits → Progressive Disclosure (Class 3)

**Problem:** Can't fit all strategy/research into one conversation.

**Solution:** **Progressive disclosure**—load only what's needed. Load 3,000 tokens relevant to current task, not 50,000 tokens upfront.

**Result:** Work with massive strategic context without hitting limits.

---

### MCP Overhead → Thoughtful Tool Selection (Class 2)

**Problem:** Every MCP tool consumes context.

**Solution:** Use MCPs strategically—file-based operations by default, external MCPs only when necessary.

**Result:** More space for strategy, less wasted on unused tools.

---

### Complexity → Agent Delegation (Classes 6-9)

**Problem:** Complex workflows consume huge context (research + strategy + content in one conversation).

**Solution:** **Specialized sub-agents** handle isolated tasks:
- Analyst agent: Research (separate context window)
- Strategist agent: Strategy (separate context window)
- Content Creator: Content (separate context window)

**Result:** Each agent works in fresh context, avoiding accumulation.

---

## Summary: The Foundation for Everything That Follows

You now understand the fundamental limitation shaping AI-assisted marketing: **the context window**.

### Key Takeaways

1. **Context windows are fixed-size working memory** - ~200,000 tokens for Claude 3.5 Sonnet
2. **Five components compete for space** - System prompt, MCP tools, chat history, user prompt, output
3. **Three ways context breaks** - Rot (degradation), segmentation (no memory), limits (hard ceiling)
4. **MCPs amplify the problem** - More tools = more power, less space for strategy

### Why This Matters

Every demo you see online—magical AI writing perfect content—works great in isolation. But when you try to scale to multiple content types, maintain consistent brand voice, build on accumulated strategy, collaborate across teams, and iterate over time...

**Traditional chat-based approaches fall apart.**

Not because AI isn't capable. Because **the context window is the bottleneck**, and most approaches don't account for it.

AMA does. Every pattern you'll learn exists to work within—and around—context limitations.