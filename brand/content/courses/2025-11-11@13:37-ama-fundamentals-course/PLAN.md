# AMA Fundamentals Course

**Created:** 2025-11-11@12:00
**Execution Folder:** `/brand/content/courses/2025-11-11@12:00-ama-fundamentals-course/`
**Final Deliverable:** `.claude/skills/ama-course/` (installed as Claude Code skill)

## Objective

Create a comprehensive course on the Agentic Marketing Architecture (AMA) methodology, delivered as a Claude Code skill. The course will teach users how to effectively use AMA by starting with foundational LLM concepts and progressively building up to advanced orchestration patterns.

## Approach

The course uses a progressive learning model:
1. **Foundation First** - Start with how LLMs work (context, tokens, messages) before diving into AMA
2. **Conceptual to Practical** - Move from theory to hands-on application
3. **Modular Design** - Each class is a standalone reference document
4. **Skill-Based Delivery** - Package as a skill that can guide users through the course

**Implementation Pattern:**
- Stage 1 defines the course structure and class list
- Stage 2 dynamically creates parallel tasks (2a, 2b, 2c...) for each class identified in Stage 1
- TODO.md is updated after Stage 1 to reflect the actual classes to be written

## Input Data

**Location:** `data/`

- `data/existing-ama-docs.md` - List of current AMA documentation to reference (CLAUDE.md, MANIFESTO.md, etc.)
- `data/target-audience.md` - Definition of who this course is for (Marketing Architects, developers new to AMA)

## Step by Step Tasks

### 1. Course Structure Design

Define the complete course outline with learning objectives, prerequisites, and class sequence. This establishes the pedagogical foundation before creating content.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `data/existing-ama-docs.md`
- `data/target-audience.md`

**Output Artifact:** `artifacts/01-course-outline.md`

**Task Details:**

Create a detailed course outline that includes:
- **Course overview** - What students will learn, prerequisites, time commitment
- **Class breakdown** - For each class include:
  - Class number and title
  - Learning objectives
  - Key concepts covered
  - Prerequisites (which previous classes needed)
  - Estimated time to complete
- **Learning progression** - How each class builds on previous ones
- **Success metrics** - How to know if a student has mastered each class

The outline should cover approximately 7-10 classes, starting with LLM fundamentals and building up to advanced AMA orchestration.

**Important:** The output must include a clear list of all classes with unique identifiers (Class 1, Class 2, etc.) that will be used to generate Stage 2 tasks.

---

### 2. Write Class Reference Materials (Parallel)

**Note:** This stage will be dynamically populated after Stage 1 completes. The TODO.md will be updated with parallel tasks (2a, 2b, 2c...) for each class identified in the course outline.

**Pattern for each class task:**

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-course-outline.md` (for this specific class's requirements)
- `data/existing-ama-docs.md` (relevant documentation to reference)

**Output Artifact:** `artifacts/02{letter}-class-{number}-{slug}.md`

**Task Details:**

Write comprehensive reference material for this class covering:
- All topics specified in the course outline for this class
- Clear explanations with examples
- Code snippets where helpful
- Real examples from AMA codebase
- References to relevant AMA documentation using markdown links
- "Why this matters for AMA" callouts connecting concepts to practice
- Exercises or checkpoints for understanding

**Format:**
- Start with class overview (objectives, prerequisites)
- Organize by topic with clear headings
- Use practical examples from marketing context
- Include "Technical Deep Dive" callouts for advanced details
- End with summary and transition to next class

---

### 3. Skill Assembly

Assemble all reference materials and create the final SKILL.md delivery mechanism. Use the skill creation skill for this.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/01-course-outline.md`
- All class reference files from Stage 2 (`artifacts/02a-*.md`, `02b-*.md`, etc.)

**Output Artifact:** `artifacts/03-skill-package/`

**Task Details:**

Create the final skill package structure:

```
artifacts/03-skill-package/
├── SKILL.md                           # Main skill file (delivery)
└── references/
    ├── 01-{class-slug}.md
    ├── 02-{class-slug}.md
    ├── 03-{class-slug}.md
    └── ... (all classes from Stage 2)
```

**SKILL.md contents:**

1. **Header:**
   - Skill name: "AMA Fundamentals Course"
   - Description: What the course teaches
   - Prerequisites: None (starts from basics)

2. **Course Navigation:**
   - Table of contents with all classes
   - Learning path (recommended order)
   - Estimated time per class

3. **Usage Instructions:**
   - How to start the course
   - How to navigate between classes
   - How to complete exercises
   - How to get help

4. **Delivery Mechanism:**
   - Simple prompt pattern: "I want to learn about [topic]" → loads appropriate reference
   - Progress tracking suggestions
   - Links to each class reference

5. **Resources:**
   - Links to AMA documentation (CLAUDE.md, agentic-orchestrating skill)
   - Additional reading
   - Community support

**Key principle:** SKILL.md should be a simple wrapper that guides users to the comprehensive reference materials. The "teaching" happens in the references, not in SKILL.md.

---

### 4. Quality Review & Testing

Review all materials for completeness, clarity, and accuracy. Test the skill delivery mechanism.

**Agent:** general-purpose
**Instructions:** Inline instructions below
**Input Artifacts:**
- `artifacts/03-skill-package/`

**Output Artifact:** `artifacts/04-review-report.md`

**Task Details:**

**Review checklist:**

1. **Completeness:**
   - All classes from outline covered?
   - All exercises have clear instructions?
   - All references properly formatted?

2. **Clarity:**
   - Explanations clear for target audience?
   - Examples relevant and helpful?
   - Progression logical?

3. **Accuracy:**
   - Matches current AMA implementation?
   - Code examples work?
   - File paths correct?
   - References valid?

4. **Consistency:**
   - Terminology consistent across classes?
   - Formatting consistent?
   - Style consistent?
   - Navigation consistent?

5. **Testing:**
   - SKILL.md navigation works?
   - References load correctly?
   - Exercises achievable?

**Outputs:**
- `artifacts/04-review-report.md` - Detailed review findings and any issues to fix

---

## Success Criteria

- **Comprehensive Coverage**: Course covers all essential AMA concepts from LLM basics to advanced orchestration
- **Progressive Learning**: Each class builds logically on previous ones, no knowledge gaps
- **Practical Application**: Hands-on exercises provide real experience with AMA workflows
- **Clear Delivery**: SKILL.md provides simple, effective navigation to all course materials
- **Production Ready**: Final skill package can be installed and used immediately
- **Quality Verified**: All content reviewed for completeness, clarity, accuracy, and consistency
