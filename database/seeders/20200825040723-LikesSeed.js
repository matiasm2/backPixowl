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
    const newLikes = [];
    for (let i = 0; i < POSTSAMOUNT; i++) {
      newLikes.push({
        UserId: random.number({min: 0, max: USERSAMOUNT}),
        PostId: random.number({min: 0, max: POSTSAMOUNT}),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Likes', newLikes);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Likes', null, {});
  },
};
