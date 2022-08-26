"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("../../config/logger"));
const consts_1 = require("../../config/consts");
const app = express_1.default();
//middlewares
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(cors_1.default({ origin: true, credentials: true }));
app.use(helmet_1.default());
app.use(morgan_1.default('dev'));
//  api call log
app.use((req, res, next) => {
    /// Log the req
    logger_1.default.info(consts_1.NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    // Log the res on finish
    res.on('finish', () => {
        logger_1.default.info(consts_1.NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
//routes
app.use('/', routes_1.default);
//error handler
app.use((error, req, res, next) => {
    console.error(chalk_1.default.red(error));
    res.status(error.statusCode || 500).json({
        error: true,
        message: error.message || 'An Error Occured',
        route: req.url,
        name: error.name || 'InteralServerError'
    });
});
exports.default = app;
