module.exports = function(sequelize, DataTypes) {
    var products = sequelize.define("products", {
        DrugName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DrugNdc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DrugQty: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })


products.associate = function(models) {
    models.products.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    });
};
return products; 
};