
module.exports = function(sequelize, DataTypes) {
    var Scripts = sequelize.define("Scripts", {
        patient: {
            type: DataTypes.STRING,
            allowNull: true
        },
        medication: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pharmNPI: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pharmDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        writtenDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salesCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        billOnDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rxNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        primInsPay: {
            type: DataTypes.STRING,
            allowNull: true
        },
        diagnosis: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secInsPay: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secDiagnosis: {
            type: DataTypes.STRING,
            allowNull: true
        },
        patientPay: {
            type: DataTypes.STRING,
            allowNull: true
        },
        refills: {
            type: DataTypes.STRING,
            allowNull: true
        },
        refillsRemaining: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        daysSupply: {
            type: DataTypes.STRING,
            allowNull: true
        },
        directions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        copayApproval: {
            type: DataTypes.STRING,
            allowNull: true
        },
        copayNetwork: {
            type: DataTypes.STRING,
            allowNull: true
        },
        homeInfusion: {
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
    }); 
    Scripts.associate = function(models) {
        models.Scripts.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Scripts; 
  };