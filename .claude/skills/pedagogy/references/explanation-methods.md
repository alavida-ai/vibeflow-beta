# Explanation Methods

Detailed guide to teaching methods and when to use each.

## The Seven Core Methods

### 1. Analogy - Bridge to Familiar Concepts

**When to use:**
- Explaining abstract or unfamiliar concepts
- Audience has strong domain knowledge in another area
- Need quick comprehension of new idea

**How to construct effective analogies:**

1. **Identify the target concept's core characteristics**
   - What does it DO?
   - What problem does it SOLVE?
   - What are its KEY properties?

2. **Find analogous concept in audience's domain**
   - What do THEY know that works similarly?
   - Where do they see this pattern already?

3. **Map explicitly**
   - "X is like Y because [shared characteristic]"
   - Point out where analogy breaks down (limits)

**Examples across domains:**

| Concept | Audience | Analogy |
|---------|---------|---------|
| Progressive disclosure | Marketers | "Like a messaging hierarchy—high-level first, details on demand" |
| API | Designers | "Component library for data—define once, use everywhere" |
| Git branches | Product managers | "Like feature flags—isolate changes until ready to merge" |
| Date-stamped folders | Researchers | "Research snapshots—preserves history for trend analysis" |

**Pitfalls:**
- ❌ Using analogies from unfamiliar domains
- ❌ Not explaining where analogy breaks down
- ❌ Mixing metaphors ("It's like a tree that flows like a river...")

---

### 2. Example - Show Concrete Instance

**When to use:**
- After analogy, to make it concrete
- Audience is task-oriented
- Abstract explanation isn't landing

**Types of examples:**

**Real example** (from their actual work):
- "Your customer interviews would go in /research/customer-insight/data/"
- Most powerful—immediately relevant

**Realistic example** (typical use case):
- "Most teams put competitive analysis in /research/category-landscape/"
- Relatable, shows common patterns

**Hypothetical example** (constructed scenario):
- "Imagine you're analyzing Q1 vs Q3 competitor messaging..."
- Good for illustrating principles

**Best practices:**
- Start simple, add complexity
- Use examples from THEIR domain
- Show both correct and incorrect (contrast)

---

### 3. Visual/Spatial - Diagrams and Spatial Metaphors

**When to use:**
- Explaining structure or relationships
- Visual learners (watch for "show me" language)
- Complex systems with multiple parts

**Visual techniques:**

**Spatial metaphors:**
```
Workspace = Office building
├── /strategy/ = Conference room (polished, presentation-ready)
├── /research/ = Research lab (raw data, experiments)
└── /.claude/ = Operations manual (how systems work)
```

**Flow diagrams:**
```
Raw data → Analysis → Report → Strategy → Content
```

**Hierarchy diagrams:**
```
STRATEGY.md (entry point)
    ├─ /core/ (fundamental positioning)
    ├─ /messaging/ (themes and messages)
    └─ /voice/ (tone and style)
```

**Relationship maps:**
- Show how pieces connect
- Illustrate dependencies
- Reveal patterns

---

### 4. Discovery - Socratic Method (Guide to Answer)

**When to use:**
- Building deep understanding (not just quick answer)
- Audience is engaged and has time
- Want them to internalize, not just memorize

**The question pattern:**

1. **Start with what they know**
   - "When you organize marketing campaigns, what stages do you go through?"

2. **Guide toward the new concept**
   - "Right—planning, execution, results. What if you were organizing research?"

3. **Let them discover the connection**
   - "Exactly! Same pattern: collect data, analyze, produce report. That's why we have three folders."

**Question types:**

| Question Type | Purpose | Example |
|--------------|---------|---------|
| Recall | Activate existing knowledge | "What tools do you use for...?" |
| Analyze | Break down concept | "What are the stages of...?" |
| Compare | Find similarities | "How is this similar to...?" |
| Apply | Test understanding | "Where would you put...?" |
| Synthesize | Build new connections | "How does this relate to...?" |

**Benefits:**
- Deeper retention
- Builds confidence ("I figured it out!")
- Reveals gaps in understanding

**Pitfalls:**
- Takes more time
- Can frustrate task-oriented learners
- Requires engagement from audience

---

### 5. Procedural - Step-by-Step Walkthrough

**When to use:**
- Immediate task to complete
- Procedural learners ("how do I..." questions)
- Building muscle memory for repeated actions

**Structure:**

1. **State the goal**
   - "We're going to organize your customer interviews"

2. **Break into numbered steps**
   - Clear, sequential, actionable

3. **Show, then do together**
   - Demonstrate once
   - Guide them through it
   - Watch them do it independently

**Example format:**
```
To create a research domain:
1. Create folder: /research/{domain-name}/
2. Inside, create three subfolders: data/, exports/, and a date-stamped folder
3. Put raw materials in data/
4. Create RESEARCH.md as your entry point
5. Start analysis in the date-stamped folder
```

**Tips:**
- Use numbered lists (creates clear sequence)
- One action per step
- Explain WHY at key decision points
- Offer to do it together first time

---

### 6. Conceptual - Explain Underlying Principles

**When to use:**
- "Why does it work this way?" questions
- Building transferable understanding
- Conceptual learners
- Need to handle edge cases independently

**The principle-first approach:**

1. **Explain the problem being solved**
   - "Without date-stamping, you can't see how things change over time"

2. **Show the principle that solves it**
   - "Temporal patterns preserve history for trend analysis"

3. **Demonstrate the application**
   - "That's why research uses /2025-10-23/ folders—you can compare October to December"

4. **Show how it generalizes**
   - "This same principle applies anytime you track evolution"

**"Why Behind the Why":**
- Don't stop at surface explanation
- Go deeper: why do we CARE about the why?
- Connect to their goals/needs

**Example:**
- Surface: "Research is date-stamped"
- Deeper: "So you can track changes"
- Deepest: "Because strategy insights hide in MOVEMENT, not snapshots"

---

### 7. Contrast - Show What It's NOT

**When to use:**
- Correcting misunderstandings
- Distinguishing similar concepts
- When positive definition isn't landing

**Contrast patterns:**

**Before/After:**
- "Without progressive disclosure, you'd load everything at once and it'd be overwhelming"
- "With it, you get information when needed"

**This vs That:**
```
| Skills | Commands |
|--------|----------|
| How-to guides | Workflow triggers |
| Knowledge base | Shortcuts |
| Referenced when needed | Executed directly |
```

**Correct vs Incorrect:**
- ✅ "Files go in /strategy/ when they're polished brand guidelines"
- ❌ "Not when they're exploratory or evolving—that's /research/"

**Benefits:**
- Clarifies boundaries
- Prevents common mistakes
- Sharpens understanding

---

## Method Selection Decision Tree

```
What's the concept type?
    │
    ├─ Abstract/unfamiliar → Analogy first
    ├─ Process/workflow → Procedural
    ├─ Structure/system → Visual/Spatial
    └─ Principle/theory → Conceptual
         ↓
What's the audience learning style?
    │
    ├─ Visual → Diagrams, spatial metaphors
    ├─ Procedural → Step-by-step, hands-on
    └─ Conceptual → Principles, why it works
         ↓
What's their immediate need?
    │
    ├─ Do specific task → Procedural + Example
    ├─ Build understanding → Conceptual + Analogy
    └─ Quick answer → Example only
         ↓
How much time?
    │
    ├─ < 1 min → Example
    ├─ 2-5 min → Analogy + Example
    └─ 5+ min → Discovery or Conceptual
```

---

## Combining Methods

**Most effective explanations use multiple methods:**

**Analogy → Example → Procedural:**
1. "Progressive disclosure is like need-to-know information" (analogy)
2. "STRATEGY.md is an entry point—you don't read all files at once" (example)
3. "Here's how to find brand voice: Open STRATEGY.md, look for voice section..." (procedural)

**Conceptual → Visual → Discovery:**
1. "The principle is: preserve temporal context for trend analysis" (conceptual)
2. [Show diagram of /2025-10/ vs /2025-12/ comparison] (visual)
3. "If you ran competitor research twice, what would you want to compare?" (discovery)

**Match methods to audience progression:**
- Confused → Try different method
- Understanding basics → Add depth with another method
- Ready to apply → Procedural walkthrough

---

## Method-Specific Tips

### Analogies
- Use from THEIR domain, not yours
- Explicitly state where analogy breaks down
- Test: "Does this analogy work for you?"

### Examples
- Prefer real > realistic > hypothetical
- Show both correct and incorrect
- Make them as concrete as possible

### Visual/Spatial
- ASCII diagrams work when visual tools unavailable
- Use consistent spatial metaphors
- Label clearly

### Discovery
- Be patient—let them think
- Guide with questions, don't tell
- Celebrate when they discover it

### Procedural
- Number the steps clearly
- One action per step
- Offer to do it together

### Conceptual
- Start with the problem it solves
- Connect to their goals
- Show how it generalizes

### Contrast
- Be gentle when correcting
- Use to sharpen boundaries
- Pair with positive explanation
