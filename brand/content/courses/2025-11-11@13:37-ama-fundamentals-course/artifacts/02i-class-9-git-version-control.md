# Class 4: Git Integration & Version Control

**Course:** AMA Fundamentals
**Class Number:** 4 of 9
**Estimated Time:** 60 minutes
**Prerequisites:** Class 2 (The Integrated File System), Class 3 (Marketing File Structure)

---

## Class Overview

You've learned how file systems solve LLM context problems (Class 2) and how to organize marketing work into the three-layer AMA framework (Class 3). Now you have a crucial question: **What happens when you need to experiment with strategy changes?**

Traditional marketing tools make this scary:
- Google Docs: "Wait, what version is this?"
- Notion: "Did someone overwrite our approved messaging?"
- Spreadsheets: "Marketing_Strategy_FINAL_v3_ACTUALLY_FINAL.xlsx"

**Git solves this by giving you a time machine for your marketing strategy.** You can experiment freely, knowing you can always go back. You can try bold new positioning, see how it feels, and revert if it doesn't work - all without losing your original work.

This class teaches Git as a **safety net for marketing experimentation**, not as a developer tool. We'll focus on the practical commands you need, skip the technical complexity, and show you how Claude Code makes Git almost invisible.

### Learning Objectives

By the end of this class, you'll be able to:
- Understand why version control matters for marketing strategy
- Use basic Git commands to save and track changes
- Create meaningful commits that document strategy evolution
- Work with branches to test strategy variations
- Recover previous versions of your strategy
- Feel confident (not intimidated) using Git for marketing work

### What You'll Learn

1. **Why Git Matters for Marketing** - Version control as experimentation safety net
2. **Git Mental Model** - Snapshots, not track changes
3. **Essential Git Workflow** - The four commands you'll use daily
4. **Commits as Strategy Documentation** - Making your history tell a story
5. **Branching for Strategy Variants** - Safe experimentation patterns
6. **Claude Code Git Integration** - How AI helps you use Git

---

## Part 1: Why Git Matters for Marketing Strategy

### The Marketing Strategy Problem

You're refining your brand positioning. You have an approved version that works, but you want to test a bolder angle. What do you do?

**Without version control:**
- Copy `positioning-v1.md` → `positioning-v2-bold.md` → `positioning-v3-bold-revised.md`
- Lose track of what changed between versions
- Can't remember why you made specific decisions
- Hard to collaborate ("Which version are you editing?")
- Fear of experimentation ("What if this makes it worse?")

**With Git:**
- Create a branch: `git checkout -b bold-positioning`
- Make changes freely, commit as you go
- See exactly what changed: `git diff`
- Go back if needed: `git checkout main`
- Merge if it works: `git merge bold-positioning`
- Complete history of why decisions were made

### Version Control vs Track Changes

Think of Google Docs "track changes" - it shows edits, but:
- No way to save multiple experimental versions
- Can't compare Version 1 (last month) to Version 5 (today)
- Hard to understand WHY changes were made
- Difficult to collaborate on different ideas simultaneously

**Git is different:** It's a **snapshot system**, not a track-changes system.

```
Track Changes:           Git Snapshots:
─────────────           ─────────────
Draft                   ● Commit 1: "Initial positioning"
  ├─ Edit 1                 │
  ├─ Edit 2                 ● Commit 2: "Add tech-forward angle"
  ├─ Edit 3                 │
  └─ Edit 4                 ● Commit 3: "Refine for enterprise audience"
                            │
(Continuous changes)    ● Commit 4: "Final approved version"

                        (Distinct saved versions)
```

Every commit is a complete snapshot of your files at that moment. You can jump between snapshots instantly.

### Why This Matters for AMA

Remember from Class 3: AMA uses **temporal execution folders** (`/2025-11-11@13:37/`) to track strategy iterations. Git complements this by:

1. **Versioning within executions** - Track changes as you develop strategy in an execution folder
2. **Versioning the entire framework** - Save snapshots of your whole `/brand/` structure
3. **Collaboration safety** - Multiple people can work on strategy without conflicts
4. **Experimentation freedom** - Try radical changes knowing you can revert
5. **Audit trails** - Git commits + CHANGELOG.md = complete strategy evolution story

**Key insight:** Temporal folders track *what* changed (execution iterations). Git tracks *how* it changed (specific edits and decisions).

---

## Part 2: Git Mental Model (Non-Technical)

Before learning commands, understand how Git thinks about your files.

### Three Zones: Working, Staging, Repository

Git organizes your work into three zones:

```
Your Files (Working Directory)
    ↓ (git add)
Staging Area (Changes ready to save)
    ↓ (git commit)
Repository (Saved snapshots with messages)
    ↓ (git push)
Remote Repository (GitHub/backup)
```

**Working Directory** = Your actual files in `/brand/`
- You edit these normally in VS Code/Cursor
- Changes here are NOT saved yet

**Staging Area** = Changes you've selected to save
- Think of this as "items in your shopping cart"
- You choose exactly which changes to include in next snapshot

**Repository** = Saved snapshots (commits)
- Each commit is a complete version with a message
- Commits are permanent and referenceable

**Remote Repository** = Backup/collaboration copy (usually GitHub)
- Optional but recommended
- Enables team collaboration
- Acts as backup if your computer fails

### Marketing Analogy: The Photo Album

Think of Git like a photo album of your strategy:

- **Working Directory** = Your desk (current messy state)
- **Staging Area** = Photos you've selected to add to album
- **Commit** = Pasting photos into album with captions
- **Repository** = Your complete photo album
- **Push** = Making copies of album for your team

Just like you don't photograph every second of your day, you don't commit every keystroke - you commit **meaningful milestones** in your strategy development.

### What Files Should You Track?

**Always track:**
- Strategy documents (`STRATEGY.md`, `RESEARCH.md`, `CONTENT.md`)
- Plans and TODOs (`PLAN.md`, `TODO.md`)
- Commands, agents, skills (`.claude/` folder)
- Configuration files (`CLAUDE.md`, `.mcp.json`)
- Changelogs (`CHANGELOG.md`)

**Usually track:**
- Artifacts (analysis, drafts) - depends on file size
- Data (transcripts, surveys) - if not too large

**Never track:**
- Sensitive information (API keys, passwords)
- Large binary files (videos, huge PDFs)
- Generated files that can be recreated
- Personal notes not meant for team

**Use `.gitignore`** to tell Git what to skip:
```
# Example .gitignore for AMA
.env
*.log
node_modules/
.DS_Store
```

---

## Part 3: Essential Git Workflow

These are the commands you'll use daily. We'll explain what they do in marketing context.

### Setup (One Time Only)

**Initialize Git in your workspace:**
```bash
cd /path/to/your/workspace
git init
```

This creates a hidden `.git` folder that stores your repository. You only do this once when starting a new AMA workspace.

**Configure your identity:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Git uses this to track who made changes (useful for team collaboration).

### Daily Workflow: The Four Commands

Once setup is complete, you'll use these four commands regularly:

#### 1. Check Status: "What's Changed?"

```bash
git status
```

**What it does:** Shows which files have changed since your last commit.

**Example output:**
```
On branch main
Changes not staged for commit:
  modified:   brand/strategy/voice/STRATEGY.md

Untracked files:
  brand/strategy/positioning/2025-11-11@14:30/PLAN.md
```

**Marketing translation:** "Here's what you've been working on since your last save point."

**When to use:**
- Start of work session (what did I change yesterday?)
- Before committing (what am I about to save?)
- Anytime you're unsure what you've modified

#### 2. Stage Changes: "Select What to Save"

```bash
git add <file>
```

**What it does:** Moves files from Working Directory to Staging Area.

**Examples:**
```bash
# Add one file
git add brand/strategy/voice/STRATEGY.md

# Add all files in a folder
git add brand/strategy/positioning/

# Add everything that changed
git add .
```

**Marketing translation:** "I'm selecting these changes to include in my next snapshot."

**When to use:**
- After completing a logical chunk of work
- Before committing
- To select specific changes for this commit (not everything at once)

**Common pattern:**
```bash
git status           # See what changed
git add <specific>   # Add only related changes
git status           # Verify what's staged
git commit           # Save the snapshot
```

#### 3. Commit: "Save a Snapshot"

```bash
git commit -m "Your message describing what changed"
```

**What it does:** Saves staged changes as a new snapshot with a descriptive message.

**Examples:**
```bash
git commit -m "Initial voice strategy for tech brand"
git commit -m "Refine tone for enterprise audience"
git commit -m "Add Twitter-specific voice extensions"
git commit -m "Update positioning based on competitor research"
```

**Marketing translation:** "Save this version of my strategy with a note explaining what I did."

**When to use:**
- After completing a meaningful change
- When you want a "save point" to return to
- Before trying something experimental
- End of work session (save progress)

**Commit message best practices:**
- Start with a verb: "Add", "Update", "Refine", "Fix"
- Be specific: Not "Updated docs" but "Refine positioning for enterprise segment"
- Explain WHY if not obvious: "Simplify messaging (user testing showed confusion)"

#### 4. Push: "Backup to Cloud"

```bash
git push
```

**What it does:** Copies your commits to a remote repository (GitHub, GitLab, etc.).

**Marketing translation:** "Back up my work and share with team."

**When to use:**
- End of day (backup your work)
- After significant milestones
- Before asking teammates to review
- When collaborating (make your changes available)

**Note:** First time pushing, you may need:
```bash
git push -u origin main
```
This tells Git where to push (usually GitHub). After that, just `git push` works.

### Complete Daily Workflow Example

**Scenario:** You're refining your brand voice strategy.

```bash
# Start by checking what's changed
git status

# You see you modified STRATEGY.md and added new Twitter extensions
# Stage those changes
git add brand/strategy/voice/STRATEGY.md
git add brand/strategy/voice/twitter/

# Verify what's staged
git status

# Save with a descriptive message
git commit -m "Add conversational tone guidelines for Twitter"

# Back up to GitHub
git push
```

**That's it.** This workflow handles 90% of your daily Git usage.

---

## Part 4: Commits as Strategy Documentation

Commits aren't just technical saves - they're **documentation of your strategic thinking**.

### Writing Meaningful Commit Messages

Your commit history tells the story of how your strategy evolved. Future you (or teammates) will thank you for clear messages.

**Bad commit messages:**
```bash
git commit -m "updates"
git commit -m "changed stuff"
git commit -m "final version"
git commit -m "asdf"
```

These tell you nothing about what changed or why.

**Good commit messages:**
```bash
git commit -m "Shift positioning from 'easy' to 'powerful' based on user interviews"
git commit -m "Add technical depth to voice strategy for developer audience"
git commit -m "Simplify messaging framework - testing showed 3 pillars too complex"
git commit -m "Initial competitive analysis research for SaaS category"
```

These tell a story about strategic decisions.

### Commit Message Formula

Use this pattern for marketing commits:

```
[Action] [What] ([Why/Context])

Examples:
- Add competitor analysis for top 5 SaaS tools
- Update positioning to emphasize speed (user survey insight)
- Refine voice guidelines for enterprise tone
- Fix messaging inconsistency in value props
- Remove outdated audience segment (no longer targeting)
```

**Components:**
1. **Action verb** - What type of change (Add, Update, Refine, Fix, Remove)
2. **What changed** - Be specific about the file or content
3. **Why (optional)** - Context for the decision if not obvious

### Viewing Your History

See your commit history:
```bash
git log
```

**Output:**
```
commit a3f5b8c2d1e4f6a7b8c9d0e1f2a3b4c5d6e7f8a9
Author: Marketing Architect <you@example.com>
Date:   Mon Nov 11 14:30:00 2025

    Add competitor analysis for top 5 SaaS tools

commit 9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0
Author: Marketing Architect <you@example.com>
Date:   Mon Nov 11 10:15:00 2025

    Initial positioning strategy draft
```

**Better view (one line per commit):**
```bash
git log --oneline
```

**Output:**
```
a3f5b8c Add competitor analysis for top 5 SaaS tools
9b8c7d6 Initial positioning strategy draft
e4f5a6b Set up AMA workspace structure
```

**Marketing insight:** Your commit history + CHANGELOG.md = complete strategy evolution story
- Commits show HOW (specific changes)
- CHANGELOG shows WHAT and WHY (strategic narrative)

### Linking Commits to AMA Workflow

**Pattern:** Commit at execution boundaries

```
Start new strategy execution:
├── Create /brand/strategy/voice/2025-11-11@14:30/
├── Write PLAN.md
└── git commit -m "Plan voice strategy refinement"

Work on execution:
├── Draft STRATEGY.md
└── git commit -m "Draft conversational tone guidelines"

Complete execution:
├── Finish STRATEGY.md
├── Update TODO.md (mark complete)
└── git commit -m "Complete voice strategy - ready for review"

Update domain index:
├── Update /brand/strategy/voice/STRATEGY.md
├── Update CHANGELOG.md
└── git commit -m "Update voice strategy index with conversational tone"
```

This gives you snapshots at every significant milestone.

---

## Part 5: Branching for Strategy Variants

Branches let you experiment with strategy variations without affecting your approved version.

### Branch Mental Model

Think of branches like parallel universes for your strategy:

```
main branch (approved strategy)
    │
    ├─── bold-positioning branch (experimental)
    │        │
    │        ├─ Try radical messaging
    │        ├─ Test with stakeholders
    │        └─ Evaluate results
    │
    └─── enterprise-voice branch (variation)
             │
             ├─ Add formal tone
             ├─ Remove casual language
             └─ Test on LinkedIn
```

**Main branch** = Your source of truth, approved strategy
**Feature branches** = Safe spaces to experiment

**Key principle:** Changes in branches don't affect main until you merge them.

### Creating a Branch

**Scenario:** You want to test a bolder positioning, but keep your current version safe.

```bash
# Create and switch to new branch
git checkout -b bold-positioning
```

This creates a new branch called `bold-positioning` and switches to it. Now any commits go to this branch, not `main`.

**Verify which branch you're on:**
```bash
git branch
```

**Output:**
```
* bold-positioning
  main
```

The asterisk shows your current branch.

### Working in a Branch

Once on a branch, work normally:

```bash
# Make changes to positioning
# Edit brand/strategy/positioning/STRATEGY.md

# Stage and commit
git add brand/strategy/positioning/STRATEGY.md
git commit -m "Test bold 'revolution, not evolution' positioning"

# Continue iterating
# Edit more files

git add .
git commit -m "Refine bold messaging for consistency"
```

**Your main branch is unchanged.** These commits only exist in `bold-positioning` branch.

### Switching Between Branches

**Go back to main (approved version):**
```bash
git checkout main
```

Your files instantly revert to the main branch state. The bold positioning changes disappear (but they're saved in the `bold-positioning` branch).

**Return to experiment:**
```bash
git checkout bold-positioning
```

Your bold changes reappear.

**This is the magic:** Instant switching between strategy versions.

### Comparing Branches

**See what's different:**
```bash
git diff main bold-positioning
```

This shows exactly what changed between main and your experimental branch.

### Merging: Bringing Changes Back

If your experiment worked, merge it back to main:

```bash
# Switch to main
git checkout main

# Merge the bold-positioning changes
git merge bold-positioning
```

Git combines the changes into main. Now your approved strategy includes the bold positioning.

**If experiment failed:**
```bash
# Just stay on main, delete the branch
git branch -d bold-positioning
```

Your main branch is unchanged, experiment is discarded.

### Branching Patterns for Marketing

**Pattern 1: Strategy iteration**
```bash
git checkout -b voice-refinement-v2
# Iterate on voice strategy
# Test internally
# If approved: merge to main
# If not: delete branch, try again
```

**Pattern 2: Platform-specific variations**
```bash
git checkout -b twitter-voice-test
# Add Twitter extensions
# Test content generation
# If works: merge to main
# If not: keep iterating in branch
```

**Pattern 3: Stakeholder review**
```bash
git checkout -b positioning-review-draft
# Prepare version for stakeholder feedback
# Make revisions based on feedback
# When approved: merge to main
```

**Pattern 4: A/B testing strategy**
```bash
git checkout -b messaging-variant-a
# Develop variant A
git checkout main
git checkout -b messaging-variant-b
# Develop variant B
# Test both, merge winner
```

### Branch Best Practices

1. **Name branches descriptively**
   - Good: `bold-positioning`, `enterprise-voice-test`, `twitter-extensions`
   - Bad: `test`, `branch2`, `tmp`

2. **One branch per experiment**
   - Don't mix unrelated changes
   - Keep branches focused

3. **Short-lived branches**
   - Merge or delete within days/weeks
   - Don't let branches diverge too far from main

4. **Main branch = approved strategy**
   - Only merge reviewed, approved changes
   - Keep main clean and stable

5. **Delete merged branches**
   - After merging, delete the branch: `git branch -d branch-name`
   - Keeps your branch list manageable

---

## Part 6: Recovery & Time Travel

Git's superpower: you can go back to any previous version.

### Viewing What Changed

**See changes since last commit:**
```bash
git diff
```

Shows exactly what you've edited (but not committed yet).

**See changes in a specific file:**
```bash
git diff brand/strategy/voice/STRATEGY.md
```

**Output:**
```diff
- Our voice is professional and formal.
+ Our voice is conversational yet credible.
```

Lines with `-` were removed, lines with `+` were added.

### Undoing Uncommitted Changes

**Scenario:** You made changes but don't like them, want to revert to last commit.

```bash
# Undo changes to one file
git checkout -- brand/strategy/voice/STRATEGY.md

# Undo ALL changes (careful!)
git checkout -- .
```

**Warning:** This discards your changes permanently. Make sure you want to do this.

### Undoing Committed Changes

**Scenario:** You committed something but realize it was wrong.

**Option 1: Undo last commit (keep changes):**
```bash
git reset --soft HEAD~1
```

This un-commits your last commit, but keeps the changes in your files. You can now edit and recommit.

**Option 2: Undo last commit (discard changes):**
```bash
git reset --hard HEAD~1
```

**Warning:** This deletes the commit AND the changes. Only use if you're certain.

### Time Travel: Going Back to Old Versions

**Scenario:** You want to see what your positioning looked like 3 months ago.

```bash
# Find the commit
git log --oneline

# Example output:
# a3f5b8c Current positioning (today)
# 7d6e5f4 Refine messaging (2 weeks ago)
# 2b3c4d5 Initial positioning (3 months ago)

# View that old version
git checkout 2b3c4d5
```

Now your files show the state from 3 months ago. You're in "detached HEAD" state (don't worry about the scary name).

**Look around, read the files, then return to present:**
```bash
git checkout main
```

**Copy something from the past:**
```bash
# While viewing old version
# Copy text from old STRATEGY.md

# Return to present
git checkout main

# Paste the copied text where you want it
```

This lets you recover old ideas or approaches you later removed.

### Creating a Branch from the Past

If you want to resurrect an old approach:

```bash
# Find the old commit
git log --oneline

# Create a branch from that point
git checkout -b resurrect-old-messaging 2b3c4d5

# Now you're on a new branch with the old version
# You can build on it, merge back to main if you want
```

---

## Part 7: Claude Code Git Integration

Claude Code makes Git easier by:
1. Showing Git status in the interface
2. Helping you write commit messages
3. Creating commits with one command
4. Managing branches for you

### Claude Code Git Features

**Ask Claude to commit changes:**
```
You: "Create a commit with the voice strategy changes"

Claude: (runs git commands)
- Checks status: git status
- Stages changes: git add brand/strategy/voice/
- Writes message: git commit -m "Update voice strategy with conversational tone"
- Confirms: "Committed changes to voice strategy"
```

**Ask Claude for Git status:**
```
You: "What files have I changed?"

Claude: (runs git status)
- Lists modified files
- Shows untracked files
- Explains what's ready to commit
```

**Ask Claude to create branches:**
```
You: "Create a branch for testing bold positioning"

Claude: (runs git checkout -b bold-positioning)
- Creates branch
- Switches to it
- Confirms: "Now on bold-positioning branch"
```

### Let Claude Write Commit Messages

Claude can analyze your changes and suggest meaningful commit messages:

```
You: "Suggest a commit message for my changes"

Claude: (runs git diff, analyzes changes)
"Based on your changes to STRATEGY.md and the addition of Twitter extensions,
I suggest:

git commit -m 'Add conversational tone guidelines and Twitter-specific extensions'

This captures both the core voice update and the platform-specific work."
```

### Collaboration Pattern

**Workflow with Claude:**
1. You: "I'm working on voice strategy refinement"
2. Claude: Creates execution folder, drafts PLAN.md
3. You + Claude: Iterate on strategy
4. You: "Commit my progress"
5. Claude: Stages files, writes commit, pushes

Claude handles the Git commands, you focus on strategy decisions.

---

## Part 8: Practical Examples

### Example 1: Daily Strategy Work

**Morning:**
```bash
# See what you were working on yesterday
git status

# Create a branch for today's work
git checkout -b positioning-iteration-nov11
```

**During the day:**
```bash
# After drafting new positioning
git add brand/strategy/positioning/2025-11-11@14:30/
git commit -m "Draft positioning focused on speed advantage"

# After revising based on feedback
git add brand/strategy/positioning/2025-11-11@14:30/STRATEGY.md
git commit -m "Refine positioning - emphasize ease of use over raw speed"

# After completing execution
git add brand/strategy/positioning/2025-11-11@14:30/TODO.md
git commit -m "Complete positioning execution - ready for review"
```

**End of day:**
```bash
# Back up your work
git push
```

**After approval:**
```bash
# Merge to main
git checkout main
git merge positioning-iteration-nov11

# Update index and changelog
git add brand/strategy/positioning/STRATEGY.md
git add brand/strategy/positioning/CHANGELOG.md
git commit -m "Update positioning index with speed-focused narrative"

# Push final version
git push

# Clean up
git branch -d positioning-iteration-nov11
```

### Example 2: Testing Strategy Variants

**Scenario:** You want to test two different voice approaches.

```bash
# Create variant A
git checkout -b voice-variant-a-professional
# Edit strategy files for professional tone
git commit -m "Voice variant A: formal professional tone"

# Create variant B
git checkout main
git checkout -b voice-variant-b-conversational
# Edit strategy files for conversational tone
git commit -m "Voice variant B: friendly conversational tone"

# Test both
# Generate content using variant A
git checkout voice-variant-a-professional
# (generate content, evaluate)

# Generate content using variant B
git checkout voice-variant-b-conversational
# (generate content, evaluate)

# Decision: variant B wins
git checkout main
git merge voice-variant-b-conversational

# Delete losing variant
git branch -d voice-variant-a-professional
```

### Example 3: Recovering from a Mistake

**Scenario:** You updated positioning strategy but realize the old version was better.

```bash
# See recent commits
git log --oneline

# Output:
# e5f6a7b Update positioning (today - mistake)
# c4d5e6f Refine messaging (yesterday)
# a3b4c5d Initial positioning (last week - the good one)

# Option 1: Undo just the last commit
git reset --hard c4d5e6f

# Option 2: Create a branch with the old version
git checkout -b restore-good-positioning a3b4c5d
# Review, then merge back to main if confirmed
```

### Example 4: Collaborative Review

**Scenario:** You want stakeholder feedback before finalizing strategy.

```bash
# Create review branch
git checkout -b positioning-for-stakeholder-review

# Prepare clean version
git add brand/strategy/positioning/
git commit -m "Prepare positioning strategy for stakeholder review"

# Push for team to see
git push -u origin positioning-for-stakeholder-review

# Stakeholders review, provide feedback
# You make revisions
git commit -m "Address stakeholder feedback - soften tech language"

# After approval
git checkout main
git merge positioning-for-stakeholder-review
git push
```

---

## Part 9: Common Pitfalls & Solutions

### Pitfall 1: "I have uncommitted changes and need to switch branches"

**Problem:**
```bash
git checkout main
# Error: Your local changes would be overwritten by checkout
```

**Solution:**
```bash
# Option A: Commit your changes first
git add .
git commit -m "Work in progress"
git checkout main

# Option B: Stash changes temporarily
git stash
git checkout main
# Later: git stash pop (restores changes)
```

### Pitfall 2: "I committed to the wrong branch"

**Problem:** You meant to create a branch, but committed to `main` by mistake.

**Solution:**
```bash
# Create the branch you should have used
git branch correct-branch-name

# Undo the commit on main (but keep changes in correct branch)
git reset --hard HEAD~1

# Switch to correct branch
git checkout correct-branch-name
# Your commit is now here
```

### Pitfall 3: "I pushed something I shouldn't have"

**Problem:** You pushed sensitive information (API keys, passwords) to GitHub.

**Solution:**
```bash
# Immediately remove from file
# Edit the file to remove sensitive data

# Commit the fix
git add .
git commit -m "Remove sensitive data"
git push

# IMPORTANT: Change the exposed credentials
# Just removing from Git isn't enough - they're in history
```

**Better:** Use `.gitignore` to prevent this:
```
# .gitignore
.env
secrets.txt
*.key
```

### Pitfall 4: "Git says 'merge conflict'"

**Problem:** Git can't automatically merge changes.

**What it looks like:**
```
<<<<<<< HEAD
Our voice is professional and approachable.
=======
Our voice is conversational yet credible.
>>>>>>> bold-positioning
```

**Solution:**
```bash
# Open the file, you'll see conflict markers
# Edit to choose what you want:
Our voice is conversational yet credible.

# Remove the conflict markers (<<<, ===, >>>)
# Save the file

# Tell Git you resolved it
git add <conflicted-file>
git commit -m "Resolve voice strategy merge conflict"
```

**Prevention:** Keep branches short-lived and merge frequently.

### Pitfall 5: "I can't remember what I changed"

**Solution:**
```bash
# See what's different from last commit
git diff

# See what's different in staging
git diff --staged

# See recent commits
git log --oneline -5
```

---

## Part 10: Git Best Practices for Marketing

### 1. Commit Often, Push Daily

**Don't wait until "done":**
- Commit every meaningful change
- Push at least daily (backup + collaboration)
- Small commits are easier to understand and revert

**Good rhythm:**
```
Morning: git pull (get team updates)
Every hour: git commit (save progress)
End of day: git push (backup)
```

### 2. Use Branches for Experiments

**Main branch = source of truth:**
- Only approved, reviewed strategy
- Always in working state
- Safe for team to reference

**Branches = experimentation:**
- Try bold ideas without fear
- Test platform-specific variations
- Stakeholder review versions

### 3. Write for Future You

**Commit messages should answer:**
- What did I change?
- Why did I change it?
- What problem does this solve?

**Bad:** `git commit -m "updates"`
**Good:** `git commit -m "Simplify messaging from 5 pillars to 3 - user testing showed confusion"`

### 4. Review Before Committing

```bash
# Always check what you're committing
git status
git diff

# Stage only what belongs together
git add <specific-files>

# Verify staging
git diff --staged

# Then commit
git commit -m "Descriptive message"
```

### 5. Use .gitignore

Create `.gitignore` to exclude:
- Sensitive data (`.env`, API keys)
- Large files (videos, huge datasets)
- System files (`.DS_Store`)
- Personal notes

### 6. Pull Before You Push

When collaborating:
```bash
git pull   # Get team's latest changes
# Resolve any conflicts
git push   # Send your changes
```

### 7. Keep Commit History Clean

**Don't commit:**
- Broken/incomplete work to main
- Experimental junk
- "Fixed typo" 10 times in a row (squash these)

**Do commit:**
- Working versions
- Logical chunks of work
- Meaningful milestones

---

## Knowledge Check

### Questions to Verify Understanding

1. **What's the difference between `git add` and `git commit`?**
   - Answer: `git add` stages changes (selects what to save), `git commit` saves them as a snapshot

2. **When should you create a branch instead of committing to main?**
   - Answer: When experimenting, testing variations, or working on something not yet approved

3. **You made changes but don't like them. How do you undo uncommitted changes?**
   - Answer: `git checkout -- .` (or specify file)

4. **How do you see what files you've changed since your last commit?**
   - Answer: `git status`

5. **What's a good commit message for updating brand voice strategy?**
   - Bad: "updates"
   - Good: "Add conversational tone guidelines for brand voice"

6. **Why is Git better than naming files `strategy_v1.md`, `strategy_v2.md`, etc.?**
   - Answer: Git tracks history automatically, shows exact changes, enables branching/merging, better collaboration

### Checkpoint Exercise

**Scenario:** You're refining positioning strategy. Complete this workflow:

```bash
# 1. Check current status
git status

# 2. Create a branch for your work
git checkout -b positioning-refinement

# 3. Make changes to brand/strategy/positioning/STRATEGY.md
# (edit the file)

# 4. See what changed
git diff

# 5. Stage your changes
git add brand/strategy/positioning/STRATEGY.md

# 6. Commit with meaningful message
git commit -m "Shift positioning from 'easy' to 'powerful' based on user feedback"

# 7. Push to backup
git push -u origin positioning-refinement

# 8. Switch back to main
git checkout main

# 9. Merge if approved
git merge positioning-refinement

# 10. Clean up
git branch -d positioning-refinement
```

**Success criteria:**
- You created a branch
- Made changes
- Committed with a clear message
- Could switch between branches
- Merged back to main

---

## Summary & Key Takeaways

### What You Learned

1. **Git as Safety Net** - Version control enables fearless experimentation with strategy
2. **Snapshot Model** - Git saves complete versions, not track changes
3. **Four Core Commands** - `status`, `add`, `commit`, `push` handle 90% of daily work
4. **Branching** - Safe parallel experimentation without affecting approved strategy
5. **Recovery** - Time travel to previous versions, undo mistakes
6. **Claude Integration** - AI helps with Git commands and commit messages

### How This Builds on Previous Classes

- **Class 1 (LLM Fundamentals)** - Git solves the "how do I preserve context across sessions?" problem
- **Class 2 (File System)** - Git versions the files that solve context segmentation
- **Class 3 (AMA Framework)** - Git tracks evolution of Research → Strategy → Content

### Git + AMA Pattern

```
Temporal Executions (AMA)         Git Commits (Version Control)
─────────────────────────         ─────────────────────────────
/2025-11-11@14:30/                ● "Plan voice strategy execution"
    ↓                                 ↓
Work on PLAN.md                   ● "Draft voice guidelines"
    ↓                                 ↓
Work on STRATEGY.md               ● "Refine tone for enterprise"
    ↓                                 ↓
Complete TODO.md                  ● "Complete voice execution"
    ↓                                 ↓
Update domain index               ● "Update voice index"
    ↓                                 ↓
Update CHANGELOG.md               ● "Document voice evolution"

(WHAT iterations)                 (HOW changes within iterations)
```

**Together:** Complete audit trail of strategy development.

### Preview of Class 5: Claude Code Commands

Now that you understand version control, Class 5 teaches you to create **reusable prompts as commands**. You'll learn:
- How to extract repeated prompts into slash commands
- When to create commands vs writing ad-hoc prompts
- Organizing commands for discoverability
- The difference between commands and skills (sneak peek)

Commands are the fundamental human-AI interface - you'll use them constantly. Git ensures you can version control those commands just like your strategy.

### Next Steps

**Practice exercises:**
1. Initialize Git in a sample AMA workspace
2. Create a branch, make changes, merge back
3. Write 5 commits with good messages
4. Use `git log` to review your history
5. Experiment with time travel (checkout old commits)

**Recommended setup:**
- Create a `.gitignore` file
- Set up a GitHub account (free)
- Push your workspace to GitHub (backup + collaboration)

**Resources:**
- [GitHub Docs](https://docs.github.com/) - Official guides
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) - Quick reference
- Ask Claude: "Explain this Git concept: [topic]"

---

## Quick Reference Card

### Essential Commands

```bash
# Check what changed
git status

# Stage changes
git add <file>              # Specific file
git add .                   # Everything

# Commit
git commit -m "Message"     # Save snapshot

# Push to remote
git push

# Create branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Merge branch to main
git checkout main
git merge branch-name

# See history
git log --oneline

# Undo uncommitted changes
git checkout -- <file>

# View differences
git diff
```

### Commit Message Template

```
[Action verb] [What changed] ([Why, if not obvious])

Examples:
- Add competitor research for enterprise segment
- Update voice strategy with conversational tone
- Refine positioning based on user interviews
- Fix inconsistent messaging in value props
```

### When to Commit

- After completing a logical chunk of work
- Before trying something experimental
- At execution milestones (plan, draft, complete)
- End of work session (save progress)
- Before switching branches

### When to Branch

- Testing strategy variations
- Experimental positioning
- Stakeholder review versions
- Platform-specific extensions
- Anything not yet approved for main

---

## Appendix: Claude Code Git Integration Examples

### Example 1: Ask Claude to Commit

**You:**
```
I've updated the voice strategy with new tone guidelines. Create a commit.
```

**Claude:**
```bash
# I'll stage your voice strategy changes and create a commit.

git status
# (shows modified files)

git add brand/strategy/voice/STRATEGY.md
git commit -m "Add conversational tone guidelines to voice strategy"
git push

# Committed: "Add conversational tone guidelines to voice strategy"
# Changes pushed to remote repository.
```

### Example 2: Ask Claude About Git Status

**You:**
```
What files have I changed today?
```

**Claude:**
```bash
git status

# You've modified:
# - brand/strategy/positioning/STRATEGY.md
# - brand/strategy/voice/twitter/EXTENSION.md
#
# New untracked files:
# - brand/research/competitive-analysis/2025-11-11@14:30/PLAN.md
#
# Would you like me to stage these for a commit?
```

### Example 3: Ask Claude to Create Branch

**You:**
```
Create a branch for testing a bold positioning approach.
```

**Claude:**
```bash
git checkout -b bold-positioning-test

# Created and switched to branch: bold-positioning-test
# You can now experiment freely. Changes won't affect main branch.
# When ready, I can help you merge or discard this branch.
```

### Example 4: Ask Claude for Git Help

**You:**
```
I want to see what my positioning looked like last month.
```

**Claude:**
```bash
# First, let me find commits from last month

git log --oneline --since="1 month ago" -- brand/strategy/positioning/

# Found these commits:
# a3f5b8c Update positioning with enterprise focus (2 weeks ago)
# 7d6e5f4 Refine positioning messaging (3 weeks ago)
# 2b3c4d5 Initial positioning draft (4 weeks ago)

# To view the version from 4 weeks ago:
git checkout 2b3c4d5

# Your files now show the state from last month.
# When you're done looking, return to present with:
# git checkout main
```

---

**End of Class 4**

You now understand Git as a safety net for marketing experimentation. You can create commits, work with branches, and recover from mistakes - all while focusing on strategy, not technical Git complexity.

In Class 5, you'll learn to create reusable prompts as commands, building on this foundation of version-controlled files.
