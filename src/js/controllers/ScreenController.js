import AppController from './AppController';

const tasksField = document.getElementById('field-tasks');
const btnNewTask = document.getElementById('btn-new-task');
const btnRemoveTask = document.getElementById('btn-remove-task');

class ScreenController {
    static app = new AppController();

    static clickHandlerAddTask(e) {
        btnNewTask.setAttribute('disabled', '');
        this.addNewTaskForm();
        const taskForm = tasksField.querySelector('.task-form');
        taskForm.addEventListener('submit', (evt) => this.createTask(evt));
    }

    static clickHandlerClearTasks() {
        tasksField.innerHTML = '';
        this.app.clearTasks();
    }

    static createTask(evt) {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const data = {
            name: formData.get('name'),
            note: formData.get('note'),
            project: formData.get('project'),
            date: formData.get('date'),
            priority: formData.get('priority'),
        }
        const newTask = this.app.addTask(data);
        const taskWrapper = evt.target.parentElement;
        evt.target.classList.toggle('hidden');
        this.renderTask(taskWrapper, newTask);
        btnNewTask.removeAttribute('disabled');
        const fieldTask = taskWrapper.querySelector('.field-task');
        const taskCheckbox = taskWrapper.querySelector('.checkbox');
        taskCheckbox.addEventListener('click', (evt) => {
            newTask.toggleStatus();
            taskCheckbox.parentElement.classList.toggle('completed');
        })
        const btnDeleteTask = taskWrapper.querySelector('.btn-task-delete');
        const btnEditTask = taskWrapper.querySelector('.btn-task-edit');

        btnDeleteTask.addEventListener('click', (e) => {
            console.log('btn-delete');
            taskWrapper.remove();
        })

        btnEditTask.addEventListener('click', (e) => {
            console.log('btn-edit');
            fieldTask.classList.toggle('hidden');
            evt.target.classList.toggle('hidden');

        })
    }

    static renderTask(taskWrapper, task) {
        taskWrapper.insertAdjacentHTML(
            'beforeend', `
                <div class="form-group columns field-task">
                    <div class="column">
                        <label class="form-checkbox task-checkbox">
                            <input type="checkbox"><i class="checkbox form-icon"></i>
                            ${task.getName()}
                        </label>
                    </div>
                    <div class="column col-auto task-info">
                        <span class="chip">${task.getNote()}</span>
                        <span class="chip">${task.getDate()}</span>
                        <span class="chip">${task.getPriority()}</span>
                        <div class="task-controls">
                            <button class="btn btn-sm btn-action btn-task-edit"><i class="icon icon-edit"></i></button>
                            <button class="btn btn-sm btn-action btn-task-delete"><i class="icon icon-delete"></i></button>
                        </div>
                    </div>
                </div>
            `
        );
    }

    static init() {
        btnNewTask.addEventListener('click', () => this.clickHandlerAddTask());
        btnRemoveTask.addEventListener('click', () => this.clickHandlerClearTasks());
    }

    static renderSelectOptions() {
        return this.app
            .getAllProjectNames()
            .map(
                (name) =>
                    `<option value='${name.toLowerCase()}'>${name}</option>`,
            )
            .join('\n');
    }

    static renderTaskPriorities() {
        return this.app.getPriorities().map(
            (name) =>
                `<option value='${name.toLowerCase()}'>${name}</option>`,
        )
            .join('\n');
    }

    static createTaskForm() {
        return `<form class="input-group task-form">
                       <input class="form-input" type="text" placeholder="Enter name" name="name" required>
                       <input class="form-input" type="text" placeholder="Enter note" name="note" required>
                       <select class="form-select" name="project">
                            ${this.renderSelectOptions()}
                       </select>
                       <input class="form-input" type="date" name="date" value="01.01.2025">
                       <select class="form-select field-select" name='priority'>
                           <option value='default'></option>
                           ${this.renderTaskPriorities()}
                       </select>
                       <button type="submit" class="btn input-group-btn" id="add-task">Add task</button>
                    </form>`;
    }

    static addNewTaskForm() {
        tasksField.insertAdjacentHTML(
            'beforeend', `<div class="menu task bg-secondary">${this.createTaskForm()}</div>`
        );
    }
}

export default ScreenController;
