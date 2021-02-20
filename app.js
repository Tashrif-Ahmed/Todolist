// Selectors
const todoInput = document.querySelector('.todoInput');
const todoBtn = document.querySelector('.todoBtn');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filter-todo');



// Event Listener
document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)





// Functions
function addTodo(event) {
    if (todoInput.value == '') {
        alert('You havent written anything');
    } else {
        // Prevent form from submitting
        event.preventDefault();
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // creat li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todoItem')
        newTodo.innerText = todoInput.value;
        todoDiv.appendChild(newTodo);
        // Add todo to local storage
        saveLocalTodos(todoInput.value);
        // Check Mark Btn
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check" ></i>';
        completeButton.classList.add('completeBtn');
        todoDiv.appendChild(completeButton);
        // Check Trash Btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
        trashButton.classList.add('trashBtn');
        todoDiv.appendChild(trashButton);
        //  Append to list
        todoList.appendChild(todoDiv);
        // clear todoInput
        todoInput.value = '';
    }

}

function deleteCheck(e) {
    const item = e.target;
    // Delete Todo
    if (item.classList == 'trashBtn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
        // todo.remove();

    }
    if (item.classList == 'completeBtn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");


    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                console.log("all");
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;


        }
    })
}



function saveLocalTodos(todo) {
    // Check ....Hey Do I already have things in there?
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
    // Check ....Hey Do I already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // creat li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todoItem')
        todoDiv.appendChild(newTodo);
        // Check Mark Btn
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check" ></i>';
        completeButton.classList.add('completeBtn');
        todoDiv.appendChild(completeButton);
        // Check Trash Btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
        trashButton.classList.add('trashBtn');
        todoDiv.appendChild(trashButton);
        //  Append to list
        todoList.appendChild(todoDiv);
    })


}

function removeLocalTodos(todo) {
    // Check ....Hey Do I already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


