module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
      driverID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return Driver;
  };
  