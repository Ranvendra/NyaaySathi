const express = require("express");
const { connectDB } = require("./db/config");
const { authRouter } = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, ""),
        credentials: true,
    })
);

connectDB();

app.use("/api/auth", authRouter);
app.use("/", async(req, res)=> {
    return res.status(200).json({message: "Nyaay Sathi Server is running Successfully."})
})

module.exports = { app };
