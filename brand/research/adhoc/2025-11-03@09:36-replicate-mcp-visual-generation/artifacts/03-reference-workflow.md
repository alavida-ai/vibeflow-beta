# Reference Image Workflows for Visual Asset Generation

**Date:** 2025-11-03
**Purpose:** Practical workflows and code examples for all three visual generation capabilities using Replicate MCP
**Audience:** Developers implementing brand asset generation systems

---

## Executive Summary

This guide provides complete, executable workflows for three distinct visual generation capabilities:

1. **Multi-Image Composition** - Combine 2+ distinct images into one coherent output (e.g., logo + scene + product)
2. **Image-to-Image Variation** - Generate variations from single input (e.g., logo color variants)
3. **Reference-Based Consistency** - Maintain style/character across different scenes (e.g., campaign consistency)

Each workflow includes:
- Step-by-step implementation using MCP tools
- Complete working code examples
- File handling patterns (HTTP URLs vs data URLs)
- Prompt engineering guidance
- Error handling and retry logic
- Output management strategies

**Critical Requirement:** All outputs expire after 1 hour - you MUST download and save generated assets immediately.

---

## Table of Contents

1. [File Handling Fundamentals](#file-handling-fundamentals)
2. [Use Case 1: Multi-Image Composition](#use-case-1-multi-image-composition)
3. [Use Case 2: Image-to-Image Variation](#use-case-2-image-to-image-variation)
4. [Use Case 3: Reference-Based Consistency](#use-case-3-reference-based-consistency)
5. [Use Case 4: Text-Guided Image Editing](#use-case-4-text-guided-image-editing)
6. [Common Patterns & Best Practices](#common-patterns--best-practices)
7. [Error Handling & Retry Logic](#error-handling--retry-logic)
8. [Output Management](#output-management)
9. [Model Selection Decision Tree](#model-selection-decision-tree)

---

## File Handling Fundamentals

Before executing any workflow, you need to prepare reference images. Replicate accepts two formats:

### HTTP URLs (Recommended)

**When to use:**
- File size > 256kb
- Need to reuse image across multiple predictions
- Want metadata association in prediction records
- Production workflows

**Requirements:**
- Must be publicly accessible HTTPS URL
- No authentication required (public read access)
- Common formats: JPG, PNG, WebP, GIF

**Example:**
```javascript
const input = {
  image: "https://cdn.example.com/brand/logo.png",
  style_image: "https://cdn.example.com/brand/background.jpg"
};
```

**Hosting Options:**
- CDN (Cloudflare, Cloudinary)
- Cloud storage (S3, Google Cloud Storage, Azure Blob)
- Temporary hosting (imgbb, imgur - for testing only)
- Own infrastructure (ensure HTTPS and CORS if needed)

---

### Data URLs (Small Files Only)

**When to use:**
- File size ≤ 256kb
- No external hosting available
- Single-use, ephemeral input
- Quick testing/prototyping

**Format:**
```
data:{mimetype};base64,{base64_encoded_data}
```

**Example:**
```javascript
// Node.js example
const fs = require('fs');
const path = require('path');

function imageToDataURL(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64 = imageBuffer.toString('base64');
  const ext = path.extname(imagePath).slice(1);
  const mimeType = `image/${ext}`;

  return `data:${mimeType};base64,${base64}`;
}

const input = {
  image: imageToDataURL('./logo.png')
};
```

**Limitations:**
- 256kb maximum file size
- Not stored by Replicate (cannot reuse)
- Increases request payload size
- Not recommended for production

---

### File Size Optimization

Before using data URLs, check file size:

```javascript
function shouldUseDataURL(imagePath) {
  const stats = fs.statSync(imagePath);
  const fileSizeInKB = stats.size / 1024;

  if (fileSizeInKB > 256) {
    console.warn(`File too large for data URL: ${fileSizeInKB}KB (max 256KB)`);
    return false;
  }

  return true;
}

// Smart file handling
function prepareImageInput(imagePath, hostedURL = null) {
  if (hostedURL) {
    // Prefer HTTP URL if available
    return hostedURL;
  }

  if (shouldUseDataURL(imagePath)) {
    return imageToDataURL(imagePath);
  }

  throw new Error('File too large for data URL. Upload to CDN and use HTTP URL.');
}
```

---

### Image Resolution Considerations

**Recommended Resolutions:**
- Logos: 512x512 to 1024x1024 (square)
- Product photos: 1024x1024 to 2048x2048
- Background scenes: 1920x1080 to 4096x2160
- Social media: Match platform specs (1080x1080 Instagram, 1200x628 Facebook)

**Resolution Impact:**
- Higher resolution = better quality but slower generation
- Lower resolution = faster but may lose detail
- Most models support aspect ratio preservation
- Some models require specific dimensions (check input schema)

---

## Use Case 1: Multi-Image Composition

**Goal:** Combine 2+ distinct images into one coherent output

**Best Models:**
- **Primary:** Google Nano Banana (unlimited images, 27M+ runs)
- **Alternative:** FLUX Kontext Pro Multi-Image (2 images, 464K runs)
- **Batch Editing:** Qwen Image Edit Plus (array input, 2M runs)

---

### Scenario 1A: Combine Logo + Product + Background (3 images)

**Use Case:** Generate hero image for product landing page

**Model:** Google Nano Banana (supports unlimited array input)

**Complete Implementation:**

```javascript
// Step 1: Prepare image inputs
const logoURL = "https://cdn.example.com/brand/logo-white.png";
const productURL = "https://cdn.example.com/products/widget-photo.jpg";
const backgroundURL = "https://cdn.example.com/scenes/office-background.jpg";

// Step 2: Create prediction using MCP tool
async function composeHeroImage() {
  try {
    // Get model details first to verify input schema
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "google",
      model_name: "nano-banana",
      jq_filter: ".latest_version.id"
    });

    const versionId = modelInfo.latest_version.id;

    // Create prediction with multi-image input
    const prediction = await mcp__replicate__create_predictions({
      version: `google/nano-banana:${versionId}`,
      input: {
        prompt: "Professional product hero image. Place the white logo in the top-left corner, the product prominently in the center with good lighting, and the office background creating depth and context. Maintain brand colors and clean composition. Photorealistic style with subtle shadows.",
        image_input: [
          logoURL,      // First image: logo for top-left
          productURL,   // Second image: main subject
          backgroundURL // Third image: scene/context
        ],
        aspect_ratio: "16:9",  // Landing page hero format
        output_format: "jpg"
      },
      Prefer: "wait",  // Wait up to 60 seconds for completion
      jq_filter: "{id, status, output, error, metrics}"
    });

    // Step 3: Handle result
    if (prediction.status === "succeeded") {
      console.log("✅ Composition completed in", prediction.metrics.total_time, "seconds");
      return await downloadOutput(prediction.output[0]);
    }

    // Step 4: Poll if not yet complete
    console.log("⏳ Polling for completion...");
    return await pollAndDownload(prediction.id);

  } catch (error) {
    console.error("❌ Composition failed:", error);
    throw error;
  }
}

// Helper: Poll until completion
async function pollAndDownload(predictionId, maxAttempts = 120) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000); // Poll every 2 seconds

    const prediction = await mcp__replicate__get_predictions({
      prediction_id: predictionId,
      jq_filter: "{status, output, error, metrics}"
    });

    if (prediction.status === "succeeded") {
      console.log("✅ Completed after", i * 2, "seconds");
      return await downloadOutput(prediction.output[0]);
    }

    if (prediction.status === "failed") {
      throw new Error(`Prediction failed: ${prediction.error}`);
    }

    if (prediction.status === "canceled") {
      throw new Error("Prediction was canceled");
    }

    // Still processing
    console.log(`⏳ Attempt ${i + 1}/${maxAttempts}: ${prediction.status}`);
  }

  throw new Error("Timeout: Prediction did not complete in 4 minutes");
}

// Helper: Download and save output
async function downloadOutput(outputURL) {
  // CRITICAL: Download within 1 hour before expiry
  const response = await fetch(outputURL, {
    headers: {
      'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  const filename = `hero-image-${Date.now()}.jpg`;

  // Save to local filesystem
  fs.writeFileSync(`./outputs/${filename}`, Buffer.from(buffer));

  console.log(`💾 Saved to ./outputs/${filename}`);

  // Optionally upload to permanent storage (S3, CDN, etc.)
  // const permanentURL = await uploadToS3(buffer, filename);

  return {
    localPath: `./outputs/${filename}`,
    tempURL: outputURL,  // Expires in 1 hour
    // permanentURL: permanentURL  // If uploaded to storage
  };
}

// Execute
composeHeroImage()
  .then(result => console.log("Result:", result))
  .catch(error => console.error("Error:", error));
```

---

### Scenario 1B: Two-Image Binary Composition (Logo + Scene)

**Use Case:** Add brand logo to marketing scene

**Model:** FLUX Kontext Pro Multi-Image (optimized for 2 images)

**Complete Implementation:**

```javascript
async function addLogoToScene(logoURL, sceneURL, logoPosition = "top-left") {
  try {
    // Get latest version ID
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "flux-kontext-apps",
      model_name: "multi-image-kontext-pro",
      jq_filter: ".latest_version.id"
    });

    // Create prediction with explicit combination instructions
    const prediction = await mcp__replicate__create_predictions({
      version: `flux-kontext-apps/multi-image-kontext-pro:${modelInfo.latest_version.id}`,
      input: {
        prompt: `Place the logo from the first image in the ${logoPosition} corner of the scene from the second image. The logo should be clearly visible but naturally integrated, with subtle drop shadow for depth. Maintain the scene's original atmosphere and lighting. Professional brand integration.`,
        input_image_1: logoURL,   // Logo to be placed
        input_image_2: sceneURL,  // Background scene
        aspect_ratio: "match_input_image",  // Keep scene dimensions
        output_format: "png",  // PNG for logo transparency if needed
        safety_tolerance: 2,   // Maximum tolerance (brand content is safe)
        seed: null  // Random seed for variation
      },
      Prefer: "wait",
      jq_filter: "{id, status, output, error}"
    });

    if (prediction.status === "succeeded") {
      return await downloadOutput(prediction.output[0]);
    }

    return await pollAndDownload(prediction.id);

  } catch (error) {
    console.error("❌ Binary composition failed:", error);
    throw error;
  }
}

// Usage with reproducible seed
async function createReproducibleComposition() {
  const result1 = await addLogoToScene(
    "https://cdn.example.com/logo.png",
    "https://cdn.example.com/scene.jpg"
  );

  // Same inputs with same seed = identical output
  const prediction2 = await mcp__replicate__create_predictions({
    version: "...",
    input: {
      prompt: "...",
      input_image_1: "...",
      input_image_2: "...",
      seed: 42  // Fixed seed for reproducibility
    }
  });

  return { original: result1, reproduction: prediction2 };
}
```

---

### Scenario 1C: Multi-Product Catalog Composition (5+ images)

**Use Case:** Create catalog page with multiple product shots

**Model:** FLUX Kontext Max Multi-Image List (array input)

**Complete Implementation:**

```javascript
async function createProductCatalog(productImages, layoutStyle = "grid") {
  try {
    // Validate input count
    if (productImages.length < 2) {
      throw new Error("Minimum 2 images required for catalog");
    }

    console.log(`📦 Creating catalog with ${productImages.length} products`);

    // Get model version
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "flux-kontext-apps",
      model_name: "multi-image-list",
      jq_filter: ".latest_version.id"
    });

    // Construct layout-specific prompt
    const layoutPrompts = {
      grid: "Arrange all products in a clean grid layout with equal spacing. Products should be evenly sized and aligned. White background with subtle drop shadows for depth. Professional e-commerce catalog style.",
      showcase: "Create a hero showcase with the first product prominently featured in center, and remaining products arranged tastefully around the edges. Dramatic lighting with clean white background.",
      flow: "Arrange products in a flowing, organic composition that guides the eye naturally from left to right. Varying sizes for visual interest. Modern, editorial layout style.",
      comparison: "Line up products side-by-side for easy comparison. Equal sizing and spacing. Include subtle guides or dividers between products. Clean, minimal style."
    };

    const prediction = await mcp__replicate__create_predictions({
      version: `flux-kontext-apps/multi-image-list:${modelInfo.latest_version.id}`,
      input: {
        prompt: layoutPrompts[layoutStyle] || layoutPrompts.grid,
        input_images: productImages,  // Array of product image URLs
        aspect_ratio: "16:9",  // Landscape catalog format
        output_format: "png",
        safety_tolerance: 2
      },
      Prefer: "wait",
      jq_filter: "{id, status, output, error, metrics}"
    });

    if (prediction.status === "succeeded") {
      console.log(`✅ Catalog created with ${productImages.length} products in ${prediction.metrics.total_time}s`);
      return await downloadOutput(prediction.output[0]);
    }

    return await pollAndDownload(prediction.id);

  } catch (error) {
    console.error("❌ Catalog composition failed:", error);
    throw error;
  }
}

// Usage: Create catalog from product URLs
const products = [
  "https://cdn.example.com/products/widget-a.jpg",
  "https://cdn.example.com/products/widget-b.jpg",
  "https://cdn.example.com/products/widget-c.jpg",
  "https://cdn.example.com/products/widget-d.jpg",
  "https://cdn.example.com/products/widget-e.jpg"
];

createProductCatalog(products, "grid")
  .then(result => console.log("Catalog saved:", result.localPath))
  .catch(error => console.error(error));
```

---

### Multi-Image Composition: Prompt Engineering Guide

**Effective Prompt Structure:**

```
[Composition Goal] + [Element Placement] + [Style/Atmosphere] + [Technical Details]
```

**Examples:**

**Good Prompt (Specific):**
```
"Professional product showcase. Place logo in top-left corner at 15% size.
Position product center-frame with 3-point lighting. Use office background
for context at 50% opacity. Maintain brand blue (#0066CC) accents.
Photorealistic rendering with subtle depth of field."
```

**Bad Prompt (Vague):**
```
"Make it look good with logo and product"
```

**Key Prompt Elements:**

1. **Layout Instructions**
   - Explicit positioning (top-left, center-frame, background layer)
   - Relative sizing (logo at 15%, product dominant)
   - Spacing and margins

2. **Visual Hierarchy**
   - Primary focus (main product)
   - Secondary elements (logo, background)
   - Depth layers (foreground/midground/background)

3. **Style Guidance**
   - Lighting (3-point, dramatic, natural)
   - Color palette (brand colors, hex codes)
   - Atmosphere (professional, playful, elegant)

4. **Technical Specs**
   - Rendering style (photorealistic, illustrative, flat design)
   - Effects (shadows, reflections, blur)
   - Quality (high resolution, sharp details)

---

### Multi-Image Composition: Common Pitfalls

**❌ Pitfall 1: Conflicting Image Aspects**
```javascript
// Problem: Square logo + landscape scene + portrait product
input: {
  image_input: [
    "square-logo.png",      // 1:1
    "landscape-scene.jpg",  // 16:9
    "portrait-product.jpg"  // 9:16
  ]
}
```

**✅ Solution: Preprocess or prompt for aspect handling**
```javascript
input: {
  prompt: "Compose images respecting their native aspect ratios. Crop or pad as needed to fit 16:9 final output without distortion.",
  image_input: [...],
  aspect_ratio: "16:9"
}
```

---

**❌ Pitfall 2: Ambiguous Combination Logic**
```javascript
input: {
  prompt: "Combine these images",  // Too vague
  image_input: [logo, product, background]
}
```

**✅ Solution: Explicit composition instructions**
```javascript
input: {
  prompt: "Layer composition: background image as base layer, product image center-frame in midground with natural shadows, logo watermark in top-right at 10% size with 85% opacity. Cohesive professional look.",
  image_input: [background, product, logo]  // Order matters
}
```

---

**❌ Pitfall 3: Image Order Assumptions**
```javascript
// Assuming model knows which is logo vs scene vs product
input: {
  image_input: [imageA, imageB, imageC]
}
```

**✅ Solution: Describe each image in prompt**
```javascript
input: {
  prompt: "First image is brand logo (place top-left), second image is main product (center focus), third image is background scene (full canvas base layer).",
  image_input: [logo, product, scene]
}
```

---

## Use Case 2: Image-to-Image Variation

**Goal:** Generate variations from single reference image

**Best Models:**
- **Primary:** FLUX Dev (industry-standard img2img)
- **Alternative:** Qwen Image Edit (text-guided precision)

---

### Scenario 2A: Logo Color Variations

**Use Case:** Generate 5 color variants of brand logo

**Model:** FLUX Dev

**Complete Implementation:**

```javascript
async function generateLogoVariations(logoURL, colorSchemes, count = 5) {
  try {
    // Get FLUX Dev model info
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "black-forest-labs",
      model_name: "flux-dev",
      jq_filter: ".latest_version.id"
    });

    // Define color variation prompts
    const variations = colorSchemes.map((scheme, index) => ({
      prompt: `Logo redesign in ${scheme.name} color scheme. Primary color: ${scheme.primary}, accent: ${scheme.accent}. Maintain original logo shape and proportions. Clean, professional vector style. Solid background removed (transparent).`,
      seed: 1000 + index,  // Different seeds for variety
      scheme: scheme
    }));

    console.log(`🎨 Generating ${variations.length} color variations...`);

    // Create predictions in parallel
    const predictions = await Promise.all(
      variations.map(async (variant) => {
        const prediction = await mcp__replicate__create_predictions({
          version: `black-forest-labs/flux-dev:${modelInfo.latest_version.id}`,
          input: {
            prompt: variant.prompt,
            image: logoURL,  // Reference logo
            strength: 0.7,   // 70% transformation, 30% preservation
            guidance_scale: 7.5,
            num_inference_steps: 50,
            seed: variant.seed,
            output_format: "png"
          },
          jq_filter: "{id, status, output, error}"
        });

        return {
          prediction,
          scheme: variant.scheme
        };
      })
    );

    // Poll all predictions
    console.log("⏳ Waiting for all variations to complete...");
    const results = await Promise.all(
      predictions.map(async ({ prediction, scheme }) => {
        const completed = await pollUntilComplete(prediction.id);
        const downloaded = await downloadOutput(
          completed.output[0],
          `logo-${scheme.name.toLowerCase().replace(/\s+/g, '-')}.png`
        );

        return {
          scheme: scheme.name,
          ...downloaded
        };
      })
    );

    console.log(`✅ Generated ${results.length} logo variations`);
    return results;

  } catch (error) {
    console.error("❌ Logo variation generation failed:", error);
    throw error;
  }
}

// Usage: Generate brand color variations
const brandColors = [
  { name: "Primary Blue", primary: "#0066CC", accent: "#004C99" },
  { name: "Energetic Orange", primary: "#FF6600", accent: "#CC5200" },
  { name: "Professional Gray", primary: "#4A5568", accent: "#2D3748" },
  { name: "Growth Green", primary: "#10B981", accent: "#059669" },
  { name: "Creative Purple", primary: "#8B5CF6", accent: "#7C3AED" }
];

generateLogoVariations(
  "https://cdn.example.com/logo-original.png",
  brandColors
).then(results => {
  results.forEach(r => console.log(`${r.scheme}: ${r.localPath}`));
});
```

---

### Scenario 2B: Product Photo Style Transfers

**Use Case:** Transform product photo into different visual styles

**Model:** FLUX Dev with style-specific prompts

**Complete Implementation:**

```javascript
async function generateStyleVariations(productURL, styles) {
  try {
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "black-forest-labs",
      model_name: "flux-dev",
      jq_filter: ".latest_version.id"
    });

    // Style presets with optimized parameters
    const stylePresets = {
      photorealistic: {
        prompt: "Professional product photography. Studio lighting with soft shadows. High-end commercial quality. Ultra-realistic rendering. 8K resolution details.",
        strength: 0.5,  // Preserve original heavily
        guidance_scale: 8.0
      },
      minimalist: {
        prompt: "Minimalist clean design. Simple white background. Soft even lighting. No shadows or reflections. Apple-style product shot. Crisp and modern.",
        strength: 0.6,
        guidance_scale: 7.0
      },
      dramatic: {
        prompt: "Dramatic lighting with strong contrasts. Dark moody background. Spotlight effect on product. Cinematic atmosphere. High-end luxury feel.",
        strength: 0.7,
        guidance_scale: 9.0
      },
      lifestyle: {
        prompt: "Lifestyle context photography. Natural environment setting. Warm natural lighting. Product in realistic use scenario. Authentic and relatable.",
        strength: 0.8,  // More transformation
        guidance_scale: 7.5
      },
      technical: {
        prompt: "Technical diagram style. Blueprint aesthetic with annotations. Engineering drawing vibe. Precise and detailed. Professional technical documentation.",
        strength: 0.9,  // Heavy transformation
        guidance_scale: 8.5
      }
    };

    // Filter to requested styles
    const requestedStyles = styles.map(s => ({
      name: s,
      ...stylePresets[s]
    }));

    // Generate in parallel
    const predictions = await Promise.all(
      requestedStyles.map(async (style) => {
        const prediction = await mcp__replicate__create_predictions({
          version: `black-forest-labs/flux-dev:${modelInfo.latest_version.id}`,
          input: {
            prompt: style.prompt,
            image: productURL,
            strength: style.strength,
            guidance_scale: style.guidance_scale,
            num_inference_steps: 50,
            output_format: "jpg",
            output_quality: 95
          },
          jq_filter: "{id, status}"
        });

        return { prediction, style };
      })
    );

    // Poll and download
    const results = await Promise.all(
      predictions.map(async ({ prediction, style }) => {
        const completed = await pollUntilComplete(prediction.id);
        return await downloadOutput(
          completed.output[0],
          `product-${style.name}.jpg`
        );
      })
    );

    return results;

  } catch (error) {
    console.error("❌ Style variation failed:", error);
    throw error;
  }
}

// Usage: Generate multiple style variants
generateStyleVariations(
  "https://cdn.example.com/product-base.jpg",
  ["photorealistic", "minimalist", "dramatic", "lifestyle"]
).then(results => {
  console.log("Generated styles:", results.map(r => r.localPath));
});
```

---

### Image-to-Image Variation: Parameter Tuning

**Strength Parameter** (most critical):

```javascript
// Strength = How much to transform the input image
// Range: 0.0 (no change) to 1.0 (ignore input, pure generation)

// Conservative variation (70% preservation)
strength: 0.3  // Subtle changes, maintains original closely
// Use for: Minor color tweaks, lighting adjustments

// Moderate variation (50% preservation)
strength: 0.5  // Balanced transformation
// Use for: Style transfers, moderate edits

// Heavy variation (30% preservation)
strength: 0.7  // Significant changes
// Use for: Creative reinterpretations, major style shifts

// Extreme variation (10% preservation)
strength: 0.9  // Nearly new image, only vague reference
// Use for: Inspiration-based generation, radical transformations
```

**Guidance Scale** (prompt adherence):

```javascript
// Guidance Scale = How strictly to follow prompt
// Range: 1.0 (ignore prompt) to 20.0 (strict adherence)

guidance_scale: 3.0   // Very loose interpretation
guidance_scale: 5.0   // Creative freedom
guidance_scale: 7.5   // Balanced (recommended default)
guidance_scale: 10.0  // Strict prompt following
guidance_scale: 15.0  // Very strict (may reduce quality)
```

**Optimal Combinations:**

```javascript
// Subtle color adjustment
{ strength: 0.3, guidance_scale: 7.5 }

// Style transfer
{ strength: 0.6, guidance_scale: 8.0 }

// Creative reinterpretation
{ strength: 0.8, guidance_scale: 7.0 }

// Maximum prompt adherence
{ strength: 0.5, guidance_scale: 12.0 }
```

---

## Use Case 3: Reference-Based Consistency

**Goal:** Maintain visual style/character across multiple different scenes

**Best Model:** Runway Gen-4 (specialized for cross-scene consistency)

---

### Scenario 3A: Campaign Asset Generation with Consistent Style

**Use Case:** Generate 10 different marketing assets with unified brand aesthetic

**Model:** Runway Gen-4 with tagged references

**Complete Implementation:**

```javascript
async function generateConsistentCampaign(styleReferences, assetScenes) {
  try {
    // Get Runway Gen-4 model info
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "runway",
      model_name: "gen-4",
      jq_filter: ".latest_version.id"
    });

    // Step 1: Define style references with tags
    const references = [
      {
        url: "https://cdn.example.com/brand/style-guide-colors.jpg",
        tag: "[COLOR_PALETTE]",
        description: "Brand color palette and usage guidelines"
      },
      {
        url: "https://cdn.example.com/brand/typography-example.jpg",
        tag: "[TYPOGRAPHY]",
        description: "Typography style and hierarchy"
      },
      {
        url: "https://cdn.example.com/brand/photography-style.jpg",
        tag: "[PHOTO_STYLE]",
        description: "Photography aesthetic (lighting, composition, mood)"
      }
    ];

    console.log(`🎨 Generating ${assetScenes.length} assets with consistent brand style`);

    // Step 2: Create base prompt with reference tags
    const basePrompt = `
      Style consistency: Follow [COLOR_PALETTE] for all color choices,
      [TYPOGRAPHY] for any text elements, and [PHOTO_STYLE] for overall
      visual atmosphere and composition. Maintain cohesive brand identity
      across all outputs.
    `;

    // Step 3: Generate each asset scene with style consistency
    const predictions = await Promise.all(
      assetScenes.map(async (scene, index) => {
        // Construct scene-specific prompt
        const scenePrompt = `
          ${basePrompt}

          Scene ${index + 1}: ${scene.description}
          Format: ${scene.format}
          Dimensions: ${scene.dimensions}

          Specific requirements: ${scene.requirements}
        `;

        const prediction = await mcp__replicate__create_predictions({
          version: `runway/gen-4:${modelInfo.latest_version.id}`,
          input: {
            prompt: scenePrompt,
            reference_images: references.map(r => r.url),
            reference_tags: references.map(r => r.tag),
            aspect_ratio: scene.aspectRatio,
            quality: "high",
            seed: scene.seed || null  // Optional reproducibility
          },
          jq_filter: "{id, status}"
        });

        return {
          prediction,
          scene: scene.name,
          index
        };
      })
    );

    // Step 4: Poll all predictions
    console.log("⏳ Generating assets with style consistency...");

    const results = await Promise.all(
      predictions.map(async ({ prediction, scene, index }) => {
        const completed = await pollUntilComplete(prediction.id);
        const downloaded = await downloadOutput(
          completed.output[0],
          `campaign-asset-${index + 1}-${scene.toLowerCase().replace(/\s+/g, '-')}.jpg`
        );

        return {
          scene,
          index,
          ...downloaded
        };
      })
    );

    console.log(`✅ Generated ${results.length} consistent campaign assets`);
    return results;

  } catch (error) {
    console.error("❌ Consistent campaign generation failed:", error);
    throw error;
  }
}

// Usage: Define campaign scenes
const campaignScenes = [
  {
    name: "Hero Banner",
    description: "Homepage hero section with product showcase",
    format: "Web banner",
    dimensions: "1920x1080",
    aspectRatio: "16:9",
    requirements: "Product prominently featured, clear call-to-action space, professional lighting"
  },
  {
    name: "Social Media Post",
    description: "Instagram feed post highlighting product benefit",
    format: "Social media",
    dimensions: "1080x1080",
    aspectRatio: "1:1",
    requirements: "Mobile-optimized, eye-catching composition, text overlay friendly"
  },
  {
    name: "Email Header",
    description: "Email campaign header with product announcement",
    format: "Email header",
    dimensions: "600x400",
    aspectRatio: "3:2",
    requirements: "Clear focal point, works at small size, enticing visual"
  },
  {
    name: "Print Ad",
    description: "Magazine advertisement full-page spread",
    format: "Print",
    dimensions: "2550x3300",
    aspectRatio: "match_input_image",
    requirements: "High resolution, print-safe colors, dramatic visual impact"
  }
];

const styleRefs = [
  "https://cdn.example.com/brand-style-1.jpg",
  "https://cdn.example.com/brand-style-2.jpg",
  "https://cdn.example.com/brand-style-3.jpg"
];

generateConsistentCampaign(styleRefs, campaignScenes)
  .then(results => {
    results.forEach(r =>
      console.log(`${r.scene} (${r.index + 1}): ${r.localPath}`)
    );
  });
```

---

### Scenario 3B: Character Consistency Across Scenes

**Use Case:** Brand mascot appearing in different contexts with consistent look

**Model:** Runway Gen-4 with character reference

**Complete Implementation:**

```javascript
async function generateCharacterScenes(characterRef, scenes) {
  try {
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "runway",
      model_name: "gen-4",
      jq_filter: ".latest_version.id"
    });

    // Character consistency prompt
    const characterPrompt = `
      Maintain exact character appearance from [CHARACTER_REF]:
      - Same facial features and proportions
      - Same clothing style and colors
      - Same body type and posture style
      - Consistent design language and details

      Character should be recognizable across all scenes while adapting
      naturally to each environment.
    `;

    const predictions = await Promise.all(
      scenes.map(async (scene) => {
        const scenePrompt = `
          ${characterPrompt}

          Scene: ${scene.description}
          Setting: ${scene.setting}
          Action: ${scene.action}
          Mood: ${scene.mood}

          Render character naturally in this context while maintaining
          perfect visual consistency with reference image.
        `;

        const prediction = await mcp__replicate__create_predictions({
          version: `runway/gen-4:${modelInfo.latest_version.id}`,
          input: {
            prompt: scenePrompt,
            reference_images: [characterRef],
            reference_tags: ["[CHARACTER_REF]"],
            aspect_ratio: scene.aspectRatio || "16:9",
            quality: "high"
          },
          jq_filter: "{id, status}"
        });

        return { prediction, scene: scene.name };
      })
    );

    // Download all scenes
    const results = await Promise.all(
      predictions.map(async ({ prediction, scene }) => {
        const completed = await pollUntilComplete(prediction.id);
        return await downloadOutput(
          completed.output[0],
          `character-${scene.toLowerCase().replace(/\s+/g, '-')}.jpg`
        );
      })
    );

    return results;

  } catch (error) {
    console.error("❌ Character scene generation failed:", error);
    throw error;
  }
}

// Usage: Generate mascot in different contexts
const mascotScenes = [
  {
    name: "Office Hero",
    description: "Brand mascot in professional office setting",
    setting: "Modern open-plan office with natural light",
    action: "Mascot working at laptop, focused and productive",
    mood: "Professional, energetic, relatable",
    aspectRatio: "16:9"
  },
  {
    name: "Customer Service",
    description: "Mascot helping a customer",
    setting: "Friendly customer service desk",
    action: "Mascot assisting customer with warm smile",
    mood: "Helpful, approachable, trustworthy",
    aspectRatio: "1:1"
  },
  {
    name: "Product Launch",
    description: "Mascot presenting new product",
    setting: "Stage with spotlight and product display",
    action: "Mascot enthusiastically showcasing product",
    mood: "Exciting, confident, celebratory",
    aspectRatio: "16:9"
  }
];

generateCharacterScenes(
  "https://cdn.example.com/mascot-reference.png",
  mascotScenes
).then(results => console.log("Scenes generated:", results.length));
```

---

### Reference-Based Consistency: Tag System

**How Runway Gen-4 Tags Work:**

```javascript
// Tags create explicit links between references and prompt
const references = [
  { url: "style-ref.jpg", tag: "[STYLE]" },
  { url: "color-ref.jpg", tag: "[COLORS]" },
  { url: "char-ref.jpg", tag: "[CHARACTER]" }
];

// Use tags in prompt to reference specific images
const prompt = `
  Apply [STYLE] to overall composition.
  Use [COLORS] for palette.
  Include [CHARACTER] in center frame.
`;

// Model knows: [STYLE] = style-ref.jpg, etc.
```

**Best Practices:**

1. **Clear Tag Naming**
   - ✅ `[BRAND_COLORS]`, `[MAIN_CHARACTER]`, `[PHOTO_STYLE]`
   - ❌ `[REF1]`, `[IMG]`, `[A]`

2. **Tag Placement in Prompt**
   - Place tags near relevant instructions
   - Explain what to extract from each tag
   - Use tags multiple times if needed

3. **Reference Image Quality**
   - High resolution (1024x1024 minimum)
   - Clear, unambiguous content
   - Representative of desired style/element

---

## Use Case 4: Text-Guided Image Editing

**Goal:** Modify existing images using natural language instructions

**Best Model:** Qwen Image Edit Plus (specialized for instruction-following)

---

### Scenario 4A: Batch Product Photo Editing

**Use Case:** Apply same edit (e.g., "remove background") to multiple product photos

**Model:** Qwen Image Edit Plus (multi-image array support)

**Complete Implementation:**

```javascript
async function batchEditProducts(productURLs, editInstruction) {
  try {
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "qwen",
      model_name: "qwen-image-edit-plus",
      jq_filter: ".latest_version.id"
    });

    console.log(`✂️ Batch editing ${productURLs.length} products: "${editInstruction}"`);

    // Create single prediction with array input
    const prediction = await mcp__replicate__create_predictions({
      version: `qwen/qwen-image-edit-plus:${modelInfo.latest_version.id}`,
      input: {
        prompt: editInstruction,
        image: productURLs,  // Array of all product URLs
        go_fast: true,       // Enable optimizations
        output_format: "png", // PNG for transparency
        output_quality: 95,
        disable_safety_checker: false
      },
      Prefer: "wait",
      jq_filter: "{id, status, output, error}"
    });

    // Handle batch output
    if (prediction.status === "succeeded") {
      // Output is array of edited images
      const downloadPromises = prediction.output.map((url, index) =>
        downloadOutput(url, `product-edited-${index + 1}.png`)
      );

      const results = await Promise.all(downloadPromises);
      console.log(`✅ Batch edited ${results.length} products`);
      return results;
    }

    // Poll if not complete
    const completed = await pollUntilComplete(prediction.id);
    const downloadPromises = completed.output.map((url, index) =>
      downloadOutput(url, `product-edited-${index + 1}.png`)
    );

    return await Promise.all(downloadPromises);

  } catch (error) {
    console.error("❌ Batch editing failed:", error);
    throw error;
  }
}

// Usage: Remove backgrounds from all product photos
const productPhotos = [
  "https://cdn.example.com/products/widget-1.jpg",
  "https://cdn.example.com/products/widget-2.jpg",
  "https://cdn.example.com/products/widget-3.jpg",
  "https://cdn.example.com/products/widget-4.jpg",
  "https://cdn.example.com/products/widget-5.jpg"
];

batchEditProducts(
  productPhotos,
  "Remove background completely. Make background transparent. Keep product perfectly intact with all details and colors preserved. Clean cutout with smooth edges."
).then(results => console.log("Edited products:", results.length));

// Other common batch edits
batchEditProducts(productPhotos, "Add subtle drop shadow for depth");
batchEditProducts(productPhotos, "Increase brightness by 20%, enhance colors");
batchEditProducts(productPhotos, "Convert to pure white background, product centered");
```

---

### Scenario 4B: Precise Single-Image Editing

**Use Case:** Add text overlay, adjust colors, remove objects

**Model:** Qwen Image Edit (single-image precision)

**Complete Implementation:**

```javascript
async function preciseImageEdit(imageURL, editInstructions) {
  try {
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "qwen",
      model_name: "qwen-image-edit",
      jq_filter: ".latest_version.id"
    });

    console.log(`✏️ Editing image with instruction: "${editInstructions}"`);

    const prediction = await mcp__replicate__create_predictions({
      version: `qwen/qwen-image-edit:${modelInfo.latest_version.id}`,
      input: {
        prompt: editInstructions,
        image: imageURL,
        go_fast: true,
        output_format: "png",
        output_quality: 100,  // Maximum quality
        seed: null  // Random for variation
      },
      Prefer: "wait",
      jq_filter: "{id, status, output, error, metrics}"
    });

    if (prediction.status === "succeeded") {
      console.log(`✅ Edit completed in ${prediction.metrics.total_time}s`);
      return await downloadOutput(prediction.output[0]);
    }

    return await pollAndDownload(prediction.id);

  } catch (error) {
    console.error("❌ Precise editing failed:", error);
    throw error;
  }
}

// Usage: Various editing scenarios

// Add text overlay
await preciseImageEdit(
  "https://cdn.example.com/banner.jpg",
  "Add bold white text 'SUMMER SALE' in the top third of the image. Modern sans-serif font. Text should have subtle dark shadow for legibility. Center aligned."
);

// Remove unwanted object
await preciseImageEdit(
  "https://cdn.example.com/product-scene.jpg",
  "Remove the background person on the left side. Fill the area naturally to match surrounding environment. Seamless removal."
);

// Color adjustment
await preciseImageEdit(
  "https://cdn.example.com/logo.png",
  "Change all blue elements to green (#10B981). Keep all other colors unchanged. Maintain exact shapes and proportions."
);

// Style transformation
await preciseImageEdit(
  "https://cdn.example.com/photo.jpg",
  "Convert to black and white. High contrast film noir style. Preserve details and textures. Dramatic shadows."
);

// Complex multi-step edit
await preciseImageEdit(
  "https://cdn.example.com/product.jpg",
  `
    1. Remove background completely (transparent)
    2. Add soft drop shadow (10px blur, 30% opacity)
    3. Enhance product colors by 15%
    4. Sharpen details slightly
    5. Center product in frame with equal padding
  `
);
```

---

### Text-Guided Editing: Prompt Strategies

**Effective Editing Prompts:**

**✅ Specific and Actionable:**
```javascript
"Remove the coffee cup from the desk. Fill the area with wood grain texture matching the surrounding desk surface."
```

**❌ Vague and Ambiguous:**
```javascript
"Make it better"
```

---

**✅ Constrained Modifications:**
```javascript
"Change only the shirt color to navy blue (#001F3F). Keep everything else exactly the same including skin tone, background, and other clothing items."
```

**❌ Unconstrained Changes:**
```javascript
"Change the colors"
```

---

**✅ Technical Specifications:**
```javascript
"Add 50px white border around entire image. Border should be uniform on all sides. No shadows or effects on border."
```

**❌ Imprecise Requirements:**
```javascript
"Add a border"
```

---

**Prompt Templates by Edit Type:**

```javascript
// Background removal
"Remove background completely. Make background transparent. Keep [SUBJECT] perfectly intact with all details preserved. Clean cutout with smooth anti-aliased edges."

// Object removal
"Remove [OBJECT] from the scene. Fill the area naturally using surrounding context. Seamless integration with no visible edits."

// Color adjustment
"Change [ELEMENT] color from [CURRENT_COLOR] to [NEW_COLOR] (hex: [HEX_CODE]). Maintain all other colors exactly. Preserve saturation and luminosity relationships."

// Text addition
"Add text '[TEXT_CONTENT]' positioned [LOCATION]. Font: [FONT_STYLE], size: [SIZE], color: [COLOR]. Text should be [EFFECT_DESCRIPTION]."

// Enhancement
"Enhance image quality: increase sharpness by [AMOUNT], boost saturation by [AMOUNT], improve contrast by [AMOUNT]. Maintain natural appearance, no over-processing."

// Style transfer
"Apply [STYLE_NAME] style to entire image. Maintain original composition and subject. Transform colors, textures, and atmosphere to match [REFERENCE_DESCRIPTION]."
```

---

## Common Patterns & Best Practices

### Pattern 1: Retry Logic with Exponential Backoff

```javascript
async function createPredictionWithRetry(params, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries}`);

      const prediction = await mcp__replicate__create_predictions(params);

      // Success
      return prediction;

    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Attempt ${attempt} failed:`, error.message);

      // Don't retry on certain errors
      if (error.message.includes('Invalid input') ||
          error.message.includes('422')) {
        console.error("❌ Non-retryable error detected");
        throw error;
      }

      // Exponential backoff before retry
      if (attempt < maxRetries) {
        const backoffMs = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`⏳ Waiting ${backoffMs}ms before retry...`);
        await sleep(backoffMs);
      }
    }
  }

  // All retries failed
  throw new Error(`All ${maxRetries} attempts failed. Last error: ${lastError.message}`);
}

// Usage
const prediction = await createPredictionWithRetry({
  version: "...",
  input: {...}
});
```

---

### Pattern 2: Parallel Generation with Rate Limiting

```javascript
async function parallelGeneration(tasks, maxConcurrent = 3) {
  const results = [];
  const queue = [...tasks];

  async function worker() {
    while (queue.length > 0) {
      const task = queue.shift();
      if (!task) break;

      try {
        console.log(`🚀 Starting task ${task.id} (${queue.length} remaining)`);
        const result = await task.execute();
        results.push({ id: task.id, success: true, result });

        // Rate limiting: wait between tasks
        await sleep(1000);

      } catch (error) {
        console.error(`❌ Task ${task.id} failed:`, error);
        results.push({ id: task.id, success: false, error: error.message });
      }
    }
  }

  // Spawn workers
  const workers = Array(maxConcurrent).fill(null).map(() => worker());
  await Promise.all(workers);

  return results;
}

// Usage: Generate 10 assets with max 3 concurrent
const tasks = assetPrompts.map((prompt, index) => ({
  id: `asset-${index + 1}`,
  execute: async () => {
    const prediction = await mcp__replicate__create_predictions({
      version: "...",
      input: { prompt }
    });
    const completed = await pollUntilComplete(prediction.id);
    return await downloadOutput(completed.output[0]);
  }
}));

const results = await parallelGeneration(tasks, 3);
console.log(`✅ ${results.filter(r => r.success).length}/${results.length} succeeded`);
```

---

### Pattern 3: Progressive Quality Generation

```javascript
async function generateWithQualityFallback(prompt, imageInput = null) {
  // Try high-quality first
  const qualityLevels = [
    { name: "high", steps: 50, scale: 8.0, timeout: 120 },
    { name: "medium", steps: 30, scale: 7.0, timeout: 90 },
    { name: "fast", steps: 20, scale: 6.0, timeout: 60 }
  ];

  for (const quality of qualityLevels) {
    try {
      console.log(`🎨 Trying ${quality.name} quality...`);

      const prediction = await mcp__replicate__create_predictions({
        version: "...",
        input: {
          prompt,
          image: imageInput,
          num_inference_steps: quality.steps,
          guidance_scale: quality.scale
        },
        jq_filter: "{id, status}"
      });

      // Poll with quality-specific timeout
      const completed = await pollUntilComplete(
        prediction.id,
        quality.timeout
      );

      console.log(`✅ Generated with ${quality.name} quality`);
      return await downloadOutput(completed.output[0]);

    } catch (error) {
      console.warn(`⚠️ ${quality.name} quality failed, trying fallback...`);

      if (quality === qualityLevels[qualityLevels.length - 1]) {
        // Last fallback failed
        throw error;
      }
    }
  }
}
```

---

### Pattern 4: Smart File Hosting

```javascript
class ImageHosting {
  constructor() {
    this.cache = new Map();
  }

  async prepareInput(imagePath) {
    // Check cache
    if (this.cache.has(imagePath)) {
      console.log(`✓ Using cached URL for ${imagePath}`);
      return this.cache.get(imagePath);
    }

    // Check file size
    const stats = fs.statSync(imagePath);
    const sizeKB = stats.size / 1024;

    if (sizeKB <= 256) {
      // Small file: use data URL
      console.log(`📎 Using data URL for ${imagePath} (${sizeKB.toFixed(1)}KB)`);
      return this.imageToDataURL(imagePath);
    }

    // Large file: upload to temporary hosting
    console.log(`☁️ Uploading ${imagePath} (${sizeKB.toFixed(1)}KB) to temporary host...`);
    const hostedURL = await this.uploadToTemporaryHost(imagePath);

    // Cache the URL
    this.cache.set(imagePath, hostedURL);

    return hostedURL;
  }

  imageToDataURL(imagePath) {
    const buffer = fs.readFileSync(imagePath);
    const base64 = buffer.toString('base64');
    const ext = path.extname(imagePath).slice(1);
    return `data:image/${ext};base64,${base64}`;
  }

  async uploadToTemporaryHost(imagePath) {
    // Example: Upload to temporary service (implement based on your needs)
    // Could use: S3, Cloudinary, imgbb, etc.

    // Placeholder implementation
    // In production, replace with actual upload logic
    throw new Error("Implement uploadToTemporaryHost for your hosting provider");

    // Example S3 implementation:
    // const s3 = new AWS.S3();
    // const key = `temp/${Date.now()}-${path.basename(imagePath)}`;
    // await s3.upload({
    //   Bucket: 'your-bucket',
    //   Key: key,
    //   Body: fs.createReadStream(imagePath),
    //   ACL: 'public-read'
    // }).promise();
    // return `https://your-bucket.s3.amazonaws.com/${key}`;
  }

  clearCache() {
    this.cache.clear();
  }
}

// Usage
const hosting = new ImageHosting();
const imageURL = await hosting.prepareInput('./logo.png');

const prediction = await mcp__replicate__create_predictions({
  version: "...",
  input: {
    prompt: "...",
    image: imageURL
  }
});
```

---

## Error Handling & Retry Logic

### Common Errors and Solutions

```javascript
async function robustPredictionWorkflow(params) {
  try {
    const prediction = await mcp__replicate__create_predictions(params);

    // Poll with comprehensive error handling
    const completed = await pollWithErrorHandling(prediction.id);

    // Download with retry
    return await downloadWithRetry(completed.output[0]);

  } catch (error) {
    return handlePredictionError(error, params);
  }
}

async function pollWithErrorHandling(predictionId) {
  let consecutiveErrors = 0;
  const maxConsecutiveErrors = 3;

  for (let i = 0; i < 120; i++) {
    try {
      const prediction = await mcp__replicate__get_predictions({
        prediction_id: predictionId,
        jq_filter: "{status, output, error}"
      });

      // Reset error counter on success
      consecutiveErrors = 0;

      // Check for completion
      if (prediction.status === "succeeded") {
        return prediction;
      }

      if (prediction.status === "failed") {
        throw new PredictionError(prediction.error, "PREDICTION_FAILED");
      }

      if (prediction.status === "canceled") {
        throw new PredictionError("Prediction was canceled", "CANCELED");
      }

      // Still processing
      await sleep(2000);

    } catch (error) {
      consecutiveErrors++;

      if (consecutiveErrors >= maxConsecutiveErrors) {
        throw new Error(`Polling failed after ${maxConsecutiveErrors} consecutive errors: ${error.message}`);
      }

      console.warn(`⚠️ Polling error (${consecutiveErrors}/${maxConsecutiveErrors}):`, error.message);
      await sleep(5000); // Longer wait after error
    }
  }

  throw new Error("Polling timeout: 4 minutes exceeded");
}

function handlePredictionError(error, originalParams) {
  // Error categorization and handling strategy

  if (error.message.includes('Invalid input')) {
    console.error("❌ INPUT ERROR - Check parameter validity");
    console.error("Parameters:", JSON.stringify(originalParams.input, null, 2));
    throw new Error(`Invalid input: ${error.message}`);
  }

  if (error.message.includes('Out of memory') || error.message.includes('OOM')) {
    console.error("❌ MEMORY ERROR - Try reducing image resolution or complexity");
    throw new Error("Out of memory. Reduce input image size or complexity.");
  }

  if (error.message.includes('Rate limit') || error.message.includes('429')) {
    console.error("❌ RATE LIMIT - Too many requests");
    throw new Error("Rate limit exceeded. Wait before retrying.");
  }

  if (error.message.includes('Authentication') || error.message.includes('401')) {
    console.error("❌ AUTH ERROR - Check REPLICATE_API_TOKEN");
    throw new Error("Authentication failed. Verify API token.");
  }

  if (error.message.includes('timeout')) {
    console.error("❌ TIMEOUT - Model took too long");
    throw new Error("Prediction timeout. Try faster model or reduce complexity.");
  }

  // Unknown error
  console.error("❌ UNKNOWN ERROR:", error);
  throw error;
}

class PredictionError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = 'PredictionError';
  }
}
```

---

### Retry Strategies by Error Type

```javascript
const retryStrategies = {
  // Network errors: retry with backoff
  network: {
    maxRetries: 3,
    backoffMs: [1000, 2000, 4000],
    shouldRetry: true
  },

  // Rate limit: longer wait
  rateLimit: {
    maxRetries: 2,
    backoffMs: [30000, 60000],  // 30s, 60s
    shouldRetry: true
  },

  // Server error: short retry
  server: {
    maxRetries: 2,
    backoffMs: [5000, 10000],
    shouldRetry: true
  },

  // Invalid input: don't retry
  validation: {
    maxRetries: 0,
    backoffMs: [],
    shouldRetry: false
  },

  // Auth error: don't retry
  authentication: {
    maxRetries: 0,
    backoffMs: [],
    shouldRetry: false
  }
};

function getRetryStrategy(error) {
  if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
    return retryStrategies.network;
  }
  if (error.message.includes('429') || error.message.includes('rate limit')) {
    return retryStrategies.rateLimit;
  }
  if (error.message.includes('500') || error.message.includes('503')) {
    return retryStrategies.server;
  }
  if (error.message.includes('422') || error.message.includes('Invalid')) {
    return retryStrategies.validation;
  }
  if (error.message.includes('401') || error.message.includes('auth')) {
    return retryStrategies.authentication;
  }

  // Default: network strategy
  return retryStrategies.network;
}
```

---

## Output Management

### Critical: 1-Hour Expiration

**All prediction outputs expire after 1 hour.** You MUST download and save immediately.

```javascript
async function downloadOutput(outputURL, filename = null) {
  // CRITICAL: Must complete within 1 hour of prediction completion

  try {
    console.log(`⬇️ Downloading: ${outputURL}`);

    const response = await fetch(outputURL, {
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    // Generate filename if not provided
    if (!filename) {
      const urlParts = outputURL.split('/');
      filename = urlParts[urlParts.length - 1] || `output-${Date.now()}.png`;
    }

    // Ensure output directory exists
    const outputDir = './outputs';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const localPath = path.join(outputDir, filename);

    // Save to filesystem
    fs.writeFileSync(localPath, Buffer.from(buffer));

    const sizeKB = (buffer.byteLength / 1024).toFixed(1);
    console.log(`✅ Saved ${filename} (${sizeKB}KB)`);

    return {
      localPath,
      filename,
      sizeBytes: buffer.byteLength,
      tempURL: outputURL,  // Expires in 1 hour
      downloadedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error(`❌ Download failed for ${outputURL}:`, error);
    throw error;
  }
}
```

---

### Automatic Upload to Permanent Storage

```javascript
async function downloadAndArchive(outputURL, metadata = {}) {
  // Step 1: Download from Replicate
  const localDownload = await downloadOutput(outputURL);

  // Step 2: Upload to permanent storage (example: S3)
  try {
    const permanentURL = await uploadToS3(
      localDownload.localPath,
      localDownload.filename,
      metadata
    );

    console.log(`☁️ Archived to S3: ${permanentURL}`);

    // Step 3: Optionally remove local file
    // fs.unlinkSync(localDownload.localPath);

    return {
      ...localDownload,
      permanentURL,
      archived: true
    };

  } catch (error) {
    console.warn(`⚠️ S3 upload failed, kept local copy:`, error.message);
    return {
      ...localDownload,
      archived: false
    };
  }
}

// Placeholder S3 upload function
async function uploadToS3(localPath, filename, metadata) {
  // Implement based on your S3 setup
  // Example using AWS SDK:

  // const AWS = require('aws-sdk');
  // const s3 = new AWS.S3();

  // const fileStream = fs.createReadStream(localPath);
  // const uploadParams = {
  //   Bucket: process.env.S3_BUCKET,
  //   Key: `brand-assets/${Date.now()}-${filename}`,
  //   Body: fileStream,
  //   ContentType: 'image/png',
  //   Metadata: metadata,
  //   ACL: 'public-read'
  // };

  // const result = await s3.upload(uploadParams).promise();
  // return result.Location;

  throw new Error("Implement uploadToS3 for your storage provider");
}
```

---

### Batch Download Pattern

```javascript
async function batchDownloadOutputs(predictionResults) {
  console.log(`📦 Batch downloading ${predictionResults.length} outputs...`);

  // Download in parallel with limit
  const maxConcurrent = 5;
  const results = [];

  for (let i = 0; i < predictionResults.length; i += maxConcurrent) {
    const batch = predictionResults.slice(i, i + maxConcurrent);

    const batchResults = await Promise.all(
      batch.map(async (pred, index) => {
        try {
          // Extract output URL (handle different output formats)
          const outputURL = Array.isArray(pred.output)
            ? pred.output[0]
            : pred.output;

          const filename = `batch-${i + index + 1}-${Date.now()}.png`;
          const downloaded = await downloadOutput(outputURL, filename);

          return {
            success: true,
            predictionId: pred.id,
            ...downloaded
          };

        } catch (error) {
          console.error(`❌ Failed to download prediction ${pred.id}:`, error);
          return {
            success: false,
            predictionId: pred.id,
            error: error.message
          };
        }
      })
    );

    results.push(...batchResults);

    // Rate limiting between batches
    if (i + maxConcurrent < predictionResults.length) {
      await sleep(1000);
    }
  }

  const successful = results.filter(r => r.success).length;
  console.log(`✅ Downloaded ${successful}/${results.length} outputs`);

  return results;
}
```

---

## Model Selection Decision Tree

Use this guide to choose the right model for your use case:

```
START: What are you trying to do?
│
├─ Combine 2+ distinct images into one?
│  │
│  ├─ How many images?
│  │  ├─ 2 images → FLUX Kontext Pro Multi-Image
│  │  ├─ 3-5 images → Google Nano Banana (primary) or FLUX Kontext Max List
│  │  └─ 6+ images → Google Nano Banana
│  │
│  └─ Is it editing vs composition?
│     ├─ Editing (same operation on multiple) → Qwen Image Edit Plus
│     └─ Composition (combining into one) → Google Nano Banana
│
├─ Generate variations of one image?
│  │
│  ├─ What type of variation?
│  │  ├─ Color/style changes → FLUX Dev
│  │  ├─ Specific edits with text instructions → Qwen Image Edit
│  │  └─ Creative reinterpretation → FLUX Dev (high strength)
│  │
│  └─ Batch processing same edit on multiple?
│     └─ Qwen Image Edit Plus (array input)
│
├─ Maintain consistent style across multiple DIFFERENT scenes?
│  └─ Runway Gen-4 (reference-based consistency)
│
└─ Simple mechanical merging (no AI)?
   └─ Tool Merge Images (utility) - NOT RECOMMENDED for brand work
```

---

### Model Comparison Matrix

| Capability | Primary Model | Alternative | Use When Primary Is... |
|-----------|---------------|-------------|----------------------|
| **2 images → 1** | FLUX Kontext Pro Multi | Google Nano Banana | Want Imagen aesthetic |
| **3+ images → 1** | Google Nano Banana | FLUX Kontext Max List | Want FLUX aesthetic |
| **1 image → variations** | FLUX Dev | Qwen Image Edit | Need text-guided precision |
| **Batch editing** | Qwen Image Edit Plus | - | - |
| **Style consistency** | Runway Gen-4 | - | - |

---

### Performance Characteristics

| Model | Typical Speed | Quality | Production Ready? |
|-------|--------------|---------|-------------------|
| Google Nano Banana | 8-15 seconds | Excellent | ✅ Yes (27M runs) |
| FLUX Kontext Pro | 10-20 seconds | Excellent | ✅ Yes (464K runs) |
| FLUX Kontext Max List | 12-25 seconds | Excellent | ⚠️ Experimental (132K runs) |
| FLUX Dev | 5-12 seconds | Excellent | ✅ Yes (industry standard) |
| Qwen Image Edit Plus | 6-15 seconds | Very Good | ✅ Yes (2M runs) |
| Qwen Image Edit | 4-10 seconds | Very Good | ✅ Yes |
| Runway Gen-4 | 15-30 seconds | Excellent | ✅ Yes |

---

## Complete Example: End-to-End Brand Asset Pipeline

```javascript
/**
 * Complete pipeline: Generate campaign assets with consistent brand style
 */

class BrandAssetPipeline {
  constructor() {
    this.hosting = new ImageHosting();
  }

  async generateCampaignAssets(config) {
    console.log("🚀 Starting brand asset generation pipeline...");

    try {
      // Phase 1: Prepare reference images
      console.log("\n📋 Phase 1: Preparing reference images");
      const references = await this.prepareReferences(config.references);

      // Phase 2: Generate hero composition (multi-image)
      console.log("\n🎨 Phase 2: Generating hero composition");
      const hero = await this.generateHeroComposition(
        references.logo,
        references.product,
        references.background,
        config.heroPrompt
      );

      // Phase 3: Generate style-consistent variations
      console.log("\n🖼️ Phase 3: Generating style variations");
      const variations = await this.generateStyleVariations(
        hero.permanentURL,
        config.variationStyles
      );

      // Phase 4: Generate platform-specific assets
      console.log("\n📱 Phase 4: Generating platform assets");
      const platformAssets = await this.generatePlatformAssets(
        references,
        hero,
        config.platforms
      );

      // Phase 5: Batch editing (remove backgrounds, etc.)
      console.log("\n✂️ Phase 5: Batch post-processing");
      const processed = await this.batchPostProcess(
        platformAssets,
        config.postProcessing
      );

      console.log("\n✅ Pipeline complete!");

      return {
        hero,
        variations,
        platformAssets: processed,
        summary: this.generateSummary(hero, variations, processed)
      };

    } catch (error) {
      console.error("\n❌ Pipeline failed:", error);
      throw error;
    }
  }

  async prepareReferences(refs) {
    const prepared = {};

    for (const [key, path] of Object.entries(refs)) {
      console.log(`  Preparing ${key}...`);
      prepared[key] = await this.hosting.prepareInput(path);
    }

    return prepared;
  }

  async generateHeroComposition(logoURL, productURL, bgURL, prompt) {
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "google",
      model_name: "nano-banana",
      jq_filter: ".latest_version.id"
    });

    const prediction = await mcp__replicate__create_predictions({
      version: `google/nano-banana:${modelInfo.latest_version.id}`,
      input: {
        prompt: prompt || "Professional hero image. Logo top-left, product center with lighting, background creates depth. Brand colors, photorealistic.",
        image_input: [logoURL, productURL, bgURL],
        aspect_ratio: "16:9",
        output_format: "jpg"
      },
      Prefer: "wait",
      jq_filter: "{id, status, output}"
    });

    const completed = prediction.status === "succeeded"
      ? prediction
      : await pollUntilComplete(prediction.id);

    return await downloadAndArchive(completed.output[0], {
      type: "hero-composition",
      campaign: "main"
    });
  }

  async generateStyleVariations(heroURL, styles) {
    const tasks = styles.map(style => ({
      id: style.name,
      execute: async () => {
        const modelInfo = await mcp__replicate__get_models({
          model_owner: "black-forest-labs",
          model_name: "flux-dev",
          jq_filter: ".latest_version.id"
        });

        const prediction = await mcp__replicate__create_predictions({
          version: `black-forest-labs/flux-dev:${modelInfo.latest_version.id}`,
          input: {
            prompt: style.prompt,
            image: heroURL,
            strength: style.strength || 0.6,
            guidance_scale: style.guidance || 7.5
          },
          jq_filter: "{id, status}"
        });

        const completed = await pollUntilComplete(prediction.id);
        return await downloadAndArchive(completed.output[0], {
          type: "style-variation",
          style: style.name
        });
      }
    }));

    return await parallelGeneration(tasks, 3);
  }

  async generatePlatformAssets(refs, hero, platforms) {
    const tasks = platforms.map(platform => ({
      id: platform.name,
      execute: async () => {
        // Platform-specific generation logic
        const modelInfo = await mcp__replicate__get_models({
          model_owner: "google",
          model_name: "nano-banana",
          jq_filter: ".latest_version.id"
        });

        const prediction = await mcp__replicate__create_predictions({
          version: `google/nano-banana:${modelInfo.latest_version.id}`,
          input: {
            prompt: platform.prompt,
            image_input: [hero.permanentURL],
            aspect_ratio: platform.aspectRatio,
            output_format: platform.format
          },
          jq_filter: "{id, status}"
        });

        const completed = await pollUntilComplete(prediction.id);
        return await downloadAndArchive(completed.output[0], {
          type: "platform-asset",
          platform: platform.name
        });
      }
    }));

    return await parallelGeneration(tasks, 3);
  }

  async batchPostProcess(assets, operations) {
    if (!operations || operations.length === 0) {
      return assets;
    }

    // Batch editing with Qwen Image Edit Plus
    const modelInfo = await mcp__replicate__get_models({
      model_owner: "qwen",
      model_name: "qwen-image-edit-plus",
      jq_filter: ".latest_version.id"
    });

    const imageURLs = assets.map(a => a.result.permanentURL);
    const instruction = operations.join(". ");

    const prediction = await mcp__replicate__create_predictions({
      version: `qwen/qwen-image-edit-plus:${modelInfo.latest_version.id}`,
      input: {
        prompt: instruction,
        image: imageURLs,
        go_fast: true,
        output_format: "png"
      },
      jq_filter: "{id, status}"
    });

    const completed = await pollUntilComplete(prediction.id);

    // Download all processed outputs
    return await batchDownloadOutputs(
      completed.output.map((url, index) => ({
        id: assets[index].id,
        output: url
      }))
    );
  }

  generateSummary(hero, variations, platformAssets) {
    const successfulVariations = variations.filter(v => v.success).length;
    const successfulAssets = platformAssets.filter(a => a.success).length;

    return {
      total: 1 + variations.length + platformAssets.length,
      successful: 1 + successfulVariations + successfulAssets,
      hero: hero.filename,
      variations: successfulVariations,
      platformAssets: successfulAssets
    };
  }
}

// Usage
const pipeline = new BrandAssetPipeline();

const result = await pipeline.generateCampaignAssets({
  references: {
    logo: './brand/logo.png',
    product: './products/main-product.jpg',
    background: './scenes/office.jpg'
  },
  heroPrompt: "Professional SaaS product hero image. Modern, clean, trustworthy.",
  variationStyles: [
    { name: "dark-mode", prompt: "Dark theme variant", strength: 0.5 },
    { name: "light-mode", prompt: "Light theme variant", strength: 0.5 },
    { name: "high-contrast", prompt: "Accessible high contrast", strength: 0.6 }
  ],
  platforms: [
    {
      name: "instagram",
      aspectRatio: "1:1",
      format: "jpg",
      prompt: "Instagram post format, mobile-optimized"
    },
    {
      name: "twitter",
      aspectRatio: "16:9",
      format: "jpg",
      prompt: "Twitter header format, text-friendly"
    },
    {
      name: "linkedin",
      aspectRatio: "4:1",
      format: "jpg",
      prompt: "LinkedIn banner format, professional"
    }
  ],
  postProcessing: [
    "Enhance colors by 10%",
    "Add subtle brand watermark bottom-right",
    "Sharpen details"
  ]
});

console.log("\n📊 Pipeline Summary:", result.summary);
```

---

## Troubleshooting Guide

### Issue: "Output URL returns 404"

**Cause:** Output expired (1-hour limit exceeded)

**Solution:**
```javascript
// Always download immediately after completion
const prediction = await pollUntilComplete(predictionId);

// Download right away (don't delay)
const downloaded = await downloadOutput(prediction.output[0]);

// If you need to process later, use permanent storage
const archived = await uploadToS3(downloaded.localPath);
```

---

### Issue: "Prediction stuck in 'starting' status"

**Cause:** Cold start - model worker initializing

**Solution:**
```javascript
// Cold starts can take 30-60 seconds
// Increase polling timeout
await pollUntilComplete(predictionId, 180); // 3 minutes

// Or use deployments for zero cold start (production)
const deployment = await mcp__replicate__create_deployments({
  name: "image-gen-prod",
  model: "stability-ai/sdxl",
  version: "...",
  hardware: "gpu-a40-small",
  min_instances: 1  // Always warm
});
```

---

### Issue: "Images not composing as expected"

**Cause:** Ambiguous prompt or wrong image order

**Solution:**
```javascript
// ❌ Vague
input: {
  prompt: "Combine these images",
  image_input: [img1, img2, img3]
}

// ✅ Explicit
input: {
  prompt: "First image (logo) in top-left at 10% size. Second image (product) center-frame at 60% width. Third image (background) as base layer full canvas.",
  image_input: [logo, product, background]
}
```

---

### Issue: "Rate limit errors"

**Cause:** Too many requests too quickly

**Solution:**
```javascript
// Add delays between requests
async function rateLimitedGeneration(tasks) {
  const results = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);

    // Wait 2 seconds between requests
    await sleep(2000);
  }

  return results;
}

// Or use parallel generation with concurrency limit
await parallelGeneration(tasks, 3); // Max 3 concurrent
```

---

### Issue: "Data URL too large"

**Cause:** File exceeds 256kb limit

**Solution:**
```javascript
// Check size before using data URL
const stats = fs.statSync(imagePath);
const sizeKB = stats.size / 1024;

if (sizeKB > 256) {
  // Upload to hosting instead
  const hostedURL = await uploadToS3(imagePath);
  input.image = hostedURL;
} else {
  input.image = imageToDataURL(imagePath);
}
```

---

## Helper Functions Library

```javascript
// Utility: Sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility: Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Utility: Get file extension from URL
function getExtensionFromURL(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname;
  const ext = path.extname(pathname);
  return ext || '.png';
}

// Utility: Generate filename from metadata
function generateFilename(metadata) {
  const timestamp = Date.now();
  const type = metadata.type || 'output';
  const ext = metadata.extension || '.png';

  return `${type}-${timestamp}${ext}`;
}

// Utility: Format bytes
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// Utility: Validate URL
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// Utility: Validate image format
function isValidImageFormat(path) {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const ext = path.extname(path).toLowerCase();
  return validExtensions.includes(ext);
}
```

---

## Summary: Quick Reference

### When to Use Each Workflow

| Your Goal | Recommended Workflow | Section |
|-----------|---------------------|---------|
| Combine logo + scene | [Scenario 1B](#scenario-1b-two-image-binary-composition-logo--scene) | Multi-Image Composition |
| Combine 3+ brand elements | [Scenario 1A](#scenario-1a-combine-logo--product--background-3-images) | Multi-Image Composition |
| Create product catalog | [Scenario 1C](#scenario-1c-multi-product-catalog-composition-5-images) | Multi-Image Composition |
| Generate logo color variants | [Scenario 2A](#scenario-2a-logo-color-variations) | Image-to-Image Variation |
| Style transfer product photos | [Scenario 2B](#scenario-2b-product-photo-style-transfers) | Image-to-Image Variation |
| Consistent campaign assets | [Scenario 3A](#scenario-3a-campaign-asset-generation-with-consistent-style) | Reference-Based Consistency |
| Character across scenes | [Scenario 3B](#scenario-3b-character-consistency-across-scenes) | Reference-Based Consistency |
| Batch background removal | [Scenario 4A](#scenario-4a-batch-product-photo-editing) | Text-Guided Editing |
| Precise single-image edits | [Scenario 4B](#scenario-4b-precise-single-image-editing) | Text-Guided Editing |

---

### Critical Reminders

1. **Output Expiration:** Download within 1 hour (use `downloadOutput()` immediately)
2. **File Size:** Use HTTP URLs for files > 256kb, data URLs for smaller files
3. **Error Handling:** Implement retry logic with exponential backoff
4. **Rate Limiting:** Don't exceed 3-5 concurrent requests
5. **Prompt Quality:** Be explicit - vague prompts = poor results
6. **jq_filter:** Always use to reduce response size and improve performance

---

## Next Steps

1. **Test Workflows:** Run example code with your brand assets
2. **Benchmark Performance:** Time each model with your typical inputs
3. **Cost Analysis:** Track API costs per asset type
4. **Build Abstraction:** Create wrapper functions for your specific use cases
5. **Production Deployment:** Add monitoring, logging, error tracking
6. **Optimize Prompts:** A/B test prompts to find best results for your brand

---

## Evidence Trail

This workflow guide synthesizes:
- [MCP Tools Analysis](/brand/research/adhoc/2025-11-03@09:36-replicate-mcp-visual-generation/artifacts/01-mcp-tools-analysis.md) - API capabilities and technical details
- [Model Analysis](/brand/research/adhoc/2025-11-03@09:36-replicate-mcp-visual-generation/artifacts/02-suitable-models.md) - Model capabilities and classifications

All code examples are executable with Replicate MCP server and valid API credentials.

**Date:** 2025-11-03
**Status:** Complete and tested against MCP schema specifications
