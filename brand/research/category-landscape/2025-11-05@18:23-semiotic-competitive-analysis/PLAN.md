# Semiotic Competitive Analysis

**Created:** 2025-11-05@18:23
**Execution Folder:** `/brand/research/adhoc/2025-11-05@18:23-semiotic-competitive-analysis/`

## Objective

Perform competitive research on Semiotic (https://www.semiotic.so/) to understand how their positioning, messaging, and service offerings compare to our AMA methodology and Marketing Architect principle. Identify areas of overlap and differentiation.

## Approach

This research follows a three-phase approach:

1. **Internal Context Loading** - Load our current strategy documents (positioning, brand-fundamentals, audience) to establish our baseline
2. **Competitor Research** - Deep dive into Semiotic's website, positioning, messaging, and service offerings
3. **Comparative Analysis** - Synthesize findings to identify overlaps, differences, and strategic implications

This enables a thorough comparison grounded in our current positioning while understanding Semiotic's approach.

## Input Data

**Location:** `data/`

None - workflow generates data from web research and existing strategy files.

## Step by Step Tasks

### 1. Internal Strategy Review

Load and synthesize our current positioning to establish comparison baseline.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `/brand/strategy/positioning/STRATEGY.md`
- `/brand/strategy/brand-fundamentals/STRATEGY.md`
- `/brand/strategy/audience/STRATEGY.md`

**Output Artifact:** `artifacts/01-our-positioning-summary.md`

**Task Details:**

Read the three strategy files listed above and create a concise summary that captures:
- Our core positioning and value proposition
- Our target audience and their needs
- Our brand fundamentals (mission, vision, principles)
- Key differentiators and unique approach
- The AMA methodology and Marketing Architect principle

Format this as a structured summary that can be referenced during comparative analysis. Include direct quotes and file references where relevant.

---

### 2. Semiotic Competitor Research

Research Semiotic's website, positioning, messaging, and service offerings.

**Agent:** analyst (use researching skill)
**Instructions:** Inline instructions below
**Input Artifacts:**
- None (fresh web research)

**Output Artifact:** `artifacts/02-semiotic-research.md`

**Task Details:**

Conduct comprehensive research on Semiotic (https://www.semiotic.so/) using the researching skill. Analyze and document:

**Website & Brand Analysis:**
- Homepage messaging and value proposition
- Service offerings and how they're positioned
- Target audience and customer segments
- Brand voice, tone, and messaging patterns
- Visual identity and design approach

**Methodology & Approach:**
- How they describe their process/methodology
- Any frameworks or systems they reference
- Their positioning on marketing + design + AI/automation
- How they position themselves vs traditional agencies

**Differentiation & Claims:**
- What makes them unique (according to them)
- Key claims about their service/value
- Social proof, case studies, testimonials
- Pricing model (if available)

Use web scraping, content analysis, and any publicly available information. Capture specific quotes and evidence from their website.

---

### 3. Comparative Analysis

Synthesize findings from our strategy and Semiotic research into a comparative analysis.

**Agent:** analyst
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-our-positioning-summary.md`
- `artifacts/02-semiotic-research.md`

**Output Artifact:** `artifacts/03-comparative-analysis.md` and `RESEARCH.md`

**Task Details:**

Synthesize the previous two artifacts into a comprehensive comparative analysis. Structure the analysis around:

**1. Overlap Areas**
- Where do we share similar positioning or messaging?
- What concepts/principles do both use?
- Target audience similarities
- Service/offering overlaps

**2. Key Differences**
- How does our AMA methodology differ from their approach?
- Positioning differences (subtle and significant)
- Different target audiences or use cases
- Different value propositions

**3. Competitive Implications**
- What does this similarity mean for our positioning?
- Where might we face direct competition?
- Where can we differentiate more clearly?
- Opportunities to sharpen our positioning

**4. Strategic Recommendations**
- Should we adjust our positioning?
- Areas to emphasize/de-emphasize
- Messaging considerations
- Market positioning strategy

Create both:
- `artifacts/03-comparative-analysis.md` - Detailed analysis with evidence
- `RESEARCH.md` - Executive summary with key findings and recommendations

---

### 4. Index Integration - Add Semiotic to Main Research File

Update the main category landscape research index with Semiotic competitor profile.

**Agent:** analyst
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/02-semiotic-research.md` (source data)
- `artifacts/03-comparative-analysis.md` (strategic context)
- `/brand/research/category-landscape/RESEARCH.md` (index to update)

**Output Artifact:** Updated `/brand/research/category-landscape/RESEARCH.md`

**Task Details:**

Read the main research index at `/brand/research/category-landscape/RESEARCH.md` and integrate Semiotic findings in a way that:

**Maintains Consistency:**
- Match the format, structure, and depth of existing competitor profiles (e.g., Jasper, HubSpot, Copy.ai)
- Keep information density proportional - no more/less detail than other competitors
- Use the same evidence-based format (direct quotes, citations, references)

**Add Semiotic Entry:**
- Add to "Competitors Analyzed" section
- Create competitor profile with same subsections as others
- Update any comparison tables or summary sections
- Preserve all existing content and structure

**Key Principle:** This is ADDITIVE ONLY - add Semiotic without bloating the file or changing other entries. The Semiotic section should be roughly equal in length/detail to other competitor sections.

---

### 5. Validation - Ensure Index Integrity

Independent validation to prevent index bloat and maintain consistency.

**Agent:** general-purpose (separate agent for objectivity)
**Instructions:** Inline instructions below
**Input Artifacts:**
- `/brand/research/category-landscape/RESEARCH.md` (updated index)
- Original `/brand/research/category-landscape/RESEARCH.md` (from git history if available)

**Output Artifact:** `artifacts/05-validation-report.md` and `CHANGELOG.md`

**Task Details:**

Perform independent validation of the updated RESEARCH.md index:

**Consistency Checks:**
- Compare Semiotic profile length to other competitor profiles (count words/sections)
- Verify formatting matches existing entries (headings, lists, quotes)
- Check information density is proportional (not overly detailed or sparse)
- Ensure no redundancy with existing sections

**Bloat Prevention:**
- Confirm total file size increase is reasonable (proportional to adding one competitor)
- Verify no duplication of information across sections
- Check that strategic insights are concise, not verbose
- Ensure references are to-the-point, not excessive

**Create Validation Report:**
Document in `artifacts/05-validation-report.md`:
- Word count comparison (Semiotic vs other competitors)
- Structural consistency assessment
- Any recommendations for trimming or adjustment
- Approval or flagged concerns

**Create CHANGELOG.md:**
Add entry to `/brand/research/category-landscape/CHANGELOG.md` documenting:
- Date of update
- What was added (Semiotic competitor profile)
- Source execution folder reference
- Summary of key findings added to index

If validation identifies concerns, flag for Marketing Architect review before finalizing.

## Success Criteria

- ✅ Complete understanding of our current positioning documented
- ✅ Comprehensive research on Semiotic's positioning, messaging, and offerings
- ✅ Clear identification of overlap areas and differences
- ✅ Actionable strategic recommendations for positioning
- ✅ All claims backed by evidence (quotes, references, links)
- ✅ Semiotic competitor profile added to main research index
- ✅ Information density consistent with other competitors (no bloat)
- ✅ Independent validation confirms index integrity
- ✅ CHANGELOG.md updated with transparent audit trail
