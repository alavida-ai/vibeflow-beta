# Class 6: Agent Delegation & Sub-agents

**Course:** AMA Fundamentals
**Class Number:** 6 of 9
**Estimated Time:** 90 minutes

---

## Class Overview

### Introduction

You've learned how files solve context segmentation (Class 2), how to organize marketing work (Class 3), and how to create reusable commands (Class 5). But there's still a fundamental problem we haven't fully addressed: **specialized expertise within a single context window.**

Think about your marketing team. You don't ask the same person to conduct customer research, synthesize brand strategy, AND write Twitter threads. Each requires different expertise, different thinking patterns, and different focuses. The same principle applies to AI agents.

In this class, you'll learn how **agent delegation** solves multiple LLM limitations at once: context isolation, specialized expertise, and task focus. You'll understand when to delegate work to sub-agents versus executing directly, and how to configure custom agents for your marketing workflows.

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

3. **Modify agent system prompts**
   - Understand SessionStart hooks
   - Customize the Operations Manager identity
   - Use hooks to define agent behavior

4. **Recognize what LLM limitations delegation solves**
   - Link delegation back to context window management (Class 1)
   - Understand context isolation benefits
   - Appreciate specialization advantages

### Prerequisites

- **Class 1:** LLM Fundamentals & The Context Problem (delegation solves context issues)
- **Class 2:** The Integrated File System (agents coordinate through files)
- **Class 3:** Marketing File Structure (agents work on AMA-structured content)

### What You'll Build

By the end of this class, you'll have:
- A custom research analyst sub-agent
- An understanding of when to delegate vs execute
- Modified your Operations Manager identity (via SessionStart hook)
- A mental model for agent specialization in marketing

---

## Part 1: Why Delegation?

### The Problem: One Agent Can't Do Everything Well

Imagine this scenario:

You're the Operations Manager on a marketing team. A stakeholder asks you to: "Research our top 3 competitors, synthesize a positioning strategy, and write 10 Twitter threads."

**If you try to do everything yourself:**
- Your context window fills with competitor data (research mode)
- Then strategic frameworks (strategy mode)
- Then content examples and brand voice (content mode)
- By the time you're writing thread #10, you've forgotten nuances from competitor #1

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

### Why This Matters for AMA

The three-layer framework (Research → Strategy → Content) maps perfectly to agent specialization:

```
Research layer      → Analyst agent (research mindset)
Strategy layer      → Strategist agent (synthesis mindset)
Content layer       → Content Creator agent (creative mindset)
```

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

A sub-agent file contains:

1. **Agent identity** - Who they are, what they specialize in
2. **Responsibilities** - What tasks they handle
3. **Constraints** - What they DON'T do (boundaries)
4. **Input expectations** - What they need to do their work
5. **Output requirements** - What they deliver

**Example: Analyst Agent**

```markdown
# Analyst Agent

## Identity
You are a Research Analyst specializing in marketing research. You gather, analyze, and synthesize information to answer specific research questions.

## Core Responsibilities
- Conduct competitive analysis
- Analyze customer insights
- Research market trends
- Synthesize findings into clear reports

## What You Don't Do
- You don't create strategy (that's the Strategist)
- You don't write content (that's the Content Creator)
- You don't make recommendations (you present findings objectively)

## Input Requirements
- Clear research question
- Scope and constraints
- Target output format

## Output Requirements
- Factual findings (not opinions)
- Cited sources
- Structured markdown format
- Summary of key insights
```

### How Delegation Works

**The flow:**

1. **Operations Manager** receives complex task
2. **Operations Manager** identifies need for specialization
3. **Operations Manager** delegates to appropriate sub-agent
4. **Sub-agent** loads fresh context with task-specific focus
5. **Sub-agent** executes work and saves to files
6. **Operations Manager** integrates results into larger workflow

**Behind the scenes:**
- Sub-agent gets a fresh context window (no history baggage)
- Sub-agent's system prompt defines specialized behavior
- Sub-agent works with files (reads inputs, writes outputs)
- Sub-agent returns control to Operations Manager when done

---

## Part 3: SessionStart Hooks - Defining Agent Identity

### What Are Hooks?

**Hooks** are system customization points that define agent behavior. The most important hook for agent identity is the **SessionStart hook**.

**SessionStart hooks:**
- Run at the beginning of every Claude Code session
- Define who the agent is (identity and role)
- Set behavior patterns and constraints
- Replace the deprecated "output styles" concept

### The Operations Manager Hook

Your main agent's identity is defined in:
```
/.claude/output-styles/operations-manager.md
```

This file contains the **system prompt** that defines how the Operations Manager thinks and behaves.

**Example structure:**

```markdown
# Operations Manager

## Your Identity
You are the Operations Manager for marketing workflows using the Agentic Marketing Architecture (AMA). You orchestrate complex marketing projects by delegating to specialist agents.

## Core Responsibilities
1. Receive and understand requests
2. Break down complex work into manageable steps
3. Delegate to appropriate specialists
4. Coordinate outputs into cohesive results
5. Ensure work follows AMA structure

## When You Delegate
- Research tasks → Analyst agent
- Strategy synthesis → Strategist agent
- Content creation → Content Creator agent

## When You Execute Directly
- Simple file operations
- Navigation and organization
- Quick clarifications
- Coordination and orchestration
```

### Why SessionStart Hooks Replace Output Styles

**Old approach (deprecated):**
- "Output styles" were static templates
- Limited customization
- Couldn't define complex agent behavior

**New approach (SessionStart hooks):**
- Full system prompt control
- Dynamic behavior definition
- Clear identity and specialization
- Better suited for agentic systems

---

## Part 4: When to Delegate vs Execute Directly

### Decision Framework

Use this framework to decide when delegation is appropriate:

#### Delegate When:

1. **Specialized expertise needed**
   - Research analysis (Analyst)
   - Strategic synthesis (Strategist)
   - Creative content generation (Content Creator)

2. **Context isolation beneficial**
   - Task requires focused context
   - Unrelated to current conversation
   - Benefits from fresh perspective

3. **Clear boundaries exist**
   - Well-defined inputs
   - Specific output requirements
   - Bounded scope

4. **Repeated pattern**
   - Similar tasks happen often
   - Specialized agent improves quality
   - Worth creating reusable workflow

#### Execute Directly When:

1. **Simple operations**
   - File reading/writing
   - Basic navigation
   - Quick clarifications

2. **High coordination need**
   - Requires understanding full context
   - Needs to integrate multiple pieces
   - Better with conversational flow

3. **Ambiguous or exploratory**
   - Requirements unclear
   - Iterative refinement needed
   - Back-and-forth necessary

4. **One-off task**
   - Unlikely to repeat
   - No pattern to extract
   - Overhead not justified

### Common Marketing Delegation Patterns

| Task Type | Delegate To | Why |
|-----------|-------------|-----|
| Competitor research | Analyst | Focused research mode, objective findings |
| Customer interview analysis | Analyst | Pattern recognition, insight synthesis |
| Positioning strategy | Strategist | Strategic thinking, synthesis of research |
| Brand voice development | Strategist | Nuanced strategic work |
| Twitter thread writing | Content Creator | Creative mode, brand voice application |
| Blog post drafting | Content Creator | Long-form content expertise |
| Quick file update | Execute directly | Simple, no specialization needed |
| File reorganization | Execute directly | Coordination task, not specialized |

---

## Part 5: Creating Your First Sub-agent

### Practical Example: Research Analyst

Let's create a custom Research Analyst agent specialized for your marketing workflows.

**Step 1: Create the agent file**

File: `/.claude/agents/analyst.md`

```markdown
# Research Analyst Agent

## Identity
You are a Research Analyst specializing in marketing and brand research. You conduct thorough, objective research to answer specific questions about competitors, customers, markets, and trends.

## Core Expertise
- Competitive analysis
- Customer insight synthesis
- Market landscape research
- Data pattern recognition
- Evidence-based reporting

## Responsibilities

### What You Do
1. **Conduct research** - Gather information from provided sources or using available tools
2. **Analyze findings** - Identify patterns, themes, and insights
3. **Synthesize results** - Structure findings into clear, actionable reports
4. **Cite sources** - Always reference where information came from
5. **Stay objective** - Present facts, not opinions or recommendations

### What You Don't Do
- Create strategy (that's the Strategist's role)
- Make business recommendations (present findings objectively)
- Write marketing content (that's the Content Creator's role)
- Make decisions for stakeholders (provide information for decisions)

## Input Requirements

You need:
1. **Research question** - What are we trying to learn?
2. **Scope** - What should/shouldn't be included?
3. **Sources** - Where to look (files, web search, provided data)
4. **Output format** - How findings should be structured

## Output Requirements

You deliver:
1. **Structured findings** - Organized by theme/category
2. **Cited sources** - Markdown references to source material
3. **Key insights** - Summary of most important findings
4. **Objective tone** - Facts, not opinions

## Execution Pattern

1. Clarify the research question
2. Identify sources to analyze
3. Gather and analyze information
4. Structure findings logically
5. Write report in `/artifacts/` folder
6. Return file path to Operations Manager
```

**Step 2: Test the delegation**

Ask the Operations Manager to delegate a research task:

```
"Delegate to the Analyst agent: Research the top 3 tools in the [category] space.
Focus on their positioning and key features. Output findings to artifacts folder."
```

**Step 3: Observe the behavior**

Notice how the Analyst:
- Loads with fresh context (no chat history)
- Focuses purely on research (no strategy thinking)
- Produces objective findings (no recommendations)
- Returns clean output file for integration

### Creating Other Specialized Agents

**Strategist Agent Pattern:**
```markdown
# Strategist Agent

## Identity
You synthesize research into strategic recommendations. You think at the systems level.

## Core Expertise
- Research synthesis
- Strategic positioning
- Framework development
- Brand architecture

## Responsibilities
- Synthesize research findings into strategy
- Develop positioning frameworks
- Create strategic recommendations
- Link claims to research evidence
```

**Content Creator Agent Pattern:**
```markdown
# Content Creator Agent

## Identity
You write on-brand marketing content guided by strategy.

## Core Expertise
- Brand voice application
- Content formatting
- Platform-specific optimization
- Creative writing

## Responsibilities
- Write content following brand strategy
- Apply brand voice consistently
- Optimize for platform requirements
- Generate engaging, effective copy
```

---

## Part 6: Delegation Patterns in Practice

### Pattern 1: Clear Input/Output Delegation

**Scenario:** Need competitor analysis

```markdown
**Operations Manager delegates:**
"Analyst, research competitors A, B, C.
Focus on their positioning and key features.
Output to /brand/research/competitive-analysis/2025-01-15@14:30/artifacts/competitor-findings.md"

**Analyst receives:**
- Clear research question
- Defined scope (3 competitors, positioning + features)
- Output destination

**Analyst delivers:**
- Structured findings file
- Markdown references to sources
- Key insights summary
```

### Pattern 2: Multi-phase Delegation

**Scenario:** Create positioning strategy from research

```markdown
**Phase 1: Research**
Operations Manager → Analyst: "Research target audience pain points"
Analyst → Returns: /artifacts/audience-pain-points.md

**Phase 2: Strategy**
Operations Manager → Strategist: "Synthesize positioning using [file path]"
Strategist → Returns: /artifacts/positioning-strategy.md

**Phase 3: Content**
Operations Manager → Content Creator: "Write 5 tweets using [strategy path]"
Content Creator → Returns: /artifacts/twitter-threads.md
```

### Pattern 3: Iterative Delegation

**Scenario:** Refining research through iteration

```markdown
**Iteration 1:**
Operations Manager → Analyst: "Research competitor landscape"
Analyst → Returns findings
Operations Manager reviews: "Missing pricing analysis"

**Iteration 2:**
Operations Manager → Analyst: "Add pricing analysis to [previous findings]"
Analyst → Returns updated findings
Operations Manager approves
```

---

## Part 7: Connecting Back to Context Management

### How Delegation Solves Class 1 Problems

Remember the five components that fill a context window (from Class 1)?

1. System prompt
2. MCP tool definitions
3. Chat history
4. User prompt
5. Generated output

**Without delegation:**
- Chat history grows with research → strategy → content
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

## Part 8: Common Pitfalls & Best Practices

### Pitfall 1: Over-delegation

**Mistake:** Delegating simple tasks that don't need specialization

```markdown
❌ Bad: "Analyst, read this file and tell me what's in it"
✅ Good: Operations Manager reads the file directly
```

**Why:** Simple file operations don't benefit from delegation overhead.

### Pitfall 2: Unclear Delegation

**Mistake:** Delegating without clear instructions

```markdown
❌ Bad: "Analyst, do some research on competitors"
✅ Good: "Analyst, research competitors A, B, C.
         Focus on pricing and positioning.
         Output to [specific file path]"
```

**Why:** Clear inputs → reliable outputs. Ambiguity breaks delegation.

### Pitfall 3: No Output Destination

**Mistake:** Expecting sub-agent to figure out where to save

```markdown
❌ Bad: "Analyst, research and save somewhere appropriate"
✅ Good: "Analyst, research and save to /brand/research/competitive-analysis/
         2025-01-15@14:30/artifacts/findings.md"
```

**Why:** File coordination requires explicit paths. Sub-agents should not guess.

### Pitfall 4: Wrong Agent for Task

**Mistake:** Delegating to agent outside their expertise

```markdown
❌ Bad: "Analyst, write a Twitter thread" (content work)
✅ Good: "Content Creator, write a Twitter thread" (specialized role)
```

**Why:** Agents specialize for a reason. Use the right tool for the job.

### Best Practices

1. **Clear boundaries** - Define what each agent does/doesn't do
2. **Explicit paths** - Always specify where outputs should go
3. **Focused tasks** - One clear objective per delegation
4. **Stateless execution** - Each delegation is independent
5. **Appropriate complexity** - Delegate when specialization helps

---

## Part 9: File Structure for Agents

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

### Delegation Artifacts Pattern

When sub-agents execute work, outputs typically go to:

```
/brand/{layer}/{domain}/{YYYY-MM-DD@HH:mm}/
├── PLAN.md                      ← Operations Manager creates
├── TODO.md                      ← Operations Manager tracks
├── {OUTPUT}.md                  ← Final integrated output
└── artifacts/
    ├── analyst-findings.md      ← Analyst output
    ├── strategy-draft.md        ← Strategist output
    └── content-drafts.md        ← Content Creator output
```

**Why `/artifacts/`?**
- Keeps work-in-progress separate from final output
- Shows delegation happened (audit trail)
- Enables progressive disclosure (load artifacts only when needed)

---

## Knowledge Checks

### Check 1: When to Delegate

**Scenario:** You need to update a single line in a strategy document.

**Question:** Should you delegate to the Strategist agent or execute directly?

<details>
<summary>Click to see answer</summary>

**Execute directly.** This is a simple file operation that doesn't require strategic thinking or specialization. Delegation overhead isn't justified.
</details>

### Check 2: Agent Specialization

**Scenario:** You're analyzing 50 customer interviews to identify pain points.

**Question:** Which agent should handle this? Why?

<details>
<summary>Click to see answer</summary>

**Analyst agent.** This is pure research work - analyzing data and identifying patterns. The Analyst specializes in objective research and pattern recognition. The Strategist would synthesize these findings into strategy (next phase), and the Content Creator would write content based on strategy (final phase).
</details>

### Check 3: Context Isolation

**Scenario:** You're halfway through a long conversation about competitive positioning. Now you need to research pricing models.

**Question:** Why is delegation beneficial here?

<details>
<summary>Click to see answer</summary>

**Context isolation.** Your current conversation has filled the context window with positioning discussion. Delegating pricing research to the Analyst gives that task a fresh context window - no baggage from the positioning conversation. The Analyst can focus purely on pricing without interference from unrelated context.
</details>

### Check 4: Output Requirements

**Scenario:** You're delegating competitor research to the Analyst.

**Question:** What must you specify for successful delegation?

<details>
<summary>Click to see answer</summary>

You must specify:
1. **Research question** - What exactly to research
2. **Scope** - Which competitors, what aspects
3. **Output destination** - Exact file path for findings
4. **Format** - How findings should be structured

Without these, the Analyst lacks clear direction and may produce unusable results.
</details>

---

## Practical Exercise

### Exercise: Create a Custom Sub-agent

**Scenario:** You frequently need to analyze social media engagement data to identify top-performing content themes.

**Task:** Create a custom "Engagement Analyst" sub-agent.

**Steps:**

1. **Define identity**
   - What does this agent specialize in?
   - What's their core expertise?

2. **Define responsibilities**
   - What tasks do they handle?
   - What do they NOT do?

3. **Define input/output**
   - What information do they need?
   - What do they deliver?

4. **Write the agent file**
   - Create `/.claude/agents/engagement-analyst.md`
   - Structure using the patterns from this class

5. **Test delegation**
   - Ask Operations Manager to delegate a task
   - Observe behavior and outputs
   - Iterate on the agent definition

**Success criteria:**
- Agent has clear specialized focus
- Boundaries are well-defined
- Input/output requirements are explicit
- Delegation produces expected results

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

3. **SessionStart hooks**
   - Define agent identity at session start
   - Replace deprecated output styles
   - Located in `/.claude/output-styles/`

4. **When to delegate vs execute**
   - Delegate for specialized work, clear boundaries, repeated patterns
   - Execute directly for simple operations, high coordination needs, one-off tasks

5. **Delegation patterns**
   - Clear input/output delegation
   - Multi-phase delegation (research → strategy → content)
   - Iterative delegation (refine through cycles)

### How This Builds on Previous Classes

- **Class 1 (Context Problem):** Delegation solves context rot through isolation
- **Class 2 (File System):** Agents coordinate through files, not shared memory
- **Class 3 (AMA Structure):** Agents work on different layers (research, strategy, content)
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

---

## Looking Ahead: Class 7

**Next class:** Claude Code Skills

**Preview:**
- Skills as packaged, reusable workflows
- How skills use delegation internally
- Introduction to the agentic-orchestrating skill
- When to use skills vs commands

**Connection to Class 6:**
- Skills often delegate to sub-agents (what you just learned)
- Skills coordinate multiple agents for complex workflows
- Understanding delegation is prerequisite for understanding skills

---

## Additional Resources

### Reference Documentation

- [/.claude/skills/agentic-orchestrating/references/delegation.md](/.claude/skills/agentic-orchestrating/references/delegation.md) - Detailed delegation patterns
- [/.claude/agents/analyst.md](/.claude/agents/analyst.md) - Example Analyst agent
- [/.claude/agents/strategist.md](/.claude/agents/strategist.md) - Example Strategist agent
- [/.claude/output-styles/operations-manager.md](/.claude/output-styles/operations-manager.md) - Operations Manager identity

### Further Reading

- **CLAUDE.md** - "Agent Coordination & Delegation" section in Core Principles
- **agentic-orchestrating skill** - Classes 8-9 will cover this in depth

### Questions to Explore

1. How do agents coordinate without shared state?
2. When does delegation overhead outweigh benefits?
3. What makes a good agent boundary?
4. How do you design agent handoffs?

You'll explore these questions as you progress through Classes 7-9.

---

**Class 6 Complete!**

You now understand agent delegation - a core concept that enables specialized expertise and context isolation in AMA workflows. In Class 7, you'll learn how skills package delegation patterns into reusable workflows.
