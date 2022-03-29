import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { counter } from '../../../../shared/util/counter.util.js';

const postSchema = Schema({
  username: { type: String, default: '' },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  comments: [
    {
      username: { type: String, default: '' },
      content: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  likes: [
    {
      username: { type: String, default: '' },
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  totalLikes: { type: Number, default: 0 },
  // posts: [
  //   {
  //     postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  //     createdAt: { type: Date, default: Date.now },
  //     post: { type: String },
  //   },
  // ],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

counter('Post', postSchema, 'createdAt');
export default model('Post', postSchema);
