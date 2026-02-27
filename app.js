const listTasks = document.getElementById("task-list");
const taskButton = document.getElementById("add-task-btn");
function isListEmpty() {
  if (listTasks.childElementCount == 0) {
    listTasks.insertAdjacentHTML(
      "beforeend",
      "<p id='empty-message'>No tasks yet</p>",
    );
    return true;
  }
  return false;
}

window.addEventListener("DOMContentLoaded", () => {
  isListEmpty();
});

function addTask() {
  let inputTask = document.getElementById("task-input").value;
  const emptyMessage = document.getElementById("empty-message");
  if (inputTask.trim() !== "") {
    listTasks.insertAdjacentHTML("beforeend", "<li>" + inputTask + "</li>");
    if (emptyMessage) {
      emptyMessage.remove();
    }
  }
}

taskButton.addEventListener("click", (event) => {
  addTask();
});
