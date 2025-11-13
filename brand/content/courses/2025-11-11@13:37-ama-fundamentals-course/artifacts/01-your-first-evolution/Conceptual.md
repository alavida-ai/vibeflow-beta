# Class 1: ChatGPT and Introducing MCP

**Course:** AMA Fundamentals
**Class Number:** 1 of 7
**Estimated Time:** 45 minutes
**Prerequisites:** None - starts from basics

---

## Class Overview

Welcome to the first class of the AMA Fundamentals Course. You're here because you've been using AI tools like ChatGPT, Claude, or Gemini and you've hit a wall. The outputs feel generic. You're copy-pasting information constantly. You're never quite sure if the AI is making things up.

**This class is about understanding where you are right now, what's broken, and the first step toward fixing it.**

By the end of this class, you'll understand:
- Why chat-only AI creates friction and unreliable outputs
- What "groundedness" means and why it matters
- How Model Context Protocol (MCP) solves the data access problem
- The first benchmark improvements you'll see in your AI-assisted marketing work

### What You'll Learn

By the end of this class, you will:

1. **Recognize where you are now** - The ChatGPT/Claude single-window experience
2. **Identify the core problems** - Lack of groundedness, high friction, hallucination risk
3. **Understand common workarounds** - And why they don't solve the real problem
4. **Learn the solution** - How MCP connects AI to real-world data
5. **See measurable improvements** - Groundedness and friction as design attributes

### Learning Objectives

- Can explain what "groundedness" means
- Can identify when AI lacks necessary context
- Understands how MCP reduces friction
- Knows when outputs are data-backed vs hallucinated

---

## Part 1: Where You Are Right Now

### The ChatGPT Single-Window Experience

You're using ChatGPT, Claude, or Gemini. You open a new chat, type your prompt, and wait for a response. When you need more information, you:
- Copy-paste from your docs
- Drag in files
- Type out context manually
- Hope the AI "remembers" what you told it earlier

**You've probably noticed:**
- The chat window keeps growing longer and longer (also slower and dumber)
- You're afraid to start a new chat because you'll "lose context"
- There's a weird separation anxiety from the chat window—it's become your source of truth
- You can't quite tell if the AI is making things up or using real information

**This is where most marketers are right now.** And it's limiting what you can achieve with AI.

### What You're Trying to Do

You're trying to create marketing work that's:
- Backed by real data (competitor analysis, customer research, market trends)
- Consistent with your brand (voice, messaging, positioning)
- Specific to your product (features, benefits, use cases)
- Grounded in evidence (not generic AI hallucinations)

**But the chat-only interface makes this incredibly hard.**

---

## Part 2: The Problems (And How They Affect Design Attributes)

### Problem 1: Lack of Groundedness

**What is groundedness?**
Groundedness means the AI has the specific knowledge and context it needs to perform a task accurately without asking you for more context or worse, makes things up.

**The problem in chat-only AI don't have access to:**
- Your competitor's actual websites
- Current market data
- Your customer research findings
- Real-time pricing information
- Your brand's specific positioning
- etc...

**What you get instead:** Generic best practices, hallucinated "facts," and outputs that sound good but aren't backed by real data.

**Real example:**
```
You: "Analyze Notion's pricing strategy"
ChatGPT: "Notion uses freemium pricing with three tiers..."
         [may be outdated or wrong]
```

**Why this matters:** You can't trust the output. You have to fact-check everything. The AI is guessing based on training data, not looking at current reality.

---

### Problem 2: High Friction to Access Real Data

**What is friction?**
Friction is the amount of manual effort you have to put in to get AI to work with real information.

**The friction cycle in chat-only AI:**
1. Open competitor's website
2. Copy relevant sections
3. Paste into chat
4. Repeat for each competitor
5. Hope you didn't miss anything important
6. Hope the chat window doesn't get too long

**For a 5-competitor analysis:**
- 20-30 minutes of copy-pasting
- 10,000+ words manually transferred
- High chance of missing key information
- Tedious, repetitive, soul-crushing work

**Why this matters:** The friction is so high that you either:
- Skip the research (rely on AI's outdated knowledge)
- Do a shallow job (only paste headlines, miss nuance)
- Burn out (copy-pasting is not why you became a marketer)

---

### Problem 3: Uncertain Data Provenance

**Where is this information coming from?**

In a chat-only interface, you can't tell if the AI is:
- Recalling training data (possibly outdated)
- Making logical inferences (possibly wrong)
- Hallucinating confidently (definitely wrong)
- Actually referencing something you pasted earlier

**Real example:**
```
You: "What's Notion's current pricing?"
ChatGPT: "Notion offers a Plus plan at $8/user/month..."
You: [checks website] "Wait, it's $10/user/month now"
```

**The problem:** No way to verify. No citations. No source trail. Just trust or verify manually.

**Why this matters:** You waste time fact-checking. You miss inaccuracies. Your work is built on shaky foundations.

---

## Part 3: The Common Workarounds (And Why They Don't Work)

### Workaround 1: Copy-Paste Everything

**What people do:**
Manually copy competitor content, pricing pages, customer feedback into chat windows.

**Why it doesn't work:**
- **Still high friction** - 20-30 minutes per analysis
- **Incomplete data** - You miss nuance, skip pages, forget details
- **Context bloat** - Chat fills with raw data, making it hard for AI to focus
- **Not scalable** - Works for 1-2 competitors, breaks at 5+

**You're trading your time for marginally better AI outputs.**

---

### Workaround 2: Chase Better Models

**What people do:**
"If I just use GPT-4 instead of GPT-3.5..." or "Claude is better at this..." or "Maybe Gemini will fix it..."

**Why it doesn't work:**
Better models don't solve the data access problem. Even the most advanced AI can't:
- Access your proprietary research
- Read your customer interview transcripts
- Pull current pricing data
- etc...

**You're paying more for slightly better hallucinations.**

---

### Workaround 3: Projects and Custom Instructions

**What people do:**
Use ChatGPT Projects or Claude's Projects feature to "upload context" that persists.

**Why it's better but still limited:**
- ✅ Reduces copy-pasting for static docs
- ❌ Doesn't help with external data (competitor websites, real-time info)
- ❌ Can't fetch new information
- ❌ Data goes stale quickly
- ❌ Still manual uploads and updates

**You've reduced friction for static docs, but haven't solved groundedness for dynamic data.**

---

## Part 4: The Solution - Model Context Protocol (MCP)

### What is MCP?

**Model Context Protocol (MCP)** is a standard that lets AI interact with external systems and data sources that you "plug into it".

Think of it like giving the AI tools to grab information (among other actions) instead of you having to hand-feed everything.

**Without MCP:**
```
You → Copy data → Paste into chat → AI reads → Generates output
```

**With MCP:**
```
You → Ask AI → AI fetches data directly → AI generates output
```

**The breakthrough:** The AI can access real-world data without you being the middleman.

---

### How MCP Solves the Problems

**Problem 1: Lack of Groundedness**
```
Before MCP:
You: "Analyze Notion's pricing"
AI: [guesses based on training data]

With MCP:
You: "Analyze Notion's pricing"
AI: [uses web scraper MCP to visit notion.com/pricing]
AI: [reads actual current pricing page]
AI: "Based on Notion's current pricing page (fetched Nov 12, 2025)..."
```

✅ **Grounded in current, real data**

---

**Problem 2: High Friction**
```
Before MCP:
- 20-30 minutes copy-pasting 5 competitor sites
- Manual, tedious, error-prone

With MCP:
- "Analyze these 5 competitors: [list]"
- AI fetches all sites automatically
- 2-3 minutes, automated, complete
```

✅ **Friction reduced by 90%**

---

**Problem 3: Uncertain Data Provenance**
```
Before MCP:
"Notion charges $8/month" → Source: ???

With MCP:
"Notion charges $10/month (source: notion.com/pricing, fetched Nov 12, 2025)"
```

✅ **Clear data provenance and citations**

---

### Real Example: Competitive Research

**Scenario:** Analyze 5 competitors' positioning

**Without MCP (30+ minutes):**
1. Visit competitor A's site
2. Copy homepage, about page, pricing
3. Paste into chat
4. Repeat for B, C, D, E
5. Ask AI to analyze
6. Hope nothing was outdated or wrong

**With MCP (3 minutes):**
```
You: "Research these competitors and analyze their positioning:
- Notion
- Coda
- Airtable
- ClickUp
- Monday.com"

AI: [uses web scraper MCP]
- Fetches all 5 websites
- Extracts positioning statements
- Analyzes patterns
- Provides cited analysis

Output: "Based on current websites (fetched Nov 12, 2025)..."
```

**The difference:**
- ⏱️ **Time:** 30 min → 3 min (10x faster)
- 📊 **Data quality:** Possibly stale → Current and complete
- 🎯 **Accuracy:** Guesswork → Verified sources
- 💪 **Effort:** Manual copy-paste → Fully automated

---

### Common MCP Tools for Marketing

Here are the types of MCP servers you'll use:

**Web scraping:**
- Firecrawl - Scrape competitor sites, industry blogs
- Jina Reader - Extract clean content from web pages

**Search and research:**
- Perplexity - Research questions with citations
- Brave Search - Web search with real-time data

**Productivity tools:**
- Notion - Access your docs and knowledge base
- Google Drive - Read strategy docs, research files
- Slack - Pull context from team conversations

**Data and analytics:**
- DataForSEO - SEO research and competitive intelligence
- Custom APIs - Your proprietary data sources

**The pattern:** MCP gives AI access to systems where your marketing data lives.

---

## Part 5: Design Attributes - Before and After

These are the benchmarks that matter for AI-assisted marketing work. Think of them as your KPIs.

### Attribute 1: Groundedness

**Definition:** Does the AI have the specific knowledge and context needed to perform this task accurately?

| Before MCP | After MCP |
|------------|-----------|
| ❌ AI guesses based on training data | ✅ AI fetches current, real data |
| ❌ Generic outputs | ✅ Specific, cited outputs |
| ❌ "Best practices" fluff | ✅ Actual competitive intelligence |
| ❌ Have to fact-check everything | ✅ Can trace sources |

**Improvement:** Low groundedness → High groundedness

---

### Attribute 2: Friction

**Definition:** How much manual effort do you have to put in to get AI to work with real information?

| Before MCP | After MCP |
|------------|-----------|
| ❌ 20-30 min copy-pasting per task | ✅ 2-3 min automated fetch |
| ❌ Manual, tedious, error-prone | ✅ Automated, reliable, complete |
| ❌ You're the data shuttle | ✅ AI fetches independently |
| ❌ Burns you out | ✅ Lets you focus on strategy |

**Improvement:** High friction → Low friction

---

### The Measurable Impact

**Time saved:**
- Competitive research: 30 min → 3 min (10x faster)
- Customer research synthesis: Manual → Automated
- Data gathering: You do it → AI does it

**Quality improved:**
- Current data vs outdated training data
- Complete analysis vs partial copy-paste
- Cited sources vs mystery information

**Scalability unlocked:**
- 1-2 competitors → 10+ competitors (same effort)
- Weekly updates → Daily updates (automated)
- Single analyst → Team-wide capability

---

## Part 6: Where You Are At the End of This Class

### Your New Capabilities

You're now using MCP-enabled AI (ChatGPT with plugins, Claude with MCP, or similar). You can:

**✅ Access real-world data automatically**
- Scrape competitor websites
- Fetch current pricing
- Research industry trends
- Pull from your knowledge base

**✅ Reduce friction dramatically**
- No more copy-pasting
- Automated data gathering
- Focus on analysis, not data shuttle

**✅ Trust your outputs**
- Data-backed insights
- Clear provenance
- Cited sources
- Verifiable claims

### What You've Unlocked

**The shift:**
```
Before: "I need to gather data → paste it → hope AI understands → check if it's accurate"
After:  "I need to gather data → AI fetches it → analyzes with sources → I verify easily"
```

**Your role changes:**
- From data shuttle → Strategic director
- From fact-checker → Insight synthesizer
- From manual researcher → Research coordinator

### But You're Still in the Chat Window

MCP solved **groundedness** and **friction** for data access. But you still have:
- ❌ Everything in a single growing chat window
- ❌ Separation anxiety (don't want to lose context)
- ❌ No persistence between sessions
- ❌ Scalability limits as conversations grow

**Next step:** Class 2 will show you how to escape the chat window entirely and move into an IDE with a file-based system.

---

## Summary & Key Takeaways

### The Journey So Far

**Where you started:**
- Using ChatGPT/Claude/Gemini in single chat windows
- Copy-pasting data manually
- Unable to verify AI claims
- High friction, low groundedness

**Where you are now:**
- Using MCP-enabled AI
- Automated data access
- Cited, verifiable outputs
- Low friction, high groundedness

**What improved:**
| Design Attribute | Before | After |
|-----------------|--------|-------|
| Groundedness | ❌ AI guesses | ✅ AI fetches real data |
| Friction | ❌ Manual copy-paste | ✅ Automated access |
| Data Provenance | ❌ Mystery sources | ✅ Clear citations |

### Key Concepts You Learned

**1. Groundedness**
- Having the specific knowledge/context needed for accurate output
- MCP provides grounding through real-world data access

**2. Friction**
- Manual effort required to get AI working with information
- MCP reduces friction by automating data fetching

**3. Model Context Protocol (MCP)**
- Standard for AI to interact with external systems
- Transforms AI from "chat bot" to "agent with tools"

**4. Design Attributes as KPIs**
- Measure AI system performance with specific attributes
- Track improvements as you build your system

### What's Next

Class 2 addresses the remaining problems:
- ❌ Chat window scalability
- ❌ No persistence between sessions
- ❌ Poor visibility into work
- ❌ Context degradation over long conversations

**The solution:** Move from chat interface to IDE + file system

**You'll learn:**
- Why files solve context segmentation
- How IDE + Claude Code work together
- Markdown as your "programming language"
- CLAUDE.md as persistent agent memory

## Practice Exercise

**Try this after completing Class 1:**

1. **Identify an MCP tool for your work**
   - Pick one: Firecrawl (web scraping), Perplexity (research), Notion (docs)
   - Install and configure it

2. **Do a before/after comparison**
   - Task: Analyze 3 competitors
   - Before: Time yourself manually gathering data
   - After: Time yourself with MCP automating data fetch
   - Measure: Time saved, completeness, accuracy

3. **Track your design attributes**
   - Groundedness: Can you cite sources? Is data current?
   - Friction: How much manual work was required?
   - Quality: How complete is the analysis?

**The goal:** Experience the measurable improvement MCP provides before moving to the next class.
