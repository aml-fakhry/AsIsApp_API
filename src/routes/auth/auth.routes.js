import { Router, express } from 'express';
import AuthDataAccess from '../../auth/data/auth.data';
import { validation } from '../../../shared/util/validation';
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
authRouter.post('/signup', async (req, res, next) => {
  try {
    // let result = await AuthDataAccess.createUser();
    res.send(req.body);
    console.log(req.body);

    validation(userSchema, req.body);
  } catch (error) {
    console.log(error);
  }
});
