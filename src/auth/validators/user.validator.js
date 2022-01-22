export const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 50,
      minimum: 1,
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'Name must be an string', // Your Custom Error Message
        minimum: 'Name length should be a number not less than or equal to 1, current value is ${/size} ',
        maxLength: 'Name length should be a number bigger than or equal to 50, current value is ${/size}',
      },
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 100,
      minimum: 5,
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'password must be an string', // Your Custom Error Message
        format: 'must be with email format.',
        minimum: 'password length should be a number not less than or equal to 1, current value is ${/size} ',
        maxLength: 'password length should be a number bigger than or equal to 50, current value is ${/size}',
      },
    },
    password: {
      type: 'string',
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'password must be an string', // Your Custom Error Message
      },
    },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};
