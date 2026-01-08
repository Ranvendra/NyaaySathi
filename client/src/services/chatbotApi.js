import api from "./api";

/**
 * Send a message to the AI chatbot
 * @param {string} message - User's message
 * @param {Array} conversationHistory - Previous messages for context
 * @param {string} context - Context type (general, drafting, rights, procedure)
 * @returns {Promise} - AI response
 */
export const sendChatMessage = async (message, conversationHistory = [], context = "general") => {
    const response = await api.post("/chatbot/message", {
        message,
        conversationHistory,
        context,
    });
    return response.data;
};

/**
 * Get quick prompt response
 * @param {string} promptType - Type of quick prompt
 * @returns {Promise} - AI response
 */
export const getQuickPrompt = async (promptType) => {
    const response = await api.post("/chatbot/quick", {
        promptType,
    });
    return response.data;
};

/**
 * Analyze legal document
 * @param {string} documentText - Document content
 * @param {string} analysisType - Type of analysis
 * @returns {Promise} - Document analysis
 */
export const analyzeDocument = async (documentText, analysisType = "general") => {
    const response = await api.post("/chatbot/analyze-document", {
        documentText,
        analysisType,
    });
    return response.data;
};

/**
 * Generate legal document
 * @param {string} documentType - Type of document to generate
 * @param {object} details - Document details
 * @returns {Promise} - Generated document
 */
export const generateDocument = async (documentType, details) => {
    const response = await api.post("/chatbot/generate-document", {
        documentType,
        details,
    });
    return response.data;
};

/**
 * Get case strategy advice
 * @param {object} caseDetails - Case information
 * @returns {Promise} - Strategic advice
 */
export const getCaseStrategy = async (caseDetails) => {
    const response = await api.post("/chatbot/case-strategy", {
        caseDetails,
    });
    return response.data;
};

/**
 * Explain legal term
 * @param {string} term - Legal term to explain
 * @param {string} context - Additional context
 * @returns {Promise} - Term explanation
 */
export const explainLegalTerm = async (term, context = "") => {
    const response = await api.post("/chatbot/explain-term", {
        term,
        context,
    });
    return response.data;
};

/**
 * Check chatbot health status
 * @returns {Promise} - Health status
 */
export const checkChatbotHealth = async () => {
    const response = await api.get("/chatbot/health");
    return response.data;
};

