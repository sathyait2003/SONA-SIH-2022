import { Router, Request, Response } from 'express';
import authMiddleWare from '../middlewares/auth';
import asyncHandle from 'express-async-handler';
import Hei from '../controllers/hei';

const route = Router();

const hei = new Hei();

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

// route.get('/instituteContent/:id', authMiddleWare, asyncHandle(hei.myOneInstiContent));
route.get('/myContents', authMiddleWare, asyncHandle(hei.myContents));
route.get('/subscribedContents', authMiddleWare, asyncHandle(hei.mySubscribedContents));
route.get('/subscribedInstitute', authMiddleWare, asyncHandle(hei.mySubscribedInstitute));

route.get('/mySubscriberUser', authMiddleWare, asyncHandle(hei.mySubscriberUser));
route.get('/mySubscriberInstitute', authMiddleWare, asyncHandle(hei.mySubscriberInstitute));

route.get('/content/:id', authMiddleWare, asyncHandle(hei.oneContent));
route.get('/search?content', authMiddleWare, asyncHandle(hei.search)); //not done
route.get('/profile', authMiddleWare, hei.profile);

route.post('/addNewContent', authMiddleWare, asyncHandle(hei.addNewContent));
// route.post('/payments', authMiddleWare, hei.payments); // not done

route.patch('/editProfile', authMiddleWare, asyncHandle(hei.editProfile));
route.patch('/editContent/:id', authMiddleWare, asyncHandle(hei.editContent));
route.patch('/subscribeContent', authMiddleWare, asyncHandle(hei.subscribeContent));
route.patch('/subscribeInsti', authMiddleWare, asyncHandle(hei.subscribeInsti));

// route.patch('/unsubscribe/:id', authMiddleWare, asyncHandle(hei.unsubscribe));

route.delete('/deleteContent/:id', authMiddleWare, asyncHandle(hei.deleteContent));

export const heiRoute = route;
