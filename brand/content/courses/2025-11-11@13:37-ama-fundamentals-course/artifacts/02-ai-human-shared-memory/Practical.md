# Class 2: Introducing the IDE

**Course:** AMA Fundamentals
**Class Number:** 2 of 7
**Estimated Time:** 60 minutes
**Prerequisites:** Class 1 (ChatGPT and Introducing MCP)

---

## Class Overview

In Class 1, you escaped the manual copy-paste grind by adding MCP to your chat window. Now AI can fetch data automatically. But you've probably noticed something: the chat window is still filling up, conversations are getting slower, and you're still afraid to start fresh because you'll "lose everything."

**This class is about the next leap: moving from the chat window into an IDE with a file-based system.**

By the end of this class, you'll understand:
- Why chat windows can't scale (especially with MCP)
- How file systems create persistent, shared memory between you and AI
- What an IDE gives you that chat interfaces can't
- The first steps toward building marketing infrastructure as code

### What You'll Learn

By the end of this class, you will:

1. **Recognize where you are now** - MCP-enabled chat, but hitting scalability limits
2. **Identify the new problems** - No persistence, poor visibility, performance degradation
3. **Understand common workarounds** - And why they're band-aids, not solutions
4. **Learn the solution** - IDE + Integrated Agent + file system
5. **See measurable improvements** - Scalability and visibility as design attributes

### Learning Objectives

- Can explain why chat windows don't scale
- Understands how files create persistent memory
- Knows the difference between chat-based and file-based AI workflows
- Can set up basic file structure for marketing work

---

## Part 1: Where You Are Right Now

### The MCP-Enabled Chat Window

You've added MCP to your ChatGPT or Claude chat. Now you can:
- ✅ Scrape competitor websites automatically
- ✅ Fetch data from Notion, Slack, Drive
- ✅ Get cited, verifiable outputs

**This is already a huge improvement over Class 1.** But you're starting to notice new problems:

**You've probably experienced:**
- Chat window growing longer and longer (50+ messages deep)
- AI responses getting slower as the conversation grows
- That anxiety: "If I start a new chat, I'll lose all this context"
- Having to scroll up to find something you discussed earlier
- Conversations becoming a tangled mess of research, strategy, and content mixed together
- Eventually you will hit the context limit and the chat will essentially die

**The investment trap:**
The longer the conversation, the more invested you become. You're afraid to start fresh because you've built up so much context. But the longer it goes, the worse the performance gets.

### What You're Trying to Do

You're trying to build something more substantial:
- **Strategy docs** that persist (not just chat history)
- **Research findings** you can reference later
- **Content workflows** you can reuse
- **Marketing infrastructure** that compounds over time

**But chat windows weren't built for this.** They were built for one-off questions, not building systems.

---

## Part 2: The Problems (And How They Affect Design Attributes)

### Problem 1: Performance Degradation + Separation Anxiety

**What is performance degradation?**
Remember from Class 1 when you noticed the chat window "keeps growing longer and longer (also slower and dumber)"? That's not in your head. It's a real problem.

**The problem with growing chat windows:**
The longer your conversation, the worse everything gets:
- **AI responses slow down** - What took 5 seconds now takes 20 seconds
- **Quality degrades** - AI gives vaguer answers, "forgets" earlier details
- **You get more frustrated** - "Why is this so slow? Why did it ignore what I just said?"
- **Scrolling becomes painful** - "Where was that thing we discussed?"

**This creates separation anxiety:**
You know starting a new chat would fix the slowness... but then you'd lose all that context you built up. So you stay in the slow, degrading chat, getting more and more frustrated.

**You've probably done this dance:**
```
[Chat hits message 50, getting slow]
You: "Should I start a new chat? But I'll lose all this context..."
[Stays in chat, gets slower]
[Message 70, unbearably slow]
You: "Ugh, I can't take this anymore"
[Stays anyway because starting fresh means losing everything]
```

**Why this matters:** You can't build a marketing system if you're trapped between "slow AI that remembers" and "fast AI with no memory." You need both speed AND persistence.

---

### Problem 2: Everything's Buried in Scrolling Chats

**What is visibility?**
Visibility is being able to see what work you have, where it is, and how to find it.

**The problem with chat windows:**
All your work is buried in scrolling conversations. You can't:
- **See what you have** - "Wait, did I do a competitor analysis already?"
- **Find things quickly** - Scroll scroll scroll... "Where was that?"
- **Organize by topic** - Everything's chronological, not topical
- **Get an overview** - No way to see "here's all my research" or "here's all my strategy work"

**You've definitely done this:**
```
You: "I need that competitor analysis I did last week..."
[Opens ChatGPT, scrolls through "Product Launch Chat"]
[Scrolls more]
[Gives up, opens different chat]
[Scrolls again]
You: "Forget it, I'll just redo it. Faster than searching."
```

**The pain multiplies over time:**
- Week 1: 3 chats to search through
- Week 4: 15 chats
- Week 12: 50+ chats, impossible to find anything

**Why this matters:** If you can't find your work, you can't reuse it. You end up redoing work you've already done, wasting hours every week.

---

### Problem 3: Hitting the Context Limit Wall - Forced Manual Reconstruction

**What is the context limit wall?**
Eventually, your chat window doesn't just slow down - it hits a hard limit. The conversation literally can't continue. You're FORCED to start a new chat whether you want to or not.

**What happens when you hit the wall:**
```
Claude: "I've reached my context limit. Please start a new conversation."

You: [starts new chat]
You: "Okay, here's my brand positioning..." [types for 10 minutes]
You: "And here's my target audience..." [types for 10 minutes]
You: "Let me upload these research files again..." [uploads 5 files]
You: "Now, where was I? Oh right, I was working on..."
[30 minutes later, still reconstructing context]
```

**The manual reconstruction nightmare:**
Every time you hit the limit, you have to:
- **Re-upload the same files** - Brand strategy, research docs, voice guidelines
- **Re-explain your context** - Product, audience, positioning, goals
- **Re-establish workflows** - "When I say analyze a competitor, here's what I mean..."
- **Copy parts of the chat history** - All the refinements, clarifications, and decisions from the previous chat are gone

**You've definitely experienced this:**
```
Week 1: Build up 80 messages of context
Week 2: Hit limit, spend 45 minutes reconstructing in new chat
Week 3: Hit limit again, spend 45 minutes reconstructing AGAIN
Week 4: "Why am I spending more time rebuilding context than doing actual work?"
```

**Why this matters:** You shouldn't spend hours every week manually rebuilding the same context. Your marketing knowledge should persist automatically, not require constant manual reconstruction.

---

## Part 3: The Common Workarounds (And Why They're Band-Aids)

### Workaround 1: Claude Projects / Custom GPTs

**What people do:**
Use ChatGPT Projects or Claude Projects to upload files that persist across chats.

**Why it's better but still limited:**
- ✅ Reduces re-explaining static context
- ✅ Files persist between sessions
- ❌ Still fundamentally chat-based (scrolling messages)
- ❌ Manual file uploads/updates
- ❌ Can't save AI outputs to files automatically
- ❌ No structure for organizing work
- ❌ Performance still degrades in long conversations

**The fundamental issue:** You're still treating the chat window as the primary interface. Files are just "uploads" to feed the chat, not the actual workspace.

---

### Workaround 2: Summarize and Start Fresh

**What people do:**
Ask AI to summarize the conversation, then start a new chat with that summary as context.

**Why it doesn't work:**
- ❌ Lossy compression (nuance gets lost)
- ❌ Manual process (time-consuming)
- ❌ Summaries aren't structured (hard to navigate)
- ❌ Still no persistence (summaries live in... more chats)
- ❌ Can't scale (imagine summarizing 10 different work streams)

**You're just kicking the can down the road.**

---

### Workaround 3: External Note-Taking (Notion, Obsidian, etc.)

**What people do:**
Copy-paste AI outputs into Notion/Obsidian for organizing later, or tell the agent to load these in using the MCP

**Why it doesn't fully solve it:**
- ✅ Finally have structured organization
- ✅ Work persists outside chat
- ❌ Massive friction (manual copy-paste)
- ❌ AI can't read your Notion docs (unless you have Notion MCP + paste IDs)
- ❌ Two systems (chat + notes) instead of one integrated flow
- ❌ No versioning, no collaboration, no automation

**You're using AI to create, then manually organizing outside AI. There's a better way.**

---

## Part 4: The Solution - IDE + File System + Claude Code

### What is an IDE?

**IDE = Integrated Development Environment**

For developers, it's where they write code. For you, it's where you'll build your marketing infrastructure.

**Popular options:**
- **VS Code** (free, Microsoft, most popular)
- **Cursor** (VS Code fork, AI-first features)
- **Windsurf, Zed, etc.** (other options)

**What it gives you:**
- File explorer (see all your files in a tree)
- Text editing (create and edit markdown files)
- Terminal (run commands)
- Extensions (add capabilities)
- **Claude Code integration** (AI that works with files)

**Think of it as:**
- Chat window = Notepad (single document, everything in one place)
- IDE = File cabinet (organized folders, structured workspace)

---

### The Stack: IDE + Claude Code + Files

Here's how it all works together:

```
Claude Code (AI with file tools)
    ↓ runs inside
IDE (VS Code/Cursor)
    ↓ which edits
Markdown files (your persistent marketing knowledge base)
```

**Claude Code** is Anthropic's AI agent that can:
- Read files
- Write files
- Edit files
- Search files
- Navigate folders
- Plus any functionality from connected MCPs

**IDE** is your workspace where:
- You see all your files in a tree
- You edit markdown files directly
- You run Claude Code
- You organize your marketing infrastructure

**Markdown files (text with formatting)** are your persistent memory:
- Strategy docs
- Research findings
- Content drafts
- Process workflows
- All structured, navigable, version-controlled

---

### How This Solves the Problems

**Problem 1 + Problem 3: Performance Degradation + Separation Anxiety + Context Limit**
```
Before (chat):
- 50 messages = slow, degraded performance
- Separation anxiety (can't start fresh without losing everything)
- Trapped between "slow with memory" and "fast without memory"
- approaching context limit

After (files):
- Start fresh anytime - AI navigates folders and loads only relevant files
- AI creates new files with important information you can reference later
- You can edit AI-created files directly in the IDE
- Collaboration on shared memory infrastructure (both human and AI can read/write)
- System gets BETTER over time as you add more documented knowledge
- Fast AI + persistent memory (no trade-off)
```

✅ **Scalability + Persistence: Performance degrades → Performance compounds with permanent memory (no more separation anxiety)**

---

**Problem 2: Everything's Buried in Scrolling Chats**
```
Before (chat):
- Scroll through endless messages
- Search across 50+ different chats
- No organization by topic
- Redo work you can't find

After (files):
- See all files in tree
- Navigate hierarchically by topic
- Search by name, content, or folder
- Structure reflects your mental model
- Reuse work instantly
```

✅ **Visibility: Hidden in chats → Organized in folders**

---

### Real Example: Building Brand Strategy

**Chat-based workflow:**
```
1. Long conversation developing strategy
2. Copy-paste key parts into Notion
3. Lose nuance and context
4. Next session: "Let me explain our strategy again..."
```

**File-based workflow:**
```
1. Create /brand/strategy/positioning/STRATEGY.md
2. AI writes strategy directly to file
3. Strategy persists forever
4. Next session: "Load /brand/strategy/positioning/STRATEGY.md" → instant context
5. Update strategy? Edit the file
6. Reference in content? Link to file
```

**The difference:** Chat = ephemeral. Files = infrastructure.

---

## Part 5: Design Attributes - Before and After

These are the benchmarks that matter as you move from chat to files.

**Note:** Groundedness and Friction were solved in Class 1 with MCP. Those stay good. This class solves THREE NEW problems: Scalability (performance + separation anxiety), Visibility (finding work), and Persistence (context reconstruction).

---

### Attribute 1: Groundedness (Stays High ✅)

**From Class 1:** MCP gave you grounded, data-backed outputs.

| MCP-Enabled Chat (Class 1) | Files + MCP (Class 2) |
|----------------------------|----------------------|
| ✅ AI fetches real data | ✅ AI fetches real data |
| ✅ Cited sources | ✅ Cited sources |
| ✅ Data-backed insights | ✅ Data-backed insights |

**Status:** Solved in Class 1, stays solved ✅

---

### Attribute 2: Friction (Further Reduced ✅)

**From Class 1:** MCP automated data fetching (no more copy-pasting data).
**Class 2 improvement:** Files eliminate context reconstruction friction (no more rebuilding context manually).

| MCP-Enabled Chat (Class 1 End) | Files + MCP (Class 2) |
|--------------------------------|----------------------|
| ✅ Low data-fetching friction (MCP) | ✅ Data-fetching friction stays low |
| ❌ High context reconstruction friction | ✅ Context reconstruction eliminated |
| ❌ 45 min rebuilding context per restart | ✅ Load files instantly (0 min) |
| ❌ Manual file re-uploads each session | ✅ Files already there (automatic) |

**Improvement:** Friction further reduced - no more spending hours rebuilding the same context

---

### Attribute 3: Scalability (NEW - Now Solved ✅)

**Definition:** Does the system maintain (or improve) performance as you add more work?

| MCP-Enabled Chat (Class 1 End) | Files + MCP (Class 2) |
|--------------------------------|----------------------|
| ❌ 50 messages = slow, degraded | ✅ 1000 files = same speed |
| ❌ Separation anxiety (can't start fresh) | ✅ Start fresh anytime, files persist |
| ❌ System degrades over time | ✅ System compounds over time |

**Improvement:** Performance degrades → Performance compounds

---

### Attribute 4: Visibility (NEW - Now Solved ✅)

**Definition:** Can you see, find, and navigate your work?

| MCP-Enabled Chat (Class 1 End) | Files + MCP (Class 2) |
|--------------------------------|----------------------|
| ❌ Work buried in scrolling chats | ✅ File tree shows everything |
| ❌ Search through 50+ chats | ✅ Search by file name or path |
| ❌ Redo work you can't find | ✅ AI Agent stores and modifies outputs as files |

**Improvement:** Hidden in chats → Visible in organized folders

---

## Part 6: Where You Are At the End of This Class

### Your New Capabilities

You're now using an IDE (VS Code/Cursor) with Claude Code and have set up MCP. You can:

**✅ Work with persistent files**
- Create strategy docs that persist
- Save research findings to organized files
- Structure knowledge hierarchically

**✅ See your entire workspace**
- File tree shows all your work
- Navigate folders intuitively
- Find anything instantly
- Organize by your mental model

**✅ Build compounding systems**
- New work builds on previous work
- AI loads relevant files on demand
- Knowledge accumulates over time
- System gets more powerful, not cluttered

### What You've Unlocked

**The shift:**
```
Before: Chat window as primary interface, files as afterthought
After: Files as primary interface, AI as collaborator
```

**Your role changes:**
- From chat user → System builder
- From reconstructing context every session → Write once, AI loads automatically
- From ephemeral outputs → Infrastructure that compounds

### What's Still Missing

You've escaped the chat window, but you're still creating files wherever. You need:
- ❌ Consistent structure (where do files go?)
- ❌ Reusable prompts (tired of typing same instructions)
- ❌ Efficient workflows (still doing things manually)
- ❌ Team patterns (how do others use this?)

**Next step:** Classes 3-7 will teach you how to organize, automate, and scale this file-based system into a complete marketing architecture.

---

## Part 7: Introduction to Markdown and File Navigation

Now that you understand WHY files matter, let's quickly cover HOW to work with them.

### Why Markdown?

Markdown is a plain text format that's:
- **Human-readable** - You can read and edit it without special tools
- **AI-readable** - LLMs understand Markdown structure natively
- **Universal** - Works in any text editor, version control system, or tool
- **Structured** - Headers, lists, links, and formatting create clear hierarchies

**For marketing architects:** If developers use code to structure systems, you use Markdown to structure knowledge.

#### Essential Markdown Syntax

Here are the core Markdown patterns you'll use in AMA:

**Headers (hierarchy):**
```markdown
# Main Section (H1)
## Subsection (H2)
### Detail (H3)
```

**Lists (organization):**
```markdown
- Bulleted item
- Another item
  - Nested item (indent with 2 spaces)

1. Numbered item
2. Second numbered item
```

**Emphasis (highlighting):**
```markdown
**Bold text** for strong emphasis
*Italic text* for subtle emphasis
`Inline code` for technical terms or file names
```

**Links (references):**
```markdown
[Link text](/path/to/file.md)
[External link](https://example.com)
```

**Code blocks (examples):**
````markdown
```
Multi-line code or data
```
````

**Why This Matters for AMA:**
- **Headers** create navigable structure (agents can jump to sections)
- **Lists** organize findings, strategies, or tasks
- **Links** create audit trails (content → strategy → research → data)
- **Code blocks** store data, templates, or examples
- **Emphasis** highlights key insights for both humans and AI

#### Markdown for AI Coordination

The real power of Markdown emerges when you use it to coordinate with AI agents.

**Example: A research file**
```markdown
# Customer Insights

## Key Finding: Overwhelm is the Primary Pain Point

Our customers consistently describe feeling "overwhelmed" when
managing marketing across multiple platforms.

**Evidence:**
- 8 out of 10 interview respondents used the word "overwhelmed"
- Average customer juggles 4-6 marketing tools simultaneously
- [See interview transcripts](/brand/research/customer-insights/data/interviews/)

**Strategic Implication:**
Positioning should emphasize simplification and consolidation.
[See positioning strategy](/brand/strategy/positioning/STRATEGY.md)
```

**What this does:**
1. The structure is scannable by humans and AI
2. The links create verifiable chains of evidence
3. Bolded sections help agents find key information quickly
4. The hierarchy (H1 → H2) provides context about what's general vs specific

**Practical tip:** Write Markdown as if you're writing for a colleague who will read it six months later. Clear, structured, and well-referenced.

---

### File Navigation: Names, Paths, and References

#### File Names and Paths

When working with AI agents, file names and paths aren't just technical details—they're how both humans and AI navigate your workspace.

**File naming best practices:**
- **Avoid spaces** 
    - Use hyphens or underscores (`customer-research.md`, not `customer research.md`)
    - Spaces in file names can cause issues in terminal commands
- **Be descriptive** 
    - `competitive-analysis.md` is better than `analysis.md`
    - Descriptive names make files discoverable (for humans and Glob searches)
- **Be conssitent** 
    - Consistent patterns make your workspace predictable. `kebab-case` is the chosen pattern for AMA.

**Example structure:**
```
/project/
├── /research/
│   ├── customer-interviews.md
│   ├── competitor-analysis.md
│   └── market-trends.md
└── /content/
    ├── blog-post-draft.md
    └── social-media-ideas.md
```

When you ask an agent to "find research files," it can use `Glob` with patterns like `research/*.md` to discover them automatically.

**File paths: Absolute vs Relative**

**Absolute paths (from workspace root):**
```markdown
/research/customer-interviews.md
/content/blog-posts/post-ideas.md
```

**Relative paths (from current file):**
```markdown
../research/interviews.md          (go up one level, then into research/)
./drafts/post-1.md                 (go into drafts subfolder from here)
```

**Best practice: Use relative paths from workspace root.**

**Why?**
- Links work from any file
- No ambiguity for agents loading files
- Collaboration-friendly (works when others clone your repository)
- No broken links when you reorganize folders

**Example reference:**
```markdown
Based on our customer research, users prefer simplicity.
[See full interview findings](/research/customer-interviews.md)
```

**Path tip for collaboration:**
Never use full system paths like `/Users/yourname/project/research/file.md`. Use workspace-relative paths like `/research/file.md` so links work for anyone who opens the project.

#### Markdown References as Navigation

Markdown links (`[text](/path)`) turn your files into a navigable knowledge base.

**Basic link syntax:**
```markdown
[Link text](/path/to/file.md)
```

**Common reference patterns:**

1. **Cross-reference to related files**
   ```markdown
   For more context, see [customer research findings](/research/customer-interviews.md).
   ```

2. **Link to specific sections** (using heading anchors)
   ```markdown
   See the [pricing strategy section](/strategy/business-model.md#pricing) for details.
   ```

3. **Link to directories**
   ```markdown
   All interview transcripts are available in [the data folder](/research/data/).
   ```

**Why This Matters:**
- **For humans:** Click links to navigate instantly
- **For AI agents:** Load referenced files on demand (progressive disclosure)
- **For both:** Create verifiable information chains

**Practical example:**
You're writing a blog post and reference market research:

```markdown
# Blog Post: Why Simplicity Wins

Our recent research shows customers are overwhelmed by complexity.
[See customer pain points analysis](/research/customer-pain-points.md)

Based on these findings, we recommend...
```

When an agent reads this file:
1. It sees the reference to the research file
2. If needed, it can load `/research/customer-pain-points.md` for additional context
3. It doesn't load the file unless necessary (saves context tokens)

This is **progressive disclosure** in action.

---

### Claude Code's Default MCP Tools

Claude Code comes with built-in tools for working with files. Understanding these tools helps you understand what agents can do.

#### The Six Core Tools

| Tool | Purpose | Example Use |
|------|---------|-------------|
| **Read** | Read entire files | Loading a strategy document |
| **Write** | Create new files | Writing a new research report |
| **Edit** | Modify existing files | Updating a strategy with new findings |
| **Glob** | Find files by pattern | Find all `STRATEGY.md` files |
| **Grep** | Search file contents | Search for "positioning" across all files |
| **Bash** | Run terminal commands | Git commits, running scripts |


#### How These Tools Solve Context Problems

Remember the context problems from Class 1? Here's how these tools address them:

**Context segmentation:**
- Files persist between sessions (Read loads previous work)
- Agents don't need chat history (everything important is in files)

**Context limits:**
- Progressive disclosure (Read only what's needed)
- Grep/Glob discover files without loading them all

**Context rot:**
- Start fresh conversations anytime
- Load only relevant files (no long chat history)

**Why This Matters for AMA:**
When you ask an agent to "create a Twitter post," it is capable enough to:
1. **Globs** to find voice and messaging strategy files
2. **Reads** relevant strategy documents
3. **Writes** to create to a new file with the twitter post content
4. **Edits** if you request changes

---

### 5. CLAUDE.md: Persistent Agent Memory

#### What is CLAUDE.md?

`CLAUDE.md` is a special file at your workspace root that acts as **persistent memory for AI agents**.

Every conversation with Claude Code automatically loads `CLAUDE.md` into the context window. It's like giving the agent a handbook at the start of each session.

**Location:**
```
/your-workspace-root/
├── CLAUDE.md          ← Persistent memory (auto-loaded)
├── .claude/           ← Agent configuration
└── brand/             ← Marketing work
```

**What goes in CLAUDE.md:**
- System architecture overview
- File structure conventions
- Navigation heuristics
- Core principles and workflows
- Instructions for how agents should behave

#### Why CLAUDE.md Solves Context Segmentation

**Without CLAUDE.md:**
```
Session 1: "Create a research execution"
Agent: "Where should I put it?"
You: "In /brand/research/{domain}/{timestamp}/"

Session 2: "Create another research execution"
Agent: "Where should I put it?" ← Agent forgot
You: "In /brand/research/{domain}/{timestamp}/" ← You repeat yourself
```

**With CLAUDE.md:**
```
Session 1: "use my strategy files to create an on brand tweet on xyz"
Agent automatically reads CLAUDE.md → knows structure of project (including location of strategy files) → executes properly
```

The agent re-learns your system every session by automatically reading `CLAUDE.md`.

#### CLAUDE.md Best Practices

**Do:**
- Include high-level structure and principles
- Provide navigation heuristics (where to find things)
- Document naming conventions
- Explain the "why" behind patterns

**Don't:**
- Include detailed content (keep content in domain files)
- Duplicate information that belongs in strategy files
- Make it too long (keep it under 500 lines if possible)

**Why This Matters for AMA:**
`CLAUDE.md` is the instruction manual that makes every agent conversation context-aware and capable of finding the correct information without explicitly mentioning it. Without it, you'd re-explain your file structure every session.

**Practical example:**
If your CLAUDE.md explains that all research goes in timestamped folders with a `PLAN.md`, the agent will:
- Create the folder with the correct timestamp format
- Generate a `PLAN.md` before starting work
- Structure files according to your conventions

All automatically.

---

### 6. Claude Code Nuances and Best Practices

#### When to Restart Claude Code

Certain changes require restarting Claude Code for them to take effect:

**Requires restart:**
- Changes to `.claude/` configuration (agents, skills, commands)
- Changes to `CLAUDE.md`
- Installing or updating MCP tools in `.mcp.json`

**Does NOT require restart:**
- Any changes outside `.claude/`, that aren't `CLAUDE.md` or `.mcp.json` files

**Why this matters:**
If you update a command in `.claude/commands/` and it doesn't seem to work, you likely need to restart Claude Code.

**How to restart:**
- Start a new conversation in the Claude Code panel
- or Close and re-open the Claude Code panel

#### Best Practices for File Work

**1. Use descriptive file paths in prompts**
```
Bad:  "Load the strategy file"
Good: "Load /brand/strategy/positioning/STRATEGY.md"
```

**2. Reference files explicitly**
```
Bad:  "Use the voice guidelines"
Good: "Load voice guidelines from /brand/strategy/voice/STRATEGY.md"
```

**3. Let agents use Glob/Grep for discovery**
```
Good: "Find all RESEARCH.md files in /brand/research/"
Good: "Search for mentions of 'positioning' in strategy files"
```

**4. Structure prompts with context**
```
Good: "Using the positioning strategy @brand/strategy/positioning/STRATEGY.md,
       create a Twitter post about our simplicity focus."
```

#### Understanding Agent File Operations

When you request complex work, agents use multiple tools in sequence:

You don't need to specify these steps. The agent figures out the tool sequence based on your request.

**Why This Matters for AMA:**
Understanding tool sequences helps you:
- Write better prompts (you know what the agent can discover)
- Debug issues (you can see what tools were used)
- Trust the system (you understand what's happening behind the scenes)

---

## How This Applies to Marketing Workflows

The concepts in this class—files as persistent memory, markdown references, progressive disclosure, and CLAUDE.md—are foundational to any Claude Code workflow.

**In [Class 3: Marketing File Structure](../02c-class-3-marketing-file-structure.md)**, you'll learn how to apply these file system concepts specifically to marketing work:
- Organizing research, strategy, and content layers
- Using temporal executions to track iteration over time
- Creating audit trails from content back to research
- Implementing the AMA methodology with these building blocks

For now, focus on understanding **HOW file systems work with Claude Code**. Class 3 will show you **HOW to organize marketing files** using these patterns.

---

## Summary & Key Takeaways

### The Journey So Far

**Where you started:**
- Using MCP in chat windows
- Performance degrading + separation anxiety (afraid to restart)
- Hitting context limits, forced to manually rebuild everything
- Can't see or organize your work

**Where you are now:**
- Using IDE + Claude Code + file system
- Files persist forever
- AI loads files on demand
- Clear visibility into all your work

**What improved:**
| Design Attribute | Before | After |
|-----------------|--------|-------|
| Friction | ✅ Low (data fetching) | ✅ Even lower (no context reconstruction) |
| Scalability | ❌ Degrades over time | ✅ Compounds over time |
| Visibility | ❌ Hidden in chats | ✅ Organized in folders |

### Key Concepts You Learned

**1. Performance Degradation + Separation Anxiety**
- Chat windows degrade as they grow (slower, dumber)
- This creates separation anxiety (afraid to start fresh)
- Files solve both: consistent performance + persistent memory

**2. Context Reconstruction Friction**
- Hitting context limit forces manual rebuild (45+ min wasted)
- Files eliminate this: load instantly, never rebuild twice
- Friction further reduced from Class 1's data-fetching improvement

**3. Scalability**
- Chat windows degrade, file systems compound
- Performance stays consistent regardless of size
- System gets better over time, not worse

**4. Visibility**
- File trees show entire workspace at a glance
- Hierarchical organization matches mental models
- Find and reuse work instantly

**5. IDE + Claude Code**
- IDE provides workspace and file navigation
- Claude Code brings AI collaboration to files
- Markdown becomes your "programming language"

**6. CLAUDE.md**
- Persistent agent memory across sessions
- Agents learn your system every time
- No manual context reconstruction needed

### What's Next

Class 3 addresses how to organize this file-based system:
- Where do research, strategy, and content files go?
- How do you structure marketing work in folders?
- What's the AMA framework everyone keeps mentioning?

**The solution:** Learn the three-layer marketing architecture (`/brand/research/`, `/brand/strategy/`, `/brand/content/`)

**You'll learn:**
- The research → strategy → content flow
- Temporal execution patterns
- Audit trails through markdown references
- How to structure a scalable marketing system
