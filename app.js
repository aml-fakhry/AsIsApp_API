import express from 'express';
import { connect, connection } from 'mongoose';
const app = express();
import { config } from './config/development';
import * as server from './server/server';

connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

server.setupServer(app);
server.startServer(app);
