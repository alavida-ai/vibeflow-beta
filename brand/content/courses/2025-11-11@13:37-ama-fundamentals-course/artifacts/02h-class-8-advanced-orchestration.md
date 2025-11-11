# Class 9: Advanced Orchestration Patterns

**Course:** AMA Fundamentals Course
**Duration:** 90 minutes
**Format:** Theory + Hands-on Practice

---

## Class Overview

Congratulations! You've made it to the final class of the AMA Fundamentals Course.

You've learned the context problem that LLMs face (Class 1), how file systems solve it (Class 2-3), how to organize marketing work (Class 3), how to delegate effectively (Class 6), how to package workflows as skills (Class 7), and the fundamentals of orchestration (Class 8).

Now it's time to **master advanced orchestration patterns** that transform AMA from a methodology into your custom marketing system. In this class, you'll learn how to create domain-specific wrapper commands, build multi-phase workflows with feedback loops, implement quality validation stages, and design workflows that adapt dynamically based on results.

This is where everything comes together. By the end of this class, you'll be able to design and implement sophisticated marketing workflows tailored to your specific needs.

### Learning Objectives

By the end of this class, you will be able to:
- Create wrapper commands that streamline domain-specific workflows
- Build custom multi-phase workflows within skills
- Implement feedback loops and iteration patterns
- Design workflows with quality validation stages
- Use dynamic task generation (where Stage 1 defines Stage 2 tasks)
- Master artifact handoff patterns across complex workflows
- Design complete end-to-end marketing workflows

### Prerequisites

Before starting this class, you should have completed:
- **Class 5:** Claude Code Commands - Understand how to create custom commands
- **Class 7:** Claude Code Skills - Know how to structure and use skills
- **Class 8:** Agent Orchestration Fundamentals - Comfortable with PLAN/TODO/artifact pattern

### Estimated Time

- Advanced patterns and theory: 35 minutes
- Practical workflow design: 40 minutes
- Knowledge checks and capstone exercise: 15 minutes

---

## Part 1: Wrapper Commands - Domain-Specific Orchestration

### What Are Wrapper Commands?

Wrapper commands are **custom slash commands that encapsulate orchestrated workflows** for specific domains. They wrap the generic `/plan` and `/implement` pattern with domain-specific context and defaults.

**Think of them as shortcuts that:**
- Know what kind of work you're doing
- Load relevant context automatically
- Apply domain-specific patterns
- Guide you through the right process

### Why Wrapper Commands Matter

**Without wrappers:**
```
You: "Create a plan for competitive research"
AI: "What kind of research? What's the objective? Where should it go?"
You: "In /brand/research/competitive-analysis/, analyze 5 competitors..."
AI: "What aspects should I analyze?"
You: "Positioning, messaging, content strategy..."
(Multiple back-and-forth messages to set context)
```

**With wrapper command:**
```
You: "/discover-competitors eco-friendly skincare"
AI: (Already knows this is competitive research, belongs in /research/competitive-analysis/,
     should analyze positioning + content + pricing, uses standard competitive workflow)
→ Creates properly structured plan automatically
→ Loads appropriate research templates
→ Uses domain-specific success criteria
```

### The Pattern: Wrapper → /plan → Execution

Wrapper commands don't replace orchestration - they **guide it**:

```
/wrapper-command [arguments]
    ↓ (sets domain context)
Invokes /plan with domain-specific parameters
    ↓ (creates PLAN.md)
User approves plan
    ↓
Invokes /implement (standard orchestration)
    ↓ (executes phases)
Produces domain-specific output
```

### Example: The `/strategize` Command

Let's look at a real wrapper command from AMA:

```markdown
---
argument-hint: Path to research folder
---
# Strategize

## Purpose

Human-in-the-loop workflow to update your strategy based on the latest research findings

## Research

`RESEARCH_PATH`: $ARGUMENTS

## Instructions

1. If RESEARCH_PATH is not provided, ask the user for a research folder to review
2. This task requires the `agentic-orchestrating` skill to understand HOW to update strategy
3. Run the `/prime` command to understand current brand context
4. Once primed, read the RESEARCH.md and relevant files it discloses
5. Disclose new contradictions that arise, and impacted files
6. Collaborate through questions with the Marketing Architect to determine how to update strategy
```

**What this wrapper does:**
1. **Sets domain context** - This is strategy synthesis work
2. **Loads relevant skills** - References agentic-orchestrating skill
3. **Primes with context** - Runs /prime to load current brand state
4. **Follows specific workflow** - Read research → identify contradictions → collaborate
5. **Human-in-the-loop** - Built-in collaboration checkpoints

### Anatomy of a Wrapper Command

Good wrapper commands have four components:

#### 1. Clear Purpose Statement

```markdown
## Purpose

Human-in-the-loop workflow to update your strategy based on the latest research findings
```

**Why it matters:** Sets expectations for what this command accomplishes.

#### 2. Argument Handling

```markdown
## Research

`RESEARCH_PATH`: $ARGUMENTS

## Instructions

1. If RESEARCH_PATH is not provided, ask the user for a research folder to review
```

**Why it matters:** Defines what inputs the command needs and how to handle missing ones.

#### 3. Context Loading

```markdown
3. Run the `/prime` command to understand current brand context
4. Once primed, read the RESEARCH.md and relevant files it discloses
```

**Why it matters:** Progressive disclosure - load exactly what's needed for this workflow.

#### 4. Workflow Steps

```markdown
5. Disclose new contradictions that arise, and impacted files
6. Collaborate through questions with the Marketing Architect
```

**Why it matters:** Specific steps guide the AI through the domain-specific process.

### Why This Matters for AMA

Wrapper commands solve the **"I do this workflow repeatedly"** problem:

**Without wrappers, you repeat yourself:**
- "Create competitive research in /brand/research/competitive-analysis/"
- "Use the 3-phase pattern: identify → analyze → synthesize"
- "Make sure to analyze positioning, content, and pricing"
- "Output should be RESEARCH.md with artifact trail"

**With wrappers, it's one command:**
- `/discover-competitors [category]`
- Everything else is automatic

This turns AMA from a **methodology you follow manually** into a **system that guides you automatically**.

### Creating Your Own Wrapper Commands

#### Step 1: Identify Repeating Workflows

Ask yourself:
- What workflows do I run more than once?
- What context do I always need to provide?
- What steps are always the same?
- What domain-specific patterns exist?

**Examples:**
- Research: Competitive analysis, customer interviews, category research
- Strategy: Positioning synthesis, voice development, messaging hierarchy
- Content: Blog post creation, social media campaigns, email sequences

#### Step 2: Define the Workflow Pattern

For your repeating workflow, document:
- What inputs are needed (research paths, arguments, etc.)
- What context should be loaded automatically
- What phases typically occur
- What the output should look like
- What success criteria apply

#### Step 3: Create the Command File

Location: `/.claude/commands/{workflow-name}.md`

```markdown
---
argument-hint: What arguments this command expects
---
# Command Name

## Purpose

Clear one-sentence description of what this workflow accomplishes

## Arguments

Define any arguments the command accepts:
`ARG_NAME`: $ARGUMENTS

## Instructions

1. Handle missing arguments (ask user if needed)
2. Load relevant skills (agentic-orchestrating, domain-specific skills)
3. Load necessary context (via /prime or specific files)
4. Define workflow-specific steps
5. Invoke /plan with domain context
6. Guide through execution
7. Define output expectations
```

#### Step 4: Test and Refine

Run the command several times:
- Does it load the right context?
- Are the steps clear to the AI?
- Does it produce consistent results?
- What edge cases need handling?

### Common Wrapper Command Patterns

#### Pattern 1: Research Wrappers

**Purpose:** Conduct specific types of research

```markdown
---
argument-hint: Category or topic to research
---
# Discover Competitors

## Purpose
Identify and analyze competitors in a specific category

## Topic
`CATEGORY`: $ARGUMENTS

## Instructions

1. If CATEGORY not provided, ask user for category/market
2. Load agentic-orchestrating skill for research workflows
3. Create execution in /brand/research/competitive-analysis/{timestamp}/
4. Use standard competitive research workflow:
   - Phase 1: Identify 5-7 competitors
   - Phase 2a-c: Parallel analysis (positioning, content, pricing)
   - Phase 3: Strategic synthesis
5. Output: RESEARCH.md with full competitive landscape
```

#### Pattern 2: Strategy Synthesis Wrappers

**Purpose:** Transform research into strategy

```markdown
---
argument-hint: Path to research execution folder
---
# Synthesize Voice Strategy

## Purpose
Create voice strategy from customer research and competitive analysis

## Research Paths
`RESEARCH_PATHS`: $ARGUMENTS (comma-separated)

## Instructions

1. If paths not provided, ask user for relevant research folders
2. Load agentic-orchestrating skill
3. Run /prime to understand current brand context
4. Create execution in /brand/strategy/voice/{timestamp}/
5. Use strategy synthesis workflow:
   - Phase 1: Extract voice-relevant insights from research
   - Phase 2: Identify voice patterns and preferences
   - Phase 3: Draft voice principles
   - Phase 4: Create platform-specific adaptations
6. Check for contradictions with existing STRATEGY.md
7. Collaborate with user on updates
8. Output: STRATEGY.md with voice guidelines
```

#### Pattern 3: Content Generation Wrappers

**Purpose:** Create content from strategy

```markdown
---
argument-hint: Content topic or brief
---
# Create Twitter Thread

## Purpose
Generate Twitter thread content based on voice and messaging strategy

## Topic
`TOPIC`: $ARGUMENTS

## Instructions

1. If topic not provided, ask user for content brief
2. Load relevant strategy:
   - /brand/strategy/voice/STRATEGY.md
   - /brand/strategy/voice/twitter/EXTENSION.md (if exists)
   - /brand/strategy/messaging/STRATEGY.md
3. Create execution in /brand/content/twitter-posts/{timestamp}-{slug}/
4. Use thread creation workflow:
   - Phase 1: Extract key messages for topic
   - Phase 2a-e: Draft each tweet in thread (parallel)
   - Phase 3: Review thread flow and coherence
   - Phase 4: Polish and finalize
5. Validate against voice guidelines
6. Output: CONTENT.md with Twitter thread
```

---

## Part 2: Multi-Phase Workflows & Dynamic Task Generation

### Beyond Simple Sequential Workflows

In Class 8, you learned the basic orchestration pattern:
```
Phase 1 → Phase 2 → Phase 3 → Final Output
```

Real marketing workflows are often more complex:
```
Phase 1: Discovery
    ↓ (determines what's needed)
Phase 2a, 2b, 2c: Dynamic analysis (based on Phase 1 findings)
    ↓
Phase 3: Validation
    ↓ (might identify issues)
Phase 4: Refinement (if validation fails)
    ↓
Phase 5: Final synthesis
```

### Dynamic Task Generation Pattern

**The problem:** You don't always know upfront how many tasks you'll need.

**Example scenario:**
> "Analyze competitor positioning"

**Static approach (Class 8):**
```
Phase 1: Identify 5 competitors
Phase 2a-e: Analyze each competitor (hardcoded 5 phases)
Phase 3: Synthesize
```

**What if Phase 1 finds 7 competitors? Or 3?** Static plan breaks.

**Dynamic approach (Class 9):**
```
Phase 1: Identify competitors
    ↓ (produces: 01-competitors.md with N competitors found)
Phase 2: Generate analysis tasks dynamically
    ↓ (reads 01-competitors.md, creates 2a-2[N] tasks based on actual count)
Phase 2a-2[N]: Analyze each competitor
    ↓
Phase 3: Synthesize
```

### How Dynamic Task Generation Works

#### Stage 1: Discovery Phase

**Purpose:** Gather information that determines subsequent tasks

**Example (Competitive Research):**
```markdown
### Phase 1: Competitor Discovery

**Task:**
Identify competitors in the category. Document in structured format:

```json
{
  "competitors": [
    {"name": "Competitor A", "url": "...", "focus": "..."},
    {"name": "Competitor B", "url": "...", "focus": "..."},
    ...
  ]
}
```

**Output:** artifacts/01-competitors.md
```

**Key:** Phase 1 produces **structured data** that Phase 2 can parse.

#### Stage 2: Task Generation Phase

**Purpose:** Read Stage 1 output and generate appropriate number of tasks

**Example:**
```markdown
### Phase 2: Generate Competitor Analysis Tasks

**Agent:** orchestration-manager (you, not delegated)
**Input:** artifacts/01-competitors.md
**Task:**

1. Read 01-competitors.md and parse competitor list
2. For EACH competitor found:
   - Create Phase 2{letter} task
   - Define specific analysis for that competitor
   - Delegate to appropriate agent
3. Execute all Phase 2x tasks in parallel
4. Wait for all to complete before proceeding

**Output:** Dynamic number of artifacts (02a-*, 02b-*, 02c-*, etc.)
```

**Key:** This phase is **executed by the orchestration manager** (main agent), not delegated. It reads, generates tasks, and launches them.

#### Stage 3: Synthesis Phase

**Purpose:** Consolidate results from all dynamic tasks

**Example:**
```markdown
### Phase 3: Competitive Synthesis

**Input:** All artifacts from Phase 2 (02a-*, 02b-*, 02c-*, ...)
**Task:**

Read ALL Phase 2 artifacts and synthesize:
- Common patterns across competitors
- Key differentiators
- Strategic opportunities
- Competitive positioning map

**Output:** artifacts/03-synthesis.md
```

**Key:** This phase must **discover** how many Phase 2 artifacts exist and read all of them.

### Practical Example: Dynamic Competitor Analysis

Let's walk through a complete dynamic workflow:

#### Initial PLAN.md

```markdown
# Dynamic Competitive Research

## Objective

Analyze competitors in eco-friendly skincare category with dynamic task generation
based on the number of competitors discovered.

## Approach

1. Discover competitors (variable count)
2. Generate dynamic analysis tasks (one per competitor)
3. Execute analyses in parallel
4. Synthesize findings

## Step by Step Tasks

### 1. Competitor Discovery

**Agent:** general-purpose
**Instructions:** Inline
**Input:** None (web research)
**Output:** `artifacts/01-competitors.md`

**Task:**
Identify competitors in eco-friendly skincare category. Output structured data:

```markdown
# Competitors Discovered

Count: [N]

## Competitor List

1. **[Name]** - [URL]
   - Focus: [product focus]
   - Positioning: [brief positioning]

2. **[Name]** - [URL]
   ...
```

### 2. Dynamic Analysis Task Generation

**Agent:** orchestration-manager (main agent, not delegated)
**Instructions:** Inline
**Input:** `artifacts/01-competitors.md`
**Output:** Multiple `artifacts/02a-*.md`, `02b-*.md`, etc.

**Task:**
1. Read artifacts/01-competitors.md
2. Parse competitor count and details
3. For EACH competitor:
   - Create Phase 2{letter} (2a, 2b, 2c, ...)
   - Delegate competitor-specific analysis
   - Analyze: positioning, messaging, differentiation
4. Launch ALL Phase 2 tasks in parallel (single message, multiple Task calls)
5. Wait for ALL to complete

**Dynamic output:** One artifact per competitor
- 02a-competitor-a-analysis.md
- 02b-competitor-b-analysis.md
- 02c-competitor-c-analysis.md
- ... (as many as found in Phase 1)

### 3. Strategic Synthesis

**Agent:** general-purpose
**Instructions:** Inline
**Input:** All artifacts/02*-*.md files
**Output:** `artifacts/03-synthesis.md`

**Task:**
1. Discover all Phase 2 artifacts (02a-*, 02b-*, 02c-*, ...)
2. Read each competitor analysis
3. Synthesize:
   - Category patterns
   - Differentiation opportunities
   - Strategic recommendations
4. Create competitive positioning map

### 4. Final Research Output

**Agent:** orchestration-manager
**Input:** All artifacts
**Output:** `RESEARCH.md`

**Task:**
Consolidate all findings into final research document with:
- Executive summary
- Competitor overview (N competitors found)
- Strategic insights
- Recommendations
- References to detailed artifacts
```

#### Execution: Phase 2 (Dynamic Generation)

When executing Phase 2, the orchestration manager:

```
1. Reads artifacts/01-competitors.md
   → Finds: 7 competitors listed

2. Generates 7 tasks dynamically:

Task(subagent="general-purpose", description="Analyze Competitor A", prompt="""
Read competitor details from artifacts/01-competitors.md (Competitor A section)
Analyze positioning, messaging, differentiation strategies
Write findings to: artifacts/02a-competitor-a-analysis.md
""")

Task(subagent="general-purpose", description="Analyze Competitor B", prompt="""
Read competitor details from artifacts/01-competitors.md (Competitor B section)
Analyze positioning, messaging, differentiation strategies
Write findings to: artifacts/02b-competitor-b-analysis.md
""")

... (repeat for competitors C-G with letters 02c through 02g)

3. Waits for all 7 tasks to complete

4. Updates TODO.md:
   - [x] Phase 2a: Competitor A analysis → 02a-competitor-a-analysis.md
   - [x] Phase 2b: Competitor B analysis → 02b-competitor-b-analysis.md
   - ... (all 7 marked complete)

5. Proceeds to Phase 3
```

### When to Use Dynamic Task Generation

Use this pattern when:

**Count is variable:**
- Number of competitors found through research
- Number of customer interviews to process
- Number of content pieces to generate
- Number of themes extracted from data

**Tasks are similar but independent:**
- Each competitor gets same analysis
- Each interview gets same processing
- Each theme gets same development
- Each piece gets same validation

**Parallelization opportunity:**
- Tasks don't depend on each other
- All can run simultaneously
- Significant time savings from parallel execution

**Don't use when:**
- Task count is known upfront (just use 2a, 2b, 2c in PLAN.md)
- Tasks depend on each other (can't parallelize anyway)
- Discovery phase doesn't produce structured, parseable output

### Why This Matters for AMA

Dynamic task generation makes workflows **adaptable** instead of **rigid**:

**Rigid workflow (breaks when reality differs):**
- "Analyze exactly 5 competitors" (what if there are 7 good ones?)
- "Process 3 interviews" (what if user provides 4?)
- "Generate 10 social posts" (what if strategy calls for 12?)

**Adaptable workflow (adjusts to reality):**
- "Discover competitors → analyze however many found"
- "List interviews → process all provided"
- "Determine post count → generate appropriate number"

This is crucial for **real marketing work** where you don't always know the scope upfront.

---

## Part 3: Feedback Loops & Iteration Patterns

### The Quality Problem

Simple orchestration (Class 8) follows a linear path:
```
Phase 1 → Phase 2 → Phase 3 → Final Output
```

**What if Phase 3 output isn't good enough?**
- Validation reveals issues
- Quality doesn't meet standards
- Contradictions with existing strategy
- User feedback requires changes

Simple linear workflows have **no mechanism for iteration**.

### Feedback Loop Pattern

A feedback loop adds **validation and potential revision** to workflows:

```
Phase 1: Generate initial output
    ↓
Phase 2: Validate quality
    ↓
Decision point: Pass or revise?
    ├─→ Pass: Continue to Phase 3
    └─→ Revise: Return to Phase 1 with feedback
```

### Types of Feedback Loops

#### 1. Quality Validation Loop

**Purpose:** Ensure output meets quality standards before proceeding

**Example (Content Generation):**
```markdown
### Phase 3: Draft Blog Post

**Output:** artifacts/03-draft-post.md

### Phase 4: Validate Quality

**Input:** artifacts/03-draft-post.md
**Validation criteria:**
- Aligns with voice guidelines (/brand/strategy/voice/STRATEGY.md)
- Includes key messages from brief
- Appropriate length (1200-1500 words)
- Clear structure with headings
- No jargon or complex terminology

**Output:** artifacts/04-validation-report.md

**Decision:**
- If ALL criteria pass → proceed to Phase 5
- If ANY criteria fail → create Phase 4b: Revision

### Phase 4b: Revision (conditional)

**Triggered when:** Validation identifies issues
**Input:**
- artifacts/03-draft-post.md
- artifacts/04-validation-report.md (issues to fix)

**Task:** Revise draft to address validation failures
**Output:** artifacts/03-draft-post-revised.md

**After revision:** Re-run Phase 4 validation
```

**Key elements:**
- Clear validation criteria defined upfront
- Validation produces structured feedback
- Revision phase knows exactly what to fix
- Can iterate multiple times if needed

#### 2. Contradiction Detection Loop

**Purpose:** Identify conflicts with existing strategy and resolve

**Example (Strategy Synthesis):**
```markdown
### Phase 3: Draft Voice Principles

**Output:** artifacts/03-voice-principles.md

### Phase 4: Check for Contradictions

**Input:**
- artifacts/03-voice-principles.md (new principles)
- /brand/strategy/voice/STRATEGY.md (existing strategy)

**Task:**
Compare new principles against existing strategy:
- Identify direct contradictions
- Identify subtle inconsistencies
- Identify new additions vs. changes
- Flag areas requiring user decision

**Output:** artifacts/04-contradiction-analysis.md

**Structure:**
```markdown
## Contradictions Found: [N]

### Contradiction 1
- **Existing strategy says:** "[quote]"
- **New principles say:** "[quote]"
- **Conflict:** [explanation]
- **Recommendation:** [suggested resolution]

## New Additions: [N]
(Principles not contradicting, just adding)

## Inconsistencies: [N]
(Not direct contradictions but inconsistent tone/approach)
```

### Phase 5: User Resolution (human-in-the-loop)

**Triggered when:** Contradictions found (Phase 4 output has N > 0)
**Input:** artifacts/04-contradiction-analysis.md

**Task (orchestration manager):**
1. Present each contradiction to user
2. Offer recommendations
3. Collect user decisions
4. Document resolutions

**Output:** artifacts/05-resolution-decisions.md

### Phase 6: Apply Resolutions

**Input:**
- artifacts/03-voice-principles.md (original draft)
- artifacts/05-resolution-decisions.md (user decisions)

**Task:** Revise principles based on user resolution decisions
**Output:** artifacts/06-voice-principles-final.md
```

**Key elements:**
- Automated contradiction detection
- Structured presentation to user
- User makes final decisions
- Resolutions applied systematically

#### 3. User Feedback Loop

**Purpose:** Incorporate user feedback into iterative refinement

**Example (Content Creation):**
```markdown
### Phase 3: Generate Initial Content

**Output:** artifacts/03-initial-content.md

### Phase 4: User Review (human-in-the-loop)

**Task (orchestration manager):**
1. Present initial content to user
2. Ask for feedback:
   - What works well?
   - What needs adjustment?
   - Any specific changes required?
3. Capture feedback in structured format

**Output:** artifacts/04-user-feedback.md

**Structure:**
```markdown
## Feedback

### What Works
- [Positive feedback]

### What Needs Adjustment
- [Issue 1]: [Explanation]
- [Issue 2]: [Explanation]

### Specific Changes
- [Change 1]: [Detailed request]
- [Change 2]: [Detailed request]

## Iteration Required
YES / NO

If NO: Proceed to finalization
If YES: Proceed to Phase 5
```

### Phase 5: Refinement (conditional)

**Triggered when:** User feedback requires iteration
**Input:**
- artifacts/03-initial-content.md
- artifacts/04-user-feedback.md

**Task:** Apply user feedback to refine content
**Output:** artifacts/05-refined-content.md

**After refinement:** Return to Phase 4 for another review
(Can iterate multiple times until user approves)
```

**Key elements:**
- Structured feedback collection
- Clear iteration trigger
- Can loop multiple times
- User controls when to exit loop

### Implementing Feedback Loops in PLAN.md

When planning workflows with feedback loops:

#### 1. Define Validation Criteria Upfront

```markdown
## Validation Criteria (for Phase 4)

Content must:
- [ ] Align with voice guidelines (specific file reference)
- [ ] Include 3+ key messages from brief
- [ ] Be 1200-1500 words
- [ ] Use approved terminology (no jargon list)
- [ ] Follow brand tone (conversational, not formal)

If ANY criteria fail, trigger Phase 4b: Revision
```

#### 2. Make Conditional Phases Clear

```markdown
### Phase 4b: Revision (CONDITIONAL)

**Triggered when:** Phase 4 validation fails (any criteria unmet)
**Skipped when:** All validation criteria pass

**Input:**
- Original draft (artifacts/03-draft.md)
- Validation report (artifacts/04-validation.md)

**Task:** Address specific validation failures
**Output:** artifacts/03-draft-revised.md

**After completion:** Re-run Phase 4 validation
```

#### 3. Set Iteration Limits

```markdown
## Iteration Controls

- Maximum iterations: 3
- If 3rd iteration still fails validation, escalate to user for guidance
- Track iteration count in TODO.md notes
```

Prevents infinite loops while allowing reasonable refinement.

#### 4. Structure Feedback Outputs

```markdown
## Phase 4 Output Structure

artifacts/04-validation-report.md format:

```markdown
# Validation Report

**Status:** PASS / FAIL

## Criteria Results

- [x] Voice alignment - PASS
- [ ] Key messages - FAIL (only 2 of 3 present)
- [x] Word count - PASS (1,347 words)
- [ ] Terminology - FAIL (uses "leverage" and "synergy")
- [x] Tone - PASS

## Issues to Address

### Issue 1: Missing key message
**Criteria:** Include 3+ key messages
**Found:** Only 2 key messages present
**Missing:** "Sustainability as enabler" message
**Fix:** Add paragraph addressing sustainability message

### Issue 2: Jargon terminology
**Criteria:** No jargon from banned list
**Found:** "leverage" (para 3), "synergy" (para 7)
**Fix:** Replace with plain language alternatives

## Decision

FAIL - 2 issues identified
→ Trigger Phase 4b: Revision
```
```

Structured feedback makes revision phase clear and actionable.

### Why This Matters for AMA

Marketing work is **iterative by nature**:
- Content rarely perfect on first draft
- Strategy needs validation against existing guidelines
- Research findings may contradict assumptions
- User feedback drives refinement

Feedback loops turn AMA from **"generate once and hope it's good"** into **"generate, validate, refine until quality standards met."**

This mirrors how Marketing Architects actually work:
- Draft → Review → Revise → Approve
- Not: Draft → Done

---

## Part 4: Multi-Stage Workflows with Validation Gates

### Beyond Single-Layer Orchestration

So far we've looked at workflows within a single layer of AMA:
- Research execution (Class 8)
- Strategy execution (today)
- Content execution (today)

But **real marketing workflows often span multiple layers:**

```
Research Layer
    ↓ (synthesis with validation)
Strategy Layer
    ↓ (generation with validation)
Content Layer
```

Each transition between layers is a **validation gate** - a point where we ensure quality before moving forward.

### The Complete Research → Strategy → Content Workflow

Let's design a complete end-to-end workflow that you might actually run:

#### Stage 1: Research Execution

**Location:** `/brand/research/competitive-analysis/{timestamp}/`

**Workflow:**
```markdown
Phase 1: Discover competitors
Phase 2a-c: Analyze positioning, content, pricing (parallel)
Phase 3: Synthesize findings
→ Output: RESEARCH.md
```

**Validation gate:**
Before proceeding to strategy, validate research:
- [ ] Sufficient competitors identified (5-7)
- [ ] Each analysis area covered
- [ ] Patterns and insights clear
- [ ] Recommendations actionable

**If validation passes:** Proceed to Stage 2 (Strategy)
**If validation fails:** Revise research execution

#### Stage 2a: Research → Strategy Transition

**Purpose:** Extract strategy-relevant insights from research

**Location:** Still in research execution folder (transition phase)

**Workflow:**
```markdown
Phase 4: Extract Strategic Insights

**Input:** RESEARCH.md from Phase 3
**Task:**
Identify insights directly relevant to positioning strategy:
- Competitive white space identified
- Differentiation opportunities
- Positioning patterns in category
- Key learnings for our positioning

**Output:** artifacts/04-strategic-insights.md

**Purpose:** This becomes input to strategy layer
```

#### Stage 2b: Strategy Execution

**Location:** `/brand/strategy/positioning/{timestamp}/`

**Workflow:**
```markdown
Phase 1: Load Context
Input:
- /brand/research/competitive-analysis/{timestamp}/RESEARCH.md
- /brand/research/competitive-analysis/{timestamp}/artifacts/04-strategic-insights.md
- /brand/research/customer-interviews/RESEARCH.md (if relevant)
Output: artifacts/01-context-synthesis.md

Phase 2: Draft Positioning Framework
Input: artifacts/01-context-synthesis.md
Output: artifacts/02-positioning-draft.md

Phase 3: Validate Against Research
Input:
- artifacts/02-positioning-draft.md
- Research sources
Task: Ensure positioning claims supported by research
Output: artifacts/03-validation-report.md

Phase 3b: Revise (if validation issues)
Input: artifacts/02-positioning-draft.md + artifacts/03-validation-report.md
Output: artifacts/02-positioning-revised.md

Phase 4: Check Contradictions with Existing Strategy
Input: artifacts/02-positioning-final.md + /brand/strategy/positioning/STRATEGY.md
Output: artifacts/04-contradiction-analysis.md

Phase 5: User Resolution (if contradictions)
(Human-in-the-loop)

Phase 6: Finalize Strategy
Output: STRATEGY.md (or update to existing STRATEGY.md)
```

**Validation gate:**
Before proceeding to content, validate strategy:
- [ ] Positioning supported by research (audit trail verifiable)
- [ ] No contradictions with existing strategy (or resolved)
- [ ] User approved final positioning
- [ ] Clear enough to guide content creation

**If validation passes:** Proceed to Stage 3 (Content)
**If validation fails:** Revise strategy execution

#### Stage 3: Content Execution

**Location:** `/brand/content/blog-posts/{timestamp}-introducing-our-positioning/`

**Workflow:**
```markdown
Phase 1: Load Strategy Context
Input:
- /brand/strategy/positioning/STRATEGY.md (positioning to explain)
- /brand/strategy/voice/STRATEGY.md (how to say it)
- /brand/strategy/messaging/STRATEGY.md (key messages)
Output: artifacts/01-content-brief.md

Phase 2: Draft Content
Input: artifacts/01-content-brief.md
Output: artifacts/02-draft-content.md

Phase 3: Validate Against Strategy
Input:
- artifacts/02-draft-content.md
- Strategy files
Criteria:
- Voice alignment
- Positioning accuracy
- Message inclusion
- Tone consistency
Output: artifacts/03-validation-report.md

Phase 3b: Revise (if needed)
Input: artifacts/02-draft-content.md + artifacts/03-validation-report.md
Output: artifacts/02-draft-content-revised.md

Phase 4: User Review
(Human-in-the-loop)

Phase 5: Finalize
Output: CONTENT.md
```

### Validation Gate Pattern

Each validation gate follows the same structure:

#### 1. Define Success Criteria

```markdown
## Validation Criteria for [Stage/Layer Name]

Must meet ALL criteria to proceed:
- [ ] Criterion 1 with specific threshold
- [ ] Criterion 2 with specific threshold
- [ ] Criterion 3 with specific threshold
- [ ] Criterion 4 with specific threshold

If ANY fail, revise before proceeding.
```

#### 2. Automated Validation

```markdown
### Phase [N]: Validate [Output]

**Agent:** validation-agent or general-purpose
**Input:** Output to validate + validation criteria + reference documents
**Task:**

For each criterion:
1. Check if met
2. If not met, explain why and what's missing
3. Provide specific, actionable feedback

**Output:** artifacts/[N]-validation-report.md

**Structure:**
```markdown
# Validation Report: [Output Name]

**Overall Status:** PASS / FAIL

## Criterion Results

- [x] Criterion 1 - PASS
- [ ] Criterion 2 - FAIL
- [x] Criterion 3 - PASS
- [ ] Criterion 4 - FAIL

## Issues Found: 2

### Issue 1: [Criterion 2]
**Problem:** [What's wrong]
**Evidence:** [Specific examples]
**Fix:** [What needs to change]

### Issue 2: [Criterion 4]
**Problem:** [What's wrong]
**Evidence:** [Specific examples]
**Fix:** [What needs to change]

## Decision

[PASS/FAIL]

If FAIL: Trigger revision phase
If PASS: Proceed to next stage
```
```

#### 3. Conditional Revision

```markdown
### Phase [N]b: Revision (CONDITIONAL)

**Triggered when:** Validation fails
**Skipped when:** Validation passes

**Input:**
- Original output
- Validation report (specific issues to fix)

**Task:**
Address each issue from validation report:
- Fix Issue 1: [Specific action based on validation feedback]
- Fix Issue 2: [Specific action based on validation feedback]

**Output:** Revised artifact

**After completion:** Re-run validation (Phase [N])
```

#### 4. Proceed or Escalate

```markdown
## Iteration Control

- Attempt up to 3 validation/revision cycles
- If 3rd iteration still fails:
  - Escalate to user
  - Present validation issues
  - Gather user guidance
  - Decide: Relax criteria or manual intervention
```

### Artifact Handoff Between Stages

When workflows span multiple stages/layers, artifacts must flow cleanly:

#### Pattern 1: Direct Reference

Content execution references strategy directly:

```markdown
Phase 1: Load Strategy Context

**Input:**
- /brand/strategy/positioning/STRATEGY.md (absolute path)
- /brand/strategy/voice/STRATEGY.md (absolute path)

**Task:** Extract guidance for content creation
**Output:** artifacts/01-content-brief.md (synthesizes strategy for this content piece)
```

**Why this works:**
- Progressive disclosure (content execution loads only what it needs)
- Audit trail (content references exact strategy it used)
- No duplication (strategy stays in strategy layer)

#### Pattern 2: Insights Extraction

Research produces "strategic insights" artifact that strategy consumes:

```markdown
Research Phase 4: Extract Strategic Insights
Output: /brand/research/{domain}/{timestamp}/artifacts/04-strategic-insights.md

Strategy Phase 1: Load Research Insights
Input: /brand/research/{domain}/{timestamp}/artifacts/04-strategic-insights.md
```

**Why this works:**
- Clean separation (research produces research, strategy consumes insights)
- Reduces noise (strategy doesn't read entire RESEARCH.md, just relevant extracts)
- Clear handoff point (insights artifact is the contract between layers)

#### Pattern 3: Validation Artifact

Each stage produces validation report that next stage can check:

```markdown
Research Final Phase: Validate Completeness
Output: /brand/research/{domain}/{timestamp}/artifacts/final-validation.md

Strategy Phase 1: Check Research Quality
Input: /brand/research/{domain}/{timestamp}/artifacts/final-validation.md
Task: If research validation failed, don't proceed with strategy
```

**Why this works:**
- Quality gates enforced
- Can trace validation history
- Prevents building on faulty foundation

### Why This Matters for AMA

Real marketing work isn't **"research OR strategy OR content"** - it's **"research THEN strategy THEN content"** with validation at each transition.

Multi-stage workflows with validation gates turn AMA from **separate disconnected executions** into **complete end-to-end marketing systems** where:
- Quality is validated at every stage
- Artifacts flow cleanly between layers
- Audit trails span the entire process
- Nothing proceeds without validation

This is how professional Marketing Architects actually work - with **quality gates and validation** at every transition, not hope and pray.

---

## Part 5: Practical Capstone Exercise

Let's put everything together by designing a complete, advanced workflow from scratch.

### Scenario: Product Launch Content Workflow

You're launching a new eco-friendly skincare product. You need to create a complete content campaign that:
1. Reviews existing positioning and voice strategy
2. Generates product-specific messaging
3. Creates multi-channel content (blog post, email, social posts)
4. Validates everything against brand guidelines
5. Includes iteration loops for quality

### Your Challenge

Design a complete workflow with:
- Wrapper command to trigger it
- Multi-phase execution with dynamic elements
- Feedback loops and validation gates
- Artifact handoff between phases
- Human-in-the-loop checkpoints

### Capstone Solution

Let me walk you through a complete solution:

#### Step 1: Wrapper Command

**File:** `/.claude/commands/launch-product-campaign.md`

```markdown
---
argument-hint: Product name and brief description
---
# Launch Product Campaign

## Purpose

Generate complete launch campaign content (blog, email, social) for a new product,
with validation against brand strategy and iteration loops for quality.

## Product Info

`PRODUCT_INFO`: $ARGUMENTS

## Instructions

1. If PRODUCT_INFO not provided, ask user for:
   - Product name
   - Brief description (2-3 sentences)
   - Key differentiators
   - Target audience

2. Load agentic-orchestrating skill for workflow execution

3. Load relevant brand strategy:
   - /brand/strategy/positioning/STRATEGY.md
   - /brand/strategy/voice/STRATEGY.md
   - /brand/strategy/messaging/STRATEGY.md

4. Create execution folder:
   - Location: /brand/content/campaigns/{timestamp}-{product-name}-launch/
   - Structure: data/, artifacts/, PLAN.md, TODO.md, CONTENT.md

5. Invoke /plan with campaign workflow:
   - Stage 1: Strategy synthesis
   - Stage 2: Product messaging development (with validation)
   - Stage 3: Multi-channel content generation (dynamic)
   - Stage 4: Cross-channel validation
   - Stage 5: Finalization

6. Execute plan with /implement

7. Include human-in-the-loop checkpoints:
   - After product messaging (approve before content)
   - After draft content (approve before finalization)

## Success Criteria

- Product messaging aligns with brand positioning
- Content validated against voice guidelines
- All channels represented (blog, email, 5 social posts)
- User approved at checkpoints
- Complete campaign ready for deployment
```

#### Step 2: Initial PLAN.md

```markdown
# Product Launch Campaign: [Product Name]

**Execution Folder:** /brand/content/campaigns/{timestamp}-{product-name}-launch/
**Created:** {timestamp}

## Objective

Generate complete, on-brand launch campaign content across multiple channels
(blog post, email, social posts) for [Product Name], with validation loops
to ensure quality and brand alignment.

## Approach

1. Synthesize brand strategy for product context
2. Develop product-specific messaging (with validation loop)
3. Generate channel-specific content dynamically
4. Validate cross-channel consistency
5. Incorporate user feedback
6. Finalize campaign assets

## Product Information

Store in `data/product-brief.md`:
- Product name
- Description
- Key features
- Differentiators
- Target audience

## Step by Step Tasks

### Phase 1: Strategy Context Synthesis

**Agent:** general-purpose
**Input:**
- /brand/strategy/positioning/STRATEGY.md
- /brand/strategy/voice/STRATEGY.md
- /brand/strategy/messaging/STRATEGY.md
- data/product-brief.md
**Output:** `artifacts/01-strategy-context.md`

**Task:**
Extract strategy elements relevant to product launch:
- How does product fit our positioning?
- What voice/tone for launch messaging?
- Which brand messages apply?
- Target audience considerations
- Channel-specific guidance

### Phase 2: Product Messaging Development

**Agent:** general-purpose
**Input:** artifacts/01-strategy-context.md + data/product-brief.md
**Output:** `artifacts/02-product-messaging.md`

**Task:**
Develop product-specific messaging:
- Core value proposition
- Key benefits (3-5)
- Differentiation claims
- Proof points/supporting evidence
- Calls to action
- Messaging hierarchy (primary, secondary, supporting)

**Structure:**
```markdown
# Product Messaging: [Product Name]

## Core Value Proposition
[One sentence that captures product value]

## Key Benefits
1. [Benefit 1] - [Explanation]
2. [Benefit 2] - [Explanation]
3. [Benefit 3] - [Explanation]

## Differentiation
- [What makes this product different/better]

## Proof Points
- [Evidence supporting claims]

## Calls to Action
- Primary: [Main CTA]
- Secondary: [Alternative CTA]

## Messaging Hierarchy
**Primary message:** [Most important message]
**Secondary messages:** [Supporting messages]
**Supporting details:** [Proof points, features]
```

### Phase 3: Validate Product Messaging

**Agent:** general-purpose
**Input:**
- artifacts/02-product-messaging.md
- /brand/strategy/positioning/STRATEGY.md
- /brand/strategy/messaging/STRATEGY.md
**Output:** `artifacts/03-messaging-validation.md`

**Task:**
Validate messaging against brand strategy:

**Validation criteria:**
- [ ] Value prop aligns with brand positioning
- [ ] Benefits consistent with brand messaging
- [ ] Differentiation supported by positioning strategy
- [ ] Tone matches brand voice
- [ ] Claims are defensible (not hyperbolic)

**For each criterion:**
- Check if met
- If not met, explain why and what needs adjustment
- Provide specific feedback

**Output structure:**
```markdown
# Messaging Validation Report

**Status:** PASS / FAIL

## Criteria Results
- [x/  ] Value prop alignment - [PASS/FAIL]
- [x/  ] Benefits consistency - [PASS/FAIL]
- [x/  ] Differentiation support - [PASS/FAIL]
- [x/  ] Voice/tone match - [PASS/FAIL]
- [x/  ] Claim defensibility - [PASS/FAIL]

## Issues Found: [N]

[For each failed criterion, detailed issue and fix]

## Decision

PASS → Proceed to Phase 4 (Content Generation)
FAIL → Trigger Phase 3b (Messaging Revision)
```

### Phase 3b: Messaging Revision (CONDITIONAL)

**Triggered when:** Phase 3 validation fails
**Agent:** general-purpose
**Input:**
- artifacts/02-product-messaging.md
- artifacts/03-messaging-validation.md
**Output:** `artifacts/02-product-messaging-revised.md`

**Task:**
Revise messaging to address validation issues:
- Fix each issue identified in validation report
- Maintain messaging structure
- Ensure all criteria will pass on re-validation

**After completion:** Re-run Phase 3 validation

**Iteration limit:** 3 attempts
**If still failing:** Escalate to user for guidance

### Phase 4: User Approval Checkpoint

**Agent:** orchestration-manager (human-in-the-loop)
**Input:** artifacts/02-product-messaging-final.md (validated version)

**Task:**
1. Present final product messaging to user
2. Ask: "Does this messaging accurately represent the product and align with brand?"
3. Collect feedback:
   - Approved as-is → Proceed to Phase 5
   - Needs adjustments → Create Phase 4b with user feedback

**Output:** artifacts/04-user-approval.md

**Structure:**
```markdown
# User Approval: Product Messaging

**Status:** APPROVED / NEEDS REVISION

## User Feedback

[Capture user comments]

## Requested Changes

[If any changes requested, list them]

## Decision

APPROVED → Proceed to Phase 5 (Content Generation)
NEEDS REVISION → Trigger Phase 4b
```

### Phase 4b: User-Requested Revisions (CONDITIONAL)

**Triggered when:** User requests changes
**Input:**
- artifacts/02-product-messaging-final.md
- artifacts/04-user-approval.md (specific changes requested)
**Output:** artifacts/02-product-messaging-user-revised.md

**Task:**
Apply user-requested changes to messaging

**After completion:** Return to Phase 4 for re-approval

### Phase 5: Define Content Assets

**Agent:** general-purpose
**Input:** artifacts/02-product-messaging-final.md
**Output:** `artifacts/05-content-asset-plan.md`

**Task:**
Determine which content assets to create for launch:

**Default assets:**
1. Blog post (long-form, SEO-focused)
2. Launch email (to existing customers)
3. Social media posts (5 posts across platforms)

**For each asset, define:**
- Channel/format
- Primary objective
- Key messages to include
- Approximate length/structure
- Platform-specific considerations

**Output structure:**
```markdown
# Content Asset Plan

## Assets to Create: [N]

### Asset 1: Blog Post
- **Channel:** Blog / Website
- **Objective:** Announce product, educate on benefits, drive to product page
- **Key Messages:** [List from product messaging]
- **Length:** 1000-1500 words
- **Structure:** Hook → Problem → Solution (product) → Benefits → CTA
- **SEO Keywords:** [Product name], [category keywords]

### Asset 2: Launch Email
- **Channel:** Email (customer list)
- **Objective:** Exclusive first-look for customers, drive early sales
- **Key Messages:** [List]
- **Length:** 300-400 words
- **Structure:** Subject line → Preview → Product intro → Benefits → CTA
- **Personalization:** Customer name, past purchase relevance

### Asset 3a-3e: Social Media Posts
- **Channels:** Twitter, LinkedIn, Instagram, Facebook (5 posts total)
- **Objective:** Build awareness, drive to blog post
- **Key Messages:** [Varied across posts]
- **Format:** Mix of announcement, benefit-focused, behind-the-scenes, CTA
- **Schedule:** [Suggested posting schedule]

[Detailed specifications for each social post]
```

### Phase 6: Dynamic Content Generation

**Agent:** orchestration-manager (dynamic task generation)
**Input:** artifacts/05-content-asset-plan.md
**Output:** Multiple artifacts (06a-*, 06b-*, 06c-*, ...)

**Task:**
1. Read artifacts/05-content-asset-plan.md
2. Count content assets to create (N assets)
3. For EACH asset:
   - Create Phase 6{letter} task
   - Delegate content creation for that specific asset
   - Load: product messaging + voice strategy + asset specs
4. Launch ALL Phase 6 tasks in parallel
5. Wait for ALL to complete

**Dynamic outputs:**
- 06a-blog-post-draft.md
- 06b-launch-email-draft.md
- 06c-social-post-1.md
- 06d-social-post-2.md
- 06e-social-post-3.md
- 06f-social-post-4.md
- 06g-social-post-5.md

**Delegation template for each asset:**
```
Task(
    subagent="general-purpose",
    description="Generate [Asset Name]",
    prompt="""
Read context:
- Product messaging: artifacts/02-product-messaging-final.md
- Voice guidelines: /brand/strategy/voice/STRATEGY.md
- Asset specifications: artifacts/05-content-asset-plan.md (section: [Asset Name])

Generate [Asset Name] according to specifications:
- Follow voice guidelines
- Include key messages from product messaging
- Match length and structure requirements
- Platform-specific best practices

Write output to: artifacts/06[letter]-[asset-name].md
"""
)
```

### Phase 7: Cross-Channel Validation

**Agent:** general-purpose
**Input:** All Phase 6 artifacts (06a-*, 06b-*, 06c-*, ...)
**Output:** `artifacts/07-cross-channel-validation.md`

**Task:**
Validate consistency across all content assets:

**Validation criteria:**
- [ ] All assets use consistent product messaging
- [ ] Voice/tone consistent across channels
- [ ] No contradictory claims between assets
- [ ] Key messages present across campaign
- [ ] CTAs aligned and consistent
- [ ] Brand terminology used correctly in all assets

**Check each asset:**
1. Load asset content
2. Validate against criteria
3. Compare with other assets for consistency
4. Flag any inconsistencies or issues

**Output structure:**
```markdown
# Cross-Channel Validation Report

**Status:** PASS / FAIL

## Consistency Check

**Messaging consistency:** PASS / FAIL
- [Issues if any]

**Voice consistency:** PASS / FAIL
- [Issues if any]

**CTA alignment:** PASS / FAIL
- [Issues if any]

## Asset-Specific Issues

### Asset: 06a-blog-post-draft.md
- [Any issues found]

### Asset: 06b-launch-email-draft.md
- [Any issues found]

[Continue for all assets]

## Overall Assessment

[Summary of validation]

## Decision

PASS → Proceed to Phase 8 (User Review)
FAIL → Trigger Phase 7b (Consistency Revision)
```

### Phase 7b: Consistency Revision (CONDITIONAL)

**Triggered when:** Cross-channel validation fails
**Agent:** general-purpose
**Input:**
- Phase 6 artifacts (all content)
- artifacts/07-cross-channel-validation.md (issues to fix)
**Output:** Revised artifacts (06*-revised.md)

**Task:**
For each asset with issues:
1. Read validation issues for that asset
2. Revise to address consistency problems
3. Ensure alignment with other assets
4. Maintain asset-specific requirements

**After completion:** Re-run Phase 7 validation

### Phase 8: User Review & Feedback

**Agent:** orchestration-manager (human-in-the-loop)
**Input:** All Phase 6 content artifacts (validated versions)

**Task:**
1. Present all content assets to user (in organized format)
2. For each asset, collect feedback:
   - Approved as-is
   - Needs minor edits
   - Needs major revision
3. Capture specific feedback for any changes needed

**Output:** `artifacts/08-user-review.md`

**Structure:**
```markdown
# User Review: Campaign Content

## Review Results

### Blog Post (06a)
- **Status:** APPROVED / MINOR EDITS / MAJOR REVISION
- **Feedback:** [User comments]
- **Changes requested:** [If any]

### Launch Email (06b)
- **Status:** APPROVED / MINOR EDITS / MAJOR REVISION
- **Feedback:** [User comments]
- **Changes requested:** [If any]

[Continue for all assets]

## Overall Assessment

- **Assets approved:** [N]
- **Assets needing edits:** [N]
- **Assets needing revision:** [N]

## Decision

All approved → Proceed to Phase 9 (Finalization)
Some need edits → Trigger Phase 8b (Apply Edits)
```

### Phase 8b: Apply User Edits (CONDITIONAL)

**Triggered when:** User requests changes to any asset
**Input:**
- Original content artifacts (Phase 6)
- artifacts/08-user-review.md (specific changes per asset)
**Output:** Revised artifacts (06*-final.md)

**Task:**
For each asset requiring changes:
1. Read user feedback for that asset
2. Apply requested changes
3. Maintain voice consistency
4. Preserve what user approved

**After completion:** Return to Phase 8 for re-review (only changed assets)

### Phase 9: Campaign Finalization

**Agent:** general-purpose
**Input:** All finalized content artifacts (06*-final.md)
**Output:** `CONTENT.md`

**Task:**
Consolidate all campaign assets into organized final deliverable:

**Structure:**
```markdown
# Product Launch Campaign: [Product Name]

**Campaign Date:** {timestamp}
**Status:** Ready for Deployment

## Campaign Overview

- **Product:** [Name and brief description]
- **Objective:** [Campaign goal]
- **Channels:** Blog, Email, Social Media (5 posts)
- **Target Audience:** [From brief]

## Product Messaging

[Summary from artifacts/02-product-messaging-final.md]

## Campaign Assets

### 1. Blog Post

**Title:** [Title]
**Length:** [Word count]
**SEO Keywords:** [Keywords]
**CTA:** [Call to action]

**Full Content:**
[Complete blog post from 06a-blog-post-final.md]

**Artifact:** [artifacts/06a-blog-post-final.md](artifacts/06a-blog-post-final.md)

---

### 2. Launch Email

**Subject Line:** [Subject]
**Preview Text:** [Preview]
**Audience:** Customer email list
**CTA:** [Call to action]

**Full Content:**
[Complete email from 06b-launch-email-final.md]

**Artifact:** [artifacts/06b-launch-email-final.md](artifacts/06b-launch-email-final.md)

---

### 3. Social Media Posts

#### Post 1: Product Announcement
**Platforms:** Twitter, LinkedIn
**Timing:** Launch day, morning
**Content:**
[Post from 06c-social-post-1-final.md]

**Artifact:** [artifacts/06c-social-post-1-final.md](artifacts/06c-social-post-1-final.md)

[Continue for all social posts]

---

## Deployment Checklist

- [ ] Blog post scheduled in CMS
- [ ] Email loaded in email platform
- [ ] Social posts scheduled across platforms
- [ ] UTM tracking parameters added to all links
- [ ] Analytics configured to track campaign
- [ ] Product page live and ready

## Validation Summary

All content validated against:
- [x] Brand positioning
- [x] Voice guidelines
- [x] Messaging consistency
- [x] Cross-channel alignment
- [x] User approval

## Artifact Index

Complete workflow artifacts:
- [01-strategy-context.md](artifacts/01-strategy-context.md)
- [02-product-messaging-final.md](artifacts/02-product-messaging-final.md)
- [05-content-asset-plan.md](artifacts/05-content-asset-plan.md)
- [06a through 06g] - Individual content assets
- [07-cross-channel-validation.md](artifacts/07-cross-channel-validation.md)
- [08-user-review.md](artifacts/08-user-review.md)
```

## Expected Artifacts

- **01-strategy-context.md** - Brand strategy synthesis for product
- **02-product-messaging.md** → **02-product-messaging-final.md** (after validation/revisions)
- **03-messaging-validation.md** - Validation report (may have multiple iterations)
- **04-user-approval.md** - User approval checkpoint
- **05-content-asset-plan.md** - Content assets to create
- **06a-06g** - Individual content assets (dynamically generated)
- **07-cross-channel-validation.md** - Consistency validation
- **08-user-review.md** - User feedback on content
- **CONTENT.md** - Final consolidated campaign deliverable

## Success Criteria

- [ ] Product messaging validated against brand strategy
- [ ] User approved product messaging before content generation
- [ ] All planned content assets created (blog, email, 5 social posts)
- [ ] Cross-channel consistency validated
- [ ] User approved all content assets
- [ ] Complete campaign ready for deployment with deployment checklist
```

### What Makes This Workflow Advanced

This capstone workflow demonstrates all advanced patterns:

**1. Wrapper Command Integration**
- Custom `/launch-product-campaign` command
- Loads appropriate strategy context
- Creates properly structured execution
- Guides through complete workflow

**2. Multi-Phase with Clear Stages**
- Stage 1: Strategy synthesis (Phases 1)
- Stage 2: Messaging development with validation loop (Phases 2-4b)
- Stage 3: Dynamic content generation (Phases 5-6)
- Stage 4: Cross-channel validation (Phase 7-7b)
- Stage 5: User review and finalization (Phases 8-9)

**3. Feedback Loops**
- Messaging validation loop (Phase 3 validates → 3b revises if needed)
- User approval loop (Phase 4 checks → 4b revises if needed)
- Consistency validation loop (Phase 7 validates → 7b revises if needed)
- User review loop (Phase 8 reviews → 8b applies edits if needed)

**4. Dynamic Task Generation**
- Phase 5 defines how many content assets to create
- Phase 6 generates that many tasks dynamically (06a, 06b, 06c, ...)
- Adapts to campaign needs (could be 5 assets or 15)

**5. Validation Gates**
- Messaging validated against brand strategy before content creation
- User approves messaging before proceeding
- Cross-channel consistency checked after content generation
- User reviews all content before finalization

**6. Human-in-the-Loop**
- Phase 4: User approves product messaging
- Phase 8: User reviews all content
- Structured feedback collection
- Revision loops based on user input

**7. Artifact Handoff**
- Strategy layer → Content layer (loads positioning, voice, messaging)
- Messaging → Content (06 phases load 02-product-messaging-final.md)
- All assets → Validation (Phase 7 reads all 06*)
- Clear audit trail through entire workflow

**8. Quality Control Throughout**
- Automated validation (Phases 3, 7)
- User validation (Phases 4, 8)
- Iteration limits (max 3 attempts before escalation)
- Clear pass/fail criteria at each gate

This is a **production-ready, advanced workflow** that could actually power a real product launch campaign.

---

## Part 6: Summary & Course Completion

### What You Learned in Class 9

In this final class, you mastered:

**1. Wrapper Commands**
- Create domain-specific commands that encapsulate workflows
- Guide orchestration with context and defaults
- Turn repeating workflows into one-command execution
- Integrate with /plan and /implement pattern

**2. Dynamic Task Generation**
- Workflows that adapt to variable task counts
- Discovery phase produces structured data
- Generation phase creates appropriate number of tasks
- Parallel execution of dynamic task sets

**3. Feedback Loops**
- Quality validation loops (automated checks)
- Contradiction detection loops (strategy alignment)
- User feedback loops (human-in-the-loop refinement)
- Structured iteration with clear exit conditions

**4. Multi-Stage Workflows**
- Workflows spanning multiple AMA layers (research → strategy → content)
- Validation gates between stages
- Artifact handoff patterns
- End-to-end marketing systems

**5. Quality Validation**
- Define validation criteria upfront
- Automated validation with structured feedback
- Conditional revision phases
- Iteration limits and escalation

**6. Complete Workflow Design**
- Capstone: Product launch campaign workflow
- Integrated all advanced patterns
- Production-ready marketing system
- Human and AI collaboration

### How Class 9 Built on Previous Classes

Let's trace the complete learning journey:

**Class 1 (Context Problem):**
→ Identified that context windows are limited, chat history doesn't scale

**Class 2 (File Systems):**
→ File systems solve context segmentation through persistent storage

**Class 3 (AMA Structure):**
→ Three-layer framework (research → strategy → content) organizes marketing work

**Class 4 (Git):**
→ Version control enables safe experimentation and iteration

**Class 5 (Commands):**
→ Custom commands make workflows reusable and consistent

**Class 6 (Delegation):**
→ Sub-agents enable focused context and specialization

**Class 7 (Skills):**
→ Skills package workflows and knowledge for reuse

**Class 8 (Orchestration Fundamentals):**
→ PLAN/TODO/artifact pattern coordinates complex multi-phase work

**Class 9 (Advanced Orchestration):**
→ Wrapper commands + dynamic generation + feedback loops + validation gates = complete marketing systems

Each class built one layer of capability. Now you have the complete stack.

### Course Completion: Can You...?

Review the course completion criteria from Class 1:

**1. Explain the "why"**
- Why does AMA exist? (Context limitations, scalability, quality, traceability)
- What problems does it solve? (Context rot, segmentation, chaos, lost knowledge)
- ✅ Can you articulate this to a colleague?

**2. Organize effectively**
- Can you organize work into research → strategy → content?
- Can you create temporal execution folders with proper structure?
- Can you use markdown references for progressive disclosure?
- ✅ Can you set up a new marketing project correctly?

**3. Delegate appropriately**
- Do you know when to delegate vs execute directly?
- Can you create focused delegation prompts with progressive disclosure?
- Can you use sub-agents for specialized work?
- ✅ Can you delegate effectively without context overload?

**4. Orchestrate complexity**
- Can you identify when orchestration is needed (vs. simple execution)?
- Can you break complex work into phases with clear inputs/outputs?
- Can you track progress with PLAN/TODO/artifacts?
- ✅ Can you coordinate multi-phase workflows?

**5. Build custom workflows**
- Can you create wrapper commands for domain-specific work?
- Can you design workflows with feedback loops and validation?
- Can you implement dynamic task generation?
- ✅ Can you build production-ready marketing systems?

**6. Version control confidently**
- Can you commit strategy changes with meaningful messages?
- Can you create branches for experiments?
- Can you use Git as a tool (not fear it)?
- ✅ Can you iterate safely with version control?

### If You Can Do These Things, You've Completed the Course

Take a moment to reflect:
- Where were you at the start? (Probably thinking AI = chat)
- Where are you now? (Designing sophisticated multi-phase marketing systems)
- What can you build? (Complete research → strategy → content workflows)

That's significant progress. Congratulations.

---

## Part 7: Final Practical Exercise

### Design Your Own Advanced Workflow

Choose one of these scenarios (or create your own) and design a complete advanced workflow:

#### Option 1: Voice Strategy Development

**Scenario:** Create a complete brand voice strategy from customer interview transcripts.

**Requirements:**
- Process 3-5 interview transcripts (dynamic count)
- Extract voice patterns and preferences
- Validate against existing positioning
- Include user approval checkpoints
- Create platform-specific extensions (Twitter, LinkedIn)
- Feedback loop for voice principle refinement

**Deliverables to design:**
- Wrapper command (/.claude/commands/develop-voice-strategy.md)
- PLAN.md with all phases
- Identify feedback loops and validation gates
- Define success criteria
- Map artifact flow

#### Option 2: Multi-Channel Content Campaign

**Scenario:** Generate a content campaign across blog, email, and social media for a specific initiative.

**Requirements:**
- Load relevant strategy (positioning, voice, messaging)
- Develop campaign messaging
- Dynamically generate content for N channels
- Cross-channel consistency validation
- User review with iteration loop
- Finalize with deployment checklist

**Deliverables to design:**
- Wrapper command (/.claude/commands/create-content-campaign.md)
- PLAN.md with dynamic content generation
- Validation phases (messaging, consistency, user review)
- Feedback loops for refinement
- Final consolidation structure

#### Option 3: Competitive Analysis → Positioning Update

**Scenario:** Conduct competitive research and use findings to update positioning strategy, with validation throughout.

**Requirements:**
- Research competitive landscape (5-7 competitors)
- Validate research completeness
- Extract strategic insights for positioning
- Update positioning strategy with contradiction detection
- User resolution of contradictions
- Finalize updated strategy

**Deliverables to design:**
- Wrapper command (/.claude/commands/update-positioning-competitive.md)
- Multi-stage workflow (research layer → strategy layer)
- Validation gates between stages
- Contradiction detection and resolution loop
- Artifact handoff pattern
- Final strategy update process

### Exercise Guidelines

For your chosen scenario:

**1. Start with the wrapper command**
- What arguments does it need?
- What context should it load?
- What workflow pattern does it follow?

**2. Design the PLAN.md**
- Break down into clear phases
- Identify sequential vs parallel phases
- Define inputs and outputs for each phase
- Name all artifacts

**3. Add advanced patterns**
- Where do validation loops make sense?
- Where should user input be collected?
- What can be generated dynamically?
- What gates should exist between stages?

**4. Think through edge cases**
- What if validation fails multiple times?
- What if user requests major changes?
- How many iterations are reasonable?
- When should you escalate to user?

**5. Document the complete workflow**
- Write it as if someone else will implement it
- Be specific about inputs, outputs, and artifacts
- Include success criteria
- Define validation criteria

### Check Your Design

A well-designed advanced workflow should have:
- [ ] Clear wrapper command with purpose and arguments
- [ ] PLAN.md with proper phase breakdown
- [ ] At least one feedback loop (validation + revision)
- [ ] At least one human-in-the-loop checkpoint
- [ ] Clear validation criteria defined upfront
- [ ] Proper artifact naming and flow
- [ ] Conditional phases marked clearly
- [ ] Iteration limits set
- [ ] Success criteria defined
- [ ] Complete enough to actually implement

---

## Part 8: What's Next? Beyond the Course

### You've Completed AMA Fundamentals

You now have the foundational knowledge to:
- Build structured, scalable marketing systems with AI
- Coordinate complex workflows across research, strategy, and content
- Create custom commands and workflows for your specific needs
- Validate quality and maintain brand consistency
- Iterate and refine work through feedback loops

### Continuing Your AMA Journey

#### Practice Opportunities

**Start Small:**
1. Create one wrapper command for a workflow you run regularly
2. Implement one research execution with proper orchestration
3. Build one strategy synthesis workflow with validation

**Build Up:**
1. Design a multi-stage workflow (research → strategy)
2. Add feedback loops to existing workflows
3. Create dynamic task generation for variable-count scenarios

**Go Advanced:**
1. Build complete end-to-end marketing system
2. Design custom skills for your domain
3. Create workflow templates for your team

#### Resources for Continued Learning

**AMA Documentation:**
- [CLAUDE.md](/CLAUDE.md) - Complete system reference
- [MANIFESTO.md](/MANIFESTO.md) - System philosophy and vision
- [agentic-orchestrating skill](/.claude/skills/agentic-orchestrating/SKILL.md) - Orchestration patterns

**Skills to Explore:**
- `researching` - Research methodology and execution
- `synthesizing-strategy` - Strategy synthesis patterns
- `creating-content` - Content generation workflows
- `skill-creator` - Create your own skills

**Commands to Study:**
- `/plan` - Planning methodology
- `/implement` - Execution patterns
- `/strategize` - Strategy synthesis workflow
- Any custom commands in your workspace

#### Building Your Own Skills

Now that you understand orchestration, consider creating skills for:
- Your specific industry or domain
- Your company's unique workflows
- Repeating research patterns
- Custom validation criteria
- Team collaboration patterns

Reference the `skill-creator` skill for guidance on skill development.

#### Contributing to AMA

AMA is a methodology that improves through use:
- Document patterns you discover
- Share workflows that work well
- Contribute validation criteria
- Help others learn the system

### The Real Power of AMA

AMA isn't just about **doing marketing tasks faster** with AI.

It's about building **systems that scale**, **knowledge that persists**, and **workflows that improve** over time.

**What you've learned enables:**
- Marketing that compounds (each execution builds on previous work)
- Strategy that's verifiable (every claim has evidence)
- Content that's consistent (validated against strategy)
- Knowledge that's preserved (not lost in chat history)
- Teams that align (shared structure and patterns)

This is **systematic marketing** in the age of AI.

### Your Next Steps

1. **Review your understanding:**
   - Can you design an orchestrated workflow from scratch?
   - Can you explain when to use which patterns?
   - Can you identify opportunities in your work?

2. **Start implementing:**
   - Pick one workflow you run regularly
   - Design it using patterns from this course
   - Implement and refine it
   - Document what you learn

3. **Keep learning:**
   - Study existing workflows in your workspace
   - Read through skills to see patterns
   - Experiment with advanced patterns
   - Share what you discover

---

## Congratulations!

You've completed the **AMA Fundamentals Course**.

You started knowing nothing about:
- How LLMs actually work (context windows, limitations)
- Why file systems matter for AI workflows
- How to organize marketing work systematically
- How to delegate effectively to AI agents
- How to coordinate complex multi-phase work
- How to build sophisticated marketing systems

Now you can:
- Design complete marketing workflows from scratch
- Build systems that span research → strategy → content
- Create custom commands and skills for your needs
- Validate quality and iterate based on feedback
- Use AI as a collaborator in structured, scalable ways

**This is the foundation. What you build on it is up to you.**

Keep learning, keep building, keep improving the system.

Welcome to systematic marketing with AI.

---

## Additional Resources

### Class Materials
- [Class 1: LLM Fundamentals](02a-class-1-llm-fundamentals.md)
- [Class 2: Integrated File System](02b-class-2-integrated-file-system.md)
- [Class 3: Marketing File Structure](02c-class-3-marketing-file-structure.md)
- [Class 4: Git Version Control](02d-class-4-git-version-control.md)
- [Class 5: Claude Code Commands](02e-class-5-claude-code-commands.md)
- [Class 6: Agent Delegation](02f-class-6-agent-delegation.md)
- [Class 7: Claude Code Skills](02g-class-7-claude-code-skills.md)
- [Class 8: Orchestration Fundamentals](02h-class-8-orchestration-fundamentals.md)
- [Class 9: Advanced Orchestration](02i-class-9-advanced-orchestration.md) (this class)

### AMA System Documentation
- [CLAUDE.md](/CLAUDE.md) - Complete structural guide
- [MANIFESTO.md](/MANIFESTO.md) - System philosophy
- [Agentic Orchestrating Skill](/.claude/skills/agentic-orchestrating/SKILL.md)

### Practice Workflows
- Browse `/brand/research/` for research execution examples
- Browse `/brand/strategy/` for strategy synthesis examples
- Browse `/brand/content/` for content generation examples
- Study `/.claude/commands/` for wrapper command examples
- Study `/.claude/skills/` for packaged workflow patterns

---

**Course Complete. System Mastered. Build Something Great.**
