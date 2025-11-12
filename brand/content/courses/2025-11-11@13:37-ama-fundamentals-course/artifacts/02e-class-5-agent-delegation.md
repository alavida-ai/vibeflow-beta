# Class 6: Agent Delegation & Sub-agents

**Course:** AMA Fundamentals
**Class Number:** 6 of 9
**Estimated Time:** 90 minutes

---

## Class Overview

### Introduction

You've learned how files solve context segmentation (Class 2), how to organize marketing work (Class 3), and how to create reusable commands (Class 5). But there's still a fundamental problem we haven't fully addressed: **what happens when one agent tries to do everything?**

Think about your marketing team. You don't ask the same person to conduct customer research, synthesize brand strategy, AND write Twitter threads. When one person tries to juggle all three:
- They're overwhelmed by too many tools and responsibilities
- Their context fills up with mixed information (research data, strategy frameworks, content examples)
- They lose focus switching between different modes of thinking
- Earlier work interferes with later work

**The same thing happens to AI agents.**

In this class, you'll learn how **agent delegation** solves these problems by giving each specialized task a fresh context and focused expertise. You'll understand when to delegate work to sub-agents versus executing directly, and how to configure custom agents for your marketing workflows.

### Learning Objectives

By the end of this class, you will be able to:

1. **Understand when to delegate vs execute directly**
   - Recognize scenarios where delegation improves outcomes
   - Identify signs that specialization is needed
   - Know when direct execution is more efficient

2. **Create custom sub-agents for specialized work**
   - Configure agent system prompts
   - Structure agent files in `/.claude/agents/`
   - Define clear agent responsibilities

3. **Recognize what LLM limitations delegation solves**
   - Link delegation back to context window management (Class 1)
   - Understand context isolation benefits
   - Appreciate specialization advantages


### What You'll Build

By the end of this class, you'll have:
- An analyst sub-agent
- An understanding of when to delegate vs execute
- A mental model for agent specialization in marketing

---

## Part 1: Why Delegation?

### The Problem: One Agent Can't Do Everything Well

Imagine this scenario:

You're the manager on a marketing team. A stakeholder asks you to: "Research our top 3 competitors, synthesize a positioning strategy, and write 10 Twitter threads."

**If you try to do everything yourself:**
- Your context window fills with competitor data (research mode)
- You've been provided with so many tools to execute the task you don't even know what each tool is or when to use the right one
- Then strategic frameworks (strategy mode)
- Then content examples and brand voice (content mode)
- By the time you're writing threads, you've forgotten nuances from competitor data

**This is exactly what happens to an AI agent without delegation.**

### Solution: Specialized Sub-agents

Instead, you delegate:
1. **Analyst agent** → Conducts competitor research (focused context)
2. **Strategist agent** → Synthesizes positioning (strategic mindset)
3. **Content Creator agent** → Writes Twitter threads (creative mode)

Each agent:
- Has a **fresh, focused context window**
- Operates in **specialized mode** (research vs strategy vs content)
- Receives **clear inputs** and produces **clear outputs**
- Doesn't carry baggage from unrelated tasks
- Has access to **only the tools they need** benefits:
   - Smaller context footprint (fewer tool definitions loaded)
   - Less decision paralysis (fewer tools to choose from)
   - Reduced confusion (only relevant tools available)
   - Lower error rate (can't accidentally use wrong tool)

This focused tool access further reduces context degradation and improves output quality.

**Delegation enables:**
- **Context isolation** - Fresh slate for each task type
- **Expertise focus** - Agent configured for specific work
- **Parallel thinking** - Different modes for different work
- **Quality improvement** - Specialization beats generalization

> **Technical Note for Developers:** This is similar to microservices architecture - each service has a bounded context and clear responsibility. Sub-agents are stateless workers that receive input, process it, and return output without maintaining state.

---

## Part 2: Sub-agent Architecture

### Where Sub-agents Live

Sub-agents are defined in `/.claude/agents/` directory:

```
/.claude/
├── agents/                    ← Sub-agent definitions
│   ├── analyst.md             ← Research specialist
│   ├── strategist.md          ← Strategy synthesis specialist
│   ├── content-creator.md     ← Content generation specialist
│   └── custom-agent.md        ← Your custom agents
├── output-styles/             ← SessionStart hooks (main agent identity)
│   └── operations-manager.md  ← Defines Operations Manager behavior
└── skills/                    ← Workflows that delegate to agents
    └── agentic-orchestrating/
```

### Anatomy of a Sub-agent

A sub-agent file is a structured markdown document that defines a specialized AI agent's behavior, expertise, and boundaries. Understanding each component helps you create effective agents for your marketing workflows.

#### Front Matter (YAML Configuration)

The front matter uses YAML syntax to configure technical aspects of the agent:

**`name`** - The agent's identifier
- Used when invoking the agent via delegation
- Should be descriptive and unique
- Example: `"Research Analyst"`, `"Brand Strategist"`

**`description`** - Brief summary of agent's purpose
- Helps Operations Manager decide when to delegate
- Should be concise, descriptive and accurate 
- Example: `"Conducts objective research and synthesizes findings into structured reports"`

**`model`** - Which LLM model to use
- Options: `"sonnet"` (default), `"opus"` (most capable), `"haiku"` (fast/cheap)
- Choose based on task complexity and cost considerations
- Research analysis typically uses `sonnet`, simple formatting tasks might use `haiku`

**`tools`** - Which capabilities the agent can access
- Array of tool names like `["Read", "Write", "WebFetch", "Grep"]`
- Restricts agent to only necessary tools
- Example: Analyst might need `["Read", "WebFetch", "Write"]`, but not `["Bash"]`
- Reduces attack surface and prevents out-of-scope actions

**Example Analyst Agent: Front Matter:**
```yaml
---
name: "Analyst"
description: "Conducts objective research and synthesizes findings"
model: "sonnet"
tools: ["Read", "Write", "WebFetch", "Grep", "Glob"]
---
```

#### System Prompt (Agent Behavior Definition)

The system prompt is the markdown content below the front matter that defines how the agent thinks and acts:

**1. Agent Identity** - Who they are, what they specialize in
- Defines the agent's professional persona
- Sets the mental model the agent operates from
- Creates context for decision-making

**Why this matters:** An agent with "Research Analyst" identity approaches tasks differently than one with "Creative Writer" identity. The identity shapes every decision, output style, and interpretation of instructions.

**Example:**
```markdown
## Identity
You are a Research Analyst specializing in marketing research. You gather, analyze,
and synthesize information to answer specific research questions. Your strength is
objective pattern recognition and evidence-based reporting.
```

**2. Responsibilities** - What tasks they handle
- Explicit list of what the agent does
- Defines the agent's scope and capabilities
- Should align with specialized expertise

**Why this matters:** Clear responsibilities prevent scope creep and ensure the agent stays focused on what it does best. An Analyst shouldn't try to make strategic recommendations (that's the Strategist's job).

**Example:**
```markdown
## Responsibilities
- Conduct competitive analysis using web research and provided sources
- Analyze customer feedback for patterns and themes
- Research market trends and landscape shifts
- Synthesize raw data into structured, cited findings
- Identify key insights without making strategic recommendations
```

**3. Constraints** - What they DON'T do (boundaries)
- Explicit list of out-of-scope activities
- Prevents the agent from overstepping into other specializations
- Critical for maintaining separation of concerns

**Why this matters:** Without clear boundaries, agents try to do everything, which defeats the purpose of specialization. An Analyst who tries to make strategic decisions produces lower-quality research (mixing objectives with analysis) and lower-quality strategy (lacks strategic expertise).

**Example:**
```markdown
## Constraints (What You Don't Do)
- You don't create strategy - that's the Strategist's role
- You don't write marketing content - that's the Content Creator's role
- You don't make business recommendations - you present objective findings
- You don't synthesize research into positioning - you provide data for synthesis
```

**The Complete Picture:**

A well-designed sub-agent has:
- **Technical configuration** (front matter) → Which model, which tools
- **Identity** (who am I?) → Research analyst, strategist, content creator
- **Responsibilities** (what do I do?) → Specific tasks within specialization
- **Constraints** (what don't I do?) → Clear boundaries prevent scope creep

This structure creates focused, predictable, high-quality specialized agents.

---

## Part 3: When to Delegate vs Execute Directly

### Decision Framework

Use this framework to decide when delegation is appropriate:

#### Delegate When:

**1. Fresh context needed (workflow complexity or topic contamination)**

Delegate when accumulated context interferes with quality:

Multi-phase workflows:
```markdown
Task: "Research 10 competitors, synthesize positioning, create content calendar"

Single agent: Context fills with research → strategy → content (75K+ tokens)
Delegated: Analyst (30K fresh) → Strategist (20K fresh) → Content Creator (15K fresh)
```

Topic contamination:
```markdown
Current conversation: 30 minutes discussing Twitter strategy
New task: Research LinkedIn competitors

Single agent: LinkedIn research contaminated by Twitter context
Delegated: Analyst gets fresh context, no Twitter bias
```

When to use: Multi-phase work, unrelated task during long conversation, context degradation

---

**2. Parallelization for speed**

Delegate independent tasks to run simultaneously:

```markdown
Task: "Research 5 competitors"

Sequential: 5 × 8 minutes = 40 minutes
Parallel: 5 agents × 8 minutes = 8 minutes (5x speedup)
```

When to use: Independent research tasks, batch content creation, multiple analyses

Important: Only parallelize truly independent tasks.

---

**3. Specialized expertise needed**

Different work requires different thinking modes:

- **Analyst** - Objective research ("what is true?")
- **Strategist** - Synthesis & frameworks ("what should we do?")
- **Content Creator** - Brand voice & creativity ("how do we say this?")

```markdown
❌ One agent: Switches between modes, context from each phase interferes
✅ Specialized agents: Pure focus, no mode switching, higher quality
```

When to use: Research, strategy synthesis, content creation, custom specialized tasks

---

**4. Clear boundaries exist**

Sub-agents can't ask follow-ups. Delegate when you can specify:

```markdown
✅ Good: "Research competitors A, B, C. Focus on pricing. Save to /artifacts/findings.md"
❌ Bad: "Do some competitor research" (which competitors? what aspects? where to save?)
```

When to use: Well-defined inputs, specific outputs, bounded scope

---

#### Execute Directly When:

1. **Simple operations**
   - File reading/writing
   - Basic navigation
   - Quick clarifications

2. **Ambiguous or exploratory**
   - Requirements unclear
   - Iterative refinement needed from marketing architect
   - Back-and-forth necessary

---

## Part 4: Connecting Back to Context Management

### How Delegation Solves Class 1 Problems

Remember the five components that fill a context window (from Class 1)?

1. System prompt
2. MCP tool definitions
3. Chat history
4. User prompt
5. Generated output

**Without delegation:**
- Chat history grows quickly
- Context window fills with mixed concerns
- Agent loses focus as conversation lengthens
- Quality degrades (context rot)

**With delegation:**
- Each sub-agent gets fresh context
- Focused system prompt (specialized role)
- No irrelevant chat history
- Clean input → focused output
- Context isolation prevents rot

### The Context Budget Trade-off

**Delegation costs context tokens:**
- Each delegation requires system prompt
- Each delegation uses MCP tool definitions
- Each delegation has coordination overhead

**But delegation saves context tokens:**
- Fresh context window (no accumulated history)
- Focused work (no mixed concerns)
- Stateless execution (no state management)
- Clear boundaries (easier to optimize)

**Net result:** Delegation improves outcomes despite token cost because specialization and focus matter more than raw context size.

---

## Part 5: File Structure for Agents

### Agent Organization

```
/.claude/
├── agents/
│   ├── analyst.md              ← Research specialist
│   ├── strategist.md           ← Strategy specialist
│   ├── content-creator.md      ← Content specialist
│   └── [custom-agents].md      ← Your custom specialists
│
├── output-styles/
│   └── operations-manager.md   ← Main agent identity (SessionStart hook)
│
└── skills/
    └── agentic-orchestrating/
        └── references/
            └── delegation.md   ← Delegation patterns (read this!)
```
---

## Summary & Key Takeaways

### What You Learned

1. **Why delegation matters**
   - Solves context isolation problems (from Class 1)
   - Enables specialization (research vs strategy vs content)
   - Improves quality through focused expertise

2. **Sub-agent architecture**
   - Agents live in `/.claude/agents/`
   - Each agent has clear identity and responsibilities
   - Delegation happens through file coordination

3. **When to delegate vs execute**
   - Delegate for specialized work, clear boundaries, repeated patterns
   - Execute directly for simple operations, high coordination needs, one-off tasks

4. **Delegation patterns**
   - Clear input/output delegation
   - Multi-phase delegation (research → strategy → content)
   - Iterative delegation (refine through cycles)

### How This Builds on Previous Classes

- **Class 1 (Context Problem):** Delegation solves context limits and context rot through isolation
- **Class 2 (File System):** Agents coordinate through files, not shared memory
- **Class 3 (AMA Structure):** Specialised agents can work on different layers (research, strategy, content)
- **Class 5 (Commands):** Commands often trigger delegation workflows

### Links to Context Window Management

**Delegation is context management strategy:**
- Fresh context window per specialized task
- No accumulated baggage from unrelated work
- Focused system prompts for specialized behavior
- Stateless execution prevents context complexity

**Trade-off understanding:**
- Delegation costs tokens (system prompt, coordination)
- But gains quality (specialization, focus, isolation)
- Net positive when specialization provides value

