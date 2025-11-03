---
name: Image Generation
description: This is a skill for generating and reviewing relevant images using Generative AI MCPs
---

# Image Generation

## Instructions

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
Show concrete examples of using this Skill.