import { Router } from 'express';
import { getMember, postMember } from '../controllers/member.js';
const memberRouter = new Router();

//GET
//http://localhost:3002/api/task/memberPost
memberRouter.post('/addMember', postMember)

memberRouter.post('/getMember', getMember)

//POST

//UPDATE

export default memberRouter;