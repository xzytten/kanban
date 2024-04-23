import { Router } from 'express';
import { getAllMember, postMember } from '../controllers/member.js';
const memberRouter = new Router();

//GET
//http://localhost:3002/api/task/memberPost
memberRouter.post('/addMember', postMember)

memberRouter.get('/getAllMember', getAllMember)

//POST

//UPDATE

export default memberRouter;