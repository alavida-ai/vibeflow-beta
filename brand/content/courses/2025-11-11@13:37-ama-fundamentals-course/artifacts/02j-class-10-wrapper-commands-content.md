# Wrapper Commands Content (Extracted from Class 5)

This content will be integrated into Class 9: Wrapper Commands & Advanced Command Patterns

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
