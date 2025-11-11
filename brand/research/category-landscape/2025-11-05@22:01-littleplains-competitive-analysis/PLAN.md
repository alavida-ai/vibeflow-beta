# Little Plains Competitive Analysis Plan

## Objective

Conduct comprehensive analysis of Little Plains (https://www.littleplains.co/) to determine their competitive positioning relative to Alavida and the existing category landscape, with focus on company profile, founder/team insights, and social media presence.

## Context

**Existing Research:**
- Category landscape already includes 18+ competitors analyzed in [/brand/research/category-landscape/RESEARCH.md](/brand/research/category-landscape/RESEARCH.md)
- Semiotic identified as closest analog - "AI-native design firm" with service-based model
- Research shows Alavida occupies white space in "Marketing Architecture" (infrastructure ownership, builder identity)

**Research Question:**
Is Little Plains a direct competitor to Alavida, or do they occupy a different market position (e.g., services vs. infrastructure)?

## Research Phases

### Phase 1: Website & Product Analysis
**Duration:** ~30 minutes
**Agent:** analyst

**Objectives:**
- Understand Little Plains' core offering and business model
- Identify target audience and positioning claims
- Analyze messaging, tone, and language patterns
- Determine if they're platform/infrastructure or service-based

**Tools:**
- Firecrawl scrape of https://www.littleplains.co/
- Perplexity search for company background and announcements

**Research Questions:**
1. What is their core product/service offering?
2. What business model do they use? (SaaS, service, infrastructure)
3. Who is their target customer? (company size, role, sophistication)
4. How do they position themselves? (messaging themes, value props)
5. What language patterns appear in their copy? (ease vs. empowerment, own vs. rent)

**Artifact:** `artifacts/01-website-product-analysis.md`
- Hero copy and positioning statements (verbatim quotes)
- Product/service description
- Business model assessment
- Target audience profile
- Key messaging themes
- Language pattern analysis (compare to existing competitor clusters)

---

### Phase 2: Founder & Team Research
**Duration:** ~20 minutes
**Agent:** analyst

**Objectives:**
- Identify founders and key team members
- Understand founder backgrounds and expertise
- Assess credibility and thought leadership positioning
- Identify any notable achievements or funding

**Tools:**
- Perplexity search for founders' names and backgrounds
- Perplexity search for Little Plains funding/announcements
- Firecrawl scrape of team pages or about sections

**Research Questions:**
1. Who are the founders? (names, backgrounds, previous experience)
2. What expertise do they bring? (design, marketing, engineering, AI)
3. Are they positioning as thought leaders? (speaking, writing, building in public)
4. Any notable funding, partnerships, or milestones?
5. How does their expertise compare to Alavida's positioning? (architects vs. designers)

**Artifact:** `artifacts/02-founder-team-research.md`
- Founder profiles with backgrounds
- Team composition and expertise
- Notable achievements or credibility markers
- Funding/milestone timeline
- Thought leadership assessment

---

### Phase 3A: Company Social Media Analysis
**Duration:** ~15 minutes
**Agent:** analyst

**Objectives:**
- Analyze Little Plains' company Twitter/X presence
- Identify messaging themes and content strategy
- Assess engagement patterns and audience

**Tools:**
- X scraper: scrape_user_tweets for company handle
- Parameters: lastMonths=6, maxTweets=100, minLikes=5, queryType="Top"

**Research Questions:**
1. What is their Twitter/X handle?
2. What topics do they tweet about? (product updates, thought leadership, case studies)
3. How do they position themselves in tweets? (messaging consistency)
4. What engagement levels do they achieve? (followers, likes, retweets)
5. Any notable campaigns or viral content?

**Artifact:** `artifacts/03a-company-social-analysis.md`
- Twitter handle and follower count
- Top-performing tweets (engagement analysis)
- Messaging themes from social content
- Engagement patterns
- Notable campaigns or content

---

### Phase 3B: Founder Social Media Analysis
**Duration:** ~20 minutes (per founder)
**Agent:** analyst

**Objectives:**
- Analyze founders' personal Twitter/X presence
- Understand their thought leadership positioning
- Identify any insights into company strategy or philosophy

**Tools:**
- X scraper: scrape_user_tweets for each founder's handle
- Parameters: lastMonths=6, maxTweets=100, minLikes=10, queryType="Top"

**Research Questions:**
1. What are founders' Twitter/X handles?
2. How active are they? (tweet frequency, engagement)
3. What do they tweet about? (industry insights, company building, personal brand)
4. Do they position as thought leaders in AI/marketing/design?
5. Any insights into their strategic thinking or company philosophy?

**Artifact:** `artifacts/03b-founder-social-analysis.md`
- Founder Twitter handles and activity levels
- Top tweets and engagement patterns
- Thought leadership themes
- Company strategy insights
- Personal brand positioning

**Note:** Phases 3A and 3B can run in parallel if handles are identified in Phase 1/2.

---

### Phase 4: Competitive Positioning Assessment
**Duration:** ~30 minutes
**Agent:** analyst

**Objectives:**
- Compare Little Plains to existing competitor clusters
- Determine direct vs. indirect competitive threat
- Identify positioning overlaps or differentiation
- Assess strategic implications for Alavida

**Context Needed:**
- All artifacts from Phases 1-3
- Existing research: [/brand/research/category-landscape/RESEARCH.md](/brand/research/category-landscape/RESEARCH.md)

**Analysis Framework:**
1. **Business Model Comparison**
   - SaaS platform vs. service vs. infrastructure
   - Subscription vs. project-based vs. ownership

2. **Target Audience Overlap**
   - Company size (startup, SMB, enterprise)
   - User sophistication (all marketers vs. ambitious minority)
   - Role (marketers vs. designers vs. architects)

3. **Positioning Cluster**
   - Do they fit existing clusters? (Easy Button, AI Workforce, Education, AI-Native Services)
   - Or do they represent new positioning territory?

4. **Language & Messaging Overlap**
   - Ease vs. empowerment language
   - Own vs. rent framing
   - Architect/builder vs. user/consumer identity

5. **Competitive Threat Assessment**
   - Direct competitor (same target, same solution, same philosophy)
   - Indirect competitor (different approach to same problem)
   - Non-competitor (different market/problem)

**Research Questions:**
1. Which competitor cluster does Little Plains fit? (or do they create a new one?)
2. Do they compete for the same customer as Alavida?
3. Do they claim any of Alavida's white space territories?
4. What are the key differentiators vs. Little Plains?
5. What strategic implications exist? (partnership, differentiation, ignore)

**Artifact:** `artifacts/04-competitive-assessment.md`
- Cluster assignment and rationale
- Business model comparison matrix
- Target audience overlap analysis
- Positioning overlap/differentiation
- Strategic threat level (high, medium, low)
- Recommended positioning response

---

### Phase 5: Research Summary & Index Update
**Duration:** ~25 minutes
**Agent:** Operations Manager (direct execution)

**Objectives:**
- Synthesize findings into factual summary (not strategic synthesis)
- Update category-landscape index RESEARCH.md
- Document Little Plains as new competitor (if applicable)

**Context Needed:**
- All artifacts from Phases 1-4
- Current index: [/brand/research/category-landscape/RESEARCH.md](/brand/research/category-landscape/RESEARCH.md)

**Activities:**
1. **Create Execution RESEARCH.md**
   - Executive summary of findings
   - Company profile (factual)
   - Competitive positioning assessment
   - Social media insights summary
   - References to detailed artifacts

2. **Update Index RESEARCH.md**
   - Add Little Plains to competitor list (if direct competitor)
   - Add competitor profile section (following existing format)
   - Update relevant positioning clusters
   - Note any new white space implications
   - Update comparison tables if relevant

**Deliverables:**
- `RESEARCH.md` in execution folder (summary of all findings)
- Updated `/brand/research/category-landscape/RESEARCH.md` (index with Little Plains added)
- Clear recommendation on competitive status

---

## Success Criteria

**This research is successful if:**
1. ✅ Little Plains' business model and offering are clearly understood
2. ✅ Founder/team backgrounds and credibility are documented
3. ✅ Social media presence and messaging are analyzed
4. ✅ Competitive positioning relative to Alavida is definitively assessed
5. ✅ Index RESEARCH.md is updated with factual findings
6. ✅ Strategic implications are clearly articulated

**Quality Standards:**
- All claims supported by verbatim quotes or data
- Clear distinction between facts (what they say) and analysis (what it means)
- Consistent formatting with existing competitor profiles
- Markdown references to all artifacts and sources

---

## Timeline

**Estimated Total Duration:** ~2.5 hours

| Phase | Duration | Can Run in Parallel |
|-------|----------|---------------------|
| Phase 1: Website Analysis | 30 min | No (must go first) |
| Phase 2: Founder Research | 20 min | No (depends on Phase 1) |
| Phase 3A: Company Social | 15 min | Yes (parallel with 3B) |
| Phase 3B: Founder Social | 20 min | Yes (parallel with 3A) |
| Phase 4: Competitive Assessment | 30 min | No (depends on 1-3) |
| Phase 5: Summary & Index | 25 min | No (must go last) |

**Execution Strategy:**
- Sequential: Phases 1 → 2 → (3A + 3B in parallel) → 4 → 5
- Checkpoints after Phase 1 and Phase 4 for course correction

---

## Tools Required

- ✅ Firecrawl (website scraping)
- ✅ Perplexity (research and search)
- ✅ X Scraper (Twitter/social media analysis)

---

## Output Structure

```
/brand/research/category-landscape/2025-11-05@22:01/
├── PLAN.md (this file)
├── TODO.md (progress tracking)
├── artifacts/
│   ├── 01-website-product-analysis.md
│   ├── 02-founder-team-research.md
│   ├── 03a-company-social-analysis.md
│   ├── 03b-founder-social-analysis.md
│   └── 04-competitive-assessment.md
└── RESEARCH.md (final summary)
```

**Index Update:**
- `/brand/research/category-landscape/RESEARCH.md` (updated with Little Plains profile)
