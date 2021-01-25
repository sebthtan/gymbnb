'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('States', [{
      name: 'Texas',
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('States', null, {});

  }
};
