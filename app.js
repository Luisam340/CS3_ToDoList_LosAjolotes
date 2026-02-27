function isListEmpty() {
    const listTasks = document.getElementById("task-list");
    if (listTasks.childElementCount == 0) {
        listTasks.insertAdjacentHTML("beforeend", "<p>No tasks yet</p>");
        return true;
    }
    return false;
}

window.addEventListener("DOMContentLoaded", () => {
    isListEmpty();
});