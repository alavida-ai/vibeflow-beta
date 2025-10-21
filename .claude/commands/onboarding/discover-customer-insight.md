# Discover Customer Insight

You are conducting **customer research** to build deep psychographic understanding of the target audience and validate that your positioning hypotheses resonate emotionally with real customers.

---

## Goals

By the end of this session, you should have:

1. **Rich persona profiles** - 2-3 detailed personas with demographics, psychographics, pain points, and aspirations
2. **Emotional validation** - Confirmation that positioning hypotheses address real emotional needs
3. **Jobs-to-be-done clarity** - Understanding what functional, emotional, and social jobs customers are hiring this brand for
4. **Decision criteria** - How customers evaluate solutions and what drives their choices
5. **Language mapping** - The actual words customers use to describe their problems and desires

---

## Context Loading

**Before you begin, read:**
- `/research/founder-interview.md` - Understand the founder's customer hypothesis
- `/research/competitive-landscape.md` - Know what territory you're testing

**Key questions to answer:**
- Do customers actually feel the pain points we've hypothesized?
- Does our positioning territory (e.g., "alignment") resonate emotionally?
- What language do customers use that we should mirror?

---

## Approach Options

You have **two paths** depending on user's access to customers:

### Path A: User Has Customer Access
If user can provide access to 2-3 real customers:
1. Prepare interview questions
2. User conducts interviews (or facilitates intros)
3. You analyze transcripts for insights

### Path B: User Describes Customers
If user doesn't have customer access:
1. Ask user to describe 2-3 real customers in detail
2. Probe deeply on each customer through questioning
3. Enrich with market research via persona-builder agent

**Ask the user first:**
```
"To validate our positioning with real customer insights, I can work in two ways:

A. Interview Preparation: If you have access to 2-3 customers, I'll prepare
   interview questions for you to conduct (or facilitate intros if possible)

B. Deep Customer Profiling: If you don't have customer access, describe 2-3
   real customers to me and I'll probe deeply, then enrich with market research

Which path works better for you?"
```

---

## Path A: Customer Interview Preparation

### If User Has Customer Access

**Step 1: Prepare Interview Guide**

Create a flexible interview guide (not a rigid script) covering:

**Opening Context**
- How they discovered the brand
- What problem they were trying to solve
- What alternatives they considered

**Problem Deep-Dive**
- Emotional state before finding solution (anxious? frustrated? overwhelmed?)
- What wasn't working with previous approaches
- How the problem affected them personally/professionally

**Evaluation & Decision**
- What made them choose this brand over alternatives
- What almost stopped them from choosing this brand
- How they described the brand to others

**Transformation & Outcome**
- What changed after using the product/service
- How they feel now vs. before
- What they can do now that they couldn't before

**Language Capture**
- Ask them to complete: "Before [brand], I was ____. Now I'm ____."
- Their exact words matter - capture quotes verbatim

**Step 2: Handoff**

Provide the interview guide to the user and say:
```
"I've prepared an interview guide (not a script - adapt based on what you hear).

Key principles:
- Listen for emotion, not just facts
- Ask "why" multiple times to get deeper
- Capture their exact language (quotes matter!)
- Look for identity shifts ("I was X, now I'm Y")

After you complete the interviews, share the transcripts or notes with me
and I'll analyze for strategic insights and persona development.
```

**Step 3: Analysis**

When user provides interview data:
1. Extract key themes and patterns
2. Identify emotional drivers
3. Capture customer language
4. Validate positioning hypotheses
5. Engage persona-builder to enrich with market data

---

## Path B: Deep Customer Profiling

### If User Describes Customers

**Step 1: Initial Customer Descriptions**

Ask user:
```
"Describe 2-3 real customers (not theoretical - actual people who chose you).

For each, tell me:
- Their name (or pseudonym) and role
- The situation they were in when they found you
- Why they chose you over alternatives
- What changed for them after using your product/service
```

**Step 2: Deep Questioning**

For each customer, probe with questions like:
- "What was [Name] feeling emotionally before finding you?"
- "When [Name] chose you, what were they afraid of? What were they hoping for?"
- "How did [Name] describe you to their team/boss/peers?"
- "What kind of person was [Name] trying to become?"
- "What would [Name] have done if your product didn't exist?"

**Go 3-5 layers deep** on each customer. Push past surface answers.

**Step 3: persona-builder Enrichment**

Once you have deep customer profiles, engage **persona-builder agent** to:
- Research demographic data for this customer segment
- Find psychographic patterns (values, fears, aspirations)
- Identify content consumption habits
- Validate pain points against market research
- Map to customer journey stages

---

## Documentation Requirements

After research (regardless of path), write `/research/customer-insights.md`:

```markdown
---
type: research
domain: audience
date: [today's date]
research_method: [interviews / profiling / mixed]
validated: true
---

# Customer Insights

## Research Methodology
[How data was gathered - interviews, profiling, market research]

---

## Persona 1: [Name/Archetype]

### Demographics
- Age range:
- Role/title:
- Industry/context:
- Geography:

### Psychographics
**Values:** [What matters to them]
**Fears:** [What keeps them up at night]
**Aspirations:** [Who they want to become]

### Pain Points (Before the brand)
[Specific problems, emotional state, frustrations]

**Key Quote:**
"[Their exact words describing the problem]"

### Decision Journey
**Trigger:** [What made them look for a solution]
**Evaluation:** [How they assessed options]
**Decision Criteria:** [What mattered most in choosing]

### Transformation (After the brand)
**Functional change:** [What they can now do]
**Emotional change:** [How they now feel]
**Identity shift:** [Who they've become]

**Key Quote:**
"[Their exact words about the transformation]"

---

## Persona 2: [Name/Archetype]
[Repeat structure]

---

## Persona 3: [Name/Archetype]
[Repeat structure]

---

## Cross-Persona Insights

### Common Pain Points
[Patterns across all personas]

### Common Aspirations
[What they all want to become]

### Jobs-to-Be-Done
**Functional:** [Practical problems they're solving]
**Emotional:** [How they want to feel]
**Social:** [How they want to be perceived]

### Customer Language Patterns
[Exact words/phrases customers use repeatedly]

**Words to use:** [Customer language we should mirror]
**Words to avoid:** [Industry jargon customers don't use]

---

## Positioning Validation

### Hypothesis: [e.g., "Alignment positioning will resonate"]
**Validation:** ✅ Validated / ⚠️ Partially / ❌ Not validated

**Evidence:**
[What in the customer research supports or contradicts this]

### Hypothesis: [e.g., "Target is 'leaders who feel like bottlenecks'"]
**Validation:** [Status]

**Evidence:**
[Customer quotes or patterns that validate/contradict]

---

## Strategic Insights

### Primary Emotional Driver
[The deepest emotional need driving purchase decisions]

### Identity Transformation
[The "before" identity → "after" identity shift]

### Competitive Differentiation Validation
[Do customers choose this brand for the reasons we hypothesized?]

---

## Recommended Next Steps
- `/define-positioning` - We have enough validation to formalize positioning
- OR `/discover-category-landscape` - If we need more competitive validation first
```

Use **Write tool** immediately after synthesis.

---

## Agent Collaboration

### Your Role
Lead the customer research process, ask probing questions, synthesize insights.

### persona-builder Agent
**When to engage:** After you've gathered initial customer profiles

**What they do:**
- Enrich profiles with market research
- Validate patterns against demographic/psychographic data
- Research content consumption habits
- Build fuller persona profiles

**How to engage:**
```
"I've gathered initial customer insights. persona-builder, please enrich
these 3 personas with:
- Market demographic data for [segment]
- Psychographic research on [values/fears]
- Content consumption patterns
- Customer journey mapping
```

---

## Handoff Summary

After documentation, provide:

```
✅ Customer insight research complete!

PERSONAS DEVELOPED:
1. [Persona 1 name] - [One-line description]
2. [Persona 2 name] - [One-line description]
3. [Persona 3 name] - [One-line description]

KEY EMOTIONAL DRIVER:
[The primary emotional need across all personas]

IDENTITY TRANSFORMATION:
From: [Before identity]
To: [After identity]

POSITIONING VALIDATION:
✅ [What was validated]
⚠️ [What needs refinement]

📄 Full insights: /research/customer-insights.md

STRATEGIC INSIGHT:
[Your #1 insight about what customers really want/need]

NEXT STEP:
We now have complete discovery (founder story + competitive landscape +
customer insight). I recommend /define-positioning to formalize your
positioning statement based on all this research.

Ready to workshop your positioning?
```

---

## Success Criteria

✅ Rich, psychographic personas (not just demographic profiles)
✅ Emotional drivers identified and validated
✅ Customer language captured (actual words they use)
✅ Positioning hypotheses validated or refined
✅ Clear identity transformation articulated
✅ Next phase can proceed with confidence

---

## Key Principles

1. **Emotion over demographics** - Psychographics matter more than age/gender
2. **Language matters** - Capture exact words customers use
3. **Identity transformation** - Look for before/after identity shifts
4. **Jobs-to-be-done** - Understand functional + emotional + social jobs
5. **Validate, don't assume** - Test hypotheses against real customer data
6. **Enrich collaboratively** - Use persona-builder to add market context
