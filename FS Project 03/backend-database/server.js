require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/items');

const app = express();

// Connect to MongoDB before starting the server
connectDB();

app.use(express.json()); // parse JSON request bodies

// Mount CRUD routes
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
  res.send('Project 3: Database Integration API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
