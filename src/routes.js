import { Router } from 'express';
import multer from 'multer';

import AddressController from './app/controllers/AddressController.js';
import BannerController from './app/controllers/BannerController.js';
import CategoryController from './app/controllers/CategoryController.js';
import ConfirmEmailController from './app/controllers/ConfirmEmailController.js';
import ForgotPasswordController from './app/controllers/ForgotPasswordController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductController.js';
import ProductHighlightsController from './app/controllers/ProductHighlightsController.js';
import ProductImagesController from './app/controllers/ProductImagesController.js';
import ProductSpecificationsController from './app/controllers/ProductSpecificationsController.js';
import ProductVariationController from './app/controllers/ProductVariationController.js';
import ResetPasswordController from './app/controllers/ResetPasswordController.js';
import SessionController from './app/controllers/SessionController.js';
import SubCategoryController from './app/controllers/SubCategoryController.js';
import UserController from './app/controllers/UserController.js';

import AdminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';

import multerConfig from './config/multer.cjs';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/confirm-email', ConfirmEmailController.update);

routes.post('/forgot-password', ForgotPasswordController.store);
routes.put('/reset-password', ResetPasswordController.update);

routes.get('/subcategories', SubCategoryController.index);

routes.get('/products', ProductController.index);
routes.get('/product-variations', ProductVariationController.index);
routes.get('/product-images', ProductImagesController.index);
routes.get('/categories', CategoryController.index);
routes.get('/product-specifications', ProductSpecificationsController.index);
routes.get('/product-highlights', ProductHighlightsController.index);
routes.get('/banners', BannerController.index);

routes.use(authMiddleware);

routes.patch('/users/me', UserController.update);
routes.delete('/users/me', UserController.delete);

routes.post('/addresses', AddressController.store);
routes.get('/addresses', AddressController.index);
routes.patch('/addresses/:id', AddressController.update);
routes.delete('/addresses/:id', AddressController.delete);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);

routes.post('/subcategories', AdminMiddleware, SubCategoryController.store);

routes.delete(
  '/subcategories/:id',
  AdminMiddleware,
  SubCategoryController.delete,
);

routes.post('/products', AdminMiddleware, ProductController.store);
routes.patch('/products/:id', AdminMiddleware, ProductController.update);
routes.delete('/products/:id', AdminMiddleware, ProductController.delete);

routes.post(
  '/product-variations',
  AdminMiddleware,
  upload.single('file'),
  ProductVariationController.store,
);
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
routes.patch(
  '/categories/:id/image',
  upload.single('file'),
  CategoryController.updateImage,
);

routes.post(
  '/product-specifications',
  AdminMiddleware,
  ProductSpecificationsController.store,
);

routes.delete(
  '/product-specifications/:id',
  AdminMiddleware,
  ProductSpecificationsController.delete,
);

routes.post(
  '/product-highlights',
  AdminMiddleware,
  ProductHighlightsController.store,
);

routes.delete(
  '/product-highlights/:id',
  AdminMiddleware,
  ProductHighlightsController.delete,
);

routes.post(
  '/product-images',
  AdminMiddleware,
  upload.array('images', 4),
  ProductImagesController.store
);
routes.delete(
  '/product-images/:id',
  AdminMiddleware,
  ProductImagesController.delete,
);

routes.put('/orders/:id', AdminMiddleware, OrderController.update);

routes.post(
  '/banners',
  AdminMiddleware,
  upload.single('file'),
  BannerController.store,
);
routes.patch('/banners/:id/toggle', AdminMiddleware, BannerController.toggle);
routes.delete('/banners/:id', AdminMiddleware, BannerController.delete);

export default routes;
