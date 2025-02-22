const rateLimit = require("express-rate-limit");

/**
 * Rate limiter to protect against API abuse.
 * Limits requests to 100 per 15 minutes per user/IP.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP/user to 100 requests per windowMs
  message: "Too many requests from this IP/user, please try again later.",
  headers: true, // Sends `RateLimit-*` headers
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers (deprecated)
  keyGenerator: (req) => req.user?.uid || req.ip, // Uses Firebase UID if available, otherwise uses IP
});

module.exports = apiLimiter;