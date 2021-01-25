'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      listingId: 1,
      userId: 4,
      starsRating: 4,
      content: 'a very good gym',
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
