class Task {
    constructor() {
        this.id = null;
        this.name = null;
        this.date = null;
        this.priority = null;
        this.note = null;
        this.project = null;
        this.isChecked = false;
    }

    toggleChecked() {
        this.isChecked = !this.isChecked;
        return this.isChecked;
    }

    generateId() {
        this.id = Date.now();
        return this.id;
    }

    getId() {
        return this.id;
    }

    toggleStatus() {}

    getName() {
        return this.name;
    }

    getDate() {
        return this.date;
    }

    getPriority() {
        return this.priority;
    }

    getNote() {
        return this.note;
    }

    getProject() {
        return this.project;
    }

    update({ name, date, priority, note, project }) {
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.note = note;
        this.project = project;
    }
}

export default Task;
