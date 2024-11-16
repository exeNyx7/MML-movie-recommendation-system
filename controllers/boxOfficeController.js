const BoxOffice = require('../models/BoxOffice');
const Movie = require('../models/Movie');

// Create box office data for a movie
exports.createBoxOffice = async (req, res) => {
    try {
        const boxOffice = new BoxOffice(req.body);
        await boxOffice.save();

        // Link to the movie
        await Movie.findByIdAndUpdate(req.body.movie, { boxOffice: boxOffice._id });

        res.status(201).json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get box office data for a specific movie
exports.getBoxOfficeByMovie = async (req, res) => {
    try {
        const boxOffice = await BoxOffice.findOne({ movie: req.params.movieId }).populate('movie');
        if (!boxOffice) return res.status(404).json({ message: 'Box Office data not found' });
        res.status(200).json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all box office data with pagination
exports.getAllBoxOffice = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const boxOfficeData = await BoxOffice.find()
            .populate('movie')
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ totalEarnings: -1 }); // Sort by total earnings descending
        const total = await BoxOffice.countDocuments();

        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            boxOfficeData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update box office data
exports.updateBoxOffice = async (req, res) => {
    try {
        const boxOffice = await BoxOffice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!boxOffice) return res.status(404).json({ message: 'Box Office data not found' });
        res.status(200).json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete box office data
exports.deleteBoxOffice = async (req, res) => {
    try {
        const boxOffice = await BoxOffice.findByIdAndDelete(req.params.id);

        // Unlink from the movie
        if (boxOffice) {
            await Movie.findByIdAndUpdate(boxOffice.movie, { $unset: { boxOffice: '' } });
        }

        if (!boxOffice) return res.status(404).json({ message: 'Box Office data not found' });
        res.status(200).json({ message: 'Box Office data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
