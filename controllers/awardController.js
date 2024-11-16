const Award = require('../models/Award');

// Create a new award
exports.createAward = async (req, res) => {
    try {
        const award = new Award(req.body);
        await award.save();
        res.status(201).json(award);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all awards with optional filters and pagination
exports.getAwards = async (req, res) => {
    const { nomineeType, year, category, page = 1, limit = 10 } = req.query;
    try {
        const query = {};
        if (nomineeType) query.nomineeType = nomineeType;
        if (year) query.year = year;
        if (category) query.category = { $regex: category, $options: 'i' }; // Case-insensitive search

        const awards = await Award.find(query)
            .populate('nominee')
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ year: -1 }); // Sort by year descending
        const total = await Award.countDocuments(query);

        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            awards
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific award by ID
exports.getAwardById = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id).populate('nominee');
        if (!award) return res.status(404).json({ message: 'Award not found' });
        res.status(200).json(award);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all awards won by a specific actor with pagination
exports.getAwardsByActor = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const query = { nominee: req.params.actorId, nomineeType: 'Actor', winner: true };
        const awards = await Award.find(query)
            .populate('nominee')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Award.countDocuments(query);

        if (awards.length === 0) return res.status(404).json({ message: 'No awards found for the specified actor' });

        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            awards
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all awards won by a specific movie with pagination
exports.getAwardsByMovie = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const query = { nominee: req.params.movieId, nomineeType: 'Movie', winner: true };
        const awards = await Award.find(query)
            .populate('nominee')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Award.countDocuments(query);

        if (awards.length === 0) return res.status(404).json({ message: 'No awards found for the specified movie' });

        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            awards
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an award
exports.updateAward = async (req, res) => {
    try {
        const award = await Award.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!award) return res.status(404).json({ message: 'Award not found' });
        res.status(200).json(award);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an award
exports.deleteAward = async (req, res) => {
    try {
        const award = await Award.findByIdAndDelete(req.params.id);
        if (!award) return res.status(404).json({ message: 'Award not found' });
        res.status(200).json({ message: 'Award deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
