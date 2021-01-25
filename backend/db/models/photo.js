'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    url: DataTypes.STRING,
    caption: DataTypes.TEXT,
    listingId: DataTypes.INTEGER
  }, {});
  Photo.associate = function (models) {
    Photo.belongsTo(models.Listing, { foreignKey: 'listingId' })
  };
  return Photo;
};
