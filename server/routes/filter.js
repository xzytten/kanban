import { Router } from 'express';
import { postFilter, getAllFilter, addFilterToTask, removeFilterFromTask,ChangeFilter,DeleteFilter} from '../controllers/filter.js';
const filterRouter = new Router();

//GET
//http://localhost:3002/api/filter/postFilter
filterRouter.post('/postFilter', postFilter);
filterRouter.get('/getAllFilter/:projectId', getAllFilter);
filterRouter.post('/addFilterToTask', addFilterToTask);
filterRouter.post('/removeFilterFromTask', removeFilterFromTask);
filterRouter.patch('/ChangeFilter', ChangeFilter)
filterRouter.delete('/DeleteFilter/:filterId/:projectId', DeleteFilter)
export default filterRouter;