import { JWT } from '../util/jwt.util.js';
import { InternalServerError, unAuthenticated } from '../util/http-responses.util.js';
import { Forbidden } from '../util/http-responses.util.js';
import userRoleModel from '../../src/data/security/users/model/user-role.model.js';

/**
 * Authenticates the coming request by validating the jwt against validity and expiration.
 * @param req The express request.
 * @param res The express response.
 * @param next The next function in the pipeline.
 */
export async function Authenticate(req, res, next) {
  try {
    const jwtData = await JWT.verifyAndDecode(req.headers.authorization ?? '');

    if (jwtData) {
      req.user = {
        userId: jwtData.userId,
        jwtId: jwtData.id,
      };
      next();
    } else {
      unAuthenticated(res);
    }
  } catch (error) {
    InternalServerError(res, error);
  }
}

/**
 * Authorizes the coming request by validating the jwt against validity and expiration in addition to authorize user role.
 * @param roles The list of user roles that the user should has one of them.
 */
export function Authorize(...roles) {
  return async (req, res, next) => {
    try {
      const authorization = req.headers.authorization || Socket.handshake.headers.authorization;

      /**
       * Gets the unsigned json web token from the request's authorization header.
       * Gets user from request authorization header.
       */
      const jwtData = await JWT.verifyAndDecode(authorization ?? '');
      const role = await userRoleModel.findById(jwtData.roleId);

      /* Check validity & expiration. */

      if (jwtData) {
        /* Check authority by user role. */
        if ([...roles].map((key) => key.toString()).includes(role.key)) {
          req.user = {
            userId: jwtData.userId,
            jwtId: jwtData.id,
          };
          next();
        } else {
          /*  Is not allowed to access this route. */
          Forbidden(res);
        }
      } else {
        /* Invalid or expired authorization header. */
        unAuthenticated(res);
      }
    } catch (error) {
      InternalServerError(res, error);
    }
  };
}

/*
 * Authenticates web socket the coming request by validating the jwt against validity and expiration.
 * @param socket The socket server.
 */
export async function AuthenticateWebSocket(socket) {
  try {
    const jwtData = await JWT.verifyAndDecode(socket.handshake.headers.authorization ?? '');
    return jwtData ? true : false;
  } catch (error) {
    return false;
  }
}
