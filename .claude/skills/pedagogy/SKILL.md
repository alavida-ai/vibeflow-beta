---
name: pedagogy
description: Universal framework for effectively explaining complex, technical, or abstract concepts to any audience. This skill should be used when explaining system architecture, technical concepts, workflows, or onboarding users to unfamiliar frameworks. Focuses on teaching methodology, not domain content.
---

# Pedagogy

## Overview

This skill provides a universal framework for explaining complex concepts effectively to any audience. It focuses on pedagogical methods—HOW to teach—not domain content (WHAT to teach).

**Key principle:** Domain knowledge comes from external sources (documentation, MCP servers, existing files). This skill teaches the methodology for translating that knowledge into effective explanations tailored to the audience.

## When to Use This Skill

Use this skill when:
- Explaining system architecture or frameworks to new users
- Teaching technical concepts to non-technical audiences
- Onboarding users to complex systems
- Translating between domains (technical ↔ business, code ↔ marketing)
- Breaking down abstract concepts into understandable pieces
- Adapting explanations based on audience comprehension

**This skill is domain-agnostic.** Whether explaining the AMA system to marketers, API concepts to designers, or database schemas to product managers, the teaching methodology remains the same—only the analogies and context change.

## Core Teaching Framework

### The Five-Step Explanation Process

Follow this process for any explanation, regardless of domain:

#### 1. Assess Audience
**Before explaining, understand who you're teaching.**

Determine:
- What do they already know? (existing mental models)
- What domain are they familiar with? (business, technical, creative)
- What's their learning style? (visual, procedural, conceptual)
- Why do they need this knowledge? (immediate task vs deep understanding)

**See:** `references/audience-assessment.md` for techniques

---

#### 2. Gather Domain Content
**Retrieve accurate information about what you're explaining.**

Sources:
- MCP servers (e.g., MarketingArchitectureDocs for AMA system)
- Documentation files (README.md, technical specs)
- Code or configuration files
- Existing strategy or research files

**This skill does NOT contain domain content—always query authoritative sources first.**

---

#### 3. Choose Explanation Method
**Select the most effective teaching approach for this audience and concept.**

Methods available:
- **Analogy** - Map to familiar concept in their domain
- **Example** - Show concrete instance
- **Visual/Spatial** - Use diagrams or spatial metaphors
- **Discovery** - Guide them to find answer through questions
- **Procedural** - Step-by-step walkthrough
- **Conceptual** - Explain underlying principles
- **Contrast** - Show what it's NOT to clarify what it IS

**See:** `references/explanation-methods.md` for detailed guidance
**See:** `assets/method-selection-guide.md` for decision framework

---

#### 4. Deliver Progressively
**Layer information from simple to complex.**

Progressive delivery pattern:
1. **One-sentence summary** - Simplest possible explanation
2. **Brief explanation + example** - Add context and concrete instance
3. **Detailed breakdown** - Full concept with nuances
4. **Edge cases and advanced topics** - Only when they're ready

**Let audience signals determine how deep to go.**

**See:** `references/understanding-signals.md` for reading comprehension cues

---

#### 5. Adapt in Real-Time
**Monitor understanding and adjust approach.**

Watch for:
- Confusion signals → Simplify, try different method
- Ready for more → Go deeper, add complexity
- Misunderstanding → Correct mental model gently
- Success → Build on it, connect to next concept

**See:** `references/adaptation-patterns.md` for adjustment strategies

---

## Key Pedagogical Principles

### 1. Start from Their Mental Models
Don't impose your framework—meet them where they are.

**Bad:** "Progressive disclosure is a context management pattern where agents load files on-demand."
**Good:** "You know how you don't read an entire book to find one fact? Same idea—the system loads information only when needed."

Map new concepts to existing knowledge in THEIR domain.

---

### 2. The "Why Behind the Why"
Explain not just what/why, but why we care about the why.

**Surface:** "Research is date-stamped because things change"
**Deeper:** "Date-stamping lets you see trends, not just snapshots. If competitors shift from price to quality messaging between Q1 and Q3, that MOVEMENT is where insights hide. Single snapshot can't show you movement."

---

### 3. Active Discovery Over Passive Reception
Guide them to discover answers through questions, not lectures.

**Passive:** "The three folders represent input-process-output flow."
**Active:** "If you were organizing research, what would be the stages? Getting the data... analyzing it... what else? Right—sharing results. That's why we have three folders."

**See:** `references/teaching-techniques.md` for Socratic method patterns

---

### 4. Just-In-Time Context
Provide information right when it's needed, not before.

Don't explain footnoting when teaching folder structure. Explain footnoting when they're creating their first strategy file and need to link to research.

---

### 5. Check Understanding, Not Comprehension
Don't ask "Does that make sense?" (they'll say yes).

Better questions:
- "How would you explain this to a colleague?"
- "What would you do if [scenario]?"
- "Where would you put [specific example]?"

These reveal actual understanding.

---

### 6. Make Mistakes Safe
Normalize confusion and model vulnerability.

Phrases that help:
- "This trips everyone up at first"
- "Great question—it means you're thinking deeply"
- "I got this wrong when I first learned it too"
- "Let me try explaining it differently"

---

### 7. Build on Success
After they understand one concept, connect it to the next.

"You just learned how research domains work. Strategy uses the exact same pattern—same entry point concept, same progressive disclosure. Notice how it clicks now?"

Creates momentum and confidence.

---

### 8. Use Their Language
Mirror their terminology until they naturally adopt the formal terms.

If they say "organizing competitor intel," don't force "research domain"—use "organizing competitor intel" until they're comfortable with the formal term.

---

### 9. Multi-Modal Explanation
Different people learn differently—offer multiple paths.

For the same concept, provide:
- Visual/spatial metaphor
- Procedural steps
- Conceptual explanation
- Concrete example

Let them choose or combine approaches.

**See:** `references/explanation-methods.md` for all available modes

---

### 10. Teach How to Learn
Don't just answer questions—show them how to find answers themselves.

"You asked about voice files. Let me show you how I'd find that: Start with STRATEGY.md, look for 'voice' section... Now YOU try finding where messaging lives."

Builds independence.

---

## Domain Application Pattern

**This skill is domain-agnostic. Apply it to any subject matter:**

### Example: Explaining AMA System to Marketers

1. **Assess:** Marketers understand campaigns, brand guidelines, messaging hierarchies
2. **Gather:** Query MarketingArchitectureDocs MCP for AMA concepts
3. **Choose Method:**
   - Use business analogies (/strategy/ = "brand bible")
   - Map to familiar concepts (messaging hierarchy → file hierarchy)
4. **Deliver Progressively:**
   - L1: "Three main folders: strategy, research, system config"
   - L2: "Strategy is like your brand guidelines binder..."
   - L3: "Here's how files connect with footnotes..."
5. **Adapt:** Watch for confusion about technical terms, simplify

### Example: Explaining API Concepts to Designers

1. **Assess:** Designers understand component libraries, design systems, workflows
2. **Gather:** Read API documentation
3. **Choose Method:**
   - Use design analogies (API = "component library for data")
   - Visual diagrams showing request/response flow
4. **Deliver Progressively:**
   - L1: "An API lets different apps talk to each other"
   - L2: "Like Figma components—define once, use everywhere"
   - L3: "Here's how authentication works..."
5. **Adapt:** Offer to show real API call with their design tool

**The methodology stays the same—only domain anchors change.**

---

## Resources

### references/

**audience-assessment.md** - Techniques for identifying audience mental models:
- Questions to ask to understand their background
- How to map their domain knowledge
- Identifying learning styles
- Determining explanation depth needed

**explanation-methods.md** - Detailed guide to teaching methods:
- When to use analogies vs examples vs diagrams
- How to construct effective analogies
- Creating discovery questions (Socratic method)
- Visual/spatial metaphor techniques
- Procedural vs conceptual explanation trade-offs

**teaching-techniques.md** - Advanced pedagogical patterns:
- The Anchor Technique (known → unknown)
- The Discovery Question Pattern
- The Reflection Loop
- The Failure Forward Technique
- The Pattern Recognition Build
- The Complexity Ladder
- The "What Would You Do?" Method

**understanding-signals.md** - Reading audience comprehension:
- Confusion signals and how to respond
- Ready-for-more signals
- Misunderstanding indicators
- Success markers
- When to slow down vs speed up

**adaptation-patterns.md** - Real-time adjustment strategies:
- Switching explanation methods mid-stream
- Simplifying without condescending
- Going deeper when they're ready
- Correcting misunderstandings gracefully
- Building on partial understanding

### assets/

**method-selection-guide.md** - Decision framework for choosing explanation methods:
- Concept type → Best method mapping
- Audience type → Method preferences
- Time constraints → Quick vs thorough approaches
- Decision tree for method selection

**audience-profiles.md** - Common audience types and how to teach them:
- Marketers (business analogies, campaign examples)
- Developers (code examples, technical precision)
- Designers (visual metaphors, component thinking)
- Product managers (user stories, value framing)
- Executives (high-level, ROI-focused)

---

## Integration with Documentation Sources

**Pattern for using this skill with external documentation:**

1. **Identify what needs explaining** (e.g., "progressive disclosure in AMA system")
2. **Use this skill to assess audience** (marketers, non-technical)
3. **Query appropriate documentation source** (MarketingArchitectureDocs MCP)
4. **Use this skill to choose method** (analogy + example)
5. **Deliver using pedagogical framework** (progressive, adaptive)
6. **Reference documentation for "learn more"** (point to CLAUDE.md)

**This skill provides the HOW. Documentation provides the WHAT.**

---

## Quick Reference: Explanation Workflow

```
Question received
    ↓
Assess audience (references/audience-assessment.md)
    ↓
Gather domain content (MCP, docs, files)
    ↓
Choose method (assets/method-selection-guide.md)
    ↓
Deliver Layer 1 (one sentence)
    ↓
Watch signals (references/understanding-signals.md)
    ↓
Adapt approach (references/adaptation-patterns.md)
    ↓
    ├─ Confusion → Simplify, try different method
    ├─ Ready → Layer 2 or 3
    └─ Success → Build to next concept
```

---

## Examples Across Domains

### Technical Concept to Non-Technical Audience
**Concept:** Git version control
**Audience:** Marketing team
**Method:** Analogy
**Delivery:** "Git is like track changes in Google Docs—it saves every version so you can see who changed what and when. Except for code."

### Abstract Framework to Business Audience
**Concept:** Progressive disclosure pattern
**Audience:** Product managers
**Method:** Example + Contrast
**Delivery:** "Remember opening a huge Figma file and it freezing? Progressive disclosure is the opposite—load what you need, when you need it. Like Netflix loading the next episode, not the whole season."

### System Architecture to New Users
**Concept:** Three-folder research pattern
**Audience:** Researchers (non-technical)
**Method:** Procedural + Visual
**Delivery:** "Think of it as three stages: (1) Collect raw data here, (2) Analyze in dated folders here, (3) Final reports go here. Input → Processing → Output."

**In each case, the pedagogy skill methodology is the same—only the analogies and context adapt to the domain.**