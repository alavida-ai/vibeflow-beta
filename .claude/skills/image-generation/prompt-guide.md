# AI Image Prompting GUIDE

This guides provides a framework for writing effective image generation prompts across different AI models. Understanding these principles helps you craft prompts that consistently produce high-quality results.

# THE FOUNDATIONAL FRAMEWORK
Every effective image prompt follows a three-part structure:

## 1. SUBJECT - What the image is about

Use concrete nouns, not abstract concepts
❌ "love" or "infinity" → ✅ "embracing couple" or "spiral galaxy"
Be specific: "a golden retriever puppy" not just "a dog"

## 2. CONTEXT - Where and how the subject exists

Environment, background, setting
Actions, positions, relationships
"on a terrazzo counter with morning light" vs just "a coffee cup"

## 3. STYLE - How the image should look

Medium: photo, painting, sketch, digital art, 3D render
Artistic movement: impressionist, cyberpunk, baroque, minimalist
Technical approach: watercolor, oil painting, charcoal, pixel art

## Template structure:
[SUBJECT] [doing/being what], [in where/context],
[style/medium], [lighting], [composition], [mood], [technical details]

# UNIVERSAL PRINCIPLES
These principles work across all models:
1. Always Use Positive Phrasing
❌ "no clouds" → ✅ "clear sky"
❌ "man with no hair" → ✅ "bald man"
❌ "don't show buildings" → ✅ "open landscape"
Exception: Use dedicated negative prompt fields when available (describe what to omit plainly, without negation words).
2. Iterate Systematically

Start with core idea (subject + context + style)
Generate and evaluate
Change ONE element at a time
Regenerate and compare
Repeat until satisfied

Example progression:

"A mountain lake at sunset"
"A mountain lake at sunset, golden hour lighting"
"A mountain lake at sunset, golden hour lighting, mirror-like water"
"A mountain lake at sunset, golden hour lighting, mirror-like water, pine trees in foreground"

3. Choose Aspect Ratio First
Aspect ratio affects composition, not just cropping:

1:1 - Social media, balanced compositions
16:9 - Landscapes, cinematic, widescreen
9:16 - Mobile content, vertical subjects
4:3 - Traditional photography
3:4 - Portrait orientation

4. Text-in-Image Best Practices
When generating text in images:

Keep text ≤25 characters per element
Limit to 2-3 distinct phrases maximum
Specify text style: "bold sans-serif," "neon sign," "handwritten"
Expect to iterate - text generation is still challenging
Example: "A neon sign that reads 'OPEN' in bold letters, 1950s retro style"

5. Technical Specificity Categories
Photography Language:

Lens: prime, macro, telephoto, wide-angle
Focal length: 24-35mm (portraits), 60-105mm (macro), 100-400mm (telephoto), 10-24mm (landscapes)
Technical: shutter speed, depth of field, aperture, ISO
Lighting: golden hour, rim light, studio lighting, side lighting

Artistic Language:

Medium: photo, painting, sketch, digital art, 3D render
Movements: impressionist, cyberpunk, baroque, art deco, vaporwave
Techniques: watercolor, oil painting, charcoal, pixel art, collage

Compositional Language:

Framing: close-up, medium shot, wide shot, aerial view
Rules: rule of thirds, centered subject, symmetrical
Angles: eye-level, low angle, high angle, dutch angle