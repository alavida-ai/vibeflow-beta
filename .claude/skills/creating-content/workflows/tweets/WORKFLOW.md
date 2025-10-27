# Create Tweet Content

Create strategy-aligned Twitter content through a multi-phase workflow that ensures positioning reinforcement, on-brand voice, and audience resonance.

---

## Content Objective

**Goal:** Create tweets that reinforce brand positioning, express brand voice, and resonate with target audience.

**Inputs:**
- Topic or theme provided by user
- Strategy documents (loaded by phase)

**Output:**
- Published tweet content ready for Twitter

---

## Prerequisites Check

Before content creation, verify strategy exists:

1. **Phase 1 requirements:**
   - `/strategy/positioning/STRATEGY.md` exists
   - `/strategy/messaging/STRATEGY.md` exists
   - `/strategy/audience/STRATEGY.md` exists

2. **Phase 2 requirements:**
   - `/strategy/voice/STRATEGY.md` exists
   - `/strategy/voice/twitter/EXTENSION.md` exists (if not, use base voice only)
   - Selected messaging theme from Phase 1

3. **Phase 3 requirements:**
   - `/strategy/brand-fundamentals/STRATEGY.md` exists
   - `/strategy/positioning/STRATEGY.md` exists

If strategy files are missing, prompt user to run synthesis workflows first.

---

## Content Creation Phases

### Phase 1: Strategic Ideation

**Purpose:** Generate tweet ideas that reinforce positioning and resonate with audience.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** [phase-1-ideation.md](phase-1-ideation.md)
- **Context needed:** Topic/theme from user

**Strategy loaded (by path):**
- `/strategy/positioning/STRATEGY.md` - Differentiation to reinforce
- `/strategy/messaging/STRATEGY.md` - Key themes to explore
- `/strategy/audience/STRATEGY.md` - What resonates with audience

**Activities:**
- Generate 3-5 tweet concepts aligned with topic
- Each concept should reinforce positioning differentiation
- Leverage messaging themes
- Address audience pain points or interests
- Explain strategic rationale for each concept

**Artifact produced:** `artifacts/01-ideation.md` - Tweet concepts with strategic rationale

---

### Phase 2: Voice-Driven Drafting

**Purpose:** Write on-brand tweet copy that expresses brand voice.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** [phase-2-drafting.md](phase-2-drafting.md)
- **Context needed:** Selected concept from Phase 1, artifacts/01-ideation.md

**Strategy loaded (by path):**
- `/strategy/voice/STRATEGY.md` - Base brand voice
- `/strategy/voice/twitter/EXTENSION.md` - Twitter-specific voice adaptations
- `/strategy/messaging/STRATEGY.md` - Customer language and messaging theme

**Activities:**
- Select strongest concept from Phase 1 (or user can choose)
- Draft 2-3 variations of the tweet
- Apply voice attributes and tone guidance
- Use customer language from messaging strategy
- Optimize for Twitter (length, format, hooks)
- Consider engagement elements (questions, CTAs, thread potential)

**Artifact produced:** `artifacts/02-draft.md` - Draft tweet variations

---

### Phase 3: Brand Integrity Review

**Purpose:** Validate brand alignment before publishing.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** [phase-3-review.md](phase-3-review.md)
- **Context needed:** artifacts/02-draft.md

**Strategy loaded (by path):**
- `/strategy/brand-fundamentals/STRATEGY.md` - Values alignment check
- `/strategy/positioning/STRATEGY.md` - Differentiation reinforcement check

**Activities:**
- Review each draft variation for brand alignment
- Check: Does this reinforce our positioning?
- Check: Does this align with our values?
- Check: Could this be confused with competitor messaging?
- Identify strongest variation or recommend revisions
- Provide approval or revision guidance

**Artifact produced:** `artifacts/03-review.md` - Approval and final recommendation

---

## Output Structure

The final output includes:

1. **PLAN.md** - Content brief with topic, strategic context, strategy references
2. **TODO.md** - Phase tracking during creation
3. **artifacts/01-ideation.md** - Tweet concepts with rationale
4. **artifacts/02-draft.md** - Draft tweet variations
5. **artifacts/03-review.md** - Brand alignment review and approval
6. **CONTENT.md** - Final approved tweet ready to publish

**Final format (CONTENT.md):**
```markdown
---
content_type: tweet
topic: [topic]
created: YYYY-MM-DD@HH:mm
strategy_context:
  - /strategy/positioning/STRATEGY.md
  - /strategy/messaging/STRATEGY.md
  - /strategy/voice/STRATEGY.md
  - /strategy/voice/twitter/EXTENSION.md
  - /strategy/audience/STRATEGY.md
  - /strategy/brand-fundamentals/STRATEGY.md
---

# Tweet: [Topic]

## Final Content

[Approved tweet text here]

## Strategic Rationale

**Positioning reinforcement:** [How this tweet reinforces differentiation]
**Messaging alignment:** [Which theme/message this supports]
**Audience resonance:** [Why this resonates with target audience]

## Publishing Notes

- Character count: [X/280]
- Engagement hook: [Type of hook used]
- CTA/next step: [If applicable]
```

---

## Execution Flow

```
1. USER REQUEST
   "Create a tweet about [topic]"
   ↓
2. CREATE EXECUTION FOLDER
   /content/tweets/{YYYY-MM-DD@HH:mm-topic-slug}/
   ↓
3. WRITE PLAN.md
   Document topic, objectives, strategy files to load
   ↓
4. PHASE 1: IDEATION
   Load: Positioning + Messaging + Audience (by path)
   Generate: Tweet concepts with strategic rationale
   Write: artifacts/01-ideation.md
   ↓
5. PHASE 2: DRAFTING
   Load: Voice + Voice/Twitter + Messaging (by path)
   Draft: 2-3 tweet variations
   Write: artifacts/02-draft.md
   ↓
6. PHASE 3: REVIEW
   Load: Brand Fundamentals + Positioning (by path)
   Review: Brand alignment check
   Write: artifacts/03-review.md
   ↓
7. FINALIZE
   Write: CONTENT.md with approved tweet
   ↓
8. PRESENT TO USER
   Show final tweet + strategic rationale
   User can publish or request revisions
```

---

## Progressive Disclosure in Action

Each phase loads ONLY what it needs:

- **Phase 1:** 3 strategy files (positioning, messaging, audience)
- **Phase 2:** 3 strategy files (voice, voice/twitter, messaging)
- **Phase 3:** 2 strategy files (brand fundamentals, positioning)

No phase is overwhelmed with unnecessary context. Each agent has exactly the information needed for its task.

---

## Notes

- Tweets should be 240-260 characters when possible (leave room for retweets with comments)
- Each tweet should reinforce ONE key message from messaging strategy
- Voice/Twitter extension should be created before running this workflow
- Multiple tweet variations allow for A/B testing or scheduling variety
- Strategic rationale helps user understand WHY the tweet works
