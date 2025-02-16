const Project = (name) => {
    const name = name;
    const id = Date.now();

    const getName = () => {
        return this.name;
    };

    return { getName };
};

export { Project };
