import { type Locator, type Page, expect } from "@playwright/test";

/**
 * Page Object Model for the TodoMVC application.
 *
 * Encapsulates all selectors and actions to keep tests clean,
 * readable, and maintainable.
 */
export class TodoPage {
  // --- Locators ---
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly clearCompletedButton: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.getByTestId("todo-item");
    this.todoCount = page.getByTestId("todo-count");
    this.toggleAllCheckbox = page.getByLabel("Mark all as complete");
    this.clearCompletedButton = page.getByRole("button", {
      name: "Clear completed",
    });
    this.filterAll = page.getByRole("link", { name: "All" });
    this.filterActive = page.getByRole("link", { name: "Active" });
    this.filterCompleted = page.getByRole("link", { name: "Completed" });
    this.footer = page.locator(".footer");
  }

  // --- Navigation ---

  /** Navigate to the TodoMVC app and ensure it's loaded. */
  async goto(): Promise<void> {
    await this.page.goto("https://demo.playwright.dev/todomvc/#/");
    await this.newTodoInput.waitFor();
  }

  // --- Actions ---

  /** Add a new todo by typing into the input and pressing Enter. */
  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press("Enter");
  }

  /**
   * Edit an existing todo item by double-clicking its label,
   * clearing the field, typing the new text, and pressing Enter.
   */
  async editTodo(index: number, newText: string): Promise<void> {
    const todoItem = this.todoItems.nth(index);
    await todoItem.getByTestId("todo-title").dblclick();

    const editInput = todoItem.getByRole("textbox", { name: "Edit" });
    await editInput.fill(newText);
    await editInput.press("Enter");
  }

  /** Toggle the completed state of a specific todo by clicking its checkbox. */
  async toggleTodo(index: number): Promise<void> {
    const checkbox = this.todoItems.nth(index).getByRole("checkbox");
    await checkbox.click();
  }

  /** Delete a specific todo by hovering and clicking the destroy button. */
  async deleteTodo(index: number): Promise<void> {
    const todoItem = this.todoItems.nth(index);
    await todoItem.hover();
    await todoItem.getByRole("button", { name: "Delete" }).click();
  }

  /** Toggle all todos to completed (or back to active). */
  async toggleAll(): Promise<void> {
    await this.toggleAllCheckbox.click();
  }

  /** Click the \"Clear completed\" button. */
  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  /** Apply a filter by clicking the corresponding link. */
  async filterBy(filter: "All" | "Active" | "Completed"): Promise<void> {
    const links = {
      All: this.filterAll,
      Active: this.filterActive,
      Completed: this.filterCompleted,
    };
    await links[filter].click();
  }

  // --- Assertions ---

  /** Assert the exact number of visible todo items. */
  async expectTodoCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }

  /** Assert the text of a specific todo item at the given index. */
  async expectTodoText(index: number, text: string): Promise<void> {
    await expect(this.todoItems.nth(index)).toHaveText(text);
  }

  /** Assert the text content of the items-left counter (e.g. \"3 items left\"). */
  async expectItemsLeftText(text: string): Promise<void> {
    await expect(this.todoCount).toHaveText(text);
  }

  /** Assert that a specific todo item has the \"completed\" class. */
  async expectTodoCompleted(index: number): Promise<void> {
    await expect(this.todoItems.nth(index)).toHaveClass(/completed/);
  }

  /** Assert that a specific todo item does NOT have the \"completed\" class. */
  async expectTodoActive(index: number): Promise<void> {
    await expect(this.todoItems.nth(index)).not.toHaveClass(/completed/);
  }

  /** Assert the exact texts of all visible todo items, in order. */
  async expectAllTodoTexts(texts: string[]): Promise<void> {
    await expect(this.todoItems).toHaveText(texts);
  }
}
