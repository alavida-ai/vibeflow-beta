# AMA Fundamentals Course Outline

**Version:** 1.0
**Target Audience:** Marketing Architects, marketers new to AI workflows, non-developers
**Prerequisites:** None - starts from basics
**Total Estimated Time:** 12-15 hours

---

## Course Overview

### What You'll Learn

This course teaches you how to leverage the Agentic Marketing Architecture (AMA) methodology to build scalable, verifiable marketing systems using Claude Code. You'll start with foundational LLM concepts, understand why traditional approaches fail at scale, and progressively learn how to build a file-based marketing system that addresses these limitations.

**By the end of this course, you'll be able to:**
- Understand how LLMs work and their fundamental limitations
- Build organized, scalable marketing systems using file structures
- Delegate work effectively to AI agents
- Create reusable workflows and commands
- Manage complex marketing projects with orchestration patterns
- Version control your marketing strategy with Git

### Learning Philosophy

This course follows a **problem → solution** progression:
1. **Identify the problem** - What breaks when marketing scales with AI?
2. **Learn the foundation** - File systems, structure, version control
3. **Build practical skills** - Commands, delegation, workflows
4. **Master orchestration** - Complex multi-agent coordination

### Time Commitment

- **Estimated total:** 12-15 hours
- **Per class:** 60-90 minutes
- **Recommended pace:** 2-3 classes per week
- **Hands-on labs:** Most classes include practical exercises

---

## Course Structure

### Class 1: LLM Fundamentals & The Context Problem

**Learning Objectives:**
- Understand what a context window is and why it matters
- Identify the five components that fill a context window
- Recognize context limitations (rot, segmentation, limits)
- Understand how MCPs amplify the context problem
- Frame the challenges that the rest of the course solves

**Key Concepts:**
- Context window anatomy (system prompt, MCP tools, chat history, user prompt, output)
- Context limits and degradation over long conversations
- Context segmentation (chat isolation - no memory between sessions)
- Model Context Protocol (MCP) as external environment interaction
- How tool definitions bloat context windows

**Prerequisites:** None

**Estimated Time:** 60 minutes

**Success Metrics:**
- Can explain what fills a context window
- Can identify when context limits will become a problem
- Understands why chat history alone isn't scalable for marketing

---

### Class 2: The Integrated File System

**Learning Objectives:**
- Understand how file systems address LLM context limitations
- Use Markdown as the "marketing architect's programming language"
- Navigate file structures effectively for AI consumption
- Understand Claude Code's default MCP tools
- Configure CLAUDE.md as persistent agent memory

**Key Concepts:**
- Claude Code + VS Code/Cursor as the solution to context problems
- Markdown for human and AI readability
- File names, paths, and references as navigation tools
- Default MCP tools (Read, Write, Edit, Glob, Grep, Bash)
- CLAUDE.md as persistent memory across chat sessions
- Claude Code nuances (settings require relaunch, etc.)

**Prerequisites:** Class 1 (understand the context problem being solved)

**Estimated Time:** 75 minutes

**Success Metrics:**
- Can create well-structured markdown files
- Understands how files solve context segmentation
- Can write file paths and references correctly
- Knows when to restart Claude Code after config changes

---

### Class 3: Marketing File Structure (AMA Framework)

**Learning Objectives:**
- Organize marketing work into the three-layer framework
- Use temporal executions for iteration tracking
- Implement markdown references for progressive disclosure
- Follow AMA naming conventions
- Track evolution with CHANGELOG.md

**Key Concepts:**
- Three-layer framework: Research → Strategy → Content
- Domain organization within each layer
- Temporal execution pattern (`YYYY-MM-DD@HH:mm/`)
- Index files vs execution folders
- Markdown references for audit trails
- File naming conventions (STRATEGY.md, RESEARCH.md, CONTENT.md)
- CHANGELOG pattern for evolution tracking

**Prerequisites:**
- Class 1 (context problem)
- Class 2 (file system basics)

**Estimated Time:** 90 minutes

**Success Metrics:**
- Can organize marketing work into correct layers
- Can create properly named temporal execution folders
- Understands difference between index files and executions
- Can trace claims through markdown references (content → strategy → research)

---

### Class 4: Git Integration & Version Control

**Learning Objectives:**
- Understand why version control matters for marketing strategy
- Use basic Git commands for marketing work
- Create meaningful commits for strategy changes
- Collaborate with Git branches (high-level)

**Key Concepts:**
- Git as a safety net for strategy experiments
- Basic Git workflow (init, add, commit, push)
- Commit messages for marketing context
- Branching for strategy iterations
- Collaboration patterns (high-level - not developer-focused)
- Claude Code Git integration

**Prerequisites:**
- Class 2 (file system)
- Class 3 (AMA structure to version control)

**Estimated Time:** 60 minutes

**Success Metrics:**
- Can create Git commits for strategy changes
- Understands when to create a branch
- Can recover previous versions of strategy
- Comfortable with Git as a tool (not intimidated)

**Note:** This class is high-level and non-technical. Focus on practical value for marketers, not developer workflows.

---

### Class 5: Claude Code Commands

**Learning Objectives:**
- Craft reusable prompts as commands
- Create custom slash commands for repeated workflows
- Organize commands for team use
- Understand when to use commands vs skills

**Key Concepts:**
- Commands as the fundamental human-AI interface
- Anatomy of a command (trigger + prompt)
- Creating custom slash commands (/.claude/commands/)
- Command naming and organization
- When commands work better than ad-hoc prompts
- Difference between commands and skills (preview)

**Prerequisites:**
- Class 2 (file system)
- Class 3 (AMA structure - commands often reference structure)
- Class 4 (Git - for versioning commands)

**Estimated Time:** 75 minutes

**Success Metrics:**
- Can create a custom slash command
- Understands when to extract prompts into commands
- Can organize commands for discoverability
- Knows the difference between commands and skills

---

### Class 6: Agent Delegation & Sub-agents

**Learning Objectives:**
- Understand when to delegate vs execute directly
- Create custom sub-agents for specialized work
- Modify agent system prompts
- Recognize what LLM limitations delegation solves

**Key Concepts:**
- Why delegation (context isolation, specialization)
- Sub-agent architecture (/.claude/agents/)
- Creating custom agents (Analyst, Strategist, Content Creator)
- Modifying main agent system prompt
- SessionStart hooks (defining agent identity - replaces deprecated output styles)
- Hook patterns for system customization
- When to delegate (specialized domains, isolated tasks)
- Delegation patterns (clear inputs/outputs, stateless execution)

**Prerequisites:**
- Class 1 (context problem - delegation as solution)
- Class 2 (file system for agent coordination)
- Class 3 (AMA structure - what agents work on)

**Estimated Time:** 90 minutes

**Success Metrics:**
- Can identify when delegation is appropriate
- Can create a custom sub-agent
- Understands how hooks customize behavior
- Can modify agent system prompts safely
- Links delegation back to context window management

---

### Class 7: Claude Code Skills

**Learning Objectives:**
- Understand what skills are and when to use them
- Use existing skills effectively
- Navigate skill structure (SKILL.md, references/)
- Introduction to the agentic-orchestrating skill
- Recognize difference between skills and commands

**Key Concepts:**
- Skills as packaged, reusable workflows
- Anatomy of a skill (SKILL.md, /references/, /data/)
- Using skills vs creating skills (use first, create later)
- The agentic-orchestrating skill (preview for Classes 8-9)
- Skills vs Commands (workflows vs prompts)
- When to create a skill vs use a command

**Prerequisites:**
- Class 5 (commands - for comparison)
- Class 6 (sub-agents - skills often delegate)

**Estimated Time:** 75 minutes

**Success Metrics:**
- Can invoke and use existing skills
- Understands skill structure
- Knows when to use a skill vs command
- Familiar with agentic-orchestrating skill basics

---

### Class 8: Agent Orchestration Fundamentals

**Learning Objectives:**
- Implement PLAN.md/TODO.md pattern
- Know when orchestration is required (3+ steps, coordination)
- Create execution folders with artifacts
- Delegate to sub-agents within orchestrated workflows
- Understand progressive task breakdown

**Key Concepts:**
- The orchestration pattern (PLAN.md → approval → TODO.md → execution)
- When to use orchestration (complexity threshold)
- Execution folder structure
- Artifact management
- Progressive task breakdown (complex → manageable steps)
- Delegation within orchestration
- The agentic-orchestrating skill in practice

**Prerequisites:**
- Class 3 (AMA structure - where executions live)
- Class 6 (sub-agents - orchestration delegates)
- Class 7 (skills - orchestrating is a skill)

**Estimated Time:** 90 minutes

**Success Metrics:**
- Can create a PLAN.md for complex work
- Can track progress with TODO.md
- Can structure execution folders correctly
- Understands when orchestration is needed vs overkill

**Practical Exercise:** Walk through creating a research execution from start to finish.

---

### Class 9: Advanced Orchestration Patterns

**Learning Objectives:**
- Create wrapper commands around orchestration
- Build custom workflows within skills
- Add feedback loops to workflows
- Design multi-phase workflows
- Master artifact management

**Key Concepts:**
- Wrapper commands (wrapping /plan for domain-specific workflows)
- Creating workflows within skills
- Feedback loops and iteration patterns
- Multi-phase workflows (Stage 1 → Stage 2a, 2b, 2c...)
- Artifact handoff patterns
- Dynamic task generation (Stage 1 defines Stage 2 tasks)
- Quality review and validation stages

**Prerequisites:**
- Class 5 (commands - for wrappers)
- Class 7 (skills - for custom workflows)
- Class 8 (orchestration fundamentals)

**Estimated Time:** 90 minutes

**Success Metrics:**
- Can create a wrapper command for a domain workflow
- Can design multi-phase workflows
- Can add feedback loops to workflows
- Understands when to use dynamic task generation

**Practical Exercise:** Build a custom content workflow (research → strategy → content with validation).

---

## Learning Progression Map

```
Class 1: The Problem
    ↓ (What breaks at scale?)
Class 2: The Foundation
    ↓ (File systems solve context segmentation)
Class 3: The Organization
    ↓ (Structure prevents chaos)
Class 4: The Safety Net
    ↓ (Version control enables experimentation)
Class 5: The Interface
    ↓ (Commands make prompts reusable)
Class 6: The Delegation
    ↓ (Sub-agents isolate context + specialize)
Class 7: The Workflows
    ↓ (Skills package reusable patterns)
Class 8: The Coordination
    ↓ (Orchestration manages complexity)
Class 9: The Mastery
    ↓ (Custom workflows for your needs)
```

---

## Success Metrics by Level

### Foundation (Classes 1-2)
**You've succeeded when:**
- You can explain why chat-based AI doesn't scale for marketing
- You understand how files solve context problems
- You're comfortable with Markdown and file paths

### Organization (Classes 3-5)
**You've succeeded when:**
- You can organize work into the three-layer framework
- You can create temporal execution folders
- You use Git confidently (not fearfully)
- You create custom commands for repeated tasks

### Delegation (Class 6)
**You've succeeded when:**
- You know when to delegate vs execute
- You can create custom sub-agents
- You understand hooks and system customization

### Workflows (Classes 7-9)
**You've succeeded when:**
- You can use and create skills
- You implement orchestration for complex work
- You design custom workflows for your domain
- You think in systems, not one-off tasks

---

## Course Completion Criteria

**You've completed the course when you can:**

1. **Explain the "why"** - Articulate why AMA exists and what problems it solves
2. **Organize effectively** - Structure marketing work in the three-layer framework
3. **Delegate appropriately** - Know when to use sub-agents vs execute directly
4. **Orchestrate complexity** - Break down complex work into PLAN.md/TODO.md workflows
5. **Build custom workflows** - Create your own skills and wrapper commands
6. **Version control confidently** - Use Git as a tool for strategy iteration

**Final Project (Optional):**
Build a complete marketing workflow from scratch:
- Research execution (with sub-agent delegation)
- Strategy synthesis (with orchestration)
- Content generation (with wrapper command)
- All tracked in Git with proper AMA structure

---

## Appendix: Class Dependencies

| Class | Depends On | Why |
|-------|------------|-----|
| 1 | None | Foundation |
| 2 | 1 | Solves problems from Class 1 |
| 3 | 1, 2 | Needs file system basics |
| 4 | 2, 3 | Needs structure to version control |
| 5 | 2, 3, 4 | Commands reference structure & files |
| 6 | 1, 2, 3 | Delegation solves context, uses structure |
| 7 | 5, 6 | Skills build on commands & agents |
| 8 | 3, 6, 7 | Orchestration uses structure, delegation, skills |
| 9 | 5, 7, 8 | Advanced patterns combine everything |

---

## Notes for Instructors

1. **Problem-solution framing** - Class 1 frames problems, subsequent classes solve them
2. **Progressive complexity** - Each class builds exactly one layer of capability
3. **Practical focus** - Classes 8-9 are very hands-on (balance theory with practice)
4. **Non-technical audience** - Git and technical concepts kept high-level
5. **Repetition with depth** - Core concepts (context, files, delegation) appear multiple times at increasing depth
