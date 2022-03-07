import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { counter } from '../../../../shared/util/counter.util.js';

const postSchema = Schema({
  username: { type: String, default: '' },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

counter('Post', postSchema, 'createdAt');
export default model('Post', postSchema);
