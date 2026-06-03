import { Router } from 'express';
import multer from 'multer';
import CategoryController from './app/controllers/CategoryController.js';
import ConfirmEmailController from './app/controllers/ConfirmEmailController.js';
import ForgotPasswordController from './app/controllers/ForgotPasswordController.js';
import ProductController from './app/controllers/ProductController.js';
import ResetPasswordController from './app/controllers/ResetPasswordController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';
import AdminMiddleware from './middlewares/admin.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/confirm-email', ConfirmEmailController.update);

routes.post('/forgot-password', ForgotPasswordController.store);
routes.put('/reset-password', ResetPasswordController.update);

routes.use(authMiddleware);
routes.post(
  '/products',
  AdminMiddleware,
  upload.single('file'),
  ProductController.store,
);
routes.get('/products', ProductController.index);
routes.patch('/products/:id', AdminMiddleware, ProductController.update);
routes.delete('/products/:id', AdminMiddleware, ProductController.delete)

routes.post('/categories', AdminMiddleware, CategoryController.store);
routes.get('/categories', CategoryController.index);

export default routes;
