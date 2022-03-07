import { validation } from '../../../shared/util/validation.util.js';
import postDataAccess from '../../data/post/data/post.data.js';
import { postSchema } from '../../data/post/validators/post.validator.js';
import { Authorize } from '../../../shared/middleware/auth.middleware.js';
import { OK, BadRequest, unAuthenticated } from '../../../shared/util/http-responses.util.js';
import { UserRoles } from '../../data/security/users/model/roles.model.js';
import { Router } from 'express';

/*  The post router that holds all module routes. */
export const postRouter = Router();

/**
 * The relative route for the auth.
 *
 * No leading or trailing slashes required.
 */
export const postRelativeRoute = 'post';

postRouter.post('', Authorize(UserRoles.SYSTEM_ADMIN), validation(postSchema), async (req, res, next) => {
  try {
    const result = await postDataAccess.create(req.body, req.user.userId);
    console.log({ result });
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

/* Get post route. */
postRouter.get('/:id', Authorize(UserRoles.SYSTEM_ADMIN, UserRoles.AUDITOR), async (req, res, next) => {
  try {
    const result = await postDataAccess.findById(req.params.id);
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
