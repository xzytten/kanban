import Filter from '../models/Filter.js';
import Project from '../models/Project.js';

export const postRole = async (req, res) => {
    try {
        const { color, name } = req.body;

        const newFilter = new Filter({
            color,
            name,
        });

        const projectId = req.body.projectId;
        if (projectId) {
            await newFilter.save();

            await Project.findByIdAndUpdate(projectId, { $push: { filter: newFilter._id } }, { new: true });

            res.json({
                newFilter,
                message: "Filter added"
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

        const filters = await Filter.find({ taskId });

        res.json({ filters })
    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}