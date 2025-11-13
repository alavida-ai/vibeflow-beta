# Phase 3: Customer Experience & Journey

**Date:** 2025-10-31
**Phase Status:** Complete

---

## Discovery: Community-Driven Acquisition

### Current State
> "Our initial customers found us through community Slack channels."

**Discovery Channels:**
- Community Slack channels (AI, marketing, dev tool communities)
- Word-of-mouth in professional networks
- Direct founder outreach (likely)

**Key Insight:**
> "It's clear we need to create content and engage in those channels to act as a voice of authority."

**Implication:**
- Content marketing isn't optional—it's how discovery happens
- Authority positioning in communities drives inbound
- Need presence where "cracked marketers" congregate
- Community engagement = customer acquisition

---

## Onboarding: White-Glove Today, Self-Serve Tomorrow

### Current Onboarding Process
> "Our onboarding includes onboarding calls where we get them set up with the system and run some onboarding workflows to understand the system and give them that aha moment."

**Current Flow:**
1. **Onboarding call** with Agonda team
2. **System setup** guided by team
3. **Example workflows** run together
4. **"Aha moment"** delivered through demonstration

**Characteristics:**
- High-touch, personalized
- Founder-led or team-led
- Educational, not just technical setup
- Focus on value demonstration early

---

### Future Onboarding Vision: CLI-Driven Setup

**Current State:**
> "Clone a repo"

**Future State:**
> "We would like to also simplify this through our CLI tool like create-agonda-app"

**Ideal Flow:**
```bash
npx create-agonda-app my-brand
```

**Proposed Onboarding Sequence:**
> "The ideal flow is they use our tool to get set up, they sign up to Alavida, pull in MCP tools, we can manage API tokens for them no issue with that as part of the client package, and then we run some example flows to get them up and running, and have them run through a whole interview process where they develop and visualize their brand strategy."

**Step-by-Step Future Flow:**

1. **CLI Setup**
   - Run `create-agonda-app`
   - Initialize repository structure
   - Configure Claude Code integration

2. **Alavida Account Creation**
   - Sign up for Alavida account
   - Connect to Claude Code workspace
   - Authenticate MCP access

3. **MCP Tool Installation**
   - Pull in MCP tools (X-scraper, future tools)
   - API token management (handled by Alavida)
   - Configuration automated

4. **Example Workflows**
   - Run pre-built example flows
   - Demonstrate agentic system capabilities
   - Show research → strategy → content flow

5. **Brand Strategy Interview**
   - Guided interview process
   - AI-assisted brand strategy development
   - Visualize brand strategy outputs
   - "Aha moment" delivered

**Key Improvement:**
- From manual repo cloning → CLI automation
- From scattered setup → integrated flow
- From technical friction → guided experience
- Maintain educational value, reduce technical barriers

---

## Setup & Configuration: Technical Details

### Technical Setup (Current)
**Repository:**
- Clone existing repo
- Follow AMA file structure
- Set up `.claude/` directory
- Configure MCP tools manually

**Technical Requirements:**
- Claude Code installed
- Git knowledge
- Command line comfort
- Understanding of file structure

### Future CLI Automation
**Goal:** Abstract complexity without hiding capability

**create-agonda-app Features:**
- Scaffold repository structure
- Initialize Git
- Configure Claude Code
- Set up Alavida connection
- Install MCP tools
- Manage API tokens (Alavida-side)
- Run example workflows
- Launch brand strategy interview

**Philosophy:**
- Reduce setup friction
- Maintain transparency (not black-box)
- Educational onboarding
- Progressive complexity (start simple, grow sophisticated)

---

## Day-to-Day Usage: What Customers Actually Do

### Primary Use Cases
> "Running research tasks, strategizing sessions, and creating content primarily."

**1. Research Tasks**
- Competitive analysis
- Market research
- Customer insights analysis
- Content framework identification (X-scraper use case)
- Trend analysis

**2. Strategy Sessions**
- Brand strategy development
- Messaging refinement
- Positioning workshops
- Voice guidelines creation
- Campaign planning

**3. Content Creation**
- Blog posts
- Social media content (Twitter, LinkedIn)
- Email campaigns
- Landing page copy
- Client deliverables

---

### Interaction Pattern
> "They engage with it through commands, and generate their own skills and workflows that are reusable."

**Command-Based Interaction:**
- Domain commands (`.claude/commands/`)
- Slash commands (e.g., `/plan`, `/implement`)
- Natural language requests to Operations Manager
- Sub-agent delegation (automatic)

**Custom Workflow Development:**
- Customers create their own skills
- Build reusable workflows
- Customize sub-agents for their needs
- Evolve system over time

**Key Insight:**
- Not just "using a tool"
- Actively building and customizing their system
- Workflows compound (get better over time)
- System ownership (not vendor dependency)

---

## Learning Curve: From Setup to Mastery

### Current Education Model
> "We have docs, and will create educational content. At the moment it's just calls with us. We want to develop a community to help with this."

**Current State:**
- Onboarding calls (high-touch)
- Documentation at marketingarchitect.ai
- Direct founder support
- Limited self-serve education

**Future Vision:**
- Comprehensive documentation
- Educational content (video, written)
- Community-driven support
- Peer learning (cracked marketers helping each other)

---

### The "Aha Moment"
> "When the user realizes that they can create short prompts, and the agentic system can build on top of the prompt, ensure it's strategically optimized if it's using pre-existing skills or workflows, and ensures it's brand aligned. This is when the clients usually go 'ahh shit.'"

**What Triggers the Aha Moment:**

**Before Understanding:**
- Thinking: "I need to write detailed prompts for every task"
- Assumption: "More input = better output"
- Mindset: "I'm prompting an AI tool"

**After Understanding:**
- Realization: "Short prompt → agentic system handles the rest"
- Discovery: "System uses pre-existing skills/workflows automatically"
- Recognition: "Brand alignment happens systematically, not manually"
- Insight: "The system is architected, not prompted"

**Example:**
- **User prompt:** "Analyze competitor positioning"
- **System execution:**
  1. Operations Manager recognizes task
  2. Delegates to Brand Analyst sub-agent
  3. Analyst uses "Conducting Competitive Research" skill
  4. Skill references brand strategy for alignment
  5. Leverages X-scraper MCP for data
  6. Returns strategically optimized, brand-aligned analysis

**The "Ahh Shit" Moment:**
- Realizing the system "thinks" strategically
- Understanding orchestration handles complexity
- Seeing brand consistency maintained automatically
- Recognizing this is infrastructure, not automation

---

## Value Realization: When ROI Becomes Clear

### Primary Value Metrics

#### 1. Content Volume
> "How much content they are creating"

**Measurement:**
- Quantity of outputs generated
- Range of content types produced
- Throughput compared to manual process

**Value:**
- 10x content production (typical claim for AI tools)
- But with systematic quality (not generic AI output)
- Brand-consistent at scale

---

#### 2. Time Savings
> "How much time we save them"

**Measurement:**
- Hours saved on research tasks
- Strategy sessions compressed from weeks to hours
- Content creation speed
- Reduced editing/rework time

**Value:**
- Compress weeks of strategic work into hours
- Research that took days now takes minutes
- More time for strategic thinking vs. execution

---

#### 3. Quality of Analysis
> "Quality we generate for them in performing high quality analysis"

**Measurement:**
- Depth of insights
- Strategic rigor
- Client feedback on deliverables
- Competitive advantage from proprietary analysis

**Value:**
- Analysis quality exceeds manual work
- Systematic methodology ensures rigor
- Citations and evidence trails (defensible to clients)
- Proprietary workflows = differentiated outputs

---

### Success Definition: Working ON vs. IN the System
> "They measure success I believe in time saved, and if they can invest time on working on the system vs. in the system."

**Working IN the System (Before):**
- Executing marketing tasks manually
- Writing copy
- Conducting research
- Creating content
- Tactical execution

**Working ON the System (After):**
- Designing workflows
- Building reusable skills
- Refining agent behaviors
- Optimizing processes
- Strategic architecture

**The Transformation:**
- From marketer executing tasks
- To Marketing Architect designing systems
- From labor to leverage
- From output to infrastructure

---

### Daily Improvement Flywheel
> "If every day they use the system it gets a little better and better"

**Compounding Value:**
- Skills improve with use
- Workflows get refined
- Brand alignment strengthens
- Agent behaviors optimize
- Knowledge base grows

**Why This Matters:**
- Traditional tools: flat value curve (same output daily)
- AMA: improving value curve (better outputs over time)
- Investment compounds (not consumed)
- System becomes strategic asset

---

## Customer Profile: Marketing Agency Owners

### Who They Are
> "Our current clients are marketing agency owners."

**Characteristics:**
- Run marketing agencies (not in-house marketers)
- Manage client work
- High output requirements
- Quality bar (client-facing deliverables)
- Time constraints (billable hours)

**Needs:**
- Scale output without sacrificing quality
- Differentiate from competitors
- Improve margins (do more with less time)
- Build proprietary capabilities

---

### Definition of "Extremely Happy"
> "They are extremely happy customers if they are using it daily to perform their marketing tasks quicker."

**Success Indicators:**

1. **Daily Usage**
   - Integrated into daily workflow
   - Not occasional tool use
   - Habitual reliance
   - Core infrastructure

2. **Performance Improvement**
   - Tasks completed quicker
   - Higher throughput
   - Maintained or improved quality
   - Better client deliverables

3. **Strategic Evolution**
   - Working ON the system (building workflows)
   - Creating custom skills
   - Designing proprietary processes
   - Competitive differentiation

---

## The Transformation: From Copywriter to System Designer

### Mindset Shift
> "Their work has changed since they focus more on designing the system than delivering copywriting etc."

**Before AMA:**
- Primary role: Copywriter, content creator, strategist
- Value delivery: Hands-on execution
- Skill: Marketing craft
- Output: Content, strategy, campaigns

**After AMA:**
- Primary role: Marketing Architect, system designer
- Value delivery: Infrastructure design
- Skill: Workflow architecture
- Output: Reusable systems that produce content

---

### Problem-Solving Paradigm Shift
> "Poor copy no longer becomes a question of writing better copy, but of designing a better system, adopting the perspective of the agent and understanding why it's not able to develop higher quality copy."

**Old Paradigm (Tactical):**
- Problem: Copy quality is poor
- Solution: Rewrite the copy better
- Mindset: Execution problem
- Approach: Try harder, write more drafts

**New Paradigm (Systematic):**
- Problem: Copy quality is poor
- Solution: Diagnose the system design issue
- Mindset: Architecture problem
- Approach:
  - Adopt agent perspective
  - Understand constraints
  - Refine workflow
  - Improve skill definition
  - Enhance context loading
  - Optimize strategy reference

**Example Troubleshooting:**

**Bad Copy Output**

**Old Response:**
- "The AI didn't write this well. Let me rewrite it."

**New Response:**
- "Why did the system produce this output?"
  - Did the agent have the right brand context?
  - Was the skill definition clear enough?
  - Did progressive disclosure load the right files?
  - Was the workflow optimized?
  - Did the sub-agent understand the task?

**System Improvement:**
- Refine skill: "Writing Brand-Consistent Content"
- Add context: Brand voice guidelines
- Update workflow: Better context loading
- Test: Generate again, evaluate improvement
- Iterate: System gets better permanently

---

### The Agent Perspective
> "Adopting the perspective of the agent and understanding why it's not able to develop higher quality copy."

**Empathy for the System:**
- Thinking like the Operations Manager
- Understanding sub-agent constraints
- Recognizing context limitations
- Designing for agent success

**System Design Questions:**
- "Does the agent have enough context?"
- "Is the skill definition clear?"
- "Are the instructions ambiguous?"
- "Does the workflow make sense?"
- "Is progressive disclosure working?"

**This is Marketing Architect thinking:**
- Not "the tool failed"
- But "how can I design the system better?"
- Ownership mindset (not user mindset)
- Iterative improvement (not one-off execution)

---

## Customer Journey Summary

### Phase 1: Discovery
- Find Agonda through community Slack channels
- Recognize need for systematic marketing operations
- Resonate with "Marketing Architect" identity
- Reach out or get referred

---

### Phase 2: Onboarding (Current)
- Schedule onboarding call with team
- Guided setup (clone repo, configure Claude Code)
- Run example workflows
- Experience "aha moment" (short prompts → strategic outputs)
- Set up brand strategy through interview process

---

### Phase 3: Learning & Integration
- Learn through calls with team (current)
- Study documentation (marketingarchitect.ai)
- Run research, strategy, content workflows
- Build custom skills and workflows
- Join community (future)

---

### Phase 4: Daily Usage & Mastery
- Use daily for marketing tasks
- Create content faster with higher quality
- Run research and strategy sessions
- Build proprietary workflows
- System improves with every use

---

### Phase 5: Transformation
- Shift from copywriter to system designer
- Work ON the system, not just IN it
- Adopt agent perspective for troubleshooting
- Build competitive moat through proprietary capabilities
- Become evangelist (word-of-mouth growth)

---

## Key Success Patterns

### What Makes Customers Successful

**1. Daily Habit Formation**
- Integrate into daily workflow immediately
- Use for actual work (not experimentation)
- Build muscle memory with commands
- Rely on system habitually

**2. System Building Mindset**
- Create custom skills and workflows
- Iterate and improve continuously
- Think architecturally (not tactically)
- Invest in infrastructure

**3. Community Engagement** (Future)
- Share workflows and patterns
- Learn from other Marketing Architects
- Contribute to framework evolution
- Identity reinforcement ("cracked marketer")

---

## Friction Points & Opportunities

### Current Friction
- Manual repo cloning (technical barrier)
- Requires onboarding calls (not scalable)
- Limited self-serve education
- Small community (early stage)

### Solutions In Progress
- CLI tool (`create-agonda-app`)
- Expanded documentation
- Educational content (video, written)
- Community building

### Future Opportunities
- Self-serve onboarding (reduce call dependency)
- Community support (peer-to-peer learning)
- Content library (example workflows, skills)
- Certification/recognition (Marketing Architect credential?)

---

**Phase 3 Complete.** Customer journey from discovery (community channels) → onboarding (white-glove calls) → daily usage (research/strategy/content) → transformation (copywriter → system designer).
