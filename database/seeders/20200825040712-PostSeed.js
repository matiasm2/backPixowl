'use strict';
const random = require('random-world');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const USERSAMOUNT = 100;
    const POSTSAMOUNT = 100;
    const newPosts = [];
    for (let i = 0; i < POSTSAMOUNT; i++) {
      newPosts.push({
        UserId: random.number({min: 0, max: USERSAMOUNT}),
        image: random.country(),
        description: random.word({limit: 15}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Posts', newPosts);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Posts', null, {});
  },
};
