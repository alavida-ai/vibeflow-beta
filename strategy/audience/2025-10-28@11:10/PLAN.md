# Plan: Synthesize Audience Strategy

## Objective

Create a prescriptive audience strategy file (STRATEGY.md) that transforms research findings from customer insights and founder interviews into clear, actionable guidance for who we're talking to, what they need, and how to reach them.

## Context

**Current State:**
- ✅ Comprehensive customer insights research exists (`/research/customer-insights/RESEARCH.md`)
- ✅ Founder interview with ICP definition complete (`/research/brand-story-interview/RESEARCH.md`)
- ❌ No STRATEGY.md exists in `/strategy/audience/` (only CHANGELOG.md)
- ✅ Rich persona data available (William: Technical Architect, Thomas: Results-Focused Pragmatist)
- ✅ Template structure available (`.claude/skills/synthesizing-strategy/templates/audience.md`)

**Research Quality:**
- Customer insights validated (HIGH confidence: 80%)
- Multiple personas identified with psychographic depth
- Jobs-to-be-done framework applied
- Customer language patterns extracted
- Clear pain points, aspirations, and behavioral markers documented

## Approach

This synthesis follows the **strategy synthesis workflow** pattern:

### Phase 1: Strategic Synthesis
**Purpose:** Transform unopinionated research findings into opinionated, prescriptive audience strategy

**Process:**
1. **Load research by path** (progressive disclosure)
   - `/research/customer-insights/RESEARCH.md` (primary personas)
   - `/research/brand-story-interview/RESEARCH.md` (ICP definition from founder)

2. **Synthesize strategic recommendations:**
   - Define primary audience profile (demographics + psychographics)
   - Document validated pain points with research citations
   - Articulate goals and aspirations
   - Detail jobs-to-be-done (functional, emotional, social)
   - Establish information consumption preferences
   - Identify key channels and touchpoints
   - Note persona extension opportunities (William vs Thomas variants)

3. **Create audit trail:**
   - Add markdown references linking claims to research sources
   - Use format: `[descriptive text](/path/to/file.md)`
   - Ensure every strategic assertion is traceable

4. **Write STRATEGY.md:**
   - Follow template structure from `.claude/skills/synthesizing-strategy/templates/audience.md`
   - Add frontmatter with date and research sources
   - Use prescriptive, strategic tone ("We should...", "Our audience needs...")
   - Maintain opinionated voice vs research's objective voice

5. **Update CHANGELOG.md:**
   - Document creation date
   - Note research sources used
   - Record what was established

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** Execute synthesis using workflow guidance from `.claude/skills/synthesizing-strategy/workflows/audience/WORKFLOW.md`
- **Context provided:** Paths to research files (not full content - progressive disclosure)

**Output:** `/strategy/audience/STRATEGY.md`

## Resources

**Skills:**
- `synthesizing-strategy` - Workflow patterns for research → strategy transformation
- `agentic-orchestrating` - Execution planning and progress tracking

**Research Files:**
- `/research/customer-insights/RESEARCH.md` - Persona profiles, pain points, JTBD
- `/research/brand-story-interview/RESEARCH.md` - ICP definition, founder philosophy

**Templates:**
- `.claude/skills/synthesizing-strategy/templates/audience.md` - STRATEGY.md structure

**Workflow Reference:**
- `.claude/skills/synthesizing-strategy/workflows/audience/WORKFLOW.md` - Synthesis process

## Key Decisions & Trade-offs

### Decision 1: Primary Persona Choice
**Question:** Which persona becomes the "primary audience" - William (Technical Architect) or Thomas (Results-Focused Pragmatist)?

**Recommendation:** **William (Technical Architect)** as primary
- Represents the archetypal "Marketing Architect" transformation
- Most aligned with founder philosophy (ownership over convenience)
- Deepest data available (4 transcript conversations)
- Thomas can be documented as variant/extension

**Trade-off:** May feel narrower than including both equally, but creates clearer strategic focus

---

### Decision 2: Persona Extensions
**Question:** Should we create separate EXTENSION.md files for William and Thomas personas?

**Recommendation:** **Not initially** - document both in STRATEGY.md
- Both share core pain points and aspirations
- Difference is *motivation* (philosophical vs commercial) not fundamentals
- Extensions make sense for *audience segments* (e.g., enterprise vs SMB), not individual archetypes
- Can split later if messaging requires distinct approaches

**Trade-off:** Less granular initially, but avoids premature fragmentation

---

### Decision 3: Tone - Empathetic vs Aspirational
**Question:** Should audience strategy emphasize pain (empathy) or aspiration (identity transformation)?

**Recommendation:** **Balanced** - acknowledge pain but lead with aspiration
- Pain points are real and validated ("Productivity Paradox", "Trust Issues")
- But transformation narrative is more powerful ("Tactician → Architect")
- Research shows identity shift is core value proposition
- Use pain to establish credibility, aspiration to drive action

**Trade-off:** Could risk appearing less empathetic if overly aspirational, but aligns with "ambitious minority" positioning

---

### Decision 4: Customer Language Integration
**Question:** How heavily should we use customer-specific language (e.g., "vibe marketing", "AI slop")?

**Recommendation:** **Mirror validated language, note emerging language**
- Confirmed patterns: "Marketing Architect", "working ON vs IN business", "trust issues", "AI slop"
- William's "vibe marketing" is noted as customer language but needs broader validation
- Create "Customer Language Patterns" section in STRATEGY.md to track this

**Trade-off:** May need to refine language as more customers interviewed, but establishes baseline

## Success Criteria

**STRATEGY.md is successful if:**
- ✅ Every claim links back to research via markdown references
- ✅ Clear primary audience profile (demographics + psychographics)
- ✅ 3-5 validated pain points with research citations
- ✅ JTBD framework applied (functional, emotional, social jobs)
- ✅ Information preferences and channel strategy defined
- ✅ Tone is prescriptive and strategic (not just descriptive)
- ✅ Marketing Architect can use this to make channel, messaging, and content decisions
- ✅ Frontmatter includes date and research sources
- ✅ CHANGELOG.md updated with creation entry

**Quality checklist:**
- [ ] No generic statements that could apply to any brand
- [ ] All strategic assertions traceable to research
- [ ] Language mirrors customer voice (not generic marketing speak)
- [ ] Extensions pattern noted for future persona work
- [ ] Ready for use in content creation and messaging development

## Dependencies

**Blockers:** None
- All required research files exist and are validated
- Template and workflow guidance available
- No external approvals needed to proceed

**Next Steps After Completion:**
1. Marketing Architect reviews STRATEGY.md
2. Validate audience strategy informs next synthesis:
   - `/strategy/messaging/` (what we say to this audience)
   - `/strategy/voice/` (how we sound to this audience)
3. Consider additional customer interviews to validate Thomas persona more deeply

## Notes

- This is a **creation** not an **update** (no existing STRATEGY.md)
- Research was last updated 2025-10-16, creating baseline
- Future updates should only trigger when research sources are refreshed
- Persona extensions can be added later as needed for channel-specific strategies
- Customer language patterns should be tracked as living vocabulary for voice/messaging work
