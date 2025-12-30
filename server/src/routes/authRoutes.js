const express = require('express');
const authRouter = express.Router();

const { signupController, loginController } = require('../controllers/authControllers');
const { loginRateLimiter } = require('../middlewares/securityMiddleware');


authRouter.post("/signup", signupController);
authRouter.post("/login", loginRateLimiter, loginController);

module.exports = { authRouter };
