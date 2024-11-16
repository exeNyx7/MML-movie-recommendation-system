const Director = require('../models/Director');

// Create a new director
exports.createDirector = async (req, res) => {
    try {
        const director = new Director(req.body);
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all directors with optional pagination
exports.getDirectors = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const directors = await Director.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ name: 1 });
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific director by ID
exports.getDirectorById = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id).populate('filmography awards');
        if (!director) return res.status(404).json({ message: 'Director not found' });

        // Increment search counter
        director.searchCounter += 1;
        await director.save();

        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a director
exports.updateDirector = async (req, res) => {
    try {
        const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!director) return res.status(404).json({ message: 'Director not found' });
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a director
exports.deleteDirector = async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) return res.status(404).json({ message: 'Director not found' });
        res.status(200).json({ message: 'Director deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
