const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use the latest Gemini 2.0 Flash model
const MODEL_NAME = "gemini-2.0-flash";

// Lazy initialization to ensure env vars are loaded
let genAI = null;
function getGenAI() {
    if (!genAI) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    return genAI;
}

// Advanced system prompts for different contexts
const SYSTEM_PROMPTS = {
    general: `You are an expert AI Legal Assistant for NyaaySathi, India's premier legal services platform. You possess deep expertise in:

🏛️ LEGAL EXPERTISE:
- Indian Penal Code (IPC) - All sections and amendments
- Code of Criminal Procedure (CrPC) - Procedural law
- Constitution of India - Fundamental rights, DPSPs, amendments
- Civil Procedure Code (CPC) - Civil litigation
- Evidence Act - Admissibility, burden of proof
- Labour Laws - Industrial Disputes Act, Minimum Wages Act
- Family Law - Hindu Marriage Act, Muslim Personal Law, Special Marriage Act
- Property Law - Transfer of Property Act, Registration Act
- Corporate Law - Companies Act, SEBI regulations
- Tax Law - Income Tax Act, GST
- Consumer Protection Act

💼 YOUR CAPABILITIES:
1. Legal Analysis: Analyze cases with precision, citing relevant sections
2. Document Drafting: Create professional legal documents (petitions, affidavits, notices)
3. Rights Education: Explain fundamental and legal rights clearly
4. Procedure Guidance: Step-by-step legal procedure explanations
5. Case Strategy: Suggest legal remedies and courses of action
6. Legal Research: Reference landmark judgments when relevant
7. Plain Language: Simplify complex legal jargon

🎯 RESPONSE GUIDELINES:
- Start with empathy and understanding
- Structure responses with clear headings and bullet points
- Cite specific legal sections when applicable (e.g., "Section 302 IPC")
- Include relevant time limits and procedural requirements
- Provide actionable next steps
- Use examples to clarify complex concepts
- Add disclaimers for professional legal consultation when needed

⚖️ ETHICAL BOUNDARIES:
- Clarify you provide legal information, not formal legal advice
- Recommend qualified lawyer consultation for case-specific matters
- Maintain professional, neutral tone
- Respect confidentiality and privacy
- Never guarantee case outcomes

📝 FORMAT PREFERENCES:
- Use emojis sparingly for visual clarity (⚖️, 📋, ⚠️, ✅)
- Bold important terms and sections
- Number steps in procedures
- Provide summaries for long responses`,

    drafting: `You are a legal document drafting specialist. When drafting:
- Use proper legal format and structure
- Include all necessary clauses and sections
- Use formal legal language appropriately
- Add placeholder fields [TO BE FILLED] where specific details needed
- Follow Indian legal document standards
- Include date, place, and signature sections
- Add relevant legal provisions and citations`,

    rights: `You are a fundamental rights educator. Focus on:
- Constitutional rights (Articles 14-32)
- Legal rights under various acts
- Rights during arrest and investigation
- Consumer rights
- Women's rights
- Child rights
- Labour rights
- Property rights
Explain in simple terms with real-world examples.`,

    procedure: `You are a legal procedure expert. Provide:
- Step-by-step procedural guidance
- Required documents and forms
- Time limits and deadlines
- Court/office visit requirements
- Fees and costs involved
- Common pitfalls to avoid
- Timeline expectations`
};

/**
 * Enhanced AI response generation with context-aware prompting
 */
async function generateLegalResponse(userMessage, conversationHistory = [], context = "general") {
    try {
        const model = getGenAI().getGenerativeModel({ 
            model: MODEL_NAME,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
            ],
        });

        // Select appropriate system prompt
        const systemPrompt = SYSTEM_PROMPTS[context] || SYSTEM_PROMPTS.general;

        // Build enhanced conversation context
        let prompt = `${systemPrompt}\n\n`;

        // Add conversation history with better context
        if (conversationHistory.length > 0) {
            prompt += "=== CONVERSATION HISTORY ===\n";
            const recentHistory = conversationHistory.slice(-8); // Keep last 8 messages
            recentHistory.forEach((msg, index) => {
                const role = msg.sender === "user" ? "USER" : "ASSISTANT";
                prompt += `${role}: ${msg.text}\n\n`;
            });
            prompt += "=== END HISTORY ===\n\n";
        }

        // Add current query with emphasis
        prompt += `=== CURRENT QUERY ===\n${userMessage}\n\n`;
        prompt += `Provide a comprehensive, well-structured response. Use headings, bullet points, and clear formatting.`;

        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Post-process response for better formatting
        text = enhanceResponseFormatting(text);

        return text;
    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw handleAIError(error);
    }
}

/**
 * Analyze legal document and provide insights
 */
async function analyzeLegalDocument(documentText, analysisType = "general") {
    try {
        const model = getGenAI().getGenerativeModel({ model: MODEL_NAME });

        const prompt = `You are a legal document analyst. Analyze the following legal document and provide:
1. **Document Type Identification**
2. **Key Clauses and Provisions**
3. **Potential Issues or Red Flags**
4. **Rights and Obligations**
5. **Recommendations**

Document to analyze:
${documentText.substring(0, 8000)}

Provide detailed analysis in clear sections.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Document Analysis Error:", error);
        throw handleAIError(error);
    }
}

/**
 * Generate legal document from template
 */
async function generateLegalDocument(documentType, details) {
    try {
        const model = getGenAI().getGenerativeModel({ 
            model: MODEL_NAME,
            generationConfig: {
                temperature: 0.3,
            }
        });

        const prompt = `Generate a professional legal document in Indian legal format.

Document Type: ${documentType}
Details: ${JSON.stringify(details, null, 2)}

Requirements:
- Use proper legal format and structure
- Include all necessary sections and clauses
- Use formal legal language
- Add placeholders [TO BE FILLED] where specific information is needed
- Include signature blocks and date sections
- Follow Indian legal standards

Generate the complete document:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Document Generation Error:", error);
        throw handleAIError(error);
    }
}

/**
 * Provide case strategy and legal advice
 */
async function provideCaseStrategy(caseDetails) {
    try {
        const model = getGenAI().getGenerativeModel({ model: MODEL_NAME });

        const prompt = `As a legal strategist, analyze this case and provide strategic advice:

Case Details:
${JSON.stringify(caseDetails, null, 2)}

Provide:
1. **Case Analysis**: Strengths and weaknesses
2. **Legal Grounds**: Relevant sections and precedents
3. **Strategy Options**: Different approaches available
4. **Recommended Action Plan**: Step-by-step strategy
5. **Evidence Requirements**: What evidence to gather
6. **Timeline**: Expected procedural timeline
7. **Risks and Considerations**: Potential challenges

Provide comprehensive strategic guidance:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Case Strategy Error:", error);
        throw handleAIError(error);
    }
}

/**
 * Explain legal term or concept in simple language
 */
async function explainLegalTerm(term, context = "") {
    try {
        const model = getGenAI().getGenerativeModel({ model: MODEL_NAME });

        const prompt = `Explain the legal term "${term}" in simple, easy-to-understand language.
${context ? `Context: ${context}` : ""}

Include:
1. **Simple Definition**: Plain English explanation
2. **Legal Context**: Where/how it's used in law
3. **Example**: Real-world scenario
4. **Related Terms**: Connected concepts
5. **Practical Implications**: What it means for common people

Make it accessible to someone without legal background:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Term Explanation Error:", error);
        throw handleAIError(error);
    }
}

/**
 * Enhance response formatting for better readability
 */
function enhanceResponseFormatting(text) {
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.replace(/^(#{1,3}[^#\n]+)$/gm, '\n$1\n');
    return text.trim();
}

/**
 * Handle AI errors with user-friendly messages
 */
function handleAIError(error) {
    if (error.message?.includes("API key") || error.message?.includes("API_KEY")) {
        return new Error("⚠️ AI service configuration issue. Please contact support.");
    }
    
    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
        return new Error("⏳ AI service is experiencing high demand. Please try again in a moment.");
    }
    
    if (error.message?.includes("safety") || error.message?.includes("blocked")) {
        return new Error("⚠️ Your query couldn't be processed due to content safety policies. Please rephrase your question.");
    }
    
    if (error.message?.includes("timeout")) {
        return new Error("⏱️ Request timeout. Please try a shorter or simpler query.");
    }

    return new Error("❌ Unable to process your request right now. Please try again.");
}

/**
 * Get quick response for predefined prompts
 */
async function getQuickResponse(promptType) {
    const prompts = {
        rights: {
            message: "What are the comprehensive legal rights of an accused person in India under the Constitution, IPC, and CrPC? Include arrest rights, bail rights, and trial rights with specific article/section references.",
            context: "rights"
        },
        bail: {
            message: "Explain Anticipatory Bail (Section 438 CrPC) and Regular Bail in detail. Include eligibility criteria, application process, required documents, timeline, and common grounds for granting/rejecting bail.",
            context: "procedure"
        },
        adjournment: {
            message: "Provide a step-by-step guide on requesting court adjournment and draft a professional adjournment application format with all necessary sections, proper legal language, and court addressing.",
            context: "drafting"
        },
        hearing: {
            message: "Create a comprehensive checklist for first court hearing preparation including required documents, dress code, court etiquette, what to expect, timeline, and common mistakes to avoid. Include tips for both civil and criminal cases.",
            context: "procedure"
        },
        fir: {
            message: "Explain the FIR (First Information Report) process in India comprehensively. How to file, rights during FIR, difference between FIR and complaint, zero FIR concept, online FIR, and what to do if police refuse to register FIR.",
            context: "procedure"
        },
        complaint: {
            message: "Guide me through filing a consumer complaint under Consumer Protection Act. Include jurisdiction determination, required documents, fees structure, timeline for resolution, and alternative dispute resolution options.",
            context: "procedure"
        }
    };

    const prompt = prompts[promptType];
    if (!prompt) {
        return await generateLegalResponse(promptType, []);
    }

    return await generateLegalResponse(prompt.message, [], prompt.context);
}

module.exports = {
    generateLegalResponse,
    getQuickResponse,
    analyzeLegalDocument,
    generateLegalDocument,
    provideCaseStrategy,
    explainLegalTerm,
};
