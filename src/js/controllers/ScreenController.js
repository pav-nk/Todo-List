import { AppController } from './AppController';

const labelToday = document.getElementById('label-today');
const labelUpcoming = document.getElementById('label-upcoming');
const labelCompleted = document.getElementById('label-completed');

const todosField = document.getElementById('field-todos');
const addTodoBtn = document.getElementById('btn-new-todo');
const btnRemoveTodos = document.getElementById('btn-remove-todo');
const projectMenu = document.getElementById('project-menu');
const projectForm = document.getElementById('form-project');
const btnProjectClear = document.getElementById('btn-project-clear');
const btnProjectAdd = document.getElementById('btn-project-add');
const defaultProjectItem = document.getElementById('default-project');
const projectTitle = document.getElementById('project-title');

const ScreenController = () => {
    const app = AppController();

    const init = () => {
        addTodoBtn.addEventListener('click', () => addTodo());
        btnRemoveTodos.addEventListener('click', () => clearTodos());
        btnProjectClear.addEventListener('click', () => {
            projectForm.reset();
        });
        defaultProjectItem.addEventListener('click', (evt) => {
            const { name } = evt.currentTarget.dataset;
            updateTodosField(name);
        });
        projectForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            createNewProject(evt.currentTarget);
        });
    };

    const createNewProject = (target) => {
        const formData = new FormData(target);
        const value = formData.get('project-name');
        const project = app.createProject(value);
        renderProject(value, project);
        target.reset();
    };

    const updateTodosField = (name) => {
        if (app.getActiveProject() === name) return;
        app.setProject(name);
        projectTitle.textContent = name;
        const selectedTodos = app.getSelectedTodos();
        todosField.innerHTML = '';
        selectedTodos.forEach((todo) => renderTodo(todo));
    };

    const clearTodos = () => {
        app.clearCurrentTodos();
        todosField.innerHTML = '';
    };

    const addTodo = () => {
        const todo = app.createTodo();
        renderTodo(todo);
    };

    const addTodoEvents = (
        todo,
        {
            todoForm,
            inputCheckbox,
            todoContainer,
            todoEl,
            todoName,
            todoDesc,
            todoDate,
            todoPriority,
            btnEditTodo,
            btnDeleteTodo,
            inputCheckboxTodo,
        },
    ) => {
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
                todo.switchEditMode();
                todoContainer.remove();
            } else {
                todo.switchEditMode();
                currentForm.classList.add('hidden');
                todoEl.classList.remove('hidden');
                updateTodoView(todo, {
                    todoName,
                    todoDesc,
                    todoDate,
                    todoPriority,
                    todoContainer,
                });
            }
        });
        btnEditTodo.addEventListener('click', () => {
            todo.switchEditMode();
            todoEl.classList.add('hidden');
            todoForm.classList.remove('hidden');
        });
        inputCheckboxTodo.addEventListener('click', () => {
            todo.switchStatus();
            switchTodoStatusView(todoName, todoContainer);
        });
        btnDeleteTodo.addEventListener('click', () => {
            todoContainer.remove();
            app.deleteTodo(todo.getId());
        });
    };

    const switchTodoStatusView = (name, container) => {
        name.classList.toggle('completed');
        container.classList.toggle('bg-gray');
        container.classList.toggle('bg-secondary');
    };

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
        selectProject.append(...getTodoSelectOptions());
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
            updateTodoView(todo, {
                todoName,
                todoDesc,
                todoDate,
                todoPriority,
                todoContainer,
                inputCheckboxTodo,
            });
            todoForm.classList.add('hidden');
        }
        todosField.append(todoContainer);
        addTodoEvents(todo, {
            todoForm,
            inputCheckbox,
            todoContainer,
            todoEl,
            todoName,
            todoDesc,
            todoDate,
            todoPriority,
            btnEditTodo,
            btnDeleteTodo,
            inputCheckboxTodo,
        });
    };

    const renderProject = (name, project) => {
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');
        const link = document.createElement('a');
        link.classList.add('link');
        link.setAttribute('href', '#');
        link.setAttribute('data-name', `${project.getName()}`);
        link.setAttribute('id', `${project.getId()}`);
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
        link.append(projectName);
        menuItem.append(link, controls);
        projectMenu.append(menuItem);
        addProjectEvent(link, btnDelete, menuItem, name);
    };

    const addProjectEvent = (link, btnDelete, menuItem, name) => {
        link.addEventListener('click', (evt) => {
            const { name } = evt.currentTarget.dataset;
            updateTodosField(name);
        });
        btnDelete.addEventListener('click', () => {
            app.deleteProject(name);
            updateTodosField('unplaced');
            menuItem.remove();
        });
    };

    const updateTodoView = (
        todo,
        {
            todoName,
            todoDesc,
            todoDate,
            todoPriority,
            todoContainer,
            inputCheckboxTodo,
        },
    ) => {
        todoName.textContent = todo.getName();
        todoDesc.textContent = todo.getDescription();
        todoDate.textContent = todo.getDate();
        if (todo.getPriority()) {
            todoPriority.classList.remove('hidden');
            todoPriority.textContent = 'important';
        } else {
            todoPriority.classList.add('hidden');
        }
        if (todo.getStatus()) {
            switchTodoStatusView(todoName, todoContainer);
        }
    };

    const createTodoOption = (name) => {
        const option = document.createElement('option');
        option.setAttribute('value', name.toLowerCase());
        option.textContent = name;
        if (name === app.getActiveProject()) {
            option.setAttribute('selected', '');
        }
        return option;
    };

    const getTodoSelectOptions = () => {
        return app.getProjectsNames().map((name) => createTodoOption(name));
    };

    return { init };
};

export { ScreenController };
