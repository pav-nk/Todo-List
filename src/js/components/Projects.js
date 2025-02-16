import { Project } from './Projects';

const Projects = () => {
    const projects = [];

    const createProject = (name) => {
        const project = Project(name);
        projects.push(project);
    };

    const getAllProjectNames = () => {
        return projects.map((project) => project.getName());
    };

    const deleteProject = (id) => {
        projects = projects.filter((project) => id !== project.id);
    };
};

export { Projects };
