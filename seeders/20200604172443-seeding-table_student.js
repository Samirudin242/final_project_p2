'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Students', [{
          first_name: 'Sam',
          last_name: 'Rudin',
          gender: 'Male',
          phone_number: '082347497133',
          password: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          first_name: 'Fauzan',
          last_name: 'Alamsyah',
          gender: 'Male',
          password: 'admin',
          phone_number: '082382542712',
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
     return queryInterface.bulkDelete('Students', null, {});
  }
};
