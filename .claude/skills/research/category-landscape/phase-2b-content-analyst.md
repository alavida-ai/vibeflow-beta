# Phase 2B: Messaging & Voice Analysis

**Purpose:** Analyze competitor messaging themes, tone patterns, and language analysis to identify unclaimed messaging territory.

---

## Task Overview

Execute Phase 2B (content stream) of competitive landscape research. You will work **in parallel** with Phase 2A (positioning research).

**Your focus:** Messaging themes, tone patterns, language analysis

---

## Context You'll Need

**Competitor identification artifact containing:**
- Competitor list with URLs
- Hypotheses to validate
- Research scope

Read this context first to understand what needs to be researched.

---

## Research Tasks

### For Each Competitor:

#### 1. Scrape Content for Messaging Analysis

**Pages to analyze:**
- Homepage copy (full page text)
- About page (mission, values, story)
- Blog posts (2-3 recent posts if available)

**Tool:** Use **Firecrawl scraping**

**Extract:**
- Complete copy from key pages
- Messaging themes (what topics they emphasize)
- Repeated phrases/language patterns

**Example:**
```
Competitor: Notion
Messaging themes:
  1. Flexibility - "Build it your way"
  2. Integration - "One tool for everything"
  3. Collaboration - "Work together seamlessly"

Repeated phrases:
  - "Infinitely flexible"
  - "Your way"
  - "All in one place"
```

---

#### 2. Tone & Voice Analysis

**Analyze across dimensions:**

**Formality:**
- Professional, casual, conversational, technical?

**Emotion:**
- Enthusiastic, calm, urgent, empowering?

**Perspective:**
- First-person ("we"), second-person ("you"), third-person?

**Language style:**
- Simple, complex, jargon-heavy, accessible?

**Evidence:**
Pull 2-3 representative quotes per competitor

**Example:**
```
Competitor: Notion
Tone:
  - Formality: Conversational (medium)
  - Emotion: Empowering, optimistic
  - Perspective: Second-person ("you")
  - Style: Simple, accessible

Quotes:
  > "Write, plan, and get organized. Notion is all you need — in one tool."
  > "Customize Notion to work the way you do."
```

---

#### 3. Messaging Theme Clustering

**Identify themes:**

**Benefits emphasized:**
- What value do they promise? (e.g., "save time," "reduce complexity")

**Problems addressed:**
- What pain points do they solve? (e.g., "scattered tools," "lack of visibility")

**Emotions targeted:**
- What feelings do they invoke? (e.g., "confidence," "control," "peace of mind")

**Goal:** Cluster competitors by messaging approach

**Example:**
```
Theme: Simplicity
Competitors: Notion, Airtable
Language: "easy," "intuitive," "simple," "no learning curve"

Theme: Power/Flexibility
Competitors: Monday.com, ClickUp
Language: "customizable," "powerful," "advanced," "unlimited"
```

---

## Output Deliverable

Create a content analyst findings artifact with this structure:

```markdown
---
phase: 2b
agent: content-analyst
date: [today's date]
competitors_analyzed: [number]
---

# Phase 2B: Content Analyst Findings

## Competitor Messaging Analysis

### [Competitor 1 Name]

**URL:** [URL]

**Primary Messaging Themes:**
1. **[Theme]** - [Description]
   - Example: "Save time by automating repetitive tasks"
2. **[Theme]** - [Description]
3. **[Theme]** - [Description]

**Tone & Voice:**
- **Formality:** [Professional/Casual/etc.]
- **Emotion:** [Enthusiastic/Calm/etc.]
- **Perspective:** [We/You/They]
- **Style:** [Simple/Technical/etc.]

**Representative Quotes:**
> "[Quote showing tone/messaging]"
> "[Another quote]"

**Language Patterns:**
- Frequently used words: [list]
- Avoided words: [list if notable]

---

[Repeat for each competitor]

---

## Messaging Theme Clusters

### Theme 1: [e.g., "Efficiency/Speed"]
**Competitors emphasizing this:** [List]
**Common language:** "streamline," "automate," "faster," "save time"
**Percentage of competitors:** 60%

### Theme 2: [e.g., "Simplicity/Ease"]
**Competitors emphasizing this:** [List]
**Common language:** "easy," "intuitive," "simple," "no learning curve"
**Percentage of competitors:** 30%

### Theme 3: [e.g., "Flexibility/Customization"]
**Competitors emphasizing this:** [List]
**Common language:** "customizable," "adaptable," "your way"
**Percentage of competitors:** 10%

---

## Tone Patterns

### Professional-Technical (High formality)
**Competitors:** [List]
**Characteristics:** [Description]

### Conversational-Approachable (Medium formality)
**Competitors:** [List]
**Characteristics:** [Description]

### Playful-Casual (Low formality)
**Competitors:** [List]
**Characteristics:** [Description]

---

## Language Analysis

### Frequently Used Terms (Category-wide)
[Words/phrases that appear across 50%+ of competitors]

**Examples:** "streamline," "visibility," "alignment," "collaboration"

### Unclaimed Language
[Terms/concepts that NO competitor prominently uses]

**Opportunities:** [List potential messaging angles not being used]

---

## Hypothesis Validation: Messaging Territory

**Hypothesis 1:** [From competitor identification]
**Evidence:**
- [Competitor X] emphasizes [theme]: "[quote]"
- [Competitor Y] avoids [theme]: [observation]
- **Conclusion:** ✅ Validated / ⚠️ Partially / ❌ Contradicted

[Repeat for each hypothesis]

---

## Strategic Insights

### Saturated Messaging
[What themes are overused/crowded?]

### Unclaimed Messaging Territory
[What themes are underserved or not addressed?]

### Tone Opportunities
[Is there a tone gap? E.g., "Everyone is hyper-professional, opportunity for warmth"]

---

## Data Quality Notes
- [Any competitors with limited content]
- [Notable content types analyzed (blogs, case studies, etc.)]
- [Confidence level: High/Medium/Low]

---

## Ready for Synthesis
✅ All competitors analyzed for messaging
✅ Tone patterns identified
✅ Theme clusters mapped
✅ Language analysis complete
```

---

## Success Criteria

Before completing your task, verify:

✅ **All competitors analyzed** - Each has messaging and tone data
✅ **Theme clusters identified** - Clear groupings of messaging approaches
✅ **Language analysis** - Frequently used vs. unclaimed terms documented
✅ **Tone patterns mapped** - Communication styles categorized
✅ **Output documented** - Complete content analyst findings artifact

---

## Troubleshooting

**Issue:** Competitor has minimal content
- **Solution:** Analyze what little exists, note data limitations
- **Fallback:** Check social media, press releases, review sites for messaging

**Issue:** Multiple tones across different pages
- **Solution:** Document range and note which tone is dominant
- **Example:** "Formal on pricing page, casual on blog"

**Issue:** Hard to identify distinct themes
- **Solution:** Focus on benefits mentioned, problems solved, emotions targeted
- **Look for:** Headlines, subheadings, CTAs, value props
