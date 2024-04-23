import { Router } from 'express';
import { postProject, getProject } from '../controllers/project.js';
const projectRouter = new Router();

//GET
//http://localhost:3002/api/task/projectPost
projectRouter.post('/postProject', postProject)

projectRouter.get('/getProject', getProject)


export default projectRouter;