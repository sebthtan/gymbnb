'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Listings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Cities' }
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Hosts' }
      },
      title: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      pricePer: {
        type: Sequelize.NUMERIC(6, 2),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      freeWeights: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      machineWeights: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      cardio: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      pool: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      lockerRoom: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      showers: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Listings');
  }
};
