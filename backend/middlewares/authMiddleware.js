const admin = require("../firebaseAdmin");

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }

        // Extract the token correctly
        const tokenValue = token.split(" ")[1];

        //Verify the token using Firebase

        const decodedToken = await admin.auth().verifyIdToken(tokenValue);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed", error: error.message });
    }
};

module.exports = authenticateUser;
