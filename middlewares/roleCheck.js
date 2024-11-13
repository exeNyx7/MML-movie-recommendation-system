function adminRoleCheck(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).send("Access denied. Admin role required.");
    }
    next();
}
module.exports = adminRoleCheck;
