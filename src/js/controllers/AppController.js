import Project from '../components/Project';
import Task from '../components/Task';

class AppController {
    constructor() {
        this.tasks = [];
        this.projects = [
            new Project('Unplaced'),
            new Project('Project 1'),
        ];
        this.completedTasks = [];
        this.activeProject = 'Unsorted';
        this.priorities = ['Low', 'High'];
    }

    getPriorities() {
        return this.priorities;
    }

    addTask(data) {
        const newTask = new Task(data);
        this.tasks.push(newTask);
        return newTask;
    }

    clearTasks() {
        this.tasks = this.tasks.filter(task => task.getProject() !== this.getActiveProjectName());
        return this.tasks;
    }


    updateTaskField() {}

    getActiveProjectName() {
        return this.activeProject;
    }

    getAllProjectNames() {
        return this.projects.map((project) => project.getName());
    }
}

export default AppController;
