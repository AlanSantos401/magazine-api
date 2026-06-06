import { Router } from 'express';
import multer from 'multer';
import AddressController from './app/controllers/AddressController.js';
import CategoryController from './app/controllers/CategoryController.js';
import ConfirmEmailController from './app/controllers/ConfirmEmailController.js';
import ForgotPasswordController from './app/controllers/ForgotPasswordController.js';
import ProductController from './app/controllers/ProductController.js';
import ProductVariationController from './app/controllers/ProductVariationController.js';
import ResetPasswordController from './app/controllers/ResetPasswordController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import multerConfig from './config/multer.cjs';
import AdminMiddleware from './middlewares/admin.js';
import authMiddleware from './middlewares/auth.js';
import OrderController from './app/controllers/OrderController.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/confirm-email', ConfirmEmailController.update);

routes.post('/forgot-password', ForgotPasswordController.store);
routes.put('/reset-password', ResetPasswordController.update);

routes.use(authMiddleware);
routes.patch('/users/me', UserController.update);
routes.delete('/users/me', UserController.delete);

// Endereços
routes.post('/addresses', AddressController.store);
routes.get('/addresses', AddressController.index);
routes.patch('/addresses/:id', AddressController.update);
routes.delete('/addresses/:id', AddressController.delete);

routes.post('/products', AdminMiddleware, ProductController.store);
routes.get('/products', ProductController.index);
routes.patch('/products/:id', AdminMiddleware, ProductController.update);
routes.delete('/products/:id', AdminMiddleware, ProductController.delete);
routes.post(
  '/product-variations',
  AdminMiddleware,
  upload.single('file'),
  ProductVariationController.store,
);
routes.get('/product-variations', ProductVariationController.index);
routes.put(
  '/product-variations/:id',
  AdminMiddleware,
  upload.single('file'),
  ProductVariationController.update,
);
routes.delete(
  '/product-variations/:id',
  AdminMiddleware,
  ProductVariationController.delete,
);

routes.post('/categories', AdminMiddleware, CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/orders', AdminMiddleware, OrderController.store);

export default routes;
