// Import packages
const express = require('express');

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use('/home', (req, res) => {
  return res.status(200).json({
    title: 'Express Testing',
    message: 'The app is working properly!',
  });
});

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
