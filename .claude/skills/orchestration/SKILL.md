---
name: orchestration
description: Provides workflow execution orchestration for planning and implementing multi-phase workflows. This skill should be invoked by /plan and /implement commands to manage execution folders, progress tracking, and agent delegation. Use when executing structured workflows with WORKFLOW.md definitions.
---

# Workflow Orchestration

## Purpose

Orchestrate multi-phase workflow executions with standardized folder structures, progress tracking, and agent delegation. This skill manages the complete lifecycle from planning through execution to completion.

## When to Use

Invoke this skill when:
- `/plan` command is executed to create workflow execution plan
- `/implement` command is executed to execute a planned workflow
- Executing any workflow that has a WORKFLOW.md definition
- Managing execution state, artifacts, and progress tracking
- Future: `/resume` command to continue interrupted workflows

**DO NOT** invoke this skill for:
- Simple, single-step tasks
- Workflows without formal WORKFLOW.md definitions
- Ad-hoc research or analysis

## Core Principles

### Progressive Disclosure Architecture
Workflows are composed of layered components:
1. **Domain Command** → Entry point for user (e.g., `/brand-onboarding/competitor-analysis`)
2. **Skill** → Domain-specific knowledge (e.g., `research` skill)
3. **WORKFLOW.md** → Phase definitions and agent instructions
4. **Orchestration Skill** → Execution framework (this skill)

### Execution Flow
```
User runs domain command
    ↓
Domain command invokes skill (e.g., research)
    ↓
Skill loads WORKFLOW.md
    ↓
Skill delegates to /plan (via SlashCommand tool)
    ↓
/plan invokes orchestration skill
    ↓
Orchestration creates execution folder + PLAN.md
    ↓
User reviews and approves plan
    ↓
User runs /implement
    ↓
/implement invokes orchestration skill
    ↓
Orchestration executes workflow phases
```

## Planning Mode (`/plan` command)

When `/plan` is invoked with a workflow name:

### 1. Create Execution Folder

Use the `scripts/create_execution_folder.py` script to create the timestamped execution folder:

```bash
python .claude/skills/orchestration/scripts/create_execution_folder.py <workflow-name>
```

This creates:
```
/research/{workflow-name}/{YYYY-MM-DD_HH:MM}/
├── data/       # For input files (if needed)
└── artifacts/  # Will be populated during implementation
```

**Note:** Only create `data/` subdirectory if the workflow requires external data or context files.

### 2. Load Workflow Definition

Read the WORKFLOW.md file from the skill directory to understand:
- Workflow objectives and approach
- Phase breakdown and sequencing
- Expected outputs and artifacts
- Agent delegation requirements

**Typical path:**
```
.claude/skills/{skill-name}/{workflow-subpath}/WORKFLOW.md
```

**Example:**
```
.claude/skills/research/discover-competitive-analysis/WORKFLOW.md
```

### 3. Create PLAN.md

Use the `assets/PLAN.md.template` as a starting point and populate it with:
- Workflow name and description
- Objectives extracted from WORKFLOW.md
- High-level approach
- Phase breakdown with expected outputs
- Resources needed
- Estimated timeline
- Success criteria

Write PLAN.md to: `{execution-folder}/PLAN.md`

### 4. Iterate Based on User Feedback

After presenting the plan:
1. Ask user if plan looks correct
2. If user provides feedback, update PLAN.md accordingly
3. Repeat until user approves
4. Inform user: "Plan created at `{execution-folder}/PLAN.md`. Review and run `/implement` when ready."

### 5. Handle "yolo" Mode

If the domain command receives "yolo" argument (or similar flag indicating no planning needed):
- Skip PLAN.md creation
- Create execution folder
- Proceed directly to implementation mode

## Implementation Mode (`/implement` command)

When `/implement` is invoked:

### 1. Locate Execution Folder

Find the most recent execution folder for the workflow:
```
/research/{workflow-name}/ → find most recent {YYYY-MM-DD_HH:MM}/ folder
```

### 2. Read PLAN.md (if exists)

Load `{execution-folder}/PLAN.md` to understand:
- Workflow phases
- Expected outputs
- Context and requirements

If in "yolo" mode (no PLAN.md), read WORKFLOW.md directly.

### 3. Create TODO.md

Use `assets/TODO.md.template` to create progress tracking file:
- Initialize with workflow phases from PLAN.md or WORKFLOW.md
- Set status to "In Progress"
- List expected artifacts following naming conventions (see `references/artifact-naming.md`)

Write TODO.md to: `{execution-folder}/TODO.md`

### 4. Execute Workflow Phases

For each phase in WORKFLOW.md:

#### Read Phase Definition
Extract from WORKFLOW.md:
- Phase number and name (e.g., "Phase 2A: Market Research")
- Agent type (e.g., `market-research-analyst` or fallback to `general-purpose`)
- Instructions file path (e.g., `phase-2a-research-analyst.md`)
- Context needed (inputs from previous phases)
- Expected output artifact (conceptual name)

#### Translate to Concrete Execution
See `references/agent-delegation.md` for complete delegation pattern.

**Steps:**
1. **Load instructions** from skill directory:
   ```
   .claude/skills/{skill-name}/{phase-instructions-file}
   ```

2. **Resolve input artifacts** from previous phases:
   ```
   {execution-folder}/artifacts/01-{artifact-name}.md
   ```

3. **Determine output artifact path** using naming conventions:
   ```
   {execution-folder}/artifacts/{phase-number}{suffix}-{artifact-name}.md
   ```
   See `references/artifact-naming.md` for naming rules.

4. **Launch agent** using Task tool:
   ```
   Task(
       subagent_type=<agent-type or "general-purpose">,
       description="Execute Phase {N}: {phase-name}",
       prompt="""
       {instructions-content}

       ## Context Files
       {list-of-input-artifact-paths}

       ## Output
       Write your output to: {output-artifact-path}

       ## Execution Folder
       {execution-folder-path}
       """
   )
   ```

#### Handle Sequential vs Parallel Phases

**Sequential phases:** Execute one at a time, waiting for completion before starting next.

**Parallel phases:** Launch all parallel phases in a **single message** with multiple Task calls.

Example for Phase 2A and 2B (parallel):
```python
# Single message with multiple Task calls
Task(subagent_type="market-research-analyst", ...)  # Phase 2A
Task(subagent_type="content-analyst", ...)          # Phase 2B
```

Wait for ALL parallel phases to complete before proceeding to next sequential phase.

See `references/agent-delegation.md` for detailed patterns.

### 5. Update TODO.md Throughout Execution

After each phase completes:

1. **Mark phase complete:**
   ```markdown
   - [x] Phase 2A: Market research → [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md)
   ```

2. **Mark artifact created:**
   ```markdown
   - [x] [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md) - Market positioning analysis
   ```

3. **Update current phase:**
   ```markdown
   ## Current Phase

   **Phase 3:** Synthesizing findings from research and content analysis...
   ```

### 6. Create Final RESEARCH.md

After all phases complete:
1. Create final consolidated output in `{execution-folder}/RESEARCH.md`
2. Synthesize findings from all phase artifacts
3. Follow format and structure expected by workflow

### 7. Finalize TODO.md

Mark workflow complete:
```markdown
**Status:** ✅ Completed
**Completed:** {timestamp}

## Summary
Key outcome: {brief-description}
Published to: {final-output-path}
```

### 8. Report to User

Provide summary:
- Key findings
- Artifacts created (with links)
- Final output location: `{execution-folder}/RESEARCH.md`

**DO NOT** publish RESEARCH.md to parent folder (no publishing functionality yet).

## Execution Folder Structure Reference

See `references/execution-structure.md` for complete documentation.

**Standard structure:**
```
/research/{workflow-name}/{YYYY-MM-DD_HH:MM}/
├── data/              # Input files (created during /plan if needed)
├── artifacts/         # Phase outputs (created during /implement)
│   ├── 01-*.md
│   ├── 02a-*.md
│   ├── 02b-*.md
│   └── 03-*.md
├── PLAN.md           # Initial plan (created during /plan)
├── TODO.md           # Progress tracking (created during /implement)
└── RESEARCH.md       # Final output (created during /implement)
```

## Artifact Naming Reference

See `references/artifact-naming.md` for complete naming conventions.

**Pattern:** `{phase-number}{suffix}-{descriptive-name}.md`

**Examples:**
- `01-competitors-identified.md` (sequential phase)
- `02a-research-findings.md` (parallel phase A)
- `02b-content-analysis.md` (parallel phase B)
- `03-synthesis.md` (final phase)
- `RESEARCH.md` (final output, no phase prefix)

## Agent Delegation Reference

See `references/agent-delegation.md` for complete delegation procedures.

**Key points:**
- Read WORKFLOW.md phase definitions
- Load phase-specific instruction files from skill directory
- Resolve input artifacts from previous phases
- Translate conceptual artifact names to concrete file paths
- Launch agents with full context and output paths
- Update TODO.md after each phase completes

## Integration with Domain Commands

Domain commands invoke this skill via `/plan` and `/implement` commands using the SlashCommand tool:

**Example domain command:**
```markdown
Use the research skill to execute the competitive analysis workflow at:
`.claude/skills/research/discover-competitive-analysis/WORKFLOW.md`

SlashCommand("/plan discover-competitive-analysis")
```

After user approves plan:
```markdown
SlashCommand("/implement")
```

**"yolo" mode:**
```markdown
If user provided "yolo" argument, skip planning:
SlashCommand("/implement discover-competitive-analysis")
```

## Future: Resume Mode (`/resume` command)

When `/resume` is implemented:

1. Find most recent execution folder
2. Read TODO.md to determine state
3. Identify first incomplete phase (unchecked)
4. Resume execution from that phase
5. Continue through remaining phases
6. Finalize when complete

## Error Handling

### Agent Fails
- Do NOT mark phase as complete in TODO.md
- Add note about failure to TODO.md Notes section
- Report to user with error details

### Missing Input Artifacts
- Verify previous phase completed
- Check file path is correct
- Report missing dependency to user

### Invalid Paths
- Verify execution folder exists
- Create missing subdirectories if needed
- Retry with corrected paths

## Best Practices

1. **Always use standardized naming** following `references/artifact-naming.md`
2. **Update TODO.md immediately** after each phase completes
3. **Launch parallel phases in single message** for efficiency
4. **Verify input artifacts exist** before launching dependent phases
5. **Provide full file paths** to agents (no relative paths)
6. **Use appropriate agent types** when specified in WORKFLOW.md
7. **Maintain execution folder structure** consistently across all workflows

## Tools and Resources

### Scripts
- `scripts/create_execution_folder.py` - Creates timestamped execution folders

### Templates
- `assets/TODO.md.template` - Progress tracking template
- `assets/PLAN.md.template` - Workflow plan template
- `assets/session-metadata.md.template` - Session metadata template (optional)

### References
- `references/execution-structure.md` - Folder structure documentation
- `references/artifact-naming.md` - Naming conventions
- `references/agent-delegation.md` - Agent delegation procedures
