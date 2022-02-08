import { Router } from 'express';
import { OK, BadRequest, InternalServerError } from '../../../../shared/util/http-responses.util';
import { validation } from '../../../../shared/util/validation.util';
import UserDataAccess from '../../../security/users/data/user.data';
import { UserRolesDataAccess } from '../../../security/users/data/user-role.data';
import { userSchema } from '../../../security/users/validator/user.validator';
import { unAuthenticated } from '../../../../shared/util/http-responses.util';
import { UserRoles } from '../../../security/users/model/roles.model';
import { Authorize } from '../../../../shared/middleware/auth.middleware';

/**
 * The user router that holds all module routes.
 */
export const userRouter = Router();

/**
 * The relative route for the auth.
 *
 * No leading or trailing slashes required.
 */
export const userRelativeRoute = 'security/user';

/* Create new user route. */
userRouter.post('/signup', validation(userSchema), async (req, res, next) => {
  try {
    const result = await UserDataAccess.createUser(req.body);
    if (Object.keys(result.error).length) {
      next(result.error);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Create new user route. */
userRouter.get('/user-role', Authorize(UserRoles.SYSTEM_ADMIN, UserRoles.AUDITOR), async (req, res, next) => {
  try {
    const result = await UserRolesDataAccess.getAll();

    if (Object.keys(result.error).length) {
      next(result.error);
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});
