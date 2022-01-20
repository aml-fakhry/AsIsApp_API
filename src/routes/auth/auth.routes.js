import { Router, express } from 'express';
import { OK } from '../../../shared/util/http-responses.util';
import { validation } from '../../../shared/util/validation.util';
import { userSchema } from '../../auth/validators/user.validator';

/**
 * The assets router that holds all module routes.
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
    OK(res, req.body);
    console.log('User data is valid', req.body);
  } catch (error) {
    console.log(error);
  }
});
