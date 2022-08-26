import app from './api/v1/app';
import http from 'http';
import chalk from 'chalk';
import { SERVER_PORT } from './config/configVar';
import connect from './db/mongoose';
import { NAMESPACE } from './config/consts';
//import connect from './db/sql';

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, () => {
    console.info(chalk.bgWhite.black.bold(`Connecting to Server on port ${SERVER_PORT}`));
    console.info(chalk.bgWhite.black.bold(`API templted by Jitul Teron`));
    connect();
});
