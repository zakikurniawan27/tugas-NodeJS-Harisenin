const express = require('express');
const {
  register,
  getUser,
  login,
  deleteUser,
  updateUser,
  getMemoUser,
} = require('../controllers/user.controller');
const { verif } = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/register', register);
router.get('/all', verif, getUser);
router.get('/memoUser/:id', verif, getMemoUser);
router.put('/updateUser/:id', verif, updateUser);
router.post('/login', login);
router.delete('/delete/:id', verif, deleteUser);

module.exports = router;
