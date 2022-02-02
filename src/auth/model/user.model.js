import { Schema, model } from 'mongoose';
const userSchema = Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  userRoleId: { type: Schema.Types.ObjectId, ref: 'UserRole' },
});
export default model('User', userSchema);
