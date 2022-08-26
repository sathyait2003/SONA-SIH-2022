import { Router, Request, Response } from 'express';
const route = Router();

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

route.post('/editProfile');
route.post('/addNewContent');
route.get('/profle');

route.patch('/editContent/:id');

route.delete('/deleteContent:id');
