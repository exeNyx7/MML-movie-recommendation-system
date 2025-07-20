const Movie = require('../models/Movie');
const User = require('../models/User');
const Actor = require('../models/Actor');

exports.getMostPopularMovies = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const popularMovies = await Movie.find()
            .sort({ viewCount: -1 }) // Sort by popularity
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Movie.countDocuments();
        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            popularMovies
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching popular movies: " + error.message });
    }
};

exports.getUserActivityInsights = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const userActivities = await User.aggregate([
            { $unwind: "$activity.logs" },
            { $group: {
                _id: "$activity.logs.action",
                count: { $sum: 1 }
            }},
            { $sort: { count: -1 }},
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) }
        ]);
        const total = await User.aggregate([
            { $unwind: "$activity.logs" },
            { $group: { _id: "$activity.logs.action" } }
        ]).count("count");
        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            userActivities
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user activities: " + error.message });
    }
};

exports.getTrendingGenres = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const trendingGenres = await Movie.aggregate([
            { $unwind: "$genre" },
            { $group: {
                _id: "$genre",
                count: { $sum: 1 }
            }},
            { $sort: { count: -1 }},
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) }
        ]);
        const total = await Movie.aggregate([{ $unwind: "$genre" }, { $group: { _id: "$genre" } }]).count("count");
        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            trendingGenres
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching trending genres: " + error.message });
    }
};

exports.getMostSearchedActors = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const mostSearchedActors = await Actor.find()
            .sort({ searchCounter: -1 }) // Sort by search count
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Actor.countDocuments();
        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            mostSearchedActors
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching most searched actors: " + error.message });
    }
};

exports.getAdminDashboardStats = async (req, res) => {
    try {
        const [popularMovies, activityStats, genreTrends, searchedActors] = await Promise.all([
            Movie.find().sort({ viewCount: -1 }).limit(5),
            User.aggregate([
                { $unwind: "$activity.logs" },
                { $group: {
                    _id: "$activity.logs.action",
                    count: { $sum: 1 }
                }},
                { $sort: { count: -1 } }
            ]),
            Movie.aggregate([
                { $unwind: "$genre" },
                { $group: {
                    _id: "$genre",
                    count: { $sum: 1 }
                }},
                { $sort: { count: -1 }},
                { $limit: 3 }
            ]),
            Actor.find().sort({ searchCounter: -1 }).limit(5)
        ]);

        res.status(200).json({
            popularMovies,
            activityStats,
            genreTrends,
            searchedActors
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin dashboard stats: " + error.message });
    }
};
