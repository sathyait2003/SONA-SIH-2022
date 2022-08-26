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
const user_1 = require("../models/user");
const institute_1 = require("../models/institute");
const resource_1 = require("../models/resource");
const axios_1 = __importDefault(require("axios"));
class User {
    //post
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
    // async myContents(req: Request, res: Response) {
    //     try {
    //         const { _id } = req.user;
    //         let response1 = await UserModel.findById({ _id: _id }).populate('subscription');
    //         let response2 = await UserModel.findByIdAndUpdate(
    //             { _id: _id },
    //             {
    //                 docModel: response1.docModel == 'Institute' ? 'Resource' : 'Institute'
    //             },
    //             {
    //                 new: true
    //             }
    //         ).populate('subscription');
    //         const response = [...response1.subscription, ...response2.subscription];
    //         let result: any[] = [];
    //         res.status(200).json(response);
    //     } catch (e) {
    //         if (e instanceof Error) {
    //             throw e;
    //         }
    //         console.log(e, 'error');
    //     }
    // }
    mySubscribedContents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const response = yield user_1.UserModel.findById({ _id: _id }).populate('subscriptionContent');
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
                const { _id } = req.user;
                const response = yield user_1.UserModel.findById({ _id: _id }).populate('subscriptionInsti');
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
    //use this in index route
    contents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //based on recommendation
                const response = yield axios_1.default.get('http://localhost:8082/recommendedContents');
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
    recommendedContents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //based on recommendation
                const response = yield axios_1.default.get('http://localhost:8082/recommendedContents');
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
    //use this in index route
    oneContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                const response = yield resource_1.ResourceModel.findOne({ _id: id });
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
                let { _id } = req.user;
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
                let { _id } = req.user;
                const response = yield user_1.UserModel.findById({ _id });
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
                const { _id } = req.user;
                const { data } = req.body;
                const response = yield user_1.UserModel.findOneAndUpdate({
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
    // async subscribeContent(req: Request, res: Response) {
    //     try {
    //         const { _id } = req.user;
    //         const { id, subType } = req.body.data;
    //         const res1 = await UserModel.findOneAndUpdate(
    //             {
    //                 _id
    //             },
    //             {
    //                 $push: { subscription: id },
    //                 docModel: subType == 'content' ? 'Resource' : 'Institute'
    //             },
    //             {
    //                 new: true
    //             }
    //         );
    //         let response: any = null;
    //         if (res1) {
    //             if (subType == 'content') {
    //                 response = await ResourceModel.findOneAndUpdate(
    //                     {
    //                         _id: id
    //                     },
    //                     {
    //                         $push: { subscriber: _id }
    //                     },
    //                     {
    //                         new: true
    //                     }
    //                 );
    //             } else if (subType == 'institute') {
    //                 response = await InstituteModel.findOneAndUpdate(
    //                     {
    //                         _id: id
    //                     },
    //                     {
    //                         $push: { subscriber: _id }
    //                     },
    //                     {
    //                         new: true
    //                     }
    //                 );
    //             }
    //         }
    //         res.status(201).json(res1);
    //     } catch (e) {
    //         if (e instanceof Error) {
    //             throw e;
    //         }
    //         console.log(e, 'error');
    //     }
    // }
    subscribeContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const { id } = req.body.data;
                const response1 = yield user_1.UserModel.findOneAndUpdate({
                    _id
                }, {
                    $push: { subscriptionContent: id }
                }, {
                    new: true
                });
                let response = yield resource_1.ResourceModel.findOneAndUpdate({
                    _id: id
                }, {
                    $push: { subscriberUser: _id }
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
                const { _id } = req.user;
                const { id } = req.body.data;
                const response1 = yield user_1.UserModel.findOneAndUpdate({
                    _id
                }, {
                    $push: { subscriptionInsti: id }
                }, {
                    new: true
                });
                const response2 = yield institute_1.InstituteModel.findOneAndUpdate({
                    _id: id
                }, {
                    $push: { subscriberUser: _id }
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
}
exports.default = User;
