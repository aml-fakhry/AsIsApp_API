import { Router } from 'express';
import { OK, BadRequest } from '../../../../shared/util/http-responses.util';
import { validation } from '../../../../shared/util/validation.util';
import UserDataAccess from '../../../security/users/data/user.data';
import { UserRolesDataAccess } from '../../../security/users/data/user-role.data';
import { userSchema } from '../../../security/users/validator/user.validator';

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
userRouter.get('/user-role', async (req, res, next) => {
  try {
    const result = await UserRolesDataAccess.getAll();
    console.log(result);
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
