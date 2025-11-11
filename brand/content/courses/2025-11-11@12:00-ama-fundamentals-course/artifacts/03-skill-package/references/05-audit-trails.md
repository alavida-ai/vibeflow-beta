# Class 5: Verifiable Audit Trails

**Tagline:** Every claim has evidence (and you can follow the chain)

**Estimated Time:** 1.5 hours (1 hour reading, 30 min exercises)

---

## Class Overview

In this class, you'll learn how AMA creates verifiable chains of evidence from published content all the way back to source data. Unlike traditional marketing systems where claims appear out of thin air, AMA uses markdown references to create traceable audit trails that both humans and AI agents can navigate.

**What you'll learn:**
- How to create evidence chains from content → strategy → research → data
- The markdown reference format required for citations
- Why audit trails prevent AI slop and hallucinations
- How to trace any claim back to its source
- The difference between relative and absolute paths (and why it matters)

**Prerequisites:**
- Class 1: How LLMs Actually Work
- Class 2: The Context Problem (And Why Files Are The Solution)
- Class 3: The Three-Layer Marketing Framework
- Class 4: Entry Points and Navigation

---

## The Problem: Unverifiable Marketing Claims

Traditional marketing suffers from a credibility crisis:

**Common scenario:**
- Marketing team creates positioning statement
- Positioning claims "we serve enterprise customers who need scalability"
- When asked "where did this come from?", team can't point to specific evidence
- Strategy becomes opinions, not insights
- Content drifts from reality over time

**The AI amplification problem:**
When you ask an AI to generate marketing content without verifiable sources, you get:
- **Hallucinations** - Made-up statistics, fake customer quotes, invented pain points
- **Generic slop** - Buzzword-filled content that could apply to any company
- **Drift** - Content that slowly diverges from actual brand positioning
- **Inconsistency** - Different agents producing contradictory messages

**Why this happens:**
LLMs are trained to produce plausible-sounding text, not verifiable truth. Without evidence chains, they optimize for "sounds good" rather than "is accurate."

---

## The Solution: Verifiable Audit Trails

AMA solves this with a simple principle:

> **Every claim in your marketing must be traceable back to evidence.**

This creates a chain of accountability:

```
Content (Output)
    ↓ generated with
Strategy (Brand guidelines)
    ↓ references
Research (Insights)
    ↓ analyzed from
Raw Data (Source material)
```

**How this works in practice:**

1. **Raw data exists first** - Customer interviews, competitor analysis, market research
2. **Research synthesizes data** - Analyst extracts patterns, quotes, findings
3. **Strategy cites research** - Strategist makes decisions based on research, links to evidence
4. **Content uses strategy** - Content creator generates output guided by strategy
5. **Anyone can verify** - Follow links backward from content to original data

---

## The Four-Layer Evidence Chain

Let's break down each layer and how they connect:

### Layer 1: Raw Data (Source Material)

**Location:** `/brand/research/{domain}/data/`

**What it contains:**
- Customer interview transcripts
- Competitor website analysis
- Survey results (CSV, spreadsheets)
- Market research reports (PDFs)
- Social media content captures
- Support ticket exports
- Sales call recordings

**Key principle:** Raw data is **immutable** and **uninterpreted**. It's the ground truth.

**Example:**
```
/brand/research/customer-insights/data/
├── interview-sarah-2024-01-15.txt
├── interview-james-2024-01-18.txt
├── survey-results-q1-2024.csv
└── support-tickets-jan-2024.json
```

### Layer 2: Research (Analyzed Findings)

**Location:** `/brand/research/{domain}/RESEARCH.md`

**What it contains:**
- Patterns extracted from raw data
- Direct quotes from interviews
- Statistical findings from surveys
- Competitive positioning observations
- Citations to specific data sources

**Key principle:** Research **references raw data** using markdown links.

**Example (from RESEARCH.md):**
```markdown
## Key Finding: Customers Feel Overwhelmed by Tool Complexity

Our customers consistently report feeling overwhelmed by the number
of features in competing products.

Evidence:
- Sarah (Enterprise user): "I only use 10% of the features, but I'm
  paying for 100%" [Interview transcript](/brand/research/customer-insights/data/interview-sarah-2024-01-15.txt)
- James (SMB owner): "It takes weeks to onboard my team because
  there's so much to learn" [Interview transcript](/brand/research/customer-insights/data/interview-james-2024-01-18.txt)
- Survey data: 73% of respondents rated tool complexity as their
  top pain point [Survey results](/brand/research/customer-insights/data/survey-results-q1-2024.csv)
```

**Notice:** Every claim is backed by a link to raw data.

### Layer 3: Strategy (Brand Guidelines)

**Location:** `/brand/strategy/{domain}/STRATEGY.md`

**What it contains:**
- Positioning decisions
- Voice and tone guidelines
- Messaging frameworks
- Audience definitions
- Strategic recommendations
- Citations to research findings

**Key principle:** Strategy **references research** to justify decisions.

**Example (from positioning STRATEGY.md):**
```markdown
## Core Positioning: Simplicity Over Feature Bloat

Vibeflow positions itself as the simple, focused alternative to
complex enterprise tools.

Strategic rationale:
- Customers are [overwhelmed by feature-heavy competitors](/brand/research/customer-insights/RESEARCH.md#key-finding-customers-feel-overwhelmed-by-tool-complexity)
- Our differentiation is deliberate simplicity, not feature parity
- Target customers who value ease of use over comprehensive feature sets

This positioning is defensible because our research shows 73% of
potential customers prioritize simplicity over features.
```

**Notice:** Strategy links to research, which links to data. The chain is complete.

### Layer 4: Content (Published Output)

**Location:** `/brand/content/{type}/{timestamp-slug}/CONTENT.md`

**What it contains:**
- Blog posts
- Social media posts
- Landing pages
- Email campaigns
- Sales collateral
- Case studies

**Key principle:** Content is **generated using strategy as context**, inheriting its evidence chain.

**Example (Twitter post PLAN.md):**
```markdown
## Context Files

This content will be generated using the following strategy documents:

- Voice guidelines: /brand/strategy/voice/STRATEGY.md
- Voice (Twitter-specific): /brand/strategy/voice/twitter/EXTENSION.md
- Positioning: /brand/strategy/positioning/STRATEGY.md
- Messaging framework: /brand/strategy/messaging/STRATEGY.md

All strategy documents reference research findings, which reference
raw data sources. This ensures the content is evidence-based, not
fabricated.
```

**Example (resulting content):**
```markdown
Stop paying for features you'll never use.

73% of teams say their current tools are too complex.

Vibeflow gives you exactly what you need. Nothing more.

Learn more →
```

**The full chain:**
- Content claim ("73% of teams")
- ← Mentioned in strategy (/brand/strategy/positioning/STRATEGY.md)
- ← Cited in research (/brand/research/customer-insights/RESEARCH.md)
- ← Found in data (/brand/research/customer-insights/data/survey-results-q1-2024.csv)

**Anyone can verify this claim by following the links backward.**

---

## Markdown References: The Citation System

AMA uses standard markdown references as its citation system. This format works for both humans (clickable in editors) and AI agents (programmatically traversable).

### Required Format

```markdown
[descriptive text](/path/to/file.md)
```

**Components:**
- `[descriptive text]` - Human-readable context about what you're linking to
- `(/path/to/file.md)` - The file path to the evidence

**Example:**
```markdown
Customers report being [overwhelmed by complex tools](/brand/research/customer-insights/RESEARCH.md).
```

### Why This Format Matters

**For humans:**
- Clickable in VS Code, Cursor, and most markdown editors
- Opens referenced file directly
- Makes navigation effortless

**For AI agents:**
- Programmatically parseable
- Enables progressive disclosure (load referenced file only when needed)
- Allows agents to verify claims autonomously
- Prevents hallucinations by requiring evidence

**For organizations:**
- Creates institutional knowledge graph
- Makes onboarding faster (new team members can trace reasoning)
- Enables quality audits (verify all claims are supported)
- Supports compliance and legal review

---

## Relative vs Absolute Paths (Critical Rule)

### The Rule: Always Use Relative Paths

**Correct (relative from workspace root):**
```markdown
✅ [customer research](/brand/research/customer-insights/RESEARCH.md)
✅ [positioning strategy](/brand/strategy/positioning/STRATEGY.md)
✅ [interview data](/brand/research/customer-insights/data/interview-sarah.txt)
```

**Incorrect (absolute file system paths):**
```markdown
❌ [customer research](/Users/alex/vibeflow/brand/research/customer-insights/RESEARCH.md)
❌ [positioning strategy](C:\Projects\vibeflow\brand\strategy\positioning\STRATEGY.md)
❌ [interview data](/home/alex/code/vibeflow/brand/research/customer-insights/data/interview-sarah.txt)
```

### Why Relative Paths Are Required

**Portability:**
- Repository clones work on any system
- Different team members have different file system structures
- CI/CD systems have different paths
- Relative paths work everywhere

**Collaboration:**
- Marketing Architect A: Works from `/Users/alice/projects/vibeflow/`
- Marketing Architect B: Works from `/home/bob/work/vibeflow/`
- Same relative paths work for both: `/brand/strategy/voice/STRATEGY.md`

**Version control:**
- Relative paths survive git clones
- Absolute paths break when repository moves
- GitHub/GitLab can render relative links
- Absolute paths can't be rendered

### How to Write Relative Paths

**Start from workspace root:**
```
Workspace: /Users/alex/vibeflow/
File: /Users/alex/vibeflow/brand/strategy/voice/STRATEGY.md
Relative path: /brand/strategy/voice/STRATEGY.md
```

**Always begin with `/brand/` or `/.claude/`:**
```markdown
✅ /brand/research/...
✅ /brand/strategy/...
✅ /brand/content/...
✅ /.claude/skills/...
```

**Never include the system-specific prefix:**
```markdown
❌ /Users/alex/vibeflow/brand/...
❌ C:\Projects\vibeflow\brand\...
❌ /home/alex/code/vibeflow/brand/...
```

---

## Why This Matters for AMA

### Preventing AI Slop

Without audit trails, AI-generated content is **unverifiable**:

**Bad (no evidence chain):**
```
Prompt: "Write a positioning statement for our SaaS product"

Output: "Leading enterprises choose us for our innovative
cloud-native architecture and best-in-class security features."

Problem:
- Is this true? Who knows.
- What research supports this? None referenced.
- Why enterprises? No evidence.
- Why cloud-native? Made up.
```

**Good (with evidence chain):**
```
Prompt: "Write positioning using /brand/strategy/positioning/STRATEGY.md"

Strategy references: "Target customers are [small teams overwhelmed
by enterprise tools](/brand/research/customer-insights/RESEARCH.md)"

Output: "Small teams love Vibeflow because we're simple when
competitors are complex. No overwhelming dashboards. No features
you'll never use. Just what you need."

Verifiable:
- ✅ Claim: "Small teams" ← Supported by research
- ✅ Claim: "Overwhelming competitors" ← Documented in research
- ✅ Claim: "Simplicity focus" ← Stated in strategy
```

### Preventing Hallucinations

**How hallucinations happen:**
1. LLM is asked to generate content about customer pain points
2. LLM has no access to actual customer data
3. LLM generates plausible-sounding but fictitious pain points
4. Content contains fake statistics, invented quotes, made-up scenarios

**How audit trails prevent this:**
1. LLM loads strategy document as context
2. Strategy references research findings with markdown links
3. If LLM needs details, it follows link to research
4. Research contains actual quotes and statistics from real data
5. LLM generates content based on real evidence
6. Every claim is traceable back to source

**Example of prevented hallucination:**

**Without audit trail:**
```
"90% of our customers report 10x productivity gains"
(Where did this stat come from? Nowhere. It's made up.)
```

**With audit trail:**
```
Strategy says: "Customers report significant time savings"
↓ references
Research says: "Interview participants saved 2-5 hours/week"
↓ references
Data: interview-sarah.txt, interview-james.txt (actual transcripts)

Content: "Users report saving 2-5 hours per week"
(This is verifiable. Anyone can check the transcripts.)
```

### Enabling Brand Consistency

**Problem without audit trails:**
- Strategy Team creates positioning in January
- Content Team writes blog post in March
- Blog post contradicts positioning (no one noticed)
- Sales Team creates pitch deck in June
- Pitch deck uses different messaging (no alignment)

**Solution with audit trails:**
- All content loads same strategy documents as context
- Strategy documents are single source of truth
- Changes to strategy automatically affect all new content
- Inconsistencies are visible (different references = different sources)

**Example:**
```
Blog post (March):
Context: /brand/strategy/positioning/STRATEGY.md
Output: "Vibeflow is built for small teams"

Pitch deck (June):
Context: /brand/strategy/positioning/STRATEGY.md
Output: "Vibeflow serves small teams who value simplicity"

Email campaign (August):
Context: /brand/strategy/positioning/STRATEGY.md
Output: "Made for small teams, not enterprise complexity"

All three use the same source → consistent messaging
```

### Supporting Iteration and Evolution

**Audit trails enable safe evolution:**

**Scenario:** Research reveals new customer segment

1. New research execution: `/brand/research/customer-insights/2024-03-15@14:30/`
2. Findings added to research index: `/brand/research/customer-insights/RESEARCH.md`
3. CHANGELOG.md documents what changed
4. Strategy team reviews research changes
5. Strategy updated to reflect new segment
6. CHANGELOG.md documents strategy evolution
7. Future content automatically uses updated strategy

**The audit trail preserves history:**
- Old content → referenced old strategy → referenced old research
- New content → references current strategy → references current research
- Anyone can trace when and why positioning changed

---

## Technical Deep Dive: How Agents Use Audit Trails

### Progressive Disclosure with References

When an agent needs to generate content, it uses audit trails for progressive disclosure:

**Step 1: Load high-level strategy**
```
Agent reads: /brand/strategy/positioning/STRATEGY.md

Finds: "We target [small teams overwhelmed by complexity](/brand/research/customer-insights/RESEARCH.md)"
```

**Step 2: Follow reference if details needed**
```
Agent sees markdown reference in strategy
Agent loads: /brand/research/customer-insights/RESEARCH.md

Finds: "73% of surveyed users rated tool complexity as top pain point"
```

**Step 3: Follow to raw data if verification needed**
```
Agent sees reference to survey data in research
Agent loads: /brand/research/customer-insights/data/survey-results-q1-2024.csv

Finds: Actual survey responses showing 73% statistic
```

**Result:**
- Agent loaded exactly what it needed (3 files)
- Agent verified the claim (traced to source)
- Agent generated accurate content (evidence-based)
- Context budget used efficiently (no unnecessary files)

### Reference Validation

Advanced agents can validate evidence chains:

**Check 1: Are all references valid?**
```
Strategy claims: "Customers feel overwhelmed"
Reference present: ✅ Links to /brand/research/customer-insights/RESEARCH.md
File exists: ✅ File found at specified path
```

**Check 2: Does reference support claim?**
```
Strategy claims: "Customers feel overwhelmed"
Research says: "Customers report feeling overwhelmed by complexity"
Alignment: ✅ Research supports strategy claim
```

**Check 3: Is research backed by data?**
```
Research claims: "73% rated complexity as top pain point"
Reference present: ✅ Links to survey data
Data exists: ✅ CSV file found
Data validates: ✅ Survey shows 73% statistic
```

**If any check fails, agent can:**
- Flag the unsupported claim
- Request additional research
- Refuse to generate content (rather than hallucinate)
- Suggest updates to close evidence gap

---

## Real Examples of Traceable Claims

Let's walk through complete evidence chains from actual AMA usage:

### Example 1: Customer Pain Point Claim

**Content claim:**
> "Most teams struggle with tools that are too complex for their needs."

**Trace the evidence:**

**Step 1: Check content references strategy**
```markdown
Content PLAN.md includes:
- Context: /brand/strategy/positioning/STRATEGY.md
```

**Step 2: Check strategy justifies claim**
```markdown
/brand/strategy/positioning/STRATEGY.md says:

"We position as the simple alternative because customers are
[overwhelmed by complex enterprise tools](/brand/research/customer-insights/RESEARCH.md)."
```

**Step 3: Check research backs this up**
```markdown
/brand/research/customer-insights/RESEARCH.md says:

"73% of respondents rated tool complexity as their top pain point
[Survey results](/brand/research/customer-insights/data/survey-results-q1-2024.csv)"
```

**Step 4: Check raw data exists**
```csv
/brand/research/customer-insights/data/survey-results-q1-2024.csv

question,response,count,percentage
top_pain_point,tool_complexity,146,73%
top_pain_point,high_cost,32,16%
top_pain_point,poor_support,22,11%
```

**Verdict: Claim is fully traceable and verifiable.**

### Example 2: Voice and Tone Claim

**Content claim:**
> Tweet uses casual, conversational tone with light humor

**Trace the evidence:**

**Step 1: Check content references voice strategy**
```markdown
Content PLAN.md includes:
- Voice: /brand/strategy/voice/STRATEGY.md
- Voice (Twitter): /brand/strategy/voice/twitter/EXTENSION.md
```

**Step 2: Check strategy defines this approach**
```markdown
/brand/strategy/voice/STRATEGY.md says:

"We use conversational, approachable language because our customers
are [tired of corporate jargon in the SaaS space](/brand/research/customer-insights/RESEARCH.md)."
```

**Step 3: Check research justifies this**
```markdown
/brand/research/customer-insights/RESEARCH.md says:

"Interview participants consistently mentioned disliking 'corporate
speak' and 'buzzword-filled marketing.' Sarah: 'I want brands that
talk to me like a real person, not a press release.'"
```

**Step 4: Check extension adds platform specifics**
```markdown
/brand/strategy/voice/twitter/EXTENSION.md says:

"Twitter voice: Amplify conversational tone with light humor.
Twitter audience expects casual, authentic communication."
```

**Verdict: Tone choice is evidence-based and platform-appropriate.**

### Example 3: Competitive Positioning Claim

**Content claim:**
> "Unlike feature-bloated competitors, we give you exactly what you need."

**Trace the evidence:**

**Step 1: Check strategy**
```markdown
/brand/strategy/positioning/STRATEGY.md says:

"Competitive differentiation: Simplicity vs feature bloat. Our
[competitive analysis](/brand/research/competitive-analysis/RESEARCH.md)
shows competitors average 200+ features while users report needing
fewer than 20."
```

**Step 2: Check research**
```markdown
/brand/research/competitive-analysis/RESEARCH.md says:

"Competitor analysis:
- CompetitorA: 247 features documented
- CompetitorB: 189 features documented
- CompetitorC: 312 features documented

Customer interviews reveal users actively engage with 15-25
features on average."
```

**Step 3: Check data**
```markdown
/brand/research/competitive-analysis/data/competitor-feature-audit.csv
/brand/research/customer-insights/data/feature-usage-tracking.csv
```

**Verdict: Competitive claim backed by quantitative analysis.**

---

## Marketing Application: Defending Your Strategy

Audit trails transform how you present and defend marketing decisions:

### Scenario 1: Stakeholder Questions Positioning

**Without audit trails:**
```
Stakeholder: "Why are we targeting small teams instead of enterprise?"
Marketer: "It felt like the right audience for our product."
Stakeholder: "But enterprise has bigger budgets."
Marketer: "Uh... we can reconsider?"
Result: Strategy gets overruled by opinions
```

**With audit trails:**
```
Stakeholder: "Why are we targeting small teams instead of enterprise?"
Marketer: "Let me show you the evidence."

Opens: /brand/strategy/positioning/STRATEGY.md
Shows: "We target small teams because [research shows they're
underserved](/brand/research/customer-insights/RESEARCH.md)"

Opens: /brand/research/customer-insights/RESEARCH.md
Shows: "73% of small teams report current tools are built for
enterprise. Direct quotes from 15 interviews support this."

Opens: /brand/research/customer-insights/data/interview-sarah.txt
Shows: "I'm paying for features designed for 1000-person companies.
We're a team of 5."

Stakeholder: "That's compelling. Let's stick with this positioning."
Result: Strategy defended with evidence
```

### Scenario 2: Content Team Questions Voice Guidelines

**Without audit trails:**
```
Content: "Why can't we use more professional language?"
Strategist: "The voice guide says to be casual."
Content: "But that's just one person's opinion."
Strategist: "It's the approved voice."
Result: Content team reluctantly follows, but doesn't understand why
```

**With audit trails:**
```
Content: "Why can't we use more professional language?"
Strategist: "Let me show you why we chose this approach."

Opens: /brand/strategy/voice/STRATEGY.md
Shows: "Conversational tone chosen because [customers reject
corporate jargon](/brand/research/customer-insights/RESEARCH.md)"

Opens: /brand/research/customer-insights/RESEARCH.md
Shows: "15/15 interview participants mentioned disliking 'corporate
speak.' Direct quotes available."

Opens interview transcripts
Shows multiple customer quotes: "Just talk to me like a normal person"

Content: "Oh, this makes sense. Customers actually said this."
Result: Content team understands and embraces voice strategy
```

### Scenario 3: CEO Wants to Change Messaging

**Without audit trails:**
```
CEO: "I think we should emphasize speed instead of simplicity."
Team: "But our messaging is built around simplicity."
CEO: "My gut says speed will resonate better."
Team: "Okay, we'll change everything."
Result: Strategy changes based on opinion, not evidence
```

**With audit trails:**
```
CEO: "I think we should emphasize speed instead of simplicity."
Team: "Let's look at what customers actually told us."

Opens: /brand/research/customer-insights/RESEARCH.md
Shows:
- Simplicity: Mentioned by 73% (146/200 survey respondents)
- Speed: Mentioned by 22% (44/200 survey respondents)

Opens interview transcripts
Shows: 12/15 interviewees spontaneously mentioned complexity pain
Shows: 3/15 interviewees mentioned speed as important

CEO: "The data is clear. Let's stick with simplicity."
Result: Decision made on evidence, not opinion
```

---

## Exercises: Tracing Claims to Sources

### Exercise 1: Follow a Complete Chain

**Scenario:** You encounter this social media post:

```
"84% of small business owners waste 10+ hours per week on admin tasks
that should be automated. Time to reclaim your week."
```

**Your task:** Trace this claim through the evidence chain.

**Steps:**
1. Check content's PLAN.md - What strategy files were used as context?
2. Open referenced strategy file - Does it mention this claim? Where?
3. Follow strategy's markdown reference to research
4. Check research document - Is the 84% statistic present?
5. Follow research's reference to raw data
6. Verify the statistic exists in source data

**Questions to answer:**
- Is the claim fully supported by evidence?
- Are there any broken links in the chain?
- Could you defend this claim to a skeptical stakeholder?
- What raw data file contains the source statistic?

### Exercise 2: Identify Missing Evidence

**Scenario:** You're reviewing a strategy document that says:

```markdown
"Our target customers are mid-sized B2B companies in the fintech
sector who value security and compliance."
```

**Problem:** No markdown references present.

**Your task:**
1. Identify what evidence should exist to support this claim
2. List the research findings needed
3. Specify what raw data would validate those findings
4. Design the complete evidence chain

**Expected evidence chain:**
```
Strategy claim: "Target is mid-sized B2B fintech companies"
Should reference: /brand/research/{what domain?}/RESEARCH.md
Research should say: {what findings support this?}
Research should reference: /brand/research/{domain}/data/{what files?}
```

### Exercise 3: Create Verifiable Strategy

**Scenario:** You have these raw research findings:

**Customer Interviews:**
- 12/15 customers mentioned "too many features"
- 10/15 customers said "I only use 20% of the tool"
- 14/15 customers want "something simpler"

**Survey Data:**
- 78% rated "ease of use" as "very important"
- 82% said their current tool is "more complex than needed"
- Feature usage data shows avg 18 features used out of 150 available

**Your task:** Create a positioning strategy statement with proper markdown references.

**Requirements:**
1. Make a positioning claim based on this data
2. Use markdown references to cite the research
3. Ensure research would cite the raw data
4. Create a complete, verifiable chain

**Template:**
```markdown
## Positioning Statement

[Your positioning claim here]

### Strategic Rationale

This positioning is supported by [research finding link].

Specifically:
- [Claim 1] is backed by [reference to specific research finding]
- [Claim 2] is validated by [reference to survey data]
- [Claim 3] is evidenced by [reference to interview quotes]
```

### Exercise 4: Audit an Existing Document

**Scenario:** You're reviewing a strategy document for evidence quality.

**Your task:** Evaluate this excerpt:

```markdown
## Voice Guidelines

We use a friendly, approachable tone because our customers are
busy professionals who appreciate efficient communication.

We avoid jargon and speak plainly because clarity is important
in our space.

We inject personality into our writing to stand out from
corporate competitors.
```

**Evaluation questions:**
1. How many claims are made? List them.
2. How many claims have evidence? Count them.
3. What research findings should support each claim?
4. Are markdown references present? If not, where should they be?
5. What would you do to make this verifiable?

**Rewrite the excerpt with proper audit trail:**
```markdown
## Voice Guidelines

We use a friendly, approachable tone because [customers report
preferring authentic communication over corporate speak](/brand/research/customer-insights/RESEARCH.md#communication-preferences).

We avoid jargon and speak plainly because [interview participants
consistently cited "clarity" as a top priority](/brand/research/customer-insights/RESEARCH.md#language-preferences).

We inject personality into our writing to [differentiate from
corporate competitors who use generic messaging](/brand/research/competitive-analysis/RESEARCH.md#voice-audit).
```

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Circular References

**Problem:**
```markdown
Strategy says: "Customers want simplicity [see research](/brand/research/customer-insights/RESEARCH.md)"
Research says: "Based on our strategy of targeting simplicity-focused customers [see strategy](/brand/strategy/positioning/STRATEGY.md)"
```

**Why it's wrong:** The chain is circular. Strategy references research which references strategy. No actual evidence.

**Fix:** Research should reference **data**, not strategy.
```markdown
Strategy says: "Customers want simplicity [see research](/brand/research/customer-insights/RESEARCH.md)"
Research says: "Interview data shows 14/15 participants mentioned wanting simpler tools [see transcripts](/brand/research/customer-insights/data/interviews/)"
```

### Mistake 2: Vague References

**Problem:**
```markdown
"Our customers prefer simplicity according to our research."
```

**Why it's wrong:** No specific reference. Which research? Where? What data?

**Fix:** Link to specific document and section.
```markdown
"Our customers prefer simplicity [according to Q1 2024 interview findings](/brand/research/customer-insights/RESEARCH.md#key-finding-customers-overwhelmed-by-complexity)."
```

### Mistake 3: Broken Chains

**Problem:**
```markdown
Strategy references: /brand/research/customer-insights/RESEARCH.md
Research references: (nothing - no data citations)
```

**Why it's wrong:** Chain ends at research. Can't verify the claim.

**Fix:** Research must cite raw data.
```markdown
Research says: "78% prefer simplicity [Survey results](/brand/research/customer-insights/data/survey-q1-2024.csv)"
```

### Mistake 4: Opinion Disguised as Research

**Problem:**
```markdown
Research says: "Customers probably want simplicity because most people do."
```

**Why it's wrong:** This is opinion, not research. No data. No evidence.

**Fix:** Only include claims backed by actual data.
```markdown
Research says: "Customers want simplicity. Evidence: 14/15 interview participants spontaneously mentioned 'too complex' when describing competitor tools [Interview transcripts](/brand/research/customer-insights/data/interviews/)."
```

### Mistake 5: Using Absolute Paths

**Problem:**
```markdown
[Research findings](/Users/alex/vibeflow/brand/research/customer-insights/RESEARCH.md)
```

**Why it's wrong:** Only works on Alex's computer. Breaks for everyone else.

**Fix:** Use relative paths from workspace root.
```markdown
[Research findings](/brand/research/customer-insights/RESEARCH.md)
```

---

## Why This Matters for AMA

### The Verifiable Brand Advantage

Companies using AMA with proper audit trails gain:

**1. Defensible Strategy**
- Every positioning decision backed by evidence
- Stakeholder questions answered with data
- Budget requests supported by research
- No more "gut feeling" decisions

**2. Consistent Execution**
- All content teams use same source of truth
- Messaging stays aligned across channels
- Brand guidelines have clear rationale
- Onboarding is faster (evidence explains "why")

**3. Safe Evolution**
- Strategy changes tracked in CHANGELOG.md
- Historical reasoning preserved
- New team members understand past decisions
- A/B tests have clear success criteria

**4. AI Quality Control**
- Agents can't hallucinate (must cite sources)
- Generated content is verifiable
- Quality audits are automated
- Brand drift is prevented

**5. Institutional Knowledge**
- Research findings persist beyond team changes
- Strategy rationale survives turnover
- New hires can trace decision history
- Knowledge graph grows over time

### The Alternative: Unverifiable Marketing

Without audit trails, you get:

- Strategy based on loudest voice in the room
- Content that drifts from brand over time
- AI-generated slop with no fact-checking
- Inconsistent messaging across channels
- Lost institutional knowledge when people leave
- Inability to defend decisions with data

**Example of drift without audit trails:**

```
Year 1: "We're for enterprise customers" (says marketing VP)
Year 2: VP leaves, new VP says "Actually we're for SMBs"
Year 3: No one remembers why enterprise was chosen
Year 4: Content is a mess - half says enterprise, half says SMB
Year 5: Sales team confused, customers confused, brand unclear
```

**With audit trails:**

```
Year 1: "We're for enterprise" backed by research
Year 2: New VP sees research, understands rationale, maintains course
Year 3: Research still accessible, reasoning clear
Year 4: All content references same strategy (enterprise positioning)
Year 5: Brand is consistent, decision history is clear
```

---

## Summary

In this class, you learned:

**Core concepts:**
- The four-layer evidence chain: Content → Strategy → Research → Data
- Markdown reference format: `[text](/path/to/file.md)`
- Why relative paths are required (portability and collaboration)
- How audit trails prevent AI slop and hallucinations

**Practical skills:**
- Tracing claims from content back to raw data
- Creating verifiable strategy documents
- Identifying gaps in evidence chains
- Using markdown references effectively

**Why it matters:**
- Defensible marketing strategy
- Consistent brand execution
- Quality control for AI-generated content
- Preserved institutional knowledge
- Ability to answer stakeholder questions with evidence

**Key takeaway:**
> Every claim in your marketing should be traceable to evidence. If you can't follow the chain from content to data, the claim isn't verifiable - and it shouldn't be in your marketing.

---

## Transition to Class 6

Now that you understand how to create verifiable evidence chains within your marketing framework, you're ready to learn how multiple AI agents coordinate to execute complex workflows while maintaining these audit trails.

In **Class 6: Agent Coordination and Delegation**, you'll learn:
- How Operations Manager orchestrates multiple specialist agents
- When to delegate work vs executing directly
- How agents pass context efficiently using file references
- The role of sub-agents (Analyst, Strategist, Content Creator)
- How delegation preserves evidence chains across agent handoffs

The audit trails you learned to create in this class become even more powerful when multiple agents use them to coordinate work. Each agent can verify claims, follow references, and build on verifiable foundations.

**See you in Class 6.**
