//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption= document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
    event.preventDefault(); //prevent form from submitting

    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //Checkmark BUTTON
    const completedButtoon = document.createElement('button');
    completedButtoon.innerHTML = '<i class="fas fa-check"></i>';
    completedButtoon.classList.add("complete-btn");
    todoDiv.appendChild(completedButtoon);

    //Trash BUTTON
    const trashButtoon = document.createElement('button');
    trashButtoon.innerHTML = '<i class="fas fa-trash"></i>';
    trashButtoon.classList.add("trash-btn");
    todoDiv.appendChild(trashButtoon);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    //Delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
        };

    //Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo (e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } 
                else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
                } else {
                todo.style.display = "none";
                }
    }});
}

function saveLocalTodos(todo) {
    //Check if already stuff in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //Check if already stuff in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo) {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Checkmark BUTTON
        const completedButtoon = document.createElement('button');
        completedButtoon.innerHTML = '<i class="fas fa-check"></i>';
        completedButtoon.classList.add("complete-btn");
        todoDiv.appendChild(completedButtoon);

        //Trash BUTTON
        const trashButtoon = document.createElement('button');
        trashButtoon.innerHTML = '<i class="fas fa-trash"></i>';
        trashButtoon.classList.add("trash-btn");
        todoDiv.appendChild(trashButtoon);

        //Append to list
        todoList.appendChild(todoDiv);
        });
}

function removeLocalTodos(todo) {
    //Check if already stuff in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}