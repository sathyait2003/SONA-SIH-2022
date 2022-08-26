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
exports.authRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../controllers/auth"));
const auth_2 = __importDefault(require("../middlewares/auth"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const route = express_1.Router();
const auth = new auth_1.default();
route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('working');
    }
    catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        console.log('error', err);
    }
}));
route.post('/createAccountHEI', express_async_handler_1.default(auth.createAccount));
route.post('/createAccountUser', express_async_handler_1.default(auth.createAccount));
route.post('/signinHEI', express_async_handler_1.default(auth.loginAccount));
route.post('/signinUser', express_async_handler_1.default(auth.loginAccount));
route.post('/logout', auth_2.default, express_async_handler_1.default(auth.logout));
// route.delete("/account");
exports.authRoute = route;
