import App from './App';

const tasksField = document.getElementById('field-tasks');
const btnNewTask = document.getElementById('btn-new-task');
const btnRemoveTasks = document.getElementById('btn-remove-task');
const labelToday = document.getElementById('label-today');
const labelUpcoming = document.getElementById('label-upcoming');
const labelCompleted = document.getElementById('label-completed');
const projectMenu = document.getElementById('project-menu');
const formToAddProject = document.getElementById('form-project');
const btnProjectClear = document.getElementById('btn-project-clear');
const btnProjectAdd = document.getElementById('btn-project-add');
const defaultProject = document.getElementById('default-project');
const projectTitle = document.getElementById('project-title');

class Screen {
    static app = App;

    static init() {
        btnNewTask.addEventListener('click', () => this.clickHandlerAddTask());
        btnRemoveTasks.addEventListener('click', () =>
            this.clickHandlerClearTasks(),
        );
        formToAddProject.addEventListener('submit', (evt) =>
            this.addNewProject(evt),
        );
        btnProjectClear.addEventListener('click', () => {
            formToAddProject.reset();
        });
        defaultProject.addEventListener('click', (evt) => {
            const { name } = evt.currentTarget.dataset;
            this.updateSelectedTasks(name);
        });
    }

    static renderProjectItem({ name }, project) {
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');
        const link = document.createElement('a');
        link.classList.add('link');
        link.setAttribute('href', '#');
        link.setAttribute('data-name', `${project.getName()}`);
        const icon = document.createElement('i');
        icon.classList.add('icon', 'icon-arrow-right');
        const projectName = document.createElement('span');
        projectName.textContent = name;
        const controls = document.createElement('div');
        controls.classList.add('menu-badge');

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-sm', 'btn-action');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('icon', 'icon-delete');

        btnDelete.append(deleteIcon);
        controls.append(btnDelete);

        link.append(icon, projectName);

        menuItem.append(link, controls);
        projectMenu.append(menuItem);

        this.addProjectEventHandlers(link, btnDelete, menuItem, name);
    }

    static addProjectEventHandlers(link, btnDelete, menuItem, name) {
        link.addEventListener('click', (evt) => {
            const { name } = evt.currentTarget.dataset;
            this.updateSelectedTasks(name);
        });
        btnDelete.addEventListener('click', () => {
            this.updateLabelDate(this.app.getAppCounts());
            this.app.deleteProject(name);
            this.updateSelectedTasks('unplaced');
            menuItem.remove();
        });
    }

    static addNewProject(evt) {
        evt.preventDefault();
        const currentForm = evt.target;
        const formData = new FormData(currentForm);
        const data = {
            name: formData.get('project-name'),
        };
        currentForm.reset();
        const currentProject = this.app.createProject(data);
        this.renderProjectItem(data, currentProject);
    }

    static clickHandlerAddTask(e) {
        btnNewTask.setAttribute('disabled', '');
        btnProjectAdd.setAttribute('disabled', '');
        btnRemoveTasks.setAttribute('disabled', '');
        const currentTask = this.app.createTask();
        currentTask.generateId();
        this.renderTask(currentTask);
    }

    static clickHandlerClearTasks() {
        tasksField.innerHTML = '';
        this.app.clearAllTasks();
    }

    static createTaskOption(name) {
        const option = document.createElement('option');
        option.setAttribute('value', name.toLowerCase());
        option.textContent = name;
        return option;
    }

    static renderSelectOptions() {
        return this.app.getAllProjectNames().map((name) => {
            return this.createTaskOption(name);
        });
    }

    static renderPriorities() {
        return this.app.getPriorities().map((name) => {
            return this.createTaskOption(name);
        });
    }

    static renderTask(currentTask, isFormActive = true) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('menu', 'task', 'bg-gray');
        taskContainer.setAttribute('id', currentTask.getId());

        // Form

        const taskForm = document.createElement('form');
        taskForm.classList.add('task-form', 'input-group');
        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('name', 'name');
        inputName.setAttribute('placeholder', 'Enter name');
        inputName.setAttribute('required', '');
        inputName.classList.add('form-input');
        const inputNote = document.createElement('input');
        inputNote.setAttribute('type', 'text');
        inputNote.setAttribute('name', 'note');
        inputNote.setAttribute('placeholder', 'Enter note');
        inputNote.setAttribute('required', '');
        inputNote.classList.add('form-input');
        const selectProject = document.createElement('select');
        selectProject.setAttribute('name', 'project');
        selectProject.setAttribute('required', '');
        selectProject.append(...this.renderSelectOptions());
        selectProject.classList.add('form-select', 'field-select');
        selectProject.value = this.app.getActiveProject();
        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('name', 'date');
        inputDate.setAttribute('min', this.app.date);
        inputDate.setAttribute('max', '2026-01-01');
        inputDate.setAttribute('value', this.app.date);
        inputDate.classList.add('form-input');
        const selectPriority = document.createElement('select');
        selectPriority.setAttribute('name', 'priority');
        selectPriority.append(...this.renderPriorities());
        selectPriority.setAttribute('required', '');
        selectPriority.classList.add('form-select', 'field-select');
        const addBtnTask = document.createElement('button');
        addBtnTask.setAttribute('type', 'submit');
        addBtnTask.classList.add('btn', 'input-group-btn');
        addBtnTask.setAttribute('id', 'add-task');
        addBtnTask.textContent = 'Add Task';
        taskForm.append(
            inputName,
            inputNote,
            inputDate,
            selectProject,
            selectPriority,
            addBtnTask,
        );

        // Task

        const task = document.createElement('div');
        task.classList.add('form-group', 'columns', 'field-task');
        const taskNameWrapper = document.createElement('div');
        taskNameWrapper.classList.add('column');
        const label = document.createElement('label');
        label.classList.add('form-checkbox', 'task-checkbox');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        const formIcon = document.createElement('i');
        formIcon.classList.add('checkbox', 'form-icon');
        const taskName = document.createElement('span');
        taskName.classList.add('task-name');
        label.append(checkbox, formIcon, taskName);

        const taskInfoWrapper = document.createElement('div');
        taskInfoWrapper.classList.add('task-info', 'col-auto', 'column');
        const taskControls = document.createElement('div');
        taskControls.classList.add('task-controls');

        const taskNote = document.createElement('span');
        const taskDate = document.createElement('span');
        const taskPriority = document.createElement('span');

        taskNote.classList.add('chip', 'task-note');
        taskDate.classList.add('chip', 'task-note');
        taskPriority.classList.add('chip', 'task-priority');

        const btnEditTask = document.createElement('button');
        btnEditTask.classList.add(
            'btn',
            'btn-sm',
            'btn-action',
            'btn-task-edit',
        );
        const editIcon = document.createElement('i');
        editIcon.classList.add('icon', 'icon-edit');
        btnEditTask.append(editIcon);

        const btnDeleteTask = document.createElement('button');
        btnDeleteTask.classList.add(
            'btn',
            'btn-sm',
            'btn-action',
            'btn-task-delete',
        );
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('icon', 'icon-delete');

        taskInfoWrapper.append(taskNote, taskDate, taskPriority);

        btnDeleteTask.append(deleteIcon);

        taskControls.append(btnEditTask, btnDeleteTask);
        taskInfoWrapper.append(taskControls);

        taskNameWrapper.append(label);
        task.append(taskNameWrapper, taskInfoWrapper);

        taskContainer.append(taskForm);
        taskContainer.append(task);

        if (isFormActive) {
            task.classList.add('hidden');
        }

        if (!isFormActive) {
            taskForm.classList.add('hidden');
            inputName.value = currentTask.getName();
            inputNote.value = currentTask.getNote();
            this.updateTaskView(currentTask, {
                taskName,
                taskNote,
                taskDate,
                taskPriority,
            });
        }

        tasksField.append(taskContainer);
        this.addTaskEventHandlers(currentTask, {
            taskContainer,
            taskForm,
            task,
            taskName,
            taskNote,
            taskDate,
            taskPriority,
            btnEditTask,
            btnDeleteTask,
            checkbox,
        });
    }

    static addTaskEventHandlers(currentTask, nodelist) {
        nodelist.taskForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const currentForm = evt.target;
            const formData = new FormData(currentForm);
            const data = {
                name: formData.get('name'),
                note: formData.get('note'),
                date: formData.get('date'),
                project: formData.get('project'),
                priority: formData.get('priority'),
            };
            currentTask.update(data);
            this.app.updateDateState(
                currentTask.getId(),
                currentTask.getDate(),
            );
            if (data.project !== this.app.getActiveProject()) {
                nodelist.taskContainer.remove();
            } else {
                currentForm.classList.add('hidden');
                nodelist.task.classList.remove('hidden');
                this.updateTaskView(currentTask, nodelist);
            }
            this.updateLabelDate(this.app.getAppCounts());
            btnNewTask.removeAttribute('disabled');
            btnProjectAdd.removeAttribute('disabled');
            btnRemoveTasks.removeAttribute('disabled');
        });
        nodelist.btnDeleteTask.addEventListener('click', (evt) => {
            nodelist.taskContainer.remove();
            this.app.deleteTask(currentTask.getId());
            this.updateLabelDate(this.app.getAppCounts());
        });
        nodelist.btnEditTask.addEventListener('click', (evt) => {
            nodelist.task.classList.add('hidden');
            nodelist.taskForm.classList.remove('hidden');
        });
        nodelist.checkbox.addEventListener('click', (evt) => {
            currentTask.toggleChecked();
            this.app.updateState(currentTask.getTaskState());
            nodelist.taskName.classList.toggle('completed');
            nodelist.taskContainer.classList.toggle('bg-gray');
            nodelist.taskContainer.classList.toggle('bg-secondary');
            this.updateLabelState(this.app.getAppCounts());
        });
    }

    static updateLabelState(data) {
        const { completed } = data;
        labelCompleted.textContent = completed;
    }

    static updateLabelDate(data) {
        const { today, upcoming } = data;
        labelToday.textContent = today;
        labelUpcoming.textContent = upcoming;
    }

    static updateTaskView(
        currentTask,
        { taskName, taskNote, taskDate, taskPriority },
    ) {
        taskName.textContent = currentTask.getName();
        taskNote.textContent = currentTask.getNote();
        taskDate.textContent = currentTask.getDate();
        taskPriority.textContent = currentTask.getPriority();
    }

    static updateSelectedTasks(name) {
        if (this.app.getActiveProject() === name) return;
        this.app.setActiveProject(name);
        projectTitle.textContent = name;
        const selectedTasks = this.app.getSelectedTasks();
        tasksField.innerHTML = '';
        selectedTasks.forEach((task) => this.renderTask(task, false));
    }
}

export default Screen;
