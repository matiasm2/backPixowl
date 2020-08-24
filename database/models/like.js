/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
    }
  };
  Like.init({
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
