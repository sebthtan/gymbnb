'use strict';
module.exports = (sequelize, DataTypes) => {
  const Host = sequelize.define('Host', {
    userId: DataTypes.INTEGER
  }, {});
  Host.associate = function (models) {
    Host.belongsTo(models.User, { foreignKey: 'userId' })
    Host.hasMany(models.Listing, { foreignKey: 'hostId' })
  };
  return Host;
};
