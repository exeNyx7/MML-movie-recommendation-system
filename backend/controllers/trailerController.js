const Trailer = require('../models/Trailer');


// Add a new trailer 
exports.addTrailer = async (req, res) => {
    const { movie, trailerNumber, title, description, releaseDate, url, aired } = req.body;

    try {
        // Check for existing trailer with the same number or title under the same movie
        const existingTrailer = await Trailer.findOne({
            $or: [
                { movie: movie, trailerNumber: trailerNumber },
                { movie: movie, title: title }
            ]
        });

        if (existingTrailer) {
            return res.status(400).json({ message: "A trailer with the same number or title already exists for this movie." });
        }

        const newTrailer = new Trailer({
            movie,
            trailerNumber,
            title,
            description,
            releaseDate,
            url,
            aired
        });

        await newTrailer.save();
        res.status(201).json(newTrailer);
    } catch (error) {
        res.status(400).json({ message: "Error adding trailer: " + error.message });
    }
};

// Update a trailer 
exports.updateTrailer = async (req, res) => {
    const { trailerNumber, title, description, releaseDate, url, aired } = req.body;

    try {
        // Ensure there are no duplicates with the new trailer number or title
        const existingTrailer = await Trailer.findOne({
            _id: { $ne: req.params.id },
            $or: [
                { movie: req.body.movie, trailerNumber: trailerNumber },
                { movie: req.body.movie, title: title }
            ]
        });

        if (existingTrailer) {
            return res.status(400).json({ message: "Another trailer with the same number or title exists for this movie." });
        }

        const updatedTrailer = await Trailer.findByIdAndUpdate(req.params.id, {
            $set: {
                trailerNumber,
                title,
                description,
                releaseDate,
                url,
                aired
            }
        }, { new: true });

        if (!updatedTrailer) {
            return res.status(404).json({ message: "Trailer not found" });
        }
        res.status(200).json(updatedTrailer);
    } catch (error) {
        res.status(500).json({ message: "Error updating trailer: " + error.message });
    }
};

// Get a single trailer by ID
exports.getTrailer = async (req, res) => {
    try {
        const trailer = await Trailer.findById(req.params.id).populate('movie', 'title'); // Populate movie title for context
        if (!trailer) {
            return res.status(404).json({ message: "Trailer not found" });
        }
        res.status(200).json(trailer);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving trailer: " + error.message });
    }
};

// Delete a trailer
exports.deleteTrailer = async (req, res) => {
    try {
        const deletedTrailer = await Trailer.findByIdAndDelete(req.params.id);
        if (!deletedTrailer) {
            return res.status(404).json({ message: "Trailer not found" });
        }
        res.status(200).json({ message: "Trailer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting trailer: " + error.message });
    }
};