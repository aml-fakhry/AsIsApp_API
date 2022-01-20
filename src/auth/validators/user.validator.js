export const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email',
      errorMessage: 'name is required',
    },
    password: { type: 'integer' },
  },
  required: [],
  additionalProperties: false,
};
