import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import Address from '../app/models/Address.js';
import Banner from '../app/models/Banner.js';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import ProductHighlights from '../app/models/ProductHighlights.js';
import ProductImages from '../app/models/ProductImages.js';
import ProductSpecifications from '../app/models/ProductSpecifications.js';
import ProductVariation from '../app/models/ProductVariation.js';
import SubCategory from '../app/models/Subcategory.js';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const models = [
  User,
  Product,
  ProductVariation,
  ProductHighlights,
  ProductImages,
  ProductSpecifications,
  Category,
  SubCategory,
  Address,
  Banner,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.forEach((model) => {
      model.init(this.connection);
    });

    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }

  mongo() {
    this.mongooseConection = mongoose.connect(
      'mongodb://localhost:27017/jgames',
    );
  }
}

export default new Database();
