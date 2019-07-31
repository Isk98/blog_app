'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      image: 'image.jpg',
      title: 'article',
      author: 'ilva iskurti',
      body: 'this is an article',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {})
   
  }
};
