# Voice Strategy Synthesis with Twitter Extension

**Created:** 2025-10-29@10:35
**Execution Folder:** `/strategy/voice/voice-strategy-synthesis/2025-10-29@10:35/`

## Objective

Synthesize comprehensive voice strategy for vibeflow brand by integrating research findings from voice benchmarking, brand fundamentals, and customer insights, then create a Twitter-specific extension that aligns voice guidelines with X algorithm optimization (based on September-October 2025 algorithm updates).

## Approach

This workflow follows a three-phase approach:

1. **Voice Strategy Synthesis** - Consolidate research findings into universal voice guidelines (STRATEGY.md)
2. **Twitter Extension Development** - Create platform-specific voice adaptations for Twitter/X that incorporate algorithm optimization insights (twitter/EXTENSION.md)
3. **Quality Validation** - Ensure strategy is actionable, research-backed, and properly cross-referenced

The strategy will follow the progressive disclosure pattern where STRATEGY.md contains universal voice principles and twitter/EXTENSION.md extends (not replaces) with platform-specific additions.

## Input Data

**Location:** `data/`

None - workflow synthesizes from existing research files:
- `/research/voice-benchmarking/2025-10-28@18:04/RESEARCH.md` - Voice analysis of benchmark brands
- `/research/brand-story-interview/RESEARCH.md` - Founder perspective and brand values
- `/research/customer-insights/RESEARCH.md` - Target audience understanding
- `/research/twitter-algorithm/2025-10-25@17:23/RESEARCH.md` - X algorithm mechanics and optimization

## Step by Step Tasks

### 1. Synthesize Universal Voice Guidelines

Consolidate voice benchmarking research and brand fundamentals into comprehensive universal voice strategy.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `/research/voice-benchmarking/2025-10-28@18:04/RESEARCH.md`
- `/research/brand-story-interview/RESEARCH.md`
- `/research/customer-insights/RESEARCH.md`

**Output Artifact:** `artifacts/01-voice-strategy-draft.md`

**Task Details:**

You are synthesizing voice strategy for vibeflow based on research findings. Create a comprehensive voice strategy document that follows this structure:

**Structure:**
1. **Voice Overview** - Core voice identity in 2-3 paragraphs
2. **Voice Attributes** - 3-5 defining characteristics with descriptions and examples
3. **Tone Positioning** - Spectrum positioning (casual/formal, humorous/serious, irreverent/respectful, straightforward/subtle)
4. **Universal Voice Principles** - Core mechanics that apply across all channels (active voice, sentence structure, vocabulary choices, etc.)
5. **Distinctive Elements** - Recurring patterns that make vibeflow voice recognizable
6. **What We Sound Like / What We Don't Sound Like** - Concrete examples

**Requirements:**
- Every strategic claim must reference research findings using markdown links: `[descriptive text](/path/to/file.md)`
- Use voice benchmarking insights to inform differentiation strategy
- Ensure voice reflects brand values and mirrors product experience
- Make guidelines actionable with concrete examples
- Maintain 70-85% casual formality and 90-95% straightforward directness (modern tech/creator standard)

**Key Research Insights to Integrate:**
- Universal voice principles: consistency, active voice dominance, concrete language, evidence-based credibility
- Differentiation through tone spectrum positioning and distinctive elements
- Voice should embody brand values through mechanics, not just stated claims

Write the complete draft to `artifacts/01-voice-strategy-draft.md`.

---

### 2. Create Twitter Extension with Algorithm Optimization

Develop Twitter-specific voice adaptations that incorporate X algorithm optimization insights while maintaining brand voice consistency.

**Agent:** strategist-agent
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-voice-strategy-draft.md`
- `/research/twitter-algorithm/2025-10-25@17:23/RESEARCH.md`

**Output Artifact:** `artifacts/02-twitter-extension-draft.md`

**Task Details:**

You are creating a Twitter-specific voice extension that extends (not replaces) the universal voice guidelines with platform-specific adaptations optimized for X's algorithm.

**Structure:**
1. **Platform Context** - Brief overview of Twitter/X and why voice adaptations are needed
2. **Algorithm-Informed Voice Adaptations** - How universal voice principles adapt for Twitter while optimizing for algorithm
3. **Twitter-Specific Voice Elements** - Platform-unique patterns (thread structure, hooks, calls-to-action, etc.)
4. **Content Type Guidelines** - Voice application for different Twitter formats (single tweets, threads, replies, quote tweets)
5. **Optimization Without Compromise** - How to maximize algorithmic visibility while maintaining brand voice authenticity

**Requirements:**
- Reference universal voice guidelines from Phase 1 artifact
- Integrate X algorithm insights (reply engagement priority, video content boost, conversation optimization)
- Show how voice principles adapt to Twitter's constraints (character limits, engagement patterns)
- Provide concrete examples of on-brand tweets that also optimize for algorithm
- Address algorithm transition period (September-October 2025 updates, Grok AI coming November-December)

**Key Algorithm Insights to Integrate:**
- Reply engagement = 75x more valuable than likes (prioritize conversation-starting voice)
- Video content prioritized (how voice translates to video captions/scripts)
- First 2-3 hours critical (craft hooks that generate immediate engagement)
- AI evaluation coming (quality over engagement-baiting)
- Link handling changes (substantial captions required)

Write the complete draft to `artifacts/02-twitter-extension-draft.md`.

---

### 3. Finalize and Cross-Reference Strategy Files

Review, refine, and format both strategy documents with proper cross-referencing and audit trails.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-voice-strategy-draft.md`
- `artifacts/02-twitter-extension-draft.md`

**Output Artifacts:**
- `artifacts/03-final-review.md`
- `STRATEGY.md` (root level)
- `twitter/EXTENSION.md` (subfolder)

**Task Details:**

Finalize both strategy documents with quality validation and proper formatting.

**Phase 3a - Quality Validation:**

Create `artifacts/03-final-review.md` that validates:
- All strategic claims have research citations using markdown references
- Voice attributes are concrete and actionable
- Examples are specific and on-brand
- Twitter extension properly extends (not replaces) universal guidelines
- Cross-references between files are correct
- No generic AI-generated content (everything brand-specific)

**Phase 3b - File Creation:**

1. Create `STRATEGY.md` at execution folder root:
   - Use finalized content from `artifacts/01-voice-strategy-draft.md`
   - Add reference to Twitter extension: "View specific guidelines for: [twitter](twitter/EXTENSION.md)"
   - Ensure all research citations are relative paths
   - Format for readability

2. Create `twitter/EXTENSION.md` subfolder and file:
   - Create directory: `twitter/`
   - Use finalized content from `artifacts/02-twitter-extension-draft.md`
   - Add header note: "This extension adds Twitter-specific voice adaptations to the [universal voice guidelines](../STRATEGY.md)"
   - Ensure all references work correctly (both to parent STRATEGY.md and to research files)

**Validation Checklist:**
- [ ] All research claims have markdown references
- [ ] Voice attributes include concrete examples
- [ ] Tone positioning clearly defined
- [ ] Twitter extension extends rather than replaces
- [ ] Cross-references between files work
- [ ] Files follow progressive disclosure pattern
- [ ] No generic/unsubstantiated content

Complete validation report in `artifacts/03-final-review.md` and create both final strategy files.

## Success Criteria

- **Comprehensive Voice Strategy:** STRATEGY.md contains universal voice guidelines applicable across all channels
- **Research-Backed:** Every strategic claim references research findings with markdown citations
- **Actionable Guidelines:** Voice attributes include concrete examples and clear direction
- **Twitter Optimization:** Extension successfully integrates algorithm insights while maintaining brand voice authenticity
- **Progressive Disclosure:** Twitter extension properly extends (not replaces) universal guidelines
- **Audit Trail:** Clear chain from research → strategy with verifiable references
- **Quality Standards:** No generic AI content, everything brand-specific and defensible
