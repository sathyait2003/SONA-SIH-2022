"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_SETUP_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'adminUserName';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'adminUserPassword';
const MONGO_HOST = process.env.MONG_URL || 'localhost:27017';
const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_SETUP_OPTIONS,
    url: `${process.env.SERVER_HOSTNAME}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
exports.SERVER_PORT = process.env.SERVER_PORT || 8080;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: exports.SERVER_PORT
};
const config = {
    mongo: MONGO,
    server: SERVER
};
exports.default = config;
