document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const todoList = document.getElementById("todo-list");
  const taskCount = document.getElementById("task-count");
  const completeAllButton = document.getElementById("complete-all-button");
  const clearAllButton = document.getElementById("clear-all-button");
  const filterAllButton = document.getElementById("filter-all");
  const filterCompletedButton = document.getElementById("filter-completed");
  const filterUncompletedButton = document.getElementById("filter-uncompleted");

  let tasks = [
    { text: "task1", completed: false },
    { text: "task2", completed: true },
  ];
  let filter = "all";

  function renderTasks() {
    todoList.innerHTML = "";
    tasks
      .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "uncompleted") return !task.completed;
        return true;
      })
      .forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `todo-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
            <div>
              <div class="checkbox-container">
                <input type="checkbox" id="task${index}" ${
          task.completed ? "checked" : ""
        } data-index=${index}>
                <label for="task${index}">${task.text}</label>
              </div>
              <button data-index=${index} class="remove-btn">x</button>
            </div>
          `;
        todoList.appendChild(li);
      });
    updateTaskCount();
  }

  function updateTaskCount() {
    const count = tasks.filter((task) => !task.completed).length;
    taskCount.textContent = `${count} tasks left`;
  }

  addButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim(); //spaces from both ends gets trimmed and only value is stored
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      todoInput.value = "";
      renderTasks();
    }
  });

  todoList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const index = event.target.dataset.index;
      tasks.splice(index, 1);
      renderTasks();
    } else if (event.target.tagName === "INPUT") {
      const index = event.target.dataset.index;
      tasks[index].completed = event.target.checked;
      renderTasks();
    }
  });

  completeAllButton.addEventListener("click", () => {
    tasks.forEach((task) => (task.completed = true));
    renderTasks();
  });

  clearAllButton.addEventListener("click", () => {
    tasks = [];
    renderTasks();
  });

  filterAllButton.addEventListener("click", () => {
    filter = "all";
    renderTasks();
  });

  filterCompletedButton.addEventListener("click", () => {
    filter = "completed";
    renderTasks();
  });

  filterUncompletedButton.addEventListener("click", () => {
    filter = "uncompleted";
    renderTasks();
  });

  renderTasks();
});
