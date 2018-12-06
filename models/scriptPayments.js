
module.exports = function (sequelize, DataTypes) {
    var scriptPayments = sequelize.define("scriptPayments", {
        amount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        claim: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    scriptPayments.associate = function (models) {
        models.scriptPayments.belongsTo(models.Scripts, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return scriptPayments;
};