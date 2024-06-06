interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

let todos: Todo[] = [];

const renderTodos = () => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('flex', 'items-center', 'justify-between', 'border-b', 'py-2' , 'pl-5');

        const todoText = document.createElement('span');
        todoText.textContent = todo.text;
        if (todo.completed) {
            todoText.classList.add('line-through', 'text-gray-500');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('text-red-500');
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Undo' : 'Done';
        completeButton.classList.add('text-green-500');
        completeButton.addEventListener('click', () => toggleTodoCompletion(todo.id));

        todoItem.appendChild(todoText);
        todoItem.appendChild(completeButton);
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });
};
const addTodo = () => {
    const todoInput = document.getElementById('todo-input') as HTMLInputElement;
    const text = todoInput.value.trim();
    if (text) {
        const newTodo: Todo = {
            id: todos.length + 1,
            text,
            completed: false
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    }
};

const deleteTodo = (id: number) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
};

const toggleTodoCompletion = (id: number) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        renderTodos();
    }
};

document.getElementById('add-todo').addEventListener('click', addTodo);

