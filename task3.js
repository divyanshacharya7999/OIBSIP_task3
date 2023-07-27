const taskInput = document.getElementById("taskInput");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const task = taskInput.value.trim();
    if (task === "") return;

    const taskObj = {
        task,
        dateAdded: new Date().toLocaleString(),
        completed: false,
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
}

function loadTasks() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((taskObj, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="${taskObj.completed ? "completed-task" : ""}">
                ${taskObj.task} (Added: ${taskObj.dateAdded})
            </span>
            <span class="delete-button" onclick="deleteTask(${index})">🗑️</span>
            <span class="delete-button" onclick="toggleComplete(${index})">${taskObj.completed ? "🔲" : "✅"}</span>
        `;

        if (taskObj.completed) {
            completedList.appendChild(listItem);
        } else {
            pendingList.appendChild(listItem);
        }
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
