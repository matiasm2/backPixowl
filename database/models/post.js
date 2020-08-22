/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasOne(models.User, {as: 'creator'});
      Post.belongsToMany(models.User, {through: models.Like});
    }
  };
  Post.init({
    image: DataTypes.BLOB,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
