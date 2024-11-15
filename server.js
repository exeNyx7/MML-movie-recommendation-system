const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in Middleware for JSON parsing
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// MongoDB Connection
connectDB();

// Routes
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const listRoutes = require('./routes/listRoutes');
const reminderRoutes = require('./routes/reminderRoutes'); 
const trailerRoutes = require('./routes/trailerRoutes');
// const communityRoutes = require('./routes/communityRoutes');

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/reminders', reminderRoutes); 
app.use('/api/trailers', trailerRoutes);
// app.use('/api/community', communityRoutes);

// Basic route for home
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Recommendation System API!');
});

// Import the centralized error handling middleware
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
