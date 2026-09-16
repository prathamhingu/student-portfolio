function errorHandler(err, req, res, next) {
    console.error("Error:", err.message);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            error: err.message
        });
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format",
            error: err.message
        });
    }

    // General server error
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: err.message
    });
}

module.exports = errorHandler;