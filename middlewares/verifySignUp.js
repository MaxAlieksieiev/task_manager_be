const db = require('../models');
const User = db.user;

checkDuplicateEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    next();
  } else {
    return res.status(400).send(
        'Email is already in use',
    );
  }
};

const verifySigUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySigUp;
