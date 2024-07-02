'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      email_verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      cognito_username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      iat: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      exp: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};