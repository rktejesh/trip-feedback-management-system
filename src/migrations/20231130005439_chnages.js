const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Drivers", deps: []
 * createTable() => "Questions", deps: []
 * createTable() => "TransportManagers", deps: []
 * createTable() => "Travelers", deps: []
 * createTable() => "Users", deps: []
 * createTable() => "Trips", deps: [Drivers, Travelers]
 * createTable() => "Feedbacks", deps: [Trips, Travelers]
 * createTable() => "FeedbackResponses", deps: [Feedbacks, Questions]
 *
 */

const info = {
  revision: 1,
  name: "chnages",
  created: "2023-11-30T00:54:39.703Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Drivers",
      {
        driverID: {
          type: Sequelize.INTEGER,
          field: "driverID",
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        licenseNumber: {
          type: Sequelize.STRING,
          field: "licenseNumber",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Questions",
      {
        questionID: {
          type: Sequelize.INTEGER,
          field: "questionID",
          autoIncrement: true,
          primaryKey: true,
        },
        content: { type: Sequelize.TEXT, field: "content", allowNull: false },
        questionType: {
          type: Sequelize.STRING,
          field: "questionType",
          allowNull: false,
        },
        options: { type: Sequelize.JSON, field: "options" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "TransportManagers",
      {
        managerID: {
          type: Sequelize.INTEGER,
          field: "managerID",
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        verifyToken: {
          type: Sequelize.STRING,
          field: "verifyToken",
          defaultValue: null,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          field: "isVerified",
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Travelers",
      {
        travelerID: {
          type: Sequelize.INTEGER,
          field: "travelerID",
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        verifyToken: {
          type: Sequelize.STRING,
          field: "verifyToken",
          defaultValue: null,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          field: "isVerified",
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          allowNull: false,
        },
        lastName: { type: Sequelize.STRING, field: "lastName" },
        email: { type: Sequelize.STRING, field: "email", allowNull: false },
        password: { type: Sequelize.STRING, field: "password" },
        profilePic: { type: Sequelize.STRING, field: "profilePic" },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          field: "isAdmin",
          defaultValue: false,
        },
        verifyToken: {
          type: Sequelize.STRING,
          field: "verifyToken",
          defaultValue: null,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          field: "isVerified",
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Trips",
      {
        tripID: {
          type: Sequelize.INTEGER,
          field: "tripID",
          autoIncrement: true,
          primaryKey: true,
        },
        date: { type: Sequelize.DATE, field: "date", allowNull: false },
        destination: {
          type: Sequelize.STRING,
          field: "destination",
          allowNull: false,
        },
        driverID: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: true,
          field: "driverID",
          references: { model: "Drivers", key: "driverID" },
        },
        travelerID: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: true,
          field: "travelerID",
          references: { model: "Travelers", key: "TravelerID" },
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Feedbacks",
      {
        feedbackID: {
          type: Sequelize.INTEGER,
          field: "feedbackID",
          autoIncrement: true,
          primaryKey: true,
        },
        tripID: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: true,
          field: "tripID",
          references: { model: "Trips", key: "tripID" },
        },
        travelerID: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: true,
          field: "travelerID",
          references: { model: "Travelers", key: "travelerID" },
        },
        feedbackDate: {
          type: Sequelize.DATE,
          field: "feedbackDate",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "FeedbackResponses",
      {
        responseID: {
          type: Sequelize.INTEGER,
          field: "responseID",
          autoIncrement: true,
          primaryKey: true,
        },
        feedbackID: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          allowNull: true,
          field: "feedbackID",
          references: { model: "Feedbacks", key: "feedbackID" },
        },
        questionID: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          allowNull: true,
          field: "questionID",
          references: { model: "Questions", key: "questionID" },
        },
        response: { type: Sequelize.TEXT, field: "response", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Drivers", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Feedbacks", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["FeedbackResponses", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Questions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["TransportManagers", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Travelers", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Trips", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
