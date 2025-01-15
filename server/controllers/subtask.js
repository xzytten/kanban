import Subtask from '../models/Subtask.js'
import Task from '../models/Task.js';

export const postSubtask = async (req, res) => {
    try {
        const { taskId, status, description } = req.body;

        const newSubtask = new Subtask({
            taskId,
            status,
            description
        })

        await newSubtask.save();

        res.json({
            newSubtask,
            message: "Subtask added"
        })

    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}

export const getSubtask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const subtasks = await Subtask.find({ taskId });

        res.json({ subtasks })
    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}

export const editStatus = async (req, res) => {
    try {
        const { taskId, subtaskId, status } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const subtask = task.subtasks.find((st) => st._id.toString() === subtaskId);

        if (!subtask) {
            return res.status(404).json({ message: 'Subtask not found' });
        }

        subtask.status = status;

        await task.save();

        res.json({
            message: 'Subtask status updated successfully',
            subtask,
            taskId: task._id,
        });

    } catch (error) {
        console.error('Error updating subtask status:', error.message);

        res.status(500).json({
            message: 'Error updating subtask status',
        });
    }
};