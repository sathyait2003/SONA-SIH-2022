import asyncHandler from 'express-async-handler';
import { UserDoc, UserModel } from '../models/user';
import { InstituteModel, InstitueDoc } from '../models/institute';
import { Request, Response } from 'express';
import { TYPES } from '../../../config/consts';

import AuthService from '../services/authService';

declare global {
    namespace Express {
        interface Request {
            token: string;
            user: UserDoc;
            type: String;
            institute: InstitueDoc;
        }
    }
}

var auth = asyncHandler(async (req: Request, res: Response, next) => {
    try {
        req.token = <string>req.header('auth');
        req.type = <string>req.header('type');
        console.log(req.token, 'token');

        const authService = new AuthService({
            UserModel,
            InstituteModel
        });

        if (req.type === TYPES.user) {
            req.user = await authService.checkAuthToken(req.token, TYPES.user);
        } else if (req.type == TYPES.institute) {
            req.institute = await authService.checkAuthToken(req.token, TYPES.institute);
        } else {
            let err = new Error('Unauthorized login type');
            throw err;
        }
        // console.log(req.token,req.type)
        next();
    } catch (err: any) {
        console.log(err);
        if (err instanceof Error) {
            err = new Error('Please Authenticate');
            err.statusCode = 401;
            err.name = 'NoAuth';
            throw err;
        }
    }
});

export default auth;
