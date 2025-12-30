import api from "./api";

/**
 * Get lawyer dashboard data
 * @returns {Promise} Dashboard data including stats, consultations, and messages
 */
export const getDashboardData = async () => {
    const response = await api.get("/lawyer/dashboard");
    return response.data;
};

/**
 * Get lawyer profile
 * @returns {Promise} Lawyer profile data
 */
export const getLawyerProfile = async () => {
    const response = await api.get("/lawyer/profile");
    return response.data;
};

export default {
    getDashboardData,
    getLawyerProfile,
};
