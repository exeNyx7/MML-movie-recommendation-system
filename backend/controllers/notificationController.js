const Movie = require('../models/Movie');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail, sendTemplatedEmail } = require('../helpers/emailService');
require('dotenv').config();



/*
notificationController.js should focus on sending notifications related to new and upcoming content. This includes notifying users about new releases in their favorite genres or upcoming trailers.
reminderController.js handles reminders set by users for specific movies or trailers, sending emails when these specific movies or trailers are about to be released.
*/


// Function to send notifications for upcoming content
exports.sendUpcomingContentNotifications = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        // Fetch paginated users based on preferences
        const users = await User.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        for (const user of users) {
            // Fetch upcoming movies in the user's favorite genres that have not been notified
            const newMovies = await Movie.find({
                genre: { $in: user.favoriteGenres },
                releaseDate: { $gte: new Date() },
            });

            for (const movie of newMovies) {
                // Check if a notification for this movie to this user already exists
                const existingNotification = await Notification.findOne({
                    user: user._id,
                    contentId: movie._id,
                    notificationType: 'Movie'
                });

                if (!existingNotification) {
                    // Send email notification using template
                    const sent = await sendTemplatedEmail(user.email, 'notification', {
                        username: user.username,
                        movieTitle: movie.title,
                        releaseDate: movie.releaseDate.toDateString()
                    });
                    if (!sent) {
                        console.error(`Failed to send notification email to ${user.email}`);
                    }

                    // Record notification in the Notification model
                    await Notification.create({
                        user: user._id,
                        content: `Upcoming movie: ${movie.title}`,
                        link: `/movies/${movie._id}`,
                        notificationType: 'Movie',
                        contentId: movie._id,
                        sent: true,
                        read: false
                    });
                }
            }
        }

        res.status(200).json({
            message: 'Notifications sent successfully for upcoming content',
            currentPage: Number(page),
            totalItems: users.length,
            totalPages: Math.ceil(users.length / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};