# Synthesize Messaging Strategy

Transform customer insights research into clear, resonant messaging that articulates your value in the language your customers use.

---

## Synthesis Objective

**Goal:** Create prescriptive messaging strategy with core value propositions, key messages, and proof points.

**Inputs:**
- `/research/customer-insights/RESEARCH.md` (customer language, pain points)
- `/research/category-landscape/RESEARCH.md` (competitive messaging themes)
- `/strategy/positioning/STRATEGY.md` (for positioning context - EXCEPTION)

**Output:**
- `/strategy/messaging/STRATEGY.md` (polished, opinionated guidance)
- Updated CHANGELOG.md

---

## Prerequisites Check

Before synthesis, verify:

1. **Research exists:** Both required RESEARCH.md files are present
2. **Positioning exists:** `/strategy/positioning/STRATEGY.md` exists (needed for context)
3. **Research is current:** Research files updated since last messaging synthesis
4. **Research is complete:** Files contain customer language, pain points, competitive messaging

If prerequisites fail, prompt user to run missing workflows first.

---

## Synthesis Process

### Phase 1: Strategic Synthesis

**Purpose:** Transform research findings into prescriptive messaging strategy.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** [phase-1-synthesis.md](phase-1-synthesis.md)
- **Context needed:** Two research files + positioning strategy by path

**Synthesis activities:**
- Extract customer language patterns for authentic messaging
- Define core value propositions aligned with positioning
- Create message hierarchy by theme
- Develop proof points and evidence
- Establish messaging do's and don'ts (avoid competitive patterns)
- Craft tagline/elevator pitch
- Add cross-references to research for audit trail

**Output:** `/strategy/messaging/STRATEGY.md`

---

## Output Structure

Use template: [templates/messaging.md](../../templates/messaging.md)

**Required sections:**

1. **Frontmatter** - Metadata with last_updated, research sources
2. **Core Value Propositions** - Primary value statements
3. **Key Messages by Theme** - Organized messaging hierarchy
4. **Tagline/Elevator Pitch** - Concise brand articulation
5. **Proof Points & Evidence** - Supporting claims with evidence
6. **Customer Language** - Terminology and phrases customers use
7. **Messaging Do's and Don'ts** - Guidelines for consistency

**Tone:** Prescriptive, customer-centric, evidence-based
**Format:** Markdown with cross-references to research

---

## Update vs Create

**Creating (first time):**
- No existing STRATEGY.md
- Synthesize from research and positioning

**Updating:**
- Existing STRATEGY.md present
- Check if research sources are newer than strategy
- Only update if research has changed
- Update CHANGELOG.md with what changed
