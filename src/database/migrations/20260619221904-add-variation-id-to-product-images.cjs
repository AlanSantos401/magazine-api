'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('product_images', 'variation_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'product_variations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('product_images', 'variation_id');
  },
};