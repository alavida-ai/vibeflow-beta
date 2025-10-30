# Messaging Strategy Synthesis

**Created:** 2025-10-28 11:02
**Execution Folder:** `/strategy/messaging/2025-10-28_11:02/`
**Workflow Reference:** `.claude/skills/synthesizing-strategy/workflows/messaging/WORKFLOW.md`

## Objective

Synthesize messaging strategy from customer insights and competitive landscape research, creating clear, resonant messaging that articulates value in the language customers use, differentiated from competitive messaging patterns.

## Approach

This is a **strategy synthesis workflow** where the strategist agent transforms research findings (what IS) into prescriptive messaging guidance (what to SAY). The synthesis focuses on:

1. **Customer language extraction** - Authentic terminology from customer insights
2. **Value proposition hierarchy** - Prioritized value statements aligned with positioning
3. **Message architecture** - Organized by themes/pillars
4. **Competitive differentiation** - Avoiding saturated messaging patterns
5. **Proof points** - Evidence-backed claims
6. **Prescriptive guidelines** - Do's and don'ts for consistency

**Key principle:** Messaging must be authentic to customers AND differentiated from competitors.

## Input Data

**Location:** Research domain + Strategy context (read-only)

**Research Sources:**
- `/research/customer-insights/RESEARCH.md` - Customer language, pain points, terminology, needs articulation
- `/research/category-landscape/RESEARCH.md` - Competitive messaging themes, saturated patterns, white space

**Strategy Context (EXCEPTION):**
- `/strategy/positioning/STRATEGY.md` - Positioning framework for alignment (messaging must express positioning)

**Why this combination:**
- **Customer insights** provide authentic language that resonates
- **Category landscape** shows what messaging is saturated (what to avoid)
- **Positioning** provides strategic direction (what we stand for)
- Together they create messaging that's resonant + differentiated + aligned

**Prerequisites verified:** ✅ All three files exist and contain required content.

## Step by Step Tasks

### 1. Value Proposition Synthesis

Extract and synthesize core value propositions from positioning and customer insights, expressed in customer language.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `/research/customer-insights/RESEARCH.md` (for customer language and pain points)
- `/strategy/positioning/STRATEGY.md` (for strategic direction)
- `/research/category-landscape/RESEARCH.md` (for competitive differentiation)

**Output Artifact:** `artifacts/01-value-propositions.md`

**Task Details:**

Synthesize core value propositions that articulate what we deliver and why it matters.

**Your synthesis should:**
- Define **primary value proposition** - the #1 benefit we deliver (aligned with positioning)
- Express in **customer language** from research (use their words, not ours)
- Create **secondary value props** - supporting benefits (2-3)
- **Differentiate from competitive claims** - avoid saturated value prop patterns from category landscape
- Cite customer insights for language, positioning for strategic direction, competitive analysis for differentiation
- Be customer-centric: focus on outcomes they care about, not features we offer
- Answer: "Why should customers choose us?" in terms they use

**Output structure:**
```markdown
# Value Propositions

## Primary Value Proposition

[The #1 value statement - customer outcome focus, using customer language]

**Strategic Foundation:**
[Why this aligns with our positioning - cite /strategy/positioning/STRATEGY.md]

**Customer Language Foundation:**
[Customer terms/pain points this addresses - cite /research/customer-insights/RESEARCH.md]

**Competitive Differentiation:**
[How this differs from saturated competitive claims - cite /research/category-landscape/RESEARCH.md]

---

## Secondary Value Propositions

### 1. [Value Prop 2 Name]

**Statement:** [Clear value articulation in customer terms]

**Research Foundation:** [Citations to all three sources]

### 2. [Value Prop 3 Name]

**Statement:** [Clear value articulation in customer terms]

**Research Foundation:** [Citations to all three sources]

---

## Value Hierarchy Rationale

[2-3 paragraphs explaining:
- Why this hierarchy (primary first)
- How props work together
- Connection to positioning
- Differentiation from competitors]
```

**Quality Standard:**
Someone should read this and immediately understand our unique value in customer terms, seeing clear differentiation from competitors.

---

### 2. Message Architecture by Theme

Create organized message hierarchy aligned with brand pillars/positioning themes, with core messages and supporting points.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-value-propositions.md`
- `/strategy/positioning/STRATEGY.md` (for themes/pillars)
- `/research/customer-insights/RESEARCH.md` (for customer language)
- `/research/category-landscape/RESEARCH.md` (for differentiation)

**Output Artifact:** `artifacts/02-message-architecture.md`

**Task Details:**

Build message architecture organized by themes (likely from brand pillars or positioning territories).

**Your synthesis should:**
- Identify **3-5 messaging themes** from positioning (e.g., Empowerment, Ownership, Human-AI Collaboration)
- For each theme, create:
  - **Core message** - main statement for this theme
  - **Supporting points** - 3-4 proof points or sub-messages
- Use **customer language** throughout (from research)
- **Avoid competitive patterns** - don't use messaging that's saturated
- Show how messages **ladder up to value props**
- Cite positioning for themes, customer insights for language, competitive analysis for what to avoid
- Be directive: this is WHAT to say, not just information

**Output structure:**
```markdown
# Message Architecture

[Introduction explaining how themes were derived and how they support value propositions]

---

## Theme 1: [e.g., "Empowerment Over Ease"]

**Core Message:**
[Primary message for this theme - clear, customer-focused, differentiated]

**Supporting Points:**
1. [Supporting message - evidence, proof, or sub-claim]
2. [Supporting message - evidence, proof, or sub-claim]
3. [Supporting message - evidence, proof, or sub-claim]

**Customer Language Foundation:**
[Terms/phrases customers use related to this theme - cite research]

**Competitive Differentiation:**
[What competitors say about this theme, and how we differ - cite category landscape]

**Connection to Value Props:**
[How this theme supports primary or secondary value propositions]

---

[Repeat for Themes 2-5]

---

## How Message Architecture Works

[2-3 paragraphs explaining:
- How themes connect to positioning
- How messages ladder up to value props
- How to use this architecture for content creation
- Flexibility within structure]
```

**Quality Standard:**
A content creator should be able to pick a theme and immediately know what messages to emphasize for any piece of content.

---

### 3. Tagline & Elevator Pitch Development

Craft concise brand articulations: tagline (memorable) and elevator pitch (30-second explanation).

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-value-propositions.md`
- `artifacts/02-message-architecture.md`
- `/strategy/positioning/STRATEGY.md` (for brand essence)

**Output Artifact:** `artifacts/03-tagline-pitch.md`

**Task Details:**

Create distilled brand articulations for high-impact contexts.

**Your synthesis should:**
- Develop **tagline** - 3-7 words that capture brand essence (memorable, differentiated)
- Create **elevator pitch** - 2-3 sentences explaining who we are, what we do, why it matters
- Both should use **customer language** (resonant)
- Both should be **differentiated** (not generic)
- Both should **express positioning** (aligned with strategy)
- Include 2-3 alternative options for each
- Cite positioning for essence, value props for benefit articulation
- Be concise but compelling

**Output structure:**
```markdown
# Tagline & Elevator Pitch

## Tagline Options

### Primary Tagline
**"[3-7 word tagline]"**

**Why this works:**
- [Captures positioning essence - cite positioning]
- [Uses customer language - cite research]
- [Differentiates from competitors - cite category landscape]

### Alternative Taglines
1. **"[Alternative 1]"** - [Why this option]
2. **"[Alternative 2]"** - [Why this option]

---

## Elevator Pitch

### Primary Pitch
[2-3 sentences: Who we are, what we do, why it matters - in customer terms]

**Structure breakdown:**
- **Who we are:** [Identity/positioning]
- **What we do:** [Value proposition]
- **Why it matters:** [Customer outcome/transformation]

**Why this works:**
[2 paragraphs explaining alignment with positioning, customer resonance, differentiation]

### Alternative Pitches
1. [Alternative pitch 1]
2. [Alternative pitch 2]

---

## Usage Guidance

[When to use tagline vs elevator pitch, flexibility in adaptation, core elements to preserve]
```

**Quality Standard:**
These should be immediately usable in high-stakes contexts (website hero, investor pitch, PR quotes) without modification.

---

### 4. Proof Points & Customer Language Extraction

Extract customer terminology and compile evidence that backs messaging claims.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-value-propositions.md`
- `artifacts/02-message-architecture.md`
- `/research/customer-insights/RESEARCH.md` (for language patterns and evidence)

**Output Artifact:** `artifacts/04-proof-points-language.md`

**Task Details:**

Create two critical resources: proof points for claims and customer language glossary.

**Your synthesis should:**
- **Proof Points:** For each major claim in value props/messages, provide supporting evidence
  - Data points
  - Customer quotes
  - Case examples
  - Research citations
- **Customer Language:** Extract patterns from research
  - Problems they articulate (in their words)
  - Solutions they seek (in their terms)
  - Terminology to use
  - Jargon to avoid
- Cite customer insights throughout
- Be specific and actionable

**Output structure:**
```markdown
# Proof Points & Customer Language

## Proof Points

Supporting our messaging claims with evidence:

### [Claim/Message 1]
**Claim:** [What we're asserting]

**Proof:**
- [Evidence 1 - data, quote, example with citation]
- [Evidence 2 - data, quote, example with citation]
- [Evidence 3 - data, quote, example with citation]

**Source:** [Research citation]

---

[Repeat for major claims]

---

## Customer Language Patterns

Based on [customer insights research](/research/customer-insights/RESEARCH.md):

### Problems They Articulate

How customers describe their pain points (use these exact terms):
- **"[Customer quote/term 1]"** - [What this reveals about their needs]
- **"[Customer quote/term 2]"** - [What this reveals about their needs]
- **"[Customer quote/term 3]"** - [What this reveals about their needs]

**Source:** [Specific sections from customer insights]

### Solutions They Seek

How customers describe desired outcomes (mirror this language):
- **"[Customer quote/term 1]"** - [What this tells us to emphasize]
- **"[Customer quote/term 2]"** - [What this tells us to emphasize]
- **"[Customer quote/term 3]"** - [What this tells us to emphasize]

**Source:** [Specific sections from customer insights]

### Terminology Guidelines

**✓ Use these terms** (customer vocabulary):
- [Term 1] instead of [industry jargon]
- [Term 2] instead of [internal term]
- [Term 3] instead of [generic phrase]

**✗ Avoid these terms** (disconnect from customer reality):
- [Industry jargon 1]
- [Buzzword 1]
- [Internal term 1]

---

## Using This Resource

[Guidance on:
- When to reference proof points (building credibility)
- How to incorporate customer language (authenticity)
- Balancing aspiration with evidence (credible but compelling)]
```

**Quality Standard:**
Every claim in our messaging should have traceable proof, and all messaging should use language that feels familiar to customers.

---

### 5. Messaging Guidelines (Do's & Don'ts)

Establish prescriptive guidelines for consistent, differentiated messaging across all content.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-value-propositions.md`
- `artifacts/02-message-architecture.md`
- `artifacts/04-proof-points-language.md`
- `/research/category-landscape/RESEARCH.md` (for competitive patterns to avoid)

**Output Artifact:** `artifacts/05-messaging-guidelines.md`

**Task Details:**

Create clear do's and don'ts that protect messaging consistency and differentiation.

**Your synthesis should:**
- **Do's** - Specific messaging practices we follow (not generic advice)
- **Don'ts** - Specific patterns we avoid (often competitive patterns)
- Connect guidelines to strategic rationale (why each rule matters)
- Make actionable - someone should be able to apply these when creating content
- Cite category landscape for what competitors do (what we avoid)
- Cite positioning for what we stand for (what we emphasize)
- Be definitive - these are rules, not suggestions

**Output structure:**
```markdown
# Messaging Guidelines

[Introduction explaining purpose: consistency, differentiation, brand protection]

---

## Messaging Do's

### ✓ DO: [Specific guideline]

**What this means:**
[Concrete examples of applying this guideline]

**Why it matters:**
[Strategic rationale - connection to positioning or differentiation]

**Example:**
- ✅ Good: "[Example of following this guideline]"
- ❌ Bad: "[Example of violating this guideline]"

**Source:** [Citation to positioning or research]

---

[Repeat for 5-7 Do's]

---

## Messaging Don'ts

### ✗ DON'T: [Specific guideline]

**What to avoid:**
[Concrete anti-patterns]

**Why we avoid this:**
[Strategic rationale - often competitive differentiation]

**Competitive context:**
[What competitors do that we're intentionally avoiding - cite category landscape]

**Example:**
- ❌ Avoid: "[Example of what not to say]"
- ✅ Instead: "[Better alternative aligned with guidelines]"

**Source:** [Citation to category landscape or positioning]

---

[Repeat for 5-7 Don'ts]

---

## Quick Reference Checklist

Before publishing any messaging, verify:
- [ ] [Quick check 1]
- [ ] [Quick check 2]
- [ ] [Quick check 3]
- [ ] [Quick check 4]
- [ ] [Quick check 5]

---

## When to Bend Guidelines

[Brief section on appropriate flexibility - when strategic context requires adaptation while preserving core principles]
```

**Quality Standard:**
A content creator should be able to self-evaluate their messaging against these guidelines without needing approval for every decision.

---

### 6. Final Strategy Document Synthesis

Consolidate all phase artifacts into polished, client-ready STRATEGY.md using the messaging template.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-value-propositions.md`
- `artifacts/02-message-architecture.md`
- `artifacts/03-tagline-pitch.md`
- `artifacts/04-proof-points-language.md`
- `artifacts/05-messaging-guidelines.md`

**Output Artifact:** `STRATEGY.md` (at execution folder root)

**Task Details:**

Create final messaging strategy document that serves as authoritative reference for all brand communications.

**Your synthesis should:**
- Integrate all phase artifacts into cohesive narrative
- Follow template structure from `.claude/skills/synthesizing-strategy/templates/messaging.md`
- Add frontmatter with metadata (date, research sources, strategy context)
- Ensure all citations use markdown reference format `[text](/path/to/file.md)`
- Be polished and client-ready (permanent brand asset)
- Be prescriptive - tells people WHAT to say and HOW
- Structure for progressive disclosure (core elements first, details after)
- Answer: "How should we talk about our value?" with clear, actionable guidance

**Output structure (from template):**
```markdown
---
domain: messaging
last_updated: 2025-10-28
research_sources:
  - /research/customer-insights/RESEARCH.md
  - /research/category-landscape/RESEARCH.md
strategy_context:
  - /strategy/positioning/STRATEGY.md
---

# Messaging Strategy

## Core Value Propositions
[From phase 1 - primary + secondary value props]

## Key Messages by Theme
[From phase 2 - message architecture by theme]

## Tagline/Elevator Pitch
[From phase 3 - tagline options + elevator pitch]

## Proof Points & Evidence
[From phase 4 - evidence backing claims]

## Customer Language
[From phase 4 - terminology patterns]

## Messaging Do's and Don'ts
[From phase 5 - prescriptive guidelines]

---

## Research Foundation

This strategy is synthesized from:
- [Customer language and pain points](/research/customer-insights/RESEARCH.md)
- [Competitive messaging themes](/research/category-landscape/RESEARCH.md)
- [Positioning context](/strategy/positioning/STRATEGY.md)

[Brief paragraph explaining synthesis approach: customer insights provided authentic language, category landscape showed differentiation opportunities, positioning provided strategic direction]
```

**Quality Standard:**
- Client-ready (could share externally)
- Every major claim has research citation
- Actionable - guides real messaging decisions
- Prescriptive - tells people what to do
- Differentiated - clear how we're different from competitors

---

### 7. Deploy Strategy & Update Changelog

Move STRATEGY.md to final location and document this synthesis in CHANGELOG.md.

**Agent:** Main orchestrator (not delegated)
**Instructions:** Inline instructions below
**Input Artifacts:**
- `STRATEGY.md` (from phase 6)
- `/strategy/messaging/CHANGELOG.md` (existing)

**Output Artifact:**
- `/strategy/messaging/STRATEGY.md` (final location)
- `/strategy/messaging/CHANGELOG.md` (updated)

**Task Details:**

This is a direct execution step (not delegated to sub-agent):

1. **Copy STRATEGY.md to final location:**
   ```bash
   cp strategy/messaging/2025-10-28_11:02/STRATEGY.md strategy/messaging/STRATEGY.md
   ```

2. **Update CHANGELOG.md:**
   - Add entry for this synthesis
   - Format: `## [2025-10-28] - Initial Messaging Strategy`
   - List what was created
   - Reference execution folder
   - Note research sources

**CHANGELOG entry format:**
```markdown
## [2025-10-28] - Initial Messaging Strategy

**Type:** Strategy synthesis from customer insights and competitive landscape research

**Changes:**
- Created initial messaging strategy document
- Defined core value propositions (primary + 2 secondary)
- Built message architecture by themes (5 themes with supporting points)
- Developed tagline and elevator pitch options
- Compiled proof points and customer language glossary
- Established messaging do's and don'ts

**Source Research:**
- Customer Insights ([/research/customer-insights/RESEARCH.md](/research/customer-insights/RESEARCH.md))
- Category Landscape ([/research/category-landscape/RESEARCH.md](/research/category-landscape/RESEARCH.md))

**Strategy Context:**
- Positioning Strategy ([/strategy/positioning/STRATEGY.md](/strategy/positioning/STRATEGY.md))

**Strategic Approach:** Customer language for resonance, competitive analysis for differentiation, positioning alignment for consistency.

**Execution:** `/strategy/messaging/2025-10-28_11:02/`
```

3. **Confirm completion with user**

---

## Success Criteria

**The synthesis is successful when:**

1. **STRATEGY.md is polished and actionable**
   - Client-ready quality
   - Complete frontmatter
   - Prescriptive guidance throughout
   - Follows template structure

2. **Complete audit trail maintained**
   - Every major claim cites research using markdown references
   - No footnotes - integrated citations only
   - Chain traceable: Messaging → Customer insights + Competitive analysis + Positioning

3. **Customer-centric and differentiated**
   - Uses authentic customer language (from research)
   - Avoids saturated competitive patterns (differentiated)
   - Expresses positioning clearly (aligned)

4. **Actionable for content creators**
   - Clear value props to emphasize
   - Message architecture by theme
   - Do's and don'ts for self-evaluation
   - Proof points for credibility

5. **Strategist agent throughout**
   - All synthesis phases (1-6) delegated to strategist-agent
   - Strategic perspective maintained (prescriptive, opinionated)
   - Evidence-based conviction

6. **Documentation complete**
   - CHANGELOG.md updated
   - Execution folder preserved
   - Template structure followed

**User can verify success by:**
- Reading STRATEGY.md and being able to write on-brand messaging
- Following citations from strategy back to research
- Seeing clear differentiation from competitive messaging patterns
- Having concrete guidance for messaging decisions
