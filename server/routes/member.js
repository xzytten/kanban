import { Router } from 'express';
import { getMember, addMember } from '../controllers/member.js';
const memberRouter = new Router();

//GET
//http://localhost:3002/api/task/memberPost
memberRouter.post('/addMember', addMember)

memberRouter.get('/getMember/:projectId', getMember)

//POST

//UPDATE

export default memberRouter;