# AMA Content Framework: Research → Strategy → Content

## Executive Summary

The AMA Content Framework is an opinionated protocol for how marketing intelligence flows from research to strategy to content creation. It ensures consistency, traceability, and quality while remaining completely flexible to your specific marketing methodology.

**Core Principle:** We define HOW information flows, you define WHAT it means for your brand.

---

## The Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│ RESEARCH LAYER (Temporal Executions)                    │
│ /research/{domain}/{YYYY-MM-DD}/                        │
│   ├── PLAN.md         (approach)                        │
│   ├── TODO.md         (progress tracking)               │
│   └── artifacts/      (subtasks/subagent findings)      │
│   RESARCH.md          (research output e.g. comp analysis) │
└────────────────┬────────────────────────────────────────┘
                 │ Synthesizes periodically via
                 │ /update-strategy command (for example)
                 ↓
┌─────────────────────────────────────────────────────────┐
│ STRATEGY LAYER (Versioned Snapshot)                     │
│ /strategy/                                              │
│   └── {your-documents}  (current brand truth)           │
│       └── [with citations to research]   
*** add examples here to make it real (like brand-fundamentals.md, tone-of-voice.md etc)
               │
└────────────────┬────────────────────────────────────────┘
                 │ References for every piece via
                 │ /create-content command (for example)
                 ↓
┌─────────────────────────────────────────────────────────┐
│ CONTENT LAYER (Temporal Executions)                     │
│ /content/{type}/{YYYY-MM-DD}/                           │
│   ├── PLAN.md         (content brief)                   │
│   ├── TODO.md         (creation tracking)               │
│   └── artifacts/      (subtasks/subagent output e.g. topic research, keyword research)   
 CONTENT.md (final content file read to review and publish) *** fix the box
└─────────────────────────────────────────────────────────┘
```

---

## Core Protocol Rules

### 1. Unidirectional Information Flow

```
Research → Strategy → Content
```

- **Research discovers insights** through agentic workflows defined by marketing architect
- **Strategy synthesizes decisions** from accumulated research - synthesis from research docs define by markeitng architects
- **Content executes tactics** guided by strategy (what strategy documents are used for context in research creation is defined by marketing architect in commands)

**Never:** Discovery Research → Content (skipping strategy)
**Why:** Strategy is your consistency layer

### 2. Temporal vs Versioned Patterns

**Research & Content = Temporal (Timestamped)**
```
/research/category-landscape/2024-01-15/
/research/category-landscape/2024-02-20/
/content/tweets/2024-02-21_top-10-AI-tools-for-video-generation/
```
- Preserves history
- Enables trend analysis
- Shows evolution over time

**Strategy = Versioned (Current Snapshot)**
```
/strategy/positioning.md (current truth)
/strategy/messaging.md (current truth)
/strategy/tone-of-voice.md (current truth)
```
- Only current state matters
- Git preserves history
- Represents "now"

### 3. Traceability Through Citations

Every claim has an evidence chain:

```
Content: "We make marketing 10x faster"
    ↓ uses strategy docs as context
Strategy: /strategy/positioning.md
    "10x productivity improvement"[^1]
    ↓ cites
Research: /research/customers/2024-01-15/
    "8/10 customers reported 10x time savings"
    ↓ from
Evidence: Survey data, interview transcripts
```

### 4. Progressive Disclosure

Start high-level, drill down only as needed:

```yaml
Creating a tweet:
  Level 1: Strategy overview only
  Level 2: Specific voice guidelines

Creating a blog post:
  Level 1: Strategy overview
  Level 2: Full positioning and messaging
  Level 3: Research citations if needed on specific white space identified in competitor analysis

Creating a campaign:
  Level 1-4: Full stack including all research
```

---

## How It Works: Commands

### Research Execution
```bash
/comp-analysis "AI marketing agencies"
```
Creates timestamped research execution with findings and evidence.

### Strategy Synthesis (Periodic)
```bash
/update-strategy
```
or more specifically:
```bash
/update-tone-of-voice
```

Reviews new research, updates strategy documents with citations, preserves audit trail.

### Content Creation
```bash
/create-tweet "Top 10 AI tools for video generation"
```
Loads relevant strategy, creates content with constraints, includes reference chain.

Marketing architects define what strategy docs are loaded into context for content creation (e.g. prompt will reference the tone-of-voice.md but not the content-calendar.md)

### Freshness Check
```bash
/check-staleness
```
Identifies which strategy documents may need updating based on new research documents.

---

## The Power of Frontmatter

Every document includes smart metadata that enables automation:

### Strategy Document Example
```markdown
---
last_updated: 2024-02-15
last_synthesis: 2024-02-15
research_sources:
  - /research/competitor-analysis/2024-01-15/
  - /research/discover-target-audience/2024-02-12/
content_types: [blog, thought_leadership]
---

# Strategy: Positioning

We own the SMB segment[^1]...

[^1]: Competitor analysis, `/research/competitors/2024-01-15/:42`
```

### What Frontmatter Enables

- **Automatic staleness detection** - Know when strategy is outdated (based on new discovery research, e.g. we might have found a new competitor during our latest `discover-category-landscape` execution that we want to differentiate from)
- **Smart content loading** - Only load relevant strategy for content type
- **Dependency tracking** - Understand what research informed what strategy
- **Audit trails** - Complete traceability from content to evidence

---

## What You Control (Complete Flexibility)

### 1. Your Research Domains
```yaml
Examples:
  - /research/competitor-analysis/
  - /research/voice-of-customer/
  - /research/social-listening/
  - /research/sales-insights/
  - Whatever makes sense for your methodology
```

### 2. Your Strategy Documents
```yaml
Examples:
  - /strategy/brand-foundations/
  - /strategy/positioning/
  - /strategy/messaging/
  - /strategy/tone-of-voice/
  - Whatever framework you prefer
```

### 3. Your Synthesis Logic
```yaml
Your Rules (via configuration):
  "When competitor research shows gaps"
    → "Update positioning differentiation"

  "When customer research reveals new language"
    → "Update voice guidelines"

  "When market trends shift"
    → "Update campaign themes"
```

### 4. Your Content Requirements
```yaml
Your Decisions:
  Blog posts need: [positioning, messaging, voice]
  Social posts need: [voice, one pillar]
  Sales decks need: [everything plus proof points]
```

---

## What The Framework Provides (Opinionated Flow)

### 1. Information Hygiene
- Research always timestamped
- Strategy always versioned
- Content always traceable

### 2. Quality Gates
- No strategy without research citations
- No content generated without referencing strategy in context
- Complete audit trails

### 3. Efficient Operations
- Progressive disclosure prevents overload
- Staleness detection prevents drift
- Clear synthesis boundaries

### 4. Scalability
- New team members follow same flow
- Your expertise encoded in configuration (commands, workflows - these are templated prompts defined by you, the marketing architect)
- Consistency without micromanagement

---

## Example Workflow

### Week 1: Research Sprint
```bash
/research-competitors "AI tools market"
/research-customers "pain point interviews"
/research-market "2024 trends analysis"
```
*Creates timestamped research executions with findings*

### Week 4: Quarterly Synthesis
```bash
/check-staleness
  → Shows strategy is 3 weeks behind research

/update-strategy
  → Synthesizes all January research
  → Updates strategy with citations
  → Commits new snapshot
```
*Strategy documents now reflect latest insights*

### Daily: Content Creation
```bash
/create-content blog "Why SMBs need AI"
  → Loads positioning + messaging + voice
  → Generates with strategy constraints
  → Includes full audit trail
```
*Content is on-brand and defensible*

---

## Configuration Example

You define your rules in simple markdown:

`.claude/skills/synthising-strategy/SKILL.md`
```markdown
# Guide on updating strategy documents with new research

## Tone of voice
Update the tone of voice to reflect the latest versions of the following research documents. Only make changes if the research documents below are newer than our tone-of-voice.md
- research/competitor-analysis.md
- research/analyse-customer-sentiment.md

## Target Personas
...

### 
```

---

## Why This Approach?

### For You (Marketing Architect)
- **Your methodology, systematized** - Not forced into our framework
- **Your expertise, preserved** - In prompts, not code
- **Your flexibility, maintained** - Change strategy without breaking system

### For Your Team
- **Consistency without oversight** - System enforces your standards
- **Onboarding made simple** - Clear flow to follow
- **Quality guaranteed** - Can't skip steps or lose traceability

### For Your Content
- **Always on-brand** - Constrained by your strategy
- **Always defensible** - Full audit trail to evidence
- **Always current** - Staleness detection prevents drift

---

## Implementation Path

### Phase 1: Setup
1. Define your research domains (or use our pre built onboarding documents)
2. Create initial strategy structure
3. Configure synthesis rules
4. Test with one research → strategy cycle

### Phase 2: Refinement (re-run research ad-hoc or periodically)
1. Run full research sprint
2. Execute strategy synthesis
3. Create content with new system

---

## Key Questions for You

1. **Research Domains**: What research do you typically conduct?
2. **Strategy Documents**: How do you organize brand strategy?
3. **Synthesis Logic**: How does research become strategy decisions?
4. **Content Types**: What content do you produce and what strategic documentation does each need?
5. **Update Cadence**: How often should strategy be refreshed?

---

## Next Steps

1. **Review this framework** - Does the flow make sense?
2. **Map your methodology** - How would your approach fit?
3. **Identify customizations** - What's unique about your process?
4. **Provide feedback** - What's missing or needs adjustment?
4. **Concerns** - What processes that you carry out could break this flow?

---

## Summary

The AMA Content Framework provides the **pipes** (information flow) while you provide the **intelligence** (what flows through them).

**We enforce:**
- Research → Strategy → Content flow
- Temporal and versioned patterns
- Citations and traceability
- Agentic best practices when executing your marketing workflows (progressive disclosure, subagent delegation)

**You define:**
- What research to conduct (via skill workflows)
- What strategy documents to maintain
- How research becomes strategy
- What strategic documents each content creation requires

Together, we create a system that's both **rigorous** (no quality compromises) and **flexible** (your methodology, your way).

---

*This framework is designed to scale your marketing expertise through systematic execution while preserving the flexibility that makes your approach unique.*