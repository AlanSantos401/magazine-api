import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        brand: Sequelize.STRING,

        installments: Sequelize.INTEGER,
        product_condition: Sequelize.STRING,

        average_rating: Sequelize.DECIMAL,
        reviews_count: Sequelize.INTEGER,

        featured: Sequelize.BOOLEAN,
        warranty: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'products',
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });

    this.hasMany(models.ProductVariation, {
      foreignKey: 'product_id',
      as: 'variations',
    });
  }
}

export default Product;
