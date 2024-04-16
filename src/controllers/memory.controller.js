const { memories } = require('../models');

const createMemo = async (req, res) => {
  const { title, body, userId } = req.body;

  if (!title || !body) {
    return res.status(400).send({
      message: 'Field must not empty',
    });
  }

  await memories.create({
    title,
    body,
    userId,
  });

  return res.status(201).send({
    message: 'Create Memo Succses',
  });
};

// get all memo
const getMemo = async (req, res) => {
  const data = await memories.findAll();

  if (!data) {
    return res.status(400).send({
      message: 'data empty',
    });
  }

  return res.status(200).send({
    message: 'succes get memo',
    memo: data,
  });
};

// get detail data memo by id
const getDetailMemo = async (req, res) => {
  const idMemo = req.params.id;

  const data = await memories.findAll({
    where: { id: idMemo },
  });

  if (!data) {
    return res.status(400).send({
      message: 'data empty',
    });
  }

  return res.status(200).send({
    message: 'succes get detail memo',
    detail: data,
  });
};

// put data memo by id
const updateMemo = async (req, res) => {
  const data = req.params.id;
  const { title, body } = req.body;

  const up = await memories.update(
    {
      title,
      body,
    },
    { where: { id: data } }
  );

  if (!up) {
    return res.status(404).send({
      message: 'update data memo failed',
    });
  }

  return res.status(201).send({
    message: 'update data memo succes',
  });
};

// delete data memo by id
const deleteMemo = async (req, res) => {
  const data = req.params.id;
  const del = await memories.destroy({ where: { id: data } });

  if (!del) {
    return res.status(404).send({
      message: 'deleted data memo failed',
    });
  }

  return res.status(200).send({
    message: 'deleted data memo succes',
  });
};
module.exports = {
  createMemo,
  getMemo,
  getDetailMemo,
  deleteMemo,
  updateMemo,
};
