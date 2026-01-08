const express = require("express");
const chatbotRouter = express.Router();

const {
    chatMessageController,
    quickPromptController,
    analyzeDocumentController,
    generateDocumentController,
    caseStrategyController,
    explainTermController,
    healthCheckController,
} = require("../controllers/chatbotController");

// Health check endpoint (public)
chatbotRouter.get("/health", healthCheckController);

// Chat message endpoint (public - can be protected with authMiddleware if needed)
chatbotRouter.post("/message", chatMessageController);

// Quick prompt endpoint
chatbotRouter.post("/quick", quickPromptController);

// Document analysis endpoint
chatbotRouter.post("/analyze-document", analyzeDocumentController);

// Document generation endpoint
chatbotRouter.post("/generate-document", generateDocumentController);

// Case strategy endpoint
chatbotRouter.post("/case-strategy", caseStrategyController);

// Legal term explanation endpoint
chatbotRouter.post("/explain-term", explainTermController);

module.exports = { chatbotRouter };
