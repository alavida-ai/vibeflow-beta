# Change Management System - Phase 1 Implementation Plan

## Execution Context

**Date:** 2025-11-01@09:45
**Scope:** Phase 1 - Foundation (CHANGELOG automation)
**Location:** `.claude/skills/change-management/2025-11-01@09:45/`

---

## Objective

Implement the foundation of the Change Management System that automates CHANGELOG maintenance for brand strategy changes. This phase focuses on creating the skill structure, commands, and GitHub Action workflow that detects strategy changes and auto-generates CHANGELOG entries.

---

## Success Criteria

- ✅ Change management skill structure created with workflow definitions
- ✅ `/update-changelog` command functional
- ✅ GitHub Action (`changelog-update.yml`) triggers on PR "ready for review"
- ✅ Bot successfully analyzes diffs and updates CHANGELOG.md
- ✅ Bot commits CHANGELOG to PR branch with proper attribution
- ✅ Error handling posts to Slack error channel
- ✅ System tested end-to-end with sample PR

---

## Implementation Phases

### Phase 1: Skill Structure & Documentation

**Purpose:** Create the change-management skill foundation with workflow definitions

**Deliverables:**
- `01-skill-structure.md` - Complete skill file structure with SKILL.md and workflow documentation

**Tasks:**
1. Create `.claude/skills/change-management/` directory structure
2. Write `SKILL.md` - Main skill definition and overview
3. Create `workflows/update-changelog/` subdirectory
4. Write `workflows/update-changelog/WORKFLOW.md` - Detailed workflow instructions
5. Create `workflows/migrate-changelog/` subdirectory (placeholder for Phase 3)
6. Write `workflows/migrate-changelog/WORKFLOW.md` - Migration workflow instructions

**Context needed:**
- Existing skill patterns (from `.claude/skills/researching/`)
- CHANGELOG format specifications (from CLAUDE.md)
- Marketing Architect audience profile (from PRD)

**Validation:**
- SKILL.md follows existing skill pattern conventions
- Workflow documentation is clear and actionable for Claude
- File structure matches `.claude/skills/` conventions

---

### Phase 2: Command Definitions

**Purpose:** Create slash commands that invoke the change management skill

**Deliverables:**
- `02-commands.md` - Command files for `/update-changelog` and `/migrate-changelog`

**Tasks:**
1. Create `.claude/commands/changelog/` directory
2. Write `update.md` - `/update-changelog` command definition
3. Write `migrate.md` - `/migrate-changelog` command definition (placeholder for Phase 3)
4. Test command invocation locally (if possible)

**Context needed:**
- Existing command patterns (from `.claude/commands/`)
- Skill workflow references
- Command syntax and conventions

**Validation:**
- Commands follow existing naming and structure conventions
- Commands properly reference change-management skill
- Clear instructions for skill execution

---

### Phase 3: GitHub Action Workflow - CHANGELOG Update

**Purpose:** Create the automated workflow that triggers Claude Code to update CHANGELOGs on PR

**Deliverables:**
- `03-github-action-changelog.md` - Complete `changelog-update.yml` workflow file

**Tasks:**
1. Create `.github/workflows/changelog-update.yml`
2. Define trigger: `pull_request` with `ready_for_review` type
3. Add path filter: `brand/strategy/**/STRATEGY.md`
4. Configure checkout with full git history
5. Add detection step: identify changed strategy files
6. Integrate `anthropics/claude-code-action@v1`
7. Configure Claude Code invocation with `/update-changelog`
8. Add commit step: push CHANGELOG updates to PR branch
9. Add PR comment step: notify author of CHANGELOG update
10. Implement error handling with Slack webhook
11. Configure concurrency control to prevent race conditions
12. Set appropriate timeouts and permissions

**Context needed:**
- Example journal workflow (from user's provided example)
- GitHub Actions best practices
- Claude Code action parameters

**Validation:**
- Workflow syntax is valid YAML
- Triggers are correct (ready_for_review only)
- Permissions are minimal but sufficient (contents: write, pull-requests: write)
- Error handling is comprehensive

---

### Phase 4: Testing & Validation Infrastructure

**Purpose:** Create test fixtures and validation scripts to ensure system works end-to-end

**Deliverables:**
- `04-testing-setup.md` - Test plan and validation checklist

**Tasks:**
1. Document test PR creation process
2. Create test STRATEGY.md changes (sample diff)
3. Document expected CHANGELOG output format
4. Create validation checklist for manual testing
5. Document GitHub secrets setup instructions
6. Create troubleshooting guide

**Context needed:**
- CHANGELOG format specifications
- GitHub secrets required
- Error scenarios to test

**Validation:**
- Test plan covers happy path and error scenarios
- Documentation is clear for setup and troubleshooting
- Checklist is comprehensive

---

### Phase 5: Integration & End-to-End Testing

**Purpose:** Deploy to GitHub Actions and validate with real PR

**Deliverables:**
- `05-integration-test.md` - Test results and any adjustments needed

**Tasks:**
1. Set up GitHub secrets (CLAUDE_CODE_OAUTH_TOKEN, SLACK_ERROR_WEBHOOK)
2. Create test branch with STRATEGY.md changes
3. Create PR and mark "ready for review"
4. Verify workflow triggers
5. Monitor Claude Code execution
6. Verify CHANGELOG commit appears in PR
7. Review CHANGELOG entry quality
8. Test error handling (intentional failure)
9. Verify Slack error notification
10. Document any issues or refinements needed

**Context needed:**
- GitHub repository access
- Slack webhook URLs
- Claude Code OAuth token

**Validation:**
- Workflow executes successfully
- CHANGELOG entry is accurate and well-formatted
- Bot commit attribution is correct
- Error notifications work
- No breaking issues discovered

---

## Artifacts Structure

```
.claude/skills/change-management/2025-11-01@09:45/
├── PLAN.md                           # This file
├── TODO.md                           # Progress tracking
└── artifacts/
    ├── 01-skill-structure.md         # Skill files and workflow docs
    ├── 02-commands.md                # Command definitions
    ├── 03-github-action-changelog.md # GitHub Action workflow
    ├── 04-testing-setup.md           # Test plan and validation
    └── 05-integration-test.md        # Test results and findings
```

---

## Dependencies

**External:**
- GitHub repository write access
- Claude Code OAuth token (for GitHub Action)
- Slack webhook URL for error notifications
- `anthropics/claude-code-action@v1` (GitHub Action)

**Internal:**
- Existing `.claude/skills/` pattern understanding
- CHANGELOG format conventions (from CLAUDE.md)
- Brand strategy domains (voice, messaging, positioning, audience, brand-fundamentals)

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Claude Code action fails to execute | Comprehensive error handling with Slack notifications |
| CHANGELOG format inconsistency | Clear format specification in workflow documentation |
| Race conditions on concurrent PRs | Concurrency control in GitHub Action |
| Bot commits break PR review flow | Clear attribution and PR comments to notify authors |
| Workflow doesn't trigger | Explicit path filters and trigger type validation |
| Secrets not configured | Clear setup documentation and validation steps |

---

## Timeline Estimate

- **Phase 1 (Skill Structure):** 1-2 hours
- **Phase 2 (Commands):** 30 minutes
- **Phase 3 (GitHub Action):** 2-3 hours
- **Phase 4 (Testing Setup):** 1 hour
- **Phase 5 (Integration Test):** 1-2 hours

**Total estimated time:** 6-9 hours of focused work

---

## Post-Implementation

**Immediate next steps:**
1. Monitor first few real PRs for CHANGELOG quality
2. Gather feedback from team on CHANGELOG usefulness
3. Refine workflow prompts if AI-generated entries need improvement
4. Document lessons learned for Phase 2 (Comms Agent)

**Blocked until Phase 1 complete:**
- Phase 2: Strategy Communications workflow
- Phase 3: CHANGELOG migration utilities

---

## Notes

- This plan focuses exclusively on Phase 1 (Foundation) as requested
- Phase 2 (Comms Agent) and Phase 3 (Migration) will be separate implementations
- All file paths use relative references from workspace root
- GitHub Action uses official `anthropics/claude-code-action@v1`
- Workflow follows the pattern from the journal analysis example provided

---

## Approval Checklist

Before proceeding with `/implement`:

- [ ] Plan structure makes sense and phases are logical
- [ ] Artifacts are clearly defined with expected outputs
- [ ] Testing approach is comprehensive
- [ ] Timeline is reasonable
- [ ] Dependencies and risks are identified
- [ ] Success criteria are clear and measurable

**Ready to proceed?** If approved, run `/implement` to execute this plan.
