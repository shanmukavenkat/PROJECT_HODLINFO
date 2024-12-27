const express = require('express');
const { getTop10 } = require('../database');

const router = express.Router();

router.get('/getTop10', async (req, res) => {
  try {
    const data = await getTop10();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;