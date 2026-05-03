import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const getDashboardStats = async (req, res) => {
    try {
        const { projectId } = req.params;

        const totalTasks = await Task.countDocuments({ project: projectId });
        
        const tasksByStatus = await Task.aggregate([
            { $match: { project: new mongoose.Types.ObjectId(projectId) } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const overdueTasks = await Task.countDocuments({
            project: projectId,
            dueDate: { $lt: new Date() },
            status: { $ne: 'Done' }
        });

        res.status(200).json({ totalTasks, tasksByStatus, overdueTasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard stats" });
    }
};