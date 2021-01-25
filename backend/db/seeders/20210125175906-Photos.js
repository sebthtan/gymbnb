'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [{
      url: 'https://www.frameweb.com/assets/cover/293035',
      caption: 'a nice gym',
      listingId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Photos', null, {});

  }
};
