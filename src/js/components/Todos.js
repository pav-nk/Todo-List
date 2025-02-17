const Todos = () => {
    let todos = [];

    const addTodo = (todo) => {
        todos.push(todo);
    };

    const deleteTodo = (id) => {
        todos = todos.filter((todo) => todo.getId() !== id);
    };

    const getAllTodos = () => {
        return todos;
    };

    return { addTodo, deleteTodo, getAllTodos };
};

export { Todos };
