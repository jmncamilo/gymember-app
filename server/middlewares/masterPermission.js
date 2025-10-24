function masterPermission(req, res, next) {
    const adminKey = req.headers['cj-admin-key'];

    // Validate headers
    if (!adminKey) {
        console.log('⛔ Admin key missing in request headers...');
        return res.status(401).json({
            message: 'Unauthorized: Admin key required...'
        });
    }

    // Validate key
    if (adminKey !== process.env.ADMIN_KEY) {
        console.log('⛔ Invalid admin key attempt...');
        return res.status(403).json({
            message: 'Forbidden: Invalid admin key...'
        });
    }

    // Valid key
    console.log('✅ Admin authentication successful...');
    next();
}

module.exports = masterPermission;