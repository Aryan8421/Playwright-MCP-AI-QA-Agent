# Playwright MCP – AI-Powered QA Automation Agent

## Project Overview

This project explores the integration of AI agents, Large Language Models (LLMs), Model Context Protocol (MCP), and Playwright to support intelligent QA automation.

The objective is to build an AI-assisted QA workflow that can understand manual test scenarios, inspect web applications, identify reliable locators, generate Playwright TypeScript scripts, execute tests, and analyse test results.

The project has been explored in two phases:

- **Phase 1:** GitHub Copilot Agent Mode integrated with Playwright MCP.
- **Phase 2:** Local LLM integration using Ollama, Qwen 2.5 Coder, Cline, and Playwright MCP.

---

## Project Objectives

- Read and understand manual test scenarios.
- Understand application context and testing requirements.
- Interact with web applications through Playwright MCP.
- Inspect page elements and identify appropriate locators.
- Generate Playwright automation scripts using TypeScript.
- Execute generated test scripts using the Playwright Test Runner.
- Analyse execution results and identify missing assertions or failures.
- Explore local LLM-based AI agent development.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| GitHub Copilot Agent Mode | AI-assisted test analysis and automation |
| Cline | AI agent for local LLM integration |
| Ollama | Local LLM runtime |
| Qwen 2.5 Coder 7B | Local Large Language Model |
| Model Context Protocol (MCP) | Standardized connection between AI agents and tools |
| Playwright MCP | Browser interaction and page inspection |
| Playwright | Browser automation and test execution |
| TypeScript | Automation scripting language |
| Node.js | JavaScript runtime |
| VS Code | Development environment |
| Git & GitHub | Version control and project hosting |
| GitHub Actions | CI/CD test execution |

---

## Project Architecture

### Phase 1 – GitHub Copilot + Playwright MCP

GitHub Copilot Agent Mode was used to interpret testing instructions, inspect the application through MCP, generate Playwright TypeScript scripts, and analyse execution results.

**Workflow:**

QA Engineer → GitHub Copilot Agent → Playwright MCP → Web Application → Locator Inspection → TypeScript Test Generation → Playwright Test Runner → Test Results

### Phase 2 – Local LLM + Cline + Playwright MCP

A local AI agent environment was configured using Cline and Ollama.

**Workflow:**

QA Engineer → Cline AI Agent → Qwen 2.5 Coder (via Ollama) → Playwright MCP → Web Application → Browser Inspection

Playwright Test Runner is used separately to execute the generated TypeScript test scripts.

---

## Phase 1 – GitHub Copilot Agent Implementation

GitHub Copilot Agent Mode was used with Playwright MCP to demonstrate an AI-assisted QA automation workflow.

### Implemented Capabilities

1. AI Agent reads manual test scenarios.
2. AI Agent understands the application and testing context.
3. AI Agent uses MCP tools to inspect the browser.
4. AI Agent identifies appropriate page elements and locators.
5. AI Agent generates Playwright TypeScript test scripts.
6. AI Agent executes the generated tests using Playwright Test Runner.
7. AI Agent analyses execution results and reports gaps.

### Example – OrangeHRM Buzz Post Verification

The AI Agent performed the following scenario:

| No. | Test Step | Result |
|---|---|---|
| 1 | Navigate to OrangeHRM | Verified |
| 2 | Log in with supplied credentials | Verified |
| 3 | Open Buzz from the left sidebar | Verified |
| 4 | Verify Buzz Newsfeed and Most Recent Posts | Verified |
| 5 | Verify the post textbox | Verified |
| 6 | Enter a message and click Post | Verified |
| 7 | Verify the post appears in the feed | Verified |

**Automation Execution:**

- Test script: `buzz-post-verification.spec.ts`
- Execution result: 1 test passed.
- Assertion: Newly created post message was visible.
- Identified improvement: The test did not explicitly verify that the new post was the first item in the feed.

This demonstrates AI-assisted test execution and reporting, including identification of an assertion gap.

---

## Phase 2 – Local LLM Integration

The second phase focuses on exploring a locally hosted LLM and connecting it to an AI agent.

### Local AI Environment

**1. Ollama**

Configured Ollama to run Large Language Models locally.

**2. Qwen 2.5 Coder 7B**

Installed and tested the Qwen 2.5 Coder 7B model through Ollama.

**3. Cline**

Installed and configured Cline in VS Code as the AI agent.

**4. OpenAI-Compatible API Configuration**

Connected Cline to the local Ollama service using:

- Base URL: `http://localhost:11434/v1`
- Model: `qwen2.5-coder:7b`
- API Key: Local placeholder value (`ollama`)
- Context Window: 8192

**5. Playwright MCP**

Configured Playwright MCP as the browser interaction and inspection tool available to Cline.

### Current Configuration Status

| Component | Status |
|---|---|
| Ollama installation | Configured |
| Qwen 2.5 Coder 7B | Installed and tested |
| Cline extension | Installed |
| Cline – Ollama connection | Verified |
| Playwright MCP configuration | Connected |
| Playwright TypeScript project | Available |
| Local Playwright test execution | 8 tests passed |

Note: The local LLM environment is configured. The complete automated test-generation and execution workflow using Cline and Qwen is still under development.

---

## Project Structure

```text
Playwright_MCP/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── prompts/
│   ├── VerfiyBuzzPostVerification.txt
│   ├── addEmployeeVerification.txt
│   └── verifyPIMpage.txt
│
├── testcontexts/
│   └── webtestcontext.txt
│
├── tests/
│   ├── add-employee-verification.spec.ts
│   ├── admin-access.spec.ts
│   ├── buzz-post-verification.spec.ts
│   ├── example.spec.ts
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   └── verify-pim-page.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

---

## Prerequisites

- Node.js and npm
- Visual Studio Code
- Git
- Playwright
- Ollama
- Qwen 2.5 Coder 7B model
- Cline VS Code extension
- Playwright MCP server

GitHub Copilot Agent Mode is used for the first implementation phase.

---

## Local Project Setup

Clone the repository:

```bash
git clone https://github.com/Aryan8421/Playwright-MCP-AI-QA-Agent.git
```

Navigate to the project directory:

```bash
cd Playwright-MCP-AI-QA-Agent
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all Playwright tests:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

---

## GitHub Actions

The project includes a GitHub Actions workflow to execute Playwright tests when changes are pushed to the repository.

Browser execution is configured to support both environments:

- Local development: Headed browser.
- GitHub Actions: Headless browser.

CI execution and any remaining test failures are subject to validation in the GitHub Actions workflow.

---

## Planned Enhancements

- Complete the AI test-generation workflow using Cline and the local Qwen model.
- Read manual test cases automatically from prompt files.
- Improve application understanding through browser inspection.
- Generate stable Playwright locators.
- Generate TypeScript test scripts from manual scenarios.
- Execute generated scripts automatically.
- Analyse failures and suggest corrections.
- Improve assertion coverage and test reliability.
- Add AI-assisted test maintenance.
- Enhance reporting and CI/CD integration.

---

## Learning Outcomes

This project provides practical exposure to:

- Agentic AI concepts.
- Large Language Models (LLMs).
- Local LLM deployment using Ollama.
- AI agent configuration using Cline.
- Model Context Protocol (MCP).
- AI-assisted QA automation.
- Playwright with TypeScript.
- Browser inspection and locator strategies.
- Test execution and failure analysis.
- GitHub Actions and CI/CD.

---

## Project Goal

The long-term goal is to develop an AI-powered QA automation agent that can understand manual testing requirements, explore web applications, generate automation scripts, execute tests, and provide meaningful test execution reports.

**GitHub Repository:**  
https://github.com/Aryan8421/Playwright-MCP-AI-QA-Agent