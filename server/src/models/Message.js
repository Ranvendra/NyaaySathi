const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        lawyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        senderName: {
            type: String,
            required: true,
        },
        senderAvatar: {
            type: String,
            default: null,
        },
        subject: {
            type: String,
            default: null,
        },
        content: {
            type: String,
            required: true,
        },
        preview: {
            type: String,
            default: null,
        },
        isEncrypted: {
            type: Boolean,
            default: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ["normal", "important", "urgent"],
            default: "normal",
        },
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Case",
            default: null,
        },
    },
    { timestamps: true }
);

// Auto-generate preview from content if not provided
MessageSchema.pre("save", function (next) {
    if (!this.preview && this.content) {
        this.preview = this.content.substring(0, 100) + (this.content.length > 100 ? "..." : "");
    }
    next();
});

module.exports = mongoose.model("Message", MessageSchema);
