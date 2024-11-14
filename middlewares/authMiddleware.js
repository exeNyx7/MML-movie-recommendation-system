const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/auth');


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).send("Invalid Token");
    }
    req.user = decoded;
    next();
};

module.exports = authenticate;
