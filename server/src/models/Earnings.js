const mongoose = require("mongoose");

const EarningsSchema = new mongoose.Schema(
    {
        lawyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Case",
            default: null,
        },
        consultationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Consultation",
            default: null,
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["case-fee", "consultation-fee", "retainer", "other"],
            default: "case-fee",
        },
        description: {
            type: String,
            default: null,
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "bank-transfer", "upi", "card", "other"],
            default: "bank-transfer",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "completed",
        },
        transactionId: {
            type: String,
            default: null,
        },
        paidAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Earnings", EarningsSchema);
