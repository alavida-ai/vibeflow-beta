# Class 8: Hands-On Mastery (Putting It All Together)

**Tagline:** From understanding to execution

**Prerequisites:** Classes 1-7 (all previous material)

**Estimated Time:** 2.5 hours (1 hour reading, 1.5 hours hands-on)

---

## Class Overview

This is where everything comes together. You've learned about LLM fundamentals, context management, the three-layer framework, navigation patterns, audit trails, agent coordination, and workflow execution. Now you'll apply all of these concepts in an integrated, end-to-end case study.

**What makes this class different:**
- No new concepts - only integration of what you've learned
- Complete case study from start to finish
- Real examples from actual AMA workspace
- Troubleshooting guide for common issues
- Extension strategies for customizing AMA
- Mastery timeline from day 1 to 3+ months

**Learning Objectives:**
- Execute a complete Research → Strategy → Content workflow
- Apply all AMA patterns in an integrated scenario
- Make architectural decisions with confidence
- Troubleshoot common issues independently
- Extend AMA for new use cases

---

## Complete Case Study: Twitter Content Strategy from Scratch

Let's walk through a real-world scenario: You're launching a new product and need to create a Twitter content strategy. You'll need to research your competitive landscape, synthesize strategic positioning, and create on-brand content.

This case study demonstrates:
- **Class 3:** Three-layer framework (Research → Strategy → Content)
- **Class 4:** Navigation with entry points and extensions
- **Class 5:** Verifiable audit trails
- **Class 6:** Agent delegation and coordination
- **Class 7:** PLAN.md/TODO.md workflow execution

### Phase 1: Competitive Research (Research Layer)

**Goal:** Understand what content resonates with your target audience by analyzing successful competitors.

#### Step 1: Plan the Research Workflow

First, we create an execution folder and plan:

```bash
# Create timestamped execution folder
# Result: /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/
```

**Why This Matters for AMA:**
- **Temporal execution** (Class 3) - Date-stamped folder enables iteration and historical tracking
- **Adhoc domain** (Class 3) - For standalone research not tied to a specific domain index
- **With-slug format** (Class 3) - Human-readable context in folder name

#### Step 2: Create PLAN.md

Here's a real example from `/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/PLAN.md`:

```markdown
# Pontusab Competitive Analysis - Audience Intelligence

## Objective

Perform comprehensive audience intelligence analysis of X/Twitter user @pontusab
to understand what content resonates with their audience, identify engagement
patterns, extract strategic opportunities through value gap analysis, and generate
actionable insights about the target audience's needs and behavior.

## Step by Step Tasks

### 1. Content Scraping & Initial Segmentation

**Agent:** analyst-agent
**Input Artifacts:** None (fresh data collection)
**Output Artifact:** `artifacts/01-scraped-content.md`

Use the x-scraper MCP tool to collect tweets from @pontusab with these parameters:
- userName: "pontusab" (no @ symbol)
- maxTweets: 150
- lastMonths: 6
- queryType: "Top"
- minLikes: 50

### 2a. Content Pattern Analysis

**Agent:** analyst-agent
**Input Artifacts:** `artifacts/01-scraped-content.md`
**Output Artifact:** `artifacts/02a-content-patterns.md`

Identify recurring content formats, themes, and styles that consistently drive
engagement...

### 2b. Audience Behavior Analysis

**Agent:** analyst-agent
**Input Artifacts:** `artifacts/01-scraped-content.md`
**Output Artifact:** `artifacts/02b-audience-behavior.md`

Understand audience psychology, needs, and pain points through engagement
pattern analysis...

### 2c. Value Gap Identification

**Agent:** analyst-agent
**Input Artifacts:** `artifacts/01-scraped-content.md`
**Output Artifact:** `artifacts/02c-value-gaps.md`

Discover strategic opportunities through identification of underserved audience
needs and content gaps...

### 3. Strategic Insight Synthesis

**Agent:** strategist-agent
**Input Artifacts:**
- `artifacts/02a-content-patterns.md`
- `artifacts/02b-audience-behavior.md`
- `artifacts/02c-value-gaps.md`
**Output Artifact:** `artifacts/03-strategic-insights.md`

Transform all analysis into actionable strategic insights...
```

**Why This Matters for AMA:**

**Planning (Class 7):**
- Clear objective statement
- Phase breakdown with parallelization (2a, 2b, 2c can run simultaneously)
- Agent assignments for delegation
- Input/output artifacts specified
- Progressive disclosure (each agent gets only what it needs)

**Delegation Strategy (Class 6):**
- Phases 2a, 2b, 2c are parallel (same number, different letters)
- Each phase specifies which agent type to use
- Clear inputs and outputs for each phase

**Technical Deep Dive:**

The parallelization in Phase 2 is critical for performance:
```
Phase 1 completes → Produces artifacts/01-scraped-content.md
    ↓
Launch Phase 2a, 2b, 2c SIMULTANEOUSLY (all read 01-scraped-content.md)
    ↓
Wait for ALL to complete → Produces 02a, 02b, 02c artifacts
    ↓
Continue to Phase 3 (reads all three Phase 2 artifacts)
```

This reduces execution time from 3 sequential phases to 1 parallel batch.

#### Step 3: Execute the Plan

Now we execute using agent delegation (Class 6) and progress tracking (Class 7).

**Initialize TODO.md:**

```markdown
# Workflow Progress

**Workflow:** Pontusab Competitive Analysis - Audience Intelligence
**Execution Folder:** `/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/`
**Started:** 2025-10-30@17:06
**Status:** In Progress

## Task Progress

- [ ] **Phase 1:** Content Scraping & Initial Segmentation
- [ ] **Phase 2a:** Content Pattern Analysis
- [ ] **Phase 2b:** Audience Behavior Analysis
- [ ] **Phase 2c:** Value Gap Identification
- [ ] **Phase 3:** Strategic Insight Synthesis
- [ ] **Phase 4:** Final Research Synthesis

## Current Phase

**Working on:** Phase 1 - Content Scraping & Initial Segmentation
```

**Why This Matters for AMA:**
- **Resumability** (Class 7) - Clear state tracking enables workflow resumption
- **Transparency** (Class 7) - Both human and AI can see what's done/pending
- **One task in-progress** (Class 7) - Focus on current work, complete before moving forward

**Execute Phase 1:**

Operations Manager delegates to analyst-agent:

```
Task(
    subagent_type="analyst-agent",
    description="Execute Phase 1: Content Scraping & Initial Segmentation",
    prompt="""
Use the x-scraper MCP tool to collect tweets from @pontusab...

## Output

Write your findings to: /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/artifacts/01-scraped-content.md

## Execution Folder

Working directory: /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/
"""
)
```

**Why This Matters for AMA:**

**Progressive Disclosure (Class 2, 6):**
- Agent receives specific instructions (not entire PLAN.md)
- Output path specified (agent knows exactly where to write)
- Execution folder context provided (for relative path resolution)

**Delegation Pattern (Class 6):**
- Specialized agent (analyst-agent) for analysis task
- File path specification (not content dumping)
- Clear output expectations

**After Phase 1 completes, update TODO.md:**

```markdown
## Task Progress

- [x] **Phase 1:** Content Scraping & Initial Segmentation → [01-scraped-content.md](artifacts/01-scraped-content.md)
- [ ] **Phase 2a:** Content Pattern Analysis
- [ ] **Phase 2b:** Audience Behavior Analysis
- [ ] **Phase 2c:** Value Gap Identification
- [ ] **Phase 3:** Strategic Insight Synthesis
- [ ] **Phase 4:** Final Research Synthesis

## Current Phase

**Working on:** Phase 2a, 2b, 2c (parallel execution)
```

**Execute Phases 2a, 2b, 2c in PARALLEL:**

Launch all three simultaneously with multiple Task calls:

```
Task(
    subagent_type="analyst-agent",
    description="Execute Phase 2a: Content Pattern Analysis",
    prompt="""
{phase-2a-instructions}

## Context Files

Read the scraped content from:
- /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/artifacts/01-scraped-content.md

## Output

Write your analysis to: .../artifacts/02a-content-patterns.md
"""
)

Task(
    subagent_type="analyst-agent",
    description="Execute Phase 2b: Audience Behavior Analysis",
    prompt="""
{phase-2b-instructions}

## Context Files

Read the scraped content from:
- /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/artifacts/01-scraped-content.md

## Output

Write your analysis to: .../artifacts/02b-audience-behavior.md
"""
)

Task(
    subagent_type="analyst-agent",
    description="Execute Phase 2c: Value Gap Identification",
    prompt="""
{phase-2c-instructions}

## Context Files

Read the scraped content from:
- /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/artifacts/01-scraped-content.md

## Output

Write your analysis to: .../artifacts/02c-value-gaps.md
"""
)
```

**Why This Matters for AMA:**

**Parallel Execution (Class 7):**
- All three Task calls in single message
- All read same input (01-scraped-content.md)
- Each produces different output (02a, 02b, 02c)
- Wait for ALL to complete before proceeding

**Context Efficiency (Class 2, 6):**
- Each agent loads only what it needs (progressive disclosure)
- File paths passed, not content (agents read when ready)
- Focused context = higher quality output

**After all Phase 2 tasks complete:**

```markdown
## Task Progress

- [x] **Phase 1:** Content Scraping & Initial Segmentation → [01-scraped-content.md](artifacts/01-scraped-content.md)
- [x] **Phase 2a:** Content Pattern Analysis → [02a-content-patterns.md](artifacts/02a-content-patterns.md)
- [x] **Phase 2b:** Audience Behavior Analysis → [02b-audience-behavior.md](artifacts/02b-audience-behavior.md)
- [x] **Phase 2c:** Value Gap Identification → [02c-value-gaps.md](artifacts/02c-value-gaps.md)
- [ ] **Phase 3:** Strategic Insight Synthesis
- [ ] **Phase 4:** Final Research Synthesis

## Current Phase

**Working on:** Phase 3 - Strategic Insight Synthesis
```

**Execute Phase 3:**

Now delegate to strategist-agent (different specialist for synthesis):

```
Task(
    subagent_type="strategist-agent",
    description="Execute Phase 3: Strategic Insight Synthesis",
    prompt="""
{phase-3-instructions}

## Context Files

Read and synthesize findings from:
- /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/artifacts/02a-content-patterns.md
- /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/artifacts/02b-audience-behavior.md
- /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/artifacts/02c-value-gaps.md

## Output

Write your strategic synthesis to: .../artifacts/03-strategic-insights.md
"""
)
```

**Why This Matters for AMA:**

**Agent Specialization (Class 6):**
- Analyst-agent for research analysis (Phases 1, 2a, 2b, 2c)
- Strategist-agent for synthesis (Phase 3)
- Right specialist for right task

**Multiple Inputs (Class 6, 7):**
- Phase 3 consumes outputs from THREE parallel phases
- Clear dependency (Phase 3 waits for Phase 2 completion)
- Progressive disclosure (paths provided, agent loads when ready)

**Complete Final Phase:**

Main agent (not delegated) creates final RESEARCH.md:

```markdown
# Workflow Progress

**Status:** Completed Successfully

## Task Progress

- [x] **Phase 1:** Content Scraping & Initial Segmentation → [01-scraped-content.md](artifacts/01-scraped-content.md)
- [x] **Phase 2a:** Content Pattern Analysis → [02a-content-patterns.md](artifacts/02a-content-patterns.md)
- [x] **Phase 2b:** Audience Behavior Analysis → [02b-audience-behavior.md](artifacts/02b-audience-behavior.md)
- [x] **Phase 2c:** Value Gap Identification → [02c-value-gaps.md](artifacts/02c-value-gaps.md)
- [x] **Phase 3:** Strategic Insight Synthesis → [03-strategic-insights.md](artifacts/03-strategic-insights.md)
- [x] **Phase 4:** Final Research Synthesis → [RESEARCH.md](RESEARCH.md)

## Completion Summary

**Execution Time:** 2025-10-30@17:06
**All Phases Completed**

**Deliverables:**
- RESEARCH.md: Comprehensive audience intelligence report
- 5 artifacts with detailed analysis
- Evidence-based strategic recommendations
```

**Why This Matters for AMA:**

**Completion Tracking (Class 7):**
- All tasks marked complete
- Links to all artifacts (audit trail)
- Completion summary with timestamp
- Final deliverables documented

**Final Folder Structure:**

```
/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/
├── PLAN.md                           # Execution blueprint
├── TODO.md                           # Progress tracking
├── RESEARCH.md                       # Final deliverable
└── artifacts/
    ├── 01-scraped-content.md         # Phase 1 output
    ├── 02a-content-patterns.md       # Phase 2a output (parallel)
    ├── 02b-audience-behavior.md      # Phase 2b output (parallel)
    ├── 02c-value-gaps.md             # Phase 2c output (parallel)
    └── 03-strategic-insights.md      # Phase 3 output (synthesis)
```

### Phase 2: Strategy Synthesis (Strategy Layer)

**Goal:** Transform research findings into actionable voice and messaging strategy.

Now we move from Research → Strategy (Class 3: Three-layer framework).

#### Step 1: Create Strategy Execution

```
/brand/strategy/voice/2025-10-29@10:35/
├── PLAN.md
├── TODO.md
├── STRATEGY.md
└── artifacts/
```

**Why This Matters for AMA:**

**Layer Transition (Class 3):**
- Research findings → Strategy synthesis
- Different base directory (/strategy/ not /research/)
- Standard timestamp format (no slug for strategy domains)
- Same execution pattern (PLAN.md, TODO.md, artifacts/)

**Information Flow (Class 3):**
```
Research execution → Research index RESEARCH.md (MA approved)
                        ↓ synthesizes into
Strategy execution → Strategy index STRATEGY.md (MA approved)
```

Strategy reads from research INDEX (not research execution).

#### Step 2: Create PLAN.md for Voice Strategy

```markdown
# Voice Strategy Development

## Objective

Synthesize audience intelligence research from competitive analysis into
comprehensive voice strategy for Twitter, defining tone, style, and content
principles that resonate with target audience.

## Approach

Read research findings from competitive analysis to:
1. Extract audience preferences and engagement patterns
2. Define voice characteristics (tone, style, vocabulary)
3. Establish content principles and guidelines
4. Create examples of voice in action

## Step by Step Tasks

### 1. Research Analysis

**Agent:** strategist-agent
**Input Artifacts:**
- /brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md
**Output Artifact:** `artifacts/01-research-synthesis.md`

Review research findings and extract insights relevant to voice strategy...

### 2. Voice Definition

**Agent:** strategist-agent
**Input Artifacts:**
- `artifacts/01-research-synthesis.md`
**Output Artifact:** `artifacts/02-voice-definition.md`

Define voice characteristics across multiple dimensions...

### 3. Final Strategy

**Responsibility:** Main agent
**Input Artifacts:**
- `artifacts/01-research-synthesis.md`
- `artifacts/02-voice-definition.md`
**Output Artifact:** `STRATEGY.md`

Create comprehensive voice strategy document...
```

**Why This Matters for AMA:**

**Cross-Layer References (Class 5):**
- Strategy phase reads from research INDEX
- Clear audit trail: Strategy → Research → Data
- Markdown references create verifiable evidence chain

**Progressive Disclosure (Class 2, 6):**
- Phase 1 reads research findings only
- Phase 2 builds on Phase 1 synthesis
- Each phase loads only necessary context

#### Step 3: Execute Strategy Workflow

Execute following same pattern as research:
1. Initialize TODO.md
2. Delegate phases to strategist-agent
3. Track progress
4. Synthesize final STRATEGY.md

**Final Output Structure:**

```markdown
# Voice Strategy (Twitter)

## Voice Characteristics

### Tone
- **Primary:** Educational yet conversational
- **Secondary:** Vulnerable and authentic
- **Avoid:** Corporate, salesy, overly formal

[Evidence](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md#audience-behavior)

### Style
- Short, punchy sentences
- Active voice over passive
- Questions that provoke thought
- Personal pronouns (I, you, we)

[Evidence](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md#content-patterns)

## Content Principles

1. **Lead with value** - Hook must promise clear benefit
2. **Show, don't tell** - Concrete examples over abstract concepts
3. **Invite conversation** - End with questions or CTAs

[Evidence](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md#engagement-patterns)

## Examples

### Good Example
"Most marketing frameworks fail because they're built for agencies, not founders.

Here's what actually works when you're doing it yourself: [thread]"

### Why It Works
- Identifies pain point (agency frameworks don't fit)
- Promises alternative (what works for founders)
- Clear value proposition (thread format signals depth)

[Strategic rationale based on research findings...]
```

**Why This Matters for AMA:**

**Audit Trail (Class 5):**
- Every principle links back to research
- Research links back to raw data
- Complete chain: Content → Strategy → Research → Data
- Verifiable, defensible strategy decisions

**Markdown References (Class 4, 5):**
```markdown
[Evidence](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md#audience-behavior)
```
- Human-navigable (clickable in editors)
- AI-navigable (progressive disclosure)
- Relative paths from workspace root (collaboration-ready)

#### Step 4: Create Twitter Extension

Since we have Twitter-specific guidance, create an extension:

```
/brand/strategy/voice/
├── STRATEGY.md                    # Base voice (universal principles)
├── CHANGELOG.md
└── twitter/
    └── EXTENSION.md               # Twitter-specific additions
```

**twitter/EXTENSION.md:**

```markdown
# Voice Strategy - Twitter Extension

**Extends:** [/brand/strategy/voice/STRATEGY.md](/brand/strategy/voice/STRATEGY.md)

This extension adds Twitter-specific guidance to the base voice strategy.

## Platform Context

Twitter's unique characteristics:
- Character limits force concision
- Algorithm favors engagement (replies, bookmarks, retweets)
- Thread format enables depth
- Real-time conversation environment

## Twitter-Specific Voice Guidelines

### Thread Structure
- First tweet must hook (promise value)
- 5-7 tweets optimal (attention span)
- Each tweet can standalone
- End with CTA (reply, bookmark, follow)

### Engagement Tactics
- Ask questions to drive replies
- Use "Bookmark this if..." for saves
- Retweet with commentary (don't just RT)
- Respond to replies within 1 hour

### Format Adaptations
- Use line breaks for readability
- Numbered lists over bullet points
- Emoji sparingly (one per tweet max)
- Links in final tweet only

## Examples

[Twitter-specific examples...]
```

**Why This Matters for AMA:**

**Extension Pattern (Class 4):**
```
Base STRATEGY.md (universal) + Twitter EXTENSION.md (platform-specific) = Complete Context
```

**Composition Over Duplication:**
- Base strategy shared across all platforms
- Extensions add ONLY platform-specific details
- No duplication (DRY principle)
- Easy to maintain (change base, all platforms inherit)

**Reference to Parent:**
```markdown
**Extends:** [/brand/strategy/voice/STRATEGY.md](/brand/strategy/voice/STRATEGY.md)
```
Makes relationship explicit for both humans and AI.

### Phase 3: Content Creation (Content Layer)

**Goal:** Create actual Twitter content guided by voice and messaging strategy.

Final layer: Strategy → Content (Class 3).

#### Step 1: Create Content Execution

```
/brand/content/twitter-posts/2025-10-31@12:29-ai-in-marketing/
├── PLAN.md
├── TODO.md
├── CONTENT.md
└── artifacts/
```

**Why This Matters for AMA:**

**Content Domain (Class 3):**
- With-slug format (2025-10-31@12:29-ai-in-marketing)
- Descriptive slug provides context
- Separate execution for each piece/batch of content
- Lives in /content/ base directory

#### Step 2: Create PLAN.md for Content Creation

```markdown
# Twitter Thread: AI in Marketing

## Objective

Create a 5-7 tweet thread about AI in marketing that demonstrates our voice
strategy and resonates with our target audience (marketing founders struggling
with AI adoption).

## Approach

Load strategy context (voice, messaging) and create content that:
1. Hooks with relatable pain point
2. Provides actionable framework
3. Invites conversation
4. Demonstrates our voice principles

## Step by Step Tasks

### 1. Strategy Review

**Responsibility:** Main agent
**Input Artifacts:**
- /brand/strategy/voice/STRATEGY.md
- /brand/strategy/voice/twitter/EXTENSION.md
- /brand/strategy/messaging/STRATEGY.md
**Output Artifact:** `artifacts/01-strategy-context.md`

Load and summarize relevant strategy guidance for this content piece...

### 2. Content Drafting

**Agent:** content-creator-agent
**Input Artifacts:**
- `artifacts/01-strategy-context.md`
**Output Artifact:** `artifacts/02-content-draft.md`

Draft 5-7 tweet thread following strategy guidelines...

### 3. Final Content

**Responsibility:** Main agent
**Input Artifacts:**
- `artifacts/02-content-draft.md`
**Output Artifact:** `CONTENT.md`

Finalize content with metadata and publishing notes...
```

**Why This Matters for AMA:**

**Strategy Loading (Class 2, 4, 6):**
- Phase 1 loads strategy files (progressive disclosure)
- Multiple strategy files (voice, messaging)
- Includes Twitter extension (platform-specific)
- Creates summary for content agent (focused context)

**Layer Separation (Class 3):**
- Content execution loads from strategy INDEX
- Strategy INDEX approved by Marketing Architect
- Clear boundary: content uses approved strategy (not executions)

#### Step 3: Execute Content Workflow

**Phase 1: Strategy Review (Main Agent)**

```markdown
# Strategy Context Summary

## Voice Guidelines

From [/brand/strategy/voice/STRATEGY.md](/brand/strategy/voice/STRATEGY.md):
- Educational yet conversational tone
- Vulnerable and authentic
- Short, punchy sentences
- Questions that provoke thought

From [/brand/strategy/voice/twitter/EXTENSION.md](/brand/strategy/voice/twitter/EXTENSION.md):
- First tweet must hook
- 5-7 tweets optimal
- Ask questions to drive replies
- Bookmark prompt for saves

## Messaging Principles

From [/brand/strategy/messaging/STRATEGY.md](/brand/strategy/messaging/STRATEGY.md):
- Lead with pain point (agency frameworks don't fit founders)
- Position AI as enabler, not replacement
- Focus on practical application, not theory

## Content Requirements

- Thread length: 5-7 tweets
- Topic: AI in marketing
- Audience: Marketing founders
- Goal: Demonstrate thought leadership, drive engagement
```

**Why This Matters for AMA:**

**Progressive Disclosure in Action (Class 2, 6):**
- Main agent loads full strategy files
- Creates focused summary for content agent
- Content agent gets only what it needs (not full strategy)
- Summary includes evidence links (audit trail)

**Phase 2: Content Drafting (Delegated to content-creator-agent)**

```
Task(
    subagent_type="content-creator-agent",
    description="Execute Phase 2: Content Drafting",
    prompt="""
Create a 5-7 tweet thread about AI in marketing following the strategy context.

## Context Files

Read the strategy summary from:
- /brand/content/twitter-posts/2025-10-31@12:29-ai-in-marketing/artifacts/01-strategy-context.md

## Output

Write your draft to: .../artifacts/02-content-draft.md

## Requirements

- Hook with relatable pain point
- Provide actionable framework
- End with engagement CTA
- Follow voice guidelines in strategy context
"""
)
```

**Phase 3: Final Content (Main Agent)**

**artifacts/02-content-draft.md:**

```markdown
# Twitter Thread Draft: AI in Marketing

## Thread

**Tweet 1 (Hook)**
Most marketing teams try to adopt AI by replacing humans.

That's backwards.

Here's how to use AI as your force multiplier (not your replacement):

**Tweet 2**
The mistake: "Let's use ChatGPT to write all our content"
The reality: Generic, soulless output that tanks engagement

AI should amplify your expertise, not replace it.

**Tweet 3**
Think of AI as your research assistant:
- Competitive analysis in minutes (not weeks)
- Audience insights from engagement data
- Strategy patterns you'd miss manually

You provide the judgment. AI provides the speed.

**Tweet 4**
The framework that works:
1. Research → AI scrapes & summarizes
2. Strategy → You synthesize & decide
3. Content → You create (AI as editor)

Human insight at every layer. AI at the execution layer.

**Tweet 5**
Example: Competitive research used to take 40 hours.
Now it takes 2 hours (with better depth).

Same brain, 20x output.

**Tweet 6**
The difference?
- Bad AI: Replace human with robot
- Good AI: Augment human with superpowers

You stay in creative control. AI handles grunt work.

**Tweet 7**
Want to see this in action?

We built an open-source marketing system that shows exactly how to orchestrate AI agents for research, strategy, and content.

[Link]

Bookmark this if you're exploring AI for marketing.

## Strategy Alignment

- Voice: Educational + conversational ✓
- Pain point lead: "replacing humans" mistake ✓
- Actionable framework: 3-layer approach ✓
- Twitter-specific: Thread structure, bookmark CTA ✓

## Engagement Predictions

- Hook targets common mistake (high relatability)
- Framework is actionable (bookmark-worthy)
- Examples provide social proof
- CTA has dual purpose (bookmark + click)
```

**Final CONTENT.md:**

```markdown
# Twitter Thread: AI in Marketing

**Created:** 2025-10-31@12:29
**Status:** Ready for review
**Slug:** ai-in-marketing

## Content

[Thread content from draft...]

## Metadata

- **Platform:** Twitter/X
- **Format:** Thread (7 tweets)
- **Target Audience:** Marketing founders
- **Goal:** Thought leadership + engagement
- **CTA:** Bookmark + link click

## Strategy Alignment

This content demonstrates principles from:
- [Voice Strategy](/brand/strategy/voice/STRATEGY.md): Educational yet conversational tone
- [Voice Strategy - Twitter](/brand/strategy/voice/twitter/EXTENSION.md): Thread structure, bookmark CTA
- [Messaging Strategy](/brand/strategy/messaging/STRATEGY.md): AI as enabler positioning

## Publishing Notes

- Post during high-engagement window (9-11am ET)
- Monitor replies in first hour (respond quickly)
- Potential follow-up: If high engagement, create detailed guide

## Evidence Trail

Strategy → [Voice](/brand/strategy/voice/STRATEGY.md) → [Research](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md)
```

**Why This Matters for AMA:**

**Complete Audit Trail (Class 5):**
```
Content (this thread)
    ↓ guided by
Strategy (voice, messaging)
    ↓ synthesized from
Research (competitive analysis)
    ↓ analyzed from
Data (scraped tweets)
```

Every piece of content traces back through strategy to research to raw data.

**Strategy Alignment Documentation (Class 5):**
- Explicit links to strategy documents
- Demonstrates how content follows principles
- Verifiable claims (click through to see evidence)

**Metadata for Execution (Class 3):**
- Publishing notes (when, how to engage)
- Success criteria implicit (bookmark + click)
- Follow-up opportunities identified

### Complete Workflow Summary

Let's review what we just did through the lens of each class:

**Class 1 (LLM Fundamentals):**
- Avoided context overflow by breaking into phases
- Used focused context for each agent (not dumping everything)
- Managed token budgets through progressive disclosure

**Class 2 (Context/Files):**
- File-based system enabled selective loading
- Each agent read only necessary files
- Progressive disclosure throughout all three layers

**Class 3 (Three-Layer Framework):**
- Research → Strategy → Content flow maintained
- Temporal executions with date-stamped folders
- Index vs execution distinction (strategy reads from research index)
- Domain organization (adhoc for research, voice/messaging for strategy, twitter-posts for content)

**Class 4 (Navigation):**
- Entry point files (RESEARCH.md, STRATEGY.md, CONTENT.md)
- Extension pattern (twitter/EXTENSION.md)
- Markdown references throughout
- Relative paths from workspace root

**Class 5 (Audit Trails):**
- Complete evidence chain from content → strategy → research → data
- Markdown references create verifiable links
- Strategy alignment documentation in CONTENT.md
- Defensible decisions with supporting evidence

**Class 6 (Agent Coordination):**
- Operations Manager orchestrated (didn't execute)
- Specialized agents (analyst-agent, strategist-agent, content-creator-agent)
- Progressive disclosure in delegation (paths not content)
- Context-aware delegation (right agent for right task)

**Class 7 (Workflow Execution):**
- PLAN.md/TODO.md pattern throughout
- Phase breakdown with parallelization
- Artifact management (numbered, organized)
- Progress tracking and resumability
- One task in-progress principle

---

## Troubleshooting Guide

Common issues you'll encounter and how to solve them:

### Issue 1: Context Overflow

**Symptoms:**
- Agent responses become generic or unfocused
- Agent "forgets" important details mid-task
- Output quality degrades after initial phases

**Root Cause:**
Too much context loaded at once (Class 1, 2)

**Solution:**
1. Check if you're dumping entire files into agent prompts
2. Use file paths instead (progressive disclosure)
3. Create focused summaries for agents (like strategy-context.md in content creation)
4. Break complex phases into smaller sub-phases

**Example Fix:**

Bad:
```
Task(
    prompt=f"""
Here's the entire strategy document:
{full_strategy_content}

Here's the entire research document:
{full_research_content}

Now create content...
"""
)
```

Good:
```
Task(
    prompt="""
Read strategy context from:
- /brand/content/.../artifacts/01-strategy-context.md

The strategy context file contains a focused summary of relevant guidelines.
"""
)
```

### Issue 2: Broken Audit Trail

**Symptoms:**
- Can't trace content back to research
- Strategy claims lack supporting evidence
- No clear source for decisions

**Root Cause:**
Missing or incorrect markdown references (Class 5)

**Solution:**
1. Add markdown references: `[claim text](/path/to/file.md)`
2. Use relative paths from workspace root
3. Link strategy → research, content → strategy
4. Verify links are clickable in editor

**Example Fix:**

Bad:
```markdown
Our audience prefers educational content.
```

Good:
```markdown
Our audience prefers educational content, as evidenced by [38-40% bookmark-to-like ratio in competitive analysis](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md#engagement-patterns).
```

### Issue 3: Agent Gets Wrong Context

**Symptoms:**
- Agent references information not in its input files
- Agent output doesn't match instructions
- Agent seems confused about task

**Root Cause:**
Incorrect file paths or missing input artifacts (Class 6, 7)

**Solution:**
1. Verify input artifact paths are absolute and correct
2. Check previous phases completed successfully
3. Confirm artifacts/ directory exists
4. Read artifact files to verify content before delegating

**Example Fix:**

```
# Before delegating Phase 2, verify Phase 1 artifact exists:

phase_1_artifact = "/brand/research/.../artifacts/01-competitors.md"

# Read to verify
content = read_file(phase_1_artifact)

# If file not found, diagnose:
# - Did Phase 1 complete?
# - Is path correct (absolute from workspace root)?
# - Did Phase 1 agent write to expected location?
```

### Issue 4: Parallel Phases Don't Run in Parallel

**Symptoms:**
- Phases marked parallel (2a, 2b) run sequentially
- Execution time longer than expected
- TODO.md shows phases completing one at a time

**Root Cause:**
Task calls not in same message (Class 7)

**Solution:**
Launch ALL parallel phases in single message with multiple Task calls

**Example Fix:**

Bad (sequential):
```
# Message 1
Task(subagent_type="analyst", prompt="Phase 2a...")

# Wait for response, then Message 2
Task(subagent_type="analyst", prompt="Phase 2b...")
```

Good (parallel):
```
# Single message with multiple Task calls
Task(subagent_type="analyst", prompt="Phase 2a...")
Task(subagent_type="analyst", prompt="Phase 2b...")
Task(subagent_type="analyst", prompt="Phase 2c...")

# System launches all three simultaneously
```

### Issue 5: Can't Resume Workflow

**Symptoms:**
- TODO.md out of sync with actual progress
- Unclear which phase to restart from
- No record of what was completed

**Root Cause:**
TODO.md not updated immediately after each phase (Class 7)

**Solution:**
1. Update TODO.md after EVERY phase completion
2. Mark task complete immediately (don't batch)
3. Add notes for any issues encountered
4. Keep "Current Phase" section accurate

**Example Fix:**

After each phase:
```markdown
## Task Progress

- [x] **Phase 1:** Content Scraping → [01-scraped-content.md](artifacts/01-scraped-content.md)
- [x] **Phase 2a:** Pattern Analysis → [02a-patterns.md](artifacts/02a-patterns.md)
- [ ] **Phase 2b:** Audience Analysis    ← Currently working
- [ ] **Phase 2c:** Value Gaps

## Current Phase

**Working on:** Phase 2b - Audience Behavior Analysis
**Started:** 2025-10-30@17:15

## Notes

- Phase 2a took longer than expected (large dataset)
- Consider splitting Phase 2b into sub-phases if similar
```

### Issue 6: Strategy Doesn't Reference Research

**Symptoms:**
- Strategy feels like opinions, not evidence-based
- Can't verify where insights came from
- Marketing Architect questions strategy decisions

**Root Cause:**
Strategy synthesis didn't load research findings (Class 3, 5)

**Solution:**
1. Strategy execution must read from research INDEX
2. Add markdown references in STRATEGY.md
3. Quote specific findings with links
4. Create audit trail section

**Example Fix:**

Bad:
```markdown
## Voice Characteristics

Audiences prefer educational content with authentic tone.
```

Good:
```markdown
## Voice Characteristics

### Educational Yet Conversational

Research shows [38-40% bookmark-to-like ratio for educational content](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md#content-patterns), indicating audiences save valuable information for later reference.

Combine educational value with [conversational tone that drives 2.3x more replies](/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/RESEARCH.md#engagement-patterns) than formal corporate voice.
```

### Issue 7: Extension Duplicates Base Strategy

**Symptoms:**
- Extension contains same information as parent STRATEGY.md
- Hard to maintain (changes needed in two places)
- Unclear what's universal vs platform-specific

**Root Cause:**
Misunderstanding of extension pattern (Class 4)

**Solution:**
- Extensions are ADDITIVE ONLY (extend, not replace)
- Base STRATEGY.md = universal principles
- EXTENSION.md = platform/audience-specific details ONLY
- Reference parent explicitly

**Example Fix:**

Bad EXTENSION.md:
```markdown
# Voice Strategy - Twitter

## Tone
Educational yet conversational    ← Duplicates base strategy

## Twitter Guidelines
...
```

Good EXTENSION.md:
```markdown
# Voice Strategy - Twitter Extension

**Extends:** [/brand/strategy/voice/STRATEGY.md](/brand/strategy/voice/STRATEGY.md)

This extension adds Twitter-specific guidance. For universal voice principles, see base strategy.

## Twitter-Specific Adaptations

Base strategy establishes educational+conversational tone. On Twitter, this manifests as:
- First tweet must hook (promise value in <280 chars)
- Thread format for depth (5-7 tweets)
- Questions to drive replies (algorithm favors engagement)

[Only Twitter-specific details, assumes base strategy loaded]
```

---

## Extension Strategies

How to customize AMA for your specific needs:

### Strategy 1: Add New Research Domain

**When to use:** You have a new area of research that will be ongoing (not one-time).

**How to implement:**

1. Create domain directory:
```
/brand/research/customer-interviews/
├── RESEARCH.md          # Will be created after first execution
└── CHANGELOG.md         # Will be created after first execution
```

2. Run first research execution:
```
/brand/research/customer-interviews/2025-11-15@14:30/
├── PLAN.md
├── TODO.md
├── RESEARCH.md
└── artifacts/
```

3. After execution, Marketing Architect approves moving execution RESEARCH.md to domain index:
```
/brand/research/customer-interviews/
├── RESEARCH.md          ← Promoted from execution (MA approved)
├── CHANGELOG.md         ← Tracks this update
└── 2025-11-15@14:30/    ← Execution preserved
```

4. Future research in this domain updates the index, preserving historical executions.

**Why This Matters:**
- Domain indexes accumulate knowledge over time
- Historical executions preserved for comparison
- Strategy synthesis reads from index (approved state)
- Clear separation: executions = work, index = approved truth

### Strategy 2: Add New Strategy Domain

**When to use:** You need strategy guidance for an area not currently covered.

**How to implement:**

1. Identify what research this strategy will synthesize:
```
Research domain(s) → Strategy domain
```

Example: `competitive-analysis` research → `positioning` strategy

2. Create strategy domain:
```
/brand/strategy/positioning/
├── STRATEGY.md          # Will be created after first execution
└── CHANGELOG.md         # Will be created after first execution
```

3. Run strategy execution (synthesize from research):
```
/brand/strategy/positioning/2025-11-15@15:00/
├── PLAN.md              # Specifies which research to read
├── TODO.md
├── STRATEGY.md
└── artifacts/
```

4. Marketing Architect approves, execution STRATEGY.md becomes domain index.

**Key Principle:**
Strategy ALWAYS synthesizes from research (never skips that layer).

### Strategy 3: Create Platform/Audience Extension

**When to use:** You need platform or audience-specific variations of base strategy.

**How to implement:**

1. Ensure base strategy exists:
```
/brand/strategy/voice/STRATEGY.md    # Universal principles
```

2. Create extension subdirectory:
```
/brand/strategy/voice/linkedin/
└── EXTENSION.md
```

3. Extension contains ONLY platform-specific additions:
```markdown
# Voice Strategy - LinkedIn Extension

**Extends:** [/brand/strategy/voice/STRATEGY.md](/brand/strategy/voice/STRATEGY.md)

## Platform Context
LinkedIn is professional network, not real-time conversation...

## LinkedIn-Specific Voice Guidelines
Base voice (educational+conversational) adapts for LinkedIn:
- Longer form allowed (3000 chars vs Twitter's 280)
- Professional examples (case studies, data)
- Credibility signals (credentials, social proof)
[Only additions, assumes base loaded]
```

**Pattern:**
```
Base STRATEGY.md (load this) + Extension EXTENSION.md (load this) = Complete Context
```

**When content agent needs LinkedIn voice:**
1. Load `/brand/strategy/voice/STRATEGY.md` (universal)
2. Load `/brand/strategy/voice/linkedin/EXTENSION.md` (platform-specific)
3. Apply combined guidance

### Strategy 4: Create Custom Workflow Skill

**When to use:** You have a workflow you'll repeat frequently (competitive analysis, content series, etc.).

**How to implement:**

1. Create skill directory:
```
/.claude/skills/competitive-analysis/
├── SKILL.md             # Skill overview
├── WORKFLOW.md          # Template workflow
└── instructions/
    ├── phase-1-scraping.md
    ├── phase-2a-analysis.md
    └── phase-3-synthesis.md
```

2. Define SKILL.md:
```markdown
# Competitive Analysis Skill

Execute comprehensive competitive analysis workflow for understanding target audience through competitor content analysis.

## Usage

/skill competitive-analysis @username

## Workflow

See [WORKFLOW.md](WORKFLOW.md) for complete workflow template.
```

3. Create WORKFLOW.md (template PLAN.md):
```markdown
# Competitive Analysis Workflow Template

Use this template when executing competitive analysis.

## Objective Template

Perform audience intelligence analysis of [TARGET] to understand what content resonates with their audience and identify strategic opportunities.

## Step by Step Tasks

### 1. Content Scraping
[Standard phase definition...]

### 2a. Pattern Analysis
[Standard phase definition...]

[Complete workflow template...]
```

4. Create phase instruction files that can be reused:
```markdown
# Phase 2a: Content Pattern Analysis

Analyze scraped content to identify patterns across:

1. **Content Formats:**
   - Threads vs single tweets
   - Media usage
   - Post structures

[Complete, reusable instructions for this phase...]
```

5. Use skill in workflow:
- Load WORKFLOW.md as template
- Customize for specific target
- Reference instruction files in PLAN.md
- Execute standard workflow

**Benefits:**
- Repeatable workflows for common tasks
- Consistent execution across iterations
- Easy onboarding (follow the template)
- Continuous improvement (update skill, all executions benefit)

### Strategy 5: Add Custom Sub-Agent

**When to use:** You need specialized agent for specific domain expertise.

**How to implement:**

1. Create agent definition:
```
/.claude/agents/seo-specialist-agent.md
```

2. Define agent identity, capabilities, constraints:
```markdown
# SEO Specialist Agent

## Identity

You are an SEO specialist focused on technical SEO, keyword research, and content optimization.

## Capabilities

- Technical SEO audits
- Keyword research and mapping
- Content optimization for search
- Competitor ranking analysis

## Constraints

- Focus on technical SEO (not content creation)
- Provide data-driven recommendations
- Follow current Google guidelines
- Consider user intent, not just keywords

## Context Loading

You work within the AMA framework. Load only files specified in delegation:
- Read input artifacts from paths provided
- Write output to specified artifact path
- Follow progressive disclosure pattern
```

3. Use in workflow delegation:
```
Task(
    subagent_type="seo-specialist-agent",
    description="Execute Phase 2: SEO Analysis",
    prompt="""
{phase-2-instructions}

## Context Files
- /brand/research/.../artifacts/01-content-inventory.md

## Output
- /brand/research/.../artifacts/02-seo-analysis.md
"""
)
```

**Benefits:**
- Specialized expertise for domain-specific tasks
- Clear capability boundaries
- Reusable across workflows
- Maintains progressive disclosure pattern

---

## Mastery Timeline

Here's what to expect as you gain experience with AMA:

### Immediate (Day 1 Post-Course)

**You can now:**
- Navigate the AMA workspace confidently
- Read and understand STRATEGY.md, RESEARCH.md files
- Follow audit trails from content → strategy → research
- Identify when to delegate to specialist agents
- Recognize execution vs index distinction

**Practice tasks:**
1. Explore existing research executions
2. Follow markdown references from strategy to research
3. Read PLAN.md and TODO.md files to understand workflows
4. Identify which agent type was used for each phase

**Success indicators:**
- Can explain what's in each base directory (/research/, /strategy/, /content/)
- Can follow an audit trail from content back to data
- Understand why phases are numbered the way they are (1, 2a, 2b, 3)

### Within First Week

**You can now:**
- Execute simple research workflows (single target, straightforward analysis)
- Create new content using existing strategy
- Organize findings into proper domains
- Use PLAN.md/TODO.md for multi-step tasks
- Make basic delegation decisions

**Practice tasks:**
1. Execute one-target competitive analysis
2. Create Twitter content following voice strategy
3. Update TODO.md as you work through phases
4. Create proper markdown references in outputs

**Success indicators:**
- Completed at least one end-to-end research workflow
- Created content that demonstrates strategy alignment
- TODO.md accurately reflects your workflow progress
- Comfortable delegating straightforward tasks to sub-agents

### Within First Month

**You can now:**
- Plan and execute complete research projects
- Synthesize research into strategy documents
- Generate on-brand content across platforms
- Extend AMA with new domains or workflows
- Make architectural decisions independently
- Troubleshoot common issues without help

**Practice tasks:**
1. Multi-target competitive analysis with parallel phases
2. Strategy synthesis from multiple research sources
3. Create extension for new platform
4. Design custom workflow for repeated task
5. Resume interrupted workflow from specific phase

**Success indicators:**
- Executed 5+ complete workflows (research → strategy → content)
- Created at least one extension (platform or audience-specific)
- Resolved workflow issues independently
- Made delegation decisions that optimize for context efficiency
- Understand when to parallelize vs sequence phases

### Mastery Level (3+ Months)

**You can now:**
- Design custom workflows for unique needs
- Optimize performance for large knowledge bases
- Teach AMA concepts to others
- Contribute improvements to the system
- Create new sub-agents and skills
- Make sophisticated architectural decisions

**Advanced capabilities:**
1. **Custom Skill Creation** - Package workflows for reuse
2. **Agent Specialization** - Define new sub-agents for specific domains
3. **Architecture Decisions** - Domain structure, extension strategies
4. **Performance Optimization** - Context budgets, phase boundaries
5. **System Evolution** - Identify patterns, propose improvements

**Mastery indicators:**
- Created at least one reusable skill
- Defined custom sub-agent for specialized task
- Taught AMA to another Marketing Architect
- Contributed documentation or improvements
- Handle edge cases and complex scenarios confidently

---

## Why This All Matters: The Big Picture

Let's step back and see why all these patterns exist.

### The Core Problem

Traditional marketing systems fall into two traps:

**Trap 1: Context Dumping**
"Here's our entire brand guidelines doc (50 pages). Now write a tweet."

Result: Generic output, no strategic depth, forgot half the guidelines.

**Trap 2: Manual Synthesis**
Human does all analysis, agents just execute simple tasks.

Result: Bottlenecked by human capacity, can't scale research.

### The AMA Solution

**Progressive Disclosure + Agent Orchestration + Verifiable Evidence**

1. **Progressive Disclosure** (Class 2)
   - Agents load only what they need, when they need it
   - File paths instead of content dumping
   - High signal-to-noise ratio = better output

2. **Agent Orchestration** (Class 6)
   - Operations Manager delegates to specialists
   - Each agent focused on one responsibility
   - Parallel execution where possible
   - Context passed efficiently through files

3. **Three-Layer Framework** (Class 3)
   - Research → Strategy → Content (never skip)
   - Temporal executions preserve history
   - Index files represent approved truth
   - Clear information flow

4. **Verifiable Evidence** (Class 5)
   - Every claim traces to research
   - Research traces to raw data
   - Markdown references create audit trail
   - Defensible, transparent decisions

5. **Workflow Execution** (Class 7)
   - PLAN.md defines approach
   - TODO.md tracks progress
   - Artifacts preserve phase outputs
   - Resumable, transparent, auditable

### The Result

**You can now:**
- Execute 40-hour research projects in 2 hours (with better depth)
- Create on-brand content at scale (not generic AI slop)
- Defend every strategy decision with evidence
- Resume interrupted workflows without context loss
- Scale knowledge work without scaling team size

**Because:**
- AI agents handle grunt work (scraping, initial analysis)
- Humans provide judgment at every layer (synthesis, strategy, editorial)
- Progressive disclosure prevents context overflow
- Temporal executions enable iteration and improvement
- Evidence chains ensure defensibility

---

## Capstone Exercise

Time to put it all together. Complete this end-to-end workflow:

### Exercise: Launch a New Product on Twitter

**Scenario:**
You're launching a new SaaS product for marketing teams. You need to:
1. Research what content resonates with your target audience
2. Develop voice and messaging strategy
3. Create launch content (announcement thread + follow-up content)

**Requirements:**
- Complete Research → Strategy → Content workflow
- Use proper domain organization
- Follow PLAN.md/TODO.md pattern
- Maintain audit trails throughout
- Use agent delegation appropriately

### Step 1: Competitive Research (2 hours)

**Task:** Analyze 2-3 competitors in your space to understand audience behavior.

**Deliverables:**
- Execution folder: `/brand/research/adhoc/[timestamp]-competitor-analysis/`
- PLAN.md with 4-5 phases
- At least one parallel phase (2a, 2b)
- Final RESEARCH.md with audit trail
- Artifacts documenting each phase

**Evaluation criteria:**
- [ ] Proper folder structure (timestamp with slug)
- [ ] PLAN.md with clear phase breakdown
- [ ] TODO.md updated after each phase
- [ ] Parallel phases identified and executed simultaneously
- [ ] Artifacts properly numbered and organized
- [ ] Final RESEARCH.md synthesizes all findings
- [ ] Evidence trail from findings to raw data

### Step 2: Strategy Synthesis (1.5 hours)

**Task:** Synthesize research into voice and messaging strategy for Twitter.

**Deliverables:**
- Voice strategy execution: `/brand/strategy/voice/[timestamp]/`
- Messaging strategy execution: `/brand/strategy/messaging/[timestamp]/`
- Twitter extension: `/brand/strategy/voice/twitter/EXTENSION.md`
- STRATEGY.md files reference research
- Markdown references throughout

**Evaluation criteria:**
- [ ] Strategy executions in proper domains
- [ ] PLAN.md specifies research inputs
- [ ] STRATEGY.md references research findings
- [ ] Twitter extension extends (not duplicates) base
- [ ] Clear rationale for each principle
- [ ] Evidence links clickable and correct

### Step 3: Launch Content (1 hour)

**Task:** Create announcement thread and 3 follow-up content pieces.

**Deliverables:**
- Content execution: `/brand/content/twitter-posts/[timestamp]-launch-announcement/`
- CONTENT.md with announcement thread
- 3 additional content pieces (follow-up angles)
- Strategy alignment documentation
- Publishing notes

**Evaluation criteria:**
- [ ] Content folder with timestamp + slug
- [ ] PLAN.md loads strategy context
- [ ] Content demonstrates strategy alignment
- [ ] Markdown references to strategy
- [ ] Publishing notes included
- [ ] Follow-up pieces planned

### Step 4: Complete Audit Trail (30 minutes)

**Task:** Verify complete evidence chain.

**Test:**
1. Start with CONTENT.md
2. Follow markdown references to strategy
3. Follow strategy references to research
4. Follow research references to raw data
5. Verify every link works

**Success:**
- [ ] Can trace launch content → voice strategy → research → data
- [ ] Can trace messaging → research insights → raw tweets
- [ ] All markdown references are clickable
- [ ] No broken links in audit trail
- [ ] Clear narrative from data to content

### Bonus Challenges (Advanced)

**Challenge 1: Custom Workflow Skill**
Package your competitive analysis workflow as reusable skill.

**Challenge 2: New Sub-Agent**
Define specialized agent for product positioning analysis.

**Challenge 3: Performance Optimization**
Identify and implement one performance improvement (phase splitting, better parallelization, context reduction).

---

## Course Conclusion

Congratulations! You've completed the AMA Fundamentals Course.

### What You've Learned

**Technical Mastery:**
- How LLMs process information and their limitations
- File-based context management through progressive disclosure
- Three-layer marketing framework (Research → Strategy → Content)
- Navigation patterns (entry points, extensions, references)
- Verifiable audit trails (evidence chains)
- Agent coordination and delegation
- Workflow execution patterns (PLAN.md/TODO.md)

**Strategic Understanding:**
- Why context dumping fails
- When to delegate vs execute directly
- How to maintain focus through specialization
- Why evidence-based strategy matters
- How to scale knowledge work with AI

**Practical Skills:**
- Navigate AMA workspace confidently
- Execute complete research workflows
- Synthesize strategy from research
- Create on-brand content at scale
- Troubleshoot common issues
- Extend AMA for new use cases

### The Path Forward

**Immediate next steps:**
1. Complete the capstone exercise
2. Execute one real workflow in your domain
3. Review your work using mastery timeline checklist
4. Identify one area to deepen (agent coordination, strategy synthesis, etc.)

**First month goals:**
1. Execute 5+ complete workflows
2. Create at least one extension
3. Teach one AMA concept to colleague
4. Contribute one improvement (documentation, pattern, skill)

**Mastery journey:**
- Month 1-3: Execute standard workflows repeatedly
- Month 3-6: Customize and extend for your needs
- Month 6+: Teach others, contribute improvements, push boundaries

### Key Principles to Remember

1. **Progressive Disclosure** - Load what's needed, when needed
2. **Layer Respect** - Research → Strategy → Content (never skip)
3. **Evidence-Based** - Every claim traces to data
4. **Focused Context** - High signal-to-noise ratio
5. **Temporal Execution** - Preserve history, enable iteration
6. **Clear Delegation** - Right agent, right task, right context
7. **Transparent Progress** - TODO.md keeps everyone aligned

### Resources for Continued Learning

**Core Documentation:**
- `/CLAUDE.md` - Complete AMA methodology reference
- `/.claude/skills/agentic-orchestrating/` - Workflow orchestration patterns
- `/MANIFESTO.md` - System philosophy and vision

**Real Examples:**
- `/brand/research/` - Research execution examples
- `/brand/strategy/` - Strategy synthesis examples
- `/brand/content/` - Content creation examples

**Community:**
- [GitHub Discussions] - Ask questions, share patterns
- [AMA Wiki] - Community-contributed guides
- [Example Workspaces] - Reference implementations

### Final Thoughts

AMA isn't just a tool - it's a methodology for thinking about how humans and AI collaborate on complex knowledge work.

The patterns you've learned (progressive disclosure, agent coordination, verifiable evidence) apply beyond marketing. They're principles for any domain where:
- Context matters but context overflow kills quality
- Multiple specialists need to collaborate
- Decisions require defensible evidence
- Knowledge accumulates over time
- Work needs to scale without losing quality

You now have a framework for:
- Managing AI agent capabilities and limitations
- Structuring information for both humans and AI
- Maintaining evidence chains and audit trails
- Orchestrating complex multi-phase workflows
- Scaling knowledge work sustainably

**Most importantly:** You understand WHY these patterns exist, which means you can adapt them for your specific needs.

Welcome to the AMA community. Now go build something remarkable.

---

## Appendix: Quick Reference

### Essential File Locations

**Core Documentation:**
- `/CLAUDE.md` - Complete methodology
- `/.claude/skills/agentic-orchestrating/SKILL.md` - Orchestration patterns

**Framework Structure:**
```
/brand/
├── /research/          → Factual gathering
├── /strategy/          → Strategic synthesis
└── /content/           → Final deliverables
```

**Execution Pattern:**
```
/{base-dir}/{domain}/{YYYY-MM-DD@HH:mm[-slug]}/
├── PLAN.md           # Approach
├── TODO.md           # Progress
├── {TYPE}.md         # Output
└── artifacts/        # Phase outputs
```

### Common Commands

**Create execution folder:**
```bash
python .claude/skills/orchestration/scripts/create_execution_folder.py [name]
```

**Key File Paths:**
- Research index: `/brand/research/{domain}/RESEARCH.md`
- Strategy index: `/brand/strategy/{domain}/STRATEGY.md`
- Extension: `/brand/strategy/{domain}/{platform}/EXTENSION.md`

### Decision Trees

**Should I create a new domain?**
- Will this be ongoing (not one-time)? → Yes: New domain
- Is it related to existing domain? → Yes: Update existing
- Is it standalone research? → Yes: Use /research/adhoc/

**Should I create an extension?**
- Is this platform-specific? → Yes: Extension
- Is this audience-specific? → Yes: Extension
- Would it apply universally? → No: Part of base STRATEGY.md

**Should I delegate this phase?**
- Is it specialized work (analysis, synthesis)? → Yes: Delegate
- Does it need user interaction? → No: Keep with main agent
- Can it be parallelized? → Yes: Consider parallel delegation
- Is it simple synthesis? → Maybe: Main agent can handle

**Should these phases be parallel?**
- Do they depend on each other? → No: Parallel (2a, 2b, 2c)
- Do they read same inputs? → Yes: Likely parallel
- Do they produce different outputs? → Yes: Likely parallel
- Would running simultaneously save time? → Yes: Parallel

### Troubleshooting Checklist

**Context overflow:**
- [ ] Using file paths not content dumping?
- [ ] Creating focused summaries for agents?
- [ ] Breaking complex phases into sub-phases?

**Broken audit trail:**
- [ ] Adding markdown references to claims?
- [ ] Using relative paths from workspace root?
- [ ] Linking strategy → research → data?

**Agent confusion:**
- [ ] Verifying artifact paths are correct?
- [ ] Confirming previous phases completed?
- [ ] Checking artifacts/ directory exists?

**Not parallel:**
- [ ] All parallel phases in single message?
- [ ] Multiple Task calls at once?
- [ ] Waiting for ALL to complete before proceeding?

**Can't resume:**
- [ ] TODO.md updated after each phase?
- [ ] Current phase section accurate?
- [ ] Notes about any issues?

---

**End of Class 8**

You've now completed all 8 classes of the AMA Fundamentals Course. You have the knowledge, frameworks, and practical skills to execute sophisticated marketing workflows using AI agent orchestration.

The next step is practice. Start with the capstone exercise, then apply these patterns to your real work.

Welcome to the future of marketing operations.
