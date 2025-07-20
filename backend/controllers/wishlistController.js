const Wishlist = require('../models/Wishlist');
const Movie = require('../models/Movie');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.user_id })
            .populate('movies', 'title genre director releaseDate averageRating movieCover runtime synopsis')
            .exec();

        if (!wishlist) {
            // Create empty wishlist for user if it doesn't exist
            const newWishlist = new Wishlist({
                user: req.user.user_id,
                movies: []
            });
            await newWishlist.save();
            return res.status(200).json({ movies: [] });
        }

        res.status(200).json({ movies: wishlist.movies });
    } catch (err) {
        console.error('Error getting wishlist:', err);
        res.status(500).json({ message: 'Error retrieving wishlist' });
    }
};

// Add movie to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { movieId } = req.body;

        if (!movieId) {
            return res.status(400).json({ message: 'Movie ID is required' });
        }

        // Check if movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Find or create wishlist for user
        let wishlist = await Wishlist.findOne({ user: req.user.user_id });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user.user_id,
                movies: []
            });
        }

        // Check if movie is already in wishlist
        if (wishlist.movies.includes(movieId)) {
            return res.status(400).json({ message: 'Movie is already in wishlist' });
        }

        // Add movie to wishlist
        wishlist.movies.push(movieId);
        await wishlist.save();

        // Populate movie details for response
        await wishlist.populate('movies', 'title genre director releaseDate averageRating movieCover runtime synopsis');

        res.status(200).json({
            message: 'Movie added to wishlist successfully',
            wishlist: wishlist.movies
        });
    } catch (err) {
        console.error('Error adding to wishlist:', err);
        res.status(500).json({ message: 'Error adding movie to wishlist' });
    }
};

// Remove movie from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { movieId } = req.params;

        if (!movieId) {
            return res.status(400).json({ message: 'Movie ID is required' });
        }

        // Find user's wishlist
        const wishlist = await Wishlist.findOne({ user: req.user.user_id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Check if movie is in wishlist
        if (!wishlist.movies.includes(movieId)) {
            return res.status(400).json({ message: 'Movie is not in wishlist' });
        }

        // Remove movie from wishlist
        wishlist.movies = wishlist.movies.filter(id => id.toString() !== movieId);
        await wishlist.save();

        // Populate movie details for response
        await wishlist.populate('movies', 'title genre director releaseDate averageRating movieCover runtime synopsis');

        res.status(200).json({
            message: 'Movie removed from wishlist successfully',
            wishlist: wishlist.movies
        });
    } catch (err) {
        console.error('Error removing from wishlist:', err);
        res.status(500).json({ message: 'Error removing movie from wishlist' });
    }
};

// Check if movie is in wishlist
exports.checkWishlistStatus = async (req, res) => {
    try {
        const { movieId } = req.params;

        if (!movieId) {
            return res.status(400).json({ message: 'Movie ID is required' });
        }

        // Find user's wishlist
        const wishlist = await Wishlist.findOne({ user: req.user.user_id });

        if (!wishlist) {
            return res.status(200).json({ isInWishlist: false });
        }

        const isInWishlist = wishlist.movies.includes(movieId);
        res.status(200).json({ isInWishlist });
    } catch (err) {
        console.error('Error checking wishlist status:', err);
        res.status(500).json({ message: 'Error checking wishlist status' });
    }
};

// Clear entire wishlist
exports.clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.user_id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.movies = [];
        await wishlist.save();

        res.status(200).json({
            message: 'Wishlist cleared successfully',
            wishlist: []
        });
    } catch (err) {
        console.error('Error clearing wishlist:', err);
        res.status(500).json({ message: 'Error clearing wishlist' });
    }
}; 