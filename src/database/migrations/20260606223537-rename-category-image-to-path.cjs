'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('categories', 'image', 'path');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('categories', 'path', 'image');
  },
};