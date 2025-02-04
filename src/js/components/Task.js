class Task {
    constructor({ name, date, priority, note, project }) {
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.note = note;
        this.project = project;
        this.isChecked = false;
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

    getCheckedStatus() {
        return this.isChecked;
    }

    toggleStatus() {
        this.isChecked = !this.isChecked;
        return !this.isChecked;
    }

    render() {}
}

export default Task;
