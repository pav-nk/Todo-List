import { Todos } from '../components/Todos';
import { Todo } from '../components/Todo';
import { Projects } from '../components/Projects';
import { Project } from '../components/Project';

const AppController = () => {
    const todos = Todos();
    let activeProject = 'unplaced';
    const projects = Projects();

    const dateNow = new Date().toISOString().split('T')[0];

    const getActiveProject = () => activeProject;

    const setProject = (name) => (activeProject = name);

    const createTodo = () => {
        const todo = Todo();
        todos.addTodo(todo);
        return todo;
    };

    const deleteTodo = (id) => {
        todos.deleteTodo(id);
    };

    const createProject = (name) => {
        return projects.createProject(name);
    };

    const deleteProject = (name) => {
        projects.deleteProject(name);
    };

    const clearCurrentTodos = () => {
        todos.clearTodos(getActiveProject());
    };

    const getSelectedTodos = () => {
        return todos.getSelectedTodos(getActiveProject());
    };

    const getProjectsNames = () => {
        return projects.getAllProjectNames();
    };

    return {
        createTodo,
        deleteTodo,
        getActiveProject,
        setProject,
        clearCurrentTodos,
        getSelectedTodos,
        createProject,
        deleteProject,
        getProjectsNames,
    };
};

export { AppController };
