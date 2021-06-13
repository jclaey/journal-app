const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Hello from the untitled MERN project!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
