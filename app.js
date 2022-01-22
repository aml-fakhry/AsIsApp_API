import express from 'express';
import Ajv from 'ajv';
import { config } from './config/development';
import * as server from './server/server';
import addFormats from 'ajv-formats';

/**
 * Set `AJV` format to validate properties.
 * Get 'ajv-errors' to can write error message for each validate.
 */
export const ajv = addFormats(new Ajv({ allErrors: true, validateFormats: true }));
require('ajv-errors')(ajv /*, {singleError: true} */);

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
export const app = express();

/**
 * Bootstrap the app in the following order.
 * 1. Setup the express server.
 * 2. Start express server after all are done.
 * 3. Connect to online DataBase.
 */
server.setupServer(app);
server.startServer(app);
server.connectDataBase();
