import { Router } from 'express';
import { login, register } from '../controllers/user.js';
const userRouter = new Router();

//http://localhost:3002/api/user/
userRouter.post('/register', register)
userRouter.get('/login', login)


export default userRouter;