# Update CHANGELOG Workflow

Analyze strategy changes in a pull request and generate or update CHANGELOG entries to reflect those changes.

## Objective

Ensure CHANGELOG files accurately document strategy changes, formatted for stakeholder consumption and maintaining audit trails.

## Context

This workflow is typically triggered during PR review (before merge to main). It analyzes git diffs to understand what changed and updates CHANGELOG.md files accordingly.

## Inputs

- **Git diff** - Changes between base branch and PR head for strategy files
- **Existing CHANGELOG.md** - Current changelog content for affected domains
- **PR metadata** - PR number, title, description (if available)
- **Current STRATEGY.md** - Context of the domain being updated

## Process

### Step 1: Detect Changed Domains

Identify which strategy domains have modified `STRATEGY.md` files in this PR.

**Method:**
- Check for changes in `/brand/strategy/*/STRATEGY.md` paths
- Extract domain names from file paths (e.g., `voice`, `messaging`, `positioning`)
- List all affected domains for processing

### Step 2: Analyze Each Domain

For each changed domain, perform the following analysis:

#### 2.1 Read Current Context

Load context to understand the domain:
- Read `/brand/strategy/{domain}/STRATEGY.md` to understand current strategy
- Read `/brand/strategy/{domain}/CHANGELOG.md` to see existing entries
- Note: Use progressive disclosure - load only what's needed

#### 2.2 Analyze Git Diff

Examine the diff to identify:
- **Additions** - New content, guidelines, or principles added
- **Modifications** - Updated language, refined positioning, changed guidance
- **Deletions** - Removed content or deprecated guidelines
- **Reorganization** - Structural changes that don't change meaning

#### 2.3 Determine If Update Needed

Check existing CHANGELOG to decide if an update is necessary:

**Update needed if:**
- No CHANGELOG entry exists for today's date
- Latest entry exists but doesn't cover changes in this PR
- Changes are substantial enough to warrant documentation

**Skip update if:**
- Latest CHANGELOG entry already accurately reflects these changes
- Changes are trivial (typo fixes, formatting only)
- CHANGELOG was manually updated in this PR already

### Step 3: Generate CHANGELOG Entry

When an update is needed, generate a new entry following the standard format.

#### Entry Components

**Title:**
- Concise (5-10 words)
- Describes the nature of the change
- Example: "Voice refinement for technical audience clarity"

**Type:**
- `Created` - Initial strategy document or new domain
- `Updated` - Significant additions or changes to existing strategy
- `Refined` - Minor improvements, clarifications, or optimizations

**Changes (Bullets):**
- 3-5 specific bullets describing what changed
- Focus on **what** changed, not why (that's in next section)
- Be specific: "Shifted tone from X to Y" not "Updated tone"
- Example:
  - Added technical vocabulary guidelines (architect, systems, build vs rent)
  - Removed patronizing phrases ("easy," "simple," "anyone can")

**Why It Matters:**
- 1-2 sentences explaining **impact** on:
  - Content creation workflows
  - Brand positioning and differentiation
  - Messaging consistency
  - Audience resonance
- Focus on practical implications for Marketing Architects
- Example: "This refinement ensures all content respects the Marketing Architect's sophistication and aligns with our 'empowerment over ease' positioning."

**Research Trigger (Optional):**
- Reference research files that informed this change
- Use relative paths from workspace root
- Format: `[Description](/path/to/RESEARCH.md)`
- Example: `[Customer insights research](/brand/research/customer-insights/RESEARCH.md) revealed audience finds "easy button" language insulting`

### Step 4: Update CHANGELOG File

Insert the new entry into the CHANGELOG:

#### Insertion Logic

- **Location:** Insert after the header/separator, before existing entries
- **Preservation:** Keep all existing entries intact
- **Formatting:** Maintain consistent markdown formatting and spacing

#### Create CHANGELOG If Missing

If no CHANGELOG.md exists for the domain:

1. Create file with standard header:
```markdown
# {Domain} - Changelog

All notable changes to the {domain} strategy will be documented in this file.

## Format

Each entry should include:
- **Date:** When the change was made
- **Type:** Created | Updated | Refined
- **Changes:** What changed
- **Why it matters:** Impact on strategy/content
- **Research trigger:** Which research prompted this (if applicable)

---

```

2. Append the new entry after the separator

### Step 5: Commit Changes

After generating CHANGELOG updates:

- Stage all modified `CHANGELOG.md` files
- No need to commit directly - changes will be committed by GitHub Action workflow
- Ensure changes are ready for review in the PR

## Validation

Before finalizing, validate the entry:

- [ ] Title is concise and descriptive
- [ ] Type (Created/Updated/Refined) is accurate
- [ ] Changes bullets are specific and actionable
- [ ] "Why it matters" explains practical impact
- [ ] Research references use correct relative paths
- [ ] Markdown formatting is consistent
- [ ] Entry maintains professional, non-patronizing tone

## Error Handling

If unable to generate a proper entry:

1. **Log the issue** - Note what information was missing or unclear
2. **Create fallback entry** - Generate a minimal entry noting manual review needed
3. **Don't block** - Allow the PR process to continue; human can refine during review

Example fallback:
```markdown
## [YYYY-MM-DD] - Strategy updates

**Type:** Updated
**PR:** #{number}

**Changes:**
- Strategy document updated (manual review of specific changes recommended)

**Why it matters:**
See PR diff for detailed changes.
```

## Output

Updated `CHANGELOG.md` file(s) for affected domain(s), ready for commit to the PR branch.

## Notes

- This workflow is designed for automated execution via GitHub Actions
- Human review during PR process ensures quality and accuracy
- Focus on stakeholder value, not technical implementation details
- When in doubt about significance, err on the side of documentation
