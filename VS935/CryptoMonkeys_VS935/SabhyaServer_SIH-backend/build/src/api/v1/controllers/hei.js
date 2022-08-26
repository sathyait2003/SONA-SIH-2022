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
const resource_1 = require("../models/resource");
const filterAndSort_1 = require("../services/filterAndSort");
const axios_1 = __importDefault(require("axios"));
// import py from ""
class Hei {
    //post
    addNewContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = req.body;
                const { desc } = data;
                const keywords = yield axios_1.default.post(`${process.env.ML_PORT}/keywords_extraction`, {
                    desc
                });
                console.log(keywords.data);
                const response = yield resource_1.ResourceModel.create(Object.assign({ intiId: req.institute._id, keyWords: keywords.data }, data));
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
    filter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // async payments(req: Request, res: Response) {
    //     try {
    //         const { filter } = req.body;
    //         const response = await filterAndSortFun(filter);
    //         res.status(200).json(response);
    //     } catch (e) {
    //         if (e instanceof Error) {
    //             throw e;
    //         }
    //         console.log(e, 'error');
    //     }
    // }
    // get
    myContents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const response = yield resource_1.ResourceModel.find({ intiId: _id }).populate('intiId');
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
    myOneInstiContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield resource_1.ResourceModel.find({ intiId: id }).populate('intiId');
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
    mySubscribedContents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const response = yield institute_1.InstituteModel.findById({ _id: _id }).populate('subscriptionContent');
                // console.log(response)
                res.status(200).json(response === null || response === void 0 ? void 0 : response.subscriptionContent);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    mySubscribedInstitute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const response = yield institute_1.InstituteModel.findById({ _id: _id }).populate('subscriptionInsti');
                console.log(response);
                res.status(200).json(response === null || response === void 0 ? void 0 : response.subscriptionInsti);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    mySubscriberInstitute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const response = yield institute_1.InstituteModel.findById({ _id: _id }).populate('subscriberInsti');
                res.status(200).json(response === null || response === void 0 ? void 0 : response.subscriberInsti);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    mySubscriberUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const response = yield institute_1.InstituteModel.findById({ _id: _id }).populate('subscriberUser');
                console.log(response, 'response');
                res.status(200).json(response === null || response === void 0 ? void 0 : response.subscriberUser);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    oneContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                const response = yield resource_1.ResourceModel.findOne({ _id: id }).populate('intiId');
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
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.institute;
                const response = yield resource_1.ResourceModel.findById({ _id });
                res.status(200).json({ msg: 'not complete' });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.institute;
                const response = yield institute_1.InstituteModel.findById({ _id });
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
    // patch
    editProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const { data } = req.body;
                const response = yield institute_1.InstituteModel.findOneAndUpdate({
                    _id
                }, Object.assign({}, data), {
                    new: true
                });
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
    editContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { data } = req.body;
                const response = yield resource_1.ResourceModel.findOneAndUpdate({
                    _id: id,
                    intiId: req.institute._id
                }, Object.assign({}, data), {
                    new: true
                });
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
    subscribeContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const { id } = req.body.data;
                const response1 = yield institute_1.InstituteModel.findOneAndUpdate({
                    _id
                }, {
                    $push: { subscriptionContent: id }
                }, {
                    new: true
                });
                let response = yield resource_1.ResourceModel.findOneAndUpdate({
                    _id: id
                }, {
                    $push: { subscriberInsti: _id }
                }, {
                    new: true
                });
                res.status(201).json(response1);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    subscribeInsti(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const { id } = req.body.data;
                const response1 = yield institute_1.InstituteModel.findOneAndUpdate({
                    _id
                }, {
                    $push: { subscriptionInsti: id }
                }, {
                    new: true
                });
                const response2 = yield institute_1.InstituteModel.findOneAndUpdate({
                    _id: id
                }, {
                    $push: { subscriberInsti: _id }
                }, {
                    new: true
                });
                res.status(201).json(response1);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
                console.log(e, 'error');
            }
        });
    }
    unsubscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.institute;
                const { intiId } = req.body;
                const res1 = yield institute_1.InstituteModel.findOneAndUpdate({
                    _id
                }, {
                    $pull: { subscribtion: intiId }
                }, {
                    new: true
                });
                let response = null;
                if (res1) {
                    response = yield institute_1.InstituteModel.findOneAndUpdate({
                        intiId
                    }, {
                        $pull: { subscriber: _id }
                    }, {
                        new: true
                    });
                }
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
    //delete
    deleteContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield resource_1.ResourceModel.findByIdAndDelete({
                    _id: id,
                    intiId: req.institute._id
                });
                res.status(202).json(response);
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
exports.default = Hei;
