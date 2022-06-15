// Import packages
const express = require('express');

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use('/home', (req, res) => {
  res.send({ mgs: 'working' });
});

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
