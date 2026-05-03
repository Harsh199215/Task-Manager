import Project from '../models/Project.js';

export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project.create({
            name,
            description,
            admin: req.user.id, 
            members: [req.user.id] 
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error creating project" });
    }
};

export const addMember = async (req, res) => {
    try {
        const { projectId, memberId } = req.body;
        const project = await Project.findById(projectId);

        if (!project) return res.status(404).json({ message: "Project not found" });
        
        if (project.admin.toString() !== req.user.id) {
            return res.status(403).json({ message: "Only the admin can add members" });
        }

        if (!project.members.includes(memberId)) {
            project.members.push(memberId);
            await project.save();
        }
        res.status(200).json({ message: "Member added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding member" });
    }
};