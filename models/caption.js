'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    static associate(models) {
      this.belongsTo(models.Image, {
        foreignKey: 'imageId'
      });

      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }

  Caption.init({
    text: DataTypes.STRING,
    imageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caption',
  });

  return Caption;
};
