

module.exports = function(sequelize, DataTypes) {
    var Physicians = sequelize.define("Physicians", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: true
        },
        group: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salesRep: {
            type: DataTypes.STRING,
            allowNull: true
        },     
    }); 
    Physicians.associate = function(models) {
        models.Physicians.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Physicians; 
  };