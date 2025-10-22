# Execution Plan: Discover Category Landscape

**Skill:** discover-category-landscape
**Execution Folder:** `/research/discover-category-landscape/20251020-172907-execution-1/`
**Created:** 2025-10-20 17:29:07
**Status:** Planning Complete - Ready for Implementation

---

## Workflow Overview

**Research Objective:** Map the competitive landscape to identify strategic white space and validate positioning hypotheses through multi-phase research covering competitor identification, positioning analysis, messaging patterns, and strategic synthesis.

**Goal:** Understand where competitors position themselves and identify strategic opportunities for differentiation.

---

## Research Phases

### Phase 1: Competitor Identification
**Agent:** general-purpose
**Purpose:** Establish the competitive set and validate category boundaries

**Activities:**
- Identify 5-7 direct competitors in the category
- Validate category definition based on actual market landscape
- Contextualize strategic hypotheses for validation in subsequent phases

**Output:** `01-competitors-identified.md`

---

### Phase 2A: Positioning Research (Parallel)
**Agent:** market-research-analyst
**Purpose:** Understand how competitors position themselves in the market

**Activities:**
- Analyze positioning statements and value propositions
- Conduct keyword and SEO analysis to understand market language
- Identify market trends and positioning patterns
- Validate or refine initial positioning hypotheses

**Output:** `02a-research-analyst-findings.md`

---

### Phase 2B: Messaging Analysis (Parallel)
**Agent:** market-research-analyst
**Purpose:** Decode competitive messaging themes and communication patterns

**Activities:**
- Analyze messaging themes and brand narratives
- Identify tone and voice patterns across competitors
- Conduct language analysis (word frequency, themes)
- Cluster competitors by messaging approach

**Output:** `02b-content-analyst-findings.md`

**Note:** Phases 2A and 2B run in parallel after Phase 1 completes.

---

### Phase 3: Strategic Synthesis
**Agent:** general-purpose
**Purpose:** Transform raw research into strategic insights and recommendations

**Activities:**
- Create positioning map showing competitor clustering
- Identify strategic white space opportunities
- Validate positioning hypotheses with supporting evidence
- Provide actionable strategic recommendations

**Outputs:**
- `03-synthesis-draft.md` (working analysis)
- `RESEARCH.md` (final published report)

---

## Expected Outputs

All artifacts will be created in this execution folder using standardized naming:

| Phase | File | Description |
|-------|------|-------------|
| Metadata | `00-session-metadata.md` | Session context, hypotheses, initial competitor list |
| Phase 1 | `01-competitors-identified.md` | Competitive set identification |
| Phase 2A | `02a-research-analyst-findings.md` | Positioning analysis |
| Phase 2B | `02b-content-analyst-findings.md` | Messaging analysis |
| Phase 3 | `03-synthesis-draft.md` | Strategic synthesis (working draft) |
| Final | `RESEARCH.md` | Published research report |

---

## Final Output Structure

The final `RESEARCH.md` report will include:

1. **Executive Summary** - Key findings and strategic recommendation
2. **Positioning Map** - Visual representation of competitive landscape
3. **White Space Analysis** - Identified differentiation opportunities
4. **Hypothesis Validation** - Evidence-based validation of positioning hypotheses
5. **Competitive Insights** - Detailed findings on positioning and messaging
6. **Strategic Recommendations** - Actionable next steps

---

## Success Criteria

✅ **Competitive Set Defined:** 5-7 direct competitors identified and validated
✅ **Positioning Mapped:** Clear understanding of how competitors position themselves
✅ **White Space Identified:** Strategic differentiation opportunities documented
✅ **Hypotheses Validated:** Evidence-based validation of positioning hypotheses
✅ **Actionable Insights:** Strategic recommendations for brand positioning

---

## Estimated Complexity

**Overall Complexity:** Medium-High

- **Phase Count:** 3 major phases (with parallel execution in Phase 2)
- **Agent Delegation:** 3 specialized agents (general-purpose, market-research-analyst x2)
- **Research Depth:** Comprehensive analysis across positioning and messaging
- **Parallel Work:** Phase 2A and 2B execute concurrently
- **Estimated Duration:** 2-4 hours (depends on research depth and iteration)

---

## Required Context

Before execution begins, you'll need to provide:

1. **Category Definition** - What market/category are we analyzing?
2. **Initial Competitor List** (optional) - Any known competitors to validate?
3. **Strategic Hypotheses** (optional) - Positioning hypotheses to validate?
4. **Brand Context** (optional) - Information about your brand for contextualization?

This context will be captured in `00-session-metadata.md` during the first phase.

---

## Next Steps

**Review this plan** - Ensure the phases and outputs align with your research goals

**When ready to execute:**
```
/implement /research/discover-category-landscape/20251020-172907-execution-1/
```

The implementation command will:
1. Prompt you for initial context (session metadata)
2. Execute each phase sequentially (with parallel Phase 2A/2B)
3. Update progress in `TODO.md` as phases complete
4. Generate all artifacts according to the naming conventions
5. Produce final `RESEARCH.md` report with strategic insights
