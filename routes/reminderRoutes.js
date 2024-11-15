const express = require('express');
const router = express.Router();
const { 
    sendReminderEmails,
    setMovieReminder,
    setTrailerReminder,
    getMoviesWithRemindersByUserId,
    getTrailersWithRemindersByUserId,
    getRemindersByUserId,
    getAllReminders
} = require('../controllers/reminderController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');
const notificationController = require('../controllers/notificationController');


router.post('/movies/:movieId/set-reminder', authenticate, setMovieReminder); // Set reminder for a specific movie
router.post('/trailers/:trailerId/set-reminder', authenticate, setTrailerReminder); // Set reminder for a specific trailer

router.get('/users/:userId/movies-reminders', authenticate, getMoviesWithRemindersByUserId); // Get all movies with reminders by user ID
router.get('/users/:userId/trailers-reminders', authenticate, getTrailersWithRemindersByUserId); // Get all trailers with reminders by user ID

router.get('/users/:userId/reminders', authenticate, getRemindersByUserId); // Get all reminders by user ID

// ADMIN ONLY - because we don't want to expose all reminders to all users.
router.get('/reminders', authenticate, adminRoleCheck, getAllReminders); // Get all reminders across all users

// Route to trigger reminder emails for specific movies or trailers
router.post('/send-reminders', authenticate, sendReminderEmails);

// Route to send notifications about upcoming content based on user preferences
router.post('/send-upcoming-notifications', authenticate, notificationController.sendUpcomingContentNotifications);


module.exports = router;
