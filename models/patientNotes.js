
module.exports = function (sequelize, DataTypes) {
    var patientNotes = sequelize.define("patientNotes", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

   

    patientNotes.associate = function (models) {
        models.patientNotes.belongsTo(models.Patients, {
            foreignKey: {
                allowNull: false
            }
        })
        // models.patientNotes.belongsTo(models.User, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
    };

    return patientNotes;
};