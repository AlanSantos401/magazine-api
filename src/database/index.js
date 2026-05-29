import { Sequelize } from 'sequelize';
import Category from '../app/models/Category.js';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const models = [User, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
