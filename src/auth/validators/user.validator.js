export const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', format: 'email' },
    password: { type: 'integer' },
  },
  required: [],
  additionalProperties: false,
};
