# Workflow Execution & Progress Tracking

## Purpose
This document defines execution conventions for all vibeflow workflows including:
- Execution folder creation and management
- Artifact naming patterns
- TODO.md structure and updates
- Agent delegation procedures
- Publishing workflow

## Progress File Structure: `TODO.md`

### File Template

```markdown
# Workflow Progress

**Session:** {unique-identifier}
**Started:** {timestamp}
**Status:** In Progress / Completed / Paused

## Task Progress

- [ ] Phase 1: First major task
- [ ] Phase 2: Parallel/secondary tasks
- [ ] Phase 3: Analysis/synthesis

## Current Phase

**Phase X:** Brief description of current stage...

## Artifacts Created

- [ ] `01-{artifact-name}.md` - Description of first artifact
- [ ] `02a-{artifact-name}.md` - Description of parallel artifact A
- [ ] `02b-{artifact-name}.md` - Description of parallel artifact B
- [ ] `03-{artifact-name}.md` - Description of synthesis artifact
- [ ] `RESEARCH.md` - Final published output

## Notes

[Important observations, blockers, decisions]
```

---

## Output File Naming Conventions

All workflow artifacts follow a standardized naming pattern to ensure consistency and resumability:

### Pattern: `{phase-number}{suffix}-{descriptive-name}.md`

**Components:**
- `{phase-number}` = Two-digit phase (e.g., `01`, `02`, `03`)
- `{suffix}` = Optional letter for parallel phases (e.g., `a`, `b`, `c`)
- `{descriptive-name}` = Kebab-case description (e.g., `competitor-research`, `positioning-analysis`)

### Examples by Phase

| Phase | Output File | Description |
|-------|-------------|-------------|
| Metadata | `00-session-metadata.md` | Session context and configuration |
| Phase 1 | `01-{task-name}.md` | First phase output |
| Phase 2 (single) | `02-{task-name}.md` | Second phase output (sequential) |
| Phase 2a (parallel) | `02a-{task-name}.md` | Parallel task A output |
| Phase 2b (parallel) | `02b-{task-name}.md` | Parallel task B output |
| Phase 3 | `03-{task-name}.md` | Synthesis/analysis phase |
| Draft | `03-{task-name}-draft.md` | Working draft (optional) |
| Final | `RESEARCH.md` | Published final output |

### Workflow-Specific Examples

**Discover Category Landscape:**
- `00-session-metadata.md`
- `01-competitors-identified.md`
- `02a-research-analyst-findings.md`
- `02b-content-analyst-findings.md`
- `03-synthesis-draft.md`
- `RESEARCH.md`

**Founder Interview:**
- `00-session-metadata.md`
- `01-interview-transcript.md`
- `02-analysis.md`
- `RESEARCH.md`

### Guidelines

1. **Phase numbering matches SKILL.md phases** (Phase 1 = `01-*`, Phase 2 = `02-*`)
2. **Use suffixes for parallel execution** (`02a-*`, `02b-*`, `02c-*`)
3. **Final output is always `RESEARCH.md`** (published to parent `/research/{skill-name}/` folder)
4. **Drafts use `-draft` suffix** (e.g., `03-synthesis-draft.md`)
5. **Session metadata is always `00-session-metadata.md`** (if needed)

## Workflow Progress Tracking Guidelines

### 1. Initialization
- Create `TODO.md` at the start of workflow execution (handled by `/plan` command)
- Use a unique session identifier (timestamp recommended)
- Set initial status to "In Progress"

### 2. Updating Progress

#### Marking Tasks Complete
- Use markdown checkbox syntax: `- [x]`
- Include file references when possible
- Add context about the completed task

**Examples:**
```markdown
- [x] Phase 1: Identify competitors → [competitors.md](01-competitors.md)
- [x] Phase 2: Research analysis → [research-findings.md](02-research.md)
```

#### Artifact Tracking
- Mark artifacts as created when written
- Include clickable file links
- Add brief description

**Examples:**
```markdown
- [x] [01-competitors.md](01-competitors.md) - List of 7 competitors
- [x] [02-research.md](02-research.md) - Market positioning analysis
```

### 3. Final State

When workflow completes:
- Mark all tasks as `[x]`
- Update status to "Completed"
- Add completion timestamp
- Include summary of key findings

**Example:**
```markdown
**Status:** ✅ Completed
**Completed:** {timestamp}

## Summary
Key outcome: [Brief description]
Published to: [Final output file path]
```

### 4. Resumability Considerations

- Each phase should be self-contained
- Completed phases should be clearly marked
- Provide enough context to resume from any point

### 5. Orchestrator Workflow

#### Progress Tracking Overview

**Initialization (`/plan` command):**
1. Creates `TODO.md` file in the execution folder
2. Initializes progress structure based on skill phases
3. Sets up artifact tracking with naming conventions

**Execution (`/implement` command):**
1. Reads `TODO.md` to understand current state
2. Updates TODO.md as phases complete
3. Marks artifacts as they're created
4. Provides resumption points if interrupted

**Key Responsibilities:**
- Initialize the progress file with a unique session identifier
- Mark each phase as it begins and completes
- Update current phase status
- Track artifacts created in each phase (using naming conventions)
- Add contextual notes about workflow progress
- Provide clear resumption points if workflow is interrupted

#### Parallel Phase Handling
- When workflow includes parallel phases:
  - Mark each parallel phase separately
  - Use nested checkboxes for clarity
  - Wait for all parallel tasks to complete before moving to next phase

## Best Practices

- Keep descriptions concise
- Use markdown formatting
- Include links to artifacts
- Track both tasks and created files
- Add contextual notes

## Workflow-Specific Customization

While this template is generic, each workflow can:
- Add specific phase names
- Include workflow-unique tracking details
- Customize the summary section

---

---

## Execution Folder Management

### Creating Execution Folders

**Path pattern:** `/research/{skill-name}/{timestamp}-execution-N/`

**Components:**
- `{skill-name}` = kebab-case skill name from `.claude/skills/`
- `{timestamp}` = YYYYMMDD-HHMMSS format
- `{execution-N}` = Incremented if multiple executions exist

**Example:** `/research/discover-category-landscape/20251020-140000-execution-1/`

### Execution Folder Contents

Standard files created by `/plan`:
- `PLAN.md` - Workflow overview, phases, expected outputs
- `TODO.md` - Progress tracking (initialized from template above)
- `00-session-metadata.md` - Session context (if required by skill)

Artifacts created by `/implement`:
- `01-*.md`, `02a-*.md`, etc. - Phase outputs (following naming conventions)
- `RESEARCH.md` - Final output (published to parent folder)

---

## Agent Delegation Procedures

### Translating SKILL.md to Execution

**From SKILL.md (conceptual):**
```markdown
**Delegation:**
- Agent: market-research-analyst
- Instructions: phase-2a-research-analyst.md
- Context needed: Competitor list from Phase 1

**Artifact produced:** Positioning analysis report
```

**To execution (concrete):**
1. **Determine agent type**: Use `market-research-analyst` (fallback to `general-purpose` if unavailable)
2. **Load instructions**: `.claude/skills/{skill-name}/phase-2a-research-analyst.md`
3. **Provide context**: Path to `01-competitors-identified.md` from execution folder
4. **Translate artifact name**: "Positioning analysis report" → `02a-positioning-analysis.md`
5. **Delegate**: Launch agent with instructions, context, and output path

### Agent Delegation Pattern

For each phase in SKILL.md:

```
1. Read SKILL.md phase definition
   ├── Extract: Agent type
   ├── Extract: Instructions file path
   ├── Extract: Context needed (inputs from previous phases)
   └── Extract: Artifact name (conceptual)

2. Translate to execution
   ├── Agent: Use specified type or default to general-purpose
   ├── Instructions: Load from `.claude/skills/{skill-name}/{phase-file}.md`
   ├── Input artifacts: Find file paths from previous phase outputs
   └── Output artifact: Translate conceptual name to file path using naming pattern

3. Delegate to agent
   ├── Provide: Instructions file content
   ├── Provide: Input artifact paths
   ├── Provide: Output file path (execution folder + artifact name)
   └── Provide: Execution folder path

4. Wait for completion
   └── Update TODO.md when agent reports completion
```

### Parallel Phase Execution

When SKILL.md indicates parallel phases (e.g., Phase 2A and Phase 2B):

1. Launch all parallel agents in a **single message** (multiple Task tool calls)
2. Each agent works independently with isolated context
3. Wait for **all** parallel agents to complete
4. Update TODO.md marking all parallel phases complete
5. Proceed to next sequential phase

---

## Artifact Naming Translation

### Translation Rules

| SKILL.md Conceptual Name | Phase | File Path |
|--------------------------|-------|-----------|
| "Competitor identification report" | Phase 1 | `01-competitors-identified.md` |
| "Positioning analysis report" | Phase 2A | `02a-positioning-analysis.md` |
| "Messaging analysis report" | Phase 2B | `02b-messaging-analysis.md` |
| "Synthesis draft" | Phase 3 | `03-synthesis-draft.md` |
| "Final research report" | Phase 3 | `03-final-report.md` |

**Algorithm:**
1. Extract phase number from SKILL.md (e.g., "Phase 2A" → `02a`)
2. Convert artifact name to kebab-case (e.g., "Positioning analysis report" → `positioning-analysis`)
3. Combine: `{phase-number}{suffix}-{kebab-case-name}.md`

---

## Publishing Workflow

After all phases complete:

1. **Create final RESEARCH.md** in execution folder (if not already created by Phase 3)
2. **Publish** to parent folder: Copy `RESEARCH.md` to `/research/{skill-name}/RESEARCH.md`
3. **Update TODO.md**:
   - Mark all phases complete: `[x]`
   - Set Status: `✅ Completed`
   - Add completion timestamp
   - Add summary with key findings
4. **Report to user** with:
   - Key findings
   - Artifacts created
   - Published output location

---

## Resumability

### Checking Resume State

Read `TODO.md` from execution folder to determine:
- Which phases are complete: `[x]`
- Which phase is current/incomplete: `[ ]`
- What artifacts exist in the folder

### Resuming from Interruption

1. Find first incomplete phase in TODO.md
2. Check if partial artifact exists for that phase
3. Resume execution from that phase
4. Continue through remaining phases
5. Publish when complete

---

## Implementation Notes

### File Location
- Store as `progress-tracking.md` at repository root
- Commands reference this file via `@progress-tracking.md`
- Skills do NOT reference this file (commands handle it)

### Commands Use This Document
- `/plan` - Uses TODO.md template, folder creation, session metadata
- `/implement` - Uses agent delegation, artifact naming, TODO updates, publishing
- `/resume` - Uses resumability procedures

## Example Full Workflow Progress

```markdown
# Workflow Progress

**Session:** discover-category-landscape-20251017-143000
**Started:** 2025-10-17 14:30:00
**Status:** ✅ Completed
**Completed:** 2025-10-17 16:45:00

## Task Progress

- [x] Phase 1: Identify competitors → [01-competitors-identified.md](01-competitors-identified.md)
- [x] Phase 2: Parallel research
  - [x] Market positioning → [02a-research-analyst-findings.md](02a-research-analyst-findings.md)
  - [x] Messaging analysis → [02b-content-analyst-findings.md](02b-content-analyst-findings.md)
- [x] Phase 3: Strategic synthesis → [03-synthesis-draft.md](03-synthesis-draft.md)

## Artifacts Created

- [x] [00-session-metadata.md](00-session-metadata.md) - Session configuration
- [x] [01-competitors-identified.md](01-competitors-identified.md) - 7 competitors identified
- [x] [02a-research-analyst-findings.md](02a-research-analyst-findings.md) - Market positioning analysis
- [x] [02b-content-analyst-findings.md](02b-content-analyst-findings.md) - Messaging theme analysis
- [x] [03-synthesis-draft.md](03-synthesis-draft.md) - Strategic synthesis
- [x] [RESEARCH.md](RESEARCH.md) - Final published output

## Summary

Key outcome: Identified "powerful but approachable" market positioning white space
Published to: [/research/discover-category-landscape/RESEARCH.md](/research/discover-category-landscape/RESEARCH.md)
```

---

## Future Enhancements

- [ ] Add validation for progress file format
- [ ] Create CLI/tool for progress file management
- [ ] Support for nested/complex workflows
- [ ] Integration with version control systems