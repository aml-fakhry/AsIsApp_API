import { Router } from 'express';
import { OK, BadRequest } from '../../../../shared/util/http-responses.util';
import { JWT } from '../../../../shared/util/jwt.util';
import UserDataAccess from '../../../security/users/data/user.data';
import AuthDataAccess from '../../../security/auth/data/auth.data';
import { v4 as uuid } from 'uuid';
import { AppErrorCode } from '../../../../shared/models/app-error-code.model';
import { AppError } from '../../../../shared/models/app-error.model';

/**
 * The auth router that holds all module routes.
 */
export const authRouter = Router();

/**
 * The relative route for the auth.
 *
 * No leading or trailing slashes required.
 */
export const authRelativeRoute = 'security/auth';

/* Login user by username and password route. */
authRouter.post('/login', async (req, res, next) => {
  try {
    const userResult = await UserDataAccess.findByCredentials(req.body.username, req.body.password);

    if (userResult.isNotFound) {
      return BadRequest(res, {
        code: AppErrorCode.Forbidden,
        source: 'username',
        title: AppError.Forbidden,
        detail: 'Invalid login',
      });
    }
    const jwt = await JWT.genToken(uuid(), userResult.data?._id ?? 0, userResult.data?.userRoleId ?? 0);
    const jwtData = await JWT.verifyAndDecode(jwt, true);

    const accessTokenResult = await AuthDataAccess.createAccessToken({
      userId: userResult.data?._id ?? 0,
      issuedAt: new Date((jwtData?.iat ?? 0) * 1000),
      expiresAt: new Date((jwtData?.exp ?? 0) * 1000),
    });

    if (accessTokenResult.validationErrors && accessTokenResult.validationErrors.length) {
      BadRequest(res, { errors: accessTokenResult.validationErrors });
    } else if (accessTokenResult.data) {
      OK(res, {
        data: {
          user: userResult.data,
          jwt: {
            token: jwt,
            issuedAt: accessTokenResult.data.issuedAt,
            expiresAt: accessTokenResult.data.expiresAt,
          },
        },
      });
    }
  } catch (error) {
    next(error);
  }
});
