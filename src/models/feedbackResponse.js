module.exports = (sequelize, DataTypes) => {
  const FeedbackResponse = sequelize.define('FeedbackResponse', {
    responseID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    feedbackID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Feedbacks',
        key: 'feedbackID',
      }
    },
    questionID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Questions',
        key: 'questionID',
      }
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return FeedbackResponse;
};
