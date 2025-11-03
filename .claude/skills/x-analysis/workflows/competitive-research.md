# Competitive Research Workflow

## Overview

This workflow performs **Audience Intelligence Analysis** by analyzing X content from a target account to extract insights about shared audience interests, behavior patterns, and strategic opportunities.

**Primary Goal:** Learn about our target audience through real-world engagement data from accounts they follow and interact with.

**Secondary Outputs:** Content frameworks that resonate, tactical posting guidance, topic prioritization.

---

## Research Question Framework

When analyzing a target X account, focus on answering:

1. **Who is this audience?** What do they care about based on what they engage with?
2. **What problems/needs do they have?** What pain points emerge in their interactions?
3. **What value gaps exist?** What topics get engagement but feel underserved?
4. **How should this shift our strategy?** What opportunities emerge for differentiation?

---

## Execution Structure

This workflow follows the [agentic-orchestrating](/brand/.claude/skills/agentic-orchestrating/SKILL.md) pattern.

**Location:** `/brand/research/audience-intelligence/{YYYY-MM-DD@HH:mm}/`

**Alternative:** For one-off analyses, use `/brand/research/adhoc/{YYYY-MM-DD@HH:mm-account-analysis}/`

---

## Phase Breakdown

### Phase 1: Content Scraping & Initial Segmentation

**Agent:** analyst-agent
**Purpose:** Gather high-engagement content and create initial categorization
**Output:** `artifacts/01-scraped-content.md`

**Tasks:**
- Use x-scraper to pull high-engagement tweets from target account
  - Recommended parameters: `minLikes: 50`, `lastMonths: 6`, `queryType: "Top"`
- Segment tweets by engagement type:
  - **Saves/bookmarks** = highest value signal (content worth keeping)
  - **Replies** = conversation/questions (audience needs)
  - **Retweets** = shareworthy/relatable (viral potential)
  - **Likes** = passive agreement (baseline engagement)
- Identify top 20-30 highest-performing tweets
- Create initial categorization by topic/theme

**Expected Output Structure:**
```markdown
# Scraped Content Analysis

## Overview
- Total tweets analyzed: X
- Date range: YYYY-MM-DD to YYYY-MM-DD
- Account: @username

## Engagement Segmentation

### High-Value Content (Saves/Bookmarks)
[List of tweets with high save rates]

### Conversation Drivers (High Reply Count)
[List of tweets that triggered discussions]

### Viral Content (High Retweet Rate)
[List of most-shared content]

## Initial Topic Categorization
[Group tweets by emerging themes]
```

---

### Phase 2a: Content Pattern Analysis (Parallel)

**Agent:** analyst-agent
**Purpose:** Identify what content formats and themes consistently drive engagement
**Input:** `artifacts/01-scraped-content.md`
**Output:** `artifacts/02a-content-patterns.md`

**Tasks:**
- Identify recurring content formats:
  - Threads vs. single tweets
  - Media types (images, videos, text-only)
  - Post structures (questions, statements, stories)
- Analyze topic/theme patterns across high-engagement content
- Evaluate tone/style patterns:
  - Educational vs. provocative vs. story-driven
  - Personal vs. professional
  - Data-driven vs. opinion-based
- Map content frameworks that consistently perform

**Analysis Questions:**
- What format gets the most saves? (High-value signal)
- What topics drive the most replies? (Conversation starters)
- What tone generates the most shares? (Viral potential)
- What patterns appear in top-performing content?

---

### Phase 2b: Audience Behavior Analysis (Parallel)

**Agent:** analyst-agent
**Purpose:** Understand audience psychology and needs through engagement patterns
**Input:** `artifacts/01-scraped-content.md`
**Output:** `artifacts/02b-audience-behavior.md`

**Tasks:**
- Analyze reply patterns:
  - What questions do people ask?
  - What problems do they mention?
  - What emotional responses emerge?
- Identify engagement triggers:
  - What drives saves vs. shares vs. replies?
  - What call-to-actions work?
  - What hooks capture attention?
- Extract pain points mentioned in audience interactions
- Map emotional needs being met or unmet

**Analysis Questions:**
- What problems keep appearing in replies?
- What questions are asked repeatedly?
- What emotional tone resonates (validation, inspiration, education)?
- What unmet needs surface in the comments?

---

### Phase 2c: Value Gap Identification (Parallel)

**Agent:** analyst-agent
**Purpose:** Discover strategic opportunities through underserved audience needs
**Input:** `artifacts/01-scraped-content.md`
**Output:** `artifacts/02c-value-gaps.md`

**Tasks:**
- Identify high-engagement topics with low content supply
  - Topics that get engagement but aren't frequently posted about
  - Questions asked but not fully answered
  - Problems mentioned but not solved
- Spot content angles NOT being taken by this account
- Map underserved audience needs
- Identify differentiation opportunities

**Analysis Questions:**
- What topics get engagement but feel underserved?
- What questions are asked but not fully answered in content?
- Where is the audience hungry but not being fed?
- What angles could we take that they don't?

**Framework:** This is the "value investing" play—finding gaps in market attention.

---

### Phase 3: Strategic Insight Synthesis

**Agent:** strategist-agent
**Purpose:** Transform analysis into actionable strategic insights
**Input:**
  - `artifacts/02a-content-patterns.md`
  - `artifacts/02b-audience-behavior.md`
  - `artifacts/02c-value-gaps.md`
**Output:** `artifacts/03-strategic-insights.md`

**Tasks:**
- Synthesize findings into audience intelligence insights
- Identify 3-5 strategic positioning opportunities
- Recommend specific content angles to test
- Connect insights to business strategy implications
- Frame recommendations as "what this means for our strategy"

**Expected Output Structure:**
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

---

### Phase 4: Final Research Synthesis

**Responsibility:** Main agent (not delegated)
**Purpose:** Create narrative synthesis for the research index
**Input:** All artifacts from previous phases
**Output:** `RESEARCH.md` (execution folder root)

**Tasks:**
- Create narrative synthesis of all findings
- Frame as "What we learned about our audience and where opportunities exist"
- Highlight 3-5 key strategic opportunities with evidence
- Provide clear audit trail back to artifacts
- Make insights actionable for strategy development

**Structure:**
```markdown
# Audience Intelligence: @[account-name] Analysis

## Executive Summary
[2-3 paragraphs on key findings]

## Audience Intelligence Insights
[What we learned about this audience]

## Value Gaps & Opportunities
[Where strategic opportunities exist]

## Strategic Recommendations
[How this should inform our strategy]

## Evidence Trail
[Links to supporting artifacts]
```

---

## X-Scraper Parameters Guide

### For Competitive Research (Audience Intelligence)

**Recommended settings:**
```javascript
{
  userName: "target-account",
  maxTweets: 100-200,           // Get substantial sample
  lastMonths: 6,                // 6-month window for patterns
  queryType: "Top",             // Focus on high-engagement
  minLikes: 50,                 // Filter for proven resonance
  minRetweets: 10,              // Optional: viral potential
  includeReplies: false,        // Focus on original content
  includeRetweets: false        // Analyze their voice, not amplification
}
```

**Why these parameters:**
- `queryType: "Top"` focuses on what actually resonated
- `minLikes` filters for proven engagement (adjust based on account size)
- 6-month window balances recency with pattern identification
- Excluding replies/retweets focuses on their original voice

---

## Success Criteria

A successful audience intelligence analysis should:

1. **Answer the primary research question:** What did we learn about our audience through their engagement patterns?
2. **Identify 3-5 value gaps** that represent strategic opportunities
3. **Provide evidence trail** from insights back to raw engagement data
4. **Generate actionable recommendations** that can inform strategy updates
5. **Avoid content mimicry** - focus on understanding audience, not copying tactics

---

## Integration with Marketing Framework

### Research → Strategy Flow

```
/brand/research/audience-intelligence/RESEARCH.md
         ↓ informs
/brand/strategy/content-strategy/{YYYY-MM-DD@HH:mm}/
         ↓ creates/updates
/brand/strategy/content-strategy/STRATEGY.md
         ↓ with platform extension
/brand/strategy/content-strategy/twitter/EXTENSION.md
```

### Key Principle

Research provides **audience intelligence** (what IS), not content strategy (what to DO). The strategist-agent synthesizes research into strategy during strategy development phases.

---

## Common Pitfalls to Avoid

1. **Copying content frameworks without understanding why they work**
   - Focus on audience psychology, not surface-level tactics

2. **Analyzing account success vs. audience behavior**
   - We care about what the AUDIENCE engages with, not just what performs
   - High follower count ≠ relevant insights for our audience

3. **Ignoring negative signals**
   - Note what doesn't get engagement - those are valuable insights too

4. **Analysis paralysis**
   - Research should inform action, not delay it
   - 3-5 key insights > 20 minor observations

5. **Treating research as strategy**
   - Research = what we learned about audience
   - Strategy = what we should do based on that learning
