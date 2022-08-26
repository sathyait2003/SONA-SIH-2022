import { InstituteModel } from '../models/institute';
import { UserModel, UserDoc } from '../models/user';
import AuthService from '../services/authService';
import { Request, Response } from 'express';

const authService = new AuthService({
    UserModel,
    InstituteModel
});

class Auth {
    async createAccount(req: Request, res: Response) {
        try {
            const { data, _type } = req.body;

            const response = await authService.signUp(data, _type);

            res.status(201).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async loginAccount(req: Request, res: Response) {
        try {
            const { data, _type } = req.body;
            const { email, hash } = data;
            const response = await authService.login(email, hash, _type);

            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const { _type, token } = req.body;
            console.log(req.user, req.institute);
            const info = await authService.logout(_type == 'user' ? req.user : req.institute, token);
            console.log(info);
            res.status(200).json({ message: 'logout successfull' });
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    // async deleteAccount(req: Request, res: Response) {
    //     try {
    //     } catch (e) {

    //     }
    // }
}

export default Auth;
