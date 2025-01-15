import { Router } from 'express';
import { postSubtask, getSubtask, editStatus } from '../controllers/subtask.js';

const subtaskRouter = new Router();

//http://localhost:3002/api/subtask/postSubtask
subtaskRouter.post('/postSubtask', postSubtask);

//http://localhost:3002/api/subtask/getSubtask
subtaskRouter.get('/getSubtask', getSubtask);

subtaskRouter.put('/editStatus', editStatus);

//UPDATE
export default subtaskRouter;