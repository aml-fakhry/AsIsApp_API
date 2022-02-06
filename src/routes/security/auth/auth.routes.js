import { Router } from 'express';
import { OK, BadRequest } from '../../../../shared/util/http-responses.util';
import { validation } from '../../../../shared/util/validation.util';
import UserDataAccess from '../../../security/users/data/user.data';
import { UserRolesDataAccess } from '../../../security/users/data/user-role.data';
import { userSchema } from '../../../security/users/validator/user.validator';

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
   

    const userResult = await UsersDataAccess.findByCredentials(req.body.username, req.body.password);

    if (userResult.error) {
      return next(userResult.error);
    } else if (userResult.isNotFound) {
      return BadRequest(res, {
        errors: localizeValidationErrors(req, {
          code: AppErrorCode.Forbidden,
          source: 'username',
          title: AppError.Forbidden,
          detail: 'SECURITY.AUTH.INVALID_LOGIN',
        }),
      });
    } else if (userResult.validationErrors && userResult.validationErrors.length) {
      BadRequest(res, { errors: localizeValidationErrors(req, ...userResult.validationErrors) });
    }

    const claims = userResult.data?.userClaims?.map((claim) => claim.claim?.key ?? '') ?? [];
    const jwt = await JWT.genAuthToken(uuid(), userResult.data?.id ?? 0, claims, userResult.data?.organizationId);
    const jwtData = await JWT.verifyAndDecode(jwt, true);

    const accessTokenResult = await AuthDataAccess.createAccessToken({
      id: jwtData?.id ?? '',
      userId: userResult.data?.id ?? 0,
      issuedAt: new Date((jwtData?.iat ?? 0) * 1000),
      expiresAt: new Date((jwtData?.exp ?? 0) * 1000),
    });

    if (accessTokenResult.error) {
      next(accessTokenResult.error);
    } else if (accessTokenResult.validationErrors && accessTokenResult.validationErrors.length) {
      BadRequest(res, { errors: accessTokenResult.validationErrors });
    } else if (accessTokenResult.data) {
      Ok(res, {
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

/* Refresh json web token route. */
authRouter.post('/refresh-jwt', AuthenticateWithTolerance, async (req, res, next) => {
  try {
    const userResult = await UsersDataAccess.findById(req.user.userId);

    if (userResult.error) {
      return next(userResult.error);
    } else if (userResult.isNotFound) {
      return BadRequest(res, {
        errors: localizeValidationErrors(req, {
          code: AppErrorCode.Forbidden,
          source: 'userId',
          title: AppError.Forbidden,
          detail: 'SECURITY.AUTH.USER_NOT_EXISTS',
        }),
      });
    } else if (!userResult.data?.isActive) {
      return BadRequest(res, {
        errors: localizeValidationErrors(req, {
          code: AppErrorCode.Forbidden,
          source: 'userId',
          title: AppError.Forbidden,
          detail: 'SECURITY.AUTH.USER_IS_BLOCKED',
        }),
      });
    }

    const claims = userResult.data?.userClaims?.map((claim) => claim.claim?.key ?? '') ?? [];
    const jwt = await JWT.genAuthToken(uuid(), req.user.userId, claims, userResult.data?.organizationId);
    const jwtData = await JWT.verifyAndDecode(jwt, true);

    const accessTokenResult = await AuthDataAccess.refreshAccessToken({
      oldAccessTokenId: req.user.jwtId,
      newAccessTokenId: jwtData?.id ?? '',
      userId: userResult.data?.id ?? 0,
      issuedAt: new Date((jwtData?.iat ?? 0) * 1000),
      expiresAt: new Date((jwtData?.exp ?? 0) * 1000),
    });

    if (accessTokenResult.error) {
      next(accessTokenResult.error);
    } else if (accessTokenResult.validationErrors && accessTokenResult.validationErrors.length) {
      BadRequest(res, { errors: accessTokenResult.validationErrors });
    } else if (accessTokenResult.isNotFound) {
      return UnAuthenticated(res);
    } else if (accessTokenResult.data) {
      Ok(res, {
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
