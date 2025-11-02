---
name: Migrate CHANGELOG
argument-hint: @brand/strategy/{domain}
---

# Migrate CHANGELOG

Backfill historical CHANGELOG entries from git history for a strategy domain.

## Purpose

Create comprehensive CHANGELOG documentation for strategy domains with incomplete or missing changelog history by analyzing git commit history.

## Variables

DOMAIN_PATH: $1 (the path to the strategy domain to migrate)

## Instructions

Use the `change-management` skill with the `migrate-changelog` workflow to:

1. **Validate domain**
   - Verify domain exists at specified path
   - Confirm `STRATEGY.md` file exists
   - Check that git history is available
   - Validate domain is a recognized strategy domain

2. **Analyze git history**
   - Extract commit history for `STRATEGY.md` in the specified domain
   - Get diffs for each commit to understand what changed
   - Filter out trivial changes (formatting, typos)
   - Group related commits from the same day

3. **Preserve existing CHANGELOG**
   - Read current `CHANGELOG.md` if it exists
   - Parse existing entries to avoid duplicates
   - Plan insertion point for historical entries

4. **Generate historical entries**
   - Create CHANGELOG entries for significant commits
   - Mark clearly as `[Migrated from git history]`
   - Infer changes from commit diffs
   - Include commit SHA for traceability
   - Keep brief (1-2 sentences for "Why it matters")

5. **Update CHANGELOG file**
   - Insert historical entries in chronological order
   - Add separator comment noting migration date
   - Preserve any existing manual entries
   - Create file with proper header if doesn't exist

6. **Validation**
   - Ensure chronological order is correct
   - Verify no duplicate entries
   - Confirm formatting is consistent
   - Check that existing entries are preserved

## Expected Behavior

**Output:**
- Updated `CHANGELOG.md` with comprehensive historical entries
- All entries marked with `[Migrated from git history]`
- Existing manual entries preserved
- Migration date noted in file

**Success message:**
- Summary of entries migrated
- Path to updated CHANGELOG file
- Reminder to review and commit changes

**Error handling:**
- Clear error if domain doesn't exist
- Graceful handling if git history unavailable
- Fallback to minimal CHANGELOG if diffs too large

## Example Output

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

**Why it matters:**
Foundational positioning that defined our market category.

...
```

## Post-Migration

After running this command:

1. **Review output** - Check that entries make sense and add value
2. **Refine if needed** - Edit entries for clarity or accuracy
3. **Commit changes** - Add to git with message: "docs: migrate CHANGELOG from git history for {domain}"
4. **Switch to update workflow** - Future changes use `/update-changelog`