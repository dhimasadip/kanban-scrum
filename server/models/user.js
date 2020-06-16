'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Name can\'t be empty'
        },
        len: {
          args: [2,30],
          msg: 'Name must be 2-30 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Email can\'t be empty'
        },
        isEmail: {
          args: false,
          msg: 'Wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Password can\'t be empty'
        },
        len: {
          args: [8,20],
          msg: 'Password must be 8-20 characters'
        }
      }
    },
    organization: DataTypes.STRING
  }, { 
    hooks: {
      beforeCreate: (instance) => {
        instance.organization = 'Hacktiv8'
        instance.password = bcrypt.hashSync(instance.password, salt)
      }
    },
    sequelize })

  User.associate = function(models) {
    User.hasMany(models.Task, { foreignKey: 'UserId', targetKey: 'id' })
  }

  return User;
};