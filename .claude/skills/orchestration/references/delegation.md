# Delegation

Delegation is the strategic handoff of work to specialized agents with focused context, ensuring each agent has only the information it needs to complete its specific task.

## Purpose

Maintain high signal-to-noise ratio by:
- Providing agents with focused context (not everything)
- Loading phase-specific instructions from skill directory
- Supplying only necessary input artifacts
- Specifying exact output paths

## Core Principle

**Manager agent provides file paths** - The orchestrating agent doesn't pass raw content. Instead, it tells subagents:
- Where to read instructions
- Where to find input artifacts
- Where to write output

This enables **progressive disclosure** - agents load context when needed.

## Delegation Pattern

For each phase that needs to be delegated:

### 1. Identify Agent Type

Determine which specialized agent should handle this phase:
- `general-purpose` - Fallback for most tasks
- Other specialized agents as available

### 2. Load Phase Instructions

Read the phase-specific instruction file from skill directory:

```
.claude/skills/{skill-name}/{phase-instructions}.md
```

**Example:**
```
.claude/skills/research/discover-competitive-analysis/phase-2a-research-analyst.md
```

This file contains detailed instructions for what the agent should do in this phase.

### 3. Resolve Input Artifacts

Identify which artifacts from previous phases this phase needs:

```
{execution-folder}/artifacts/01-competitors.md  (from Phase 1)
{execution-folder}/artifacts/02a-positioning.md  (from Phase 2a)
```

**Important:** Provide full absolute paths, not relative paths.

### 4. Determine Output Path

Calculate the output artifact path using naming conventions:

```
{execution-folder}/artifacts/{phase-number}{suffix}-{artifact-name}.md
```

**Examples:**
- Phase 1: `artifacts/01-competitors.md`
- Phase 2a: `artifacts/02a-positioning.md`
- Phase 2b: `artifacts/02b-content.md`
- Phase 3: `artifacts/03-synthesis.md`

See [Artifacts](artifacts.md) for complete naming rules.

### 5. Construct Delegation Prompt

Build the prompt that will be passed to the subagent:

```
{instructions-content}

## Context Files

Read the following files for context:
- {input-artifact-1-path}
- {input-artifact-2-path}

## Output

Write your findings to: {output-artifact-path}

## Execution Folder

Working directory: {execution-folder-path}
```

### 6. Launch Agent

Use the Task tool to delegate:

```
Task(
    subagent_type="specialized-agent",
    description="Execute Phase {N}: {phase-name}",
    prompt="{delegation-prompt}"
)
```

## Delegation Examples

### Example 1: Sequential Phase Delegation

**Scenario:** Phase 2a needs output from Phase 1

```python
# Read instructions
instructions = read_file(
    ".claude/skills/research/discover-competitive-analysis/phase-2a-research-analyst.md"
)

# Resolve inputs
input_file = "/research/discover-category-landscape/2025-10-22_14:30/artifacts/01-competitors.md"

# Determine output
output_file = "/research/discover-category-landscape/2025-10-22_14:30/artifacts/02a-positioning.md"

# Delegate
Task(
    subagent_type="market-research-analyst",
    description="Execute Phase 2a: Market Research Analysis",
    prompt=f"""
{instructions}

## Context Files

Read the competitor list from:
- {input_file}

## Output

Write your positioning analysis to: {output_file}

## Execution Folder

{execution_folder}
"""
)
```

### Example 2: Parallel Phase Delegation

**Scenario:** Phase 2a and 2b both need output from Phase 1, run in parallel

```python
# Phase 1 completes first
# ...

# Load instructions for both phases
instructions_2a = read_file(".claude/skills/research/.../phase-2a-research-analyst.md")
instructions_2b = read_file(".claude/skills/research/.../phase-2b-content-analyst.md")

# Both phases read same input
input_file = f"{execution_folder}/artifacts/01-competitors.md"

# Different outputs
output_2a = f"{execution_folder}/artifacts/02a-positioning.md"
output_2b = f"{execution_folder}/artifacts/02b-content.md"

# Launch BOTH in a single message
Task(
    subagent_type="market-research-analyst",
    description="Execute Phase 2a: Market Research Analysis",
    prompt=f"""
{instructions_2a}

## Context Files
- {input_file}

## Output
{output_2a}

## Execution Folder
{execution_folder}
"""
)

Task(
    subagent_type="general-purpose",
    description="Execute Phase 2b: Content Analysis",
    prompt=f"""
{instructions_2b}

## Context Files
- {input_file}

## Output
{output_2b}

## Execution Folder
{execution_folder}
"""
)
```

### Example 3: Synthesis Phase (Multiple Inputs)

**Scenario:** Phase 3 needs outputs from Phase 2a and 2b

```python
# Read instructions
instructions = read_file(".claude/skills/research/.../phase-3-synthesis.md")

# Resolve multiple inputs
inputs = [
    f"{execution_folder}/artifacts/02a-positioning.md",
    f"{execution_folder}/artifacts/02b-content.md"
]

# Determine output
output = f"{execution_folder}/artifacts/03-synthesis.md"

# Delegate
Task(
    subagent_type="general-purpose",
    description="Execute Phase 3: Strategic Synthesis",
    prompt=f"""
{instructions}

## Context Files

Read and synthesize findings from:
- {inputs[0]}
- {inputs[1]}

## Output

Write your strategic synthesis to: {output}

## Execution Folder

{execution_folder}
"""
)
```

## Delegation Principles

1. **Focused context only** - Provide only what the agent needs, nothing more
2. **File paths, not content** - Tell agents where to read, don't inline content
3. **Absolute paths** - Always use full paths from repository root
4. **Clear instructions** - Phase instruction files should be detailed and specific
5. **Single responsibility** - Each phase has one clear task
6. **Explicit outputs** - Always specify exactly where agent should write
7. **Parallel when possible** - Launch independent phases in single message

## Sequential vs Parallel Delegation

### Sequential Delegation

Execute phases one after another:

```
Phase 1 delegation → wait for completion → Phase 2 delegation → wait for completion
```

Use when:
- Phase N+1 depends on output from Phase N
- Phases must execute in specific order

### Parallel Delegation

Execute multiple phases simultaneously:

```
Phase 1 completes
    ↓
Launch Phase 2a, 2b, 2c in SINGLE message (multiple Task calls)
    ↓
Wait for ALL to complete
    ↓
Continue to Phase 3
```

Use when:
- Multiple phases can run independently
- Phases read same inputs but produce different outputs
- Want to reduce total execution time

**Critical:** All parallel phases must be launched in a single message with multiple Task tool calls.

## Error Handling

### Agent Reports Failure
- Do not proceed to next phase
- Add failure note to TODO.md
- Attempt to diagnose issue
- Retry if appropriate

### Agent Cannot Find Input Files
- Verify previous phase completed
- Check file paths are absolute and correct
- Verify artifacts/ subdirectory exists

### Agent Cannot Write Output
- Verify execution folder exists
- Verify artifacts/ subdirectory exists
- Check file path is valid
- Ensure parent directories exist

## Integration Points

### Inputs for Delegation
- Phase instruction files from skill directory
- Input artifacts from previous phases
- Execution folder path

### Outputs from Delegation
- New artifact in execution folder
- Updated TODO.md marking phase complete