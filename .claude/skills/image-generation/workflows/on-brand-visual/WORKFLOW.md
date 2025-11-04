# On-Brand Visual Workflow

Generate AI visual assets aligned with brand guidelines through iterative testing and refinement.

## Generation Objective

**Goal:** Create assets meeting user requirements while adhering to brand visual guidelines.

**Inputs:** User request, brand guidelines from `/brand/strategy/visual-guidelines`, [prompt-guide.md](../../prompt-guide.md), technical specs  
**Output:** Approved asset, iteration history, numbered draft progression  
**Use when:** Need systematic brand compliance validation with audit trail  

---

## Generation Phases

### Phase 1: Prompt Enhancement

**Delegation:** general-purpose agent  
**Input:** User request, [prompt-guide.md](../../prompt-guide.md)

**Activities:**
1. Load prompt framework (Subject-Context-Style structure)
2. Extract requirements and structure prompt with framework components
3. Apply positive phrasing, technical specificity (lens, lighting, composition)
4. Determine aspect ratio: `1:1` (social), `16:9` (landscape), `9:16` (vertical), `4:3`/`3:4` (traditional)
5. Validate against framework principles (concrete nouns, no negative terms)

**Artifact:** `01-enhanced-prompt.md` - Optimized prompt with rationale

---

### Phase 2: Image Generation with Replicate

**Delegation:** general-purpose agent  
**Context:** Enhanced prompt, Replicate MCP access  

**Activities:**
1. Select model: **Primary:** `google/nano-banana` (Imagen 3, 15-45s completion)
2. Construct input: `{"prompt": "...", "aspect_ratio": "1:1", "output_format": "png"}`
3. Submit via `mcp__replicate__create_predictions`
4. Capture prediction ID, timestamp, model version

**Artifact:** `02-prediction-request.json` - Prediction metadata

---

### Phase 3: Asset Download & Draft Storage

**Delegation:** general-purpose agent  
**Context:** Prediction ID, draft iteration number  

**Activities:**
1. Poll prediction status via `mcp__replicate__get_predictions` (5s start, +2s increment, 60s max, 10min timeout)
2. Extract output URL when `status = succeeded`
3. Download image immediately (URLs expire in 1 hour)
4. Store as `artifacts/03-generated-draft-{NN}.png` (increment NN per iteration)
5. Validate: file size > 0, valid format, correct dimensions

**Artifacts:**
- `03-generated-draft-{NN}.png` - Image with iteration number (01, 02, 03, ...)
- `03-draft-{NN}-metadata.json` - Generation details per draft

---

### Phase 4a: Brand Visual Guidelines Test

**Delegation:** general-purpose agent  
**Context:** Draft from Phase 3, brand guidelines from `/brand/strategy/`  

**Activities:**
1. Load brand visual guidelines (check `/brand/strategy/visual-guidelines/STRATEGY.md`)
2. Test against criteria: color palette, visual style, composition, typography, brand elements, tone/mood
3. Document violations (❌) and passes (✅) with specific examples
4. Calculate compliance score (% of guidelines met)
5. Categorize issues: **Critical** (must fix), **Moderate** (should improve), **Minor** (nice to have)

**Artifact:** `04-brand-test-draft-{NN}.md` - Compliance score, categorized feedback, recommended changes

---

### Phase 4b: User Request Match Test

**Delegation:** general-purpose agent  
**Context:** Draft from Phase 3, original user request, enhanced prompt  

**Activities:**
1. Load original request and enhanced prompt from Phase 1
2. Read generated draft via Read tool
3. Test against requirements: subject accuracy, context fulfillment, style alignment, technical specs, use case suitability
4. Document matches (✅) and mismatches (❌) with specific examples
5. Calculate fulfillment score (% of requirements met)
6. Categorize issues: **Critical** (core not met), **Moderate** (details missing), **Minor** (refinements)

**Artifact:** `05-request-test-draft-{NN}.md` - Fulfillment score, categorized feedback, recommended changes

---

### Phase 5: Feedback Integration & Iteration

**Delegation:** general-purpose agent 
 **Context:** Feedback from Phases 4a & 4b, enhanced prompt  

**Activities:**
1. Synthesize feedback: identify overlaps, prioritize criticals, note conflicts
2. Calculate scores: Brand compliance %, User fulfillment %, Overall = (Brand + User)/2
3. Determine path:
   - **Complete:** Both ≥90% AND no criticals, OR max iterations (5) reached
   - **Iterate:** Criticals present OR score <90% AND budget remains
   - **Cancel:** Fundamental incompatibility (brand vs. user)
4. If iterating:
   - **Change ONE element** (framework principle)
   - Map to Subject/Context/Style component
   - Update prompt, return to Phase 2, increment draft number
5. If completing: Document final selection, archive all drafts

**Artifacts:**
- `06-iteration-plan-{NN}.md` - Change strategy, framework mapping, expected impact
- `06-final-decision.md` - Completion rationale (if done)

**Conflict resolution:** Brand guidelines take precedence by default; present conflicts to Marketing Architect for override

---

## Output Structure

**Final outputs:** Approved asset, iteration history, test feedback per draft, iteration plans, metadata

**Artifact structure:**
```
.claude/skills/image-generation/{YYYY-MM-DD@HH:mm}/
├── PLAN.md / TODO.md
├── artifacts/
│   ├── 01-enhanced-prompt.md
│   ├── 02-prediction-request.json
│   ├── 03-generated-draft-{NN}.png (per iteration)
│   ├── 03-draft-{NN}-metadata.json
│   ├── 04-brand-test-draft-{NN}.md
│   ├── 05-request-test-draft-{NN}.md
│   ├── 06-iteration-plan-{NN}.md
│   └── 06-final-decision.md
└── final-asset.png (symlink to approved draft)
```

---

## Technical Specifications

**Model:** `google/nano-banana` (Imagen 3, 27M+ runs) | **Input:** `{prompt, aspect_ratio, output_format}`
**Aspect ratios:** `1:1` (social), `16:9` (landscape), `9:16` (vertical), `4:3`/`3:4` (traditional)
**Timing:** 15-45s generation, 1hr URL expiry, 10min timeout, <30min total workflow
**Iteration:** Max 5, change ONE element/iteration, all drafts preserved with numbered suffix
**Scoring:** ≥90% pass threshold, 0 critical issues required, combined = (brand + user)/2

---

## Success Criteria

**Success:** Both tests ≥90%, no criticals, MA approval, audit trail complete
**Complete:** Success OR max iterations (5) OR fundamental incompatibility
**Failure:** Missing guidelines, 3+ prediction failures, URL expiry, model limitations, irreconcilable conflicts

## Error Recovery

| Error | Recovery |
|-------|----------|
| Missing guidelines | Proceed user-only, document, flag MA |
| Prediction timeout/failure | Retry once, check model status, adjust prompt |
| Download failure | Retry 3x max |
| Test conflict | Document, present to MA |
| Max iterations | Present best draft |
| Persistent criticals (3+ iter) | Flag issue, consult MA |

---

## Integration Points

**Upstream dependencies:**
- `/brand/strategy/` - Brand visual guidelines for testing
- [prompt-guide.md](../../prompt-guide.md) - Prompt enhancement framework
- Replicate MCP - Image generation service

**Downstream consumers:**
- Content creation workflows (use approved assets)
- Brand asset library (store approved outputs)
- Campaign execution (deploy finalized visuals)

**External services:**
- Replicate API (`google/nano-banana` model)

---

## Future Enhancements

**Potential workflow improvements:**
- Automatic brand guideline extraction from strategy files
- Visual similarity scoring against approved brand assets
- A/B testing support (generate multiple options, compare scores)
- Batch generation with consistent guidelines
- Integration with content calendar (scheduled generation)
- ML-based brand compliance prediction (pre-generate scoring)
- Automated post-processing (add watermarks, adjust colors to brand palette)
