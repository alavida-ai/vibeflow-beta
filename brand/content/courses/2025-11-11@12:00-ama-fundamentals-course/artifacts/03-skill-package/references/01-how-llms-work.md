# Class 1: How LLMs Actually Work

**Tagline:** Understanding the machine you're talking to

---

## Class Overview

### What You'll Learn

This class establishes the foundation for understanding the Agentic Marketing Architecture by exploring how Large Language Models (LLMs) actually process information. You'll learn why LLMs need structured, file-based systems to work effectively on complex marketing tasks, and how their fundamental limitations shape the entire AMA methodology.

**Learning Objectives:**
- Understand how LLMs process text (tokens, context windows, attention)
- Recognize fundamental LLM limitations (no memory, stateless, context overflow)
- Identify why traditional approaches fail with complex tasks
- Explain the relationship between context size and output quality
- Define what "context management" means and why it matters

### Prerequisites

None. This class starts from first principles and builds up progressively.

### Estimated Time

**1.5 hours total**
- Reading: 1 hour
- Exercises: 30 minutes

### Success Metrics

By the end of this class, you should be able to:
- Explain in plain language why LLMs "forget" things
- Identify when a task is too complex for a single prompt
- Understand why file-based systems help LLMs work better
- Predict when context overflow will occur
- Connect LLM limitations to AMA design decisions

---

## Introduction: Why This Matters

When you ask an AI to "write a blog post about sustainable fashion that matches our brand voice," you're making assumptions about how that AI works. You might assume it:
- Remembers previous conversations with you
- Has access to all your brand documents
- Can juggle multiple requirements simultaneously
- Will maintain consistency across long outputs

**All of these assumptions are wrong.**

Understanding how LLMs actually work is essential for two reasons:

1. **Effective delegation** - You'll know what tasks to give AI and how to structure them
2. **System design** - You'll understand why AMA is architected the way it is

Let's start with the fundamentals.

---

## How LLMs Process Text

### The Token: AI's Basic Unit of Understanding

When you type "Hello, world!" into an AI chat, the model doesn't see letters or words. It sees **tokens** - numerical chunks that represent pieces of text.

**What is a token?**

A token is roughly equivalent to:
- A word (e.g., "marketing" = 1 token)
- A common word part (e.g., "un" + "predict" + "able" = 3 tokens)
- A punctuation mark (e.g., "!" = 1 token)
- A space before a word (included in the token)

**Example tokenization:**

```
Text: "Sustainable fashion trends are evolving."
Tokens: ["Sustainable", " fashion", " trends", " are", " evol", "ving", "."]
Count: 7 tokens
```

**Why this matters:**

Every LLM has a **token limit** - a maximum number of tokens it can process in a single interaction. For Claude Sonnet 3.5, that limit is 200,000 tokens (roughly 150,000 words). This might sound like a lot, but consider:

- Your brand voice guide: 3,000 tokens
- Your messaging strategy: 5,000 tokens
- Competitor research: 15,000 tokens
- Past content examples: 20,000 tokens
- The actual task description: 500 tokens
- The output you want generated: 2,000 tokens

**Total: 45,500 tokens** - and we've only scratched the surface of your brand context.

---

> **Why This Matters for AMA**
>
> AMA's file-based architecture exists **because of token limits**. Instead of dumping all your brand knowledge into every conversation, AMA enables agents to:
> - Load only what's needed for the current task
> - Reference additional files when required
> - Build complex outputs through multiple focused steps
>
> The entire methodology is designed around working **with** token limits, not against them.

---

### Context Windows: The LLM's Working Memory

Think of a context window like a whiteboard. Everything the LLM knows during your conversation must fit on that whiteboard. When the whiteboard is full, you have three choices:

1. **Erase something** (lose information)
2. **Stop writing** (hit the limit)
3. **Start with a clean whiteboard** (new conversation)

**What fits in a context window?**

For a single interaction with Claude, the context window includes:
- System instructions (who the AI is, what it should do)
- Your entire conversation history
- Any files you've shared or referenced
- Tool descriptions (if using function calling)
- The current message
- The response being generated

**Example context budget:**

```
Available tokens: 200,000

Used by:
- System prompt: 5,000 tokens
- Conversation history: 30,000 tokens
- Brand strategy files: 25,000 tokens
- Current task: 500 tokens
- Response generation: ~5,000 tokens

Remaining: 134,500 tokens
```

**Context overflow happens when:**

You try to fit more information than the context window can hold. When this happens:
- The model might truncate early messages
- Output quality degrades significantly
- The model "forgets" important details
- You get incomplete or inconsistent responses

---

> **Marketing Application**
>
> **Bad approach:** "Here's our entire brand guidebook (50,000 tokens), all our competitor research (80,000 tokens), and our content library (120,000 tokens). Now write a blog post."
>
> **Result:** Context overflow. The model can't process it all, so it picks what seems relevant and ignores the rest - leading to inconsistent, off-brand content.
>
> **AMA approach:** "Load the brand voice guide (3,000 tokens), the sustainability positioning doc (2,000 tokens), and the blog post template (500 tokens). Now write a blog post."
>
> **Result:** Focused, consistent output using exactly the right context.

---

### Stateless Execution: The AI Has No Memory

This is the most counterintuitive aspect of LLMs: **they remember nothing between conversations.**

**What "stateless" means:**

Every time you start a new chat with an AI:
- It has no memory of previous chats
- It doesn't know what you worked on yesterday
- It can't recall the brand strategy you discussed last week
- It starts completely fresh

**Within a single conversation:**
- The AI appears to "remember" because it re-reads the entire conversation history with every response
- This consumes tokens from your context window
- Longer conversations = more tokens used just to "remember" what happened earlier

**A practical example:**

```
Conversation 1:
You: "Our brand voice is witty and conversational."
AI: "Got it! I'll use that voice for all content."
You: "Write a product description."
AI: [Writes in witty, conversational tone]

[You close the chat and open a new one]

Conversation 2:
You: "Write a product description."
AI: [Writes in generic corporate tone - no memory of your voice]
```

**Why this is actually a feature:**

Stateless execution seems like a limitation, but it enables:
- **Consistency** - Every agent starts with the same clean slate
- **Parallelization** - Multiple agents can work simultaneously without interference
- **Reproducibility** - Same inputs = same outputs (mostly)
- **Isolation** - Mistakes in one task don't contaminate others

---

> **Why This Matters for AMA**
>
> AMA's stateless execution principle embraces this limitation:
> - Each workflow execution is self-contained
> - Context is loaded explicitly from files (not memory)
> - Agents pass information through files, not conversation history
> - Sub-agents receive clean, focused context for each task
>
> This makes workflows **predictable**, **debuggable**, and **scalable**.

---

### Attention Mechanisms: How LLMs "Focus"

When reading this sentence, your brain doesn't process every word equally. You focus on key words and use context to understand meaning. LLMs do something similar through **attention mechanisms**.

**How attention works (simplified):**

1. The model looks at all tokens in the context
2. It calculates which tokens are most relevant to the current task
3. It "attends" more strongly to relevant tokens
4. It uses this focused attention to generate the next token

**Example:**

When generating a product description for "organic cotton t-shirt," the model attends strongly to:
- Previous mentions of "organic" and "cotton"
- Your brand's sustainability messaging
- Product description templates
- Tone indicators ("professional," "casual," etc.)

And attends weakly to:
- Generic conversation filler
- Unrelated brand guidelines (e.g., social media policy)
- Irrelevant examples

**Why attention matters:**

Attention mechanisms are powerful but not perfect:
- **Good:** Models can find relevant information in large contexts
- **Limitation:** Attention degrades with context size
- **Problem:** Important details can get lost in noise
- **Solution:** Clean, focused context with high signal-to-noise ratio

---

> **Technical Deep Dive: Attention Computation**
>
> For developers interested in the mechanics:
>
> Attention is computed using Query (Q), Key (K), and Value (V) matrices:
> ```
> Attention(Q, K, V) = softmax(QK^T / √d_k)V
> ```
>
> - **Query:** What am I looking for?
> - **Key:** What information do I have?
> - **Value:** What's the actual content?
>
> The softmax function converts scores into probabilities, creating an attention distribution across all tokens. Tokens with high attention scores influence output more than tokens with low scores.
>
> **Implications for context design:**
> - Relevant information should be clearly labeled
> - Similar concepts should use consistent terminology
> - Context should be structured hierarchically (most important first)
> - Noise reduction dramatically improves attention accuracy

---

## Fundamental LLM Limitations

Now that we understand how LLMs process information, let's examine their fundamental limitations and why they matter for marketing workflows.

### Limitation 1: No Persistent Memory

**What it means:**
LLMs don't remember anything between conversations. They have no database, no memory storage, no recollection of past interactions.

**Why it matters for marketing:**

Marketing requires consistency across:
- Multiple campaigns over months
- Different content types (blog, social, email)
- Various team members using the AI
- Iterative refinement of strategy

Without persistent memory, you'd have to:
- Re-explain your brand voice every time
- Repeat your positioning strategy constantly
- Manually ensure consistency across outputs
- Keep track of what worked previously

**The AMA solution:**

Files become the "memory" of the system:
- Brand strategy stored in `/brand/strategy/voice/STRATEGY.md`
- Research findings in `/brand/research/competitor-analysis/RESEARCH.md`
- Previous content examples in `/brand/content/blog-posts/`

Agents load these files as needed, creating **artificial memory** through the file system.

---

### Limitation 2: Context Window Constraints

**What it means:**
Even within a single conversation, there's a hard limit on how much information the model can process.

**Why it matters for marketing:**

Complex marketing tasks require:
- Brand guidelines (voice, messaging, values)
- Research insights (customer, competitive, market)
- Strategic frameworks (positioning, differentiation)
- Content templates and examples
- Current campaign context
- Platform-specific requirements

All of this easily exceeds any context window.

**The AMA solution:**

Progressive disclosure - load only what's needed:
- Start with high-level strategy
- Load platform-specific extensions when needed
- Reference detailed research only for relevant claims
- Pull in examples only for specific content types

**Example workflow:**

```
Task: Write a Twitter thread about sustainability

Context loaded:
1. /brand/strategy/voice/STRATEGY.md (base voice)
2. /brand/strategy/voice/twitter/EXTENSION.md (Twitter-specific)
3. /brand/strategy/messaging/STRATEGY.md (sustainability messaging)

Total tokens: ~8,000 (manageable and focused)

Not loaded (but available if needed):
- Full competitor research
- Blog post voice guidelines
- LinkedIn content examples
- Historical campaign data
```

---

### Limitation 3: Deterministic vs Probabilistic Behavior

**What it means:**
LLMs generate text probabilistically, not deterministically. Even with the same input, you might get slightly different outputs.

**Example:**

```
Input: "Write a tagline for sustainable fashion"

Output 1: "Style that doesn't cost the earth"
Output 2: "Fashion forward, planet friendly"
Output 3: "Conscious choices, timeless style"
```

All three might be good, but they're different. This is because the model:
- Samples from a probability distribution over possible next tokens
- Uses a "temperature" setting that controls randomness
- May produce variations even with temperature = 0 (though less variation)

**Why it matters for marketing:**

Brand consistency requires:
- Repeatable voice and tone
- Predictable messaging
- Consistent terminology
- Reproducible workflows

Probabilistic generation makes this challenging.

**The AMA solution:**

1. **Structured templates** - More constraints = less variation
2. **Clear examples** - Show exactly what "good" looks like
3. **Explicit guidelines** - Leave less room for interpretation
4. **Review checkpoints** - Human approval before publishing
5. **Iterative refinement** - Generate multiple options, select best

---

> **Technical Deep Dive: Temperature and Sampling**
>
> LLMs use temperature to control randomness:
>
> - **Temperature = 0:** Mostly deterministic (always picks highest probability token)
> - **Temperature = 0.7:** Balanced creativity and consistency
> - **Temperature = 1.0:** Maximum creativity (samples from full distribution)
>
> **Sampling methods:**
> - **Top-k sampling:** Consider only top k most likely tokens
> - **Top-p (nucleus) sampling:** Consider tokens in top p% of probability mass
> - **Typical sampling:** Select tokens with typical information content
>
> **For brand work:**
> - Use lower temperature (0.3-0.5) for consistency
> - Use higher temperature (0.7-1.0) for creative brainstorming
> - Always use the same temperature for reproducible workflows

---

### Limitation 4: Context Degradation Patterns

**What it means:**
As context windows fill up, model performance degrades in predictable ways.

**Degradation patterns:**

1. **Recency bias:** Model focuses on recent information, ignores earlier context
2. **Middle-loss:** Model forgets information in the middle of long contexts
3. **Attention dilution:** Important details get lost in noise
4. **Instruction drift:** Model loses track of original task requirements

**Example of context degradation:**

```
Context window: 200,000 tokens

Load:
- 50,000 tokens: Brand guidelines
- 50,000 tokens: Research reports
- 50,000 tokens: Content examples
- 30,000 tokens: Conversation history
- 10,000 tokens: Current task description
- 10,000 tokens: Response generation

Total: 200,000 tokens (at limit)

Result:
- Early brand guidelines might be forgotten
- Middle research reports get lost
- Recent examples dominate output
- Original task requirements overlooked
- Quality degrades significantly
```

**The AMA solution:**

Keep context lean and focused:
- Load only directly relevant files
- Use short, focused conversations
- Break complex tasks into smaller steps
- Pass file paths, not entire file contents
- Create new agent threads for subtasks

---

> **Marketing Application: Context Budget Example**
>
> **Task:** Write a blog post about sustainable packaging
>
> **Naive approach (context dumping):**
> - Load all brand documents: 80,000 tokens
> - Load all research: 100,000 tokens
> - Load all content examples: 60,000 tokens
> - Task description: 1,000 tokens
> - **Total: 241,000 tokens** → OVERFLOW
>
> **AMA approach (progressive disclosure):**
> - Load voice strategy: 3,000 tokens
> - Load blog extension: 1,500 tokens
> - Load sustainability positioning: 2,500 tokens
> - Load 2 relevant blog examples: 3,000 tokens
> - Task description: 1,000 tokens
> - **Total: 11,000 tokens** → Clean, focused, effective
>
> The AMA approach uses 22x less context and produces better results.

---

## Why Traditional Approaches Fail

Now that we understand LLM fundamentals and limitations, let's examine why traditional approaches to AI-powered marketing fail.

### Anti-Pattern 1: Context Dumping

**What it looks like:**

"Here's everything I have. Figure it out."

```
Prompt:
"Here are our brand guidelines [20,000 tokens]
Here's all our research [80,000 tokens]
Here are 50 examples of our content [100,000 tokens]
Now write a blog post about sustainability."
```

**Why it fails:**

1. **Exceeds context limits** - Model can't process it all
2. **High noise-to-signal ratio** - Relevant info buried in irrelevant
3. **Attention dilution** - Model can't focus on what matters
4. **Processing overhead** - Most content is irrelevant to task
5. **Context degradation** - Quality drops as window fills

**What actually happens:**

The model either:
- Truncates early information (loses brand guidelines)
- Focuses on recent information (ignores research)
- Produces generic output (can't find the right guidelines)
- Errors out (context overflow)

---

### Anti-Pattern 2: Assuming Memory

**What it looks like:**

Using an AI like a human colleague who remembers past conversations.

```
Day 1: "Our brand voice is witty and irreverent."
Day 2: "Write a product description." [expects witty voice]
Day 3: "Make it more like yesterday's." [expects memory]
```

**Why it fails:**

1. **Each conversation is independent** - No memory between sessions
2. **Context rebuilding is manual** - You must re-provide everything
3. **Consistency is impossible** - No way to ensure same voice
4. **Collaboration breaks down** - Different team members get different results

**What actually happens:**

- Each team member gets inconsistent outputs
- Brand voice drifts over time
- No one knows what guidelines were used
- Impossible to reproduce previous results

---

### Anti-Pattern 3: Single-Step Complex Tasks

**What it looks like:**

Asking the AI to do everything at once.

```
"Research our competitors, analyze their positioning,
synthesize insights, develop our differentiation strategy,
create messaging frameworks, and write 5 blog posts."
```

**Why it fails:**

1. **Cognitive overload** - Too many requirements to track
2. **Quality dilution** - Depth sacrificed for breadth
3. **No checkpoints** - Can't validate intermediate steps
4. **Error propagation** - Early mistakes cascade
5. **Impossible to debug** - Can't tell where things went wrong

**What actually happens:**

The model produces:
- Superficial research (no depth)
- Generic strategy (no insight)
- Vague messaging (no specificity)
- Mediocre content (no brand voice)

Or worse: It picks which parts to focus on and ignores others entirely.

---

### Anti-Pattern 4: Unstructured Information

**What it looks like:**

Providing context in prose without clear organization.

```
"Our company makes sustainable fashion. We focus on organic
materials and ethical manufacturing. Our customers care about
the environment but also want style. Our competitors include
Brand A, Brand B, and Brand C. We're different because we're
more affordable. Our voice should be friendly but professional..."
```

**Why it fails:**

1. **Hard to parse** - Model must extract structure from prose
2. **Information gets lost** - Important details buried
3. **No clear hierarchy** - Can't tell what's most important
4. **Difficult to update** - Changes require rewriting everything
5. **Poor attention targeting** - Model can't focus efficiently

**What actually happens:**

- Model extracts what it thinks is important (often wrong)
- Key details get overlooked
- Structure must be inferred (introduces errors)
- Consistency is impossible across multiple uses

---

## The Relationship Between Context and Quality

Let's explore how context size and structure affect output quality through concrete examples.

### Experiment: Context Size vs Output Quality

**Task:** Write a product description for an organic cotton t-shirt

**Scenario 1: Minimal Context (Under-specified)**

```
Context: "Write a product description for our organic cotton t-shirt."
Tokens: 20

Output:
"This comfortable organic cotton t-shirt is perfect for everyday wear.
Made from sustainable materials. Available in multiple colors."

Quality: Generic, no brand voice, could be anyone's product
```

**Scenario 2: Focused Context (Optimal)**

```
Context:
- Brand voice: Witty, conversational, environmentally conscious
- Product USPs: GOTS-certified organic cotton, carbon-neutral shipping
- Target audience: Eco-conscious millennials who value style
- Key message: Sustainability without sacrifice

Tokens: ~500

Output:
"Your wardrobe called. It wants this ridiculously soft organic cotton tee.
GOTS-certified (that's the gold standard, btw), carbon-neutral shipped,
and designed for humans who give a damn about the planet. Because
looking good and doing good aren't mutually exclusive anymore."

Quality: On-brand, specific, engaging, clear differentiation
```

**Scenario 3: Context Overload (Over-specified)**

```
Context:
- Complete brand guidelines: 20,000 tokens
- Full product catalog: 30,000 tokens
- All sustainability certifications: 15,000 tokens
- Competitor analysis: 25,000 tokens
- Customer research: 40,000 tokens
- Content examples: 50,000 tokens

Total: 180,000 tokens

Output:
"This organic cotton t-shirt is made from sustainable materials.
It features high-quality construction. Available now."

Quality: Generic, lost the brand voice, cognitive overload led to
       regression to mean (safe but bland)
```

**The Sweet Spot:**

Context quality follows an inverted-U curve:
```
Quality
  ^
  |     ╱‾╲
  |    ╱   ╲
  |   ╱     ╲___
  |  ╱
  | ╱
  +─────────────────> Context Size
    Not    Just     Too
    enough right   much
```

**Optimal context:**
- Specific enough to be useful
- Focused enough to be processable
- Structured enough to be findable
- Lean enough to avoid overload

---

> **Why This Matters for AMA**
>
> The entire AMA methodology is designed to hit the "just right" zone:
>
> - **Entry point files** provide focused starting context
> - **Progressive disclosure** loads details only when needed
> - **Extensions** add specificity without bloating base context
> - **Audit trails** connect to supporting information without inlining it
> - **Execution isolation** keeps each task's context clean
>
> Every architectural decision serves context optimization.

---

## What "Context Management" Really Means

Context management is the practice of deliberately controlling what information an LLM has access to during task execution.

### The Three Principles of Context Management

**1. Selectivity: Load Only What's Needed**

Don't give the model access to everything. Give it access to exactly what's needed for the current task.

**Example:**

```
Task: Write a Twitter thread about sustainable materials

Load:
✅ Voice strategy (base)
✅ Twitter voice extension
✅ Sustainability messaging
✅ 2 example Twitter threads

Don't load:
❌ Email marketing guidelines
❌ Blog post voice
❌ Full competitor research
❌ Customer survey data
❌ LinkedIn content examples
```

**2. Hierarchy: Most Important First**

Information should be loaded in order of importance:

```
Order of loading:
1. Task requirements (what to do)
2. Core brand guidelines (voice, positioning)
3. Platform-specific extensions (Twitter rules)
4. Supporting examples (what good looks like)
5. Background research (only if needed)
```

**Why order matters:**
- Recency bias means later information gets more attention
- But foundational context needs to be established early
- Strike balance: core context first, reinforcement later

**3. Clarity: Signal Over Noise**

Every token in context should serve a purpose:

**Bad context (noisy):**
```
"Our voice is professional but not too formal and we want to be
friendly but not unprofessional and we should sound smart but not
pretentious and also we care about sustainability and ethics and
quality and affordability and customers and also innovation..."
```

**Good context (clear):**
```
Voice: Witty, conversational, environmentally conscious
Tone: Confident but approachable
Avoid: Corporate jargon, greenwashing, preachy tone
Lead with: Environmental impact, without sacrificing style
```

---

### Context Management Strategies

**Strategy 1: File-Based Architecture**

Store information in separate files organized by concern:
- `/brand/strategy/voice/STRATEGY.md` - Voice guidelines
- `/brand/strategy/messaging/STRATEGY.md` - Key messages
- `/brand/research/competitors/RESEARCH.md` - Competitive insights

Load files selectively based on task requirements.

**Strategy 2: Entry Points and Extensions**

Use entry point files as indexes, extensions for specificity:
- Start with `STRATEGY.md` (universal principles)
- Load `twitter/EXTENSION.md` (Twitter-specific rules)
- Reference `examples/thread-format.md` (only if needed)

**Strategy 3: Markdown References**

Link to additional context without inlining:
```markdown
Our positioning focuses on [sustainable luxury](/brand/strategy/positioning/STRATEGY.md)
tailored for [environmentally conscious millennials](/brand/research/audience/RESEARCH.md).
```

Agents can follow links when they need more detail.

**Strategy 4: Progressive Disclosure**

Load context in phases:
1. **Phase 1:** Core strategy, basic requirements
2. **Phase 2:** Detailed examples, specific guidelines (if needed)
3. **Phase 3:** Supporting research, evidence (if requested)

Each phase adds context only when the previous phase proves insufficient.

---

## Connecting to AMA Architecture

Now we can see how AMA's design directly addresses LLM limitations.

### AMA Design Decisions Explained

**Decision 1: File-Based Architecture**

**LLM limitation it addresses:** No persistent memory

**How it works:**
- Information persists in files (the "memory" of the system)
- Agents load files as needed (selective memory retrieval)
- File organization makes information discoverable (memory indexing)
- Updates to files update the "memory" for all future tasks

**Decision 2: Three-Layer Framework (Research → Strategy → Content)**

**LLM limitation it addresses:** Context window constraints

**How it works:**
- Separates concerns into layers (limits what's loaded when)
- Content generation loads strategy (not all research)
- Strategy synthesis loads research index (not raw data)
- Each layer has focused, manageable context

**Decision 3: Entry Points and Extensions**

**LLM limitation it addresses:** Context overflow and attention degradation

**How it works:**
- Entry points provide high-level overview (efficient first pass)
- Extensions add specificity only when needed (progressive disclosure)
- Hierarchical structure guides attention (clear importance signaling)
- Base + Extension pattern avoids duplication (token efficiency)

**Decision 4: Temporal Executions**

**LLM limitation it addresses:** Stateless execution

**How it works:**
- Each execution is self-contained (embraces statelessness)
- Execution folders preserve all context used (reproducibility)
- PLAN.md and TODO.md track progress (visible state)
- Artifacts capture intermediate outputs (resumable workflows)

**Decision 5: Markdown References**

**LLM limitation it addresses:** Context dumping and attention dilution

**How it works:**
- References link without inlining (token efficiency)
- Agents load referenced content only if needed (selective loading)
- Creates navigable knowledge graph (structured information)
- Enables audit trails without context bloat (verifiability)

---

## Exercises and Checkpoints

Test your understanding with these exercises.

### Exercise 1: Token Counting

Estimate token counts for these scenarios:

**Scenario A:**
```
"Write a blog post about sustainable packaging for our eco-friendly
brand. Use a friendly, conversational tone. Include statistics about
plastic waste. Target audience is environmentally conscious millennials."
```

Estimated tokens: _______

**Scenario B:**
```
Brand guidelines: 15,000 words
Research report: 25,000 words
Content examples: 30,000 words
Task description: 100 words
```

Total estimated tokens: _______
Will this fit in 200k token context? _______

<details>
<summary>Click to reveal answers</summary>

**Scenario A:** ~60 tokens (this is the task description itself)

**Scenario B:**
- Guidelines: ~20,000 tokens
- Research: ~33,000 tokens
- Examples: ~40,000 tokens
- Task: ~130 tokens
- **Total: ~93,130 tokens** - Yes, fits (but leaves little room for response and other context)

**Note:** 1 token ≈ 0.75 words (English), so divide word count by 0.75
</details>

---

### Exercise 2: Identifying Context Dumping

Which of these prompts demonstrates context dumping?

**A.**
```
[Loads voice strategy: 3,000 tokens]
[Loads Twitter extension: 1,500 tokens]
"Write a Twitter thread about sustainability"
```

**B.**
```
[Loads all brand documents: 80,000 tokens]
[Loads all research: 100,000 tokens]
[Loads all past content: 120,000 tokens]
"Write a Twitter thread about sustainability"
```

**C.**
```
[Loads voice strategy: 3,000 tokens]
[Loads sustainability positioning: 2,500 tokens]
[Loads 3 Twitter thread examples: 4,000 tokens]
"Write a Twitter thread about sustainability"
```

<details>
<summary>Click to reveal answer</summary>

**B is context dumping.**

- Uses 300,000 tokens (exceeds limit)
- Most information irrelevant to task
- High noise-to-signal ratio
- Attention will be diluted
- Quality will suffer

**A and C are good approaches:**
- A: Minimal but sufficient context
- C: Focused context with examples
- Both load only task-relevant information
- Both maintain manageable token count
</details>

---

### Exercise 3: Predicting Context Degradation

For each scenario, predict what will happen:

**Scenario 1:**
Context: 150,000 tokens of mixed brand documents
Task: Write a product description
Prediction: _______

**Scenario 2:**
Context: 5,000 tokens of focused voice and positioning
Task: Write a product description
Prediction: _______

**Scenario 3:**
Context: 180,000 tokens, with task requirements at the beginning
Task: Write a product description
Prediction: _______

<details>
<summary>Click to reveal answers</summary>

**Scenario 1:**
- Context degradation likely
- Model will lose track of early guidelines
- Output will be generic or inconsistent
- Attention diluted across too much information

**Scenario 2:**
- Optimal context size
- High signal-to-noise ratio
- Model can attend to all relevant information
- Output will be focused and on-brand

**Scenario 3:**
- Recency bias will cause issues
- Early task requirements may be forgotten
- Model focuses on recent information
- Important instructions might be overlooked
- Better to put critical info at end (reinforcement)
</details>

---

### Exercise 4: Designing Context

Design the optimal context for this task:

**Task:** Write a blog post about organic cotton sourcing

**Available files:**
- `/brand/strategy/voice/STRATEGY.md` (3,000 tokens)
- `/brand/strategy/voice/blog/EXTENSION.md` (2,000 tokens)
- `/brand/strategy/messaging/STRATEGY.md` (4,000 tokens)
- `/brand/research/sustainable-sourcing/RESEARCH.md` (12,000 tokens)
- `/brand/research/customer-insights/RESEARCH.md` (15,000 tokens)
- `/brand/content/blog-posts/example-1.md` (2,000 tokens)
- `/brand/content/blog-posts/example-2.md` (2,500 tokens)
- `/brand/content/blog-posts/example-3.md` (1,800 tokens)

**Your context design:**

Load:
1. _______
2. _______
3. _______
4. _______
5. _______

Total tokens: _______

<details>
<summary>Click to reveal suggested answer</summary>

**Optimal context:**

Load:
1. `/brand/strategy/voice/STRATEGY.md` (3,000) - Core voice
2. `/brand/strategy/voice/blog/EXTENSION.md` (2,000) - Blog-specific
3. `/brand/strategy/messaging/STRATEGY.md` (4,000) - Key messages about sustainability
4. `/brand/research/sustainable-sourcing/RESEARCH.md` (12,000) - Direct relevance to topic
5. `/brand/content/blog-posts/example-1.md` (2,000) - One strong example

**Total: 23,000 tokens** - Manageable, focused, relevant

**Don't load:**
- Customer insights (not directly relevant to sourcing topic)
- Multiple examples (one is enough, can add more if needed)
- Any content not directly related to task

**Rationale:**
- Stays well under token limits
- Includes all task-relevant context
- Provides one clear example
- Leaves room for the actual blog post (~2,000 tokens)
- Can progressively disclose more if needed
</details>

---

## Summary and Key Takeaways

### What We Learned

**1. Tokens are the fundamental unit**
- LLMs process text as tokens (not words)
- Every LLM has a token limit (Claude Sonnet 3.5: 200k)
- Context design must account for token budgets

**2. Context windows are working memory**
- Everything must fit in the context window
- Context includes system prompt, history, files, task, and response
- Context overflow causes quality degradation

**3. LLMs are stateless**
- No memory between conversations
- Each interaction starts fresh
- Files provide persistent "memory" for the system

**4. Attention mechanisms enable focus**
- LLMs can identify relevant information
- But attention degrades with context size
- Clean, structured context improves attention accuracy

**5. Fundamental limitations shape architecture**
- No persistent memory → File-based architecture
- Context limits → Progressive disclosure
- Stateless execution → Self-contained workflows
- Context degradation → Focused, hierarchical context

**6. Traditional approaches fail**
- Context dumping overwhelms models
- Assuming memory breaks consistency
- Single-step complex tasks produce poor quality
- Unstructured information dilutes attention

**7. Context management is critical**
- Load only what's needed (selectivity)
- Load most important first (hierarchy)
- Maximize signal-to-noise ratio (clarity)

### How This Connects to AMA

Every aspect of AMA's architecture addresses LLM limitations:

| LLM Limitation | AMA Solution |
|----------------|--------------|
| No persistent memory | File-based architecture with indexes |
| Context window constraints | Progressive disclosure, three-layer framework |
| Stateless execution | Temporal executions, self-contained workflows |
| Context degradation | Entry points, extensions, focused context |
| Probabilistic behavior | Structured templates, explicit guidelines |
| Attention limitations | Hierarchical organization, markdown references |

**The big insight:**

AMA isn't fighting against how LLMs work - it's **designed around** how they work. Understanding LLM fundamentals explains why AMA is structured the way it is.

---

## Transition to Class 2

Now that you understand how LLMs process information and their fundamental limitations, we can explore the solution: **file-based context management**.

In Class 2, we'll dive deep into:
- The "context dumping" anti-pattern and its consequences
- Progressive disclosure as a solution strategy
- How file systems enable context management
- Why AMA uses files as the foundation for all agent work

You'll learn to design file structures that work **with** LLM limitations instead of against them, setting the foundation for the three-layer marketing framework in Class 3.

---

## Further Reading

**Within AMA:**
- `/CLAUDE.md` - Complete AMA architectural guide
- `/.claude/skills/agentic-orchestrating/SKILL.md` - Workflow execution patterns

**External Resources:**
- Anthropic's Model Context Window documentation
- Research papers on attention mechanisms (for technical deep dive)
- Token counting tools for different models

---

**Next Class:** [Class 2: The Context Problem (And Why Files Are The Solution)](/brand/content/courses/2025-11-11@12:00-ama-fundamentals-course/artifacts/02b-class-02-context-problem.md)
