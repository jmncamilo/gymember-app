function masterPermission(req, res, next) {
    const adminKey = req.headers['cj-admin-key'];

    // Validate headers
    if (!adminKey) {
        console.log('⛔ La clave de acceso para el modo desarrollador no se encuentra en los headers.');
        return res.status(401).json({
            message: 'No autorizado: falta la clave maestra en los encabezados...'
        });
    }

    // Validate key
    if (adminKey !== process.env.ADMIN_KEY) {
        console.log('⛔ Clave maestra incorrecta, no se puede acceder al modo desarrollador.');
        return res.status(403).json({
            message: 'Prohibido: la clave maestra para el modo desarrollador es inválida...'
        });
    }

    // Valid key
    console.log('👨🏻‍💻 Modo desarrollador activado.');
    next();
}

module.exports = masterPermission;