const listTasks = document.getElementById("task-list");
const taskButton = document.getElementById("add-task-btn");
let deleteButton;

let listCounter = 1;
function isListEmpty() {
  if (listTasks.childElementCount == 0) {
    listTasks.innerHTML = "<p id='empty-message'>No tasks yet</p>";
    return true;
  }
  return false;
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
    listCounter++;
    inputTask.value = "";
    if (emptyMessage) {
      emptyMessage.remove();
    }
  }
}

taskButton.addEventListener("click", (event) => {
  addTask();
});

function deleteTask(id) {
  let taskItem = document.getElementById(id);
  taskItem.remove();
  isListEmpty();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-btn");
  if (!button) return;
  const taskList = button.closest(".task-item");
  deleteTask(taskList.id);
});

function markAsCompleted(id) {
  let taskItem = document.getElementById(id);
  if (taskItem.style.textDecoration === "line-through") {
    taskItem.style.textDecoration = "none";
    taskItem.style.color = "black";
  } else {
    taskItem.style.textDecoration = "line-through";
    taskItem.style.color = "gray";
  }
}
document.addEventListener("click", (event) => {
  const task = event.target.closest(".task-item");
  if (!task) return;
  console.log(task.id);
  markAsCompleted(task.id);
});
