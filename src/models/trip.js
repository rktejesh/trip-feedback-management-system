module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    tripID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driverID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Drivers', // This is a reference to another model
        key: 'driverID', // This is the column name of the referenced model
      }
    },
    travelerID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Travelers',
        key: 'TravelerID',
      }
    }
  });
  return Trip;
};
