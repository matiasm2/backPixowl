/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Post, {foreignKey: 'creatorId'});
      User.belongsToMany(models.Post, {through: models.Like});
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
