# Phase 3 Artifact: GitHub Action Workflow - CHANGELOG Update

**Phase:** 3 - GitHub Action Workflow
**Status:** ✅ Complete
**Date:** 2025-11-01

## Deliverables

### 1. GitHub Action Workflow File

**Location:** `.github/workflows/changelog-update.yml`
**Name:** Auto-Update CHANGELOG

**File created:** ✅

## Workflow Specification

### Trigger Configuration

**Event:** `pull_request`
**Types:** `ready_for_review` only
**Path Filter:** `brand/strategy/**/STRATEGY.md`

**Rationale:**
- Triggers when PR marked ready for review (not on every push)
- Only runs when strategy files actually changed
- Prevents spam from draft PRs or non-strategy changes

### Permissions

```yaml
permissions:
  contents: write        # Required to commit CHANGELOG to PR branch
  pull-requests: write   # Required to comment on PR
```

**Security note:** Minimal permissions - only what's needed for the workflow.

### Job Configuration

**Name:** `update-changelog`
**Runner:** `ubuntu-latest`
**Timeout:** 15 minutes
**Concurrency:** Grouped by PR number, cancel in-progress

**Concurrency control prevents:**
- Race conditions from multiple rapid triggers
- Duplicate CHANGELOG commits
- Wasted compute resources

### Workflow Steps

#### Step 1: Checkout PR Branch
```yaml
- uses: actions/checkout@v4
  with:
    ref: ${{ github.event.pull_request.head.ref }}
    fetch-depth: 0
    token: ${{ secrets.GITHUB_TOKEN }}
```

**Purpose:** Check out full PR branch with complete git history for diff analysis.

#### Step 2: Detect Strategy Changes
```yaml
- id: detect
  run: |
    changed=$(git diff --name-only $base_sha $head_sha -- brand/strategy/ | grep 'STRATEGY\.md$' || true)
```

**Purpose:** Verify STRATEGY.md files actually changed (path filter is first check, this is confirmation).

**Output:** `has_changes` (true/false)

#### Step 3: Run Claude Code
```yaml
- uses: anthropics/claude-code-action@v1
  with:
    claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
    prompt: "/update-changelog"
    claude_args: '--output-format stream-json --permission-mode bypassPermissions'
```

**Purpose:** Invoke Claude Code with `/update-changelog` command.

**Key parameters:**
- `prompt`: Executes the update command we created in Phase 2
- `claude_args`: Streams output and bypasses permission prompts for automation
- `claude_code_oauth_token`: Secure authentication

#### Step 4: Check for CHANGELOG Changes
```yaml
- id: check
  run: |
    if git diff --quiet; then
      echo "updated=false"
    else
      echo "updated=true"
    fi
```

**Purpose:** Determine if Claude actually modified any CHANGELOG files.

**Output:** `updated` (true/false)

#### Step 5: Commit CHANGELOG Updates
```yaml
- run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add brand/strategy/**/CHANGELOG.md
    git commit -m "docs: update CHANGELOG for strategy changes..."
    git push origin ${{ github.event.pull_request.head.ref }}
```

**Purpose:** Commit and push CHANGELOG changes back to PR branch.

**Attribution:**
- Author: github-actions[bot]
- Co-Author: Claude (in commit message)
- Clear emoji indicator (🤖) for automation

#### Step 6: Comment on PR
```yaml
- uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.createComment({...})
```

**Purpose:** Notify PR author that CHANGELOG was auto-updated.

**Message:** "✅ CHANGELOG Updated - Please review as part of this PR."

#### Step 7: Handle Errors
```yaml
- if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_ERROR_WEBHOOK }}
```

**Purpose:** Post to Slack error channel if workflow fails.

**Payload includes:**
- PR number and title
- Branch name
- Link to workflow run for debugging

## Validation Results

### YAML Syntax
- [x] Valid YAML syntax
- [x] Proper indentation and structure
- [x] All required fields present

### Trigger Configuration
- [x] Correct event type (`pull_request`)
- [x] Specific trigger type (`ready_for_review`)
- [x] Appropriate path filter (`brand/strategy/**/STRATEGY.md`)
- [x] Safety check for draft PRs

### Permissions
- [x] Minimal necessary permissions
- [x] `contents: write` for commits
- [x] `pull-requests: write` for comments
- [x] No excessive permissions

### Error Handling
- [x] Slack notification on failure
- [x] Detailed error context (PR link, branch, workflow link)
- [x] Non-blocking (errors don't prevent PR progress)

### Concurrency Control
- [x] Grouped by PR number
- [x] Cancel in-progress runs
- [x] Prevents race conditions

### Integration Points
- [x] Uses `anthropics/claude-code-action@v1` (official action)
- [x] References `/update-changelog` command correctly
- [x] Slack webhook integration for errors
- [x] GitHub API for PR comments

## Required GitHub Secrets

The following secrets must be configured in the repository:

### 1. CLAUDE_CODE_OAUTH_TOKEN
**Purpose:** Authenticate Claude Code action
**Setup:** Generated from Claude Code OAuth flow
**Scope:** Execute Claude Code commands in GitHub Actions

### 2. SLACK_ERROR_WEBHOOK
**Purpose:** Post error notifications to Slack
**Setup:** Create incoming webhook in Slack workspace
**Recommended channel:** `#changelog-errors` or `#github-errors`

## Testing Checklist

### Pre-Deployment Validation
- [x] YAML syntax validated
- [x] Workflow follows pattern from journal example
- [x] All GitHub Actions use latest versions
- [x] Secrets documented with setup instructions

### Post-Deployment Testing (Phase 5)
- [ ] Create test PR with STRATEGY.md changes
- [ ] Mark PR as "ready for review"
- [ ] Verify workflow triggers
- [ ] Verify Claude Code executes `/update-changelog`
- [ ] Verify CHANGELOG commit appears in PR
- [ ] Verify PR comment posted
- [ ] Test error handling (intentional failure)
- [ ] Verify Slack error notification

## Design Decisions

### Why "ready_for_review" trigger?
- Prevents noise from work-in-progress commits
- Runs when author signals completion
- Allows manual refinement before automation

### Why bypass permissions?
- Automation context requires non-interactive execution
- Claude Code action runs in headless mode
- Safe because changes are committed to PR branch (reviewed before merge)

### Why comment on PR?
- Notifies author that bot made changes
- Provides transparency in automated process
- Allows author to review/refine CHANGELOG during PR review

### Why Slack for errors (not GitHub issue)?
- Immediate notification for team
- Avoids cluttering issue tracker
- Easier to triage and respond quickly
- Can escalate to issue if needed

## Flow Diagram

```
PR created with STRATEGY.md changes
         ↓
Developer marks PR "ready for review"
         ↓
    [Workflow triggers]
         ↓
Checkout PR branch (full history)
         ↓
Detect: STRATEGY.md actually changed? → No → Exit gracefully
         ↓ Yes
Run Claude Code: /update-changelog
         ↓
Claude analyzes diff, generates CHANGELOG entries
         ↓
Check: CHANGELOG files modified? → No → Exit (already up to date)
         ↓ Yes
Commit CHANGELOG.md to PR branch
         ↓
Push to remote
         ↓
Comment on PR: "✅ CHANGELOG Updated"
         ↓
    [Workflow complete]
         ↓
Developer reviews PR (including auto-generated CHANGELOG)
         ↓
Developer can edit CHANGELOG if needed
         ↓
PR merged to main
```

## Error Scenarios Handled

| Scenario | Handling |
|----------|----------|
| No STRATEGY.md changes | Workflow doesn't trigger (path filter) |
| Draft PR marked ready | Safety check skips execution |
| Claude Code fails | Slack error notification, doesn't block PR |
| CHANGELOG already up to date | Skips commit, exits gracefully |
| Git conflicts | Push fails, Slack notification, requires manual intervention |
| Multiple rapid triggers | Concurrency control cancels earlier runs |
| Timeout (>15 min) | Workflow fails, Slack notification |

## Next Phase

Phase 4: Create testing documentation and validation checklist for end-to-end testing.
