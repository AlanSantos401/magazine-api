import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        slug: Sequelize.STRING,
        parent_id: Sequelize.INTEGER,
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
