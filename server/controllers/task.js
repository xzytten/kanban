import Task from '../models/Task.js';
import mongoose from 'mongoose';
//postTask
export const postTask = async (req, res) => {
    try {
        const { project, title, description, subtasks, date, author } = req.body;

        const newTask = new Task({
            project,
            title,
            description,
            subtasks,
            date,
            author
        });

        await newTask.save()

        res.json({
            newTask,
            message: 'new task added'
        })
    } catch (error) {
        res.json({
            message: 'error in add task'
        })
    }
}

//getTask
export const getOneTask = async (req, res) => {
    try {
        const { taskId } = req.body; // Отримуємо taskId з тіла запиту
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