'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Course extends Model {}
  Course.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    student: DataTypes.INTEGER
  }, {sequelize});
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsToMany(models.Student,{through:models.StudentCourse})
  };
  return Course;
};