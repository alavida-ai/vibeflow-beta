---
name: Image Generation
description: This is a skill for generating and reviewing relevant images using Generative AI MCPs
---

# Image Generation

Generate brand-aligned visual assets using AI models. This skill provides structured workflows for creating images that match your brand identity, either through guideline-based validation or reference-image-driven generation.

## Instructions

Choose between **pre-defined workflows** for brand-aligned generation with systematic validation, or use the **generic iterative process** below for quick exploration without brand constraints.

### Available Workflows

| Feature | [On-Brand Visual](workflows/on-brand-visual/WORKFLOW.md) | [Brand-Aware Asset Generation](workflows/brand-aware-asset-generation/WORKFLOW.md) |
|---------|-----------------------------------------------------------|------------------------------------------------------------------------------------|
| Brand context input | Visual guidelines from strategy | Visual assets as image references |
| Upload requirement | No upload (text-only guidelines) | Yes (uploads brand assets to cloud) |
| Validation approach | Systematic testing against guidelines | Implicit brand influence via image input |
| Feedback structure | Dual tests (brand + user) per iteration | Single user feedback loop |
| Draft tracking | Numbered suffix per iteration | Iteration counter |
| Primary use case | Guideline-driven validation | Reference-image-driven generation |

**When to use each:**
- **On-Brand Visual:** Have written brand guidelines, need systematic validation
- **Brand-Aware Asset Generation:** Have visual reference materials, need visual consistency

**For quick exploration:** Continue with the basic process below.

You are tasked with generating an image according to a user prompt. You will trigger an iterative self-optimizing 5 step image process.

### Process

1. Develop an optimized image `Prompt` to match the `Request` of the user. You will create a PROMPT.md file to input your prompt, leveraging the [`prompt-guide.md`](prompt-guide.md)     . 
2. Utilise the Replicate MCP and best model to generate an image and receive a public URL of the generated image. 
3. Download the image to a local /tmp folder 
4. View the image with your Read tool
5. Assess if the image adequately matches the `Request`

Make a `Decision`: 
1. if it matches, and meets expectations return a description of the image
2. If it fails to match, update your initial `Prompt`

This will loop until the match condition is met. 

## Available models

## Examples

### Example: Brand-Aware Generation

User: "Create a hero image for our landing page"

Agent approach:
1. Invoke brand-aware workflow: workflows/brand-aware-asset-generation/WORKFLOW.md
2. Workflow searches /brand/strategy/ for brand assets
3. Uploads found assets to cloud storage
4. Enhances prompt with brand context
5. Generates using google/nano-banana with brand references
6. Iterates based on user feedback (max 5 iterations)