# Phase 1: Competitor Identification

**Purpose:** Identify 5-10 direct and indirect competitors with validated URLs and map them to positioning hypotheses.

---

## Task Overview

Execute Phase 1 of competitive landscape research to identify the competitive set. Your output will feed into Phase 2 (parallel research execution).

---

## Context You'll Need

**Session metadata containing:**
- Category/space to analyze
- Initial competitor list (if provided by user)
- Hypotheses from founder interview

Read the session context first to understand what you're researching.

---

## Execution Instructions

### Step 1: Determine if Competitor Research Needed

**If session metadata contains a complete competitor list (5+ competitors with URLs):**
- ✅ Skip to Step 3 (validation)

**If competitor list is incomplete or missing:**
- ⚠️ Proceed to Step 2 (research)

---

### Step 2: Research Competitors (if needed)

**Ask the user:**
```
To map your competitive landscape, I need to know:

1. Who are your top 5 direct competitors? (Include URLs if possible)
2. What category/space do you compete in? (e.g., 'project management SaaS', 'wellness apps')
3. Any specific positioning tensions from our discovery interview you want me to validate?

(Or should I research your category to identify top players?)
```

**If user requests research:**

Use **Perplexity research** to:
- Identify top 10 players in the category
- Find their websites
- Categorize by market segment (enterprise, SMB, consumer, etc.)

**Research query examples:**
- "Who are the top competitors in [category] as of 2025?"
- "List the main companies in [category] space with their positioning"
- "Market leaders in [category] ranked by market share"

---

### Step 3: Validate Competitor Set

**Criteria for a good competitive set:**
- [ ] 5-10 competitors identified
- [ ] All have accessible websites (URLs confirmed)
- [ ] Mix of direct and indirect competitors
- [ ] Represent different positioning clusters (if known)
- [ ] Relevant to the brand's category and audience

**Quality check:**
```markdown
| Competitor | URL | Category Fit | Positioning Hypothesis |
|------------|-----|--------------|------------------------|
| [Name] | [URL] | Direct/Indirect | [What territory they claim] |
```

---

### Step 4: Contextualize for Research

**For each competitor, document:**
1. **Name & URL** - Full website address
2. **Category fit** - Direct competitor, indirect competitor, or adjacent player
3. **Known positioning** - Any public claims (e.g., "the simplest project management tool")
4. **Hypothesis connection** - Which founder interview hypothesis this competitor helps validate

**Example:**
```markdown
### Notion (notion.so)
- **Category fit:** Direct competitor (all-in-one workspace)
- **Known positioning:** "All-in-one workspace" (flexibility/customization)
- **Hypothesis:** Tests whether "flexibility" territory is saturated
```

---

## Output Deliverable

Create a competitor identification artifact with this structure:

```markdown
---
phase: 1
date: [today's date]
competitors_count: [number]
category: [category/space]
---

# Phase 1: Competitors Identified

## Category Definition
[What category/space are we analyzing?]

**Examples:**
- "Project management SaaS for remote teams"
- "B2B sales enablement platforms"
- "Consumer wellness & meditation apps"

---

## Competitor Set

### Direct Competitors
[Primary competitors who solve the same problem for the same audience]

| # | Competitor | URL | Known Positioning |
|---|------------|-----|-------------------|
| 1 | [Name] | [URL] | [Brief positioning statement] |
| 2 | [Name] | [URL] | [Brief positioning statement] |
| ... | | | |

### Indirect Competitors
[Competitors who solve related problems or serve adjacent audiences]

| # | Competitor | URL | Known Positioning |
|---|------------|-----|-------------------|
| 1 | [Name] | [URL] | [Brief positioning statement] |
| ... | | | |

---

## Hypotheses to Validate

**From founder interview:**

1. **Hypothesis:** [e.g., "Competitors focus on 'speed' leaving 'quality' unclaimed"]
   - **Competitors to test:** [Which competitors we'll analyze for this]

2. **Hypothesis:** [Next hypothesis]
   - **Competitors to test:** [Which competitors we'll analyze for this]

---

## Research Scope

**Pages to analyze per competitor:**
- Homepage (positioning, headlines)
- About page (mission, values)
- Pricing page (value props, tiers)
- Product/Features page (capabilities, benefits)

**Data to extract:**
- Primary positioning statements
- Value propositions
- Tone & voice patterns
- Visual identity (brand colors, style)
- Keyword targets (SEO/SEM)

---

## Ready for Phase 2

✅ Competitor set validated (5+ competitors)
✅ All URLs confirmed accessible
✅ Hypotheses mapped to competitors
✅ Research scope defined

**Next:** Phase 2 (Research Execution) will analyze these competitors in detail.
```

---

## Success Criteria

Before proceeding to Phase 2, verify:

✅ **Minimum 5 competitors** with valid URLs
✅ **Category clearly defined** (not too broad, not too narrow)
✅ **Hypotheses contextualized** - Each competitor maps to at least one hypothesis
✅ **Research scope defined** - Clear on what pages/data to extract
✅ **Output documented** - Complete competitor identification artifact

---

## Troubleshooting

**Issue:** User doesn't know their competitors
- **Solution:** Research the category yourself using Perplexity research
- **Query:** "Top companies in [category] 2025"

**Issue:** Too many competitors (15+)
- **Solution:** Prioritize top 5 direct + 2-3 indirect
- **Rationale:** Focus on quality over quantity for deep analysis

**Issue:** Competitor websites are inaccessible (paywalls, etc.)
- **Solution:** Use alternative sources (G2, Capterra, product reviews)
- **Fallback:** Use Perplexity to scrape public info about their positioning
