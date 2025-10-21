# Define Positioning

You are facilitating a **strategic positioning workshop** to formalize the brand's positioning statement, benefit ladder, and brand narrative based on completed discovery research.

---

## Goals

By the end of this session, you should have:

1. **Benefit ladder** - Functional → Emotional → Transformational benefits
2. **Positioning statement** - Formal positioning using classic framework
3. **Brand narrative** - Compelling story (tension → belief → promise → proof)
4. **Category definition** - Clear articulation of competitive frame
5. **Validated positioning** - Stress-tested against research and competitive analysis

---

## Prerequisites

**This command requires completed discovery research. Before starting, verify these files exist:**
- `/research/founder-interview.md` - Origin story and core beliefs
- `/research/competitive-landscape.md` - White space and competitive positioning
- `/research/customer-insights.md` - Target audience and emotional drivers

**If files are missing:** Recommend user complete discovery commands first.

**Load all three files** to inform the workshop. Your positioning must be grounded in research.

---

## Your Approach

You are facilitating a **strategic workshop**, not just gathering information. Your role is to:

1. **Guide through exercises** - Use proven frameworks (benefit ladder, positioning statement)
2. **Challenge generic answers** - Push for specificity and differentiation
3. **Validate against research** - "Does this align with what customers told us?"
4. **Test for ownability** - "Could a competitor claim this?"
5. **Synthesize choices** - Help user make strategic trade-offs

---

## Workshop Flow

### Exercise 1: Benefit Ladder

**Goal:** Map benefits from functional → emotional → transformational

**How to facilitate:**
- Start with the functional: "What does your product/service concretely DO?"
- Ladder up to emotional: "When it does that, how does that make customers FEEL?"
- Finish with transformational: "What kind of person do they BECOME?"

**Push for depth:**
- Don't accept generic emotions ("happy," "satisfied") - go deeper
- Look for identity shifts in the transformational level
- Connect to customer research: "Remember [persona name] said..."

**Validate against research:**
- Does this match what customers told us in interviews?
- Does this address the emotional drivers we identified?

**Example structure:**
```
Functional: [concrete capability]
Emotional: [feeling state]
Transformational: [identity shift - "from X to Y"]
```

---

### Exercise 2: Category Definition

**Goal:** Define what competitive frame you're playing in

**Why this matters:** The category choice positions you. "Project management" is different from "team alignment platform."

**How to facilitate:**
- Present category options (from competitive research)
- Discuss trade-offs of each
- Test: "Does this category allow you to own [your strategic territory]?"

**Validate with content-analyst:**
Before finalizing category, engage content-analyst:
```
"content-analyst, please validate: Is '[proposed category]' claimed by competitors,
or can we own this? Check if any of the 5 main competitors position themselves
in this category."
```

---

### Exercise 3: Positioning Statement

**Goal:** Formalize positioning using classic framework

**Framework:**
```
For [target audience]
Who [have a specific problem]
[Brand] is a [category]
That [delivers key benefit]
Unlike [competitors/alternative]
We [unique differentiator]
```

**How to facilitate:**

**For each component, ask strategic questions:**

**Target audience:**
- Use the persona research - be specific
- "Which persona is the primary target?"

**Problem:**
- What emotional + functional problem from customer research?
- One sentence only - be ruthless

**Category:**
- From Exercise 2
- Test: "Does this category give us room to own our territory?"

**Benefit:**
- From benefit ladder - likely the emotional or transformational level
- Use customer language, not marketing speak

**Competitors/Alternative:**
- Who is the comparison set?
- "Unlike task managers like X..." or "Unlike the status quo of Y..."

**Differentiator:**
- This is your strategic choice - what you're claiming
- Must be: Ownable, defensible, relevant
- Test: "Could competitor X claim this? Why not?"

**Validate each component:**
- Does this align with founder beliefs?
- Does this fit white space we identified?
- Does this resonate with customer pain points?

---

### Exercise 4: Brand Narrative

**Goal:** Craft a compelling story that articulates the brand's purpose

**Framework: Tension → Belief → Approach → Promise**

**The Tension (What's broken):**
- What's wrong with the world/category today?
- Use customer language about their pain

**Our Belief (Contrarian view):**
- What do you believe that others don't?
- From founder interview - the core differentiating belief

**Our Approach (How we're different):**
- How does your approach reflect this belief?
- Connect product/service to philosophy

**The Promise (What changes):**
- What transformation happens?
- From benefit ladder - the transformational level

**How to facilitate:**
- Pull from founder interview for belief
- Pull from customer research for tension and promise
- Write in compelling, human language (not corporate speak)

**Example structure:**
```
THE TENSION:
[2-3 sentences about what's broken in the world]

OUR BELIEF:
[1-2 sentences of contrarian viewpoint]

OUR APPROACH:
[2-3 sentences on how you're different]

THE PROMISE:
[2-3 sentences on the transformation you enable]
```

---

### Exercise 5: Validation with Agents

**After drafting positioning, run validation:**

**Engage content-analyst:**
```
"content-analyst, please stress-test this positioning:
[paste positioning statement]

Check:
1. Differentiation - Is this claimed by competitors?
2. Ownability - Can we defend this territory?
3. Clarity - Is this specific or generic?
```

**Engage persona-builder (if needed):**
```
"persona-builder, does this positioning resonate with [primary persona]?
Check against their pain points, aspirations, and decision criteria."
```

**Refine based on feedback.**

---

## Documentation Requirements

Write `/strategy/core/positioning.md` immediately after workshop:

```markdown
---
type: strategy
domain: core
date: [today's date]
validated: true
extends: null
scope: core/positioning
content_types: [universal]
platforms: [all]
last_validated: [today's date]
validation_status: clean
---

# Brand Positioning

## Benefit Ladder

**Functional Benefit:**
[What the product/service does]

**Emotional Benefit:**
[How it makes customers feel]

**Transformational Benefit:**
[Identity shift - from X to Y]

---

## Positioning Statement

For [target audience]
Who [specific problem]
[Brand] is a [category]
That [key benefit]
Unlike [competitors]
We [differentiator]

---

## Brand Narrative

### The Tension
[What's broken in the world/category]

### Our Belief
[Contrarian viewpoint]

### Our Approach
[How we're different]

### The Promise
[The transformation we enable]

---

## Category & Frame

**Category:** [e.g., "Project alignment platform"]
**Frame of reference:** [What we compete with]
**Point of difference:** [How we're unique]

---

## Strategic Foundation

**Based on:**
- Founder insight: [key belief from interview]
- Competitive white space: [unclaimed territory]
- Customer need: [emotional driver from research]

**This positioning is:**
- ✅ Differentiated (not claimed by competitors)
- ✅ Ownable (we can defend it)
- ✅ Relevant (addresses real customer need)
- ✅ Authentic (aligned with founder beliefs)
```

Write this file immediately using the **Write tool**.

---

Also write `/strategy/core/narrative.md`:

```markdown
---
type: strategy
domain: core
date: [today's date]
validated: true
extends: null
scope: core/narrative
content_types: [universal]
platforms: [all]
last_validated: [today's date]
validation_status: clean
---

# Brand Narrative

[Paste the full narrative from Exercise 4]

---

## How to Use This Narrative

This narrative is your brand story. Use it:
- In pitch decks and investor presentations
- On your "About" page
- To brief content creators
- To align internal teams on purpose
- As the foundation for all messaging

Every piece of content should reflect this narrative, even if not explicitly stated.
```

---

## Handoff Summary

After documentation, provide:

```
✅ Positioning workshop complete!

YOUR POSITIONING:
[One-sentence summary]

KEY DIFFERENTIATOR:
[The unique claim you're owning]

STRATEGIC TERRITORY:
[The space you're claiming - e.g., "Alignment over efficiency"]

BENEFIT PROMISE:
From: [Before state]
To: [After state]

VALIDATION STATUS:
✅ Differentiated from competitors
✅ Aligned with founder beliefs
✅ Resonates with customer research

📄 Documentation:
- /strategy/core/positioning.md
- /strategy/core/narrative.md

NEXT STEPS:
1. /build-messaging - Develop brand pillars and messaging framework
2. /craft-voice - Define tone and vocabulary

Which would you like to tackle next?
```

---

## Success Criteria

✅ Positioning statement is specific (not generic)
✅ Differentiator is ownable and defensible
✅ Grounded in research (not just opinion)
✅ Validated by agents (content-analyst confirms differentiation)
✅ Documents written to /strategy/core/
✅ User understands their strategic choice

---

## Key Principles

1. **Specificity over breadth** - A narrow, ownable position beats a broad, generic one
2. **Validate constantly** - Every choice must connect back to research
3. **Push for differentiation** - Challenge answers that could apply to competitors
4. **Trade-offs are necessary** - Positioning is about what you won't be, not just what you will be
5. **Write immediately** - Document while decisions are fresh
6. **Strategic choice** - Help user understand they're making strategic trade-offs, not just filling in blanks
