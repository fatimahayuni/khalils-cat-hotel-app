document.addEventListener('DOMContentLoaded', function() {

    function main() {
      let todos = []; // store all the todos
  
      // event listeners
      const form = document.querySelector("#todo-form");
      form.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const taskNameInput = document.querySelector("#taskName")
        const taskName = taskNameInput.value;
  
        const taskUrgencySelect = document.querySelector("#taskUrgency");
        const taskUrgency = taskUrgencySelect.value;
  
        if (taskName) {
          addTodo(todos, taskName, taskUrgency);
          renderTodos(todos);
          taskNameInput.value = '';
        }
      });
  
      // Using event bubbling for the Edit and Delete buttons
      const todoList = document.querySelector("#todoList");
      todoList.addEventListener('click', function(event) {
        // Check if the clicked element has the 'edit-btn' class
        if (event.target.classList.contains('edit-btn')) {
  
          // get the taskId embedded in the button
          const todoId = parseInt(event.target.dataset.taskId);
          const todo = todos.find(t => t.id === todoId);
  
          const newName = prompt("Enter the new task name: ", todo.name);
          const newUrgency = prompt("Enter the new urgency:", todo.urgency);
          modifyTask(todos, todo.id, newName, newUrgency);
          renderTodos(todos);
  
        }
  
        // Check if the clicked element has the 'delete-btn' class
        if (event.target.classList.contains('delete-btn')) {
          const todoId = parseInt(event.target.dataset.taskId);
          const todo = todos.find(t => t.id === todoId);
  
          const toDelete = confirm("Are you sure you want to delete?");
          if (toDelete) {
            deleteTask(todos, todo.id);
            renderTodos(todos);
          }
        }
      });
  
  
      // add three todos
      addTodo(todos, "Walk the dog", 5);
      addTodo(todos, "Clean the room", 3);
      addTodo(todos, "Pay the bill", 2);
      renderTodos(todos);
    }
  
  
    function renderTodos(todos) {
      todoList.innerHTML = '';
      for (let todo of todos) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          ${todo.name} <span class="badge  bg-primary">${todo.urgency}</span>
          <button data-task-id=${todo.id} class="btn edit-btn btn-success btn-sm">Edit</button>
          <button data-task-id=${todo.id} class="btn delete-btn btn-danger btn-sm">Delete</button>
        `;
  
        todoList.appendChild(li);
      }
    }
  
    main();
  });
  