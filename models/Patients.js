
module.exports = function(sequelize, DataTypes) {
    var Patients = sequelize.define("Patients", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        patientWarning: {
            type: DataTypes.STRING,
            allowNull: true
        },
        conditions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        allergies: {
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
        primInsPlan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        primInsBIN: {
            type: DataTypes.STRING,
            allowNull: true
        },
        primInsPCN: {
            type: DataTypes.STRING,
            allowNull: true
        },
        primInsID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        primInsGroup: {
            type: DataTypes.STRING,
            allowNull: true
        },
        primInsType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secInsPlan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secInsBIN: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secInsPCN: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secInsID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secInsGroup: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secInsType: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }); 
    
    Patients.associate = function(models) {
        models.Patients.hasMany(models.Scripts, {
            onDelete: "cascade"
        });
    };
    return Patients; 
  };