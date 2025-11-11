# Class 2: The Context Problem (And Why Files Are The Solution)

**Tagline:** From overwhelming dumps to selective loading

**Estimated Time:** 1.5 hours (1 hour reading, 30 min exercises)

**Prerequisites:** Class 1 (How LLMs Actually Work)

---

## Class Overview

In Class 1, you learned that LLMs have fundamental limitations: they're stateless, they have fixed context windows, and they can't remember information between conversations. You learned that tokens are expensive resources and that attention degrades as context fills up.

Now comes the critical question: **If LLMs have these limitations, how do we work with them effectively?**

The answer lies in understanding a common anti-pattern (what NOT to do) and adopting a better approach (what to do instead). This class teaches you:

1. **The Context Dumping Problem** - Why "give the AI everything" fails catastrophically
2. **Progressive Disclosure** - The principle of loading only what's needed, when needed
3. **File Systems as Knowledge Graphs** - How folders and markdown references solve context management
4. **Practical Patterns** - Real examples of efficient vs inefficient context loading

By the end of this class, you'll understand why the AMA methodology is built on files and references rather than monolithic documents or database storage.

---

## The Context Dumping Problem

### What Is Context Dumping?

**Context dumping** is the anti-pattern of giving an LLM all available information at once, regardless of whether it's relevant to the current task.

**Common examples:**
- Pasting your entire brand strategy document into every content creation prompt
- Loading all research findings when you only need competitive analysis
- Including complete documentation when you only need a single section
- Dumping every style guideline when you're writing a single tweet

**Why people do it:**
The intuition makes sense: "The AI needs to know everything to make good decisions, so I'll give it everything."

**Why it fails:**
Remember from Class 1 that LLMs have:
1. **Fixed context windows** (Claude Sonnet 4.5 has ~200K tokens)
2. **Degrading attention** (performance drops as context fills)
3. **Token-based processing** (every token costs time and compute)

When you dump everything into context, several problems emerge:

### Problem 1: Context Overflow

**What happens:** You exceed the model's context window and get an error, or the model truncates your input, cutting off critical information.

**Real example:**
```
User prompt: 5,000 tokens
Brand guidelines: 50,000 tokens
Research findings: 40,000 tokens
Past content examples: 30,000 tokens
Strategy documents: 45,000 tokens
Total: 170,000 tokens
```

This seems fine (under 200K), but:
- You need tokens for the AI's response (often 2,000-5,000 tokens)
- You haven't included conversation history yet
- You're dangerously close to the limit
- Add one more document and you overflow

### Problem 2: Signal-to-Noise Ratio Collapse

**What happens:** The information the AI actually needs gets buried in irrelevant context.

**Real example:**
```
Task: Write a Twitter thread about our product's new feature

Context dumped:
- Complete brand positioning (5,000 tokens)
- Full voice guide covering Twitter, LinkedIn, blog, email (15,000 tokens)
- Entire product documentation (30,000 tokens)
- All competitive research (20,000 tokens)
- Complete messaging framework (10,000 tokens)

What was actually needed:
- Twitter voice guidelines (1,500 tokens)
- New feature description (500 tokens)
- Key messaging for this feature (1,000 tokens)

Efficiency: 3,000 tokens needed / 80,000 tokens loaded = 3.75% signal
```

**Result:** The AI has to sift through 96.25% irrelevant information to find what it needs. This:
- Increases processing time
- Reduces response quality (attention dilution)
- Wastes token budget
- Makes it harder for the AI to focus

### Problem 3: Attention Degradation

**What happens:** Even if you stay under the context limit, the model's ability to attend to relevant information degrades as context fills.

**Why this happens:**
LLMs use attention mechanisms to weigh the importance of different parts of the context. As context grows:
- Attention must be distributed across more tokens
- The model struggles to identify what's actually relevant
- Important details get "lost in the noise"
- Output quality decreases even though all the information is technically present

**Real example:**
```
Scenario 1: Focused context (5,000 tokens)
AI correctly identifies key points: 95% of the time

Scenario 2: Bloated context (80,000 tokens with same 5,000 tokens of relevant info)
AI correctly identifies key points: 70% of the time

Same information, worse performance due to noise.
```

### Problem 4: Maintenance Nightmare

**What happens:** When everything is in one place, changes ripple everywhere.

**Real example:**
```
You have a monolithic "brand-guide.md" (50,000 tokens) containing:
- Positioning
- Voice for all platforms
- Messaging
- Visual identity
- Product descriptions
- Customer research

You update the Twitter voice guidelines (one section, 500 tokens).

Impact:
- Every agent that loads "brand-guide.md" now loads the updated version
- Even agents working on LinkedIn content (don't need Twitter updates)
- Even agents doing research (don't need voice guidelines at all)
- Change tracking becomes impossible (what changed? everything's in one file)
- Versioning requires duplicating the entire 50,000-token document
```

### Problem 5: No Path to Scale

**What happens:** As your knowledge base grows, the context dumping approach becomes unsustainable.

**Growth pattern:**
```
Week 1: Brand guide is 10,000 tokens → manageable
Month 1: Added research, now 30,000 tokens → getting tight
Month 3: Added more platforms, now 60,000 tokens → painful
Month 6: Added case studies and examples, now 120,000 tokens → breaking
Year 1: Comprehensive knowledge base, 300,000+ tokens → impossible
```

You can't context-dump 300,000 tokens. You're forced to:
- Manually select what to include (error-prone, inconsistent)
- Compress information (lose critical details)
- Split into arbitrary chunks (lose coherence)
- Give up on comprehensive context (accept mediocre outputs)

### Why This Matters for AMA

The AMA methodology is designed to scale from a solo founder with one product to a multi-brand enterprise with years of accumulated research and strategy. Context dumping makes this impossible.

**Without solving context management, you cannot:**
- Accumulate knowledge over time (too much to load)
- Maintain consistency across outputs (can't load relevant guidelines)
- Preserve evidence trails (too much to navigate)
- Enable agent collaboration (can't coordinate context loading)
- Scale beyond simple tasks (complexity requires more context)

This is why AMA is built on **progressive disclosure** rather than monolithic documents.

---

## Progressive Disclosure: The Solution

### What Is Progressive Disclosure?

**Progressive disclosure** is the principle of revealing information incrementally, showing only what's needed at each step.

**In user interfaces:**
- Show basic options first, advanced settings behind a menu
- Display summaries, expand to details on click
- Present overview, drill down to specifics on demand

**In AI context management:**
- Load high-level documents first
- Load detailed sections only when needed
- Follow references to related information on demand
- Keep irrelevant information out entirely

### The Four Rules of Progressive Disclosure

#### Rule 1: Load Base Document First

**Pattern:** Start with the highest-level document that contains core principles.

**Example (AMA voice strategy):**
```
Step 1: Load /brand/strategy/voice/STRATEGY.md (2,000 tokens)
        Contains: Universal voice principles, tone attributes, what NOT to say

This provides:
- Core voice identity
- Guardrails that apply everywhere
- References to platform-specific extensions
```

**Why this works:**
- Establishes foundation before details
- Keeps initial context minimal
- Provides navigation map to deeper information

#### Rule 2: Check for Extensions When Needed

**Pattern:** If platform/audience-specific details are required, load extensions that augment the base.

**Example (Twitter content creation):**
```
Step 1: Loaded /brand/strategy/voice/STRATEGY.md (2,000 tokens)
Step 2: Check for Twitter extension
        Found: /brand/strategy/voice/twitter/EXTENSION.md (1,200 tokens)
        Contains: Twitter-specific tone adjustments, thread formatting, emoji usage

Total context: 3,200 tokens (vs 15,000 if we dumped all platform guides)
```

**Why this works:**
- Extensions are additive only (don't replace base)
- Only load platforms you're actually using
- Composition keeps documents focused

#### Rule 3: Follow References Only When Required

**Pattern:** When a document references another file, load it only if relevant to the current task.

**Example (Strategy development):**
```
Reading: /brand/strategy/positioning/STRATEGY.md

Contains reference: "Based on [customer pain points](/brand/research/customer-insights/RESEARCH.md)"

Decision tree:
- If task is "Create positioning" → Load research (need evidence)
- If task is "Generate content with positioning" → Don't load (positioning already contains synthesized insights)
- If task is "Validate positioning claims" → Load research (need to verify)
```

**Why this works:**
- References are signposts, not mandates
- Load based on task requirements, not "just in case"
- Enables verification without forcing it

#### Rule 4: Pass Paths, Not Content

**Pattern:** When coordinating between agents or phases, provide file paths rather than inlining content.

**Example (Agent delegation):**
```
❌ Bad (context dumping):
"Strategist Agent, create positioning using these insights: [paste 40,000 tokens of research]"

✅ Good (progressive disclosure):
"Strategist Agent, create positioning. Load insights from:
- /brand/research/customer-insights/RESEARCH.md
- /brand/research/competitive-analysis/RESEARCH.md
You'll need the competitor landscape section specifically."
```

**Why this works:**
- Each agent loads exactly what it needs
- No duplicate context across agent conversations
- Guidance narrows scope without forcing irrelevant information

### Progressive Disclosure in Action

**Scenario:** Creating a Twitter thread about a new product feature

**Context dumping approach:**
```
Load everything:
1. Complete brand positioning (5,000 tokens)
2. Full voice guide (15,000 tokens) - includes Twitter, LinkedIn, blog, email
3. Entire product docs (30,000 tokens)
4. All features and roadmap (10,000 tokens)
5. Complete messaging framework (8,000 tokens)
6. All customer research (25,000 tokens)

Total: 93,000 tokens
Relevant: ~5,000 tokens (5.4% signal)
Time to process: High
Attention quality: Degraded
```

**Progressive disclosure approach:**
```
Phase 1: Load high-level context
1. /brand/strategy/voice/STRATEGY.md (2,000 tokens) - core voice
2. /brand/strategy/voice/twitter/EXTENSION.md (1,200 tokens) - Twitter specifics
3. /brand/strategy/messaging/STRATEGY.md (3,500 tokens) - key messages

Phase 2: Load specific product info
4. /brand/research/product/features/new-feature-brief.md (1,500 tokens)

Phase 3 (optional): Load supporting evidence if needed
5. Referenced only if claim needs verification

Total: 8,200 tokens (loaded)
Relevant: 8,200 tokens (100% signal)
Time to process: Low
Attention quality: High
```

**Result:**
- 91% reduction in context size
- 100% vs 5.4% signal-to-noise ratio
- Same or better output quality
- Faster processing
- Can scale as knowledge base grows

### Why This Matters for AMA

Progressive disclosure is the foundation of everything in AMA:

**Three-Layer Framework:**
- Research → Strategy → Content (load layers progressively, not all at once)

**Extension Pattern:**
- Base + Extension (compose context, don't duplicate)

**Markdown References:**
- References provide paths for progressive loading

**Agent Delegation:**
- Each specialist loads only its domain (Analyst loads research, Strategist loads research + synthesizes, Content Creator loads strategy)

**Temporal Executions:**
- Load current index, reference historical executions only when needed

Without progressive disclosure, none of these patterns work at scale.

---

## File Systems as Knowledge Graphs

### Why Files?

You might ask: "Why use files and folders? Why not a database? Why not a CMS?"

The answer: **File systems are already knowledge graphs, and they're optimized for exactly what we need.**

### What Is a Knowledge Graph?

A **knowledge graph** is a structured representation of information where:
- **Nodes** represent entities (concepts, documents, data points)
- **Edges** represent relationships between entities
- **Traversal** allows navigation from one entity to related entities

**Common knowledge graph applications:**
- Google's knowledge graph (entities and facts about them)
- Wikipedia (articles linked via references)
- Research databases (papers citing other papers)
- Your brain (neurons forming associative networks)

### File Systems ARE Knowledge Graphs

**Nodes:**
- Each file is a node (e.g., `STRATEGY.md`, `RESEARCH.md`, `feature-brief.md`)

**Edges:**
- Folder hierarchy (parent/child relationships)
- Markdown references (explicit citations: `[text](/path/to/file.md)`)
- Naming conventions (implicit relationships: `voice/twitter/EXTENSION.md` extends `voice/STRATEGY.md`)

**Traversal:**
- Humans navigate via file explorers and clicking links
- AI agents navigate by reading paths and following references
- Both use the same structure, no translation layer needed

**Example knowledge graph (voice strategy):**
```
/brand/strategy/voice/STRATEGY.md (node: base voice principles)
    ├─ references → /brand/research/customer-insights/RESEARCH.md (edge: evidence)
    ├─ contains → twitter/EXTENSION.md (edge: extension)
    ├─ contains → linkedin/EXTENSION.md (edge: extension)
    └─ references → /brand/strategy/positioning/STRATEGY.md (edge: context)

Traversal example:
Start: voice/STRATEGY.md
Follow edge: twitter/EXTENSION.md (get platform-specific details)
Follow edge: customer-insights/RESEARCH.md (verify claim about tone preference)
```

### Advantages of File-Based Knowledge Graphs

#### 1. Human-Readable and AI-Readable

**Files are text:**
- Humans can read them in any editor
- AI can read them using standard tools (Read file, Glob patterns, Grep search)
- No special tooling required
- No "export" or "dump" step needed

**Markdown is universal:**
- Supported by every code editor, note-taking app, and documentation tool
- Renders beautifully in GitHub, Notion, Obsidian, VS Code, etc.
- Future-proof (been around for 20+ years, will be around for 20+ more)

#### 2. Version Control

**Files work with Git:**
- Track every change with full history
- See exactly what changed, when, and why
- Branch for experiments, merge when approved
- Rollback to previous versions trivially
- Collaborate with pull requests and reviews

**Example (Git for brand strategy):**
```bash
# See what changed in voice strategy
git diff brand/strategy/voice/STRATEGY.md

# See who made the change and why
git log brand/strategy/voice/STRATEGY.md

# Revert to version from last week
git checkout 2024-03-01 -- brand/strategy/voice/STRATEGY.md

# Create experimental positioning branch
git checkout -b experiment-new-positioning
```

#### 3. Separation of Concerns

**Files naturally separate concerns:**
- One file = one domain (voice, positioning, messaging)
- One folder = one category (research, strategy, content)
- Hierarchy reflects logical organization

**Example (natural separation):**
```
/brand/strategy/
├── voice/           ← All voice-related strategy
├── positioning/     ← All positioning-related strategy
├── messaging/       ← All messaging-related strategy
└── audience/        ← All audience-related strategy

Each can evolve independently.
Each can be loaded independently.
Each maintains its own history.
```

Compare to monolithic approaches:
```
# Database approach
SELECT * FROM brand_strategy WHERE domain = 'voice'
(Requires query language, database access, export step)

# CMS approach
API call to /api/strategy/voice
(Requires API, authentication, parsing)

# File approach
Read /brand/strategy/voice/STRATEGY.md
(Direct access, no intermediary)
```

#### 4. Composable and Modular

**Files compose naturally:**
- Base document + Extension = Complete context
- Multiple references = Comprehensive evidence
- Folder structure = Logical grouping

**Example (composition):**
```
Twitter content creation:

Load base voice:
/brand/strategy/voice/STRATEGY.md (universal principles)

Compose with extension:
+ /brand/strategy/voice/twitter/EXTENSION.md (platform specifics)

Reference messaging:
+ /brand/strategy/messaging/STRATEGY.md (key themes)

Result: Composed context without duplication
```

#### 5. Explicit Over Implicit

**Markdown references make relationships visible:**
- You can see what references what
- You can follow citation chains
- You can identify missing links
- You can validate evidence trails

**Example (explicit evidence chain):**
```markdown
# Positioning Strategy

Our primary differentiator is simplicity. Customers are [overwhelmed by complexity](/brand/research/customer-insights/RESEARCH.md) in existing tools.

This creates an [underserved segment](/brand/research/competitive-analysis/RESEARCH.md) focused on ease-of-use over feature depth.
```

**What you can see:**
- Two claims (simplicity differentiator, underserved segment)
- Two evidence sources (customer insights, competitive analysis)
- Direct paths to verify both claims

**What you can do:**
- Click links to verify (human navigation)
- Follow paths to load context (AI navigation)
- Identify if links break (evidence is missing)
- Trace outputs back to inputs (audit trail)

Compare to implicit approaches:
```markdown
# Bad: No references
Our primary differentiator is simplicity. Customers are overwhelmed by complexity.

(How do you know? Where's the evidence? Can't verify.)
```

#### 6. Progressive Disclosure Native

**File systems enable progressive disclosure by default:**

**Hierarchical loading:**
```
Read: /brand/strategy/voice/STRATEGY.md
  ↓ mentions twitter
Read: /brand/strategy/voice/twitter/EXTENSION.md
  ↓ references research
Read: /brand/research/customer-insights/RESEARCH.md
```

**Selective loading:**
```
Task: Twitter content

Load:
✅ /brand/strategy/voice/twitter/EXTENSION.md

Don't load:
❌ /brand/strategy/voice/linkedin/EXTENSION.md
❌ /brand/strategy/voice/email/EXTENSION.md
❌ /brand/strategy/voice/blog/EXTENSION.md

(Other extensions exist, but not relevant to task)
```

**Reference-based depth:**
```
Level 0: Read STRATEGY.md (high-level)
Level 1: Follow references in STRATEGY.md (supporting context)
Level 2: Follow references in Level 1 files (deep evidence)

Load depth based on task requirements:
- Quick content: Level 0
- Thoughtful content: Level 0 + Level 1
- Strategy validation: Level 0 + Level 1 + Level 2
```

### Why This Matters for AMA

AMA is built on files because:

1. **Files are knowledge graphs** - Natural representation of relationships
2. **Markdown references are edges** - Explicit, navigable connections
3. **Folder hierarchy is structure** - Logical organization, separation of concerns
4. **Progressive disclosure is native** - Load what's needed, when needed
5. **Human and AI alignment** - Both navigate the same structure
6. **Version control works** - Git tracks every change
7. **Future-proof** - Files and markdown will outlive any proprietary system

Alternative approaches (databases, CMSs, wikis) require:
- Translation layers (export, API calls, queries)
- Special tooling (database clients, API keys)
- Vendor lock-in (proprietary formats, platforms)
- Separation of human/AI interfaces (different ways to access)

Files eliminate all of this. They're the simplest thing that works, and they scale.

---

## Markdown References as Navigation Paths

### The Power of `[text](/path/to/file.md)`

Markdown reference syntax is deceptively simple:
```markdown
[descriptive text](/path/to/file.md)
```

But this simple format enables:
- Human navigation (click to follow)
- AI navigation (read path, load file)
- Evidence trails (trace claims to sources)
- Progressive disclosure (load on demand)
- Knowledge graph traversal (edges between nodes)

### Three Types of References in AMA

#### 1. Evidence Citations (Strategy → Research)

**Purpose:** Link claims in strategy to research findings that support them.

**Example:**
```markdown
# /brand/strategy/positioning/STRATEGY.md

Our positioning centers on "marketing that feels human."

This resonates because customers are [exhausted by sterile, corporate marketing](/brand/research/customer-insights/RESEARCH.md) and [seeking authentic brand voices](/brand/research/audience-analysis/RESEARCH.md).

The competitive landscape shows [most tools focus on scale over humanity](/brand/research/competitive-analysis/RESEARCH.md), leaving this position open.
```

**What this enables:**
- Verify claims (follow links to see evidence)
- Load research only when validating strategy
- Trace positioning back to data
- Identify unsupported claims (no link = no evidence)

#### 2. Context Composition (Strategy → Strategy)

**Purpose:** Reference related strategy domains that provide additional context.

**Example:**
```markdown
# /brand/strategy/voice/STRATEGY.md

Our voice is shaped by our [positioning as human-first marketing](/brand/strategy/positioning/STRATEGY.md).

When crafting messages, always reference our [core themes and proof points](/brand/strategy/messaging/STRATEGY.md).

For audience-specific adaptations, see our [audience segments and their preferences](/brand/strategy/audience/STRATEGY.md).
```

**What this enables:**
- Understand relationships between strategy domains
- Load related context only when needed
- Maintain consistency across strategies
- Navigate strategy as a cohesive system

#### 3. Extension Loading (Base → Extension)

**Purpose:** Point to platform/audience-specific extensions of base strategy.

**Example:**
```markdown
# /brand/strategy/voice/STRATEGY.md

## Universal Principles
[Core voice attributes here]

## Platform-Specific Guidelines

Our voice adapts to platform contexts:
- [Twitter](twitter/EXTENSION.md) - Conversational, punchy, emoji-friendly
- [LinkedIn](linkedin/EXTENSION.md) - Professional, thoughtful, insight-driven
- [Blog](blog/EXTENSION.md) - Narrative, educational, depth-focused
```

**What this enables:**
- Load only the platform you're working with
- Understand what's universal vs specific
- Extend without duplicating
- Maintain consistency through base + extension composition

### Reference Format Rules

**Always use workspace-relative paths:**
```markdown
✅ Correct: [customer insights](/brand/research/customer-insights/RESEARCH.md)
❌ Wrong: [customer insights](../../research/customer-insights/RESEARCH.md)
❌ Wrong: [customer insights](/Users/name/project/brand/research/customer-insights/RESEARCH.md)
```

**Why workspace-relative:**
- Works for anyone who clones the repository
- Absolute file paths break when shared
- Relative paths (../..) are brittle and hard to maintain
- Workspace-relative is portable and consistent

**Use descriptive link text:**
```markdown
✅ Good: [customers are exhausted by corporate marketing](/brand/research/customer-insights/RESEARCH.md)
❌ Bad: [see research](/brand/research/customer-insights/RESEARCH.md)
❌ Bad: [click here](/brand/research/customer-insights/RESEARCH.md)
```

**Why descriptive:**
- Link text provides context even without clicking
- AI can understand relationship from text
- Human readers see claim + evidence in one sentence

**Link to entry points, not execution folders:**
```markdown
✅ Correct: [customer insights](/brand/research/customer-insights/RESEARCH.md)
❌ Wrong: [customer insights](/brand/research/customer-insights/2024-03-01@14:30/RESEARCH.md)
```

**Why entry points:**
- Index files (RESEARCH.md, STRATEGY.md) represent current approved state
- Execution folders are historical iterations
- Linking to index ensures you get latest approved version
- If you need a specific execution, note it explicitly in text

### Navigation Patterns for AI Agents

**Pattern 1: Load base, check for extensions**
```
1. Read /brand/strategy/voice/STRATEGY.md
2. Check if task requires platform-specific: yes (Twitter content)
3. Look for reference to twitter/EXTENSION.md in STRATEGY.md
4. Read /brand/strategy/voice/twitter/EXTENSION.md
5. Compose: Base + Extension = Complete context
```

**Pattern 2: Follow evidence chains**
```
1. Read /brand/strategy/positioning/STRATEGY.md
2. Encounter claim: "customers are overwhelmed by complexity"
3. Check for evidence reference: [link to research]
4. Decide: Does task require verification? (Yes, we're validating strategy)
5. Read /brand/research/customer-insights/RESEARCH.md
6. Verify claim is supported
```

**Pattern 3: Progressive depth**
```
Task: Generate Twitter content

Level 0 (Always load):
- /brand/strategy/voice/STRATEGY.md
- /brand/strategy/voice/twitter/EXTENSION.md

Level 1 (Load if referenced and relevant):
- /brand/strategy/messaging/STRATEGY.md (for themes)
- /brand/strategy/positioning/STRATEGY.md (for core narrative)

Level 2 (Load only if validating claims):
- /brand/research/customer-insights/RESEARCH.md
- /brand/research/competitive-analysis/RESEARCH.md

Stop at level needed for task. Don't load "just in case."
```

### Why This Matters for AMA

Markdown references are the mechanism that makes progressive disclosure practical:

**Without references:**
- How do you know what to load next?
- How do you verify claims?
- How do you navigate relationships?
- How do you compose context?

**With references:**
- References are signposts (this way to more info)
- References are citations (this claim has evidence here)
- References are edges (this node connects to that node)
- References enable traversal (follow the path)

References transform a collection of files into a navigable knowledge graph.

---

## Anti-Patterns vs Best Practices

### Anti-Pattern 1: The Monolithic Document

**What it looks like:**
```
/brand/brand-guide.md (50,000 tokens)

Contains:
- Company history
- Positioning
- Voice for all platforms
- Messaging
- Visual identity
- Product descriptions
- Customer personas
- Competitive analysis
- Content examples
- Everything else
```

**Why it fails:**
- Impossible to load selectively (all or nothing)
- Every change affects every user
- No separation of concerns
- Can't compose or extend
- Grows until unmanageable

**Best practice alternative:**
```
/brand/
├── /research/{domain}/RESEARCH.md (focused domains)
├── /strategy/{domain}/STRATEGY.md (focused domains)
└── /strategy/{domain}/{extension}/EXTENSION.md (platform-specific)

Each file is focused, composable, and loadable independently.
```

### Anti-Pattern 2: Content Inlining in Delegation

**What it looks like:**
```
Agent A: "Strategist, create positioning using these insights:

[Customer Research - 40,000 tokens pasted here]
[Competitive Analysis - 25,000 tokens pasted here]
[Market Trends - 15,000 tokens pasted here]

Now create positioning."
```

**Why it fails:**
- Duplicates context (Agent A loaded it, now Agent B loads it again)
- Can't selectively load from within pasted content
- No progressive disclosure (everything upfront)
- Exceeds context limits quickly

**Best practice alternative:**
```
Agent A: "Strategist, create positioning. Load insights from:
- /brand/research/customer-insights/RESEARCH.md
- /brand/research/competitive-analysis/RESEARCH.md

Focus on the customer pain points and competitor positioning gaps sections."

Strategist loads exactly what it needs, when it needs it.
```

### Anti-Pattern 3: Relative Path References

**What it looks like:**
```markdown
Our positioning is driven by [customer insights](../../research/customer-insights/RESEARCH.md).
```

**Why it fails:**
- Breaks if file moves
- Hard to maintain (../../ calculation errors)
- Different depending on where you start
- Confusing for both humans and AI

**Best practice alternative:**
```markdown
Our positioning is driven by [customer insights](/brand/research/customer-insights/RESEARCH.md).

Workspace-relative paths work from anywhere.
```

### Anti-Pattern 4: No References (Implicit Knowledge)

**What it looks like:**
```markdown
# Positioning Strategy

Our primary differentiator is simplicity. Customers prefer simple tools.

We're positioned as the human-first marketing platform.

Competitors focus on enterprise and scale.
```

**Why it fails:**
- No way to verify claims (where's the evidence?)
- Can't trace to research (implicit, not explicit)
- No progressive disclosure (can't load supporting context)
- Knowledge appears authoritative but isn't grounded

**Best practice alternative:**
```markdown
# Positioning Strategy

Our primary differentiator is simplicity. [Customers are overwhelmed by complexity](/brand/research/customer-insights/RESEARCH.md) in existing tools.

We're positioned as the human-first marketing platform, resonating with [audiences seeking authenticity](/brand/research/audience-analysis/RESEARCH.md).

Competitors focus on [enterprise scale over ease-of-use](/brand/research/competitive-analysis/RESEARCH.md), leaving this position open.

Every claim is traceable. Every link is verifiable.
```

### Anti-Pattern 5: Generic File Names

**What it looks like:**
```
/brand/
├── document1.md
├── document2.md
├── notes.md
├── final.md
├── final-v2.md
└── REALLY-final.md
```

**Why it fails:**
- Can't tell what's what without opening
- No clear entry points
- Versioning via filename is chaos
- Not navigable by convention

**Best practice alternative:**
```
/brand/
├── /research/{domain}/RESEARCH.md (clear entry point)
├── /strategy/{domain}/STRATEGY.md (clear entry point)
└── /strategy/{domain}/{extension}/EXTENSION.md (clear pattern)

Naming conventions make navigation predictable.
```

---

## Real Examples: Efficient vs Inefficient Context Loading

### Example 1: Creating Platform-Specific Content

**Task:** Write a LinkedIn post about our new product feature

**Inefficient approach (context dumping):**
```
Load everything:
1. /brand/strategy/voice/STRATEGY.md (2,000 tokens - includes all platforms)
2. /brand/strategy/voice/twitter/EXTENSION.md (1,200 tokens - not relevant)
3. /brand/strategy/voice/linkedin/EXTENSION.md (1,500 tokens - relevant!)
4. /brand/strategy/voice/blog/EXTENSION.md (2,000 tokens - not relevant)
5. /brand/strategy/voice/email/EXTENSION.md (1,000 tokens - not relevant)
6. /brand/strategy/positioning/STRATEGY.md (3,500 tokens)
7. /brand/strategy/messaging/STRATEGY.md (4,000 tokens)
8. /brand/research/product/features/new-feature-brief.md (1,500 tokens)
9. /brand/research/product/features/all-features.md (8,000 tokens - too much)
10. /brand/research/customer-insights/RESEARCH.md (12,000 tokens - too much)

Total loaded: 36,700 tokens
Relevant: ~12,200 tokens
Efficiency: 33% signal-to-noise
```

**Efficient approach (progressive disclosure):**
```
Phase 1: Load base voice
1. /brand/strategy/voice/STRATEGY.md (2,000 tokens)
   (Contains reference to linkedin/EXTENSION.md)

Phase 2: Load platform extension
2. /brand/strategy/voice/linkedin/EXTENSION.md (1,500 tokens)
   (Extends base voice with LinkedIn-specific tone)

Phase 3: Load messaging
3. /brand/strategy/messaging/STRATEGY.md (4,000 tokens)
   (Contains key themes and proof points)

Phase 4: Load specific feature info
4. /brand/research/product/features/new-feature-brief.md (1,500 tokens)
   (Just this feature, not all features)

Total loaded: 9,000 tokens
Relevant: 9,000 tokens
Efficiency: 100% signal-to-noise
```

**Result:**
- 75% reduction in context size
- 3x better signal-to-noise ratio
- Same or better output quality
- Much faster processing

---

### Example 2: Validating Strategy Claims

**Task:** Verify that our positioning strategy is evidence-based

**Inefficient approach (context dumping):**
```
Load everything:
1. All strategy documents (25,000 tokens)
2. All research documents (60,000 tokens)
3. All raw data files (40,000 tokens)

Total: 125,000 tokens

Process:
- Read through everything looking for connections
- Try to remember what supports what
- Hope attention doesn't degrade
- Manually cross-reference
```

**Efficient approach (progressive disclosure + references):**
```
Phase 1: Read strategy
1. /brand/strategy/positioning/STRATEGY.md (3,500 tokens)

Phase 2: Follow references for each claim
For claim 1: "customers are overwhelmed"
→ Follow reference to /brand/research/customer-insights/RESEARCH.md
→ Load only relevant section (2,000 tokens)
→ Verify claim is supported

For claim 2: "underserved segment exists"
→ Follow reference to /brand/research/competitive-analysis/RESEARCH.md
→ Load only relevant section (1,500 tokens)
→ Verify claim is supported

For claim 3: "simplicity is valued"
→ Follow reference to /brand/research/audience-analysis/RESEARCH.md
→ Load only relevant section (2,500 tokens)
→ Verify claim is supported

Total: 9,500 tokens (only what's needed for verification)
```

**Result:**
- 92% reduction in context size
- Focused verification of specific claims
- Clear pass/fail for each claim
- Evidence trail is explicit and navigable

---

### Example 3: Multi-Agent Workflow (Research → Strategy → Content)

**Task:** Complete workflow from research to published content

**Inefficient approach (context dumping between agents):**
```
Agent 1 (Analyst): Conducts research
→ Generates research report (10,000 tokens)

Agent 2 (Strategist): Creates strategy
← Receives full research report inlined (10,000 tokens)
→ Generates strategy document (5,000 tokens)

Agent 3 (Content Creator): Writes content
← Receives full research (10,000 tokens) + full strategy (5,000 tokens) inlined
→ Generates content (2,000 tokens)

Context usage:
- Analyst: 0 tokens loaded (generating fresh)
- Strategist: 10,000 tokens loaded
- Content Creator: 15,000 tokens loaded
Total: 25,000 tokens loaded across agents
```

**Efficient approach (progressive disclosure with paths):**
```
Agent 1 (Analyst): Conducts research
→ Writes to /brand/research/customer-insights/RESEARCH.md
→ Returns path: "/brand/research/customer-insights/RESEARCH.md"

Agent 2 (Strategist): Creates strategy
← Receives path: "/brand/research/customer-insights/RESEARCH.md"
→ Loads research (10,000 tokens) - loads only what it needs
→ Writes to /brand/strategy/positioning/STRATEGY.md (5,000 tokens)
→ Returns path: "/brand/strategy/positioning/STRATEGY.md"

Agent 3 (Content Creator): Writes content
← Receives path: "/brand/strategy/positioning/STRATEGY.md"
→ Loads strategy (5,000 tokens) - loads only what it needs
→ Loads voice strategy (3,000 tokens) - loads only what it needs
→ Generates content (2,000 tokens)

Context usage:
- Analyst: 0 tokens loaded
- Strategist: 10,000 tokens loaded (research)
- Content Creator: 8,000 tokens loaded (strategy + voice)
Total: 18,000 tokens loaded across agents
```

**Result:**
- 28% reduction in total context across workflow
- Each agent loads exactly what it needs
- No duplication of context
- Scalable to more complex workflows

---

## Technical Deep Dive: Context Budgets and Optimization

For developers and technical readers interested in the mechanics:

### Token Budget Calculation

**Available context window:** 200,000 tokens (Claude Sonnet 4.5)

**Budget allocation:**
```
System prompt: ~2,000 tokens (agent identity, instructions)
Task description: ~500 tokens (what you're asking)
Loaded context: ??? (files, documents, research)
Conversation history: ~1,000 tokens per exchange
Response generation: ~5,000 tokens (AI output)

Max safe context load = 200,000 - (2,000 + 500 + 5,000 + history)
                      ≈ 190,000 tokens (with minimal history)
```

**As conversation progresses:**
```
After 5 exchanges:
History: ~5,000 tokens
Max safe context load: ~185,000 tokens

After 10 exchanges:
History: ~10,000 tokens
Max safe context load: ~180,000 tokens

The more you chat, the less room for context.
```

### Attention Distribution

**How attention works:**
- LLMs use multi-head attention mechanisms
- Each token can "attend" to every other token
- Attention scores determine which tokens are relevant
- As context grows, attention must be distributed across more tokens

**Attention degradation formula (simplified):**
```
Attention per token = 1 / context_size

With 5,000 tokens: Each token gets 0.0002 attention weight
With 50,000 tokens: Each token gets 0.00002 attention weight
With 150,000 tokens: Each token gets 0.0000067 attention weight

Your important token just got 30x less attention.
```

**Practical impact:**
- Model struggles to identify what's relevant
- Important details get overlooked
- Output quality degrades even though info is present
- Progressive disclosure keeps context small, attention high

### File Loading Performance

**Reading files is cheap:**
```
Reading a 2,000-token file: ~10ms
Reading a 10,000-token file: ~50ms
Reading 5 files (10,000 tokens total): ~50ms

Loading time is negligible compared to LLM processing.
```

**The cost is in tokens, not I/O:**
```
Loading 10,000 tokens from 1 file: 10,000 tokens
Loading 10,000 tokens from 5 files: 10,000 tokens

Same token count, same cost.
```

**Progressive disclosure wins:**
```
Context dumping: Load 100,000 tokens (everything)
Progressive disclosure: Load 10,000 tokens (only what's needed)

Result: 90% reduction in token usage, same output quality.
```

### Optimization Strategies

**Strategy 1: Lazy loading**
- Don't load files until you need them
- Load base documents first, extensions only if required
- Follow references only when task demands it

**Strategy 2: Context pruning**
- Remove irrelevant information after loading
- Summarize long sections if full detail not needed
- Extract only relevant sections from larger documents

**Strategy 3: Caching (for repeated access)**
- If you load the same file multiple times in a session, LLMs can cache
- First load: Full cost
- Subsequent loads: Reduced cost (cached)
- Best for base documents loaded in many tasks

**Strategy 4: Parallel loading**
- If you know you need multiple files, load them in parallel
- Reduces latency (I/O happens simultaneously)
- Token count is same, but wall-clock time is faster

---

## Exercises and Checkpoints

### Exercise 1: Identify Context Dumping

**Scenario:**
You want to create a Twitter thread about your product's new AI feature.

**Bad approach:**
```
Prompt to AI:
"Write a Twitter thread about our new AI feature. Here's everything you need to know:

[Paste entire brand positioning document - 5,000 tokens]
[Paste complete voice guide covering all platforms - 15,000 tokens]
[Paste full product documentation - 30,000 tokens]
[Paste all competitive analysis - 20,000 tokens]
[Paste complete messaging framework - 10,000 tokens]

Now write the thread."
```

**Questions:**
1. What's the total context loaded?
2. How much of this is actually relevant to the task?
3. What are the consequences of this approach?
4. What's the signal-to-noise ratio?

<details>
<summary>Answers</summary>

1. Total context: 80,000 tokens
2. Actually relevant: ~3,000 tokens (Twitter voice guidelines, AI feature description, key messaging)
3. Consequences:
   - Attention degradation (AI must sift through 96% irrelevant info)
   - Slower processing
   - Risk of context overflow
   - Reduced output quality
4. Signal-to-noise: 3,000 / 80,000 = 3.75%

</details>

---

### Exercise 2: Design Progressive Disclosure

**Scenario:**
You need to create a LinkedIn post about your company's approach to customer support.

**Task:**
Design a progressive disclosure approach. What files would you load, in what order, and why?

**Available files:**
- `/brand/strategy/voice/STRATEGY.md` - Base voice principles
- `/brand/strategy/voice/linkedin/EXTENSION.md` - LinkedIn-specific voice
- `/brand/strategy/voice/twitter/EXTENSION.md` - Twitter-specific voice
- `/brand/strategy/positioning/STRATEGY.md` - Company positioning
- `/brand/strategy/messaging/STRATEGY.md` - Key messages and themes
- `/brand/research/customer-insights/RESEARCH.md` - Customer pain points and preferences
- `/brand/research/competitive-analysis/RESEARCH.md` - Competitive landscape

**Your answer:**

<details>
<summary>Sample answer</summary>

**Phase 1: Load voice context**
1. `/brand/strategy/voice/STRATEGY.md` (base voice principles)
2. `/brand/strategy/voice/linkedin/EXTENSION.md` (LinkedIn-specific tone)

Why: Establishes how to write for LinkedIn specifically.

**Phase 2: Load messaging**
3. `/brand/strategy/messaging/STRATEGY.md` (key themes about customer support)

Why: Provides core messages to emphasize.

**Optional Phase 3: Load evidence (if making claims that need support)**
4. `/brand/research/customer-insights/RESEARCH.md` (only if post will cite customer feedback)

Why: Only load research if you're making claims that need evidence.

**Don't load:**
- Twitter extension (not relevant to LinkedIn)
- Positioning (unless directly relevant to the post angle)
- Competitive analysis (not needed for this topic)

**Total context:**
- Phase 1+2: ~8,000 tokens
- With Phase 3: ~15,000 tokens
- Without Phase 3: ~8,000 tokens

**Efficiency: Load exactly what's needed for the task.**

</details>

---

### Exercise 3: Markdown Reference Audit

**Task:**
Review the following strategy document excerpt and identify:
1. Claims that need evidence references
2. Proper reference format
3. Missing references

**Document:**
```markdown
# Positioning Strategy

We position ourselves as the human-first marketing platform.

Customers are exhausted by corporate, sterile marketing. They want authenticity.

Most competitors focus on enterprise features and scale. This leaves small businesses and solo marketers underserved.

Our differentiator is simplicity. We make marketing feel less like work and more like creative expression.
```

**Questions:**
1. How many claims are made?
2. How many have evidence references?
3. Rewrite this excerpt with proper references to:
   - `/brand/research/customer-insights/RESEARCH.md`
   - `/brand/research/competitive-analysis/RESEARCH.md`
   - `/brand/research/audience-analysis/RESEARCH.md`

<details>
<summary>Sample answer</summary>

**1. Claims made:** 4
- "Customers are exhausted by corporate marketing"
- "Most competitors focus on enterprise features"
- "Small businesses and solo marketers underserved"
- "Simplicity is our differentiator"

**2. Current references:** 0 (none!)

**3. Rewritten with references:**

```markdown
# Positioning Strategy

We position ourselves as the human-first marketing platform.

Customers are [exhausted by corporate, sterile marketing](/brand/research/customer-insights/RESEARCH.md) and [seeking authentic brand voices](/brand/research/audience-analysis/RESEARCH.md).

Most competitors [focus on enterprise features and scale](/brand/research/competitive-analysis/RESEARCH.md), leaving [small businesses and solo marketers underserved](/brand/research/audience-analysis/RESEARCH.md).

Our differentiator is simplicity. We make marketing feel less like work and more like creative expression, resonating with [audiences who value ease-of-use over feature depth](/brand/research/customer-insights/RESEARCH.md).
```

**Result:**
- Every claim is now traceable
- References provide paths to evidence
- Strategy is verifiable and defensible

</details>

---

### Checkpoint: Self-Assessment

Before moving to Class 3, ensure you can answer these questions:

**Context Dumping:**
- [ ] Can you explain what context dumping is?
- [ ] Can you identify context dumping in real examples?
- [ ] Can you explain why context dumping fails (at least 3 reasons)?

**Progressive Disclosure:**
- [ ] Can you explain the progressive disclosure principle?
- [ ] Can you describe the four rules of progressive disclosure?
- [ ] Can you design a progressive disclosure approach for a given task?

**File Systems:**
- [ ] Can you explain why file systems are knowledge graphs?
- [ ] Can you list at least 3 advantages of file-based approaches?
- [ ] Can you explain why files enable progressive disclosure?

**Markdown References:**
- [ ] Can you write properly formatted markdown references?
- [ ] Can you explain the three types of references in AMA?
- [ ] Can you identify missing references in strategy documents?

**Practical Application:**
- [ ] Can you calculate signal-to-noise ratio for a context loading approach?
- [ ] Can you compare efficient vs inefficient context loading?
- [ ] Can you design file structures that support progressive disclosure?

---

## Summary and Key Takeaways

### What You Learned

**The Problem:**
- Context dumping (loading everything at once) fails at scale
- Attention degrades as context grows
- Signal-to-noise ratio collapses with irrelevant information
- Maintenance becomes impossible with monolithic documents

**The Solution:**
- Progressive disclosure (load what's needed, when needed)
- File systems as knowledge graphs (nodes, edges, traversal)
- Markdown references as navigation paths (explicit relationships)
- Separation of concerns (one file = one domain)

**The Patterns:**
- Load base document first
- Check for extensions when needed
- Follow references only when required
- Pass paths, not content

**Why Files:**
- Human-readable and AI-readable
- Version control with Git
- Natural separation of concerns
- Composable and modular
- Explicit relationships
- Progressive disclosure native

### Why This Matters for AMA

Everything in AMA builds on progressive disclosure:
- **Three-layer framework** - Load layers progressively
- **Extension pattern** - Compose context without duplication
- **Markdown references** - Navigate knowledge graph
- **Agent delegation** - Pass paths, each agent loads what it needs
- **Temporal executions** - Load current index, reference history on demand

Without solving the context problem, you can't:
- Scale knowledge bases beyond simple use cases
- Maintain consistency across complex outputs
- Preserve evidence trails and audit capability
- Enable effective agent collaboration
- Accumulate knowledge over time

This class taught you the fundamental principle that makes AMA possible.

---

## Transition to Class 3

Now that you understand:
- How LLMs work (Class 1)
- Why files and progressive disclosure solve the context problem (Class 2)

You're ready to learn:
- **The three-layer marketing framework** (Class 3)
- How Research → Strategy → Content flow works
- Why layers must be kept separate
- How the `/brand/` directory is organized
- The execution vs index pattern

Class 3 applies the principles from Classes 1-2 to the specific domain of marketing workflows.

Let's continue.
