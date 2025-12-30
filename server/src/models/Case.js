const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema(
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
        caseTitle: {
            type: String,
            required: true,
        },
        caseNumber: {
            type: String,
            unique: true,
            sparse: true,
        },
        caseType: {
            type: String,
            enum: [
                "Criminal",
                "Civil",
                "Family",
                "Corporate",
                "Property",
                "Labour",
                "Tax",
                "Constitutional",
                "Other",
            ],
            default: "Other",
        },
        description: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "pending", "closed", "on-hold"],
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        courtName: {
            type: String,
            default: null,
        },
        nextHearingDate: {
            type: Date,
            default: null,
        },
        filingDate: {
            type: Date,
            default: null,
        },
        closedDate: {
            type: Date,
            default: null,
        },
        fees: {
            type: Number,
            default: 0,
        },
        feesPaid: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Generate unique case number before saving
CaseSchema.pre("save", async function (next) {
    if (!this.caseNumber) {
        const year = new Date().getFullYear();
        const count = await mongoose.model("Case").countDocuments();
        this.caseNumber = `NS-${year}-${String(count + 1).padStart(5, "0")}`;
    }
    next();
});

module.exports = mongoose.model("Case", CaseSchema);
