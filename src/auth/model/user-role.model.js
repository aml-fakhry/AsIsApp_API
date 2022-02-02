import { Schema, model } from 'mongoose';

const userRoleSchema = Schema({
  id: { type: Number },
  name: { type: String },
  key: { type: String },
});
export default model('UserRole', userRoleSchema);
