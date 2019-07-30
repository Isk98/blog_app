'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      title: 'Some article',
      body: 'This is bla bla',
      author: 'Ilva Iskurti',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Another article',
      body: 'This is another article for..',
      author: 'Elisona Iskurti',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {})
   
  }
};
