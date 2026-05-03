import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, assignedTo } = req.body;
        const newTask = new Task({
            title,
            description,
            assignedTo,
            status: 'Pending',
            dueDate: req.body.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: "Task creation failed" });
    }
});

router.get('/my-tasks/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
});

export default router;