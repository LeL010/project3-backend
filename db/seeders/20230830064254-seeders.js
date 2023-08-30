"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        username: "superuserJerry",
        email: "admin@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Restaurant A",
        location: "International Building 360 Orchard Road #12-04",
        openingHours: "9.00am to 9.00pm",
        cuisine: "Western",
        price: "$$$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Restaurant B",
        location: "73 Bussorah Street",
        openingHours: "8.00am to 10.00pm",
        cuisine: "Korean",
        price: "$$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Restaurant C",
        location: "59 Ubi Avenue 1 #06-20 BIZLINK CENTRE",
        openingHours: "12.00pm to 12.00am",
        cuisine: "Indian",
        price: "$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
