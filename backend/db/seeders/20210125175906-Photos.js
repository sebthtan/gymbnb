const faker = require('faker')
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max))
    }
    const newData = []
    for (let i = 1; i < 50; i++) {
      const seed = {
        url: faker.image.imageUrl(),
        caption: faker.lorem.sentence(),
        listingId: getRandomInt(40)
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
