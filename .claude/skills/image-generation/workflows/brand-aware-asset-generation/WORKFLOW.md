# Brand-Aware Asset Generation Workflow

Generate high-quality visual assets that align with brand strategy using AI image generation with multi-image brand context support.

---

## Generation Objective

**Goal:** Create on-brand visual assets by combining strategic prompts with uploaded brand reference materials, ensuring outputs align with established brand identity and visual language.

**Inputs:**
- User request describing desired asset
- Brand context from `/brand/strategy/` (voice, messaging, positioning)
- Brand reference images (logos, color palettes, existing assets)
- Technical specifications (dimensions, format, style requirements)

**Output:**
- Generated visual assets stored locally with metadata
- Iteration history tracking prompt refinements
- Final assets ready for review/publication

**When to use:**
- Creating social media graphics aligned with brand voice
- Generating product imagery consistent with brand aesthetics
- Producing campaign assets that match brand positioning
- Developing visual variations while maintaining brand identity

---

## Generation Phases

### Phase 1: Brand Asset Discovery

**Purpose:** Identify and collect brand reference materials needed for context-aware generation.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** Inline (below)
- **Context needed:**
  - User request (what asset to generate)
  - Brand strategy files at `/brand/strategy/voice/STRATEGY.md`
  - Brand visual assets directory (if exists)

**Activities:**
1. Parse user request to understand asset requirements
2. Identify relevant brand strategy documents to load
3. Locate brand visual assets (logos, color references, style guides)
4. Determine which reference images should be uploaded for generation
5. Validate that required brand context exists

**Artifact produced:**
- `01-brand-context.md` - Documented brand context and reference materials list

**Key decisions:**
- Which brand strategy domains are relevant (voice, messaging, positioning)?
- Which visual assets should be included as reference images?
- What brand constraints must the generated asset satisfy?

---

### Phase 2: Prompt Enhancement

**Purpose:** Transform user request into optimized AI image generation prompt using established framework.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** Reference to [prompt-guide.md](../../prompt-guide.md)
- **Context needed:**
  - User's original request
  - Brand context from Phase 1
  - Prompt enhancement framework from prompt-guide.md

**Activities:**
1. Load prompt enhancement framework (Subject-Context-Style structure)
2. Extract core requirements from user request
3. Enhance prompt with:
   - **Subject:** Concrete, specific description (not abstract concepts)
   - **Context:** Environment, setting, positioning, relationships
   - **Style:** Medium, artistic movement, technical approach
4. Apply brand-specific constraints from strategy
5. Incorporate positive phrasing (no negative terms)
6. Specify aspect ratio based on use case
7. Validate prompt structure against framework principles

**Artifact produced:**
- `02-enhanced-prompt.md` - Final optimized prompt with framework rationale

**Key principles from framework:**
- Use positive phrasing only ("clear sky" not "no clouds")
- Concrete nouns over abstract concepts
- Specific technical language (lens type, lighting, composition)
- Aspect ratio aligned with use case (1:1 social, 16:9 landscape, 9:16 mobile)

**Example transformation:**
```
User request: "Create a logo for our AI product"

Enhanced prompt: "A minimalist tech logo featuring geometric shapes
in navy blue and electric teal, clean lines, modern sans-serif wordmark,
centered composition, professional corporate identity style, vector art aesthetic,
high contrast, negative space design"
```

---

### Phase 3: Brand Asset Upload

**Purpose:** Upload brand reference images to cloud storage and obtain public HTTPS URLs for Replicate API.

**Delegation:**
- **Agent:** general-purpose
- **Context needed:**
  - List of reference image paths from Phase 1
  - Cloud storage configuration (bucket name, provider)
  - Upload utility at `scripts/upload_assets.py`

**Activities:**
1. Validate reference image files exist and meet requirements:
   - File size < 50MB (configurable)
   - Allowed formats: `.png`, `.jpg`, `.jpeg`, `.webp`
   - Files are valid images (not corrupted)
2. Execute upload utility:
   ```python
   python scripts/upload_assets.py \
     --files "brand/logo.png" "brand/colors.jpg" \
     --bucket "brand-assets" \
     --provider "s3" \
     --prefix "generation-refs"
   ```
3. Collect public HTTPS URLs from upload results
4. Validate URLs are accessible
5. Document URL expiry constraints (if applicable)

**Artifact produced:**
- `03-uploaded-refs.json` - JSON array of public URLs for brand assets

**Technical constraints:**
- Replicate requires HTTPS URLs for files > 256KB
- URLs must be publicly accessible (no authentication)
- Upload timeout: 30 seconds per file
- Retry logic: 3 attempts with exponential backoff

**Error handling:**
- File validation failures → Skip invalid files, document in artifact
- Upload timeouts → Retry with backoff, fail after 3 attempts
- Permission errors → Document, suggest configuration fix

---

### Phase 4: Prediction Creation

**Purpose:** Submit generation request to Replicate API with enhanced prompt and brand context.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** Inline (below)
- **Context needed:**
  - Enhanced prompt from Phase 2
  - Brand reference URLs from Phase 3
  - Replicate MCP server access

**Activities:**
1. Construct prediction input for `google/nano-banana` model:
   ```json
   {
     "prompt": "<enhanced-prompt-from-phase-2>",
     "image_input": ["<url-1>", "<url-2>", "<url-n>"],
     "aspect_ratio": "1:1",
     "output_format": "png"
   }
   ```
2. Submit prediction via Replicate MCP:
   ```
   mcp__replicate__create_predictions
   ```
3. Capture prediction ID and status
4. Document prediction metadata (model, version, timestamp)

**Artifact produced:**
- `04-prediction-request.json` - Prediction ID, input parameters, submission timestamp

**Model selection rationale:**
- **Primary:** `google/nano-banana` - Unlimited multi-image input support
- **Fallback:** FLUX Kontext Max List (if Imagen aesthetic doesn't match brand)
- **Capability:** Array-based image input allows 1-N brand references

**Key parameters:**
- `aspect_ratio`: Match intended use case (social media, web, print)
- `output_format`: Default `png` for transparency support, `jpg` for web optimization
- `image_input`: Array of brand reference URLs from Phase 3

---

### Phase 5: Prediction Monitoring

**Purpose:** Poll prediction status until completion or timeout.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** Inline (below)
- **Context needed:**
  - Prediction ID from Phase 4
  - Replicate MCP server access

**Activities:**
1. Poll prediction status via:
   ```
   mcp__replicate__get_predictions(prediction_id)
   ```
2. Check status field:
   - `starting` → Continue polling
   - `processing` → Continue polling
   - `succeeded` → Extract output URL, proceed to Phase 6
   - `failed` → Log error, check iteration budget for retry
   - `canceled` → Document cancellation reason, stop workflow
3. Implement polling strategy:
   - Initial delay: 5 seconds
   - Increment: +2 seconds per poll
   - Maximum: 60 second intervals
   - Timeout: 10 minutes total
4. Extract output URL when status = `succeeded`

**Artifact produced:**
- `05-prediction-result.json` - Final status, output URL, generation metrics

**Timeout handling:**
- If prediction exceeds 10 minutes → Document timeout, offer retry option
- Model typically completes in 15-45 seconds for standard requests

**Status monitoring:**
```
Polling interval: [5s, 7s, 9s, 11s, 13s, 15s, ..., 60s]
Total timeout: 10 minutes
Expected completion: < 1 minute for most requests
```

---

### Phase 6: Asset Download & Storage

**Purpose:** Download generated asset and store locally with metadata for review.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** Inline (below)
- **Context needed:**
  - Output URL from Phase 5
  - Local storage path structure

**Activities:**
1. Download generated image from Replicate output URL
2. Store in temporal execution folder:
   ```
   .claude/skills/image-generation/{YYYY-MM-DD@HH:mm}/
   └── artifacts/
       ├── generated-asset.png
       └── generation-metadata.json
   ```
3. Create metadata file with:
   - Original user request
   - Enhanced prompt used
   - Brand references uploaded
   - Model and version
   - Generation timestamp
   - Iteration number (if retry)
4. Validate downloaded file integrity:
   - File size > 0 bytes
   - Valid image format
   - Dimensions match requested aspect ratio

**Artifact produced:**
- `06-final-asset.png` - Downloaded generated image
- `06-metadata.json` - Complete generation context and parameters

**Critical timing constraint:**
- Replicate output URLs expire after 1 hour
- Download MUST occur immediately upon prediction success
- Store locally before URL becomes inaccessible

**File naming convention:**
```
generated-asset-{iteration}.png
Examples:
- generated-asset-1.png (first attempt)
- generated-asset-2.png (first iteration)
- generated-asset-3.png (second iteration)
```

---

### Phase 7: User Feedback Loop (Iteration)

**Purpose:** Review generated asset with user and iterate if needed.

**Delegation:**
- **Agent:** general-purpose
- **Instructions:** Inline (below)
- **Context needed:**
  - Generated asset from Phase 6
  - Original request and enhanced prompt
  - Iteration history (how many attempts so far)

**Activities:**
1. Present generated asset to user for review
2. Gather specific feedback:
   - What works well about this asset?
   - What needs to change?
   - Which specific elements should be adjusted?
3. Determine iteration path:
   - **Approve:** Asset meets requirements → Complete workflow
   - **Iterate:** Needs refinement → Return to Phase 2 with feedback
   - **Cancel:** Fundamental mismatch → Document reasons, end workflow
4. If iterating:
   - Update enhanced prompt based on feedback (Phase 2)
   - Systematic change: Modify ONE element at a time
   - Document what changed and why
   - Increment iteration counter
5. Check iteration budget:
   - Maximum: 5 iterations per workflow
   - If limit reached → Present best option, complete workflow

**Artifact produced:**
- `07-user-feedback-{iteration}.md` - Documented feedback and iteration decision

**Iteration best practices:**
- Change ONE element per iteration (prompt framework principle)
- Document each change systematically
- Compare iterations side-by-side for user
- Reference framework categories for changes:
  - Subject refinement
  - Context adjustment
  - Style modification
  - Technical parameter tweaks

**Iteration examples:**
```
Iteration 1 → 2: Changed "golden hour lighting" to "studio lighting"
Iteration 2 → 3: Added "minimalist composition" to style
Iteration 3 → 4: Adjusted aspect ratio from 16:9 to 1:1
Iteration 4 → 5: Refined subject from "mountain lake" to "alpine lake with snow peaks"
```

**Completion criteria:**
- User approves asset, OR
- Maximum iterations (5) reached, OR
- User cancels workflow

---

## Output Structure

The final workflow output includes:

1. **Generated Asset** - Final approved image file (`generated-asset-{n}.png`)
2. **Generation Metadata** - Complete context and parameters used
3. **Iteration History** - All prompts tried and feedback received
4. **Brand Context** - Which strategy/assets informed the generation
5. **Technical Details** - Model, version, timing, URLs

**Artifact directory structure:**
```
.claude/skills/image-generation/{YYYY-MM-DD@HH:mm}/
├── PLAN.md                           # Workflow approach
├── TODO.md                           # Progress tracking
├── artifacts/
│   ├── 01-brand-context.md          # Phase 1
│   ├── 02-enhanced-prompt.md        # Phase 2
│   ├── 03-uploaded-refs.json        # Phase 3
│   ├── 04-prediction-request.json   # Phase 4
│   ├── 05-prediction-result.json    # Phase 5
│   ├── 06-final-asset.png           # Phase 6
│   ├── 06-metadata.json             # Phase 6
│   └── 07-user-feedback-{n}.md      # Phase 7 (per iteration)
└── generated-asset-{iteration}.png  # Final output
```

---

## Technical Specifications

### Model Details
- **Primary model:** `google/nano-banana` (Imagen 3 family)
- **Run count:** 27M+ (production-ready stability)
- **Capability:** Unlimited multi-image input via array
- **URL:** https://replicate.com/google/nano-banana

### Input Schema
```json
{
  "prompt": "string (required)",
  "image_input": "array of image URIs (optional, unlimited length)",
  "aspect_ratio": "enum (default: match_input_image)",
  "output_format": "enum (default: jpg)"
}
```

### Supported Aspect Ratios
- `1:1` - Social media (Instagram, profile images)
- `16:9` - Landscape (web banners, YouTube thumbnails)
- `9:16` - Mobile/vertical (Stories, TikTok)
- `4:3` - Traditional photography
- `3:4` - Portrait orientation

### Time Constraints
- **Prediction timeout:** 10 minutes
- **Expected completion:** 15-45 seconds
- **Output URL expiry:** 1 hour (download immediately)
- **Total workflow time:** < 15 minutes for 1-2 iterations

### Iteration Limits
- **Maximum iterations:** 5 per workflow
- **Iteration strategy:** Change ONE element at a time
- **Iteration storage:** All attempts preserved in artifacts

---

## Success Criteria

**Workflow succeeds when:**
1. Generated asset aligns with user request
2. Brand context is appropriately incorporated
3. Output quality meets technical specifications
4. User approves final asset (or max iterations reached)
5. All artifacts are documented for audit trail

**Workflow fails when:**
- Brand context cannot be located/loaded
- Upload utility fails for all reference images
- Prediction fails repeatedly (3+ consecutive failures)
- Output URL expires before download
- Fundamental mismatch between request and model capabilities

---

## Error Recovery Strategies

| Error Type | Recovery Strategy |
|------------|------------------|
| Missing brand strategy | Proceed with user request only, document limitation |
| Upload failure (single file) | Skip that reference, continue with remaining |
| Upload failure (all files) | Generate without references, warn about brand alignment |
| Prediction timeout | Retry once, then offer alternative approach |
| Prediction failure | Check error message, adjust prompt, retry |
| Download failure | Immediate retry (3 attempts), document if all fail |
| Max iterations reached | Present best option, document iteration history |

---

## Integration Points

**Upstream dependencies:**
- `/brand/strategy/` - Brand context for prompt enhancement
- Brand asset directory - Reference images for upload
- `scripts/upload_assets.py` - Cloud upload utility

**Downstream consumers:**
- Content creation workflows (use generated assets)
- Brand asset library (store approved outputs)
- Campaign execution (deploy finalized visuals)

**External services:**
- Replicate API (`google/nano-banana` model)
- Cloud storage (S3/GCS/R2 for reference uploads)

---

## Future Enhancements

**Potential workflow improvements:**
- Automatic aspect ratio detection from use case
- Brand asset library auto-discovery
- Style consistency scoring (compare to brand guidelines)
- Batch generation for asset variations
- A/B testing support (generate multiple options)
- Integration with content calendar (scheduled generation)
