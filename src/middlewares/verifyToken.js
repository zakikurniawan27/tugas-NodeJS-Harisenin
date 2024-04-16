const jwt = require('jsonwebtoken');

const verif = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).send({
        message: 'No token provided',
      });
    }

    const check = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    if (!check) {
      return res.status(403).send({
        message: 'Failed to authenticate jwt',
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

module.exports = { verif };
