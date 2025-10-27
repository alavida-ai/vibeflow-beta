# Progress Tracking

Progress tracking maintains execution state through standardized folder structures and TODO.md files, enabling resumability and visibility into workflow execution.

## Purpose

Enable:
- **Visibility** into current workflow state
- **Resumability** if execution is interrupted
- **Audit trail** of completed phases
- **Clear handoffs** between phases
- **User transparency** about what's happening

## Standard Execution Folder

All workflow executions follow this structure:

```
/research/{workflow-name}/{YYYY-MM-DD_HH:MM}/
├── data/              # Input files (optional)
├── artifacts/         # Phase outputs
│   ├── 01-*.md
│   ├── 02a-*.md
│   ├── 02b-*.md
│   └── 03-*.md
├── PLAN.md           # Initial plan
├── TODO.md           # Progress tracking
└── RESEARCH.md       # Final output
```

### Folder Components

**Root:** `/research/`
- Base directory for all workflow executions

**Workflow Directory:** `{workflow-name}/`
- Named after the workflow (kebab-case)
- Examples: `discover-category-landscape/`, `founder-interview/`
- Contains all execution runs for this workflow

**Execution Directory:** `{YYYY-MM-DD_HH:MM}/`
- Timestamped folder for each execution
- Format: `YYYY-MM-DD_HH:MM` (e.g., `2025-10-22_14:30`)
- Unique per execution (minute-level granularity)
- Human-readable

**`data/` subdirectory (optional):**
- Input files and external context
- User-provided files
- Scraped/fetched external data
- Only created if workflow needs it

**`artifacts/` subdirectory:**
- Phase outputs following naming conventions
- All intermediate results
- Created during implementation

**`PLAN.md`:**
- Initial workflow plan
- Phase breakdown
- Expected artifacts
- Success criteria
- Created during planning

**`TODO.md`:**
- Progress tracking file
- Updated throughout execution
- Shows current state
- Created during implementation

**`RESEARCH.md`:**
- Final consolidated output
- Synthesizes all phase findings
- Created at end of implementation

## TODO.md Structure

TODO.md is the primary progress tracking mechanism.

### Initial Structure

Created at start of implementation:

```markdown
# [Workflow Name] Progress

**Status:** In Progress
**Started:** 2025-10-22 14:30
**Execution Folder:** /research/discover-category-landscape/2025-10-22_14:30

## Phases

- [ ] Phase 1: Competitor Identification
- [ ] Phase 2a: Market Research Analysis
- [ ] Phase 2b: Content Analysis
- [ ] Phase 3: Strategic Synthesis

## Artifacts

- [ ] [01-competitors.md](artifacts/01-competitors.md) - Competitor list
- [ ] [02a-positioning.md](artifacts/02a-positioning.md) - Positioning analysis
- [ ] [02b-content.md](artifacts/02b-content.md) - Content analysis
- [ ] [03-synthesis.md](artifacts/03-synthesis.md) - Strategic synthesis
- [ ] [RESEARCH.md](RESEARCH.md) - Final output

## Current Phase

**Phase 1:** Identifying 5-7 direct competitors...

## Notes

(Add any important notes during execution)
```

### During Execution

Update after each phase completes:

```markdown
## Phases

- [x] Phase 1: Competitor Identification → [01-competitors.md](artifacts/01-competitors.md)
- [x] Phase 2a: Market Research Analysis → [02a-positioning.md](artifacts/02a-positioning.md)
- [ ] Phase 2b: Content Analysis
- [ ] Phase 3: Strategic Synthesis

## Artifacts

- [x] [01-competitors.md](artifacts/01-competitors.md) - 7 competitors identified
- [x] [02a-positioning.md](artifacts/02a-positioning.md) - Market positioning analysis complete
- [ ] [02b-content.md](artifacts/02b-content.md) - Content analysis
- [ ] [03-synthesis.md](artifacts/03-synthesis.md) - Strategic synthesis
- [ ] [RESEARCH.md](RESEARCH.md) - Final output

## Current Phase

**Phase 2b:** Analyzing website content and brand voice...
```

### At Completion

Final state when all phases complete:

```markdown
**Status:** ✅ Completed
**Started:** 2025-10-22 14:30
**Completed:** 2025-10-22 15:45

## Summary

**Key Outcome:** Identified 7 key competitors and analyzed their market positioning, messaging strategies, and brand voices. Synthesized findings into strategic recommendations for differentiation.

**Final Output:** [RESEARCH.md](RESEARCH.md)

## Phases

- [x] Phase 1: Competitor Identification → [01-competitors.md](artifacts/01-competitors.md)
- [x] Phase 2a: Market Research Analysis → [02a-positioning.md](artifacts/02a-positioning.md)
- [x] Phase 2b: Content Analysis → [02b-content.md](artifacts/02b-content.md)
- [x] Phase 3: Strategic Synthesis → [03-synthesis.md](artifacts/03-synthesis.md)

## Artifacts

- [x] [01-competitors.md](artifacts/01-competitors.md) - 7 competitors identified
- [x] [02a-positioning.md](artifacts/02a-positioning.md) - Market positioning analysis
- [x] [02b-content.md](artifacts/02b-content.md) - Content and voice analysis
- [x] [03-synthesis.md](artifacts/03-synthesis.md) - Strategic synthesis
- [x] [RESEARCH.md](RESEARCH.md) - Final consolidated research report
```

## Update Patterns

### After Phase Completion

1. **Mark phase complete** with checkbox and link:
   ```markdown
   - [x] Phase 2a: Market Research Analysis → [02a-positioning.md](artifacts/02a-positioning.md)
   ```

2. **Mark artifact created** with description:
   ```markdown
   - [x] [02a-positioning.md](artifacts/02a-positioning.md) - Market positioning analysis complete
   ```

3. **Update current phase**:
   ```markdown
   ## Current Phase

   **Phase 2b:** Analyzing website content and brand voice...
   ```

4. **Add notes if needed**:
   ```markdown
   ## Notes

   - Phase 2a identified strong differentiation opportunity in sustainability messaging
   - Consider deeper dive into competitor pricing in follow-up analysis
   ```

### After All Phases Complete

1. **Update status line**:
   ```markdown
   **Status:** ✅ Completed
   **Completed:** [timestamp]
   ```

2. **Add summary section**:
   ```markdown
   ## Summary

   **Key Outcome:** [Brief description of findings]
   **Final Output:** [RESEARCH.md](RESEARCH.md)
   ```

3. **Ensure all checkboxes marked**

## Folder Creation

Use `scripts/create_execution_folder.py`:

```bash
python .claude/skills/orchestration/scripts/create_execution_folder.py <workflow-name>
```

This creates:
```
/research/{workflow-name}/{YYYY-MM-DD_HH:MM}/
├── data/       # If needed
└── artifacts/  # Always created
```

## Resumability (Future)

TODO.md enables workflow resumption:

1. Read TODO.md from most recent execution folder
2. Identify first unchecked phase
3. Resume execution from that phase
4. Continue through remaining phases

## Progress Tracking Principles

1. **Update immediately** - Mark phases complete as soon as they finish
2. **Link to artifacts** - Every checkbox should link to output file
3. **Current phase visible** - Always show what's happening now
4. **Notes for context** - Add important observations during execution
5. **Summary at end** - Provide clear outcome statement

## Integration Points

### Created By
- Planning phase creates execution folder and PLAN.md
- Implementation phase creates TODO.md

### Updated By
- Implementation phase updates TODO.md after each phase
- Marked complete at end of workflow

### Used By
- User to track progress
- Future resume functionality to restart workflows
- Audit trail for workflow execution