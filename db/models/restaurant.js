"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      this.belongsToMany(models.user, {
        through: models.reservation,
      });
      this.hasMany(models.reservation);
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      openingHours: DataTypes.STRING,
      cuisine: DataTypes.STRING,
      price: DataTypes.STRING,
      imageData: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "restaurant",
    }
  );
  return Restaurant;
};
