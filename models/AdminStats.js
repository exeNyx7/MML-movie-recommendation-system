const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminStatsSchema = new Schema({
    mostPopularMovies: [
        {
            movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
            viewCount: Number  // Using viewCount to reflect search and view popularity
        }
    ],
    trendingGenres: [
        {
            genre: String,
            count: Number  // Number of discussions or views for each genre
        }
    ],
    mostSearchedActors: [
        {
            actor: { type: Schema.Types.ObjectId, ref: 'Actor' },
            searchCount: Number  // Tracking how many times actors are searched
        }
    ],
    userEngagement: {
        activeUsers: Number,  // Number of users active over a certain period
        averageInteractionsPerUser: Number  // Average number of interactions per user (views, ratings, etc.)
    },
    dailyStats: [  // Daily aggregated statistics for quick access and trends
        {
            date: { type: Date, default: Date.now },
            newUsers: Number,
            activeUsers: Number,
            totalViews: Number,
            totalRatings: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('AdminStats', adminStatsSchema);
