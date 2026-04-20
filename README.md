# TodoMVC — Playwright Smoke Test Suite

Automated smoke test suite for the [TodoMVC](https://demo.playwright.dev/todomvc) application, built with **Playwright** and **TypeScript**.

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install
```

## Run Tests

```bash
# Run the full suite across all browsers (Chromium, Firefox, WebKit)
npx playwright test

# Run on a single browser
npx playwright test --project=chromium

# Run with the interactive UI
npx playwright test --ui

# Run a specific test file
npx playwright test tests/todo-crud.spec.ts
```

## View Report

After a test run, open the HTML report:

```bash
npx playwright show-report
```

## Project Structure

```
├── playwright.config.ts       # Playwright configuration
├── pages/
│   └── todo-page.ts           # Page Object Model (selectors + actions)
├── tests/
│   ├── todo-crud.spec.ts      # TC-01 to TC-06: Create, complete, edit, delete
│   ├── todo-filtering.spec.ts # TC-07 to TC-13: Toggle all, filters, clear completed
│   ├── todo-persistence.spec.ts # TC-14: LocalStorage persistence
│   └── todo-edge-cases.spec.ts  # TC-15 to TC-17: Empty input, whitespace, edit-to-empty
├── TEST_CASES.md              # Test case document (Deliverable 1)
└── README.md                  # This file
```

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Page Object Model** | Encapsulates selectors and actions for reusability and maintainability |
| **No `waitForTimeout`** | Uses Playwright's built-in auto-waiting and assertion retries |
| **Tests split by domain** | Mirrors the test case document; easy to navigate and extend |
| **Cross-browser** | Runs on Chromium, Firefox, and WebKit for confidence |

## Test Case Document

See [TEST_CASES.md](./TEST_CASES.md) for the full smoke test case document with preconditions, steps, and expected results for all 17 test cases.
