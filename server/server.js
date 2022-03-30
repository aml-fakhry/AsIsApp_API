import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import util from 'util';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
const { connect, connection } = mongoose;

import { config } from '../config/development.js';
import { authRelativeRoute, authRouter } from '../src/routes/security/auth.routes.js';
import { userRouter, userRelativeRoute } from '../src/routes/security/user.routes.js';
import { postRelativeRoute, postRouter } from '../src/routes/posts/post.routes.js';
import { errorHandler } from '../shared/middleware/error-handel.middleware.js';
import { WebSocket } from '../src/socket/webSocket.js';

/**
 * Sets the static files & security for an express server.
 * @param app The express application to set its express server's request options.
 */
function setStaticsOptions(app) {
  /**
   * Allow trust proxy.
   * Only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc).
   */
  app.enable('trust proxy');
}

/**
 * Sets the http-request options for an express server.
 * @param app The express application to set its express server's request options.
 */
function setRequestOptions(app) {
  /**
   * Enable CORS to allow any javascript client to consume your server's api.
   */
  app.use(cors());

  /**
   * Allow parse incoming requests as JSON payloads.
   * The limit of request body size my be set using this option { limit: '5mb' }, default is 100kb.
   */
  app.use(express.json({ limit: '5mb' }));

  /**
   * Allow parse incoming urlencoded requests bodies.
   * The limit of request body size my be set using this option { limit: '5mb' }, default is 100kb.
   */
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  /**
   * Allow set token in cookie at client side.
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
   *  Optionally you may enable signed cookie support by passing a secret string, which assigns req.
   */
  app.use(cookieParser());
}

function registerRoutes(app) {
  /**
   * The base-route prefix for the api.
   *
   * e.g. `/api/organizations`, `/api/products`.
   */
  const apiBaseRoute = '/api/';
  app.use(apiBaseRoute + authRelativeRoute, authRouter);
  app.use(apiBaseRoute + userRelativeRoute, userRouter);
  app.use(apiBaseRoute + postRelativeRoute, postRouter);
}

export function setupServer(app) {
  /**
   * The order matters.
   * 1. Setup statics options.
   * 2. Set request options.
   * 3. Register routes.
   * 4. Add the error-handler middleware at the very end of pipeline.
   */
  setStaticsOptions(app);
  setRequestOptions(app);
  registerRoutes(app);
  app.use(errorHandler);
}

/**
 * Starts an express server.
 * @param app The express application to start its express server.
 */
export function startServer(app) {
  const httpServer = createServer(app);
  const socketIOServer = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
      transport: [],
    },
  });

  /**
   * Setup socket server.
   */
  WebSocket.setSocket(socketIOServer);
  httpServer.listen(config.PORT, () => {
    console.log(`Server is running at port ${config.PORT}`);
  });
}

/**
 * Connect to online Database.
 */
export async function connectDataBase() {
  /* Ensure that we don't start the server unless database is connected. */
  const db = connection;
  db.on('error', console.error.bind(console, 'connection error:  '));
  db.once('open', function () {
    console.log('Connected successfully');
  });

  /**
   * return promise instead of using call back.
   */
  console.log({ models: db.models });
  const connectPromised = util.promisify(connect);
  return connectPromised(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
