const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('../models');

// registrasi
const register = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!firstName || !userName || !email || !password) {
    return res.status(400).send({
      message: 'field must not empty',
    });
  }

  const hashPassword = bcrypt.hashSync(password, 6);
  await users.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashPassword,
  });

  return res.status(201).send({
    message: 'Create user succes',
  });
};

// get data all user
const getUser = async (req, res) => {
  const data = await users.findAll();

  return res.status(200).send({
    message: 'succes get user',
    user: data,
  });
};

// get data memo by user id
const getMemoUser = async (req, res) => {
  const idUser = req.params.id;
  const data = await users.findAll({
    include: [
      {
        association: 'memo',
        required: false,
      },
    ],
    where: { id: idUser },
  });

  if (!data) {
    return res.status(404).send({
      message: 'data memory empty',
    });
  }
  return res.status(200).send({
    message: 'get data memory succes',
    data,
  });
};

// put data user by id
const updateUser = async (req, res) => {
  const data = req.params.id;
  const { firstName, lastName, userName, email } = req.body;

  const up = await users.update(
    {
      firstName,
      lastName,
      userName,
      email,
    },
    { where: { id: data } }
  );

  if (!up) {
    return res.status(404).send({
      message: 'update data user failed',
    });
  }
  return res.status(201).send({
    message: 'update data user succes',
  });
};

// delete data user by id
const deleteUser = async (req, res) => {
  try {
    const data = req.params.id;

    const del = users.destroy({
      where: { id: data },
    });
    if (!del) {
      return res.status(404).send({
        message: 'deleted data user failed',
      });
    }

    return res.status(200).send({
      message: 'deleted data user succes',
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  const User = await users.findOne({ where: { userName } });

  if (!User) {
    return res.status(400).send({
      message: 'error, user not found',
    });
  }

  const comparedPassword = bcrypt.compareSync(
    password,
    User.dataValues.password
  );
  if (!comparedPassword) {
    return res.status(400).send({
      message: 'error, incorrect password',
    });
  }

  const token = jwt.sign(
    { id: User.dataValues.id, userName: User.dataValues.userName },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );

  return res.status(200).send({
    message: 'Login Succes',
    data: token,
  });
};
module.exports = {
  register,
  getUser,
  getMemoUser,
  updateUser,
  login,
  deleteUser,
};
