# Class 3: The Three-Layer Marketing Framework

**Tagline:** Research → Strategy → Content (and why order matters)

**Estimated Time:** 2 hours (1.5 hours reading, 30 min exercises)

---

## Prerequisites

Before starting this class, you should have completed:
- **Class 1** - How LLMs Actually Work (understanding tokens, context windows, stateless execution)
- **Class 2** - The Context Problem (progressive disclosure, file-based solutions)

You should be comfortable with:
- Why LLMs need structured context
- How file systems enable context management
- The concept of selective loading vs context dumping

---

## Learning Objectives

By the end of this class, you will be able to:

1. **Explain the purpose and characteristics** of each layer (Research, Strategy, Content)
2. **Understand why layers must flow in sequence** (no skipping allowed)
3. **Identify appropriate content** for each layer
4. **Apply the "execution vs index" pattern** to organize iterative work
5. **Navigate the `/brand/` directory structure** with confidence
6. **Design domain structures** appropriate for different marketing needs

---

## Class Overview

The Agentic Marketing Architecture isn't just about making AI agents work better - it's an **opinionated methodology** for organizing marketing work. At its core is a three-layer framework that mirrors how effective marketing actually happens: you gather facts (Research), synthesize insights (Strategy), and create outputs (Content).

This isn't arbitrary. This structure exists because:
1. **AI needs clear boundaries** - Without layers, agents don't know what to load or when
2. **Marketing needs defensible decisions** - Every strategy claim should trace to research
3. **Iteration requires organization** - Temporal execution lets you refine without losing history
4. **Context management demands separation** - Mixing concerns creates context overflow

In this class, we'll explore the `/brand/` directory - the Marketing Framework container that holds all brand and marketing work. Think of it like the `src/` folder in software development: everything related to your marketing outputs lives here, organized by clear principles.

---

## Part 1: The `/brand/` Container - Marketing Framework Home

### What Is `/brand/`?

The `/brand/` directory is the **Marketing Framework container** - a dedicated space for all brand and marketing work, separate from the system configuration in `/.claude/`.

```
/workspace-root/
├── /.claude/          ← Agentic Framework: WHO (agents), WHAT (skills), HOW (workflows)
└── /brand/            ← Marketing Framework: All brand/marketing work
    ├── /research/     ← Input layer
    ├── /strategy/     ← Processing layer
    └── /content/      ← Output layer
```

**Why separate these?**

| Framework | Purpose | Who Changes It? | When It Changes |
|-----------|---------|-----------------|-----------------|
| Agentic (`/.claude/`) | System behavior & capabilities | System architects | When adding new agent types or workflows |
| Marketing (`/brand/`) | Brand knowledge & outputs | Marketing Architects | Constantly, as brand evolves |

**The analogy:**
- `/.claude/` is like your **development tools** (IDE, linters, build scripts)
- `/brand/` is like your **application code** (the actual product you're building)

---

### Why This Matters for AMA

**For AI Agents:**
- Clear separation means agents know where to look
- Prevents mixing system config with brand content
- Enables progressive disclosure (load only what's needed)

**For Marketing Architects:**
- One place for all brand work
- Clear mental model: "Everything marketing lives in /brand/"
- Easy to share, clone, version control

**For Collaboration:**
- Onboarding: "Here's the /brand/ folder, here's everything we know"
- Portability: Clone the repo, brand knowledge comes with it
- Isolation: Change strategy without breaking agent system

---

## Part 2: The Three Layers - Research, Strategy, Content

### High-Level Overview

The Marketing Framework is built on three distinct layers, each with a specific purpose:

```
/brand/
├── /research/     ← Input: Pure, unopinionated factual gathering
│        ↓ synthesizes into
├── /strategy/     ← Processing: Strategic synthesis into actionable insights
│        ↓ guides creation of
└── /content/      ← Output: Final deliverables guided by strategy
```

**The farmland analogy:**
- **Research** is the soil - raw material, nutrients, data
- **Strategy** is the farmland - cultivated, prepared, ready to grow things
- **Content** is the produce - the actual output you harvest and sell

---

### Layer 1: Research (`/brand/research/`)

**Purpose:** Pure, unopinionated factual gathering

**Characteristics:**
- Temporal (date-stamped executions)
- Unopinionated (facts, not interpretations)
- Preserves historical context
- Accumulates over time

**What belongs here:**
- Competitive analysis findings
- Customer interview transcripts
- Market research data
- User behavior patterns
- Category landscape studies
- Technical documentation reviews

**What doesn't belong here:**
- Strategic recommendations ("we should...")
- Opinions about what to do
- Content drafts
- Implementation plans

**Example structure:**
```
/brand/research/
├── /category-landscape/           ← Research domain
│   ├── RESEARCH.md                ← Index: accumulated knowledge (MA approved)
│   ├── CHANGELOG.md               ← Tracks evolution of findings
│   ├── /2025-10-30@14:57/         ← Execution 1 (temporal)
│   │   ├── PLAN.md
│   │   ├── TODO.md
│   │   ├── RESEARCH.md
│   │   └── /artifacts/
│   ├── /2025-11-05@18:23-semiotic-competitive-analysis/  ← Execution 2
│   │   ├── PLAN.md
│   │   ├── TODO.md
│   │   ├── RESEARCH.md
│   │   └── /artifacts/
│   └── /data/                     ← Raw materials (transcripts, PDFs, etc.)
│       └── competitor-websites/
│
└── /adhoc/                        ← Special: standalone research
    └── /2025-10-30@15:01-boringmarketer-analysis/
        ├── PLAN.md
        ├── TODO.md
        ├── RESEARCH.md
        └── /artifacts/
```

---

### Layer 2: Strategy (`/brand/strategy/`)

**Purpose:** Strategic synthesis of research into actionable insights

**Characteristics:**
- Temporal (date-stamped executions for iteration)
- Opinionated (makes recommendations)
- Synthesizes research (references back to findings)
- Iteratively refined
- Approved versions become index

**What belongs here:**
- Positioning statements
- Brand voice guidelines
- Messaging frameworks
- Audience definitions
- Content principles
- Channel strategies

**What doesn't belong here:**
- Raw research data (that's /research/)
- Finished content (that's /content/)
- Opinions without research backing
- Implementation details (those are in PLAN.md during execution)

**Example structure:**
```
/brand/strategy/
├── /positioning/                  ← Strategy domain
│   ├── STRATEGY.md                ← Index: current approved strategy
│   ├── CHANGELOG.md               ← Tracks evolution
│   └── /2025-10-29@10:35/         ← Execution folder (iteration)
│       ├── PLAN.md
│       ├── TODO.md
│       ├── STRATEGY.md            ← Strategy developed in this execution
│       └── /artifacts/
│
└── /voice/                        ← Another strategy domain
    ├── STRATEGY.md                ← Index: current approved voice strategy
    ├── CHANGELOG.md
    ├── /2025-10-29@10:35/         ← Execution folder
    │   ├── PLAN.md
    │   ├── TODO.md
    │   ├── STRATEGY.md
    │   └── /artifacts/
    └── /twitter/                  ← Extension subfolder
        └── EXTENSION.md           ← Platform-specific additions (additive only)
```

---

### Layer 3: Content (`/brand/content/`)

**Purpose:** Final deliverables guided by strategy

**Characteristics:**
- Temporal with slug (date + descriptive identifier)
- Strategy-guided (loads strategy as context)
- Ready for publication
- Versioned outputs

**What belongs here:**
- Blog posts
- Twitter threads
- LinkedIn articles
- Email campaigns
- Landing page copy
- Video scripts

**What doesn't belong here:**
- Strategy documents (that's /strategy/)
- Research findings (that's /research/)
- Draft explorations (use /strategy/ executions for ideation)

**Example structure:**
```
/brand/content/
├── /twitter/                      ← Content type domain
│   └── /2025-10-30@14:59-claude-code-agentic-marketing/
│       ├── PLAN.md
│       ├── TODO.md
│       ├── CONTENT.md             ← Final content for review/publication
│       └── /artifacts/
│
└── /blogs/                        ← Another content type
    └── /2025-11-01@09:30-introducing-ama-methodology/
        ├── PLAN.md
        ├── TODO.md
        ├── CONTENT.md
        └── /artifacts/
```

---

### Why This Matters for AMA

**The order is non-negotiable:**

```
Research → Strategy → Content
```

You can't skip layers. Here's why:

**If you skip Research → Strategy directly:**
- Strategy has no evidence basis
- Claims are unverifiable
- Can't trace decisions back to data
- Agent has no context to synthesize

**If you skip Strategy → Content directly:**
- Content lacks brand consistency
- No guardrails for voice/messaging
- Agent must invent guidelines on the fly
- Results are unpredictable

**The correct flow:**
1. **Research** - "Here's what we found about competitors X, Y, Z"
2. **Strategy** - "Based on those findings, our voice should be [X] because [evidence]"
3. **Content** - "Following that voice strategy, here's a Twitter thread..."

Each layer **references the previous layer** using markdown links:
- Strategy references research: `[finding](/brand/research/{domain}/RESEARCH.md)`
- Content loads strategy as context in PLAN.md
- Full audit trail: Content → Strategy → Research → Data

---

## Part 3: Domain Organization

### What Are Domains?

**Domains** are configurable organizing units within each base directory. They represent distinct areas of work.

Think of domains like:
- **Folders** in a file system
- **Namespaces** in code
- **Categories** in a content management system

**Key principle:** Domains are **configurable by the Marketing Architect** (except for one special case: `research/adhoc`).

---

### Research Domains

Research domains organize different types of research work.

**Common research domains:**
- `category-landscape` - Market and competitive analysis
- `customer-insights` - User interviews, feedback, behavior
- `brand-story-interview` - Founder/team interviews
- `twitter-algorithm` - Platform-specific research
- `landing-page-best-practices` - Best practice studies

**Special domain: `adhoc`**
- Used for standalone research that doesn't update a domain index
- Always uses slug format: `YYYY-MM-DD@HH:mm-descriptive-slug`
- Example: `/brand/research/adhoc/2025-10-30@15:01-boringmarketer-analysis/`

**Example from real workspace:**
```
/brand/research/
├── /category-landscape/
│   ├── RESEARCH.md                               ← Index
│   ├── CHANGELOG.md
│   ├── /2025-10-30@14:57/                        ← Execution (standard format)
│   └── /2025-11-05@18:23-semiotic-competitive-analysis/  ← Execution (with slug)
│
├── /customer-insights/
│   └── RESEARCH.md
│
└── /adhoc/                                       ← Special: always uses slug
    ├── /2025-10-30@15:01-boringmarketer-analysis/
    └── /2025-10-30@17:06-pontusab-analysis/
```

---

### Strategy Domains

Strategy domains organize different strategic concerns.

**Common strategy domains:**
- `positioning` - Market position, differentiation
- `voice` - Brand voice, tone, personality
- `messaging` - Core messages, themes, frameworks
- `audience` - Target audience definition, personas
- `brand-fundamentals` - Mission, vision, values
- `visual-guidelines` - Visual brand standards

**Example from real workspace:**
```
/brand/strategy/
├── /positioning/
│   ├── STRATEGY.md                ← Index: current approved positioning
│   └── CHANGELOG.md
│
├── /voice/
│   ├── STRATEGY.md                ← Index: current approved voice
│   ├── CHANGELOG.md
│   ├── /2025-10-29@10:35/         ← Execution: iteration/development
│   └── /twitter/                  ← Extension: platform-specific additions
│       └── EXTENSION.md
│
├── /messaging/
│   ├── STRATEGY.md
│   └── CHANGELOG.md
│
└── /audience/
    ├── STRATEGY.md
    └── CHANGELOG.md
```

---

### Content Domains

Content domains organize different types of content outputs.

**Common content domains:**
- `twitter` or `twitter-posts` - Twitter threads, tweets
- `blogs` or `blog-posts` - Blog articles
- `linkedin-posts` - LinkedIn content
- `email-campaigns` - Email sequences
- `landing-pages` - Landing page copy

**Key difference:** Content executions **always use slug format** because they're standalone, publishable outputs.

**Example from real workspace:**
```
/brand/content/
├── /twitter/
│   └── /2025-10-30@14:59-claude-code-agentic-marketing/
│       ├── PLAN.md
│       ├── TODO.md
│       └── CONTENT.md
│
├── /blogs/
│   └── /2025-11-01@09:30-introducing-ama-methodology/
│       ├── PLAN.md
│       ├── TODO.md
│       └── CONTENT.md
│
└── /image-generation/
    └── /2025-11-04@08:19-porcelain-coder-visual/
        ├── PLAN.md
        ├── TODO.md
        └── /artifacts/
```

---

### Technical Deep Dive: When to Create New Domains

**Research domains:**
- Create when you have ongoing research that accumulates (e.g., customer interviews)
- Use `adhoc` for one-off analyses that don't fit existing domains

**Strategy domains:**
- Create for major strategic concerns (positioning, voice, audience)
- Don't over-segment - aim for 5-8 core domains
- Use extensions for platform-specific variations (not new domains)

**Content domains:**
- Create for each content type/channel
- Examples: `twitter-posts`, `blogs`, `linkedin-posts`, `email-campaigns`
- Every execution gets its own timestamped-slug folder

**Anti-pattern to avoid:**
```
❌ /brand/strategy/voice-twitter/
❌ /brand/strategy/voice-linkedin/
❌ /brand/strategy/voice-blog/

✅ /brand/strategy/voice/
   ├── STRATEGY.md
   ├── /twitter/EXTENSION.md
   ├── /linkedin/EXTENSION.md
   └── /blog/EXTENSION.md
```

---

## Part 4: Temporal Execution Pattern

### Why Date-Stamped Folders?

All three base directories use **temporal execution folders** - directories named with timestamps.

**Two formats:**

1. **Standard format:** `YYYY-MM-DD@HH:mm`
   - Used by: Research domains (except adhoc), Strategy domains
   - Example: `/2025-10-30@14:57/`

2. **With-slug format:** `YYYY-MM-DD@HH:mm-descriptive-slug`
   - Used by: Content domains, Research/adhoc domain
   - Example: `/2025-10-30@14:59-claude-code-agentic-marketing/`

**Why temporal?**

Because marketing work is iterative and evolving:
- **Research** - Markets shift, competitors pivot, new data emerges
- **Strategy** - Strategy requires refinement, A/B testing, iteration
- **Content** - Content is versioned output for publication

---

### What Temporal Execution Enables

1. **Historical comparison** - What changed between iterations?
2. **Trend identification** - How has our understanding evolved?
3. **Context preservation** - What did we know when we made this decision?
4. **Evidence trails** - Full audit capability
5. **Iterative refinement** - Try approaches, compare, improve

**Example: Strategy iteration**

```
/brand/strategy/voice/
├── STRATEGY.md                    ← Current approved strategy (v3)
├── CHANGELOG.md                   ← "2025-10-29: Updated tone guidance"
│
├── /2025-09-15@10:00/             ← Iteration 1: Initial draft
│   ├── PLAN.md                    ← "Synthesize voice from research"
│   ├── TODO.md
│   ├── STRATEGY.md                ← First pass at voice
│   └── /artifacts/
│
├── /2025-10-01@14:30/             ← Iteration 2: Refinement
│   ├── PLAN.md                    ← "Refine based on feedback"
│   ├── TODO.md
│   ├── STRATEGY.md                ← Improved version
│   └── /artifacts/
│
└── /2025-10-29@10:35/             ← Iteration 3: Final version (approved)
    ├── PLAN.md                    ← "Finalize for approval"
    ├── TODO.md
    ├── STRATEGY.md                ← This became the index
    └── /artifacts/
```

**You can:**
- Compare iteration 1 vs iteration 3 to see evolution
- Understand why decisions changed
- Preserve context for future decisions
- Show stakeholders the refinement process

---

### Standard Execution Folder Structure

Every temporal execution contains the same structure:

```
/{YYYY-MM-DD@HH:mm}/  or  /{YYYY-MM-DD@HH:mm-slug}/
├── PLAN.md           ← Approach, objectives, phases
├── TODO.md           ← Progress tracking
├── {TYPE}.md         ← Output (RESEARCH.md, STRATEGY.md, or CONTENT.md)
└── /artifacts/       ← Supporting materials from subtasks
    ├── 01-*.md
    ├── 02-*.md
    └── ...
```

**PLAN.md** - Documents the approach before work begins
- What's the goal?
- What phases will this include?
- What context will be loaded?

**TODO.md** - Tracks progress during execution
- Which phases are complete?
- What's currently in progress?
- What's pending?

**{TYPE}.md** - The actual output
- RESEARCH.md in research executions
- STRATEGY.md in strategy executions
- CONTENT.md in content executions

**/artifacts/** - Supporting work from subtasks and sub-agents
- Numbered for sequence: `01-competitive-scan.md`, `02-synthesis.md`
- Preserves intermediate work
- Shows how output was built

---

### Why This Matters for AMA

**For AI Agents:**
- Clear structure means predictable file locations
- Artifacts folder prevents clutter in main output
- PLAN.md gives context for resumption
- TODO.md enables progress tracking

**For Marketing Architects:**
- See exactly what happened in each execution
- Compare iterations side-by-side
- Preserve historical context
- Resume interrupted work easily

**For Collaboration:**
- Teammates can follow your reasoning
- Stakeholders can see evolution
- Onboarding: "Here's the latest, here's the history"

---

## Part 5: The Index Pattern (Executions vs Index)

### The Problem: How Do You Track "Current Truth"?

With temporal executions, you have multiple versions of documents:
- `2025-09-15@10:00/STRATEGY.md`
- `2025-10-01@14:30/STRATEGY.md`
- `2025-10-29@10:35/STRATEGY.md`

**Which one is the current, approved version?**

The **Index Pattern** solves this.

---

### Index Files: Current Approved State

Both **research** and **strategy** domains maintain an **index file** at the domain level:

```
/{base-dir}/{domain}/
├── {TYPE}.md                 ← INDEX: Current approved state (MA approved)
│                                (RESEARCH.md or STRATEGY.md)
├── CHANGELOG.md              ← Tracks evolution over time
│
├── /{YYYY-MM-DD@HH:mm}/      ← Execution 1 (iteration/development)
│   ├── PLAN.md
│   ├── TODO.md
│   ├── {TYPE}.md             ← Execution output
│   └── /artifacts/
│
└── /{YYYY-MM-DD@HH:mm}/      ← Execution 2 (iteration/development)
    ├── PLAN.md
    ├── TODO.md
    ├── {TYPE}.md             ← Execution output
    └── /artifacts/
```

**Key distinction:**
- **Index file** (`/brand/research/{domain}/RESEARCH.md`) = Current approved state
- **Execution file** (`/brand/research/{domain}/{timestamp}/RESEARCH.md`) = Iterative work

---

### How the Index Pattern Works

**The workflow:**

1. **Agent executes research/strategy work** in a temporal execution folder
2. **Execution completes** with output in `{timestamp}/RESEARCH.md` or `{timestamp}/STRATEGY.md`
3. **AI compares execution output with existing index**:
   - What's new?
   - What contradicts existing knowledge?
   - What validates existing knowledge?
4. **Marketing Architect reviews and approves** updates to index
5. **CHANGELOG.md updated** to track what changed and why

**Example: Research domain**

```
/brand/research/category-landscape/
├── RESEARCH.md                    ← INDEX: All approved findings about category
├── CHANGELOG.md                   ← "2025-11-05: Added Semiotic competitor analysis"
│
├── /2025-10-30@14:57/             ← Execution 1: Initial landscape scan
│   └── RESEARCH.md                ← Findings from this execution
│
└── /2025-11-05@18:23-semiotic-competitive-analysis/  ← Execution 2: Deep dive
    └── RESEARCH.md                ← New findings (approved → updated index)
```

**After execution 2 completes:**
- AI compares findings in `2025-11-05@18:23.../RESEARCH.md` with index
- MA approves addition of Semiotic analysis to index
- Index updated with new section
- CHANGELOG.md records: "2025-11-05: Added Semiotic competitor analysis"

---

### Why Research and Strategy Have Indexes (But Content Doesn't)

| Layer | Has Index? | Why / Why Not |
|-------|-----------|---------------|
| Research | ✅ Yes | Knowledge **accumulates** - new findings add to what we know |
| Strategy | ✅ Yes | Strategy **evolves** - new iterations refine existing strategy |
| Content | ❌ No | Content is **versioned output** - each piece is standalone |

**Research index example:**
```markdown
# Competitive Landscape Research

## Direct Competitors

### Competitor A
- Founded: 2020
- Positioning: [analysis]
- Recent findings (2025-11-05): [new intel]  ← Accumulated over time

### Competitor B
- Founded: 2018
- Positioning: [analysis]
```

**Strategy index example:**
```markdown
# Voice Strategy

## Core Tone
- Conversational but authoritative
- Technical depth without jargon
- Updated 2025-10-29: Added warmth dimension  ← Evolved through iteration

## Platform-Specific Extensions
- [Twitter](twitter/EXTENSION.md)
- [LinkedIn](linkedin/EXTENSION.md)
```

**Content doesn't need an index:**
- Each piece is timestamped and standalone
- Blog post from Oct 30 doesn't "update" blog post from Oct 15
- Navigate by timestamp-slug folder name

---

### Technical Deep Dive: Index Update Decision Tree

When should an execution's findings update the index?

```
Is this new information?
├─ Yes → Add to index
└─ No → Does it contradict existing info?
    ├─ Yes → Review with MA, update or note contradiction
    └─ No → Does it validate/strengthen existing info?
        ├─ Yes → Note as validation in CHANGELOG
        └─ No → Redundant, no update needed
```

**Examples:**

**New information (add to index):**
- New competitor discovered
- Customer insight not previously documented
- New platform algorithm behavior

**Contradiction (MA review):**
- Previous research: "Customers prefer simple tools"
- New research: "Customers want advanced features"
- Resolution: Update with nuance, note both findings, explain context

**Validation (note in CHANGELOG):**
- Previous research: "X is a pain point"
- New research: "Confirmed X is still major pain point"
- Action: Update CHANGELOG, possibly strengthen existing section

---

## Part 6: Information Flow (How the Layers Connect)

### The Complete Flow

```
Research Execution (temporal work)
         ↓ updates
Research Index (accumulated knowledge, MA approved)
         ↓ synthesizes into
Strategy Execution (iterative development)
         ↓ updates
Strategy Index (current approved strategy, MA approved)
         ↓ guides every
Content Execution (strategy as context)
```

**Let's trace a real workflow:**

---

### Example Workflow: From Research to Published Content

**Phase 1: Research**

```
/brand/research/customer-insights/2025-10-15@14:00/
├── PLAN.md
│   "Objective: Interview 5 customers about pain points"
├── TODO.md
│   "✅ Completed: All interviews transcribed and analyzed"
└── RESEARCH.md
    "## Key Finding: Users overwhelmed by complex tooling
     - 4/5 mentioned 'too many features'
     - Evidence: [interview transcripts]
     - Quote: 'I just want it to work'..."
```

**Phase 2: Update Research Index**

AI compares execution findings with existing index:
- New finding: "Users overwhelmed by complexity" → Add to index
- Validates existing: Previous research also mentioned this → Strengthen claim

```
/brand/research/customer-insights/
└── RESEARCH.md  ← Updated with new findings
    "## Core Pain Points

     ### Complexity Overwhelm (High confidence)
     Users consistently report feeling overwhelmed by complex tooling.

     - Mentioned in 8/10 interviews across two research cycles
     - Evidence: [Oct research](/brand/research/customer-insights/2025-10-15@14:00/RESEARCH.md)
     - Quote: 'I just want it to work'"
```

---

**Phase 3: Strategy Synthesis**

Strategist agent reads research index and synthesizes positioning:

```
/brand/strategy/positioning/2025-10-20@09:00/
├── PLAN.md
│   "Synthesize positioning based on customer pain points
│    Context to load:
│    - /brand/research/customer-insights/RESEARCH.md
│    - /brand/research/category-landscape/RESEARCH.md"
│
└── STRATEGY.md
    "## Core Positioning

     'Finally, marketing tools that don't overwhelm you'

     ### Rationale
     [Customers are drowning in complexity](/brand/research/customer-insights/RESEARCH.md)
     while [competitors keep adding features](/brand/research/category-landscape/RESEARCH.md).
     We win by being the simple, approachable alternative."
```

**Phase 4: Update Strategy Index**

MA approves new positioning:

```
/brand/strategy/positioning/
├── STRATEGY.md  ← Updated with new positioning
│   "## Core Positioning
│    'Finally, marketing tools that don't overwhelm you'..."
│
└── CHANGELOG.md  ← Records the change
    "## 2025-10-20
     - Updated core positioning
     - Based on Q4 customer research showing complexity overwhelm
     - Approved by: Marketing Architect"
```

---

**Phase 5: Content Creation**

Content creator loads strategy and generates Twitter thread:

```
/brand/content/twitter/2025-10-25@11:30-simple-marketing-tools/
├── PLAN.md
│   "Create Twitter thread about our positioning
│    Context to load:
│    - /brand/strategy/positioning/STRATEGY.md
│    - /brand/strategy/voice/STRATEGY.md
│    - /brand/strategy/voice/twitter/EXTENSION.md"
│
└── CONTENT.md
    "Most marketing tools are feature bloat disguised as innovation.

     You don't need 47 integrations.
     You need something that actually works.

     [thread continues, following voice guidelines]"
```

**Complete audit trail:**

```
Tweet "Most marketing tools are feature bloat"
    ↓ guided by
/brand/strategy/positioning/STRATEGY.md
    "Our positioning: simplicity over complexity"
    ↓ based on
/brand/research/customer-insights/RESEARCH.md
    "Users overwhelmed by complex tooling"
    ↓ sourced from
/brand/research/customer-insights/2025-10-15@14:00/RESEARCH.md
    "4/5 customers mentioned 'too many features'"
    ↓ evidence in
/brand/research/customer-insights/data/interview-transcripts/
    [actual customer quotes]
```

**Every claim is verifiable.** Follow the markdown references backwards from content to raw data.

---

### Key Rules for Information Flow

**Rule 1: Never skip layers**
```
❌ Research → Content (skips Strategy)
✅ Research → Strategy → Content
```

**Rule 2: Always reference the previous layer**
```
Strategy documents must link to Research
Content PLAN.md must specify which Strategy to load
```

**Rule 3: Load from indexes, not executions**
```
❌ Load /brand/research/customer-insights/2025-10-15@14:00/RESEARCH.md
✅ Load /brand/research/customer-insights/RESEARCH.md (the index)
```

**Rule 4: Executions update indexes through MA approval**
```
Execution → AI comparison → MA review → Index update → CHANGELOG
```

---

## Part 7: Real Workspace Examples

Let's look at actual structures from the AMA workspace.

---

### Example 1: Category Landscape Research Domain

**Directory structure:**
```
/brand/research/category-landscape/
├── RESEARCH.md                               ← Index: all competitor knowledge
├── CHANGELOG.md                              ← Evolution tracking
│
├── /2025-10-30@14:57/                        ← Execution 1: Initial scan
│   ├── PLAN.md
│   ├── TODO.md
│   └── RESEARCH.md
│
├── /2025-11-05@18:23-semiotic-competitive-analysis/  ← Execution 2: Deep dive
│   ├── PLAN.md
│   ├── TODO.md
│   ├── RESEARCH.md
│   └── /artifacts/
│       ├── 01-website-analysis.md
│       └── 02-positioning-extraction.md
│
└── /2025-11-05@22:01-littleplains-competitive-analysis/  ← Execution 3: Another competitor
    ├── PLAN.md
    ├── TODO.md
    ├── RESEARCH.md
    └── /artifacts/
```

**What this shows:**
- Index (`RESEARCH.md`) accumulates findings from all executions
- Each execution is timestamped (some with slugs for clarity)
- Artifacts folder preserves detailed subtask work
- Can trace evolution: initial scan → deep dives → comprehensive competitive map

---

### Example 2: Voice Strategy Domain with Extension

**Directory structure:**
```
/brand/strategy/voice/
├── STRATEGY.md                    ← Index: current approved voice guidelines
├── CHANGELOG.md                   ← "2025-10-29: Updated tone guidance"
│
├── /2025-10-29@10:35/             ← Execution: strategy development iteration
│   ├── PLAN.md
│   ├── TODO.md
│   ├── STRATEGY.md                ← Strategy developed in this iteration
│   └── /artifacts/
│       ├── 01-research-synthesis.md
│       └── 02-voice-examples.md
│
└── /twitter/                      ← Extension: platform-specific additions
    └── EXTENSION.md               ← Twitter-specific voice guidelines
```

**What this shows:**
- Base strategy (`STRATEGY.md`) contains universal voice principles
- Extension (`twitter/EXTENSION.md`) adds Twitter-specific nuances
- Execution folder shows iteration history
- Agent loads: Base STRATEGY.md + twitter/EXTENSION.md = complete Twitter voice

---

### Example 3: Content Execution (Twitter Post)

**Directory structure:**
```
/brand/content/twitter/2025-10-30@14:59-claude-code-agentic-marketing/
├── PLAN.md
│   "Create Twitter thread about Claude Code + AMA
│    Context to load:
│    - /brand/strategy/positioning/STRATEGY.md
│    - /brand/strategy/voice/STRATEGY.md
│    - /brand/strategy/voice/twitter/EXTENSION.md"
│
├── TODO.md
│   "✅ Thread drafted
│    ✅ Reviewed against voice guidelines
│    ✅ Ready for MA review"
│
├── CONTENT.md
│   "[Twitter thread content]"
│
└── /artifacts/
    ├── 01-hook-variations.md
    └── 02-cta-options.md
```

**What this shows:**
- Content uses timestamp-slug format (descriptive + datestamped)
- PLAN.md explicitly lists which strategy files to load
- Artifacts preserve alternative approaches
- CONTENT.md is the final output for publication

---

## Part 8: Navigation Heuristics

How do you find what you need? Use these heuristics.

---

### Finding Current Approved State

**Need current approved strategy?**
```
→ Start: /brand/strategy/{domain}/STRATEGY.md
→ Optional: Check for extensions referenced in STRATEGY.md
```

**Need current research findings?**
```
→ Start: /brand/research/{domain}/RESEARCH.md
```

**Need a specific piece of content?**
```
→ Navigate to: /brand/content/{type}/{YYYY-MM-DD@HH:mm-slug}/CONTENT.md
```

---

### Understanding Evolution and Context

**Want to see how strategy evolved?**
```
→ Look in: /brand/strategy/{domain}/{YYYY-MM-DD@HH:mm}/
→ Compare: Multiple execution folders side-by-side
→ Read: CHANGELOG.md for summary of changes
```

**Want to see research development?**
```
→ Look in: /brand/research/{domain}/{YYYY-MM-DD@HH:mm}/
→ Trace: How findings accumulated over time
```

---

### Following Audit Trails

**Want to verify a strategy claim?**
```
→ Find markdown reference in strategy: [claim](/brand/research/{domain}/RESEARCH.md)
→ Follow link to research findings
→ Check research references to raw data in /data/ folder
```

**Want to understand why content says what it says?**
```
→ Read: PLAN.md in content execution (lists loaded strategy)
→ Follow: Strategy files referenced in PLAN.md
→ Trace back: Strategy → Research → Data
```

---

### When to Create New vs Update Existing

**Research:**
- **New execution** when conducting new research (always temporal)
- **Update index** after execution completes (with MA approval)
- **New domain** when research doesn't fit existing domains

**Strategy:**
- **New execution** when iterating/refining strategy
- **Update index** when iteration is approved (becomes current truth)
- **New extension** for platform-specific additions (not new domain)

**Content:**
- **New execution** for every piece of content (always timestamped-slug)
- **No index** - content is standalone outputs

---

## Part 9: Why This Matters for AMA

### For AI Agents: Enables Effective Orchestration

**Clear boundaries:**
- Agent knows whether to load research, strategy, or check content
- No confusion about "where does this information belong?"

**Progressive disclosure:**
- Load base STRATEGY.md first
- Check for extensions only if needed
- Follow references to research only when validating

**Context efficiency:**
- Don't load entire /brand/ directory
- Load specific index files relevant to task
- Follow paths, not content inlining

**Verifiable outputs:**
- Every strategy claim can link to research
- Every content decision can trace to strategy
- Full audit trail for defensible work

---

### For Marketing Architects: Enables Scalable Brand Management

**Organization:**
- One place for all brand knowledge (`/brand/`)
- Clear separation of concerns (research vs strategy vs content)
- Easy to navigate and find what you need

**Evolution tracking:**
- See how strategy has changed over time
- Understand why decisions were made
- Compare iterations side-by-side

**Collaboration:**
- Onboarding: "Here's /brand/, here's everything we know"
- Handoffs: "See execution X for context"
- Stakeholders: "Here's the audit trail from research to content"

**Iteration:**
- Try new approaches in executions
- Compare with existing index
- Approve updates when ready

---

### For the System: Enables Sophisticated Workflows

**Multi-phase workflows:**
- Research execution → update index → synthesize strategy → iterate
- Clear handoffs between phases
- Resumable if interrupted

**Evidence-based strategy:**
- Strategy can't make claims without research backing
- Markdown references create verifiable chains
- Contradictions handled through MA oversight

**Consistent outputs:**
- Content always loads approved strategy (index, not execution)
- Voice consistency across channels
- Platform-specific nuances via extensions

---

## Exercises

### Exercise 1: Layer Classification

**For each item below, identify which layer it belongs in:**

1. "Users mentioned being overwhelmed by competitor X's interface"
2. "Our voice should be conversational yet authoritative"
3. "Twitter thread: '10 ways AI is changing marketing'"
4. "Competitor A charges $99/month for their basic plan"
5. "Based on customer pain points, we should position as 'the simple alternative'"
6. "Blog post about our new feature launch"

**Answers:**
1. Research (factual finding)
2. Strategy (opinionated guideline)
3. Content (final output)
4. Research (factual data)
5. Strategy (strategic recommendation)
6. Content (final output)

---

### Exercise 2: Structure Design

**Scenario:** You're building strategy for a new product. You need positioning, voice guidelines, and messaging framework.

**Design the directory structure:**
- What domains would you create?
- Where would each piece live?
- How would they reference each other?

**Sample answer:**
```
/brand/strategy/
├── /positioning/
│   ├── STRATEGY.md             ← "We're the simple alternative"
│   └── CHANGELOG.md
│
├── /voice/
│   ├── STRATEGY.md             ← References positioning for context
│   └── CHANGELOG.md
│
└── /messaging/
    ├── STRATEGY.md             ← References positioning and voice
    └── CHANGELOG.md
```

Each STRATEGY.md would include markdown references:
- Voice STRATEGY.md: `[positioning](/brand/strategy/positioning/STRATEGY.md)`
- Messaging STRATEGY.md: `[voice guidelines](/brand/strategy/voice/STRATEGY.md)`

---

### Exercise 3: Execution vs Index

**Scenario:** You've completed a strategy execution at `/brand/strategy/voice/2025-11-10@14:30/`.

**Questions:**
1. Where does the output currently live?
2. Where should it go if approved?
3. What file tracks the change?
4. How would future agents load this strategy?

**Answers:**
1. Output lives in `/brand/strategy/voice/2025-11-10@14:30/STRATEGY.md`
2. If approved, updates `/brand/strategy/voice/STRATEGY.md` (the index)
3. Change tracked in `/brand/strategy/voice/CHANGELOG.md`
4. Future agents load `/brand/strategy/voice/STRATEGY.md` (the approved index)

---

### Exercise 4: Audit Trail

**Scenario:** You read this in a Twitter thread:
> "Most marketing tools overwhelm users with complexity. We built something different."

**Trace the audit trail backwards. What should you find?**

**Sample answer:**
1. Check PLAN.md: "Context loaded: /brand/strategy/positioning/STRATEGY.md"
2. Read positioning strategy: "We position as the simple alternative because [customers report overwhelm](/brand/research/customer-insights/RESEARCH.md)"
3. Read research index: "Users overwhelmed by complexity (8/10 interviews)"
4. Check research execution: Specific interview quotes and data
5. Check raw data: Interview transcripts in `/data/`

Full chain: Tweet → Strategy → Research → Execution → Raw data

---

### Exercise 5: Extension Design

**Scenario:** You have a voice strategy that works for all platforms, but Twitter needs to be more casual and use more emoji.

**Design the structure:**
- Where does base voice strategy live?
- Where do Twitter-specific additions live?
- What should the extension contain?

**Sample answer:**
```
/brand/strategy/voice/
├── STRATEGY.md                    ← Base voice (universal principles)
│   "## Core Tone
│    - Conversational yet authoritative
│    - Technical depth without jargon
│
│    ## Platform-Specific Extensions
│    View specific guidelines for:
│    - [Twitter](twitter/EXTENSION.md)
│    - [LinkedIn](linkedin/EXTENSION.md)"
│
└── /twitter/
    └── EXTENSION.md               ← Twitter-specific additions
        "## Twitter Voice Extensions

         ### Additional Guidelines
         - More casual than base voice
         - Use emoji strategically (1-2 per tweet)
         - Shorter sentences for readability
         - Examples: [...]

         Note: This extends (not replaces) base voice strategy."
```

---

## Summary

### Key Takeaways

1. **The `/brand/` container holds all marketing work** in three layers: research, strategy, content

2. **Layers must flow in order**: Research → Strategy → Content (never skip)

3. **Domains organize work** within each layer - configurable by Marketing Architect

4. **Temporal executions enable iteration** - date-stamped folders preserve history

5. **Index pattern separates iterative work from approved state**:
   - Research/Strategy have indexes (accumulated knowledge)
   - Content is always standalone executions

6. **Markdown references create audit trails** - every claim traces to evidence

7. **Extensions enable platform-specific variations** without duplication

8. **Information flows through indexes** - agents load approved state, not executions

---

### What You Can Do Now

After completing this class, you should be able to:

- **Navigate** the `/brand/` directory confidently
- **Identify** which layer (research/strategy/content) information belongs in
- **Understand** the difference between executions and indexes
- **Trace** audit trails from content back to research
- **Design** domain structures for new use cases
- **Recognize** when to create extensions vs new domains

---

### Coming Up Next

**Class 4: Entry Points and Navigation**
- How to use UPPERCASE.md files as indexes
- Markdown reference format and best practices
- Extension Pattern deep dive
- Designing information hierarchies

**Why this builds on Class 3:**
- Now you understand the three layers
- Next: Learn how to navigate within and between them
- Then: Create verifiable audit trails (Class 5)

---

## Further Reading

**Primary references:**
- [CLAUDE.md](/CLAUDE.md) - Complete structural guide
- [agentic-orchestrating skill](/.claude/skills/agentic-orchestrating/SKILL.md) - Workflow patterns

**Related classes:**
- Class 1: How LLMs Actually Work (foundation concepts)
- Class 2: The Context Problem (why files help)
- Class 4: Entry Points and Navigation (next step)
- Class 5: Verifiable Audit Trails (building on this)

---

## Glossary

**Base Directory** - One of three top-level dirs in Marketing Framework: /research/, /strategy/, /content/

**Domain** - Organizing unit within a base directory (e.g., "positioning", "voice")

**Execution** - Date-stamped folder containing iterative work (PLAN.md, TODO.md, output)

**Index** - Current approved state (RESEARCH.md or STRATEGY.md at domain level)

**Extension** - Platform/audience-specific addition to base strategy (extends, not replaces)

**Temporal** - Date-stamped folder pattern enabling iteration and history preservation

**Audit Trail** - Verifiable chain of markdown references from content → strategy → research → data

**Marketing Architect (MA)** - Human who approves updates from executions to indexes

---

**End of Class 3**
