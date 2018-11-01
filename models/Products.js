module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NDC: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        packageSize: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })


return Products; 
};