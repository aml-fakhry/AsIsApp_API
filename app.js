import express from 'express';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import * as server from './server/server.js';
import addFormats from 'ajv-formats';

/**
 * Set `AJV` format to validate properties.
 * Get 'ajv-errors' to can write error message for each validate.
 */
export const ajv = addFormats(new Ajv({ allErrors: true, validateFormats: true }));

ajvErrors(ajv /*{ singleError: true }*/);

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
export const app = express();

/**
 * Bootstrap the app in the following order.
 * 1. Connect to online DataBase at first and don't run server until connected secussfuly to online db.
 * 2. Setup the express server.
 * 3. Start express server after all are done.
 */
server.connectDataBase().then(() => {
  server.setupServer(app);
  server.startServer(app);
});
