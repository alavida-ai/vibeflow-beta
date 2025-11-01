---
name: Update CHANGELOG
---

# Update CHANGELOG

Analyze strategy changes in the current context and update CHANGELOG entries as needed.

## Purpose

Automatically generate or update CHANGELOG entries for strategy document changes by analyzing git diffs and applying the change-management skill.

## Instructions

Use the `change-management` skill with the `update-changelog` workflow to:

1. **Detect changed domains**
   - Scan for modified `STRATEGY.md` files in `/brand/strategy/` directories
   - Identify which domains have changes (voice, messaging, positioning, audience, brand-fundamentals)

2. **Analyze each changed domain**
   - Read current `STRATEGY.md` for context
   - Read existing `CHANGELOG.md` (if present)
   - Analyze git diff to understand what changed
   - Determine if CHANGELOG update is needed

3. **Generate or update CHANGELOG entries**
   - Follow the CHANGELOG format specification from the change-management skill
   - Write for Marketing Architect audience (clear, direct, impact-focused)
   - Include "Changes" bullets, "Why it matters" explanation, and optional research references
   - Use one consolidated entry per PR

4. **Update CHANGELOG files**
   - Insert new entries at the top (after header/separator)
   - Create CHANGELOG.md if it doesn't exist for a domain
   - Preserve all existing entries

5. **Stage changes**
   - Ensure modified CHANGELOG files are ready for commit
   - Do not commit directly (GitHub Action or user will handle commit)

## Expected Behavior

**Output:**
- Updated `CHANGELOG.md` files for each changed strategy domain
- Clear console output indicating which domains were updated
- Validation that entries follow proper format

**If no changes needed:**
- Report that CHANGELOG is already up to date
- No file modifications

**Error handling:**
- If unable to generate proper entry, create fallback entry noting manual review needed
- Log clear error messages but don't block the process
- Allow human review and refinement