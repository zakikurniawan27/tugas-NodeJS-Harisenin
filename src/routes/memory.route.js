const express = require('express');
const {
  createMemo,
  getMemo,
  deleteMemo,
  updateMemo,
  getDetailMemo,
} = require('../controllers/memory.controller');
const { verif } = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/addMemo', verif, createMemo);
router.get('/allMemory', verif, getMemo);
router.get('/detailMemo/:id', verif, getDetailMemo);
router.delete('/deleteMemo/:id', verif, deleteMemo);
router.put('/updateMemo/:id', verif, updateMemo);
module.exports = router;
