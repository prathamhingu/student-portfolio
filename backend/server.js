const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const logger = require("./middleware/logger");

const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is Running..."
    });
});

app.use("/auth", authRoutes);
app.use("/tasks", authMiddleware, taskRoutes);


// Global error handler - MUST be last
app.use(errorHandler);

const PORT = 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
    });