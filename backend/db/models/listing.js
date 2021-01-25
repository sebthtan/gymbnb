'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    address: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    hostId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    pricePer: DataTypes.NUMERIC,
    description: DataTypes.TEXT
  }, {});
  Listing.associate = function (models) {
    Listing.belongsTo(models.Host, { foreignKey: 'hostId' })
    Listing.belongsTo(models.City, { foreignKey: 'cityId' })
    Listing.hasMany(models.Review, { foreignKey: 'listingId' })
    Listing.hasMany(models.Photo, { foreignKey: 'listingId' })
    Listing.hasMany(models.Booking, { foreignKey: 'listingId' })
  };
  return Listing;
};
