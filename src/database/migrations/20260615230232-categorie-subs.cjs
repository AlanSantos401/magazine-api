'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'products',
      'products_category_id_fkey'
    );

    await queryInterface.addConstraint('products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'products_category_id_fkey',
      references: {
        table: 'subcategories',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'products',
      'products_category_id_fkey'
    );

    await queryInterface.addConstraint('products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'products_category_id_fkey',
      references: {
        table: 'categories',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};