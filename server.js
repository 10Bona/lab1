const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('static'))
app.use(express.json());
app.use('/api/recipes', recipeRoutes);

// Serve static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected!")
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});