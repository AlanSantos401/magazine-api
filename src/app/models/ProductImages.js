import Sequelize, { Model } from 'sequelize';

class ProductImages extends Model {
  static init(sequelize) {
    super.init(
      {
        variation_id: Sequelize.INTEGER,
        path: Sequelize.STRING,
        position: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        is_main: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'product_images',
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ProductVariation, {
      foreignKey: 'variation_id',
      as: 'variation',
    });
  }
}

export default ProductImages;
