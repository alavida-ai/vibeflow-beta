# Planning

Planning is the process of creating a structured execution plan that breaks down a workflow into discrete phases with clear inputs, outputs, and delegation boundaries.

## Purpose

Transform a task description or workflow definition into:
- A phase breakdown with clear execution order
- Identification of parallel vs sequential tasks
- Artifact definitions for each phase
- Progressive disclosure of context requirements

## Core Concepts

### 1. Task Decomposition

Break down the workflow into discrete phases that:
- Can be executed by specialized agents with focused context
- Have clear inputs and outputs
- Can be tracked and resumed independently
- Maintain high signal-to-noise ratio

**Example:**
```
Task: "Discover competitive landscape for eco-friendly skincare"
    ↓ Decompose into:
Phase 1: Identify 5-7 direct competitors
Phase 2a: Analyze market positioning and messaging
Phase 2b: Analyze website content and brand voice
Phase 3: Synthesize findings into strategic recommendations
```

### 2. Parallelization Analysis

Identify tasks that can run concurrently:
- Tasks with no dependencies between them
- Tasks that read the same inputs but produce different outputs
- Tasks that can run simultaneously to reduce total execution time

**Representation in PLAN.md:**
```markdown
## Step by Step Tasks

### 1. Competitor Identification
Identify 5-7 direct competitors in the category.

### 2a. Market Research Analysis
Analyze market positioning, messaging, and differentiation.

### 2b. Content Analysis
Analyze website structure, tone, and brand voice.

### 3. Strategic Synthesis
Synthesize findings into actionable recommendations.
```

**Key:** Parallel tasks use the same number with letter suffixes (2a, 2b, 2c).

### 3. Artifact Definition

Define outputs for each phase:
- **Conceptual names** in PLAN.md (e.g., "Positioning Analysis Report")
- **Purpose** - what the artifact contains
- **Consumers** - which subsequent phases use it

The concrete file paths are determined during implementation using naming conventions (see [Artifacts](artifacts.md)).

**Example:**
```markdown
## Expected Artifacts

- **Phase 1 Output**: Competitor list with 5-7 companies and URLs
- **Phase 2a Output**: Market positioning analysis report
- **Phase 2b Output**: Content and brand voice analysis
- **Phase 3 Output**: Strategic synthesis with recommendations
- **Final Output**: Consolidated RESEARCH.md with all findings
```

### 4. Progressive Disclosure Design

Specify what context each phase needs:
- Which artifacts from previous phases?
- What external data or configuration?
- What instructions or templates?

This ensures agents load only relevant context, maintaining high signal-to-noise ratio.

**Example:**
```
Phase 2a needs:
- Input: Phase 1 competitor list
- Instructions: phase-2a-research-analyst.md
- Context: Session metadata (optional)

Phase 3 needs:
- Input: Phase 2a positioning analysis
- Input: Phase 2b content analysis
- Instructions: phase-3-synthesis.md
```

This enables progressive disclosure - each agent loads only what it needs, maintaining high signal-to-noise ratio.

## Planning Process

### Step 1: Create Execution Folder

Use `scripts/create_execution_folder.py` to create timestamped execution folder:

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

### Step 2: Load Context

Gather planning inputs:
- Task description (provided as input)
- WORKFLOW.md (if using a template workflow)
- User requirements and context
- Domain-specific knowledge

### Step 3: Decompose Into Phases

Break down the task:
1. Identify logical phase boundaries
2. Determine dependencies between phases
3. Identify opportunities for parallelization
4. Assign each phase a number (1, 2, 3...) and letter if parallel (2a, 2b, 2c)

### Step 4: Define Artifacts

For each phase, specify:
- What output will be created
- What format (usually markdown)
- What it will contain
- Which subsequent phases will consume it

### Step 5: Create PLAN.md

Use the PLAN template at `assets/PLAN_template.md` as starting point.

The template includes:
- **Objective** - Clear statement of what workflow accomplishes
- **Approach** - High-level methodology
- **Input Data** - Any data files needed in `data/` folder
- **Step by Step Tasks** - Each phase with:
  - Agent type to delegate to
  - Instructions file path or inline instructions
  - Input artifacts needed
  - Output artifact path
  - Task details for the agent
- **Success Criteria** - How to evaluate success

**Key points:**
- Use H3 headings for phases (`### 1. Phase Name`)
- Parallel phases use letter suffixes (`### 2a.`, `### 2b.`)
- Each phase specifies agent, instructions, inputs, and output artifact
- Artifacts use relative paths: `artifacts/01-artifact-name.md`

Write PLAN.md to: `{execution-folder}/PLAN.md`

### Step 6: Iterate

Review the plan for:
- Clear phase boundaries
- Appropriate parallelization
- Complete artifact definitions
- Realistic success criteria

Refine until the plan is clear and executable.

## Planning Principles

1. **Clarity over completeness** - Focus on clear phase boundaries and outputs
2. **Parallelization when possible** - Identify independent tasks to run concurrently
3. **Progressive disclosure** - Each phase gets only what it needs
4. **Concrete artifacts** - Every phase produces a tangible output
5. **Focused context** - Each phase has a single, clear responsibility

## Integration Points

### Inputs
- Task description or workflow definition
- User requirements and context
- Optional: WORKFLOW.md template

### Outputs
- Execution folder: `/research/{workflow-name}/{YYYY-MM-DD_HH:MM}/`
- PLAN.md with phase breakdown
- Expected artifact definitions

### Next Step
The plan serves as input to the implementation phase.