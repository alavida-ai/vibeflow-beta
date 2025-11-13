# Class 5: Agonda (agentic marketing framework) and CLAUDE.md

**Course:** Agonda Fundamentals  
**Class Number:** 5 of 7  
**Estimated Time:** 60-90 minutes  
**Prerequisites:** Classes 1-4 (MCP, IDE, Commands, Sub-agents)  

---

## Class Overview

You've come a long way. You started with ChatGPT copy-paste hell (Class 1), moved to an IDE with files (Class 2), learned reusable commands (Class 3), and built specialized sub-agents that use MCP tools effectively. You are shipping! So much that your IDE is now a mess.

Your project folder is cluttered with files everywhere. You have `tone-of-voice-old.md`, `tone-of-voice-new.md`, `tone-of-voice-v2.md` and `tone-of-voice.md`. Some files are in folders, others aren't. There's no consistent naming. You can't remember where you put that competitor analysis from last week.

**This class introduces the Agonda framework—a structured approach to organizing marketing work so both you and AI agents can navigate it efficiently.**

### Learning Objectives

By the end of this class, you will:

1. **Identify the problems:** Why file chaos kills productivity: poor navigability, non-maintainable, doesn't scale
2. **Understand the solution:**
    - The three-layer framework that mirrors how marketing actually works (Research → Strategy → Content)
    - how CLAUDE.md documents your system architecture, temporal executions, and the index pattern
3. **Recognize the improvement:** 
    - Navigate efficiently
    - Maintain at scale
    - Visibility into what files were creted from other files

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
- scared to overwrite previous versions of files leading to:
    - multiple versions of the same document (`strategy_v1.md`, `strategy_v2.md`, `strategy_FINAL.md`)
- Not knowing where to put new files (root? in a folder? which folder?)
- Agents creating files in random locations
- Losing track of what's current vs outdated
- Recreating work because you couldn't find the previous version

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
Everything's flat, mixed together, or randomly organized for example:
- Is that competitor research in `research/`, `competitors/`, or just in the root?
- Which version is current? `strategy.md`, `strategy_v2.md`, or `strategy_FINAL.md`?
- Did you already analyze this competitor or not?
- Where did that agent put the output?

**Why this matters:** You waste hours searching instead of creating. You duplicate work. Your agents can't find context efficiently.

---

### Problem 2: Unscalable and Unmaintainable

**What's happening:**
No consistent structure means your system breaks as it grows:
- **Can't maintain** - Files move, references break, can't track what changed
- **Can't scale** - Everything mixed together, cognitive overload at 50+ files
- **No consistency** - Agents create files randomly, can't find the right version

**Example flat file tree:**
```
/ (root)
├── competitor_analysis.md
├── competitor_analysis_v2.md
├── voice_strategy.md
├── twitter_post_1.md
├── positioning_draft.md
... (100+ more files all mixed together)

Agent: "Load voice strategy"
Agent: [Finds 5 files with "voice" in name]
Agent: [Guesses wrong, uses outdated version]
```

**Why this matters:** Without structure, every change risks breaking something. Growth creates chaos, not capability.

---

## Part 3: The Common Workarounds (And Why They're Limited)

### Workaround 1: Archive Folder

**What people do:**
Move old files to `/archive/` or `/old/` to clean up the root directory.

**Why it's limited:**
- ✅ Removes clutter from sight
- ❌ Doesn't solve navigation (archive fills up with undifferentiated files)
- ❌ No clear system for when to archive
- ❌ Still can't find specific versions or track what changed

**You're hiding the mess, not organizing it.**

---

### Workaround 2: Categorizing with Folders

**What people do:**
Create folders like `/content/`, `/research/`, `/strategy/`, `/drafts/` based on intuition.

**Why it's limited:**
- ✅ Better than flat structure
- ❌ Doesn't map to how marketing actually works
- ❌ No consistent logic (what's "docs" vs "content"?)
- ❌ Doesn't capture information flow (research → strategy → content)
- ❌ Still no versioning or temporal tracking

**You're organizing based on file types, not marketing operations.**

---

### Workaround 3: Version Number Naming

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

## Part 4: The Solution - AMA Framework + CLAUDE.md

### What is the AMA Framework?

The **Agentic Marketing Architecture (AMA)** is a structured approach to organizing marketing work that mirrors how marketing actually flows: from research to strategy to content.

**AMA consists of two frameworks:**

1. **Agentic Framework** (`/.claude/`) - Defines the AI system: agents, commands, and skills (next lesson)
2. **Marketing Framework** (`/brand/`) - Organizes marketing work: research → strategy → content

**This class focuses on the Marketing Framework** - how to organize your actual marketing files.

---

### The Three-Layer Framework

The Marketing Framework is built on a simple principle: **marketing work flows through three distinct stages.**

```
Discovery      Brand Bible          OUTPUT
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

Every layer is synthesized from the layer below, with appropriate references creating a verifiable audit trail.

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

```

✅ **Navigability: Can't find anything → Clear structure and entry points**

---

**Problem 2: Unscalable and Unmaintainable**

Clear boundaries between data

content is generate with strategy as input data
strategy is synthesized from research data

content workflow don't need to reference research data
etc

✅ **Scalability + Maintainability: Chaos compounds → Structure scales**

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
- `twitter-posts`
- `blog-posts`
- `linkedin-posts`

---

### How Domains Evolve Over Time

AMA tracks how your marketing knowledge evolves through **temporal executions + index pattern**.

**The pattern:**
- **Index file** (at domain root) - Current approved state, single source of truth
- **Execution folders** (date-stamped) - Iterative work, preserves history
- **CHANGELOG.md** - Tracks what changed and why

**Think of it like Git:**
- Index = main branch (stable)
- Executions = feature branches (experimental)

**Structure:**
```
/brand/research/customer-insights/
├── RESEARCH.md                    ← INDEX: Current approved findings
├── CHANGELOG.md                   ← Evolution tracking
├── /2025-11-01@10:00/             ← Past execution
│   ├── PLAN.md
│   ├── TODO.md
│   ├── RESEARCH.md                ← What we found then
│   └── /artifacts/
└── /2025-11-13@14:30/             ← Latest execution
    ├── PLAN.md
    ├── TODO.md
    ├── RESEARCH.md                ← New findings (not yet in index)
    └── /artifacts/
```

**Date-stamp formats:**
- `YYYY-MM-DD@HH:mm` - Research/strategy domains
- `YYYY-MM-DD@HH:mm-slug` - Content types, adhoc research

**Workflow:**
1. Execution generates new findings
2. Compare with index (what's new? what contradicts?)
3. Marketing Architect approves updates
4. Index updated, CHANGELOG tracks changes

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
A file at your project root that documents your entire Agonda system architecture.

This allows your agent to know that it is operating within the Agonda framework and obey the rules - CAN YOU REWWRITE THIS PART

**What it contains:**
- Agonda methodology overview (both frameworks)
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

Agents read it automatically and follow its patterns. When you follow Agonda conventions, agents know exactly where to create files, how to name them, and how to reference them.

---

## Part 5: What Changed

Agonda framework solves file organization while maintaining what you already gained:

| Design Attribute | Class 4 End | Class 5 with Agonda Framework |
|-----------------|-------------|----------------------------|
| Groundedness | ✅ High | ✅ Stays high |
| Friction | ✅ Low | ✅ Stays low |
| Scalability | ✅ Context separation | ✅ Stays good + file scaling |
| Maintainability | ✅ Reusable prompts | ✅ Stays good + file consistency |
| Navigability | ❌ File chaos | ✅ **NEW - Solved** (clear structure) |

---

## Part 6: Where You Are Now

**The shift:**
```
Before: Powerful tools, chaotic files, cognitive overload
After:  Organized structure with Agonda framework (navigable, maintainable, scalable)
```

Your system now has:
- Three-layer framework (research → strategy → content)
- Temporal executions + index pattern
- Markdown references for audit trails
- CLAUDE.md documentation for agents

**But you still have:**
- ❌ Manual execution folder creation
- ❌ No automated complex workflows
- ❌ No advanced orchestration patterns

**Next:** Classes 6-7 introduce skills and orchestration for workflow automation.

---

## Summary

**What you learned:**
- **Three-layer framework:** Research → Strategy → Content mirrors marketing work flow
- **Temporal + index pattern:** Executions preserve history, index maintains current state
- **CLAUDE.md:** Documents system architecture for agents to follow

**Key pattern:** Organized file structure enables navigation at scale.

**Next class:** Skills for encoding complex multi-step workflows
