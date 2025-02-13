import { AppController } from '../controllers/App';

class Project {
    constructor(data) {
        this.name = data.name;
    }

    getName() {
        return this.name;
    }
}

export default Project;
