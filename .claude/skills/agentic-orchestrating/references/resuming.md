# Resuming Workflows

Resuming allows restarting execution from a specific phase without redoing completed work, enabling iterative refinement and error correction.

## Purpose

Enable:
- **Selective regeneration** - Redo only what needs to change
- **Efficiency** - Preserve work that doesn't need regeneration
- **Iteration** - Refine specific phases without full re-runs
- **Error recovery** - Fix issues at their source phase
- **Data updates** - Incorporate new inputs without starting over

## When to Resume

**Resume instead of restarting when:**
- ✅ User is unhappy with a specific phase output
- ✅ Found error or issue in a middle phase
- ✅ New data available that affects downstream phases
- ✅ Want to refine approach for specific phase
- ✅ Need to regenerate with different parameters

**Don't resume when:**
- ❌ Fundamental plan needs changing (create new execution)
- ❌ All phases need regeneration anyway (restart is simpler)
- ❌ Workflow definition itself is incorrect (fix plan, restart)

## Resume Process

### Step 1: Read Execution State

Read from the execution folder:

1. **PLAN.md** - Workflow definition with phase sequence
2. **TODO.md** - Current progress state
3. **artifacts/** - Existing outputs

Understand:
- Which phases are complete
- Phase dependency chain (what depends on what)
- What artifacts exist

### Step 2: Determine Resume Point

**Ask user:** "Which phase would you like to resume from?"

Show options from PLAN.md:
```
Available phases:
1. Phase 1: Brand Selection (COMPLETED)
2. Phase 2: Voice Sample Collection (COMPLETED)
3. Phase 3: Voice Attribute Analysis (COMPLETED)
4. Phase 4: Cross-Brand Pattern Analysis (COMPLETED)
5. Phase 5: Research Report Generation (COMPLETED)

Which phase number would you like to resume from?
```

### Step 3: Identify Affected Artifacts

Based on resume point, determine:

**Phases to re-execute:**
- Resume phase + all subsequent phases

**Artifacts that will be regenerated:**
- Output from resume phase
- Outputs from all downstream phases
- Final output (RESEARCH.md, STRATEGY.md, or CONTENT.md)

**Artifacts to preserve:**
- Outputs from phases BEFORE resume point
- These become inputs to resumed phases

**Example:**
```
Resume from Phase 3:
- Keep: Phase 1 and 2 artifacts (become inputs)
- Regenerate: Phase 3, 4, 5 artifacts + final output
```

### Step 4: Update TODO.md

Add resumption section and update phase checkboxes:

```markdown
## Resumption Log

**Resumed:** 2025-10-28 20:15
**Resume Point:** Phase 5 (Research Report Generation)
**Reason:** User requested regeneration with different synthesis approach

**Preserved Artifacts:**
- [x] artifacts/01-brand-list.md
- [x] artifacts/02-voice-samples.md
- [x] artifacts/03-voice-attributes.md
- [x] artifacts/04-pattern-analysis.md

**Will Regenerate:**
- [ ] RESEARCH.md (final output)

---

## Phases

- [x] Phase 1: Brand Selection → [01-brand-list.md](data/brand-list.md)
- [x] Phase 2: Voice Sample Collection → [02-voice-samples.md](artifacts/02-voice-samples.md)
- [x] Phase 3: Voice Attribute Analysis → [03-voice-attributes.md](artifacts/03-voice-attributes.md)
- [x] Phase 4: Cross-Brand Pattern Analysis → [04-pattern-analysis.md](artifacts/04-pattern-analysis.md)
- [ ] Phase 5: Research Report Generation (RESUMING FROM HERE)
```

### Step 5: Execute from Resume Point

Follow the same implementation process as normal execution:

1. **For each phase from resume point forward:**
   - Read phase definition from PLAN.md
   - Load instructions (if external file)
   - Delegate to specified agent with:
     - Instructions
     - Input artifact paths (may include preserved artifacts)
     - Output artifact path
     - Execution folder path
   - Wait for completion
   - Update TODO.md

2. **Generate final output** (if needed)

3. **Mark workflow complete** in TODO.md

See [Implementation](implementation.md) for delegation details.

## Resume Patterns

### Pattern 1: Single Phase Refinement

**Scenario:** User wants to redo just the final phase

```
Resume from: Phase 5
Preserve: Phases 1-4 artifacts
Regenerate: Phase 5 artifact + final output
```

**Process:**
1. Phase 5 loads artifacts from Phases 1-4 (unchanged)
2. Phase 5 executes with new approach
3. Final output synthesizes new Phase 5 result

**Efficiency:** Maximum - only regenerates what's needed

### Pattern 2: Mid-Workflow Issue

**Scenario:** Found error in Phase 3, need to redo from there

```
Resume from: Phase 3
Preserve: Phases 1-2 artifacts
Regenerate: Phases 3-5 artifacts + final output
```

**Process:**
1. Phase 3 loads artifacts from Phases 1-2 (unchanged)
2. Phase 3 executes with fix
3. Phases 4-5 execute sequentially with new Phase 3 output
4. Final output synthesizes all new results

**Efficiency:** Good - preserves early work

### Pattern 3: New Input Data

**Scenario:** User adds new data to data/ folder

```
Resume from: Phase 2 (first phase that uses data/)
Preserve: Phase 1 artifacts (if not data-dependent)
Regenerate: Phases 2-5 artifacts + final output
```

**Process:**
1. Phase 2 loads new data/ contents + Phase 1 artifacts
2. Phases 2-5 execute sequentially with new data
3. Final output synthesizes all new results

**Efficiency:** Good - only affected phases regenerate

### Pattern 4: Parallel Phase Rework

**Scenario:** Workflow has parallel phases 2a and 2b, need to redo 2b only

```
Resume from: Phase 2b
Preserve: Phase 1, Phase 2a artifacts
Regenerate: Phase 2b artifact + downstream phases that depend on 2b
```

**Process:**
1. Phase 2b loads Phase 1 artifacts (input)
2. Phase 2b executes
3. Phase 3 loads Phase 2a (preserved) + Phase 2b (new)
4. Downstream phases execute

**Efficiency:** Excellent - preserves parallel work

## Handling Dependencies

Understanding dependencies is critical for efficient resumption.

### Reading Phase Dependencies from PLAN.md

Each phase specifies:
```markdown
**Input Artifacts:**
- `artifacts/02-voice-samples.md` - Voice samples
- `artifacts/03-voice-attributes.md` - Voice attributes
```

This tells you:
- Phase depends on phases 2 and 3
- If you redo Phase 2, you must redo this phase
- If you redo Phase 3, you must redo this phase
- If neither changes, this phase can stay unchanged

### Dependency Rules

1. **Direct dependency:** If Phase X uses artifact from Phase Y, Phase X depends on Phase Y
2. **Transitive dependency:** If Phase X depends on Y, and Y depends on Z, then X depends on Z
3. **Independence:** Phases with no shared inputs are independent
4. **Final synthesis:** Always depends on ALL previous phases

### Example Dependency Chain

```
Phase 1 (data collection)
    ↓
Phase 2 (initial analysis)
    ↓
Phase 3 (deeper analysis) ← depends on Phase 2
    ↓
Phase 4 (synthesis) ← depends on Phase 2 and 3
    ↓
Final Output ← depends on all phases
```

**Resume scenarios:**
- Resume Phase 1 → regenerate ALL phases
- Resume Phase 2 → regenerate phases 2, 3, 4, final
- Resume Phase 3 → regenerate phases 3, 4, final (keep Phase 2)
- Resume Phase 4 → regenerate phase 4, final (keep Phases 1-3)

## Communication with User

### Before Resuming

**Be explicit about impact:**

```
I'll resume from Phase 3 (Voice Attribute Analysis).

This will:
✅ Preserve Phase 1 and 2 artifacts (no changes needed)
🔄 Regenerate Phase 3, 4, 5 artifacts
🔄 Regenerate final RESEARCH.md

Estimated time: ~15 minutes

Proceed?
```

### During Resumption

**Update progress clearly:**

```
Resuming from Phase 3...

✅ Phase 3 complete → artifacts/03-voice-attributes.md (regenerated)
🔄 Now executing Phase 4...
```

### After Completion

**Summarize what changed:**

```
Resume complete!

Regenerated:
- artifacts/03-voice-attributes.md (Phase 3)
- artifacts/04-pattern-analysis.md (Phase 4)
- artifacts/05-report.md (Phase 5)
- RESEARCH.md (final output)

Preserved (unchanged):
- data/brand-list.md (Phase 1)
- artifacts/02-voice-samples.md (Phase 2)

Final output: [RESEARCH.md](RESEARCH.md)
```

## TODO.md Audit Trail

TODO.md should maintain complete history of executions:

```markdown
**Status:** ✅ Completed
**Started:** 2025-10-28 18:04
**First Completion:** 2025-10-28 19:30
**Resumed:** 2025-10-28 20:15 (from Phase 5)
**Final Completion:** 2025-10-28 20:45

## Resumption Log

### Resumption 1: 2025-10-28 20:15
**Resume Point:** Phase 5
**Reason:** User requested different synthesis approach
**Preserved:** Phases 1-4 artifacts
**Regenerated:** Phase 5, RESEARCH.md

(Future resumptions would be logged here)

---

## Phases

- [x] Phase 1: Brand Selection → [01-brand-list.md](data/brand-list.md)
- [x] Phase 2: Voice Sample Collection → [02-voice-samples.md](artifacts/02-voice-samples.md)
- [x] Phase 3: Voice Attribute Analysis → [03-voice-attributes.md](artifacts/03-voice-attributes.md)
- [x] Phase 4: Cross-Brand Pattern Analysis → [04-pattern-analysis.md](artifacts/04-pattern-analysis.md)
- [x] Phase 5: Research Report Generation → RESEARCH.md (regenerated 2025-10-28 20:15)
```

## Key Principles

1. **Preserve work** - Don't regenerate what doesn't need to change
2. **Follow dependencies** - Understand phase relationships from PLAN.md
3. **Be explicit** - Tell user what will change before proceeding
4. **Track everything** - Maintain audit trail in TODO.md
5. **Use existing plan** - Don't change PLAN.md during resume (that's a new execution)

## Integration Points

### Inputs
- PLAN.md from execution folder (unchanged)
- TODO.md from execution folder (will be updated)
- artifacts/ (some preserved, some regenerated)
- data/ (may have new inputs)

### Outputs
- Updated TODO.md with resumption log
- Regenerated artifacts (overwrite existing)
- Updated final output
- Preserved artifacts (untouched)

### Tools
- Read (load execution state)
- Task (delegate phases as normal)
- Edit/Write (update TODO.md, overwrite artifacts)
