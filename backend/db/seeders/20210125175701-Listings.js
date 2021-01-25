'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Listings', [
      {
        address: '12638 Ridgeline Blvd',
        cityId: 1,
        hostId: 1,
        title: 'Gymshark Gym',
        pricePer: 1200.00,
        description: 'descriptive'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Listings', null, {});

  }
};
