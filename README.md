Playwright MCP – AI-Powered QA Automation Agent

Project Overview

This project explores the integration of AI agents with browser automation to support software quality assurance activities.

It combines Cline, Ollama, Qwen 2.5 Coder, Playwright MCP, and Playwright with TypeScript.

The objective is to build an AI-assisted QA workflow that can inspect web applications, understand page elements, suggest reliable locators, and support automated test development.

Technology Stack

| Technology             | Purpose |
|---                     | ---|
| Cline                  | AI coding agent |
| Ollama                 | Local LLM runtime |
| Qwen 2.5 Coder (7B)    | Local AI model |
| Playwright MCP         | Browser interaction and inspection |
| Playwright             | Browser automation and test execution |
| TypeScript             | Automation scripting |
| Node.js                | JavaScript runtime |
| Git & GitHub           | Version control |

Project Architecture


                 QA Engineer
                      |
                      v
                    Cline
                  (AI Agent)
                      |
                      v
              Qwen 2.5 Coder
                (via Ollama)
                      |
                      v
              Playwright MCP
                      |
                      v
              Web Application
                      |
                      v
           Browser Inspection
                      |
                      v
           Playwright + TypeScript
                      |
                      v
               Test Execution


 Project Structure

## Project Structure

```text
Playwright_MCP/
│
├── .github/
│   └── workflows/
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
└── playwright.config.ts
```


Prerequisites

- Node.js and npm
- Visual Studio Code
- Playwright
- Ollama
- Qwen 2.5 Coder 7B model
- Cline VS Code extension
- Playwright MCP server

Setup Instructions

1. Clone the repository

bash
git clone https://github.com/Aryan8421/Playwright-MCP-AI-QA-Agent.git


2. Navigate to the project

bash
cd Playwright-MCP-AI-QA-Agent

3. Install dependencies

bash
npm install


4. Install Playwright browsers

bash
npx playwright install


5. Run Playwright tests

bash
npx playwright test


6. View the test report

bash
npx playwright show-report


Current Implementation

- Playwright TypeScript project setup.
- Local LLM configuration using Ollama and Qwen 2.5 Coder.
- Cline configured as the AI agent.
- Playwright MCP server connected to Cline.
- Browser navigation and accessibility snapshot tool calls.
- Test scenarios and reusable prompt files.
- GitHub version control.

Future Enhancements

- AI-assisted test case generation from manual scenarios.
- Automatic locator identification using browser snapshots.
- TypeScript test script generation.
- Automated test execution and failure analysis.
- AI-assisted test maintenance and locator correction.
- Enhanced reporting and CI/CD integration.

Project Goal

To explore how AI agents and Model Context Protocol (MCP) can assist QA engineers in reducing repetitive testing activities and improving automation efficiency.


**Author:** Aryan8421

**GitHub:** [Aryan8421](https://github.com/Aryan8421)