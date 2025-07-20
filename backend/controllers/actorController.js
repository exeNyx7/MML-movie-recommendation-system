const mongoose = require('mongoose');
const Actor = require('../models/Actor');
const Award = require('../models/Award'); // Import the Award model

// Create a new actor
exports.createActor = async (req, res) => {
    try {
        const { name, biography, birthDate, filmography, awards = [] } = req.body;

        // Validate awards if provided
        if (awards.length > 0) {
            const validAwards = awards.every(award => mongoose.Types.ObjectId.isValid(award));
            if (!validAwards) {
                return res.status(400).json({ message: 'Invalid award ID(s) provided' });
            }
        }

        const actor = new Actor({
            name,
            biography,
            birthDate,
            filmography,
            awards: awards.map(award => new mongoose.Types.ObjectId(award))
        });
        await actor.save();
        res.status(201).json(actor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all actors with optional pagination
exports.getActors = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const actors = await Actor.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ name: 1 });
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific actor by ID
exports.getActorById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id).populate('filmography awards');
        if (!actor) return res.status(404).json({ message: 'Actor not found' });

        // Increment search counter
        actor.searchCounter += 1;
        await actor.save();

        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an actor
exports.updateActor = async (req, res) => {
    try {
        const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actor) return res.status(404).json({ message: 'Actor not found' });
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an actor
exports.deleteActor = async (req, res) => {
    try {
        const actor = await Actor.findByIdAndDelete(req.params.id);
        if (!actor) return res.status(404).json({ message: 'Actor not found' });
        res.status(200).json({ message: 'Actor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
