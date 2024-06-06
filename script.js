var todos = [];
var renderTodos = function () {
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach(function (todo) {
        var todoItem = document.createElement('div');
        todoItem.classList.add('flex', 'items-center', 'justify-between', 'border-b', 'py-2', 'pl-5');
        var todoText = document.createElement('span');
        todoText.textContent = todo.text;
        if (todo.completed) {
            todoText.classList.add('line-through', 'text-gray-500');
        }
        var deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('text-red-500');
        deleteButton.addEventListener('click', function () { return deleteTodo(todo.id); });
        var completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Undo' : 'Done';
        completeButton.classList.add('text-green-500');
        completeButton.addEventListener('click', function () { return toggleTodoCompletion(todo.id); });
        todoItem.appendChild(todoText);
        todoItem.appendChild(completeButton);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    });
};
var addTodo = function () {
    var todoInput = document.getElementById('todo-input');
    var text = todoInput.value.trim();
    if (text) {
        var newTodo = {
            id: todos.length + 1,
            text: text,
            completed: false
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    }
};
var deleteTodo = function (id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
};
var toggleTodoCompletion = function (id) {
    var todoIndex = todos.findIndex(function (todo) { return todo.id === id; });
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        renderTodos();
    }
};
document.getElementById('add-todo').addEventListener('click', addTodo);
