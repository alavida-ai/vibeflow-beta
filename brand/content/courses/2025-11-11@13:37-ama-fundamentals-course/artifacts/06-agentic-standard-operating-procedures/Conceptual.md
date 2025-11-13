# Class 6: Skills as Standard Operating Procedures

**Course:** AMA Fundamentals
**Class Number:** 6 of 7
**Estimated Time:** 60 minutes
**Prerequisites:** Class 1 (MCP), Class 2 (IDE & Files), Class 3 (Commands), Class 4 (Sub-agents), Class 5 (AMA Architecture)

---

## Class Overview

You've built an impressive system: MCP for data, commands for workflows, sub-agents for specialization, and the AMA framework for organization. Your commands are working. Your agents are shipping. But now you're maintaining 400-line command files with duplicated methodology.

**Your most valuable workflows need more than step-by-step instructions.** Competitive analysis needs research frameworks. Strategy synthesis needs positioning models. Content creation needs brand examples. You're either cramming everything into massive command prompts (hard to maintain) or scattering reference materials across random files (hard to find).

**This class introduces skills—organized folders that package complex workflows with methodology, frameworks, and reference materials that agents load progressively.**

### Learning Objectives

By the end of this class, you will:

1. **Identify the problems:** Why complex workflows break the command pattern: massive files, duplicated methodology, scattered resources
2. **Understand the solution:**
    - How skills organize methodology into discoverable folder structures
    - How progressive disclosure loads only what's needed, when needed
    - When to use skills vs commands
3. **Recognize the improvement:**
    - Maintainable (update methodology once, not in 5 command files)
    - Modular (reusable frameworks across workflows)
    - Discoverable (browse `/.claude/skills/` to find methodologies)

---

## Part 1: Where You Are Right Now

### The Command + Agent Powered System

**From Classes 3-5, you now have:**
- ✅ Commands that trigger specialized workflows
- ✅ Sub-agents that execute work with fresh context
- ✅ AMA framework organizing your brand system
- ✅ Progressive disclosure patterns (load what's needed, when needed)

**This is powerful.** You're leveraging multi-agent coordination with structured file organization.

### Complex Workflows You've Built

Your commands have evolved beyond simple shortcuts. A typical command now orchestrates sophisticated work:

```markdown
# /research:competitor-positioning command

1. Use Firecrawl to scrape competitor site
2. Delegate to Analyst agent to extract positioning
3. Load our positioning framework from /brand/strategy/positioning/STRATEGY.md
4. Compare their approach against framework dimensions
5. Identify differentiation gaps
6. Save analysis to /brand/research/competitive-analysis/
```

**But you've noticed something:**

Some workflows need more than step-by-step instructions. They need:
- **Frameworks** (How do we evaluate positioning? What dimensions matter?)
- **Methodology** (What's our research approach? How thorough should analysis be?)
- **Examples** (What does good analysis look like? What patterns should we spot?)
- **Templates** (How should output be structured?)

**You can't fit all of this in a single command file without it becoming unwieldy.**

### What's Breaking

**Problem: Commands are becoming too large and complex.**

```markdown
# /.claude/commands/research/analyze-competitor-positioning.md

[200 lines of instructions]
[50 lines of framework definition]
[100 lines of methodology explanation]
[80 lines of examples]
[50 lines of output template]

Total: 480 lines in one file
```

**What's wrong with this:**

❌ **Hard to maintain** - Updating methodology means editing massive command files
❌ **Hard to navigate** - Finding specific framework details buried in 500-line files
❌ **Hard to reuse** - Same frameworks copied across multiple commands
❌ **Context inefficient** - Loading entire methodology when you only need part of it

**You've also noticed:**
- Similar methodologies duplicated across commands (positioning framework appears in 5 different commands)
- Reference materials (examples, templates) scattered in root folder or pasted into command files
- No clear place for teammates to learn "how we do competitive analysis"

---

## Part 2: The Problems (And How They Affect Design Attributes)

### Problem 1: Complex Workflows Not Properly Represented Through Commands

**What's happening:**

Commands were designed for **direct execution** - clear, step-by-step instructions. But complex marketing workflows need:

- **Conditional logic** - "If positioning is differentiated, analyze messaging. If commoditized, analyze pricing."
- **Frameworks** - Structured models for evaluation (e.g., Jobs-to-be-Done, Blue Ocean Strategy)
- **Methodology** - Research approaches, analysis patterns, synthesis techniques
- **Reference materials** - Examples, templates, datasets

**Single command files can't elegantly handle this complexity.**

**Example breakdown:**
```
Command 1: /research:competitive-analysis [competitor]
→ Needs: Research methodology, competitive analysis framework, output template
→ File size: 400+ lines

Command 2: /research:customer-insights [segment]
→ Needs: Research methodology (SAME as above), Jobs-to-be-Done framework, interview guide
→ File size: 350+ lines

Problem: Research methodology duplicated across both commands
```

**Why this matters:** You're duplicating methodology, making updates painful, and creating maintenance debt.

---

### Problem 2: Resources Hard to Reference

**What's happening:**

You have valuable reference materials—examples of great positioning analyses, templates for research reports, frameworks for evaluating messaging—but no organized place to put them.

**Current approaches:**
```
Option 1: Paste into command files
❌ Makes commands massive (500+ lines)
❌ Duplicated across multiple commands
❌ Hard to update (edit in 5 places)

Option 2: Save as scattered files in root folder
❌ /positioning-framework.md, /research-methodology-v2-final.md
❌ No discoverability (teammates don't know these exist)
❌ No clear organization (which framework for which task?)

Option 3: Reference external links in commands
❌ Load full file every time (context inefficient)
❌ No progressive disclosure (all or nothing)
```

**Why this matters:** Your most valuable marketing IP (frameworks, methodologies, examples) has no proper home. It's either duplicated, scattered, or hidden.

---

## Part 3: The Common Workaround (And Why It Creates Problems)

### Workaround: Embedding Everything Into Large Command Prompts

**What people do:**

When a command needs methodology and frameworks, just... put it all in the command file.

```markdown
# /.claude/commands/research/competitive-analysis.md

---
argument-hint: Competitor URL to analyze
---

# Competitive Analysis Command

## Research Methodology
[100 lines explaining research approach]

## Positioning Framework
[80 lines defining framework dimensions]

## Analysis Templates
[70 lines of structured templates]

## Example Analysis
[90 lines of sample output]

## Execution Steps
1. Scrape competitor site
2. Extract positioning using framework above
3. Analyze using methodology above
4. Structure output using template above
5. Save to /brand/research/competitive-analysis/
```

**Why this creates problems:**

❌ **Maintainability nightmare** - Update framework? Edit 5 different command files
❌ **Context inefficient** - Agent loads all 340 lines even if it only needs the framework section
❌ **No modularity** - Can't reuse framework without copying entire command
❌ **Hard to discover** - Teammate wants positioning framework? Good luck finding which command has it

**The cost:**
```
Without modular organization:
- 5 commands with duplicated 100-line methodology = 500 lines of duplication
- Want to update methodology? Edit 5 files (easy to miss one, create inconsistency)
- New hire wants to learn your research approach? Read through 5 massive command files

With modular organization (skills):
- 1 shared methodology file = 100 lines, referenced by 5 commands
- Update methodology? Edit 1 file, all commands use updated version
- New hire wants to learn? Browse /.claude/skills/researching/references/
```

**You've traded command simplicity for unmaintainable complexity.**

---

## Part 4: The Solution - Skills as Standard Operating Procedures

### What Are Skills?

**Skills are organized folders** that package complex workflows with supporting methodology, frameworks, and reference materials.

Where commands are **single files with direct instructions**, skills are **organized collections** that agents load progressively.

**The structure:**
```
/.claude/skills/
└── researching/                   ← Your research SOP
    ├── SKILL.md                   ← Entry point: when to use, what's available
    ├── /references/               ← Methodology, frameworks (loaded as needed)
    │   ├── competitive-analysis.md
    │   ├── customer-insights.md
    │   └── synthesis-patterns.md
    ├── /data/                     ← Templates, examples, datasets
    │   ├── analysis-template.md
    │   └── example-research.md
    └── /workflows/                ← Step-by-step workflows (optional)
        └── competitive-research/WORKFLOW.md
```

**How it works:**
1. Claude has all skill **descriptions** in context (from SKILL.md frontmatter)
2. When you ask for competitive analysis, Claude matches the `researching` skill
3. Claude loads `SKILL.md` to understand what's available
4. Claude progressively loads only the reference files needed (e.g., `competitive-analysis.md`)
5. Claude follows methodology and produces structured research

**The key difference:**
- **Commands:** All content in one file (loaded entirely)
- **Skills:** Organized folder structure (loaded progressively, as needed)

---

### How Skills Solve the Problems

**Problem 1: Complex Workflows Not Properly Represented**

Skills organize complexity into logical structure:

```
Before (command):
/.claude/commands/research/competitor-analysis.md (450 lines, everything)

After (skill):
/.claude/skills/researching/
├── SKILL.md (50 lines - entry point)
├── /references/
│   ├── competitive-analysis.md (80 lines - framework)
│   └── research-methodology.md (100 lines - approach)
└── /data/
    └── analysis-template.md (70 lines - output structure)

Result:
- Same content, better organization
- Agent loads SKILL.md + competitive-analysis.md = 130 lines (not 450)
- Other references loaded only if needed
```

✅ **Complexity properly organized, progressively disclosed**

---

**Problem 2: Resources Hard to Reference**

Skills provide a discoverable home for reference materials:

```
Before:
- positioning-framework.md (root folder)
- research-methodology-v2-final.md (root folder)
- example-analysis-good.md (root folder)
→ No one knows these exist

After:
/.claude/skills/researching/references/
├── competitive-analysis.md      ← Competitive framework
├── positioning-framework.md     ← Positioning framework
└── research-methodology.md      ← Research approach

/.claude/skills/researching/data/
└── examples/
    └── strong-competitive-analysis.md

Result:
- Teammate types /researching → sees skill
- Teammate browses /.claude/skills/researching/references/ → finds frameworks
- Frameworks referenced by multiple commands (no duplication)
```

✅ **Organized, discoverable, reusable reference library**

---

### Skills Enable Progressive Disclosure at Scale

Remember from Class 5 (AMA Architecture): **progressive disclosure** is loading exactly what's needed, when it's needed.

Skills take this principle to the next level:

**Example: Competitive Analysis Workflow**

```
You: "Analyze competitor X's positioning"

Agent decision tree:
1. Matches `researching` skill (description says "competitive analysis")
2. Loads SKILL.md (50 lines) - "I see competitive-analysis.md is available"
3. Loads /references/competitive-analysis.md (80 lines) - "Here's the framework"
4. Executes research following framework
5. (If needed) Loads /data/analysis-template.md (70 lines) - "Here's output structure"

Total loaded: 50 + 80 + 70 = 200 lines (only what's needed)
Available but NOT loaded: research-methodology.md, customer-insights.md, synthesis-patterns.md
```

**Compare to command approach:**
```
Command file contains all references = 450 lines loaded every time
Even if agent only needs competitive framework (80 lines worth of content)
```

✅ **Context efficiency: Load 200 lines instead of 450 lines**

---

### Real Example: The `researching` Skill

**Structure:**
```
/.claude/skills/researching/
├── SKILL.md                              ← Entry point
├── /references/
│   ├── competitive-analysis.md           ← How to analyze competitors
│   ├── customer-insights.md              ← How to research customers
│   └── synthesis.md                      ← How to synthesize findings
└── /data/
    ├── competitive-analysis-template.md  ← Output structure
    └── examples/
        └── strong-analysis-example.md    ← Reference example
```

**SKILL.md frontmatter:**
```yaml
---
name: researching
description: Conducts objective research using proven methodologies.
Use for competitive analysis, customer insights, market research.
Available references: competitive-analysis, customer-insights, synthesis.
---
```

**How commands use this skill:**
```markdown
# /.claude/commands/research/competitor.md

Invoke the researching skill.
Use the competitive-analysis reference.
Analyze [competitor URL].
Save to /brand/research/competitive-analysis/{timestamp}/
```

**Result:**
- Command is 5 lines (not 450)
- Methodology lives in skill (maintained once, used everywhere)
- Agent loads only competitive-analysis.md reference (not entire skill)

---

### Skills vs Commands: The Simple Rule

| Aspect | Commands | Skills |
|--------|----------|--------|
| **Complexity** | Simple, direct tasks (1-3 steps) | Complex workflows needing methodology |
| **Structure** | Single markdown file | Organized folder with references |
| **Examples** | `/format-tweet [path]` | `researching`, `synthesizing-strategy` |
| **Context Loading** | All content loaded | Progressive disclosure (only what's needed) |
| **When to Use** | Direct execution, simple transforms | Workflows with frameworks, methodology, references |

**The rule:**
- **Command** = Direct, repeatable execution (format this, analyze that)
- **Skill** = Organized methodology package (here's how we do competitive research)

**Use a command when:**
- Task is straightforward (format, transform, analyze with clear steps)
- No supporting frameworks or methodology needed
- Steps are clear and don't require conditional logic

**Use a skill when:**
- Workflow requires frameworks or methodology
- Supporting reference materials needed (examples, templates)
- Same methodology used across multiple workflows
- Complex, multi-phase work with conditional paths

---

### How Commands and Skills Work Together

Commands **trigger** skills as entry points:

**Pattern:**
```
You: /research:competitor [URL]

Command executes:
1. Invokes `researching` skill
2. Specifies: use competitive-analysis reference
3. Provides: competitor URL, save location

Skill loads progressively:
- SKILL.md (what's available?)
- /references/competitive-analysis.md (framework)
- /data/analysis-template.md (if needed for output structure)

Research completes following skill methodology
```

**Result:** Type a slash command → Complex workflow with full methodology → Output structured properly

---

## Part 5: What Changed

Skills solve two new problems while maintaining what you already gained:

| Design Attribute | Class 5 End | Class 6 with Skills |
|-----------------|-------------|----------------------|
| Groundedness | ✅ High | ✅ Stays high |
| Friction | ✅ Low | ✅ Stays low |
| Scalability | ✅ High | ✅ Stays high |
| Navigability | ✅ High | ✅ **Enhanced** (frameworks discoverable) |
| Maintainability | ⚠️ Declining (command duplication) | ✅ **Improved** (methodology maintained once) |
| Modularity | ❌ Low | ✅ **NEW - Solved** (reusable frameworks) |
| Powerful | ✅ High | ✅ **Even higher** (complex workflows with methodology) |

**Core improvement:** Complex workflows are now organized packages with reusable methodology, not scattered duplicated files.

---

## Part 6: Where You Are Now

**The shift:**
```
Before: Massive command files with duplicated methodology
After:  Organized skill folders with progressive disclosure
```

Your complex workflows now have:
- **Organization** - Logical folder structure (references, data, workflows)
- **Modularity** - Frameworks used across multiple commands (no duplication)
- **Discoverability** - Browse `/.claude/skills/` to see available methodologies
- **Maintainability** - Update framework once, all commands use new version
- **Context efficiency** - Load 130 lines (what's needed) not 450 lines (everything)

**Your marketing playbook is now code:**
```
/.claude/skills/
├── researching/           # How we do research
├── synthesizing-strategy/ # How we create strategy
└── creating-content/      # How we produce content
```

**But you still have:**
- ❌ Manual coordination of complex multi-phase workflows
- ❌ Ad-hoc patterns for planning and tracking work
- ❌ Inconsistent execution folder structures

**Next:** Class 7 introduces orchestration patterns for managing complex workflows systematically.

---

## Summary

**What you learned:**
- **Commands vs Skills** - Direct execution vs organized methodology packages
- **Progressive disclosure at scale** - Load only the references you need, when you need them
- **SOPs as code** - Your marketing playbook lives in discoverable, version-controlled skill folders
- **Modularity** - Maintain frameworks once, use everywhere

**Key pattern:** Complex workflow with methodology? Package it as a skill.

**Next class:** Orchestration patterns for managing multi-phase workflows

---

## Navigating Skills in Your Workspace

**Discover available skills:**
```bash
ls .claude/skills/
# Shows: researching/, synthesizing-strategy/, creating-content/, etc.
```

**Read skill entry point:**
```
.claude/skills/researching/SKILL.md
# Tells you: What this skill does, when to use it, what references are available
```

**Explore references when needed:**
```
.claude/skills/researching/references/
├── competitive-analysis.md    # Framework for competitor research
├── customer-insights.md       # Framework for customer research
└── synthesis.md               # How to synthesize findings
```

**Remember:** Progressive disclosure - only read what you need for your current task.
