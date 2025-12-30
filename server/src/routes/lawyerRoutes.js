const express = require("express");
const lawyerRouter = express.Router();

const { getDashboardController, getProfileController } = require("../controllers/lawyerController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// All lawyer routes require authentication
lawyerRouter.use(authMiddleware);

// Dashboard route - get all lawyer dashboard data
lawyerRouter.get("/dashboard", getDashboardController);

// Profile route - get lawyer profile
lawyerRouter.get("/profile", getProfileController);

module.exports = { lawyerRouter };
