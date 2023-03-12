const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;

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
      expiresIn: 86400,
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};

const authController = {
  signIn: signIn,
  signUp: signUp,
};

module.exports = authController;
