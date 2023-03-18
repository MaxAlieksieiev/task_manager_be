"use strict";

module.exports = (sequelize, DataTypes) => {
  const refreshToken = sequelize.define(
    "refreshToken",
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {}
  );
  refreshToken.associate = function (models) {
    models.refreshToken.belongsTo(models.user, {
      foreignKeyConstraint: true,
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  refreshToken.removeAttribute("id");
  return refreshToken;
};

