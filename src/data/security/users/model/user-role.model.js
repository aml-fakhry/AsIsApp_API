import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userRoleSchema = Schema({
  id: { type: Number },
  name: { type: String },
  key: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
export default model('UserRole', userRoleSchema);
