"use strict";

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "ijar",
        address: "Karawang",
        age: 20,
        role: "SuperAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);

    const users = await User.findAll();

    await queryInterface.bulkInsert(
      "Auths",
      [
        {
          email: "idzhar@gmail.com",
          password:
            "$2a$12$np/Sb4W/1/NNVThTBJK2WOzmJ4SKcr1dD62sig9X0xIXV6YKbBA1S",
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
