import { Router } from 'express';
import ConfirmEmailController from './app/controllers/ConfirmEmailController.js';
import ForgotPasswordController from './app/controllers/ForgotPasswordController.js';
import ResetPasswordController from './app/controllers/ResetPasswordController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.post('/forgot-password', ForgotPasswordController.store);
routes.put('/reset-password', ResetPasswordController.update);
routes.get('/confirm-email', ConfirmEmailController.update);

export default routes;
