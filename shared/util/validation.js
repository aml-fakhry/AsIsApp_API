import { ajv } from '../../app';
/**
 * set validation function to validate data body.
 * @param schema needed to compile
 * @returns
 */
export function validation(schema) {
  return async (req, res, next) => {
    try {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (valid) {
        console.log('User data is valid');
        next();
      } else {
        console.log('User data is INVALID!');
        console.log(validate.errors);
        res.status(404).send(validate.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
