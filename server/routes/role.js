import { Router } from 'express';
import { postRole, getAllRole } from '../controllers/role.js';
const roleRouter = new Router();

//GET
//http://localhost:3002/api/task/rolePost
roleRouter.post('/postRole', postRole);

roleRouter.get('/getAllRole', getAllRole);

export default roleRouter;