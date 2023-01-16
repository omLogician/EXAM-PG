module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING
      },
      passwd:{
        type: DataTypes.STRING
      },
      published: {
        type: DataTypes.BOOLEAN
      },
    token: {
        type: DataTypes.STRING,
        default:''
    }
    });
  
    return Users;
  };