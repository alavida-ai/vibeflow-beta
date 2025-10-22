# Phase 2A: Competitive Positioning Research

**Purpose:** Analyze competitor positioning statements, keyword strategies, and market trends to identify white space opportunities.

---

## Task Overview

Extract and analyze how competitors position themselves in the market through their explicit positioning claims, keyword targeting, and value propositions. This research stream runs in parallel with messaging analysis to provide comprehensive competitive intelligence.

**Your focus:** Positioning statements, keyword data, market intelligence

---

## Context You'll Need

**Competitor identification artifact containing:**
- Competitor list with URLs
- Hypotheses to validate
- Research scope

Read this context first to understand what needs to be researched.

---

## Research Tasks

### For Each Competitor:

#### 1. Scrape Key Pages

**Pages to analyze:**
- Homepage (hero section, headlines)
- About page (mission, positioning statements)
- Pricing page (value props, tiers)

**Tool:** Use **Firecrawl scraping**

**Extract:**
- Primary headline/tagline
- Positioning statement (how they describe themselves)
- Key value propositions (3-5 per competitor)
- Target audience mentions
- Competitive differentiators (if stated)

**Example:**
```
Competitor: Notion
Homepage headline: "Your wiki, docs & projects. Together."
Positioning: "All-in-one workspace"
Value props:
  1. "One tool for your whole team"
  2. "Infinitely flexible and customizable"
  3. "Works the way you work"
```

---

#### 2. Keyword Analysis

**Identify:**
- Primary keywords they rank for
- Keyword clusters (themes)
- Search volume and traffic estimates

**Tools:**
- Use **DataForSEO ranked keywords** - What they rank for
- Use **DataForSEO keyword ideas** - Keyword clustering

**Extract:**
- Top 10 keywords (by volume)
- Keyword themes (e.g., "efficiency," "collaboration," "simplicity")
- Estimated traffic volume

**Example:**
```
Competitor: Notion
Top keywords:
  - "notion" (500K searches/mo)
  - "project management tool" (50K searches/mo)
  - "note taking app" (40K searches/mo)

Keyword themes:
  - Productivity cluster: "organize," "manage," "workflow"
  - Flexibility cluster: "customizable," "templates," "blocks"
```

---

#### 3. Market Trends Research

**Research broader category trends:**
- What's emerging in this space?
- What are customers asking for?
- How is the market evolving?

**Tool:** Use **Perplexity search**

**Query examples:**
- "What are the latest trends in [category] as of 2025?"
- "How is [category] market evolving?"
- "What do customers want from [category] solutions?"

**Extract:**
- 3-5 key trends
- Customer pain points
- Emerging opportunities

---

## Output Deliverable

Create a research analyst findings artifact with this structure:

```markdown
---
phase: 2a
agent: research-analyst
date: [today's date]
competitors_analyzed: [number]
---

# Phase 2A: Research Analyst Findings

## Competitor Positioning Analysis

### [Competitor 1 Name]

**URL:** [URL]

**Positioning Statement:**
"[Their primary tagline/headline from homepage]"

**Value Propositions:**
1. [VP 1 with quote/evidence]
2. [VP 2 with quote/evidence]
3. [VP 3 with quote/evidence]

**Target Audience:**
[Who they explicitly mention targeting]

**Differentiators:**
[How they claim to be different, with quotes]

**Top Keywords:**
| Keyword | Search Volume | Rank Position |
|---------|---------------|---------------|
| [keyword] | [volume] | [position] |
| ... | ... | ... |

**Keyword Themes:** [e.g., "efficiency," "automation," "speed"]

---

[Repeat for each competitor]

---

## Market Intelligence

### Category Trends (2025)
[What's emerging in this space? What are customers asking for?]

**Sources:** [Cite Perplexity research queries]

### Keyword Clusters
[What keyword themes dominate the category?]

**Example:**
- Efficiency cluster: "streamline," "automate," "faster" (60% of competitors)
- Simplicity cluster: "easy," "intuitive," "simple" (30% of competitors)

### Traffic Estimates
[Which competitors dominate organic search?]

---

## Hypothesis Validation: Positioning Territory

**Hypothesis 1:** [From competitor identification]
**Evidence:**
- [Competitor X] claims [territory]: "[quote]"
- [Competitor Y] also uses similar language: "[quote]"
- **Conclusion:** ✅ Validated / ⚠️ Partially / ❌ Contradicted

[Repeat for each hypothesis]

---

## Strategic Insights

### Territory Claimed
[What positioning territories are clearly occupied?]

### Potential White Space
[Based on positioning analysis, what territories seem unclaimed?]

### Risks
[Are there territories that seem obviously ownable but competitors haven't claimed? Why?]

---

## Data Quality Notes
- [Any competitors where data was limited/inaccessible]
- [Tools that worked well vs. had issues]
- [Confidence level in findings: High/Medium/Low]

---

## Ready for Synthesis
✅ All competitors analyzed
✅ Positioning statements extracted
✅ Keyword data collected
✅ Hypotheses tested against evidence
```

---

## Success Criteria

Before completing your task, verify:

✅ **All competitors analyzed** - Each has positioning data
✅ **Evidence-based** - Quotes and citations from actual competitor sites
✅ **Keyword data collected** - Top keywords and themes identified
✅ **Hypotheses tested** - Each hypothesis has validation status
✅ **Output documented** - Complete research analyst findings artifact

---

## Troubleshooting

**Issue:** Can't access competitor website
- **Solution:** Use Perplexity to research public info about the competitor
- **Fallback:** Use review sites (G2, Capterra) for positioning data

**Issue:** Limited keyword data available
- **Solution:** Use broader category keywords instead of competitor-specific
- **Tool:** DataForSEO keyword ideas

**Issue:** Competitor has no clear positioning statement
- **Solution:** Synthesize from homepage hero, about page, and value props
- **Look for:** Repeated phrases, taglines, meta descriptions