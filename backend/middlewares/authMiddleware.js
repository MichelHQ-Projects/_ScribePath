const admin = require("../firebaseAdmin");

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // ✅ Safe extraction

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        // ✅ Verify the token using Firebase
        const decodedToken = await admin.auth().verifyIdToken(token);

        // ✅ Attach only necessary user info (avoid exposing the whole token)
        req.user = { uid: decodedToken.uid, email: decodedToken.email };

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized, token invalid", error: error.message });
    }
};

module.exports = authenticateUser;

