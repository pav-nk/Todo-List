import Project from '../components/Project';
import Task from '../components/Task';

class AppController {
    static date = (new Date()).toISOString().split('T')[0];
    static tasks = [];
    static projects = [
        new Project({name: 'Unplaced'}),
    ];
    static completedTasks = [];
    static activeProject = 'Unsorted';
    static priorities = ['Default', 'Low', 'High'];
    static groups = {
        today: 0,
        upcoming: 0,
        completed: 0,
    };

    static getPriorities() {
        return this.priorities;
    }

    static getTasks() {
        return this.tasks;
    }

    static createTask(data = {}) {
        const task = new Task(data);
        this.tasks.push(task);
        return task;
    }

    static createProject(data = {}) {
        const project = new Project(data);
        this.projects.push(project);
        return project;
    }

    static deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.getId() !== id);
    }

    static getActiveProject() {
        return this.activeProject;
    }

    static getAllProjectNames() {
        return this.projects.map((project) => project.getName());
    }

    static clearAllTasks() {
        this.tasks = this.tasks.filter(task => task.getProject() !== this.getActiveProject());
    }
}

export default AppController;
