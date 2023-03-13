'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('refreshToken', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        expiryDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('refreshToken');
  },
};
