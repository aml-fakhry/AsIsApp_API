export const postSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      maxLength: 50,
      minLength: 2,
      /*   pattern: '^[A-Z][a-zA-Z]+$', */
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'User name must be an string', // Your Custom Error Message
        minLength: 'User name length should be a number not less than or equal to 1, current value is ${/size} ',
        maxLength: 'User name length should be a number bigger than or equal to 50, current value is ${/size}',
        /*      pattern: 'User name cant match pattern', */
      },
    },
    content: {
      type: 'string',
      minLength: 2,
      /*   pattern: '^[A-Z][a-zA-Z]+$', */
      errorMessage: {
        // In here must be errorMessage not errorMessages
        type: 'User ame must be an string', // Your Custom Error Message
        minLength: 'User name length should be a number not less than or equal to 1, current value is ${/size} ',
        /*      pattern: 'User name cant match pattern', */
      },
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
    userId: {
      type: 'string',
      errorMessage: {
        type: 'User id must be a string', // Custom Error Message
      },
    },
  },
  required: ['username', 'content'],
  additionalProperties: false,
};