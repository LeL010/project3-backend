"use strict";

const functions = require("../../helperFunctions");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Master of Naan",
        location: "International Building 360 Orchard Road #12-04",
        openingHours: "12.00pm to 5.45pm",
        cuisine: "Indian",
        price: "$$$",
        imageData: functions.toBlob("db/seeder-images/restaurant3.jpg"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wok Of Lyfe",
        location: "73 Bussorah Street",
        openingHours: "12.00pm to 5.45pm",
        cuisine: "Chinese",
        price: "$",
        imageData: functions.toBlob("db/seeder-images/restaurant1.jpg"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Meatmania!!!",
        location: "59 Ubi Avenue 1 #06-20 BIZLINK CENTRE",
        openingHours: "12.00pm to 5.45pm",
        cuisine: "Fine Dining",
        price: "$$$$$",
        imageData: functions.toBlob("db/seeder-images/restaurant2.jpg"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", null, {});
  },
};
