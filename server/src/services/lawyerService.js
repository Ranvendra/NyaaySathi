const User = require("../models/User");
const Case = require("../models/Case");
const Consultation = require("../models/Consultation");
const Message = require("../models/Message");
const Earnings = require("../models/Earnings");

/**
 * Get lawyer profile by ID
 */
async function getLawyerProfile(lawyerId) {
    const lawyer = await User.findById(lawyerId).select("-password");
    if (!lawyer || lawyer.role !== "LAWYER") {
        throw new Error("Lawyer not found");
    }
    return lawyer;
}

/**
 * Get count of active cases for a lawyer
 */
async function getActiveCasesCount(lawyerId) {
    const count = await Case.countDocuments({
        lawyerId,
        status: "active",
    });
    return count;
}

/**
 * Get count of new cases added this week
 */
async function getNewCasesThisWeek(lawyerId) {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const count = await Case.countDocuments({
        lawyerId,
        createdAt: { $gte: startOfWeek },
    });
    return count;
}

/**
 * Get count of pending client queries (unread messages)
 */
async function getPendingQueriesCount(lawyerId) {
    const count = await Message.countDocuments({
        lawyerId,
        isRead: false,
        isArchived: false,
    });
    return count;
}

/**
 * Get today's consultations for a lawyer
 */
async function getTodayConsultationsCount(lawyerId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await Consultation.countDocuments({
        lawyerId,
        scheduledAt: { $gte: today, $lt: tomorrow },
        status: "scheduled",
    });
    return count;
}

/**
 * Get upcoming consultations for a lawyer (today and future)
 */
async function getUpcomingConsultations(lawyerId, limit = 5) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const consultations = await Consultation.find({
        lawyerId,
        scheduledAt: { $gte: now },
        status: "scheduled",
    })
        .sort({ scheduledAt: 1 })
        .limit(limit)
        .lean();

    return consultations;
}

/**
 * Get earnings this month for a lawyer
 */
async function getMonthlyEarnings(lawyerId) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const result = await Earnings.aggregate([
        {
            $match: {
                lawyerId: lawyerId,
                paymentStatus: "completed",
                paidAt: { $gte: startOfMonth },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ]);

    return result.length > 0 ? result[0].total : 0;
}

/**
 * Get last month's earnings for comparison
 */
async function getLastMonthEarnings(lawyerId) {
    const startOfLastMonth = new Date();
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    startOfLastMonth.setDate(1);
    startOfLastMonth.setHours(0, 0, 0, 0);

    const startOfThisMonth = new Date();
    startOfThisMonth.setDate(1);
    startOfThisMonth.setHours(0, 0, 0, 0);

    const result = await Earnings.aggregate([
        {
            $match: {
                lawyerId: lawyerId,
                paymentStatus: "completed",
                paidAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ]);

    return result.length > 0 ? result[0].total : 0;
}

/**
 * Get recent messages for a lawyer
 */
async function getRecentMessages(lawyerId, limit = 5) {
    const messages = await Message.find({
        lawyerId,
        isArchived: false,
    })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

    return messages;
}

/**
 * Get complete dashboard data for a lawyer
 */
async function getDashboardData(lawyerId) {
    const mongoose = require("mongoose");
    const objectId = new mongoose.Types.ObjectId(lawyerId);

    // Run all queries in parallel for better performance
    const [
        activeCases,
        newCasesThisWeek,
        pendingQueries,
        todayConsultations,
        upcomingConsultations,
        monthlyEarnings,
        lastMonthEarnings,
        recentMessages,
        lawyerProfile,
    ] = await Promise.all([
        getActiveCasesCount(objectId),
        getNewCasesThisWeek(objectId),
        getPendingQueriesCount(objectId),
        getTodayConsultationsCount(objectId),
        getUpcomingConsultations(objectId),
        getMonthlyEarnings(objectId),
        getLastMonthEarnings(objectId),
        getRecentMessages(objectId),
        getLawyerProfile(lawyerId),
    ]);

    // Calculate earnings change
    const earningsChange = monthlyEarnings - lastMonthEarnings;

    return {
        lawyer: {
            id: lawyerProfile._id,
            name: lawyerProfile.name,
            email: lawyerProfile.email,
            role: lawyerProfile.role,
            lawyerProfile: lawyerProfile.lawyerProfile,
        },
        stats: {
            activeCases,
            newCasesThisWeek,
            pendingQueries,
            todayConsultations,
            monthlyEarnings,
            earningsChange,
        },
        upcomingConsultations,
        recentMessages,
    };
}

module.exports = {
    getLawyerProfile,
    getActiveCasesCount,
    getPendingQueriesCount,
    getTodayConsultationsCount,
    getUpcomingConsultations,
    getMonthlyEarnings,
    getRecentMessages,
    getDashboardData,
};
