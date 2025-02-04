import { AppController } from '../controllers/AppController';

class Project {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

export default Project;
