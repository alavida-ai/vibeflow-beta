---
name: creating-content
description: Transforms brand strategy into on-brand content across channels. A content creator's guide to strategy-driven content production.
---

# Creating Content

Knowledge base for creating on-brand content that's guided by strategy and optimized for each channel.

## Core Philosophy

**Strategy-Driven Creation:** Every piece of content should reinforce brand positioning, express brand voice, and resonate with the target audience.

**Content ≠ Strategy:** Content is the tactical expression of strategic decisions. Strategy documents guide what to say and how to say it; content is the execution.

---

## Content Creation Principles

### 1. **Always Load Strategy Context**
Content is never created in a vacuum. Each content workflow loads relevant strategy documents to ensure brand alignment.

### 2. **Multi-Phase Approach**
Quality content requires staged thinking:
- **Ideation** - What should we create? (Strategy-driven)
- **Drafting** - How do we express it? (Voice-driven)
- **Review** - Does it align with brand? (Quality control)

### 3. **Channel Optimization**
Content adapts to channel conventions while maintaining brand consistency. Platform-specific strategy extensions guide these adaptations.

### 4. **Progressive Disclosure**
Load only the strategy documents needed for each phase. Don't burden agents with unnecessary context.

---

## Content vs Strategy

| Aspect | Strategy | Content |
|--------|----------|---------|
| **Purpose** | Guide decisions | Execute decisions |
| **Lifecycle** | Polished, git versioned | Temporal, date-stamped |
| **Location** | `/strategy/` | `/content/` |
| **Perspective** | Prescriptive | Expressive |
| **Updates** | When research changes | Continuously created |

---

## Content Workflows

Each workflow follows a **multi-phase creation pattern** using the orchestration skill:

### Available Workflows

- [Tweet Creation](workflows/tweets/WORKFLOW.md) - Create strategy-aligned Twitter content

*(Additional content type workflows will be added here)*

---

## Standard Content Execution Structure

```
/content/{type}/{YYYY-MM-DD@HH:mm-content-slug-title}/
├── PLAN.md              # Content brief (strategy references)
├── TODO.md              # Creation tracking
├── artifacts/           # Phase outputs (ideation, drafts, reviews)
│   ├── 01-ideation.md
│   ├── 02-draft.md
│   └── 03-review.md
└── CONTENT.md           # Final content ready to publish
```

---

## Strategy Loading Pattern

Different content phases load different strategy combinations:

### Phase 1: Ideation
**Load:**
- Positioning (differentiation frame)
- Messaging (key themes)
- Audience (what resonates)

**Purpose:** Generate content ideas that reinforce positioning

---

### Phase 2: Drafting
**Load:**
- Voice (base voice)
- Voice/{channel} Extension (channel-specific)
- Messaging (selected theme)

**Purpose:** Write on-brand content in the right voice

---

### Phase 3: Review
**Load:**
- Brand Fundamentals (values check)
- Positioning (differentiation check)

**Purpose:** Validate brand integrity before publishing

---

## Content Creation Flow

```
1. USER REQUEST
   "Create a tweet about [topic]"
   ↓
2. LOAD WORKFLOW
   Read workflow definition for content type
   ↓
3. CREATE EXECUTION FOLDER
   /content/tweets/{YYYY-MM-DD@HH:mm-topic-slug}/
   ↓
4. PHASE 1: IDEATION
   Load: Positioning + Messaging + Audience
   Output: artifact/01-ideation.md
   ↓
5. PHASE 2: DRAFTING
   Load: Voice + Voice/Twitter + Messaging
   Output: artifact/03-draft.md
   ↓
6. PHASE 3: REVIEW
   Load: Brand Fundamentals + Positioning
   Output: artifact/03-review.md
   ↓
7. FINALIZE
   Approved content → CONTENT.md
   ↓
8. PUBLISH
   User reviews and publishes
```

---

## Invocation

Content creation workflows are typically invoked conversationally:

```
"Create a tweet about [topic]"
"Write a LinkedIn post about [theme]"
"Generate a blog post outline for [subject]"
```

Or via slash commands (to be added):
```
/content:tweet
/content:linkedin-post
/content:blog-post
```

---

## Quality Standards

All content must:
- ✅ Align with brand positioning (reinforces differentiation)
- ✅ Express brand voice (sounds like us)
- ✅ Resonate with audience (addresses their needs)
- ✅ Support messaging strategy (communicates key themes)
- ✅ Uphold brand values (passes integrity check)

---

## Progressive Disclosure in Action

**Bad approach:**
Load all 5 strategy files + all extensions into one agent → overwhelming context

**Good approach:**
- Phase 1 agent: Loads 3 strategy files by path
- Phase 2 agent: Loads 3 different strategy files by path
- Phase 3 agent: Loads 2 strategy files by path

Each agent gets exactly what it needs, when it needs it.

---

## Notes

- Content executions are **temporal** (date-stamped) because content is output
- Strategy is **timeless** (git versioned) because strategy is guidance
- Content references strategy via markdown links for audit trail
- Multiple content pieces can be created simultaneously in separate execution folders
