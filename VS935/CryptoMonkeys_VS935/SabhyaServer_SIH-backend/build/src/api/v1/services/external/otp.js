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
const email_1 = __importDefault(require("./email"));
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp.toString());
const emailService = new email_1.default();
class OtpService {
    constructor() { }
    sendOtp(fromData, toData) {
        return __awaiter(this, void 0, void 0, function* () {
            let modiFromData = Object.assign(Object.assign({}, fromData), { text: `thi otp is ${otp}` });
            yield emailService.sendMail(modiFromData, toData);
        });
    }
    verifyOtp(otpIs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (otpIs == otp) {
                return true;
            }
            return false;
        });
    }
}
exports.default = OtpService;
