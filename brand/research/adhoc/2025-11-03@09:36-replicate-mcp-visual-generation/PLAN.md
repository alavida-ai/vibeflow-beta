# Replicate MCP Visual Asset Generation Research

**Created:** 2025-11-03 09:36
**Execution Folder:** `/brand/research/adhoc/2025-11-03@09:36-replicate-mcp-visual-generation/`

## Objective

Research and document how to use the Replicate MCP server within Claude Code to generate brand-consistent visual assets, including:
1. Using reference images as inputs for image generation
2. Generating multiple images in a single workflow
3. Identifying suitable models for brand visual asset creation
4. Understanding best practices and limitations

## Approach

This research will follow a structured investigation approach:
1. Analyze available Replicate MCP tools and capabilities
2. Research suitable image generation models on Replicate
3. Document workflows for reference-based image generation
4. Explore batch/multiple image generation patterns
5. Synthesize practical implementation guidance

## Input Data

**Location:** `data/`

None - workflow will research from available MCP documentation, Replicate API capabilities, and Claude Code integration patterns.

## Step by Step Tasks

### 1. MCP Tools Analysis

Analyze the available Replicate MCP tools to understand what's possible for image generation workflows.

**Agent:** general-purpose
**Instructions:** inline instructions below
**Input Artifacts:**
- None (direct tool inspection)

**Output Artifact:** `artifacts/01-mcp-tools-analysis.md`

**Task Details:**
- Examine all available Replicate MCP tools (search, model operations, predictions, etc.)
- Identify which tools support image generation workflows
- Document how to:
  - Search for image generation models
  - Create predictions with image inputs
  - Handle multiple predictions
  - Check prediction status and retrieve results
- Note any limitations or constraints in the MCP implementation

---

### 2. Image Generation Models Research

Search and evaluate Replicate models suitable for brand visual asset generation, focusing on reference-based capabilities.

**Agent:** analyst
**Instructions:** inline instructions below
**Input Artifacts:**
- `artifacts/01-mcp-tools-analysis.md`

**Output Artifact:** `artifacts/02-suitable-models.md`

**Task Details:**
- Use Replicate search to find image generation models that support:
  - Reference image inputs (style transfer, image-to-image, etc.)
  - High-quality output suitable for brand assets
  - Controllable generation with prompts
- Evaluate top candidates:
  - Input/output schemas
  - Pricing/performance
  - Use case fit for brand work
- Prioritize models that can maintain brand consistency through reference images
- Document 3-5 recommended models with examples

---

### 3. Reference-Based Generation Workflow

Document practical workflows for using reference images in generation process.

**Agent:** general-purpose
**Instructions:** inline instructions below
**Input Artifacts:**
- `artifacts/01-mcp-tools-analysis.md`
- `artifacts/02-suitable-models.md`

**Output Artifact:** `artifacts/03-reference-workflow.md`

**Task Details:**
- Design step-by-step workflow for reference-based generation:
  1. How to prepare/host reference images
  2. How to structure prediction requests with reference images
  3. How to specify prompts that work with reference images
  4. How to retrieve and save generated outputs
- Include code examples using MCP tools
- Document common patterns and gotchas
- Address file handling (URLs vs local files)

---

### 4. Batch Generation Patterns

Explore approaches for generating multiple images in a single workflow.

**Agent:** general-purpose
**Instructions:** inline instructions below
**Input Artifacts:**
- `artifacts/01-mcp-tools-analysis.md`
- `artifacts/02-suitable-models.md`

**Output Artifact:** `artifacts/04-batch-generation.md`

**Task Details:**
- Document patterns for multiple image generation:
  - Sequential predictions (one after another)
  - Parallel predictions (if supported)
  - Batch processing with variations
- Explain how to:
  - Track multiple predictions
  - Handle async workflows (if applicable)
  - Organize outputs from multiple generations
- Include example workflows for common scenarios:
  - Generate 5 variations of same prompt
  - Generate images from list of prompts
  - Generate images with different reference images

---

### 5. Final Synthesis

Consolidate all findings into comprehensive research document.

**Agent:** general-purpose
**Instructions:** inline instructions below
**Input Artifacts:**
- `artifacts/01-mcp-tools-analysis.md`
- `artifacts/02-suitable-models.md`
- `artifacts/03-reference-workflow.md`
- `artifacts/04-batch-generation.md`

**Output Artifact:** `artifacts/05-synthesis.md` and `RESEARCH.md`

**Task Details:**
Synthesize all research into final RESEARCH.md document:
- Executive summary of capabilities
- Recommended models for brand work
- Complete workflow examples (reference-based + batch)
- Best practices and tips
- Limitations and considerations
- Next steps for implementation

Ensure RESEARCH.md is practical and actionable for brand visual asset workflows.

## Success Criteria

- Clear understanding of Replicate MCP tools available for image generation
- Documented list of suitable models for brand visual assets with reference image support
- Complete, tested workflow examples for:
  - Single image generation with reference
  - Multiple image generation (batch/variations)
- Practical guidance ready for implementation in brand content workflows
- All findings traceable to source material (MCP docs, model schemas, etc.)
