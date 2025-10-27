# Synthesize Positioning Strategy

Transform category landscape and customer insights research into a clear positioning strategy that defines where you fit and what makes you different.

---

## Synthesis Objective

**Goal:** Create prescriptive positioning that clarifies market position, differentiation, and unique value.

**Inputs:**
- `/research/category-landscape/RESEARCH.md`
- `/research/customer-insights/RESEARCH.md`
- `/research/founder-interview/RESEARCH.md` (for positioning hypotheses)

**Output:**
- `/strategy/positioning/STRATEGY.md` (polished, opinionated guidance)
- Updated CHANGELOG.md

---

## Prerequisites Check

Before synthesis, verify:

1. **Research exists:** All three required RESEARCH.md files are present
2. **Research is current:** At least one research file has been updated since last strategy synthesis
3. **Research is complete:** Files contain positioning insights, competitive analysis, customer needs

If prerequisites fail, prompt user to run missing research workflows first.

---

## Synthesis Process

### Phase 1: Strategic Synthesis

**Purpose:** Transform research findings into prescriptive positioning strategy.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** [phase-1-synthesis.md](phase-1-synthesis.md)
- **Context needed:** Three research files by path (progressive disclosure)

**Synthesis activities:**
- Validate founder's positioning hypotheses against market reality
- Define market position and category
- Articulate differentiation strategy (what makes you unique)
- Identify competitive advantages (based on white space)
- Craft positioning statement
- Document strategic white space opportunities
- Add cross-references to research for audit trail

**Output:** `/strategy/positioning/STRATEGY.md`

---

## Output Structure

Use template: [templates/positioning.md](../../templates/positioning.md)

**Required sections:**

1. **Frontmatter** - Metadata with last_updated, research sources
2. **Market Position** - Where you fit in the market landscape
3. **Category Definition** - How you define your category
4. **Differentiation Strategy** - What makes you uniquely valuable
5. **Competitive Advantages** - Specific strengths vs. competitors
6. **Positioning Statement** - Concise articulation of position
7. **Strategic White Space** - Opportunities for differentiation

**Tone:** Prescriptive, confident, evidence-based
**Format:** Markdown with cross-references to research

---

## Update vs Create

**Creating (first time):**
- No existing STRATEGY.md
- Synthesize from all three research sources

**Updating:**
- Existing STRATEGY.md present
- Check if any research source is newer than strategy
- Only update if research has changed
- Update CHANGELOG.md with what changed and why
