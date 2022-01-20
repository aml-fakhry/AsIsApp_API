export const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email',
      maxLength: 50,
      minimum: 1,
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'password must be an string', // Your Custom Error Message
        format: 'formate ',
        minimum: 'password length should be a number not less than or equal to 1, current value is ${/size} ',
        maxLength: 'password length should be a number bigger than or equal to 50, current value is ${/size}',
      },
    },
    password: {
      type: 'integer',
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'password must be an Integer', // Your Custom Error Message
      },
    },
  },
  required: [],
  additionalProperties: false,
};
