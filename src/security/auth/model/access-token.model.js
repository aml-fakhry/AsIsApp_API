import { Schema, model } from 'mongoose';
import { counter } from '../../../shared/util/counter.util';

const accessTokenSchema = Schema({
  id: { type: Number },
  issuedAt: { type: Date },
  expiresAt: { type: Date },
  users: { type: Schema.Types.ObjectId, ref: 'User' },
});

counter('accessToken', accessTokenSchema, 'issuedAt');
export default model('accessToken', accessTokenSchema);
