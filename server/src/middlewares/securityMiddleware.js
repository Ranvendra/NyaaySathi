const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
    windowMs: 60000,
    max: 5,
    message: "Too many login requests, please try again later"
});

module.exports = { loginRateLimiter };