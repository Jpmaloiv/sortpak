

module.exports = function(sequelize, DataTypes) {
    var scriptAttachments = sequelize.define("Script Attachments", {
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
    }); 
    scriptAttachments.associate = function(models) {
        models.Physicians.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return scriptAttachments; 
  };