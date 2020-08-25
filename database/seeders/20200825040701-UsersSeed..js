'use strict';
const bcrypt = require('bcrypt');
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
    const PASSWORD = bcrypt.hashSync('password', 10);
    const newUsers = [];

    for (let i = 0; i < USERSAMOUNT; i++) {
      newUsers.push({
        email: random.email(),
        password: PASSWORD,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Users', newUsers);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
