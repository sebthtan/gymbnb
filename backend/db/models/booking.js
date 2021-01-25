'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    isAvailable: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    listingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Booking.associate = function (models) {
    Booking.belongsTo(models.Listing, { foreignKey: 'listingId' })
    Booking.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Booking;
};
