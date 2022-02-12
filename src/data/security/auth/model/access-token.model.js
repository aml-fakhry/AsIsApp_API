import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { counter } from '../../../../../shared/util/counter.util.js';

const accessTokenSchema = Schema({
  issuedAt: { type: Date },
  expiresAt: { type: Date },
  users: { type: Schema.Types.ObjectId, ref: 'User' },
});

counter('accessToken', accessTokenSchema, 'issuedAt');
export default model('accessToken', accessTokenSchema);
