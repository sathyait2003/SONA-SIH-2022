import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import helmet from 'helmet';
import MainRoute from './routes';
import logger from '../../config/logger';
import { NAMESPACE } from '../../config/consts';
const app: express.Application = express();

//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));

//  api call log
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    /// Log the req
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    // Log the res on finish
    res.on('finish', () => {
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

//routes
app.use('/', MainRoute);

//error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(chalk.red(error));
    res.status(error.statusCode || 500).json({
        error: true,
        message: error.message || 'An Error Occured',
        route: req.url,
        name: error.name || 'InteralServerError'
    });
});

export default app;
