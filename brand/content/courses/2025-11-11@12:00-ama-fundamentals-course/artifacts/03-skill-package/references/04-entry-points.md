# Class 4: Entry Points and Navigation

**Tagline:** How humans and AI find what they need

---

## Class Overview

### What You'll Learn

In this class, you'll learn how to navigate the AMA workspace efficiently using entry point files, markdown references, and the Extension Pattern. You'll discover how information is organized hierarchically and how to create structures that work for both humans and AI agents.

**Core Learning Objectives:**
- Identify the purpose of entry point files (STRATEGY.md, RESEARCH.md, etc.)
- Use markdown references to create navigation paths
- Apply the Extension Pattern for platform-specific variations
- Navigate between related documents using reference chains
- Design hierarchical information structures

### Building on Previous Classes

This class builds directly on:
- **Class 1 (LLMs)** - Understanding why navigation matters for context management
- **Class 2 (Context/Files)** - Progressive disclosure principle (load what's needed)
- **Class 3 (Three Layers)** - Domain organization and the `/brand/` structure

**New concepts introduced:**
- Entry point files as indexes
- Markdown reference format for navigation
- Extension Pattern (Base + Extension composition)
- Hierarchical information architecture

### Time Estimate

**Total:** 1.5 hours
- Reading: 1 hour
- Exercises: 30 minutes

---

## Why Navigation Matters

### The Navigation Problem

Imagine you're an AI agent asked to create a Twitter thread. You need to know:
- The brand voice guidelines
- Twitter-specific tone adjustments
- Key messaging themes
- Character limits and formatting rules

**Without navigation patterns:**
- You'd need to load ALL strategy files (context overflow)
- You wouldn't know which file contains Twitter rules
- You'd duplicate information across platforms
- Updates would require changing multiple files

**With navigation patterns:**
- Load base voice strategy (universal principles)
- Load Twitter extension (platform specifics)
- Follow references to messaging themes
- Total: 3 focused files instead of entire strategy directory

### Why This Matters for AMA

The AMA architecture is built on **progressive disclosure** - loading exactly what's needed, when needed. Navigation patterns enable this by:

1. **Making information discoverable** - Humans and AI know where to look
2. **Preventing duplication** - One source of truth, referenced everywhere
3. **Enabling composition** - Universal + Specific = Complete context
4. **Supporting verification** - Follow chains from content → strategy → research → data

**The result:** Efficient context usage, maintainable architecture, verifiable outputs.

---

## Entry Point Files

### What Are Entry Point Files?

Entry point files are **UPPERCASE.md** files that serve as **indexes** or **starting points** for navigation. They answer the question: "Where do I begin?"

**The three primary entry points:**

| File | Location | Purpose | Updated By |
|------|----------|---------|------------|
| `RESEARCH.md` | `/brand/research/{domain}/` | Index of accumulated research knowledge | Marketing Architect (MA approved) |
| `STRATEGY.md` | `/brand/strategy/{domain}/` | Current approved brand strategy | Marketing Architect (MA approved) |
| `CONTENT.md` | `/brand/content/{type}/{timestamp-slug}/` | Final content ready for review/publishing | AI agent (MA reviews) |

**Other entry points:**
- `PLAN.md` - Workflow approach and phase breakdown
- `TODO.md` - Workflow progress tracking
- `SKILL.md` - Skill capability definitions
- `CHANGELOG.md` - Evolution tracking for research/strategy
- `EXTENSION.md` - Platform/audience-specific additions

### Entry Points as Indexes

Think of entry point files like the homepage of a website or the table of contents in a book. They provide:

1. **Overview** - High-level summary of what's inside
2. **Navigation** - Links to detailed information
3. **Context** - Enough to understand without reading everything
4. **Discovery** - Help agents find what they need

### Example: STRATEGY.md Structure

```markdown
# Voice Strategy

## Core Principles

Our voice is [friendly but authoritative](/brand/research/customer-insights/RESEARCH.md),
based on research showing customers want [expert guidance without intimidation].

## Universal Guidelines

1. Use conversational tone
2. Avoid jargon unless explaining it
3. Lead with customer benefit

## Platform-Specific Adaptations

Different platforms require different approaches:
- **Twitter:** [View Twitter-specific guidelines](twitter/EXTENSION.md)
- **LinkedIn:** [View LinkedIn-specific guidelines](linkedin/EXTENSION.md)
- **Blog:** [View blog-specific guidelines](blog/EXTENSION.md)

## Related Strategy

- [Messaging themes](/brand/strategy/messaging/STRATEGY.md)
- [Audience personas](/brand/strategy/audience/STRATEGY.md)
```

**Notice:**
- Overview at the top (core principles)
- Universal guidelines (apply everywhere)
- Links to extensions (platform-specific)
- References to related strategy (other domains)

### Why This Matters for AMA

Entry point files enable **progressive disclosure**:

1. Agent starts with `STRATEGY.md` (gets universal principles)
2. Checks for Twitter extension if needed (platform specifics)
3. Follows reference to messaging if needed (additional context)
4. Total context loaded: Only what's necessary for the task

**Without entry points:** Agent would need to load all strategy files, causing context overflow and degraded performance.

---

## Markdown References

### The Navigation Format

AMA uses markdown references as the **primary navigation mechanism**. This format works for both humans (clickable) and AI agents (parseable).

**Required format:**

```markdown
[descriptive text](/path/to/file.md)
```

**Components:**
- `[descriptive text]` - Human-readable description (what you'll find)
- `(/path/to/file.md)` - Relative path from workspace root

### Path Requirements

**Always use relative paths from workspace root:**

```markdown
✅ Correct:
[customer research](/brand/research/customer-insights/RESEARCH.md)

❌ Wrong (absolute system path):
[customer research](/Users/name/project/brand/research/customer-insights/RESEARCH.md)

❌ Wrong (relative to current file):
[customer research](../../research/customer-insights/RESEARCH.md)
```

**Why workspace-relative paths?**
- Work across different machines (after git clone)
- Consistent regardless of current file location
- Easy to validate and maintain
- Compatible with AI agent path resolution

### Reference Types

**1. Evidence references (Strategy → Research):**

```markdown
Customers prefer [simple, focused tools](/brand/research/customer-insights/RESEARCH.md)
over complex all-in-one platforms.
```

**2. Navigation references (Index → Extension):**

```markdown
For Twitter-specific guidelines, see [Twitter voice extension](twitter/EXTENSION.md).
```

**3. Cross-domain references (Strategy → Strategy):**

```markdown
Apply these principles alongside our [messaging themes](/brand/strategy/messaging/STRATEGY.md).
```

**4. Data references (Research → Raw Data):**

```markdown
Based on [customer interview transcripts](/brand/research/customer-insights/data/interviews-2024-02.txt).
```

### How AI Agents Use References

When an agent encounters a reference, it can:

1. **Parse the path** - Extract file location
2. **Read if needed** - Load file content progressively
3. **Follow chains** - Navigate from reference to reference
4. **Verify claims** - Check evidence supports assertions

**Example workflow:**

```markdown
Agent reads: "Our tone is conversational based on [research](/brand/research/voice-testing/RESEARCH.md)"
Agent thinks: "I need to verify this claim"
Agent action: Load /brand/research/voice-testing/RESEARCH.md
Agent confirms: "Yes, research shows customers prefer conversational tone"
```

### Why This Matters for AMA

Markdown references enable:

1. **Progressive disclosure** - Load files only when needed
2. **Audit trails** - Every claim traceable to evidence
3. **Human + AI navigation** - Works for both audiences
4. **No duplication** - Reference, don't copy
5. **Maintainability** - Update once, reflected everywhere

---

## Extension Pattern

### The Problem: Platform-Specific Variations

Your brand voice has **universal principles** (friendly, authoritative, customer-focused) that apply everywhere. But each platform has **specific requirements**:

- **Twitter:** 280 characters, thread structure, casual tone amplified
- **LinkedIn:** Professional context, longer form, expertise emphasized
- **Blog:** Detailed explanations, educational focus, structured formatting

**Without extensions, you'd either:**
1. Duplicate everything (universal + specific in every file)
2. Create separate files per platform (no shared foundation)
3. Mix everything together (hard to find what's universal vs specific)

**Extensions solve this through composition.**

### The Extension Pattern Explained

**Concept:** Base + Extension = Complete Context

```
Parent STRATEGY.md (universal)
    +
Child EXTENSION.md (platform-specific)
    =
Complete guidelines for that platform
```

**Inspired by Next.js layouts:**
- `layout.tsx` - Applies to all pages (universal)
- `page.tsx` - Specific to one route (additions)
- Result: Composition, not duplication

### File Structure

```
/brand/strategy/voice/
├── STRATEGY.md           ← Base: Universal voice principles
├── twitter/
│   └── EXTENSION.md      ← Adds Twitter-specific details
├── linkedin/
│   └── EXTENSION.md      ← Adds LinkedIn-specific details
└── blog/
    └── EXTENSION.md      ← Adds blog-specific details
```

**Reading order for Twitter content:**
1. Read `/brand/strategy/voice/STRATEGY.md` (universal principles)
2. Read `/brand/strategy/voice/twitter/EXTENSION.md` (Twitter additions)
3. Apply both together (composition)

### Extension Pattern Rules

**Extensions are additive only:**
- They **extend**, not replace
- They **add specifics**, not override universals
- They **assume base is read first**

**Base STRATEGY.md contains:**
- Universal principles (apply everywhere)
- Core guidelines (never violated)
- High-level direction (strategic intent)

**EXTENSION.md contains:**
- Platform-specific adaptations
- Channel-specific tone adjustments
- Format-specific requirements
- Tactical implementation details

### Example: Voice Strategy + Twitter Extension

**Base: `/brand/strategy/voice/STRATEGY.md`**

```markdown
# Voice Strategy

## Core Principles

Our voice is:
1. **Friendly** - Conversational and approachable
2. **Authoritative** - Confident in our expertise
3. **Customer-focused** - Always about their benefit

## Universal Guidelines

- Use second person ("you") to address readers
- Lead with customer benefit, not features
- Avoid jargon unless explaining it
- Break complex ideas into simple steps

## Platform-Specific Extensions

Different platforms require adaptations:
- **Twitter:** [View Twitter guidelines](twitter/EXTENSION.md)
- **LinkedIn:** [View LinkedIn guidelines](linkedin/EXTENSION.md)
```

**Extension: `/brand/strategy/voice/twitter/EXTENSION.md`**

```markdown
# Twitter Voice Extension

## Platform Context

Twitter is a fast-paced, conversational platform where:
- Brevity is essential (280 characters)
- Engagement happens through threads
- Tone is more casual than other platforms

## Twitter-Specific Adaptations

### Tone Amplification

While maintaining our [core friendly voice](/brand/strategy/voice/STRATEGY.md):
- **Amplify casualness** - Contractions, sentence fragments OK
- **More personality** - Humor, observations, hot takes welcome
- **Punchy over polished** - Impact > perfection

### Format Requirements

- **Thread structure** - Hook tweet + supporting tweets
- **Character economy** - One idea per tweet
- **Visual breaks** - Line breaks for readability
- **Numbered lists** - Easier to follow in threads

### Examples

**Good Twitter voice:**
"You don't need another tool. You need a system that works with how you already think."

**Explanation:** Casual (contraction), direct, benefit-focused, under 280 chars.

**Avoid on Twitter:**
"Our solution provides comprehensive functionality enabling streamlined workflows."

**Why avoid:** Too formal, jargon-heavy, feature-focused (violates base strategy).
```

**Notice:**
- Extension **references** base strategy (not duplicating)
- Extension **assumes** base principles are known
- Extension **adds** platform-specific details
- Extension **provides examples** showing base + extension together

### When to Use Extensions

**Use extensions when:**
- You have universal principles that apply everywhere
- Different platforms/audiences need specific adaptations
- You want to avoid duplicating universal content
- Specific contexts require tactical adjustments

**Example scenarios:**
- Voice strategy with platform-specific tone adjustments
- Messaging themes with audience-specific framing
- Content guidelines with format-specific requirements

**Don't use extensions when:**
- Content is completely different (create separate domain)
- No universal foundation exists (just use STRATEGY.md)
- Specific overrides universal (extensions should complement, not contradict)

### Technical Deep Dive: Extension Composition

**How agents load extensions:**

```
1. Agent receives task: "Create Twitter content"
2. Agent identifies domain: Voice strategy
3. Agent loads base: /brand/strategy/voice/STRATEGY.md
4. Agent checks for extension: /brand/strategy/voice/twitter/EXTENSION.md
5. Agent composes context: Base principles + Twitter specifics
6. Agent generates content: Using complete context
```

**Context efficiency:**

```
Without extensions:
- /brand/strategy/voice-twitter.md (2000 tokens, includes duplicated universal content)
- /brand/strategy/voice-linkedin.md (2000 tokens, includes duplicated universal content)
- /brand/strategy/voice-blog.md (2000 tokens, includes duplicated universal content)
Total loaded for one platform: 2000 tokens

With extensions:
- /brand/strategy/voice/STRATEGY.md (1200 tokens, universal only)
- /brand/strategy/voice/twitter/EXTENSION.md (800 tokens, specific only)
Total loaded: 2000 tokens (same)

But with 3 platforms:
Without: 6000 tokens total in system (duplication)
With: 3600 tokens total in system (1200 universal + 800×3 specific)

Savings: 40% reduction in total content, easier to maintain
```

### Why This Matters for AMA

The Extension Pattern enables:

1. **No duplication** - Universal content written once
2. **Easy updates** - Change base, all platforms inherit
3. **Clear separation** - Universal vs specific clearly defined
4. **Efficient loading** - Only load what's needed for context
5. **Scalability** - Add new platforms without rewriting universals

---

## Hierarchical Information Architecture

### The Principle: Organize by Concern, Navigate by Entry Point, Reference by Path

**Organize by concern:**
- Group related information in domains
- Separate universal from specific (extension pattern)
- Keep research, strategy, content in distinct layers

**Navigate by entry point:**
- Start with STRATEGY.md, RESEARCH.md, etc.
- Use entry points as indexes to find specifics
- Follow references to load additional context

**Reference by path:**
- Link files via markdown references
- Never duplicate content across files
- Create navigable chains of evidence

### Information Layers

**Layer 1: Entry point (STRATEGY.md)**
- High-level overview
- Core principles
- Navigation to details

**Layer 2: Extensions (EXTENSION.md)**
- Platform-specific adaptations
- Audience-specific variations
- Tactical implementations

**Layer 3: Related domains (cross-references)**
- Links to complementary strategy
- References to supporting research
- Connections to content examples

**Layer 4: Evidence (research + data)**
- Research findings
- Raw data sources
- Validation and support

### Navigation Patterns

**Pattern 1: Top-down (start broad)**

```
Start: /brand/strategy/voice/STRATEGY.md (universal principles)
Then: /brand/strategy/voice/twitter/EXTENSION.md (platform specifics)
Then: /brand/strategy/messaging/STRATEGY.md (complementary strategy)
Then: /brand/research/voice-testing/RESEARCH.md (evidence)
```

**Pattern 2: Bottom-up (verify claim)**

```
Start: Content makes claim about voice
Follow: Reference to /brand/strategy/voice/STRATEGY.md
Follow: Reference to /brand/research/voice-testing/RESEARCH.md
Follow: Reference to /brand/research/voice-testing/data/survey.csv
Verify: Chain is complete and valid
```

**Pattern 3: Cross-domain (find related)**

```
Start: /brand/strategy/voice/STRATEGY.md
Find reference: "Apply with [messaging themes](/brand/strategy/messaging/STRATEGY.md)"
Load: /brand/strategy/messaging/STRATEGY.md
Find reference: "Based on [audience research](/brand/research/audience/RESEARCH.md)"
Load: /brand/research/audience/RESEARCH.md
Result: Complete context for content creation
```

### Real-World Example: Creating Twitter Content

**Task:** Create a Twitter thread about our product.

**Navigation path:**

1. **Start with content domain context**
   - Goal: Understand thread structure requirements
   - Load: Previous example from `/brand/content/twitter-posts/`

2. **Load voice strategy (universal)**
   - Goal: Understand core voice principles
   - Load: `/brand/strategy/voice/STRATEGY.md`
   - Learn: Friendly, authoritative, customer-focused

3. **Load Twitter extension (specific)**
   - Goal: Understand Twitter-specific adaptations
   - Load: `/brand/strategy/voice/twitter/EXTENSION.md`
   - Learn: More casual, punchy, thread structure

4. **Load messaging strategy (themes)**
   - Goal: Identify key messages to communicate
   - Load: `/brand/strategy/messaging/STRATEGY.md`
   - Learn: Lead with simplification, contrast with complexity

5. **Verify with research (evidence)**
   - Goal: Ensure claims are supported
   - Follow reference: `/brand/research/customer-insights/RESEARCH.md`
   - Confirm: Customers want simple solutions

**Total files loaded:** 5 (exactly what's needed)
**Context efficiency:** High (no duplication, focused loading)
**Output quality:** High (complete context, verifiable claims)

### Why This Matters for AMA

Hierarchical architecture enables:

1. **Progressive disclosure** - Load layers as needed
2. **Context efficiency** - Avoid loading unnecessary information
3. **Maintainability** - Update once, reflected everywhere via references
4. **Verifiability** - Follow chains to validate claims
5. **Human + AI** - Works for both audiences

---

## Practical Examples from AMA Workspace

### Example 1: Voice Strategy with Twitter Extension

**Scenario:** You're creating Twitter content and need voice guidelines.

**File structure:**

```
/brand/strategy/voice/
├── STRATEGY.md           # Universal voice principles
└── twitter/
    └── EXTENSION.md      # Twitter-specific adaptations
```

**How to use:**

1. **Read base strategy first:**

```markdown
# Voice Strategy (STRATEGY.md)

Our voice is conversational yet authoritative, based on
[customer research showing preference for approachable expertise].

Universal guidelines:
- Use "you" to address readers
- Lead with benefit, not features
- Break complex ideas into simple steps
```

2. **Then read Twitter extension:**

```markdown
# Twitter Voice Extension (twitter/EXTENSION.md)

Applying our [base voice principles](/brand/strategy/voice/STRATEGY.md)
to Twitter's fast-paced format:

- Amplify casualness: contractions, fragments welcome
- Punchy over polished: impact > perfection
- Thread structure: hook + supporting tweets
```

3. **Result: Complete Twitter voice guidelines**
   - Universal principles (from base)
   - Platform-specific adaptations (from extension)
   - No duplication, clear separation

### Example 2: Messaging Strategy with Audience Extensions

**Scenario:** You're creating content for two different audiences.

**File structure:**

```
/brand/strategy/messaging/
├── STRATEGY.md           # Universal messaging themes
├── developers/
│   └── EXTENSION.md      # Developer-specific framing
└── marketers/
    └── EXTENSION.md      # Marketer-specific framing
```

**Base messaging (STRATEGY.md):**

```markdown
# Messaging Strategy

Core theme: "Simplify your workflow without sacrificing power"

Universal message points:
1. Complexity is the enemy of adoption
2. Simple doesn't mean limited
3. Focus enables mastery
```

**Developer extension (developers/EXTENSION.md):**

```markdown
# Developer Messaging Extension

Applying [core themes](/brand/strategy/messaging/STRATEGY.md) for developers:

Frame complexity as:
- "Unopinionated architecture vs monolithic frameworks"
- "Composable primitives vs all-in-one solutions"

Emphasize:
- Code examples, not abstract concepts
- File-based (familiar to developers)
- Git-compatible (fits existing workflows)
```

**Marketer extension (marketers/EXTENSION.md):**

```markdown
# Marketer Messaging Extension

Applying [core themes](/brand/strategy/messaging/STRATEGY.md) for marketers:

Frame complexity as:
- "Focused tools vs bloated suites"
- "Clear workflows vs confusing dashboards"

Emphasize:
- Outcomes, not technical details
- Brand consistency (their main concern)
- AI assistance (their opportunity)
```

**Result:** Same core message, appropriately framed for each audience.

### Example 3: Following Audit Trails

**Scenario:** You want to verify a claim in published content.

**Content makes claim:**

```markdown
Our customers are drowning in complexity and want simpler tools.
```

**Following the chain:**

1. **Start in content:**
   - File: `/brand/content/blog-posts/2024-03-15@10:30-simplicity-wins/CONTENT.md`
   - Claim: "Customers want simpler tools"
   - Reference: Links to strategy

2. **Check strategy:**
   - File: `/brand/strategy/positioning/STRATEGY.md`
   - Statement: "Position as [the simple alternative to complex tools]"
   - Reference: Links to research

3. **Check research:**
   - File: `/brand/research/customer-insights/RESEARCH.md`
   - Finding: "87% of interviewees cited complexity as top frustration"
   - Reference: Links to data

4. **Check raw data:**
   - File: `/brand/research/customer-insights/data/interviews-transcript-2024-02.txt`
   - Evidence: Direct quotes from customer interviews

**Verification result:** Claim is fully supported by evidence chain.

### Why This Matters for AMA

Real examples demonstrate:

1. **Extension Pattern in practice** - Universal + Specific composition
2. **Reference chains work** - Human and AI can follow them
3. **Audit trails are complete** - Every claim traceable to evidence
4. **Progressive disclosure works** - Load only what's needed
5. **Maintainable at scale** - Update once, reflected everywhere

---

## Common Patterns and Anti-Patterns

### Pattern: Entry Point → Extension → Related

**Good navigation design:**

```markdown
# Voice Strategy (STRATEGY.md)

Core principles: [Universal guidelines here]

Platform-specific adaptations:
- Twitter: [View extension](twitter/EXTENSION.md)
- LinkedIn: [View extension](linkedin/EXTENSION.md)

Related strategy:
- [Messaging themes](/brand/strategy/messaging/STRATEGY.md)
- [Audience personas](/brand/strategy/audience/STRATEGY.md)
```

**Why this works:**
- Clear entry point (STRATEGY.md)
- Progressive disclosure (links to extensions)
- Cross-domain navigation (related strategy)

### Anti-Pattern: Duplicating Content

**Bad: Duplicating universal content**

```markdown
# Twitter Voice (twitter-voice.md)

Core principles: Friendly, authoritative, customer-focused
[Universal guidelines repeated]
[Twitter specifics]

# LinkedIn Voice (linkedin-voice.md)

Core principles: Friendly, authoritative, customer-focused
[Universal guidelines repeated again]
[LinkedIn specifics]
```

**Why this fails:**
- Duplication (universal content in multiple files)
- Maintenance burden (update in multiple places)
- Context waste (loading redundant information)

**Good: Using extensions**

```markdown
# Voice Strategy (STRATEGY.md)

Core principles: Friendly, authoritative, customer-focused
[Universal guidelines once]

# Twitter Extension (twitter/EXTENSION.md)

Applying [base principles](/brand/strategy/voice/STRATEGY.md) to Twitter:
[Twitter specifics only]

# LinkedIn Extension (linkedin/EXTENSION.md)

Applying [base principles](/brand/strategy/voice/STRATEGY.md) to LinkedIn:
[LinkedIn specifics only]
```

**Why this works:**
- No duplication (universal content in one place)
- Easy maintenance (update once)
- Efficient context (load base + relevant extension)

### Pattern: Reference Chains for Verification

**Good: Complete audit trail**

```markdown
Our positioning emphasizes [simplicity over complexity]
(/brand/strategy/positioning/STRATEGY.md), based on research showing
customers are [overwhelmed by tool complexity]
(/brand/research/customer-insights/RESEARCH.md).
```

**Why this works:**
- Claims linked to strategy
- Strategy linked to research
- Complete verification chain

### Anti-Pattern: Unsupported Claims

**Bad: No evidence**

```markdown
Customers love simple tools and hate complexity.
(No references, no evidence)
```

**Why this fails:**
- No verifiability
- Opinion, not evidence
- Can't trace to research

### Pattern: Platform Heuristics in Entry Points

**Good: Guide discovery**

```markdown
# Voice Strategy

## Platform-Specific Guidelines

Choose your platform:
- Creating Twitter content? → [Twitter extension](twitter/EXTENSION.md)
- Writing LinkedIn posts? → [LinkedIn extension](linkedin/EXTENSION.md)
- Publishing blog articles? → [Blog extension](blog/EXTENSION.md)
```

**Why this works:**
- Clear navigation from entry point
- Agents and humans know where to look
- Self-documenting structure

### Anti-Pattern: Hidden Extensions

**Bad: No discovery path**

```markdown
# Voice Strategy

Core principles: [Guidelines]

(No mention of extensions, agent doesn't know they exist)
```

**Why this fails:**
- Extensions not discoverable
- Agent loads only base (incomplete context)
- Missing platform specifics

---

## Exercises

### Exercise 1: Create Markdown References

**Scenario:** You're documenting a positioning strategy that references research.

**Task:** Write three markdown references following AMA format.

**Requirements:**
1. Reference customer research findings
2. Reference competitive analysis
3. Reference messaging strategy (cross-domain)

**Your answer:**

```markdown
Our positioning is based on [customer research findings showing X]
(YOUR REFERENCE HERE) and [competitive analysis revealing Y]
(YOUR REFERENCE HERE). Apply this with our [messaging themes]
(YOUR REFERENCE HERE).
```

**Solution:**

```markdown
Our positioning is based on [customer research findings showing frustration with complexity]
(/brand/research/customer-insights/RESEARCH.md) and [competitive analysis revealing
market gap for simple solutions]
(/brand/research/competitive-analysis/RESEARCH.md). Apply this with our
[messaging themes emphasizing simplification]
(/brand/strategy/messaging/STRATEGY.md).
```

**Key points:**
- Use workspace-relative paths
- Descriptive link text (what you'll find)
- Proper markdown format

---

### Exercise 2: Design Extension Structure

**Scenario:** You have a content guidelines strategy with format-specific requirements.

**Base strategy includes:**
- Writing principles (clarity, conciseness, structure)
- Audience considerations
- Brand voice alignment

**Format-specific needs:**
- Twitter threads (character limits, hook structure)
- Blog posts (SEO, longer form, section structure)
- Email newsletters (subject lines, CTA placement)

**Task:** Design the file structure using the Extension Pattern.

**Your answer:**

```
/brand/strategy/content-guidelines/
├── STRATEGY.md           (your description of what goes here)
├── (your structure here)
```

**Solution:**

```
/brand/strategy/content-guidelines/
├── STRATEGY.md           # Universal writing principles, audience considerations, voice alignment
├── twitter/
│   └── EXTENSION.md      # Thread structure, character limits, hook formulas
├── blog/
│   └── EXTENSION.md      # SEO requirements, section structure, longer form guidelines
└── email/
    └── EXTENSION.md      # Subject line formulas, CTA placement, newsletter format
```

**Explanation:**
- Base STRATEGY.md: Universal principles (apply everywhere)
- Extensions: Format-specific tactical requirements
- Each extension references base (no duplication)

---

### Exercise 3: Follow an Audit Trail

**Scenario:** You're reviewing content that makes this claim:

"Our customers prefer file-based systems because they're familiar with how files work."

**Task:** Design the complete audit trail from content → strategy → research → data.

**Your answer:**

```
Content file: (where is this?)
↓ references
Strategy file: (what strategy supports this?)
↓ references
Research file: (what research validates this?)
↓ references
Data file: (what raw data proves this?)
```

**Solution:**

```
Content file: /brand/content/blog-posts/2024-03-10@14:00-why-files/CONTENT.md
↓ references
Strategy file: /brand/strategy/positioning/STRATEGY.md
(Positioning: "File-based architecture as competitive advantage")
↓ references
Research file: /brand/research/customer-insights/RESEARCH.md
(Finding: "78% of users found file-based systems more intuitive")
↓ references
Data file: /brand/research/customer-insights/data/user-testing-2024-02.csv
(Raw survey responses and usability test results)
```

**Key points:**
- Complete chain from output to data
- Each layer references the next
- Verifiable at every step

---

### Exercise 4: Design Entry Point Navigation

**Scenario:** You're creating a STRATEGY.md for messaging that has:
- Universal themes (apply to all content)
- Audience-specific framing (developers, marketers, executives)
- Related strategy (voice, positioning)

**Task:** Write the navigation section of STRATEGY.md that guides both humans and AI.

**Your answer:**

```markdown
# Messaging Strategy

(Core content here)

## Navigation

(Your navigation design here)
```

**Solution:**

```markdown
# Messaging Strategy

## Core Themes

[Core messaging themes here]

## Audience-Specific Applications

Different audiences require different framing of our core themes:

- **For developers:** [View developer messaging extension](developers/EXTENSION.md)
  - Technical framing, code examples, architecture focus

- **For marketers:** [View marketer messaging extension](marketers/EXTENSION.md)
  - Outcome focus, brand consistency, workflow benefits

- **For executives:** [View executive messaging extension](executives/EXTENSION.md)
  - ROI focus, strategic benefits, competitive positioning

## Related Strategy

Apply these messages with:
- **Voice guidelines:** [View voice strategy](/brand/strategy/voice/STRATEGY.md)
- **Positioning framework:** [View positioning strategy](/brand/strategy/positioning/STRATEGY.md)

## Research Foundation

These themes are based on:
- [Customer insights research](/brand/research/customer-insights/RESEARCH.md)
- [Competitive messaging analysis](/brand/research/competitive-analysis/RESEARCH.md)
```

**Why this works:**
- Clear audience-based navigation
- Descriptive link text (what you'll find)
- Cross-domain references (related strategy)
- Evidence chain (research foundation)

---

## Summary

### Key Takeaways

**1. Entry point files serve as indexes**
- STRATEGY.md, RESEARCH.md, CONTENT.md are starting points
- They provide overview and navigation to details
- They enable progressive disclosure (load what's needed)

**2. Markdown references create navigation paths**
- Format: `[descriptive text](/workspace/relative/path.md)`
- Work for both humans (clickable) and AI (parseable)
- Enable audit trails and verification chains

**3. Extension Pattern enables composition**
- Base STRATEGY.md contains universal principles
- EXTENSION.md adds platform/audience-specific details
- Complete context = Base + Extension (no duplication)

**4. Hierarchical architecture enables efficiency**
- Organize by concern (domains)
- Navigate by entry point (indexes)
- Reference by path (markdown links)
- Load progressively (what's needed, when needed)

**5. Navigation works for humans and AI**
- Entry points guide discovery
- References enable progressive disclosure
- Extensions enable composition
- Audit trails enable verification

### What You Can Do Now

**Immediately:**
- Navigate AMA workspace using entry point files
- Follow markdown references to find details
- Understand Extension Pattern structure
- Read base + extension for complete context

**With practice:**
- Create properly formatted markdown references
- Design extension structures for new domains
- Follow audit trails to verify claims
- Make information discoverable through entry points

**Mastery:**
- Design hierarchical information architectures
- Optimize navigation patterns for efficiency
- Create composable strategy extensions
- Build complete audit trail chains

### Connection to Next Class

**Class 5: Verifiable Audit Trails**

Now that you understand navigation (how to find information), you'll learn about verification (how to prove claims).

**Building on this class:**
- Markdown references (Class 4) → Audit trail chains (Class 5)
- Entry points (Class 4) → Evidence indexes (Class 5)
- Extensions (Class 4) → Strategy verifiability (Class 5)

**What's coming:**
- The audit trail chain: Content → Strategy → Research → Data
- Evidence-based strategy (not opinions)
- Contradiction handling through temporal executions
- Designing research that preserves sources

---

## Further Reading

### AMA Documentation

- **CLAUDE.md** - Complete architectural reference (especially "Entry Point Files" and "Extension Pattern" sections)
- **agentic-orchestrating skill** - Progressive disclosure in practice (`.claude/skills/agentic-orchestrating/SKILL.md`)

### Real Examples in Workspace

- `/brand/strategy/voice/STRATEGY.md` - Example entry point with extension navigation
- `/brand/strategy/voice/twitter/EXTENSION.md` - Example extension (if exists)
- `/brand/research/{domain}/RESEARCH.md` - Example research index with evidence references

### Practice Areas

- Create new extensions for existing strategy domains
- Follow audit trails in real content
- Design navigation for new domains
- Review existing entry points for discovery patterns

---

## Technical Deep Dive

### Path Resolution Logic

**How agents resolve markdown references:**

1. **Parse reference syntax:**
   ```markdown
   [text](/path/to/file.md)
   ```

2. **Extract path component:**
   ```
   Input: [text](/brand/strategy/voice/STRATEGY.md)
   Extracted: /brand/strategy/voice/STRATEGY.md
   ```

3. **Resolve from workspace root:**
   ```
   Workspace: /Users/name/project/
   Reference: /brand/strategy/voice/STRATEGY.md
   Resolved: /Users/name/project/brand/strategy/voice/STRATEGY.md
   ```

4. **Validate file exists:**
   ```javascript
   if (fileExists(resolvedPath)) {
     // Can load if needed
   } else {
     // Broken reference
   }
   ```

5. **Load progressively:**
   ```
   If agent needs voice strategy:
     Load /brand/strategy/voice/STRATEGY.md

   If STRATEGY.md references extension:
     Parse reference to twitter/EXTENSION.md
     Load /brand/strategy/voice/twitter/EXTENSION.md

   If extension references messaging:
     Parse reference to /brand/strategy/messaging/STRATEGY.md
     Load /brand/strategy/messaging/STRATEGY.md
   ```

### Extension Composition Algorithm

**How agents compose base + extension:**

1. **Identify task requirements:**
   ```
   Task: "Create Twitter content"
   Requires: Voice guidelines
   Platform: Twitter
   ```

2. **Load base strategy:**
   ```
   Load: /brand/strategy/voice/STRATEGY.md
   Context: Universal voice principles
   ```

3. **Check for extension:**
   ```
   Check: /brand/strategy/voice/twitter/EXTENSION.md
   Exists: Yes
   ```

4. **Load extension:**
   ```
   Load: /brand/strategy/voice/twitter/EXTENSION.md
   Context: Twitter-specific adaptations
   ```

5. **Compose context:**
   ```
   Complete context = {
     universal: content from STRATEGY.md,
     specific: content from EXTENSION.md
   }
   ```

6. **Apply hierarchically:**
   ```
   When guideline conflicts:
     1. Check if extension explicitly overrides (rare, should be flagged)
     2. Default to base principle (universal wins)
     3. Extension adds specifics (complementary)
   ```

### Reference Graph Traversal

**How agents navigate reference chains:**

```javascript
function followAuditTrail(claim, depth = 0) {
  if (depth > 5) return []; // Prevent infinite recursion

  // Extract references from claim
  const references = parseMarkdownReferences(claim);

  // Load each reference
  const evidence = references.map(ref => {
    const content = loadFile(ref.path);
    const nestedRefs = followAuditTrail(content, depth + 1);

    return {
      path: ref.path,
      content: content,
      evidence: nestedRefs
    };
  });

  return evidence;
}

// Example usage
const claim = "Customers prefer simplicity [based on research](/brand/research/...)";
const trail = followAuditTrail(claim);
// Returns complete chain: claim → strategy → research → data
```

### Performance Optimization

**Strategies for efficient navigation:**

1. **Lazy loading:**
   - Load base, check if extension needed
   - Don't pre-load all possible extensions

2. **Context budgeting:**
   - Track tokens loaded per file
   - Stop loading when budget reached

3. **Reference caching:**
   - Cache frequently accessed files (STRATEGY.md)
   - Invalidate cache when files change

4. **Depth limiting:**
   - Limit reference chain depth (max 5 levels)
   - Prevent infinite reference loops

---

## Marketing Application

### Multi-Channel Content Strategy

**Problem:** Creating consistent brand voice across platforms.

**Without navigation patterns:**
- Duplicate voice guidelines for each platform
- Inconsistent updates (miss updating one platform)
- Context overflow (load all guidelines for every task)

**With navigation patterns:**

1. **Create base voice strategy:**
   ```
   /brand/strategy/voice/STRATEGY.md
   - Universal principles
   - Core tone
   - Brand personality
   ```

2. **Add platform extensions:**
   ```
   /brand/strategy/voice/twitter/EXTENSION.md
   /brand/strategy/voice/linkedin/EXTENSION.md
   /brand/strategy/voice/email/EXTENSION.md
   ```

3. **Reference from content creation:**
   ```markdown
   PLAN.md for Twitter content:
   "Will apply [base voice guidelines](/brand/strategy/voice/STRATEGY.md)
   with [Twitter-specific adaptations](twitter/EXTENSION.md)"
   ```

**Result:**
- Consistent base voice (updated once)
- Platform-appropriate adaptations (clear separation)
- Efficient context loading (base + relevant extension only)

### Campaign Development Workflow

**Scenario:** Launching a new product campaign.

**Navigation path:**

1. **Research phase:**
   - Gather insights → `/brand/research/customer-insights/{timestamp}/`
   - Analyze competition → `/brand/research/competitive-analysis/{timestamp}/`
   - Update indexes with findings

2. **Strategy phase:**
   - Reference research indexes (not executions)
   - Synthesize positioning → `/brand/strategy/positioning/{timestamp}/`
   - Develop messaging → `/brand/strategy/messaging/{timestamp}/`
   - Create audience extensions if needed

3. **Content phase:**
   - Load positioning + messaging strategy
   - Check for audience-specific extensions
   - Create content referencing strategy
   - Strategy references research (complete audit trail)

**Benefits:**
- Clear information flow (research → strategy → content)
- Verifiable claims (audit trails)
- Reusable strategy (future campaigns reference same indexes)
- Maintainable architecture (update strategy, content inherits)

### Brand Consistency at Scale

**Challenge:** Maintaining voice consistency across team and time.

**Solution through navigation:**

1. **Single source of truth:**
   ```
   /brand/strategy/voice/STRATEGY.md
   - All team members reference same file
   - Updates immediately available to everyone
   - No version confusion
   ```

2. **Platform-specific guidance:**
   ```
   Extensions for each channel team
   - Twitter team uses twitter/EXTENSION.md
   - LinkedIn team uses linkedin/EXTENSION.md
   - All inherit from same base
   ```

3. **Audit trail verification:**
   ```
   Content review checklist:
   - Does content follow voice strategy? (check reference)
   - Does voice strategy cite research? (check reference)
   - Does research have data support? (check reference)
   ```

**Result:** Consistent brand voice, verifiable content, scalable system.
