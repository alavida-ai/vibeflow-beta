# Voice Benchmarking Research

**Created:** 2025-10-28@18:04
**Execution Folder:** `/research/voice-benchmarking/2025-10-28@18:04/`

## Objective

Analyze brand voices from 3-5 admired companies to identify voice patterns, tone characteristics, and communication principles that could inform brand voice strategy. This research deconstructs successful brand voices to understand voice attributes, patterns, and principles that resonate with target audiences.

## Approach

This workflow follows a structured 5-phase approach:
1. **Brand Selection** - Gather user input on which brands to analyze and understand their rationale
2. **Voice Sample Collection** - Collect representative voice samples across multiple channels for each brand
3. **Voice Attribute Analysis** - Deconstruct each brand's voice into specific attributes and patterns
4. **Cross-Brand Pattern Analysis** - Identify common patterns and differentiation strategies across all benchmarks
5. **Research Report Generation** - Synthesize all findings into a comprehensive research report

The workflow emphasizes **unopinionated findings** - documenting what IS observed in successful brand voices, not what SHOULD BE done (strategy synthesis happens later via `/strategy:voice`).

## Input Data

**Location:** `data/`

- `data/brand-list.md` - List of 3-5 brands selected by user with rationale for each selection (created in Phase 1)
- Optional: `data/target-audience.md` - Target audience definition from customer insights (if available)
- Optional: `data/brand-story.md` - Brand story context (if available)

## Step by Step Tasks

### 1. Brand Selection (User Input Phase)

Gather user input on which brands to analyze and understand why they admire each brand's voice.

**Agent:** None (direct user interaction - cannot be delegated)
**Instructions:** Inline instructions below
**Input Artifacts:** None

**Output Artifact:** `data/brand-list.md`

**Task Details:**
1. Ask user: "Please provide 3-5 brands whose voice you admire. These can be in your category or adjacent categories."
2. For each brand provided, ask: "Why do you admire [Brand Name]'s voice? What about their communication resonates with you?"
3. Confirm the final selection with the user
4. Document the brand list with user's rationale in `data/brand-list.md` using this format:
   ```markdown
   # Brand Selection

   ## [Brand Name 1]
   **Why we admire this voice:** [User's rationale]

   ## [Brand Name 2]
   **Why we admire this voice:** [User's rationale]

   [etc.]
   ```

---

### 2. Voice Sample Collection

Collect representative voice samples from selected brands across multiple channels.

**Agent:** analyst-agent
**Instructions:** `.claude/skills/researching/workflows/voice-benchmarking/phase-2-sample-collection.md`
**Input Artifacts:**
- `data/brand-list.md` - Brand selection with rationale

**Output Artifact:** `artifacts/02-voice-samples.md`

**Task Details:**
- For each brand in the brand list, collect 5-10 voice samples across different channels:
  - Website copy (homepage, product pages, about page)
  - Social media posts (Twitter, LinkedIn, Instagram)
  - Email communications (if publicly available)
  - Blog posts
  - Marketing materials
- Organize samples by brand and channel
- Note the context for each sample (where it appeared, what its purpose was)
- Capture exact text, not summaries
- Document source URLs for verification

**Progressive Disclosure:** Analyst loads only the brand list, not the full workflow context.

---

### 3. Voice Attribute Analysis

Deconstruct each brand's voice into specific attributes and patterns.

**Agent:** analyst-agent
**Instructions:** `.claude/skills/researching/workflows/voice-benchmarking/phase-3-voice-analysis.md`
**Input Artifacts:**
- `artifacts/02-voice-samples.md` - Voice sample collection

**Output Artifact:** `artifacts/03-voice-attributes.md`

**Task Details:**
For each brand, analyze and document:
- **Voice attributes** - Key characteristics (e.g., conversational, authoritative, playful, irreverent, empathetic)
- **Tone spectrum positioning:**
  - Formal ↔ Casual
  - Serious ↔ Humorous
  - Respectful ↔ Irreverent
  - Professional ↔ Friendly
  - Direct ↔ Nuanced
- **Writing principles** - Observable patterns in how they communicate
- **Vocabulary and language choices** - Word selection, terminology, jargon usage
- **Sentence structure and rhythm** - Long vs short sentences, complexity, cadence
- **Distinctive voice elements** - Use of humor, metaphors, storytelling techniques, directness, empathy markers

Document findings per brand with specific examples from the samples to support each observation.

**Progressive Disclosure:** Analyst loads only voice samples, not the entire workflow history.

---

### 4. Cross-Brand Pattern Analysis

Identify common patterns and differentiation strategies across all benchmark brands.

**Agent:** analyst-agent
**Instructions:** `.claude/skills/researching/workflows/voice-benchmarking/phase-4-pattern-analysis.md`
**Input Artifacts:**
- `artifacts/03-voice-attributes.md` - Voice attribute analysis per brand

**Output Artifact:** `artifacts/04-pattern-analysis.md`

**Task Details:**
Compare voice attributes across all brands to identify:
- **Common patterns** - Voice principles that appear across multiple successful brands
- **Differentiation strategies** - How each brand creates a distinctive voice within their category
- **Channel-specific adaptations** - How voice changes across platforms (e.g., Twitter vs homepage)
- **Audience resonance patterns** - Voice elements that appear designed to resonate with specific audience types
- **Voice consistency patterns** - How brands maintain voice across different contexts
- **Distinctive elements** - What makes each voice memorable and unique

Document patterns with cross-brand examples and note frequency of occurrence.

**Progressive Disclosure:** Analyst loads only voice attributes, not sample data.

---

### 5. Research Report Generation

Synthesize all findings into a comprehensive, unopinionated research report.

**Agent:** analyst-agent
**Instructions:** `.claude/skills/researching/workflows/voice-benchmarking/phase-5-report-generation.md`
**Input Artifacts:**
- `data/brand-list.md` - Brand selection with rationale
- `artifacts/02-voice-samples.md` - Voice samples
- `artifacts/03-voice-attributes.md` - Voice attribute analysis
- `artifacts/04-pattern-analysis.md` - Cross-brand patterns

**Output Artifact:** `RESEARCH.md` (final research report)

**Task Details:**
Create comprehensive research report using the template at `.claude/skills/researching/workflows/voice-benchmarking/templates/voice-benchmarking-output.md`.

Report structure:
1. **Benchmark Brand Profiles** - Overview of analyzed brands and selection rationale
2. **Voice Attribute Analysis** - Detailed breakdown of each brand's voice characteristics (findings with examples)
3. **Common Patterns** - Voice principles observed across benchmarks
4. **Differentiation Strategies** - How brands create distinctive voices (observed patterns)
5. **Tone Spectrum Analysis** - Where each brand sits on tone dimensions (findings)
6. **Writing Principles Observed** - Patterns extracted from successful voices
7. **Channel Adaptations** - How voice adapts across platforms (observed patterns)
8. **Voice Elements Inventory** - Do's/don'ts documented from analyzed brands (findings)

**Critical:** This report presents FINDINGS only - what IS observed in successful brand voices. Do NOT include recommendations or strategic direction (that happens during `/strategy:voice` synthesis).

**Progressive Disclosure:** Analyst loads all artifacts but synthesizes into a clean, navigable final report.

---

## Success Criteria

- ✅ 3-5 brands analyzed with clear selection rationale documented
- ✅ 5-10 voice samples collected per brand across multiple channels
- ✅ Voice attributes clearly identified for each brand with supporting examples
- ✅ Cross-brand patterns documented with evidence
- ✅ Tone spectrum positioning mapped for all brands
- ✅ Writing principles extracted from observed patterns
- ✅ Channel adaptations identified and documented
- ✅ Final research report is comprehensive, well-organized, and unopinionated (findings only)
- ✅ All findings are traceable to source samples with examples provided
- ✅ Report follows the provided template structure
