import { ajv } from '../../app.js';
import { AppErrorCode } from '../models/app-error-code.model.js';
import { AppError } from '../models/app-error.model.js';

/**
 * set validation function to validate data body.
 * @param schema needed to compile
 * @returns Promise<void>
 */
export function validation(schema) {
  return async (req, res, next) => {
    try {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (valid) {
        // console.log('User data is valid');
        next();
      } else {
        console.log('User data is INVALID!');
        const validationErrors = validate.errors.map((e) => ({ param: e.instancePath, message: e.message }));
        let errors = [];
        for (let i = 0; i < validationErrors.length; i++) {
          const err = validationErrors[i];
          errors.push({
            code: AppErrorCode.IncorrectValue,
            title: AppError.IncorrectValue,
            source: err.param,
            detail: err.message,
          });
        }

        res.status(400).send({ errors });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
