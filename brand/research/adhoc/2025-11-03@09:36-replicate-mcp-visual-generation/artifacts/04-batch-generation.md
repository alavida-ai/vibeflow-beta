# Batch Image Generation Patterns - Production Guide

**Date:** 2025-11-03
**Purpose:** Comprehensive patterns for generating multiple images efficiently using Replicate MCP tools
**Context:** [MCP Tools Analysis](/brand/research/adhoc/2025-11-03@09:36-replicate-mcp-visual-generation/artifacts/01-mcp-tools-analysis.md) | [Model Capabilities](/brand/research/adhoc/2025-11-03@09:36-replicate-mcp-visual-generation/artifacts/02-suitable-models.md)

---

## Executive Summary

Batch image generation requires careful orchestration of API calls, polling strategies, and resource management. Three primary patterns are available:

1. **Sequential Processing** - One prediction at a time (simplest, slowest)
2. **Parallel Processing** - Multiple concurrent predictions (fastest, highest complexity)
3. **Hybrid Batch Processing** - Controlled concurrency with queuing (optimal balance)

**Key Finding:** Replicate's MCP server has no native batch API. All batch workflows must be implemented via manual parallelization with careful rate limiting and error handling.

**Critical Constraints:**
- Output files auto-delete after 1 hour
- No documented concurrency limits (varies by account tier)
- Polling overhead compounds with batch size
- Each prediction requires separate API calls for creation and monitoring

---

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Pattern 1: Sequential Processing](#pattern-1-sequential-processing)
3. [Pattern 2: Parallel Processing](#pattern-2-parallel-processing)
4. [Pattern 3: Hybrid Batch Processing](#pattern-3-hybrid-batch-processing)
5. [Common Batch Scenarios](#common-batch-scenarios)
6. [Error Handling Strategies](#error-handling-strategies)
7. [Performance Optimization](#performance-optimization)
8. [Cost Management](#cost-management)
9. [Production Best Practices](#production-best-practices)
10. [Complete Implementation Examples](#complete-implementation-examples)

---

## Core Concepts

### Batch Generation Workflow

```
Input Preparation → Prediction Creation → Status Monitoring → Output Collection
       ↓                    ↓                     ↓                   ↓
  Validate inputs    Parallel/Sequential    Polling/Webhooks    Download & Save
  Prepare prompts      API calls            State tracking       Organize outputs
  Handle files         Track IDs            Error detection      Metadata storage
```

### Critical Timing Considerations

**Prediction Lifecycle:**
```
Create (instant) → Starting (1-2s) → Processing (5-60s) → Complete (terminal)
                                    ↓
                            [Poll every 1-2 seconds]
                                    ↓
                        [Download within 1 hour window]
```

**Batch Timing Factors:**
- Creation overhead: ~100-200ms per prediction
- Cold start delay: 1-5 seconds (first prediction per model)
- Processing time: 5-60 seconds (model dependent)
- Polling interval: 1-2 seconds optimal
- Download window: 60 minutes before expiry

### Resource Constraints

**API Rate Limits (account dependent):**
- Concurrent predictions: Varies by tier (typically 5-50)
- API requests: Typically 100-1000/minute
- File downloads: Subject to CDN limits

**Memory Considerations:**
- State tracking: ~1KB per prediction
- Output storage: 2-10MB per image (before upload to permanent storage)
- Polling tasks: 1 async operation per active prediction

---

## Pattern 1: Sequential Processing

### Overview

**When to use:**
- Small batches (< 5 images)
- Simple workflows without concurrency complexity
- Testing and prototyping
- Low-priority background jobs
- When rate limits are strict

**Characteristics:**
- ✅ Simplest implementation
- ✅ No concurrency management
- ✅ Predictable resource usage
- ❌ Slowest execution time
- ❌ Underutilizes API capacity

### Basic Sequential Flow

```javascript
/**
 * Sequential batch generation - one at a time
 * Total time = sum of individual prediction times
 */
async function generateImagesSequential(prompts, modelVersion) {
  const results = [];

  for (const prompt of prompts) {
    console.log(`Generating image ${results.length + 1}/${prompts.length}`);

    // 1. Create prediction
    const prediction = await createPrediction({
      version: modelVersion,
      input: { prompt },
      Prefer: "wait" // Wait up to 60s
    });

    // 2. Poll if not complete
    const completed = prediction.status === "succeeded"
      ? prediction
      : await pollUntilComplete(prediction.id);

    // 3. Download and save
    const output = await downloadOutput(completed.output);

    results.push({
      prompt,
      predictionId: completed.id,
      output,
      metrics: completed.metrics
    });
  }

  return results;
}
```

### Sequential with Progress Tracking

```javascript
/**
 * Enhanced sequential with detailed progress
 */
async function generateImagesSequentialEnhanced(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    onProgress = () => {},
    onError = () => {},
    continueOnError = true
  } = options;

  const results = [];
  const errors = [];
  const totalCount = prompts.length;

  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    const startTime = Date.now();

    try {
      onProgress({
        current: i + 1,
        total: totalCount,
        percent: ((i + 1) / totalCount) * 100,
        prompt,
        status: "creating"
      });

      // Create prediction
      const prediction = await createPrediction({
        version: modelVersion,
        input: { prompt },
        jq_filter: "{id, status, urls}"
      });

      onProgress({
        current: i + 1,
        total: totalCount,
        percent: ((i + 1) / totalCount) * 100,
        prompt,
        status: "processing",
        predictionId: prediction.id
      });

      // Poll for completion
      const completed = await pollUntilComplete(prediction.id);

      if (completed.status === "succeeded") {
        // Download output
        const output = await downloadOutput(completed.output);

        const elapsedTime = Date.now() - startTime;

        results.push({
          index: i,
          prompt,
          predictionId: completed.id,
          output,
          metrics: completed.metrics,
          elapsedTime
        });

        onProgress({
          current: i + 1,
          total: totalCount,
          percent: ((i + 1) / totalCount) * 100,
          prompt,
          status: "complete",
          elapsedTime
        });
      } else {
        throw new Error(`Prediction failed: ${completed.error}`);
      }

    } catch (error) {
      errors.push({
        index: i,
        prompt,
        error: error.message
      });

      onError({
        index: i,
        prompt,
        error: error.message
      });

      if (!continueOnError) {
        throw error;
      }
    }
  }

  return {
    results,
    errors,
    successCount: results.length,
    errorCount: errors.length,
    totalCount
  };
}

// Usage
const { results, errors } = await generateImagesSequentialEnhanced(
  [
    "A mountain landscape at sunset",
    "A futuristic city skyline",
    "An underwater coral reef scene"
  ],
  "stability-ai/sdxl:da77bc59...",
  {
    onProgress: (progress) => {
      console.log(
        `[${progress.current}/${progress.total}] ${progress.status}: ${progress.prompt}`
      );
    },
    onError: (error) => {
      console.error(`Error at ${error.index}: ${error.error}`);
    },
    continueOnError: true
  }
);

console.log(`Generated ${results.length} images with ${errors.length} errors`);
```

### Use Cases for Sequential Processing

**1. Logo Variations (5-10 iterations)**
```javascript
const logoVariations = await generateImagesSequential(
  [
    "Modern minimalist logo for tech company, blue and white",
    "Modern minimalist logo for tech company, green and black",
    "Modern minimalist logo for tech company, purple gradient",
    "Modern minimalist logo for tech company, orange accent",
    "Modern minimalist logo for tech company, red and gray"
  ],
  "black-forest-labs/flux-dev"
);
```

**2. Product Photography Angles (sequential for consistency)**
```javascript
// Sequential ensures consistent processing per product
const productShots = await generateImagesSequential(
  [
    "Professional product photo: wireless headphones, front view",
    "Professional product photo: wireless headphones, side view",
    "Professional product photo: wireless headphones, three-quarter view",
    "Professional product photo: wireless headphones, detail shot of controls"
  ],
  "stability-ai/sdxl:..."
);
```

**3. A/B Testing Asset Generation**
```javascript
// Sequential when comparing outputs directly
const abTestAssets = await generateImagesSequential(
  [
    "Social media ad: smartphone, vibrant colors, energetic mood",
    "Social media ad: smartphone, muted tones, professional mood"
  ],
  modelVersion
);
```

---

## Pattern 2: Parallel Processing

### Overview

**When to use:**
- Large batches (10-100+ images)
- Time-sensitive workflows
- High-volume production use
- Sufficient API quota available

**Characteristics:**
- ✅ Fastest execution time
- ✅ Maximizes API throughput
- ✅ Best for high-volume workflows
- ❌ Complex error handling
- ❌ Risk of hitting rate limits
- ❌ Higher resource usage (memory, network)

### Basic Parallel Flow

```javascript
/**
 * Parallel batch generation - all at once
 * Total time ≈ longest individual prediction time + overhead
 */
async function generateImagesParallel(prompts, modelVersion) {
  console.log(`Creating ${prompts.length} predictions in parallel`);

  // 1. Create all predictions concurrently
  const predictions = await Promise.all(
    prompts.map(prompt =>
      createPrediction({
        version: modelVersion,
        input: { prompt },
        jq_filter: "{id, status, urls}"
      })
    )
  );

  console.log(`Polling ${predictions.length} predictions`);

  // 2. Poll all predictions concurrently
  const completed = await Promise.all(
    predictions.map(p => pollUntilComplete(p.id))
  );

  console.log(`Downloading ${completed.length} outputs`);

  // 3. Download all outputs concurrently
  const results = await Promise.all(
    completed.map(async (prediction, index) => {
      if (prediction.status === "succeeded") {
        const output = await downloadOutput(prediction.output);
        return {
          prompt: prompts[index],
          predictionId: prediction.id,
          output,
          metrics: prediction.metrics
        };
      } else {
        throw new Error(`Prediction ${prediction.id} failed: ${prediction.error}`);
      }
    })
  );

  return results;
}
```

### Parallel with Retry Logic

```javascript
/**
 * Robust parallel generation with retries
 */
async function generateImagesParallelRobust(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    maxRetries = 3,
    retryDelay = 2000,
    onProgress = () => {}
  } = options;

  // Helper: Create prediction with retry
  async function createWithRetry(prompt, retryCount = 0) {
    try {
      return await createPrediction({
        version: modelVersion,
        input: { prompt },
        jq_filter: "{id, status, urls}"
      });
    } catch (error) {
      if (retryCount < maxRetries) {
        console.warn(
          `Retry ${retryCount + 1}/${maxRetries} for prompt: ${prompt.substring(0, 50)}...`
        );
        await sleep(retryDelay * (retryCount + 1)); // Exponential backoff
        return createWithRetry(prompt, retryCount + 1);
      }
      throw error;
    }
  }

  // Helper: Poll with retry
  async function pollWithRetry(predictionId, retryCount = 0) {
    try {
      return await pollUntilComplete(predictionId);
    } catch (error) {
      if (retryCount < maxRetries) {
        console.warn(
          `Retry ${retryCount + 1}/${maxRetries} for prediction: ${predictionId}`
        );
        await sleep(retryDelay * (retryCount + 1));
        return pollWithRetry(predictionId, retryCount + 1);
      }
      throw error;
    }
  }

  console.log(`Creating ${prompts.length} predictions in parallel`);

  // 1. Create all predictions with retry logic
  const creationResults = await Promise.allSettled(
    prompts.map(prompt => createWithRetry(prompt))
  );

  // Separate successes and failures
  const predictions = [];
  const creationErrors = [];

  creationResults.forEach((result, index) => {
    if (result.status === "fulfilled") {
      predictions.push({
        index,
        prompt: prompts[index],
        prediction: result.value
      });
    } else {
      creationErrors.push({
        index,
        prompt: prompts[index],
        error: result.reason.message
      });
    }
  });

  onProgress({
    phase: "created",
    total: prompts.length,
    successful: predictions.length,
    failed: creationErrors.length
  });

  console.log(
    `Created ${predictions.length}/${prompts.length} predictions (${creationErrors.length} failures)`
  );

  // 2. Poll all successful predictions
  const pollingResults = await Promise.allSettled(
    predictions.map(({ prediction }) => pollWithRetry(prediction.id))
  );

  // 3. Process polling results
  const completed = [];
  const pollingErrors = [];

  pollingResults.forEach((result, index) => {
    const original = predictions[index];
    if (result.status === "fulfilled") {
      completed.push({
        ...original,
        completed: result.value
      });
    } else {
      pollingErrors.push({
        index: original.index,
        prompt: original.prompt,
        predictionId: original.prediction.id,
        error: result.reason.message
      });
    }
  });

  onProgress({
    phase: "completed",
    total: predictions.length,
    successful: completed.length,
    failed: pollingErrors.length
  });

  console.log(
    `Completed ${completed.length}/${predictions.length} predictions (${pollingErrors.length} failures)`
  );

  // 4. Download all outputs
  const downloadResults = await Promise.allSettled(
    completed.map(({ completed: prediction }) =>
      downloadOutput(prediction.output)
    )
  );

  // 5. Build final results
  const results = [];
  const downloadErrors = [];

  downloadResults.forEach((result, index) => {
    const original = completed[index];
    if (result.status === "fulfilled") {
      results.push({
        index: original.index,
        prompt: original.prompt,
        predictionId: original.completed.id,
        output: result.value,
        metrics: original.completed.metrics
      });
    } else {
      downloadErrors.push({
        index: original.index,
        prompt: original.prompt,
        predictionId: original.completed.id,
        error: result.reason.message
      });
    }
  });

  onProgress({
    phase: "downloaded",
    total: completed.length,
    successful: results.length,
    failed: downloadErrors.length
  });

  // Return comprehensive results
  return {
    results,
    errors: {
      creation: creationErrors,
      polling: pollingErrors,
      download: downloadErrors
    },
    summary: {
      total: prompts.length,
      successful: results.length,
      failed: creationErrors.length + pollingErrors.length + downloadErrors.length
    }
  };
}

// Usage
const { results, errors, summary } = await generateImagesParallelRobust(
  twentyPrompts,
  modelVersion,
  {
    maxRetries: 3,
    onProgress: (progress) => {
      console.log(
        `Phase: ${progress.phase} - ${progress.successful}/${progress.total} successful`
      );
    }
  }
);

console.log(`Generated ${summary.successful}/${summary.total} images`);
if (summary.failed > 0) {
  console.error(`Failed: ${summary.failed}`);
  console.error("Creation errors:", errors.creation.length);
  console.error("Polling errors:", errors.polling.length);
  console.error("Download errors:", errors.download.length);
}
```

### Use Cases for Parallel Processing

**1. Social Media Campaign (20-50 variations)**
```javascript
// Generate entire campaign assets in parallel
const campaignAssets = await generateImagesParallel(
  [
    "Instagram post: summer sale, vibrant colors, product showcase",
    "Instagram post: summer sale, lifestyle shot, beach setting",
    "Instagram story: summer sale, vertical format, bold text",
    "Facebook ad: summer sale, family-friendly, call-to-action",
    "Twitter header: summer sale, wide format, brand colors",
    // ... 15 more variations
  ],
  modelVersion
);
```

**2. Product Catalog Generation (100+ products)**
```javascript
// Generate product images for entire catalog
const products = loadProductList(); // 100 products
const prompts = products.map(p =>
  `Professional product photography: ${p.name}, white background, studio lighting, 4k`
);

const catalogImages = await generateImagesParallel(prompts, modelVersion);
```

**3. A/B Testing at Scale**
```javascript
// Generate multiple variations for testing
const variations = await generateImagesParallel(
  [
    // Color variations
    "Hero banner: tech product, blue theme",
    "Hero banner: tech product, green theme",
    "Hero banner: tech product, purple theme",
    // Style variations
    "Hero banner: tech product, minimalist style",
    "Hero banner: tech product, detailed style",
    "Hero banner: tech product, abstract style",
    // Mood variations
    "Hero banner: tech product, professional mood",
    "Hero banner: tech product, playful mood",
    "Hero banner: tech product, luxurious mood"
  ],
  modelVersion
);
```

---

## Pattern 3: Hybrid Batch Processing

### Overview

**When to use:**
- Medium to large batches (10-100 images)
- Need balance between speed and reliability
- Want controlled resource usage
- Production workflows with SLAs

**Characteristics:**
- ✅ Optimal speed vs complexity balance
- ✅ Controlled concurrency (respect rate limits)
- ✅ Resource-efficient
- ✅ Predictable behavior
- ❌ More complex than sequential
- ⚠️ Requires concurrency tuning

### Controlled Concurrency Implementation

```javascript
/**
 * Hybrid batch processing with controlled concurrency
 * Processes batches in waves with configurable parallelism
 */
async function generateImagesBatched(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    concurrency = 10, // Max concurrent predictions
    batchSize = 5, // Predictions per wave
    onBatchComplete = () => {},
    onProgress = () => {}
  } = options;

  const results = [];
  const errors = [];
  const totalBatches = Math.ceil(prompts.length / batchSize);

  console.log(
    `Processing ${prompts.length} prompts in ${totalBatches} batches (${batchSize} per batch)`
  );

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const batchStart = batchIndex * batchSize;
    const batchEnd = Math.min(batchStart + batchSize, prompts.length);
    const batchPrompts = prompts.slice(batchStart, batchEnd);

    console.log(
      `Processing batch ${batchIndex + 1}/${totalBatches} (${batchPrompts.length} prompts)`
    );

    onProgress({
      batch: batchIndex + 1,
      totalBatches,
      processed: batchStart,
      total: prompts.length,
      percent: (batchStart / prompts.length) * 100
    });

    try {
      // Process this batch in parallel
      const batchResults = await processBatchParallel(
        batchPrompts,
        modelVersion,
        batchStart
      );

      results.push(...batchResults.successful);
      errors.push(...batchResults.failed);

      onBatchComplete({
        batch: batchIndex + 1,
        successful: batchResults.successful.length,
        failed: batchResults.failed.length
      });

      // Optional: delay between batches to avoid rate limits
      if (batchIndex < totalBatches - 1) {
        await sleep(1000); // 1 second between batches
      }

    } catch (error) {
      console.error(`Batch ${batchIndex + 1} failed:`, error);
      errors.push({
        batch: batchIndex + 1,
        prompts: batchPrompts,
        error: error.message
      });
    }
  }

  return {
    results,
    errors,
    summary: {
      total: prompts.length,
      successful: results.length,
      failed: errors.length
    }
  };
}

/**
 * Helper: Process single batch in parallel
 */
async function processBatchParallel(prompts, modelVersion, startIndex) {
  // Create all predictions for this batch
  const predictionResults = await Promise.allSettled(
    prompts.map(prompt =>
      createPrediction({
        version: modelVersion,
        input: { prompt },
        jq_filter: "{id, status, urls}"
      })
    )
  );

  // Separate successful predictions
  const predictions = predictionResults
    .map((result, index) => ({
      index: startIndex + index,
      prompt: prompts[index],
      result
    }))
    .filter(p => p.result.status === "fulfilled")
    .map(p => ({
      index: p.index,
      prompt: p.prompt,
      prediction: p.result.value
    }));

  const creationErrors = predictionResults
    .map((result, index) => ({
      index: startIndex + index,
      prompt: prompts[index],
      result
    }))
    .filter(p => p.result.status === "rejected")
    .map(p => ({
      index: p.index,
      prompt: p.prompt,
      error: p.result.reason.message
    }));

  // Poll all predictions
  const completedResults = await Promise.allSettled(
    predictions.map(({ prediction }) => pollUntilComplete(prediction.id))
  );

  // Download outputs
  const downloadResults = await Promise.allSettled(
    completedResults
      .map((result, index) => ({
        ...predictions[index],
        result
      }))
      .filter(p => p.result.status === "fulfilled" && p.result.value.status === "succeeded")
      .map(p => ({
        ...p,
        completed: p.result.value
      }))
      .map(async (p) => ({
        index: p.index,
        prompt: p.prompt,
        predictionId: p.completed.id,
        output: await downloadOutput(p.completed.output),
        metrics: p.completed.metrics
      }))
  );

  const successful = downloadResults
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  const failed = [
    ...creationErrors,
    ...completedResults
      .map((result, index) => ({
        ...predictions[index],
        result
      }))
      .filter(p => p.result.status === "rejected" || p.result.value.status !== "succeeded")
      .map(p => ({
        index: p.index,
        prompt: p.prompt,
        error: p.result.status === "rejected"
          ? p.result.reason.message
          : p.result.value.error
      })),
    ...downloadResults
      .filter(r => r.status === "rejected")
      .map(r => ({
        error: r.reason.message
      }))
  ];

  return { successful, failed };
}

// Usage
const { results, errors, summary } = await generateImagesBatched(
  fiftyPrompts,
  modelVersion,
  {
    concurrency: 10,
    batchSize: 5,
    onBatchComplete: (batch) => {
      console.log(
        `Batch ${batch.batch} complete: ${batch.successful} successful, ${batch.failed} failed`
      );
    },
    onProgress: (progress) => {
      console.log(
        `Progress: ${progress.percent.toFixed(1)}% (${progress.processed}/${progress.total})`
      );
    }
  }
);
```

### Advanced: Queue-Based Processing

```javascript
/**
 * Queue-based batch processing with worker pool
 * Optimal for very large batches (100+ images)
 */
class ImageGenerationQueue {
  constructor(modelVersion, options = {}) {
    this.modelVersion = modelVersion;
    this.maxWorkers = options.maxWorkers || 10;
    this.workers = [];
    this.queue = [];
    this.results = [];
    this.errors = [];
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
  }

  /**
   * Add prompts to the queue
   */
  addPrompts(prompts) {
    prompts.forEach((prompt, index) => {
      this.queue.push({
        id: `task_${Date.now()}_${index}`,
        prompt,
        status: "queued",
        retries: 0
      });
    });
  }

  /**
   * Start processing the queue
   */
  async process() {
    console.log(`Starting queue processing: ${this.queue.length} tasks, ${this.maxWorkers} workers`);

    // Start worker pool
    const workerPromises = [];
    for (let i = 0; i < this.maxWorkers; i++) {
      workerPromises.push(this.worker(i));
    }

    // Wait for all workers to complete
    await Promise.all(workerPromises);

    // Call completion callback
    this.onComplete({
      total: this.results.length + this.errors.length,
      successful: this.results.length,
      failed: this.errors.length
    });

    return {
      results: this.results,
      errors: this.errors
    };
  }

  /**
   * Worker function - processes tasks from queue
   */
  async worker(workerId) {
    console.log(`Worker ${workerId} started`);

    while (this.queue.length > 0) {
      // Get next task
      const task = this.queue.shift();
      if (!task) break;

      task.status = "processing";
      task.workerId = workerId;

      console.log(`Worker ${workerId} processing: ${task.prompt.substring(0, 50)}...`);

      try {
        // Create prediction
        const prediction = await createPrediction({
          version: this.modelVersion,
          input: { prompt: task.prompt },
          jq_filter: "{id, status, urls}"
        });

        // Poll for completion
        const completed = await pollUntilComplete(prediction.id);

        if (completed.status === "succeeded") {
          // Download output
          const output = await downloadOutput(completed.output);

          this.results.push({
            taskId: task.id,
            prompt: task.prompt,
            predictionId: completed.id,
            output,
            metrics: completed.metrics,
            workerId
          });

          task.status = "complete";

        } else {
          throw new Error(completed.error || "Prediction failed");
        }

      } catch (error) {
        console.error(`Worker ${workerId} error:`, error.message);

        // Retry logic
        if (task.retries < 3) {
          task.retries++;
          task.status = "queued";
          this.queue.push(task); // Re-queue
          console.log(`Worker ${workerId} re-queued task (retry ${task.retries})`);
        } else {
          this.errors.push({
            taskId: task.id,
            prompt: task.prompt,
            error: error.message,
            workerId
          });
          task.status = "failed";
        }
      }

      // Progress callback
      this.onProgress({
        completed: this.results.length + this.errors.length,
        remaining: this.queue.length,
        workerId
      });
    }

    console.log(`Worker ${workerId} finished`);
  }
}

// Usage
const queue = new ImageGenerationQueue(modelVersion, {
  maxWorkers: 10,
  onProgress: (progress) => {
    console.log(
      `Progress: ${progress.completed} completed, ${progress.remaining} remaining`
    );
  },
  onComplete: (summary) => {
    console.log(
      `Queue complete: ${summary.successful}/${summary.total} successful`
    );
  }
});

queue.addPrompts(oneHundredPrompts);
const { results, errors } = await queue.process();
```

---

## Common Batch Scenarios

### Scenario 1: Generate 5-10 Variations with Reference Image

**Use Case:** Logo variations, product shots with different styles

```javascript
async function generateVariations(
  referenceImage,
  basePrompt,
  variations,
  modelVersion
) {
  console.log(`Generating ${variations.length} variations of: ${basePrompt}`);

  // Create prompts with variations
  const prompts = variations.map(variation => ({
    image: referenceImage, // Same reference for all
    prompt: `${basePrompt}, ${variation}`,
    variation
  }));

  // Generate in parallel (small batch)
  const predictions = await Promise.all(
    prompts.map(({ image, prompt }) =>
      createPrediction({
        version: modelVersion,
        input: {
          image,
          prompt,
          strength: 0.7 // Variation strength
        },
        jq_filter: "{id, status, urls}"
      })
    )
  );

  // Poll all
  const completed = await Promise.all(
    predictions.map(p => pollUntilComplete(p.id))
  );

  // Download and organize
  const results = await Promise.all(
    completed.map(async (prediction, index) => {
      const output = await downloadOutput(prediction.output);
      return {
        variation: prompts[index].variation,
        prompt: prompts[index].prompt,
        output,
        predictionId: prediction.id
      };
    })
  );

  return results;
}

// Usage: Logo color variations
const logoVariations = await generateVariations(
  "https://example.com/logo.png",
  "Modern tech company logo",
  [
    "blue and white color scheme",
    "green and black color scheme",
    "purple gradient",
    "orange accent color",
    "red and gray tones",
    "monochrome black",
    "gold and navy",
    "teal and coral"
  ],
  "black-forest-labs/flux-dev"
);
```

### Scenario 2: Generate Images from Different Prompts

**Use Case:** Social media campaign, diverse content library

```javascript
async function generateCampaignAssets(campaign, modelVersion) {
  const { theme, platforms, variations } = campaign;

  // Build comprehensive prompt list
  const prompts = [];

  platforms.forEach(platform => {
    variations.forEach(variation => {
      prompts.push({
        platform,
        variation,
        prompt: buildPrompt(theme, platform, variation),
        metadata: {
          theme,
          platform,
          variation
        }
      });
    });
  });

  console.log(`Generating ${prompts.length} campaign assets`);

  // Process in batches
  const { results, errors } = await generateImagesBatched(
    prompts.map(p => p.prompt),
    modelVersion,
    {
      batchSize: 5,
      concurrency: 10,
      onBatchComplete: (batch) => {
        console.log(`Batch ${batch.batch}: ${batch.successful} assets generated`);
      }
    }
  );

  // Organize by platform and variation
  const organized = {};
  results.forEach((result, index) => {
    const { platform, variation } = prompts[index].metadata;

    if (!organized[platform]) organized[platform] = {};
    if (!organized[platform][variation]) organized[platform][variation] = [];

    organized[platform][variation].push(result.output);
  });

  return {
    assets: organized,
    errors,
    summary: {
      total: prompts.length,
      generated: results.length,
      failed: errors.length
    }
  };
}

// Helper: Build platform-specific prompt
function buildPrompt(theme, platform, variation) {
  const aspectRatios = {
    instagram_post: "1:1 square format",
    instagram_story: "9:16 vertical format",
    facebook_ad: "1.91:1 landscape",
    twitter_header: "3:1 wide banner"
  };

  return `${theme}, ${variation}, ${aspectRatios[platform]}, high quality, professional`;
}

// Usage
const campaignAssets = await generateCampaignAssets(
  {
    theme: "Summer product launch",
    platforms: ["instagram_post", "instagram_story", "facebook_ad", "twitter_header"],
    variations: ["vibrant colors", "minimalist", "lifestyle shot", "product focus"]
  },
  modelVersion
);

console.log("Generated assets by platform:", Object.keys(campaignAssets.assets));
```

### Scenario 3: A/B Testing Different Reference Images

**Use Case:** Style testing, mood exploration

```javascript
async function generateABTestAssets(
  referenceImages,
  prompt,
  modelVersion
) {
  console.log(`Generating A/B test with ${referenceImages.length} reference styles`);

  // Generate one output per reference image
  const variants = referenceImages.map((image, index) => ({
    variant: String.fromCharCode(65 + index), // A, B, C...
    image,
    prompt: `${prompt}, reference style from provided image`
  }));

  // Process in parallel
  const predictions = await Promise.all(
    variants.map(({ image, prompt }) =>
      createPrediction({
        version: modelVersion,
        input: { image, prompt },
        jq_filter: "{id, status, urls}"
      })
    )
  );

  const completed = await Promise.all(
    predictions.map(p => pollUntilComplete(p.id))
  );

  const results = await Promise.all(
    completed.map(async (prediction, index) => {
      const output = await downloadOutput(prediction.output);
      return {
        variant: variants[index].variant,
        referenceImage: variants[index].image,
        output,
        predictionId: prediction.id,
        metrics: prediction.metrics
      };
    })
  );

  return results;
}

// Usage: Test 3 different style references
const abTest = await generateABTestAssets(
  [
    "https://example.com/style-modern.jpg",
    "https://example.com/style-classic.jpg",
    "https://example.com/style-minimal.jpg"
  ],
  "Professional product photography, white background, studio lighting",
  modelVersion
);

console.log("A/B test variants:", abTest.map(r => r.variant));
```

### Scenario 4: Compare Multiple Model Outputs

**Use Case:** Model quality comparison, output selection

```javascript
async function compareModels(prompt, models) {
  console.log(`Comparing ${models.length} models for prompt: ${prompt}`);

  // Create predictions across all models in parallel
  const predictions = await Promise.all(
    models.map(model =>
      createPrediction({
        version: model.version,
        input: { prompt },
        jq_filter: "{id, status, urls}"
      }).then(prediction => ({
        modelName: model.name,
        modelVersion: model.version,
        prediction
      }))
    )
  );

  // Poll all predictions
  const completed = await Promise.all(
    predictions.map(({ modelName, modelVersion, prediction }) =>
      pollUntilComplete(prediction.id).then(completed => ({
        modelName,
        modelVersion,
        completed
      }))
    )
  );

  // Download all outputs
  const results = await Promise.all(
    completed.map(async ({ modelName, modelVersion, completed }) => {
      const output = await downloadOutput(completed.output);
      return {
        modelName,
        modelVersion,
        output,
        metrics: completed.metrics,
        predictionId: completed.id
      };
    })
  );

  // Sort by processing time
  results.sort((a, b) =>
    a.metrics.predict_time - b.metrics.predict_time
  );

  return {
    prompt,
    results,
    fastest: results[0],
    comparison: results.map(r => ({
      model: r.modelName,
      time: r.metrics.predict_time,
      totalTime: r.metrics.total_time
    }))
  };
}

// Usage: Compare FLUX vs SDXL vs Qwen
const comparison = await compareModels(
  "Futuristic cityscape at night, neon lights, cyberpunk aesthetic",
  [
    { name: "FLUX Dev", version: "black-forest-labs/flux-dev" },
    { name: "SDXL", version: "stability-ai/sdxl:da77bc59..." },
    { name: "Qwen Image", version: "qwen/qwen-image-edit-plus" }
  ]
);

console.log("Model comparison:");
comparison.comparison.forEach(c => {
  console.log(`  ${c.model}: ${c.time.toFixed(2)}s (total: ${c.totalTime.toFixed(2)}s)`);
});
console.log(`Fastest: ${comparison.fastest.modelName}`);
```

### Scenario 5: Progressive Refinement

**Use Case:** Iterative improvement, best-of-N selection

```javascript
async function progressiveRefinement(
  initialPrompt,
  modelVersion,
  options = {}
) {
  const {
    initialVariations = 10,
    refinementRounds = 2,
    topN = 3,
    onRoundComplete = () => {}
  } = options;

  let currentPrompt = initialPrompt;
  let currentOutputs = [];
  const history = [];

  // Round 1: Generate initial variations
  console.log(`Round 1: Generating ${initialVariations} initial variations`);

  const round1Prompts = Array(initialVariations).fill(currentPrompt);
  const round1Results = await generateImagesParallel(round1Prompts, modelVersion);

  currentOutputs = round1Results;
  history.push({
    round: 1,
    prompt: currentPrompt,
    count: initialVariations,
    outputs: round1Results
  });

  onRoundComplete({
    round: 1,
    generated: initialVariations,
    prompt: currentPrompt
  });

  // Subsequent rounds: Refine top N
  for (let round = 2; round <= refinementRounds + 1; round++) {
    console.log(`Round ${round}: Refining top ${topN} outputs`);

    // Select top N (in production, use quality scoring)
    const topOutputs = currentOutputs.slice(0, topN);

    // Generate variations of each top output
    const refinementPrompts = topOutputs.map(output => ({
      image: output.output,
      prompt: `${currentPrompt}, refined and improved`,
      strength: 0.6 // Moderate variation
    }));

    const refinementResults = await Promise.all(
      refinementPrompts.map(({ image, prompt, strength }) =>
        createPrediction({
          version: modelVersion,
          input: { image, prompt, strength },
          jq_filter: "{id, status, urls}"
        })
      )
    );

    const completed = await Promise.all(
      refinementResults.map(p => pollUntilComplete(p.id))
    );

    const downloaded = await Promise.all(
      completed.map(async (prediction, index) => ({
        predictionId: prediction.id,
        output: await downloadOutput(prediction.output),
        metrics: prediction.metrics,
        parentIndex: index
      }))
    );

    currentOutputs = downloaded;
    history.push({
      round,
      prompt: currentPrompt,
      count: downloaded.length,
      outputs: downloaded
    });

    onRoundComplete({
      round,
      generated: downloaded.length,
      prompt: currentPrompt
    });
  }

  return {
    finalOutputs: currentOutputs,
    history,
    totalGenerated: history.reduce((sum, h) => sum + h.count, 0)
  };
}

// Usage
const refinement = await progressiveRefinement(
  "Professional logo for AI startup, modern, minimalist",
  modelVersion,
  {
    initialVariations: 10,
    refinementRounds: 2,
    topN: 3,
    onRoundComplete: (round) => {
      console.log(
        `Round ${round.round} complete: ${round.generated} images generated`
      );
    }
  }
);

console.log(`Total images generated: ${refinement.totalGenerated}`);
console.log(`Final outputs: ${refinement.finalOutputs.length}`);
```

### Scenario 6: Batch Multi-Image Composition

**Use Case:** Product+background combinations, collage generation

```javascript
async function batchMultiImageComposition(
  combinations,
  modelVersion = "google/nano-banana"
) {
  console.log(`Generating ${combinations.length} multi-image compositions`);

  // Each combination has multiple input images
  const predictions = await Promise.all(
    combinations.map(({ images, prompt, metadata }) =>
      createPrediction({
        version: modelVersion,
        input: {
          prompt,
          image_input: images, // Array of image URLs
          aspect_ratio: "match_input_image"
        },
        jq_filter: "{id, status, urls}"
      }).then(prediction => ({
        metadata,
        prediction
      }))
    )
  );

  // Poll all compositions
  const completed = await Promise.all(
    predictions.map(({ metadata, prediction }) =>
      pollUntilComplete(prediction.id).then(completed => ({
        metadata,
        completed
      }))
    )
  );

  // Download outputs
  const results = await Promise.all(
    completed.map(async ({ metadata, completed }) => {
      const output = await downloadOutput(completed.output);
      return {
        ...metadata,
        output,
        predictionId: completed.id,
        metrics: completed.metrics
      };
    })
  );

  return results;
}

// Usage: Generate 10 product+background combinations
const products = [
  "https://example.com/product1.png",
  "https://example.com/product2.png"
];

const backgrounds = [
  "https://example.com/bg-office.jpg",
  "https://example.com/bg-home.jpg",
  "https://example.com/bg-outdoor.jpg",
  "https://example.com/bg-studio.jpg",
  "https://example.com/bg-lifestyle.jpg"
];

// Create all combinations
const combinations = products.flatMap(product =>
  backgrounds.map(background => ({
    images: [product, background],
    prompt: "Seamlessly blend product onto background, professional lighting, natural placement",
    metadata: {
      product,
      background,
      type: "product_placement"
    }
  }))
);

const compositions = await batchMultiImageComposition(
  combinations,
  "google/nano-banana"
);

console.log(`Generated ${compositions.length} product+background compositions`);
```

---

## Error Handling Strategies

### 1. Prediction-Level Errors

```javascript
/**
 * Handle errors at prediction level
 */
async function createPredictionWithErrorHandling(input, modelVersion) {
  try {
    const prediction = await createPrediction({
      version: modelVersion,
      input,
      jq_filter: "{id, status, urls, error}"
    });

    return { success: true, prediction };

  } catch (error) {
    // Handle creation errors
    if (error.status === 422) {
      return {
        success: false,
        error: "Invalid input parameters",
        details: error.message,
        recoverable: true,
        suggestion: "Check input schema and retry"
      };
    }

    if (error.status === 429) {
      return {
        success: false,
        error: "Rate limit exceeded",
        details: error.message,
        recoverable: true,
        suggestion: "Wait and retry, or reduce concurrency"
      };
    }

    if (error.status === 401 || error.status === 403) {
      return {
        success: false,
        error: "Authentication failed",
        details: error.message,
        recoverable: false,
        suggestion: "Check API token"
      };
    }

    // Unknown error
    return {
      success: false,
      error: "Unknown error",
      details: error.message,
      recoverable: true,
      suggestion: "Retry with exponential backoff"
    };
  }
}
```

### 2. Polling Timeout Handling

```javascript
/**
 * Poll with timeout and graceful degradation
 */
async function pollUntilCompleteWithTimeout(
  predictionId,
  options = {}
) {
  const {
    maxAttempts = 300, // 5 minutes at 1s intervals
    pollInterval = 1000,
    onTimeout = null
  } = options;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const prediction = await getPrediction({
        prediction_id: predictionId,
        jq_filter: "{status, output, error, metrics}"
      });

      // Check terminal states
      if (prediction.status === "succeeded") {
        return { success: true, prediction };
      }

      if (prediction.status === "failed") {
        return {
          success: false,
          error: prediction.error,
          predictionId
        };
      }

      if (prediction.status === "canceled") {
        return {
          success: false,
          error: "Prediction was canceled",
          predictionId
        };
      }

      // Still processing
      await sleep(pollInterval);

    } catch (error) {
      console.error(`Polling error for ${predictionId}:`, error.message);

      // Retry polling after error
      await sleep(pollInterval * 2);
    }
  }

  // Timeout reached
  const timeoutResult = {
    success: false,
    error: "Polling timeout",
    predictionId,
    attempts: maxAttempts,
    duration: maxAttempts * pollInterval
  };

  if (onTimeout) {
    await onTimeout(timeoutResult);
  }

  return timeoutResult;
}
```

### 3. Batch-Level Error Recovery

```javascript
/**
 * Batch processing with error recovery and retry
 */
async function generateImagesWithRecovery(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    maxRetries = 3,
    retryDelay = 2000,
    onError = () => {}
  } = options;

  const attempts = prompts.map(prompt => ({
    prompt,
    retries: 0,
    status: "pending"
  }));

  const results = [];
  const failures = [];

  while (attempts.some(a => a.status === "pending" && a.retries < maxRetries)) {
    // Get pending attempts
    const pending = attempts.filter(
      a => a.status === "pending" && a.retries < maxRetries
    );

    console.log(
      `Processing ${pending.length} tasks (retry batch ${pending[0]?.retries || 0})`
    );

    // Process batch
    const batchResults = await Promise.allSettled(
      pending.map(async (attempt) => {
        const prediction = await createPrediction({
          version: modelVersion,
          input: { prompt: attempt.prompt },
          jq_filter: "{id, status, urls}"
        });

        const completed = await pollUntilComplete(prediction.id);

        if (completed.status === "succeeded") {
          const output = await downloadOutput(completed.output);
          return {
            attempt,
            output,
            predictionId: completed.id,
            metrics: completed.metrics
          };
        } else {
          throw new Error(completed.error);
        }
      })
    );

    // Process results
    batchResults.forEach((result, index) => {
      const attempt = pending[index];

      if (result.status === "fulfilled") {
        attempt.status = "complete";
        results.push(result.value);
      } else {
        attempt.retries++;

        if (attempt.retries >= maxRetries) {
          attempt.status = "failed";
          failures.push({
            prompt: attempt.prompt,
            error: result.reason.message,
            retries: attempt.retries
          });

          onError({
            prompt: attempt.prompt,
            error: result.reason.message,
            finalRetry: true
          });
        } else {
          onError({
            prompt: attempt.prompt,
            error: result.reason.message,
            retry: attempt.retries
          });
        }
      }
    });

    // Delay before retry batch
    if (pending.some(a => a.status === "pending" && a.retries < maxRetries)) {
      await sleep(retryDelay);
    }
  }

  return {
    results,
    failures,
    summary: {
      total: prompts.length,
      successful: results.length,
      failed: failures.length
    }
  };
}
```

### 4. Graceful Degradation

```javascript
/**
 * Generate images with fallback models
 */
async function generateWithFallback(prompts, models) {
  const results = [];
  const errors = [];

  for (const prompt of prompts) {
    let success = false;

    // Try each model in order
    for (let i = 0; i < models.length; i++) {
      const model = models[i];

      console.log(
        `Trying ${model.name} for prompt: ${prompt.substring(0, 50)}...`
      );

      try {
        const prediction = await createPrediction({
          version: model.version,
          input: { prompt },
          jq_filter: "{id, status, urls}"
        });

        const completed = await pollUntilComplete(prediction.id);

        if (completed.status === "succeeded") {
          const output = await downloadOutput(completed.output);

          results.push({
            prompt,
            output,
            modelUsed: model.name,
            fallbackLevel: i,
            predictionId: completed.id
          });

          success = true;
          break; // Success, no need to try other models
        }

      } catch (error) {
        console.warn(`${model.name} failed: ${error.message}`);

        if (i === models.length - 1) {
          // Last model also failed
          errors.push({
            prompt,
            error: "All models failed",
            attempts: models.map(m => m.name)
          });
        }
        // Try next model
      }
    }
  }

  return { results, errors };
}

// Usage with fallback chain
const { results, errors } = await generateWithFallback(
  prompts,
  [
    { name: "Primary (FLUX)", version: "black-forest-labs/flux-dev" },
    { name: "Fallback (SDXL)", version: "stability-ai/sdxl:..." },
    { name: "Last Resort (Qwen)", version: "qwen/qwen-image-edit-plus" }
  ]
);
```

---

## Performance Optimization

### 1. Optimal Batch Sizing

```javascript
/**
 * Dynamically determine optimal batch size based on model speed
 */
async function determineBatchSize(modelVersion) {
  console.log("Benchmarking model speed...");

  // Run 3 test predictions
  const testPrompts = [
    "A simple test image",
    "Another test image",
    "One more test"
  ];

  const startTime = Date.now();

  const predictions = await Promise.all(
    testPrompts.map(prompt =>
      createPrediction({
        version: modelVersion,
        input: { prompt },
        jq_filter: "{id}"
      })
    )
  );

  const completed = await Promise.all(
    predictions.map(p => pollUntilComplete(p.id))
  );

  const avgTime = (Date.now() - startTime) / testPrompts.length;

  // Determine batch size based on speed
  let batchSize;
  if (avgTime < 5000) {
    batchSize = 20; // Fast model (< 5s)
  } else if (avgTime < 15000) {
    batchSize = 10; // Medium model (5-15s)
  } else {
    batchSize = 5; // Slow model (> 15s)
  }

  console.log(
    `Model average time: ${avgTime.toFixed(0)}ms, recommended batch size: ${batchSize}`
  );

  return batchSize;
}

// Usage
const optimalBatchSize = await determineBatchSize(modelVersion);
const results = await generateImagesBatched(prompts, modelVersion, {
  batchSize: optimalBatchSize
});
```

### 2. Smart Polling with Adaptive Intervals

```javascript
/**
 * Adaptive polling that adjusts interval based on prediction state
 */
async function pollAdaptive(predictionId) {
  let pollInterval = 500; // Start fast
  const maxInterval = 5000; // Cap at 5 seconds
  let attempts = 0;

  while (true) {
    const prediction = await getPrediction({
      prediction_id: predictionId,
      jq_filter: "{status, output, error}"
    });

    // Terminal states
    if (["succeeded", "failed", "canceled"].includes(prediction.status)) {
      return prediction;
    }

    // Adaptive interval
    if (prediction.status === "starting" && attempts < 5) {
      pollInterval = 500; // Fast polling during startup
    } else if (prediction.status === "processing") {
      pollInterval = Math.min(pollInterval * 1.2, maxInterval); // Gradually slower
    }

    await sleep(pollInterval);
    attempts++;
  }
}
```

### 3. Prediction Result Caching

```javascript
/**
 * Cache prediction results to avoid duplicate API calls
 */
class PredictionCache {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Generate cache key from input
   */
  getCacheKey(input) {
    // Simple hash of input parameters
    return JSON.stringify({
      prompt: input.prompt,
      model: input.modelVersion,
      // Add other relevant parameters
    });
  }

  /**
   * Check if result is cached
   */
  get(input) {
    const key = this.getCacheKey(input);
    const cached = this.cache.get(key);

    if (cached) {
      console.log(`Cache hit for: ${input.prompt.substring(0, 50)}...`);
      return cached;
    }

    return null;
  }

  /**
   * Store result in cache
   */
  set(input, result) {
    const key = this.getCacheKey(input);
    this.cache.set(key, {
      ...result,
      cachedAt: Date.now()
    });
  }

  /**
   * Generate with caching
   */
  async generateWithCache(input) {
    // Check cache first
    const cached = this.get(input);
    if (cached) return cached;

    // Generate new
    const prediction = await createPrediction({
      version: input.modelVersion,
      input: { prompt: input.prompt },
      jq_filter: "{id, status, urls}"
    });

    const completed = await pollUntilComplete(prediction.id);
    const output = await downloadOutput(completed.output);

    const result = {
      prompt: input.prompt,
      output,
      predictionId: completed.id,
      metrics: completed.metrics
    };

    // Store in cache
    this.set(input, result);

    return result;
  }
}

// Usage
const cache = new PredictionCache();

const results = await Promise.all(
  prompts.map(prompt =>
    cache.generateWithCache({
      prompt,
      modelVersion
    })
  )
);
```

### 4. Progressive Output Delivery

```javascript
/**
 * Stream results as they complete (for long batches)
 */
async function* generateImagesStreaming(prompts, modelVersion) {
  // Create all predictions
  const predictions = await Promise.all(
    prompts.map(async (prompt, index) => ({
      index,
      prompt,
      prediction: await createPrediction({
        version: modelVersion,
        input: { prompt },
        jq_filter: "{id, status, urls}"
      })
    }))
  );

  // Track completion
  const pending = new Set(predictions.map(p => p.index));
  const results = new Map();

  // Poll all predictions, yield as they complete
  while (pending.size > 0) {
    await Promise.all(
      Array.from(pending).map(async (index) => {
        const { prompt, prediction } = predictions[index];

        const status = await getPrediction({
          prediction_id: prediction.id,
          jq_filter: "{status, output, error, metrics}"
        });

        if (["succeeded", "failed", "canceled"].includes(status.status)) {
          pending.delete(index);

          if (status.status === "succeeded") {
            const output = await downloadOutput(status.output);
            results.set(index, {
              index,
              prompt,
              output,
              metrics: status.metrics
            });
          }
        }
      })
    );

    // Yield any newly completed results
    for (const [index, result] of results.entries()) {
      if (result) {
        yield result;
        results.set(index, null); // Mark as yielded
      }
    }

    if (pending.size > 0) {
      await sleep(1000);
    }
  }
}

// Usage: Process results as they arrive
for await (const result of generateImagesStreaming(fiftyPrompts, modelVersion)) {
  console.log(`Completed ${result.index}: ${result.prompt}`);
  await processResult(result); // Process immediately
}
```

### 5. Memory-Efficient Large Batch Processing

```javascript
/**
 * Process very large batches without loading all outputs into memory
 */
async function generateImagesLargeBatch(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    batchSize = 10,
    onResult = null, // Callback to handle each result immediately
    tempDir = "./temp_outputs"
  } = options;

  const metadata = {
    total: prompts.length,
    processed: 0,
    successful: 0,
    failed: 0,
    outputFiles: []
  };

  // Process in batches
  for (let i = 0; i < prompts.length; i += batchSize) {
    const batchPrompts = prompts.slice(i, Math.min(i + batchSize, prompts.length));

    console.log(
      `Processing batch ${Math.floor(i / batchSize) + 1} (${batchPrompts.length} prompts)`
    );

    // Process batch
    const predictions = await Promise.all(
      batchPrompts.map(prompt =>
        createPrediction({
          version: modelVersion,
          input: { prompt },
          jq_filter: "{id, status, urls}"
        })
      )
    );

    const completed = await Promise.all(
      predictions.map(p => pollUntilComplete(p.id))
    );

    // Download and save each result immediately (don't hold in memory)
    for (let j = 0; j < completed.length; j++) {
      const prediction = completed[j];
      const prompt = batchPrompts[j];

      if (prediction.status === "succeeded") {
        // Download to temp file
        const filename = `output_${i + j}_${Date.now()}.png`;
        const filepath = `${tempDir}/${filename}`;

        await downloadAndSaveOutput(prediction.output, filepath);

        metadata.outputFiles.push({
          index: i + j,
          prompt,
          filepath,
          predictionId: prediction.id,
          metrics: prediction.metrics
        });

        metadata.successful++;

        // Handle result immediately if callback provided
        if (onResult) {
          await onResult({
            index: i + j,
            prompt,
            filepath,
            metrics: prediction.metrics
          });
        }

      } else {
        metadata.failed++;
      }

      metadata.processed++;
    }

    console.log(
      `Progress: ${metadata.processed}/${metadata.total} (${metadata.successful} successful)`
    );
  }

  // Save metadata manifest
  const manifestPath = `${tempDir}/manifest.json`;
  await fs.writeFile(manifestPath, JSON.stringify(metadata, null, 2));

  return {
    metadata,
    manifestPath
  };
}

// Usage: Process 1000 images without memory overflow
const { metadata, manifestPath } = await generateImagesLargeBatch(
  thousandPrompts,
  modelVersion,
  {
    batchSize: 10,
    tempDir: "./batch_outputs",
    onResult: async (result) => {
      // Upload to S3 immediately, then delete local file
      await uploadToS3(result.filepath);
      await fs.unlink(result.filepath);
      console.log(`Uploaded and cleaned: ${result.index}`);
    }
  }
);

console.log(`Batch complete. Manifest: ${manifestPath}`);
```

---

## Cost Management

### 1. Cost Tracking

```javascript
/**
 * Track costs across batch generation
 */
class CostTracker {
  constructor(modelPricing) {
    this.modelPricing = modelPricing; // { modelVersion: costPerRun }
    this.predictions = [];
    this.totalCost = 0;
  }

  /**
   * Record a prediction
   */
  recordPrediction(modelVersion, predictionId, metrics) {
    const cost = this.modelPricing[modelVersion] || 0;

    this.predictions.push({
      predictionId,
      modelVersion,
      cost,
      runtime: metrics.predict_time,
      totalTime: metrics.total_time
    });

    this.totalCost += cost;
  }

  /**
   * Get cost summary
   */
  getSummary() {
    const byModel = {};

    this.predictions.forEach(p => {
      if (!byModel[p.modelVersion]) {
        byModel[p.modelVersion] = {
          count: 0,
          totalCost: 0,
          avgRuntime: 0
        };
      }

      byModel[p.modelVersion].count++;
      byModel[p.modelVersion].totalCost += p.cost;
      byModel[p.modelVersion].avgRuntime += p.runtime;
    });

    // Calculate averages
    Object.values(byModel).forEach(model => {
      model.avgRuntime = model.avgRuntime / model.count;
    });

    return {
      totalPredictions: this.predictions.length,
      totalCost: this.totalCost,
      byModel,
      avgCostPerPrediction: this.totalCost / this.predictions.length
    };
  }
}

// Usage with cost tracking
const costTracker = new CostTracker({
  "black-forest-labs/flux-dev": 0.05, // $0.05 per run
  "stability-ai/sdxl:...": 0.03,
  "google/nano-banana": 0.04
});

async function generateWithCostTracking(prompts, modelVersion) {
  const results = [];

  for (const prompt of prompts) {
    const prediction = await createPrediction({
      version: modelVersion,
      input: { prompt }
    });

    const completed = await pollUntilComplete(prediction.id);

    // Track cost
    costTracker.recordPrediction(
      modelVersion,
      completed.id,
      completed.metrics
    );

    if (completed.status === "succeeded") {
      const output = await downloadOutput(completed.output);
      results.push({ prompt, output });
    }
  }

  // Print cost summary
  const summary = costTracker.getSummary();
  console.log("\nCost Summary:");
  console.log(`Total predictions: ${summary.totalPredictions}`);
  console.log(`Total cost: $${summary.totalCost.toFixed(2)}`);
  console.log(`Average cost: $${summary.avgCostPerPrediction.toFixed(4)}`);

  return results;
}
```

### 2. Budget-Aware Batch Processing

```javascript
/**
 * Generate images within budget constraints
 */
async function generateWithinBudget(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    maxBudget = 10.0, // $10 max
    costPerRun = 0.05, // $0.05 per prediction
    onBudgetWarning = () => {}
  } = options;

  const maxPredictions = Math.floor(maxBudget / costPerRun);

  if (prompts.length > maxPredictions) {
    console.warn(
      `Budget allows ${maxPredictions} predictions, but ${prompts.length} requested`
    );
    console.warn(`Limiting to ${maxPredictions} predictions`);

    onBudgetWarning({
      requested: prompts.length,
      allowed: maxPredictions,
      budget: maxBudget
    });

    prompts = prompts.slice(0, maxPredictions);
  }

  const results = await generateImagesParallel(prompts, modelVersion);

  const actualCost = results.length * costPerRun;
  const remaining = maxBudget - actualCost;

  return {
    results,
    cost: {
      actual: actualCost,
      budget: maxBudget,
      remaining,
      percentUsed: (actualCost / maxBudget) * 100
    }
  };
}

// Usage
const { results, cost } = await generateWithinBudget(
  fiftyPrompts,
  modelVersion,
  {
    maxBudget: 2.0,
    costPerRun: 0.05,
    onBudgetWarning: (warning) => {
      console.log(
        `⚠️ Budget limit: generating ${warning.allowed}/${warning.requested} images`
      );
    }
  }
);

console.log(`Generated ${results.length} images for $${cost.actual.toFixed(2)}`);
console.log(`Remaining budget: $${cost.remaining.toFixed(2)}`);
```

### 3. Cost Optimization Strategies

```javascript
/**
 * Select most cost-effective model based on requirements
 */
function selectModelByCost(requirements) {
  const models = [
    {
      name: "FLUX Dev",
      version: "black-forest-labs/flux-dev",
      cost: 0.05,
      speed: "fast",
      quality: "high",
      useCase: "general"
    },
    {
      name: "SDXL",
      version: "stability-ai/sdxl:...",
      cost: 0.03,
      speed: "medium",
      quality: "high",
      useCase: "general"
    },
    {
      name: "Nano Banana",
      version: "google/nano-banana",
      cost: 0.04,
      speed: "medium",
      quality: "high",
      useCase: "multi-image"
    }
  ];

  // Filter by requirements
  let candidates = models.filter(m => {
    if (requirements.maxCost && m.cost > requirements.maxCost) return false;
    if (requirements.minQuality && m.quality !== requirements.minQuality) return false;
    if (requirements.useCase && m.useCase !== requirements.useCase) return false;
    return true;
  });

  // Sort by cost (ascending)
  candidates.sort((a, b) => a.cost - b.cost);

  // Return cheapest that meets requirements
  return candidates[0] || models[0];
}

// Usage
const selectedModel = selectModelByCost({
  maxCost: 0.04,
  minQuality: "high",
  useCase: "general"
});

console.log(`Selected model: ${selectedModel.name} ($${selectedModel.cost}/run)`);

const results = await generateImagesParallel(prompts, selectedModel.version);
const totalCost = results.length * selectedModel.cost;
console.log(`Total cost: $${totalCost.toFixed(2)}`);
```

---

## Production Best Practices

### 1. Comprehensive Monitoring

```javascript
/**
 * Production-ready batch generation with full monitoring
 */
async function generateImagesProduction(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    batchSize = 10,
    maxRetries = 3,
    monitoring = {} // Monitoring hooks
  } = options;

  const stats = {
    startTime: Date.now(),
    totalPrompts: prompts.length,
    created: 0,
    completed: 0,
    failed: 0,
    retried: 0,
    totalCost: 0,
    predictions: []
  };

  // Emit start event
  monitoring.onStart?.({
    totalPrompts: stats.totalPrompts,
    batchSize,
    modelVersion
  });

  const results = [];
  const errors = [];

  // Process in batches
  for (let i = 0; i < prompts.length; i += batchSize) {
    const batchPrompts = prompts.slice(i, Math.min(i + batchSize, prompts.length));
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(prompts.length / batchSize);

    monitoring.onBatchStart?.({
      batch: batchNumber,
      totalBatches,
      size: batchPrompts.length
    });

    try {
      // Create predictions
      const predictions = await Promise.all(
        batchPrompts.map(prompt =>
          createPrediction({
            version: modelVersion,
            input: { prompt },
            jq_filter: "{id, status, urls}"
          })
        )
      );

      stats.created += predictions.length;

      monitoring.onPredictionsCreated?.({
        batch: batchNumber,
        count: predictions.length,
        total: stats.created
      });

      // Poll predictions
      const completed = await Promise.all(
        predictions.map(p => pollUntilComplete(p.id))
      );

      // Process results
      for (let j = 0; j < completed.length; j++) {
        const prediction = completed[j];
        const prompt = batchPrompts[j];

        if (prediction.status === "succeeded") {
          const output = await downloadOutput(prediction.output);

          results.push({
            index: i + j,
            prompt,
            output,
            predictionId: prediction.id,
            metrics: prediction.metrics
          });

          stats.completed++;

          monitoring.onPredictionComplete?.({
            index: i + j,
            predictionId: prediction.id,
            runtime: prediction.metrics.predict_time,
            totalTime: prediction.metrics.total_time
          });

        } else {
          errors.push({
            index: i + j,
            prompt,
            error: prediction.error
          });

          stats.failed++;

          monitoring.onPredictionFailed?.({
            index: i + j,
            error: prediction.error
          });
        }

        // Track prediction
        stats.predictions.push({
          predictionId: prediction.id,
          status: prediction.status,
          runtime: prediction.metrics?.predict_time
        });
      }

      monitoring.onBatchComplete?.({
        batch: batchNumber,
        successful: batchPrompts.length - (errors.length - stats.failed),
        failed: errors.length - stats.failed,
        elapsed: Date.now() - stats.startTime
      });

    } catch (error) {
      monitoring.onBatchError?.({
        batch: batchNumber,
        error: error.message
      });
    }
  }

  // Final stats
  stats.endTime = Date.now();
  stats.totalTime = stats.endTime - stats.startTime;
  stats.avgTimePerImage = stats.totalTime / stats.completed;

  monitoring.onComplete?.({
    stats,
    results: results.length,
    errors: errors.length
  });

  return {
    results,
    errors,
    stats
  };
}

// Usage with comprehensive monitoring
const { results, errors, stats } = await generateImagesProduction(
  prompts,
  modelVersion,
  {
    batchSize: 10,
    monitoring: {
      onStart: (event) => {
        console.log(`Starting batch: ${event.totalPrompts} images`);
        // Log to monitoring service
        sendMetric("batch.start", { count: event.totalPrompts });
      },

      onBatchStart: (event) => {
        console.log(`Batch ${event.batch}/${event.totalBatches} started`);
      },

      onPredictionsCreated: (event) => {
        console.log(`Created ${event.count} predictions (${event.total} total)`);
        sendMetric("predictions.created", { count: event.count });
      },

      onPredictionComplete: (event) => {
        console.log(`Image ${event.index} complete (${event.runtime.toFixed(2)}s)`);
        sendMetric("prediction.complete", {
          runtime: event.runtime,
          totalTime: event.totalTime
        });
      },

      onPredictionFailed: (event) => {
        console.error(`Image ${event.index} failed: ${event.error}`);
        sendMetric("prediction.failed", { error: event.error });
      },

      onBatchComplete: (event) => {
        console.log(
          `Batch ${event.batch} complete: ${event.successful} successful, ${event.failed} failed`
        );
        sendMetric("batch.complete", {
          successful: event.successful,
          failed: event.failed,
          elapsed: event.elapsed
        });
      },

      onBatchError: (event) => {
        console.error(`Batch ${event.batch} error: ${event.error}`);
        sendMetric("batch.error", { error: event.error });
      },

      onComplete: (event) => {
        console.log("\nBatch Generation Complete");
        console.log(`Total time: ${(event.stats.totalTime / 1000).toFixed(2)}s`);
        console.log(`Successful: ${event.results}/${event.stats.totalPrompts}`);
        console.log(`Failed: ${event.errors}`);
        console.log(`Avg time/image: ${(event.stats.avgTimePerImage / 1000).toFixed(2)}s`);

        sendMetric("batch.complete", {
          totalTime: event.stats.totalTime,
          successful: event.results,
          failed: event.errors,
          avgTime: event.stats.avgTimePerImage
        });
      }
    }
  }
);
```

### 2. Output Organization

```javascript
/**
 * Organize batch outputs with structured storage
 */
async function generateAndOrganize(
  prompts,
  modelVersion,
  options = {}
) {
  const {
    outputDir = "./outputs",
    organizeby = "date", // 'date' | 'prompt' | 'model'
    saveMetadata = true
  } = options;

  // Create organized directory structure
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const batchDir = `${outputDir}/batch_${timestamp}`;

  await fs.mkdir(batchDir, { recursive: true });

  console.log(`Output directory: ${batchDir}`);

  // Generate images
  const results = await generateImagesParallel(prompts, modelVersion);

  // Organize outputs
  for (let i = 0; i < results.length; i++) {
    const result = results[i];

    // Determine subdirectory based on organization strategy
    let subdir;
    switch (organizeby) {
      case "prompt":
        // Use first 30 chars of prompt as folder name
        subdir = sanitizeFilename(result.prompt.substring(0, 30));
        break;
      case "model":
        // Organize by model name
        subdir = modelVersion.split("/")[1];
        break;
      case "date":
      default:
        // Organize by date (default)
        subdir = new Date().toISOString().split("T")[0];
        break;
    }

    const targetDir = `${batchDir}/${subdir}`;
    await fs.mkdir(targetDir, { recursive: true });

    // Save image
    const filename = `image_${i}_${Date.now()}.png`;
    const filepath = `${targetDir}/${filename}`;

    await fs.writeFile(filepath, result.output);

    // Save metadata if enabled
    if (saveMetadata) {
      const metadataPath = filepath.replace(".png", "_metadata.json");
      await fs.writeFile(
        metadataPath,
        JSON.stringify({
          prompt: result.prompt,
          predictionId: result.predictionId,
          metrics: result.metrics,
          modelVersion,
          generatedAt: new Date().toISOString()
        }, null, 2)
      );
    }

    console.log(`Saved: ${filepath}`);
  }

  // Create batch manifest
  const manifestPath = `${batchDir}/manifest.json`;
  await fs.writeFile(
    manifestPath,
    JSON.stringify({
      batchId: timestamp,
      modelVersion,
      totalImages: results.length,
      prompts: prompts,
      organizeby,
      generatedAt: new Date().toISOString()
    }, null, 2)
  );

  console.log(`Manifest: ${manifestPath}`);

  return {
    batchDir,
    results,
    manifestPath
  };
}

// Helper: Sanitize filename
function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
```

### 3. Webhook Integration for Production

```javascript
/**
 * Production batch processing with webhooks for long-running jobs
 */
async function generateImagesWithWebhooks(
  prompts,
  modelVersion,
  webhookUrl,
  options = {}
) {
  const {
    batchSize = 10
  } = options;

  console.log(`Creating ${prompts.length} predictions with webhook notifications`);

  // Create all predictions with webhook
  const predictions = await Promise.all(
    prompts.map((prompt, index) =>
      createPrediction({
        version: modelVersion,
        input: { prompt },
        webhook: webhookUrl,
        webhook_events_filter: ["completed"],
        jq_filter: "{id, status, urls}"
      }).then(prediction => ({
        index,
        prompt,
        predictionId: prediction.id,
        status: "pending"
      }))
    )
  );

  console.log(`Created ${predictions.length} predictions`);
  console.log(`Webhook notifications will be sent to: ${webhookUrl}`);

  // Return prediction IDs immediately
  // Processing continues asynchronously via webhooks
  return {
    batchId: Date.now().toString(),
    predictions: predictions.map(p => ({
      index: p.index,
      prompt: p.prompt,
      predictionId: p.predictionId
    })),
    webhookUrl,
    message: "Batch processing started. Results will be sent to webhook."
  };
}

/**
 * Webhook handler (Express.js example)
 */
app.post("/webhook/predictions", async (req, res) => {
  const prediction = req.body;

  console.log(`Webhook received for prediction: ${prediction.id}`);

  if (prediction.status === "succeeded") {
    // Download and save output
    const output = await downloadOutput(prediction.output);
    const filepath = `./outputs/${prediction.id}.png`;

    await fs.writeFile(filepath, output);

    console.log(`Saved output: ${filepath}`);

    // Update database/state
    await updatePredictionStatus(prediction.id, {
      status: "complete",
      filepath,
      metrics: prediction.metrics
    });

    // Check if batch is complete
    const batchComplete = await checkBatchComplete(prediction.id);

    if (batchComplete) {
      console.log(`Batch complete for prediction: ${prediction.id}`);
      // Trigger post-processing, notifications, etc.
      await onBatchComplete(batchComplete.batchId);
    }

  } else if (prediction.status === "failed") {
    console.error(`Prediction failed: ${prediction.id}`, prediction.error);

    await updatePredictionStatus(prediction.id, {
      status: "failed",
      error: prediction.error
    });
  }

  res.status(200).send("OK");
});

// Usage
const batch = await generateImagesWithWebhooks(
  fiftyPrompts,
  modelVersion,
  "https://your-server.com/webhook/predictions",
  { batchSize: 10 }
);

console.log(`Batch ID: ${batch.batchId}`);
console.log(`Tracking ${batch.predictions.length} predictions`);
```

---

## Complete Implementation Examples

### Example 1: End-to-End Campaign Generation

```javascript
/**
 * Complete workflow: Generate social media campaign assets
 */
async function generateSocialMediaCampaign(campaign) {
  console.log(`\n=== Generating Social Media Campaign: ${campaign.name} ===\n`);

  const { name, theme, platforms, variations } = campaign;

  // Step 1: Build comprehensive prompt list
  const prompts = [];
  platforms.forEach(platform => {
    variations.forEach(variation => {
      prompts.push({
        platform,
        variation,
        prompt: buildCampaignPrompt(theme, platform, variation),
        metadata: {
          campaign: name,
          platform,
          variation,
          theme
        }
      });
    });
  });

  console.log(`Total assets to generate: ${prompts.length}`);

  // Step 2: Select optimal model and batch size
  const modelVersion = "stability-ai/sdxl:da77bc59...";
  const batchSize = await determineBatchSize(modelVersion);

  console.log(`Using model: ${modelVersion}`);
  console.log(`Batch size: ${batchSize}\n`);

  // Step 3: Generate with progress tracking
  const startTime = Date.now();

  const { results, errors, summary } = await generateImagesBatched(
    prompts.map(p => p.prompt),
    modelVersion,
    {
      batchSize,
      onBatchComplete: (batch) => {
        const elapsed = (Date.now() - startTime) / 1000;
        console.log(
          `Batch ${batch.batch} complete: ` +
          `${batch.successful} successful, ${batch.failed} failed ` +
          `(${elapsed.toFixed(1)}s elapsed)`
        );
      },
      onProgress: (progress) => {
        const percent = progress.percent.toFixed(1);
        process.stdout.write(
          `\rProgress: ${percent}% (${progress.processed}/${progress.total})`
        );
      }
    }
  );

  const totalTime = (Date.now() - startTime) / 1000;

  console.log(`\n\nGeneration complete in ${totalTime.toFixed(1)}s`);
  console.log(`Success rate: ${(summary.successful / summary.total * 100).toFixed(1)}%\n`);

  // Step 4: Organize outputs by platform
  const organized = {};
  results.forEach((result, index) => {
    const { platform, variation } = prompts[index].metadata;

    if (!organized[platform]) organized[platform] = {};
    if (!organized[platform][variation]) organized[platform][variation] = [];

    organized[platform][variation].push({
      filepath: result.output,
      predictionId: result.predictionId,
      metrics: result.metrics
    });
  });

  // Step 5: Save organized structure
  const outputDir = `./campaigns/${sanitizeFilename(name)}`;
  await fs.mkdir(outputDir, { recursive: true });

  for (const [platform, variations] of Object.entries(organized)) {
    const platformDir = `${outputDir}/${platform}`;
    await fs.mkdir(platformDir, { recursive: true });

    for (const [variation, assets] of Object.entries(variations)) {
      const variationDir = `${platformDir}/${sanitizeFilename(variation)}`;
      await fs.mkdir(variationDir, { recursive: true });

      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        const filename = `${sanitizeFilename(variation)}_${i}.png`;
        const filepath = `${variationDir}/${filename}`;

        await fs.copyFile(asset.filepath, filepath);
      }
    }
  }

  // Step 6: Generate campaign report
  const report = {
    campaign: name,
    theme,
    generated: new Date().toISOString(),
    summary: {
      total: summary.total,
      successful: summary.successful,
      failed: summary.failed,
      successRate: `${(summary.successful / summary.total * 100).toFixed(1)}%`,
      totalTime: `${totalTime.toFixed(1)}s`,
      avgTimePerAsset: `${(totalTime / summary.successful).toFixed(2)}s`
    },
    platforms: Object.keys(organized),
    variations: variations,
    outputs: organized
  };

  const reportPath = `${outputDir}/campaign_report.json`;
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  console.log(`Campaign assets saved to: ${outputDir}`);
  console.log(`Campaign report: ${reportPath}\n`);

  return report;
}

// Helper: Build platform-specific prompt
function buildCampaignPrompt(theme, platform, variation) {
  const specs = {
    instagram_post: {
      aspectRatio: "1:1 square format",
      style: "vibrant, eye-catching"
    },
    instagram_story: {
      aspectRatio: "9:16 vertical format",
      style: "full-screen, immersive"
    },
    facebook_ad: {
      aspectRatio: "1.91:1 landscape format",
      style: "professional, call-to-action"
    },
    twitter_post: {
      aspectRatio: "16:9 landscape",
      style: "concise, impactful"
    }
  };

  const spec = specs[platform] || specs.instagram_post;

  return `${theme}, ${variation}, ${spec.aspectRatio}, ${spec.style}, high quality, professional`;
}

// Usage
const campaignReport = await generateSocialMediaCampaign({
  name: "Summer Product Launch 2024",
  theme: "Wireless headphones, summer vibes, outdoor lifestyle",
  platforms: ["instagram_post", "instagram_story", "facebook_ad", "twitter_post"],
  variations: [
    "vibrant colors, energetic mood",
    "minimalist, clean design",
    "lifestyle action shot",
    "product close-up, detail focus"
  ]
});

console.log("Campaign Summary:");
console.log(`  Total assets: ${campaignReport.summary.total}`);
console.log(`  Success rate: ${campaignReport.summary.successRate}`);
console.log(`  Total time: ${campaignReport.summary.totalTime}`);
console.log(`  Platforms: ${campaignReport.platforms.join(", ")}`);
```

### Example 2: Progressive Quality Refinement

```javascript
/**
 * Complete workflow: Progressive refinement with quality selection
 */
async function progressiveQualityRefinement(
  basePrompt,
  modelVersion,
  options = {}
) {
  const {
    initialCount = 10,
    refinementRounds = 2,
    selectionCount = 3,
    qualityScorer = null // Custom quality scoring function
  } = options;

  console.log(`\n=== Progressive Quality Refinement ===`);
  console.log(`Base prompt: ${basePrompt}`);
  console.log(`Initial count: ${initialCount}`);
  console.log(`Refinement rounds: ${refinementRounds}`);
  console.log(`Selection per round: ${selectionCount}\n`);

  const history = [];
  let currentOutputs = [];

  // Round 1: Generate initial batch
  console.log(`Round 1: Generating ${initialCount} initial candidates...`);

  const round1Prompts = Array(initialCount).fill(basePrompt);
  const round1Results = await generateImagesParallel(round1Prompts, modelVersion);

  currentOutputs = round1Results.map((result, index) => ({
    ...result,
    round: 1,
    parentIndex: null,
    qualityScore: qualityScorer ? qualityScorer(result.output) : null
  }));

  history.push({
    round: 1,
    prompt: basePrompt,
    generated: currentOutputs.length,
    outputs: currentOutputs
  });

  console.log(`Round 1 complete: ${currentOutputs.length} candidates\n`);

  // Refinement rounds
  for (let round = 2; round <= refinementRounds + 1; round++) {
    console.log(`Round ${round}: Selecting top ${selectionCount} for refinement...`);

    // Sort by quality score (if available)
    if (qualityScorer) {
      currentOutputs.sort((a, b) => b.qualityScore - a.qualityScore);
    }

    // Select top N
    const selectedOutputs = currentOutputs.slice(0, selectionCount);

    console.log(`Selected candidates from round ${round - 1}:`);
    selectedOutputs.forEach((output, i) => {
      console.log(
        `  ${i + 1}. Prediction ${output.predictionId.substring(0, 8)}... ` +
        (output.qualityScore ? `(score: ${output.qualityScore.toFixed(2)})` : "")
      );
    });

    // Generate refinements for each selected output
    console.log(`\nGenerating refinements...`);

    const refinementPrompts = selectedOutputs.map(output => ({
      image: output.output,
      prompt: `${basePrompt}, refined and improved, high quality`,
      strength: 0.6,
      parentIndex: currentOutputs.indexOf(output)
    }));

    const refinements = await Promise.all(
      refinementPrompts.map(({ image, prompt, strength, parentIndex }) =>
        createPrediction({
          version: modelVersion,
          input: { image, prompt, strength },
          jq_filter: "{id, status, urls}"
        }).then(prediction => ({
          parentIndex,
          prediction
        }))
      )
    );

    const completed = await Promise.all(
      refinements.map(({ parentIndex, prediction }) =>
        pollUntilComplete(prediction.id).then(completed => ({
          parentIndex,
          completed
        }))
      )
    );

    const downloaded = await Promise.all(
      completed.map(async ({ parentIndex, completed }) => {
        const output = await downloadOutput(completed.output);
        return {
          round,
          parentIndex,
          predictionId: completed.id,
          output,
          metrics: completed.metrics,
          qualityScore: qualityScorer ? qualityScorer(output) : null
        };
      })
    );

    currentOutputs = downloaded;
    history.push({
      round,
      prompt: basePrompt,
      generated: downloaded.length,
      outputs: downloaded
    });

    console.log(`Round ${round} complete: ${downloaded.length} refinements\n`);
  }

  // Final selection
  if (qualityScorer) {
    currentOutputs.sort((a, b) => b.qualityScore - a.qualityScore);
  }

  const finalOutputs = currentOutputs.slice(0, selectionCount);

  console.log(`=== Refinement Complete ===`);
  console.log(`Total images generated: ${history.reduce((sum, h) => sum + h.generated, 0)}`);
  console.log(`Final top ${selectionCount} candidates:`);

  finalOutputs.forEach((output, i) => {
    console.log(
      `  ${i + 1}. Round ${output.round} - Prediction ${output.predictionId.substring(0, 8)}...` +
      (output.qualityScore ? ` (score: ${output.qualityScore.toFixed(2)})` : "")
    );
  });

  // Save outputs
  const outputDir = `./refinements/${Date.now()}`;
  await fs.mkdir(outputDir, { recursive: true });

  for (let i = 0; i < finalOutputs.length; i++) {
    const output = finalOutputs[i];
    const filename = `refined_${i}_round${output.round}.png`;
    const filepath = `${outputDir}/${filename}`;

    await fs.writeFile(filepath, output.output);

    // Save metadata
    const metadataPath = filepath.replace(".png", "_metadata.json");
    await fs.writeFile(
      metadataPath,
      JSON.stringify({
        rank: i + 1,
        round: output.round,
        parentIndex: output.parentIndex,
        predictionId: output.predictionId,
        qualityScore: output.qualityScore,
        metrics: output.metrics,
        basePrompt
      }, null, 2)
    );
  }

  console.log(`\nOutputs saved to: ${outputDir}\n`);

  return {
    finalOutputs,
    history,
    outputDir
  };
}

// Usage with quality scoring
const refinement = await progressiveQualityRefinement(
  "Professional minimalist logo for AI startup, modern, clean",
  modelVersion,
  {
    initialCount: 10,
    refinementRounds: 2,
    selectionCount: 3,
    qualityScorer: (imageBuffer) => {
      // Custom quality scoring logic
      // In production, could use:
      // - Image quality metrics (sharpness, contrast)
      // - AI-based aesthetic scoring
      // - Brand guideline compliance checking
      // For this example, random score
      return Math.random();
    }
  }
);

console.log("Refinement Summary:");
console.log(`  Total rounds: ${refinement.history.length}`);
console.log(`  Total generated: ${refinement.history.reduce((s, h) => s + h.generated, 0)}`);
console.log(`  Final selections: ${refinement.finalOutputs.length}`);
```

---

## Key Takeaways

### Critical Success Factors

1. **Choose the Right Pattern**
   - Sequential: Small batches, simple workflows
   - Parallel: Large batches, time-sensitive
   - Hybrid: Production use, balanced approach

2. **Error Handling is Essential**
   - Retry logic for transient failures
   - Graceful degradation with fallback models
   - Comprehensive error logging

3. **Performance Optimization**
   - Use `jq_filter` consistently (500% improvement)
   - Adaptive polling intervals
   - Smart batch sizing based on model speed

4. **Resource Management**
   - Control concurrency to respect rate limits
   - Memory-efficient processing for large batches
   - Progressive output delivery for long operations

5. **Production Readiness**
   - Comprehensive monitoring and logging
   - Structured output organization
   - Cost tracking and budget controls

### Common Pitfalls to Avoid

1. ❌ **Creating all predictions without rate limiting**
   - Use controlled concurrency or batching

2. ❌ **Not handling output expiry (1-hour window)**
   - Download and save immediately after completion

3. ❌ **Polling too frequently**
   - Use 1-2 second intervals minimum
   - Consider adaptive polling

4. ❌ **No retry logic**
   - Network errors and transient failures are common
   - Implement exponential backoff

5. ❌ **Loading all outputs into memory**
   - For large batches, process and save immediately
   - Use streaming/progressive delivery

6. ❌ **No cost tracking**
   - Monitor spending in real-time
   - Implement budget controls

### Recommended Starting Point

For most production use cases, start with **Hybrid Batch Processing**:

```javascript
const { results, errors } = await generateImagesBatched(
  prompts,
  modelVersion,
  {
    batchSize: 10,
    concurrency: 10,
    onBatchComplete: (batch) => {
      console.log(`Batch ${batch.batch}: ${batch.successful} successful`);
    }
  }
);
```

Then optimize based on your specific requirements:
- Increase concurrency if rate limits allow
- Add retry logic for reliability
- Implement monitoring for visibility
- Add cost tracking for budget control

---

## References

- [MCP Tools Analysis](/brand/research/adhoc/2025-11-03@09:36-replicate-mcp-visual-generation/artifacts/01-mcp-tools-analysis.md) - Complete API reference
- [Model Capabilities](/brand/research/adhoc/2025-11-03@09:36-replicate-mcp-visual-generation/artifacts/02-suitable-models.md) - Model selection guide
- [Replicate API Documentation](https://replicate.com/docs) - Official API docs
- [Prediction Management](https://replicate.com/docs/topics/predictions) - Prediction lifecycle details

---

**Last Updated:** 2025-11-03
**Status:** Production-ready patterns documented
**Next Steps:** Test batch patterns with real workflows, benchmark performance across models
