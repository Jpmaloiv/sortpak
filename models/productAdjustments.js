module.exports = function(sequelize, DataTypes) {
    var productAdjustments = sequelize.define("productAdjustments", {
        orderDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        adjustId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        memo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        qtyChange: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lot: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expiration: {
            type: DataTypes.STRING,
            allowNull: true
        },
        writtenBy: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    productAdjustments.associate = function (models) {
        models.productAdjustments.belongsTo(models.Products, {
            foreignKey: {
                allowNull: false
            }
        })
    };


return productAdjustments; 
};