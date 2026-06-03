import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        brand: Sequelize.STRING,

        old_price: Sequelize.DECIMAL,
        price: Sequelize.DECIMAL,
        offer_price: Sequelize.DECIMAL,

        installments: Sequelize.INTEGER,
        product_condition: Sequelize.STRING,

        average_rating: Sequelize.DECIMAL,
        reviews_count: Sequelize.INTEGER,

        stock: Sequelize.INTEGER,
        featured: Sequelize.BOOLEAN,
        path: Sequelize.STRING,
        warranty: Sequelize.INTEGER,

        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
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
  }
}

export default Product;
