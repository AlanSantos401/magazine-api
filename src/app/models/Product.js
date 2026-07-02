import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        category_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        brand: Sequelize.STRING,
        product_condition: Sequelize.STRING,
        featured: Sequelize.BOOLEAN,
        product_type: Sequelize.STRING
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
    this.belongsTo(models.SubCategory, {
      foreignKey: 'category_id',
      as: 'subcategory',
    });

    this.hasMany(models.ProductVariation, {
      foreignKey: 'product_id',
      as: 'variations',
    });

    this.hasMany(models.ProductImages, {
      foreignKey: 'variation_id',
      as: 'images',
    });

    this.hasMany(models.ProductHighlights, {
      foreignKey: 'product_id',
      as: 'product_highlights',
    });

    this.hasMany(models.ProductSpecifications, {
      foreignKey: 'product_id',
      as: 'product_specifications',
    });
  }
}

export default Product;
