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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
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
route.post('/editProfile');
route.post('/addNewContent');
route.get('/profle');
route.patch('/editContent/:id');
route.delete('/deleteContent:id');
