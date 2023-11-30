module.exports = (sequelize, DataTypes) => {
    const TransportManager = sequelize.define('TransportManager', {
        managerID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verifyToken: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['password', 'verifyToken'] },
        },
        scopes: {
            withSecretColumns: {
                attributes: { include: [] },
            },
        },
    });
    return TransportManager;
};
