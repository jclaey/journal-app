const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get logged in user');
});

router.post('/', (req, res) => {
  res.send('Add entry');
});

router.put('/:id', (req, res) => {
  res.send('Edit an entry');
});

router.delete('/:id', (req, res) => {
  res.send('Delete an entry');
});

module.exports = router;