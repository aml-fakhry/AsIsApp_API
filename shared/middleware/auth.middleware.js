import { JWT } from '../util/jwt.util';
import { unAuthenticated } from '../util/http-responses.util';
import { InternalServerError } from '../util/http-responses.util';
import { Forbidden } from '../util/http-responses.util';
import userRoleModel from '../../src/security/users/model/user-role.model';

/**
 * Authenticates the coming request by validating the jwt against validity.
 * @param req The express request.
 * @param res The express response.
 * @param next The next function in the pipeline.
 * @notes There is a tolerance in validating the jwt against expiration, so this middleware will ignore jwt expiration.
 */
export async function AuthenticateWithTolerance(req, res, next) {
  try {
    const jwtData = await JWT.verifyAndDecode(req.headers.authorization ?? '', true);

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
      /**
       * Gets the unsigned json web token from the request's authorization header.
       */
      const jwtData = await JWT.verifyAndDecode(req.headers.authorization ?? '');

      const role = await userRoleModel.findById(jwtData.roleId);

      /**
       * Check validity & expiration.
       */
      if (jwtData) {
        /**
         * Check authority by user role.
         */

        if ([...roles].map((key) => key.toString()).includes(role.key)) {
          req.user = {
            userId: jwtData.userId,
            jwtId: jwtData.id,
          };
          next();
        } else {
          /**
           * Is not allowed to access this route.
           */
          Forbidden(res);
        }
      } else {
        /**
         * Invalid or expired authorization header.
         */
        unAuthenticated(res);
      }
    } catch (error) {
      InternalServerError(res, error);
    }
  };
}
