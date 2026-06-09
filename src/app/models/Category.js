import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        slug: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'categories',
        underscored: true,
      },
    );

    return this;
  }
}

export default Category;
