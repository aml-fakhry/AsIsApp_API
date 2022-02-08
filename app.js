import express from 'express';
import Ajv from 'ajv';
import * as server from './server/server';
import addFormats from 'ajv-formats';

/**
 * Set `AJV` format to validate properties.
 * Get 'ajv-errors' to can write error message for each validate.
 */
export const ajv = addFormats(new Ajv({ allErrors: true, validateFormats: true }));
require('ajv-errors')(ajv, { singleError: true });

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
export const app = express();

/**
 * Bootstrap the app in the following order.
 * 1. Connect to online DataBase.
 * 2. Setup the express server.
 * 3. Start express server after all are done.
 *
 */
server.connectDataBase().then(() => {
  server.setupServer(app);
  server.startServer(app);
});
