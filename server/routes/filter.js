import { Router } from 'express';
import { postRole, getAllRole } from '../controllers/filter.js';
const filterRouter = new Router();

//GET
//http://localhost:3002/api/task/rolePost
filterRouter.post('/postRole', postRole);

filterRouter.get('/getAllRole', getAllRole);

export default filterRouter;