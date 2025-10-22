# Category Landscape Research

**Created:** 2025-10-22
**Execution Folder:** `/research/category-landscape/2025-10-22_13:02/`

## Objective

Conduct comprehensive competitive and market research to map the category landscape for our brand. This research will identify 5-7 direct competitors (ensuring albert.ai is included), analyze their positioning and messaging strategies, identify strategic white space opportunities, and validate positioning hypotheses. The final deliverable will be a comprehensive research report with positioning map, white space analysis, hypothesis validation, and strategic recommendations for differentiation.

## Approach

This research follows a multi-phase approach:

1. **Phase 1: Competitor Identification** - Establish the competitive set including albert.ai and validate category boundaries
2. **Phase 2: Parallel Research** - Execute positioning analysis (2a) and messaging analysis (2b) concurrently using specialized research agents
3. **Phase 3: Strategic Synthesis** - Transform research findings into actionable positioning strategy with visual positioning map and recommendations

The research uses progressive disclosure - each phase receives only the context it needs, maintaining focused analysis and high signal-to-noise ratio.

## Input Data

**Location:** `data/`

**Strategic Context:**
- **Founder interview:** `/research/founder-interview/index.md` - Contains validated positioning hypotheses and strategic tensions
- **Competitor requirement:** albert.ai must be included in the competitive set as they are often missed in competitive analysis

**Key Hypotheses to Validate (from founder interview):**

1. **"Marketing Architecture" Territory** - Test if positioning as "the platform for Marketing Architects who design agentic AI systems" is unclaimed by competitors
2. **Empowerment vs. Ease** - Validate if competitors focus on "ease/automation" leaving "empowerment/capability" territory open
3. **Own vs. Rent** - Test if competitors use SaaS lock-in messaging, leaving "infrastructure ownership" positioning available
4. **Enhance vs. Replace** - Validate if competitors position AI as replacement, leaving "human-AI collaboration" territory unclaimed
5. **AI Slop Enemy** - Test if competitors address quality concerns or if "fighting AI slop" is an ownable angle

**Strategic Tensions to Research:**
- Do competitors target "all marketers" (mass market) or the "ambitious minority"?
- Do competitors emphasize "learning/mastery" or "automation/convenience"?
- Is the "Marketing Architect" identity language already in use?

## Step by Step Tasks

### 1. Competitor Identification

Establish the competitive set and validate category boundaries. This phase will ensure albert.ai is included and identify 5-7 total direct competitors for analysis.

**Agent:** general-purpose

**Instructions:** `.claude/skills/research/category-landscape/phase-1-competitor-identification.md`

**Input Artifacts:**
- `/research/founder-interview/index.md` - Strategic context and positioning hypotheses
- User requirement: albert.ai must be included

**Output Artifact:** `artifacts/01-competitor-identification.md`

**Task Details:**

The agent will:
1. Read the founder interview to understand:
   - Category/space: AI-powered marketing tools for empowerment (not replacement)
   - Core positioning hypotheses to validate (see Input Data section above)
   - Strategic tensions to research
2. Identify 5-7 direct competitors including albert.ai that compete in:
   - AI marketing platforms
   - Marketing automation tools
   - Agentic AI systems for marketing
   - AI-powered content/campaign tools
3. Ask the user for additional competitor suggestions or validation
4. Map each competitor to relevant hypotheses (e.g., which competitors to test "empowerment vs. ease" hypothesis against)
5. Validate the competitive set (all have accessible URLs)
6. Define research scope emphasizing hypothesis validation

**Success criteria:**
- Minimum 5 competitors identified including albert.ai
- All competitors have validated, accessible URLs
- Category clearly defined
- Research scope defined for Phase 2

---

### 2a. Competitive Positioning Research

Analyze competitor positioning statements, keyword strategies, and market trends to identify white space opportunities. This phase runs in parallel with Phase 2b.

**Agent:** market-research-analyst

**Instructions:** `.claude/skills/research/category-landscape/phase-2a-research-analyst.md`

**Input Artifacts:**
- `artifacts/01-competitor-identification.md`

**Output Artifact:** `artifacts/02a-positioning-research.md`

**Task Details:**

The agent will analyze each competitor (including albert.ai) to extract:

1. **Positioning Analysis:**
   - Scrape homepage, about page, pricing page using Firecrawl
   - Extract primary headlines, taglines, positioning statements
   - Document value propositions (3-5 per competitor)
   - Identify target audience mentions and competitive differentiators

2. **Keyword Analysis:**
   - Use DataForSEO to identify top keywords each competitor ranks for
   - Identify keyword clusters and themes
   - Document search volume and traffic estimates

3. **Market Trends:**
   - Use Perplexity to research category trends
   - Identify customer pain points and emerging opportunities
   - Document 3-5 key market trends

4. **Hypothesis Validation:**
   - Test specific hypotheses from founder interview:
     - **Marketing Architecture Territory:** Do any competitors use "Marketing Architect" or similar language?
     - **Empowerment vs. Ease:** Do competitors emphasize "ease/automation" or "empowerment/capability"?
     - **Own vs. Rent:** Do competitors promote SaaS lock-in or infrastructure ownership?
     - **Enhance vs. Replace:** Do competitors position AI as replacement or enhancement?
   - Assign validation status (✅ validated / ⚠️ partially / ❌ contradicted)

**Success criteria:**
- All competitors analyzed with positioning data
- Evidence-based findings with direct quotes
- Keyword data collected and clustered
- Hypotheses tested with clear validation status

---

### 2b. Messaging & Voice Analysis

Analyze competitor messaging themes, tone patterns, and language analysis to identify unclaimed messaging territory. This phase runs in parallel with Phase 2a.

**Agent:** market-research-analyst

**Instructions:** `.claude/skills/research/category-landscape/phase-2b-content-analyst.md`

**Input Artifacts:**
- `artifacts/01-competitor-identification.md`

**Output Artifact:** `artifacts/02b-messaging-analysis.md`

**Task Details:**

The agent will analyze each competitor (including albert.ai) to extract:

1. **Messaging Analysis:**
   - Scrape homepage, about page, and 2-3 blog posts using Firecrawl
   - Extract messaging themes (what topics they emphasize)
   - Identify repeated phrases and language patterns

2. **Tone & Voice Analysis:**
   - Analyze formality (professional, casual, conversational, technical)
   - Analyze emotion (enthusiastic, calm, urgent, empowering)
   - Analyze perspective (first-person, second-person, third-person)
   - Analyze language style (simple, complex, jargon-heavy, accessible)
   - Pull 2-3 representative quotes per competitor

3. **Theme Clustering:**
   - Identify benefits emphasized across competitors
   - Identify problems addressed
   - Identify emotions targeted
   - Cluster competitors by messaging approach

4. **Language Analysis:**
   - Document frequently used terms (category-wide)
   - Identify unclaimed language opportunities
   - Test hypothesis-specific language:
     - **AI Slop Enemy:** Do competitors mention quality/AI slop concerns?
     - **Learning vs. Automation:** Do competitors emphasize "learning/mastery" or "automation/convenience"?
     - **Ambitious Minority:** Do competitors target "all marketers" or niche segments?

**Success criteria:**
- All competitors analyzed for messaging and tone
- Theme clusters identified with saturation percentages
- Language analysis complete (used vs. unclaimed terms)
- Tone patterns mapped across competitors

---

### 3. Strategic Synthesis

Transform research findings into actionable strategic guidance including positioning map, white space identification, hypothesis validation, and strategic recommendations.

**Agent:** general-purpose

**Instructions:** `.claude/skills/research/category-landscape/phase-3-strategic-synthesis.md`

**Input Artifacts:**
- `artifacts/01-competitor-identification.md`
- `artifacts/02a-positioning-research.md`
- `artifacts/02b-messaging-analysis.md`

**Output Artifact:** `artifacts/03-strategic-synthesis.md` and `RESEARCH.md`

**Task Details:**

The agent will synthesize all findings to create:

1. **Positioning Map:**
   - Identify positioning axes from research data
   - Plot competitors showing clustering patterns
   - Identify white space (unclaimed positioning territory)
   - Create visual representation

2. **Messaging Analysis:**
   - Aggregate theme clusters with saturation percentages
   - Identify saturated vs. underserved messaging themes
   - Identify tone opportunities
   - Document overused vs. unclaimed language

3. **Hypothesis Validation:**
   - Validate each of the 5 core hypotheses from founder interview:
     1. **"Marketing Architecture" Territory** - Is this language/positioning unclaimed?
     2. **Empowerment vs. Ease** - Do competitors leave "empowerment" territory open?
     3. **Own vs. Rent** - Is "infrastructure ownership" positioning available?
     4. **Enhance vs. Replace** - Is "human-AI collaboration" unclaimed?
     5. **AI Slop Enemy** - Is "fighting AI slop" an ownable angle?
   - Assign validation status with comprehensive evidence (✅/⚠️/❌)
   - Document strategic implications for Alavida positioning

4. **Strategic Recommendations:**
   - Identify specific positioning territory to pursue
   - Explain why it's ownable and defensible
   - Recommend messaging strategy and tone
   - Identify risks and mitigations
   - Define next steps

5. **Final Deliverables:**
   - Create working draft (`artifacts/03-strategic-synthesis.md`)
   - Create polished final report (`RESEARCH.md`)

**Success criteria:**
- Positioning map created with clear white space identification
- All hypotheses validated with evidence
- Single, clear strategic recommendation provided
- Risks honestly assessed with mitigations
- Final research report completed and publishable

## Success Criteria

This research workflow is successful when:

- ✅ **Comprehensive competitive set** - 5-7 competitors identified including albert.ai with validated URLs
- ✅ **Deep positioning analysis** - Each competitor's positioning and messaging thoroughly analyzed
- ✅ **Founder hypotheses validated** - All 5 core hypotheses from founder interview tested with clear evidence:
  - Marketing Architecture territory ownership status
  - Empowerment vs. Ease competitive landscape
  - Own vs. Rent positioning availability
  - Enhance vs. Replace messaging opportunities
  - AI Slop enemy angle viability
- ✅ **White space identified** - Clear unclaimed positioning territory discovered with evidence
- ✅ **Strategic tensions mapped** - Competitive landscape analyzed against Alavida's strategic differentiators
- ✅ **Actionable recommendations** - Strategic positioning direction provided with defensibility rationale
- ✅ **Professional deliverable** - Polished research report ready to inform Alavida's brand strategy and positioning decisions
