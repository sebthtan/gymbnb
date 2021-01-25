'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [{
      isAvailable: true,
      startDate: new Date(2021, 2, 1),
      endDate: new Date(2021, 2, 3),
      listingId: 1,
      userId: 4,
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Bookings', null, {});

  }
};
