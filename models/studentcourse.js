'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class StudentCourse extends Model {} 
  StudentCourse.init({
    StudentId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  }, {sequelize});
  StudentCourse.associate = function(models) {
    // associations can be defined here
  };
  return StudentCourse;
};