import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import taskRouter from './routes/task.js';

dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 3005;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/task', taskRouter)


async function serverStart() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.09nrks5.mongodb.net/`)

        app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })
    } catch (error) {

    }
}

serverStart()