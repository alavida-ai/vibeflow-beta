# Class 6: Skills as Standard Operating Procedures

**Course:** AMA Fundamentals  
**Class Number:** 6 of 7  
**Estimated Time:** 60 minutes  
**Prerequisites:** Class 1 (MCP), Class 2 (IDE & Files), Class 3 (Commands), Class 4 (Sub-agents), Class 5 (AMA Architecture)  

---

## Class Overview

You've built an impressive system: MCP for external interactions, commands for your frequent workflows, sub-agents for specialization, and the AMA framework for organization. Your commands are working. Your agents are shipping. But now you're maintaining 400-line command files with duplicated methodology.

**Your most valuable workflows need more than step-by-step instructions.** Competitive analysis needs research frameworks. Strategy synthesis needs positioning models. Content creation needs framework examples. Commands lack the modularity to handle this—you're either cramming everything into massive prompts (hard to maintain) or scattering materials across random files (hard to find). Commands simply aren't structured enough to power complex workflows at scale.

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

**From Classes 3-5, you now have:**
- ✅ Commands that trigger specialized workflows
- ✅ Sub-agents that execute with fresh context
- ✅ AMA framework organizing your brand system

**Your commands have evolved into sophisticated workflows:**

```markdown
# /research:competitor-positioning command

1. Scrape competitor site with Firecrawl
2. Delegate to Analyst agent for positioning extraction
3. Load positioning framework from /brand/strategy/
4. Compare against framework dimensions
5. Identify differentiation gaps
6. Save to /brand/research/competitive-analysis/
```

**The problem:** Complex workflows need frameworks, methodology, examples, and templates. You can't fit all of this in a single command file. Even if you could, not all of it would be relevant to each task—you need progressive loading to keep context clean.

### What's Breaking

**Commands are becoming 400+ line files with everything crammed in:**

❌ **Hard to maintain** - Update methodology? Edit 5 different command files  
❌ **Hard to reuse** - Same frameworks copied across multiple commands  
❌ **Context inefficient** - Load all 400 lines even if you only need one section  
❌ **No discoverability** - Where do teammates learn "how we do competitive analysis"?  

---

## Part 2: The Problems

### Lack of Modularity

Commands were designed for direct execution. Complex workflows need frameworks, conditional logic, methodology, and reference materials. Single command files can't elegantly handle this—you're either duplicating methodology across commands or loading everything when you only need parts.

**Impact on design attributes:**
- **Maintainability:** Update methodology? Edit 5 files
- **Modularity:** Can't reuse frameworks without duplication
- **Context efficiency:** Load 400 lines when you need 80

---

## Part 3: Common Workarounds (And Why They Fail)

### Workaround 1: Embed Everything Into Large Commands

**The approach:** Put all methodology, frameworks, templates, and examples directly in the command file.

**Why this fails:**

❌ **Maintainability nightmare** - Update positioning framework? Edit 5 different command files
❌ **Context inefficient** - Agent loads all 340 lines even if it only needs one section
❌ **No modularity** - Can't reuse framework without copying entire command

---

### Workaround 2: Create Lean Commands for Every Variation

**The approach:** Keep context clean by creating a focused command for every task variation.

```
/.claude/commands/research/
├── competitor-positioning-saas.md
├── competitor-positioning-ecommerce.md
├── competitor-pricing-saas.md
├── competitor-messaging-saas.md
└── ... (50+ similar commands)
```

**Why this fails:**

❌ **Command explosion** - Hundreds of commands for slight variations  
❌ **Unmaintainable at scale** - Update research methodology? Edit 50+ command files  
❌ **No shared learning** - Each command isolated, can't leverage shared methodology  
❌ **Discovery nightmare** - Which of these 50 commands should I use?  

---

## Part 4: The Solution - Skills as Standard Operating Procedures

### What Are Skills?

**Skills are organized folders** that package complex workflows with supporting methodology, frameworks, and reference materials.

**Basic structure:**
```
/.claude/skills/
└── researching/
    ├── SKILL.md                   ← Entry point with description and how to use the skill
    ├── /references/               ← Methodology, frameworks
    ├── /scripts/                  ← Executable code
    └── /data/                     ← Templates, examples
```

**How it works:**
- Claude has all skill descriptions in context
- When you request research, Claude matches the skill and loads only what's needed
- Frameworks and methodology load progressively (not all at once)

**Key difference:**
- **Commands:** Single file (all content loaded)
- **Skills:** Folder structure (progressive disclosure)

---

### How Skills Solve the Problems

**Skills organize complexity into modular structure:**

```
Before: /.claude/commands/research/competitor-analysis.md (450 lines, everything in one file)
        positioning-framework.md, research-methodology-v2-final.md (scattered in root)

After:  /.claude/skills/researching/
        ├── SKILL.md (50 lines - entry point)
        ├── /references/
        │   ├── competitive-analysis.md (80 lines)
        │   ├── positioning-framework.md (60 lines)
        │   └── research-methodology.md (100 lines)
        └── /data/
            └── analysis-template.md (70 lines)

Result: Agent loads 130 lines (SKILL.md + competitive-analysis.md) not 450 lines
        Browse /.claude/skills/researching/ → discover all research methodology
        Update positioning-framework.md once → all commands use new version
```

✅ **Modular, discoverable, context-efficient**

---

### Skills vs Commands: The Simple Rule

| Aspect | Commands | Skills |
|--------|----------|--------|
| **Complexity** | Simple, direct tasks (1-3 steps) | Complex workflows needing methodology |
| **Structure** | Single markdown file | Organized folder with references |
| **Examples** | `/format-tweet [path]` | `researching`, `copy-writing` |
| **Context Loading** | All content loaded | Progressive disclosure (only what's needed) |
| **When to Use** | Direct execution, simple transforms | Workflows with frameworks, methodology, references |

**The rule:**
- **Command** = Direct, repeatable execution (format this, analyze that)
- **Skill** = Organized methodology package (here's how we do competitive research)

**Use a command when:**
- Task is straightforward (format, transform, analyze with clear steps)
- No supporting frameworks or methodology needed
- Steps are clear and don't require conditional logic
- As a shortcut to invoke a skill

**Use a skill when:**
- Workflow requires frameworks or methodology
- Supporting reference materials needed (examples, templates)
- Same methodology used across multiple workflows
- Complex, multi-phase work with conditional paths

---

## Part 5: What Changed

| Design Attribute | Before Skills | With Skills |
|-----------------|---------------|-------------|
| Maintainability | ⚠️ Declining (duplication) | ✅ **Improved** (update once) |
| Modularity | ❌ Low | ✅ **NEW - Solved** (reusable frameworks) |
| Context Efficiency | ⚠️ Load everything | ✅ **Improved** (progressive disclosure) |

**Core improvement:** Complex workflows are now modular, organized packages—not scattered, duplicated command files.

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
- **Maintainability** - Related skills/workflows organised in folders
- **Context efficiency** - Load what's needed not everything

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

**Key pattern:** Complex workflow with methodology that will be used frequently? Package it as a skill.

**Next class:** Orchestration patterns for managing multi-phase workflows

---

**Remember:** Progressive disclosure - only read what you need for your current task to keep context window clean and focused
