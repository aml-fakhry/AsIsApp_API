import express from 'express';
import { connect, connection } from 'mongoose';
import Ajv from 'ajv';
import { config } from './config/development';
import * as server from './server/server';
import addFormats from 'ajv-formats';

export const ajv = addFormats(new Ajv({ allErrors: true, validateFormats: true }));

const app = express();

/* Ensure that we don't start the server unless database is connected. */
connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

/**
 * Bootstrap the app in the following order.
 * 1. Setup the express server.
 * 2. Start express server after all are done.
 */
server.setupServer(app);
server.startServer(app);
