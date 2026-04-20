import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";

test.describe("CRUD Operations", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("TC-01: should create a single todo", async () => {
    await todoPage.addTodo("Buy groceries");

    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, "Buy groceries");
    await todoPage.expectItemsLeftText("1 item left");
  });

  test("TC-02: should create multiple todos in order", async () => {
    const items = ["Buy groceries", "Walk the dog", "Read a book"];

    for (const item of items) {
      await todoPage.addTodo(item);
    }

    await todoPage.expectTodoCount(3);
    await todoPage.expectAllTodoTexts(items);
    await todoPage.expectItemsLeftText("3 items left");
  });

  test("TC-03: should mark a todo as completed", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.addTodo("Walk the dog");

    await todoPage.toggleTodo(0);

    await todoPage.expectTodoCompleted(0);
    await todoPage.expectTodoActive(1);
    await todoPage.expectItemsLeftText("1 item left");
  });

  test("TC-04: should unmark a completed todo back to active", async () => {
    await todoPage.addTodo("Buy groceries");

    // Complete then uncomplete
    await todoPage.toggleTodo(0);
    await todoPage.expectTodoCompleted(0);

    await todoPage.toggleTodo(0);
    await todoPage.expectTodoActive(0);
    await todoPage.expectItemsLeftText("1 item left");
  });

  test("TC-05: should edit a todo via double-click", async () => {
    await todoPage.addTodo("Walk the dog");

    await todoPage.editTodo(0, "Walk the cat");

    await todoPage.expectTodoText(0, "Walk the cat");
    await todoPage.expectTodoCount(1);
  });

  test("TC-06: should delete a todo via the destroy button", async () => {
    await todoPage.addTodo("Buy groceries");
    await todoPage.addTodo("Walk the dog");

    await todoPage.deleteTodo(0);

    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, "Walk the dog");
    await todoPage.expectItemsLeftText("1 item left");
  });
});
