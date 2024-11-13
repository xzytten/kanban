import { Router } from 'express';
import { postFilter, getAllFilter } from '../controllers/filter.js';
const filterRouter = new Router();

//GET
//http://localhost:3002/api/filter/postFilter
filterRouter.post('/postFilter', postFilter);
filterRouter.get('/getAllFilter/:projectId', getAllFilter);

export default filterRouter;