import Sequelize, { Model } from 'sequelize';

class ProductSpecifications extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: Sequelize.INTEGER,

        key: Sequelize.STRING,

        value: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'product_specifications',
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

export default ProductSpecifications;
