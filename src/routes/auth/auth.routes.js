import { Router } from 'express';
import { BadRequest, OK } from '../../../../shared/util/http-responses.util';
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
export const authRelativeRoute = 'auth/user';

/* Create new user route. */
authRouter.post('/signup', validation(userSchema), async (req, res, next) => {
  try {
    const result = await UserDataAccess.createUser(req.body);
    if (result) {
      OK(res, result);
    } else {
      BadRequest(res, result);
    }
  } catch (error) {
    Promise.reject(error);
    console.log(error);
  }
});

/* Create new user route. */
authRouter.get('/user-role', async (req, res, next) => {
  try {
    const result = await UserRolesDataAccess.getAll();
    if (result) {
      OK(res, result);
    } else {
      BadRequest(res, result);
    }
  } catch (error) {
    Promise.reject(error);
    console.log(error);
  }
});
