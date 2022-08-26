import { Router, Request, Response } from 'express';
import { authRoute } from './auth';
import { heiRoute } from './hei';
import { userRoute } from './user';

import axios from 'axios';
import { filterAndSortFun } from '../services/filterAndSort';
import authMiddleWare from '../middlewares/auth';
import { ResourceModel } from '../models/resource';
import { InstituteModel } from '../models/institute';

const route = Router();

route.get('/test', async (req: Request, res: Response) => {
    try {
        res.send('working updates');
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }

        console.log('error', err);
    }
});

// async contents

// import routes
route.use('/auth', authRoute);
route.use('/hei', heiRoute);
route.use('/user', userRoute);

// common

route.get('/instituteContent/:id', authMiddleWare, async (req: Request, res: Response) => {
    try {
        //based on recommendation
        const { id } = req.params;
        console.log(id, 'insti id ');
        const response = await ResourceModel.find({ intiId: id });
        console.log(response);
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
});

route.get('/institute/:id', authMiddleWare, async (req: Request, res: Response) => {
    try {
        //based on recommendation
        const { id } = req.params;
        console.log(id, 'insti id ');
        const response = await InstituteModel.findOne({ _id: id });
        console.log(response);
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
});

route.get('/topContents', authMiddleWare, async (req: Request, res: Response) => {
    try {
        //based on recommendation
        const response = await ResourceModel.find({}).populate('intiId').limit(10).sort({ downloadCount: -1, viewCount: -1 });
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
});

route.get('/constents', authMiddleWare, async (req: Request, res: Response) => {
    try {
        //based on recommendation
        const response = await ResourceModel.find({}).populate('intiId');
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
});

// route.get('/institutes', authMiddleWare, async (req: Request, res: Response) => {
//     try {
//         //based on recommendation
//         const response = await Inti.find({}).populate('intiId');
//         res.status(200).json(response);
//     } catch (e) {
//         if (e instanceof Error) {
//             throw e;
//         }
//         console.log(e, 'error');
//     }
// });

route.get('/recommendedContents', authMiddleWare, async (req: Request, res: Response) => {
    try {
        //based on recommendation
        const response = await axios.get(`${process.env.ML_PORT}/recommendedContents`);
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}); //not done

// route.get('/downloadContent/:id',authMiddleWare);

route.get('/institutes', authMiddleWare, async (req: Request, res: Response) => {
    try {
        const { filter } = req.body;
        const response = await InstituteModel.find({});
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
});

route.get('/recommendedInstitues', authMiddleWare, async (req: Request, res: Response) => {
    try {
        const { filter } = req.body;
        const response = await filterAndSortFun(filter);
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}); //not done

//post

route.post('/filter', authMiddleWare, async (req: Request, res: Response) => {
    try {
        const { filter } = req.body;
        const response = await filterAndSortFun(filter);
        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}); //not done

route.post('/contentView', authMiddleWare, async (req: Request, res: Response) => {
    try {
        //based on recommendation
        const { id } = req.body.data;
        console.log(id, 'content id');
        const response = await ResourceModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $inc: { viewCount: 1 }
            },
            {
                new: true
            }
        );

        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
});

route.post('/contentDownload', authMiddleWare, async (req: Request, res: Response) => {
    try {
        //based on recommendation
        const { id } = req.body.data;
        const response = await ResourceModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $inc: { downloadCount: 1 }
            },
            {
                new: true
            }
        );

        res.status(200).json(response);
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}); // download not done yet

const MainRoute = route;
export default MainRoute;
