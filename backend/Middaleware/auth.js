const jwt = require('jsonwebtoken');

// const ensureAuthenticated = (req, res, next) => {
//     const auth = req.headers['authorization'];
//     if (!auth) {
//         return res.status(403)
//             .json({ message: "Unauthorized, JWT token is require" })
//     }
//     try {
//         const decoded = jwt.verify(auth, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(403)
//             .json({ message: "Unauthorized, JWT token is wrong or expired" })
//     }
// }

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403)
            .json({ message: "Unauthorized, JWT token is required" });
    }

    const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
    if (!token) {
        return res.status(403)
            .json({ message: "Unauthorized, JWT token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403)
            .json({ message: "Unauthorized, JWT token is wrong or expired" });
    }
};

module.exports = ensureAuthenticated;