
module.exports = function (sequelize, DataTypes) {
    var groupNotes = sequelize.define("groupNotes", {
        group: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // private: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // }
    });

    return groupNotes;

};