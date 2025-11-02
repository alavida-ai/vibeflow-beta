# Tweet Creation Plan: AI in Marketing

**Execution Folder:** `/brand/content/twitter-posts/2025-10-31@12:29-ai-in-marketing/`
**Created:** 2025-10-31
**Status:** Planning

---

## Objective

Create a single tweet (or thread) about "AI in marketing" that:
- Aligns with Vibeflow's voice strategy (intellectually provocative, evidence-based, ownership-focused)
- Follows Twitter-specific voice adaptations (conversation-starting, algorithm-optimized without compromise)
- Reflects the brand's core positioning: infrastructure ownership over tool dependency

---

## Context Files

**Voice Strategy:**
- [Universal Voice Strategy](/brand/strategy/voice/STRATEGY.md) - Core voice attributes and tone
- [Twitter Voice Extension](/brand/strategy/voice/twitter/EXTENSION.md) - Platform-specific adaptations

**Key Voice Attributes:**
1. Technically credible without jargon
2. Intellectually provocative (challenges AI-replaces-marketers narrative)
3. Ownership-focused (infrastructure > tools)
4. Evidence-based (cite research, avoid vague claims)
5. Systems-builder mindset (architect, not automate)

**Twitter Optimizations:**
- Conversation-starting formats (maximize reply engagement, weighted 75x)
- Thread structure: 1-3-1 pattern (hook → build → conclude with invitation)
- Quality over engagement-bait (Grok AI optimization)
- Rich media opportunities (video prioritized by algorithm)

---

## Approach Decision: Single Tweet vs Thread

**Recommendation:** Start with **single standalone tweet** (200-280 chars)

**Rationale:**
- Simple request ("create a tweet") suggests standalone format
- Single tweets can be conversation starters without thread complexity
- Thread expansion can be added if Marketing Architect requests

**Alternative:** If Marketing Architect prefers thread format, will use 1-3-1 pattern:
- Tweet 1: Provocative hook about AI in marketing
- Tweets 2-4: Evidence/systems insight
- Final: Bold implication + conversation invitation

---

## Phase Breakdown

### Phase 1: Topic Angle Selection
**Agent:** Operations Manager (decision requires Marketing Architect input)
**Objective:** Define specific angle for "AI in marketing" tweet

**Options to explore:**
1. **Productivity Paradox** - "10x productive, same hours worked" (evidence-based)
2. **Infrastructure Philosophy** - "Own vs rent AI tools" (ownership-focused)
3. **AI-Replaces-Marketers Myth** - Challenge extraction narrative (intellectually provocative)
4. **Orchestration Overhead** - Systems-builder pain point
5. **Marketing Architect Identity** - "From tool user to systems architect"

**Output:** Selected angle with rationale (artifact: `01-angle-selection.md`)

---

### Phase 2: Draft Tweet(s)
**Agent:** Content Creator (sub-agent, delegated)
**Objective:** Generate 3-5 tweet variations aligned with selected angle

**Inputs:**
- Selected angle from Phase 1
- Voice strategy file paths (not content—agent loads progressively)
- Twitter extension guidelines

**Requirements:**
- Each variation tests different voice emphasis
- Character count: 200-280 optimal (can use up to 280)
- Include conversation invitation (question/disagree prompt)
- Maintain voice consistency (technically credible, provocative, ownership-focused)

**Output:** Multiple tweet variations (artifact: `02-tweet-drafts.md`)

---

### Phase 3: Voice Compliance Review
**Agent:** Operations Manager (ensures architectural compliance)
**Objective:** Verify drafts against voice checklist

**Verification:**
- ✅ Technically credible without jargon
- ✅ Intellectually provocative (challenges something)
- ✅ Ownership-focused language
- ✅ Evidence-based (where relevant)
- ✅ Systems-builder framing
- ✅ Conversation invitation included
- ✅ No patronizing/generic SaaS language

**Output:** Compliance assessment + recommended refinements (artifact: `03-voice-review.md`)

---

### Phase 4: Final Selection & Polish
**Agent:** Operations Manager (with Marketing Architect approval)
**Objective:** Select strongest tweet and polish for publication

**Process:**
1. Present top 2-3 variations to Marketing Architect
2. Gather feedback/preferences
3. Apply final polish based on feedback
4. Generate final CONTENT.md for review/publication

**Output:** Final tweet ready for publication (`CONTENT.md`)

---

## Expected Artifacts

```
/artifacts/
├── 01-angle-selection.md          # Chosen topic angle with rationale
├── 02-tweet-drafts.md              # 3-5 tweet variations
├── 03-voice-review.md              # Voice compliance assessment
└── CONTENT.md (at root)            # Final polished tweet for publication
```

---

## Success Criteria

**Voice Alignment:**
- Passes voice consistency checklist (universal + Twitter)
- Avoids forbidden language patterns
- Maintains intellectual rigor without jargon

**Twitter Optimization:**
- Character count: 200-280 (optimal engagement length)
- Conversation invitation included (reply-optimized)
- Quality content (Grok AI-ready, not engagement-bait)

**Strategic Alignment:**
- Reinforces Vibeflow positioning (ownership, systems-thinking)
- Challenges industry narrative (if provocative angle chosen)
- Demonstrates evidence-based credibility (if research-backed angle chosen)

---

## Questions for Marketing Architect

Before proceeding to implementation, please confirm:

1. **Format preference:** Single tweet or thread?
2. **Angle preference:** Any of the 5 angles particularly compelling, or different direction?
3. **Tone calibration:** How provocative? (More "intellectually challenging" or more "systems-insight"?)
4. **Evidence requirements:** Should we cite specific research/data, or keep more philosophical?

---

**Next Step:** Upon approval, run `/implement` to execute this plan and generate tweet content.
