import { Router } from 'express';
import { addTask, getOneTask, getAllTask, deleteOneTask, editTypeTask , editTask} from '../controllers/task.js';
const taskRouter = new Router();

//http://localhost:3002/api/task/addTask
taskRouter.post('/addTask', addTask);

//http://localhost:3002/api/task/getOneTask
taskRouter.get('/getOneTask', getOneTask);

//http://localhost:3002/api/task/getAllTask
taskRouter.post('/getAllTask', getAllTask);

//http://localhost:3002/api/task/deleteOneTask
taskRouter.delete('/deleteOneTask', deleteOneTask)

//http://localhost:3002/api/task/deleteOneTask
taskRouter.patch('/editTypeTask', editTypeTask)

//http://localhost:3002/api/task/deleteOneTask
taskRouter.put('/editTask', editTask)

export default taskRouter;
