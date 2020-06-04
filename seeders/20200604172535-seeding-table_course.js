'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Courses', [{
          name: 'Ruang Guru',
          location: "Jakarta",
          student:1,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name: 'Zenius',
          location: "Bandung",
          student:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Courses', null, {});
  }
};
