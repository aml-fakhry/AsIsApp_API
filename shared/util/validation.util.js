import { ajv } from '../../app';

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
        res.status(400).send(validate.errors.map((e) => ({ param: e.instancePath, message: e.message })));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
