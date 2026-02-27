const listTasks = document.getElementById("task-list");
const taskButton = document.getElementById("add-task-btn");
let taskCounter = document.getElementById("task-counter");
let listCounter = 1;
let listCompletedCounter = 0;
function isListEmpty() {
  if (listTasks.childElementCount == 0) {
    listTasks.innerHTML = "<p id='empty-message'>No tasks yet</p>";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  isListEmpty();
});

function addTask() {
  let inputTask = document.getElementById("task-input");
  const emptyMessage = document.getElementById("empty-message");
  if (inputTask.value.trim() !== "") {
    listTasks.insertAdjacentHTML(
      "beforeend",
      "<li id='task-item-" +
        listCounter +
        "' class='task-item'>" +
        inputTask.value +
        " <button id='delete-task-btn-" +
        listCounter +
        "' class='delete-btn'>✕</button></li>",
    );
    inputTask.value = "";
    if (emptyMessage) {
      emptyMessage.remove();
    }
    updateCounter();
    listCounter++;
  }
}

taskButton.addEventListener("click", (event) => {
  addTask();
});

function deleteTask(id) {
  let taskItem = document.getElementById(id);
  taskItem.remove();
  isListEmpty();
  updateCounter();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-btn");
  if (button) {
    const taskList = button.closest(".task-item");
    deleteTask(taskList.id);
    return;
  }
  const task = event.target.closest(".task-item");
  if (task) {
    markAsCompleted(task.id);
    return;
  }
});

function markAsCompleted(id) {
  let taskItem = document.getElementById(id);

  taskItem.classList.toggle("completed");

  if (taskItem.classList.contains("completed")) {
    listCompletedCounter++;
  } else {
    listCompletedCounter--;
  }

  updateCounter();
}

function updateCounter() {
  const total = listTasks.querySelectorAll(".task-item").length;

  taskCounter.innerHTML = listCompletedCounter + " of " + total + " completed";
}
