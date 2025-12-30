const mongoose = require("mongoose");

const ConsultationSchema = new mongoose.Schema(
    {
        lawyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        clientName: {
            type: String,
            required: true,
        },
        clientEmail: {
            type: String,
            default: null,
        },
        clientPhone: {
            type: String,
            default: null,
        },
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Case",
            default: null,
        },
        caseName: {
            type: String,
            default: null,
        },
        consultationType: {
            type: String,
            enum: ["video", "call", "in-person", "meeting"],
            default: "call",
        },
        scheduledAt: {
            type: Date,
            required: true,
        },
        duration: {
            type: Number, // in minutes
            default: 30,
        },
        status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled", "no-show"],
            default: "scheduled",
        },
        notes: {
            type: String,
            default: null,
        },
        meetingLink: {
            type: String,
            default: null,
        },
        fee: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Consultation", ConsultationSchema);
