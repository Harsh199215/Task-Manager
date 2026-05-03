import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, projectId, assignedTo } = req.body;
        
        const task = await Task.create({
            title, description, dueDate, priority,
            project: projectId,
            assignedTo,
            status: 'To Do'
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const { taskId, status } = req.body;
        const task = await Task.findById(taskId);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.assignedTo.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }

        task.status = status;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating status" });
    }
};