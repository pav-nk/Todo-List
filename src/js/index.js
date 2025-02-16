import 'spectre.css';
import '../scss/style.scss';

import { ScreenController } from './controllers/ScreenController';

document.addEventListener('DOMContentLoaded', () => {
    const app = ScreenController();
    app.init();
});
