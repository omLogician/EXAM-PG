module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("events", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
        },
      location:{
        type: DataTypes.STRING
      }
    });
  
    return Events;
  };