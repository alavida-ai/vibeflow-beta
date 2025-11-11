# Class 3: Marketing File Structure (AMA Framework)

**Course:** AMA Fundamentals  
**Prerequisites:** Class 1 (LLM Fundamentals & Context Problem), Class 2 (Integrated File System)  
**Estimated Time:** 90 minutes  

---

## Class Overview

In Class 1, you learned that context limitations are the fundamental constraint of working with LLMs. In Class 2, you discovered how file systems solve context segmentation by creating persistent, navigable memory across chat sessions.

Now in Class 3, you'll learn **how to organize marketing work** so that both humans and AI agents can navigate it effectively. You'll discover AMA's three-layer framework that mirrors how marketing actually works, and you'll learn practical patterns for structuring research, strategy, and content in a way that scales.

### Learning Objectives

By the end of this class, you'll be able to:

- Organize marketing work into the three-layer framework (Research → Strategy → Content)
- Use temporal executions to track iteration over time
- Implement markdown references for progressive disclosure and audit trails
- Follow AMA naming conventions for files and folders
- Track evolution of strategy with CHANGELOG.md
- Understand the difference between index files and execution folders

### Why This Class Matters

Without structure, even file-based systems become chaotic. You might have great tools (Claude Code, MCP), but if your files are disorganized, you'll:

- Spend time searching instead of creating
- Duplicate work because you can't find previous versions
- Lose the audit trail from content back to research
- Struggle to update strategy without breaking existing content
- Make it impossible for AI agents to navigate your work

AMA's file structure solves these problems by creating **a system that both humans and AI can navigate**.

---

## The Two Frameworks: Understanding AMA

Before diving into file structure, it's critical to understand that AMA consists of **two distinct frameworks** that work together:

### 1. Agentic Framework (System Configuration)

Located in `/.claude/` in addition to the files `CLAUDE.md` and `mcp.json`, this framework defines **HOW the AI system operates**:

- **Hooks** - Define agent identity and behavior (replaces deprecated output styles)
- **Sub-agents** - Specialist agents (Analyst, Strategist, Content Creator)
- **Skills** - Reusable workflows and orchestration patterns
- **Commands** - Workflow triggers (`/plan`, `/implement`, etc.)

**Purpose:** Defines WHO (agents), WHAT (command + user input), and HOW (skills) the system operates.

### 2. Marketing Framework (Content Architecture)

Located in `/brand/`, this is where **your actual marketing work lives**:

```
/brand/
├── /research/     ← Pure, unopinionated factual gathering
│        ↓ synthesizes into
├── /strategy/     ← Strategic synthesis of research
│        ↓ guides creation of
└── /content/      ← System-generated outputs
```

**Purpose:** Organizes research findings, strategic decisions, and content outputs.



### Why This Distinction Matters

**This class focuses on the Marketing Framework (`/brand/`).** You're learning how to organize your marketing work, not how to configure the AI system.

- Classes 5-9 will cover the Agentic Framework (commands, skills, orchestration)
- For now, focus on understanding the three-layer structure and how to organize work within it

**Think of Agentic Framework as:** The engine and controls of a car - the mechanics that make everything work.
**Think of Marketing Framework as:** The road system - where you're actually going and the paths you take to get there.

---

## The Three-Layer Framework

The Marketing Framework is built on a simple principle: **marketing work flows through three distinct stages**, each with different characteristics.

```
INPUT          PROCESSING          OUTPUT
   ↓               ↓                  ↓
Research    →   Strategy    →     Content
(Facts)         (Decisions)       (Deliverables)
```

### Layer 1: Research (`/brand/research/`)

**What it is:** Pure, unopinionated factual gathering. Raw data, interview transcripts, competitive analysis, customer insights, market trends.

**Characteristics:**
- Temporal (date-stamped) - Markets change, competitors pivot, customers evolve
- Unopinionated - Just the facts, no strategic interpretation yet
- Accumulative - Knowledge builds over time, contradictions tracked
- Evidence-based - Primary sources, data, transcripts, screenshots

**Real-world analogy:** Research is like a newspaper archive. Each edition captures what was true at that moment in time. You don't throw away old editions; you keep them to see how things changed.

**Example research domains:**
- `competitor-analysis` - What competitors are doing, saying, positioning
- `customer-insights` - Interview notes, feedback, pain points
- `market-trends` - Industry reports, trend analysis
- `founder-interviews` - Founder's vision, product knowledge
- `platform-algorithms` - Latest updates on platform algorithms
- `adhoc` - One-off research that doesn't fit a specific domain

### Layer 2: Strategy (`/brand/strategy/`)

**What it is:** Strategic synthesis of research into actionable guidelines. This is where you make decisions about positioning, voice, messaging, audience.

**Characteristics:**
- Temporal (date-stamped) - Strategy requires iteration and refinement
- Opinionated - Takes a stance based on research findings
- Synthesized - Connects multiple research sources into coherent strategy
- References research - Every claim should trace back to evidence
- Guides content - Provides the "how-to" for content creation

**Real-world analogy:** Strategy is like a cookbook developed from years of experimenting with recipes (research). The cookbook (strategy) tells you how to cook, and it's updated when you discover better techniques.

**Example strategy domains:**
- `positioning` - How you position in the market
- `voice` - Brand voice and tone guidelines
- `messaging` - Key messages and themes
- `audience` - Target audience definitions
- `content-pillars` - Core content themes

### Layer 3: Content (`/brand/content/`)

**What it is:** Final outputs guided by strategy. Blog posts, social media, landing pages, email campaigns.

**Characteristics:**
- Temporal (date-stamped with slug) - Every piece is versioned and dated
- Strategy-guided - Explicitly references strategy used
- Deliverable - Ready to publish or close to it
- Traceable - Can trace back through strategy to research

**Real-world analogy:** Content is like the meals you cook using the cookbook (strategy) that was developed from your recipe experiments (research). Each meal is a finished product, but you can always trace back to the cookbook and experiments that informed it.

**Example content types:**
- `twitter-posts` - Tweet threads and individual posts
- `blog-posts` - Long-form articles
- `linkedin-posts` - Professional network content
- `landing-pages` - Website conversion pages
- `email-campaigns` - Email sequences

---

## Why This Matters for AMA

### The Farmland Metaphor

Think of the three-layer framework like farming:

- **Research** is tilling the soil, testing soil composition, studying weather patterns
- **Strategy** is the farmland itself - the prepared, fertile ground ready for planting
- **Content** is the produce grown on that farmland - tomatoes, corn, wheat

**Key insight:** You can grow lots of different produce (content types) from the same farmland (strategy), but the quality of your harvest depends entirely on the quality of your soil preparation (research and strategy).

Without good farmland, you're just scattering seeds and hoping something grows.

### The Audit Trail

One of AMA's most powerful features is the **verifiable audit trail** from content back to research:

```
Content piece
    ↓ (generated with)
Strategy guideline
    ↓ (references)
Research finding
    ↓ (analyzed from)
Raw data/source
```

**Example:**
- Twitter thread about "AI overwhelm" (Content)
- Uses "empathetic educator" voice (Strategy)
- Which references customer interviews showing anxiety (Research)
- Which links to actual interview transcripts (Raw data)

This means every content claim is defensible, every strategy decision is evidence-based, and you can always trace back to the source.

**Why this matters:**
- When stakeholders question strategy, you have evidence
- When content feels off-brand, you can trace back to find the disconnect
- When research contradicts existing strategy, you can update systematically
- When auditing quality, you can verify the entire chain

---

## Domain Organization

Within each layer (`/research/`, `/strategy/`, `/content/`), work is organized into **domains**.

### What is a Domain?

A domain is a **configurable area of concern** within a layer. Domains help you organize work into logical categories.

**Research domain examples:**
- `competitor-analysis`
- `customer-insights`
- `market-trends`
- `founder-interviews`
- `adhoc` (special domain for one-off research)

**Strategy domain examples:**
- `positioning`
- `voice`
- `messaging`
- `audience`
- `content-pillars`

**Content damin/type examples:**
- `twitter-posts`
- `blog-posts`
- `linkedin-posts`
- `landing-pages`

### Domains Are Configurable

**Important:** Domains are not fixed by AMA. As the Marketing Architect, you decide what domains make sense for your work.

**Exception:** `/brand/research/adhoc/` is a special, standard domain for research that doesn't fit anywhere else.

**Examples of custom domains you might create:**
- Research: `product-knowledge`, `user-behavior`, `pricing-research`
- Strategy: `visual-identity`, `pricing-strategy`, `distribution-strategy`
- Content: `case-studies`, `webinars`, `sales-collateral`

**Naming convention:** Use kebab-case for domain names (`customer-insights`, not `Customer Insights` or `customer_insights`).

---

## Temporal Execution Pattern

One of AMA's core innovations is the **temporal execution pattern**. Every layer uses date-stamped folders to track work over time.

### Why Temporal?

**The problem:** Marketing work evolves. Competitors change positioning. Customer needs shift. Your understanding deepens. If you just overwrite files, you lose the ability to:

- Compare what changed over time
- Understand why decisions were made
- Recover previous versions
- Track evolution of thinking

**The solution:** Date-stamped execution folders preserve every iteration while keeping the current approved state in an index file.

### Execution Format

**Standard format:** `YYYY-MM-DD@HH:mm`

Used by: Research domains (except adhoc), Strategy domains

**Example:**
```
/brand/research/competitor-analysis/2025-11-11@14:30/
/brand/strategy/positioning/2025-11-10@09:15/
```

**With-slug format:** `YYYY-MM-DD@HH:mm-descriptive-slug`

Used by: Content domains, Research/adhoc domain

**Example:**
```
/brand/content/twitter-posts/2025-11-11@14:30-ai-overwhelm-thread/
/brand/research/adhoc/2025-11-09@11:22-semiotic-competitor-analysis/
```

**Why the difference?**
- Standard format: For domain-indexed work where the domain name provides context
- With-slug format: For standalone/published work where the slug helps humans identify content

### Execution Contents

Every execution folder contains:

```
/{YYYY-MM-DD@HH:mm}/
├── PLAN.md              ← Approach for this execution
├── TODO.md              ← Progress tracking (Classes 8-9)
├── {TYPE}.md            ← Output (RESEARCH.md, STRATEGY.md, or CONTENT.md)
└── /artifacts/          ← Supporting materials / outputs from subtasks
```

**PLAN.md** - Documents the approach before starting work
**TODO.md** - Tracks tasks during execution (covered in orchestration)
**{TYPE}.md** - The actual output (RESEARCH.md, STRATEGY.md, or CONTENT.md)
**/artifacts/** - Detailed outputs from sub-agents and subtasks

---

## Index Files vs Execution Folders

This is one of the most important concepts in AMA's file structure.

### The Pattern

Both research and strategy domains maintain **two types of files**:

1. **Index file** - Current approved state (at domain root)
2. **Execution folders** - Iterative development work (in dated subfolders)

```
/brand/research/customer-insights/
├── RESEARCH.md                    ← INDEX: Current approved knowledge
├── CHANGELOG.md                   ← Tracks evolution
├── /2025-11-01@10:00/             ← Execution 1
│   ├── PLAN.md
│   ├── TODO.md
│   ├── RESEARCH.md                ← Execution output
│   └── /artifacts/
└── /2025-11-10@14:30/             ← Execution 2
    ├── PLAN.md
    ├── TODO.md
    ├── RESEARCH.md                ← Execution output
    └── /artifacts/
```

### Index File = Current Truth

**Location:** `/brand/{layer}/{domain}/{TYPE}.md`

**Examples:**
- `/brand/research/customer-insights/RESEARCH.md`
- `/brand/strategy/voice/STRATEGY.md`

**Characteristics:**
- Contains current approved knowledge/strategy
- Marketing Architect approved
- Referenced by downstream work (strategy reads research index, content reads strategy index)
- Updated through careful review of execution outputs

**Think of it as:** The main branch in Git - the stable, approved version.

### Execution Folders = Iterations

**Location:** `/brand/{layer}/{domain}/{YYYY-MM-DD@HH:mm}/`

**Characteristics:**
- Date-stamped iterations
- Contains PLAN.md, TODO.md, {TYPE}.md, /artifacts/
- Represents work in progress or completed iterations
- Preserves historical context
- May contradict or refine index

**Think of it as:** Feature branches in Git - experimental work that may or may not get merged.

### The Workflow

```
1. New research execution created
   └─ /brand/research/{domain}/2025-11-11@14:30/
      └─ RESEARCH.md (execution output)

2. AI compares new output with index
   └─ What's new? What contradicts? What validates?

3. Marketing Architect reviews and approves
   └─ Updates /brand/research/{domain}/RESEARCH.md (index)

4. CHANGELOG.md tracks what changed
   └─ Documents evolution for audit trail
```

**Key principle:** The index represents **accumulated, approved knowledge**. Executions represent **iterations and experiments**.

---

## Markdown References: The Connective Tissue

Markdown references are how AMA creates verifiable audit trails and enables progressive disclosure.

### The Format

```markdown
[descriptive text](/path/to/file.md)
```

**Always use relative paths from workspace root:**
- ✅ `/brand/research/customer-insights/RESEARCH.md`
- ❌ `/Users/name/project/brand/research/customer-insights/RESEARCH.md`

**Why relative paths?** They work across different computers when Marketing Architects clone the repository.

### How References Create Audit Trails

Strategy documents reference research findings to justify decisions:

```markdown
# Voice Strategy

Our voice is empathetic and educational because our customers are
[drowning in complex tools that overwhelm them](/brand/research/customer-insights/RESEARCH.md).

We avoid technical jargon because customers
[consistently expressed anxiety about "getting it wrong"](/brand/research/customer-insights/2025-11-01@10:00/RESEARCH.md#anxiety-themes).
```

This creates a **clickable, verifiable chain**:
- Strategy claim → links to research finding
- Research finding → links to raw data or transcript
- Every claim is defensible

### Progressive Disclosure for AI Agents

References enable AI agents to **load exactly what they need, when they need it**:

**Example workflow:**
1. Agent needs to create Twitter content
2. Loads `/brand/strategy/voice/STRATEGY.md` (base voice guidelines)
3. Sees reference to Twitter-specific extension
4. Loads `/brand/strategy/voice/twitter/EXTENSION.md` (platform details)
5. Strategy references research findings
6. Agent loads `/brand/research/customer-insights/RESEARCH.md` (evidence)

**Result:** Agent loads 3 targeted files instead of entire `/brand/` directory. Efficient token usage, focused context.

### Why This Matters

**For humans:**
- Click to navigate from content → strategy → research → data
- Verify claims instantly
- Understand the reasoning behind decisions

**For AI agents:**
- Load only relevant context (avoid context window bloat)
- Follow references progressively as needed
- Maintain clear chain of reasoning

**For teams:**
- Onboard new members by showing them the evidence trail
- Defend strategy decisions to stakeholders
- Update strategy systematically when research changes

---

## File Naming Conventions

Consistent naming makes files discoverable for both humans and AI.

### Entry Point Files (UPPERCASE.md)

These are **index files** that serve as entry points to each domain:

| File | Location | Purpose |
|------|----------|---------|
| `RESEARCH.md` | `/brand/research/{domain}/` | Index of accumulated research |
| `STRATEGY.md` | `/brand/strategy/{domain}/` | Index of current approved strategy |
| `CONTENT.md` | `/brand/content/{type}/{timestamp-slug}/` | Final content deliverable |
| `PLAN.md` | Execution folders | Approach for this execution |
| `TODO.md` | Execution folders | Persistent Progress tracking |
| `CHANGELOG.md` | Domain root | Evolution tracking |
| `EXTENSION.md` | Extension subfolders | Platform/audience-specific additions |

**Why UPPERCASE?**
- Instantly recognizable as entry points
- Consistent across all domains
- Easy for AI agents to locate

**Known Limitation**: having many RESEARCH.md files for example can make it dificult to find the right file using the `@` shortcut in Claude Code. For now you can reference the files by copying the relative path in Cursor/VS Code

### Folder Naming (kebab-case)

All folder names use **kebab-case**:

```
✅ customer-insights
✅ twitter-posts
✅ 2025-11-11@14:30-ai-overwhelm-thread

❌ Customer Insights (spaces)
❌ customer_insights (underscores)
❌ customerInsights (camelCase)
```

**Why kebab-case?**
- URL-friendly
- Command-line friendly
- Readable for humans and AI
- Consistent with modern web development practices

### Temporal Folder Format

**Standard (no slug):**
```
YYYY-MM-DD@HH:mm
2025-11-11@14:30
```

**With slug:**
```
YYYY-MM-DD@HH:mm-descriptive-slug
2025-11-11@14:30-ai-overwhelm-thread
```

**Do not:**
- Use 12-hour time (`02:30 PM`) - Use 24-hour (`14:30`)
- Add seconds (`14:30:45`) - Minutes are sufficient
- Forget the @ symbol (`2025-11-11-14:30`) - Use `@` to separate date from time
- Use spaces in slugs (`ai overwhelm thread`) - Use kebab-case (`ai-overwhelm-thread`)

---

## Extension Pattern: Platform-Specific Strategy

Sometimes you need platform or audience-specific details without duplicating your entire strategy.

### The Problem

You have a base voice strategy, but Twitter needs different guidelines than LinkedIn. Do you:
- Duplicate the entire voice strategy in each platform? (NO - causes divergence and becomes unmaintainable)
- Cram all platform details into one giant file? (NO - context bloat)

### The Solution: Extensions

**Extensions are additive compositions** that extend base strategy without replacing it.

```
Parent STRATEGY.md + Child EXTENSION.md = Complete Context

Example:
/brand/strategy/voice/STRATEGY.md            # Base voice (universal)
+ /brand/strategy/voice/twitter/EXTENSION.md # Twitter additions
= Complete Twitter voice guide
```

### How It Works

**Base strategy** (`/brand/strategy/voice/STRATEGY.md`):
```markdown
# Voice Strategy

## Core Principles
- Empathetic: We understand customer struggles
- Educational: We explain, never assume knowledge
- Confident: We know our domain expertise

## Tone Guidelines
- Conversational, never corporate
- Clear, never jargon-heavy
- Warm, never cold or distant

## View specific guidelines for:
- [Twitter](twitter/EXTENSION.md)
- [LinkedIn](linkedin/EXTENSION.md)
```

**Extension** (`/brand/strategy/voice/twitter/EXTENSION.md`):
```markdown
# Twitter Voice Extension

**Extends:** [/brand/strategy/voice/STRATEGY.md](/brand/strategy/voice/STRATEGY.md)

## Twitter-Specific Additions

### Format
- Thread-first: Break long thoughts into threads
- Hook-driven: First tweet must stop the scroll
- Conversational: Even more casual than base voice

### Length
- Aim for 100-200 characters per tweet (room for RTs)
- Threads: 4-8 tweets maximum

### Platform Conventions
- Use line breaks for readability
- End threads with a CTA or question
- No hashtag spam (1-2 maximum)
```

### Key Principles

**Extensions are additive only:**
- They ADD platform-specific details
- They DO NOT replace or contradict base strategy
- Base strategy contains universal principles
- Extensions contain what's DIFFERENT for that context

**Think of it like Next.js layouts:**
- `layout.tsx` = Base strategy (applies to all pages)
- `page.tsx` = Extension (specific to this route)
- Both compose together to render the final page

### When to Use Extensions

**Use extensions when:**
- Platform has specific format requirements (Twitter character limits)
- Audience differs significantly (LinkedIn = professional, Twitter = casual)
- Tone needs adjustment without changing core principles
- You need platform-specific examples

**Don't use extensions when:**
- Differences are minimal (just note them in base strategy)
- Content is completely different (might need separate domain)
- Extensions would contradict base strategy (update base strategy instead)

---

## CHANGELOG Pattern: Evolution Tracking

Every research and strategy domain should maintain a `CHANGELOG.md` at the domain root.

### Why CHANGELOG?

The index file (`RESEARCH.md` or `STRATEGY.md`) represents current truth, but it doesn't show:
- What changed and when
- Why changes were made
- Who approved changes
- What evidence prompted changes

**CHANGELOG.md solves this** by creating an audit trail of evolution.

### Format

```markdown
# Changelog: Customer Insights

All notable changes to customer insights research.

## [2025-11-11] - Voice Anxiety Theme Added

**Added:**
- New theme: "Voice anxiety" - customers fear sounding inauthentic
- Supporting quotes from 5 customer interviews
- Connection to existing "AI overwhelm" theme

**Evidence:**
- [Interview transcripts](/brand/research/customer-insights/2025-11-11@14:30/artifacts/interviews.md)
- [Analysis](/brand/research/customer-insights/2025-11-11@14:30/RESEARCH.md)

**Impact:**
- Updated voice strategy to address authenticity concerns
- New content pillar: "Finding your voice in the AI age"

---

## [2025-11-01] - Initial Customer Insights

**Added:**
- Core pain point: AI tool overwhelm
- Core desire: Simple, effective AI workflows
- Anxiety theme: "Getting it wrong"

**Evidence:**
- [Initial research execution](/brand/research/customer-insights/2025-11-01@10:00/RESEARCH.md)

**Impact:**
- Foundation for positioning and voice strategy
```

### What to Track

**Added:**
- New findings or insights
- New themes or patterns
- New evidence or sources

**Changed:**
- Refined understanding of existing insights
- Updated interpretations based on new data
- Corrections to previous findings

**Removed:**
- Deprecated findings (explained why)
- Invalidated assumptions

**Impact:**
- How this research affects strategy
- What downstream updates are needed
- Content implications

### When to Update

Update CHANGELOG.md when:
- New research execution updates the index
- Strategy synthesis reveals gaps in research
- Contradictions are discovered and resolved
- Marketing Architect approves changes to index

---

## Real-World Example: Building a Twitter Content Workflow

Let's walk through how all these pieces fit together in a real workflow.

### Scenario

You need to create a Twitter thread about "AI overwhelm" for marketing professionals.

### Step 1: Check Research Index

```
You load: /brand/research/customer-insights/RESEARCH.md
```

This shows accumulated knowledge about customer pain points, including the "AI overwhelm" theme with supporting evidence.

### Step 2: Check Strategy Index

```
You load: /brand/strategy/voice/STRATEGY.md
```

This provides base voice guidelines: empathetic, educational, confident.

The strategy references research:
```markdown
We are empathetic because customers are
[drowning in complex tools](/brand/research/customer-insights/RESEARCH.md).
```

### Step 3: Check Platform Extension

```
You load: /brand/strategy/voice/twitter/EXTENSION.md
```

This adds Twitter-specific guidelines:
- Thread-first format
- Hook-driven first tweet
- 4-8 tweets maximum
- 100-200 characters per tweet

### Step 4: Create Content Execution

```
Create folder: /brand/content/twitter-posts/2025-11-11@14:30-ai-overwhelm-thread/
```

Inside this folder:
- `PLAN.md` - Your approach for this thread
- `TODO.md` - Tasks to complete
- `CONTENT.md` - Final thread
- `/artifacts/` - Topic Research and References, Drafts, variations, etc.

### Step 5: Generate Content

Your `CONTENT.md` explicitly references what strategy it used:

```markdown
# Twitter Thread: AI Overwhelm

**Strategy References:**
- [Voice Strategy](/brand/strategy/voice/STRATEGY.md)
- [Twitter Extension](/brand/strategy/voice/twitter/EXTENSION.md)
- [Messaging Strategy](/brand/strategy/messaging/STRATEGY.md)

**Research Foundation:**
- [Customer Insights](/brand/research/customer-insights/RESEARCH.md)

## Thread Content

[Tweet 1 - Hook]
Marketing teams are drowning in AI tools...

[Tweet 2]
Here's the real problem nobody's talking about...

[continues...]
```

### The Complete Audit Trail

```
Content: Twitter thread about AI overwhelm
    ↓ (generated with)
Strategy: Empathetic voice + Twitter format + Messaging pillars
    ↓ (references)
Research: Customer insights showing AI overwhelm theme
    ↓ (analyzed from)
Raw Data: Interview transcripts, survey results
```

**Every link is clickable.** Every claim is verifiable. Every decision is defensible.

---

## Common Pitfalls to Avoid

### 1. Skipping Layers

**Wrong:**
```
Research → Content (skip strategy)
```

**Why it's wrong:** Content without strategy guidance is inconsistent. You'll reinvent the wheel every time.

**Right:**
```
Research → Strategy → Content
```

### 2. Mixing Execution and Index

**Wrong:**
```
/brand/research/customer-insights/RESEARCH.md  ← Is this the index or an execution?
```

**Why it's wrong:** Ambiguity about what's current vs historical.

**Right:**
```
/brand/research/customer-insights/
├── RESEARCH.md                    ← Index (current approved)
└── /2025-11-11@14:30/
    └── RESEARCH.md                ← Execution output
```

### 3. Using Absolute File Paths

**Wrong:**
```markdown
See [research](/Users/john/project/brand/research/customer-insights/RESEARCH.md)
```

**Why it's wrong:** Breaks when anyone else clones the repository.

**Right:**
```markdown
See [research](/brand/research/customer-insights/RESEARCH.md)
```

### 4. Forgetting Slugs in Content

**Wrong:**
```
/brand/content/twitter-posts/2025-11-11@14:30/
```

**Why it's wrong:** Hard for humans to identify what this content is about.

**Right:**
```
/brand/content/twitter-posts/2025-11-11@14:30-ai-overwhelm-thread/
```

### 5. Duplicating Strategy Across Platforms

**Wrong:**
```
/brand/strategy/voice-twitter/STRATEGY.md       ← Full strategy
/brand/strategy/voice-linkedin/STRATEGY.md      ← Duplicated with changes
```

**Why it's wrong:** Strategies diverge over time. Updates get missed.

**Right:**
```
/brand/strategy/voice/STRATEGY.md               ← Base (universal)
/brand/strategy/voice/twitter/EXTENSION.md      ← Additions only
/brand/strategy/voice/linkedin/EXTENSION.md     ← Additions only
```

### 6. Inconsistent Naming

**Wrong:**
```
/brand/research/Customer Insights/              ← Spaces
/brand/strategy/voice_strategy/                 ← Underscores
/brand/content/BlogPosts/                       ← PascalCase
```

**Right:**
```
/brand/research/customer-insights/              ← Kebab-case
/brand/strategy/voice/                          ← Kebab-case
/brand/content/blog-posts/                      ← Kebab-case
```

---

## Knowledge Checks

### Check 1: Layer Understanding

**Question:** You have a competitor's landing page screenshot and their messaging. Where does this go?

a) `/brand/strategy/positioning/` - Because it's about positioning
b) `/brand/research/competitor-analysis/` - Because it's raw data
c) `/brand/content/competitive-insights/` - Because it's about competition

**Answer:** b) `/brand/research/competitor-analysis/` - This is raw data (screenshot, messaging examples). Strategy synthesis comes later.

### Check 2: Temporal Execution Naming

**Question:** Which folder name is correct for a Twitter thread about AI tools?

a) `/brand/content/twitter-posts/2025-11-11-14-30-ai-tools-thread/`
b) `/brand/content/twitter-posts/2025-11-11@14:30-ai-tools-thread/`
c) `/brand/content/twitter-posts/2025-11-11@2:30pm-ai-tools-thread/`
d) `/brand/content/twitter-posts/ai-tools-thread/`

**Answer:** b) `/brand/content/twitter-posts/2025-11-11@14:30-ai-tools-thread/` - Correct format with @ separator, 24-hour time, and descriptive slug.

### Check 3: Index vs Execution

**Question:** You need the current approved voice strategy for creating content. Which file do you read?

a) `/brand/strategy/voice/2025-11-11@14:30/STRATEGY.md`
b) `/brand/strategy/voice/STRATEGY.md`
c) `/brand/strategy/voice/CHANGELOG.md`
d) `/brand/strategy/voice/twitter/EXTENSION.md`

**Answer:** b) `/brand/strategy/voice/STRATEGY.md` - This is the index file with current approved strategy. Execution folders are iterations.

### Check 4: Markdown References

**Question:** Which markdown reference is correct?

a) `[research](customer-insights/RESEARCH.md)`
b) `[research](/brand/research/customer-insights/RESEARCH.md)`
c) `[research](/Users/alex/project/brand/research/customer-insights/RESEARCH.md)`
d) `[research](../research/customer-insights/RESEARCH.md)`

**Answer:** b) `[research](/brand/research/customer-insights/RESEARCH.md)` - Uses relative path from workspace root, works across all computers.

### Check 5: Extension Pattern

**Question:** You need LinkedIn-specific voice guidelines. The base voice strategy exists at `/brand/strategy/voice/STRATEGY.md`. Where should the LinkedIn extension live?

a) `/brand/strategy/voice-linkedin/EXTENSION.md`
b) `/brand/strategy/voice/LINKEDIN.md`
c) `/brand/strategy/voice/linkedin/EXTENSION.md`
d) `/brand/strategy/linkedin/EXTENSION.md`

**Answer:** c) `/brand/strategy/voice/linkedin/EXTENSION.md` - Extensions are subfolders within the parent domain, always named EXTENSION.md.

### Check 6: Audit Trail

**Question:** A stakeholder questions your voice strategy decision. What's the best way to defend it?

a) Explain that you followed best practices
b) Show them similar brands using this approach
c) Point to the markdown reference chain: Strategy → Research → Interview transcripts
d) Cite your years of marketing experience

**Answer:** c) Point to the markdown reference chain - The audit trail from strategy to research to raw data provides verifiable evidence.

---

## Summary & Key Takeaways

### What You Learned

1. **Two Frameworks**: AMA has an Agentic Framework (`/.claude/`) and a Marketing Framework (`/brand/`)
2. **Three Layers**: Marketing work flows through Research → Strategy → Content
3. **Temporal Executions**: Date-stamped folders preserve iteration history
4. **Index Pattern**: Current truth lives in index files, iterations in execution folders
5. **Markdown References**: Create verifiable audit trails from content back to research
6. **Extensions**: Platform-specific details extend (not replace) base strategy
7. **Naming Conventions**: UPPERCASE.md for entry points, kebab-case for folders
8. **CHANGELOG**: Track evolution of knowledge and strategy

### Why It Matters

**Without this structure:**
- Marketing work becomes chaotic at scale
- AI agents can't navigate your files
- You lose the audit trail from claims to evidence
- Updates break existing content
- Strategy diverges across platforms

**With this structure:**
- Both humans and AI can navigate efficiently
- Every claim traces back to evidence
- Strategy updates systematically
- Work scales without chaos
- Progressive disclosure prevents context bloat

### How This Builds on Previous Classes

- **Class 1**: Identified context limitations as the fundamental problem
- **Class 2**: Showed how files solve context segmentation
- **Class 3** (this class): Organized files into a navigable, scalable system

### Preview: Class 4 - Git Integration

Now that you have a structured file system, Class 4 will teach you how to **version control your strategy** with Git. You'll learn:
- Why version control matters for marketing (not just code)
- Basic Git workflow for strategy iteration
- How to create meaningful commits
- Collaborating with branches
- Claude Code Git integration

**The progression:**
- Class 1-2: Files solve context problems
- Class 3: Structure prevents chaos
- Class 4: Version control enables experimentation
- Classes 5-9: Commands, skills, and orchestration bring it all together

---

## Quick Reference: File Structure Cheat Sheet

### Layer Purposes

| Layer | Purpose | Characteristic |
|-------|---------|----------------|
| Research | Factual gathering | Unopinionated, temporal, accumulative |
| Strategy | Strategic decisions | Opinionated, temporal, references research |
| Content | Final deliverables | Strategy-guided, temporal with slug |

### File Naming

| File | Purpose | Location |
|------|---------|----------|
| `RESEARCH.md` | Research index | `/brand/research/{domain}/` |
| `STRATEGY.md` | Strategy index | `/brand/strategy/{domain}/` |
| `CONTENT.md` | Content deliverable | `/brand/content/{type}/{timestamp-slug}/` |
| `EXTENSION.md` | Platform extension | `/{parent-domain}/{platform}/` |
| `CHANGELOG.md` | Evolution tracking | Domain root |
| `PLAN.md` | Execution approach | Execution folders |
| `TODO.md` | Progress tracking | Execution folders |

### Temporal Formats

| Format | Used By | Example |
|--------|---------|---------|
| `YYYY-MM-DD@HH:mm` | Research (non-adhoc), Strategy | `2025-11-11@14:30` |
| `YYYY-MM-DD@HH:mm-slug` | Content, Research/adhoc | `2025-11-11@14:30-ai-overwhelm` |

### Folder Naming Rules

- ✅ Use kebab-case: `customer-insights`
- ❌ No spaces: `Customer Insights`
- ❌ No underscores: `customer_insights`
- ❌ No camelCase: `customerInsights`

### Markdown Reference Format

```markdown
[descriptive text](/path/from/workspace/root.md)
```

Always use relative paths from workspace root (`/brand/...`), never absolute system paths.

---

## Next Steps

1. **Review your workspace**: Look at existing domains and executions. Do they follow these patterns?
2. **Practice temporal naming**: Create a test execution with proper date-stamped naming
3. **Trace an audit trail**: Pick a content piece and trace it back through strategy to research
4. **Prepare for Class 4**: Think about how you'd recover a previous version of strategy (Git will solve this)

**You're now ready to move to Class 4: Git Integration & Version Control.**
