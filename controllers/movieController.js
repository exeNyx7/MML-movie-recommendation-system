const Movie = require('../models/Movie');

// Add a new movie
exports.addMovie = async (req, res) => {
    const { title, genre, director, cast, releaseDate, runtime, synopsis, averageRating, movieCover, trivia, goofs, soundtrackInfo, ageRating, parentalGuidance } = req.body;
    try {
        const movie = new Movie({
            title, genre, director, cast, releaseDate, runtime, synopsis, averageRating, movieCover, trivia, goofs, soundtrackInfo, ageRating, parentalGuidance
        });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a movie
exports.updateMovie = async (req, res) => {
    try {
        const update = req.body;
        const movie = await Movie.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).send('Movie deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a single movie
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Search for a movie by name, case insensitive
exports.searchMovieByName = async (req, res) => {
    const { name } = req.query; // Assume the query parameter is called 'name'
    try {
        const movie = await Movie.find({ title: { $regex: new RegExp(name, 'i') } }); // 'i' for case insensitive
        if (movie.length === 0) {
            return res.status(404).send('No movie found with that name');
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
