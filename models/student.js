'use strict';
const {encrypt} = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Student extends Model {}
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    path_photos: DataTypes.STRING,
  }, {sequelize,
    hooks: {
      beforeCreate: (student) => {
        student.password = encrypt(student.password)
      }
    }
  });
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Course,{through:models.StudentCourse})
  };
  return Student;
};