import { Router } from 'express';
import { addProject, getProjects, getProjectInvite, addProjectInvite } from '../controllers/project.js';
const projectRouter = new Router();

//GET
//http://localhost:3002/api/task/projectPost

projectRouter.post('/addProject', addProject)
projectRouter.get('/getProjects/:userId', getProjects)
projectRouter.get('/getProjectInvite/:token/:userId', getProjectInvite)
projectRouter.post('/addProjectInvite', addProjectInvite)

export default projectRouter;