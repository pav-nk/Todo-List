const Project = (name) => {
    let currentName = name;
    const id = Date.now();

    const getName = () => {
        return currentName;
    };

    const getId = () => id;

    return { getName, getId };
};

export { Project };
