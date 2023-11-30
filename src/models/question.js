module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });
  return Question;
};
