# Pontusab Competitive Analysis - Audience Intelligence

**Created:** 2025-10-30@17:06
**Execution Folder:** `/brand/research/adhoc/2025-10-30@17:06-pontusab-analysis/`

## Objective

Perform comprehensive audience intelligence analysis of X/Twitter user @pontusab to understand what content resonates with their audience, identify engagement patterns, extract strategic opportunities through value gap analysis, and generate actionable insights about the target audience's needs and behavior.

## Approach

Follow the x-analysis competitive research workflow to:
1. Scrape high-engagement content from @pontusab using x-scraper MCP
2. Analyze content patterns, audience behavior, and value gaps in parallel
3. Synthesize findings into strategic insights
4. Create final research document with evidence-based recommendations

This follows the audience intelligence methodology: analyze engagement patterns to understand audience psychology and needs, identify strategic differentiation opportunities, and maintain clear audit trails from insights back to raw data.

## Input Data

**Location:** `data/`

None - workflow generates data from X/Twitter scraping via x-scraper MCP tool. All raw tweet data will be captured in Phase 1 artifacts.

## Step by Step Tasks

### 1. Content Scraping & Initial Segmentation

Gather high-engagement content from @pontusab and create initial categorization by engagement type and topic themes.

**Agent:** analyst-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- None (fresh data collection)

**Output Artifact:** `artifacts/01-scraped-content.md`

**Task Details:**

Use the x-scraper MCP tool to collect tweets from @pontusab with these parameters:
- `userName: "pontusab"` (no @ symbol)
- `maxTweets: 150` (substantial sample for pattern identification)
- `lastMonths: 6` (6-month window balances recency with patterns)
- `queryType: "Top"` (focus on proven high-engagement content)
- `minLikes: 50` (filter for resonance - adjust if needed based on account size)
- `includeReplies: false` (focus on original content only)
- `includeRetweets: false` (analyze their voice, not amplification)

After scraping, perform initial analysis:
1. **Engagement Segmentation** - Categorize tweets by engagement type signals:
   - High saves/bookmarks = highest value (content worth keeping)
   - High replies = conversation drivers (audience needs/questions)
   - High retweets = viral/shareable (relatable content)
   - Baseline likes = passive agreement
2. **Topic Categorization** - Group tweets into emerging themes/topics
3. **Top Performers** - Identify 20-30 highest-performing tweets across all engagement types

Create structured markdown document with:
- Overview (total tweets, date range, account stats)
- Engagement segmentation sections
- Initial topic/theme groupings
- Top performer lists with metrics

---

### 2a. Content Pattern Analysis

Identify recurring content formats, themes, and styles that consistently drive engagement.

**Agent:** analyst-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-scraped-content.md`

**Output Artifact:** `artifacts/02a-content-patterns.md`

**Task Details:**

Analyze the scraped content to identify patterns across:

1. **Content Formats:**
   - Threads vs single tweets
   - Media usage (images, videos, text-only)
   - Post structures (questions, statements, stories, lists, frameworks)

2. **Topic/Theme Patterns:**
   - Which topics consistently drive high engagement?
   - Topic frequency vs engagement (high engagement but low frequency = value gap signal)
   - Topic categories (educational, provocative, personal, industry insights, etc.)

3. **Tone/Style Patterns:**
   - Educational vs provocative vs story-driven
   - Personal vs professional voice
   - Data-driven vs opinion-based
   - Humor, vulnerability, authority signals

4. **Content Frameworks:**
   - Reusable templates that perform well
   - Hook patterns that capture attention
   - Narrative structures that retain engagement

**Analysis Questions to Answer:**
- What format gets the most saves? (High-value signal)
- What topics drive the most replies? (Conversation starters)
- What tone generates the most shares? (Viral potential)
- What patterns appear consistently in top-performing content?

Output should be structured markdown with clear sections, examples, and evidence from specific tweets.

---

### 2b. Audience Behavior Analysis

Understand audience psychology, needs, and pain points through engagement pattern analysis.

**Agent:** analyst-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-scraped-content.md`

**Output Artifact:** `artifacts/02b-audience-behavior.md`

**Task Details:**

Analyze audience behavior and psychology through engagement patterns:

1. **Reply Pattern Analysis:**
   - What questions do people ask in replies?
   - What problems/pain points do they mention?
   - What emotional responses emerge (validation, inspiration, frustration)?
   - What follow-up requests appear?

2. **Engagement Trigger Identification:**
   - What drives saves vs shares vs replies?
   - What call-to-actions work?
   - What hooks capture attention?
   - What value propositions resonate?

3. **Pain Point Extraction:**
   - Recurring problems mentioned
   - Unmet needs surfacing in interactions
   - Frustrations with current solutions
   - Aspirations and goals

4. **Emotional Needs Mapping:**
   - What emotional needs are being met (validation, inspiration, education, entertainment)?
   - What emotional triggers drive engagement?
   - What psychological drivers are present?

**Analysis Questions to Answer:**
- What problems keep appearing in replies and engagement?
- What questions are asked repeatedly?
- What emotional tone resonates most (validation, inspiration, education)?
- What unmet needs surface in audience interactions?

Output should focus on audience psychology and behavior patterns, not content tactics.

---

### 2c. Value Gap Identification

Discover strategic opportunities through identification of underserved audience needs and content gaps.

**Agent:** analyst-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-scraped-content.md`

**Output Artifact:** `artifacts/02c-value-gaps.md`

**Task Details:**

Identify strategic differentiation opportunities by finding value gaps:

1. **High-Engagement, Low-Supply Topics:**
   - Topics that get strong engagement but aren't frequently posted about
   - Questions asked in replies but not fully answered in content
   - Problems mentioned but not comprehensively solved
   - Interest signals without corresponding content

2. **Unexplored Content Angles:**
   - Perspectives NOT being taken by this account
   - Adjacent topics with no bridge content
   - Alternative frameworks or approaches
   - Contrarian or underrepresented viewpoints

3. **Underserved Audience Needs:**
   - Pain points acknowledged but not addressed
   - Questions that remain unanswered
   - Depth gaps (surface-level vs deep-dive opportunities)
   - Format gaps (missing content types)

4. **Differentiation Opportunities:**
   - Where could we provide unique value?
   - What angles could we own that others don't?
   - What expertise could we leverage uniquely?
   - What audience segments are underserved?

**Framework:** Think like a value investor - find market inefficiencies where demand exceeds supply.

**Analysis Questions to Answer:**
- What topics get engagement but feel underserved?
- What questions are asked but not fully answered?
- Where is the audience hungry but not being fed?
- What angles could we take that they don't?

Output should identify 3-7 concrete value gaps with supporting evidence.

---

### 3. Strategic Insight Synthesis

Transform all analysis into actionable strategic insights about the target audience and strategic opportunities.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/02a-content-patterns.md`
- `artifacts/02b-audience-behavior.md`
- `artifacts/02c-value-gaps.md`

**Output Artifact:** `artifacts/03-strategic-insights.md`

**Task Details:**

Synthesize all analytical findings into strategic insights:

1. **Key Audience Learnings (3-5 insights):**
   - Who is this audience based on engagement patterns?
   - What do they care about most?
   - What are their core needs and pain points?
   - What psychological drivers influence their behavior?

2. **Strategic Positioning Opportunities (3-5 opportunities):**
   - Where can we differentiate based on value gaps?
   - What unique angles can we own?
   - What underserved needs can we address?
   - How can we position against this competitive landscape?

3. **Content Strategy Recommendations:**
   - Specific content angles to test based on evidence
   - Topic priorities based on engagement patterns
   - Format recommendations based on what resonates
   - Tactical posting guidance grounded in data

4. **Strategic Implications:**
   - How should these insights shift our overall strategy?
   - What assumptions are validated or challenged?
   - What opportunities emerge for differentiation?
   - What risks or competitive threats exist?

**Output Structure:**
```markdown
# Strategic Insights

## Key Audience Learnings
[3-5 major insights about who this audience is and what they care about]

## Strategic Opportunities
[Specific opportunities for differentiation and positioning]

## Content Recommendations
[Actionable content angles to test based on evidence]

## Strategic Implications
[How these insights should shift our overall strategy]
```

Focus on "what this means for our strategy" while maintaining the research/strategy boundary (insights, not directives).

---

### 4. Final Research Synthesis

Create comprehensive narrative synthesis of all findings for the final RESEARCH.md document.

**Responsibility:** Main agent (not delegated)
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-scraped-content.md`
- `artifacts/02a-content-patterns.md`
- `artifacts/02b-audience-behavior.md`
- `artifacts/02c-value-gaps.md`
- `artifacts/03-strategic-insights.md`

**Output Artifact:** `RESEARCH.md` (execution folder root)

**Task Details:**

Create final research document that:
1. Synthesizes all findings into coherent narrative
2. Frames as "What we learned about our audience and where opportunities exist"
3. Highlights 3-5 key strategic opportunities with evidence
4. Provides clear audit trail back to supporting artifacts
5. Makes insights actionable for strategy development

**Structure:**
```markdown
# Audience Intelligence: @pontusab Analysis

## Executive Summary
[2-3 paragraphs summarizing key findings and strategic opportunities]

## Audience Intelligence Insights
[What we learned about this audience - psychology, needs, behavior patterns]

## Content Pattern Analysis
[What content resonates and why - formats, themes, styles]

## Value Gaps & Strategic Opportunities
[Where strategic opportunities exist for differentiation]

## Strategic Recommendations
[How this should inform our strategy - evidence-based guidance]

## Methodology
[Brief explanation of analysis approach and data sources]

## Evidence Trail
[Links to supporting artifacts for audit trail]
```

Maintain research/strategy boundary: describe what IS (insights, patterns, opportunities) not what to DO (tactical directives).

## Success Criteria

- **Research question answered:** Clear understanding of who pontusab's audience is and what they care about
- **3-5 value gaps identified:** Concrete strategic opportunities with supporting evidence
- **Evidence trail complete:** All insights trace back to engagement data and specific tweets
- **Actionable insights:** Findings that can inform strategy development without being prescriptive
- **Audience-centric focus:** Analysis centers on audience psychology and needs, not content mimicry
- **Pattern recognition:** Content frameworks and engagement patterns identified and explained
- **Audit-ready documentation:** Clear artifact structure with markdown references throughout
