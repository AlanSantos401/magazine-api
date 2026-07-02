import Sequelize, { Model } from 'sequelize';

class SubCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        slug: Sequelize.STRING,
        parent_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'subcategories',
        underscored: true,
      },
    );

    return this;
  }


  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'parent_id',
      as: 'category',
    });
  }
}

export default SubCategory;
