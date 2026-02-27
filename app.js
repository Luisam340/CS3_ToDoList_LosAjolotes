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
        "<div class='mark'>" +
        "<span id='task-text-" +
        listCounter +
        "' class='task-text'>" +
        inputTask.value +
        "</span>" +
        "<div style='display: flex; gap: 0.5rem;'>" +
        "<button id='edit-task-btn-" +
        listCounter +
        "' class='edit-btn'>✎</button>" +
        "<button id='delete-task-btn-" +
        listCounter +
        "' class='delete-btn'>✕</button>" +
        "</div>" +
        "</div>" +
        "</li>",
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
  const deleteButton = event.target.closest(".delete-btn");
  if (deleteButton) {
    const taskList = deleteButton.closest(".task-item");
    deleteTask(taskList.id);
    return;
  }
  const editButton = event.target.closest(".edit-btn");
  if (editButton) {
    const taskList = editButton.closest(".task-item");
    editTask(taskList.id);
    return;
  }
  const taskText = event.target.closest(".task-text");
  if (taskText) {
    const taskList = taskText.closest(".task-item");
    markAsCompleted(taskList.id);
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

function editTask(id) {
  const taskItem = document.getElementById(id);
  const taskText = taskItem.querySelector(".task-text");
  const currentText = taskText.textContent;
  
  // create inline input element
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-input";

  taskText.replaceWith(input);
  input.focus();

  function finishEdit() {
    if (input.value.trim() !== "") {
      taskText.textContent = input.value.trim();
    }
    input.replaceWith(taskText);
  }

  input.addEventListener("blur", finishEdit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      finishEdit();
    }
  });
}

function updateCounter() {
  const total = listTasks.querySelectorAll(".task-item").length;

  taskCounter.innerHTML = listCompletedCounter + " of " + total + " completed";
}
