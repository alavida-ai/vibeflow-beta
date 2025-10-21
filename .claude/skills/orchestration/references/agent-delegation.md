# Agent Delegation Procedures

## Overview

This document defines how to translate conceptual workflow phases from WORKFLOW.md files into concrete agent executions with proper context, instructions, and artifact outputs.

## Delegation Pattern

For each phase in a workflow's WORKFLOW.md:

```
1. Read WORKFLOW.md phase definition
   ├── Extract: Agent type
   ├── Extract: Instructions file path
   ├── Extract: Context needed (inputs from previous phases)
   └── Extract: Artifact name (conceptual)

2. Translate to execution
   ├── Agent: Use specified type or default to general-purpose
   ├── Instructions: Load from skill directory
   ├── Input artifacts: Find file paths from previous phase outputs
   └── Output artifact: Translate conceptual name to file path

3. Delegate to agent
   ├── Provide: Instructions file content
   ├── Provide: Input artifact paths
   ├── Provide: Output file path (execution folder + artifact name)
   └── Provide: Execution folder path

4. Wait for completion
   └── Update TODO.md when agent reports completion
```

## WORKFLOW.md Structure

A typical WORKFLOW.md phase definition looks like:

```markdown
### Phase 2A: Research Analysis

**Agent Type:** market-research-analyst
**Instructions:** phase-2a-research-analyst.md
**Context Needed:**
- Competitor list from Phase 1
- Session metadata

**Output:** Research analyst findings report
```

## Translation Example

### From WORKFLOW.md (Conceptual):

```markdown
### Phase 2A: Market Research Analysis

**Agent Type:** market-research-analyst
**Instructions:** phase-2a-research-analyst.md
**Context Needed:**
- Competitor list from Phase 1 (01-competitors-identified.md)
- Session configuration

**Output:** Positioning analysis report
```

### To Agent Execution (Concrete):

```python
# 1. Determine agent type
agent_type = "market-research-analyst"  # or fallback to "general-purpose"

# 2. Load instructions
instructions_path = ".claude/skills/research/discover-competitive-analysis/phase-2a-research-analyst.md"
instructions = read_file(instructions_path)

# 3. Resolve input artifacts
input_artifacts = [
    "/research/discover-category-landscape/2025-10-21_14:30/artifacts/01-competitors-identified.md",
    "/research/discover-category-landscape/2025-10-21_14:30/00-session-metadata.md"
]

# 4. Determine output artifact path
output_artifact = "/research/discover-category-landscape/2025-10-21_14:30/artifacts/02a-positioning-analysis.md"

# 5. Launch agent
Task(
    subagent_type=agent_type,
    description="Execute Phase 2A: Market Research Analysis",
    prompt=f"""
{instructions}

## Context Files
{format_input_artifacts(input_artifacts)}

## Output
Write your findings to: {output_artifact}

## Execution Folder
{execution_folder_path}
"""
)
```

## Sequential Phase Execution

For sequential phases, execute one after another:

```
Phase 1 (01-*)
    ↓ completes
Phase 2 (02-*)  ← reads 01-* as input
    ↓ completes
Phase 3 (03-*)  ← reads 02-* as input
    ↓ completes
Done
```

**Implementation:**
1. Launch Phase 1 agent
2. Wait for completion
3. Update TODO.md
4. Launch Phase 2 agent (with Phase 1 output as input)
5. Wait for completion
6. Update TODO.md
7. Continue...

## Parallel Phase Execution

For parallel phases, launch all agents in a **single message**:

```
Phase 1 (01-*)
    ↓ completes
┌───────────────────┐
│ Phase 2A (02a-*)  │  ← all read 01-* as input
│ Phase 2B (02b-*)  │  ← launched in parallel
│ Phase 2C (02c-*)  │  ← single message, multiple Task calls
└───────────────────┘
    ↓ all complete
Phase 3 (03-*)  ← reads 02a-*, 02b-*, 02c-* as inputs
```

**Implementation:**
```python
# Launch all parallel phases in ONE message
Task(subagent_type="market-research-analyst", ...)  # Phase 2A
Task(subagent_type="content-analyst", ...)          # Phase 2B
Task(subagent_type="pricing-analyst", ...)          # Phase 2C

# Wait for ALL to complete before proceeding
# Then update TODO.md
# Then launch Phase 3
```

## Agent Context Provisioning

### Instruction Files
Load the phase-specific instruction file from the skill directory:

```
.claude/skills/{skill-name}/{phase-instructions}.md
```

**Example:**
```
.claude/skills/research/discover-competitive-analysis/phase-2a-research-analyst.md
```

### Input Artifacts
Provide paths to artifacts from previous phases:

```markdown
## Input Artifacts

Read the following files for context:
- [Competitor List](artifacts/01-competitors-identified.md)
- [Session Metadata](00-session-metadata.md)
```

### Output Artifact Path
Specify exact path where agent should write output:

```markdown
## Output

Write your analysis to:
`/research/discover-category-landscape/2025-10-21_14:30/artifacts/02a-positioning-analysis.md`
```

### Execution Folder
Provide execution folder path for relative references:

```markdown
## Execution Folder

Working directory: `/research/discover-category-landscape/2025-10-21_14:30/`
```

## Agent Type Resolution

### Specified Agent Type
If WORKFLOW.md specifies an agent type, use it:

```markdown
**Agent Type:** market-research-analyst
```

→ Use `subagent_type="market-research-analyst"`

### Fallback Agent Type
If no agent type specified, or if specified type is unavailable, use:

```
subagent_type="general-purpose"
```

### Available Agent Types
Common agent types in vibeflow:
- `general-purpose` - Default agent for most tasks
- `market-research-analyst` - Market research and analysis
- `Explore` - Codebase exploration and search

## TODO.md Updates

After each phase completes, update TODO.md:

### Mark Phase Complete
```markdown
- [x] Phase 2A: Market research → [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md)
```

### Mark Artifact Created
```markdown
- [x] [02a-positioning-analysis.md](artifacts/02a-positioning-analysis.md) - Market positioning analysis
```

### Update Current Phase
```markdown
## Current Phase

**Phase 3:** Synthesizing findings from research and content analysis...
```

## Error Handling

### Agent Fails
If an agent reports failure or error:
1. Do NOT mark phase as complete in TODO.md
2. Add note to TODO.md about the failure
3. Attempt to diagnose and retry if possible
4. Report to user if unable to resolve

### Missing Input Artifacts
If an expected input artifact doesn't exist:
1. Check if previous phase actually completed
2. Verify file path is correct
3. Report missing dependency to user

### Invalid Output Path
If output path cannot be written:
1. Verify execution folder exists
2. Verify `artifacts/` subdirectory exists
3. Create directories if needed
4. Retry agent with corrected path

## Example: Complete Phase Delegation

### WORKFLOW.md Phase Definition
```markdown
### Phase 2A: Market Research Analysis

**Agent Type:** market-research-analyst
**Instructions:** phase-2a-research-analyst.md
**Context Needed:**
- Competitor list from Phase 1

**Output:** Positioning analysis report
```

### Agent Delegation Code
```python
# Read instructions
instructions = read_file(
    ".claude/skills/research/discover-competitive-analysis/phase-2a-research-analyst.md"
)

# Resolve inputs
input_file = f"{execution_folder}/artifacts/01-competitors-identified.md"

# Determine output
output_file = f"{execution_folder}/artifacts/02a-positioning-analysis.md"

# Launch agent
Task(
    subagent_type="market-research-analyst",
    description="Execute Phase 2A: Market Research Analysis",
    prompt=f"""
{instructions}

## Context Files
Read the competitor list from: {input_file}

## Output
Write your positioning analysis to: {output_file}

## Execution Folder
{execution_folder}
"""
)

# After completion, update TODO.md
update_todo(
    phase="Phase 2A",
    status="completed",
    artifact_path="artifacts/02a-positioning-analysis.md",
    description="Market positioning analysis"
)
```

## Best Practices

1. **Always provide full file paths** to agents (no relative paths)
2. **Launch parallel phases in a single message** for efficiency
3. **Wait for phase completion** before marking complete in TODO.md
4. **Verify input artifacts exist** before launching dependent phases
5. **Use consistent naming** following artifact naming conventions
6. **Update TODO.md immediately** after each phase completes
7. **Provide clear instructions** including context, inputs, and outputs
8. **Use appropriate agent types** when available, fallback to general-purpose
