const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
module.export = mongoose.model('User', userSchema);
