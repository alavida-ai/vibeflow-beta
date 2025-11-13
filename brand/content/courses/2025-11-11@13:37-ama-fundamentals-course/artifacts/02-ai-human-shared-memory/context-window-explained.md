# Understanding the Context Window

**Supplementary Material for Class 2**

---

## What is a Context Window?

**The context window is the total amount of information an LLM can hold in its "working memory" at one time.**

Think of it like RAM in your computer - it's temporary memory that exists only while the program is running. For AI, that "program" is a single conversation.

**Key characteristics:**
- **Fixed size** - Claude 3.5 Sonnet: 200,000 tokens (~150,000 words)
- **Temporary** - Exists only for a single conversation session
- **Shared space** - Everything competes for the same limited memory
- **Token-based** - Measured in "tokens" (roughly 0.75 words per token)

### Why 150,000 Words Isn't Actually That Much

150,000 words sounds like plenty. But a single marketing workflow might require:

- Brand voice guidelines (2,000 words)
- Messaging framework (3,000 words)
- Competitive positioning (5,000 words)
- Product information (4,000 words)
- Previous conversation (5,000 words)
- Customer research (6,000 words)
- Current prompt (500 words)

**Total: 25,500 words already consumed**—and we haven't even started generating output yet.

Now multiply that across multiple content types, audience segments, ongoing conversations spanning days, and multiple iterations... **you see the problem.**

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

**Problem:** Packing all brand guidelines into the system prompt consumes 10,000+ tokens before you even start.

---

### Component 2: Tool Definitions (The AI's "Capabilities")

**What it is:** Descriptions of every tool the AI can use (read files, search web, access databases, etc.).

Every tool requires a detailed definition that consumes context space.

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

**Why this matters:** Claude Code comes with 10+ default tools. Add MCP servers for Notion, Slack, web scrapers, and you're consuming 10,000+ tokens just defining capabilities before the conversation even begins.

---

### Component 3: Chat History (The Conversation So Far)

**What it is:** The entire conversation—every prompt, response, tool call, and result.

**Typical size:** Grows continuously until exceeding context limit.

**Example single conversation:**
1. Read positioning strategy (5,000 tokens)
2. Review voice guidelines (3,000 tokens)
3. Generate blog outline (2,000 tokens)
4. Revise outline (2,000 tokens)
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

**Why this matters:** Detailed prompts are essential for good output but consume context. Commands (Class 3) solve this by making prompts reusable without re-typing.

---

### Component 5: Output (The AI's Response)

**What it is:** The AI's response—content generated, tool calls, reasoning, formatting.

**Typical size:** 500-10,000+ tokens

**Problem:** Long-form content (blog posts, strategy docs, research reports) consumes 5,000-10,000 tokens per output. Generate 5 blog posts in one conversation = 25,000-50,000 tokens consumed, leaving little room for strategy context.

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

## How MCP Amplifies the Context Problem

### What is MCP (Model Context Protocol)?

MCP gives AI "tools" to interact with external systems:
- **File operations** - Read, write, edit files
- **Web access** - Search, scrape, fetch content
- **Database queries** - Access structured data
- **API integrations** - Notion, Slack, GitHub, etc.
- **Terminal commands** - Run bash scripts and automation

**This is incredibly powerful.** It transforms AI from a chatbot into an agent that can actually do work in your environment.

**But there's a hidden cost: every tool consumes context space.**

---

### The Tool Definition Tax

Every MCP tool requires a detailed definition in the context window (how to use it, parameters, examples, return types). Each tool definition consumes 100-500 tokens.

**The problem scales quickly:**

**Example: Adding Notion MCP**
- Notion provides 20+ tools: `notion-search`, `notion-fetch`, `notion-create-pages`, `notion-update-page`, etc.
- Each tool: 200-400 tokens
- **Total: 4,000-8,000 tokens consumed before you even use Notion once**

### The Cascading Effect

Here's what happens when you build a "tool-rich" environment:

- Default Claude Code tools (Read, Write, Edit, Glob, Grep, Bash): ~1,000 tokens
- Add Notion MCP (20 tools): +5,000 tokens
- Add Slack MCP (15 tools): +3,000 tokens
- Add Perplexity MCP (8 tools): +2,000 tokens
- Add Firecrawl MCP (12 tools): +3,000 tokens

**TOTAL: 14,000 tokens (10,500 words) consumed just defining capabilities.**

Before you've asked a single question or generated any content.

**The trade-off:**
- More tools = More capabilities = More powerful AI
- More tools = Less space for strategy, research, conversation
- More tools = Hit context limits faster

### The Double Cost: Tool Definitions AND Tool Usage

Tool definitions are just the first cost. There's a second cost: **every tool call consumes tokens twice.**

**When you use a tool:**
1. **The tool call consumes tokens** - The AI must specify which tool, what parameters, what to do
2. **The tool result consumes tokens** - The response (file contents, API data, search results) gets added to context

**Example: Reading a strategy file**
- Tool call: `Read file: /brand/strategy/positioning/STRATEGY.md` (~50 tokens)
- Tool result: The entire file contents (~3,000 tokens)
- **Total: 3,050 tokens consumed for one file read**

**A few tool calls rapidly bloat context:**
- Read positioning strategy: 3,000 tokens
- Read voice guidelines: 2,500 tokens
- Read messaging framework: 3,500 tokens
- Search for past content: 4,000 tokens
- Fetch competitor data from API: 5,000 tokens

**Total: 18,000 tokens consumed from just 5 tool calls.**

---

## Three Ways Context Breaks

Now that you understand what fills a context window, let's explore the three specific ways this limitation breaks marketing workflows at scale.

### Problem 1: Context Rot (Degradation Over Long Conversations)

**What it is:** AI performance degrades as conversations grow longer—earlier context gets "pushed out," AI prioritizes recent information, contradictions create confusion.

**Why it happens:** LLMs weight recent information more heavily. Early context becomes "fuzzy." The AI starts pattern-matching on recent outputs instead of original guidelines.

**Symptoms you've experienced:**
- "The AI keeps drifting from my brand voice"
- "It contradicts what I said earlier"
- "I keep having to remind it of the same things"
- "The quality was better at the start of the conversation"

**Real example:**
```
Message 1: "Use a conversational, friendly tone"
[30 messages later]
Message 31: AI starts using formal, corporate language
You: "Remember, conversational tone"
Message 35: AI goes back to formal again
```

The AI isn't "forgetting" on purpose - it's prioritizing the last 20 messages over message 1.

---

### Problem 2: Context Segmentation (No Memory Between Sessions)

**What it is:** Every new chat session starts with a completely blank slate. Zero memory of previous conversations.

**Why it happens:** LLMs are stateless. Chat apps show history in the UI, but the AI doesn't actually "remember" it unless it's loaded into the current context window.

**Example workflow that breaks:**
- Monday morning: Develop Q2 content strategy (2-hour conversation, 40,000 tokens)
- Monday afternoon (new session): "Let's write the first blog post for that Q2 strategy."
- AI: "I don't have context on your Q2 strategy. Could you provide details?"

**Symptoms you've experienced:**
- "I have to explain everything again every time"
- "Why can't it remember what we discussed yesterday?"
- "I'm constantly copying and pasting the same context"
- "It feels like Groundhog Day"

**The manual reconstruction nightmare:**
Every time you start a new session, you spend 15-45 minutes:
- Re-uploading files
- Re-explaining your brand
- Re-establishing workflows
- Copy-pasting key decisions from previous chats

---

### Problem 3: Context Limits (Hard Ceiling)

**What it is:** The context window has a fixed maximum size. When you hit it, things break completely.

**What happens when you hit the limit:**
- **Errors:** "Context length exceeded. Please start a new conversation."
- **Incomplete responses:** AI cuts off mid-sentence
- **Incoherent responses:** AI loses track of what it's doing
- **Tool calls fail:** No space left to return file contents or API data

**Advanced chat apps workaround (that creates a new problem):**
Some AI chat applications automatically remove earlier messages when you approach the context limit. This keeps the conversation running, but:
- The AI loses access to earlier context and strategy decisions
- Quality degrades as early guidelines disappear
- You get "context rot" happening automatically in the background
- The conversation continues, but it's no longer grounded in your original instructions

**Real scenario:**
```
Messages 1-50: Develop comprehensive brand strategy (60,000 tokens)
Messages 51-100: Create content calendar (40,000 tokens)
Messages 101-120: Start writing blog posts (45,000 tokens)
Message 121: Generate LinkedIn post
AI: ERROR - Context limit exceeded

OR (with auto-deletion):

Message 121: Generate LinkedIn post
AI: [Messages 1-50 deleted automatically]
     [Generates post without brand strategy context]
     [Quality noticeably worse, doesn't match brand voice]
```

---

## Why This Matters for Class 2's Solution

Understanding context windows explains why **chat windows fundamentally can't scale for marketing work**, and why Class 2's solution (file-based systems with an IDE) is necessary:

### Chat Windows Trap You

- **Performance degradation** - Long conversations degrade (context rot)
- **Separation anxiety** - Can't start fresh without losing everything (context segmentation)
- **Context limit wall** - Eventually hit hard ceiling, forced to manually reconstruct (context limits)

### File-Based Systems Free You

- **Fresh context every session** - Start new conversations without losing work (files persist)
- **Progressive disclosure** - Load only what's needed (3,000 tokens instead of 50,000)
- **No degradation** - Files don't degrade like chat history
- **Automatic context** - CLAUDE.md loads every session (no manual reconstruction)

**Bottom line:** The context window limitation is why we need a completely different approach to building marketing systems with AI. Chat windows were built for one-off questions, not building infrastructure.

---

## Additional Resources

**Related concepts:**
- [Class 2 Conceptual](./Conceptual.md) - Why files solve the context problem
- [Class 2 Practical](./Practical.md) - How to use markdown and files effectively
- [Class 3](../02d-class-4-claude-code-commands.md) - Commands solve the cold start problem

**External resources:**
- [Anthropic's context window documentation](https://docs.anthropic.com/claude/docs/models-overview)
- [Understanding tokens and context windows](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)
