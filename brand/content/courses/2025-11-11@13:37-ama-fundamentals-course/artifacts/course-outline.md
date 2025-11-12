# AMA Fundamentals Course Outline

**Version:** 1.0
**Target Audience:** Marketing Architects, marketers new to AI workflows, non-developers
**Prerequisites:** None - starts from basics
**Total Estimated Time:** 12-15 hours

---

## Course Overview

<!-- We should also call out very early who this course is for, and who it's not for. Tell the guys who aren't willing to put in the hours to fuck off. 
 -->

### What You'll Learn

This course teaches you how to leverage the Agentic Marketing Architecture (AMA) methodology to build scalable, verifiable marketing systems using Claude Code. You'll start with foundational LLM concepts, understand why traditional approaches fail at scale, and progressively learn how to build a file-based marketing system that addresses these limitations.

<!-- This should be a banging video which shows the end state / outcome of a marketing architect leveraging their own AMA system to create highly impactful content. Everything else is then framed in the context of the marketer trying to achieve this cracked end state.
Example:
- Generating highly engaging copy for landing pages
- Generating image assets that self optimise
- Generating X-content and then scoring it according to their brand voice
- Generating on-brand visual assets
 -->

> 🎥 **VIDEO: Course Overview Demo**
> 
> A demonstration showing the end state of a marketing architect leveraging their own AMA system to create highly impactful content.
> 
> **Estimated Duration:** 2-3 minutes

**By the end of this course, you'll be able to:**
- Leverage LLMs to their full potential by working around their limitations 
- Design and implement self-optimising marketing systems
- Delegate work effectively to curated AI agents
- Manage and deploy your own marketing workflows
- Become a 100x marketer by leveraging the skills that engineers use

<!-- We need to call out the benchmarks that marketers care about when using AI systems. Probably similar to the agentic engineer. 
 -->

### Learning Philosophy

This course follows a **problem → solution** progression:
1. **Identify the problem** - What breaks when marketing scales with AI? 
2. **Learn the foundation** - File systems, structure, version control
3. **Build practical skills** - Commands, delegation, workflows
4. **Master orchestration** - Complex multi-agent coordination

<!-- I wonder if the best way to approach this is on an outcome basis. Trying to achieve X the normal way, implementing it in our system, and seeing the difference across benchmarks marketers care about. Allows us to introduce concepts better, with the competitive advantage they gain being the primary emphasis.  --> 

### Time Commitment

- **Estimated total:** 12-15 hours
- **Per class:** 60-90 minutes
- **Recommended pace:** 2-3 classes per week
- **Hands-on labs:** Most classes include practical exercises

---

## Course Structure

### Class 1: ChatGPT and introducing MCP

**Where they are currently at now**:
- Using ChatGPT / Claude or Gemini with a single chat window
- Being afraid to move out of the chat window to lose, separation anxiety from the chat window because it's your source of truth. 
- Noticed the chat window has grown

**Problem**:
- Lack of groundness, unable to reference real-world data (groundness - AI doesn't have the knowledge it needs to )
- Friction pulling in real world data (user has to copy paste info or drag files in )
- Not sure where your data is coming from - LLM might just hallucinate stuff

**Workaround**:
- Copy paste (friction)
- Chasing the best model thinking that a better model will somehow fix these issues

**Solution**:
- MCP brings context into your chat which is hard to replicate and bring in. Reduces friction, and engages with real data. 
- Pull in context that represents sources of truth. Your information is now data-backed, use DataForSEO. 

**Design attributes**:
- Groundeness (having the necessary knowledge / context to perform a task accurately)
- Friction (the amount of effort the user has to put in)

**Where they are by the end of this class**
- Now they are using MCPs with their chat window to pull in real-world data, reducing friction and increasing groundness

<!-- We should definitely try and achieve something that shows the limitation and pain points of the current solutions which allow us to introduce the problem of the context window. And context is a first-class citizen in this system and any AI system.  i.e. trying to develop a brand strategy across a single context chat window in ChatGPT. VS on our system while calling out the benchmarks marketers care about. --> 

**Key Concepts:**
- Model Hallucination 
- Model Context Protocol (MCP) as external environment interaction
---

### Class 2: Introducing the IDE

<!-- We need to call out that the file system, and subsequently the prompts, commands, agents, skills etc... now represents a marketers infrastructure. It's in their best interest to completely own this infrastructure as opposed to having it owned across different systems. In terms of a problem this can show the benefit of the file system over using fragmented prompts. Most people just use Notion. Call that out.  --> 


**Where they are currently at now**:
- Using ChatGPT with a single chat window, and pulling in context through MCP
- Quickly losing groundedness as the context window is running out
- Heavily invested in current chat window

**Problem**:
- Lack of scalability
- Performance degradation

**Workaround**:
- Claude Projects
- Summarise chats

**Solution**:
- Bring you into the IDE file system, introducing shared memory between human and AI with claude code

**Design attributes**:
- Groundeness 
- Friction
- Scalability 
- Visibility

**Where they are by the end of this class**
- They are using an agent integrated into an IDE (cursor or claude code or open code), and have set up MCP in the IDE. generating and using markdown files as a persistent and evolving knowledge base shared between the human and the agent. 

---

### Class 3: Commands as your prompt management

<!-- Again we need a problem here, maybe show the value of pulling everything into IDE (cursor/vs code)? and using IDE to perform marketing tasks and pulling in context from other systems to perform work. This should be the natural evolution before diving into this architecture. It's not solving a problem just yet. --> 


**Where they are currently at now**:
- Using Claude code, with MCPs, generating a lot of files in their root folders. Having to rewrite prompts from scratch now

**Problem**:
- Lack of maintainability 
- Friction due to the cold start problem

**Workaround**:
- Saving prompts as markdown files 
- Referencing entire folders for context without navigation

**Solution**:
- Introduce Claude Code commands, which allow for repeatable and reusable prompts. 

**Design attributes**:
- Maintainability
- Friction

**Where they are by the end of this class**
- They are using Claude code, with reusable commands that allow them to improve their system and become more efficient as the templatising effective prompts into commands. They may also be creating and templating new commands over time, showing the first part of the system getting more powerful over time

---

### Class 4: Sub-agents as context separation

**Where they are currently at now**:
- Lots of commands, creating their own prompt workflows to run workflows or phases, everything with a single agent in a single chat window

**Problem**:
- Context windows are running out very quickly
- Lack of visibility into your context window, what is cluttering the context window? 
- Lack of specialisation or personalization in the ways tasks are carried out

**Workaround**:
- Adding personality to the commands, 'you are a 10x copywriter' 
- Outputting artifacts in the root folder to reference later

**Solution**:
- Introduce Sub-agents, to separate context sessions with personality that is aligned with your 'way of working', and introduce context window visbility / viewing what clutters it

**Design attributes**:
- Granularity / controlability (controlling how work is being done)
- Scalability, how far you can take a single context window 

**Where they are by the end of this class**
- They are using commands to reference sub-agents in performing specific tasks within a workflow. Sub-agent prompts and commands are being generated and saved. 

---

### Class 5: AMA architecture and claude.md

<!-- Allows us to introduce prompt engineering and the ability to reuse commands. Calls out modularity and reusability --> 

**Where they are currently at now**:
- Lots of commands being run with specialised agents, the root folder is now being absolutely cluttered with no way to technically approach it. Commands reference MCPs, and agents

**Problem**:
- Lack of consistency in navigating the file system 
- A non-maintainable system, which struggles to scale as noise clutters the information hierarchy

**Workaround**:
- Utilising folders
- Ad-hoc naming conventions
- FINAL_DRAFT.md NEW_FINAL_DRAFT.md
- Loading in relevant context by referencing folders

**Solution**:
- Introduce Claude.md and the AMA framework for the information hierarchy of our system

**Design attributes**:
- Navigability
- Scalability
- Maintainability

**Where they are by the end of this class**
- They are using the AMA framework to manage their content, and managed information hierarchy 

---

### Class 6: Claude skills as SOPs

**Where they are currently at now**:
- They are using a light version of the AMA framework, using commands and agents to create high-quality work

**Problem**:
- Complex workflows are not properly represented through commands, multi-stage workflows or general attributes are hard to encode in the system
- Resources are hard to reference, may just drop examples into the root folder

**Workaround**:
- embedding knowledge of workflows into large command prompts
- sub-agent prompts are manipulated to perform commands with examples
- referencing files and ad-hoc workflows in the root folder

**Solution**:
- Introduce Claude's skills to perform complex workflows

**Design attributes**:
- Maintainable
- Modularity
- Powerful 

**Where they are by the end of this class**
- They are using the AMA framework to manage, along with skills and commands to perform complex powerful workflows in conjunction with MCPs

---

### Class 7: Orchestration

**Where they are currently at now**:
- Utilising claude code skills, and the AMA framework, to perform high quality work

**Problem**:
- The system lacks reliability as it is not properly adhering to the principles outlined in the AMA framework
- There is a high amount of overhead as you try and manage the system to function as expected

**Workaround**:
- You telling it which folders to create
- Being very explicit, telling it to fix itself

**Solution**:
- Introduce the plan-implement pattern, as well as the orchestration prompt and skill

**Design attributes**:
- Visibility - Work to be done
- Reliability
- Managerial Overhead

**Where they are by the end of this class**
- They are orchestrating entire workflows through domain driven commands that perform high quality brand aligned output


---
Git is a advanced concept that will be covered later on