const express = require("express");
const { connectDB } = require("./db/config");
const { authRouter } = require("./routes/authRoutes");
const { lawyerRouter } = require("./routes/lawyerRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            (process.env.FRONTEND_URL || "").replace(/\/$/, ""),
        ].filter(Boolean), // Remove empty strings if env var is missing
        credentials: true,
    })
);

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/lawyer", lawyerRouter);
app.use("/", async (req, res) => {
    return res.status(200).json({ message: "Nyaay Sathi Server is running Successfully." })
})

module.exports = { app };
