import { Router, Request, Response } from 'express';
import authMiddleWare from '../middlewares/auth';
import asyncHandle from 'express-async-handler';
import User from '../controllers/user';

const route = Router();

const user = new User();

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

//get

route.get('/subscribedContents', authMiddleWare, asyncHandle(user.mySubscribedContents));
route.get('/subscribedInstitute', authMiddleWare, asyncHandle(user.mySubscribedInstitute));

route.get('/content/:id', authMiddleWare, asyncHandle(user.oneContent));
route.get('/search?content', authMiddleWare, asyncHandle(user.search)); //not done
route.get('/profile', authMiddleWare, user.profile);

//post
// route.post('/payments', authMiddleWare, user.payments); //not done

//patch
route.patch('/editProfile', authMiddleWare, asyncHandle(user.editProfile));
route.patch('/subscribeContent', authMiddleWare, asyncHandle(user.subscribeContent));
route.patch('/subscribeInsti', authMiddleWare, asyncHandle(user.subscribeInsti));
// route.patch('/unsubscribe/:id', authMiddleWare, asyncHandle(user.unsubscribe));

// delete

export const userRoute = route;
