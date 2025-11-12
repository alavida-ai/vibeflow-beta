# Class 7: Claude Code Skills

**Course:** AMA Fundamentals
**Class Number:** 7 of 9
**Estimated Time:** 30 minutes
**Prerequisites:** Class 1 (LLM Fundamentals), Class 5 (Commands)

---

## Class Overview

In Class 5, you learned **commands are short, snappy, powerful prompts** stored in files.

Now you'll learn about **skills** - organized collections of prompts and reference materials that agents can progressively load to complete complex tasks. Where commands trigger single workflows, skills package entire methodologies that agents access piece-by-piece.

**The distinction:**
- **Commands:** Short, direct execution (single prompt file)
- **Skills:** Complex workflows (organized folder with methodology, frameworks, templates)

**Why skills matter:** Powerful, repeatable, maintainable, and context-efficient. Load only what you need, when you need it.

### Learning Objectives

By the end of this class, you'll understand:
- What skills are and how they solve the context problem through progressive disclosure
- How skills package marketing workflows into organized folders
- When to use skills vs commands
- How to navigate existing skills in your workspace

---

## What Are Skills? (See One in Action First)

Let's start with a real example before diving into theory.

**You ask:** "Analyze competitor X's positioning and messaging strategy."

**What happens behind the scenes:**
1. Claude sees "competitor" + "positioning" keywords
2. Matches the `researching` skill description (always in context)
3. Loads `SKILL.md` file → identifies competitive analysis workflow needed
4. Loads `/references/competitive-analysis.md` (only this specific reference)
5. Follows the methodology and produces structured research

**Without the skill:** You'd paste methodology every time or get generic AI analysis.

**With the skill:** Methodology is packaged, reusable, consistently applied.

**Now let's unpack the structure.**

---

## Skills Structure: Organized Folders for Complex Workflows

**Skills are organized folders** in `/.claude/skills/` that package complete marketing workflows with supporting materials.

Remember from Class 1: LLMs have limited context windows. Skills solve this through **progressive disclosure** - loading exactly what's needed, when it's needed.

### Basic Structure

```
/.claude/skills/
└── {skill-name}/
    ├── SKILL.md                          ← Contains frontmatter + instructions
    ├── /workflows/{name}/WORKFLOW.md     ← Step by step workflows
    ├── /references/                      ← Supporting context (frameworks, methodologies, guides)
    ├── /data/                            ← Templates, examples, datasets
    └── /scripts/                         ← Executable code (optional)
```

**SKILL.md frontmatter** (required):
```yaml
---
name: skill-name
description: What this skill does and when Claude should use it (max 1024 chars)
allowed-tools: Read, Grep, Glob  # Optional: restrict tools when skill is active
---
```

**How skill discovery works:**
- Claude has all skill **descriptions** in its context (like MCP tool descriptions)
- When you make a request, Claude autonomously decides which skill matches based on the description
- Only THEN does Claude load the full SKILL.md file and supporting materials (progressive disclosure)

**Think of it this way:**
- Skill **description** = Always in Claude's context (helps Claude decide when to use it)
- `SKILL.md` file = Loaded only when skill is invoked (progressive disclosure)
- `/references/` = Loaded only when specific context is needed (progressive disclosure)

---

## Why This Matters: Your Marketing Playbook as Code

**Without skills:** Marketing expertise scattered (people's heads, old docs, Slack threads). No single source of truth.

**With skills:** Your playbook becomes organized, discoverable, version-controlled code in `/.claude/skills/`:

```
/.claude/skills/
├── researching/              # Research workflows + methodologies
├── synthesizing-strategy/    # Strategy frameworks + patterns
└── creating-content/         # Content templates + guidelines
```

**The benefit:** One place to browse workflows. Everyone uses the same methodology. New hires explore folders to learn "how we do things."

---

## Skills vs Commands: When to Use Each

You learned about commands in Class 5. Here's the quick comparison:

| Aspect | Commands | Skills |
|--------|----------|--------|
| Complexity | Simple, direct tasks (1-2 steps) | Complex, multi-phase workflows (3+ steps) |
| Structure | Markdown file with instructions | Package with references, workflows, patterns |
| Examples | `/format-tweet [path]` | `researching`, `synthesizing-strategy` |
| When to Use | Direct, repeatable prompts | Workflows needing methodology/frameworks |

### The Simple Rule

**Command** = Quick trigger for simple tasks  
**Skill** = Organized package for complex workflows

**Use a command when:** Simple formatting, quick transformations, straightforward execution

**Use a skill when:** Competitive research (needs methodology), strategy synthesis (needs frameworks), multi-step workflows (needs orchestration)

### How Commands and Skills Work Together

Commands can **trigger skills** as entry points:

**Example:** `/research:domain customer-insights`
1. Command executes
2. Command invokes the `researching` skill
3. Skill loads methodology progressively
4. Research completes following skill patterns

**Result:** Type a slash command, get complex workflow execution with full methodology.

---

## Navigating Skills in Your Workspace

**Discover available skills:**
```bash
ls .claude/skills/
# Shows: researching/, synthesizing-strategy/, creating-content/, etc.
```

**Read the skill entry point:**
```
.claude/skills/researching/SKILL.md  # What it does, when to use it, available references
```

**Explore references when needed:**
```
.claude/skills/researching/references/
├── competitive-analysis.md
├── customer-insights.md
└── synthesis.md
```

**Remember:** Progressive disclosure - only read what you need for your current task.

---

## When NOT to Use Skills

Don't over-engineer. Skills are powerful but not always necessary.

### Skip Skills For:
- ✅ Simple one-off questions ("What's AI marketing?")
- ✅ Quick formatting tasks ("/format-tweet [path]")
- ✅ Exploratory work where you're still figuring out the process
- ✅ Tasks you'll only do once

### Use Skills For:
- ✅ Workflows you repeat regularly
- ✅ Complex processes with multiple steps
- ✅ Work requiring methodology or frameworks

**The "Three Uses Rule" from Class 5 applies to skills too:**
If you've done a complex workflow 3+ times, package it as a skill.

---

## Summary & Key Takeaways

**What you learned:**

1. **Commands vs Skills** - Short prompts vs organized methodology packages
2. **Progressive disclosure** - Load exactly what's needed, when it's needed
3. **Marketing playbook as code** - Discoverable, reusable, version-controlled workflows
4. **When to use each** - Commands for simple tasks, skills for complex workflows

**The pattern:**
```
SKILL.md (entry point) → /references/methodology.md (loaded as needed) → /data/templates.md (loaded when creating output)
```

**Bottom line:** Skills let you access deep marketing expertise without context overflow.

---

## Next Steps

There's one skill that's different from the rest: **`agentic-orchestrating`**. It teaches AI agents how to manage complex, multi-step workflows systematically (PLAN.md, TODO.md, delegation patterns, artifact organization).

### In Class 8: Agent Orchestration Fundamentals

You'll learn the `agentic-orchestrating` skill in depth:
- How to create PLAN.md for complex work
- How to track progress with TODO.md
- When orchestration is needed vs overkill
- How to structure execution folders

### In Class 9: Advanced Orchestration Patterns

You'll master advanced workflow patterns:
- Multi-phase workflows
- Dynamic task generation
- Feedback loops and validation
- Custom orchestration for your needs

---

## Additional Resources

**Claude Code Documentation:**
- [Skills Overview](https://code.claude.com/docs/en/skills) - Official documentation
- [Creating Skills](https://code.claude.com/docs/en/skills#creating-skills) - How to build your own

**In Your Workspace:**
- Browse: `/.claude/skills/` - Explore available skills
- Read: `/.claude/skills/agentic-orchestrating/SKILL.md` - Core orchestration skill
