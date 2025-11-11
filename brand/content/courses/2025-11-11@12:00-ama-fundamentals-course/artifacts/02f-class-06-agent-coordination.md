# Class 6: Agent Coordination and Delegation

**Tagline:** The right specialist for the right task

**Estimated Time:** 2 hours (1.5 hours reading, 30 min exercises)

---

## Class Overview

Up to this point, you've learned how LLMs work, why files are the solution to context problems, how the three-layer Marketing Framework organizes work, and how to navigate and verify information through entry points and audit trails. Now it's time to add a powerful capability: **multiple specialized agents working together**.

In this class, you'll learn how AMA uses an orchestration layer (the Operations Manager) to coordinate specialist sub-agents (Analyst, Strategist, and others). This isn't about having multiple agents for the sake of it—it's about **context efficiency** and **specialized expertise**. Instead of one agent trying to do everything (and overwhelming its context window), we have specialists that each load exactly what they need, when they need it.

**What you'll learn:**
- The Operations Manager + Sub-agent pattern
- When to execute directly vs when to delegate
- How context-aware delegation maintains focus
- The stateless execution model and why it matters
- Real examples from AMA workflows

**Prerequisites:**
- Class 1: LLM fundamentals (tokens, context windows, limitations)
- Class 2: File-based context management (progressive disclosure)
- Class 3: Three-layer Marketing Framework (Research → Strategy → Content)
- Class 4: Entry points and navigation (STRATEGY.md, references, extensions)
- Class 5: Verifiable audit trails (evidence chains)

---

## Why Multiple Agents?

### The Single-Agent Problem

Remember from Class 1 that LLMs have **context window limits**. If you try to make one agent do everything, you face these issues:

**Context overflow:**
```
Single Agent Context:
- Complete brand guidelines (50 pages)
- All research findings (100+ pages)
- Customer interviews (200 pages)
- Competitive analysis (75 pages)
- Content creation instructions (30 pages)
= 455 pages → context overflow → quality degradation
```

**Lack of specialization:**
- Content creation requires different expertise than market research
- Analyzing data needs different focus than synthesizing strategy
- One agent can't optimize for both breadth and depth

**Loss of focus:**
- Too much context = too much noise
- Signal-to-noise ratio drops
- Agent can't prioritize what matters

### The Multi-Agent Solution

Instead of one overloaded agent, AMA uses **specialized agents with focused contexts**:

**Operations Manager (Orchestrator):**
- Coordinates work across the system
- Decides when to execute vs delegate
- Communicates with Marketing Architect
- Ensures AMA compliance

**Analyst (Research Specialist):**
- Conducts market research
- Analyzes qualitative data
- Validates positioning claims
- Extracts verifiable insights

**Strategist (Synthesis Specialist):**
- Transforms research into strategy
- Creates polished strategy documents
- Maintains evidence-based reasoning
- Synthesizes across multiple research domains

**Content Creator (Execution Specialist):**
- Generates on-brand content
- Applies strategy to specific platforms
- Creates final deliverables
- Ensures voice consistency

**Why This Matters for AMA:**

Multi-agent coordination isn't just about division of labor—it's about **context efficiency**. Each agent loads only what it needs:
- Analyst loads: Research instructions + source URLs + output path
- Strategist loads: Research index + strategy template + output path
- Content Creator loads: Strategy index + platform extension + content brief

Instead of 455 pages for everyone, each agent gets 10-30 pages of highly relevant context.

---

## The Agentic Framework: Where Agents Live

While the **Marketing Framework** (`/brand/`) contains your work (research, strategy, content), the **Agentic Framework** (`.claude/`) defines how agents coordinate:

```
/.claude/                          ← Agentic Framework
├── /output-styles/                ← Primary agent definitions
│   └── marketing-operations-manager.md  ← Operations Manager identity
├── /agents/                       ← Sub-agent specialists
│   ├── analyst.md                 ← Market Research Analyst
│   ├── strategist.md              ← Brand Strategist
│   └── content-creator.md         ← Content Specialist
├── /skills/                       ← Reusable workflows
│   └── agentic-orchestrating/     ← Orchestration patterns
└── /commands/                     ← Workflow triggers
    ├── plan.md                    ← /plan command
    └── implement.md               ← /implement command
```

**Key distinction:**
- **Marketing Framework** = WHAT you're building (your brand work)
- **Agentic Framework** = WHO builds it and HOW they coordinate

---

## The Operations Manager: Your Orchestration Layer

The Operations Manager is the **only agent** that communicates directly with the Marketing Architect (you). All other agents work behind the scenes, receiving instructions from the Operations Manager.

### Core Identity

**The Operations Manager is:**
- The orchestration layer between you and specialist sub-agents
- The decision-maker for "execute vs delegate"
- The guardian of AMA methodology compliance
- The work visibility manager (creates PLAN.md/TODO.md)

**The Operations Manager is NOT:**
- A specialist (delegates specialized work)
- Able to override architectural rules
- Making strategic decisions alone (collaborates with you)

### The Decision Framework

For every request, the Operations Manager assesses:

**Execute Directly When:**
```
✅ Orchestration-level work (planning, coordinating)
✅ Gathering requirements from Marketing Architect
✅ Strategic collaboration (needs your input)
✅ Multi-step workflows requiring coordination
✅ Work spans multiple domains
✅ Informational requests (reading/showing files)
✅ File/folder system maintenance
```

**Delegate to Sub-agents When:**
```
✅ Specialized domain expertise needed
✅ Task is clearly defined and scoped
✅ Work can be done in isolated context
✅ All necessary information is available
```

**Example decision-making:**

| Request | Decision | Reasoning |
|---------|----------|-----------|
| "Show me our voice strategy" | Execute directly | Informational, requires reading files |
| "Research our top 5 competitors" | Delegate to Analyst | Specialized research task, clear scope |
| "Should we target SMBs or Enterprise?" | Execute directly (strategic) | Requires Marketing Architect collaboration |
| "Synthesize research into positioning strategy" | Delegate to Strategist | Specialized synthesis, clear inputs/outputs |
| "Create 10 Twitter posts from this brief" | Delegate to Content Creator | Specialized creation, defined scope |

### Critical Delegation Rule

When delegating, the Operations Manager must be **extremely clear and accurate**. Sub-agents **cannot** ask the Marketing Architect for clarification—they only see what the Operations Manager provides.

**Good delegation:**
```
Analyst, conduct competitive research for the project management category.

Context Files:
- Read our product description: /brand/research/product-overview/RESEARCH.md
- Use these competitors: /path/to/competitor-list.md

Instructions:
- Focus on positioning and messaging
- Extract exact quotes from competitor websites
- Categorize findings as FACT/BELIEF/CONTRADICTION/ASSUMPTION

Output:
Write findings to: /brand/research/category-landscape/2025-11-11@14:30/artifacts/01-competitive-positioning.md
```

**Bad delegation:**
```
Analyst, research competitors.

[Missing: which competitors? which aspects? where to write output?]
```

**Why This Matters for AMA:**

The Operations Manager is like a VP of Marketing Operations—coordinating specialists, ensuring methodology compliance, making work visible. This isn't just organizational theater; it's **context management through delegation**.

---

## Sub-Agent Specialists

Each sub-agent has a specific identity, capabilities, and constraints. Let's examine the three core specialists:

### 1. The Analyst: Market Research Specialist

**Identity:**
- Clinical truth-seeking instrument
- Extracts verifiable insights from web research
- Classifies every claim as FACT/BELIEF/CONTRADICTION/ASSUMPTION
- Uses Perplexity and Firecrawl for research

**Capabilities:**
```
✅ Conduct competitive analysis
✅ Analyze customer interview transcripts
✅ Extract positioning patterns from market research
✅ Validate brand claims with evidence
✅ Cross-reference multiple sources for verification
```

**Output Standards:**
```
Every finding must be categorized:
- [FACT] Objectively true, backed by multiple sources
- [BELIEF] Stated opinion from a specific source
- [CONTRADICTION] Conflicting information between sources
- [ASSUMPTION] Inference requiring validation

Every claim must have:
- Direct quote from source
- Source URL and date
- Context (who said it, why it matters)
```

**Example Analyst Output:**
```markdown
## Competitive Positioning Analysis

### Verifiable Facts

[FACT] Asana positions itself as "work management" not "project management"
Source: "We help teams orchestrate their work, from daily tasks to strategic initiatives"
- Asana homepage, asana.com, accessed 2025-11-11
Validation: Consistent across homepage, about page, and product marketing

[BELIEF] Monday.com believes visual workflows are their primary differentiator
Source: "We built monday.com around the idea that work should be visual"
- Monday.com founder quote, TechCrunch interview, 2024-03-15
Context: CEO emphasizing design philosophy in funding announcement

[CONTRADICTION] ClickUp's target audience is unclear
Evidence A: "Built for teams of all sizes" - ClickUp homepage
Evidence B: "Designed for scaling startups and enterprises" - ClickUp Enterprise page
Analysis: Marketing inconsistency suggests mid-positioning transition
```

**When to delegate to Analyst:**
- Need external web research (competitors, market trends)
- Analyzing interview transcripts or survey data
- Validating strategic claims with evidence
- Extracting patterns from multiple sources

### 2. The Strategist: Synthesis Specialist

**Identity:**
- Transforms research (what IS) into strategy (what to DO)
- Creates polished, client-ready strategy documents
- Evidence-based but opinionated
- Thinks in implications, not observations

**Capabilities:**
```
✅ Synthesize research into positioning strategy
✅ Create voice guidelines from brand analysis
✅ Develop messaging frameworks from customer insights
✅ Build audience definitions from market research
✅ Resolve contradictions through strategic prioritization
```

**Output Standards:**
```
Strategy documents must:
- Transform findings into actionable direction
- Cite evidence using markdown references: [text](/path/to/research.md)
- Provide "what should I do?" guidance
- Achieve client-ready quality
- Enable verification (transparent reasoning)

Never:
- Copy research verbatim without interpretation
- Make recommendations without research foundation
- Hide evidence (integrate citations, don't use footnotes)
- Create interesting but not actionable strategy
```

**Example Strategist Output:**
```markdown
## Positioning Strategy

### Core Positioning

We position as the **simplicity-first project management tool** that helps overwhelmed teams
regain control without enterprise complexity.

**Evidence base:**
Our customers consistently describe feeling [overwhelmed by feature-heavy tools](/brand/research/customer-insights/RESEARCH.md)
that promise everything but deliver complexity. Meanwhile, our [competitive analysis](/brand/research/category-landscape/RESEARCH.md)
shows enterprise tools (Asana, Monday, ClickUp) competing on feature count, creating a
differentiation opportunity around simplicity.

### Strategic Implications

**What this means for our messaging:**
1. Lead with outcome (clarity, control) not features
2. Explicitly contrast against "overwhelming" enterprise tools
3. Position complexity as the enemy, not competitors

**What this means for our content:**
1. Use simple language (avoid PM jargon)
2. Show before/after of complexity → clarity
3. Feature minimalism as a strength, not a limitation
```

**When to delegate to Strategist:**
- Synthesizing research into strategy documents
- Creating/updating STRATEGY.md files
- Resolving contradictions between research findings
- Developing strategic frameworks from accumulated knowledge

### 3. The Content Creator: Execution Specialist

**Identity:**
- Generates on-brand content guided by strategy
- Applies voice and messaging to specific platforms
- Creates final deliverables ready for review/publication
- Ensures consistency across outputs

**Capabilities:**
```
✅ Generate Twitter posts from content briefs
✅ Write blog posts following messaging strategy
✅ Create LinkedIn content with platform-specific voice
✅ Adapt messaging to different audience segments
✅ Apply brand guidelines to specific content needs
```

**Output Standards:**
```
Content must:
- Follow voice strategy (load STRATEGY.md + platform EXTENSION.md)
- Apply messaging frameworks from strategy
- Match platform-specific requirements
- Include variations when requested
- Be ready for review/publication

Context loading:
- Base voice: /brand/strategy/voice/STRATEGY.md
- Platform voice: /brand/strategy/voice/twitter/EXTENSION.md
- Messaging: /brand/strategy/messaging/STRATEGY.md
- Content brief: Provided by Operations Manager
```

**Example Content Creator Context:**
```markdown
Content Creator, generate 10 Twitter posts promoting our new feature launch.

Context Files to Load:
- Voice guidelines: /brand/strategy/voice/STRATEGY.md
- Twitter-specific voice: /brand/strategy/voice/twitter/EXTENSION.md
- Messaging framework: /brand/strategy/messaging/STRATEGY.md

Content Brief:
Feature: AI-powered task prioritization
Target audience: Overwhelmed project managers
Key message: Regain control without manual sorting
Tone: Empowering but not preachy

Output:
Write posts to: /brand/content/twitter-posts/2025-11-11@14:30-ai-prioritization-launch/CONTENT.md
```

**When to delegate to Content Creator:**
- Generating platform-specific content
- Applying strategy to content briefs
- Creating multiple content variations
- Executing well-defined content tasks

**Technical Deep Dive: Agent Identity Definitions**

Each sub-agent's identity is defined in a markdown file (`.claude/agents/{agent-name}.md`) that contains:

```markdown
---
name: analyst
description: Use this agent when you need to conduct market research...
model: sonnet
color: purple
---

You are a Market Research Analyst, a clinical truth-seeking instrument...

[Full identity, capabilities, constraints, output standards]
```

This file is loaded as system context when the agent is invoked, shaping its behavior and outputs. The Operations Manager reads these definitions to understand each agent's capabilities and determine when to delegate.

---

## Context-Aware Delegation

Delegation isn't just about assigning work—it's about **maintaining focus** through precise context management.

### The Delegation Pattern

When the Operations Manager delegates, it follows this pattern:

**1. Identify Agent Type**
- Which specialist is best suited for this task?
- What are their capabilities and constraints?

**2. Load Phase Instructions**
- Read detailed instructions from skill directory
- Example: `.claude/skills/researching/workflows/category-landscape/phase-2a-research-analyst.md`

**3. Resolve Input Artifacts**
- What files does the agent need to read?
- Provide absolute file paths, not content

**4. Determine Output Path**
- Where should the agent write its output?
- Follow artifact naming conventions

**5. Construct Delegation Prompt**
- Combine instructions + input paths + output path
- Provide complete context so agent can execute independently

**6. Launch Agent**
- Use Task tool to delegate
- Wait for completion before proceeding

### Example: Sequential Delegation

**Scenario:** Competitive landscape research with two phases

**Phase 1: Competitor Identification (Operations Manager executes)**
```markdown
Operations Manager identifies competitors through web research:
1. Asana
2. Monday.com
3. ClickUp
4. Notion
5. Trello

Writes list to: /brand/research/category-landscape/2025-11-11@14:30/artifacts/01-competitors.md
```

**Phase 2: Positioning Analysis (Delegate to Analyst)**
```markdown
# Delegation prompt constructed by Operations Manager:

Analyst, conduct detailed positioning analysis for the project management category.

## Context Files

Read the competitor list from:
- /brand/research/category-landscape/2025-11-11@14:30/artifacts/01-competitors.md

## Instructions

For each competitor:
1. Visit their homepage and marketing pages
2. Extract positioning statement (exact quote)
3. Identify target audience (explicitly stated)
4. Note key differentiators (features, benefits emphasized)
5. Classify findings as FACT/BELIEF/CONTRADICTION/ASSUMPTION

## Output

Write your positioning analysis to:
/brand/research/category-landscape/2025-11-11@14:30/artifacts/02-positioning-analysis.md

## Working Directory

/brand/research/category-landscape/2025-11-11@14:30/
```

**What the Analyst receives:**
- Clear instructions (what to do)
- Input file path (where to read)
- Output file path (where to write)
- Working directory context

**What the Analyst does NOT receive:**
- Entire brand guidelines (not needed)
- All research findings (only competitor list)
- Strategy documents (not relevant yet)

**Result:** Focused context → high signal-to-noise ratio → quality output

### Example: Parallel Delegation

**Scenario:** Phase 2 has two independent analyses

**Phase 1 Completes:**
```markdown
Operations Manager finishes competitor identification
Output: artifacts/01-competitors.md
```

**Phase 2a and 2b Launch Together:**
```markdown
# Both delegations in SINGLE message to Operations Manager:

# Delegation 1: Positioning Analysis
Task(
    subagent_type="analyst",
    description="Phase 2a: Positioning Analysis",
    prompt="""
    Analyst, analyze competitor positioning...

    Context Files:
    - /path/to/artifacts/01-competitors.md

    Output:
    /path/to/artifacts/02a-positioning.md
    """
)

# Delegation 2: Content Analysis
Task(
    subagent_type="analyst",
    description="Phase 2b: Content Analysis",
    prompt="""
    Analyst, analyze competitor content strategy...

    Context Files:
    - /path/to/artifacts/01-competitors.md

    Output:
    /path/to/artifacts/02b-content.md
    """
)
```

**Why parallel:**
- Both tasks read same input (competitor list)
- Both tasks are independent (no dependencies)
- Both can execute simultaneously
- Reduces total execution time

**Phase 3: Synthesis (Sequential)**
```markdown
# After Phase 2a and 2b complete:

Operations Manager synthesizes both analyses:
- Read artifacts/02a-positioning.md
- Read artifacts/02b-content.md
- Synthesize into final RESEARCH.md

Output: RESEARCH.md with complete competitive landscape
```

**Why This Matters for AMA:**

Parallel delegation = efficiency. Sequential delegation = dependencies. The Operations Manager orchestrates both patterns based on task requirements, optimizing for speed without sacrificing quality.

---

## Stateless Execution Model

Every agent delegation is **stateless**—each agent starts fresh with only the context provided in the delegation prompt.

### What "Stateless" Means

**Agents do NOT have:**
- ❌ Memory of previous tasks
- ❌ Access to other agents' contexts
- ❌ Awareness of the broader workflow
- ❌ Ability to read arbitrary files

**Agents DO have:**
- ✅ Instructions provided in delegation prompt
- ✅ File paths to read (explicitly provided)
- ✅ Output path to write (explicitly provided)
- ✅ Tools to read specified files and write to specified paths

### Why Stateless Execution?

**Advantages:**
```
1. Predictable behavior - Same inputs = same outputs
2. Context isolation - No cross-contamination between tasks
3. Resumability - Can restart any phase independently
4. Parallel execution - No shared state conflicts
5. Debugging clarity - Easy to trace what each agent received
```

**Implications:**
```
1. Operations Manager must provide complete context
2. No assumptions about what agent "should know"
3. File paths must be explicit and absolute
4. Input/output must be clearly specified
5. Each delegation is self-contained
```

### Example: Stateless vs Stateful

**Stateful approach (doesn't work):**
```markdown
# Phase 1
"Analyst, research competitors and remember them"

# Phase 2
"Analyst, analyze the competitors you researched earlier"
❌ Agent has no memory of Phase 1
```

**Stateless approach (works):**
```markdown
# Phase 1
"Analyst, research competitors"
Output: artifacts/01-competitors.md

# Phase 2
"Analyst, analyze competitors from this file:
- /path/to/artifacts/01-competitors.md"
✅ Agent reads explicit file path, no memory needed
```

### Resumability Through Statelessness

Because agents are stateless, workflows are naturally **resumable**:

```markdown
# Original execution:
Phase 1 ✅ Complete → artifacts/01-competitors.md
Phase 2 ✅ Complete → artifacts/02a-positioning.md
Phase 3 ❌ Failed → Need to retry

# Resume from Phase 3:
Operations Manager relaunches Phase 3 with fresh delegation:
- Read artifacts/01-competitors.md
- Read artifacts/02a-positioning.md
- Generate artifacts/03-synthesis.md

✅ Phase 3 executes independently, no dependency on previous agent state
```

**Technical Deep Dive: Why Stateless Matters for LLMs**

LLMs are inherently stateless—each API call is independent. By embracing this constraint rather than fighting it, AMA gains:

1. **No state synchronization complexity** - No shared memory to manage
2. **Perfect parallelization** - Agents can run simultaneously without conflicts
3. **Granular error recovery** - Restart individual phases without affecting others
4. **Context efficiency** - Each agent loads only what it needs, nothing more

This is the same principle as functional programming: pure functions with explicit inputs/outputs, no hidden state, no side effects.

---

## Real AMA Workflow Examples

Let's trace how agent coordination works in actual AMA workflows:

### Example 1: Competitive Landscape Research

**Workflow:** Discover category landscape through multi-phase research

**Operations Manager's Orchestration:**

```markdown
# Planning Phase (Operations Manager executes)
1. Create execution folder: /brand/research/category-landscape/2025-11-11@14:30/
2. Create PLAN.md with phase breakdown:
   - Phase 1: Competitor identification (Operations Manager)
   - Phase 2a: Positioning analysis (Analyst)
   - Phase 2b: Content analysis (Analyst)
   - Phase 3: Strategic synthesis (Operations Manager)
3. Ask Marketing Architect for approval

# Implementation Phase (Operations Manager coordinates)

## Phase 1: Competitor Identification
[Operations Manager executes directly]
- Use Perplexity to identify top competitors
- Create artifacts/01-competitors.md with list
- Update TODO.md: Phase 1 complete

## Phase 2a: Positioning Analysis
[Delegate to Analyst]
Delegation prompt:
  "Analyst, analyze competitor positioning.
   Input: artifacts/01-competitors.md
   Output: artifacts/02a-positioning.md"

[Wait for completion]
- Update TODO.md: Phase 2a complete

## Phase 2b: Content Analysis
[Delegate to Analyst - runs parallel with 2a]
Delegation prompt:
  "Analyst, analyze competitor content.
   Input: artifacts/01-competitors.md
   Output: artifacts/02b-content.md"

[Wait for completion]
- Update TODO.md: Phase 2b complete

## Phase 3: Strategic Synthesis
[Operations Manager executes]
- Read artifacts/02a-positioning.md
- Read artifacts/02b-content.md
- Synthesize into RESEARCH.md
- Update TODO.md: Phase 3 complete, workflow done
```

**Agent contexts:**

| Agent | Context Loaded | Size |
|-------|---------------|------|
| Operations Manager (Phase 1) | Competitor research instructions | ~5 pages |
| Analyst (Phase 2a) | Competitor list + positioning instructions | ~10 pages |
| Analyst (Phase 2b) | Competitor list + content instructions | ~10 pages |
| Operations Manager (Phase 3) | Both analysis artifacts | ~20 pages |

**Total context if single agent:** ~100+ pages (all instructions + all outputs)
**Actual context per agent:** 5-20 pages (focused, relevant)

### Example 2: Strategy Synthesis Workflow

**Workflow:** Transform research into positioning strategy

**Operations Manager's Orchestration:**

```markdown
# Planning Phase (Operations Manager executes)
1. Create execution folder: /brand/strategy/positioning/2025-11-11@15:00/
2. Identify research inputs:
   - Customer insights: /brand/research/customer-insights/RESEARCH.md
   - Competitive landscape: /brand/research/category-landscape/RESEARCH.md
   - Founder story: /brand/research/founder-interview/RESEARCH.md
3. Create PLAN.md with approach
4. Ask Marketing Architect for approval

# Implementation Phase (Operations Manager coordinates)

## Phase 1: Strategy Synthesis
[Delegate to Strategist]
Delegation prompt:
  "Strategist, synthesize positioning strategy.

   Context Files:
   - Customer insights: /brand/research/customer-insights/RESEARCH.md
   - Competitive landscape: /brand/research/category-landscape/RESEARCH.md
   - Founder vision: /brand/research/founder-interview/RESEARCH.md

   Instructions:
   - Transform research into actionable positioning
   - Cite evidence using markdown references
   - Create client-ready strategy document

   Output:
   /brand/strategy/positioning/2025-11-11@15:00/STRATEGY.md"

[Wait for completion]
- Review STRATEGY.md quality
- Update TODO.md: Phase 1 complete

## Phase 2: Strategy Review
[Operations Manager executes]
- Present STRATEGY.md to Marketing Architect
- Gather feedback
- If revisions needed, update PLAN.md and delegate again
- Update TODO.md: Workflow complete
```

**What the Strategist receives:**
- Three research indexes (accumulated, approved knowledge)
- Clear instructions on what to create
- Output path for strategy document

**What the Strategist does NOT receive:**
- Research execution folders (temporal iterations)
- Other strategy documents (not relevant)
- Content examples (downstream, not needed yet)
- Complete brand guidelines (will load if needed)

**Result:** Strategist focuses entirely on synthesis, loading only essential research.

### Example 3: Content Creation Workflow

**Workflow:** Generate Twitter posts from strategy

**Operations Manager's Orchestration:**

```markdown
# Planning Phase (Operations Manager executes)
1. Create execution folder: /brand/content/twitter-posts/2025-11-11@16:00-feature-launch/
2. Identify strategy inputs:
   - Voice strategy: /brand/strategy/voice/STRATEGY.md
   - Twitter voice: /brand/strategy/voice/twitter/EXTENSION.md
   - Messaging: /brand/strategy/messaging/STRATEGY.md
3. Gather content brief from Marketing Architect
4. Create PLAN.md with content requirements
5. Ask Marketing Architect for approval

# Implementation Phase (Operations Manager coordinates)

## Phase 1: Content Generation
[Delegate to Content Creator]
Delegation prompt:
  "Content Creator, generate 10 Twitter posts.

   Context Files:
   - Voice guidelines: /brand/strategy/voice/STRATEGY.md
   - Twitter-specific voice: /brand/strategy/voice/twitter/EXTENSION.md
   - Messaging framework: /brand/strategy/messaging/STRATEGY.md

   Content Brief:
   - Feature: AI-powered task prioritization
   - Target: Overwhelmed project managers
   - Message: Regain control without manual work
   - Tone: Empowering, not preachy
   - Include: 5 educational, 3 promotional, 2 social proof

   Output:
   /brand/content/twitter-posts/2025-11-11@16:00-feature-launch/CONTENT.md"

[Wait for completion]
- Review CONTENT.md quality
- Update TODO.md: Phase 1 complete

## Phase 2: Content Review
[Operations Manager executes]
- Present CONTENT.md to Marketing Architect
- Gather feedback on tone, messaging, effectiveness
- If revisions needed, update brief and delegate again
- Update TODO.md: Workflow complete
```

**Progressive disclosure in action:**
```
Content Creator loads:
1. Base voice: STRATEGY.md (universal principles)
2. Platform voice: twitter/EXTENSION.md (Twitter-specific additions)
3. Messaging: STRATEGY.md (key themes and frameworks)

Total: ~25 pages of highly relevant strategy

Content Creator does NOT load:
- Research (already synthesized into strategy)
- Other platform extensions (not needed for Twitter)
- Positioning strategy (already embedded in voice/messaging)
- Other content examples (could cause repetition)
```

**Why This Matters for AMA:**

By the time we reach content creation, all the research and strategic thinking has been distilled into focused strategy documents. The Content Creator doesn't need to re-analyze customer interviews or competitive landscape—it just loads the synthesized guidance and applies it.

This is **progressive disclosure** at its finest: load what's needed, when it's needed, nothing more.

---

## Key Delegation Principles

### 1. Focused Context Only

Provide agents with **exactly** what they need, nothing more:

```
❌ Bad: "Here's our entire brand repository, figure out what you need"
✅ Good: "Read these 3 files: [path1] [path2] [path3]"

❌ Bad: Inline 50 pages of context in the delegation prompt
✅ Good: Provide file paths, let agent load progressively

❌ Bad: "You should know our voice by now"
✅ Good: "Read voice guidelines from: /path/to/voice/STRATEGY.md"
```

### 2. File Paths, Not Content

Pass **references** to information, not the information itself:

```
❌ Bad:
"Our positioning is: [10 pages of positioning strategy pasted here]"

✅ Good:
"Read positioning from: /brand/strategy/positioning/STRATEGY.md"
```

**Why:**
- Agent loads content when ready (progressive disclosure)
- Reduces delegation prompt size
- Enables agent to re-read if needed
- Maintains single source of truth (file, not copied text)

### 3. Absolute Paths

Always use **full paths** from repository root:

```
❌ Bad: "Read ../research/RESEARCH.md"
✅ Good: "Read /brand/research/customer-insights/RESEARCH.md"

❌ Bad: "Check the voice strategy"
✅ Good: "Read /brand/strategy/voice/STRATEGY.md"
```

**Why:**
- No ambiguity about which file
- Works regardless of agent's current directory
- Enables easy verification and debugging

### 4. Clear Instructions

Phase instruction files should be **detailed and specific**:

```markdown
# Good instruction file: phase-2a-research-analyst.md

## Objective
Analyze competitor positioning to identify differentiation opportunities.

## Inputs
You will receive a competitor list from Phase 1.

## Process
For each competitor:
1. Visit homepage and primary marketing pages
2. Extract positioning statement (exact quote, with URL)
3. Identify stated target audience
4. Note key differentiators emphasized
5. Classify each finding as FACT/BELIEF/CONTRADICTION/ASSUMPTION

## Output Format
Use this structure:
- Competitor name
- Positioning statement [FACT/BELIEF]
- Target audience [FACT/BELIEF]
- Key differentiators [FACT/BELIEF]
- Strategic implications [ASSUMPTION]

## Success Criteria
- Every claim cited with source URL
- Clear categorization (FACT/BELIEF/CONTRADICTION/ASSUMPTION)
- Direct quotes, not paraphrases
- Strategic implications noted
```

### 5. Single Responsibility

Each phase should have **one clear task**:

```
❌ Bad: "Phase 1: Research competitors, analyze positioning, and create strategy"
✅ Good:
   - Phase 1: Identify competitors
   - Phase 2: Analyze positioning
   - Phase 3: Synthesize strategy
```

**Why:**
- Easier to resume if phase fails
- Clearer success criteria
- Better artifact organization
- Enables parallel execution

### 6. Explicit Outputs

Always specify **exactly where** agent should write:

```
❌ Bad: "Write your findings somewhere"
✅ Good: "Write to: /brand/research/category-landscape/2025-11-11@14:30/artifacts/02a-positioning.md"

❌ Bad: "Create an artifact"
✅ Good: "Write to: artifacts/03-synthesis.md"
```

### 7. Parallel When Possible

Launch **independent phases** in a single message:

```markdown
# Sequential (when phases depend on each other):
Phase 1 → wait → Phase 2 → wait → Phase 3

# Parallel (when phases are independent):
Phase 1 → wait
  ↓
Launch Phase 2a, 2b, 2c in SINGLE message
  ↓
Wait for all to complete
  ↓
Phase 3
```

**Why:**
- Reduces total execution time
- Better resource utilization
- Still maintains phase isolation (stateless)

---

## Decision Framework: Execute vs Delegate

How does the Operations Manager decide?

### Execute Directly (Operations Manager)

**When work requires:**
- Coordination across multiple domains
- Strategic decision-making with Marketing Architect input
- Planning and workflow orchestration
- Information synthesis from multiple sources
- File/folder structure management
- Marketing Architect communication (gathering requirements, clarifying ambiguity)

**Examples:**
```
✅ "Create a plan for competitive research"
   → Requires orchestration, phase breakdown, folder creation

✅ "Should we target SMBs or Enterprise?"
   → Strategic decision requiring Marketing Architect collaboration

✅ "Show me our current voice strategy"
   → Informational request, reading files

✅ "Synthesize insights from 3 research domains"
   → Cross-domain synthesis, Operations Manager specialty

✅ "What additional information do you need?"
   → Gathering requirements from Marketing Architect
```

### Delegate to Specialist

**When work requires:**
- Specialized domain expertise
- Clearly defined scope
- Isolated context (doesn't need cross-domain knowledge)
- All necessary information is available

**Examples:**
```
✅ "Research top 10 competitors in project management"
   → Delegate to Analyst (research specialist)

✅ "Transform this research into positioning strategy"
   → Delegate to Strategist (synthesis specialist)

✅ "Create 10 Twitter posts from this brief"
   → Delegate to Content Creator (execution specialist)

✅ "Analyze this interview transcript for pain points"
   → Delegate to Analyst (qualitative analysis)
```

### Hybrid Approach

Many workflows use **both patterns**:

```markdown
# Competitive landscape research:

Phase 1: Competitor identification
→ Operations Manager executes (requires web search coordination)

Phase 2: Positioning analysis
→ Delegate to Analyst (specialized research analysis)

Phase 3: Strategic synthesis
→ Operations Manager executes (cross-domain synthesis)
```

**Why hybrid works:**
- Leverages each agent's strengths
- Maintains coordination while enabling specialization
- Balances efficiency with quality

---

## Exercises

### Exercise 1: Delegation Decision-Making

For each scenario, decide: **Execute directly** or **Delegate to specialist**?

**Scenario A:**
"Create a comprehensive competitive analysis including positioning, pricing, features, and target audience for 5 competitors."

<details>
<summary>Click for answer</summary>

**Delegate to Analyst**

**Reasoning:**
- Specialized research task
- Clear scope (5 competitors, defined aspects)
- Analyst can use Firecrawl/Perplexity effectively
- Well-defined output format

**Delegation approach:**
```markdown
Analyst, conduct competitive analysis for project management category.

Context Files:
- Competitor list: /brand/research/category-landscape/2025-11-11@14:30/artifacts/01-competitors.md

Instructions:
- Analyze positioning, pricing, features, target audience
- Categorize findings as FACT/BELIEF/CONTRADICTION/ASSUMPTION
- Extract exact quotes from competitor websites

Output:
/brand/research/category-landscape/2025-11-11@14:30/artifacts/02-competitive-analysis.md
```
</details>

**Scenario B:**
"Should we position as 'project management' or 'work management'? Review our research and provide recommendation."

<details>
<summary>Click for answer</summary>

**Execute directly (Operations Manager + Marketing Architect collaboration)**

**Reasoning:**
- Strategic decision, not just research
- Requires Marketing Architect input and approval
- Involves synthesis across multiple research domains
- Has long-term brand implications

**Approach:**
```markdown
Operations Manager:
1. Read customer insights: /brand/research/customer-insights/RESEARCH.md
2. Read competitive landscape: /brand/research/category-landscape/RESEARCH.md
3. Synthesize findings into positioning recommendation
4. Present analysis to Marketing Architect
5. Collaborate on final decision
6. If decision made, potentially delegate to Strategist for documentation
```
</details>

**Scenario C:**
"Generate 20 Twitter posts promoting our new feature, following our voice guidelines."

<details>
<summary>Click for answer</summary>

**Delegate to Content Creator**

**Reasoning:**
- Specialized content creation task
- Clear scope (20 posts, defined feature)
- Strategy already exists (voice guidelines)
- Well-defined output

**Delegation approach:**
```markdown
Content Creator, generate 20 Twitter posts for feature launch.

Context Files:
- Voice guidelines: /brand/strategy/voice/STRATEGY.md
- Twitter voice: /brand/strategy/voice/twitter/EXTENSION.md
- Messaging: /brand/strategy/messaging/STRATEGY.md

Content Brief:
- Feature: AI-powered task prioritization
- Target: Overwhelmed project managers
- Key message: Regain control effortlessly
- Mix: 10 educational, 7 promotional, 3 social proof

Output:
/brand/content/twitter-posts/2025-11-11@16:00-ai-launch/CONTENT.md
```
</details>

**Scenario D:**
"Transform our customer interview findings and competitive research into a positioning strategy document."

<details>
<summary>Click for answer</summary>

**Delegate to Strategist**

**Reasoning:**
- Specialized synthesis task
- Clear inputs (research indexes)
- Clear output (strategy document)
- Strategist specialty: research → strategy transformation

**Delegation approach:**
```markdown
Strategist, synthesize positioning strategy from research.

Context Files:
- Customer insights: /brand/research/customer-insights/RESEARCH.md
- Competitive landscape: /brand/research/category-landscape/RESEARCH.md
- Founder vision: /brand/research/founder-interview/RESEARCH.md

Instructions:
- Transform findings into actionable positioning
- Cite evidence using markdown references
- Create client-ready strategy document
- Include strategic implications for messaging and content

Output:
/brand/strategy/positioning/2025-11-11@15:00/STRATEGY.md
```
</details>

### Exercise 2: Identify Context Efficiency Problems

Review this delegation prompt. What's wrong with it?

```markdown
Analyst, research competitors.

Here's everything you need to know:

[50 pages of company history pasted here]
[30 pages of customer interviews pasted here]
[25 pages of product documentation pasted here]
[40 pages of existing research pasted here]

Now go research our competitors and tell me what you find.

Write the output somewhere in the research folder.
```

<details>
<summary>Click for problems and solutions</summary>

**Problems:**

1. **Context dumping** - 145 pages of content pasted directly
   - Solution: Provide file paths, let agent load what's needed

2. **Unclear scope** - "Research competitors" is too vague
   - Solution: Specify what aspects to research (positioning? pricing? features?)

3. **Irrelevant context** - Product documentation not needed for competitor research
   - Solution: Provide only relevant inputs (competitor list, research instructions)

4. **Vague output** - "Somewhere in the research folder"
   - Solution: Exact path with filename

5. **No instructions** - No methodology or output format specified
   - Solution: Link to phase instruction file or provide explicit process

**Better delegation:**

```markdown
Analyst, conduct competitive positioning analysis.

Context Files:
- Competitor list: /brand/research/category-landscape/2025-11-11@14:30/artifacts/01-competitors.md

Instructions:
Follow the methodology in:
.claude/skills/researching/workflows/category-landscape/phase-2a-research-analyst.md

Output:
Write your findings to:
/brand/research/category-landscape/2025-11-11@14:30/artifacts/02-positioning-analysis.md

Execution folder:
/brand/research/category-landscape/2025-11-11@14:30/
```

**Context reduction:**
- Before: 145 pages dumped
- After: ~10 pages (competitor list + instructions) loaded progressively
- Result: 93% reduction in context size
</details>

### Exercise 3: Design a Delegation Strategy

**Scenario:**
You need to create a complete voice strategy that synthesizes:
- Customer interview transcripts (3 interviews)
- Competitor voice analysis (5 competitors)
- Founder's vision for brand personality
- Existing content samples (to identify current patterns)

Design the delegation strategy:
1. How many phases?
2. Which agent handles each phase?
3. What are the inputs/outputs?
4. Which phases can run in parallel?

<details>
<summary>Click for suggested approach</summary>

**Phase Breakdown:**

```markdown
# Phase 1: Customer Interview Analysis
Agent: Analyst
Input: 3 interview transcripts from /brand/research/founder-interview/data/
Output: artifacts/01-customer-voice-insights.md
Execute: Sequential (foundation for other phases)

# Phase 2a: Competitor Voice Analysis
Agent: Analyst
Input: Competitor list
Output: artifacts/02a-competitor-voice-patterns.md
Execute: Parallel with 2b

# Phase 2b: Current Content Pattern Analysis
Agent: Analyst
Input: Existing content samples from /brand/content/
Output: artifacts/02b-current-voice-patterns.md
Execute: Parallel with 2a

# Phase 3: Founder Vision Synthesis
Agent: Operations Manager (strategic, needs MA input)
Input: Founder interview: /brand/research/founder-interview/RESEARCH.md
Output: artifacts/03-founder-vision.md
Execute: Sequential after Phase 1

# Phase 4: Voice Strategy Synthesis
Agent: Strategist
Input:
- artifacts/01-customer-voice-insights.md
- artifacts/02a-competitor-voice-patterns.md
- artifacts/02b-current-voice-patterns.md
- artifacts/03-founder-vision.md
Output: STRATEGY.md
Execute: Sequential (needs all previous phases)
```

**Execution flow:**

```
Phase 1 (Sequential)
  ↓
Phase 2a, 2b, 3 (Parallel - all use Phase 1 output)
  ↓
Phase 4 (Sequential - synthesizes all)
```

**Why this structure:**
- Phase 1 first: Customer insights inform all other phases
- Phase 2a/2b/3 parallel: Independent analyses, same foundation
- Phase 4 last: Strategist synthesizes all research into strategy

**Context efficiency:**
- Each Analyst delegation: ~15-20 pages (focused instructions + specific inputs)
- Strategist delegation: ~40 pages (4 artifacts to synthesize)
- Total context if single agent: ~200+ pages
- Actual context per agent: 15-40 pages
</details>

---

## Common Pitfalls

### 1. Over-delegation

**Problem:**
Delegating simple tasks that could be executed directly.

```
❌ Bad: Delegate "read this file and tell me what it says"
✅ Good: Operations Manager reads and summarizes
```

**Why it matters:**
- Adds overhead for simple tasks
- Slower than direct execution
- Wastes delegation for trivial work

**When to delegate:**
Only when specialized expertise OR complex scope justifies the overhead.

### 2. Under-delegation

**Problem:**
Operations Manager trying to do specialized work.

```
❌ Bad: Operations Manager conducts detailed competitive research
✅ Good: Delegate to Analyst specialist

❌ Bad: Operations Manager writes voice strategy from scratch
✅ Good: Delegate to Strategist specialist
```

**Why it matters:**
- Operations Manager isn't specialized in every domain
- Misses opportunity to use focused context
- Reduces quality of specialized work

### 3. Incomplete Delegation Context

**Problem:**
Not providing agent with everything it needs.

```
❌ Bad: "Analyst, research competitors" [no input files, no instructions]
✅ Good: "Analyst, research competitors from this list [path], following these instructions [path], write output here [path]"
```

**Why it matters:**
- Agent can't ask for clarification (stateless)
- Results in confused or incomplete output
- Requires re-work

### 4. Assuming Agent Memory

**Problem:**
Expecting agents to remember previous interactions.

```
❌ Bad:
  Phase 1: "Analyst, research competitors"
  Phase 2: "Analyst, use the competitors from before"

✅ Good:
  Phase 1: "Analyst, research competitors" → Output: artifacts/01-competitors.md
  Phase 2: "Analyst, read competitors from artifacts/01-competitors.md"
```

**Why it matters:**
- Agents are stateless (no memory)
- Must explicitly provide file paths
- Enables resumability

### 5. Wrong Agent for the Task

**Problem:**
Delegating to an agent without the right capabilities.

```
❌ Bad: Delegate content creation to Analyst
✅ Good: Delegate content creation to Content Creator

❌ Bad: Delegate strategy synthesis to Content Creator
✅ Good: Delegate strategy synthesis to Strategist
```

**Why it matters:**
- Each agent optimized for specific domains
- Wrong agent = lower quality output
- Wastes agent's specialized capabilities

---

## Summary

**What You Learned:**

1. **Multi-agent architecture** solves the context overflow problem through specialized agents with focused contexts

2. **Operations Manager** is the orchestration layer that decides when to execute vs delegate, coordinates workflows, and ensures AMA compliance

3. **Sub-agent specialists** (Analyst, Strategist, Content Creator) each have specific capabilities, constraints, and output standards

4. **Context-aware delegation** maintains focus by providing agents with exactly what they need: instructions + input paths + output paths

5. **Stateless execution** means each delegation is self-contained, enabling resumability, parallel execution, and predictable behavior

6. **Delegation principles**: Focused context, file paths (not content), absolute paths, clear instructions, single responsibility, explicit outputs, parallel when possible

7. **Decision framework**: Execute directly for coordination/strategic work, delegate for specialized tasks with clear scope

**Key Takeaways:**

- **Delegation isn't about division of labor**—it's about context efficiency
- **Progressive disclosure through delegation**—each agent loads only what it needs
- **Stateless = resumable**—workflows can restart from any phase
- **Operations Manager coordinates, specialists execute**—clear separation of concerns
- **Right agent for right task**—leverage specialized expertise

**Why This Matters for AMA:**

Agent coordination transforms how complex marketing workflows execute. Instead of one overwhelmed agent trying to do research, strategy, and content creation simultaneously (context overflow), you have specialists that each:
- Load focused context (10-40 pages instead of 200+)
- Execute with domain expertise
- Produce higher quality outputs
- Enable parallel execution for speed

This is the foundation for scaling brand work—you can orchestrate sophisticated workflows (research → strategy → content) while maintaining quality and consistency through specialized agents with efficient context management.

---

## What's Next

**Class 7: Workflow Execution (PLAN.md/TODO.md Pattern)**

Now that you understand how agents coordinate, the next class covers **how to make complex work visible and resumable**. You'll learn:
- The PLAN.md/TODO.md pattern for workflow execution
- Breaking down multi-phase tasks into manageable steps
- Tracking progress transparently through TODO.md updates
- Artifact management and naming conventions
- Resuming interrupted workflows from specific phases

Agent coordination tells you WHO does WHAT. Workflow execution shows you HOW to make it visible, trackable, and resumable.

See you in Class 7.
