const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const refreshToken = sequelize.define('refreshToken', {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });

  refreshToken.createToken = async function(user) {
    const expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRATION,
    );

    const _token = uuidv4();

    const refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.dataValues.token;
  };

  refreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return refreshToken;
};
