const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Email templates
const emailTemplates = {
    welcome: (username) => ({
        subject: 'Welcome to My Movie List (MML)!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Welcome to MML</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎬 Welcome to My Movie List!</h1>
                        <p>Your personal movie discovery platform</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${username},</h2>
                        <p>Welcome to <strong>My Movie List (MML)</strong>! We're excited to have you join our community of movie enthusiasts.</p>
                        <p>With MML, you can:</p>
                        <ul>
                            <li>📽️ Discover new movies based on your preferences</li>
                            <li>⭐ Rate and review your favorite films</li>
                            <li>📝 Create personalized watchlists</li>
                            <li>🔔 Get notified about upcoming releases</li>
                            <li>💬 Join discussions with other movie lovers</li>
                        </ul>
                        <p>Start exploring and building your perfect movie collection today!</p>
                        <a href="http://localhost:3000" class="button">Start Exploring</a>
                        <p>Happy watching! 🍿</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent from My Movie List (MML)</p>
                        <p>If you didn't create this account, please ignore this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${username},\n\nWelcome to My Movie List (MML)! We're excited to have you join our community of movie enthusiasts.\n\nWith MML, you can discover new movies, rate and review films, create watchlists, get notifications about upcoming releases, and join discussions with other movie lovers.\n\nStart exploring and building your perfect movie collection today!\n\nHappy watching! 🍿\n\nBest regards,\nMy Movie List Team`
    }),

    profileUpdate: (username) => ({
        subject: 'Profile Updated - My Movie List',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Profile Updated</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📝 Profile Updated</h1>
                        <p>My Movie List (MML)</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${username},</h2>
                        <p>Your profile has been successfully updated on <strong>My Movie List</strong>.</p>
                        <div class="alert">
                            <strong>⚠️ Security Notice:</strong> If you did not make this change, please contact our support team immediately.
                        </div>
                        <p>You can review your profile settings by logging into your account.</p>
                        <p>Thank you for using My Movie List!</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent from My Movie List (MML)</p>
                        <p>For security concerns, please contact support immediately.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${username},\n\nYour profile has been successfully updated on My Movie List (MML).\n\n⚠️ Security Notice: If you did not make this change, please contact our support team immediately.\n\nYou can review your profile settings by logging into your account.\n\nThank you for using My Movie List!\n\nBest regards,\nMy Movie List Team`
    }),

    accountDeletion: (username) => ({
        subject: 'Account Deleted - My Movie List',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Account Deleted</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .alert { background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0; color: #721c24; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>❌ Account Deleted</h1>
                        <p>My Movie List (MML)</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${username},</h2>
                        <p>Your account on <strong>My Movie List</strong> has been deleted.</p>
                        <div class="alert">
                            <strong>🚨 URGENT:</strong> If you did not request this deletion, please contact our support team immediately to recover your account.
                        </div>
                        <p>All your data, including watchlists, reviews, and preferences, has been permanently removed.</p>
                        <p>If this was intentional, we're sorry to see you go. You can always create a new account in the future.</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent from My Movie List (MML)</p>
                        <p>For account recovery, please contact support immediately.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${username},\n\nYour account on My Movie List (MML) has been deleted.\n\n🚨 URGENT: If you did not request this deletion, please contact our support team immediately to recover your account.\n\nAll your data, including watchlists, reviews, and preferences, has been permanently removed.\n\nIf this was intentional, we're sorry to see you go. You can always create a new account in the future.\n\nBest regards,\nMy Movie List Team`
    }),

    reminder: (username, movieTitle, releaseDate) => ({
        subject: `Reminder: ${movieTitle} - My Movie List`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Movie Reminder</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .movie-info { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎬 Movie Reminder</h1>
                        <p>My Movie List (MML)</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${username},</h2>
                        <p>Don't forget about this upcoming release!</p>
                        <div class="movie-info">
                            <h3>${movieTitle}</h3>
                            <p><strong>Release Date:</strong> ${releaseDate}</p>
                        </div>
                        <p>Mark your calendar and get ready for an amazing movie experience!</p>
                        <a href="http://localhost:3000" class="button">View Details</a>
                        <p>Happy watching! 🍿</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent from My Movie List (MML)</p>
                        <p>You can manage your reminders in your account settings.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${username},\n\nDon't forget about this upcoming release!\n\nMovie: ${movieTitle}\nRelease Date: ${releaseDate}\n\nMark your calendar and get ready for an amazing movie experience!\n\nHappy watching! 🍿\n\nBest regards,\nMy Movie List Team`
    }),

    notification: (username, movieTitle, releaseDate) => ({
        subject: `New Release Alert: ${movieTitle} - My Movie List`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>New Release Alert</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .movie-info { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #27ae60; }
                    .button { display: inline-block; background: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 New Release Alert!</h1>
                        <p>My Movie List (MML)</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${username},</h2>
                        <p>Great news! A new movie matching your preferences is coming soon!</p>
                        <div class="movie-info">
                            <h3>${movieTitle}</h3>
                            <p><strong>Release Date:</strong> ${releaseDate}</p>
                        </div>
                        <p>This movie is based on your favorite genres and preferences. Don't miss out!</p>
                        <a href="http://localhost:3000" class="button">Learn More</a>
                        <p>Happy watching! 🍿</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent from My Movie List (MML)</p>
                        <p>You can manage your notification preferences in your account settings.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${username},\n\nGreat news! A new movie matching your preferences is coming soon!\n\nMovie: ${movieTitle}\nRelease Date: ${releaseDate}\n\nThis movie is based on your favorite genres and preferences. Don't miss out!\n\nHappy watching! 🍿\n\nBest regards,\nMy Movie List Team`
    })
};

/**
 * Send an email using the configured transporter with HTML support.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 * @param {string} html - Email body (HTML) - optional
 * @returns {Promise<boolean>} - Resolves true if sent, false if error
 */
async function sendEmail(to, subject, text, html = null) {
    const mailOptions = {
        from: '"My Movie List" <noreply@mymovielist.com>',
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
}

/**
 * Send a templated email using predefined templates.
 * @param {string} to - Recipient email address
 * @param {string} templateName - Template name (welcome, profileUpdate, accountDeletion, reminder, notification)
 * @param {Object} data - Data for template (username, movieTitle, releaseDate, etc.)
 * @returns {Promise<boolean>} - Resolves true if sent, false if error
 */
async function sendTemplatedEmail(to, templateName, data = {}) {
    if (!emailTemplates[templateName]) {
        console.error(`Template '${templateName}' not found`);
        return false;
    }

    const template = emailTemplates[templateName];
    let subject, html, text;

    if (typeof template === 'function') {
        const result = template(data.username, data.movieTitle, data.releaseDate);
        subject = result.subject;
        html = result.html;
        text = result.text;
    } else {
        subject = template.subject;
        html = template.html;
        text = template.text;
    }

    return await sendEmail(to, subject, text, html);
}

module.exports = {
    sendEmail,
    sendTemplatedEmail,
    emailTemplates
}; 