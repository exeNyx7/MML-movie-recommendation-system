const Movie = require('../models/Movie');
const mongoose = require('mongoose');
const redisClient = require('../config/redisClient'); 


// Add a new movie
exports.addMovie = async (req, res) => {
    const { 
        title, 
        genre, 
        director, 
        cast, 
        releaseDate, 
        runtime, 
        synopsis, 
        averageRating, 
        movieCover, 
        trivia, 
        goofs, 
        soundtrackInfo, 
        ageRating, 
        parentalGuidance, 
        countryOfOrigin, 
        language, 
        keywords, 
        popularity, 
        viewCount 
    } = req.body;
    try {
        const movie = new Movie({
            title, 
            genre, 
            director, 
            cast, 
            releaseDate, 
            runtime, 
            synopsis, 
            averageRating, 
            movieCover, 
            trivia, 
            goofs, 
            soundtrackInfo, 
            ageRating, 
            parentalGuidance, 
            countryOfOrigin, 
            language, 
            keywords, 
            popularity, 
            viewCount
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


// Search and Filter Movies
exports.searchAndFilterMovies = async (req, res) => {
    const {
        title,
        genre,
        director,
        cast,
        minRating,
        maxRating,
        minPopularity,
        maxPopularity,
        releaseYear,
        countryOfOrigin,
        language,
        keywords,
        sortBy // Optional, can be 'rating', 'popularity', 'releaseYear', etc.
    } = req.query;

    // Initialize a query object
    const query = {};

    // Adding search and filter criteria
    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive title search
    if (genre) query.genre = genre; // Exact genre match
    if (director) query.director = { $regex: director, $options: 'i' };
    if (cast) query.cast = { $in: cast.split(',').map(actor => actor.trim()) };
    if (minRating || maxRating) query.averageRating = { $gte: minRating || 1, $lte: maxRating || 5 };
    if (minPopularity || maxPopularity) query.popularity = { $gte: minPopularity || 0, $lte: maxPopularity || 100 };
    if (releaseYear) query.releaseDate = {
        $gte: new Date(`${releaseYear}-01-01`),
        $lte: new Date(`${releaseYear}-12-31`)
    };
    if (countryOfOrigin) query.countryOfOrigin = { $regex: countryOfOrigin, $options: 'i' };
    if (language) query.language = { $regex: language, $options: 'i' };
    if (keywords) query.keywords = { $in: keywords.split(',').map(kw => kw.trim()) };

    // Sorting options
    const sortOptions = {};
    if (sortBy) {
        if (sortBy === 'rating') sortOptions.averageRating = -1;
        if (sortBy === 'popularity') sortOptions.popularity = -1;
        if (sortBy === 'releaseYear') sortOptions.releaseDate = -1;
    }

    try {
        const movies = await Movie.find(query).sort(sortOptions);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Top Movies of the Month
exports.getTopMoviesOfMonth = async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        console.log(`Fetching top movies from ${startOfMonth} to ${endOfMonth}`);

        const topMovies = await Movie.find({
            releaseDate: { $gte: startOfMonth, $lte: endOfMonth }
        })
        .sort({ averageRating: -1, popularity: -1 })
        .limit(10);

        res.status(200).json(topMovies);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to get top movies of the month" });
    }
};

// // Get Top 10 Movies by Genre
// exports.getTopMoviesByGenre = async (req, res) => {
//     try {
//         // First, retrieve all unique genres from the movies collection
//         const genres = await Movie.distinct('genre');

//         // Prepare an object to hold top movies for each genre
//         const topMoviesByGenre = {};

//         // Iterate over each genre and fetch top 10 movies
//         for (const genre of genres) {
//             const topMovies = await Movie.find({ genre: genre })
//                 .sort({ averageRating: -1, popularity: -1 }) // Sort by rating and popularity
//                 .limit(10); // Top 10 per genre

//             topMoviesByGenre[genre] = topMovies;
//         }

//         res.status(200).json(topMoviesByGenre);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getTopMoviesByGenre = async (req, res) => {
    try {
        const topMoviesByGenre = await Movie.aggregate([
            // Unwind the genres array to handle multiple genres per movie
            { $unwind: "$genre" },
            // Group by genre and collect movies
            {
                $group: {
                    _id: "$genre",
                    movies: { 
                        $push: {
                            title: "$title",
                            averageRating: "$averageRating",
                            popularity: "$popularity",
                            viewCount: "$viewCount",
                            releaseDate: "$releaseDate"
                        }
                    }
                }
            },
            // Sort movies within each genre by averageRating and popularity
            {
                $project: {
                    genre: "$_id",
                    movies: {
                        $slice: [
                            { 
                                $filter: {
                                    input: {
                                        $sortArray: { input: "$movies", sortBy: { averageRating: -1, popularity: -1 } }
                                    },
                                    as: "movie",
                                    cond: {}
                                }
                            },
                            10
                        ]
                    }
                }
            }
        ]);

        // Transform the aggregation result into a more readable format
        const formattedTopMovies = {};
        topMoviesByGenre.forEach(genreGroup => {
            formattedTopMovies[genreGroup.genre] = genreGroup.movies;
        });

        res.status(200).json(formattedTopMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single movie with updated view count
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        // Increment viewCount
        movie.viewCount += 1;
        await movie.save();

        res.status(200).json(movie);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Get Upcoming Movies
exports.getUpcomingMovies = async (req, res) => {
    const today = new Date();
    try {
        const upcomingMovies = await Movie.find({ releaseDate: { $gte: today } }).sort('releaseDate');
        res.status(200).json(upcomingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

