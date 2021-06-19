const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Entry = require('../models/Entry');

router.get('/', auth, async (req, res) => {
  try {
    const entries = Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', [auth, [
  body('title', 'A title is required')
    .not().isEmpty(),
  body('body', 'A body is required')
    .not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, body, type } = req.body;

  try {
    const newEntry = new Entry({
      title,
      body,
      type,
      user: req.user.id
    });

    const entry = await newEntry.save();

    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, body, type } = req.body;

  // Build contact object
  const EntryFields = {};

  if (title) entryFields.title = title;
  if (body) entryFields.body = body;
  if (type) entryFields.type = type;

  try {
    let entry = await Entry.findById(req.params.id);

    if (!entry) return res.status(404).json({ msg: 'Entry not found' });

    // Ensure user owns contact
    if (entry.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Not authorized' });
    }

    entry = await Entry.findByIdAndUpdate(
      req.params.id, 
      { $set: entryFields },
      { new: true }
    );

    res.json(entry);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.id);

    if (!entry) return res.status(404).json({ msg: 'Entry not found' });

    // Ensure user owns contact
    if (entry.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Not authorized' });
    }

    await Entry.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Entry deleted' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;