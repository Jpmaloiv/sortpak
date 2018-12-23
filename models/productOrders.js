module.exports = function(sequelize, DataTypes) {
    var productOrders = sequelize.define("productOrders", {
        orderDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        invoiceNum: {
            type: DataTypes.STRING,
            allowNull: true
        },
        vendor: {
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

    productOrders.associate = function (models) {
        models.productOrders.belongsTo(models.Products, {
            foreignKey: {
                allowNull: false
            }
        })
    };


return productOrders; 
};