import { AppController } from './AppController';

const todosField = document.getElementById('field-todos');
const addTodoBtn = document.getElementById('btn-new-todo');
const btnRemoveTodos = document.getElementById('btn-remove-todo');
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
        addTodoBtn.addEventListener('click', () => addTodo());
    };

    const toggleDisabledButtons = () => {
        addTodoBtn.toggleAttribute('disabled');
        btnProjectAdd.toggleAttribute('disabled');
        btnRemoveTodos.toggleAttribute('disabled');
    };

    const addTodo = () => {
        toggleDisabledButtons();
        const todo = app.createTodo();
        renderTodo(todo);
    };

    const addTodoEvents = (todo, { todoForm, inputCheckbox, todoContainer, todoEl, todoName, todoDesc, todoDate, todoPriority, btnEditTodo, btnDeleteTodo, inputCheckboxTodo }) => {
        todoForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const currentForm = evt.currentTarget;
            const formData = new FormData(currentForm);
            const data = {
                name: formData.get('name'),
                description: formData.get('desc'),
                date: formData.get('date'),
                project: formData.get('project'),
                isImportant: inputCheckbox.checked,
            };
            todo.updateState(data);
            if (data.project !== app.getActiveProject()) {
                todoContainer.remove();
            } else {
                todo.switchEditMode();
                currentForm.classList.add('hidden');
                todoEl.classList.remove('hidden');
                updateTodoView(todo, { todoName, todoDesc, todoDate, todoPriority });
            }
            toggleDisabledButtons();
        });
        btnEditTodo.addEventListener('click', (evt) => {
            todo.switchEditMode();
            todoEl.classList.add('hidden');
            todoForm.classList.remove('hidden');
        });
        inputCheckboxTodo.addEventListener('click', (evt) => {
            todo.switchStatus();
            todoName.classList.toggle('completed');
            todoContainer.classList.toggle('bg-gray');
            todoContainer.classList.toggle('bg-secondary');
        });
        btnDeleteTodo.addEventListener('click', (evt) => {
            todoContainer.remove();
            app.deleteTodo(todo.getId());
        });
    }

    const renderTodo = (todo) => {
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
        const inputDesc = document.createElement('input');
        inputDesc.setAttribute('type', 'text');
        inputDesc.setAttribute('name', 'desc');
        inputDesc.setAttribute('placeholder', 'Enter description');
        inputDesc.setAttribute('required', '');
        inputDesc.classList.add('form-input');
        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('name', 'date');
        inputDate.setAttribute('min', todo.getDate());
        inputDate.setAttribute('max', '2026-01-01');
        inputDate.setAttribute('value', todo.getDate());
        inputDate.classList.add('form-input');
        const selectProject = document.createElement('select');
        selectProject.setAttribute('name', 'project');
        selectProject.setAttribute('required', '');
        selectProject.classList.add('form-select', 'field-select');
        selectProject.value = app.getActiveProject();
        const defaultOption = document.createElement('option');
        defaultOption.textContent = app.getActiveProject();
        selectProject.append(defaultOption);
        const switchLabel = document.createElement('label');
        switchLabel.classList.add('form-switch');
        const inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('type', 'checkbox');
        inputCheckbox.setAttribute('name', 'priority');
        const checkboxIcon = document.createElement('i');
        checkboxIcon.classList.add('form-icon');
        switchLabel.textContent = 'is important?';
        switchLabel.append(inputCheckbox, checkboxIcon);
        const addBtnTodo = document.createElement('button');
        addBtnTodo.setAttribute('type', 'submit');
        addBtnTodo.classList.add('btn', 'input-group-btn');
        addBtnTodo.setAttribute('id', 'add-todo');
        addBtnTodo.textContent = 'Add todo';
        todoForm.append(
            inputName,
            inputDesc,
            inputDate,
            selectProject,
            switchLabel,
            addBtnTodo,
        );
        const todoEl = document.createElement('div');
        todoEl.classList.add('form-group', 'columns', 'field-todo');
        const todoNameWrapper = document.createElement('div');
        todoNameWrapper.classList.add('column');
        const label = document.createElement('label');
        label.classList.add('form-checkbox', 'todo-checkbox');
        const inputCheckboxTodo = document.createElement('input');
        inputCheckboxTodo.setAttribute('type', 'checkbox');
        const formIcon = document.createElement('i');
        formIcon.classList.add('checkbox', 'form-icon');
        const todoName = document.createElement('span');
        todoName.classList.add('todo-name');
        label.append(inputCheckboxTodo, formIcon, todoName);
        const todoInfoWrapper = document.createElement('div');
        todoInfoWrapper.classList.add('todo-info', 'col-auto', 'column');
        const todoControls = document.createElement('div');
        todoControls.classList.add('todo-controls');
        const todoDesc = document.createElement('span');
        const todoDate = document.createElement('span');
        const todoPriority = document.createElement('span');
        todoDesc.classList.add('chip', 'todo-desc');
        todoDate.classList.add('chip', 'todo-desc');
        todoPriority.classList.add('chip', 'todo-priority', 'bg-warning');
        const btnEditTodo = document.createElement('button');
        btnEditTodo.classList.add(
            'btn',
            'btn-sm',
            'btn-action',
            'btn-todo-edit',
        );
        const editIcon = document.createElement('i');
        editIcon.classList.add('icon', 'icon-edit');
        btnEditTodo.append(editIcon);
        const btnDeleteTodo = document.createElement('button');
        btnDeleteTodo.classList.add(
            'btn',
            'btn-sm',
            'btn-action',
            'btn-todo-delete',
        );
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('icon', 'icon-delete');
        todoInfoWrapper.append(todoDesc, todoDate, todoPriority);
        btnDeleteTodo.append(deleteIcon);
        todoControls.append(btnEditTodo, btnDeleteTodo);
        todoInfoWrapper.append(todoControls);
        todoNameWrapper.append(label);
        todoEl.append(todoNameWrapper, todoInfoWrapper);
        todoContainer.append(todoForm);
        todoContainer.append(todoEl);
        if (todo.getEditModeValue()) {
            todoEl.classList.add('hidden');
        }
        if (!todo.getEditModeValue()) {
            todoForm.classList.add('hidden');
        }
        todosField.append(todoContainer);
        addTodoEvents(todo, { todoForm, inputCheckbox, todoContainer, todoEl, todoName, todoDesc, todoDate, todoPriority, btnEditTodo, btnDeleteTodo, inputCheckboxTodo });
    };

    const updateTodoView = (todo, { todoName, todoDesc, todoDate, todoPriority }) => {
        todoName.textContent = todo.getName();
        todoDesc.textContent = todo.getDescription();
        todoDate.textContent = todo.getDate();
        if (todo.getPriority()) {
            todoPriority.classList.remove('hidden');
            todoPriority.textContent = 'important';
        } else {
            todoPriority.classList.add('hidden');
        }


    }

    return { init };
};

export { ScreenController };
