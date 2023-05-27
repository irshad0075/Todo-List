const todos = [];

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);

todoButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newTodo = { text: todoInput.value, completed: false };
  todos.push(newTodo);
  saveLocalTodos(todos);
  addTodoToDOM(newTodo);
  todoInput.value = "";
});

todoList.addEventListener("click", (event) => {
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("slide");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    const todoText = todo.querySelector(".todo-item").innerText;
    const index = todos.findIndex((todo) => todo.text === todoText);
    todos[index].completed = !todos[index].completed;
    saveLocalTodos(todos);
  }
});

filterOption.addEventListener("change", (event) => {
  const value = event.target.value;
  const filteredTodos = todos.filter((todo) => {
    if (value === "all") {
      return true;
    } else if (value === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });
  todoList.innerHTML = "";
  filteredTodos.forEach((todo) => {
    addTodoToDOM(todo);
  });
});

function addTodoToDOM(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todo.completed) {
    todoDiv.classList.add("completed");
  }
  const newTodo = document.createElement("li");
  newTodo.innerText = todo.text;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

function saveLocalTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    todos.push(...storedTodos);
    todos.forEach((todo) => {
      addTodoToDOM(todo);
    });
  }
}

function removeLocalTodos(todo) {
  const todoText = todo.querySelector(".todo-item").innerText;
  const index = todos.findIndex((todo) => todo.text === todoText);
  todos.splice(index, 1);
  saveLocalTodos(todos);
}
