module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING(1500),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    User.associate = function (models) {
        models.User.hasMany(models.Scripts, {
            onDelete: "cascade"
        })
        models.User.hasMany(models.scriptStatuses, {
            onDelete: "cascade"
        })
        models.User.belongsTo(models.Physicians, {
            foreignKey: {
                name: 'PhysicianId',
                allowNull: true
            }
        })
    }

    return User;
};