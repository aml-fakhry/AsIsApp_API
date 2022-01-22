import { Schema, model } from 'mongoose';
const userSchema = Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
export default model('User', userSchema);
