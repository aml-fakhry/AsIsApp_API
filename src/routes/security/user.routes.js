import { Router } from 'express';
import { OK, BadRequest } from '../../../shared/util/http-responses.util.js';
import { validation } from '../../../shared/util/validation.util.js';
import UserDataAccess from '../../data/security/users/data/user.data.js';
import { UserRolesDataAccess } from '../../data/security/users/data/user-role.data.js';
import { userSchema } from '../../data/security/users/validator/user.validator.js';
import { unAuthenticated } from '../../../shared/util/http-responses.util.js';
import { UserRoles } from '../../data/security/users/model/roles.model.js';
import { Authenticate, Authorize } from '../../../shared/middleware/auth.middleware.js';

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

/* Get user route. */
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

/* Get user route. */
userRouter.get('/:id', Authenticate, async (req, res, next) => {
  try {
    const result = await UserDataAccess.findById(req.params.id);
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
