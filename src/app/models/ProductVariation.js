import Sequelize, { Model } from 'sequelize';

class ProductVariation extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: Sequelize.INTEGER,
        sku: Sequelize.STRING,
        color: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        offer_price: Sequelize.DECIMAL,
        stock: Sequelize.INTEGER,
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

    this.hasMany(models.ProductImages, {
      foreignKey: 'variation_id',
      as: 'images',
    });
  }
}

export default ProductVariation;
