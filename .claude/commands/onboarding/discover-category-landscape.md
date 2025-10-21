---
argument-hint: if no planning or input necessary say yolo to directly implement
---

# Discover Category Landscape

You are conducting **competitive and market research** to map the category landscape, identify strategic white space, and validate positioning hypotheses from the brand discovery interview.

---

## Goals

By the end of this session, you should have:

1. **Competitive positioning map** - How competitors claim territory and where white space exists
2. **Messaging analysis** - What themes, tone, and language competitors use
3. **Market insights** - Keyword trends, search behavior, category conventions
4. **Validated hypotheses** - Whether the strategic tensions from discovery represent real differentiation opportunities
5. **Strategic recommendations** - Clear guidance on which positioning territory to pursue

---

## Context Loading

**Before you begin, read these files if they exist:**
- `/research/founder-interview.md` - Load the strategic hypotheses to validate

**Key question:** Based on the founder interview, what hypotheses are we testing?
- Is [territory X] claimed by competitors or white space?
- Do competitors focus on [theme Y] leaving [theme Z] open?
- Is the audience frustrated by [problem] that competitors aren't solving?

---

## Agent Collaboration

This command requires **coordination between multiple agents**:

### Your Role (Orchestrator)
You coordinate the research and synthesize findings into strategic recommendations.

### research-analyst
**Responsibilities:**
- Competitive positioning analysis (who claims what territory)
- Keyword research (market trends, search volume, topic clusters)
- Market data (pricing, features, positioning statements)

**Engage them for:**
- Scraping competitor websites for positioning/messaging
- DataForSEO keyword research
- Market trend analysis via Perplexity

### content-analyst
**Responsibilities:**
- Messaging theme extraction (what language do competitors use)
- Tone and voice pattern analysis
- Content theme clustering

**Engage them for:**
- Analyzing competitor messaging for themes
- Identifying tone patterns
- Validating if positioning language is differentiated

---

## Research Workflow

### Phase 1: Competitor Identification (Human Input)

Ask the user:
```
"To map your competitive landscape, I need to know:

1. Who are your top 5 direct competitors? (Or should I research your category to identify them?)
2. What category/space do you compete in? (e.g., 'project management,' 'team collaboration')
3. Any specific positioning tensions from our discovery interview you want me to validate?
```

**If user is unsure of competitors:** Use research-analyst to identify top players in their category via market research.

---

### Phase 2: Parallel Research Execution

**Coordinate research-analyst and content-analyst to work in parallel:**

**Stream 1: research-analyst - Positioning & Market Data**
- Scrape competitor websites (homepage, about, pricing pages)
- Extract: Headlines, taglines, positioning statements, value props
- Analyze: Primary keywords they rank for, traffic estimates
- Research: Market trends in the category, keyword clusters

**Stream 2: content-analyst - Messaging & Voice Analysis**
- Analyze competitor messaging themes (what topics they cover)
- Extract tone and voice patterns (how they communicate)
- Identify content types and themes
- Map messaging to audience segments

**Tools to leverage:**
- `mcp__firecrawl__firecrawl_scrape` - Competitor website analysis
- `mcp__dataforseo__datalabs_google_ranked_keywords` - What they rank for
- `mcp__dataforseo__datalabs_google_keywords_ideas` - Keyword clustering
- `mcp__perplexity__perplexity_research` - Market trends, category analysis
- `mcp__perplexity__perplexity_search` - Customer perception (Reddit, reviews)

---

### Phase 3: Strategic Synthesis (Your Role)

After agents complete research, synthesize into strategic insights:

#### A. Positioning Map
Create a visual representation (text-based) of:
- Where competitors cluster (e.g., "efficiency" vs. "simplicity")
- What territory is claimed vs. white space
- How the brand's hypothesized positioning fits

**Example:**
```
POSITIONING MAP:

Efficiency Focus (High) ←→ Simplicity Focus (High)
     ↑                           ↑
  Monday.com                  Notion
  Jira                       ClickUp
     ↓                           ↓
  [WHITE SPACE: Alignment/Context territory]
```

#### B. Messaging Analysis
Identify:
- Common themes (what 80% of competitors talk about)
- Tone patterns (professional, playful, technical, etc.)
- Language clusters (repeated words/phrases)
- Unclaimed messaging territory

#### C. White Space Identification
Based on research, answer:
- Is the hypothesized positioning territory unclaimed?
- What themes/problems are competitors NOT addressing?
- What audience needs are underserved?

#### D. Strategic Risks & Opportunities
- **Risks:** Could competitors easily claim this territory?
- **Opportunities:** Why is this territory defensible for this brand?

---

## Documentation Requirements

Immediately after synthesis, write `/research/competitive-landscape.md`:

```markdown
---
type: research
domain: competitive-analysis
date: [today's date]
competitors: [list of competitors researched]
validated: true
---

# Competitive Landscape Analysis

## Competitors Analyzed
[List with brief descriptions]

## Positioning Map

### Territory Clusters
[Where do competitors position themselves?]

**Examples:**
- Efficiency cluster (60%): Monday, Jira - "streamline," "automate," "faster"
- Simplicity cluster (30%): Notion, ClickUp - "easy," "intuitive," "simple"
- Flexibility cluster (10%): [competitors] - "customizable," "adaptable"

### White Space Identified
[What positioning territory is unclaimed?]

## Messaging Analysis

### Common Themes (What competitors talk about)
[List with percentages]

### Tone Patterns
[How competitors communicate]

### Language Analysis
**Frequently used terms:** [words/phrases that appear across competitors]
**Unclaimed language:** [terms/concepts no competitor uses]

## Market Insights

### Keyword Research
[Search volume, trends, keyword clusters that could map to brand pillars]

### Customer Pain Points (from reviews/social listening)
[What customers complain about, what's missing]

### Category Trends
[Emerging trends in the space]

---

## Hypothesis Validation

### From Founder Interview, we hypothesized:
[List the hypotheses from /research/founder-interview.md]

### Validation Results:
1. **[Hypothesis 1]:** ✅ Validated / ⚠️ Partially validated / ❌ Contradicted
   - Evidence: [What the research shows]

2. **[Hypothesis 2]:** [Status]
   - Evidence: [What the research shows]

---

## Strategic Recommendations

### Positioning Opportunity
**Territory:** [What positioning to pursue]
**Why it's ownable:** [Why this brand can claim this territory]
**Why it's defensible:** [Why competitors can't easily copy]

### Competitive Advantages
[What makes this brand uniquely suited to own this territory]

### Risks & Mitigations
**Risk:** [e.g., "Asana mentions 'alignment' in messaging"]
**Mitigation:** [e.g., "But they don't own it in positioning - move fast"]

---

## Recommended Next Steps
- `/discover-customer-insight` - Validate if this positioning resonates with target audience
- `/define-positioning` - If validated, formalize positioning statement
```

Use **Write tool** to create this file immediately.

---

## Handoff Summary

Provide a strategic summary to the user:

```
✅ Competitive landscape research complete!

POSITIONING MAP:
[Simple text visual of where competitors cluster]

WHITE SPACE IDENTIFIED:
[The unclaimed territory]

HYPOTHESIS VALIDATION:
✅ [Validated hypotheses]
⚠️ [Partially validated hypotheses]
❌ [Contradicted hypotheses]

STRATEGIC RECOMMENDATION:
[Your #1 positioning recommendation based on research]

📄 Full analysis: /research/competitive-landscape.md

NEXT STEP:
I recommend /discover-customer-insight to validate whether this positioning
resonates emotionally with your target audience before we formalize it.

Should I proceed with customer research?
```

---

## Success Criteria

✅ Comprehensive competitive analysis (positioning + messaging)
✅ Clear identification of white space
✅ Hypotheses from discovery validated or refined
✅ Strategic recommendation with reasoning
✅ Next steps are purposeful and clear

---

## Key Principles

1. **Coordinate agents effectively** - research-analyst and content-analyst work in parallel
2. **Synthesize, don't just report** - Transform data into strategic insights
3. **Validate hypotheses explicitly** - Connect research back to discovery findings
4. **Identify risks AND opportunities** - Be honest about competitive threats
5. **Document immediately** - Write the file as soon as synthesis is complete
