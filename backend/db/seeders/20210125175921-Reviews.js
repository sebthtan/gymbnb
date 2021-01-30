'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max) + 1)
    }
    const newData = []
    for (let i = 1; i < 750; i++) {
      const seed = {
        listingId: getRandomInt(249),
        userId: getRandomInt(49),
        starsRating: getRandomInt(4),
        content: faker.lorem.paragraphs()
      }
      newData.push(seed)
    }

    return queryInterface.bulkInsert('Reviews', newData, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
