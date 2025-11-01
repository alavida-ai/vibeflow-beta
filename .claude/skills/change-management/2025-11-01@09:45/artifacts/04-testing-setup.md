# Phase 4 Artifact: Testing & Validation Infrastructure

**Phase:** 4 - Testing & Validation
**Status:** ✅ Complete
**Date:** 2025-11-01

## Purpose

Provide comprehensive testing documentation, validation checklists, and troubleshooting guides to ensure the Change Management System works end-to-end.

## GitHub Secrets Setup

Before testing can begin, configure the required secrets in GitHub repository settings.

### Required Secrets

#### 1. CLAUDE_CODE_OAUTH_TOKEN

**Purpose:** Authenticate Claude Code action for automated CHANGELOG updates

**Setup Steps:**
1. Go to Claude Code OAuth settings: https://claude.ai/oauth
2. Create new OAuth application or use existing
3. Copy OAuth token
4. In GitHub repository:
   - Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `CLAUDE_CODE_OAUTH_TOKEN`
   - Value: [paste token]

**Validation:** Token should allow Claude Code to execute commands in GitHub Actions context

#### 2. SLACK_ERROR_WEBHOOK

**Purpose:** Post error notifications when CHANGELOG update fails

**Setup Steps:**
1. In Slack workspace, create channel: `#changelog-errors`
2. Go to: https://api.slack.com/messaging/webhooks
3. Create new Incoming Webhook for `#changelog-errors` channel
4. Copy webhook URL (starts with `https://hooks.slack.com/services/...`)
5. In GitHub repository:
   - Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `SLACK_ERROR_WEBHOOK`
   - Value: [paste webhook URL]

**Validation:** Post test message to webhook to verify it works

**Test command:**
```bash
curl -X POST [WEBHOOK_URL] -H 'Content-Type: application/json' -d '{"text":"Test from setup"}'
```

## Test Scenarios

### Scenario 1: Happy Path - Single Domain Change

**Objective:** Verify CHANGELOG update works for a single strategy domain change.

**Setup:**
1. Create new branch: `test/changelog-voice-update`
2. Modify `/brand/strategy/voice/STRATEGY.md`:
   ```markdown
   # Add new section
   ## Test Guidelines
   - This is a test change for CHANGELOG automation
   - Will be used to validate the system works end-to-end
   ```
3. Commit changes: `git commit -m "test: add voice guidelines"`
4. Push branch: `git push origin test/changelog-voice-update`
5. Create PR
6. Mark PR as "ready for review"

**Expected Behavior:**
- [ ] Workflow triggers (check Actions tab)
- [ ] Claude Code executes `/update-changelog`
- [ ] New commit appears in PR: "docs: update CHANGELOG for strategy changes"
- [ ] `brand/strategy/voice/CHANGELOG.md` updated with new entry
- [ ] CHANGELOG entry includes:
  - [ ] Today's date
  - [ ] Type (likely "Updated")
  - [ ] Changes bullets describing the test addition
  - [ ] "Why it matters" explanation
- [ ] Bot comments on PR: "✅ CHANGELOG Updated"
- [ ] No errors in workflow logs

**Sample Expected CHANGELOG Entry:**
```markdown
## [2025-11-01] - Test guidelines addition

**Type:** Updated

**Changes:**
- Added test guidelines section to voice strategy
- Included validation points for CHANGELOG automation

**Why it matters:**
Establishes testing protocols for the change management system, ensuring quality and reliability of automated CHANGELOG updates.
```

**Validation:**
- Review CHANGELOG entry quality
- Confirm formatting matches specification
- Verify tone is appropriate for Marketing Architect audience
- Check that git attribution shows github-actions[bot] and Claude co-author

---

### Scenario 2: Multiple Domain Changes

**Objective:** Verify CHANGELOG updates for multiple strategy domains in single PR.

**Setup:**
1. Create new branch: `test/changelog-multi-domain`
2. Modify `/brand/strategy/voice/STRATEGY.md`
3. Modify `/brand/strategy/messaging/STRATEGY.md`
4. Commit and push
5. Create PR and mark ready for review

**Expected Behavior:**
- [ ] Workflow triggers
- [ ] Both `voice/CHANGELOG.md` and `messaging/CHANGELOG.md` updated
- [ ] Single commit contains both CHANGELOG updates
- [ ] Both entries have same date
- [ ] Bot comment mentions both domains

**Validation:**
- Verify both CHANGELOGs updated in single commit
- Confirm entries are independent and accurate
- Check that changes are domain-specific

---

### Scenario 3: CHANGELOG Already Up to Date

**Objective:** Verify system skips update when CHANGELOG already reflects changes.

**Setup:**
1. Create branch: `test/changelog-already-updated`
2. Modify `/brand/strategy/positioning/STRATEGY.md`
3. Manually update `/brand/strategy/positioning/CHANGELOG.md` with entry for these changes
4. Commit both files
5. Create PR and mark ready for review

**Expected Behavior:**
- [ ] Workflow triggers
- [ ] Claude analyzes changes
- [ ] Detects CHANGELOG already reflects changes
- [ ] Skips update (no new commit)
- [ ] Workflow completes successfully
- [ ] No bot comment (nothing changed)

**Validation:**
- Confirm no duplicate CHANGELOG commits
- Verify workflow logs show "already up to date" message
- Check that manual entry is preserved exactly as written

---

### Scenario 4: New Domain (No CHANGELOG Exists)

**Objective:** Verify system creates CHANGELOG.md when it doesn't exist.

**Setup:**
1. Create test domain: `/brand/strategy/test-domain/` (temporarily)
2. Add `STRATEGY.md` file
3. Create branch and PR
4. Mark ready for review

**Expected Behavior:**
- [ ] Workflow triggers
- [ ] Creates new `CHANGELOG.md` with proper header
- [ ] Adds first entry for domain creation
- [ ] Entry type is "Created"
- [ ] File structure matches other domains

**Sample Expected Output:**
```markdown
# Test-domain - Changelog

All notable changes to the test-domain strategy will be documented in this file.

## Format

Each entry should include:
- **Date:** When the change was made
- **Type:** Created | Updated | Refined
- **Changes:** What changed
- **Why it matters:** Impact on strategy/content
- **Research trigger:** Which research prompted this (if applicable)

---

## [2025-11-01] - Initial test domain strategy

**Type:** Created

**Changes:**
- Created test domain for CHANGELOG automation validation

**Why it matters:**
Establishes testing infrastructure for change management system.
```

**Cleanup:** Delete test domain after validation

---

### Scenario 5: Error Handling - Claude Code Fails

**Objective:** Verify error handling and Slack notifications work.

**Setup:**
1. Temporarily revoke or corrupt `CLAUDE_CODE_OAUTH_TOKEN`
2. Create PR with STRATEGY.md changes
3. Mark ready for review

**Expected Behavior:**
- [ ] Workflow triggers
- [ ] Claude Code step fails
- [ ] Workflow continues to error handler
- [ ] Slack message posted to `#changelog-errors`
- [ ] Slack message includes:
  - [ ] PR link
  - [ ] Branch name
  - [ ] Link to workflow run
  - [ ] Clear error indication
- [ ] PR is not blocked (can still be merged manually)

**Validation:**
- Check Slack for error notification
- Verify error message is actionable
- Confirm links in Slack message work
- Restore token after test

---

### Scenario 6: Trivial Changes (Formatting Only)

**Objective:** Verify system handles trivial changes appropriately.

**Setup:**
1. Create branch: `test/trivial-formatting`
2. Make whitespace-only or typo fix in `/brand/strategy/audience/STRATEGY.md`
3. Create PR and mark ready for review

**Expected Behavior:**
- [ ] Workflow triggers
- [ ] Claude analyzes changes
- [ ] Determines changes are trivial
- [ ] Either:
  - Skips CHANGELOG update entirely, OR
  - Creates minimal entry noting minor refinement
- [ ] Workflow completes successfully

**Validation:**
- Review Claude's decision making
- If CHANGELOG updated, verify entry is appropriately minimal
- Confirm no bloated or unnecessary documentation

---

## Expected CHANGELOG Output Format

All generated CHANGELOG entries must match this specification:

```markdown
## [YYYY-MM-DD] - Brief descriptive title

**Type:** Created | Updated | Refined
**PR:** #{number}

**Changes:**
- Specific change 1 (what was added/modified/removed)
- Specific change 2
- Specific change 3

**Why it matters:**
1-2 sentences explaining impact on content creation, positioning, or messaging.

**Research trigger:** (optional)
[Description](/path/to/RESEARCH.md)
```

### Validation Checklist for CHANGELOG Entries

For each generated entry, verify:

- [ ] **Date** - Format is `YYYY-MM-DD`, matches commit date
- [ ] **Title** - Concise (5-10 words), descriptive, not generic
- [ ] **Type** - Appropriate (Created/Updated/Refined)
- [ ] **PR Number** - Correct GitHub PR number
- [ ] **Changes Bullets** - Specific, actionable, 3-5 bullets
- [ ] **Why It Matters** - Explains practical impact, 1-2 sentences
- [ ] **Research Reference** - If included, uses correct relative path
- [ ] **Tone** - Professional, direct, non-patronizing
- [ ] **Formatting** - Consistent markdown, proper spacing
- [ ] **Grammar** - No typos or grammatical errors

---

## Troubleshooting Guide

### Issue: Workflow doesn't trigger

**Symptoms:** PR marked ready for review, but no workflow run appears in Actions tab

**Possible Causes:**
1. PR doesn't modify `brand/strategy/**/STRATEGY.md` files
2. PR is still in draft mode
3. Path filter not matching file changes

**Resolution:**
- Check "Files changed" tab - does it include `STRATEGY.md`?
- Verify PR is not marked as draft
- Check workflow file path filter configuration
- Look for workflow run (even if failed) in Actions tab

---

### Issue: Claude Code step fails

**Symptoms:** Workflow runs but fails at "Run Claude Code" step

**Possible Causes:**
1. `CLAUDE_CODE_OAUTH_TOKEN` not configured or invalid
2. Claude Code service unavailable
3. Command `/update-changelog` not found or malformed

**Resolution:**
- Verify secret is configured: Settings → Secrets → CLAUDE_CODE_OAUTH_TOKEN
- Check secret value is valid (regenerate if needed)
- Review workflow logs for specific error message
- Test `/update-changelog` command manually in Claude Code locally
- Check Claude Code action version is latest

---

### Issue: CHANGELOG not updated (no commit)

**Symptoms:** Workflow succeeds but no CHANGELOG commit appears

**Possible Causes:**
1. CHANGELOG already up to date (intended behavior)
2. Claude determined changes were trivial
3. Git diff failed to detect changes

**Resolution:**
- Check workflow logs for "No CHANGELOG updates needed" message
- Review existing CHANGELOG - does it already cover these changes?
- If changes are substantial, manually run `/update-changelog` and compare
- Verify git diff is working correctly (check detection step logs)

---

### Issue: Slack error notification not received

**Symptoms:** Workflow fails but no Slack message

**Possible Causes:**
1. `SLACK_ERROR_WEBHOOK` not configured
2. Webhook URL invalid or expired
3. Slack channel deleted or webhook removed

**Resolution:**
- Verify secret is configured: Settings → Secrets → SLACK_ERROR_WEBHOOK
- Test webhook manually with curl command (see setup section)
- Regenerate webhook if invalid
- Ensure `#changelog-errors` channel exists

---

### Issue: Git push fails (commit created but not pushed)

**Symptoms:** CHANGELOG commit appears in workflow logs but not in PR

**Possible Causes:**
1. Permissions issue (write access to branch)
2. Branch protection rules blocking push
3. Git conflicts with recent changes

**Resolution:**
- Verify workflow has `contents: write` permission
- Check branch protection settings
- Review git push step logs for specific error
- May require manual merge if conflicts exist

---

### Issue: CHANGELOG entry quality is poor

**Symptoms:** Entry is generated but is generic, inaccurate, or unhelpful

**Possible Causes:**
1. Commit diff too large or complex
2. Changes lack context
3. Workflow prompt needs refinement

**Resolution:**
- Human review and edit during PR review (intended workflow)
- Provide better commit messages or PR descriptions
- Consider manually updating CHANGELOG for this PR
- Document feedback for future workflow improvements

---

## Manual Testing Commands

For local testing before deploying to GitHub Actions:

### Test update-changelog command locally

```bash
# Make changes to a STRATEGY.md file
# Then run in Claude Code:
/update-changelog

# Review generated CHANGELOG.md
# Commit if satisfactory
```

### Test migrate-changelog command locally

```bash
# In Claude Code:
/migrate-changelog @brand/strategy/positioning

# Review generated historical entries
# Edit if needed, then commit
```

### Validate CHANGELOG format

```bash
# Check markdown formatting
markdownlint brand/strategy/**/CHANGELOG.md

# Or manually review for consistency
```

---

## Success Metrics

Track these metrics after deployment to measure system effectiveness:

### Reliability Metrics
- **Workflow success rate:** % of PRs where CHANGELOG auto-updates succeed
- **Target:** >95%

### Quality Metrics
- **Entry accuracy:** % of CHANGELOG entries requiring human editing
- **Target:** <20% need significant edits

### Time Savings
- **Time per PR:** Compare manual vs automated CHANGELOG maintenance
- **Target:** Save 5-10 minutes per strategy PR

### Stakeholder Value
- **CHANGELOG usefulness:** Team feedback on utility of CHANGELOG
- **Target:** Positive feedback from Marketing Architect users

---

## Next Phase

Phase 5: Execute integration testing using these test scenarios and document results.
