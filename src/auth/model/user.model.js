import { Schema, model } from 'mongoose';
const userSchema = Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
module.export = model('User', userSchema);
