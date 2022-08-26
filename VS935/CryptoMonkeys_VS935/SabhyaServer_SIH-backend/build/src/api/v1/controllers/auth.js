"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const institute_1 = require("../models/institute");
const user_1 = require("../models/user");
const authService_1 = __importDefault(require("../services/authService"));
const authService = new authService_1.default({
    UserModel: user_1.UserModel,
    InstituteModel: institute_1.InstituteModel
});
class Auth {
    createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, _type } = req.body;
                const response = yield authService.signUp(data, _type);
                res.status(201).json(response);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    loginAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, _type } = req.body;
                const { email, hash } = data;
                const response = yield authService.login(email, hash, _type);
                res.status(200).json(response);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _type, token } = req.body;
                console.log(req.user, req.institute);
                const info = yield authService.logout(_type == 'user' ? req.user : req.institute, token);
                console.log(info);
                res.status(200).json({ message: 'logout successfull' });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
}
exports.default = Auth;
