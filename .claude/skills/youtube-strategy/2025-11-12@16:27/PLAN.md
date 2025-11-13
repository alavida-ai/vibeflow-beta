# YouTube Strategy Skill Development Plan

## Objective

Create a comprehensive YouTube Strategy Skill (`.claude/skills/youtube-strategy/SKILL.md`) that serves as our in-house YouTube expert, providing tactical and granular strategic intelligence for YouTube content creation. This skill will leverage the Paddy Galloway knowledge base (via NotebookLM) to build expertise in thumbnails, scripts, engagement tactics, and platform-specific optimization.

## Approach

This is a **skill development project** (not marketing framework work), following the skill-creator methodology with progressive disclosure principles. We'll use NotebookLM to systematically extract knowledge from Paddy Galloway content, then synthesize it into a structured SKILL.md that can guide YouTube strategy work.

**Key Principles:**
1. **Progressive disclosure** - SKILL.md provides core workflows, references/ contains detailed knowledge
2. **NotebookLM-driven** - All strategic knowledge sourced from Paddy Galloway knowledge base
3. **Tactical focus** - Granular, actionable guidance (not high-level theory)
4. **Workflow-based** - Structured SOPs for common YouTube tasks

## Input Data

**NotebookLM Source:**
- Paddy Galloway knowledge base (user has NotebookLM notebook)
- Need to identify notebook URL and activate it

**Required from User:**
- NotebookLM notebook URL for Paddy Galloway content
- Any specific YouTube strategy priorities or focus areas

## Step by Step Tasks

### 1. Identify Knowledge Domains (Progressive Disclosure Query Design)

**Agent:** general-purpose
**Instructions:** Analyze YouTube strategy requirements and design systematic NotebookLM queries

**Task:** Using progressive disclosure principles, identify the core knowledge domains for comprehensive YouTube strategy, then design targeted NotebookLM queries that extract tactical, actionable intelligence. Focus on:
- What are the fundamental YouTube strategy domains? (thumbnails, scripts, titles, etc.)
- For each domain, what specific tactical questions will extract Paddy Galloway's methodology?
- How should queries be structured to get actionable frameworks vs theory?
- What's the optimal query sequence to build from foundational to advanced concepts?

**Output Artifact:** `artifacts/01-knowledge-domains-and-queries.md`
- List of core YouTube strategy domains
- Structured queries for each domain (grouped by topic)
- Query execution order (foundational → advanced)
- Expected knowledge outputs from each query group

---

### 2. Setup NotebookLM Access

**Agent:** Operations Manager (direct execution - requires user interaction)
**Instructions:** Inline

**Task:** Configure NotebookLM access to query Paddy Galloway knowledge base:
1. Ask user for NotebookLM notebook URL containing Paddy Galloway content
2. Check NotebookLM authentication: `python scripts/run.py auth_manager.py status`
3. If not authenticated, run setup: `python scripts/run.py auth_manager.py setup`
4. Use Smart Add to discover notebook content:
   ```bash
   python scripts/run.py ask_question.py --question "What is the content of this notebook? What topics are covered? Provide a complete overview briefly and concisely" --notebook-url "[URL]"
   ```
5. Add notebook to library using discovered information:
   ```bash
   python scripts/run.py notebook_manager.py add --url "[URL]" --name "Paddy Galloway YouTube Strategy" --description "[Based on discovery]" --topics "[Based on discovery]"
   ```
6. Activate the notebook for querying

**Output Artifact:** `artifacts/02-notebooklm-setup.md`
- Notebook URL and ID
- Discovered content overview
- Activation confirmation

**Note:** This step requires user interaction and cannot be delegated to sub-agents.

---

### 3a. Query Foundational YouTube Strategy

**Agent:** analyst
**Instructions:** `artifacts/03a-foundational-strategy-queries.md`

**Input:**
- `artifacts/01-knowledge-domains-and-queries.md` (query list for foundational concepts)
- `artifacts/02-notebooklm-setup.md` (notebook ID)

**Task:** Execute all foundational-level queries against NotebookLM to extract core YouTube strategy principles. For each query:
1. Execute using: `python scripts/run.py ask_question.py --question "..." --notebook-id [ID]`
2. Follow NotebookLM's "Is that ALL you need?" protocol - ask follow-ups until complete
3. Document responses with clear attribution to source material
4. Identify gaps or contradictions for follow-up queries

**Output Artifact:** `artifacts/03a-foundational-strategy-responses.md`
- Complete responses for all foundational queries
- Follow-up questions asked and answers received
- Key frameworks and principles extracted
- Gaps identified for advanced queries

---

### 3b. Query Advanced YouTube Tactics

**Agent:** analyst
**Instructions:** `artifacts/03b-advanced-tactics-queries.md`

**Input:**
- `artifacts/01-knowledge-domains-and-queries.md` (query list for advanced tactics)
- `artifacts/02-notebooklm-setup.md` (notebook ID)
- `artifacts/03a-foundational-strategy-responses.md` (to inform advanced queries)

**Task:** Execute all advanced-level queries against NotebookLM to extract granular tactical intelligence. For each query:
1. Execute using: `python scripts/run.py ask_question.py --question "..." --notebook-id [ID]`
2. Follow NotebookLM's "Is that ALL you need?" protocol - ask follow-ups until complete
3. Document specific tactics, frameworks, and methodologies
4. Capture examples and case studies where provided

**Output Artifact:** `artifacts/03b-advanced-tactics-responses.md`
- Complete responses for all advanced queries
- Detailed tactical frameworks
- Specific methodologies and processes
- Examples and case studies

**Note:** Runs in parallel with 3a after foundational queries complete.

---

### 4. Synthesize YouTube Strategy Knowledge

**Agent:** strategist
**Instructions:** `artifacts/04-synthesis-instructions.md`

**Input:**
- `artifacts/01-knowledge-domains-and-queries.md` (domain structure)
- `artifacts/03a-foundational-strategy-responses.md` (foundational knowledge)
- `artifacts/03b-advanced-tactics-responses.md` (advanced tactics)

**Task:** Synthesize all NotebookLM responses into structured knowledge domains for the skill:
1. Organize knowledge by domain (thumbnails, scripts, titles, optimization, etc.)
2. Extract core principles and frameworks for each domain
3. Identify tactical workflows and SOPs
4. Map relationships between domains (how thumbnail strategy informs title strategy, etc.)
5. Flag knowledge for SKILL.md (core workflows) vs references/ (detailed tactics)

**Output Artifact:** `artifacts/04-synthesized-knowledge.md`
- Knowledge organized by domain
- Core principles and frameworks per domain
- Tactical workflows identified
- SKILL.md vs references/ content mapping
- Cross-domain dependencies and relationships

---

### 5. Design Skill Structure

**Agent:** general-purpose
**Instructions:** Inline (skill-creator methodology)

**Input:**
- `artifacts/04-synthesized-knowledge.md` (organized knowledge)
- `.claude/skills/skill-creator/SKILL.md` (skill creation guidelines)

**Task:** Design the YouTube Strategy Skill structure following skill-creator best practices:
1. Define SKILL.md scope (core workflows and trigger conditions)
2. Design references/ structure for detailed knowledge
3. Identify any assets/ needed (templates, frameworks)
4. Plan progressive disclosure flow (what goes where and why)
5. Draft SKILL.md frontmatter (name, description, trigger conditions)

**Output Artifact:** `artifacts/05-skill-structure.md`
- SKILL.md content outline
- references/ file structure and content mapping
- assets/ requirements (if any)
- Progressive disclosure justification
- Frontmatter draft

---

### 6. Create YouTube Strategy Skill

**Agent:** general-purpose
**Instructions:** Inline (skill-creator methodology)

**Input:**
- `artifacts/04-synthesized-knowledge.md` (knowledge content)
- `artifacts/05-skill-structure.md` (skill structure design)
- `.claude/skills/skill-creator/SKILL.md` (creation guidelines)

**Task:** Create the complete YouTube Strategy Skill:
1. Write SKILL.md with proper frontmatter and core workflows
2. Create references/ files with detailed tactical knowledge
3. Create any needed assets/ (templates, frameworks)
4. Ensure all content follows imperative/infinitive form
5. Implement progressive disclosure (SKILL.md references references/ files)
6. Add clear trigger conditions and usage examples

**Output Artifact:** `.claude/skills/youtube-strategy/SKILL.md` + `references/` + `assets/` (if needed)

---

## Expected Artifacts

**Phase 1:** Knowledge domain identification and query design
- `artifacts/01-knowledge-domains-and-queries.md`

**Phase 2:** NotebookLM setup and access
- `artifacts/02-notebooklm-setup.md`

**Phase 3:** NotebookLM knowledge extraction (parallel)
- `artifacts/03a-foundational-strategy-responses.md`
- `artifacts/03b-advanced-tactics-responses.md`

**Phase 4:** Knowledge synthesis
- `artifacts/04-synthesized-knowledge.md`

**Phase 5:** Skill structure design
- `artifacts/05-skill-structure.md`

**Phase 6:** Final skill creation
- `.claude/skills/youtube-strategy/SKILL.md`
- `.claude/skills/youtube-strategy/references/*.md`
- `.claude/skills/youtube-strategy/assets/*` (if needed)

## Success Criteria

**Skill Quality:**
- ✅ SKILL.md provides clear, actionable YouTube strategy workflows
- ✅ Trigger conditions accurately identify when to use the skill
- ✅ References/ contain detailed tactical knowledge from Paddy Galloway
- ✅ Progressive disclosure implemented (SKILL.md → references/ as needed)
- ✅ All content in imperative/infinitive form

**Knowledge Coverage:**
- ✅ Thumbnails (design, psychology, testing)
- ✅ Scripts (hooks, structure, retention)
- ✅ Titles (optimization, SEO, clickability)
- ✅ Content structure (formats, pacing, editing)
- ✅ Discoverability (algorithm, SEO)
- ✅ Analytics (metrics, optimization)

**Validation:**
- ✅ All knowledge traceable to NotebookLM responses
- ✅ Skill passes validation (proper frontmatter, structure)
- ✅ User confirms skill matches YouTube strategy needs
