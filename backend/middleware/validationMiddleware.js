function validateTask(req, res, next) {
    const { title, description, completed } = req.body;

    // Rule 1: title is required
    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Title is required and must be a non-empty string"
        });
    }

    // Rule 2: title length
    if (title.trim().length > 100) {
        return res.status(400).json({
            success: false,
            message: "Title must not exceed 100 characters"
        });
    }

    // Rule 3: description must be a string if provided
    if (
        description !== undefined &&
        description !== null &&
        typeof description !== "string"
    ) {
        return res.status(400).json({
            success: false,
            message: "Description must be a string"
        });
    }

    // Rule 4: completed must be boolean if provided
    if (
        completed !== undefined &&
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            success: false,
            message: "Completed must be a boolean"
        });
    }

    // All validation passed
    next();
}

module.exports = validateTask;