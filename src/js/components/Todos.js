import { Todo } from './Todo';

const Todos = () => {
    const todos = [];

    const addTodo = (todo) => {
        todos.push(todo);
    };

    const deleteTodo = (id) => {
        todos = todos.filter((todo) => todo.getId() !== id);
    };

    const getAllTodos = () => {
        return items;
    };

    const deleteAllTodosInProject = (projectName) => {};

    return { addTodo };
};

export { Todos };
