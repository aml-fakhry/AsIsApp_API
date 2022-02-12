import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { counter } from '../../../../../shared/util/counter.util.js';

const userSchema = Schema({
  id: { type: Number },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  userRoleId: { type: Schema.Types.ObjectId, ref: 'UserRole' },
});

counter('User', userSchema, 'createdAt');
export default model('User', userSchema);
