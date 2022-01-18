import { Router, express } from 'express';
import AuthDataAccess from '../../auth/data/auth.data';

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
    let result = await AuthDataAccess.createUser(req.body);
    res.send(result);
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});
