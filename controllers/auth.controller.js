const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;
const RefreshToken = db.refreshToken;

const signUp = async (req, res) => {
  const {email, password, phone} = req.body;
  try {
    const user = await User.create({
      email,
      phone,
      password: bcrypt.hashSync(password, 8),
    });
    if (user) {
      res.status(200).send({message: 'User was registered successfully!'});
    }
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};

const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: ['id', 'email', 'phone', 'password'],
    });

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        message: 'Password is wrong',
      });
    }

    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    const refreshToken = await RefreshToken.createToken(user);

    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token,
      refreshToken,
    });
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};

const refreshToken = async (req, res) => {
  const {refreshToken: requestToken} = req.body;

  if (!requestToken) {
    return res.status(400).send({
      message: 'Refresh token is required',
    });
  }

  try {
    const refreshToken = await RefreshToken.findOne({
      where: {
        token: requestToken,
      },
      include: [
        {model: db.user, as: 'user'},
      ],
    });

    if (!refreshToken) {
      return res.status(404).send({
        message: 'Refresh token wasn\'t found',
      });
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      await RefreshToken.destroy({where: {
        id: requestToken.id,
      }});

      return res.status(403).send({
        message: 'Refresh token was expired. Please make a new signin request',
      });
    }

    const user = await refreshToken.getUser();
    const userId = user?.dataValues?.id;

    if (!userId) {
      return res.status(404).send({
        message: 'User wasn\'t found by token',
      });
    }
    const newAccessToken = jwt.sign({id: userId}, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return res.status(200).json({
      newAccessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};

const authController = {
  signIn: signIn,
  signUp: signUp,
  refreshToken: refreshToken,
};

module.exports = authController;
