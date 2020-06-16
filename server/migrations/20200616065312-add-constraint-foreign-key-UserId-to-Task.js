'use strict';

const { query } = require("express");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Tasks', ['UserId'], {
      type: 'foreign key',
      name: 'custom_fkey_UserId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Tasks', 'custom_fkey_UserId', {})
  }
};
