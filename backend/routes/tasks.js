const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const validateTask = require("../middleware/validationMiddleware");

// GET ALL TASKS
router.get("/", async (req, res, next) => {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
});


// CREATE TASK
router.post("/", validateTask, async (req, res, next) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        });

        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
});


// UPDATE TASK
router.put("/:id", validateTask, async (req, res, next) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
});


// DELETE TASK
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;