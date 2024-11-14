// /config/auth.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { user_id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
