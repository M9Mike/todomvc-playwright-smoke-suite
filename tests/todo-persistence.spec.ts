import { test } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";

test.describe("Persistence", () => {
  test("TC-14: todos should persist after page reload", async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    // Add items and complete one
    await todoPage.addTodo("Persistent task one");
    await todoPage.addTodo("Persistent task two");
    await todoPage.toggleTodo(1); // Mark second as completed

    // Reload the page
    await page.reload();

    // Verify state survived the reload
    await todoPage.expectTodoCount(2);
    await todoPage.expectTodoText(0, "Persistent task one");
    await todoPage.expectTodoText(1, "Persistent task two");
    await todoPage.expectTodoActive(0);
    await todoPage.expectTodoCompleted(1);
    await todoPage.expectItemsLeftText("1 item left");
  });
});
