# Plan: Refactor CLAUDE.md to Heuristic-Driven Guide

## Objective

Transform CLAUDE.md from an exhaustive 828-line specification into a concise, heuristic-driven architectural guide that:
- Provides decision-making frameworks rather than exhaustive templates
- References specialized skills/patterns rather than duplicating them
- Uses representative examples rather than comprehensive catalogs
- Reduces token overhead while maintaining clarity

## Current State Analysis

**Current CLAUDE.md (828 lines, ~6k tokens):**
- Complete directory structure (detailed tree diagrams)
- Extensive template examples (STRATEGY.md, RESEARCH.md, SKILL.md full templates)
- Duplicate execution folder patterns (overlaps with orchestration skill)
- Exhaustive file path examples (50+ path examples)
- Verbose explanations with high repetition

**Token breakdown:**
- Directory structures & templates: ~2k tokens
- Progressive disclosure templates: ~1.5k tokens
- Temporal/Three-Folder patterns: ~1k tokens (overlaps with orchestration)
- File path examples: ~800 tokens
- Quick reference: ~700 tokens

## Approach

### Refactoring Strategy

**Shift from "Specification" to "Guide":**

1. **Replace exhaustive templates with heuristics**
   - "Entry points use UPPERCASE.md (STRATEGY.md, RESEARCH.md, PLAN.md)"
   - "Organize by concern, navigate by entry point, reference by path"

2. **Reference skills instead of duplicating**
   - "Workflow executions follow orchestration skill patterns"
   - Link to orchestration for PLAN.md/TODO.md details

3. **Use representative examples, not catalogs**
   - Show 2-3 examples per pattern, not 10+
   - Focus on "why" over "what"

4. **Consolidate redundant sections**
   - Merge "Complete Directory Structure" with "Directory Purposes"
   - Combine "File Path Examples" with pattern sections

### Target Structure (450-500 lines, ~3k tokens)

```markdown
# Agent File Structure Guide

## Purpose & Scope
[Concise mission statement]

## Core Principles
[3-5 architectural heuristics that govern all decisions]

## Workspace Architecture
[Condensed structure with inline purpose annotations]

## Organizational Patterns

### 1. Progressive Disclosure
[Concept + 1 example + reference to full templates]

### 2. Temporal Research
[Concept + why dates matter + reference to orchestration]

### 3. Separation of Concerns
[The /strategy/ vs /research/ vs /.claude/ distinction]

### 4. Audit Trails
[Evidence chains concept + footnote format]

## Navigation Heuristics
[How to find what you need - decision tree style]

## Naming Conventions
[Rules + representative examples]

## Quick Reference
[Essential lookup tables only]
```

## Step by Step Tasks

### 1. Extract Core Principles

**Agent:** general-purpose
**Instructions:** Analyze current CLAUDE.md and extract 4-5 core architectural principles that govern all file structure decisions. These should be heuristics that enable decision-making rather than prescriptive rules.

**Input:**
- Current CLAUDE.md

**Output:** `artifacts/01-core-principles.md`

**Details:**
Extract principles like:
- "Organize by concern (strategy/research/config), navigate by entry point (UPPERCASE.md), reference by path"
- "Temporal elements get date-stamped folders (YYYY-MM-DD), timeless elements use version control"
- "Progressive disclosure: pass paths not content, load context when needed"

---

### 2. Create Condensed Architecture Section

**Agent:** general-purpose
**Instructions:** Create a concise workspace architecture section that shows the structure with inline annotations. Replace the verbose "Directory Purposes" explanations with brief inline comments.

**Input:**
- artifacts/01-core-principles.md
- Current CLAUDE.md sections: "Complete Directory Structure" and "Directory Purposes"

**Output:** `artifacts/02-condensed-architecture.md`

**Details:**
Transform from:
- 60 lines of directory tree + 150 lines of prose explanations
To:
- 40 lines with smart annotations that convey purpose inline

Example style:
```
├── /strategy/           ← Polished brand bible (timeless, footnoted to research)
├── /research/{domain}/  ← Temporal investigations (date-stamped runs)
│   ├── /{YYYY-MM-DD}/   ← Orchestration pattern (see orchestration skill)
```

---

### 3a. Refactor Progressive Disclosure Pattern

**Agent:** general-purpose
**Instructions:** Condense the Progressive Disclosure Pattern section to focus on the concept and decision-making heuristic. Replace full template examples with structure sketches and references.

**Input:**
- artifacts/01-core-principles.md
- Current CLAUDE.md section: "Progressive Disclosure Pattern"

**Output:** `artifacts/03a-progressive-disclosure-concise.md`

**Details:**
Reduce from ~150 lines to ~40 lines:
- Core concept (what and why)
- Entry point heuristic (when to use UPPERCASE.md)
- Structure sketch for STRATEGY.md, RESEARCH.md (not full templates)
- Reference to orchestration skill for PLAN.md/TODO.md

---

### 3b. Refactor Temporal & Three-Folder Patterns

**Agent:** general-purpose
**Instructions:** Condense Temporal Research Pattern and Three-Folder Pattern sections. Remove overlap with orchestration skill. Focus on "why dates" and "input→process→output" concepts.

**Input:**
- artifacts/01-core-principles.md
- Current CLAUDE.md sections: "Temporal Research Pattern" and "Three-Folder Pattern"

**Output:** `artifacts/03b-patterns-concise.md`

**Details:**
Reduce from ~120 lines to ~50 lines:
- Why temporal matters (2-3 bullet points)
- Three-folder concept (diagram + brief purpose)
- Reference orchestration skill for execution folder details
- Remove redundant examples

---

### 4. Create Navigation Heuristics Section

**Agent:** general-purpose
**Instructions:** Create a new "Navigation Heuristics" section that provides decision-tree style guidance for finding information in the workspace.

**Input:**
- artifacts/01-core-principles.md
- artifacts/02-condensed-architecture.md

**Output:** `artifacts/04-navigation-heuristics.md`

**Details:**
Create decision flows like:
- "Need brand strategy? → Start at `/strategy/STRATEGY.md`"
- "Need research findings? → Check `/research/{domain}/RESEARCH.md` → Latest run"
- "Running a workflow? → See orchestration skill"
- "Need to reference research? → Use footnote format: `[^ref]: /path/to/file.md:line`"

This replaces verbose "How It Works" sections with actionable guidance.

---

### 5. Consolidate Examples and Reference

**Agent:** general-purpose
**Instructions:** Create condensed naming conventions and quick reference sections. Use representative examples (2-3 per pattern) instead of exhaustive catalogs.

**Input:**
- Current CLAUDE.md sections: "File Naming Conventions", "File Path Examples", "Quick Reference"

**Output:** `artifacts/05-examples-and-reference.md`

**Details:**
Reduce from ~180 lines to ~60 lines:
- Naming rules (kebab-case, UPPERCASE.md, YYYY-MM-DD) with 2 examples each
- Essential lookup tables only (Directory Lookup, Entry Point Files)
- Remove exhaustive path catalogs

---

### 6. Synthesize Refactored CLAUDE.md

**Agent:** general-purpose
**Instructions:** Synthesize all artifacts into a cohesive, refactored CLAUDE.md. Ensure narrative flow, remove redundancy, and maintain essential technical accuracy.

**Input:**
- artifacts/01-core-principles.md
- artifacts/02-condensed-architecture.md
- artifacts/03a-progressive-disclosure-concise.md
- artifacts/03b-patterns-concise.md
- artifacts/04-navigation-heuristics.md
- artifacts/05-examples-and-reference.md

**Output:** `artifacts/06-refactored-CLAUDE.md`

**Details:**
Assemble into final structure:
1. Purpose & Scope (brief)
2. Core Principles (from artifact 01)
3. Workspace Architecture (from artifact 02)
4. Organizational Patterns (from artifacts 03a, 03b)
5. Audit Trail Pattern (keep concise from current)
6. Navigation Heuristics (from artifact 04)
7. Naming Conventions & Quick Reference (from artifact 05)

Target: 450-500 lines, ~3k tokens

---

### 7. Create Migration Notes

**Agent:** general-purpose
**Instructions:** Document what was removed, what was consolidated, and where users can find detailed information that was previously in CLAUDE.md.

**Input:**
- Current CLAUDE.md
- artifacts/06-refactored-CLAUDE.md

**Output:** `artifacts/07-migration-notes.md`

**Details:**
Create a reference document showing:
- What was removed and why
- Where to find detailed templates (orchestration skill, etc.)
- Token savings achieved
- Key differences for agents using CLAUDE.md

## Expected Artifacts

- **artifacts/01-core-principles.md** - 4-5 architectural heuristics
- **artifacts/02-condensed-architecture.md** - Workspace structure with inline annotations
- **artifacts/03a-progressive-disclosure-concise.md** - Concise progressive disclosure pattern
- **artifacts/03b-patterns-concise.md** - Temporal and three-folder patterns condensed
- **artifacts/04-navigation-heuristics.md** - Decision-tree style navigation guide
- **artifacts/05-examples-and-reference.md** - Representative examples and essential reference
- **artifacts/06-refactored-CLAUDE.md** - Final refactored guide (450-500 lines)
- **artifacts/07-migration-notes.md** - Documentation of changes

## Success Criteria

- ✅ Refactored CLAUDE.md is 450-500 lines (~3k tokens, 50% reduction)
- ✅ No duplicate content with orchestration skill
- ✅ Core architectural principles clearly stated
- ✅ Examples are representative, not exhaustive
- ✅ Navigation heuristics enable quick decision-making
- ✅ Technical accuracy maintained
- ✅ Essential lookup tables preserved
- ✅ Defers to specialized skills (orchestration) for detailed patterns

## Notes

**Refactoring philosophy:**
- "Guide, don't prescribe" - provide frameworks for decisions
- "Reference, don't duplicate" - link to skills for detailed patterns
- "Represent, don't enumerate" - show patterns through examples
- "Heuristics over rules" - teach principles that enable judgment

**Token savings strategy:**
- Remove verbose template examples (-1.5k tokens)
- Consolidate redundant explanations (-800 tokens)
- Reference orchestration skill instead of duplicating (-600 tokens)
- Use representative examples not catalogs (-400 tokens)
- Total savings: ~3k tokens (50% reduction)
