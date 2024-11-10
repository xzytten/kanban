import Task from '../models/Task.js';
import Project from '../models/Project.js';

//postTask
export const addTask = async (req, res) => {
    try {
        console.log('Add Task - ', req.body)
        const { project, title, description, type, filters, subtasks, date, author } = req.body;

        if (project) {

            const newTask = new Task({
                project: project,
                title,
                description,
                type,
                subtasks,
                filters,
                author,
                date,
            });

            await newTask.save();

            const myProject = await Project.findById(project);
            myProject.task.push(newTask._id);
            await myProject.save();

            res.json({
                task: newTask,
                message: 'new task added'
            });
        } else {
            res.json({
                message: 'You didnt select a project'
            });
        }

    } catch (error) {
        res.json({
            message: 'error in add task'
        });
    }
};

//getTask
export const getOneTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.json({ message: "Task not found" });
        }
        res.json({ task });
    } catch (error) {
        res.status(500).json({
            message: 'Error, something went wrong'
        });
    }
}

//deleteOneTask
export const deleteOneTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.json({ message: "Task not found" });
        }
        res.json({ task: task.id, message: "Task was deleted seccessfully" });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting task'
        });
    }
}

//editTypeTask
export const editTypeTask = async (req, res) => {
    try {
        const { taskId, type } = req.body;
        const task = await Task.findByIdAndUpdate(
            taskId,
            { type: type },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        if (task.type !== type) {
            return res.status(404).json({ message: "Something went wrong" })

        }

        return res.json({ task, message: "Update successfuly" });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating task'
        });
    }
}


//getAllTask
export const getAllTask = async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        const tasks = await Task.find({ _id: { $in: project.task } });

        res.status(200).json({
            tasks
        });

    } catch (error) {
        console.error('Error while getting tasks by IDs:', error);
        res.status(500).json({ message: 'Error, something went wrong' });
    }
}