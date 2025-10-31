# Competitive Research: @boringmarketer Analysis

## Research Objective

Conduct audience intelligence analysis on the @boringmarketer Twitter account to extract insights about shared audience interests, behavior patterns, and strategic opportunities for differentiation.

## Primary Research Questions

1. **Who is this audience?** What do they care about based on what they engage with?
2. **What problems/needs do they have?** What pain points emerge in their interactions?
3. **What value gaps exist?** What topics get engagement but feel underserved?
4. **How should this shift our strategy?** What opportunities emerge for differentiation?

## Execution Approach

Following the [competitive-research workflow](/.claude/skills/x-analysis/workflows/competitive-research.md), this analysis will be conducted in 4 phases:

### Phase 1: Content Scraping & Initial Segmentation
**Agent:** analyst-agent
**Deliverable:** `artifacts/01-scraped-content.md`

- Scrape high-engagement tweets from @boringmarketer
- X-scraper parameters:
  - `userName: "boringmarketer"`
  - `maxTweets: 150`
  - `lastMonths: 6`
  - `queryType: "Top"`
  - `minLikes: 50`
  - `includeReplies: false`
  - `includeRetweets: false`
- Segment by engagement type (saves, replies, retweets, likes)
- Identify top 20-30 highest-performing tweets
- Create initial topic categorization

### Phase 2: Parallel Analysis (3 Sub-phases)

#### Phase 2a: Content Pattern Analysis
**Agent:** analyst-agent
**Deliverable:** `artifacts/02a-content-patterns.md`

- Identify recurring content formats and structures
- Analyze topic/theme patterns
- Evaluate tone/style patterns
- Map content frameworks that consistently perform

#### Phase 2b: Audience Behavior Analysis
**Agent:** analyst-agent
**Deliverable:** `artifacts/02b-audience-behavior.md`

- Analyze reply patterns and questions
- Identify engagement triggers
- Extract pain points from audience interactions
- Map emotional needs

#### Phase 2c: Value Gap Identification
**Agent:** analyst-agent
**Deliverable:** `artifacts/02c-value-gaps.md`

- Identify high-engagement topics with low content supply
- Spot content angles NOT taken by this account
- Map underserved audience needs
- Identify differentiation opportunities

### Phase 3: Strategic Insight Synthesis
**Agent:** strategist-agent
**Deliverable:** `artifacts/03-strategic-insights.md`

- Synthesize findings into audience intelligence insights
- Identify 3-5 strategic positioning opportunities
- Recommend specific content angles to test
- Frame recommendations for strategic implications

### Phase 4: Final Research Synthesis
**Responsibility:** Main agent
**Deliverable:** `RESEARCH.md` (execution folder root)

- Create narrative synthesis of all findings
- Frame as audience intelligence with opportunities
- Highlight 3-5 key strategic opportunities with evidence
- Provide clear audit trail to artifacts

## Success Criteria

- [ ] Answer primary research questions about audience needs and behavior
- [ ] Identify 3-5 value gaps representing strategic opportunities
- [ ] Provide evidence trail from insights to supporting engagement data
- [ ] Generate actionable insights that inform strategy (without being strategy)
- [ ] Focus on audience psychology rather than content tactics
- [ ] Maintain objectivity (unopinionated factual gathering)

## Context & Integration

This research will inform content strategy development, particularly for Twitter/X platform content. Insights will flow:

```
This execution → /brand/research/adhoc/2025-10-30@15:01-boringmarketer-analysis/RESEARCH.md
         ↓ informs
/brand/strategy/content-strategy/ (future strategy development)
```

## Tools & Resources

- **X-Scraper MCP:** `mcp__x-scraper__scrape_user_tweets`
- **Workflow:** `.claude/skills/x-analysis/workflows/competitive-research.md`
- **Analysis Frameworks:** `.claude/skills/x-analysis/references/analysis-frameworks.md`
- **Sub-agents:** analyst-agent, strategist-agent
