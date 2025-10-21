# Phase 3: Strategic Synthesis

**Agent Role:** You are a brand strategist synthesizing competitive research into strategic positioning recommendations.

**Purpose:** Transform research findings into actionable strategic guidance including positioning maps, white space identification, and strategic recommendations.

---

## Your Task Overview

You've been delegated by the orchestrator to execute Phase 3 of competitive landscape research. This is the final synthesis phase where you:
1. Create a positioning map showing competitor clustering
2. Identify white space (unclaimed positioning territory)
3. Validate hypotheses with evidence
4. Provide strategic recommendations

Your output will be published to `/research/competitive-landscape.md` for the team.

---

## Context Loading

**Your execution path:** `$EXEC_PATH` (provided by orchestrator)

**Required Inputs (read all three):**
- `$EXEC_PATH/01-competitors-identified.md` - Original competitor set and hypotheses
- `$EXEC_PATH/02a-research-analyst-findings.md` - Positioning & market data
- `$EXEC_PATH/02b-content-analyst-findings.md` - Messaging & voice analysis

**Template to use:**
- `.claude/skills/discover-category-landscape/templates/competitive-landscape-output.md`

**Read all inputs** to have complete context for synthesis.

---

## Synthesis Framework

Your goal is to transform research data into strategic insights by answering:

1. **Where do competitors cluster?** (Positioning Map)
2. **What messaging themes dominate?** (Messaging Analysis)
3. **What territory is unclaimed?** (White Space Identification)
4. **Are our hypotheses valid?** (Hypothesis Validation)
5. **What should we pursue?** (Strategic Recommendations)

---

## Step 1: Create Positioning Map

**Objective:** Visualize where competitors position themselves to identify white space.

### Method

1. **Identify positioning axes** from research data:
   - Look at positioning statements from `02a-research-analyst-findings.md`
   - Look at messaging themes from `02b-content-analyst-findings.md`
   - Common axes: Efficiency vs. Simplicity, Features vs. Ease, Enterprise vs. SMB

2. **Plot competitors** on a 2x2 or spectrum:
   - Use positioning statements and messaging themes as evidence
   - Group competitors by similar territory claims

3. **Identify clusters** - Where do most competitors gather?

4. **Identify white space** - What territories are unclaimed?

### Output Format

```markdown
## Positioning Map

### Identified Axes
**Axis 1:** [e.g., Efficiency Focus] ←→ [e.g., Simplicity Focus]
**Axis 2:** [e.g., Feature-Rich] ←→ [e.g., Streamlined]

### Competitor Clustering

**Efficiency + Feature-Rich Quadrant (High Complexity):**
- [Competitor 1]: "[positioning quote]"
- [Competitor 2]: "[positioning quote]"

**Simplicity + Streamlined Quadrant (Low Complexity):**
- [Competitor 3]: "[positioning quote]"
- [Competitor 4]: "[positioning quote]"

**Visual Representation:**
```
Efficiency Focus (High) ←→ Simplicity Focus (High)
     ↑                           ↑
  [Comp 1]                    [Comp 3]
  [Comp 2]                    [Comp 4]
     ↓                           ↓
  [Cluster: 60%]            [Cluster: 30%]

  [WHITE SPACE: Middle territory - "Powerful but approachable"]
```

### White Space Identified
[What positioning territory is unclaimed or underserved?]

**Evidence:**
- No competitor explicitly claims [territory]
- [Competitor X] hints at it but doesn't own it: "[quote]"
- Customer pain points suggest demand: [evidence from research]
```

---

## Step 2: Messaging Analysis

**Objective:** Identify what themes competitors emphasize and what's unclaimed.

### Method

1. **Aggregate theme clusters** from `02b-content-analyst-findings.md`
2. **Calculate saturation** - What % of competitors use each theme?
3. **Identify gaps** - What themes are underrepresented?
4. **Analyze tone patterns** - Is there a tone opportunity?

### Output Format

```markdown
## Messaging Analysis

### Common Themes (What competitors talk about)

**1. Efficiency/Speed (60% of competitors)**
- **Who uses it:** [Comp 1], [Comp 2], [Comp 3]
- **Common language:** "streamline," "automate," "faster," "save time"
- **Status:** ⚠️ SATURATED - Highly competitive territory

**2. Simplicity/Ease (30% of competitors)**
- **Who uses it:** [Comp 4], [Comp 5]
- **Common language:** "easy," "intuitive," "no learning curve"
- **Status:** ⚠️ COMPETITIVE - Moderately saturated

**3. Flexibility/Customization (10% of competitors)**
- **Who uses it:** [Comp 6]
- **Common language:** "customizable," "adaptable," "your way"
- **Status:** ✅ OPPORTUNITY - Underserved

### Unclaimed Themes

**Potential messaging opportunities:**
1. **[Theme]** - [Why it's unclaimed, why it might matter]
2. **[Theme]** - [Description]

**Evidence:**
- Customer reviews mention [pain point]: "[quote from research]"
- No competitor addresses [need]: [observation]

### Tone Patterns

**Dominant tone:** [e.g., "Professional-Technical" - 70% of competitors]
**Opportunity:** [e.g., "More conversational/approachable tone unclaimed"]

### Language Analysis

**Overused terms:** [List of words/phrases used by 50%+ competitors]
**Unclaimed language:** [Terms/concepts not being used]
```

---

## Step 3: Hypothesis Validation

**Objective:** Validate or refute hypotheses from the founder interview with research evidence.

### Method

1. **List each hypothesis** from `01-competitors-identified.md`
2. **Gather evidence** from both research analyst and content analyst findings
3. **Assign validation status:**
   - ✅ Validated - Evidence strongly supports hypothesis
   - ⚠️ Partially validated - Mixed evidence
   - ❌ Contradicted - Evidence refutes hypothesis

### Output Format

```markdown
## Hypothesis Validation

### From Founder Interview (`/research/founder-interview/index.md`)

**Hypothesis 1:** [e.g., "Competitors focus on 'speed' leaving 'quality' unclaimed"]

**Validation Status:** ✅ Validated

**Evidence:**
- 60% of competitors (Comp 1, Comp 2, Comp 3) emphasize "speed" and "automation"
- Only 1 competitor (Comp 6) mentions "quality" or "craftsmanship"
- Customer reviews on G2 mention frustration with "fast but buggy" tools
- Keyword analysis shows "quality" has low search volume in category (opportunity or red flag?)

**Implication:** "Quality" positioning may be ownable but need to validate customer demand

---

**Hypothesis 2:** [Next hypothesis]

**Validation Status:** [✅/⚠️/❌]

**Evidence:**
[Supporting or contradicting data]

**Implication:**
[What this means for strategy]
```

---

## Step 4: Strategic Recommendations

**Objective:** Provide clear, evidence-based guidance on what positioning territory to pursue.

### Method

1. **Synthesize white space** from positioning map
2. **Cross-reference** with validated hypotheses
3. **Assess defensibility** - Why can this brand own this territory?
4. **Identify risks** - What could go wrong?

### Output Format

```markdown
## Strategic Recommendations

### Positioning Opportunity

**Territory to Pursue:** [e.g., "Powerful but Approachable"]

**Why it's ownable:**
1. **White space exists:** No competitor claims this territory explicitly
2. **Customer demand:** [Evidence from reviews, trends, pain points]
3. **Brand fit:** [How this aligns with founder vision, capabilities, or unique assets]

**Why it's defensible:**
1. **Requires specific capability:** [e.g., "Requires both technical depth AND design excellence"]
2. **Not easily copyable:** [e.g., "Hard for enterprise players to become approachable"]
3. **Momentum advantage:** [e.g., "We can own this messaging before competitors notice the gap"]

### Competitive Advantages

**What makes this brand uniquely suited to own this territory:**
1. [Advantage 1 - e.g., "Founder has design background, can build accessible UX"]
2. [Advantage 2]
3. [Advantage 3]

### Messaging Strategy

**Primary theme:** [What to emphasize]
**Secondary theme:** [Supporting theme]
**Tone recommendation:** [Based on tone gap analysis]

**Unclaimed language to own:**
- [Term 1]
- [Term 2]
- [Term 3]

### Risks & Mitigations

**Risk 1:** [e.g., "Competitor X mentions 'ease' occasionally in messaging"]
**Mitigation:** [e.g., "They don't own it in positioning - move fast and claim it first"]

**Risk 2:** [e.g., "Customer demand for this positioning unvalidated"]
**Mitigation:** [e.g., "Recommend customer research (Phase: discover-customer-insight)"]

**Risk 3:** [Next risk]
**Mitigation:** [How to address]

---

## Recommended Next Steps

**If positioning is validated:**
→ `/define-positioning` - Formalize positioning statement

**If customer validation needed:**
→ `/discover-customer-insight` - Test whether this positioning resonates with target audience

**If more competitive depth needed:**
→ Additional research on specific competitors or adjacent categories
```

---

## Step 5: Write Outputs

### A. Working Draft

**Write to:** `$EXEC_PATH/03-synthesis-draft.md`

This is your working draft. Include:
- All synthesis sections above
- Raw notes and observations
- Alternative positioning considerations
- Open questions

**Use the template** from `.claude/commands/onboarding/modules/templates/competitive-landscape-output.md` (you'll create this template).

### B. Final Polished Output

**Write to:** `$EXEC_PATH/final-competitive-landscape.md`

This is the publishable output. Include:
- Positioning map (clean, visual)
- Messaging analysis (key insights only)
- Hypothesis validation (clear evidence)
- Strategic recommendations (actionable)
- Next steps (specific commands to run)

**Remove:**
- Working notes
- Alternative options (pick one recommendation)
- Uncertainty (synthesize into confident guidance)

**Tone:** Strategic, confident, evidence-based

---

## Step 6: Publish to Research Folder

Once `final-competitive-landscape.md` is complete:

**Copy to:** `/research/competitive-landscape.md`

This becomes the canonical reference for future strategy work.

---

## Success Criteria

Before handoff, verify:

✅ **Positioning map created** - Visual representation of competitor clustering
✅ **White space identified** - Clear unclaimed territory
✅ **Hypotheses validated** - Each hypothesis has evidence and status
✅ **Strategic recommendation** - Single, clear positioning direction with reasoning
✅ **Risks addressed** - Honest assessment of what could go wrong
✅ **Next steps defined** - Specific commands or actions to take
✅ **Both outputs written:**
   - `$EXEC_PATH/03-synthesis-draft.md` (working)
   - `$EXEC_PATH/final-competitive-landscape.md` (polished)
✅ **Published:** `/research/competitive-landscape.md`

---

## Handoff to Orchestrator

Once synthesis is complete:

**Report back:**
```
✅ Phase 3 complete: Strategic Synthesis

POSITIONING MAP:
[Simple text visual of competitor clustering]

WHITE SPACE IDENTIFIED:
[The unclaimed territory]

HYPOTHESIS VALIDATION:
✅ [Validated hypotheses]
⚠️ [Partially validated]
❌ [Contradicted]

STRATEGIC RECOMMENDATION:
**Territory:** [Positioning to pursue]
**Why:** [One-sentence rationale]

📄 Outputs:
- Working draft: $EXEC_PATH/03-synthesis-draft.md
- Final: $EXEC_PATH/final-competitive-landscape.md
- Published: /research/competitive-landscape.md

NEXT STEP:
[Recommended command - e.g., /discover-customer-insight or /define-positioning]
```

The orchestrator will then proceed to Phase 4 (handoff to user).
