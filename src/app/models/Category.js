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
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.SubCategory, {
      foreignKey: 'parent_id',
      as: 'subcategories',
    });

    this.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products',
    });
  }
}

export default Category;