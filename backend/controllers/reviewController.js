const Review = require('../models/Review');
const Movie = require('../models/Movie');


// <-----IMP-----> have issue with the empty reviewText (as database mai wo required hai mgr idhr ni de rahe so getting errors might fix at end)
// // Rate a movie
// exports.rateMovie = async (req, res) => {
//     const { movieId, rating, userId } = req.body;

//     try {
//         const review = new Review({
//             movie: movieId,
//             user: userId,  // User ID is passed directly in the request body
//             rating: rating
//             // , reviewText: ""  // Since this is just a rating, no review text is added
//         });
//         await review.save();
//         res.status(201).json({ message: "Rating added successfully", review });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// Rate and review a movie
exports.rateAndReviewMovie = async (req, res) => {
    const { movieId, rating, reviewText, userId } = req.body;

    try {
        const review = new Review({
            movie: movieId,
            user: userId,  // User ID is passed directly in the request body
            rating,
            reviewText
        });
        await review.save();
        res.status(201).json({ message: "Review and rating added successfully", review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Create a new review
exports.addReview = async (req, res) => {
    const { movieId, rating, reviewText, userId } = req.body;
    try {
        const review = new Review({
            movie: movieId,
            user: userId,
            rating,
            reviewText
        });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { reviewId, rating, reviewText, userId } = req.body;
    try {
        const review = await Review.findOneAndUpdate({ _id: reviewId, user: userId }, { rating, reviewText }, { new: true });
        if (!review) {
            return res.status(404).send('Review not found or user mismatch');
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Get reviews for a movie
exports.getMovieReviews = async (req, res) => {
    const { movieId } = req.params;
    try {
        const reviews = await Review.find({ movie: movieId }).populate('user', 'username');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Optionally, get review highlights
// Get top-rated and most-discussed reviews
exports.getReviewHighlights = async (req, res) => {
    try {
        // Top-rated reviews
        const topRatedReviews = await Review.find().sort({ rating: -1 }).limit(10);
        // Most-discussed reviews (assumed based on the number of reviews for a movie)
        const mostDiscussedReviews = await Review.aggregate([
            { $group: { _id: "$movie", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $lookup: { from: "movies", localField: "_id", foreignField: "_id", as: "movie_details" } }
        ]);

        res.status(200).json({ topRated: topRatedReviews, mostDiscussed: mostDiscussedReviews });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

