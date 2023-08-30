"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      // Define separate 1-M relationships with both Person and Personality models
      // to enable them to query junction model
      this.belongsTo(models.user);
      this.belongsTo(models.restaurant);
    }
  }
  Reservation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        references: {
          model: "restaurants",
          key: "id",
        },
      },
      reservationDate: DataTypes.DATE, //Timestamp format
      numOfGuests: DataTypes.INTEGER,
      remarks: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "reservation",
    }
  );
  return Reservation;
};
