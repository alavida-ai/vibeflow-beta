# Landing Page Analysis Plan: Alavida.ai

## Objective

Conduct a comprehensive conversion optimization and brand alignment analysis of the Alavida.ai landing page to identify:
1. Conversion weaknesses based on evidence-based best practices
2. Brand misalignment issues compared to Agonda's brand strategy
3. Actionable improvement recommendations
4. Complete copy extraction for reference

## Context

**Target URL:** https://alavida.ai/
**Analysis Framework:** Landing-page-conversion skill + Brand strategy comparison
**Deliverable:** RESEARCH.md with scoring, findings, and recommendations

## Input Materials

### Landing Page Data (Scraped)
- Full-page screenshot: Available
- Markdown copy: Extracted via Firecrawl
- Metadata: OG tags, titles, descriptions

### Brand Strategy References
Brand strategy documents to compare against:
- `/brand/strategy/brand-fundamentals/STRATEGY.md` - Core brand identity
- `/brand/strategy/positioning/STRATEGY.md` - Market positioning
- `/brand/strategy/messaging/STRATEGY.md` - Key messages and themes
- `/brand/strategy/voice/STRATEGY.md` - Voice and tone guidelines
- `/brand/strategy/audience/STRATEGY.md` - Target audience definition

### Analysis Framework
- Landing page conversion best practices guide
- 9 non-negotiable conversion requirements
- Industry benchmarks (6.6% avg, 30%+ high-performing)

## Execution Phases

### Phase 1: Brand Strategy Context Loading
**Agent:** Analyst Agent
**Objective:** Load and synthesize Agonda's brand strategy for comparison

**Tasks:**
1. Read all brand strategy index files (STRATEGY.md from each domain)
2. Extract key positioning claims, voice characteristics, and messaging themes
3. Identify brand identity markers (tone, audience, unique value)
4. Document expected brand expression on landing page

**Output Artifact:** `01-brand-context.md`
- Brand positioning summary
- Voice/tone characteristics
- Key messaging themes
- Target audience profile
- Expected brand markers

### Phase 2: Conversion Analysis (Best Practices)
**Agent:** Analyst Agent
**Objective:** Score landing page against evidence-based conversion principles

**Tasks:**
1. Apply 9 non-negotiable conversion requirements checklist
2. Evaluate structural elements (above-fold, hierarchy, navigation)
3. Assess copy and messaging (headlines, benefits, clarity)
4. Review visual design (CTAs, product context, whitespace)
5. Score technical optimization (mobile, load speed considerations)
6. Calculate conversion readiness score

**Scoring Framework:**
- Each of 9 requirements: Pass/Fail
- Structural elements: 0-10 scale
- Copy effectiveness: 0-10 scale
- Visual design: 0-10 scale
- Overall conversion readiness: Percentage score

**Output Artifact:** `02-conversion-analysis.md`
- Checklist results (9 requirements)
- Category scores with evidence
- Benchmarking against industry standards
- Critical conversion weaknesses identified

### Phase 3: Brand Alignment Analysis
**Agent:** Analyst Agent
**Objective:** Identify misalignments between landing page and Agonda brand strategy

**Tasks:**
1. Compare landing page messaging to brand positioning
2. Analyze voice/tone consistency with brand guidelines
3. Evaluate visual identity alignment (if applicable)
4. Identify messaging theme gaps or contradictions
5. Assess audience targeting accuracy

**Analysis Dimensions:**
- **Positioning alignment:** Does page reflect brand's market position?
- **Voice consistency:** Does tone match brand voice guidelines?
- **Messaging coherence:** Do themes align with brand messaging strategy?
- **Audience relevance:** Does copy speak to defined target audience?

**Output Artifact:** `03-brand-alignment.md`
- Alignment scores per dimension
- Specific misalignment examples
- Brand contradiction evidence
- Missing brand elements

### Phase 4: Copy Extraction & Cataloging
**Agent:** Analyst Agent
**Objective:** Extract and organize all landing page copy for reference

**Tasks:**
1. Extract all headlines and subheadlines
2. Document all CTA copy
3. Catalog body copy by section
4. Note microcopy (labels, tooltips, etc.)
5. Organize by page hierarchy

**Output Artifact:** `04-copy-inventory.md`
- Headline hierarchy
- CTA inventory
- Section-by-section copy
- Microcopy notes

### Phase 5: Synthesis & Recommendations
**Agent:** Strategist Agent
**Objective:** Synthesize findings into actionable recommendations

**Tasks:**
1. Prioritize weaknesses by conversion impact
2. Map brand misalignments to specific page elements
3. Develop improvement recommendations (quick wins vs strategic)
4. Suggest A/B testing opportunities
5. Create implementation roadmap

**Output Artifact:** `05-recommendations.md`
- Prioritized weakness list
- Quick win opportunities
- Strategic improvement plan
- A/B testing hypotheses
- Implementation roadmap

### Phase 6: Final Research Document
**Objective:** Compile comprehensive analysis into RESEARCH.md

**Synthesis:**
- Executive summary with key findings
- Conversion analysis results (scores + evidence)
- Brand alignment assessment
- Complete copy inventory
- Prioritized recommendations
- Supporting artifacts referenced

**Output:** `RESEARCH.md`

## Expected Artifacts Structure

```
/brand/research/adhoc/2025-10-31@16:43-alavida-landing-page-analysis/
├── PLAN.md (this file)
├── TODO.md (progress tracking)
├── artifacts/
│   ├── 01-brand-context.md
│   ├── 02-conversion-analysis.md
│   ├── 03-brand-alignment.md
│   ├── 04-copy-inventory.md
│   └── 05-recommendations.md
├── data/
│   ├── landing-page-copy.md (raw scraped copy)
│   └── screenshot-url.txt (screenshot reference)
└── RESEARCH.md (final synthesized analysis)
```

## Success Criteria

- [ ] All 9 conversion requirements evaluated with evidence
- [ ] Brand strategy comparison across all 5 domains
- [ ] Complete copy inventory extracted
- [ ] Quantitative scores provided (conversion readiness, brand alignment)
- [ ] Actionable recommendations prioritized by impact
- [ ] All findings traceable to source evidence

## Agent Delegation Strategy

**Analyst Agent** (Phases 1-4): Evidence gathering, scoring, analysis
- Load brand strategy context
- Apply conversion framework
- Score alignment dimensions
- Extract and catalog copy

**Strategist Agent** (Phase 5): Strategic synthesis
- Prioritize findings
- Develop recommendations
- Create implementation roadmap

**Marketing Operations Manager** (Phase 6): Final synthesis
- Compile RESEARCH.md
- Ensure artifact references
- Quality check completeness

## Timeline Estimate

- Phase 1: Brand context loading (~5 min)
- Phase 2: Conversion analysis (~10 min)
- Phase 3: Brand alignment analysis (~10 min)
- Phase 4: Copy extraction (~5 min)
- Phase 5: Recommendations synthesis (~8 min)
- Phase 6: Final document compilation (~5 min)

**Total:** ~43 minutes

## References

**Skills:**
- `.claude/skills/landing-page-conversion/` - Conversion framework
- `.claude/skills/agentic-orchestrating/` - Orchestration patterns

**Brand Strategy:**
- `/brand/strategy/brand-fundamentals/STRATEGY.md`
- `/brand/strategy/positioning/STRATEGY.md`
- `/brand/strategy/messaging/STRATEGY.md`
- `/brand/strategy/voice/STRATEGY.md`
- `/brand/strategy/audience/STRATEGY.md`

**Analysis Framework:**
- `.claude/skills/landing-page-conversion/references/landing-page-guide.md`
