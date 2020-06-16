'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Task extends Model {}

  const d = new Date().getDate()
  const m = new Date().getMonth()+1
  const y = new Date().getFullYear()
  const now = `${m}/${d}/${y}`


  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Title can\'t be empty'
        }
      }
    },
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validation: {
        isAfter: {
          args: new Date(now).toDateString().split('T')[0],
          msg: ' Due date must be today or after'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize })

  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id' })
  }

  return Task;
};