import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const overdueTasks = await Task.countDocuments({ 
            status: { $ne: 'Completed' },
            dueDate: { $lt: new Date() } 
        });

        res.status(200).json({
            totalTasks: totalTasks || 0,
            overdueTasks: overdueTasks || 0
        });
    } catch (err) {
        res.status(500).json({ message: "Error calculating stats" });
    }
});

export default router;