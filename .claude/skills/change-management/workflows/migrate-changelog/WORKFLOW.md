# Migrate CHANGELOG Workflow

Backfill historical CHANGELOG entries from git history for strategy domains with incomplete or missing changelog documentation.

## Objective

Create comprehensive CHANGELOG entries for historical strategy changes by analyzing git commit history, enabling complete audit trails for domains that were previously undocumented.

## Context

This workflow is used as a one-time operation for domains where:
- CHANGELOG.md is missing entirely
- CHANGELOG has minimal entries (e.g., only 1-2 lines)
- Historical changes aren't documented despite significant git history

## Inputs

- **Domain path** - Specific strategy domain to migrate (e.g., `/brand/strategy/positioning`)
- **Git history** - Complete commit history for `STRATEGY.md` in that domain
- **Existing CHANGELOG** - Current changelog content (if any) to preserve
- **Cutoff date** - Optional date to limit how far back to analyze

## Process

### Step 1: Validate Domain

Verify the domain exists and has git history:

**Checks:**
- Domain directory exists at `/brand/strategy/{domain}/`
- `STRATEGY.md` file exists in domain
- Git history contains commits for `STRATEGY.md`
- Domain is a recognized strategy domain

**Error handling:**
If validation fails, provide clear error message and exit gracefully.

### Step 2: Analyze Git History

Extract commit history for the domain's `STRATEGY.md` file:

**Method:**
```bash
git log --follow --pretty=format:"%H|%ai|%s" -- brand/strategy/{domain}/STRATEGY.md
```

**For each commit:**
- Get commit SHA, date, and message
- Extract diff: `git show {SHA} -- brand/strategy/{domain}/STRATEGY.md`
- Categorize by significance (major changes, minor refinements, trivial)

**Filtering:**
- Skip purely formatting changes (whitespace, line breaks)
- Skip trivial typo fixes
- Combine related commits from same day into single entry
- Focus on commits that changed strategy substance

### Step 3: Preserve Existing CHANGELOG

If `CHANGELOG.md` already exists:

1. **Read existing content**
2. **Parse existing entries** - Note dates and changes already documented
3. **Identify gaps** - Find commits not yet documented
4. **Plan insertion** - Determine where historical entries should go

**Strategy:**
- Keep all existing entries intact
- Insert historical entries in chronological order
- Mark migrated entries clearly: `[Migrated from git history]`

### Step 4: Generate Historical Entries

For each significant commit (or group of related commits):

#### Entry Generation

**Title:**
- Infer from commit message and diff content
- Make descriptive even if commit message was vague
- Example: If commit says "update positioning," title might be "Positioning refinement for technical audience"

**Type:**
- `Created` - First commit creating the strategy file
- `Updated` - Major changes or additions
- `Refined` - Minor improvements or clarifications

**Changes:**
- Analyze diff to extract specific changes
- 2-4 bullets per entry (less detail than current changes)
- Focus on what changed, not necessarily why (historical context may be unclear)

**Why It Matters:**
- Infer impact based on the nature of changes
- Keep brief for historical entries (1 sentence)
- Acknowledge uncertainty if commit context is unclear
- Example: "Likely refined positioning based on early market feedback (inferred from commit date)"

**Research Trigger:**
- Only include if clearly referenced in commit message or nearby commits
- Mark as "(inferred)" if uncertain
- Often omit for historical migrations due to lack of context

#### Special Formatting for Migrated Entries

Mark migrated entries to distinguish from current documentation:

```markdown
## [YYYY-MM-DD] - Title [Migrated from git history]

**Type:** Updated
**Commit:** {short-SHA}

**Changes:**
- Change 1 (inferred from commit diff)
- Change 2

**Why it matters:**
Brief impact statement (may be inferred from context)
```

### Step 5: Update CHANGELOG File

Insert migrated entries into CHANGELOG:

#### If CHANGELOG exists:
- Read current content
- Insert historical entries in chronological order (oldest first)
- Place before existing manually-created entries
- Add separator comment: `<!-- Historical entries migrated {date} -->`

#### If CHANGELOG doesn't exist:
- Create new file with standard header
- Add all migrated entries in chronological order
- Include note at top: "Historical entries migrated from git history on {date}"

#### Formatting Example:

```markdown
# Positioning - Changelog

Historical entries for this domain were migrated from git history on 2025-11-01.

---

<!-- Historical entries migrated 2025-11-01 -->

## [2024-10-16] - Initial positioning strategy [Migrated from git history]

**Type:** Created
**Commit:** abc123f

**Changes:**
- Defined "Marketing Architecture" category positioning
- Established target audience as marketing strategists
- Differentiated from automation/convenience competitors

**Why it matters:**
Foundational positioning that defined our market category and strategic direction.

## [2024-10-25] - Positioning refinement based on competitive analysis [Migrated from git history]

**Type:** Updated
**Commit:** def456a

**Changes:**
- Narrowed focus to 5-10% ambitious minority
- Emphasized ownership over SaaS convenience

**Why it matters:**
Sharpened target market definition to enable more focused messaging.

---

<!-- Current changelog entries below -->

## [2025-11-01] - Competitive differentiation emphasis

**Type:** Refined
**PR:** #42

...
```

### Step 6: Validation

Review migrated content:

- [ ] All significant commits represented
- [ ] Chronological order is correct
- [ ] Existing entries preserved intact
- [ ] Migrated entries clearly marked
- [ ] No duplicate entries
- [ ] Formatting is consistent
- [ ] File is readable and well-organized

## Output

Updated `CHANGELOG.md` with comprehensive historical entries, clearly marked as migrated from git history.

## Error Handling

**If git history is unavailable:**
- Create minimal CHANGELOG with note: "Git history not available for migration"
- Provide empty template for manual population

**If diffs are too large to analyze:**
- Create high-level entry summarizing the period
- Note specific commits for manual review if needed

**If commit messages are uninformative:**
- Analyze diffs directly to infer changes
- Use generic titles: "Strategy updates"
- Acknowledge inference in "Why it matters" section

## Notes

- This is a **one-time operation** per domain
- Prioritize completeness over perfect accuracy for historical entries
- Human review after migration ensures quality
- Future changes will use the update-changelog workflow
- Migration provides baseline; ongoing process maintains it

## Post-Migration

After migrating a domain's CHANGELOG:

1. **Review output** - Ensure entries make sense and are useful
2. **Commit with attribution** - Mark as "Migrated CHANGELOG from git history"
3. **Document in domain** - Note that CHANGELOG is now actively maintained
4. **Monitor going forward** - Use update-changelog workflow for future changes
