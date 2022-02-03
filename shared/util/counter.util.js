import { model } from 'mongoose';

/**
 * set counter function to auto increment order field.
 * @param name name of model in db.
 * @param schema schema model.
 */
export function counter(name, schema) {
  schema.pre('save', function (next) {
    var docs = this;
    model(name, schema)
      .findOne()
      .sort('-createdAt')
      .exec((error, counter) => {
        error ? next(error) : counter ? (docs.order = counter.order + 1) : (docs.order = 1);
        next();
      });
  });
}
