'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities', [
      { name: 'Birmingham', stateId: 1 },
      { name: 'Anchorage', stateId: 2 },
      { name: 'Phoenix', stateId: 3 },
      { name: 'Little Rock', stateId: 4 },
      { name: 'Los Angeles', stateId: 5 },
      { name: 'Denver', stateId: 6 },
      { name: 'Bridgeport', stateId: 7 },
      { name: 'Wilmington', stateId: 8 },
      { name: 'Jacksonville', stateId: 9 },
      { name: 'Atlanta', stateId: 10 },
      { name: 'Honolulu', stateId: 11 },
      { name: 'Boise', stateId: 12 },
      { name: 'Chicago', stateId: 13 },
      { name: 'Indianapolis', stateId: 14 },
      { name: 'Des Moines', stateId: 15 },
      { name: 'Wichita', stateId: 16 },
      { name: 'Louisville', stateId: 17 },
      { name: 'New Orleans', stateId: 18 },
      { name: 'Portland', stateId: 19 },
      { name: 'Baltimore', stateId: 20 },
      { name: 'Boston', stateId: 21 },
      { name: 'Detroit', stateId: 22 },
      { name: 'Minneapolis', stateId: 23 },
      { name: 'Jackson', stateId: 24 },
      { name: 'Kansas City', stateId: 25 },
      { name: 'Billings', stateId: 26 },
      { name: 'Omaha', stateId: 27 },
      { name: 'Las Vegas', stateId: 28 },
      { name: 'Manchester', stateId: 29 },
      { name: 'Newark', stateId: 30 },
      { name: 'Albuquerque', stateId: 31 },
      { name: 'New York City', stateId: 32 },
      { name: 'Charlotte', stateId: 33 },
      { name: 'Fargo', stateId: 34 },
      { name: 'Columbus', stateId: 35 },
      { name: 'Oklahoma City', stateId: 36 },
      { name: 'Portland', stateId: 37 },
      { name: 'Philadelphia', stateId: 38 },
      { name: 'Providence', stateId: 39 },
      { name: 'Charleston', stateId: 40 },
      { name: 'Sioux Falls', stateId: 41 },
      { name: 'Nashville', stateId: 42 },
      { name: 'Houston', stateId: 43 },
      { name: 'Austin', stateId: 43 },
      { name: 'Salt Lake City', stateId: 44 },
      { name: 'Burlington', stateId: 45 },
      { name: 'Virginia Beach', stateId: 46 },
      { name: 'Seattle', stateId: 47 },
      { name: 'Charleston', stateId: 48 },
      { name: 'Milwaukee', stateId: 49 },
      { name: 'Cheyenne', stateId: 50 },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Cities', null, {});

  }
};
