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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isValid_1 = require("../utils/isValid");
const index_1 = require("../../../config/consts/index");
/**
 *
 *  @Authservice by Jitul Teron
 *
 */
class AuthService {
    constructor({ UserModel, InstituteModel }) {
        this._UserModel = UserModel;
        this._InstituteModel = InstituteModel;
    }
    generateAuthToken(model) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ id: model._id.toString() }, process.env.JWT_SECRECT);
            (_a = model.tokens) === null || _a === void 0 ? void 0 : _a.push(token);
            yield model.save();
            return token;
        });
    }
    toJson(model) {
        let modelObj = model.toObject();
        // delete modelObj.hash;
        // delete modelObj.tokens;
        return modelObj;
    }
    generateForgotHashToken(user) {
        const payload = {
            email: user.email,
            _id: user._id
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRECT);
        return token;
    }
    checkResetToken(token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRECT, function (err, decoded) {
            console.log(err, 'err');
            if (err) {
                const error = new Error('Token Expired');
                error.StatusCode = 401;
                error.name = 'Unauthorized';
                throw error;
            }
        });
    }
    checkAuthToken(token, _type) {
        return __awaiter(this, void 0, void 0, function* () {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRECT);
            // console.log(decode, 'model data');
            let model;
            if (_type == index_1.TYPES.user) {
                model = yield this._UserModel.findById(decode.id);
            }
            else if (_type == index_1.TYPES.institute) {
                model = yield this._InstituteModel.findById(decode.id);
            }
            // console.log(model, 'model');
            if (isValid_1.isValid(model)) {
                const error = new Error('Unauthorized Admin');
                error.StatusCode = 401;
                error.name = 'Unauthorized Admin';
                throw error;
            }
            return model;
        });
    }
    login(email, hash, _type) {
        return __awaiter(this, void 0, void 0, function* () {
            let model;
            if (_type == index_1.TYPES.user) {
                model = yield this._UserModel.findOne({ email });
            }
            else if (_type == index_1.TYPES.institute) {
                model = yield this._InstituteModel.findOne({ email });
            }
            console.log(model, '_type');
            if (!model) {
                const error = new Error('Account not found !');
                error.statusCode = 401;
                error.name = 'Unauthorized';
                throw error;
            }
            // bcrypt.
            // const isMatched = await bcrypt.compare(hash, model?.hash!);
            // const isMatched = await bcrypt.compare(hash, model?.hash!);
            const isMatched = hash === (model === null || model === void 0 ? void 0 : model.hash) ? true : false;
            if (!isMatched) {
                const error = new Error('Hash is invalid');
                error.statusCode = 401;
                error.name = 'Unauthorized';
                throw error;
            }
            const token = yield this.generateAuthToken(model);
            return { user: this.toJson(model), token };
        });
    }
    signUp(data, _type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { email } = data;
                // let check: any;
                // if (_type == TYPES.user) {
                //     check = await this._UserModel.findOne({ email });
                // } else if (_type == TYPES.institute) {
                //     check = await this._InstituteModel.findOne({ email });
                // }
                // if (check) {
                //     const error: any = new Error(`${_type.toUpperCase()}  already exists`);
                //     error.statusCode = 400;
                //     throw error;
                // }
                let model;
                if (_type == index_1.TYPES.user) {
                    model = yield this._UserModel.create(Object.assign({}, data));
                }
                else if (_type == index_1.TYPES.institute) {
                    model = yield this._InstituteModel.create(Object.assign({}, data));
                }
                console.log(model, 'model');
                const token = yield this.generateAuthToken(model);
                return { user: this.toJson(model), token };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    logout(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i = 0; i < user.tokens.length; i++) {
                if (user.tokens[i] === token)
                    user.tokens.splice(i, 1);
            }
            yield user.save();
            console.log(user, 'user');
            return user;
        });
    }
    logoutAll(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.tokens = [];
            yield user.save();
        });
    }
}
exports.default = AuthService;
