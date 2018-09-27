module.exports = function(sequelize, DataTypes) {
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
        hash: {
            type: DataTypes.STRING(1500),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        /* role: {
            type: DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: DataTypes.STRING,
            allowNull: true
        } */
    }); 
    User.associate = function(models) {
      models.User.hasMany(models.Scripts, {
          onDelete: "cascade"
      });
    };

    return User; 
  };