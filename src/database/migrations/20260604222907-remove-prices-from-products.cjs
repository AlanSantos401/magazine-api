'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('products', 'old_price');
    await queryInterface.removeColumn('products', 'price');
    await queryInterface.removeColumn('products', 'offer_price');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'old_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.addColumn('products', 'offer_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
  },
};
