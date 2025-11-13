# Class 5: AMA Architecture and CLAUDE.md

**Course:** AMA Fundamentals  
**Class Number:** 5 of 7  
**Estimated Time:** 60-90 minutes  
**Prerequisites:** Classes 1-4 (MCP, IDE, Commands, Sub-agents)  

---

## Class Overview

You've come a long way. You started with ChatGPT copy-paste hell (Class 1), moved to an IDE with files (Class 2), learned reusable commands (Class 3), and built specialized sub-agents that use MCP tools effectively. You are shipping! So much that your IDE is now a mess.

Your project folder is cluttered with files everywhere. You have `FINAL_DRAFT.md`, `FINAL_DRAFT_v2.md`, `NEW_FINAL_DRAFT.md`. Some files are in folders, others aren't. There's no consistent naming. You can't remember where you put that competitor analysis from last week.

**This class introduces the AMA framework—a structured approach to organizing marketing work so both you and AI agents can navigate it efficiently.**

By the end of this class, you'll understand:
- Why file chaos kills productivity (even with good tools)
- The three-layer framework that mirrors how marketing actually works
- How CLAUDE.md documents your system architecture
- Temporal execution patterns for tracking iteration
- Markdown references for creating audit trails

### What You'll Learn

By the end of this class, you will:

1. **Recognize where you are now** - Powerful tools, chaotic file structure
2. **Identify the new problems** - Poor navigability, non-maintainable, doesn't scale
3. **Understand common workarounds** - And why ad-hoc solutions fail
4. **Learn the solution** - AMA's three-layer framework + CLAUDE.md
5. **See measurable improvements** - Navigability, maintainability, scalability

### Learning Objectives

- Can explain the three-layer framework (Research → Strategy → Content)
- Understand temporal execution pattern with date-stamped folders
- Know how to use markdown references for audit trails
- Can navigate the AMA file structure
- Understand the difference between index files and execution folders

---

## Part 1: Where You Are Right Now

### The Powerful but Chaotic System

You're using Claude Code with an impressive setup:
- ✅ **MCP** - Automatically fetches data (Class 1)
- ✅ **File system** - Persistent memory (Class 2)
- ✅ **Commands** - Reusable prompts (Class 3)
- ✅ **Sub-agents** - Specialized workers (Class 4)

**You're more advanced than 95% of marketers using AI.** But you're hitting a wall.

**You've probably experienced:**
- Opening your project and feeling overwhelmed by file clutter
- Spending 10 minutes searching for a file you created last week
- Having multiple versions of the same document (`strategy_v1.md`, `strategy_v2.md`, `strategy_FINAL.md`)
- Not knowing where to put new files (root? in a folder? which folder?)
- Agents creating files in random locations
- Losing track of what's current vs outdated
- Recreating work because you couldn't find the previous version

**The pain multiplies:**
Week 1: 20 files, manageable chaos
Week 4: 80 files, getting confusing
Week 12: 300+ files, completely unmanageable

### What You're Trying to Do

You're trying to build something scalable:
- **Research findings** that accumulate over time
- **Strategy documents** that evolve and improve
- **Content outputs** that reference clear strategy
- **Audit trails** showing why decisions were made
- **A system** that gets more powerful, not more cluttered

**But without structure, even the best tools create chaos.**

---

## Part 2: The Problems (And How They Affect Design Attributes)

### Problem 1: Poor Navigability - Can't Find Anything

**What is navigability?**
Navigability is being able to find files quickly, understand your workspace structure, and know where things should go.

**The problem with unstructured files:**
Everything's flat, mixed together, or randomly organized:
- Is that competitor research in `research/`, `competitors/`, or just in the root?
- Which version is current? `strategy.md`, `strategy_v2.md`, or `strategy_FINAL.md`?
- Did you already analyze this competitor or not?
- Where did that agent put the output?

**You've definitely done this:**
```
You: "I need that brand voice doc..."
[Opens project, scans 100+ files in sidebar]
[Searches for "voice"]
[Finds 8 files: voice.md, voice_draft.md, voice_v2.md, brand_voice.md, VOICE.md, voice-final.md, new_voice.md, voice_strategy.md]
You: "Which one is the real one?"
[Opens 3 files to compare]
[Gives up, just creates a new one]
```

**Why this matters:** You waste hours searching instead of creating. You duplicate work. Your agents can't find context efficiently.

---

### Problem 2: Non-Maintainable System - Chaos Compounds

**What is maintainability?**
Maintainability is being able to update, improve, and evolve your system without breaking it.

**The problem with ad-hoc structure:**
No consistent patterns means every file is a special case:
- Update voice strategy → breaks content that referenced old location
- Add new research → unclear where it goes or how to reference it
- Refine positioning → can't track what changed or why
- Scale the system → chaos grows exponentially

**Real example:**
```
Week 1:  voice.md at root
Week 2:  Moved to /strategy/voice.md
Week 3:  Split into /strategy/voice/ with subfiles
Week 4:  Half your commands reference old paths (broken)
Week 5:  Agents create files in random places (no pattern to follow)
Week 6:  You can't update anything without breaking something else
```

**Why this matters:** Without consistency, every change risks breaking your system. You can't improve safely. Growth creates fragility.

---

### Problem 3: Scaling Issues - Noise Clutters Hierarchy

**What is scalability?**
Scalability means the system stays manageable as you add more work, more domains, more complexity.

**The problem with no information hierarchy:**
Everything's mixed together at the same level:
- Research findings next to final content
- Strategy docs next to meeting notes
- Current versions next to 10 old drafts
- Important indexes buried among execution artifacts

**You've experienced this:**
```
Your file tree:
/ (root)
├── competitor_analysis.md
├── competitor_analysis_v2.md
├── voice_strategy.md
├── twitter_post_1.md
├── research_notes.md
├── brand_positioning.md
├── positioning_draft.md
├── customer_interviews.md
├── final_post.md
├── twitter_thread_ideas.md
├── content_plan.md
... (100+ more files all mixed together)
```

**Agents can't navigate this either:**
```
Agent: "Load voice strategy"
Agent: [Finds 5 files with "voice" in name]
Agent: "Which one should I use?"
Agent: [Guesses wrong, uses outdated version]
```

**Why this matters:** Flat structures don't scale. After 50 files, it becomes cognitive overload for both humans and AI.

---

## Part 3: The Common Workarounds (And Why They Fail)

### Workaround 1: Create Random Folders

**What people do:**
Start creating folders as things feel cluttered: `/docs/`, `/content/`, `/research/`, `/old/`, `/drafts/`

**Why it doesn't work:**
- ❌ No consistent logic (one person's "docs" vs "content" is arbitrary)
- ❌ Doesn't solve versioning (`/old/` fills up with undifferentiated files)
- ❌ Agents don't know your mental model
- ❌ Still no clear navigation patterns

**You're organizing based on vibes, not principles.**

---

### Workaround 2: Version Number Naming

**What people do:**
`strategy_v1.md`, `strategy_v2.md`, `strategy_FINAL.md`, `strategy_FINAL_FINAL.md`

**Why it doesn't work:**
- ❌ Which version is current? (Is v7 newer than FINAL?)
- ❌ Can't see what changed between versions
- ❌ No way to track why changes were made
- ❌ Breaks references (content references v3, now on v8)
- ❌ Classic "FINAL_FINAL_v2_ACTUALLY_FINAL.md" problem

**You're fighting against the lack of structure with manual tracking.**

---

### Workaround 3: Load Entire Folders

**What people do:**
Tell agents "load everything in /strategy/" to avoid missing context.

**Why it doesn't work:**
- ❌ Context window fills with irrelevant files
- ❌ Performance degrades (back to Class 2 problems)
- ❌ Agent can't focus on what matters
- ❌ Doesn't scale (10 files → 100 files → context overflow)

**You're solving navigation by brute force, which breaks at scale.**

---

## Part 4: The Solution - AMA Framework + CLAUDE.md

### What is the AMA Framework?

The **Agentic Marketing Architecture (AMA)** is a structured approach to organizing marketing work that mirrors how marketing actually flows: from research to strategy to content.

**AMA consists of two frameworks:**

1. **Agentic Framework** (`/.claude/`) - Defines the AI system: agents, skills, commands
2. **Marketing Framework** (`/brand/`) - Organizes marketing work: research, strategy, content

**This class focuses on the Marketing Framework** - how to organize your actual marketing files.

---

### The Three-Layer Framework

The Marketing Framework is built on a simple principle: **marketing work flows through three distinct stages.**

```
INPUT          PROCESSING          OUTPUT
   ↓               ↓                  ↓
Research    →   Strategy    →     Content
(Facts)         (Decisions)       (Deliverables)
```

**Layer 1: Research (`/brand/research/`)**
- **What:** Pure, unopinionated factual gathering
- **Examples:** Competitor analysis, customer interviews, market trends
- **Characteristics:** Temporal (date-stamped), accumulative, evidence-based

**Layer 2: Strategy (`/brand/strategy/`)**
- **What:** Strategic synthesis of research into actionable guidelines
- **Examples:** Positioning, voice, messaging, audience definitions
- **Characteristics:** Temporal (date-stamped), opinionated, references research

**Layer 3: Content (`/brand/content/`)**
- **What:** Final outputs guided by strategy
- **Examples:** Twitter threads, blog posts, landing pages
- **Characteristics:** Temporal with slug, strategy-guided, deliverable

**The key insight:**
```
Content (What you publish)
    ↓ is guided by
Strategy (How you should communicate)
    ↓ which synthesizes
Research (What you learned from reality)
```

Every layer references the layer below, creating a verifiable audit trail.

---

### How This Solves the Problems

**Problem 1: Poor Navigability**
```
Before:
- 100+ files mixed together in root
- No clear structure
- "Where did I put that?"

After:
- Clear hierarchy: /brand/research/, /brand/strategy/, /brand/content/
- Domains organize work: /research/customer-insights/, /strategy/voice/
- Entry point files: RESEARCH.md, STRATEGY.md (always know where to start)
```

✅ **Navigability: Can't find anything → Clear structure and entry points**

---

**Problem 2: Non-Maintainable System**
```
Before:
- Ad-hoc naming and versioning
- Broken references when files move
- Can't track evolution

After:
- Consistent naming conventions (kebab-case, UPPERCASE.md)
- Temporal executions track history (/2025-11-13@14:30/)
- Index files maintain current state
- CHANGELOG.md tracks evolution
```

✅ **Maintainability: Ad-hoc chaos → Consistent patterns and evolution tracking**

---

**Problem 3: Scaling Issues**
```
Before:
- Everything at root level (cognitive overload)
- Noise clutters important files
- Can't scale past 50-100 files

After:
- Information hierarchy separates concerns
- Index files at domain root (current state)
- Execution folders preserve history (temporal)
- Progressive disclosure (load only what's needed)
```

✅ **Scalability: Chaos grows exponentially → Structure scales linearly**

---

### Domain Organization

Within each layer, work is organized into **domains**.

**What is a domain?**
A configurable area of concern. You decide what domains make sense for your work.

**Research domain examples:**
- `customer-insights` - Interview notes, pain points, feedback
- `competitor-analysis` - Competitor positioning, messaging, tactics
- `market-trends` - Industry reports, trend analysis
- `adhoc` - One-off research that doesn't fit elsewhere (special domain)

**Strategy domain examples:**
- `positioning` - Market positioning strategy
- `voice` - Brand voice and tone
- `messaging` - Key messages and themes
- `audience` - Target audience definitions

**Content type examples:**
- `twitter-posts` - Tweets and threads
- `blog-posts` - Long-form articles
- `linkedin-posts` - Professional content

**Key principle:** Domains are configurable by you (exception: `/research/adhoc/` is standard).

---

### Temporal Execution Pattern

AMA uses **date-stamped folders** to track work over time.

**Why temporal?**
- Markets change (competitors pivot, trends shift)
- Strategy evolves (you refine understanding)
- Content is versioned (multiple iterations)
- You need to see what changed and when

**Format:**

**Standard:** `YYYY-MM-DD@HH:mm` (used by research and strategy domains)
```
/brand/research/competitor-analysis/2025-11-13@14:30/
/brand/strategy/voice/2025-11-10@09:15/
```

**With slug:** `YYYY-MM-DD@HH:mm-descriptive-slug` (used by content and adhoc research)
```
/brand/content/twitter-posts/2025-11-13@14:30-ai-overwhelm-thread/
/brand/research/adhoc/2025-11-12@11:00-platform-algorithm-changes/
```

**Each execution folder contains:**
```
/{YYYY-MM-DD@HH:mm}/
├── PLAN.md              ← Approach for this execution
├── TODO.md              ← Progress tracking
├── {TYPE}.md            ← Output (RESEARCH.md, STRATEGY.md, or CONTENT.md)
└── /artifacts/          ← Supporting materials
```

---

### Index Files vs Execution Folders

**This is critical:** AMA separates **current approved state** from **iterative work**.

**Index file** (at domain root):
- Contains current approved knowledge/strategy
- Marketing Architect approved
- Referenced by downstream work
- Single source of truth

**Execution folders** (date-stamped):
- Contains iterative development work
- Preserves historical context
- May contradict or refine current index
- Full iteration history

**Example:**
```
/brand/research/customer-insights/
├── RESEARCH.md                    ← INDEX: Current approved findings
├── CHANGELOG.md                   ← Tracks evolution
├── /2025-11-01@10:00/             ← Historical execution
│   └── RESEARCH.md                ← What we found then
└── /2025-11-13@14:30/             ← Latest execution
    └── RESEARCH.md                ← New findings (not yet in index)
```

**The workflow:**
1. New research execution generates findings
2. Compare with current index (what's new? what contradicts?)
3. Marketing Architect reviews and approves updates
4. Index is updated with approved changes
5. CHANGELOG.md tracks what changed and why

**Think of it like Git:**
- Index = main branch (stable)
- Executions = feature branches (experimental)

---

### Markdown References: The Audit Trail

Markdown references create **verifiable chains of evidence** from content → strategy → research → data.

**Format:**
```markdown
[descriptive text](/path/to/file.md)
```

**Always use relative paths from workspace root:**
- ✅ `/brand/research/customer-insights/RESEARCH.md`
- ❌ `/Users/name/project/brand/research/customer-insights/RESEARCH.md`

**How it creates audit trails:**

Strategy references research:
```markdown
# Voice Strategy

We are empathetic because customers are
[drowning in complex AI tools](/brand/research/customer-insights/RESEARCH.md).
```

Content references strategy:
```markdown
# Twitter Thread: AI Overwhelm

**Strategy:**
- [Voice](/brand/strategy/voice/STRATEGY.md)
- [Messaging](/brand/strategy/messaging/STRATEGY.md)
```

**The complete chain:**
```
Twitter thread about AI overwhelm (CONTENT.md)
    ↓ generated with
Voice strategy - empathetic tone (STRATEGY.md)
    ↓ references
Customer insights - AI overwhelm theme (RESEARCH.md)
    ↓ analyzed from
Interview transcripts (raw data)
```

**Every link is clickable. Every claim is verifiable.**

---

### CLAUDE.md: Your System Documentation

**What is CLAUDE.md?**
A file at your project root that documents your entire AMA system architecture.

**What it contains:**
- AMA methodology overview (both frameworks)
- File structure patterns
- Naming conventions
- Navigation heuristics
- Core principles

**Why it matters:**
- **For you:** Reference guide when you forget patterns
- **For AI agents:** They read CLAUDE.md to understand your system
- **For teams:** Onboarding documentation
- **For consistency:** Single source of truth about how your system works

**CLAUDE.md is like the README for your marketing infrastructure.**

Agents read it automatically and follow its patterns. When you follow AMA conventions, agents know exactly where to create files, how to name them, and how to reference them.

---

## Part 5: Design Attributes - Before and After

### Attributes from Previous Classes (Still Good ✅)

**From Class 1 (MCP):**
- ✅ Groundedness - AI fetches real data
- ✅ Friction - Automated data access

**From Class 2 (IDE + Files):**
- ✅ Scalability - Performance compounds
- ✅ Visibility - Files vs chat
- ✅ Persistence - No context reconstruction

**From Class 3 (Commands):**
- ✅ Maintainability - Reusable prompts
- ✅ Friction - Reduced cold start

**From Class 4 (Sub-agents):**
- ✅ Granularity - Controlled specialization
- ✅ Scalability - Context separation

---

### Class 5 New Improvements

### Attribute 1: Navigability (NEW - Now Solved ✅)

**Definition:** Can you and AI agents find files quickly and understand where things should go?

| Without AMA Framework | With AMA Framework |
|----------------------|-------------------|
| ❌ 100+ files mixed at root | ✅ Clear hierarchy: research/strategy/content |
| ❌ "Where did I put that?" | ✅ Know where to look (domains + index files) |
| ❌ Agents create files randomly | ✅ Agents follow structure patterns |
| ❌ 10 min searching for files | ✅ 10 sec navigating to correct domain |

**Improvement:** Can't find anything → Clear navigation patterns

---

### Attribute 2: Maintainability (Further Improved ✅)

**Definition:** Can you update and evolve your system without breaking it?

| Commands Only (Class 3 End) | With AMA Framework (Class 5) |
|----------------------------|----------------------------|
| ✅ Reusable prompts (low friction) | ✅ Reusable prompts stay good |
| ❌ No file structure consistency | ✅ Consistent structure patterns |
| ❌ Ad-hoc naming and versioning | ✅ Temporal executions + index pattern |
| ❌ Can't track evolution | ✅ CHANGELOG.md tracks changes |
| ❌ Updates break references | ✅ Stable paths, clear versioning |

**Improvement:** Commands solved prompt reuse, AMA solves file organization

---

### Attribute 3: Scalability (Further Improved ✅)

**Definition:** Does the system stay manageable as you add more work?

| Sub-agents Only (Class 4 End) | With AMA Framework (Class 5) |
|------------------------------|----------------------------|
| ✅ Context separation (agents) | ✅ Context separation stays good |
| ❌ Files still cluttered | ✅ Information hierarchy prevents clutter |
| ❌ 300+ files = chaos | ✅ 1000+ files = still navigable |
| ❌ Flat structure cognitive overload | ✅ Hierarchical structure scales |

**Improvement:** Sub-agents solved context separation, AMA solves file scaling

---

## Part 6: Where You Are At the End of This Class

### Your New Capabilities

You're now using the full AMA Marketing Framework. You can:

**✅ Navigate your workspace efficiently**
- Three-layer structure (research → strategy → content)
- Domain organization within each layer
- Index files as entry points
- Clear mental model of where things go

**✅ Maintain a scalable system**
- Temporal executions track iteration
- Index files maintain current state
- CHANGELOG.md tracks evolution
- Consistent naming conventions

**✅ Create verifiable audit trails**
- Markdown references link content → strategy → research
- Every claim traces to evidence
- Agents and humans can follow the chain
- Decisions are defensible

**✅ Work with AI agents efficiently**
- Agents read CLAUDE.md to understand structure
- Agents create files in correct locations
- Agents use progressive disclosure (load only what's needed)
- Agents follow consistent patterns

### What You've Unlocked

**The shift:**
```
Before: Powerful tools, chaotic files, cognitive overload
After: Powerful tools, organized structure, scalable system
```

**Your role changes:**
- From file search → Strategic architecture
- From manual organization → System design
- From ad-hoc chaos → Structured infrastructure

### What's Still Missing

You have structure, but you're still:
- ❌ Manually creating execution folders
- ❌ Manually updating CHANGELOG.md
- ❌ Not automating complex workflows
- ❌ Not leveraging advanced orchestration patterns

**Next step:** Classes 6-7 will teach you skills and orchestration to automate and scale complex workflows.

---

## Summary & Key Takeaways

### What You Learned

1. **Three-Layer Framework** - Research → Strategy → Content mirrors marketing flow
2. **Temporal Executions** - Date-stamped folders preserve iteration history
3. **Index Pattern** - Current truth in index files, history in execution folders
4. **Markdown References** - Create audit trails from content back to research
5. **Domain Organization** - Configurable areas of concern within each layer
6. **CLAUDE.md** - System documentation for humans and AI agents
7. **Naming Conventions** - Consistent patterns (kebab-case, UPPERCASE.md, temporal format)

### Why It Matters

**Without AMA structure:**
- File chaos kills productivity
- Can't scale past 100 files
- No audit trails
- Agents create files randomly
- You waste time searching

**With AMA structure:**
- Clear navigation for humans and AI
- Scales to 1000+ files
- Every claim traces to evidence
- Agents follow consistent patterns
- System compounds over time

### How This Builds on Previous Classes

- **Class 1 (MCP):** Solved data access friction and groundedness
- **Class 2 (IDE):** Solved persistence and visibility with files
- **Class 3 (Commands):** Solved prompt reuse and cold start friction
- **Class 4 (Sub-agents):** Solved context separation and specialization
- **Class 5 (AMA Framework):** Solved file organization and navigation

### Preview: Classes 6-7

Now that you have organized infrastructure, you'll learn:
- **Class 6 (Skills):** Encoding complex multi-step workflows
- **Class 7 (Orchestration):** Plan-implement pattern for reliability

**The progression:**
- Classes 1-4: Built tools (MCP, files, commands, agents)
- Class 5: Organized the workspace (AMA framework)
- Classes 6-7: Automate workflows (skills, orchestration)
