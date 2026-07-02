'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('product_images', 'product_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('product_images', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
