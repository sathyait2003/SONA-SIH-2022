"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configVar_1 = __importDefault(require("../config/configVar"));
const consts_1 = require("../config/consts");
const logger_1 = __importDefault(require("../config/logger"));
//config.mongo.url
//'mongodb://localhost:27017/sih'
function connection() {
    return mongoose_1.default
        .connect(configVar_1.default.mongo.url, configVar_1.default.mongo.options)
        .then((result) => {
        logger_1.default.info(consts_1.NAMESPACE, 'Mongo Connected');
    })
        .catch((error) => {
        logger_1.default.error(consts_1.NAMESPACE, error.message, error);
    });
}
exports.default = connection;
