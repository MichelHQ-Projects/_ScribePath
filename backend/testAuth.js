const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Ensure Firebase Admin is initialized
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

const generateToken = async (uid) => {
  try {
    const token = await admin.auth().createCustomToken(uid);
    console.log("Generated Firebase Token:", token);
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

// Replace with a real Firebase UID (retrieve from Firebase Authentication)
generateToken("testUserUID");