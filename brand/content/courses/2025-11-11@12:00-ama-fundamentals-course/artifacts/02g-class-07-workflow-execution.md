# Class 7: Workflow Execution (PLAN.md/TODO.md Pattern)

**Tagline:** Making complex work visible and resumable

**Prerequisites:**
- Class 1 (LLM fundamentals)
- Class 2 (File-based context)
- Class 3 (Three-layer framework)
- Class 4 (Entry points and navigation)
- Class 5 (Audit trails)
- Class 6 (Agent coordination)

**Estimated Time:** 2 hours (1.5 hours reading, 30 min exercises)

---

## Class Overview

Complex marketing workflows—like competitive analysis, strategy synthesis, or multi-channel content creation—involve multiple phases, different specialists, and numerous artifacts. Without structure, these workflows become chaotic: work gets lost, phases get skipped, and nobody (including the AI) knows where things stand.

This class teaches the PLAN.md/TODO.md pattern, which makes complex multi-phase workflows:
- **Visible** - Anyone can see what's happening at a glance
- **Resumable** - Work can pause and restart from any point
- **Trackable** - Progress is documented in real-time
- **Auditable** - Complete record of execution for future reference

By the end of this class, you'll understand how to break down complex tasks into manageable phases, delegate work to specialist agents, track progress transparently, and manage the artifacts that flow between phases.

---

## Why Complex Work Needs Structure

### The Problem: Hidden State

Consider this request:

> "Research our top 5 competitors, analyze their positioning and messaging, compare their content strategies, and synthesize strategic recommendations for differentiation."

Without structure, this becomes a monolithic task where:
- **Progress is invisible** - "I'm working on it" tells you nothing
- **Resumption is impossible** - If interrupted, must start from scratch
- **Context is overwhelming** - All work happens in one massive conversation
- **Handoffs are unclear** - When should one specialist give way to another?
- **Quality is hard to verify** - No clear checkpoints for review

### The Solution: Structured Execution

The PLAN.md/TODO.md pattern breaks work into:

1. **Discrete phases** - Each with clear inputs and outputs
2. **Tracked progress** - Real-time visibility into current state
3. **Named artifacts** - Concrete outputs that flow between phases
4. **Agent handoffs** - Specialists work with focused context
5. **Resumption points** - Can pause and restart from any phase

**Result:** Complex work becomes manageable, visible, and verifiable.

---

## Standard Execution Folder Structure

All complex workflows follow this structure:

```
/{base-dir}/{workflow-name}/{YYYY-MM-DD@HH:mm}/
├── data/              # Input files (optional - only if workflow needs external data)
├── artifacts/         # Phase outputs
│   ├── 01-*.md
│   ├── 02a-*.md
│   ├── 02b-*.md
│   └── 03-*.md
├── PLAN.md           # Execution blueprint
├── TODO.md           # Progress tracking
└── RESEARCH.md       # Final output (or STRATEGY.md or CONTENT.md)
```

### Folder Components

**Base Directory:** `/brand/research/`, `/brand/strategy/`, or `/brand/content/`
- Determines which layer this workflow lives in

**Workflow Name:** `{workflow-name}/`
- Kebab-case descriptor (e.g., `landing-page-best-practices`, `voice-strategy-synthesis`)
- Contains all execution runs for this workflow type

**Execution Timestamp:** `{YYYY-MM-DD@HH:mm}/`
- Format: `2025-10-31@15:57`
- Unique per execution (minute-level granularity)
- Enables temporal tracking and comparison
- Human-readable date/time for easy navigation

**data/ subdirectory (optional):**
- Input files needed for execution
- User-provided documents
- Scraped/fetched external content
- Only created if workflow requires it

**artifacts/ subdirectory:**
- Phase outputs following naming conventions
- Intermediate results that flow between phases
- Created during implementation
- See "Artifact Management" section below

**PLAN.md:**
- The execution blueprint (created during planning)
- Phase breakdown and sequencing
- Agent delegation specifications
- Expected artifacts and success criteria

**TODO.md:**
- Progress tracking file (created during implementation)
- Updated after each phase completes
- Shows current state and completion status
- Enables resumption from specific phases

**OUTPUT.md:**
- Final consolidated output
- Named based on base directory: RESEARCH.md, STRATEGY.md, or CONTENT.md
- Synthesizes all phase findings
- Created at end of implementation

---

## PLAN.md: The Execution Blueprint

PLAN.md is the source of truth for workflow execution. It answers:
- **What** are we accomplishing? (Objective)
- **How** will we approach it? (Methodology)
- **What phases** will we execute? (Step-by-step breakdown)
- **Who** does each phase? (Agent delegation)
- **What artifacts** will each phase produce? (Outputs)
- **How do we know we succeeded?** (Success criteria)

### PLAN.md Structure

```markdown
# [Workflow Name]

**Created:** 2025-10-31@15:57
**Execution Folder:** `/brand/research/landing-page-best-practices/2025-10-31@15:57/`

## Objective

[Clear statement of what this workflow accomplishes]

## Approach

[High-level methodology - how will we tackle this?]

## Input Data

**Location:** `data/`

[Description of any input files or external data needed]
[If no input data needed, state "None - workflow uses existing files"]

## Step by Step Tasks

### 1. [Phase Name]

[Description of what this phase accomplishes]

**Agent:** [agent-type]
**Instructions:** [path to instructions file OR "Inline instructions below"]
**Input Artifacts:**
- [List of artifacts this phase needs]
- [File paths or descriptions]

**Output Artifact:** `artifacts/01-artifact-name.md`

**Task Details:**

[Detailed instructions for the agent executing this phase]

---

### 2a. [Parallel Phase Name]

[Use letter suffixes (2a, 2b, 2c) for parallel phases]

**Agent:** [agent-type]
**Instructions:** [instructions]
**Input Artifacts:** [inputs]
**Output Artifact:** `artifacts/02a-artifact-name.md`

**Task Details:** [instructions]

---

### 2b. [Another Parallel Phase]

[Parallel phases share same number, different letters]

**Agent:** [agent-type]
**Instructions:** [instructions]
**Input Artifacts:** [inputs]
**Output Artifact:** `artifacts/02b-artifact-name.md`

**Task Details:** [instructions]

---

### 3. [Final Phase]

[Sequential phase - depends on completion of Phase 2a and 2b]

**Agent:** [agent-type]
**Instructions:** [instructions]
**Input Artifacts:**
- `artifacts/02a-artifact-name.md`
- `artifacts/02b-artifact-name.md`

**Output Artifact:** `artifacts/03-final-synthesis.md` and `RESEARCH.md`

**Task Details:** [instructions]

## Success Criteria

- [How do we evaluate if this workflow succeeded?]
- [Concrete, measurable outcomes]
```

### Key PLAN.md Principles

**1. Phases Have Clear Boundaries**

Each phase should:
- Accomplish one clear objective
- Have explicit inputs and outputs
- Be executable by a focused agent
- Enable resumption if interrupted

**2. Sequential vs Parallel Phases**

**Sequential phases** use different numbers:
- `### 1. Research`
- `### 2. Analysis`
- `### 3. Synthesis`

Execute one at a time, each depending on the previous phase's output.

**Parallel phases** use letter suffixes:
- `### 2a. Market Analysis`
- `### 2b. Content Analysis`
- `### 2c. Technical Analysis`

Can execute simultaneously, all using the same input but producing different outputs.

**3. Agent Delegation is Explicit**

Each phase specifies:
- **Agent type** - Which specialist executes this phase
- **Instructions** - File path or inline guidance
- **Input artifacts** - What this phase needs to load
- **Output artifact** - Where to write results

**4. Progressive Disclosure**

Agents receive:
- **File paths, not content** - Load context when needed
- **Only relevant inputs** - Just the artifacts from previous phases they need
- **Focused instructions** - Clear, single-responsibility tasks

This maintains high signal-to-noise ratio and prevents context overflow.

---

## Real PLAN.md Example

Let's examine a real research workflow from the workspace:

```markdown
# Landing Page Best Practices Research

**Created:** 2025-10-31@15:57
**Execution Folder:** `/brand/research/landing-page-best-practices/2025-10-31@15:57/`

## Objective

Synthesize research from three authoritative sources (Unbounce, Mailchimp) to
create a comprehensive, evidence-based guide on high-converting landing page
design and best practices.

## Approach

1. **Extract core patterns** - Identify recurring principles across all sources
2. **Categorize by domain** - Organize findings into actionable categories
3. **Synthesize unique insights** - Highlight differentiated findings
4. **Create actionable framework** - Structure as reference guide

## Input Data

**Source Articles (Already Scraped via Firecrawl):**

1. Unbounce - High-Converting Landing Page Examples (30%+ conversion rates)
2. Mailchimp - Product Landing Page Anatomy (key components)
3. Unbounce - Landing Page Best Practices (11 essential practices)

## Step by Step Tasks

### 1. Extract Core Patterns Across Sources

Analyze all three articles to identify recurring patterns that appear across
multiple sources. Focus on consensus—what all experts agree drives conversions.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- Scraped article content (already in context)
- Source URLs for citation

**Output Artifact:** `artifacts/01-core-patterns-analysis.md`

**Task Details:**

Extract:
1. Principles mentioned in all 3 sources (universal consensus)
2. Principles mentioned in 2 of 3 sources (strong consensus)
3. Quantitative benchmarks (conversion rates, load times, percentages)
4. Structural elements (components of high-converting pages)

For each pattern, note:
- Which sources mention it
- Specific evidence or examples
- Quantitative data supporting the principle

Organize into categories:
- Conversion Principles
- Structural Elements
- Copy/Messaging
- Visual/Design
- Technical
- Trust Signals

---

### 2a. Identify Unique Insights & Counterintuitive Findings

Analyze for differentiated insights—principles mentioned by only one source
or findings that contradict common assumptions.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-core-patterns-analysis.md`
- Source article content

**Output Artifact:** `artifacts/02a-unique-insights.md`

**Task Details:**

Identify:
1. Unique tactical advice (mentioned by only one source)
2. Counterintuitive findings (challenges common assumptions)
3. Industry-specific variations (B2B vs ecommerce)
4. Emerging trends (newer practices not yet widespread)

For each insight:
- Which source provided it
- Supporting evidence
- Why it's differentiated
- Potential applicability to Vibeflow

---

### 2b. Extract Real-World Examples & Case Studies

Catalog specific examples, case studies, and conversion data from the articles.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-core-patterns-analysis.md`
- Source article content

**Output Artifact:** `artifacts/02b-examples-case-studies.md`

**Task Details:**

Extract and organize:
1. High-performing landing pages (company, industry, conversion rate, success factors)
2. Example landing pages (what made each effective)
3. Quantitative benchmarks (avg conversion rates, load time impact, mobile traffic, video impact)

Organize by:
- Conversion rate (highest to lowest)
- Industry/vertical
- Landing page type

---

### 3. Synthesize Comprehensive Landing Page Guide

Consolidate all findings into structured, actionable research document.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-core-patterns-analysis.md`
- `artifacts/02a-unique-insights.md`
- `artifacts/02b-examples-case-studies.md`

**Output Artifact:** `artifacts/03-synthesis-draft.md` and `RESEARCH.md`

**Task Details:**

Create final research document with:

1. Executive Summary
2. Core Conversion Principles
3. Structural Elements
4. Copy & Messaging Best Practices
5. Visual & Design Guidelines
6. Technical Optimization
7. Trust & Credibility Signals
8. Landing Page Type Variations
9. Common Mistakes to Avoid
10. Case Study Highlights
11. Research Sources

Use markdown, inline citations, bullet points, quantitative data,
and maintain unopinionated factual tone.

## Success Criteria

- Comprehensive coverage of all major patterns from all three sources
- Every principle supported by source attribution or quantitative data
- Actionable structure organized by domain
- Differentiated insights clearly highlighted
- Quantitative benchmarks included
- Unopinionated factual documentation
```

### What Makes This Plan Effective

**Clear objective:** "Synthesize research from three sources into comprehensive guide"

**Methodical approach:** Extract → Categorize → Synthesize (logical progression)

**Explicit parallelization:** Phase 2a and 2b run simultaneously (different analyses of same input)

**Progressive disclosure:** Phase 3 receives paths to Phase 1, 2a, 2b artifacts (not full content)

**Concrete outputs:** Every phase produces a named artifact

**Actionable instructions:** Each phase has detailed task guidance

**Measurable success:** Clear criteria for evaluating completion

---

## TODO.md: Progress Tracking

TODO.md is the real-time progress tracker. It answers:
- **Where are we?** (Current phase)
- **What's done?** (Completed phases with checkboxes)
- **What's next?** (Remaining phases)
- **What artifacts exist?** (Links to all outputs)
- **When did this happen?** (Timestamps)

### TODO.md Lifecycle

**1. Initial Creation (Start of Implementation)**

```markdown
# [Workflow Name] Progress

**Status:** In Progress
**Started:** 2025-10-31 15:57
**Execution Folder:** /brand/research/landing-page-best-practices/2025-10-31@15:57

## Phases

- [ ] Phase 1: Extract Core Patterns Across Sources
- [ ] Phase 2a: Identify Unique Insights
- [ ] Phase 2b: Extract Real-World Examples
- [ ] Phase 3: Synthesize Comprehensive Guide

## Artifacts

- [ ] [01-core-patterns-analysis.md](artifacts/01-core-patterns-analysis.md)
- [ ] [02a-unique-insights.md](artifacts/02a-unique-insights.md)
- [ ] [02b-examples-case-studies.md](artifacts/02b-examples-case-studies.md)
- [ ] [03-synthesis-draft.md](artifacts/03-synthesis-draft.md)
- [ ] [RESEARCH.md](RESEARCH.md)

## Current Phase

**Phase 1:** Extracting core patterns across all three sources...

## Notes

(Add important observations during execution)
```

**2. During Execution (After Each Phase)**

```markdown
# Landing Page Best Practices Research Progress

**Status:** In Progress
**Started:** 2025-10-31 15:57
**Execution Folder:** /brand/research/landing-page-best-practices/2025-10-31@15:57

## Phases

- [x] Phase 1: Extract Core Patterns → [01-core-patterns-analysis.md](artifacts/01-core-patterns-analysis.md)
- [x] Phase 2a: Identify Unique Insights → [02a-unique-insights.md](artifacts/02a-unique-insights.md)
- [ ] Phase 2b: Extract Real-World Examples
- [ ] Phase 3: Synthesize Comprehensive Guide

## Artifacts

- [x] [01-core-patterns-analysis.md](artifacts/01-core-patterns-analysis.md) - Core patterns identified
- [x] [02a-unique-insights.md](artifacts/02a-unique-insights.md) - Unique insights documented
- [ ] [02b-examples-case-studies.md](artifacts/02b-examples-case-studies.md)
- [ ] [03-synthesis-draft.md](artifacts/03-synthesis-draft.md)
- [ ] [RESEARCH.md](RESEARCH.md)

## Current Phase

**Phase 2b:** Extracting real-world examples and case studies...

## Notes

- Phase 1 identified universal consensus (all 3 sources) vs strong consensus (2/3)
- Phase 2a found counterintuitive insight: complexity as competitive moat
```

**3. At Completion**

```markdown
# Landing Page Best Practices Research Progress

**Status:** ✅ Completed
**Started:** 2025-10-31 15:57
**Completed:** 2025-10-31 16:15
**Execution Folder:** /brand/research/landing-page-best-practices/2025-10-31@15:57

## Summary

**Key Outcome:** Synthesized evidence-based guide from 3 authoritative sources covering
11 major landing page domains. Identified universal consensus patterns, unique insights,
and 12 high-performing case studies with 30-77% conversion rates.

**Final Output:** [RESEARCH.md](RESEARCH.md)

## Phases

- [x] Phase 1: Extract Core Patterns → [01-core-patterns-analysis.md](artifacts/01-core-patterns-analysis.md)
- [x] Phase 2a: Identify Unique Insights → [02a-unique-insights.md](artifacts/02a-unique-insights.md)
- [x] Phase 2b: Extract Real-World Examples → [02b-examples-case-studies.md](artifacts/02b-examples-case-studies.md)
- [x] Phase 3: Synthesize Comprehensive Guide → RESEARCH.md

## Artifacts

- [x] [01-core-patterns-analysis.md](artifacts/01-core-patterns-analysis.md) - Core patterns identified
- [x] [02a-unique-insights.md](artifacts/02a-unique-insights.md) - Unique insights documented
- [x] [02b-examples-case-studies.md](artifacts/02b-examples-case-studies.md) - Case studies extracted
- [x] [RESEARCH.md](RESEARCH.md) - Final comprehensive guide (11 sections)

## Notes

- Used inline URL citations throughout for full traceability
- Followed unopinionated research principle - documented industry best practices factually
- Identified universal consensus (all 3 sources) vs strong consensus (2 of 3)
- Extracted 12 high-performing case studies with conversion rates 30-77%
- Documented quantitative benchmarks: 6.6% avg conversion, 83% mobile traffic,
  80% video impact, 3-sec load time threshold
```

### TODO.md Update Pattern

**After each phase completes:**

1. **Check off phase** with link to artifact:
   ```markdown
   - [x] Phase 2a: Market Analysis → [02a-positioning.md](artifacts/02a-positioning.md)
   ```

2. **Check off artifact** with brief description:
   ```markdown
   - [x] [02a-positioning.md](artifacts/02a-positioning.md) - Market positioning analysis complete
   ```

3. **Update current phase**:
   ```markdown
   ## Current Phase

   **Phase 2b:** Analyzing website content and brand voice...
   ```

4. **Add relevant notes**:
   ```markdown
   ## Notes

   - Phase 2a identified strong differentiation opportunity in sustainability messaging
   - Consider deeper dive into competitor pricing in follow-up
   ```

**After all phases complete:**

1. **Update status line**:
   ```markdown
   **Status:** ✅ Completed
   **Completed:** 2025-10-31 16:15
   ```

2. **Add summary section** with key outcome and final output link

3. **Ensure all checkboxes marked** with links to artifacts

---

## Artifact Management

Artifacts are the concrete outputs that flow between phases. They enable:
- **Progressive disclosure** - Phases load only what they need
- **Resumability** - Can restart from any phase with existing artifacts
- **Auditability** - Complete record of intermediate work
- **Quality validation** - Can review phase outputs independently

### Artifact Naming Conventions

**Format:** `{phase-number}-{descriptive-name}.md`

**Sequential phases:**
- `01-competitor-identification.md`
- `02-market-analysis.md`
- `03-strategic-synthesis.md`

**Parallel phases (letter suffixes):**
- `02a-positioning-analysis.md`
- `02b-content-analysis.md`
- `02c-technical-analysis.md`

**Why this convention:**
- **Sortable** - Files appear in execution order
- **Self-documenting** - Name describes content
- **Parallel-aware** - Letter suffixes show simultaneous execution
- **Predictable** - Easy to reference in PLAN.md

### Artifact Characteristics

**1. Self-Contained**

Each artifact should:
- Be understandable independently
- Include context about what it contains
- Reference sources and inputs used
- Be written in markdown

**2. Right-Sized**

Artifacts should:
- Focus on their phase's specific output
- Be comprehensive enough to use in later phases
- Maintain high signal-to-noise ratio
- Typically 200-500 lines (not a hard rule)

**3. Cross-Referenced**

Artifacts should:
- Reference sources using markdown links
- Link to research when making claims
- Point to previous phase artifacts when building on them
- Maintain audit trails

---

## Execution Folder Timestamps

Every execution gets a unique timestamp: `{YYYY-MM-DD@HH:mm}/`

**Format Examples:**
- `2025-10-31@15:57/`
- `2025-11-05@18:23/`
- `2025-11-11@12:00/`

**Why Temporal Folders:**

**1. Complete Execution History**

Multiple runs of the same workflow type preserve all iterations:

```
/brand/research/category-landscape/
├── 2025-10-15@09:30/    ← First competitive analysis
├── 2025-11-05@18:23/    ← Updated analysis (new competitors)
└── 2025-11-15@14:00/    ← Third analysis (market shift)
```

**2. Comparison and Evolution**

Can compare findings across time:
- How has competitive landscape changed?
- What insights held true vs shifted?
- Which strategies remained effective?

**3. Iteration Without Destruction**

New execution doesn't overwrite previous work:
- Original research preserved
- Can reference historical findings
- Full audit trail maintained

**4. Resumability**

If execution fails or is interrupted:
- Artifacts preserved in timestamped folder
- Can resume from last completed phase
- No work lost

---

## Resumability Pattern

One of the most powerful aspects of the PLAN.md/TODO.md pattern is resumability: the ability to pause and restart workflows from specific phases.

### When Resumption is Needed

**Interruption:** Workflow stops mid-execution (timeout, error, user pause)

**Iteration:** Need to regenerate specific phase with updated inputs

**Quality validation:** Marketing Architect reviews and requests changes to specific phase

**Context limits:** Outputs too large, need to regenerate with tighter focus

### How Resumption Works

**1. Read TODO.md** to identify last completed phase

**2. Identify resume point** - first unchecked phase

**3. Preserve completed artifacts** - don't regenerate what's already done

**4. Resume execution** from uncompleted phase forward

**5. Update TODO.md** with resumption log

### Real Resumption Example

From the Voice Strategy workflow:

```markdown
# Voice Strategy Synthesis - TODO

**Started:** 2025-10-29@10:35
**First Completion:** 2025-10-29@10:35
**Resumed:** 2025-10-29@10:35 (from Phase 3)
**Final Completion:** 2025-10-29@10:35
**Status:** ✅ Complete

## Resumption Log

### Resumption 1: 2025-10-29@10:35
**Resume Point:** Phase 3 (Finalize and Cross-Reference Strategy Files)
**Reason:** Output files too long for AI context usage - need high signal-to-token
ratio (~300 lines target, 500 max)
**Preserved:** Phase 1 and 2 artifacts (voice strategy draft, Twitter extension draft)
**Will Regenerate:** Phase 3 artifacts, STRATEGY.md, twitter/EXTENSION.md

---

## Phases

- [x] Phase 1: Synthesize Universal Voice Guidelines ✓ (preserved)
- [x] Phase 2: Create Twitter Extension with Algorithm Optimization ✓ (preserved)
- [x] Phase 3: Finalize and Cross-Reference Strategy Files ✓ (re-validated)

## Final Deliverables

- ✅ STRATEGY.md - Universal voice strategy (298 lines, 26 research citations)
- ✅ twitter/EXTENSION.md - Twitter-specific extension (340 lines, 18 algorithm citations)
- ✅ artifacts/03-final-review.md - Quality validation report (95% confidence)
```

**What happened:**
1. Initial execution completed all 3 phases
2. Marketing Architect identified Phase 3 outputs were too verbose
3. Workflow resumed from Phase 3, preserving Phase 1 and 2 work
4. Phase 3 regenerated with tighter focus
5. TODO.md documented the resumption with clear reasoning

**Key principle:** Resumption logs provide transparency about what changed and why.

---

## Real Workflow Walkthrough

Let's trace a complete workflow execution from planning to completion using the Voice Strategy Synthesis example.

### Phase 1: Planning

**Input:** Request to synthesize voice strategy from research findings

**Create execution folder:**
```
/brand/strategy/voice/2025-10-29@10:35/
├── data/          (not needed - using existing research)
└── artifacts/     (will be populated during execution)
```

**Write PLAN.md:**
- **Objective:** Synthesize comprehensive voice strategy with Twitter extension
- **Approach:** Universal guidelines → Platform-specific extension → Quality validation
- **Phases:**
  - Phase 1: Synthesize Universal Voice Guidelines (strategist-agent)
  - Phase 2: Create Twitter Extension (strategist-agent)
  - Phase 3: Finalize and Cross-Reference (general-purpose)

**Result:** Clear execution blueprint with 3 sequential phases

### Phase 2: Implementation

**Create TODO.md:**
```markdown
# Voice Strategy Synthesis - TODO

**Status:** In Progress
**Started:** 2025-10-29@10:35

## Phases

- [ ] Phase 1: Synthesize Universal Voice Guidelines
- [ ] Phase 2: Create Twitter Extension with Algorithm Optimization
- [ ] Phase 3: Finalize and Cross-Reference Strategy Files

## Current Phase

**Phase 1:** Synthesizing universal voice guidelines from research findings...
```

**Execute Phase 1:**
1. Read PLAN.md Phase 1 section
2. Delegate to strategist-agent with:
   - Input: Research file paths (voice benchmarking, brand fundamentals, customer insights)
   - Instructions: Inline from PLAN.md
   - Output: `artifacts/01-voice-strategy-draft.md`
3. Strategist agent loads research files progressively, synthesizes voice strategy
4. Agent writes artifact to specified path
5. Phase 1 completes

**Update TODO.md after Phase 1:**
```markdown
## Phases

- [x] Phase 1: Synthesize Universal Voice Guidelines → [01-voice-strategy-draft.md](artifacts/01-voice-strategy-draft.md)
- [ ] Phase 2: Create Twitter Extension with Algorithm Optimization
- [ ] Phase 3: Finalize and Cross-Reference Strategy Files

## Current Phase

**Phase 2:** Creating Twitter-specific voice extensions with algorithm optimization...
```

**Execute Phase 2:**
1. Read PLAN.md Phase 2 section
2. Delegate to strategist-agent with:
   - Input: `artifacts/01-voice-strategy-draft.md`, Twitter algorithm research
   - Instructions: Inline from PLAN.md
   - Output: `artifacts/02-twitter-extension-draft.md`
3. Agent loads Phase 1 artifact and algorithm research, creates Twitter extension
4. Phase 2 completes

**Update TODO.md after Phase 2:**
```markdown
## Phases

- [x] Phase 1: Synthesize Universal Voice Guidelines → [01-voice-strategy-draft.md](artifacts/01-voice-strategy-draft.md)
- [x] Phase 2: Create Twitter Extension → [02-twitter-extension-draft.md](artifacts/02-twitter-extension-draft.md)
- [ ] Phase 3: Finalize and Cross-Reference Strategy Files

## Current Phase

**Phase 3:** Finalizing strategy files with quality validation and cross-references...
```

**Execute Phase 3:**
1. Read PLAN.md Phase 3 section
2. Delegate to general-purpose agent with:
   - Input: `artifacts/01-voice-strategy-draft.md`, `artifacts/02-twitter-extension-draft.md`
   - Instructions: Validate quality, create final files
   - Output: `artifacts/03-final-review.md`, `STRATEGY.md`, `twitter/EXTENSION.md`
3. Agent validates quality, creates final strategy files
4. Phase 3 completes

**Finalize TODO.md:**
```markdown
**Status:** ✅ Completed
**Started:** 2025-10-29@10:35
**Completed:** 2025-10-29@10:35

## Summary

**Key Outcome:** Synthesized comprehensive voice strategy from research findings
with Twitter-specific extension optimized for X algorithm changes.

**Final Output:** [STRATEGY.md](STRATEGY.md) and [twitter/EXTENSION.md](twitter/EXTENSION.md)

## Phases

- [x] Phase 1: Synthesize Universal Voice Guidelines → [01-voice-strategy-draft.md](artifacts/01-voice-strategy-draft.md)
- [x] Phase 2: Create Twitter Extension → [02-twitter-extension-draft.md](artifacts/02-twitter-extension-draft.md)
- [x] Phase 3: Finalize and Cross-Reference → [03-final-review.md](artifacts/03-final-review.md)

## Final Deliverables

- ✅ STRATEGY.md - Universal voice strategy (298 lines, 26 research citations)
- ✅ twitter/EXTENSION.md - Twitter extension (340 lines, 18 algorithm citations)
- ✅ artifacts/03-final-review.md - Quality validation report
```

**Result:** Complete voice strategy with full audit trail, ready for use in content creation.

---

## Why This Matters for AMA

### For Marketing Architects

**Visibility into AI work:** You can see exactly what the AI is doing at any moment. No more "I'm working on it" black boxes.

**Quality checkpoints:** Review artifacts at each phase rather than only seeing final output. Catch issues early.

**Iterative refinement:** Request changes to specific phases without redoing entire workflow.

**Learning the system:** Study PLAN.md and artifacts to understand how complex marketing tasks get broken down.

**Audit trails:** Complete record of how strategy decisions were made, traceable to research.

### For AI Agents

**Context management:** Load only relevant artifacts for each phase, maintaining high signal-to-noise ratio.

**Focused execution:** Each phase has single, clear responsibility. No trying to do everything at once.

**Resumable work:** If interrupted, can pick up from last completed phase without starting over.

**Clear delegation:** Know exactly when to hand off to specialist agents and what context to provide.

**Quality standards:** Success criteria provide clear evaluation framework.

### For the System

**Scalability:** Complex workflows don't overwhelm context limits because work is chunked.

**Maintainability:** Can update specific phases without touching entire workflow.

**Reusability:** PLAN.md becomes template for similar future workflows.

**Composability:** Artifacts from one workflow can feed into others.

**Transparency:** Anyone (human or AI) can understand workflow state at a glance.

---

## Technical Deep Dive

### Phase Isolation Strategy

Each phase receives:
- **File paths** to input artifacts (not content)
- **Focused instructions** for single responsibility
- **Clear output path** for results

This creates isolated execution contexts:
- **Phase 1** doesn't load Phase 2's concerns
- **Phase 2** loads only Phase 1's output (not original research)
- **Phase 3** synthesizes from all previous phases

**Result:** High signal-to-noise ratio maintained throughout execution.

### Artifact Versioning

Temporal execution folders provide implicit versioning:

```
/brand/research/category-landscape/
├── 2025-10-15@09:30/
│   └── artifacts/
│       ├── 01-competitors.md      (v1 - 5 competitors)
│       ├── 02-analysis.md
│       └── 03-synthesis.md
└── 2025-11-05@18:23/
    └── artifacts/
        ├── 01-competitors.md      (v2 - 7 competitors, 2 new)
        ├── 02-analysis.md
        └── 03-synthesis.md
```

Can compare artifacts across versions to see evolution.

### Parallel Execution Pattern

When PLAN.md specifies parallel phases (2a, 2b, 2c):

**Launch all parallel phases simultaneously:**
```
Phase 2a: Market Analysis (launches)
Phase 2b: Content Analysis (launches)
Phase 2c: Technical Analysis (launches)
```

**Wait for ALL to complete** before proceeding to Phase 3:
```
Phase 2a: ✓ Complete
Phase 2b: ✓ Complete
Phase 2c: ✓ Complete
→ Now launch Phase 3
```

**Phase 3 receives all parallel outputs:**
- `artifacts/02a-market-analysis.md`
- `artifacts/02b-content-analysis.md`
- `artifacts/02c-technical-analysis.md`

**Performance benefit:** Three analyses complete in time of one.

### Resumption State Management

TODO.md maintains execution state:

**Checkboxes = State:**
- Unchecked = Not started
- Checked = Completed
- Linked = Artifact exists

**Current Phase = Active work:**
Shows what's happening now

**Notes = Context:**
Important observations preserved for resumption

**Resumption Log = Change history:**
Documents what was regenerated and why

---

## Common Patterns and Best Practices

### Pattern 1: Research → Analysis → Synthesis

**Use for:** Any workflow that gathers information, analyzes it, and draws conclusions

**Structure:**
- Phase 1: Data collection (scraping, interviews, document gathering)
- Phase 2a-c: Multiple parallel analyses of collected data
- Phase 3: Synthesis into final output

**Example:** Competitive landscape research, customer insights studies, market analysis

### Pattern 2: Draft → Review → Finalize

**Use for:** Strategy or content workflows requiring quality validation

**Structure:**
- Phase 1: Create first draft
- Phase 2: Validate quality, identify issues
- Phase 3: Refine and finalize

**Example:** Voice strategy synthesis, positioning development, messaging framework

### Pattern 3: Sequential Deepening

**Use for:** Workflows where each phase builds on previous in linear progression

**Structure:**
- Phase 1: Foundation
- Phase 2: Expand on foundation
- Phase 3: Deepen further
- Phase 4: Final synthesis

**Example:** Strategy synthesis across multiple domains, progressive content refinement

### Best Practice: One Task In-Progress

**Principle:** Only one phase should be marked as "Current Phase" at a time.

**Why:** Maintains focus, prevents context overflow, ensures sequential dependencies are respected.

**How:** Update "Current Phase" section after each phase completes.

### Best Practice: Immediate TODO.md Updates

**Principle:** Update TODO.md immediately after each phase completes, not in batches.

**Why:** Real-time visibility, resumability from any point, accurate progress tracking.

**How:** Check off phase, check off artifact, update current phase, add notes if relevant.

### Best Practice: Descriptive Phase Names

**Good:**
- "Extract Core Patterns Across Sources"
- "Analyze Market Positioning and Messaging"
- "Synthesize Strategic Recommendations"

**Bad:**
- "Do research"
- "Analyze stuff"
- "Final step"

**Why:** Descriptive names make PLAN.md and TODO.md self-documenting.

### Best Practice: Success Criteria in PLAN.md

Always include concrete, measurable success criteria:

**Good:**
- "All research claims have source citations"
- "Strategy document includes 3-5 voice attributes with examples"
- "Final output is 200-500 lines with high signal-to-noise ratio"

**Bad:**
- "Good quality output"
- "Complete the work"
- "Do a good job"

**Why:** Provides clear evaluation framework for both agents and humans.

---

## Exercises

### Exercise 1: Analyze a PLAN.md

Open `/brand/research/landing-page-best-practices/2025-10-31@15:57/PLAN.md` in your workspace.

**Questions:**

1. How many phases does this workflow have?
2. Which phases can run in parallel? How do you know?
3. What input does Phase 3 receive?
4. What artifacts does the workflow produce?
5. What success criteria are defined?

**Answers:**

1. 4 phases (1, 2a, 2b, 3)
2. Phases 2a and 2b can run in parallel (both numbered "2" with letter suffixes)
3. Phase 3 receives artifacts from Phase 1, 2a, and 2b
4. Four artifacts: 01-core-patterns-analysis.md, 02a-unique-insights.md, 02b-examples-case-studies.md, 03-synthesis-draft.md, plus final RESEARCH.md
5. Six success criteria covering comprehensiveness, evidence-backing, structure, differentiation, quantitative benchmarks, and objectivity

### Exercise 2: Create a Simple PLAN.md

**Scenario:** You need to research the top 3 competitors in your space, analyze their positioning, and synthesize strategic recommendations.

**Task:** Create a PLAN.md for this workflow with:
- Clear objective
- 3-phase structure (Identification → Analysis → Synthesis)
- Artifact definitions
- Success criteria

**Template to fill in:**

```markdown
# Competitive Positioning Research

**Created:** [today's date and time]
**Execution Folder:** `/brand/research/competitive-positioning/[timestamp]/`

## Objective

[What are you accomplishing?]

## Approach

[How will you tackle this?]

## Input Data

[Any data files needed? Or "None - using web research"]

## Step by Step Tasks

### 1. [Phase Name]

[What this phase does]

**Agent:** [which agent?]
**Instructions:** [file path or inline]
**Input Artifacts:** [what does it need?]
**Output Artifact:** [where does it write?]

**Task Details:** [instructions for agent]

---

### 2. [Phase Name]

[Continue pattern...]

---

### 3. [Phase Name]

[Continue pattern...]

## Success Criteria

- [How do you know this succeeded?]
- [Concrete, measurable outcomes]
```

### Exercise 3: Track Progress with TODO.md

**Scenario:** You're executing the PLAN.md you created in Exercise 2. Phase 1 just completed.

**Task:** Create a TODO.md that shows:
- Phase 1 complete with artifact link
- Phase 2 in progress
- Phase 3 not started
- Note about what Phase 1 found

**Template to fill in:**

```markdown
# [Workflow Name] Progress

**Status:** [status]
**Started:** [timestamp]
**Execution Folder:** [path]

## Phases

- [?] Phase 1: [name] → [artifact link if complete]
- [?] Phase 2: [name]
- [?] Phase 3: [name]

## Artifacts

- [?] [artifact-name.md](path) - [brief description]
- [?] [artifact-name.md](path)
- [?] [artifact-name.md](path)

## Current Phase

**Phase [?]:** [what's happening now]

## Notes

- [observations from Phase 1]
```

---

## Common Pitfalls and Solutions

### Pitfall 1: Phases Too Large

**Problem:** Phase tries to do too much, overwhelming agent context

**Example:** "Research competitors, analyze their positioning, messaging, content, and technical approach, then synthesize recommendations" in one phase

**Solution:** Break into smaller phases with clear boundaries:
- Phase 1: Identify competitors
- Phase 2a: Analyze positioning and messaging
- Phase 2b: Analyze content and brand voice
- Phase 3: Synthesize strategic recommendations

### Pitfall 2: Missing Input Specifications

**Problem:** Phase instructions don't specify what inputs agent should load

**Example:** "Analyze competitors" without saying where competitor list is

**Solution:** Explicitly list input artifacts:
```markdown
**Input Artifacts:**
- `artifacts/01-competitor-list.md`
- `/brand/research/customer-insights/RESEARCH.md`
```

### Pitfall 3: Vague Phase Names

**Problem:** Can't understand what phase does from TODO.md checkbox

**Example:** "Phase 2: Do analysis"

**Solution:** Use descriptive, action-oriented names:
```markdown
- [x] Phase 2: Analyze Market Positioning and Messaging Strategies
```

### Pitfall 4: Not Updating TODO.md Immediately

**Problem:** TODO.md falls out of sync with actual progress

**Example:** Execute 3 phases, then try to update TODO.md from memory

**Solution:** Update TODO.md after EACH phase completes:
- Check off phase
- Check off artifact
- Update current phase
- Add notes if relevant

### Pitfall 5: No Success Criteria

**Problem:** Can't evaluate if workflow succeeded

**Example:** PLAN.md ends without defining what "good" looks like

**Solution:** Always include concrete success criteria:
```markdown
## Success Criteria

- Research includes analysis of at least 5 competitors
- Every strategic claim references research findings with markdown citations
- Final output is 300-500 lines with high signal-to-noise ratio
- Synthesis identifies 3-5 clear differentiation opportunities
```

### Pitfall 6: Forgetting About Parallel Execution

**Problem:** Sequential execution of phases that could run in parallel

**Example:** Analyzing 3 different aspects of competitors one at a time

**Solution:** Use letter suffixes for parallel phases:
```markdown
### 2a. Analyze Market Positioning
### 2b. Analyze Content Strategy
### 2c. Analyze Technical Approach
```

All three launch simultaneously, then Phase 3 waits for all to complete.

---

## Integration with Previous Classes

### Builds on Class 1 (LLM Fundamentals)

**Context window management:** PLAN.md/TODO.md pattern prevents context overflow by chunking work into phases with focused context.

**Progressive disclosure:** Agents load only artifacts they need, maintaining high signal-to-noise ratio.

### Builds on Class 2 (File-Based Context)

**Artifacts as files:** Each phase output is a file that can be selectively loaded by later phases.

**Path-based references:** PLAN.md specifies artifact paths, enabling progressive disclosure.

### Builds on Class 3 (Three-Layer Framework)

**Execution folders live in layers:** Research workflows in `/brand/research/`, strategy in `/brand/strategy/`, content in `/brand/content/`.

**Temporal pattern:** Execution timestamps enable iteration and evolution tracking.

### Builds on Class 4 (Entry Points and Navigation)

**PLAN.md as entry point:** Single file that explains entire workflow.

**Artifact references:** Each artifact references its inputs, creating navigation chain.

### Builds on Class 5 (Audit Trails)

**Artifacts preserve evidence:** Complete record of intermediate work, not just final output.

**TODO.md as execution log:** Documents what happened when, enabling verification.

### Builds on Class 6 (Agent Coordination)

**Explicit delegation:** PLAN.md specifies which agent executes each phase.

**Context-aware handoffs:** Phases receive only relevant inputs, maintaining specialist focus.

---

## Summary

The PLAN.md/TODO.md pattern transforms complex marketing workflows from chaotic black boxes into structured, visible, resumable executions.

**Key Takeaways:**

**1. PLAN.md is the blueprint** - Objective, approach, phase breakdown, agent delegation, success criteria

**2. TODO.md tracks progress** - Real-time visibility, completion status, resumption capability

**3. Artifacts flow between phases** - Concrete outputs, progressive disclosure, audit trails

**4. Temporal execution folders** - Complete history, comparison, evolution tracking

**5. Phase isolation** - Focused context, high signal-to-noise ratio, specialist delegation

**6. Parallel execution** - Letter suffixes (2a, 2b, 2c) enable simultaneous work

**7. Resumability** - Can pause and restart from any phase with preserved artifacts

**You now understand:**
- How to structure complex multi-phase workflows
- When to break work into discrete phases
- How to track progress transparently
- How to manage artifacts that flow between phases
- How to enable workflow resumption
- How to delegate phases to specialist agents
- How temporal execution folders provide iteration history

**Next class:** Class 8 (Hands-On Mastery) brings everything together. You'll execute a complete Research → Strategy → Content workflow, applying all patterns learned across Classes 1-7.

---

## Further Reading

**In the AMA workspace:**

- `.claude/skills/agentic-orchestrating/SKILL.md` - Complete orchestration skill overview
- `.claude/skills/agentic-orchestrating/references/planning.md` - Planning methodology deep dive
- `.claude/skills/agentic-orchestrating/references/implementation.md` - Implementation patterns
- `.claude/skills/agentic-orchestrating/references/progress-tracking.md` - TODO.md specifications
- `.claude/skills/agentic-orchestrating/references/artifacts.md` - Artifact naming and management
- `.claude/skills/agentic-orchestrating/references/delegation.md` - Agent delegation patterns
- `.claude/skills/agentic-orchestrating/references/resuming.md` - Resumption workflows

**Real examples in the workspace:**

- `/brand/research/landing-page-best-practices/2025-10-31@15:57/` - Complete research workflow
- `/brand/strategy/voice/2025-10-29@10:35/` - Strategy synthesis with extension pattern
- `/brand/research/category-landscape/2025-11-05@18:23-semiotic-competitive-analysis/` - Competitive analysis workflow

**Templates:**

- `.claude/skills/agentic-orchestrating/assets/PLAN_template.md` - PLAN.md starting point
- `.claude/skills/agentic-orchestrating/assets/TODO_template.md` - TODO.md starting point

---

## Transition to Class 8

You've now learned all the core AMA patterns:
- How LLMs work and their limitations (Class 1)
- How files solve the context problem (Class 2)
- The three-layer marketing framework (Class 3)
- Entry points and navigation patterns (Class 4)
- Verifiable audit trails (Class 5)
- Agent coordination and delegation (Class 6)
- Workflow execution with PLAN.md/TODO.md (Class 7)

Class 8 brings it all together. You'll execute a complete end-to-end workflow from research through strategy to content, making architectural decisions, troubleshooting issues, and extending the system for new use cases.

Ready to put your knowledge into practice? Let's move to Class 8: Hands-On Mastery.
