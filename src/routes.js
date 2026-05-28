import { Router } from 'express';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store)

export default routes;
