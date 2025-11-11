# Class 8: Agent Orchestration Fundamentals

**Course:** AMA Fundamentals Course
**Duration:** 90 minutes
**Format:** Theory + Hands-on Practice

---

## Class Overview

You've learned how to organize your marketing work (Classes 1-3), how to delegate to specialized agents (Class 6), and how to package reusable workflows as skills (Class 7). Now it's time to understand **how to coordinate complex, multi-phase work** through orchestration.

In this class, you'll learn the PLAN.md/TODO.md pattern that makes complex marketing workflows manageable, visible, and resumable. You'll understand when orchestration is necessary (and when it's overkill), how to structure execution folders, and how to break down complex work into focused, delegated phases.

### Learning Objectives

By the end of this class, you will be able to:
- Implement the PLAN.md/TODO.md orchestration pattern
- Determine when orchestration is required versus simple execution
- Create properly structured execution folders with artifacts
- Delegate to sub-agents within orchestrated workflows
- Break down complex tasks into manageable, focused phases
- Track progress transparently throughout execution

### Prerequisites

Before starting this class, you should have completed:
- **Class 3:** Marketing File Structure (AMA Framework) - Understand where executions live
- **Class 6:** Agent Delegation & Sub-agents - Know how to delegate work
- **Class 7:** Claude Code Skills - Understand what skills are and how to use them

### Estimated Time

- Theory and concepts: 30 minutes
- Practical walkthrough: 45 minutes
- Knowledge checks and exercises: 15 minutes

---

## Part 1: Why Orchestration Matters

### The Complexity Problem

Remember from Class 1 that context windows are limited. When work is complex, you face three challenges:

1. **Context overload** - Trying to do everything in one prompt fills the context window with noise
2. **Lost progress** - If execution fails halfway through, you lose all work
3. **No visibility** - You can't see what's happening or what's been completed

**Example scenario:**
> "Analyze our top 5 competitors - research their positioning, messaging, pricing, and content strategy, then synthesize everything into strategic recommendations."

If you try to do this in a single prompt to a single agent:
- The agent must hold ALL instructions in context at once
- Positioning analysis, content analysis, and pricing research compete for attention
- If anything fails, you start from scratch
- You can't see progress until everything is done
- The agent might prioritize one area over others

### The Orchestration Solution

Orchestration breaks complex work into **phases** that:
- Execute sequentially or in parallel
- Have clear inputs and outputs (artifacts)
- Can be delegated to specialized agents with focused context
- Track progress visibly
- Can be resumed if interrupted

**Same scenario, orchestrated:**
```
Phase 1: Identify 5 competitors
    ↓ (produces: 01-competitors.md)
Phase 2a: Analyze positioning & messaging (parallel)
Phase 2b: Analyze content strategy (parallel)
Phase 2c: Analyze pricing (parallel)
    ↓ (produces: 02a-*, 02b-*, 02c-*.md)
Phase 3: Synthesize into recommendations
    ↓ (produces: 03-synthesis.md)
Final: Consolidate into RESEARCH.md
```

Each phase:
- Has ONE clear task
- Gets focused context (not everything)
- Produces a tangible artifact
- Can be tracked and validated independently

### Why This Matters for AMA

The AMA methodology is built around **temporal executions** (remember Class 3?). Those `YYYY-MM-DD@HH:mm/` folders you learned about ARE orchestrated workflows:

```
/brand/research/competitive-analysis/2025-10-30@14:30/
├── PLAN.md          ← Orchestration blueprint
├── TODO.md          ← Progress tracking
├── artifacts/       ← Phase outputs
│   ├── 01-competitors.md
│   ├── 02a-positioning.md
│   ├── 02b-content.md
│   └── 03-synthesis.md
└── RESEARCH.md      ← Final output
```

Without orchestration, you'd have one massive, untrackable prompt. With orchestration, you have:
- A clear plan (PLAN.md)
- Visible progress (TODO.md)
- Intermediate results (artifacts/)
- Resumability (can restart from any phase)
- Audit trail (what was done when)

---

## Part 2: The Orchestration Pattern

### The Three-Document System

Orchestration relies on three key documents:

#### 1. PLAN.md - The Blueprint

**Purpose:** Define WHAT will be done, in WHAT order, by WHOM

**Created:** Before execution starts (planning phase)

**Contains:**
- Objective (what you're trying to accomplish)
- Approach (high-level methodology)
- Phase breakdown (step-by-step tasks)
- Expected artifacts (outputs from each phase)
- Success criteria (how you'll know it worked)

**Key insight:** PLAN.md is your contract with the AI. Everything that follows executes THIS plan.

#### 2. TODO.md - The Progress Tracker

**Purpose:** Show CURRENT state and track completion

**Created:** At start of execution (implementation phase)

**Updated:** After every phase completes

**Contains:**
- Status (In Progress / Completed)
- Timestamps (started, completed)
- Phase checklist (with links to artifacts)
- Current phase indicator
- Notes and observations

**Key insight:** TODO.md makes invisible work visible. At any moment, you can see exactly where you are.

#### 3. Artifacts - The Intermediate Results

**Purpose:** Store phase outputs that become inputs to later phases

**Created:** During execution (one per phase)

**Naming convention:**
```
{phase-number}{suffix}-{descriptive-name}.md

Examples:
- 01-competitors.md          (Phase 1)
- 02a-positioning.md         (Phase 2a - parallel)
- 02b-content-analysis.md    (Phase 2b - parallel)
- 03-synthesis.md            (Phase 3)
```

**Key insight:** Artifacts create a data flow through your workflow. Each phase reads previous artifacts and produces new ones.

### The Orchestration Lifecycle

```
1. PLANNING PHASE
   User: "I need to analyze competitors"
      ↓
   AI: Creates execution folder + PLAN.md
      ↓
   User: Reviews and approves plan

2. IMPLEMENTATION PHASE
   AI: Creates TODO.md from PLAN.md
      ↓
   AI: Executes Phase 1 → produces 01-competitors.md
      ↓ (updates TODO.md)
   AI: Executes Phase 2a, 2b, 2c in parallel → produces artifacts
      ↓ (updates TODO.md)
   AI: Executes Phase 3 → produces 03-synthesis.md
      ↓ (updates TODO.md)
   AI: Synthesizes final RESEARCH.md
      ↓
   TODO.md marked: ✅ Completed

3. REVIEW PHASE
   User: Reviews final output
   User: Can trace claims through artifacts
   User: Can see exactly what happened when
```

---

## Part 3: When to Use Orchestration

### The Complexity Threshold

Not every task needs orchestration. Use orchestration when work has:

**3+ distinct steps** that:
- Produce intermediate outputs
- Could be delegated to different specialists
- Would benefit from progress tracking

**Coordination needs:**
- Multiple agents working on related tasks
- Parallel work streams that converge later
- Need for resumability if interrupted

**Visibility requirements:**
- User wants to see progress
- Work takes more than a few minutes
- Intermediate results are valuable on their own

### Orchestration: Yes or No?

#### ✅ Use Orchestration When:

**Example 1: Competitive Research**
```
Task: "Analyze top 5 competitors"

Why orchestrate:
- Phase 1: Identify competitors (produces list)
- Phase 2: Analyze each area (positioning, content, pricing)
- Phase 3: Synthesize findings
- 3+ phases, parallel analysis opportunity, ~30-60 min work
```

**Example 2: Strategy Synthesis**
```
Task: "Synthesize voice strategy from customer interviews"

Why orchestrate:
- Phase 1: Extract themes from interviews
- Phase 2: Analyze patterns and preferences
- Phase 3: Draft voice principles
- Phase 4: Create platform extensions
- 4+ phases, coordination needed, builds on previous work
```

**Example 3: Content Campaign**
```
Task: "Create a 5-post Twitter thread based on research"

Why orchestrate:
- Phase 1: Review research and extract key points
- Phase 2a-e: Draft each post individually
- Phase 3: Review thread flow and coherence
- Phase 4: Polish and finalize
- Multiple parallel phases, quality review step, structured output
```

#### ❌ Don't Use Orchestration When:

**Example 1: Simple Edits**
```
Task: "Update the positioning strategy with new competitor info"

Why not orchestrate:
- Single task (read, update, write)
- No intermediate artifacts needed
- Takes < 5 minutes
- Just use Edit tool directly
```

**Example 2: Single Research Task**
```
Task: "Find the pricing for Competitor X"

Why not orchestrate:
- One clear task (web research → summary)
- No coordination needed
- No phases to track
- Just delegate to research agent directly
```

**Example 3: Simple Generation**
```
Task: "Write a single tweet about our new product"

Why not orchestrate:
- Single output
- No research or analysis phases
- No intermediate artifacts
- Just prompt directly with strategy context
```

### The Decision Framework

Ask yourself:

1. **How many distinct phases?** (If 1-2, probably don't need orchestration)
2. **Are phases independent?** (Parallelization opportunity suggests orchestration)
3. **How long will this take?** (< 5 minutes: no orchestration; > 15 minutes: probably yes)
4. **Do I need to track progress?** (If yes, orchestration helps)
5. **Could this fail partway through?** (If losing progress is costly, orchestrate)

**Rule of thumb:** If you're thinking "this is complex enough that I should write it down before starting," you need orchestration.

---

## Part 4: Execution Folder Structure

### Standard Structure

Every orchestrated workflow follows this pattern:

```
/brand/{base-dir}/{domain-or-type}/{YYYY-MM-DD@HH:mm}/
├── data/              ← Input files (optional)
├── artifacts/         ← Phase outputs (always created)
│   ├── 01-*.md
│   ├── 02a-*.md
│   ├── 02b-*.md
│   └── 03-*.md
├── PLAN.md           ← Orchestration blueprint
├── TODO.md           ← Progress tracking
└── OUTPUT.md         ← Final synthesized output
```

### Directory Breakdown

#### Base Directory
```
/brand/research/     ← For research workflows
/brand/strategy/     ← For strategy workflows
/brand/content/      ← For content workflows
```

Choose based on what you're creating (remember the three-layer framework from Class 3).

#### Domain or Type
```
/brand/research/competitive-analysis/    ← Research domain
/brand/strategy/voice/                   ← Strategy domain
/brand/content/twitter-posts/            ← Content type
```

This organizes related executions together.

#### Timestamp
```
/2025-10-30@14:30/    ← Standard format: YYYY-MM-DD@HH:mm
/2025-10-30@14:30-competitor-deep-dive/    ← With slug (for content)
```

Makes each execution unique and sortable.

#### data/ Subdirectory (Optional)

**Create when:**
- User provides input files (transcripts, documents, etc.)
- You fetch external data (scraped web content, API responses)
- Execution needs reference materials

**Contains:**
```
data/
├── interview-transcript-1.md
├── interview-transcript-2.md
└── competitor-websites.json
```

**Don't create when:**
- No external inputs needed
- All context comes from existing strategy/research files

#### artifacts/ Subdirectory (Always)

**Purpose:** Store phase outputs

**Naming convention:**
```
{phase-number}{letter}-{descriptive-name}.md

Phase 1 (sequential):       01-competitors.md
Phase 2a (parallel):        02a-positioning-analysis.md
Phase 2b (parallel):        02b-content-analysis.md
Phase 3 (sequential):       03-synthesis.md
```

**Why this structure:**
- **Numbers** show execution order
- **Letters** indicate parallel phases
- **Names** describe content
- **Sorting** automatically orders by execution sequence

### File Purposes

| File | Purpose | When Created | Who Reads It |
|------|---------|--------------|--------------|
| `PLAN.md` | Execution blueprint | Planning phase | Implementation agent |
| `TODO.md` | Progress tracking | Implementation start | User + resumption logic |
| `data/*` | Input materials | Before implementation | Phase agents |
| `artifacts/*` | Phase outputs | During implementation | Subsequent phases |
| `OUTPUT.md` | Final result | Implementation end | User |

### Location Examples

#### Research Execution
```
/brand/research/competitive-analysis/2025-10-30@14:30/
├── artifacts/
│   ├── 01-competitors.md
│   ├── 02a-positioning.md
│   ├── 02b-content.md
│   └── 03-synthesis.md
├── PLAN.md
├── TODO.md
└── RESEARCH.md    ← Final output for research
```

#### Strategy Execution
```
/brand/strategy/voice/2025-10-31@09:15/
├── artifacts/
│   ├── 01-themes.md
│   ├── 02-principles.md
│   └── 03-examples.md
├── PLAN.md
├── TODO.md
└── STRATEGY.md    ← Final output for strategy
```

#### Content Execution
```
/brand/content/twitter-posts/2025-10-31@16:45-product-launch/
├── data/
│   └── product-details.md
├── artifacts/
│   ├── 01-key-messages.md
│   ├── 02a-post-1.md
│   ├── 02b-post-2.md
│   ├── 02c-post-3.md
│   └── 03-thread-review.md
├── PLAN.md
├── TODO.md
└── CONTENT.md     ← Final output for content
```

---

## Part 5: Progressive Task Breakdown

### The Art of Decomposition

Breaking complex work into phases is both art and science. Good decomposition:
- Creates clear boundaries between phases
- Enables focused context for each phase
- Identifies opportunities for parallelization
- Produces valuable intermediate artifacts

### Decomposition Principles

#### 1. Single Responsibility Per Phase

**Bad:**
```
Phase 1: Research competitors and analyze their positioning and content
```
Why bad: Three distinct activities mashed together

**Good:**
```
Phase 1: Identify 5-7 direct competitors
Phase 2a: Analyze market positioning
Phase 2b: Analyze content strategy
```
Why good: Each phase has ONE clear task

#### 2. Clear Input/Output Boundaries

**Bad:**
```
Phase 2: Do competitive analysis
```
Why bad: Unclear what Phase 2 reads or produces

**Good:**
```
Phase 2a: Positioning Analysis
Input: 01-competitors.md (competitor list from Phase 1)
Output: 02a-positioning.md (positioning analysis report)
```
Why good: Crystal clear what goes in and comes out

#### 3. Parallelization Opportunities

**Bad (sequential when could be parallel):**
```
Phase 2: Analyze competitor positioning
Phase 3: Analyze competitor content
Phase 4: Analyze competitor pricing
```
Why bad: These could run simultaneously

**Good (parallel):**
```
Phase 2a: Analyze positioning
Phase 2b: Analyze content
Phase 2c: Analyze pricing
(All three read Phase 1 output, run in parallel)
```
Why good: Saves time, each is independent

#### 4. Logical Flow

**Bad:**
```
Phase 1: Synthesize findings
Phase 2: Research competitors
Phase 3: Analyze data
```
Why bad: Order doesn't make sense

**Good:**
```
Phase 1: Research competitors
Phase 2: Analyze data
Phase 3: Synthesize findings
```
Why good: Natural flow from research → analysis → synthesis

### Example: Breaking Down a Complex Task

**Task:** "Create a comprehensive content strategy for LinkedIn based on our positioning and audience research"

#### Step 1: Identify Major Activities

What needs to happen?
1. Review existing strategy documents
2. Extract LinkedIn-specific requirements
3. Define content themes
4. Create content calendar structure
5. Draft content guidelines
6. Create example posts

#### Step 2: Group Related Activities

Which activities belong together?
- Review + Extract = Phase 1 (Context gathering)
- Define themes + Calendar = Phase 2 (Strategic planning)
- Guidelines + Examples = Phase 3 (Execution guidance)

#### Step 3: Identify Dependencies

What must happen before what?
- Can't define themes without context
- Can't create guidelines without themes
- Examples should follow guidelines

Flow: Phase 1 → Phase 2 → Phase 3

#### Step 4: Look for Parallelization

Can anything run simultaneously?
- Phase 3: Guidelines and examples could be parallel (3a, 3b)
- Both need Phase 2 output (themes + calendar)
- Both produce independent artifacts

#### Step 5: Final Decomposition

```
Phase 1: Context Synthesis
- Input: /brand/strategy/positioning/STRATEGY.md
         /brand/research/audience/RESEARCH.md
- Task: Extract LinkedIn-relevant insights
- Output: 01-context-synthesis.md

Phase 2: Strategic Planning
- Input: 01-context-synthesis.md
- Task: Define content themes and calendar structure
- Output: 02-strategic-framework.md

Phase 3a: Content Guidelines (parallel)
- Input: 02-strategic-framework.md
- Task: Draft tone, style, formatting guidelines
- Output: 03a-content-guidelines.md

Phase 3b: Example Posts (parallel)
- Input: 02-strategic-framework.md
- Task: Create 5 example posts demonstrating guidelines
- Output: 03b-example-posts.md

Phase 4: Final Synthesis
- Input: 03a-content-guidelines.md
         03b-example-posts.md
- Task: Consolidate into final strategy
- Output: STRATEGY.md
```

**What made this good:**
- Clear phase boundaries
- Single responsibility per phase
- Identified parallel opportunity (3a, 3b)
- Logical flow with clear dependencies
- Each phase produces valuable artifact

---

## Part 6: Artifact Management

### What Are Artifacts?

Artifacts are the **tangible outputs** of each phase. They:
- Capture phase results in structured format
- Serve as inputs to subsequent phases
- Create an audit trail of execution
- Enable resumability (can restart from any artifact)
- Document intermediate thinking

### Naming Conventions (Critical!)

Artifacts follow a strict naming pattern:

```
{phase-number}{suffix}-{descriptive-name}.md
```

**Components:**

| Component | Description | Example |
|-----------|-------------|---------|
| `phase-number` | Two-digit phase number | `01`, `02`, `03`, `10` |
| `suffix` | Letter for parallel phases | `a`, `b`, `c` (or empty) |
| `descriptive-name` | Kebab-case description | `competitors`, `positioning-analysis` |
| `.md` | File extension (always Markdown) | `.md` |

**Examples:**

```
Sequential phases:
├── 01-competitor-identification.md
├── 02-market-analysis.md
└── 03-strategic-synthesis.md

Parallel phases:
├── 01-competitor-identification.md
├── 02a-positioning-analysis.md
├── 02b-content-analysis.md
├── 02c-pricing-analysis.md
└── 03-strategic-synthesis.md
```

**Why this pattern:**
- **Sortable** - Files naturally order by execution sequence
- **Clear grouping** - Parallel phases group together (02a, 02b, 02c)
- **Descriptive** - Name indicates content
- **Consistent** - Same pattern across all workflows

### Artifact Flow

Artifacts create a **data pipeline** through your workflow:

```
Phase 1 produces → 01-competitors.md
                        ↓ (consumed by Phase 2a, 2b, 2c)
Phase 2a produces → 02a-positioning.md ┐
Phase 2b produces → 02b-content.md     ├→ (consumed by Phase 3)
Phase 2c produces → 02c-pricing.md     ┘
                        ↓
Phase 3 produces → 03-synthesis.md
                        ↓ (consumed by final synthesis)
Final synthesis → RESEARCH.md
```

**Key insight:** Each phase is a **transformation** - it reads artifacts, processes them, and produces new artifacts.

### Artifact Structure

Good artifacts have clear structure:

```markdown
# Phase 2a: Market Positioning Analysis

## Overview
Brief summary of what this phase accomplished.

## Key Findings

### Finding 1: Category Definition
Competitors define the category as "AI-powered marketing"...

### Finding 2: Differentiation Strategies
Three main differentiation approaches identified...

### Finding 3: Messaging Patterns
Common themes in competitor messaging...

## Competitive Positioning Matrix

| Competitor | Position | Key Differentiator |
|------------|----------|-------------------|
| Competitor A | Enterprise-focused | Integration ecosystem |
| Competitor B | SMB-focused | Ease of use |

## Insights for Next Phase
- Competitor B's messaging resonates with SMB audience
- Sustainability angle is underutilized in category
- Pricing is a key differentiator for Competitor C

## Recommendations
Based on this positioning analysis, recommend focusing on...
```

**What makes this good:**
- **Clear heading** showing phase
- **Overview** for quick scan
- **Structured findings** with details
- **Data tables** where appropriate
- **Forward-looking** insights for next phase
- **Actionable** recommendations

### Artifact Usage Patterns

#### Pattern 1: Sequential Consumption

```
Phase 1 → 01-research.md
              ↓
Phase 2 reads 01-research.md → 02-analysis.md
              ↓
Phase 3 reads 02-analysis.md → 03-synthesis.md
```

Each phase builds on the previous one.

#### Pattern 2: Parallel Divergence

```
Phase 1 → 01-competitors.md
              ↓
    ┌─────────┼─────────┐
    ↓         ↓         ↓
  Phase 2a  Phase 2b  Phase 2c
    ↓         ↓         ↓
  02a-*.md  02b-*.md  02c-*.md
```

One artifact spawns multiple parallel analyses.

#### Pattern 3: Parallel Convergence

```
Phase 2a → 02a-positioning.md ┐
Phase 2b → 02b-content.md     ├→ Phase 3 reads all
Phase 2c → 02c-pricing.md     ┘       ↓
                              03-synthesis.md
```

Multiple artifacts merge into one synthesis.

### Referencing Artifacts

#### In PLAN.md (conceptual):
```markdown
**Phase 2a Output:** Market positioning analysis report
```

#### In TODO.md (with links):
```markdown
- [x] [02a-positioning.md](artifacts/02a-positioning.md) - Positioning analysis complete
```

#### In Delegation (absolute paths):
```markdown
Input: /brand/research/competitive-analysis/2025-10-30@14:30/artifacts/01-competitors.md
Output: /brand/research/competitive-analysis/2025-10-30@14:30/artifacts/02a-positioning.md
```

#### In Final Output (markdown references):
```markdown
Our analysis shows [strong differentiation opportunity](artifacts/02a-positioning.md)
in the sustainability messaging space.
```

---

## Part 7: The Agentic-Orchestrating Skill

### What Is It?

The `agentic-orchestrating` skill is AMA's packaged knowledge base for orchestration. It contains:
- Planning methodology
- Implementation patterns
- Delegation strategies
- Artifact management rules
- Progress tracking templates
- Resumption logic (future)

**Location:** `/.claude/skills/agentic-orchestrating/`

### Skill Structure

```
.claude/skills/agentic-orchestrating/
├── SKILL.md                      ← Main skill definition
├── references/
│   ├── planning.md              ← How to create plans
│   ├── implementation.md        ← How to execute plans
│   ├── delegation.md            ← How to delegate phases
│   ├── artifacts.md             ← Artifact management
│   ├── progress-tracking.md    ← TODO.md patterns
│   └── resuming.md              ← Resumption logic
├── assets/
│   ├── PLAN_template.md         ← PLAN.md template
│   └── TODO_template.md         ← TODO.md template
└── scripts/
    └── create_execution_folder.py
```

### When the Skill Activates

The skill loads automatically when you:
- Use `/plan` command (creates PLAN.md)
- Use `/implement` command (executes PLAN.md)
- Ask for orchestration help

**Example triggers:**
```
"Create a plan for competitive research"  → Loads planning.md
"Execute the plan in /research/..."       → Loads implementation.md
"How should I structure artifacts?"       → Loads artifacts.md
```

### Progressive Disclosure in Action

The skill uses progressive disclosure itself:

1. **SKILL.md** provides high-level overview
2. **References/** contain detailed guidance
3. Each reference focuses on one aspect
4. Templates provide starting points

When you need orchestration help, AI loads only the relevant reference file - not everything at once.

### Using the Skill

#### Scenario 1: Planning a New Workflow

**You:** "I need to create a plan for analyzing 5 competitors"

**AI loads:** `references/planning.md`

**AI does:**
1. Creates execution folder with timestamp
2. Reads planning.md for methodology
3. Decomposes task into phases
4. Identifies parallelization opportunities
5. Defines expected artifacts
6. Creates PLAN.md using template

**You get:** A structured plan ready for approval

#### Scenario 2: Executing a Plan

**You:** "Execute the plan in /brand/research/competitive-analysis/2025-10-30@14:30/"

**AI loads:** `references/implementation.md` + `references/delegation.md`

**AI does:**
1. Reads PLAN.md as blueprint
2. Creates TODO.md from template
3. Executes each phase sequentially/parallel
4. Delegates to appropriate agents
5. Updates TODO.md after each phase
6. Synthesizes final output

**You get:** Completed research with full audit trail

#### Scenario 3: Understanding Artifacts

**You:** "How should I name artifacts for parallel phases?"

**AI loads:** `references/artifacts.md`

**AI does:**
1. Explains naming convention
2. Shows examples of parallel naming (02a-, 02b-)
3. Demonstrates artifact flow
4. Provides templates

**You get:** Clear guidance without reading whole skill

### Key Patterns from the Skill

#### 1. Phase Numbering

```
Sequential phases: 1, 2, 3, 4
Parallel phases: 2a, 2b, 2c

Artifacts follow phase numbers:
- Phase 1 → 01-*.md
- Phase 2a → 02a-*.md
- Phase 2b → 02b-*.md
- Phase 3 → 03-*.md
```

#### 2. Delegation Template

From `references/delegation.md`:

```
Task(
    subagent_type="specialist-type",
    description="Execute Phase {N}: {phase-name}",
    prompt="""
{phase-instructions}

## Context Files
- {input-artifact-path}

## Output
{output-artifact-path}

## Execution Folder
{execution-folder-path}
"""
)
```

#### 3. TODO.md Updates

From `references/progress-tracking.md`:

```markdown
After phase completes:
- [x] Phase 2a: Market Research → [02a-positioning.md](artifacts/02a-positioning.md)

Update current phase:
## Current Phase
**Phase 2b:** Analyzing content strategy...
```

---

## Part 8: Practical Walkthrough

Let's walk through creating a complete research execution from start to finish.

### Scenario

You're launching a new eco-friendly skincare product. You need to research the competitive landscape to inform your positioning strategy.

**Goal:** Identify competitors and analyze their positioning, messaging, and content approach.

### Step 1: Planning Phase

#### 1.1: Initiate Planning

**You to Claude:**
```
"Create a plan to discover the competitive landscape for eco-friendly skincare.
I want to identify 5-7 competitors and analyze their positioning and content strategy."
```

#### 1.2: AI Creates Execution Folder

AI creates:
```
/brand/research/competitive-analysis/2025-10-30@14:30/
├── artifacts/        ← Empty, will be populated during execution
```

#### 1.3: AI Decomposes Task

AI thinks through decomposition:

**Major activities:**
1. Identify competitors (research)
2. Analyze positioning (analysis)
3. Analyze content (analysis)
4. Synthesize findings (synthesis)

**Dependencies:**
- Need competitor list before analysis
- Positioning and content analysis can run parallel
- Synthesis needs both analyses

**Final structure:**
```
Phase 1: Competitor Identification (sequential)
    ↓
Phase 2a: Positioning Analysis (parallel)
Phase 2b: Content Analysis (parallel)
    ↓
Phase 3: Strategic Synthesis (sequential)
```

#### 1.4: AI Creates PLAN.md

```markdown
# Competitive Landscape Discovery - Eco-Friendly Skincare

**Execution Folder:** /brand/research/competitive-analysis/2025-10-30@14:30/
**Created:** 2025-10-30 14:30

## Objective

Identify 5-7 direct competitors in the eco-friendly skincare category and analyze
their market positioning, messaging strategies, and content approaches to inform
our positioning strategy.

## Approach

1. Identify key competitors through web research
2. Conduct parallel analyses of positioning and content
3. Synthesize findings into strategic recommendations

## Step by Step Tasks

### 1. Competitor Identification

**Agent:** general-purpose
**Instructions:** Inline
**Input:** None (web research)
**Output:** `artifacts/01-competitors.md`

**Task:**
Research and identify 5-7 direct competitors in the eco-friendly skincare category.
For each competitor, document:
- Company name and URL
- Product focus (specific skincare categories)
- Eco-friendly positioning (sustainability claims)
- Target audience indicators
- Brand personality/tone

Focus on companies that:
- Explicitly position as eco-friendly or sustainable
- Offer skincare products (not broader beauty)
- Have established web presence and content

### 2a. Positioning Analysis

**Agent:** general-purpose
**Instructions:** Inline
**Input:** `artifacts/01-competitors.md`
**Output:** `artifacts/02a-positioning-analysis.md`

**Task:**
Analyze how competitors position themselves in the market. For each competitor,
document:
- Primary positioning statement or tagline
- Key differentiation claims
- Sustainability narrative (how they frame eco-friendliness)
- Target audience positioning
- Category definition (how they describe the space)

Synthesize into:
- Positioning patterns across category
- Common differentiation strategies
- Underutilized positioning opportunities
- Competitive positioning matrix

### 2b. Content Strategy Analysis

**Agent:** general-purpose
**Instructions:** Inline
**Input:** `artifacts/01-competitors.md`
**Output:** `artifacts/02b-content-analysis.md`

**Task:**
Analyze competitors' content strategies and brand voice. For each competitor:
- Website content structure and focus areas
- Brand voice and tone characteristics
- Key messaging themes
- Content types and formats
- Educational vs promotional balance

Synthesize into:
- Voice patterns in the category
- Common content themes
- Content gaps or opportunities
- Audience engagement approaches

### 3. Strategic Synthesis

**Agent:** general-purpose
**Instructions:** Inline
**Input:**
- `artifacts/02a-positioning-analysis.md`
- `artifacts/02b-content-analysis.md`
**Output:** `artifacts/03-strategic-synthesis.md`

**Task:**
Synthesize positioning and content analyses into strategic recommendations:
- Category landscape summary
- Competitive positioning map
- Key differentiation opportunities
- Content strategy implications
- Strategic recommendations for our positioning

## Expected Artifacts

- **Phase 1:** `01-competitors.md` - List of 5-7 competitors with details
- **Phase 2a:** `02a-positioning-analysis.md` - Positioning analysis report
- **Phase 2b:** `02b-content-analysis.md` - Content strategy analysis
- **Phase 3:** `03-strategic-synthesis.md` - Strategic recommendations
- **Final:** `RESEARCH.md` - Consolidated competitive landscape research

## Success Criteria

- [ ] 5-7 relevant competitors identified
- [ ] Clear positioning patterns documented
- [ ] Content strategy insights captured
- [ ] Differentiation opportunities identified
- [ ] Strategic recommendations provided
- [ ] All findings synthesized into RESEARCH.md
```

#### 1.5: You Review and Approve

**AI presents plan to you:**
```
"I've created a plan for competitive landscape discovery. The workflow will:
1. Identify 5-7 eco-friendly skincare competitors
2. Analyze positioning and content in parallel
3. Synthesize findings into strategic recommendations

The plan is at: /brand/research/competitive-analysis/2025-10-30@14:30/PLAN.md

Review the plan and let me know if you'd like any adjustments before I begin execution."
```

**You review and approve:**
```
"Looks good, proceed with execution."
```

### Step 2: Implementation Phase

#### 2.1: AI Creates TODO.md

```markdown
# Competitive Landscape Discovery Progress

**Status:** In Progress
**Started:** 2025-10-30 14:30
**Execution Folder:** /brand/research/competitive-analysis/2025-10-30@14:30

## Phases

- [ ] Phase 1: Competitor Identification
- [ ] Phase 2a: Positioning Analysis
- [ ] Phase 2b: Content Analysis
- [ ] Phase 3: Strategic Synthesis

## Artifacts

- [ ] [01-competitors.md](artifacts/01-competitors.md) - Competitor list
- [ ] [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md) - Positioning analysis
- [ ] [02b-content-analysis.md](artifacts/02b-content-analysis.md) - Content analysis
- [ ] [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md) - Strategic synthesis
- [ ] [RESEARCH.md](RESEARCH.md) - Final output

## Current Phase

**Phase 1:** Identifying 5-7 eco-friendly skincare competitors...

## Notes

(Will be updated during execution)
```

#### 2.2: Execute Phase 1

**AI reads PLAN.md Phase 1:**
- Task: Identify competitors through web research
- Output: `artifacts/01-competitors.md`
- Agent: general-purpose (AI can do this directly)

**AI performs research** (using web search tools):
- Searches for eco-friendly skincare brands
- Evaluates relevance and fit
- Documents findings

**AI creates `artifacts/01-competitors.md`:**

```markdown
# Phase 1: Competitor Identification

## Overview

Identified 7 direct competitors in the eco-friendly skincare category. All have
strong sustainability positioning and established market presence.

## Competitors

### 1. EcoGlow Skincare
- **URL:** https://ecoglowskincare.com
- **Product Focus:** Full-range skincare (cleansers, serums, moisturizers)
- **Eco Positioning:** Zero-waste packaging, organic ingredients
- **Target Audience:** Eco-conscious millennials, price-conscious
- **Brand Tone:** Friendly, educational, approachable

### 2. Pure Earth Beauty
- **URL:** https://pureearthbeauty.com
- **Product Focus:** Anti-aging focused skincare
- **Eco Positioning:** Carbon-neutral production, refillable containers
- **Target Audience:** Premium/luxury buyers, 35-50 age range
- **Brand Tone:** Sophisticated, science-backed, premium

[... 5 more competitors documented similarly ...]

## Category Insights

**Common themes:**
- Sustainability is TABLE STAKES - all competitors emphasize eco-credentials
- Product focus varies (anti-aging, problem skin, general care)
- Price positioning ranges from accessible ($20-40) to premium ($60-120)
- Target audiences span millennials to Gen X

**Initial observations:**
- "Clean" and "sustainable" used interchangeably
- Transparency about ingredients is differentiator
- Educational content is common across all
```

**AI updates TODO.md:**
```markdown
## Phases

- [x] Phase 1: Competitor Identification → [01-competitors.md](artifacts/01-competitors.md)
- [ ] Phase 2a: Positioning Analysis
- [ ] Phase 2b: Content Analysis
- [ ] Phase 3: Strategic Synthesis

## Artifacts

- [x] [01-competitors.md](artifacts/01-competitors.md) - 7 competitors identified
- [ ] [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md)
- [ ] [02b-content-analysis.md](artifacts/02b-content-analysis.md)
- [ ] [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md)
- [ ] [RESEARCH.md](RESEARCH.md)

## Current Phase

**Phase 2a & 2b:** Analyzing positioning and content in parallel...
```

#### 2.3: Execute Phase 2a & 2b (Parallel)

**AI reads PLAN.md Phase 2a and 2b:**
- Both phases read `01-competitors.md`
- Both can run independently
- Launch both simultaneously

**AI delegates both phases** (in one message):

```
Task 1 (Phase 2a):
- Read: artifacts/01-competitors.md
- Analyze: Positioning strategies
- Write: artifacts/02a-positioning-analysis.md

Task 2 (Phase 2b):
- Read: artifacts/01-competitors.md
- Analyze: Content strategies
- Write: artifacts/02b-content-analysis.md
```

**Phase 2a produces `artifacts/02a-positioning-analysis.md`:**

```markdown
# Phase 2a: Positioning Analysis

## Overview

Analyzed positioning strategies across 7 competitors. Three distinct positioning
archetypes emerge, with sustainability as baseline.

## Positioning Patterns

### Archetype 1: Science-Backed Premium (2 competitors)
- Positioning: "Clinically-proven eco-luxury"
- Differentiation: Scientific credentials + sustainability
- Audience: Affluent, results-oriented
- Example: Pure Earth Beauty - "Science meets sustainability"

### Archetype 2: Accessible Clean Beauty (3 competitors)
- Positioning: "Clean, effective, affordable"
- Differentiation: Price accessibility + transparency
- Audience: Budget-conscious eco-consumers
- Example: EcoGlow - "Clean beauty for everyone"

### Archetype 3: Activist Brand (2 competitors)
- Positioning: "Beauty as environmental activism"
- Differentiation: Mission-driven, cause-oriented
- Audience: Values-driven consumers
- Example: Earth First Beauty - "Every purchase plants a tree"

## Competitive Positioning Matrix

| Competitor | Price | Focus | Differentiation |
|------------|-------|-------|-----------------|
| EcoGlow | $$ | Accessible | Price + transparency |
| Pure Earth Beauty | $$$$ | Premium | Science + luxury |
| Earth First Beauty | $$$ | Activist | Mission-driven |
[... matrix continues ...]

## Differentiation Opportunities

1. **Science + Accessibility Gap:** No competitor combines scientific backing
   with accessible pricing
2. **Ingredient Transparency:** Many claim it, few show detailed sourcing
3. **Results-Focused Sustainability:** Most emphasize eco-credentials over results

## Recommendations for Our Positioning

- Consider science-backed positioning at mid-market price
- Emphasize ingredient transparency with traceable sourcing
- Frame sustainability as ENABLING better results, not compromising them
```

**Phase 2b produces `artifacts/02b-content-analysis.md`:**

```markdown
# Phase 2b: Content Strategy Analysis

## Overview

Analyzed content strategies and brand voices across 7 competitors. Educational
content is universal, but tone and depth vary significantly.

## Voice & Tone Patterns

### Premium/Sophisticated (Pure Earth Beauty, Luxe Green)
- Tone: Refined, authoritative, science-forward
- Language: Technical terms, clinical language
- Approach: Expert-to-consumer
- Example: "Our biomimetic peptides work synergistically..."

### Friendly/Accessible (EcoGlow, Clean Collective)
- Tone: Warm, conversational, encouraging
- Language: Simple, jargon-free
- Approach: Friend-to-friend
- Example: "Let's talk about what's really in your moisturizer..."

### Mission-Driven/Activist (Earth First Beauty, Green Warrior)
- Tone: Passionate, urgent, values-forward
- Language: Emotive, cause-oriented
- Approach: Rally-to-action
- Example: "Join us in revolutionizing beauty's impact on our planet..."

## Content Themes

**Universal themes across all competitors:**
1. Ingredient education (what's in products and why)
2. Sustainability practices (how they're eco-friendly)
3. Results/benefits (what products do)

**Differentiating themes:**
- Science education (premium brands emphasize research)
- Community building (activist brands focus on movement)
- Transparency (accessible brands show behind-the-scenes)

## Content Formats

| Format | Usage | Purpose |
|--------|-------|---------|
| Blog posts | Universal (100%) | SEO, education, thought leadership |
| Social media | Universal (100%) | Community, engagement |
| Video | 60% | Product demos, ingredient stories |
| Email | 80% | Direct communication, offers |
| Podcasts | 20% | Deep-dive education (premium brands) |

## Content Opportunities

1. **Depth Gap:** Most content is surface-level; opportunity for deep-dive science
2. **Practical How-To:** Lacking practical skincare routines and application guides
3. **Ingredient Traceability:** No one showing full supply chain transparency

## Recommendations for Our Content Strategy

- Blend accessible tone with scientific depth
- Create ingredient transparency content (origin stories)
- Develop practical how-to content beyond product claims
- Balance education (60%) with inspiration (30%) and promotion (10%)
```

**AI updates TODO.md:**
```markdown
## Phases

- [x] Phase 1: Competitor Identification → [01-competitors.md](artifacts/01-competitors.md)
- [x] Phase 2a: Positioning Analysis → [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md)
- [x] Phase 2b: Content Analysis → [02b-content-analysis.md](artifacts/02b-content-analysis.md)
- [ ] Phase 3: Strategic Synthesis

## Artifacts

- [x] [01-competitors.md](artifacts/01-competitors.md) - 7 competitors identified
- [x] [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md) - Positioning analysis complete
- [x] [02b-content-analysis.md](artifacts/02b-content-analysis.md) - Content analysis complete
- [ ] [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md)
- [ ] [RESEARCH.md](RESEARCH.md)

## Current Phase

**Phase 3:** Synthesizing strategic recommendations...
```

#### 2.4: Execute Phase 3

**AI reads PLAN.md Phase 3:**
- Task: Synthesize both analyses into recommendations
- Input: `02a-positioning-analysis.md` + `02b-content-analysis.md`
- Output: `artifacts/03-strategic-synthesis.md`

**AI creates synthesis:**

```markdown
# Phase 3: Strategic Synthesis

## Overview

Synthesized positioning and content analyses to identify strategic opportunities
for differentiation in the eco-friendly skincare category.

## Category Landscape Summary

**Category Definition:**
The eco-friendly skincare category is CROWDED and sustainability is TABLE STAKES.
Success requires differentiation beyond "we're eco-friendly."

**Three positioning archetypes identified:**
1. Science-Backed Premium ($$$$ - clinical + luxury)
2. Accessible Clean Beauty ($$ - transparent + affordable)
3. Activist Brand ($$$ - mission + community)

**White space:** Science-backed accessibility (mid-market)

## Competitive Positioning Map

```
High Price
    ↑
    | Pure Earth (Science Premium)
    | Luxe Green (Luxury)
    |     ☆ OPPORTUNITY
    | Green Warrior (Activist)
    | EcoGlow (Accessible)
    |
    └──────────────────────→
    Results-Focused    Mission-Focused
```

☆ = Opportunity zone: Science-backed, results-focused, mid-market pricing

## Key Strategic Opportunities

### 1. Science + Accessibility Positioning

**The gap:** No competitor combines:
- Scientific backing and clinical validation
- Mid-market pricing ($40-60 range)
- Results-focused messaging

**Why it works:**
- Captures customers trading up from accessible brands (want better results)
- Captures customers trading down from premium brands (want better value)
- Differentiates through ENABLING better results via sustainability

**Positioning statement direction:**
"Clinically-backed, eco-friendly skincare that delivers premium results without
the premium price."

### 2. Radical Ingredient Transparency

**The gap:** Everyone claims transparency, few deliver:
- Full supply chain visibility
- Ingredient sourcing stories
- Real cost breakdowns

**Why it works:**
- Builds trust through proof, not claims
- Creates educational content opportunity
- Supports mid-market pricing (show value)

**Content implication:**
Create "ingredient journey" content showing traceability

### 3. Results-Focused Sustainability Narrative

**The gap:** Competitors frame sustainability as:
- A compromise ("works pretty well AND it's eco-friendly")
- A separate benefit ("great results + also sustainable")

**Opportunity:** Frame sustainability as ENABLING better results:
- Cleaner ingredients = safer, more effective
- Sustainable sourcing = higher quality
- Eco-friendly = better for your skin

**Messaging direction:**
"Sustainable because it's better for your skin, not despite it."

## Content Strategy Implications

### Voice & Tone Recommendation

**Blend accessible + scientific:**
- Warm and conversational (not clinical or cold)
- Science-backed (not pseudoscience or marketing fluff)
- Empowering (help customers understand, not talk down)

**Example tone:**
"Let's break down what retinol actually does (and why ours is different).
Clinical studies show..."

### Content Theme Priorities

1. **Ingredient transparency** (40% of content)
   - Sourcing stories
   - Scientific explanations
   - Supply chain visibility

2. **Results education** (30% of content)
   - How ingredients work
   - What to expect (realistic timelines)
   - Clinical backing

3. **Practical guidance** (20% of content)
   - Routines and application
   - Product combinations
   - Skin concern solutions

4. **Mission/values** (10% of content)
   - Sustainability practices
   - Community impact
   - Brand story

## Strategic Recommendations

### Positioning

1. **Claim the science + accessibility white space**
   - Position as "Clinically-backed clean beauty at fair pricing"
   - Emphasize results AND transparency
   - Mid-market price positioning ($40-60)

2. **Differentiate through radical transparency**
   - Show full ingredient sourcing (not just "organic")
   - Explain cost breakdowns
   - Provide clinical study access

3. **Reframe sustainability narrative**
   - Sustainable BECAUSE it delivers better results
   - Clean ingredients = more effective
   - Eco-friendly = better for skin

### Content Strategy

1. **Voice:** Accessible science (warm + authoritative)
2. **Content mix:** 40% transparency, 30% results, 20% practical, 10% mission
3. **Key formats:** Deep-dive blog posts, ingredient journey videos, how-to guides
4. **Differentiation:** Depth + practicality (not just marketing claims)

### Next Steps

1. Validate positioning with customer research
2. Develop detailed positioning framework
3. Create brand voice guidelines based on accessible science tone
4. Build content calendar around transparency + results themes
```

**AI updates TODO.md:**
```markdown
## Phases

- [x] Phase 1: Competitor Identification → [01-competitors.md](artifacts/01-competitors.md)
- [x] Phase 2a: Positioning Analysis → [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md)
- [x] Phase 2b: Content Analysis → [02b-content-analysis.md](artifacts/02b-content-analysis.md)
- [x] Phase 3: Strategic Synthesis → [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md)

## Artifacts

- [x] [01-competitors.md](artifacts/01-competitors.md) - 7 competitors identified
- [x] [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md) - Positioning analysis complete
- [x] [02b-content-analysis.md](artifacts/02b-content-analysis.md) - Content analysis complete
- [x] [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md) - Strategic synthesis complete
- [ ] [RESEARCH.md](RESEARCH.md) - Final output in progress

## Current Phase

**Final Synthesis:** Creating consolidated RESEARCH.md...
```

#### 2.5: Create Final Output

**AI synthesizes all artifacts into `RESEARCH.md`:**

```markdown
# Competitive Landscape Research: Eco-Friendly Skincare

**Research Date:** 2025-10-30
**Execution:** /brand/research/competitive-analysis/2025-10-30@14:30/
**Status:** ✅ Complete

## Executive Summary

This research analyzed 7 direct competitors in the eco-friendly skincare category
to identify strategic positioning and content opportunities.

**Key Finding:** The category is crowded, sustainability is table stakes, and
success requires differentiation beyond eco-credentials. A significant WHITE SPACE
exists at the intersection of scientific backing and accessible pricing.

**Strategic Opportunity:** Position as science-backed, results-focused clean beauty
at mid-market pricing ($40-60), differentiated through radical ingredient transparency
and a sustainability narrative that ENABLES better results.

## Category Landscape

### Competitors Analyzed

Identified and analyzed [7 key competitors](artifacts/01-competitors.md):

1. **EcoGlow Skincare** - Accessible clean beauty ($20-40)
2. **Pure Earth Beauty** - Science-backed premium ($80-120)
3. **Earth First Beauty** - Mission-driven activist brand ($50-80)
4. **Clean Collective** - Accessible transparency ($25-45)
5. **Luxe Green** - Luxury eco-positioning ($100-150)
6. **Green Warrior** - Activist community brand ($60-90)
7. **Nature's Science** - Mid-market general eco ($40-70)

### Positioning Patterns

Three distinct [positioning archetypes](artifacts/02a-positioning-analysis.md)
dominate the category:

**1. Science-Backed Premium**
- Positioning: Clinical validation + luxury
- Price: $$$$ ($80-150)
- Differentiation: Scientific credentials
- Examples: Pure Earth Beauty, Luxe Green

**2. Accessible Clean Beauty**
- Positioning: Transparent + affordable
- Price: $$ ($20-45)
- Differentiation: Price accessibility
- Examples: EcoGlow, Clean Collective

**3. Activist Brand**
- Positioning: Mission-driven + community
- Price: $$$ ($50-90)
- Differentiation: Cause orientation
- Examples: Earth First Beauty, Green Warrior

**White Space Identified:** Science-backed accessibility (clinical + mid-market)

### Content Patterns

[Content analysis](artifacts/02b-content-analysis.md) reveals three voice archetypes:

**1. Premium/Sophisticated**
- Tone: Refined, authoritative, clinical
- Used by: Pure Earth Beauty, Luxe Green
- Strength: Credibility through expertise
- Weakness: Can feel cold or inaccessible

**2. Friendly/Accessible**
- Tone: Warm, conversational, jargon-free
- Used by: EcoGlow, Clean Collective
- Strength: Approachable and relatable
- Weakness: Can lack scientific credibility

**3. Mission-Driven/Activist**
- Tone: Passionate, urgent, values-forward
- Used by: Earth First Beauty, Green Warrior
- Strength: Emotional connection and community
- Weakness: Can feel preachy or guilt-focused

**Content Gap:** Deep scientific education delivered in accessible voice

## Strategic Opportunities

Full analysis in [strategic synthesis](artifacts/03-strategic-synthesis.md).

### 1. Science + Accessibility White Space

**Opportunity:** No competitor combines scientific backing with mid-market pricing.

**Positioning direction:**
"Clinically-backed, eco-friendly skincare that delivers premium results without
the premium price."

**Why it wins:**
- Captures trade-up customers (accessible brands → want better results)
- Captures trade-down customers (premium brands → want better value)
- Differentiates beyond "we're eco-friendly"

### 2. Radical Ingredient Transparency

**Opportunity:** Everyone claims transparency, few show full traceability.

**Differentiation strategy:**
- Show complete supply chain (not just "organic")
- Create ingredient sourcing stories
- Provide real cost breakdowns

**Why it matters:**
- Builds trust through proof (not marketing claims)
- Supports mid-market pricing (show value)
- Creates rich educational content

### 3. Results-Focused Sustainability Narrative

**Opportunity:** Reframe sustainability from compromise to enabler.

**Current framing (competitors):**
- "Works well AND it's eco-friendly" (sustainability as separate benefit)
- "Pretty good results for eco-friendly" (sustainability as compromise)

**Our framing:**
- "Better results BECAUSE it's sustainable"
- "Clean ingredients = more effective"
- "Eco-friendly = better for your skin"

## Recommendations

### Positioning Strategy

**Position:** Science-backed clean beauty at fair pricing

**Core pillars:**
1. **Clinical validation** - Results backed by science
2. **Radical transparency** - Full ingredient traceability
3. **Fair pricing** - Premium results, mid-market price ($40-60)
4. **Results-focused sustainability** - Eco-friendly ENABLES better results

**Target:** Customers who want premium results without premium pricing, value
transparency, and see sustainability as enabler (not compromise).

### Content Strategy

**Voice:** Accessible science
- Warm and conversational (not clinical or cold)
- Science-backed (not marketing fluff)
- Empowering (help customers understand)

**Content theme mix:**
- 40% Ingredient transparency and sourcing
- 30% Results education and science
- 20% Practical guidance and how-to
- 10% Mission and values

**Key differentiators:**
- Depth (not surface-level education)
- Transparency (show, don't just claim)
- Practicality (actionable guidance, not just product benefits)

### Next Steps

1. **Validate positioning** with customer research
2. **Develop positioning framework** in strategy layer
3. **Create voice guidelines** based on accessible science tone
4. **Build content calendar** around transparency + results themes

## Artifact Index

Full details available in phase artifacts:

- [01-competitors.md](artifacts/01-competitors.md) - Complete competitor profiles
- [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md) - Detailed positioning analysis
- [02b-content-analysis.md](artifacts/02b-content-analysis.md) - Detailed content analysis
- [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md) - Full strategic recommendations
```

**AI finalizes TODO.md:**

```markdown
# Competitive Landscape Discovery Progress

**Status:** ✅ Completed
**Started:** 2025-10-30 14:30
**Completed:** 2025-10-30 15:47

## Summary

**Key Outcome:** Identified 7 key competitors and analyzed their positioning and
content strategies. Discovered significant white space at intersection of scientific
backing and mid-market pricing. Developed strategic recommendations for
science-backed accessible positioning with radical transparency differentiation.

**Final Output:** [RESEARCH.md](RESEARCH.md)

## Phases

- [x] Phase 1: Competitor Identification → [01-competitors.md](artifacts/01-competitors.md)
- [x] Phase 2a: Positioning Analysis → [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md)
- [x] Phase 2b: Content Analysis → [02b-content-analysis.md](artifacts/02b-content-analysis.md)
- [x] Phase 3: Strategic Synthesis → [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md)

## Artifacts

- [x] [01-competitors.md](artifacts/01-competitors.md) - 7 competitors identified with detailed profiles
- [x] [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md) - Positioning archetypes and white space analysis
- [x] [02b-content-analysis.md](artifacts/02b-content-analysis.md) - Voice patterns and content opportunities
- [x] [03-strategic-synthesis.md](artifacts/03-strategic-synthesis.md) - Strategic recommendations
- [x] [RESEARCH.md](RESEARCH.md) - Consolidated competitive landscape research

## Notes

- Phase 2a and 2b executed in parallel (saved ~15 minutes)
- Identified unexpected white space in science + accessibility intersection
- Radical transparency emerged as key differentiator
- Next step: validate positioning with customer research
```

### Step 3: Review and Use

You now have:

1. **Complete audit trail**
   - PLAN.md shows what was intended
   - TODO.md shows what actually happened
   - Artifacts show intermediate thinking

2. **Traceable insights**
   - Final RESEARCH.md references artifacts
   - Can click through to see detailed analysis
   - Every claim has supporting evidence

3. **Reusable artifacts**
   - Competitor list can be updated in future
   - Positioning analysis informs strategy work
   - Content analysis guides content creation

4. **Clear next steps**
   - Validate positioning with customer research
   - Develop positioning strategy
   - Create voice guidelines
   - Build content calendar

---

## Part 9: Common Pitfalls and How to Avoid Them

### Pitfall 1: Over-Orchestrating Simple Tasks

**What it looks like:**
Creating a 4-phase plan for "Update competitor list with one new company"

**Why it's bad:**
- Adds unnecessary overhead
- Slows down simple work
- Creates complexity where none needed

**How to avoid:**
- Ask: "Does this need 3+ distinct phases?"
- If task is < 5 minutes, don't orchestrate
- Simple edits don't need plans

**When you realize you're doing it:**
"If writing the PLAN.md is taking longer than just doing the task, don't orchestrate."

### Pitfall 2: Under-Orchestrating Complex Work

**What it looks like:**
Trying to do competitive analysis in one unstructured prompt

**Why it's bad:**
- Context overload (too much at once)
- No progress visibility
- Can't resume if interrupted
- Hard to validate quality

**How to avoid:**
- If work has 3+ distinct activities, orchestrate
- If work takes > 15 minutes, orchestrate
- If failure halfway through would be costly, orchestrate

**When you realize you're doing it:**
"If you're thinking 'I hope the AI doesn't miss anything,' you need orchestration."

### Pitfall 3: Vague Phase Definitions

**What it looks like:**
```
Phase 1: Research stuff
Phase 2: Analyze things
Phase 3: Make recommendations
```

**Why it's bad:**
- Agents don't know what to focus on
- Unclear what artifacts should contain
- Hard to validate completion

**How to avoid:**
- Be specific about inputs and outputs
- Define what "done" looks like
- Give clear scope boundaries

**Good version:**
```
Phase 1: Competitor Identification
Input: None (web research)
Output: List of 5-7 competitors with URLs, product focus, and positioning
Success: Can name competitors and explain why they're relevant
```

### Pitfall 4: Missing Parallelization Opportunities

**What it looks like:**
```
Phase 2: Analyze positioning
Phase 3: Analyze content
Phase 4: Analyze pricing
```
(All three read same competitor list but run sequentially)

**Why it's bad:**
- Wastes time (could run simultaneously)
- Phases don't depend on each other
- Execution takes 3x longer than necessary

**How to avoid:**
- Ask: "Can these phases run at the same time?"
- If phases read same inputs but produce different outputs → parallel
- Use letter suffixes (2a, 2b, 2c) in PLAN.md

**Good version:**
```
Phase 2a: Analyze positioning  ┐
Phase 2b: Analyze content      ├→ All run in parallel
Phase 2c: Analyze pricing      ┘
```

### Pitfall 5: Broken Artifact Naming

**What it looks like:**
```
artifacts/
├── competitors.md
├── positioning_analysis.md
├── ContentAnalysis.md
└── synthesis-final-v2.md
```

**Why it's bad:**
- Can't tell execution order
- Inconsistent naming breaks automation
- Hard to match artifacts to phases

**How to avoid:**
- Always use phase numbers: `01-`, `02a-`, `03-`
- Always kebab-case: `positioning-analysis` not `positioning_analysis`
- Always `.md` extension
- Follow convention exactly

**Good version:**
```
artifacts/
├── 01-competitors.md
├── 02a-positioning-analysis.md
├── 02b-content-analysis.md
└── 03-synthesis.md
```

### Pitfall 6: TODO.md Not Updated

**What it looks like:**
- Phases completed but TODO.md still shows "In Progress"
- Checkboxes not checked off
- Current phase not updated
- No completion timestamp

**Why it's bad:**
- You can't see progress
- Can't resume from interruption
- No audit trail of what happened

**How to avoid:**
- Update TODO.md immediately after each phase
- Check off completed phases
- Update "Current Phase" indicator
- Add completion summary and timestamp when done

**Good practice:**
```
After Phase 2a completes:
1. Check off Phase 2a in checklist
2. Check off 02a artifact
3. Update "Current Phase" to Phase 2b
4. Add any relevant notes
```

### Pitfall 7: Lost Context Between Phases

**What it looks like:**
Phase 3 asks: "Wait, what were the competitors again?"

**Why it's bad:**
- Artifacts not being used properly
- Context not passed forward
- Duplication of work

**How to avoid:**
- Always specify input artifacts in PLAN.md
- Pass artifact paths to agents (progressive disclosure)
- Each phase reads previous phase outputs

**Good delegation:**
```
Phase 3 instructions:
"Read positioning analysis from: artifacts/02a-positioning-analysis.md
Read content analysis from: artifacts/02b-content-analysis.md
Synthesize both into recommendations..."
```

### Pitfall 8: No Final Synthesis

**What it looks like:**
- Artifacts created but no RESEARCH.md
- User has to read 4 separate files to get insights
- No narrative flow, just disconnected analyses

**Why it's bad:**
- Insights buried in artifacts
- No cohesive story
- Hard to act on findings

**How to avoid:**
- Always include final synthesis phase
- RESEARCH.md should tell complete story
- Reference artifacts for details, but synthesize key insights
- Provide clear recommendations

**Good final output:**
- Executive summary of findings
- Key insights synthesized across phases
- References to detailed artifacts
- Clear next steps and recommendations

---

## Part 10: Knowledge Check

### Questions to Test Understanding

#### Question 1: When to Orchestrate

**Scenario:** You need to update the voice strategy document to include a new example tweet.

**Should you orchestrate this? Why or why not?**

<details>
<summary>Answer</summary>

**No, don't orchestrate.**

**Why:**
- Single task (read strategy, add example, save)
- Takes < 2 minutes
- No phases to coordinate
- No intermediate artifacts needed
- Just use Edit tool directly

**Complexity threshold not met:** This is a simple edit, not a multi-phase workflow.
</details>

#### Question 2: Phase Decomposition

**Scenario:** You're asked to "create a positioning strategy based on competitive research and customer interviews."

**Break this into phases with clear inputs and outputs.**

<details>
<summary>Answer</summary>

**Good decomposition:**

```
Phase 1: Context Synthesis
Input: /brand/research/competitive-analysis/RESEARCH.md
       /brand/research/customer-interviews/RESEARCH.md
Task: Extract positioning-relevant insights
Output: 01-context-synthesis.md

Phase 2: Positioning Framework
Input: 01-context-synthesis.md
Task: Draft core positioning (target, problem, solution, differentiation)
Output: 02-positioning-framework.md

Phase 3: Messaging Hierarchy
Input: 02-positioning-framework.md
Task: Develop key messages, benefits, proof points
Output: 03-messaging-hierarchy.md

Phase 4: Final Strategy
Input: 02-positioning-framework.md
       03-messaging-hierarchy.md
Task: Consolidate into complete positioning strategy
Output: STRATEGY.md
```

**What makes this good:**
- Clear input/output boundaries
- Single responsibility per phase
- Logical flow (context → framework → messages → final)
- Each artifact has clear purpose
</details>

#### Question 3: Artifact Naming

**Given these phases:**
```
Phase 1: Identify competitors
Phase 2a: Analyze positioning (parallel)
Phase 2b: Analyze pricing (parallel)
Phase 3: Create synthesis
```

**What should the artifacts be named?**

<details>
<summary>Answer</summary>

```
artifacts/
├── 01-competitors.md            (Phase 1)
├── 02a-positioning-analysis.md  (Phase 2a)
├── 02b-pricing-analysis.md      (Phase 2b)
└── 03-synthesis.md              (Phase 3)
```

**Key rules applied:**
- Phase numbers match (01, 02a, 02b, 03)
- Parallel phases use letters (a, b)
- Kebab-case naming
- Descriptive names
- All .md extension
</details>

#### Question 4: Parallelization

**Which of these phase groups can run in parallel?**

**Group A:**
```
Phase 1: Research competitors
Phase 2: Analyze competitor data
Phase 3: Create recommendations
```

**Group B:**
```
Phase 1: Extract customer interview themes
Phase 2a: Analyze pain points
Phase 2b: Analyze desires/goals
Phase 2c: Analyze language patterns
```

<details>
<summary>Answer</summary>

**Group A:** Cannot parallelize - sequential dependencies
- Phase 2 needs Phase 1 output (can't analyze without data)
- Phase 3 needs Phase 2 output (can't recommend without analysis)

**Group B:** Phases 2a, 2b, 2c CAN parallelize
- All three read same input (Phase 1 themes)
- All three analyze different aspects independently
- None depend on each other's outputs
- Should be executed simultaneously

**Naming:**
```
Phase 1: Extract themes → 01-themes.md
Phase 2a: Analyze pain points → 02a-pain-points.md (parallel)
Phase 2b: Analyze desires → 02b-desires.md (parallel)
Phase 2c: Analyze language → 02c-language.md (parallel)
Phase 3: Synthesize findings → 03-synthesis.md
```
</details>

#### Question 5: TODO.md Updates

**After Phase 2a completes, what should be updated in TODO.md?**

<details>
<summary>Answer</summary>

**Four things to update:**

1. **Check off phase:**
```markdown
- [x] Phase 2a: Positioning Analysis → [02a-positioning.md](artifacts/02a-positioning.md)
```

2. **Check off artifact:**
```markdown
- [x] [02a-positioning.md](artifacts/02a-positioning.md) - Positioning analysis complete
```

3. **Update current phase:**
```markdown
## Current Phase

**Phase 2b:** Analyzing pricing strategy...
```

4. **Add notes (if relevant):**
```markdown
## Notes

- Phase 2a identified strong differentiation opportunity in science + accessibility
```

**Why these updates matter:**
- Visibility (you can see progress)
- Resumability (clear what's done and what's next)
- Audit trail (record of execution)
</details>

### Practical Exercise: Plan a Workflow

**Scenario:** You're creating a Twitter content strategy based on existing voice and messaging strategy.

**Your task:** Create a PLAN.md outline with:
- Objective
- Phase breakdown (with numbers/letters)
- Input and output for each phase
- Identify any parallel opportunities

**Try it yourself before looking at the answer.**

<details>
<summary>Example Answer</summary>

```markdown
# Twitter Content Strategy Development

## Objective

Create a Twitter-specific content strategy that extends our voice and messaging
strategy with platform-specific guidelines, content themes, and example posts.

## Approach

1. Synthesize existing strategy into Twitter context
2. Define Twitter-specific voice adaptations
3. Develop content themes and calendar structure
4. Create example posts and guidelines

## Step by Step Tasks

### 1. Strategy Context Synthesis

**Agent:** general-purpose
**Input:**
- /brand/strategy/voice/STRATEGY.md
- /brand/strategy/messaging/STRATEGY.md
**Output:** `artifacts/01-context-synthesis.md`

**Task:**
Extract Twitter-relevant insights from voice and messaging strategies:
- Core brand voice principles
- Key messaging themes
- Platform considerations mentioned
- Content guidelines applicable to Twitter

### 2. Twitter Voice Adaptation

**Agent:** general-purpose
**Input:** `artifacts/01-context-synthesis.md`
**Output:** `artifacts/02-twitter-voice.md`

**Task:**
Adapt core voice principles for Twitter:
- How does our voice translate to 280 characters?
- What tone adjustments for Twitter's fast-paced environment?
- What to emphasize, what to de-emphasize
- Examples of voice in tweets

### 3a. Content Theme Framework (parallel)

**Agent:** general-purpose
**Input:** `artifacts/01-context-synthesis.md`
**Output:** `artifacts/03a-content-themes.md`

**Task:**
Define 5-7 content themes based on messaging strategy:
- Theme definitions
- Why each theme matters
- Topic examples for each theme
- Content mix recommendations (% per theme)

### 3b. Tweet Type Framework (parallel)

**Agent:** general-purpose
**Input:** `artifacts/01-context-synthesis.md`
**Output:** `artifacts/03b-tweet-types.md`

**Task:**
Define tweet formats and types:
- Educational tweets
- Thought leadership
- Community engagement
- Product highlights
- Behind-the-scenes
- Format guidelines for each type

### 4. Example Posts

**Agent:** general-purpose
**Input:**
- `artifacts/02-twitter-voice.md`
- `artifacts/03a-content-themes.md`
- `artifacts/03b-tweet-types.md`
**Output:** `artifacts/04-example-posts.md`

**Task:**
Create 10 example tweets demonstrating:
- Voice principles in action
- Each content theme represented
- Different tweet types
- Both single tweets and thread structures

### 5. Final Strategy Synthesis

**Agent:** general-purpose
**Input:** All previous artifacts
**Output:** `STRATEGY.md`

**Task:**
Consolidate into complete Twitter content strategy extension:
- Voice adaptation for Twitter
- Content themes and mix
- Tweet type guidelines
- Example posts
- Calendar structure
- Metrics and success criteria

## Expected Artifacts

- **01-context-synthesis.md** - Twitter-relevant strategy insights
- **02-twitter-voice.md** - Voice adaptation guidelines
- **03a-content-themes.md** - Content theme framework (parallel)
- **03b-tweet-types.md** - Tweet type framework (parallel)
- **04-example-posts.md** - 10 example tweets
- **STRATEGY.md** - Complete Twitter content strategy extension

## Success Criteria

- [ ] Voice principles adapted for Twitter format
- [ ] 5-7 content themes defined with examples
- [ ] Tweet type framework with guidelines
- [ ] 10 example posts demonstrating strategy
- [ ] Complete strategy document ready for approval
```

**What makes this plan good:**
- Clear objective and approach
- Logical phase flow (context → voice → themes → examples → final)
- Parallel opportunity identified (3a, 3b can run simultaneously)
- Clear inputs and outputs for each phase
- Specific, actionable tasks
- Success criteria defined
</details>

---

## Part 11: Summary & Key Takeaways

### What You Learned

In this class, you learned:

1. **Why orchestration matters**
   - Breaks complex work into manageable phases
   - Makes invisible work visible
   - Enables progress tracking and resumability
   - Solves context overload problem from Class 1

2. **The orchestration pattern**
   - PLAN.md: Blueprint created during planning
   - TODO.md: Progress tracker updated during execution
   - Artifacts: Phase outputs that flow between tasks
   - Three-document system for coordination

3. **When to use orchestration**
   - 3+ distinct phases with intermediate outputs
   - Coordination needs across multiple agents
   - Work that takes > 15 minutes
   - Need for progress visibility or resumability

4. **How to structure executions**
   - Standard folder structure with timestamp
   - artifacts/ for phase outputs
   - Proper file naming (phase numbers + descriptive names)
   - Where executions live in AMA framework

5. **Progressive task breakdown**
   - Single responsibility per phase
   - Clear input/output boundaries
   - Identify parallelization opportunities
   - Logical flow with dependencies

6. **Artifact management**
   - Strict naming conventions ({phase}{letter}-{name}.md)
   - Artifacts create data pipeline through workflow
   - Reference artifacts for traceability
   - Structure artifacts for clarity

7. **The agentic-orchestrating skill**
   - Packaged orchestration knowledge
   - Progressive disclosure of guidance
   - Templates and patterns for reuse
   - Integration with /plan and /implement commands

8. **Practical application**
   - Walked through complete research execution
   - Saw planning, implementation, and synthesis
   - Tracked progress through TODO.md
   - Created traceable, verifiable output

### How This Connects to Previous Classes

**Class 1 (Context Problem):**
→ Orchestration solves context overload by breaking work into focused phases

**Class 3 (AMA Structure):**
→ Temporal execution folders ARE orchestrated workflows with PLAN/TODO/artifacts

**Class 6 (Delegation):**
→ Orchestration coordinates delegation - which agents do which phases

**Class 7 (Skills):**
→ Agentic-orchestrating skill packages orchestration methodology

### How This Prepares for Class 9

Class 9 (Advanced Orchestration Patterns) will build on these fundamentals:

**What you'll learn next:**
- Creating wrapper commands around orchestration (like `/research-competitor`)
- Building custom workflows within skills
- Adding feedback loops and validation stages
- Multi-phase workflows with dynamic task generation
- Quality review and iteration patterns

**Foundation you now have:**
- Understand the PLAN/TODO/artifact pattern
- Can break down complex work into phases
- Know when orchestration is appropriate
- Can structure and track executions

---

## Part 12: Next Steps

### Practice Opportunities

#### Exercise 1: Evaluate Orchestration Need
**Task:** For each scenario, decide if orchestration is needed and explain why.

1. "Add a new competitor to our competitive analysis research"
2. "Create a complete content strategy for LinkedIn based on voice and positioning"
3. "Fix a typo in the voice strategy document"
4. "Research 5 competitors and synthesize positioning opportunities"

#### Exercise 2: Decompose a Task
**Task:** Break down "Create a brand voice strategy from customer interview transcripts" into phases.

Define:
- Phase numbers and names
- Input for each phase
- Output artifact names
- Any parallel opportunities

#### Exercise 3: Create a Plan
**Task:** Write a PLAN.md for conducting founder interview research that:
- Processes 3 interview transcripts
- Extracts themes across interviews
- Synthesizes into strategic insights
- Produces RESEARCH.md output

### What to Review

Before Class 9, make sure you're comfortable with:
- [ ] Deciding when to use orchestration
- [ ] Breaking complex tasks into phases
- [ ] Identifying parallelization opportunities
- [ ] Artifact naming conventions
- [ ] PLAN.md and TODO.md structure
- [ ] The execution folder pattern

### Additional Resources

**AMA Documentation:**
- [CLAUDE.md](/CLAUDE.md) - Complete structural guide, orchestration in context
- [agentic-orchestrating skill](/.claude/skills/agentic-orchestrating/SKILL.md) - Full orchestration reference
- [Planning reference](/.claude/skills/agentic-orchestrating/references/planning.md) - Planning methodology
- [Implementation reference](/.claude/skills/agentic-orchestrating/references/implementation.md) - Execution patterns
- [Artifacts reference](/.claude/skills/agentic-orchestrating/references/artifacts.md) - Artifact management

**Commands to Try:**
- `/plan` - Create an orchestrated workflow plan
- `/implement` - Execute a PLAN.md from execution folder

### Checking Your Understanding

**You're ready for Class 9 when you can:**
- Explain when orchestration is needed versus overkill
- Create a PLAN.md with proper phase breakdown
- Identify parallel execution opportunities
- Name artifacts following conventions
- Track progress through TODO.md
- Understand how orchestration fits into AMA methodology

---

## Congratulations!

You now understand the fundamentals of agent orchestration - how to coordinate complex, multi-phase marketing workflows through the PLAN/TODO/artifact pattern.

In Class 9, you'll take these fundamentals and learn advanced patterns: wrapper commands, custom workflows, feedback loops, and multi-phase coordination.

**Ready to continue?** Move on to Class 9: Advanced Orchestration Patterns.
