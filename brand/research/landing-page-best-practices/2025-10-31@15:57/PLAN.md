# Landing Page Best Practices Research

**Created:** 2025-10-31@15:57
**Execution Folder:** `/brand/research/landing-page-best-practices/2025-10-31@15:57/`

## Objective

Synthesize research from three authoritative sources (Unbounce, Mailchimp) to create a comprehensive, evidence-based guide on high-converting landing page design and best practices. This research will inform future landing page creation for Vibeflow's marketing campaigns.

## Approach

1. **Extract core patterns** - Identify recurring principles across all three articles
2. **Categorize by domain** - Organize findings into actionable categories (structure, copy, design, technical, trust signals)
3. **Synthesize unique insights** - Highlight differentiated or counterintuitive findings
4. **Create actionable framework** - Structure as reference guide for landing page creation

This research follows the **unopinionated factual gathering** principle of the research domain—documenting what the industry experts say works, not yet prescribing what Vibeflow should do.

## Input Data

**Source Articles (Already Scraped via Firecrawl):**

1. **Unbounce - High-Converting Landing Page Examples**
   - URL: https://unbounce.com/landing-page-examples/high-converting-landing-pages/
   - Focus: 15 real landing pages with 30%+ conversion rates, plus conversion tips from marketers

2. **Mailchimp - Product Landing Page Anatomy**
   - URL: https://mailchimp.com/resources/product-landing-page/
   - Focus: Key components of high-converting product landing pages

3. **Unbounce - Landing Page Best Practices**
   - URL: https://unbounce.com/landing-page-articles/landing-page-best-practices/
   - Focus: 11 essential best practices with detailed guidance

**Note:** Content is already in context from initial scraping. Agents will reference URLs directly with inline citations.

## Step by Step Tasks

### 1. Extract Core Patterns Across Sources

Analyze all three articles to identify **recurring patterns and principles** that appear across multiple sources. This phase focuses on finding consensus—what all experts agree drives conversions.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- Scraped article content (already in context)
- Source URLs for citation

**Output Artifact:** `artifacts/01-core-patterns-analysis.md`

**Task Details:**

Read all three source articles and extract:

1. **Principles mentioned in all 3 sources** - universal consensus
2. **Principles mentioned in 2 of 3 sources** - strong consensus
3. **Quantitative benchmarks** - conversion rates, load times, mobile traffic percentages
4. **Structural elements** - what physical components appear on high-converting pages

For each pattern identified, note:
- Which sources mention it
- Specific evidence or examples provided
- Any quantitative data supporting the principle

Organize findings into these categories:
- **Conversion Principles** (focus, CTA strategy, message match)
- **Structural Elements** (above-the-fold, visual hierarchy, navigation)
- **Copy/Messaging** (headlines, benefits vs features, clarity)
- **Visual/Design** (imagery, video, white space, directional cues)
- **Technical** (speed, mobile optimization, forms)
- **Trust Signals** (social proof, testimonials, privacy)

---

### 2a. Identify Unique Insights & Counterintuitive Findings

Analyze the articles for **differentiated insights**—principles or tactics mentioned by only one source, or findings that contradict common assumptions.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-core-patterns-analysis.md`
- Scraped article content (already in context)
- Source URLs for citation

**Output Artifact:** `artifacts/02a-unique-insights.md`

**Task Details:**

Identify and document:

1. **Unique tactical advice** - mentioned by only one source
2. **Counterintuitive findings** - challenges common assumptions (e.g., "complexity as competitive moat")
3. **Industry-specific variations** - B2B vs ecommerce, lead gen vs click-through
4. **Emerging trends** - newer practices not yet widespread

For each insight:
- Which source provided it
- Supporting evidence or examples
- Why it's differentiated or counterintuitive
- Potential applicability to Vibeflow

---

### 2b. Extract Real-World Examples & Case Studies

Catalog the **specific examples, case studies, and conversion data** from the articles to provide concrete proof points.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-core-patterns-analysis.md`
- Scraped article content (already in context)
- Source URLs for citation

**Output Artifact:** `artifacts/02b-examples-case-studies.md`

**Task Details:**

Extract and organize:

1. **High-performing landing pages** from Unbounce article
   - Company name, industry, conversion rate
   - Key elements that made it successful
   - Specific conversion tips from the marketers who built them

2. **Example landing pages** from Mailchimp article
   - What made each example effective
   - Design/structure patterns

3. **Quantitative benchmarks**
   - Average conversion rates by industry
   - Load time impact on conversions
   - Mobile traffic percentages
   - Video impact on conversion rates

Organize by:
- Conversion rate (highest to lowest)
- Industry/vertical
- Landing page type (lead gen, click-through, ecommerce)

---

### 3. Synthesize Comprehensive Landing Page Guide

Consolidate all findings into a structured, actionable research document that serves as the definitive reference for landing page best practices.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-core-patterns-analysis.md`
- `artifacts/02a-unique-insights.md`
- `artifacts/02b-examples-case-studies.md`

**Output Artifact:** `artifacts/03-synthesis-draft.md` and `RESEARCH.md`

**Task Details:**

Create the final research document with this structure:

1. **Executive Summary**
   - What high-converting landing pages are
   - Average conversion rates and benchmarks
   - Core principles (brief overview)

2. **Core Conversion Principles**
   - Single focused goal
   - Message match/conversion scent
   - Benefits over features
   - Clear calls to action

3. **Structural Elements**
   - Above-the-fold requirements
   - Visual hierarchy and directional cues
   - Navigation removal
   - Mobile-first design

4. **Copy & Messaging Best Practices**
   - Headline formulas
   - Value proposition clarity
   - Scannable text patterns
   - CTA copywriting

5. **Visual & Design Guidelines**
   - Hero shots and product imagery
   - Video usage and impact
   - White space and layout
   - Contrasting CTAs

6. **Technical Optimization**
   - Load speed requirements
   - Mobile responsiveness
   - Form optimization
   - A/B testing approach

7. **Trust & Credibility Signals**
   - Social proof formats
   - Testimonial authenticity
   - Privacy policies
   - Authority indicators

8. **Landing Page Type Variations**
   - Lead generation best practices
   - Click-through page optimization
   - Ecommerce product pages
   - B2B vs B2C considerations

9. **Common Mistakes to Avoid**
   - Documented from all sources

10. **Case Study Highlights**
    - Top 5 examples with conversion rates and key lessons

11. **Research Sources**
    - Full attribution to all three articles

**Formatting requirements:**
- Use markdown throughout
- Include inline citations linking back to source articles
- Use bullet points for scannable lists
- Include quantitative data where available
- Maintain unopinionated, factual tone (research, not strategy)

## Success Criteria

- **Comprehensive coverage** - All major patterns from all three sources documented
- **Evidence-based** - Every principle supported by source attribution or quantitative data
- **Actionable structure** - Organized by domain for easy reference during landing page creation
- **Differentiated insights** - Unique or counterintuitive findings clearly highlighted
- **Quantitative benchmarks** - Conversion rates, load times, and impact metrics included
- **Unopinionated** - Factual documentation without strategic prescription (that's for strategy domain)
