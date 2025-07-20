const Movie = require('../models/Movie');
const User = require('../models/User');

// Get personalized recommendations
exports.getPersonalizedRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.user.user_id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const recommendations = await Movie.find({
            $or: [
                { genre: { $in: user.preferences.genres } },
                { director: { $in: user.preferences.directors } },
                { cast: { $in: user.preferences.actors } }
            ]
        }).sort({ popularity: -1 }).skip(skip).limit(limit);

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get similar titles
exports.getSimilarTitles = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const similarTitles = await Movie.find({
            $or: [
                { genre: { $in: movie.genre } },
                { director: movie.director }
            ],
            _id: { $ne: movie._id }
        }).sort({ popularity: -1 }).skip(skip).limit(limit);

        res.status(200).json(similarTitles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get trending movies
exports.getTrendingMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const trendingMovies = await Movie.find()
            .sort({ popularity: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json(trendingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get top-rated movies
exports.getTopRatedMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const topRatedMovies = await Movie.find()
            .sort({ averageRating: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json(topRatedMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
