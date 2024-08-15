'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'type', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Products', 'rating', {
      type: Sequelize.DECIMAL(2, 1),
    });
    await queryInterface.addColumn('Products', 'reviews_count', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'type');
    await queryInterface.removeColumn('Products', 'rating');
    await queryInterface.removeColumn('Products', 'reviews_count');
  },
};