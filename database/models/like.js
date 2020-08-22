/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
