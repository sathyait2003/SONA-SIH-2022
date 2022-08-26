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
exports.userRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../controllers/user"));
const route = express_1.Router();
const user = new user_1.default();
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
//get
route.get('/subscribedContents', auth_1.default, express_async_handler_1.default(user.mySubscribedContents));
route.get('/subscribedInstitute', auth_1.default, express_async_handler_1.default(user.mySubscribedInstitute));
route.get('/content/:id', auth_1.default, express_async_handler_1.default(user.oneContent));
route.get('/search?content', auth_1.default, express_async_handler_1.default(user.search)); //not done
route.get('/profile', auth_1.default, user.profile);
//post
// route.post('/payments', authMiddleWare, user.payments); //not done
//patch
route.patch('/editProfile', auth_1.default, express_async_handler_1.default(user.editProfile));
route.patch('/subscribeContent', auth_1.default, express_async_handler_1.default(user.subscribeContent));
route.patch('/subscribeInsti', auth_1.default, express_async_handler_1.default(user.subscribeInsti));
// route.patch('/unsubscribe/:id', authMiddleWare, asyncHandle(user.unsubscribe));
// delete
exports.userRoute = route;
