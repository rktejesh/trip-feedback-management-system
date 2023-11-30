module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    feedbackID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tripID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Trips',
        key: 'tripID',
      }
    },
    travelerID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Travelers',
        key: 'travelerID',
      }
    },
    feedbackDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  return Feedback;
};
