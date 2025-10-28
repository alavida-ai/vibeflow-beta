# Messaging Strategy Condensation

**Created:** 2025-10-28@17:10
**Execution Folder:** `/strategy/messaging/2025-10-28@17:10/`

## Objective

Condense [strategy/messaging/STRATEGY.md](../STRATEGY.md) to maximize signal-to-token ratio for content creation workflows while preserving all critical markdown references and strategic guidance.

## Approach

**Problem:** Current messaging strategy is comprehensive but verbose (328 lines). For content creation agents, this creates context overhead and dilutes critical guidance with explanatory text.

**Solution:** Strategic condensation through:
1. **Analyze** current document structure to identify high-value vs. explanatory sections
2. **Condense** each section by removing redundancy while preserving markdown references
3. **Validate** that condensed version maintains all strategic guidance needed for content creation

**Key Constraint:** Preserve ALL markdown references (e.g., `[text](/path/to/file.md)`) as they enable progressive disclosure and audit trails.

## Input Data

**Location:** `data/`

- `data/original-messaging-strategy.md` - Copy of current [strategy/messaging/STRATEGY.md](../STRATEGY.md) for reference

## Step by Step Tasks

### 1. Structural Analysis

Analyze current messaging strategy to identify condensation opportunities.

**Agent:** general-purpose
**Instructions:** Inline below
**Input Artifacts:**
- `data/original-messaging-strategy.md`

**Output Artifact:** `artifacts/01-analysis.md`

**Task Details:**

Read the original messaging strategy and analyze:

1. **Section-by-section token density:**
   - Which sections have high explanatory text vs. actionable guidance?
   - Which sections are critical for content creation (HIGH priority)?
   - Which sections are context/rationale (can be condensed)?

2. **Redundancy identification:**
   - Where is information repeated across sections?
   - Which proof points/examples can be consolidated?
   - Where can we use markdown references instead of inline explanations?

3. **Markdown reference inventory:**
   - Count and catalog all markdown references
   - Identify which references are critical vs. supportive

4. **Condensation strategy:**
   - For each section, recommend: KEEP AS-IS, CONDENSE 30%, CONDENSE 50%, MERGE WITH [section]
   - Identify sections that can be converted to reference lists vs. paragraphs
   - Suggest structural reorganization for better signal-to-token ratio

**Output format:**
```markdown
# Structural Analysis

## Current Document Stats
- Total lines: X
- Sections: Y
- Markdown references: Z

## Section-by-Section Analysis

### Section: Core Value Propositions
- **Current length:** X lines
- **Token density:** [HIGH/MEDIUM/LOW]
- **Priority for content creation:** [HIGH/MEDIUM/LOW]
- **Condensation recommendation:** [Keep 100% / Condense to 70% / Condense to 50%]
- **Rationale:** ...

[Repeat for each section]

## Overall Condensation Strategy
- Target length: X lines (Y% reduction)
- Sections to keep full: ...
- Sections to condense heavily: ...
- Structural changes: ...
```

---

### 2. Strategic Condensation

Create condensed version of messaging strategy.

**Agent:** strategist-agent
**Instructions:** Inline below
**Input Artifacts:**
- `data/original-messaging-strategy.md`
- `artifacts/01-analysis.md`

**Output Artifact:** `artifacts/02-condensed-messaging.md`

**Task Details:**

Using the analysis from Phase 1, create a condensed messaging strategy that:

**Condensation Principles:**
1. **Preserve ALL markdown references** - These are non-negotiable audit trail elements
2. **Convert prose to structured lists** where possible
3. **Remove redundant explanations** - Say it once, reference it everywhere else
4. **Keep actionable guidance** - Remove "why this matters" explanations, keep "what to do"
5. **Consolidate examples** - Use most powerful examples, remove redundant ones
6. **Use headers for scanability** - Make it easy for agents to find relevant sections

**Section-Specific Guidance:**

**Core Value Propositions:**
- Keep primary + secondary value props
- Condense "Why this matters" to 1-2 sentences with markdown reference
- Remove redundant competitive differentiation (consolidate in one place)

**Key Messages by Theme:**
- Keep core message (1 sentence)
- Condense supporting points to bullet list format
- Keep markdown references, remove explanatory text around them
- Consolidate competitive differentiation sections (appears 5 times - make it once)

**Customer Language:**
- Keep exact customer phrases (critical for content)
- Remove explanations of what phrases "reveal" (obvious from context)
- Convert to reference list format

**Messaging Do's and Don'ts:**
- Keep examples (critical for agents)
- Remove redundant explanations
- Convert to tighter format: "✓ DO: [example] | ✗ DON'T: [example]"

**Research Foundation:**
- Keep section but condense to 2-3 sentences
- Preserve markdown references

**Output format:**
The condensed STRATEGY.md file, maintaining frontmatter and all structural headers.

**Target:** 40-50% reduction in length while preserving 100% of strategic guidance.

---

### 3. Validation & Quality Check

Validate that condensed version maintains all strategic guidance needed for content creation.

**Agent:** general-purpose
**Instructions:** Inline below
**Input Artifacts:**
- `data/original-messaging-strategy.md`
- `artifacts/02-condensed-messaging.md`

**Output Artifact:** `artifacts/03-validation-report.md` and final `STRATEGY.md`

**Task Details:**

**Validation Checklist:**

1. **Completeness Check:**
   - [ ] All 5 messaging themes present
   - [ ] All value propositions preserved
   - [ ] Customer language section complete
   - [ ] Do's and Don'ts section complete
   - [ ] All critical examples included

2. **Markdown Reference Integrity:**
   - [ ] Count of markdown references matches original
   - [ ] All reference paths are valid
   - [ ] No markdown references were removed or altered

3. **Content Creation Readiness:**
   - [ ] Can an agent identify core value props quickly? (< 30 seconds)
   - [ ] Can an agent find customer language patterns quickly?
   - [ ] Can an agent determine what to avoid quickly?
   - [ ] Are examples clear and actionable?

4. **Signal-to-Token Ratio:**
   - [ ] Length reduced by 40-50%
   - [ ] No loss of strategic guidance
   - [ ] Improved scanability (more structured lists vs. paragraphs)

**Validation Process:**
1. Run completeness check
2. Run markdown reference integrity check
3. Simulate content creation scenario: "An agent needs to write a Twitter thread about 'Build vs. Rent' - can they find all relevant guidance in < 60 seconds?"
4. Document any issues found
5. If validation passes, copy `artifacts/02-condensed-messaging.md` to execution folder as `STRATEGY.md`
6. If validation fails, document issues for iteration

**Output format:**
```markdown
# Validation Report

## Completeness Check
[Checklist results]

## Markdown Reference Integrity
- Original count: X
- Condensed count: Y
- Status: [PASS/FAIL]
- Issues: ...

## Content Creation Readiness
[Scenario test results]

## Signal-to-Token Ratio
- Original length: X lines
- Condensed length: Y lines
- Reduction: Z%
- Status: [PASS/FAIL]

## Overall Assessment
[APPROVED / NEEDS REVISION]

## Issues Found (if any)
...
```

## Success Criteria

- **Length reduction:** 40-50% reduction in total lines
- **Reference preservation:** 100% of markdown references intact
- **Strategic completeness:** All core messaging guidance preserved
- **Improved usability:** Content creation agents can find guidance 50% faster
- **Quality validation:** Passes all validation checks

