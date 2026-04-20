import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";

test.describe("Toggle All", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();

    // Seed three items for toggle/filter tests
    await todoPage.addTodo("Item one");
    await todoPage.addTodo("Item two");
    await todoPage.addTodo("Item three");
  });

  test("TC-07: should toggle all todos to completed", async () => {
    await todoPage.toggleAll();

    await todoPage.expectTodoCompleted(0);
    await todoPage.expectTodoCompleted(1);
    await todoPage.expectTodoCompleted(2);
    await todoPage.expectItemsLeftText("0 items left");
  });

  test("TC-08: should toggle all back to active", async () => {
    // First toggle all to completed
    await todoPage.toggleAll();
    await todoPage.expectItemsLeftText("0 items left");

    // Then toggle all back to active
    await todoPage.toggleAll();

    await todoPage.expectTodoActive(0);
    await todoPage.expectTodoActive(1);
    await todoPage.expectTodoActive(2);
    await todoPage.expectItemsLeftText("3 items left");
  });
});

test.describe("Filtering", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();

    // Seed: 3 items, mark the second as completed
    await todoPage.addTodo("Active task one");
    await todoPage.addTodo("Completed task");
    await todoPage.addTodo("Active task two");
    await todoPage.toggleTodo(1); // Mark "Completed task" as done
  });

  test("TC-09: should show only active items when 'Active' filter is applied", async () => {
    await todoPage.filterBy("Active");

    await todoPage.expectTodoCount(2);
    await todoPage.expectAllTodoTexts(["Active task one", "Active task two"]);
  });

  test("TC-10: should show only completed items when 'Completed' filter is applied", async () => {
    await todoPage.filterBy("Completed");

    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, "Completed task");
  });

  test("TC-11: should show all items when 'All' filter is applied", async () => {
    // First switch to Active, then back to All
    await todoPage.filterBy("Active");
    await todoPage.expectTodoCount(2);

    await todoPage.filterBy("All");

    await todoPage.expectTodoCount(3);
    await todoPage.expectAllTodoTexts([
      "Active task one",
      "Completed task",
      "Active task two",
    ]);
  });
});

test.describe("Clear Completed", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("TC-12: should remove only completed items when clearing", async () => {
    await todoPage.addTodo("Keep this");
    await todoPage.addTodo("Remove this");
    await todoPage.addTodo("Keep this too");

    await todoPage.toggleTodo(1); // Complete "Remove this"
    await todoPage.clearCompleted();

    await todoPage.expectTodoCount(2);
    await todoPage.expectAllTodoTexts(["Keep this", "Keep this too"]);
    await todoPage.expectItemsLeftText("2 items left");
  });

  test("TC-13: 'Clear completed' button should only appear when completed items exist", async ({
    page,
  }) => {
    await todoPage.addTodo("A task");

    // No completed items yet — button should be hidden
    await expect(todoPage.clearCompletedButton).toBeHidden();

    // Complete the task — button should appear
    await todoPage.toggleTodo(0);
    await expect(todoPage.clearCompletedButton).toBeVisible();

    // Clear it — button should hide again
    await todoPage.clearCompleted();
    await expect(todoPage.clearCompletedButton).toBeHidden();
  });
});
