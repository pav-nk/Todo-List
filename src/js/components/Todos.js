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

    const clearTodos = (project) => {
        todos = todos.filter((todo) => todo.getProject() !== project);
    };

    const getSelectedTodos = (project) => {
        return todos.filter((todo) => todo.getProject() === project);
    };

    return { addTodo, deleteTodo, getAllTodos, clearTodos, getSelectedTodos };
};

export { Todos };
