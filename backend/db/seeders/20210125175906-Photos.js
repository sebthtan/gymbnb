const faker = require('faker')
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max) + 1)
    }
    const newData = []
    for (let i = 1; i < 750; i++) {
      const seed = {
        url: faker.image.imageUrl(),
        caption: faker.lorem.sentence(),
        listingId: getRandomInt(250)
      }
      newData.push(seed)
    }
    newData.push({
      url: 'https://www.frameweb.com/assets/cover/293035',
      caption: 'a nice gym',
      listingId: 31
    })

    return queryInterface.bulkInsert('Photos', newData, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Photos', null, {});

  }
};
