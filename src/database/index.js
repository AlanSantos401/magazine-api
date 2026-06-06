import { Sequelize } from 'sequelize';
import Address from '../app/models/Address.js';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import ProductVariation from '../app/models/ProductVariation.js';
import User from '../app/models/User.js';

import databaseConfig from '../config/database.cjs';
import mongoose from 'mongoose';

const models = [User, Product, ProductVariation, Category, Address];

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
