const Todo = () => {
    const state = {
        id: Date.now(),
        name: null,
        date: new Date().toISOString().split('T')[0],
        isImportant: false,
        isToday: true,
        isCompleted: false,
        project: 'unplaced',
        description: '',
        isEditMode: true,
    };

    const switchStatus = () => {
        state.isCompleted = !state.isCompleted;
    };

    const getStatus = () => {
        return state.isCompleted;
    };

    const getId = () => {
        return state.id;
    };

    const getName = () => {
        return state.name;
    };

    const getDate = () => {
        return state.date;
    };

    const getPriority = () => {
        return state.isImportant;
    };

    const getDescription = () => {
        return state.description;
    };

    const getProject = () => {
        return state.project;
    };

    const getState = () => {
        return this.state;
    };

    const getEditModeValue = () => {
        return state.isEditMode;
    };

    const switchEditMode = () => {
        state.isEditMode = !state.isEditMode;
    };

    const updateState = ({ name, date, isImportant, description, project }) => {
        state.name = name;
        state.date = date;
        state.isImportant = isImportant;
        state.description = description;
        state.project = project;
    };

    return {
        updateState,
        getState,
        getId,
        getEditModeValue,
        getName,
        getDate,
        getPriority,
        getDescription,
        switchEditMode,
        switchStatus,
        getStatus,
        getProject,
    };
};

export { Todo };
