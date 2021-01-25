'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    listingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    starsRating: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.Listing, { foreignKey: 'listingId' })
  };
  return Review;
};
