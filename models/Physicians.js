

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
        group: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rep: {
            type: DataTypes.STRING,
            allowNull: true
        },  
        specialization: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DEA: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NPI: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fax: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        physicianWarning: {
            type: DataTypes.STRING,
            allowNull: true
        }  
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