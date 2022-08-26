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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("../models/user");
const institute_1 = require("../models/institute");
const consts_1 = require("../../../config/consts");
const authService_1 = __importDefault(require("../services/authService"));
var auth = express_async_handler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.token = req.header('auth');
        req.type = req.header('type');
        console.log(req.token, 'token');
        const authService = new authService_1.default({
            UserModel: user_1.UserModel,
            InstituteModel: institute_1.InstituteModel
        });
        if (req.type === consts_1.TYPES.user) {
            req.user = yield authService.checkAuthToken(req.token, consts_1.TYPES.user);
        }
        else if (req.type == consts_1.TYPES.institute) {
            req.institute = yield authService.checkAuthToken(req.token, consts_1.TYPES.institute);
        }
        else {
            let err = new Error('Unauthorized login type');
            throw err;
        }
        // console.log(req.token,req.type)
        next();
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error) {
            err = new Error('Please Authenticate');
            err.statusCode = 401;
            err.name = 'NoAuth';
            throw err;
        }
    }
}));
exports.default = auth;
