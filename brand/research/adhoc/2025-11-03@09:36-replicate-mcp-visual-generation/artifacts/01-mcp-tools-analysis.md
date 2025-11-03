# Replicate MCP Tools Analysis for Image Generation Workflows

**Date:** 2025-11-03
**Purpose:** Comprehensive analysis of Replicate MCP server capabilities for implementing image generation workflows

---

## Executive Summary

The Replicate MCP server provides comprehensive API access through 40+ specialized tools covering:
- Model discovery and search
- Prediction creation and management
- Deployment management
- Training capabilities
- Account and hardware information

**Key Finding:** The MCP implementation supports full image generation workflows with specific patterns for:
1. Discovering image generation models via search
2. Creating predictions with flexible input handling (HTTP URLs, data URLs)
3. Managing prediction lifecycle (create → monitor → retrieve)
4. Using both versioned models and official models

---

## Complete Tool Inventory

### 1. Discovery & Search Tools

#### `search`
**Purpose:** Search for models, collections, and documentation
**Key Features:**
- Returns models with metadata (tags, descriptions, scores)
- Includes model collections
- Search results include relevance scoring
- `jq_filter` parameter for response optimization (CRITICAL for performance)

**Image Generation Use Case:**
```json
{
  "query": "image generation stable diffusion",
  "limit": 10,
  "jq_filter": ".models[].model | {owner, name, description}"
}
```

**Response Structure:**
- `models[]` - Array of model objects with metadata
- `collections[]` - Curated model collections
- `pages[]` - Documentation pages
- Each model includes: `owner`, `name`, `description`, `latest_version`, `run_count`

#### `list_collections`
**Purpose:** Get paginated list of model collections
**Returns:** Collections like "super-resolution", "image-to-image", etc.

#### `get_collections`
**Purpose:** Get detailed collection info with nested model lists
**Parameters:** `collection_slug` (e.g., "super-resolution")

---

### 2. Model Information Tools

#### `get_models`
**Purpose:** Get detailed model information including input/output schemas
**Parameters:**
- `model_owner` (e.g., "stability-ai")
- `model_name` (e.g., "sdxl")
- `jq_filter` for optimization

**Critical Features:**
- Returns `openapi_schema` with full input/output specifications
- `latest_version` object with version ID
- Model metadata (description, github_url, run_count)
- Input schema defines what parameters the model accepts

**Example for getting SDXL info:**
```json
{
  "model_owner": "stability-ai",
  "model_name": "sdxl",
  "jq_filter": ".latest_version.id, .latest_version.openapi_schema.components.schemas.Input"
}
```

#### `list_models`
**Purpose:** Paginated list of public models
**Sorting Options:**
- `model_created_at` - When model was first created
- `latest_version_created_at` - When latest version was created (default)
- `sort_direction`: "asc" or "desc"

#### `get_models_versions`
**Purpose:** Get specific version details
**Returns:** Version ID, Cog version, OpenAPI schema, created_at

#### `list_models_versions`
**Purpose:** Get all versions for a model
**Returns:** Paginated version list, sorted by most recent first

#### `get_models_readme`
**Purpose:** Get model README content in Markdown
**Use Case:** Detailed documentation, usage examples, limitations

#### `list_models_examples`
**Purpose:** Get example predictions for a model
**Returns:** Prediction objects showing example inputs/outputs

---

### 3. Prediction Creation Tools

#### `create_predictions` (Primary Image Generation Tool)
**Purpose:** Create predictions for any model version
**Method:** POST request to predictions API

**Critical Parameters:**
- `version` (REQUIRED) - Model identifier in formats:
  - `{owner}/{name}:{version_id}` (full)
  - `{version_id}` (just 64-char ID)
  - `{owner}/{name}` (official models only)
- `input` (REQUIRED) - JSON object matching model's input schema
- `webhook` (optional) - HTTPS URL for completion notifications
- `webhook_events_filter` (optional) - Array: ["start", "output", "logs", "completed"]
- `stream` (deprecated) - URL provided in response if model supports streaming

**Headers:**
- `Prefer: wait` - Wait up to 60 seconds for completion (returns immediately if exceeded)
- `Cancel-After` - Duration string for automatic cancellation

**Image Input Handling:**
```json
{
  "version": "stability-ai/sdxl:da77bc59ee60...",
  "input": {
    "prompt": "A photo of a bear riding a bicycle",
    "image": "https://example.com/input.jpg",  // HTTP URL for large files
    "mask": "data:image/png;base64,..."        // Data URL for small files
  },
  "webhook": "https://example.com/webhook"
}
```

**File Input Guidelines (from docs):**
- **HTTP URLs:** Use when file > 256kb, need reuse, want metadata association
- **Data URLs:** Use when file ≤ 256kb, no hosting, single use only
- Format: `data:image/png;base64,{base64_encoded_data}`

**Response Object:**
```json
{
  "id": "prediction_id",
  "status": "starting|processing|succeeded|failed|canceled",
  "input": {...},
  "output": null | {...},
  "error": null | "error string",
  "urls": {
    "get": "API endpoint",
    "cancel": "Cancel endpoint",
    "stream": "SSE endpoint if supported"
  },
  "created_at": "timestamp",
  "started_at": "timestamp",
  "completed_at": "timestamp"
}
```

#### `create_models_predictions` (Official Models)
**Purpose:** Create predictions for official models
**Difference:** Uses model path instead of version ID
**Format:** `{owner}/{model_name}` (e.g., "meta/meta-llama-3-70b-instruct")

**Note:** Official models don't require version specification

#### `create_deployments_predictions`
**Purpose:** Create predictions via deployment
**Use Case:** Production environments with dedicated resources
**Parameters:** `deployment_owner`, `deployment_name`, `input`

---

### 4. Prediction Management Tools

#### `get_predictions`
**Purpose:** Get current state of a prediction
**Parameters:** `prediction_id`

**Status Values:**
- `starting` - Prediction initializing (may indicate worker startup)
- `processing` - Model's predict() method running
- `succeeded` - Completed successfully
- `failed` - Error during processing
- `canceled` - Manually canceled

**Output Handling:**
- Success: `output` contains result (files as HTTPS URLs)
- Failure: `error` contains error message
- Files: Served by `replicate.delivery` and subdomains
- **IMPORTANT:** Output auto-deleted after 1 hour (API predictions)

**Metrics Object:**
```json
{
  "metrics": {
    "predict_time": 12.5,  // CPU/GPU time in seconds
    "total_time": 45.2     // Total time including queue
  }
}
```

#### `list_predictions`
**Purpose:** Get paginated list of all predictions
**Parameters:**
- `created_after` - ISO 8601 datetime filter
- `created_before` - ISO 8601 datetime filter

**Returns:** 100 predictions per page, most recent first
**Fields:** `source` (api/web), `status`, `urls`, `model`, `version`, `data_removed`

#### `cancel_predictions`
**Purpose:** Cancel running prediction
**Parameters:** `prediction_id`
**Returns:** Updated prediction object with canceled status

---

### 5. Deployment Tools (Production Use)

#### `create_deployments`
**Purpose:** Create dedicated model deployment
**Parameters:**
- `name` - Deployment identifier
- `owner` - Account name
- `model` - Model path (e.g., "stability-ai/sdxl")
- `version` - 64-char version ID
- `hardware` - SKU from hardware.list
- `min_instances` - Minimum scaling
- `max_instances` - Maximum scaling

**Use Case:** Production environments needing:
- Dedicated resources
- Auto-scaling
- Consistent performance
- No cold starts

#### `update_deployments`
**Purpose:** Update deployment configuration
**Updatable:** hardware, min_instances, max_instances, version

#### `get_deployments` / `list_deployments`
**Purpose:** Retrieve deployment information
**Returns:** Current release configuration, scaling settings

---

### 6. Training Tools

#### `create_trainings`
**Purpose:** Fine-tune models with custom data
**Parameters:**
- `model_owner`, `model_name`, `version_id` - Base model
- `destination` - Target model path `{owner}/{name}`
- `input` - Training parameters (matches model's train() schema)
- `webhook` - Completion notification URL

**Output:** Creates new version at destination

#### `get_trainings` / `list_trainings`
**Purpose:** Monitor training progress
**Status:** starting, processing, succeeded, failed, canceled

#### `cancel_trainings`
**Purpose:** Cancel running training job

---

### 7. Hardware & Account Tools

#### `list_hardware`
**Purpose:** Get available hardware SKUs
**Returns:**
```json
[
  {"name": "CPU", "sku": "cpu"},
  {"name": "Nvidia T4 GPU", "sku": "gpu-t4"},
  {"name": "Nvidia A40 GPU", "sku": "gpu-a40-small"}
]
```

#### `get_account`
**Purpose:** Get account information
**Returns:** type (user/organization), username, name, github_url

---

### 8. Webhook Tools

#### `get_default_webhooks_secret`
**Purpose:** Get signing secret for webhook verification
**Use Case:** Verify webhook requests are from Replicate

---

### 9. Documentation Tools

#### `search_docs`
**Purpose:** Search SDK documentation
**Parameters:**
- `query` - Search term
- `language` - One of: http, python, go, typescript, terraform, ruby, java, kotlin

**Returns:** Markdown-formatted documentation pages

---

## Image Generation Workflow: Step-by-Step

### Phase 1: Model Discovery

**Step 1: Search for Image Generation Models**
```json
// Tool: search
{
  "query": "text to image stable diffusion",
  "limit": 20,
  "jq_filter": ".models[] | {owner: .model.owner, name: .model.name, description: .model.description, runs: .model.run_count}"
}
```

**Step 2: Get Model Details**
```json
// Tool: get_models
{
  "model_owner": "stability-ai",
  "model_name": "sdxl",
  "jq_filter": ".latest_version.id, .latest_version.openapi_schema.components.schemas.Input"
}
```

**Extract from response:**
- Version ID (64-char string)
- Input schema (defines required/optional parameters)
- Valid input types and constraints

---

### Phase 2: Prediction Creation

**Step 3: Create Prediction**
```json
// Tool: create_predictions
{
  "version": "stability-ai/sdxl:da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
  "input": {
    "prompt": "A majestic lion in the savanna at sunset, photorealistic, 4k",
    "negative_prompt": "blurry, low quality, distorted",
    "width": 1024,
    "height": 1024,
    "num_outputs": 1,
    "scheduler": "K_EULER",
    "guidance_scale": 7.5,
    "num_inference_steps": 50
  },
  "jq_filter": "{id, status, urls}"
}
```

**With Prefer: wait header:**
- Request waits up to 60 seconds
- Returns immediately if model completes within timeout
- Otherwise returns with `status: "starting"` or `status: "processing"`

---

### Phase 3: Prediction Monitoring

**Step 4: Check Prediction Status**
```json
// Tool: get_predictions
{
  "prediction_id": "abc123...",
  "jq_filter": "{id, status, output, error, metrics}"
}
```

**Polling Strategy:**
- Initial wait: Use `Prefer: wait` header (60s automatic wait)
- If not complete: Poll every 1-2 seconds
- Check `status` field: starting → processing → succeeded/failed
- Stop polling when terminal state reached

---

### Phase 4: Result Retrieval

**Step 5: Extract Output**

**For successful predictions:**
```json
{
  "status": "succeeded",
  "output": [
    "https://replicate.delivery/pbxt/abc123.../output.png"
  ],
  "metrics": {
    "predict_time": 3.2,
    "total_time": 5.8
  }
}
```

**Important Output Handling:**
- Output URLs are HTTPS links to `replicate.delivery`
- **Files auto-delete after 1 hour** (API predictions)
- Must download/save files before deletion
- Requires Authorization header to access files
- Add `*.replicate.delivery` to allowlist if using content security

---

## Image Input Handling Patterns

### Pattern 1: HTTP URLs (Recommended for Large Files)

**When to use:**
- File size > 256kb
- Need to reuse file across multiple predictions
- Want prediction metadata associated with file

**Example:**
```json
{
  "input": {
    "image": "https://example.com/input-image.jpg",
    "mask": "https://example.com/mask.png"
  }
}
```

**Requirements:**
- Must be publicly accessible HTTPS URL
- File must be downloadable without authentication
- Common formats: JPG, PNG, WebP

---

### Pattern 2: Data URLs (Small Files Only)

**When to use:**
- File size ≤ 256kb
- Don't want to host file externally
- Single-use, ephemeral input
- Quick testing/prototyping

**Format:**
```
data:{mimetype};base64,{base64_encoded_data}
```

**Example:**
```json
{
  "input": {
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

**Limitations:**
- Not stored by Replicate
- Cannot be reused
- Size limit: 256kb
- Increases request payload size

---

### Pattern 3: Multi-Image Inputs

Some models accept multiple images (e.g., image-to-image, style transfer):

```json
{
  "input": {
    "image": "https://example.com/content.jpg",
    "style_image": "https://example.com/style.jpg",
    "mask": "data:image/png;base64,..."
  }
}
```

**Check model's input schema** via `get_models` to see all accepted image parameters.

---

## Prediction Lifecycle Management

### Lifecycle States

```
Created → Starting → Processing → Succeeded/Failed/Canceled
   ↓         ↓          ↓              ↓
  1-2s    Variable   Variable      Terminal
          (cold      (model        (final)
          start)     runtime)
```

### State Descriptions

1. **Starting** (1-2 seconds typical)
   - Prediction initializing
   - If longer: new worker being started (cold start)
   - No output yet

2. **Processing** (varies by model)
   - Model's `predict()` method running
   - May have partial output if streaming supported
   - Check `urls.stream` for SSE endpoint

3. **Succeeded** (terminal)
   - `output` contains results
   - `metrics.predict_time` shows GPU time
   - `metrics.total_time` shows total time
   - Files available at URLs

4. **Failed** (terminal)
   - `error` contains error message
   - Common causes: invalid input, OOM, timeout
   - Check error for debugging

5. **Canceled** (terminal)
   - Manually canceled via API
   - Or exceeded `Cancel-After` deadline
   - No output generated

### Deadline Management

**Automatic cancellation:**
```json
// In create_predictions request
{
  "version": "...",
  "input": {...},
  "Cancel-After": "600s"  // Cancel if not complete in 10 minutes
}
```

**Manual cancellation:**
```json
// Tool: cancel_predictions
{
  "prediction_id": "abc123..."
}
```

---

## Webhook Integration

### Webhook Configuration

**Setup:**
```json
{
  "version": "...",
  "input": {...},
  "webhook": "https://your-domain.com/webhook",
  "webhook_events_filter": ["start", "output", "logs", "completed"]
}
```

### Event Types

- **start** - Immediately on prediction start
- **output** - Each time output generated (for streaming models)
- **logs** - Each time log output generated
- **completed** - Terminal state reached (succeeded/canceled/failed)

**Throttling:**
- `output` and `logs` events: Max once per 500ms
- `start` and `completed`: Always sent regardless of throttling

### Webhook Payload

Webhook POST body = same as `get_predictions` response:
```json
{
  "id": "prediction_id",
  "status": "succeeded",
  "input": {...},
  "output": [...],
  "metrics": {...}
}
```

### Security

**Verification:**
1. Get signing secret: `get_default_webhooks_secret`
2. Verify webhook signature in request headers
3. Validate payload integrity

**Important:**
- Replicate will retry webhooks on network errors
- Make webhook endpoint idempotent
- Replicate will NOT follow redirects
- Use final HTTPS URL only

---

## Advanced Patterns

### Pattern 1: Batch Processing

**Multiple predictions in parallel:**

```javascript
// Create multiple predictions
const predictions = await Promise.all([
  create_predictions({version: "...", input: {prompt: "image 1"}}),
  create_predictions({version: "...", input: {prompt: "image 2"}}),
  create_predictions({version: "...", input: {prompt: "image 3"}})
]);

// Poll all predictions
const results = await Promise.all(
  predictions.map(p => pollUntilComplete(p.id))
);
```

**Limitations:**
- No official batch API
- Manual parallelization required
- Watch for rate limits

---

### Pattern 2: Streaming Output

**For models that support streaming:**

```json
{
  "version": "...",
  "input": {...}
}
```

**Response includes:**
```json
{
  "urls": {
    "stream": "https://api.replicate.com/v1/predictions/{id}/stream"
  }
}
```

**Consume via SSE:**
- Connect to `urls.stream` endpoint
- Receive server-sent events as output generated
- Useful for progress updates, incremental results

---

### Pattern 3: Official Models (No Version Required)

**For official models:**
```json
// Tool: create_models_predictions
{
  "model_owner": "black-forest-labs",
  "model_name": "flux-schnell",
  "input": {
    "prompt": "A cat wearing sunglasses"
  }
}
```

**Benefits:**
- No version ID needed
- Always uses latest stable version
- Consistent performance
- Predictable pricing

**Official model characteristics:**
- Always on (no cold starts)
- Stable API interface
- Maintained by Replicate

---

## Performance Optimization

### 1. Response Filtering (CRITICAL)

**Always use `jq_filter` parameter:**

```json
{
  "jq_filter": ".latest_version.id"  // Returns only version ID
}
```

**Why:**
- Reduces response size (500% faster scrapes per docs)
- Saves bandwidth
- Faster parsing
- Lower token usage for LLM processing

**Common filters:**
```json
// Just version ID
".latest_version.id"

// Model basics
"{owner: .owner, name: .name, latest: .latest_version.id}"

// Prediction essentials
"{id, status, output, error}"

// Search results condensed
".models[] | {owner: .model.owner, name: .model.name}"
```

### 2. Prefer: wait Header

**Use for synchronous predictions:**
- Waits up to 60 seconds automatically
- Reduces polling overhead
- Better for fast models (< 60s runtime)

**Don't use for:**
- Slow models (> 60s expected)
- Batch processing
- Webhook-based flows

### 3. Webhook vs Polling

**Use webhooks when:**
- Long-running predictions
- Server-to-server architecture
- Want to avoid polling overhead
- Processing multiple predictions

**Use polling when:**
- Client-side applications
- Cannot expose webhook endpoint
- Simple, one-off predictions
- Testing/development

### 4. Hardware Selection

**For image generation:**
- CPU: Very slow, not recommended
- gpu-t4: Budget option, 3-5x slower than A40
- gpu-a40-small: Good balance (recommended)
- gpu-a40-large: Fastest, highest cost

**Check via:**
```json
// Tool: list_hardware
{}
```

---

## Limitations & Constraints

### MCP Implementation Limits

1. **No Direct File Upload**
   - Cannot upload files directly via MCP
   - Must use HTTP URLs or data URLs
   - Files must be < 256kb for data URLs

2. **Response Size**
   - Large responses can timeout
   - MUST use `jq_filter` to reduce payload
   - Complex schemas can be truncated

3. **Rate Limiting**
   - Subject to Replicate API rate limits
   - No explicit limits documented in MCP
   - Watch for 429 status codes

4. **Authentication**
   - Requires REPLICATE_API_TOKEN environment variable
   - Token must be configured at MCP server level
   - No per-request token override

---

### API Constraints

1. **Output Retention**
   - Files auto-delete after 1 hour (API predictions)
   - Must download and save outputs
   - `output` key remains but value becomes `null`

2. **Model Availability**
   - Public models only via standard API
   - Private models require account ownership
   - Some models have usage restrictions

3. **Input Size Limits**
   - HTTP URLs: No practical size limit
   - Data URLs: 256kb maximum
   - Request payload: Unspecified limit

4. **Prediction Limits**
   - No documented max concurrent predictions
   - Subject to account quotas
   - Rate limits vary by plan tier

---

### Versioning Considerations

1. **Model Versions**
   - Versions are immutable (can't change)
   - New versions = new 64-char ID
   - Breaking changes possible between versions

2. **Official Models**
   - Can use without version ID
   - Version managed by Replicate
   - May update without notice

3. **Version Discovery**
   - Must query model to get latest version
   - No "latest" alias in API
   - Official models exception: auto-resolve

---

## Best Practices

### 1. Model Selection

**Research phase:**
```javascript
// 1. Search by use case
search({query: "realistic portrait generation", limit: 10})

// 2. Check collection
get_collections({collection_slug: "super-resolution"})

// 3. Get model details
get_models({model_owner: "...", model_name: "..."})

// 4. Review examples
list_models_examples({model_owner: "...", model_name: "..."})
```

**Criteria:**
- run_count (popularity)
- latest_version.created_at (recency)
- description (capabilities)
- examples (quality)

---

### 2. Input Preparation

**Validate against schema:**
```javascript
// Get input schema
const model = get_models({owner: "...", name: "..."});
const inputSchema = model.latest_version.openapi_schema.components.schemas.Input;

// Check required fields
const required = inputSchema.required; // e.g., ["prompt"]

// Check field types
const properties = inputSchema.properties;
// prompt: {type: "string", description: "..."}
```

**File handling:**
```javascript
// For large files
const fileSize = getFileSize(image);
if (fileSize > 256 * 1024) {
  // Upload to CDN/S3, use HTTP URL
  input.image = "https://cdn.example.com/image.jpg";
} else {
  // Convert to data URL
  input.image = `data:image/png;base64,${base64Encode(image)}`;
}
```

---

### 3. Prediction Management

**Synchronous flow (fast models):**
```javascript
// Use Prefer: wait for auto-polling
const prediction = create_predictions({
  version: "...",
  input: {...},
  Prefer: "wait",
  jq_filter: "{id, status, output, error}"
});

if (prediction.status === "succeeded") {
  // Process output immediately
  handleOutput(prediction.output);
} else {
  // Poll if needed
  await pollUntilComplete(prediction.id);
}
```

**Asynchronous flow (slow models):**
```javascript
// Create with webhook
const prediction = create_predictions({
  version: "...",
  input: {...},
  webhook: "https://example.com/webhook",
  webhook_events_filter: ["completed"]
});

// Return prediction ID to client
return {prediction_id: prediction.id};

// Handle completion in webhook endpoint
```

**Polling implementation:**
```javascript
async function pollUntilComplete(predictionId, maxWait = 300000) {
  const startTime = Date.now();
  const pollInterval = 1000; // 1 second

  while (Date.now() - startTime < maxWait) {
    const prediction = get_predictions({
      prediction_id: predictionId,
      jq_filter: "{status, output, error}"
    });

    if (["succeeded", "failed", "canceled"].includes(prediction.status)) {
      return prediction;
    }

    await sleep(pollInterval);
  }

  throw new Error("Prediction timeout");
}
```

---

### 4. Error Handling

**Prediction errors:**
```javascript
const prediction = get_predictions({prediction_id: id});

switch (prediction.status) {
  case "succeeded":
    return prediction.output;

  case "failed":
    console.error("Prediction failed:", prediction.error);
    // Common errors:
    // - Invalid input parameters
    // - Out of memory
    // - Model timeout
    // - Invalid image format
    throw new Error(prediction.error);

  case "canceled":
    console.warn("Prediction canceled");
    // Manual cancellation or deadline exceeded
    return null;

  default:
    // Still processing
    return null;
}
```

**API errors:**
- 401: Invalid or missing API token
- 404: Model/prediction not found
- 422: Invalid input (check schema)
- 429: Rate limit exceeded
- 500: Server error (retry)

---

### 5. Output Processing

**Download and save:**
```javascript
const prediction = get_predictions({prediction_id: id});

if (prediction.status === "succeeded") {
  // Output URLs expire after 1 hour
  const imageUrls = prediction.output; // Array of URLs

  // Download immediately
  const downloads = await Promise.all(
    imageUrls.map(url => downloadAndSave(url))
  );

  // Store locally or upload to permanent storage
  const permanentUrls = await uploadToS3(downloads);

  return permanentUrls;
}
```

**Handle multiple outputs:**
```javascript
// Some models return multiple images
const prediction = get_predictions({prediction_id: id});

// Output might be:
// - Single URL string: "https://..."
// - Array of URLs: ["https://...", "https://..."]
// - Object with named outputs: {image: "https://...", mask: "https://..."}

// Normalize to array
let outputs = Array.isArray(prediction.output)
  ? prediction.output
  : [prediction.output];

// Process each
outputs.forEach((url, i) => {
  download(url, `output_${i}.png`);
});
```

---

### 6. Production Considerations

**Use deployments for:**
- High-volume production use
- Consistent performance requirements
- No cold start tolerance
- Auto-scaling needs

**Deployment setup:**
```javascript
// Create deployment
const deployment = create_deployments({
  name: "image-gen-prod",
  owner: "my-org",
  model: "stability-ai/sdxl",
  version: "da77bc59...",
  hardware: "gpu-a40-small",
  min_instances: 1,  // Always warm
  max_instances: 5   // Scale to 5
});

// Use deployment for predictions
const prediction = create_deployments_predictions({
  deployment_owner: "my-org",
  deployment_name: "image-gen-prod",
  input: {...}
});
```

**Benefits:**
- No cold starts (min_instances > 0)
- Auto-scaling under load
- Predictable performance
- Dedicated resources

---

## Recommended Image Generation Models

Based on search tool capabilities, here are recommended starting points:

### Text-to-Image
1. **SDXL (Stable Diffusion XL)**
   - Owner: stability-ai
   - Name: sdxl
   - Use: High-quality general purpose generation
   - Speed: ~3-5 seconds on A40

2. **Flux Schnell**
   - Owner: black-forest-labs
   - Name: flux-schnell
   - Use: Fast, high-quality generation (official model)
   - Speed: ~2-3 seconds

### Image-to-Image
1. **SDXL-img2img**
   - Use: Style transfer, image editing
   - Requires: source image + prompt

### Super Resolution
1. **Collection: "super-resolution"**
   - Use: Upscaling, quality enhancement
   - Various models for different use cases

---

## Example Workflow: Complete Implementation

```javascript
/**
 * Complete image generation workflow
 */
async function generateImage(prompt, options = {}) {
  // 1. Search for appropriate model
  const searchResults = search({
    query: "stable diffusion xl",
    limit: 5,
    jq_filter: ".models[0].model | {owner, name, latest_version}"
  });

  const model = searchResults.models[0].model;
  const versionId = model.latest_version.id;

  // 2. Get model input schema
  const modelDetails = get_models({
    model_owner: model.owner,
    model_name: model.name,
    jq_filter: ".latest_version.openapi_schema.components.schemas.Input"
  });

  const inputSchema = modelDetails.latest_version.openapi_schema.components.schemas.Input;

  // 3. Prepare input according to schema
  const input = {
    prompt: prompt,
    negative_prompt: options.negative_prompt || "",
    width: options.width || 1024,
    height: options.height || 1024,
    num_outputs: options.num_outputs || 1,
    guidance_scale: options.guidance_scale || 7.5,
    num_inference_steps: options.num_inference_steps || 50
  };

  // Add image input if provided
  if (options.image) {
    const fileSize = getFileSize(options.image);
    if (fileSize > 256 * 1024) {
      // Upload to temporary storage
      input.image = await uploadToStorage(options.image);
    } else {
      // Convert to data URL
      input.image = convertToDataURL(options.image);
    }
  }

  // 4. Create prediction with webhook
  const prediction = create_predictions({
    version: `${model.owner}/${model.name}:${versionId}`,
    input: input,
    webhook: options.webhook || null,
    webhook_events_filter: ["completed"],
    Prefer: "wait", // Try to wait for fast completion
    jq_filter: "{id, status, output, error, metrics}"
  });

  // 5. Handle result
  if (prediction.status === "succeeded") {
    // Fast path: completed within 60s
    return {
      id: prediction.id,
      status: "completed",
      images: await downloadImages(prediction.output),
      metrics: prediction.metrics
    };
  }

  // 6. Slow path: poll for completion
  if (!options.webhook) {
    const completed = await pollUntilComplete(prediction.id);
    return {
      id: completed.id,
      status: "completed",
      images: await downloadImages(completed.output),
      metrics: completed.metrics
    };
  }

  // 7. Webhook path: return pending
  return {
    id: prediction.id,
    status: prediction.status,
    message: "Processing, webhook will notify on completion"
  };
}

/**
 * Download and save images from prediction output
 */
async function downloadImages(output) {
  // Handle different output formats
  const urls = Array.isArray(output) ? output : [output];

  // Download all images
  const images = await Promise.all(
    urls.map(async (url, index) => {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`
        }
      });

      const buffer = await response.arrayBuffer();
      const filename = `output_${Date.now()}_${index}.png`;

      // Save to local storage or cloud
      await saveImage(filename, buffer);

      return {
        url: url,
        filename: filename,
        size: buffer.byteLength
      };
    })
  );

  return images;
}

/**
 * Poll prediction until completion
 */
async function pollUntilComplete(predictionId, maxAttempts = 300) {
  for (let i = 0; i < maxAttempts; i++) {
    const prediction = get_predictions({
      prediction_id: predictionId,
      jq_filter: "{status, output, error, metrics}"
    });

    // Check for terminal states
    if (prediction.status === "succeeded") {
      return prediction;
    }

    if (prediction.status === "failed") {
      throw new Error(`Prediction failed: ${prediction.error}`);
    }

    if (prediction.status === "canceled") {
      throw new Error("Prediction was canceled");
    }

    // Wait before next poll
    await sleep(1000); // 1 second
  }

  throw new Error("Prediction timeout after 5 minutes");
}

// Usage
const result = await generateImage(
  "A majestic lion in the savanna at sunset, photorealistic",
  {
    width: 1024,
    height: 1024,
    guidance_scale: 7.5,
    negative_prompt: "blurry, low quality"
  }
);

console.log("Generated images:", result.images);
console.log("Processing time:", result.metrics.total_time);
```

---

## Key Takeaways

### Critical Requirements
1. **Always use `jq_filter`** - 500% performance improvement
2. **Handle output expiry** - Download within 1 hour
3. **Validate input schema** - Check model's OpenAPI schema
4. **Use appropriate file format** - HTTP URLs for large, data URLs for small
5. **Implement proper polling** - 1-2 second intervals with timeout

### Recommended Patterns
1. **Fast models (<60s)** - Use `Prefer: wait` header
2. **Slow models (>60s)** - Use webhooks for completion notification
3. **Production** - Use deployments for consistent performance
4. **Testing** - Use standard API with polling

### Common Pitfalls
1. Not using `jq_filter` (large payloads)
2. Not downloading outputs before expiry
3. Not validating input against schema
4. Polling too frequently (rate limits)
5. Not handling cold starts (initial delay)

---

## Next Steps for Implementation

1. **Test basic workflow** - Single prediction with SDXL
2. **Implement polling** - Robust status checking
3. **Add error handling** - Graceful failure recovery
4. **Setup webhooks** - Production completion notifications
5. **Optimize performance** - jq_filter tuning, caching
6. **Production deployment** - Create dedicated deployment if needed

---

## References

- [Replicate API Documentation](https://replicate.com/docs)
- [Prediction Creation Guide](https://replicate.com/docs/topics/predictions/create-a-prediction)
- [Model Versions](https://replicate.com/docs/how-does-replicate-work#versions)
- [Official Models](https://replicate.com/docs/topics/models/official-models)
