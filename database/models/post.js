/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User);
      Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'PostId',
        as: 'likes',
      });
    }
  };
  Post.init({
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
