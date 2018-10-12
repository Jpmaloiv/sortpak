
module.exports = function(sequelize, DataTypes) {
    var scriptAttachments = sequelize.define("scriptAttachments", {
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
    scriptAttachments.associate = function(models) {
        models.scriptAttachments.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return scriptAttachments; 
  };