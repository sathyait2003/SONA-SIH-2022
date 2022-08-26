"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./api/v1/app"));
const http_1 = __importDefault(require("http"));
const chalk_1 = __importDefault(require("chalk"));
const configVar_1 = require("./config/configVar");
const mongoose_1 = __importDefault(require("./db/mongoose"));
//import connect from './db/sql';
const server = http_1.default.createServer(app_1.default);
server.listen(process.env.PORT || 8080, () => {
    console.info(chalk_1.default.bgWhite.black.bold(`Connecting to Server on port ${configVar_1.SERVER_PORT}`));
    console.info(chalk_1.default.bgWhite.black.bold(`API templted by Jitul Teron`));
    mongoose_1.default();
});
