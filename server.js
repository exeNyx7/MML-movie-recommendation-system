const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in Middleware for JSON parsing
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process with failure
});

// Routes
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
// const listRoutes = require('./routes/listRoutes');
// const communityRoutes = require('./routes/communityRoutes');

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/lists', listRoutes);
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
