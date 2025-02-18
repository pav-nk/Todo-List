import { Project } from './Project';

const Projects = () => {
    let projects = [Project('unplaced')];

    const createProject = (name) => {
        const project = Project(name);
        projects.push(project);
        return project;
    };

    const getAllProjectNames = () => {
        return projects.map((project) => project.getName());
    };

    const deleteProject = (id) => {
        projects = projects.filter((project) => id !== project.id);
    };

    return { getAllProjectNames, createProject, deleteProject };
};

export { Projects };
