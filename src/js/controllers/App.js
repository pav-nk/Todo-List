import Project from '../components/Project';
import Task from '../components/Task';

class App {
    static date = new Date().toISOString().split('T')[0];
    static tasks = [];
    static projects = [new Project('unplaced')];
    static completedTasks = [];
    static activeProject = 'unplaced';
    static priorities = ['Default', 'Low', 'High'];
    static counts = {
        taskDateObj: {},
        completed: 0,
        today: 0,
        upcoming: 0,
    };

    static getSelectedTasks() {
        if (this.tasks.length === 0) return [];
        const currentTasks = this.tasks.filter(
            (task) => task.getProject() === this.getActiveProject(),
        );
        return currentTasks;
    }

    static getAppCounts() {
        return {
            completed: this.counts.completed,
            today: this.counts.today,
            upcoming: this.counts.upcoming,
        };
    }

    static updateState(taskIsChecked) {
        if (taskIsChecked) {
            this.counts.completed += 1;
        } else {
            this.counts.completed -= 1;
        }
    }

    static updateDateState(taskId, taskDate) {
        this.counts.taskDateObj[taskId] = {
            isToday: taskDate === this.date,
        };

        this.counts.today = +Object.values(this.counts.taskDateObj).filter(
            (task) => task.isToday,
        ).length;
        this.counts.upcoming =
            +Object.keys(this.counts.taskDateObj).length - this.counts.today;
    }

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
        const project = new Project(data.name || '');
        this.projects.push(project);
        return project;
    }

    static deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.getId() !== id);
        if (this.counts.taskDateObj[id].isToday) {
            this.counts.today -= 1;
        } else {
            this.counts.upcoming -= 1;
        }
        delete this.counts.taskDateObj[id];
    }

    static getActiveProject() {
        return this.activeProject;
    }

    static setActiveProject(name) {
        this.activeProject = name;
        return name;
    }

    static getAllProjectNames() {
        return this.projects.map((project) => project.getName());
    }

    static clearAllTasks() {
        this.tasks = this.tasks.filter(
            (task) => task.getProject() !== this.getActiveProject(),
        );
    }

    static deleteProject(name) {
        this.projects = this.projects.filter(
            (project) => project.getName() !== name,
        );
        this.tasks = this.tasks.filter((task) => task.getProject() !== name);
    }
}

export default App;
