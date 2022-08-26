import { Router, Request, Response } from 'express';
import Auth from '../controllers/auth';
import authMiddleWare from '../middlewares/auth';
import asyncHandler from 'express-async-handler';

const route = Router();

const auth = new Auth();

route.get('/', async (req: Request, res: Response) => {
    try {
        res.send('working');
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }

        console.log('error', err);
    }
});

route.post('/createAccountHEI', asyncHandler(auth.createAccount));
route.post('/createAccountUser', asyncHandler(auth.createAccount));

route.post('/signinHEI', asyncHandler(auth.loginAccount));
route.post('/signinUser', asyncHandler(auth.loginAccount));

route.post('/logout', authMiddleWare, asyncHandler(auth.logout));

// route.delete("/account");

export const authRoute = route;
