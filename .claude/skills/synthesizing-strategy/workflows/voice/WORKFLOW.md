# Synthesize Voice Strategy

Transform voice benchmarking research into clear voice guidelines that define how your brand sounds and communicates.

---

## Synthesis Objective

**Goal:** Create prescriptive voice strategy with voice attributes, tone guidance, and writing principles.

**Inputs:**
- `/research/voice-benchmarking/RESEARCH.md`
- `/research/customer-insights/RESEARCH.md` (communication preferences)
- `/strategy/brand-fundamentals/STRATEGY.md` (for values alignment - EXCEPTION)

**Output:**
- `/strategy/voice/STRATEGY.md` (polished, opinionated guidance)
- Updated CHANGELOG.md

---

## Prerequisites Check

Before synthesis, verify:

1. **Research exists:** Both required RESEARCH.md files are present
2. **Brand fundamentals exist:** `/strategy/brand-fundamentals/STRATEGY.md` exists (needed for values context)
3. **Research is current:** Research files updated since last voice synthesis
4. **Research is complete:** Files contain voice analysis, customer communication preferences

If prerequisites fail, prompt user to run missing workflows first.

---

## Synthesis Process

### Phase 1: Strategic Synthesis

**Purpose:** Transform research findings into prescriptive voice strategy.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** [phase-1-synthesis.md](phase-1-synthesis.md)
- **Context needed:** Two research files + brand fundamentals by path

**Synthesis activities:**
- Define voice attributes aligned with brand values
- Establish tone spectrum (formal ↔ casual, serious ↔ humorous, etc.)
- Create writing principles and guidelines
- Provide voice do's and don'ts
- Include example writing samples
- Note channel considerations (reference extensions for platform-specific)
- Add cross-references to research for audit trail

**Output:** `/strategy/voice/STRATEGY.md`

---

## Output Structure

Use template: [templates/voice.md](../../templates/voice.md)

**Required sections:**

1. **Frontmatter** - Metadata with last_updated, research sources
2. **Voice Attributes** - Core personality traits (e.g., conversational, authoritative)
3. **Tone Spectrum** - Where you sit on key tone dimensions
4. **Writing Principles** - Guidelines for consistent voice
5. **Voice Do's and Don'ts** - Specific examples of voice application
6. **Example Writing Samples** - Before/after or exemplar content
7. **Channel Considerations** - Note about platform extensions

**Tone:** Prescriptive, clear, with concrete examples
**Format:** Markdown with cross-references to research

---

## Extensions Pattern

Voice strategy can be extended for specific platforms:

```
/strategy/voice/
├── STRATEGY.md           # Base voice (applies everywhere)
├── CHANGELOG.md
└── twitter/
    └── EXTENSION.md      # Twitter-specific adaptations
```

Base STRATEGY.md should note: "For platform-specific voice adaptations, see extensions: [Twitter](twitter/EXTENSION.md)"

---

## Update vs Create

**Creating (first time):**
- No existing STRATEGY.md
- Synthesize from research and brand fundamentals

**Updating:**
- Existing STRATEGY.md present
- Check if research sources are newer than strategy
- Only update if research has changed
- Update CHANGELOG.md with what changed
