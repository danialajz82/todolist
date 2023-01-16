const todoInput = document.querySelector(".todo-input");
const todobButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")


todobButton.addEventListener("click", addTodo);
todoList.addEventListener("click" , deleteCompleteTodo);
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)

function addTodo () {
    event.preventDefault()
    saveLocalTodo(todoInput.value)

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");
    
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")

    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton);
    
    const trashButton = document.createElement("button"); 
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
}

function deleteCompleteTodo(event){
    const item = event.target;
    console.log(item)
    const todo = item.parentElement;
    console.log(todo)
    console.log(todo.innerText)
    if (item.classList[0] === "complete-btn") {
        console.log("its compelete button")
        todo.classList.toggle("completed")
        // saveTodosClass(todo.innerText);
        console.log(todoList)
        if (todo.classList.contains("completed")) {
        saveTodosClass(todo.innerText);
        } else {
            removeTodoClass(todo)
        }
    } else if (item.classList[0] === "trash-btn") {
        console.log("its trash button")
        todo.remove();
        removeLocalTodo(todo);
        removeTodoClass(todo)
    }

} 

function saveTodosClass(todoClass){
    let todosClass;
    if (localStorage.getItem("todosClass") === null) {
        todosClass = [];
    } else {
        todosClass = JSON.parse(localStorage.getItem("todosClass"))
    }
    todosClass.push(todoClass)
    localStorage.setItem("todosClass", JSON.stringify(todosClass))
}

function removeTodoClass(Class){
    let todosClass;
    if (localStorage.getItem("todosClass") === null) {
        todosClass = [];
    } else {
        todosClass = JSON.parse(localStorage.getItem("todosClass"))
    }
    const ClassIndex = Class.children[0].innerText;
    todosClass.splice(todosClass.indexOf(ClassIndex), 1)
    localStorage.setItem("todosClass", JSON.stringify(todosClass))
}

function saveLocalTodo (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function filterTodo(event){
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(function(todo){
        // console.log(todo.classList)
        const option = event.target.value;
        switch(option) {
            case "all":
                todo.style.display = "flex";
                break
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none";
                }
                break
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break
        }
    })
}


function getTodos(){
    let todosClass;
    if (localStorage.getItem("todosClass") === null) {
        todosClass = [];
    } else {
        todosClass = JSON.parse(localStorage.getItem("todosClass"))
    }
    console.log(todosClass)

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo");
        
        const newTodo = document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item")

        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);
        
        const trashButton = document.createElement("button"); 
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)

        todoList.appendChild(todoDiv)

        console.log(todo)

        if (todosClass.indexOf(todo) >= 0) {
            todoDiv.classList.add("completed");
        }
    })





}

// localStorage.clear(); 