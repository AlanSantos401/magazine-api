import { Router } from 'express';
import CategoryController from './app/controllers/CategoryController.js';
import ConfirmEmailController from './app/controllers/ConfirmEmailController.js';
import ForgotPasswordController from './app/controllers/ForgotPasswordController.js';
import ProductController from './app/controllers/ProductController.js';
import ResetPasswordController from './app/controllers/ResetPasswordController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/confirm-email', ConfirmEmailController.update);

routes.post('/forgot-password', ForgotPasswordController.store);
routes.put('/reset-password', ResetPasswordController.update);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/products', ProductController.store);

export default routes;
