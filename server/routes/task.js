import { Router } from 'express';
import { postTask, getOneTask } from '../controllers/task.js';
const taskRouter = new Router();

//http://localhost:3002/api/task/postTask
taskRouter.post('/postTask', postTask);

//http://localhost:3002/api/task/getOneTask
taskRouter.get('/getOneTask', getOneTask);


//UPDATE

export default taskRouter;