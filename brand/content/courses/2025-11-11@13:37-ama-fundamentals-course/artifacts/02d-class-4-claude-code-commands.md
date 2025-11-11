# Class 5: Claude Code Commands

**Course:** AMA Fundamentals
**Class Number:** 5 of 9
**Estimated Time:** 75 minutes
**Prerequisites:** Classes 2 (File System), 3 (AMA Structure), 4 (Git)

---

## Class Overview

In this class, you'll learn how **commands** serve as the fundamental human-AI interface in AMA. Commands transform repetitive prompts into reusable workflows, making your AI interactions consistent, discoverable, and shareable with your team.

Think of commands as your custom "menu" of AI capabilities—instead of remembering complex prompts, you simply type `/research customer-insights` and the AI knows exactly what to do.

### Learning Objectives

By the end of this class, you'll be able to:
- Craft reusable prompts as custom slash commands
- Create command files that follow AMA conventions
- Organize commands for team discoverability
- Understand when to use commands vs skills (preview)
- Recognize how commands solve the "forgotten prompt" problem

### Prerequisites Check

Before starting this class, you should:
- ✅ Understand file systems and navigation (Class 2)
- ✅ Know the AMA three-layer framework structure (Class 3)
- ✅ Be comfortable with Git basics (Class 4)

### What You'll Build

By the end of this class, you'll create:
1. A simple custom command for a marketing workflow
2. A wrapper command that enhances an existing command
3. A command organization structure for your team

---

## Why Commands Matter

### The Problem: Prompt Fatigue

**Without commands**, every time you want AI to perform a repeated task, you face these challenges:

1. **Remembering complex prompts** - "What exactly did I ask for last time?"
2. **Inconsistent results** - Slightly different wording produces different outputs
3. **No team sharing** - Great prompts stay locked in chat history
4. **Context loss** - When starting a new chat, you rebuild everything from scratch

**Example scenario:**

You want to analyze customer interviews. Without commands, you might prompt:

```
"Read the interview transcript at /brand/research/customer-insights/data/interview-2024-11-08.md
and extract key insights about pain points, desired outcomes, and emotional states.
Structure the findings using our research format with clear evidence citations.
Use markdown references to link claims back to specific quotes."
```

This works once. But next time:
- Will you remember the exact wording?
- Will your teammate use the same structure?
- Can you reuse this across different interviews?

### The Solution: Commands as Reusable Interfaces

**With a command**, you create a reusable trigger:

```
/analyze-interview /brand/research/customer-insights/data/interview-2024-11-08.md
```

The command file contains your perfected prompt, ensuring:
- ✅ Consistency across uses
- ✅ Easy discoverability (just type `/` to see options)
- ✅ Team collaboration (everyone uses the same workflow)
- ✅ Version control (commands are files you can track in Git)

---

## Anatomy of a Command

Commands in Claude Code are **markdown files** stored in `/.claude/commands/` that define what the AI should do when you type a slash command.

### Basic Command Structure

Every command file contains two essential parts:

```markdown
---
argument-hint: Brief description of what arguments this command expects
---
# Command Name

## Purpose
What this command does and when to use it

## Instructions
Step-by-step instructions for the AI to execute
```

### Command File Naming

The **filename** becomes the **slash command trigger**:

| Filename | Slash Command |
|----------|---------------|
| `plan.md` | `/plan` |
| `analyze-interview.md` | `/analyze-interview` |
| `research/domain.md` | `/research domain` |

**Note:** Subfolders create command namespaces. A file at `/.claude/commands/research/domain.md` is invoked with `/research domain`.

### Real Example: The `/plan` Command

Let's examine the actual `/plan` command from AMA:

```markdown
---
argument-hint: Task description or path to task description file
---
# Plan

## Purpose

Create a structured execution plan for a workflow using orchestration principles.

## Variables

TASK_INPUT: $ARGUMENTS

## Instructions

- This task requires the `orchestration` skill to understand HOW to create effective plans
- The `TASK_INPUT` may be a file path (read it) or direct text (use it as-is)
- Use the orchestration skill to guide you to plan this task effectively
- Create PLAN.md in the appropriate folder
- Present the plan to the user and iterate based on feedback until approved
- Inform user to run `/implement` when ready
```

**What's happening here:**

1. **Frontmatter** (`---` section) provides a hint shown when typing the command
2. **Purpose** explains what the command does (documentation for humans)
3. **Variables** capture arguments using `$ARGUMENTS`
4. **Instructions** tell the AI exactly what to do, step by step

When you type `/plan "Create customer research workflow"`, the AI:
- Captures `"Create customer research workflow"` as `TASK_INPUT`
- Follows the instructions in order
- References the `orchestration` skill for guidance
- Creates a PLAN.md file
- Iterates with you until approved

---

## Creating Your First Custom Command

Let's create a simple command for analyzing competitor landing pages.

### Step 1: Create the Command File

Create a new file at:
```
/.claude/commands/analyze-competitor-landing-page.md
```

### Step 2: Write the Command

```markdown
---
argument-hint: URL of competitor landing page to analyze
---
# Analyze Competitor Landing Page

## Purpose

Extract key positioning, messaging, and design elements from a competitor's landing page for competitive analysis.

## Variables

LANDING_PAGE_URL: $ARGUMENTS

## Instructions

1. **Scrape the landing page** using the firecrawl MCP tool:
   - Use the URL provided in `LANDING_PAGE_URL`
   - Extract markdown content

2. **Analyze and extract:**
   - Headline and primary value proposition
   - Key benefits listed (bullet points or sections)
   - Call-to-action (CTA) copy and placement
   - Social proof elements (testimonials, logos, stats)
   - Visual hierarchy and design patterns

3. **Structure the output** as:
   ```
   ## [Company Name] Landing Page Analysis
   **URL:** [URL]
   **Analyzed:** [Date]

   ### Value Proposition
   [Primary headline and positioning]

   ### Key Benefits
   - [Benefit 1]
   - [Benefit 2]

   ### CTAs
   - [CTA copy and context]

   ### Social Proof
   [Testimonials, logos, stats]

   ### Design Patterns
   [Notable layout/visual elements]
   ```

4. **Save the output** to `/brand/research/competitive-analysis/data/landing-pages/[company-name]-[date].md`

5. **Ask the user** if they want to analyze another landing page or update the competitive analysis index
```

### Step 3: Use Your Command

Now you can analyze any competitor landing page with:

```
/analyze-competitor-landing-page https://competitor.com
```

The AI will follow your instructions consistently every time.

---

## Command Arguments: Flexible Inputs

Commands can accept different types of arguments to make them more flexible.

### Single Argument: `$ARGUMENTS`

The simplest form—captures everything after the command:

```markdown
## Variables
TASK_INPUT: $ARGUMENTS
```

**Usage:**
```
/plan "Create research workflow"
```
`TASK_INPUT` = `"Create research workflow"`

### Positional Arguments: `$1`, `$2`, `$3`

Capture multiple arguments by position:

```markdown
## Variables
RESEARCH_DOMAIN: $1
ADDITIONAL_INFO: $2
```

**Usage:**
```
/research domain customer-insights "Focus on B2B SaaS segment"
```
- `$1` = `customer-insights`
- `$2` = `"Focus on B2B SaaS segment"`

### File Path Arguments

Commands often receive file paths as inputs:

```markdown
## Variables
RESEARCH_PATH: $ARGUMENTS

## Instructions
1. Read the file at `RESEARCH_PATH`
2. Extract key findings
3. [Continue processing...]
```

**Usage:**
```
/strategize /brand/research/customer-insights/2025-11-08@14:30/RESEARCH.md
```

---

## Wrapper Commands: Enhancing Existing Commands

**Wrapper commands** are commands that call other commands with pre-configured context. They're incredibly powerful for creating domain-specific workflows.

### Why Wrapper Commands?

Imagine you frequently need to create research plans for different domains. Without wrappers:

```
/plan "Create a research plan for customer-insights using the researching skill.
       The execution folder should be in /brand/research/customer-insights/.
       Focus on B2B SaaS buyers."
```

This is verbose and error-prone. With a wrapper:

```
/research domain customer-insights "Focus on B2B SaaS buyers"
```

Much cleaner!

### Real Example: The `/research domain` Wrapper

Let's examine the actual wrapper command from AMA:

```markdown
---
argument-hint: [research domain] [optional - add any additional information here]
---
# Discovery Research

## Purpose

Shortcut command that wraps `/plan` to set up research planning with correct context.

## Variables
RESEARCH_DOMAIN: $1 (e.g., "customer-insights", "category-landscape")
ADDITIONAL_INFO: $2 (optional - any extra context from user)
BASE_DIR: `/brand/research/`

## Instructions

This is a **wrapper command** that constructs a task description for `/plan`. Follow these steps:

1. **Construct TASK_DESCRIPTION** that tells the planner to:
   - Use the `researching` skill
   - Reference the workflow for `RESEARCH_DOMAIN` within that skill
   - Create the plan in `BASE_DIR/RESEARCH_DOMAIN/` (e.g., `/brand/research/customer-insights/`)
   - Incorporate any `ADDITIONAL_INFO` provided by the user

2. **Pass to /plan** using:
   ```
   SlashCommand(`/plan "[TASK_DESCRIPTION]"`)
   ```

**Example TASK_DESCRIPTION format:**
"Create a research plan for [RESEARCH_DOMAIN] using the researching skill and the [RESEARCH_DOMAIN] workflow. The execution folder (where the PLAN.md will be created) should be created in /brand/research/[RESEARCH_DOMAIN]/. [ADDITIONAL_INFO if provided]"

**Note:** This command does NOT use the researching skill directly—it tells `/plan` to use it.
```

**How it works:**

1. **User types:** `/research domain customer-insights "Focus on pain points"`
2. **Wrapper captures:** `customer-insights` and `"Focus on pain points"`
3. **Wrapper constructs:** A full task description for `/plan`
4. **Wrapper invokes:** `/plan` with the constructed description
5. **Result:** `/plan` executes with perfect context every time

### Creating Your Own Wrapper Command

Let's create a wrapper for competitive analysis workflows:

**File:** `/.claude/commands/competitive-analysis/quick-audit.md`

```markdown
---
argument-hint: [competitor-name] [optional - specific focus area]
---
# Quick Competitive Audit

## Purpose

Wrapper command that sets up a structured competitive audit using the /plan command with correct research context.

## Variables
COMPETITOR_NAME: $1
FOCUS_AREA: $2 (optional - e.g., "messaging", "pricing", "features")

## Instructions

1. **Construct TASK_DESCRIPTION** that tells the planner to:
   - Research the competitor's landing page, pricing page, and about page
   - Extract positioning, messaging, and key differentiators
   - If `FOCUS_AREA` is provided, pay special attention to that aspect
   - Create the execution in `/brand/research/competitive-analysis/[COMPETITOR_NAME]/`
   - Output findings to RESEARCH.md

2. **Pass to /plan** using:
   ```
   SlashCommand(`/plan "[TASK_DESCRIPTION]"`)
   ```

**Example TASK_DESCRIPTION:**
"Create a competitive audit plan for [COMPETITOR_NAME]. Research their landing page, pricing, and positioning. [If FOCUS_AREA: Focus especially on [FOCUS_AREA].] Create execution in /brand/research/competitive-analysis/[COMPETITOR_NAME]/ with findings in RESEARCH.md."
```

**Usage:**
```
/competitive-analysis quick-audit notion "messaging and positioning"
```

This invokes `/plan` with all the right context automatically.

---

## Organizing Commands for Teams

As you create more commands, organization becomes critical for discoverability.

### Command Organization Patterns

#### 1. Flat Structure (Simple)

For small teams or simple workflows:

```
/.claude/commands/
├── plan.md
├── implement.md
├── analyze-competitor.md
├── create-content.md
└── update-strategy.md
```

**Pros:** Easy to browse
**Cons:** Gets messy with many commands

#### 2. Domain-Based Structure (Recommended)

Organize by marketing domain:

```
/.claude/commands/
├── plan.md                          # Core orchestration
├── implement.md
├── research/                        # Research workflows
│   ├── domain.md                    # /research domain
│   ├── adhoc.md                     # /research adhoc
│   └── x/
│       └── analyze.md               # /research x analyze
├── strategy/                        # Strategy workflows
│   ├── update-positioning.md        # /strategy update-positioning
│   └── synthesize-research.md       # /strategy synthesize-research
├── content/                         # Content workflows
│   ├── twitter-thread.md            # /content twitter-thread
│   ├── blog-post.md                 # /content blog-post
│   └── linkedin-post.md             # /content linkedin-post
└── changelog/                       # Change management
    └── update.md                    # /changelog update
```

**Pros:** Clear organization, scales well
**Cons:** Slightly longer command paths

#### 3. Workflow-Based Structure

Organize by complete workflows:

```
/.claude/commands/
├── orchestration/
│   ├── plan.md
│   └── implement.md
├── competitive-analysis/
│   ├── quick-audit.md
│   ├── landing-page.md
│   └── pricing-comparison.md
└── customer-research/
    ├── interview-analysis.md
    └── survey-synthesis.md
```

**Pros:** Groups related workflows together
**Cons:** Can create overlapping categories

### Best Practices for Command Organization

1. **Use consistent naming:** `kebab-case` for all command files
2. **Create README files:** Add a `README.md` in command folders explaining their purpose
3. **Document in CLAUDE.md:** List available commands in your CLAUDE.md file
4. **Version control:** Track commands in Git so teams stay in sync
5. **Add hints:** Always include clear `argument-hint` in frontmatter

---

## Commands vs Ad-Hoc Prompts: When to Use Each

Not every prompt needs to be a command. Here's when to use each:

### Use Ad-Hoc Prompts When:

- ✅ Exploring or experimenting with new ideas
- ✅ One-off questions or clarifications
- ✅ Rapidly iterating on a concept
- ✅ The task is unique and won't repeat

**Example:**
```
"What are the top 3 trends in AI marketing for 2025?"
```

This is exploratory—no need for a command.

### Use Commands When:

- ✅ You perform the same task repeatedly
- ✅ The workflow has multiple steps
- ✅ Your team needs to use the same process
- ✅ You want consistent outputs
- ✅ The prompt is complex enough to forget

**Example:**
```
/analyze-competitor-landing-page https://competitor.com
```

This is repeatable and valuable to standardize.

### The "Three Uses Rule"

**If you've done something manually three times, make it a command.**

This ensures you're not prematurely optimizing, but also not wasting time on repetitive tasks.

---

## Commands vs Skills: What's the Difference?

You've learned about **commands** in this class. In Classes 7-9, you'll learn about **skills**. Here's a preview of how they differ:

### Commands: Simple Triggers

- **What they are:** Markdown files with instructions for the AI
- **How they work:** Direct instructions executed by the AI
- **Complexity:** Simple to moderate workflows
- **Examples:** `/plan`, `/analyze-competitor`, `/create-content`

**Think of commands as:** Individual tools in your toolbox

### Skills: Packaged Workflows

- **What they are:** Complete workflow packages with reference materials
- **How they work:** Provide frameworks, patterns, and multi-phase orchestration
- **Complexity:** Complex, multi-step workflows with delegation
- **Examples:** `researching`, `synthesizing-strategy`, `agentic-orchestrating`

**Think of skills as:** Pre-built machines that use multiple tools in a specific sequence

### When to Use Each

| Scenario | Use Command | Use Skill |
|----------|-------------|-----------|
| Analyze a landing page | ✅ | |
| Generate a Twitter post | ✅ | |
| Orchestrate multi-phase research with sub-agents | | ✅ |
| Synthesize 10 research documents into strategy | | ✅ |
| Update a single file | ✅ | |
| Manage complex iterative workflows | | ✅ |

**Simple rule:** Commands for direct tasks, skills for complex workflows.

---

## Why This Matters for AMA

Commands are foundational to the AMA methodology because they solve several LLM limitations:

### 1. Context Segmentation

**Problem:** Each new chat starts fresh with no memory.

**Solution:** Commands encode your workflows in files. The AI reads the command file every time, ensuring consistency across sessions.

### 2. Reusability at Scale

**Problem:** Great prompts get lost in chat history.

**Solution:** Commands are version-controlled files your whole team can use.

### 3. Progressive Disclosure

**Problem:** Loading too much context overwhelms the LLM.

**Solution:** Commands load exactly what's needed, when needed. A command might reference a skill, which references specific documentation, creating efficient context usage.

### 4. Institutional Knowledge

**Problem:** Marketing processes live in people's heads.

**Solution:** Commands document your workflows as executable code, creating a living playbook.

### 5. Human-AI Orchestration

**Problem:** Complex marketing workflows require multiple steps and decisions.

**Solution:** Commands (like wrapper commands) orchestrate workflows by calling other commands, enabling sophisticated automation while keeping humans in the loop for approvals.

---

## Practical Examples: Marketing Workflows

Let's see commands in action for real marketing scenarios.

### Example 1: Content Workflow Command

**Scenario:** You regularly create Twitter threads from blog posts.

**Without a command:**
```
"Read the blog post at /brand/content/blog-posts/2025-11-08@10:00-ai-marketing-trends/CONTENT.md,
extract the key points, and structure them as a Twitter thread with 7-10 tweets.
Each tweet should be under 280 characters. Start with a hook tweet,
expand on key points in the middle tweets, and end with a CTA.
Use our brand voice from /brand/strategy/voice/twitter/EXTENSION.md."
```

**With a command:**
```
/content twitter-thread /brand/content/blog-posts/2025-11-08@10:00-ai-marketing-trends/CONTENT.md
```

**The command file** (`/.claude/commands/content/twitter-thread.md`):

```markdown
---
argument-hint: Path to source content (blog post, strategy doc, etc.)
---
# Twitter Thread Generator

## Purpose

Convert long-form content into an engaging Twitter thread following brand voice guidelines.

## Variables

SOURCE_CONTENT_PATH: $ARGUMENTS

## Instructions

1. **Load context:**
   - Read the source content at `SOURCE_CONTENT_PATH`
   - Load brand voice guidelines from `/brand/strategy/voice/twitter/EXTENSION.md`

2. **Extract key points:**
   - Identify the main argument or narrative
   - Extract 5-7 supporting points
   - Find memorable quotes or statistics

3. **Structure the thread:**
   - Tweet 1: Hook (problem or intriguing question)
   - Tweets 2-8: Expand on key points (one point per tweet)
   - Final tweet: CTA or summary with call-to-action

4. **Format requirements:**
   - Each tweet max 280 characters
   - Use line breaks for readability
   - Include relevant emojis if brand-appropriate
   - Maintain consistent voice and tone

5. **Output format:**
   ```
   ## Twitter Thread
   **Source:** [Source content path]
   **Generated:** [Date]

   🧵 Thread:

   1/ [Hook tweet]

   2/ [Point 1]

   3/ [Point 2]

   [etc.]
   ```

6. **Save output** to `/brand/content/twitter-posts/[DATE]@[TIME]-[slug]/CONTENT.md`

7. **Ask user** for feedback and iterate until approved
```

### Example 2: Research Synthesis Command

**Scenario:** After completing research, you need to update the research index.

**Command:** `/.claude/commands/research/update-index.md`

```markdown
---
argument-hint: Path to research execution folder
---
# Update Research Index

## Purpose

Compare new research execution findings with existing research index, identify contradictions/additions, and propose updates.

## Variables

EXECUTION_PATH: $ARGUMENTS

## Instructions

1. **Determine the research domain:**
   - Parse the `EXECUTION_PATH` to identify the domain
   - Example: `/brand/research/customer-insights/2025-11-08@14:30/` → domain is `customer-insights`

2. **Load both documents:**
   - Read execution: `EXECUTION_PATH/RESEARCH.md`
   - Read index: `/brand/research/[domain]/RESEARCH.md`

3. **Compare and analyze:**
   - Identify **new findings** not in the index
   - Identify **contradictions** between execution and index
   - Identify **validations** (execution confirms existing findings)
   - Identify **nuances** (execution adds depth to existing findings)

4. **Present findings to user:**
   ```
   ## Research Index Update Analysis

   ### New Findings
   - [Finding 1] - Found in [section] of execution

   ### Contradictions
   - [Current index says X] vs [New execution says Y]

   ### Validations
   - [Finding Z] confirmed with additional evidence

   ### Recommended Updates
   [Proposed changes to index with markdown references]
   ```

5. **Upon approval:**
   - Update the index file
   - Add entry to CHANGELOG.md
   - Present summary of changes
```

**Usage:**
```
/research update-index /brand/research/customer-insights/2025-11-08@14:30/
```

### Example 3: Quick Strategy Check Command

**Scenario:** Before creating content, verify it aligns with current strategy.

**Command:** `/.claude/commands/strategy/alignment-check.md`

```markdown
---
argument-hint: [content-type] [topic]
---
# Strategy Alignment Check

## Purpose

Quick check to ensure content idea aligns with current positioning, messaging, and voice strategy.

## Variables

CONTENT_TYPE: $1 (e.g., "blog-post", "twitter-thread", "linkedin-post")
TOPIC: $2

## Instructions

1. **Load strategy context:**
   - Read `/brand/strategy/positioning/STRATEGY.md`
   - Read `/brand/strategy/messaging/STRATEGY.md`
   - Read `/brand/strategy/voice/STRATEGY.md`
   - If `CONTENT_TYPE` has an extension, read that too
     (e.g., `/brand/strategy/voice/twitter/EXTENSION.md`)

2. **Evaluate alignment:**
   - Does `TOPIC` align with core positioning?
   - Does it support key messaging pillars?
   - Is it appropriate for the `CONTENT_TYPE` channel?

3. **Provide quick assessment:**
   ```
   ## Alignment Check: [TOPIC]
   **Content Type:** [CONTENT_TYPE]

   ✅ / ⚠️ / ❌ Positioning Alignment
   [Brief explanation]

   ✅ / ⚠️ / ❌ Messaging Alignment
   [Brief explanation]

   ✅ / ⚠️ / ❌ Channel Fit
   [Brief explanation]

   ### Recommendation
   [Go ahead / Adjust approach / Reconsider topic]

   ### Suggested Angles (if adjustments needed)
   - [Alternative angle 1]
   - [Alternative angle 2]
   ```

4. **If alignment is good:**
   - Offer to proceed with content creation
   - Suggest relevant strategy sections to reference
```

**Usage:**
```
/strategy alignment-check twitter-thread "5 ways AI is changing marketing"
```

---

## Common Pitfalls to Avoid

### 1. Over-Commanding

**Problem:** Creating commands for everything, including one-off tasks.

**Solution:** Use the "Three Uses Rule"—make it a command after the third time.

### 2. Vague Instructions

**Problem:** Command instructions are too general.

**Bad example:**
```markdown
## Instructions
Analyze the content and make it better.
```

**Good example:**
```markdown
## Instructions
1. Read the content at [path]
2. Check for:
   - Clarity (is the main point obvious?)
   - Evidence (are claims supported?)
   - Voice (does it match brand guidelines?)
3. Provide specific suggestions with before/after examples
```

### 3. Missing Argument Hints

**Problem:** Team members don't know what arguments to provide.

**Solution:** Always include clear `argument-hint` in frontmatter:

```markdown
---
argument-hint: [competitor-name] [optional - focus area]
---
```

### 4. Commands That Don't Reference Structure

**Problem:** Commands generate outputs in random locations.

**Solution:** Always specify output locations that follow AMA structure:

```markdown
5. **Save output** to `/brand/research/[domain]/data/[filename].md`
```

### 5. No User Interaction

**Problem:** Commands execute blindly without feedback loops.

**Solution:** Include checkpoints and approval steps:

```markdown
6. **Present findings to user** and ask:
   - Does this look accurate?
   - Should we proceed to update the index?
   - Any adjustments needed?
```

---

## Knowledge Checks

Test your understanding with these questions:

### Question 1: Command Basics

**Q:** What two components are required for every command file?

<details>
<summary>Answer</summary>

1. **Frontmatter** with `argument-hint`
2. **Instructions** section telling the AI what to do

</details>

### Question 2: Command Organization

**Q:** If you create a command file at `/.claude/commands/research/competitive/landing-page.md`, what slash command do you use to invoke it?

<details>
<summary>Answer</summary>

`/research competitive landing-page`

Subfolder structure creates command namespaces.

</details>

### Question 3: Arguments

**Q:** Given this command invocation:
```
/analyze-competitor notion "pricing and features"
```

How would you capture both arguments in your command file?

<details>
<summary>Answer</summary>

```markdown
## Variables
COMPETITOR_NAME: $1
FOCUS_AREA: $2
```

`$1` captures the first argument (`notion`)
`$2` captures the second argument (`"pricing and features"`)

</details>

### Question 4: Wrapper Commands

**Q:** What's the difference between a regular command and a wrapper command?

<details>
<summary>Answer</summary>

- **Regular command:** Contains direct instructions for the AI to execute
- **Wrapper command:** Constructs a task description and calls another command (like `/plan`) with that description

Wrappers are useful for creating domain-specific shortcuts that invoke general-purpose commands with perfect context.

</details>

### Question 5: When to Command

**Q:** Should you create a command for these scenarios? (Yes/No)

1. Analyzing competitor landing pages (you do this weekly)
2. Asking "What's the weather today?"
3. Creating Twitter threads from blog posts (you do this after every blog)
4. Exploring new content ideas in a brainstorm session

<details>
<summary>Answer</summary>

1. **Yes** - Repeated task, consistent structure needed
2. **No** - One-off question unrelated to marketing workflows
3. **Yes** - Repeated workflow that benefits from consistency
4. **No** - Exploratory work better done with ad-hoc prompts

</details>

---

## Hands-On Exercise: Create Your First Command

Let's put everything together by creating a complete command for a marketing workflow.

### Exercise: Customer Quote Extractor

**Scenario:** Your team conducts customer interviews. You need a command that extracts memorable quotes from interview transcripts for use in marketing materials.

### Step 1: Plan Your Command

Before writing, answer these questions:

1. **What will the command be called?** (filename)
2. **What arguments does it need?** (path to transcript file)
3. **What should it do?** (extract quotes, categorize them, format output)
4. **Where should output be saved?** (follow AMA structure)

### Step 2: Create the Command File

**Location:** `/.claude/commands/research/extract-quotes.md`

**Your task:** Write the complete command file following this structure:

```markdown
---
argument-hint: [Your hint here]
---
# [Command name]

## Purpose
[What this command does]

## Variables
[Define your argument variables]

## Instructions
[Step-by-step instructions for the AI]
```

### Step 3: Test Your Command

1. Create a sample interview transcript at:
   `/brand/research/customer-insights/data/interviews/test-interview.md`

2. Invoke your command:
   ```
   /research extract-quotes /brand/research/customer-insights/data/interviews/test-interview.md
   ```

3. Verify the output follows your instructions

### Example Solution

<details>
<summary>Click to see example solution</summary>

```markdown
---
argument-hint: Path to interview transcript file
---
# Extract Customer Quotes

## Purpose

Extract memorable, marketing-ready quotes from customer interview transcripts. Categorizes quotes by theme for easy discovery.

## Variables

TRANSCRIPT_PATH: $ARGUMENTS

## Instructions

1. **Read the transcript:**
   - Load the file at `TRANSCRIPT_PATH`
   - Identify the interviewee's name if available

2. **Extract quotes that are:**
   - Memorable and emotionally resonant
   - Clear and self-contained (make sense without context)
   - Relevant for marketing (paint points, outcomes, experiences)
   - Under 2 sentences long

3. **Categorize quotes by theme:**
   - Pain Points & Frustrations
   - Desired Outcomes & Goals
   - Emotional States
   - Product/Service Impact
   - Other Insights

4. **Format output:**
   ```
   ## Customer Quotes: [Interviewee Name]
   **Source:** [TRANSCRIPT_PATH]
   **Extracted:** [Date]

   ### Pain Points & Frustrations
   > "Quote here"
   — [Context if needed]

   > "Another quote"
   — [Context if needed]

   ### Desired Outcomes & Goals
   [etc.]
   ```

5. **Save output** to the same directory as the transcript with filename:
   `[original-filename]-quotes.md`

6. **Present output to user** and ask:
   - Are these the most impactful quotes?
   - Should any be categorized differently?
   - Should we add these to the research index?
```

</details>

---

## Summary & Key Takeaways

Congratulations! You've learned how commands serve as the fundamental human-AI interface in AMA.

### What You Learned

1. **Commands solve prompt fatigue** - Reusable, consistent, shareable workflows
2. **Command anatomy** - Frontmatter + Instructions in markdown files
3. **Arguments** - `$ARGUMENTS`, `$1`, `$2` for flexible inputs
4. **Wrapper commands** - Call other commands with pre-configured context
5. **Organization** - Domain-based structure for discoverability
6. **When to command** - The "Three Uses Rule" prevents over-optimization
7. **Commands vs Skills** - Simple triggers vs packaged workflows

### How This Builds on Previous Classes

- **Class 2 (File System):** Commands are files that reference other files
- **Class 3 (AMA Structure):** Commands follow and enforce AMA structure
- **Class 4 (Git):** Commands are version-controlled for team collaboration

### Connection to AMA Principles

Commands embody several AMA core principles:

- **Progressive Disclosure** - Commands load exactly what's needed
- **Reusability** - Write once, use everywhere
- **Verifiable** - Commands are files you can audit and improve
- **Temporal** - Version control tracks command evolution

---

## Next Steps: Preview of Class 6

In **Class 6: Agent Delegation & Sub-agents**, you'll learn:

- When to delegate tasks vs execute directly
- How sub-agents isolate context and specialize
- Creating custom sub-agents for your marketing domains
- The relationship between commands and delegation

**Why this matters:** Commands often delegate to specialized agents. Understanding delegation will unlock more sophisticated workflows.

---

## Additional Resources

### Recommended Reading

- [CLAUDE.md](/CLAUDE.md) - Section on "Agentic Framework" for command organization patterns
- [/.claude/commands/](/. claude/commands/) - Browse existing commands in your workspace
- Class 7 reference material (coming soon) for the deep dive on skills

### Practice Projects

1. **Create a command library:** Build 5 commands for your most common marketing tasks
2. **Organize your commands:** Restructure your `/.claude/commands/` folder by domain
3. **Write wrapper commands:** Create 2 wrapper commands that enhance `/plan` or other core commands
4. **Document your commands:** Add a README.md to each command subfolder explaining what's available

### Questions to Explore

- What marketing tasks do I repeat most often?
- Which prompts have I typed more than 3 times?
- How can I make my team's workflows more consistent?
- What wrapper commands would save my team the most time?

---

**You're now ready to create reusable workflows with commands. In Class 6, you'll learn how commands orchestrate work across specialized agents. See you there!**
