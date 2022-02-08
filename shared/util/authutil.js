import { JWT } from './jwt.util';
import { unAuthenticated, Forbidden } from './http-responses.util';
import { InternalServerError } from './http-responses.util';
/**
 * Authenticates the coming request by validating the jwt against validity and expiration.
 * @param req The express request.
 * @param res The express response.
 * @param next The next function in the pipeline.
 */
export async function Authenticate(req, res, next) {
  try {
    const jwt = await JWT.verifyAndDecode(req.headers.authorization ?? '');

    if (jwt) {
      req.user = {
        userId: jwt.userId,
        jwtId: jwt.id,
      };
      next();
    } else {
      unAuthenticated(res);
    }
  } catch (error) {
    InternalServerError(res, error);
    console.log(error);
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
      const jwt = await JWT.verifyAndDecode(req.headers.authorization ?? '');

      /**
       * Check validity & expiration.
       */
      if (jwt) {
        /**
         * Check authority by user role.
         */
        if (isInRoles(roles, jwt.role ?? '')) {
          req.user = {
            userId: jwt.userId,
            jwtId: jwt.id,
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
      console.log(error);
    }
  };
}

/**
 * Determines if the given role exists in the provided set of roles.
 * @param roles The roles to be scanned.
 * @param role The user role.
 */
function isInRoles(roles, role) {
  return roles.map((key) => key.toString()).includes(role);
}
