# Class 2: The Integrated File System

**Course:** AMA Fundamentals  
**Version:** 1.0  
**Prerequisites:** Class 1 (LLM Fundamentals & The Context Problem)  

---

## Class Overview

### Introduction

In Class 1, you learned about the fundamental limitations of LLMs: context windows have fixed limits, conversations lose context across sessions, and adding tools through MCPs bloats the context even further. These limitations make traditional chat-based AI workflows unsustainable for serious marketing work.

**The big question:** If context windows are so limited, how do we build scalable marketing systems with AI?

**The answer:** An integrated file system.

This class introduces the solution to the context problem: **Claude Code + VS Code/Cursor + Markdown files**. You'll learn how files act as persistent memory, how Markdown becomes your "programming language" for AI coordination, and how to navigate file structures effectively for both human and AI consumption.

By the end of this class, you'll understand why AMA is built on files, not chats.

### Learning Objectives

By the end of this class, you will be able to:
- Explain how file systems solve LLM context limitations
- Use Markdown as a coordination tool for AI agents
- Navigate file structures using names, paths, and references
- Understand Claude Code's default MCP tools
- Configure `CLAUDE.md` as persistent agent memory across sessions
- Know when to restart Claude Code after configuration changes

### Prerequisites

**Required:**
- Class 1: LLM Fundamentals & The Context Problem

**You should understand:**
- What a context window is and its five components
- Context limitations (rot, segmentation, fixed limits)
- Why chat history alone doesn't scale

### Estimated Time to Complete

- **Core content:** 45 minutes
- **Practical examples:** 20 minutes
- **Knowledge checks:** 10 minutes
- **Total:** 75 minutes

---

## Main Content

### 1. The Solution: Claude Code + Files

#### Why Files Solve the Context Problem

In Class 1, you learned about three context problems:

1. **Context rot** - Long conversations degrade performance
2. **Context segmentation** - Each chat session starts fresh, no memory
3. **Context limits** - Fixed token budgets fill quickly

**Files solve all three problems:**

| Problem | How Files Solve It |
|---------|-------------------|
| Context rot | Start fresh conversations whenever needed; load only relevant files |
| Context segmentation | Files persist between sessions; agents read from files instead of chat history |
| Context limits | Load only what's needed progressively; files stay external until referenced |

**The key insight:** Instead of storing everything in chat history (which disappears), store it in files (which persist). The agent reads from files on demand, keeping the context window focused.

#### The Technology Stack

The AMA methodology uses three components working together:

```
Claude Code (AI agent with file system tools)
    ↓ runs in
VS Code or Cursor (text editors for human iteraction)
    ↓ editing
Markdown files (your marketing knowledge base)
```

**Claude Code** is Anthropic's official CLI agent that connects Claude to your file system. It includes built-in tools for reading, writing, editing, searching, and navigating files.

**VS Code or Cursor** are text editors that provide the interface for working with files and running Claude Code.

**Markdown files** are your persistent memory layer. They're human-readable, AI-readable, and version-controllable.

#### Why This Matters

Traditional AI workflows rely on chat interfaces. When the conversation ends, so does the context. Every new session starts from zero.

**With file-based workflows:**
- Your work persists across sessions
- Knowledge accumulates over time in organized files
- Files can reference each other (verifiable connections)
- Agents load exactly what they need (progressive disclosure)

You're not just chatting with AI. You're building a knowledge base that compounds over time.

*How this specifically applies to marketing workflows is covered in [Class 3: Marketing File Structure](02c-class-3-marketing-file-structure.md).*

---

### 2. Markdown: The Marketing Architect's Programming Language

#### Why Markdown?

Markdown is a plain text format that's:
- **Human-readable** - You can read and edit it without special tools
- **AI-readable** - LLMs understand Markdown structure natively
- **Universal** - Works in any text editor, version control system, or tool
- **Structured** - Headers, lists, links, and formatting create clear hierarchies

**For marketing architects:** If developers use code to structure systems, you use Markdown to structure knowledge.

#### Essential Markdown Syntax

Here are the core Markdown patterns you'll use in AMA:

**Headers (hierarchy):**
```markdown
# Main Section (H1)
## Subsection (H2)
### Detail (H3)
```

**Lists (organization):**
```markdown
- Bulleted item
- Another item
  - Nested item (indent with 2 spaces)

1. Numbered item
2. Second numbered item
```

**Emphasis (highlighting):**
```markdown
**Bold text** for strong emphasis
*Italic text* for subtle emphasis
`Inline code` for technical terms or file names
```

**Links (references):**
```markdown
[Link text](/path/to/file.md)
[External link](https://example.com)
```

**Code blocks (examples):**
````markdown
```
Multi-line code or data
```
````

**Why This Matters for AMA:**
- **Headers** create navigable structure (agents can jump to sections)
- **Lists** organize findings, strategies, or tasks
- **Links** create audit trails (content → strategy → research → data)
- **Code blocks** store data, templates, or examples
- **Emphasis** highlights key insights for both humans and AI

#### Markdown for AI Coordination

The real power of Markdown emerges when you use it to coordinate with AI agents.

**Example: A research file**
```markdown
# Customer Insights

## Key Finding: Overwhelm is the Primary Pain Point

Our customers consistently describe feeling "overwhelmed" when
managing marketing across multiple platforms.

**Evidence:**
- 8 out of 10 interview respondents used the word "overwhelmed"
- Average customer juggles 4-6 marketing tools simultaneously
- [See interview transcripts](/brand/research/customer-insights/data/interviews/)

**Strategic Implication:**
Positioning should emphasize simplification and consolidation.
[See positioning strategy](/brand/strategy/positioning/STRATEGY.md)
```

**What this does:**
1. The structure is scannable by humans and AI
2. The links create verifiable chains of evidence
3. Bolded sections help agents find key information quickly
4. The hierarchy (H1 → H2) provides context about what's general vs specific

**Practical tip:** Write Markdown as if you're writing for a colleague who will read it six months later. Clear, structured, and well-referenced.

---

### 3. File Navigation: Names, Paths, and References

#### File Names and Paths

When working with AI agents, file names and paths aren't just technical details—they're how both humans and AI navigate your workspace.

**File naming best practices:**
- **Avoid spaces** 
    - Use hyphens or underscores (`customer-research.md`, not `customer research.md`)
    - Spaces in file names can cause issues in terminal commands
- **Be descriptive** 
    - `competitive-analysis.md` is better than `analysis.md`
    - Descriptive names make files discoverable (for humans and Glob searches)
- **Be conssitent** 
    - Consistent patterns make your workspace predictable. `kebab-case` is the chosen pattern for AMA.

**Example structure:**
```
/project/
├── /research/
│   ├── customer-interviews.md
│   ├── competitor-analysis.md
│   └── market-trends.md
└── /content/
    ├── blog-post-draft.md
    └── social-media-ideas.md
```

When you ask an agent to "find research files," it can use `Glob` with patterns like `research/*.md` to discover them automatically.

**File paths: Absolute vs Relative**

**Absolute paths (from workspace root):**
```markdown
/research/customer-interviews.md
/content/blog-posts/post-ideas.md
```

**Relative paths (from current file):**
```markdown
../research/interviews.md          (go up one level, then into research/)
./drafts/post-1.md                 (go into drafts subfolder from here)
```

**Best practice: Use relative paths from workspace root.**

**Why?**
- Links work from any file
- No ambiguity for agents loading files
- Collaboration-friendly (works when others clone your repository)
- No broken links when you reorganize folders

**Example reference:**
```markdown
Based on our customer research, users prefer simplicity.
[See full interview findings](/research/customer-interviews.md)
```

**Path tip for collaboration:**
Never use full system paths like `/Users/yourname/project/research/file.md`. Use workspace-relative paths like `/research/file.md` so links work for anyone who opens the project.

#### Markdown References as Navigation

Markdown links (`[text](/path)`) turn your files into a navigable knowledge base.

**Basic link syntax:**
```markdown
[Link text](/path/to/file.md)
```

**Common reference patterns:**

1. **Cross-reference to related files**
   ```markdown
   For more context, see [customer research findings](/research/customer-interviews.md).
   ```

2. **Link to specific sections** (using heading anchors)
   ```markdown
   See the [pricing strategy section](/strategy/business-model.md#pricing) for details.
   ```

3. **Link to directories**
   ```markdown
   All interview transcripts are available in [the data folder](/research/data/).
   ```

**Why This Matters:**
- **For humans:** Click links to navigate instantly
- **For AI agents:** Load referenced files on demand (progressive disclosure)
- **For both:** Create verifiable information chains

**Practical example:**
You're writing a blog post and reference market research:

```markdown
# Blog Post: Why Simplicity Wins

Our recent research shows customers are overwhelmed by complexity.
[See customer pain points analysis](/research/customer-pain-points.md)

Based on these findings, we recommend...
```

When an agent reads this file:
1. It sees the reference to the research file
2. If needed, it can load `/research/customer-pain-points.md` for additional context
3. It doesn't load the file unless necessary (saves context tokens)

This is **progressive disclosure** in action.

---

### 4. Claude Code's Default MCP Tools

Claude Code comes with built-in tools for working with files. Understanding these tools helps you understand what agents can do.

#### The Six Core Tools

| Tool | Purpose | Example Use |
|------|---------|-------------|
| **Read** | Read entire files | Loading a strategy document |
| **Write** | Create new files | Writing a new research report |
| **Edit** | Modify existing files | Updating a strategy with new findings |
| **Glob** | Find files by pattern | Find all `STRATEGY.md` files |
| **Grep** | Search file contents | Search for "positioning" across all files |
| **Bash** | Run terminal commands | Git commits, running scripts |


#### How These Tools Solve Context Problems

Remember the context problems from Class 1? Here's how these tools address them:

**Context segmentation:**
- Files persist between sessions (Read loads previous work)
- Agents don't need chat history (everything important is in files)

**Context limits:**
- Progressive disclosure (Read only what's needed)
- Grep/Glob discover files without loading them all

**Context rot:**
- Start fresh conversations anytime
- Load only relevant files (no long chat history)

**Why This Matters for AMA:**
When you ask an agent to "create a Twitter post," it is capable enough to:
1. **Globs** to find voice and messaging strategy files
2. **Reads** relevant strategy documents
3. **Writes** to create to a new file with the twitter post content
4. **Edits** if you request changes

---

### 5. CLAUDE.md: Persistent Agent Memory

#### What is CLAUDE.md?

`CLAUDE.md` is a special file at your workspace root that acts as **persistent memory for AI agents**.

Every conversation with Claude Code automatically loads `CLAUDE.md` into the context window. It's like giving the agent a handbook at the start of each session.

**Location:**
```
/your-workspace-root/
├── CLAUDE.md          ← Persistent memory (auto-loaded)
├── .claude/           ← Agent configuration
└── brand/             ← Marketing work
```

**What goes in CLAUDE.md:**
- System architecture overview
- File structure conventions
- Navigation heuristics
- Core principles and workflows
- Instructions for how agents should behave

*For an example of CLAUDE.md in practice, see how it's used in the AMA methodology in [Class 3: Marketing File Structure](02c-class-3-marketing-file-structure.md).*

#### Why CLAUDE.md Solves Context Segmentation

**Without CLAUDE.md:**
```
Session 1: "Create a research execution"
Agent: "Where should I put it?"
You: "In /brand/research/{domain}/{timestamp}/"

Session 2: "Create another research execution"
Agent: "Where should I put it?" ← Agent forgot
You: "In /brand/research/{domain}/{timestamp}/" ← You repeat yourself
```

**With CLAUDE.md:**
```
Session 1: "use my strategy files to create an on brand tweet on xyz"
Agent automatically reads CLAUDE.md → knows structure of project (including location of strategy files) → executes properly
```

The agent re-learns your system every session by automatically reading `CLAUDE.md`.

#### CLAUDE.md Best Practices

**Do:**
- Include high-level structure and principles
- Provide navigation heuristics (where to find things)
- Document naming conventions
- Explain the "why" behind patterns

**Don't:**
- Include detailed content (keep content in domain files)
- Duplicate information that belongs in strategy files
- Make it too long (keep it under 500 lines if possible)

**Why This Matters for AMA:**
`CLAUDE.md` is the instruction manual that makes every agent conversation context-aware and capable of finding the correct information without explicitly mentioning it. Without it, you'd re-explain your structure every session.

**Practical example:**
If your CLAUDE.md explains that all research goes in timestamped folders with a `PLAN.md`, the agent will:
- Create the folder with the correct timestamp format
- Generate a `PLAN.md` before starting work
- Structure files according to your conventions

All automatically.

---

### 6. Claude Code Nuances and Best Practices

#### When to Restart Claude Code

Certain changes require restarting Claude Code for them to take effect:

**Requires restart:**
- Changes to `.claude/` configuration (agents, skills, commands)
- Changes to `CLAUDE.md`
- Installing or updating MCP tools in `.mcp.json`

**Does NOT require restart:**
- Any changes outside `.claude/`, that aren't `CLAUDE.md` or `.mcp.json` files

**Why this matters:**
If you update a command in `.claude/commands/` and it doesn't seem to work, you likely need to restart Claude Code.

**How to restart:**
- Start a new conversation in the Claude Code panel
- or Close and re-open the Claude Code panel

#### Best Practices for File Work

**1. Use descriptive file paths in prompts**
```
Bad:  "Load the strategy file"
Good: "Load /brand/strategy/positioning/STRATEGY.md"
```

**2. Reference files explicitly**
```
Bad:  "Use the voice guidelines"
Good: "Load voice guidelines from /brand/strategy/voice/STRATEGY.md"
```

**3. Let agents use Glob/Grep for discovery**
```
Good: "Find all RESEARCH.md files in /brand/research/"
Good: "Search for mentions of 'positioning' in strategy files"
```

**4. Structure prompts with context**
```
Good: "Using the positioning strategy @brand/strategy/positioning/STRATEGY.md,
       create a Twitter post about our simplicity focus."
```

#### Understanding Agent File Operations

When you request complex work, agents use multiple tools in sequence:

You don't need to specify these steps. The agent figures out the tool sequence based on your request.

**Why This Matters for AMA:**
Understanding tool sequences helps you:
- Write better prompts (you know what the agent can discover)
- Debug issues (you can see what tools were used)
- Trust the system (you understand what's happening behind the scenes)

---

## How This Applies to Marketing Workflows

The concepts in this class—files as persistent memory, markdown references, progressive disclosure, and CLAUDE.md—are foundational to any Claude Code workflow.

**In [Class 3: Marketing File Structure](02c-class-3-marketing-file-structure.md)**, you'll learn how to apply these file system concepts specifically to marketing work:
- Organizing research, strategy, and content layers
- Using temporal executions to track iteration over time
- Creating audit trails from content back to research
- Implementing the AMA methodology with these building blocks

For now, focus on understanding **HOW file systems work with Claude Code**. Class 3 will show you **HOW to organize marketing files** using these patterns.

---

## Summary & Key Takeaways

### What You Learned

In this class, you learned how file systems solve the LLM context problems from Class 1:

1. **Claude Code + files** replace chat-based workflows with persistent, structured knowledge
2. **Markdown** becomes your coordination language for AI agents
3. **File paths and references** create navigable, verifiable knowledge bases
4. **MCP tools** (Read, Write, Edit, Glob, Grep, Bash) enable file-based workflows
5. **CLAUDE.md** acts as persistent memory across all sessions
6. **Progressive disclosure** keeps context focused by loading only what's needed

### How This Builds on Class 1

**Class 1 taught you:**
- Context windows have limits
- Chat history doesn't persist across sessions
- MCPs amplify the context problem

**Class 2 taught you:**
- Files solve all three context problems
- Markdown creates structured, navigable knowledge
- Claude Code provides tools for file-based workflows

### Connection to AMA Methodology

Everything in this class sets the foundation for AMA:
- **Three-layer framework** (Class 3) requires file organization
- **Temporal executions** (Class 3) use timestamped folders
- **Audit trails** (Class 3) use markdown references
- **Agent delegation** (Class 6) coordinates through files
- **Orchestration** (Class 8) tracks progress in files

**You've learned the foundation. Now you'll learn how to build on it.**