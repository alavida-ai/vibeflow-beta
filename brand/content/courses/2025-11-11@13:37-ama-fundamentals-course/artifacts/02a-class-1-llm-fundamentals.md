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

Imagine you're working with a brilliant consultant who can process information incredibly fast and provide insightful recommendations. There's just one catch: they can only keep about 200,000 words in their working memory at any given time. Once you exceed that limit, they start "forgetting" earlier parts of the conversation.

That's essentially what a context window is—**the total amount of information an LLM can hold in its "working memory" at one time.**

**Key characteristics:**
- **Fixed size** - Modern models like Claude 3.5 Sonnet have a 200,000 token context window (~150,000 words)
- **Temporary** - Exists only for a single conversation or task
- **Shared space** - Everything competes for the same limited memory
- **Token-based** - Measured in "tokens" (roughly 0.75 words per token)

### Why This Matters for Marketing

At first, 150,000 words sounds like plenty of space. That's about 300 pages of text! But here's where marketing work gets complicated:

**Scenario:** You want to generate a Twitter thread about your product.

To do that well, the AI needs:
- Your brand voice guidelines (2,000 words)
- Your messaging framework (3,000 words)
- Competitive positioning (5,000 words)
- Product information (4,000 words)
- Previous successful tweets for reference (3,000 words)
- Customer pain points from research (6,000 words)
- The conversation history with you (5,000 words)
- Your current prompt (500 words)

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

**What it is:** The initial instructions that tell the AI who it is and how to behave.

**Example:**
```
You are a marketing strategist for B2B SaaS companies. You help craft
positioning, messaging, and content strategy. You think deeply about
customer pain points and competitive differentiation. When providing
recommendations, you always reference research and explain your reasoning.
```

**Typical size:** 500-2,000 tokens (375-1,500 words)

**Problem at scale:** If you try to pack all your brand guidelines, voice rules, and strategy into the system prompt, you'll consume 10,000+ tokens before you even start a conversation.

---

### Component 2: MCP Tool Definitions (The AI's "Capabilities")

**What it is:** Descriptions of every tool or function the AI can use to interact with external systems.

The Model Context Protocol (MCP) allows AI to interact with your environment—reading files, searching the web, accessing databases, etc. But every tool you give the AI requires a detailed definition that consumes context space.

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

**Typical size per tool:** 100-500 tokens (75-375 words)

**Why This Matters for AMA:**
Claude Code comes with default MCP tools (Read, Write, Edit, Glob, Grep, Bash). If you add custom MCPs (like Notion, Slack, web scrapers), each one adds 100-500 tokens of tool definitions to every single request.

**Problem at scale:**
- 5 default tools: ~1,000 tokens
- Add Notion MCP (20 tools): +4,000 tokens
- Add Slack MCP (15 tools): +3,000 tokens
- Add custom web scraper (8 tools): +2,000 tokens

**Total: 10,000 tokens consumed just defining capabilities**—before any conversation begins.

This is why being intentional about which MCPs you load is crucial. More tools = less space for actual work.

---

### Component 3: Chat History (The Conversation So Far)

**What it is:** The entire conversation between you and the AI, including every message, response, and tool call.

**What's included:**
- Every user prompt you've sent
- Every AI response generated
- Every tool call made (e.g., "Reading file: /brand/strategy/voice/STRATEGY.md")
- Every tool result (e.g., the full contents of that file)

**Typical size:** Grows continuously until exceeding the context limit. At which points, your chat with the AI is pretty much dead

**Why This Matters for AMA:**
Every time Claude reads a strategy file, conducts research, or generates content, that entire interaction gets added to the chat history. In a single conversation, you might:

1. Ask Claude to read your positioning strategy (5,000 tokens)
2. Review your voice guidelines (3,000 tokens)
3. Generate a blog post outline (2,000 tokens)
4. Revise based on feedback (2,000 tokens)
5. Read competitive research (8,000 tokens)
6. Generate final draft (4,000 tokens)

**Total chat history: 24,000 tokens**—and that's just one piece of content.

**Problem at scale:** In traditional chat interfaces, this history keeps growing until:
- The AI starts "forgetting" earlier parts of the conversation (context rot)
- You hit the context limit and the conversation breaks
- The AI gets "confused" by contradictory information from different points in the conversation

---

### Component 4: User Prompt (Your Current Request)

**What it is:** Your current message or request to the AI.

**Example:**
```
Create a Twitter thread about our new AI-powered analytics feature.
The thread should:
- Start with a hook about the pain point (manual reporting is tedious)
- Explain the feature in simple terms
- Show a specific use case from our fintech customers
- End with a CTA to book a demo
- Use our signature "data-driven storytelling" voice
- Include 2 relevant emojis maximum
- Keep each tweet under 240 characters for readability
```

**Typical size:** 100-2,000 tokens (75-1,500 words)

**Why This Matters for AMA:**
Well-crafted prompts are essential for getting good outputs. But detailed prompts consume context space. In AMA, we solve this with **commands** (reusable prompts) and **skills** (packaged workflows) so you don't need to rewrite complex prompts every time.

---

### Component 5: Output (The AI's Response)

**What it is:** The AI's response to your prompt, including any content generated, tool calls made, and reasoning shown.

**What's included:**
- The actual content generated (blog post, strategy document, etc.)
- Tool usage (files read, edits made, searches performed)
- Reasoning and explanations
- Markdown formatting, code blocks, etc.

**Typical size:** 500-10,000+ tokens depending on the task

**Why This Matters for AMA:**
Long-form content generation (blog posts, strategy documents, research reports) can consume 5,000-10,000 tokens per output. If you're generating multiple pieces in one conversation, the output alone can fill the context window.

**Problem at scale:** If you ask Claude to generate 5 blog posts in one conversation, that's 25,000-50,000 tokens of output added to the chat history—leaving less room for strategy context in future requests.

---

## Context Window Anatomy Diagram

Here's how these five components compete for the same shared space:

```
┌─────────────────────────────────────────────────────────────┐
│               CONTEXT WINDOW (200,000 tokens)               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  System Prompt (1,500 tokens)                              │
│  "You are a marketing strategist..."                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  MCP Tool Definitions (8,000 tokens)                       │
│  Read, Write, Edit, Notion, Slack, Web Scraper...         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Chat History (45,000 tokens - growing)                    │
│  - User: "Read my voice guidelines"                        │
│  - AI: [reads file, 3,000 tokens]                         │
│  - User: "Generate a blog post"                            │
│  - AI: [generates 5,000 tokens]                           │
│  - User: "Revise to be more concise"                       │
│  - AI: [generates 4,000 tokens]                           │
│  - User: "Now create a Twitter version"                    │
│  - AI: [reads guidelines again, 2,000 tokens]             │
│  ...                                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Prompt (800 tokens)                                  │
│  "Create a LinkedIn post about our case study with..."     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Output (Being Generated - 3,000 tokens)                   │
│  [AI generates the LinkedIn post...]                       │
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

**What it is:** As conversations get longer, the AI's performance degrades because:
- Earlier context gets "pushed out" of working memory
- The AI prioritizes recent information over older (but still relevant) information
- Contradictory information from different parts of the conversation creates confusion

**Why this happens:**
- LLMs use attention mechanisms that weight recent information more heavily
- Early context becomes "fuzzier" as more information is added
- The AI starts pattern-matching on recent outputs rather than original guidelines

**Symptoms:**
- "The AI keeps drifting from my brand voice"
- "It contradicts what I told it earlier"
- "I have to keep reminding it of the same things"

---

### Problem 2: Context Segmentation (No Memory Between Sessions)

**What it is:** Every new chat session starts with a completely blank slate. The AI has zero memory of previous conversations.

**Real marketing scenario:**

```
[Monday morning]
You: "Let's develop our Q2 content strategy."
AI: [Analyzes market, creates strategy, you discuss for 2 hours]

[Monday afternoon - you close the chat and open a new one]
You: "Let's write the first blog post for that Q2 strategy."
AI: "I don't have context on your Q2 strategy. Could you provide details?"

You: "We just spent 2 hours on this!"
AI: "I apologize, but I don't have access to previous conversations.
      Each session starts fresh."
```

**Why this happens:**
- LLMs are stateless—they don't store information between sessions
- Your chat app might show history, but the AI itself doesn't "remember" it
- Privacy and security require that sessions are isolated

**Symptoms:**
- "I have to explain everything again every time"
- "Why can't it remember what we discussed yesterday?"
- "I'm copying and pasting the same context repeatedly"

---

### Problem 3: Context Limits (Hard Ceiling on Information)

**What it is:** The context window has a fixed maximum size. When you hit it, things break.

**What happens when you hit the limit:**
- Errors occur: "Context length exceeded"
- Responses become incomplete or incoherent
- If using an advacne AI app the AI will start removing earlier parts of the conversation
- Tool calls fail because there's no space to return results

**Real marketing scenario:**

```
You're creating a comprehensive content strategy that requires:
- Customer research insights (15,000 tokens)
- Competitive analysis (12,000 tokens)
- Brand guidelines (8,000 tokens)
- Previous content performance data (10,000 tokens)
- Industry trends analysis (8,000 tokens)
- 3 hours of conversation developing the strategy (50,000 tokens)

Total: 103,000 tokens

Now you ask: "Write a blog post implementing this strategy."

AI: "I'll read your brand guidelines and research..."
    [Tries to read 8,000 token file]
    [ERROR: Adding this file would exceed context limit]

Result: The AI can't access the information it needs because the
        conversation has consumed too much of the context window.
```

**Symptoms:**
- "Error: Maximum context length exceeded"
- Files can't be read because there's no space left
- The AI says "I don't have access to..." even though the file exists
- Responses get cut off mid-sentence

---

## How MCPs Amplify the Context Problem

### What is MCP (Model Context Protocol)?

MCP is a protocol that allows LLMs to interact with external systems—think of it as giving your AI "hands" to:
- Read and write files
- Search the web
- Access databases
- Query APIs
- Run terminal commands
- Interact with tools like Notion, Slack, GitHub

**This sounds amazing (and it is!), but it comes with a hidden cost.**

---

### The MCP Context Trade-off

Every MCP tool you add to your environment requires:
1. A tool definition (how to use it)
2. Parameter descriptions (what inputs it needs)
3. Usage examples (when to use it)
4. Return type definitions (what it outputs)

**Example: Notion MCP**

The Notion MCP might include 20+ tools:
- `notion-search` - Search across workspace
- `notion-fetch` - Retrieve page content
- `notion-create-pages` - Create new pages
- `notion-update-page` - Edit existing pages
- `notion-create-database` - Create databases
- `notion-update-database` - Modify databases
- `notion-create-comment` - Add comments
- `notion-get-comments` - Read comments
- `notion-move-pages` - Reorganize content
- `notion-duplicate-page` - Copy pages
- (10 more tools...)

Each tool definition: 200-400 tokens

**Total cost: 4,000-8,000 tokens**—before you even use Notion.

---

### The Cascading Effect

Let's calculate the real cost of a "tool-rich" environment:

```
Default Claude Code tools:
- Read, Write, Edit, Glob, Grep, Bash: ~1,000 tokens

Add Notion MCP:
- 20 tools: ~5,000 tokens

Add Slack MCP:
- 15 tools: ~3,000 tokens

Add Perplexity MCP (web search):
- 8 tools: ~2,000 tokens

Add Firecrawl MCP (web scraping):
- 12 tools: ~3,000 tokens

TOTAL MCP OVERHEAD: 14,000 tokens
```

**That's 10,500 words of context consumed just defining capabilities**—before you've asked a single question or generated any content.

**The trade-off:**
- More tools = more capabilities = more powerful AI
- More tools = less space for strategy, research, and conversation
- More tools = hitting context limits faster

---

### Why This Matters for AMA

In AMA, we take a **selective approach to MCPs**:

**Core MCPs (always loaded):**
- File system tools (Read, Write, Edit, Glob, Grep) - essential for working with marketing files
- Bash - for automation and workflows

**Domain-specific MCPs (load only when needed):**
- Notion - when you need to sync strategy with your workspace
- Web scraping - when conducting research
- Social media APIs - when scheduling content

**The principle:** **Load what you need, when you need it.**

This is why AMA uses a **file-based system** rather than relying heavily on external MCPs. Your strategy lives in markdown files, not in API calls that consume context with every request.

---

## Why This Matters for AMA: Framing the Solution

Every pattern, principle, and practice in AMA exists to address these context limitations. Here's a preview of how the rest of the course solves these problems:

### Context Rot → File-Based System (Classes 2-3)

**The problem:** Long conversations degrade; the AI forgets earlier context.

**The solution:** Store strategy, research, and brand guidelines in **markdown files** that can be loaded on-demand. Instead of relying on chat history, the AI reads files when it needs them.

**Result:** The AI always has access to fresh, accurate information—not degraded memories from 100 messages ago.

---

### Context Segmentation → CLAUDE.md as Persistent Memory (Class 2)

**The problem:** Each new chat session starts with zero context.

**The solution:** Use `CLAUDE.md` as a persistent instruction file that Claude reads at the start of every session. This file contains your system architecture, navigation heuristics, and core principles.

**Result:** Every new session starts with the same foundation—no need to re-explain your system every time.

---

### Context Limits → Progressive Disclosure (Class 3)

**The problem:** You can't fit all your strategy, research, and context into one conversation.

**The solution:** Use **progressive disclosure**—load only what's needed for the current task. Instead of loading 50,000 tokens of strategy upfront, load the 3,000 tokens relevant to the current blog post.

**Result:** You can work with massive amounts of strategic context without hitting context limits.

---

### MCP Overhead → Thoughtful Tool Selection (Class 2)

**The problem:** Every MCP tool consumes context space.

**The solution:** Use MCPs strategically—default to file-based operations, add external MCPs only when necessary, and document when to use each.

**Result:** More space for strategy, less space wasted on unused tool definitions.

---

### Complexity → Agent Delegation (Classes 6-9)

**The problem:** Complex workflows consume huge amounts of context (research + strategy + content in one conversation).

**The solution:** Break work into **specialized sub-agents** that handle isolated tasks:
- Analyst agent: Conducts research (separate context window)
- Strategist agent: Synthesizes strategy (separate context window)
- Content Creator agent: Generates content (separate context window)

**Result:** Each agent works in its own fresh context window, avoiding the accumulation problem entirely.

---

## Summary: The Foundation for Everything That Follows

Congratulations! You now understand the fundamental limitation that shapes all of AI-assisted marketing work: **the context window**.

### Key Takeaways

1. **Context windows are fixed-size working memory** - ~200,000 tokens for Claude 3.5 Sonnet
2. **Five components compete for space** - System prompt, MCP tools, chat history, user prompt, output
3. **Three ways context breaks** - Rot (degradation), segmentation (no memory), limits (hard ceiling)
4. **MCPs amplify the problem** - More tools = more capabilities, but less space for strategy

### Why This Matters

Every demo you see online—the magical AI that writes perfect content, the agent that manages your entire marketing strategy—works great in isolation. But the moment you try to:
- Scale to multiple content types
- Maintain consistent brand voice across weeks
- Build on accumulated research and strategy
- Collaborate across team members
- Iterate and refine over time

**...traditional chat-based approaches fall apart.**

That's not because the AI isn't capable. It's because **the context window is the bottleneck**, and most approaches don't account for it.

AMA does. Every pattern, principle, and practice you'll learn in this course exists to work within—and around—context limitations.