const mongoose = require("mongoose");

const LawyerProfileSchema = new mongoose.Schema(
  {
    barCouncilId: {
      type: String,
      required: true,
    },
    specialization: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    casesSolved: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "LAWYER"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationMethod: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lawyerProfile: {
      type: LawyerProfileSchema,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
