# Class 2: IDE as Shared Memory (Practical Guide)

**Course:** AMA Fundamentals  
**Class Number:** 2 of 7 (Practical Component)  
**Estimated Time:** 30 minutes  
**Prerequisites:** Completed Class 2 Conceptual component  

---

## Overview

This is the practical companion to Class 2. After understanding WHY files and IDEs matter (Conceptual.md), this guide shows you HOW to work with them effectively.

You'll learn:
- Essential Markdown syntax for structuring knowledge
- File navigation and path conventions
- How to create your first marketing files in the IDE
- Working with Claude Code in VS Code or Cursor

**Format:** Hands-on exercises with clear examples you can practice immediately.

---

## Markdown and File Navigation

Now that you understand WHY files matter, let's quickly cover HOW to work with them.

### Why Markdown?

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
# File Title (H1)
## Section (H2)
### Subsection (H3)
#### Detail (H4)
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

**Images (visual assets):**
```markdown
![Alt text description](/path/to/image.png)
![Screenshot of competitor homepage](/brand/research/competitive-analysis/assets/competitor-screenshot.png)
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

### File Navigation: Names, Paths, and References

#### File Names

When working with AI agents, file names and paths aren't just technical details—they're how both humans and AI navigate your workspace.

**File naming best practices:**
- **Avoid spaces** 
    - Use hyphens or underscores (`customer-research.md`, not `customer research.md`)
    - Spaces in file names can cause issues for agents (when running CLI commands)
- **Be descriptive** 
    - `competitive-analysis.md` is better than `analysis.md`
    - Descriptive names make files discoverable for humans and AI (Glob searches)
- **Be conssitent** 
    - Consistent patterns make your workspace predictable. `kebab-case.md` is the chosen pattern for AMA.

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

#### File Paths

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

**CRITICAL for collaboration:**
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

## Claude Code

### Claude Code's Default MCP Tools

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

### CLAUDE.md: Persistent Agent Memory

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
`CLAUDE.md` is the instruction manual that makes every agent conversation context-aware and capable of finding the correct information without explicitly mentioning it. Without it, you'd re-explain your file structure every session.

**Practical example:**
If your CLAUDE.md explains that all research goes in timestamped folders with a `PLAN.md`, the agent will:
- Create the folder with the correct timestamp format
- Generate a `PLAN.md` before starting work
- Structure files according to your conventions

All automatically.

---

### Claude Code Nuances and Best Practices

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
