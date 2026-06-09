import Sequelize, { Model } from 'sequelize';

class ProductHighlights extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: Sequelize.INTEGER,

        title: Sequelize.STRING,

        position: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'product_highlights',
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  }
}

export default ProductHighlights;