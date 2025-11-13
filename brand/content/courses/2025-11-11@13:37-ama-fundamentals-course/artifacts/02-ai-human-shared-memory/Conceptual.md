# Class 2: Introducing the IDE

**Course:** AMA Fundamentals  
**Class Number:** 2 of 7  
**Estimated Time:** 60 minutes  
**Prerequisites:** Class 1 (ChatGPT and Introducing MCP)  

---

## Class Overview

In Class 1, you escaped the manual copy-paste grind by adding MCP to your chat window. Now AI can fetch data automatically. But you've probably noticed something: the chat window is still filling up (fast), conversations are getting slower, and you're still afraid to start fresh because you'll "lose everything."

**This class is about the next leap: replacing the chat window's ephemeral memory with a file-based system - persistent, shared memory where you and AI can both store important outputs and load important context across sessions.**

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
- Understand how files create persistent memory
- Know the difference between chat-based and file-based AI workflows
- Can set up basic file structure for marketing work

---

## Part 1: Where You Are Right Now

### The MCP-Enabled Chat Window

You've added MCP to your ChatGPT or Claude chat. Now you can:
- ✅ Scrape competitor websites automatically
- ✅ Fetch data from Notion, Slack, Drive
- ✅ Get cited, verifiable outputs

**This is already a huge improvement over Class 1, better than 80% of marketers.** But you're starting to notice new problems:

**You've probably experienced:**
- Chat window growing longer and longer (50+ messages deep)
- AI responses getting slower as the conversation grows
- That anxiety: "If I start a new chat, I'll lose all this context"
- Having to scroll up to find something you discussed earlier
- Conversations becoming a tangled mess of research, strategy, and content mixed together
- Eventually you will hit the context limit and the chat will essentially die

> **Want to understand why this happens?** See [Understanding the Context Window](./context-window-explained.md) for a deep dive into what fills a context window and why MCP makes it worse.

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

> **Deep dive:** [Understanding the Context Window](./context-window-explained.md) explains the technical reasons why this happens (context rot, chat history growth, MCP tool overhead).

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
- ❌ Reusable prompts (tired of typing same instructions)
- ❌ Consistent structure (where do files go?)
- ❌ Efficient workflows (still doing things manually)
- ❌ Team patterns (how do others use this?)

**Next step:** Classes 3-7 will teach you how to organize, automate, and scale this file-based system into a complete marketing architecture.
