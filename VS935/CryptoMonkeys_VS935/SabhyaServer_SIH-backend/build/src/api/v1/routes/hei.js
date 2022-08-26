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
exports.heiRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const hei_1 = __importDefault(require("../controllers/hei"));
const route = express_1.Router();
const hei = new hei_1.default();
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
// route.get('/instituteContent/:id', authMiddleWare, asyncHandle(hei.myOneInstiContent));
route.get('/myContents', auth_1.default, express_async_handler_1.default(hei.myContents));
route.get('/subscribedContents', auth_1.default, express_async_handler_1.default(hei.mySubscribedContents));
route.get('/subscribedInstitute', auth_1.default, express_async_handler_1.default(hei.mySubscribedInstitute));
route.get('/mySubscriberUser', auth_1.default, express_async_handler_1.default(hei.mySubscriberUser));
route.get('/mySubscriberInstitute', auth_1.default, express_async_handler_1.default(hei.mySubscriberInstitute));
route.get('/content/:id', auth_1.default, express_async_handler_1.default(hei.oneContent));
route.get('/search?content', auth_1.default, express_async_handler_1.default(hei.search)); //not done
route.get('/profile', auth_1.default, hei.profile);
route.post('/addNewContent', auth_1.default, express_async_handler_1.default(hei.addNewContent));
// route.post('/payments', authMiddleWare, hei.payments); // not done
route.patch('/editProfile', auth_1.default, express_async_handler_1.default(hei.editProfile));
route.patch('/editContent/:id', auth_1.default, express_async_handler_1.default(hei.editContent));
route.patch('/subscribeContent', auth_1.default, express_async_handler_1.default(hei.subscribeContent));
route.patch('/subscribeInsti', auth_1.default, express_async_handler_1.default(hei.subscribeInsti));
// route.patch('/unsubscribe/:id', authMiddleWare, asyncHandle(hei.unsubscribe));
route.delete('/deleteContent/:id', auth_1.default, express_async_handler_1.default(hei.deleteContent));
exports.heiRoute = route;
