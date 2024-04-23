import Role from '../models/Role.js';
import Project from '../models/Project.js';

export const postRole = async (req, res) => {
    try {
        const { color, name } = req.body;

        const newRole = new Role({
            color,
            name,
        });

        const projectId = req.body.projectId;
        if (projectId) {
            await newRole.save();

            await Project.findByIdAndUpdate(projectId, { $push: { role: newRole._id } }, { new: true });

            res.json({
                newRole,
                message: "Role added"
            });

        } else {
            res.status(500).json({
                message: 'Error occurred while adding role'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error occurred while adding role'
        });
    }
};


export const getAllRole = async (req, res) => {
    try {
        const { taskId } = req.body;

        const roles = await Role.find({ taskId });

        res.json({ roles })
    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}