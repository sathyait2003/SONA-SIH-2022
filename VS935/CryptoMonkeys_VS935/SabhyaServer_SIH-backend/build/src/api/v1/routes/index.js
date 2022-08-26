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
const express_1 = require("express");
const auth_1 = require("./auth");
const hei_1 = require("./hei");
const user_1 = require("./user");
const axios_1 = __importDefault(require("axios"));
const filterAndSort_1 = require("../services/filterAndSort");
const auth_2 = __importDefault(require("../middlewares/auth"));
const resource_1 = require("../models/resource");
const institute_1 = require("../models/institute");
const route = express_1.Router();
route.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('working updates');
    }
    catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        console.log('error', err);
    }
}));
// async contents
// import routes
route.use('/auth', auth_1.authRoute);
route.use('/hei', hei_1.heiRoute);
route.use('/user', user_1.userRoute);
// common
route.get('/instituteContent/:id', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //based on recommendation
        const { id } = req.params;
        console.log(id, 'insti id ');
        const response = yield resource_1.ResourceModel.find({ intiId: id });
        console.log(response);
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}));
route.get('/institute/:id', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //based on recommendation
        const { id } = req.params;
        console.log(id, 'insti id ');
        const response = yield institute_1.InstituteModel.findOne({ _id: id });
        console.log(response);
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}));
route.get('/topContents', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //based on recommendation
        const response = yield resource_1.ResourceModel.find({}).populate('intiId').limit(10).sort({ downloadCount: -1, viewCount: -1 });
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}));
route.get('/constents', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //based on recommendation
        const response = yield resource_1.ResourceModel.find({}).populate('intiId');
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}));
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
route.get('/recommendedContents', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //based on recommendation
        const response = yield axios_1.default.get(`${process.env.ML_PORT}/recommendedContents`);
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
})); //not done
// route.get('/downloadContent/:id',authMiddleWare);
route.get('/institutes', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.body;
        const response = yield institute_1.InstituteModel.find({});
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}));
route.get('/recommendedInstitues', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.body;
        const response = yield filterAndSort_1.filterAndSortFun(filter);
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
})); //not done
//post
route.post('/filter', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.body;
        const response = yield filterAndSort_1.filterAndSortFun(filter);
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
})); //not done
route.post('/contentView', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //based on recommendation
        const { id } = req.body.data;
        console.log(id, 'content id');
        const response = yield resource_1.ResourceModel.findByIdAndUpdate({
            _id: id
        }, {
            $inc: { viewCount: 1 }
        }, {
            new: true
        });
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
}));
route.post('/contentDownload', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //based on recommendation
        const { id } = req.body.data;
        const response = yield resource_1.ResourceModel.findByIdAndUpdate({
            _id: id
        }, {
            $inc: { downloadCount: 1 }
        }, {
            new: true
        });
        res.status(200).json(response);
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        console.log(e, 'error');
    }
})); // download not done yet
const MainRoute = route;
exports.default = MainRoute;
