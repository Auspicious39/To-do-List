const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <div class="task-info">
        <span>${task.text}</span>
        <span class="task-category">${task.category}</span>
      </div>
      <div>
        <button class="check-btn" data-index="${index}">✓</button>
        <button class="delete-btn" data-index="${index}">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  // Check button
  document.querySelectorAll(".check-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });
  });

  // Delete button
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const category = categorySelect.value;

  if (text === "") return;

  tasks.push({ text, category, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

renderTasks();