# Class 3 Practical: Creating Your First Commands

**Course:** AMA Fundamentals  
**Class Number:** 3 of 7  
**Estimated Time:** 30-45 minutes  
**Prerequisites:** Completed Class 3 Conceptual  

---

## What You'll Build

By the end of this practical, you'll have:
- Created your first command
- Organized commands in a discoverable structure
- Tested and iterated on a real workflow

---

## Part 1: Command File Structure

Commands live in `/.claude/commands/` in your IDE.

### Basic Template

```markdown
---
argument-hint: Brief description of what arguments this needs
---
# Command Name

## Purpose
One sentence: what does this command do?

## Variables
VARIABLE_NAME: $ARGUMENTS
(or $1, $2, $3 for multiple specific arguments)

## Instructions
1. Step-by-step what the AI should do
2. Where to save outputs
3. What to ask the user
```

### Real Example: Tweet Formatter

**File:** `/.claude/commands/content/format-tweet.md`

```markdown
---
argument-hint: Path to tweet file to format
---
# Format Tweet

## Purpose
Clean up tweet formatting by removing m-dashes and hashtags.

## Variables
TWEET_FILE: $ARGUMENTS

## Instructions
1. Read the tweet file at `TWEET_FILE`
2. Remove all m-dashes (—) and hyphens (-)
3. Remove all hashtags (anything starting with #)
4. Preserve line breaks and other formatting
5. Display the formatted tweet to the user
6. Ask if they want to save the formatted version
```

**Usage:**
```
/content:format-tweet /brand/content/twitter-posts/2025-11-11@14:30/CONTENT.md
```

---

## Part 2: Organizing Commands for Discovery

### Domain-Based Structure (Mirrors `/brand/`)

```
/.claude/commands/
├── research/                        # Research workflows
│   ├── extract-quotes.md            # /research:extract-quotes [path]
│   ├── analyze-competitor.md        # /research:analyze-competitor [url]
│   └── synthesize-findings.md       # /research:synthesize-findings [domain]
├── strategy/                        # Strategy workflows
│   ├── alignment-check.md           # /strategy:alignment-check [content-path]
│   └── voice-check.md               # /strategy:voice-check [content-path]
└── content/                         # Content workflows
    ├── format-tweet.md              # /content:format-tweet [path]
    ├── twitter-thread.md            # /content:twitter-thread [topic]
    └── blog-outline.md              # /content:blog-outline [topic]
```

**Why this structure:**
- Mirrors your `/brand/` organization
- Teammates know where to look
- Type `/research:` to see all research commands
- Type `/content:` to see all content commands

---

## Part 3: Step-by-Step - Create Your First Command

### Step 1: Identify a Repetitive Task

**Use the Three-Uses Rule:** If you've done something manually 3+ times, make it a command.

**Good candidates:**
- Formatting content for specific platforms
- Extracting insights from research
- Checking content against brand voice
- Analyzing competitor materials

**Example:** You keep asking Claude to "remove hashtags and m-dashes from tweets before posting."

### Step 2: Create the Command File

**Create:** `/.claude/commands/content/format-tweet.md`

**Start with the template:**

```markdown
---
argument-hint: Path to tweet file to format
---
# Format Tweet

## Purpose
Clean up tweet formatting by removing m-dashes and hashtags for posting.

## Variables
TWEET_FILE: $ARGUMENTS

## Instructions
1. Read the tweet file at `TWEET_FILE`
2. Remove all m-dashes (—) and hyphens (-)
3. Remove all hashtags (anything starting with #)
4. Preserve line breaks
5. Display the formatted tweet
6. Ask if they want to save it
```

### Step 3: Test It

**Create a test tweet file:** `/brand/content/twitter-posts/2025-11-13@10:00-test/CONTENT.md`

```markdown
Using AI for marketing is a game-changer—automate workflows without losing quality.

#AI #Marketing #Automation
```

**Run your command:**
```
/content:format-tweet /brand/content/twitter-posts/2025-11-13@10:00-test/CONTENT.md
```

**Expected output:**
```
Using AI for marketing is a game changer automate workflows without losing quality.
```

### Step 4: Iterate Based on Results

**Did it work?** Great! Save it.

**Issues?** Edit the command file:
- Add missing steps
- Clarify instructions
- Handle edge cases

**Example iteration:** "Oh, I also want to remove bullet points and format as single paragraph"

Update the command:
```markdown
## Instructions
1. Read the tweet file at `TWEET_FILE`
2. Remove all m-dashes (—) and hyphens (-)
3. Remove all hashtags (anything starting with #)
4. Remove bullet points (-, *, •)
5. Combine into single paragraph
6. Preserve natural line breaks
7. Display the formatted tweet
8. Ask if they want to save it
```

---

## Part 4: Writing Techniques for Better Commands

### Technique 1: Clear Variable Names

**Bad:**
```markdown
## Variables
X: $1
Y: $2
```

**Good:**
```markdown
## Variables
COMPETITOR_URL: $1
OUTPUT_FOLDER: $2
```

### Technique 2: Explicit File Paths

**Bad:**
```markdown
1. Save to the research folder
```

**Good:**
```markdown
1. Save to `/brand/research/competitive-analysis/{YYYY-MM-DD@HH:mm}/RESEARCH.md`
```

### Technique 3: Bold Key Actions

**Bad:**
```markdown
1. Read the file
2. Extract quotes
3. Save the output
```

**Good:**
```markdown
1. **Read** the file at `INPUT_FILE`
2. **Extract** quotes with emotional intensity ratings
3. **Save** output to `/brand/research/{domain}/{timestamp}/artifacts/quotes.md`
```

### Technique 4: Include Examples When Needed

```markdown
## Instructions

1. **Construct** a descriptive slug based on the topic

**Example slug format:**
- Topic: "AI tools for marketers" → slug: "ai-tools-for-marketers"
- Topic: "Brand positioning 2025" → slug: "brand-positioning-2025"

2. **Create** folder at `/brand/content/blog-posts/{YYYY-MM-DD@HH:mm-SLUG}/`
```

---

## Part 5: Command Patterns

### Pattern 1: Simple Execution Command

**Use when:** Direct, single-step task

```markdown
## Instructions
1. **Read** file at `INPUT_PATH`
2. **Transform** according to rules
3. **Display** result
4. **Ask** if user wants to save
```

**Example:** Format tweet, check spelling, convert format

### Pattern 2: Workflow Trigger Command

**Use when:** Multi-step workflow that needs orchestration

```markdown
## Instructions

This command triggers a multi-step workflow:

1. **Create** execution folder at `/brand/content/{type}/{YYYY-MM-DD@HH:mm-SLUG}/`
2. **Generate** PLAN.md outlining the approach
3. **Ask** user for approval before proceeding
4. **Execute** content creation following approved plan
5. **Save** final output to CONTENT.md
```

**Example:** Create blog post, run research domain, generate content series

### Pattern 3: Wrapper Command

**Use when:** Delegating to another command or skill

```markdown
## Instructions

This is a **wrapper command** that delegates to the researching skill:

1. **Construct** task description:
   "Create research plan for {RESEARCH_DOMAIN} using the researching skill..."

2. **Pass** to /plan command:
   
   */plan "[TASK_DESCRIPTION]"*

```

**Example:** Domain research, strategy synthesis, complex workflows

---

## Part 6: Common Mistakes to Avoid

### Mistake 1: Too Vague

**Bad:**
```markdown
## Instructions
1. Analyze the competitor
2. Save somewhere
```

**Good:**
```markdown
## Instructions
1. **Scrape** competitor website at `COMPETITOR_URL` using MCP
2. **Extract** value prop, target audience, messaging patterns
3. **Compare** against our positioning at `/brand/strategy/positioning/STRATEGY.md`
4. **Save** to `/brand/research/competitive-analysis/{YYYY-MM-DD@HH:mm}/RESEARCH.md`
```

### Mistake 2: Embedding Too Much Logic

**Bad:** (300 lines of detailed methodology in the command)

**Good:**
```markdown
## Instructions
1. **Use** the researching skill to extract customer insights
2. **Follow** the quote extraction framework in the skill
3. **Save** to standard research structure
```

**Why:** Commands are entry points. Complex logic belongs in skills (Class 6).

### Mistake 3: No Argument Hints

**Bad:**
```markdown
---
---
# Analyze Competitor
```

**Good:**
```markdown
---
argument-hint: [competitor-url] [optional: focus-area]
---
# Analyze Competitor
```

**Why:** Hints guide users when typing the command.

---

## Practice Exercise

### Exercise 1: Create a Voice Check Command

**Task:** Create a command that checks if content matches your brand voice.

**Steps:**

1. **Create file:** `/.claude/commands/strategy/voice-check.md`

2. **Write the command:**

```markdown
---
argument-hint: Path to content file to check
---
# Voice Check

## Purpose
Check if content aligns with brand voice guidelines.

## Variables
CONTENT_FILE: $ARGUMENTS

## Instructions
1. **Read** the content at `CONTENT_FILE`
2. **Load** brand voice from `/brand/strategy/voice/STRATEGY.md`
3. **Analyze** content against voice attributes (tone, language, style)
4. **Identify** sections that don't match
5. **Suggest** specific improvements
6. **Display** results with quoted examples
```

3. **Test it** on a real content file

4. **Iterate** based on what you learn

### Exercise 2: Organize Your Commands

**Task:** Set up a basic command structure for your team.

**Steps:**

1. **Create folders:**
   ```
   /.claude/commands/
   ├── research/
   ├── strategy/
   └── content/
   ```

2. **Move existing commands** into appropriate folders

3. **Test discovery:** Type `/research:` and see if your commands appear

4. **Document** in a README.md what each category contains

---

## Summary

**What you built:**
- Your first functional command
- A discoverable command structure
- Practical patterns for command creation

**Key patterns:**
- Simple execution (read → transform → display)
- Workflow trigger (create folder → plan → execute)
- Wrapper (delegate to skills/commands)

**Remember:**
- Three-Uses Rule: 3+ times → make it a command
- Start simple, iterate based on real use
- Commands are entry points, skills handle complexity

**Next:** Class 4 will show you how to use sub-agents for specialized work.

---

## Quick Reference

### Command Template

```markdown
---
argument-hint: [what goes here]
---
# Command Name

## Purpose
One sentence

## Variables
VAR_NAME: $ARGUMENTS

## Instructions
1. **Action** what to do
2. **Action** next step
3. **Save** where to put it
```

### Usage Pattern

```
/category:command-name argument1 argument2
```

**Your marketing processes are now code.**
