# AMA Fundamentals Course: Complete Outline

## Course Overview

### What Students Will Learn

This course teaches the Agentic Marketing Architecture (AMA) methodology from the ground up, starting with how large language models actually work and progressing to advanced multi-agent orchestration patterns. Students will learn both the conceptual foundations and practical implementation of a file-based system that enables AI agents to collaborate on complex marketing workflows.

**Core Learning Outcomes:**
- Understand how LLMs process information and their fundamental limitations
- Design file structures that enable effective AI agent collaboration
- Implement the three-layer marketing framework (Research → Strategy → Content)
- Orchestrate complex workflows using the PLAN.md/TODO.md pattern
- Navigate and extend the AMA architecture with confidence
- Create verifiable, traceable marketing outputs with full audit trails

### Prerequisites

**None.** This course starts from first principles and builds up progressively. No prior knowledge of AI, prompt engineering, or software development is required, though both marketing professionals and developers will find value at different depths.

### Target Audience

**Primary:** Marketing Architects who want to leverage AI agents for brand strategy and content creation
**Secondary:** Developers interested in agentic systems and file-based AI architectures

### Estimated Time Commitment

**Total:** 12-15 hours
- Reading: 8-10 hours
- Hands-on exercises: 4-5 hours
- Spread across 8 classes (1.5-2 hours each)

### Learning Approach

This course follows a **progressive disclosure** philosophy:
1. **Conceptual foundations first** - Understand WHY before HOW
2. **Real examples throughout** - Every concept tied to actual AMA implementation
3. **Hands-on practice** - Apply concepts immediately in realistic scenarios
4. **Dual-track learning** - Core content for all, with technical deep dives and marketing applications
5. **Build-up pattern** - Each class assumes and builds on previous classes

---

## Complete Class Breakdown

### Class 1: How LLMs Actually Work

**Tagline:** Understanding the machine you're talking to

**Learning Objectives:**
- Understand how LLMs process text (tokens, context windows, attention)
- Recognize fundamental LLM limitations (no memory, stateless, context overflow)
- Identify why traditional approaches fail with complex tasks
- Explain the relationship between context size and output quality
- Define what "context management" means and why it matters

**Key Concepts Covered:**
- Tokens and tokenization (words → numbers)
- Context windows and their limits (why you can't dump everything)
- Stateless execution (every conversation starts fresh)
- Attention mechanisms (how LLMs "focus" on relevant information)
- Deterministic vs probabilistic behavior
- Context overflow and degradation patterns

**Prerequisites:** None

**Estimated Time:** 1.5 hours (1 hour reading, 30 min exercises)

**Success Metrics:**
- Can explain in plain language why LLMs forget things
- Can identify when a task is too complex for a single prompt
- Understands why file-based systems help LLMs work better
- Can predict when context overflow will occur

**Technical Deep Dive:** Token counting, temperature settings, embedding spaces
**Marketing Application:** Why your brand guidelines need structure, not just content

---

### Class 2: The Context Problem (And Why Files Are The Solution)

**Tagline:** From overwhelming dumps to selective loading

**Learning Objectives:**
- Identify the "context dumping" anti-pattern and its consequences
- Understand progressive disclosure as a solution strategy
- Explain how file systems enable context management
- Compare monolithic vs modular information architecture
- Design file structures that support selective loading

**Key Concepts Covered:**
- The context dumping problem (too much → nothing works)
- Progressive disclosure principle (load what's needed, when needed)
- File systems as knowledge graphs
- Markdown references as navigation paths
- Signal-to-noise ratio in context
- Separation of concerns in file organization

**Prerequisites:** Class 1 (LLM fundamentals)

**Estimated Time:** 1.5 hours (1 hour reading, 30 min exercises)

**Success Metrics:**
- Can identify context dumping in real examples
- Can design a simple file structure for a given domain
- Understands why paths are better than content inlining
- Can explain progressive disclosure to a non-technical person

**Technical Deep Dive:** File system traversal, reference resolution, context budgets
**Marketing Application:** How to structure brand guidelines so AI can actually use them

---

### Class 3: The Three-Layer Marketing Framework

**Tagline:** Research → Strategy → Content (and why order matters)

**Learning Objectives:**
- Explain the purpose and characteristics of each layer (Research, Strategy, Content)
- Understand why layers must flow in sequence (no skipping)
- Identify appropriate content for each layer
- Apply the "execution vs index" pattern
- Navigate the `/brand/` directory structure with confidence

**Key Concepts Covered:**
- The three layers: Input (Research), Processing (Strategy), Output (Content)
- Domain organization within each layer
- Temporal execution pattern (date-stamped folders)
- Index files vs execution outputs
- CHANGELOG.md for evolution tracking
- Information flow (Research → Strategy → Content)

**Prerequisites:**
- Class 1 (LLM fundamentals)
- Class 2 (File-based context management)

**Estimated Time:** 2 hours (1.5 hours reading, 30 min exercises)

**Success Metrics:**
- Can explain why Research must come before Strategy
- Can identify which layer a piece of information belongs in
- Understands the difference between execution folders and index files
- Can navigate the Marketing Framework directory structure
- Knows when to create a new execution vs update an index

**Technical Deep Dive:** Directory traversal patterns, file resolution logic
**Marketing Application:** How to organize competitive analysis, positioning, and content briefs

---

### Class 4: Entry Points and Navigation

**Tagline:** How humans and AI find what they need

**Learning Objectives:**
- Identify the purpose of entry point files (STRATEGY.md, RESEARCH.md, etc.)
- Use markdown references to create navigation paths
- Apply the Extension Pattern for platform-specific variations
- Navigate between related documents using reference chains
- Design hierarchical information structures

**Key Concepts Covered:**
- Entry point files as indexes (STRATEGY.md, RESEARCH.md, CONTENT.md)
- Markdown reference format: `[text](/path/to/file.md)`
- Relative paths from workspace root
- Extension Pattern: Base + Extension = Complete Context
- Platform-specific extensions (twitter/EXTENSION.md, linkedin/EXTENSION.md)
- "Organize by concern, navigate by entry point, reference by path"

**Prerequisites:**
- Class 1 (LLM fundamentals)
- Class 2 (File-based context)
- Class 3 (Three-layer framework)

**Estimated Time:** 1.5 hours (1 hour reading, 30 min exercises)

**Success Metrics:**
- Can create properly formatted markdown references
- Can design an extension structure for multi-platform content
- Understands when to use extensions vs separate domains
- Can follow reference chains to verify claims
- Knows how to make information discoverable to both humans and AI

**Technical Deep Dive:** Path resolution, extension composition, reference graph traversal
**Marketing Application:** Creating Twitter-specific voice extensions, multi-channel strategy organization

---

### Class 5: Verifiable Audit Trails

**Tagline:** Every claim has evidence (and you can follow the chain)

**Learning Objectives:**
- Create verifiable chains from content → strategy → research → data
- Apply markdown references to establish evidence trails
- Understand the relationship between claims and citations
- Design research structures that preserve source material
- Validate the defensibility of strategy documents

**Key Concepts Covered:**
- The audit trail chain: Content → Strategy → Research → Data
- Evidence-based strategy (not opinions)
- Markdown references as citation system
- Raw data preservation in `/data/` folders
- Contradiction handling through temporal executions
- Human + AI navigation of evidence chains

**Prerequisites:**
- Class 1 (LLM fundamentals)
- Class 2 (File-based context)
- Class 3 (Three-layer framework)
- Class 4 (Entry points and navigation)

**Estimated Time:** 1.5 hours (1 hour reading, 30 min exercises)

**Success Metrics:**
- Can trace a piece of content back to its research source
- Can identify gaps in evidence chains
- Understands why audit trails matter for brand consistency
- Can design research structures that preserve sources
- Can validate whether a strategy claim is supported

**Technical Deep Dive:** Reference validation, broken link detection, evidence graph construction
**Marketing Application:** Defending positioning decisions, tracing content to brand principles

---

### Class 6: Agent Coordination and Delegation

**Tagline:** The right specialist for the right task

**Learning Objectives:**
- Understand the Operations Manager + Sub-agent pattern
- Identify when to delegate vs execute directly
- Apply context-aware delegation strategies
- Design agent handoffs that maintain focus
- Implement stateless execution patterns

**Key Concepts Covered:**
- Agentic Framework structure (`/.claude/`)
- Operations Manager role (orchestration, not execution)
- Sub-agent specialists (Analyst, Strategist, etc.)
- Delegation triggers (task complexity, specialization needs)
- Context passing (paths, not content)
- Stateless execution principle
- Agent identity and capability definitions

**Prerequisites:**
- Class 1 (LLM fundamentals)
- Class 2 (File-based context)
- Class 3 (Three-layer framework)
- Class 4 (Entry points and navigation)
- Class 5 (Audit trails)

**Estimated Time:** 2 hours (1.5 hours reading, 30 min exercises)

**Success Metrics:**
- Can identify when delegation is appropriate
- Can design a delegation strategy for a complex task
- Understands the difference between orchestration and execution
- Can define a sub-agent's capabilities and constraints
- Knows how to pass context efficiently between agents

**Technical Deep Dive:** Agent prompt engineering, context isolation, delegation patterns
**Marketing Application:** When to delegate competitive analysis vs voice development

---

### Class 7: Workflow Execution (PLAN.md/TODO.md Pattern)

**Tagline:** Making complex work visible and resumable

**Learning Objectives:**
- Apply the PLAN.md/TODO.md pattern for complex workflows
- Break down multi-phase tasks into manageable steps
- Track progress transparently through TODO.md updates
- Understand artifact management and naming conventions
- Implement resumable workflows

**Key Concepts Covered:**
- Standard execution folder structure
- PLAN.md: Approach and phase breakdown
- TODO.md: Progress tracking and resumability
- Artifact management (`/artifacts/` with numbered files)
- Phase dependencies and sequencing
- "One task in-progress" principle
- Resumption from specific phases
- Marketing Architect approval checkpoints

**Prerequisites:**
- Class 1 (LLM fundamentals)
- Class 2 (File-based context)
- Class 3 (Three-layer framework)
- Class 4 (Entry points and navigation)
- Class 5 (Audit trails)
- Class 6 (Agent coordination)

**Estimated Time:** 2 hours (1.5 hours reading, 30 min exercises)

**Success Metrics:**
- Can create a PLAN.md for a multi-phase workflow
- Can track progress accurately through TODO.md
- Understands artifact naming conventions
- Can identify appropriate phase boundaries
- Knows when to resume vs restart a workflow

**Technical Deep Dive:** Phase isolation, artifact versioning, state management
**Marketing Application:** Planning and executing a competitive analysis workflow, strategy synthesis process

---

### Class 8: Hands-On Mastery (Putting It All Together)

**Tagline:** From understanding to execution

**Learning Objectives:**
- Execute a complete Research → Strategy → Content workflow
- Apply all AMA patterns in an integrated scenario
- Make architectural decisions with confidence
- Troubleshoot common issues independently
- Extend AMA for new use cases

**Key Concepts Covered:**
- End-to-end workflow execution (all three layers)
- Decision-making frameworks (when to delegate, when to extend, etc.)
- Common patterns and anti-patterns
- Troubleshooting guide
- Extension strategies for new domains
- Performance optimization techniques

**Prerequisites:**
- Class 1 (LLM fundamentals)
- Class 2 (File-based context)
- Class 3 (Three-layer framework)
- Class 4 (Entry points and navigation)
- Class 5 (Audit trails)
- Class 6 (Agent coordination)
- Class 7 (Workflow execution)

**Estimated Time:** 2.5 hours (1 hour reading, 1.5 hours hands-on)

**Success Metrics:**
- Can execute a complete workflow from scratch
- Can diagnose and fix common issues
- Can make architectural decisions independently
- Can extend AMA with new domains or workflows
- Can teach core concepts to others

**Technical Deep Dive:** Performance profiling, optimization strategies, custom skill creation
**Marketing Application:** Complete case study from competitive research to published content

---

## Learning Progression

### How Each Class Builds On Previous Ones

**Foundation (Classes 1-2):**
- **Class 1** establishes why LLMs need help (limitations, context issues)
- **Class 2** introduces the solution strategy (files, progressive disclosure)
- Together: Students understand the fundamental problem and approach

**Architecture (Classes 3-5):**
- **Class 3** shows the high-level structure (three layers)
- **Class 4** teaches navigation within that structure (entry points, extensions)
- **Class 5** adds verifiability (audit trails)
- Together: Students can design and navigate information architecture

**Orchestration (Classes 6-7):**
- **Class 6** introduces multiple agents working together
- **Class 7** shows how to coordinate complex multi-phase work
- Together: Students can orchestrate sophisticated workflows

**Integration (Class 8):**
- Synthesizes all previous concepts
- Provides hands-on practice with real scenarios
- Builds independent problem-solving capability

### Why This Sequence Makes Pedagogical Sense

**1. Problem → Solution → Application**
- Start with the problem (LLM limitations)
- Introduce the solution (file-based architecture)
- Apply to real use case (marketing workflows)

**2. Concrete → Abstract → Practical**
- Begin with tangible concepts (files, folders)
- Progress to abstract patterns (progressive disclosure, delegation)
- End with practical application (complete workflows)

**3. Individual → Collaborative → Complex**
- Start with single agent behavior
- Move to multi-agent coordination
- Finish with complex orchestrated workflows

**4. Read → Navigate → Create**
- First learn to read existing structures
- Then learn to navigate between related parts
- Finally learn to create new structures

### Handling Different Skill Levels

**For Marketing Architects (less technical background):**
- Focus on conceptual understanding and practical application
- Skip or skim "Technical Deep Dive" sections
- Emphasize "Marketing Application" examples
- Can progress linearly through all classes

**For Developers (more technical background):**
- May move faster through Classes 1-4 (familiar with file systems)
- Should still read Classes 5-8 carefully (AMA-specific patterns)
- Engage deeply with "Technical Deep Dive" sections
- Consider implementing custom extensions as exercises

**For All Students:**
- Classes 1-3 are essential foundation (don't skip)
- Classes 4-5 can be combined if confident
- Classes 6-8 require full attention regardless of background
- Class 8 is the synthesis - never skip

---

## Success Metrics

### How Students Know They've Mastered Each Class

**Class 1 (LLMs):**
- Can explain token limits to a non-technical person
- Can predict when a task will exceed context limits
- Understands why "dump everything in" doesn't work

**Class 2 (Context/Files):**
- Can identify context dumping in examples
- Can design a simple file structure
- Understands the value of selective loading

**Class 3 (Three Layers):**
- Can categorize information into Research/Strategy/Content
- Can navigate the `/brand/` directory confidently
- Understands execution vs index pattern

**Class 4 (Navigation):**
- Can create properly formatted markdown references
- Can design extension structures
- Can follow reference chains

**Class 5 (Audit Trails):**
- Can trace content back to research
- Can identify gaps in evidence
- Can design verifiable structures

**Class 6 (Agents):**
- Can identify delegation opportunities
- Can design context-efficient handoffs
- Understands orchestration vs execution

**Class 7 (Workflows):**
- Can create PLAN.md for complex tasks
- Can track progress through TODO.md
- Can resume interrupted workflows

**Class 8 (Integration):**
- Can execute end-to-end workflows
- Can troubleshoot independently
- Can extend AMA for new use cases

### What Students Should Be Able to Do After Completing the Course

**Immediately (Day 1 post-course):**
- Navigate the AMA workspace with confidence
- Read and understand existing strategy documents
- Follow audit trails from content to research
- Identify when to delegate to specialist agents

**Within First Week:**
- Execute simple research workflows
- Create new content using existing strategy
- Organize findings into proper domains
- Use PLAN.md/TODO.md for multi-step tasks

**Within First Month:**
- Plan and execute complete research projects
- Synthesize research into strategy documents
- Generate on-brand content across platforms
- Extend AMA with new domains or workflows
- Make architectural decisions independently

**Mastery Level (3+ months):**
- Design custom workflows for unique needs
- Optimize performance for large knowledge bases
- Teach AMA concepts to others
- Contribute improvements to the system
- Create new sub-agents and skills

---

## Course Design Philosophy

### Core Principles

1. **No assumed knowledge** - Start from absolute basics
2. **Progressive complexity** - Each class adds one layer
3. **Real examples** - Every concept tied to actual implementation
4. **Dual perspectives** - Marketing + Developer views throughout
5. **Hands-on practice** - Apply immediately, don't just read
6. **Build confidence** - Success metrics at every stage

### Pedagogical Approach

- **Explain WHY before HOW** - Motivation precedes mechanism
- **Show, don't just tell** - Real examples from AMA workspace
- **Practice makes permanent** - Exercises reinforce each concept
- **Connect to prior knowledge** - Marketing analogies, dev patterns
- **Verify understanding** - Clear success metrics per class

### Differentiation Strategy

**For different audiences:**
- Core content accessible to all
- "Technical Deep Dive" callouts for developers
- "Marketing Application" examples for practitioners
- Both learn from each other's perspective

**For different learning styles:**
- Visual learners: Diagrams, folder structures, flow charts
- Reading learners: Detailed explanations, documentation references
- Kinesthetic learners: Hands-on exercises throughout
- Analytical learners: Technical deep dives, architectural decisions

---

## Next Steps

This outline provides the foundation for Stage 2 (detailed class content creation). Each class should be developed as a standalone module with:

1. **Lesson content** (markdown document)
2. **Code examples** (real AMA files as references)
3. **Exercises** (hands-on practice scenarios)
4. **Solutions** (expected outcomes with explanations)
5. **Further reading** (references to AMA documentation)

The course will be delivered as a Claude Code skill, enabling students to learn within the actual AMA workspace, seeing real examples and practicing with live files.
