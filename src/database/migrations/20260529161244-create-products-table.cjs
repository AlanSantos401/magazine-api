'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      old_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 12,
      },

      product_condition: {
        type: Sequelize.ENUM('new', 'used'),
        allowNull: false,
        defaultValue: 'new',
      },

      average_rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0,
      },

      reviews_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      offer_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      path: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      warranty: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
};
