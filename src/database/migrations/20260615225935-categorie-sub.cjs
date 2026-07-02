'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove a FK antiga
    await queryInterface.removeConstraint(
      'products',
      'products_category_id_fkey'
    );

    // Cria a FK nova apontando para subcategories
    await queryInterface.addConstraint('products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'products_category_id_fkey',
      references: {
        table: 'subcategories',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a FK da subcategoria
    await queryInterface.removeConstraint(
      'products',
      'products_category_id_fkey'
    );

    // Volta para categories
    await queryInterface.addConstraint('products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'products_category_id_fkey',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
};