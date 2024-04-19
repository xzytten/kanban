import Task from '../models/Task.js';
import mongoose from 'mongoose';
//postTask
export const postTask = async (req, res) => {
    try {
        const { title, description, subtasks, date } = req.body;

        const newTask = new Task({
            title,
            description,
            subtasks,
            date
        });
    
        await newTask.save()

        res.json({
            newTask,
            message:'new task added'
        })
    } catch (error) {
        res.json({
            message: 'error in add task'
        })
    }
}

//getTask
export const getTask = async (req, res) => {
    try {
        const { title, description, subtasks, date } = req.body;

        const newTask = new Task({
            title,
            description,
            subtasks,
            date
        });
    
        await newTask.save()

        res.json({
            newTask,
            message:'new task added'
        })
    } catch (error) {
        res.json({
            message: 'error in add task'
        })
    }
}