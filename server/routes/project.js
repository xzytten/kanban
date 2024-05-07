import { Router } from 'express';
import { postProject, getProject } from '../controllers/project.js';
const projectRouter = new Router();

//GET
//http://localhost:3002/api/task/projectPost

projectRouter.post('/addProject', postProject)
projectRouter.post('/getProject', getProject)


export default projectRouter;