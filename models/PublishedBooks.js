module.exports = function(sequelize, DataTypes) {
    var PublishedBooks = sequelize.define("PublishedBooks", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }); 
    PublishedBooks.associate = function(models) {
        models.PublishedBooks.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return PublishedBooks; 
  };