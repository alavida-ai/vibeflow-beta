# Synthesize Audience Strategy

Transform customer insights research into clear audience profiles that define who you're talking to and what they need.

---

## Synthesis Objective

**Goal:** Create prescriptive audience strategy with detailed profiles, pain points, needs, and communication preferences.

**Inputs:**
- `/research/customer-insights/RESEARCH.md`
- `/research/founder-interview/RESEARCH.md` (ICP definition)

**Output:**
- `/strategy/audience/STRATEGY.md` (polished, opinionated guidance)
- Updated CHANGELOG.md

---

## Prerequisites Check

Before synthesis, verify:

1. **Research exists:** Both required RESEARCH.md files are present
2. **Research is current:** Research files updated since last audience synthesis
3. **Research is complete:** Files contain customer profiles, pain points, behaviors, needs

If prerequisites fail, prompt user to run missing research workflows first.

---

## Synthesis Process

### Phase 1: Strategic Synthesis

**Purpose:** Transform research findings into prescriptive audience strategy.

**Delegation:**
- **Agent:** strategist-agent
- **Instructions:** [phase-1-synthesis.md](phase-1-synthesis.md)
- **Context needed:** Two research files by path

**Synthesis activities:**
- Create primary audience profile (demographics, psychographics)
- Document pain points and challenges
- Define goals and aspirations
- Articulate jobs-to-be-done
- Establish information preferences
- Identify key channels and touchpoints
- Note if additional persona extensions needed
- Add cross-references to research for audit trail

**Output:** `/strategy/audience/STRATEGY.md`

---

## Output Structure

Use template: [templates/audience.md](../../templates/audience.md)

**Required sections:**

1. **Frontmatter** - Metadata with last_updated, research sources
2. **Primary Audience Profile** - Who they are (demographics, psychographics)
3. **Pain Points & Challenges** - What problems they face
4. **Goals & Aspirations** - What they're trying to achieve
5. **Jobs-to-be-Done** - Functional and emotional jobs
6. **Information Preferences** - How they consume content
7. **Key Channels & Touchpoints** - Where to reach them
8. **Persona Extensions** - Note if additional personas needed

**Tone:** Prescriptive, empathetic, insights-driven
**Format:** Markdown with cross-references to research

---

## Extensions Pattern

Audience strategy can be extended for specific personas:

```
/strategy/audience/
├── STRATEGY.md              # Primary audience
├── CHANGELOG.md
├── enterprise-buyer/
│   └── EXTENSION.md         # Enterprise persona
└── individual-user/
    └── EXTENSION.md         # Individual persona
```

Base STRATEGY.md should note: "For specific persona profiles, see extensions: [Enterprise Buyer](enterprise-buyer/EXTENSION.md)"

---

## Update vs Create

**Creating (first time):**
- No existing STRATEGY.md
- Synthesize from research

**Updating:**
- Existing STRATEGY.md present
- Check if research sources are newer than strategy
- Only update if research has changed
- Update CHANGELOG.md with what changed
