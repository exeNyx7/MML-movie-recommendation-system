const nodemailer = require('nodemailer');
const Movie = require('../models/Movie');
const Trailer = require('../models/Trailer');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
require('dotenv').config();

// Helper function to send email
const sendEmail = async (userEmail, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: subject,
        text: text
    };
    console.log(mailOptions);
    console.log(userEmail);
    console.log(subject);
    console.log(text);
    console.log(process.env.EMAIL_USERNAME);
    console.log(process.env.EMAIL_PASSWORD);



    await transporter.sendMail(mailOptions);
};

// Send reminder emails to a specific user
exports.sendReminderEmailsToUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        const reminders = await Reminder.find({
            user: userId,
            $or: [
                { movie: { $exists: true }, 'movie.releaseDate': { $gte: today, $lte: nextMonth } },
                { trailer: { $exists: true }, 'trailer.releaseDate': { $gte: today, $lte: nextMonth } }
            ]
        })
        .populate('movie', 'title releaseDate')
        .populate('trailer', 'title releaseDate');
        
        // THIS FOR IS NOT WORKING
        for (const reminder of reminders) {
            const content = reminder.movie || reminder.trailer;
            const subject = `Reminder: Upcoming Release - ${content.title}`;
            const text = `Hi ${user.username},\n\nDon't forget to check out "${content.title}" releasing on ${content.releaseDate.toDateString()}.\n\nBest regards,\nYour Favorite Movie Platform`;
            
            console.log(userId);
            await sendEmail(user.email, subject, text);
            
            reminder.notificationSent = true;
            await reminder.save();
        }
        
        res.status(200).json({ message: "Reminder emails sent successfully to the user." });
    } catch (error) {
        res.status(500).json({ message: "Failed to send reminder emails: " + error.message });
    }
};

// Send reminder emails to all users
exports.sendReminderEmailsToAllUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const reminders = await Reminder.find({
            $or: [
                { movie: { $exists: true }, 'movie.releaseDate': { $gte: today, $lte: nextMonth } },
                { trailer: { $exists: true }, 'trailer.releaseDate': { $gte: today, $lte: nextMonth } }
            ]
        })
        .populate('user', 'email username')
        .populate('movie', 'title releaseDate')
        .populate('trailer', 'title releaseDate')
        .skip((page - 1) * limit)
        .limit(limit);

        for (const reminder of reminders) {
            const content = reminder.movie || reminder.trailer;
            const subject = `Reminder: Upcoming Release - ${content.title}`;
            const text = `Hi ${reminder.user.username},\n\nDon't forget to check out "${content.title}" releasing on ${content.releaseDate.toDateString()}.\n\nBest regards,\nYour Favorite Movie Platform`;

            await sendEmail(reminder.user.email, subject, text);

            reminder.notificationSent = true;
            await reminder.save();
        }

        res.status(200).json({
            message: "Reminder emails sent successfully to all users.",
            currentPage: Number(page),
            totalItems: reminders.length,
            totalPages: Math.ceil(reminders.length / limit)
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to send reminder emails: " + error.message });
    }
};

// Set Reminder for a Movie
exports.setMovieReminder = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.user.user_id;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        if (movie.aired) {
            return res.status(400).json({ message: "Cannot set reminder for aired movies" });
        }

        const existingReminder = await Reminder.findOne({ user: userId, movie: movieId });
        if (existingReminder) {
            return res.status(409).json({ message: "Reminder already set for this movie" });
        }

        const reminder = new Reminder({
            user: userId,
            movie: movieId
        });
        await reminder.save();

        res.status(201).json({ message: "Reminder set successfully", reminder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Set Reminder for a Trailer
exports.setTrailerReminder = async (req, res) => {
    const { trailerId } = req.params;
    const userId = req.user.user_id;

    try {
        const trailer = await Trailer.findById(trailerId);
        if (!trailer) {
            return res.status(404).json({ message: "Trailer not found" });
        }
        if (trailer.aired) {
            return res.status(400).json({ message: "Cannot set reminder for aired trailers" });
        }

        const existingReminder = await Reminder.findOne({ user: userId, trailer: trailerId });
        if (existingReminder) {
            return res.status(409).json({ message: "Reminder already set for this trailer" });
        }

        const reminder = new Reminder({
            user: userId,
            trailer: trailerId
        });
        await reminder.save();

        res.status(201).json({ message: "Reminder set successfully", reminder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Movies with Reminders by User ID with Pagination
exports.getMoviesWithRemindersByUserId = async (req, res) => {
    const userId = req.params.userId; // Ensure user ID is passed correctly
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    try {
        const reminders = await Reminder.find({ user: userId, movie: { $exists: true } })
            .populate({
                path: 'movie',
                select: 'title genre director releaseDate movieCover'
            })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Reminder.countDocuments({ user: userId, movie: { $exists: true } });
        res.status(200).json({
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalItems: total,
            data: reminders.map(reminder => reminder.movie)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTrailersWithRemindersByUserId = async (req, res) => {
    const userId = req.params.userId; // Ensure user ID is passed correctly
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    try {
        const reminders = await Reminder.find({ user: userId, trailer: { $exists: true } })
            .populate({
                path: 'trailer',
                select: 'title releaseDate url'
            })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Reminder.countDocuments({ user: userId, trailer: { $exists: true } });
        res.status(200).json({
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalItems: total,
            data: reminders.map(reminder => reminder.trailer)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Reminders by User ID (Movies and Trailers) with Pagination
exports.getRemindersByUserId = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Pagination defaults
    const userId = req.user.user_id;

    try {
        const movieReminders = await Reminder.find({ user: userId, movie: { $exists: true } })
            .populate({
                path: 'movie',
                select: 'title director releaseDate'
            })
            .skip((page - 1) * limit)
            .limit(limit);

        const trailerReminders = await Reminder.find({ user: userId, trailer: { $exists: true } })
            .populate({
                path: 'trailer',
                select: 'title releaseDate url'
            })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            movies: movieReminders.map(r => r.movie),
            trailers: trailerReminders.map(r => r.trailer),
            currentPage: Number(page),
            totalPages: Math.ceil(Math.max(movieReminders.length, trailerReminders.length) / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllReminders = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Pagination defaults

    try {
        const reminders = await Reminder.find()
            .populate('user', 'username')
            .populate('movie', 'title director releaseDate')
            .populate('trailer', 'title releaseDate url')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalReminders = await Reminder.countDocuments();
        const formattedReminders = reminders.map(reminder => {
            return {
                username: reminder.user.username,
                content: reminder.movie ? {
                    type: 'Movie',
                    title: reminder.movie.title,
                    director: reminder.movie.director,
                    releaseDate: reminder.movie.releaseDate
                } : {
                    type: 'Trailer',
                    title: reminder.trailer.title,
                    url: reminder.trailer.url,
                    releaseDate: reminder.trailer.releaseDate
                }
            };
        });

        res.status(200).json({
            data: formattedReminders,
            currentPage: Number(page),
            totalPages: Math.ceil(totalReminders / limit),
            totalItems: totalReminders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
