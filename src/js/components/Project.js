const Project = (name) => {
    let currentName = name;
    const id = Date.now();

    const getName = () => {
        return currentName;
    };

    return { getName };
};

export { Project };
