import Subtask from '../models/Subtask.js'

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