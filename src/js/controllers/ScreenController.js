import { AppController } from './AppController';

const todosField = document.getElementById('field-todos');
const addTodoBtn = document.getElementById('btn-new-todo');
const btnRemovetodos = document.getElementById('btn-remove-todo');
const labelToday = document.getElementById('label-today');
const labelUpcoming = document.getElementById('label-upcoming');
const labelCompleted = document.getElementById('label-completed');
const projectMenu = document.getElementById('project-menu');
const formToAddProject = document.getElementById('form-project');
const btnProjectClear = document.getElementById('btn-project-clear');
const btnProjectAdd = document.getElementById('btn-project-add');
const defaultProject = document.getElementById('default-project');
const projectTitle = document.getElementById('project-title');

const ScreenController = () => {
    const app = AppController();

    const init = () => {
        addTodoBtn.addEventListener('click', () => addtodo());
    };

    const toggleDisabledButtons = () => {
        addTodoBtn.toggleAttribute('disabled');
        btnProjectAdd.toggleAttribute('disabled');
        btnRemovetodos.toggleAttribute('disabled');
    };

    const addtodo = () => {
        toggleDisabledButtons();
        const todo = app.createTodo();
        renderTodo(todo, true);
    };

    const renderTodo = (todo, isEdit = true) => {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('menu', 'todo', 'bg-gray');
        todoContainer.setAttribute('id', todo.getId());
        const todoForm = document.createElement('form');
        todoForm.classList.add('todo-form', 'input-group');
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
        selectProject.classList.add('form-select', 'field-select');
        selectProject.value = app.getActiveProject();
        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('name', 'date');
        inputDate.setAttribute('min', app.date);
        inputDate.setAttribute('max', '2026-01-01');
        inputDate.setAttribute('value', app.date);
        inputDate.classList.add('form-input');
        const addBtntodo = document.createElement('button');
        addBtntodo.setAttribute('type', 'submit');
        addBtntodo.classList.add('btn', 'input-group-btn');
        addBtntodo.setAttribute('id', 'add-todo');
        addBtntodo.textContent = 'Add todo';
        todoForm.append(
            inputName,
            inputNote,
            inputDate,
            selectProject,
            addBtntodo,
        );
        const todoEl = document.createElement('div');
        todoEl.classList.add('form-group', 'columns', 'field-todo');
        const todoNameWrapper = document.createElement('div');
        todoNameWrapper.classList.add('column');
        const label = document.createElement('label');
        label.classList.add('form-checkbox', 'todo-checkbox');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        const formIcon = document.createElement('i');
        formIcon.classList.add('checkbox', 'form-icon');
        const todoName = document.createElement('span');
        todoName.classList.add('todo-name');
        label.append(checkbox, formIcon, todoName);
        const todoInfoWrapper = document.createElement('div');
        todoInfoWrapper.classList.add('todo-info', 'col-auto', 'column');
        const todoControls = document.createElement('div');
        todoControls.classList.add('todo-controls');
        const todoNote = document.createElement('span');
        const todoDate = document.createElement('span');
        const todoPriority = document.createElement('span');
        todoNote.classList.add('chip', 'todo-note');
        todoDate.classList.add('chip', 'todo-note');
        todoPriority.classList.add('chip', 'todo-priority');
        const btnEdittodo = document.createElement('button');
        btnEdittodo.classList.add(
            'btn',
            'btn-sm',
            'btn-action',
            'btn-todo-edit',
        );
        const editIcon = document.createElement('i');
        editIcon.classList.add('icon', 'icon-edit');
        btnEdittodo.append(editIcon);
        const btnDeletetodo = document.createElement('button');
        btnDeletetodo.classList.add(
            'btn',
            'btn-sm',
            'btn-action',
            'btn-todo-delete',
        );
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('icon', 'icon-delete');
        todoInfoWrapper.append(todoNote, todoDate, todoPriority);
        btnDeletetodo.append(deleteIcon);
        todoControls.append(btnEdittodo, btnDeletetodo);
        todoInfoWrapper.append(todoControls);
        todoNameWrapper.append(label);
        todoEl.append(todoNameWrapper, todoInfoWrapper);
        todoContainer.append(todoForm);
        todoContainer.append(todoEl);
        if (isEdit) {
            todoEl.classList.add('hidden');
        }
        if (!isEdit) {
            todoForm.classList.add('hidden');
        }
        todosField.append(todoContainer);
    };

    return { init };
};

export { ScreenController };
