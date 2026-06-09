module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('categories', 'parent_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'parent_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};