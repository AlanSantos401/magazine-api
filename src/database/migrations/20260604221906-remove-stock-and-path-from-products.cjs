'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('products', 'stock');
    await queryInterface.removeColumn('products', 'path');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'stock', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('products', 'path', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};