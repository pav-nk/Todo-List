import { Todos } from '../components/Todos';
import { Todo } from '../components/Todo';

const AppController = () => {
    const dateNow = new Date().toISOString().split('T')[0];
    let activeProject = 'today';

    const getActiveProject = () => activeProject;

    const setActiveProject = (name) => (activeProject = name);

    const todos = Todos();

    const createTodo = () => {
        const todo = Todo();
        todos.addTodo(todo);
        return todo;
    };

    const deleteTodo = (id) => {
        todos.deleteTodo(id);
    }

    return { createTodo, deleteTodo, getActiveProject, setActiveProject };
};

export { AppController };
