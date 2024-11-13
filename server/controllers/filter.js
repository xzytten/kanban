import Filter from '../models/Filter.js';
import Project from '../models/Project.js';

export const postFilter = async (req, res) => {
    try {
        const { filter, projectId } = req.body;

        const newFilter = new Filter({
            name: filter.name,
            backgroundColor: filter.backgroundColor,
            textColor: filter.textColor,
            project: projectId
        });

        console.log("newFilter", newFilter)
        if (projectId) {
            await newFilter.save();

            await Project.findByIdAndUpdate(projectId, { $push: { filter: newFilter._id } }, { new: true });

            res.json({
                filter: newFilter,
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


export const getAllFilter = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId)
        const filterIds = project.filter;

        const filters = await Filter.find({
            _id: { $in: filterIds }
        });

        res.json({
            filters,
            message: 'seccessful'
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}