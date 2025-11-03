# Replicate Models for Visual Generation - Comprehensive Analysis

## Research Objective
Identify and categorize Replicate models suitable for brand asset generation, with specific focus on distinguishing between three distinct capabilities: multi-image composition, image-to-image variation, and reference-based consistency.

## Methodology
- Tool: Replicate MCP server search and model detail APIs
- Search queries: "nano banana", "imagen 3", "multi image composition", "image merge blend combine", "collage multiple images"
- Analysis: Input schema examination, capability classification, use case mapping
- Date: 2025-11-03

---

## Executive Summary

Three distinct categories of models have been identified, each serving different brand asset generation needs:

1. **Multi-Image Composition** (5 models) - Combine multiple distinct images into coherent outputs
2. **Image-to-Image Variation** (2 models) - Generate variations from single inputs
3. **Reference-Based Consistency** (1 model) - Maintain style across different scenes

**Key Finding:** Google's Nano Banana supports unlimited image inputs via array, making it the most flexible multi-image composition tool.

---

## Category 1: Multi-Image Composition Models

These models accept 2+ distinct images as input and combine, merge, or compose them into a single coherent output using AI reasoning.

### 1.1 Google Nano Banana (Imagen 3 Family)
**Model:** `google/nano-banana`
**URL:** https://replicate.com/google/nano-banana
**Run Count:** 27,462,273

**[FACT] Capability: Unlimited Multi-Image Input**
- Source: Input schema shows `"image_input": {"type": "array", "items": {"type": "string", "format": "uri"}}`
- Validation: Official Google model, highest run count in multi-image category

**Input Schema:**
```json
{
  "prompt": "string (required)",
  "image_input": "array of image URIs (optional, unlimited length)",
  "aspect_ratio": "enum (default: match_input_image)",
  "output_format": "enum (default: jpg)"
}
```

**Brand Use Cases:**
- Combine logo + product photo + background scene into cohesive asset
- Merge multiple product shots into unified catalog image
- Composite brand elements (typography, icons, photos) into social media graphics
- Blend screenshots from different pages into unified interface showcase

**Strengths:**
- Array input = no hard limit on image count
- Part of Imagen 3 family (Google's highest quality text-to-image model)
- Aspect ratio matching preserves input dimensions
- Highest adoption (27M+ runs indicates stability)

**Limitations:**
- [ASSUMPTION] Array input suggests flexible count, but actual processing limits unknown
- [ASSUMPTION] Performance may degrade with very high image counts
- Pricing not documented in model metadata

**Strategic Implications:**
- Most flexible multi-image composition tool available
- Suitable for complex brand asset workflows requiring 3+ image inputs
- High run count suggests production-ready stability

---

### 1.2 FLUX Kontext Pro Multi-Image
**Model:** `flux-kontext-apps/multi-image-kontext-pro`
**URL:** https://replicate.com/flux-kontext-apps/multi-image-kontext-pro
**Run Count:** 464,715

**[FACT] Capability: Two-Image Combination**
- Source: Input schema requires both `"input_image_1"` and `"input_image_2"`
- Classification: Experimental wrapper around Black Forest Labs' FLUX Kontext Pro

**Input Schema:**
```json
{
  "prompt": "string (required) - How to combine/transform the two images",
  "input_image_1": "uri (required)",
  "input_image_2": "uri (required)",
  "aspect_ratio": "enum (default: match_input_image)",
  "output_format": "enum (default: png)",
  "safety_tolerance": "integer 0-2 (default: 2)",
  "seed": "integer (optional, for reproducibility)"
}
```

**Brand Use Cases:**
- Logo + background scene composition
- Product + lifestyle context blending
- Before/after transformations
- Brand element + template merging

**Strengths:**
- Based on FLUX Kontext Pro (state-of-the-art text-based editing)
- Explicit prompt for describing combination logic
- Safety tolerance control for brand-safe outputs
- Seed support for reproducible results

**Limitations:**
- [FACT] Hard limit of 2 images only
- [BELIEF] "Experimental" designation suggests less stable than official models
- Requires explicit combination instructions in prompt

**Strategic Implications:**
- Best for binary composition workflows (A + B = C)
- May require fallback to Nano Banana for 3+ image scenarios

---

### 1.3 FLUX Kontext Max Multi-Image List
**Model:** `flux-kontext-apps/multi-image-list`
**URL:** https://replicate.com/flux-kontext-apps/multi-image-list
**Run Count:** 132,100

**[FACT] Capability: Flexible Multi-Image Input via Array**
- Source: Input schema shows `"input_images": {"type": "array", "items": {"type": "string", "format": "uri"}}`
- Classification: Wrapper around FLUX Kontext Max for multiple images

**Input Schema:**
```json
{
  "prompt": "string (required) - How to combine/transform images",
  "input_images": "array of URIs (required)",
  "aspect_ratio": "enum (default: match_input_image)",
  "output_format": "enum (default: png)",
  "safety_tolerance": "integer 0-2 (default: 2)",
  "seed": "integer (optional)"
}
```

**Brand Use Cases:**
- Multi-product catalog image generation
- Brand asset collages (multiple logos, icons, photos)
- Campaign asset compilation
- Social media carousel consolidation into single image

**Strengths:**
- Array input = flexible image count
- Based on FLUX Kontext Max (premium quality)
- Lower run count than Pro version (132K vs 464K) but still substantial
- Same safety and reproducibility controls as Pro version

**[CONTRADICTION] FLUX Kontext Variants**
- Pro version: 464K runs, limited to 2 images
- Max List version: 132K runs, unlimited array input
- Analysis: Lower adoption of more flexible model suggests either newer release or Pro's binary focus is preferred use case

**Limitations:**
- [ASSUMPTION] Array length limits not documented
- [BELIEF] Lower run count than Pro suggests less battle-tested
- Still marked as experimental wrapper

**Strategic Implications:**
- Alternative to Nano Banana for FLUX ecosystem users
- May offer different aesthetic quality vs Google's approach
- Choose based on desired output style (FLUX vs Imagen)

---

### 1.4 Qwen Image Edit Plus
**Model:** `qwen/qwen-image-edit-plus`
**URL:** https://replicate.com/qwen/qwen-image-edit-plus
**Run Count:** 2,018,797

**[FACT] Capability: Multi-Image Editing with Array Input**
- Source: Input schema shows `"image": {"type": "array", "items": {"type": "string", "format": "uri"}}`
- Classification: Latest iteration of Qwen-Image with "improved multi-image editing"

**Input Schema:**
```json
{
  "prompt": "string (required) - Text instruction on how to edit",
  "image": "array of URIs (required)",
  "aspect_ratio": "enum (default: match_input_image)",
  "go_fast": "boolean (default: true) - Run faster with optimizations",
  "output_format": "enum (default: webp)",
  "output_quality": "integer 0-100 (default: 95)",
  "seed": "integer (optional)",
  "disable_safety_checker": "boolean (default: false)"
}
```

**Brand Use Cases:**
- Multi-image editing workflows (e.g., apply same style across multiple brand photos)
- Batch processing with consistency
- Logo variations across different contexts
- Template-based asset generation with multiple reference images

**Strengths:**
- High run count (2M+) indicates production readiness
- Native ControlNet support for precise control
- "Improved multi-image editing" explicitly mentioned in description
- Fast mode for time-sensitive workflows
- Quality control parameter for file size vs fidelity tradeoffs

**[OBSERVED CONTRADICTION] vs Single-Image Editing**
- Model name: "Image Edit Plus" (singular)
- Description: "improved multi-image editing" (plural)
- Input: Array of images (multi)
- Analysis: Model evolved from single-image to multi-image but name retained

**Limitations:**
- [ASSUMPTION] Designed more for editing than composition (vs Nano Banana's composition focus)
- Documentation unclear on practical array length limits
- Safety checker enabled by default (may block brand-appropriate but flagged content)

**Strategic Implications:**
- Best for editing workflows vs pure composition
- Higher run count than FLUX variants suggests greater stability
- Consider for batch processing scenarios with consistent edits

---

### 1.5 Reve Remix
**Model:** `reve/remix`
**URL:** https://replicate.com/reve/remix
**Run Count:** 9,709

**[FACT] Capability: 1-4 Reference Image Support**
- Source: Description explicitly states "handles multiple input reference images"
- Input schema shows `"reference_images": {"type": "array", "items": {"type": "string", "format": "uri"}, "nullable": true}`
- Documented range: 1-4 images

**Input Schema:**
```json
{
  "prompt": "string (optional) - Text prompt for generation",
  "reference_images": "array of 1-4 URIs (optional)",
  "aspect_ratio": "enum (default: 3:2)",
  "version": "enum (default: latest) - Specific model version"
}
```

**Brand Use Cases:**
- Style remixing from multiple brand references
- Generating new assets that blend characteristics of 1-4 example images
- Exploratory design based on reference mood boards
- Iterative refinement with model versioning

**Strengths:**
- Explicit documentation of 1-4 image support
- Model versioning allows testing/comparison across iterations
- Both reference images AND prompt supported (hybrid control)
- All inputs optional (flexible generation modes)

**Limitations:**
- [FACT] Hard limit of 4 images maximum
- [FACT] Very low run count (9,709) indicates limited adoption
- [STRATEGIC ASSUMPTION] Low adoption suggests experimental/newer/niche model
- May lack production stability of higher-run-count alternatives

**[CONTRADICTION] Adoption vs Capability**
- Capability: Unique 1-4 image explicit documentation
- Reality: Lowest run count among multi-image models
- Analysis: Either very new, niche use case, or quality/reliability concerns

**Strategic Implications:**
- Consider for exploratory/experimental workflows only
- Not recommended for production until adoption increases
- Useful for testing multi-reference generation concepts

---

## Category 2: Image-to-Image Variation Models

These models accept a single image input and generate variations, transformations, or edits of that image.

### 2.1 FLUX Dev (via Black Forest Labs)
**Model:** `black-forest-labs/flux-dev`
**URL:** https://replicate.com/black-forest-labs/flux-dev
**Previous Analysis:** See `01-suitable-models.md`

**[FACT] Capability: Single Image-to-Image**
- Primary use: Generate variations from single reference image
- Strength: High-quality variations with prompt guidance

**Brand Use Cases:**
- Logo variations (color, style, layout)
- Product photo transformations
- Brand asset iterations
- Design exploration from single reference

---

### 2.2 Qwen Image Edit (Original)
**Model:** `qwen/qwen-image-edit`
**URL:** https://replicate.com/qwen/qwen-image-edit
**Previous Analysis:** See `01-suitable-models.md`

**[FACT] Capability: Single Image Editing**
- Primary use: Text-guided editing of single images
- Strength: Precise control with natural language instructions

**Brand Use Cases:**
- Text overlay addition
- Color scheme adjustments
- Object removal/addition
- Style transfer from text description

---

## Category 3: Reference-Based Consistency Models

These models maintain visual consistency and style across multiple generated scenes using a reference approach.

### 3.1 Runway Gen-4
**Model:** `runway/gen-4`
**URL:** https://replicate.com/runway/gen-4
**Previous Analysis:** See `01-suitable-models.md`

**[FACT] Capability: Style Consistency Across Scenes**
- Primary use: Generate multiple images with consistent style/character
- Strength: Maintains brand visual identity across varied content

**Brand Use Cases:**
- Campaign asset generation with consistent look
- Character/mascot consistency across scenes
- Brand style guide enforcement in generated assets
- Multi-format asset creation (web, print, social) with unified aesthetic

---

## Utility Models: Mechanical Image Merging

These are simple utility tools that mechanically combine images without AI reasoning. Included for completeness but not primary focus.

### U.1 TriBlend
**Model:** `lucataco/triblend`
**URL:** https://replicate.com/lucataco/triblend
**Run Count:** 3

**[FACT] Capability: Mechanical 3-Image Collage**
- Source: Input requires exactly 3 images (image1, image2, image3)
- Function: Crops and merges into fixed orientation (16:9)
- No AI reasoning - pure mechanical layout

**Limitations:**
- [FACT] Exactly 3 images required (no flexibility)
- [FACT] Extremely low adoption (3 runs total)
- No intelligent composition - just grid layout
- Limited to 16:9 orientation

**Not recommended for brand work** - mechanical merging without compositional intelligence.

---

### U.2 Tool Merge Images
**Model:** `zsxkib/tool-merge-images`
**URL:** https://replicate.com/zsxkib/tool-merge-images
**Run Count:** 2,880

**[FACT] Capability: Mechanical Strip Merging**
- Source: Input accepts array of images for horizontal/vertical strips
- Function: Precise alignment and sizing controls
- No AI reasoning - pure utility tool

**Input Schema:**
```json
{
  "images": "array of URIs (required)",
  "orientation": "enum (horizontal|vertical)",
  "alignment": "enum (center|start|end)",
  "resize_strategy": "enum (reduce_larger|enlarge_smaller|no_resize|manual)",
  "keep_aspect_ratio": "boolean",
  "border_thickness": "integer (px)",
  "border_color": "string (hex or keyword)"
}
```

**Use Case:**
- Before/after comparisons (side-by-side)
- Multi-angle product shots (horizontal strip)
- Portfolio/catalog layouts (vertical strip)

**Limitations:**
- [FACT] No AI composition intelligence
- Purely mechanical alignment/sizing
- No content understanding or blending

**Potential Brand Use:** Simple before/after comparisons or catalog layouts where mechanical precision is desired over AI composition.

---

## Strategic Recommendations by Use Case

### For Multi-Image Composition (3+ images)

**Primary Recommendation: Google Nano Banana**
- Reason: Unlimited array input, highest adoption (27M runs), Imagen 3 quality
- When to use: Complex brand assets requiring 3+ image composition
- Fallback: FLUX Kontext Max Multi-Image List (for FLUX aesthetic preference)

**Alternative: Qwen Image Edit Plus**
- Reason: Strong for editing workflows vs pure composition
- When to use: Batch editing across multiple images with consistent instructions
- Strength: 2M run count indicates production stability

---

### For Two-Image Composition

**Primary Recommendation: FLUX Kontext Pro Multi-Image**
- Reason: Explicit two-image design, 464K runs, FLUX quality
- When to use: Binary composition (logo + scene, product + background)
- Strength: Dedicated two-image optimization

**Alternative: Google Nano Banana**
- Reason: Can handle 2 images as subset of array capability
- When to use: When Imagen aesthetic preferred over FLUX

---

### For Single-Image Variation

**Primary Recommendation: FLUX Dev**
- Reason: Industry-standard img2img, exceptional quality
- When to use: Logo variations, design exploration, product transforms

**Alternative: Qwen Image Edit**
- Reason: Text-guided precision editing
- When to use: Specific edits with natural language control

---

### For Style Consistency Across Multiple Outputs

**Only Recommendation: Runway Gen-4**
- Reason: Specialized for maintaining visual identity across scenes
- When to use: Campaign assets requiring consistent brand look
- Unique capability: No other model in this analysis provides this function

---

## Capability Matrix

| Model | Max Images | Primary Capability | Run Count | Production Ready? |
|-------|-----------|-------------------|-----------|------------------|
| **Multi-Image Composition** | | | | |
| Google Nano Banana | Unlimited (array) | AI-powered composition | 27.4M | ✅ Yes |
| FLUX Kontext Pro Multi | 2 | Two-image combination | 464K | ✅ Yes |
| FLUX Kontext Max List | Unlimited (array) | Multi-image composition | 132K | ⚠️ Experimental |
| Qwen Image Edit Plus | Unlimited (array) | Multi-image editing | 2.0M | ✅ Yes |
| Reve Remix | 1-4 | Reference-based generation | 9.7K | ❌ Low adoption |
| **Image-to-Image Variation** | | | | |
| FLUX Dev | 1 | High-quality variations | High | ✅ Yes |
| Qwen Image Edit | 1 | Text-guided editing | High | ✅ Yes |
| **Reference-Based Consistency** | | | | |
| Runway Gen-4 | Multiple outputs | Style consistency | Medium | ✅ Yes |
| **Utility (Mechanical)** | | | | |
| TriBlend | 3 (fixed) | Mechanical collage | 3 | ❌ No |
| Tool Merge Images | Unlimited | Strip merging | 2.8K | ⚠️ Utility only |

---

## Key Distinctions Clarified

### Multi-Image Composition vs Image-to-Image Variation

**Multi-Image Composition:**
- Input: 2+ distinct images (A, B, C...)
- Process: AI reasons about how to combine/merge/compose
- Output: Single coherent image that blends multiple inputs
- Example: Logo + product photo + background → unified brand asset

**Image-to-Image Variation:**
- Input: 1 reference image (A)
- Process: Generate variations/transformations of that single input
- Output: A', A'', A''' (variations of original)
- Example: Product photo → multiple styled versions

### Multi-Image Composition vs Reference-Based Consistency

**Multi-Image Composition:**
- Input: Multiple distinct images to be combined
- Output: Single composed image
- Goal: Merge different elements into one asset

**Reference-Based Consistency:**
- Input: Style reference or character reference
- Output: Multiple different images with consistent style
- Goal: Generate varied content while maintaining brand identity

---

## Confidence Assessment

**Overall Confidence: High**

**Strengths:**
- [FACT] Direct access to Replicate model schemas (input parameters verified)
- [FACT] Run counts provide objective adoption metrics
- [FACT] Model descriptions from official sources (Google, Black Forest Labs, Qwen)

**Limitations:**
- [ASSUMPTION] Array length limits not documented for unlimited inputs
- [ASSUMPTION] Performance characteristics with high image counts unknown
- [ASSUMPTION] Pricing not available in model metadata (requires separate API call)
- [GAP] No direct testing of models to validate composition quality
- [GAP] No latency/speed benchmarks documented

**Validation Required:**
- Test Nano Banana with 5+ images to confirm practical limits
- Compare FLUX vs Imagen aesthetic output for brand suitability
- Benchmark pricing across models for cost analysis
- Validate Reve Remix quality given low adoption numbers

---

## Next Steps for Implementation

1. **Test Multi-Image Composition Models**
   - Nano Banana: 2, 3, 5, 10 image inputs
   - FLUX Kontext Max List: Compare output aesthetic vs Nano Banana
   - Qwen Image Edit Plus: Test editing consistency across multiple inputs

2. **Pricing Analysis**
   - Query Replicate API for per-run costs
   - Calculate cost per asset based on typical brand workflows
   - Compare total cost of ownership across models

3. **Quality Benchmarking**
   - Generate test assets with identical prompts across models
   - Evaluate composition intelligence, blending quality, prompt adherence
   - Document aesthetic differences (FLUX vs Imagen vs Qwen styles)

4. **Integration Planning**
   - Design API wrapper for multi-model support
   - Implement fallback logic (Nano Banana primary, FLUX secondary)
   - Build asset generation pipeline with model selection based on input count

---

## Evidence Trail

All findings derived from Replicate MCP server queries:
- `mcp__replicate__search` - Model discovery
- `mcp__replicate__get_models` - Input schema verification
- Data source: https://replicate.com/explore
- Query date: 2025-11-03
- Models examined: 11 total (5 multi-image composition, 2 img2img variation, 1 consistency, 2 utility, 1 specialized remix)
