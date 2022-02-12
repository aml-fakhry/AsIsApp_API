import mongoose from 'mongoose';
const { model } = mongoose;
/**
 * set counter function to auto increment id field.
 * @param name name of model in db.
 * @param schema schema model.
 */
export function counter(name, schema, arg) {
  schema.pre('save', function (next) {
    var docs = this;
    model(name, schema)
      .findOne()
      .sort(`-${arg.replaceAll(`'`, ``)}`)
      .exec((error, counter) => {
        error ? next(error) : counter ? (docs.id = counter.id + 1) : (docs.id = 1);
        next();
      });
  }); //TODO @aml-fakhry
}
