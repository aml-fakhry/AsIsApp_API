import { Schema, model } from 'mongoose';
import { counter } from '../../../shared/util/counter.util';
const userSchema = Schema({
  order: { type: Number },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  userRoleId: { type: Schema.Types.ObjectId, ref: 'UserRole' },
});

counter('User', userSchema);
export default model('User', userSchema);
