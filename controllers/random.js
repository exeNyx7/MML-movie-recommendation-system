// const Notification = require('../models/Notification');
// const Movie = require('../models/Movie');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');
// const cron = require('node-cron');

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL, // Your email
//     pass: process.env.EMAIL_PASSWORD, // Your email password (app password)
//   },
// });

// // Cron job to check for reminders every minute
// cron.schedule('* * * * *', async () => {
//   try {
//     console.log('Running notification job...'); // Log cron job start
//     const notifications = await Notification.find({
//       reminderDate: { $lte: new Date() }, // Reminder date is less than or equal to current time
//       sent: { $ne: true }, // Only consider unsent notifications
//     }).populate('movie', 'title').populate('user', 'email name');

//     console.log('Notifications to send:', notifications); // Log notifications retrieved

//     if (notifications.length === 0) {
//       console.log('No notifications found to send.');
//     }

//     for (const notification of notifications) {
//       const { user, movie, reminderDate } = notification;

//       console.log(`Sending reminder for movie: ${movie.title} to ${user.email}`); // Log each reminder

//       // Check if the reminderDate is less than the current date and time
//       if (new Date(reminderDate) <= new Date()) {
//         const subject = `Reminder: ${movie.title}`;
//         const message = `Hello ${user.name},\n\nThis is a reminder for the movie "${movie.title}". You set this reminder for ${reminderDate}.\n\nEnjoy!\n`;

//         try {
//           console.log('Sending email to:', user.email); // Log email sending
//           await transporter.sendMail({
//             from: process.env.EMAIL,
//             to: user.email,
//             subject,
//             text: message,
//           });

//           console.log('Reminder email sent to', user.email); // Log after email is sent

//           notification.sent = true; // Mark notification as sent
//           await notification.save();
//         } catch (emailError) {
//           console.error('Error sending email:', emailError); // Log any email-specific errors
//         }
//       } else {
//         console.log('Reminder date is in the future, skipping reminder for', movie.title);
//       }
//     }
//   } catch (error) {
//     console.error('Error checking reminders:', error); // Log any cron-related errors
//   }
// });

// // Set a reminder
// exports.setReminder = async (req, res) => {
//     try {
//       let { movieId, reminderDate } = req.body;
//       const userId = req.user.id; // Extract userId from the token
  
//       // Ensure reminderDate is a Date object
//       reminderDate = new Date(reminderDate); // Convert the reminderDate to a Date object
//       reminderDate.setHours(reminderDate.getHours() - 5); // Subtract 5 hours
  
//       // Find the user
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ msg: 'User not found' });
//       }
  
//       // Validate the movie
//       const movie = await Movie.findById(movieId);
//       if (!movie) {
//         return res.status(404).json({ msg: 'Movie not found' });
//       }
  
//       // Log for debugging
//       console.log('Setting reminder for movie:', movie.title, 'at', reminderDate);
  
//       // Check if the reminder date is in the future
//       if (new Date(reminderDate) <= new Date()) {
//         return res.status(400).json({ msg: 'Reminder date must be in the future.' });
//       }
  
//       const existingReminder = await Notification.findOne({
//         user: userId,
//         movie: movieId,
//         reminderDate: new Date(reminderDate).toISOString(), // Match exact reminder date
//       });
  
//       if (existingReminder) {
//         return res.status(400).json({ msg: 'You have already set a reminder for this movie at the same time.' });
//       }

//       // Create the reminder
//       const notification = new Notification({
//         user: userId, // Attach the user ID
//         movie: movieId,
//         reminderDate,
//         sent: false,
//       });
  
//       await notification.save();
  
//       console.log('Reminder saved:', notification);
  
//       res.status(201).json({ msg: 'Reminder set successfully', notification });
//     } catch (error) {
//       console.error('Error setting reminder:', error);
//       res.status(500).json({ msg: 'Error setting reminder', error });
//     }
//   };