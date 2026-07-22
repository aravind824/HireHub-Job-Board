const path = require("path");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

console.log("Starting HireHub...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Found" : "Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Found" : "Missing");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");




console.log("Connecting to MongoDB...");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users",userRoutes);

app.get("/", (req, res) => {
    res.send("🎓 HireHub API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

