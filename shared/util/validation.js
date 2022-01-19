import Ajv from 'ajv';

export function validation(schema, data) {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (valid) {
    console.log('User data is valid');
  } else {
    console.log('User data is INVALID!');
    console.log(validate.errors);
  }
}
