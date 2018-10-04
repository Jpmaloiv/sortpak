
module.exports = function(sequelize, DataTypes) {
    var Visits = sequelize.define("Visits", {
        dateTime: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }); 
    Visits.associate = function(models) {
        models.Visits.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Visits; 
  };