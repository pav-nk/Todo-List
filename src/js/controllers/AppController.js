import Project from '../components/Project';
import Task from '../components/Task';

class AppController {
    static date = new Date().toISOString().split('T')[0];
    static tasks = [];
    static projects = [new Project({ name: 'Unplaced' })];
    static completedTasks = [];
    static activeProject = 'Unsorted';
    static priorities = ['Default', 'Low', 'High'];
    static counts = {
        taskDateObj: {},
        completed: 0,
        today: 0,
        upcoming: 0,
    };

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
        const project = new Project(data);
        this.projects.push(project);
        return project;
    }

    static deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.getId() !== id);
        delete this.counts.taskDateList[id];
    }

    static getActiveProject() {
        return this.activeProject;
    }

    static getAllProjectNames() {
        return this.projects.map((project) => project.getName());
    }

    static clearAllTasks() {
        this.tasks = this.tasks.filter(
            (task) => task.getProject() !== this.getActiveProject(),
        );
    }
}

export default AppController;
