# Plan: Porcelain Coder Visual Generation

## Objective

Generate a brand-aligned visual asset depicting "a man with a cap coding away on a retro computer, the man is a porcelain figure" using the on-brand-visual workflow.

## Input Requirements

- **User Request:** A man with a cap coding away on a retro computer, the man is a porcelain figure
- **Workflow:** On-Brand Visual (guideline-driven validation)
- **Brand Guidelines Available:** [Brand Visual Guidelines](/brand/strategy/visual-guidelines/2025-11-03@19:27/STRATEGY.md)
- **Prompt Framework:** [AI Image Prompting Guide](//.claude/skills/image-generation/prompt-guide.md)

## Execution Flow

### Phase 1: Prompt Enhancement
- **Input:** User request + prompt framework
- **Activities:**
  1. Structure prompt using Subject-Context-Style framework
  2. Identify visual components: porcelain figure (subject), coding posture/cap, retro computer, environment
  3. Apply positive phrasing and technical specificity
  4. Determine aspect ratio: **1:1** (social media, balanced composition works for standalone visual)
  5. Create enhanced prompt document with rationale
- **Output:** `artifacts/01-enhanced-prompt.md`

### Phase 2: Image Generation
- **Input:** Enhanced prompt
- **Activities:**
  1. Select model: `google/nano-banana` (Imagen 3)
  2. Construct prediction input with aspect ratio `1:1` and format `png`
  3. Submit via Replicate API
  4. Capture prediction metadata
- **Output:** `artifacts/02-prediction-request.json`

### Phase 3: Asset Download & Draft Storage
- **Input:** Prediction ID from Phase 2
- **Activities:**
  1. Poll prediction status (start 5s, increment 2s, max 60s, 10min timeout)
  2. Extract output URL when status = `succeeded`
  3. Download image immediately (URLs expire in 1 hour)
  4. Store as `artifacts/03-generated-draft-01.png`
  5. Validate file integrity
- **Output:** `artifacts/03-generated-draft-01.png` + `artifacts/03-draft-01-metadata.json`

### Phase 4a: Brand Visual Guidelines Test
- **Input:** Generated draft + brand guidelines from [Strategy](/brand/strategy/visual-guidelines/2025-11-03@19:27/STRATEGY.md)
- **Activities:**
  1. Load brand visual guidelines (color, style, composition, elements, tone/mood)
  2. Test draft against guideline criteria
  3. Document passes (✅) and violations (❌)
  4. Calculate compliance score
  5. Categorize issues: Critical / Moderate / Minor
- **Output:** `artifacts/04-brand-test-draft-01.md`

### Phase 4b: User Request Match Test
- **Input:** Generated draft + original request + enhanced prompt
- **Activities:**
  1. Evaluate subject accuracy: porcelain figure quality, cap representation
  2. Evaluate context: retro computer rendering, coding posture authenticity
  3. Evaluate style/mood alignment
  4. Document matches (✅) and gaps (❌)
  5. Calculate fulfillment score
  6. Categorize issues: Critical / Moderate / Minor
- **Output:** `artifacts/05-request-test-draft-01.md`

### Phase 5: Feedback Integration & Iteration
- **Input:** Feedback from Phases 4a & 4b
- **Activities:**
  1. Synthesize brand compliance score + user fulfillment score
  2. Determine path:
     - **Complete:** Both ≥90% AND no critical issues
     - **Iterate:** Critical issues exist OR score <90%
  3. If iterating: change ONE prompt element, return to Phase 2, increment draft number (max 5 iterations)
  4. If completing: document final decision, create symlink to approved draft
- **Output:** `artifacts/06-iteration-plan-{NN}.md` or `artifacts/06-final-decision.md` + `final-asset.png`

## Success Criteria

- ✅ Brand compliance ≥ 90%
- ✅ User fulfillment ≥ 90%
- ✅ Zero critical issues
- ✅ All drafts preserved with audit trail
- ✅ Marketing Architect approval (MA reviews final asset)

## Constraints & Notes

- **Max iterations:** 5 (if not meeting criteria by iteration 5, present best option)
- **Change strategy:** One element per iteration only (Subject, Context, OR Style)
- **Aspect ratio:** 1:1 (social media optimal)
- **Brand guidelines location:** [/brand/strategy/visual-guidelines/2025-11-03@19:27/](/brand/strategy/visual-guidelines/2025-11-03@19:27/STRATEGY.md)
- **Visual guidelines artifacts:**
  - [Color Palette](/brand/strategy/visual-guidelines/2025-11-03@19:27/artifacts/02a-color-palette.md)
  - [Typography](/brand/strategy/visual-guidelines/2025-11-03@19:27/artifacts/02b-typography.md)
  - [Brand Elements](/brand/strategy/visual-guidelines/2025-11-03@19:27/artifacts/02c-brand-elements.md)
  - [Composition](/brand/strategy/visual-guidelines/2025-11-03@19:27/artifacts/02d-composition-layout.md)
  - [Tone/Mood](/brand/strategy/visual-guidelines/2025-11-03@19:27/artifacts/02e-tone-mood.md)

## Estimated Timeline

- Phase 1 (Prompt): 5-10 min
- Phase 2 (Generation): 2 min
- Phase 3 (Download): 2 min
- Phase 4 (Testing): 10-15 min per draft
- Phase 5 (Iteration): 15-20 min per iteration
- **Total (best case, 0 iterations):** ~25-30 min
- **Total (typical, 1-2 iterations):** 40-60 min

## Ready to Implement?

When you're ready to proceed with execution, run `/implement` to begin Phase 1 (Prompt Enhancement).

---

**Created:** 2025-11-04
**Workflow:** On-Brand Visual
**Status:** Planning (awaiting approval)
