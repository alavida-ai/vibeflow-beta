---
argument-hint: URL of X post to analyse
---

# Analyze X Post for Content Framework

The user wants to reverse-engineer a successful post to extract psychological triggers, structural patterns, and persuasion mechanisms that can inform their own content creation.

## Process

1. **Scrape** the post using x-scraper to get raw content and metadata
2. **Analyze** using the [Analyzing Content Framework](/skills/x-execution/workflows/analysing-content.md)
3. **Extract** top psychological triggers, structural patterns, and persuasion mechanisms
4. **Save** as a single markdown framework file to `/brand/strategy/x-strategy/framework/`
5. **Reference** in future [Creating Content](/skills/x-execution/workflows/creating-content.md) workflows

## Variables

post_url: $ARGUMENTS

## Output Specification

**Location:** `/brand/strategy/x-strategy/framework/{topic-or-creator}-framework.md`

**File contents:**
- Executive summary of top 2-3 psychological triggers
- Structural patterns and frameworks identified
- Key persuasion mechanisms and language choices
- Actionable principles for your own content variations

Each analysis is one focused MD file, reusable across future content creation.

