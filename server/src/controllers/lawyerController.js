const { getDashboardData, getLawyerProfile } = require("../services/lawyerService");

/**
 * Get lawyer dashboard data
 * GET /api/lawyer/dashboard
 */
async function getDashboardController(req, res) {
    try {
        const lawyerId = req.user.id;

        // Verify user is a lawyer
        if (req.user.role !== "LAWYER") {
            return res.status(403).json({ error: "Access denied. Lawyers only." });
        }

        const dashboardData = await getDashboardData(lawyerId);
        return res.status(200).json(dashboardData);
    } catch (err) {
        console.error("Dashboard error:", err);
        return res.status(500).json({ error: err.message });
    }
}

/**
 * Get lawyer profile
 * GET /api/lawyer/profile
 */
async function getProfileController(req, res) {
    try {
        const lawyerId = req.user.id;

        // Verify user is a lawyer
        if (req.user.role !== "LAWYER") {
            return res.status(403).json({ error: "Access denied. Lawyers only." });
        }

        const profile = await getLawyerProfile(lawyerId);
        return res.status(200).json(profile);
    } catch (err) {
        console.error("Profile error:", err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { getDashboardController, getProfileController };
