
module.exports = function(sequelize, DataTypes) {
    var patientAttachments = sequelize.define("patientAttachments", {
        dateAttached: {
            type: DataTypes.STRING,
            allowNull: true
        },
        attachedBy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true
        }    
    }); 
    patientAttachments.associate = function(models) {
        models.patientAttachments.belongsTo(models.Patients, {
            foreignKey: {
                allowNull: false
            }
        }),
        models.patientAttachments.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return patientAttachments; 
  };