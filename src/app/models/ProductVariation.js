import Sequelize, { Model } from 'sequelize';

class ProductVariation extends Model {
  static init(sequelize) {
    super.init(
      {
        sku: Sequelize.STRING,
        color: Sequelize.STRING,

        old_price: Sequelize.DECIMAL,
        price: Sequelize.DECIMAL,
        offer_price: Sequelize.DECIMAL,

        stock: Sequelize.INTEGER,
        path: Sequelize.STRING,

        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'product_variations',
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

export default ProductVariation;
