import { Schema, model } from 'mongoose';
const userSchema = Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  userRoleId: { type: Schema.Types.ObjectId, ref: 'UserRole' },
});
export default model('User', userSchema);
