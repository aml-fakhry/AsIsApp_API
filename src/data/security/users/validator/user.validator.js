export const userSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      maxLength: 50,
      minLength: 2,
      /*   pattern: '^[A-Z][a-zA-Z]+$', */
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'User ame must be an string', // Your Custom Error Message
        minLength: 'User name length should be a number not less than or equal to 1, current value is ${/size} ',
        maxLength: 'User name length should be a number bigger than or equal to 50, current value is ${/size}',
        /*      pattern: 'User name cant match pattern', */
      },
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 100,
      minLength: 6,
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'Email must be a string', // Your Custom Error Message
        format: 'must be with email format.',
        minLength: 'Email length should be a number not less than or equal to 1, current value is ${/size} ',
        maxLength: 'Email length should be a number bigger than or equal to 50, current value is ${/size}',
      },
    },
    phone: { type: 'string', pattern: '^[0-9()\\-\\.\\s]+$' },
    password: {
      type: 'string',
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'password must be an string', // Your Custom Error Message
      },
    },
    gender: {
      enum: ['female', 'male'],
      errorMessage: {
        type: 'gender must be a string', // Your Custom Error Message
      },
    },
    userRoleId: {
      type: 'string',
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'User role id must be a string', // Your Custom Error Message
      },
    },
  },
  required: ['username', 'email', 'password'],
  additionalProperties: false,
};
