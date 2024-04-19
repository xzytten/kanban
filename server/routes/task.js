import { Router } from 'express';
import { postTask } from '../controllers/task.js';
const taskRouter = new Router();

//GET
//http://localhost:3002/api/task/postTask
taskRouter.post('/postTask', postTask)

//POST

//UPDATE

export default taskRouter;