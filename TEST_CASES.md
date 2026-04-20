# TodoMVC — Smoke Test Suite

**Application Under Test:** https://demo.playwright.dev/todomvc  
**Author:** Miodrag Golubovikj  
**Date:** April 2026

---

## 1. CRUD Operations

### TC-01: Create a single todo

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | App is loaded with no existing todos                                |
| **Steps**         | 1. Type "Buy groceries" in the input field                          |
|                   | 2. Press Enter                                                      |
| **Expected**      | - A todo item "Buy groceries" appears in the list                   |
|                   | - Counter displays "1 item left"                                    |

---

### TC-02: Create multiple todos in order

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | App is loaded with no existing todos                                |
| **Steps**         | 1. Add "Buy groceries"                                              |
|                   | 2. Add "Walk the dog"                                               |
|                   | 3. Add "Read a book"                                                |
| **Expected**      | - All three items appear in the list in insertion order              |
|                   | - Counter displays "3 items left"                                   |

---

### TC-03: Mark a todo as completed

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | Two todos exist: "Buy groceries", "Walk the dog"                    |
| **Steps**         | 1. Click the checkbox next to "Buy groceries"                       |
| **Expected**      | - "Buy groceries" has strikethrough styling (completed class)       |
|                   | - "Walk the dog" remains active                                     |
|                   | - Counter displays "1 item left"                                    |

---

### TC-04: Unmark a completed todo back to active

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | One todo "Buy groceries" exists and is marked completed             |
| **Steps**         | 1. Click the checkbox next to "Buy groceries" again                 |
| **Expected**      | - "Buy groceries" no longer has strikethrough styling               |
|                   | - Counter displays "1 item left"                                    |

---

### TC-05: Edit a todo via double-click

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | One todo "Walk the dog" exists                                      |
| **Steps**         | 1. Double-click on "Walk the dog" label                             |
|                   | 2. Clear the text and type "Walk the cat"                           |
|                   | 3. Press Enter                                                      |
| **Expected**      | - Todo text updates to "Walk the cat"                               |
|                   | - Total count remains 1                                              |

---

### TC-06: Delete a todo via the destroy button

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | Two todos exist: "Buy groceries", "Walk the dog"                    |
| **Steps**         | 1. Hover over "Buy groceries"                                       |
|                   | 2. Click the × (destroy) button                                     |
| **Expected**      | - "Buy groceries" is removed from the list                          |
|                   | - Only "Walk the dog" remains                                        |
|                   | - Counter displays "1 item left"                                    |

---

## 2. Toggle All

### TC-07: Toggle all todos to completed

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | Three active todos exist                                             |
| **Steps**         | 1. Click the "toggle all" chevron (▾) next to the input             |
| **Expected**      | - All three todos have completed styling                             |
|                   | - Counter displays "0 items left"                                    |

---

### TC-08: Toggle all back to active

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | Three completed todos exist (via previous toggle-all)               |
| **Steps**         | 1. Click the "toggle all" chevron again                              |
| **Expected**      | - All three todos return to active state                             |
|                   | - Counter displays "3 items left"                                    |

---

## 3. Filtering

### TC-09: Filter — Active

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | Three todos exist; one ("Completed task") is marked completed       |
| **Steps**         | 1. Click the "Active" filter link in the footer                     |
| **Expected**      | - Only the two active todos are visible                              |
|                   | - The completed todo is hidden                                       |

---

### TC-10: Filter — Completed

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | Three todos exist; one ("Completed task") is marked completed       |
| **Steps**         | 1. Click the "Completed" filter link in the footer                  |
| **Expected**      | - Only "Completed task" is visible                                   |
|                   | - Active todos are hidden                                            |

---

### TC-11: Filter — All

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | "Active" filter is currently selected; mixed todo states exist      |
| **Steps**         | 1. Click the "All" filter link in the footer                        |
| **Expected**      | - All three todos are visible regardless of state                    |

---

## 4. Clear Completed

### TC-12: Clear completed removes only finished items

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | Three todos exist; one is marked completed                          |
| **Steps**         | 1. Click the "Clear completed" button                               |
| **Expected**      | - The completed todo is removed                                      |
|                   | - Two active todos remain                                            |
|                   | - Counter displays "2 items left"                                    |

---

### TC-13: "Clear completed" button visibility

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | One active todo exists                                               |
| **Steps**         | 1. Verify "Clear completed" button is NOT visible                   |
|                   | 2. Mark the todo as completed                                       |
|                   | 3. Verify "Clear completed" button IS visible                       |
|                   | 4. Click "Clear completed"                                          |
|                   | 5. Verify "Clear completed" button is NOT visible again             |
| **Expected**      | - Button only appears when ≥ 1 completed item exists                |

---

## 5. Persistence

### TC-14: Todos persist after page reload

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | App is loaded with no existing todos                                |
| **Steps**         | 1. Add "Persistent task one"                                        |
|                   | 2. Add "Persistent task two"                                        |
|                   | 3. Mark "Persistent task two" as completed                          |
|                   | 4. Reload the page (F5 / browser refresh)                           |
| **Expected**      | - Both todos still appear                                            |
|                   | - "Persistent task one" is active                                    |
|                   | - "Persistent task two" is completed                                 |
|                   | - Counter displays "1 item left"                                     |

---

## 6. Edge Cases

### TC-15: Empty input does not create a todo

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | App is loaded with no existing todos                                |
| **Steps**         | 1. Leave the input field empty                                      |
|                   | 2. Press Enter                                                      |
| **Expected**      | - No todo item is created                                            |
|                   | - Footer (counter/filters) does not appear                           |

---

### TC-16: Whitespace-only input is ignored

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | App is loaded with no existing todos                                |
| **Steps**         | 1. Type "   " (spaces only) into the input                         |
|                   | 2. Press Enter                                                      |
| **Expected**      | - No todo item is created                                            |
|                   | - Footer does not appear                                             |

---

### TC-17: Editing a todo to an empty string deletes it

| Field             | Detail                                                              |
|-------------------|---------------------------------------------------------------------|
| **Preconditions** | One todo "Will be deleted" exists                                   |
| **Steps**         | 1. Double-click on "Will be deleted" to edit                        |
|                   | 2. Clear the text (empty string)                                    |
|                   | 3. Press Enter                                                      |
| **Expected**      | - The todo is removed from the list                                  |
|                   | - Todo count is 0                                                    |
