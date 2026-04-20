import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";

test.describe("Edge Cases", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("TC-15: pressing Enter with empty input should not create a todo", async () => {
    await todoPage.newTodoInput.press("Enter");

    await todoPage.expectTodoCount(0);
    await expect(todoPage.footer).toBeHidden();
  });

  test("TC-16: whitespace-only input should not create a todo", async () => {
    await todoPage.addTodo("   ");

    await todoPage.expectTodoCount(0);
    await expect(todoPage.footer).toBeHidden();
  });

  test("TC-17: editing a todo to an empty string should delete it", async () => {
    await todoPage.addTodo("Will be deleted");
    await todoPage.expectTodoCount(1);

    await todoPage.editTodo(0, "");

    await todoPage.expectTodoCount(0);
  });
});
