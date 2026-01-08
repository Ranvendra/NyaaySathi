const { 
    generateLegalResponse, 
    getQuickResponse,
    analyzeLegalDocument,
    generateLegalDocument,
    provideCaseStrategy,
    explainLegalTerm
} = require("../services/aiService");

/**
 * Handle chatbot message
 * POST /api/chatbot/message
 * Body: { message: string, conversationHistory: array, context: string }
 */
async function chatMessageController(req, res) {
    try {
        const { message, conversationHistory, context } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Validate conversation history
        const validHistory = Array.isArray(conversationHistory) ? conversationHistory : [];

        // Generate AI response with context
        const aiResponse = await generateLegalResponse(
            message.trim(),
            validHistory,
            context || "general"
        );

        return res.status(200).json({
            success: true,
            message: aiResponse,
            timestamp: new Date().toISOString(),
            tokensUsed: aiResponse.length, // Approximate
        });
    } catch (error) {
        console.error("Chat Controller Error:", error);
        return res.status(500).json({
            error: error.message || "Failed to generate response",
            success: false,
        });
    }
}

/**
 * Handle quick prompt responses
 * POST /api/chatbot/quick
 * Body: { promptType: string }
 */
async function quickPromptController(req, res) {
    try {
        const { promptType } = req.body;

        if (!promptType) {
            return res.status(400).json({ error: "Prompt type is required" });
        }

        const response = await getQuickResponse(promptType);

        return res.status(200).json({
            success: true,
            message: response,
            promptType,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Quick Prompt Error:", error);
        return res.status(500).json({
            error: error.message || "Failed to generate response",
            success: false,
        });
    }
}

/**
 * Analyze legal document
 * POST /api/chatbot/analyze-document
 * Body: { documentText: string, analysisType: string }
 */
async function analyzeDocumentController(req, res) {
    try {
        const { documentText, analysisType } = req.body;

        if (!documentText || !documentText.trim()) {
            return res.status(400).json({ error: "Document text is required" });
        }

        if (documentText.length > 10000) {
            return res.status(400).json({ 
                error: "Document too large. Maximum 10,000 characters allowed." 
            });
        }

        const analysis = await analyzeLegalDocument(documentText, analysisType);

        return res.status(200).json({
            success: true,
            analysis,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Document Analysis Error:", error);
        return res.status(500).json({
            error: error.message || "Failed to analyze document",
            success: false,
        });
    }
}

/**
 * Generate legal document
 * POST /api/chatbot/generate-document
 * Body: { documentType: string, details: object }
 */
async function generateDocumentController(req, res) {
    try {
        const { documentType, details } = req.body;

        if (!documentType) {
            return res.status(400).json({ error: "Document type is required" });
        }

        const document = await generateLegalDocument(documentType, details || {});

        return res.status(200).json({
            success: true,
            document,
            documentType,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Document Generation Error:", error);
        return res.status(500).json({
            error: error.message || "Failed to generate document",
            success: false,
        });
    }
}

/**
 * Provide case strategy
 * POST /api/chatbot/case-strategy
 * Body: { caseDetails: object }
 */
async function caseStrategyController(req, res) {
    try {
        const { caseDetails } = req.body;

        if (!caseDetails || typeof caseDetails !== 'object') {
            return res.status(400).json({ error: "Case details are required" });
        }

        const strategy = await provideCaseStrategy(caseDetails);

        return res.status(200).json({
            success: true,
            strategy,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Case Strategy Error:", error);
        return res.status(500).json({
            error: error.message || "Failed to generate strategy",
            success: false,
        });
    }
}

/**
 * Explain legal term
 * POST /api/chatbot/explain-term
 * Body: { term: string, context: string }
 */
async function explainTermController(req, res) {
    try {
        const { term, context } = req.body;

        if (!term || !term.trim()) {
            return res.status(400).json({ error: "Legal term is required" });
        }

        const explanation = await explainLegalTerm(term.trim(), context || "");

        return res.status(200).json({
            success: true,
            term,
            explanation,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Term Explanation Error:", error);
        return res.status(500).json({
            error: error.message || "Failed to explain term",
            success: false,
        });
    }
}

/**
 * Health check for AI service
 * GET /api/chatbot/health
 */
async function healthCheckController(req, res) {
    try {
        const hasApiKey = !!process.env.GEMINI_API_KEY;
        
        return res.status(200).json({
            status: "online",
            aiConfigured: hasApiKey,
            features: [
                "conversational_chat",
                "document_analysis",
                "document_generation",
                "case_strategy",
                "term_explanation",
                "quick_prompts"
            ],
            version: "2.0.0",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
}

module.exports = {
    chatMessageController,
    quickPromptController,
    analyzeDocumentController,
    generateDocumentController,
    caseStrategyController,
    explainTermController,
    healthCheckController,
};
