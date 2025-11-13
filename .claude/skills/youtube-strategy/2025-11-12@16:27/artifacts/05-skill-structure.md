# YouTube Strategy Skill - Structure Design

**Date:** 2025-11-12
**Status:** Complete - Ready for Phase 6 (Creation)
**Source:** Complete knowledge synthesis (23 queries, 9 domains)

---

## SKILL.md Detailed Outline

### Frontmatter
```yaml
name: youtube-strategy
description: >
  Tactical YouTube strategy skill providing actionable guidance for video optimization,
  content structure, packaging (thumbnails + titles), channel growth, and algorithmic success.
  Synthesized from Paddy Galloway methodology covering algorithm mechanics, audience psychology,
  content creation frameworks, discovery optimization, analytics, and data-driven iteration.

trigger_conditions:
  - User asks about YouTube strategy, optimization, or growth
  - User requests thumbnail or title improvement
  - User wants to analyze video performance or diagnose underperformance
  - User needs channel growth guidance or long-term strategy
  - User asks about YouTube algorithm, ranking signals, or discovery
  - User requests help with video structure, hooks, or retention
  - User wants packaging (thumbnail + title + hook) guidance
  - User needs SEO or discoverability tactics for YouTube
  - User requests content type-specific advice (educational, entertainment, documentary, etc.)
  - User asks about publishing strategy, cadence, or upload timing

usage_examples:
  - "Help me improve my video thumbnails for better CTR"
  - "My videos have high CTR but low retention - what should I fix?"
  - "What's the best structure for educational YouTube videos?"
  - "How do I grow my YouTube channel from 0 to 10K subscribers?"
  - "Explain how the YouTube algorithm prioritizes videos"
  - "I need a better title for this video - can you help?"
```

### Section 1: Overview
**Purpose:** Establish context and guide agents to correct reference documents

**Content:**
- What this skill does (YouTube strategy guidance)
- When to use it (specific triggering scenarios)
- Core philosophy (YouTube as "click and watch" platform)
- Key insight (Pre-production accounts for 40-60% of success)
- Quick navigation (which reference to load for common scenarios)

### Section 2: Core Mental Models
**Purpose:** Provide foundational understanding that informs all tactical decisions

**Content:**

**The YouTube Algorithm Mental Model:**
- CTR + Retention = Algorithmic Impressions
- First 24hr CTR predicts long-term success
- Browse + Suggested > Search for traffic volume
- Algorithmic meritocracy: quality content gets promoted when packaging is strong

**Viewer Decision-Making Psychology:**
- 3-second glance test (thumbnail processing)
- 7-second click confirmation (first impression validation)
- 30-second hook introduction (curiosity loop setup)
- Value perception (promised vs delivered)

**Core Success Principle:**
- Pre-production (idea + packaging) × Content Quality × Algorithmic Meritocracy = YouTube Success

### Section 3: Strategic Principles
**Purpose:** Key frameworks that guide all tactical decisions

**Content:**

**Principle 1: Pre-production Allocation**
- 30% ideation/packaging (idea, title, thumbnail)
- 70% production (shooting, editing, refinement)
- First minute receives 20-30% of total editing time

**Principle 2: Promise → Delivery → Payoff Architecture**
- Packaging (thumbnail + title) sets expectation
- Hook (first 30 seconds) confirms the promise
- Body delivers the promised value
- Payoff satisfies viewer expectation

**Principle 3: CCN Fit (Core, Casual, New)**
- Core = hardcore fans (niche-specific content)
- Casual = dip in and out (some appeal required)
- New = potential audience (broad appeal required)
- Growth requires New viewer expansion, not just Core satisfaction

**Principle 4: Exponential Returns from Packaging**
- 20% title improvement = 100x view increase (non-linear)
- Small packaging refinements compound
- Packaging has higher ROI than production quality
- Idea elimination: "Can I create a good title/thumbnail for this?"

**Principle 5: Data-Driven Iteration**
- Study top 10% performing videos
- Identify patterns and success factors
- Replicate winning formats
- A/B test improvements, measure results

### Section 4: Workflow Orchestration
**Purpose:** Guide agents through YouTube strategy questions

**Content:**

**Path 1: Creating a New Video**
1. Start: `references/video-structure.md` (Hook-Body-Payoff framework)
2. Load: `references/packaging-synergy.md` (thumbnail + title + hook alignment)
3. Load type-specific: `references/content-structure-by-type.md` (educational, entertainment, etc.)
4. Optimize discovery: `references/youtube-seo-tactics.md` OR `references/discovery-optimization.md`
5. Finalize packaging: `references/thumbnail-tactics.md` + `references/title-tactics.md`

**Path 2: Diagnosing Underperforming Video**
1. Start: `references/analytics-framework.md` (diagnose: CTR or AVD issue?)
2. If Low CTR: `references/thumbnail-tactics.md` + `references/title-tactics.md` (packaging issue)
3. If Low AVD: `references/hook-tactics.md` + `references/retention-tactics.md` (content/structure issue)
4. If Both Low: `references/video-structure.md` + `references/packaging-synergy.md` (fundamental misalignment)
5. Iterate: `references/testing-iteration.md` (A/B test improvements)

**Path 3: Growing a Channel**
1. Start: `references/audience-growth.md` (niche validation, CCN Fit)
2. Understand viewers: `references/audience-psychology.md` (what drives your audience)
3. Plan content: `references/channel-strategy.md` (12-month framework, content buckets)
4. Optimize publishing: `references/publishing-strategy.md` (phase-based cadence)
5. Iterate: `references/testing-iteration.md` + `references/analytics-framework.md` (data-driven improvement)

**Path 4: Understanding YouTube**
1. Start: `references/algorithm-mechanics.md` (how ranking works)
2. Then: `references/platform-dynamics.md` (platform incentives, success patterns)
3. Then: `references/audience-psychology.md` (viewer behavior)
4. Navigate to tactical domains as needed

**Path 5: Optimizing Packaging**
1. Start: `references/packaging-synergy.md` (thumbnail + title + hook alignment)
2. Thumbnail deep dive: `references/thumbnail-strategy.md` → `references/thumbnail-tactics.md`
3. Title deep dive: `references/title-strategy.md` → `references/title-tactics.md`
4. Hook connection: `references/hook-tactics.md` (first 7 seconds execution)
5. Test: `references/testing-iteration.md`

### Section 5: Reference Index
**Purpose:** Quick lookup of what each reference contains and when to load it

**Content:**

[Detailed reference index - see references/ architecture section below]

---

## references/ Architecture

### Foundational References

**algorithm-mechanics.md**
- **Purpose:** Deep dive on how YouTube's recommendation algorithm works
- **Key Sections:**
  1. Core ranking signals and weighting
  2. Traffic source mechanics (Browse, Suggested, Search)
  3. First 24hr signals vs long-term signals
  4. Channel stage treatment (new vs established)
  5. Algorithmic bias and misconceptions
- **When to Load:** User asks "how does the algorithm work?" or needs algorithm understanding
- **Cross-References:** platform-dynamics.md, analytics-framework.md
- **Length:** ~2000 words

**platform-dynamics.md**
- **Purpose:** Platform incentives, success patterns, and strategic dynamics
- **Key Sections:**
  1. Platform incentives and what gets promoted
  2. Viral vs steady performance patterns
  3. CTR-AVD-Promotion relationship
  4. Digital assets concept (evergreen content)
  5. Browse vs Suggested strategy
- **When to Load:** User needs strategic context for content decisions
- **Cross-References:** algorithm-mechanics.md, audience-psychology.md
- **Length:** ~1500 words

**audience-psychology.md**
- **Purpose:** Viewer psychology, motivation, and decision-making
- **Key Sections:**
  1. Core psychological drivers (curiosity, emotion, value, social proof)
  2. 3-second glance test psychology
  3. 7-second click confirmation
  4. 30-second hook psychology
  5. Value perception and expectation management
  6. CCN Fit (Core, Casual, New) framework
- **When to Load:** User needs to understand viewer behavior, psychology, or motivation
- **Cross-References:** thumbnail-strategy.md, title-strategy.md, channel-strategy.md
- **Length:** ~2000 words

**audience-growth.md**
- **Purpose:** Niche validation and sustainable audience building
- **Key Sections:**
  1. Triple Venn niche validation (love, good at, want)
  2. TAM (Total Addressable Market) concept
  3. Differentiation and competitive advantage
  4. What makes viewers subscribe vs just watch
  5. Growth patterns by channel stage (0-1K, 1K-10K, 10K-100K, 100K+)
- **When to Load:** User needs channel growth strategy or niche validation
- **Cross-References:** channel-strategy.md, audience-psychology.md
- **Length:** ~2000 words

### Packaging References

**thumbnail-strategy.md**
- **Purpose:** Foundational thumbnail design principles
- **Key Sections:**
  1. Three Focus Area Rule
  2. Glance Test standard
  3. Psychological triggers (curiosity, emotion, social proof)
  4. Exaggeration vs misleading distinction
  5. Design principles (color, composition, clarity)
- **When to Load:** User needs to understand thumbnail strategy
- **Cross-References:** thumbnail-tactics.md, packaging-synergy.md
- **Length:** ~1500 words

**thumbnail-tactics.md**
- **Purpose:** Granular thumbnail design implementation
- **Key Sections:**
  1. Color psychology and contrast
  2. Face vs no-face decision framework
  3. Text overlay best practices (font, size, position)
  4. Composition techniques (rule of thirds, focal points)
  5. Visual curiosity gaps
  6. Mobile vs desktop considerations
  7. A/B testing protocols
- **When to Load:** User needs specific implementation guidance for thumbnails
- **Cross-References:** thumbnail-strategy.md, testing-iteration.md
- **Length:** ~2000 words

**title-strategy.md**
- **Purpose:** Foundational title writing principles
- **Key Sections:**
  1. Human-first philosophy (not algorithm-first)
  2. Curiosity gap creation
  3. 30-40 title iteration standard
  4. Power word categories (exclusivity, urgency, emotion, authority)
  5. Under 60 character rule
  6. Universal vs niche language
- **When to Load:** User needs to understand title strategy
- **Cross-References:** title-tactics.md, packaging-synergy.md
- **Length:** ~1500 words

**title-tactics.md**
- **Purpose:** Advanced title optimization and implementation
- **Key Sections:**
  1. Title formula library (superlatives, versus, three-step, descriptors)
  2. Power word directory
  3. Bracket and punctuation strategy
  4. Length optimization (50 vs 60 characters)
  5. Exclusivity/urgency/uniqueness framing
  6. Clickbait avoidance
  7. Title testing methodology
- **When to Load:** User needs specific title improvement tactics
- **Cross-References:** title-strategy.md, testing-iteration.md
- **Length:** ~2000 words

**packaging-synergy.md**
- **Purpose:** Integration of thumbnail, title, and hook
- **Key Sections:**
  1. How thumbnail and title should complement (not repeat)
  2. "Packaging promise" concept
  3. Hook connection (first 15 seconds deliver packaging promise)
  4. Curiosity arc from impression to payoff
  5. Promise-delivery alignment
  6. Packaging synergy checklist
- **When to Load:** User needs to align thumbnail, title, and hook
- **Cross-References:** thumbnail-tactics.md, title-tactics.md, hook-tactics.md
- **Length:** ~1500 words

### Video Structure References

**video-structure.md**
- **Purpose:** Overall video structure framework
- **Key Sections:**
  1. Hook-Body-Payoff architecture
  2. First minute importance (20-30% of editing time)
  3. First 7 seconds: "Respect the click"
  4. Next 23 seconds: New hook introduction
  5. Body structure and retention curve
  6. Payoff and viewer satisfaction
  7. Retention killers to avoid
- **When to Load:** User needs overall video structure guidance
- **Cross-References:** hook-tactics.md, retention-tactics.md
- **Length:** ~2000 words

**content-structure-by-type.md**
- **Purpose:** Type-specific structural guidance
- **Key Sections:**
  1. Educational/Tutorial (talking head, expertise focus)
  2. Entertainment (action-forward, IRL content)
  3. Documentary/Storytelling (exclusive access, superlatives)
  4. Listicles (3-12 items, puzzle structure, comparison formats)
  5. Long-Form (30min+, retention curves, TV device optimization)
  6. Interviews (archetype framing, repeatable formats)
- **When to Load:** User needs type-specific structural advice
- **Cross-References:** video-structure.md, hook-tactics.md
- **Length:** ~2500 words

**hook-tactics.md**
- **Purpose:** Hook construction and execution
- **Key Sections:**
  1. Hook formulas (cold open, preview, teaser, pattern interrupt)
  2. First 3-5 seconds execution
  3. Curiosity creation techniques
  4. Content type-specific hooks
  5. Common hook mistakes
  6. Pacing and editing for hooks
  7. Hook examples and case studies
- **When to Load:** User needs help with video hooks
- **Cross-References:** video-structure.md, retention-tactics.md
- **Length:** ~2000 words

**retention-tactics.md**
- **Purpose:** Mid-roll retention and engagement
- **Key Sections:**
  1. Pacing strategies (fast vs slow, variation)
  2. Pattern interrupts (B-roll, graphics, cuts, music)
  3. Callbacks and payoff loops
  4. Expectation management
  5. Segmentation and chapter strategies
  6. Storytelling vs direct education
  7. Length-specific retention tactics
- **When to Load:** User has low retention/AVD and needs fix
- **Cross-References:** hook-tactics.md, video-structure.md
- **Length:** ~2000 words

### Discovery References

**youtube-seo-tactics.md**
- **Purpose:** YouTube SEO and keyword strategy
- **Key Sections:**
  1. TAM (Total Addressable Market) research
  2. Outlier identification (3X+ performers)
  3. Keyword research for YouTube
  4. Title/description/tag optimization
  5. Search intent matching (CCN Fit)
  6. Balancing SEO with clickability
  7. Long-tail vs broad keyword strategy
  8. Low-competition topic identification
- **When to Load:** User needs SEO or keyword strategy
- **Cross-References:** discovery-optimization.md, title-tactics.md
- **Length:** ~2500 words

**discovery-optimization.md**
- **Purpose:** Suggested videos and browse feature optimization
- **Key Sections:**
  1. 80% Overlap Rule (audience overlap)
  2. Suggested video mechanics
  3. Browse feature optimization
  4. Glance test for home feed
  5. Session time optimization
  6. Bingeable content creation
  7. Trending vs evergreen balance
  8. Viewer behavior patterns
- **When to Load:** User needs optimization for algorithmic recommendation
- **Cross-References:** youtube-seo-tactics.md, packaging-synergy.md
- **Length:** ~2000 words

### Analytics References

**analytics-framework.md**
- **Purpose:** Metrics interpretation and performance diagnosis
- **Key Sections:**
  1. Metrics hierarchy (CTR, retention, satisfaction, session time)
  2. Performance diagnosis matrix (CTR+AVD combinations)
  3. TAM benchmarking
  4. Retention curve analysis
  5. Outlier identification
  6. Common analytics mistakes
  7. Benchmark ranges by content type
- **When to Load:** User needs to diagnose video performance
- **Cross-References:** testing-iteration.md, youtube-seo-tactics.md
- **Length:** ~2000 words

**testing-iteration.md**
- **Purpose:** Testing and iteration methodology
- **Key Sections:**
  1. Three-phase framework (Establishment, Improvement, Optimization)
  2. A/B/C testing protocols
  3. One variable at a time principle
  4. Failure determination framework
  5. When to pivot vs double down
  6. Systematic improvement process
  7. Feedback loops and iteration
- **When to Load:** User needs testing or iteration guidance
- **Cross-References:** analytics-framework.md, thumbnail-tactics.md, title-tactics.md
- **Length:** ~2000 words

### Channel Management References

**publishing-strategy.md**
- **Purpose:** Upload strategy and audience activation
- **Key Sections:**
  1. Phase-based cadence (2x/week → 1x/week → strategic)
  2. Upload timing tactics
  3. Initial velocity (first 24 hours)
  4. Audience activation (notifications, community posts)
  5. Batch creation vs continuous publishing
  6. Burnout prevention
  7. Cadence by channel size
- **When to Load:** User needs publishing or upload strategy
- **Cross-References:** channel-strategy.md, testing-iteration.md
- **Length:** ~1500 words

**channel-strategy.md**
- **Purpose:** Long-term channel strategy and planning
- **Key Sections:**
  1. 12-month growth framework (Establishment, Improvement, Optimization)
  2. Content buckets and balance
  3. 80% Overlap Rule for bingeability
  4. Evergreen vs trending balance
  5. Portfolio approach (high-risk/high-reward + consistent)
  6. Sniper approach (replicate top 10%)
  7. Channel positioning and evolution
- **When to Load:** User needs long-term channel strategy
- **Cross-References:** audience-growth.md, publishing-strategy.md
- **Length:** ~2000 words

### Meta-Learning References

**case-studies.md**
- **Purpose:** Success patterns and real-world examples
- **Key Sections:**
  1. Red Bull F1 Drone (28M views)
  2. Astrophotography Comparison (270X outlier)
  3. UN Sahara Documentary (12M views)
  4. Noah Kagan Business Transformation
  5. 80% Rule implementation across channels
  6. Tactical takeaways from each case
  7. Success pattern taxonomy
- **When to Load:** User needs real-world examples or pattern recognition
- **Cross-References:** All domain references
- **Length:** ~2000 words

**common-mistakes.md**
- **Purpose:** Failure patterns and prevention
- **Key Sections:**
  1. Packaging mistakes (core-focused, glance test failure)
  2. Retention killers (slow intros, conclusion language)
  3. SEO mistakes (keyword stuffing, ignoring TAM)
  4. Channel strategy mistakes (niche jumping, perfection paralysis)
  5. Mindset mistakes (algorithm chasing, impatience)
  6. Diagnostic checklists
  7. Prevention and correction strategies
- **When to Load:** User wants to avoid common mistakes or diagnose issues
- **Cross-References:** All domain references
- **Length:** ~2500 words

---

## assets/ Requirements

### Checklists

**1. packaging-checklist.md**
- **Purpose:** Quick reference for thumbnail + title + hook alignment
- **Content:**
  - Thumbnail checklist (glance test, three focus areas, clarity)
  - Title checklist (under 60 chars, simple, human-first, curiosity gap)
  - Hook checklist (first 7 sec confirm click, new hook by 30 sec)
  - Synergy checklist (thumbnail ≠ title, promise alignment)

**2. elimination-criteria.md**
- **Purpose:** Idea evaluation framework
- **Content:**
  - Feasibility check (Can it be done in your workflow?)
  - Excitement check (Are you genuinely passionate?)
  - Packaging check (Can you create a good title/thumbnail?)
  - View target check (Is view goal realistic for TAM?)
  - CCN Fit check (Appeals to Core, Casual, New?)

**3. video-creation-checklist.md**
- **Purpose:** Step-by-step video creation quality assurance
- **Content:**
  - Pre-production (idea, packaging, script outline)
  - Hook section (first 7 seconds, new hook by 30 sec)
  - Body section (retention curve, pacing, pattern interrupts)
  - Payoff section (value delivered, viewer respect)
  - Post-production (title/description, tags, thumbnail variations)

### Templates

**1. thumbnail-evaluation.md**
- **Purpose:** Worksheet for thumbnail design and testing
- **Content:**
  - Glance test scoring (1-5 rating)
  - Three focus areas diagram
  - Color contrast analysis
  - Clarity check vs competitors
  - A/B test plan template

**2. title-variation-worksheet.md**
- **Purpose:** Template for generating and selecting titles
- **Content:**
  - 40 title variation rows (space to write)
  - Scoring columns (curiosity, clarity, appeal, clickability)
  - Pattern analysis (which formulas work best)
  - Selection rationale space

**3. retention-curve-analysis.md**
- **Purpose:** Template for analyzing retention data
- **Content:**
  - Time vs retention percentage graph space
  - Drop-off identification (mark danger zones)
  - Hypothesis space (why did viewers drop off?)
  - Improvement plan space

### Frameworks

**1. ccn-fit-assessment.md**
- **Purpose:** Evaluate Core, Casual, New viewer appeal
- **Content:**
  - Core viewer appeal rating (1-10)
  - Casual viewer appeal rating (1-10)
  - New viewer appeal rating (1-10)
  - Guidance on improving each
  - Growth potential assessment

**2. tam-calculator.md**
- **Purpose:** Quick TAM research workflow
- **Content:**
  - Step-by-step TAM research process
  - Search query template
  - View ceiling identification
  - Outlier search worksheet
  - Adjacent niche brainstorm space
  - Competitive advantage mapping

**3. performance-diagnosis.md**
- **Purpose:** Decision tree for video underperformance
- **Content:**
  - CTR check: Is it low? (→ packaging issue)
  - AVD check: Is it low? (→ content/structure issue)
  - Both low? (→ fundamental misalignment)
  - Specific diagnostic paths based on combination
  - Action steps for each scenario

### Decision Trees

**1. content-type-selector.md**
- **Purpose:** Guide to select correct content type reference
- **Content:**
  - Decision tree: "What type of content are you creating?"
  - Educational? → education-specific guidance
  - Entertainment? → entertainment-specific guidance
  - Documentary? → documentary-specific guidance
  - [etc. for all 6 types]
  - Links to appropriate reference documents

**2. workflow-selector.md**
- **Purpose:** Guide to select correct workflow path
- **Content:**
  - "What's your situation?"
  - Creating new video? → Path 1 (with file links)
  - Optimizing existing? → Path 2 (with file links)
  - Growing channel? → Path 3 (with file links)
  - Learning platform? → Path 4 (with file links)
  - Improving packaging? → Path 5 (with file links)

---

## Progressive Disclosure Path Validation

### Path 1: Creating New Video
✅ **Complete and validated**
- `video-structure.md` provides Hook-Body-Payoff framework
- `packaging-synergy.md` aligns thumbnail + title + hook
- `content-structure-by-type.md` provides type-specific template
- `youtube-seo-tactics.md` OR `discovery-optimization.md` handles SEO/discovery
- `thumbnail-tactics.md` + `title-tactics.md` provide implementation details
- **Cross-references:** All validated, no gaps

### Path 2: Diagnosing Underperformance
✅ **Complete and validated**
- `analytics-framework.md` diagnoses CTR vs AVD issue
- CTR path → `thumbnail-tactics.md` + `title-tactics.md`
- AVD path → `hook-tactics.md` + `retention-tactics.md`
- Both paths → `video-structure.md` + `packaging-synergy.md`
- `testing-iteration.md` for improvement testing
- **Cross-references:** All validated, no gaps

### Path 3: Growing Channel
✅ **Complete and validated**
- `audience-growth.md` validates niche (triple Venn)
- `audience-psychology.md` explains viewer motivation
- `channel-strategy.md` provides 12-month plan
- `publishing-strategy.md` sets phase-based cadence
- `testing-iteration.md` + `analytics-framework.md` drive iteration
- **Cross-references:** All validated, no gaps

### Path 4: Understanding Platform
✅ **Complete and validated**
- `algorithm-mechanics.md` explains ranking
- `platform-dynamics.md` explains incentives
- `audience-psychology.md` explains viewers
- Tactical domains loaded as needed
- **Cross-references:** All validated, no gaps

### Path 5: Optimizing Packaging
✅ **Complete and validated**
- `packaging-synergy.md` overview
- `thumbnail-strategy.md` → `thumbnail-tactics.md` (deep dive)
- `title-strategy.md` → `title-tactics.md` (deep dive)
- `hook-tactics.md` for hook connection
- `testing-iteration.md` for A/B testing
- **Cross-references:** All validated, no gaps

---

## Trigger Conditions (Detailed)

### Primary Triggers

**Content Creation & Optimization:**
- User asks about YouTube strategy, optimization, or best practices
- User requests thumbnail or title improvement
- User wants help with video structure, hooks, or retention
- User asks about packaging (thumbnail + title + hook) alignment
- User needs content type-specific advice (educational, entertainment, documentary, listicles, interviews, long-form)

**Performance Diagnosis:**
- User wants to analyze video performance
- User reports low CTR, low retention, or both
- User has high CTR but low AVD (package-content mismatch)
- User has low CTR but high AVD (packaging issue)

**Channel Growth & Strategy:**
- User needs channel growth guidance
- User wants long-term YouTube strategy
- User asks about publishing cadence or upload frequency
- User needs help with niche validation or positioning
- User wants to understand channel growth stages

**Platform Understanding:**
- User asks about YouTube algorithm or ranking signals
- User wants to understand search vs suggested traffic
- User needs to understand viewer psychology or motivation
- User asks about algorithmic meritocracy

**Analytics & Iteration:**
- User wants to test and improve video performance
- User needs help interpreting YouTube analytics
- User wants A/B testing methodology

### Anti-Patterns (When NOT to trigger)

- ❌ User asks for general video/filmmaking advice (not YouTube-specific)
- ❌ User needs technical equipment recommendations (outside skill scope)
- ❌ User asks for general editing tutorials (not YouTube strategy)
- ❌ User requests video script writing (content creation, not strategy)
- ❌ User asks about YouTube monetization/revenue (financial, not strategy)
- ❌ User needs general marketing advice (not YouTube-specific)

---

## Implementation Notes for Phase 6

**File Creation Order:**
1. Create `/Users/alexandergirardet/Code/vibeflow/vibeflow-beta/.claude/skills/youtube-strategy/SKILL.md` (main skill file)
2. Create `/Users/alexandergirardet/Code/vibeflow/vibeflow-beta/.claude/skills/youtube-strategy/references/` directory
3. Create all 21 reference documents in references/
4. Create `/Users/alexandergirardet/Code/vibeflow/vibeflow-beta/.claude/skills/youtube-strategy/assets/` directory
5. Create all 9 assets (3 checklists + 3 templates + 2 frameworks + 2 decision trees)

**File Standards:**
- All files in imperative/infinitive form (action-oriented)
- Consistent markdown formatting
- Cross-references use markdown link format: `[text](reference-file.md)`
- No duplication across files (reference vs embed)
- Progressive disclosure: SKILL.md high-level, references/ detailed

**Quality Assurance:**
- Verify all cross-references exist and are correct
- Ensure no circular dependencies
- Check that all paths load required supporting files
- Validate that content is self-contained enough to be useful
- Confirm progressive disclosure works logically

---

## Summary

✅ **Phase 5 Complete - All Design Work Done**

**Deliverables:**
- ✅ SKILL.md detailed outline (5 sections, frontmatter complete)
- ✅ 21 reference documents designed (purpose, sections, cross-refs)
- ✅ 9 assets identified (checklists, templates, frameworks, decision trees)
- ✅ 5 progressive disclosure paths validated
- ✅ Trigger conditions comprehensive and specific
- ✅ Implementation guidance for Phase 6

**Ready for Phase 6: Skill Creation**
Next step: Create all files based on this design (SKILL.md + 21 references + 9 assets)

---

*This structure follows skill-creator best practices and is ready for implementation.*
