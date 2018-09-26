

module.exports = function(sequelize, DataTypes) {
    var Patients = sequelize.define("Patients", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }); 
    Patients.associate = function(models) {
        models.Patients.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Patients; 
  };