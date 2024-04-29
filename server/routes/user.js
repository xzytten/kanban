import { Router } from 'express';
import { getMe, login, register } from '../controllers/user.js';
import { cheskAuth } from '../utils/checkAuth.js';

const userRouter = new Router();

//http://localhost:3002/api/user/
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/getMe', cheskAuth, getMe)



export default userRouter;