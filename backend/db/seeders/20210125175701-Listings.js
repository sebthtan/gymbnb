const faker = require('faker')
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max) + 1)
    }
    const newData = []
    for (let i = 0; i < 250; i++) {
      const seed = {
        address: faker.address.streetAddress(),
        cityId: getRandomInt(49),
        hostId: getRandomInt(2),
        title: faker.company.companyName(),
        pricePer: faker.finance.amount(),
        description: faker.lorem.paragraph(),
        wifi: faker.random.boolean(),
        freeWeights: faker.random.boolean(),
        machineWeights: faker.random.boolean(),
        cardio: faker.random.boolean(),
        pool: faker.random.boolean(),
        lockerRoom: faker.random.boolean(),
        showers: faker.random.boolean(),
      }
      newData.push(seed)
    }
    newData.push({
      address: '2311  Sundown Lane',
      cityId: 44,
      hostId: 1,
      title: 'Gymshark Gym',
      pricePer: 1200.00,
      description: 'This gym is very expensive for no reason.',
      wifi: faker.random.boolean(),
      freeWeights: faker.random.boolean(),
      machineWeights: faker.random.boolean(),
      cardio: faker.random.boolean(),
      pool: faker.random.boolean(),
      lockerRoom: faker.random.boolean(),
      showers: faker.random.boolean(),
    },
      {
        address: '2286  Sundown Lane',
        cityId: 44,
        hostId: 1,
        title: 'Yessir Gym',
        pricePer: 1000.00,
        description: 'This is a very descriptive description of a nice gym.',
        wifi: faker.random.boolean(),
        freeWeights: faker.random.boolean(),
        machineWeights: faker.random.boolean(),
        cardio: faker.random.boolean(),
        pool: faker.random.boolean(),
        lockerRoom: faker.random.boolean(),
        showers: faker.random.boolean(),
      })

    return queryInterface.bulkInsert('Listings', newData, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Listings', null, {});

  }
};
