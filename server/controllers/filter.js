import mongoose from 'mongoose';
import Filter from '../models/Filter.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const postFilter = async (req, res) => {
    try {
        const { filter, projectId } = req.body;

        const newFilter = new Filter({
            name: filter.name,
            backgroundColor: filter.backgroundColor,
            textColor: filter.textColor,
            project: projectId
        });

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

export const addFilterToTask = async (req, res) => {
    try {
        const { filter, taskId } = req.body;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.filters.includes(filter._id)) {
            task.filters.push(filter._id);
        }

        await task.save();

        res.status(200).json({ filter: filter, taskId });
    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}

export const removeFilterFromTask = async (req, res) => {
    try {
        const { filterId, taskId } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const filterObjectId = new mongoose.Types.ObjectId(filterId);

        const updatedFilters = task.filters.filter(f => !f.equals(filterObjectId));

        task.filters = updatedFilters;
        await task.save();

        res.status(200).json({ filterId, taskId });

    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}

export const ChangeFilter = async (req, res) => {
    try {
        const { changedFilter, _id } = req.body;

        const filter = await Filter.findById(_id);

        if (!filter) {
            return res.status(404).json({ message: "Filter not found" });
        }

        if (changedFilter.name) filter.name = changedFilter.name;
        if (changedFilter.backgroundColor) filter.backgroundColor = changedFilter.backgroundColor;
        if (changedFilter.textColor) filter.textColor = changedFilter.textColor;

        await filter.save();

        res.status(200).json({ message: 'ok', changedFilter: filter });

    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}

export const DeleteFilter = async (req, res) => {
    try {
        const { filterId, projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const taskIds = project.task.map(taskId => taskId.toString());
        const tasks = await Task.find({ _id: { $in: taskIds } });

        for (let task of tasks) {
            task.filters = task.filters.filter(filter => filter.toString() !== filterId);
            task.save();
        }

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { $pull: { filter: filterId } },
            { new: true }
        );

        const filterExistsInProject = updatedProject.filter.some(filter => filter.toString() === filterId);

        if (filterExistsInProject) {
            return res.status(400).json({ message: "Filter not removed from the project" });
        }

        await Filter.findByIdAndDelete(filterId);

        res.status(200).json({ deletedFilterId: filterId });


    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}