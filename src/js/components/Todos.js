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

    const getTodayTodos = (todayDate) => {
        return todos.filter((todo) => todo.getDate() === todayDate);
    };

    const getSomedayTodos = (todayDate) => {
        return todos.filter((todo) => todo.getDate() !== todayDate);
    };

    const getCompletedTodos = () => {
        return todos.filter((todo) => todo.getStatus());
    };

    return {
        addTodo,
        deleteTodo,
        getAllTodos,
        clearTodos,
        getSelectedTodos,
        getTodayTodos,
        getSomedayTodos,
        getCompletedTodos,
    };
};

export { Todos };
