import { Schema, model } from 'mongoose';
const userSchema = Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});
export default model('User', userSchema);
