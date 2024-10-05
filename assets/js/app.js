document.addEventListener("DOMContentLoaded", function () {
    // Selectors
    const err = document.querySelector(".err");
    const inputTask = document.querySelector("input[type='text']");
    const addTaskBtn = document.getElementById("add-task");
    const inputSearch = document.getElementById("search-input");
    const taskList = document.querySelector(".task-list");
    const clearAllBtn = document.querySelector(".clear-all");
  
    // Event Listener for adding a task
    addTaskBtn.addEventListener("click", function (e) {
      e.preventDefault();
  
      const taskText = inputTask.value.trim();
  
      if (taskText !== "") {
        const newLi = document.createElement("li");
        newLi.className = "task";
  
        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.disabled = true;
        taskInput.className = "disabled-task";
        taskInput.value = taskText;
  
        newLi.appendChild(taskInput);
  
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "deleteBtn";
  
        newLi.appendChild(deleteBtn);
  
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.className = "editBtn";
  
        newLi.appendChild(editBtn);
  
        taskList.appendChild(newLi);
  
        inputTask.value = "";
        err.style.display = "none";  // Hide error message when a valid task is added
      } else {
        err.style.display = "block";
        setTimeout(() => {
          err.style.display = "none";
        }, 2000);
      }
    });
  
    // Event Listener for deleting a task
    taskList.addEventListener("click", function (e) {
      if (e.target.classList.contains("deleteBtn")) {
        const taskItem = e.target.closest(".task");
        if (taskItem) {
          taskItem.remove();
        }
      }
    });
  
    // Event Listener for clearing all tasks
    clearAllBtn.addEventListener("click", function () {
      taskList.innerHTML = "";
    });
  });
  