---
name: x-analysis
description: Provides workflows and frameworks for analyzing X content to extract audience intelligence insights and identify strategic opportunities. Use when conducting competitive research to understand target audience behavior through real engagement patterns, or when analyzing content performance to identify high-value frameworks.
---

# X Analysis

Leverage the `x-scraper` MCP to analyze X content and extract strategic insights about target audiences through real-world engagement data.

## Purpose

Transform X content analysis from surface-level metrics into strategic audience intelligence that informs content strategy, positioning, and differentiation opportunities.

**Key Principle:** Analyze to understand audience psychology and needs, not to copy tactics. Focus on discovering value gaps and strategic opportunities through engagement pattern analysis.

---

## When to Use This Skill

Use x-analysis when:

- **Conducting competitive research** to understand what resonates with a shared target audience
- **Identifying audience intelligence** through real engagement patterns on X
- **Discovering value gaps** (high-demand, low-supply topics) for strategic differentiation
- **Validating content assumptions** with real-world engagement data
- **Analyzing performance patterns** to identify high-value content frameworks

**Do NOT use for:**
- Performance benchmarking against competitors (focus is audience, not competitive metrics)
- Copying content tactics without understanding underlying psychology
- One-off tweet analysis (skill designed for pattern identification across many tweets)

---

## Core Analysis Types

### 1. Competitive Research (Audience Intelligence)

**Primary Goal:** Learn about target audience through their engagement patterns with accounts they follow.

**Research Question:** What do we learn about our audience when we analyze what they engage with on accounts similar to ours or targeting the same audience?

**Strategic Value:**
- Understand audience needs, problems, and interests
- Identify value gaps (underserved needs)
- Discover differentiation opportunities
- Inform content strategy with evidence-based insights

**Workflow:** [workflows/competitive-research.md](workflows/competitive-research.md)

### 2. Performance Research (Content Framework Identification)

**Primary Goal:** Identify and templatize reusable content frameworks that drive engagement with target audience.

**Research Question:** What content structures, formats, and approaches consistently generate high engagement that can be templatized for reuse?

**Strategic Value:**
- Create content playbooks based on proven patterns
- Reduce content creation guesswork
- Scale what works systematically
- Build library of effective frameworks

**Status:** Workflow under development (prioritize Competitive Research first)

---

## How to Use This Skill

### Step 1: Choose the Analysis Type

Determine which research goal aligns with current needs:
- **Audience Intelligence** → Use Competitive Research workflow
- **Content Framework Development** → Use Performance Research workflow (when available)

### Step 2: Load the Workflow

Read the appropriate workflow file:
- [workflows/competitive-research.md](workflows/competitive-research.md) for audience intelligence analysis

The workflow provides:
- Complete phase breakdown following [agentic-orchestrating](/brand/.claude/skills/agentic-orchestrating/SKILL.md) pattern
- X-scraper parameter guidance
- Expected artifacts and outputs
- Success criteria

### Step 3: Create Execution Folder

Follow the workflow's execution structure guidance:

**For ongoing audience intelligence:**
```
/brand/research/audience-intelligence/{YYYY-MM-DD@HH:mm}/
```

**For one-off analyses:**
```
/brand/research/adhoc/{YYYY-MM-DD@HH:mm-account-name-analysis}/
```

Use orchestration skill's folder creation script if needed:
```bash
python .claude/skills/agentic-orchestrating/scripts/create_execution_folder.py audience-intelligence
```

### Step 4: Execute the Workflow

Follow the phase breakdown in the workflow file:
1. Load PLAN.md structure from workflow
2. Execute each phase as specified
3. Track progress in TODO.md
4. Produce artifacts in execution folder
5. Synthesize final RESEARCH.md

### Step 5: Reference Analysis Frameworks (As Needed)

When performing analysis within phases, load relevant frameworks from:
- [references/analysis-frameworks.md](references/analysis-frameworks.md)

Available frameworks:
- Three-Tier Metrics Framework (engagement analysis)
- Content Segmentation Analysis (pattern identification)
- Audience Behavior Analysis (psychology and needs)
- Value Gap Identification (strategic opportunities)
- Strategic Positioning Analysis (competitive landscape)

**Progressive Disclosure:** Load framework sections only when needed for specific analysis tasks. Full file contains comprehensive frameworks but may not all be relevant to every analysis.

---

## X-Scraper Integration

### Tool: `mcp__x-scraper__scrape_user_tweets`

Primary tool for gathering X content data.

### Recommended Parameters for Competitive Research

```javascript
{
  userName: "target-account",      // X handle (no @ symbol)
  maxTweets: 100-200,              // Substantial sample size
  lastMonths: 6,                   // 6-month window for patterns
  queryType: "Top",                // Focus on high-engagement
  minLikes: 50,                    // Filter for proven resonance
  includeReplies: false,           // Focus on original content
  includeRetweets: false           // Analyze their voice only
}
```

**Parameter Strategy:**
- `queryType: "Top"` prioritizes proven engagement over chronological
- `minLikes` threshold filters noise (adjust based on account size)
- 6-month window balances recency with pattern identification
- Exclude replies/retweets to focus on original voice and strategy

### Tool: `mcp__x-scraper__scrape_tweet_by_id`

Use for deep-diving into specific high-performing tweets identified during analysis.

---

## Key Principles

### 1. Audience-Centric Analysis

**Focus:** What the audience engages with and why
**Not:** What the account posts or their growth metrics

Analyze engagement patterns to understand audience psychology, needs, and behavior—not to benchmark against the account's performance.

### 2. Value Gap Discovery

**Primary Objective:** Identify strategic opportunities through underserved needs

Look for:
- High engagement topics with low content frequency
- Questions asked but not fully answered
- Problems mentioned without solutions
- Adjacent topics with no bridge

**Framework:** Think like a value investor—find market inefficiencies where demand exceeds supply.

### 3. Evidence-Based Insights

**Requirement:** Every insight must trace back to specific engagement data

Avoid assumptions. Build audit trail:
```
Strategic Insight → Analysis Finding → Engagement Pattern → Specific Tweets
```

Use markdown references in research documents to create navigation path.

### 4. Strategic Translation

**Research Output:** "What we learned about the audience"
**NOT:** "What content we should create"

Research provides audience intelligence (what IS). Strategy synthesis transforms insights into action plans (what to DO). Maintain clear separation between research and strategy phases.

### 5. Pattern Recognition Over Mimicry

**Goal:** Understand why content resonates (principles)
**Avoid:** Copying what performs (tactics)

Audiences detect inauthentic imitation. Extract principles (audience needs, value gaps, engagement triggers) rather than copying surface-level tactics.

---

## Integration with Marketing Framework

### Research → Strategy Flow

```
X Analysis Execution (this skill)
         ↓ produces
/brand/research/audience-intelligence/{timestamp}/RESEARCH.md
         ↓ accumulates into
/brand/research/audience-intelligence/RESEARCH.md (index)
         ↓ informs
/brand/strategy/content-strategy/{timestamp}/ (strategy execution)
         ↓ updates
/brand/strategy/content-strategy/STRATEGY.md (strategy index)
         ↓ with platform-specific
/brand/strategy/content-strategy/twitter/EXTENSION.md
         ↓ guides
/brand/content/twitter-posts/{timestamp-slug}/CONTENT.md
```

**Information Flow:** Research provides raw intelligence → Strategy synthesizes into action plans → Content executes with strategic guidance

---

## Success Criteria

Effective X analysis should:

- [ ] **Answer primary research question** about audience needs and behavior
- [ ] **Identify 3-5 value gaps** representing strategic opportunities
- [ ] **Provide evidence trail** from insights to supporting engagement data
- [ ] **Generate actionable insights** that inform strategy (without being strategy)
- [ ] **Focus on audience psychology** rather than content tactics
- [ ] **Maintain objectivity** (unopinionated factual gathering in research phase)
- [ ] **Enable strategic decisions** through clear, defensible insights

---

## Common Pitfalls to Avoid

### 1. Copying Tactics Without Understanding

**Problem:** Seeing high-performing content and replicating format without understanding why it resonates

**Solution:** Dig into engagement patterns, reply content, and audience behavior to understand psychological drivers

### 2. Analyzing Account Success Instead of Audience Behavior

**Problem:** Focusing on account metrics (followers, growth) rather than audience engagement patterns

**Solution:** Center analysis on who engages, how they engage, and what triggers engagement—not on the account's overall performance

### 3. Conflating Research with Strategy

**Problem:** Making strategic recommendations in research documents, blurring lines between what IS and what to DO

**Solution:** Research documents state findings and insights. Strategy documents make recommendations based on research.

### 4. Surface-Level Metrics Focus

**Problem:** Counting likes and retweets without understanding engagement quality and type

**Solution:** Segment engagement by type (saves, replies, shares) and analyze what each signal reveals about audience needs

### 5. Analysis Paralysis

**Problem:** Gathering extensive data but failing to extract actionable insights

**Solution:** Set clear research questions upfront. Focus on 3-5 high-impact insights rather than exhaustive analysis.

---

## Workflow Execution Checklist

Before starting X analysis:

- [ ] Clear research question defined
- [ ] Target account identified and validated
- [ ] Execution folder created following structure guidance
- [ ] X-scraper parameters configured appropriately
- [ ] Workflow file loaded for phase guidance
- [ ] Understanding of expected artifacts and outputs

During execution:

- [ ] PLAN.md created in execution folder
- [ ] TODO.md tracking progress
- [ ] Each phase producing specified artifacts
- [ ] Analysis frameworks referenced as needed (progressive disclosure)
- [ ] Evidence trail maintained (insights → data)

After completion:

- [ ] Final RESEARCH.md synthesized
- [ ] Insights answer primary research question
- [ ] Value gaps identified with evidence
- [ ] Audit trail complete
- [ ] Ready for Marketing Architect review and index update

---

## Resources

**Workflows:**
- [workflows/competitive-research.md](workflows/competitive-research.md) - Audience intelligence through engagement analysis

**References:**
- [references/analysis-frameworks.md](references/analysis-frameworks.md) - Proven analytical frameworks for pattern identification

**Related Skills:**
- [agentic-orchestrating](../ agentic-orchestrating/SKILL.md) - Execution folder structure and phase delegation patterns
- [researching](../researching/SKILL.md) - General research methodology and best practices
- [synthesizing-strategy](../synthesizing-strategy/SKILL.md) - Translating research insights into strategic recommendations 