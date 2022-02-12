/**
 * Represents a data-access layer operation result.
 *
 * e.g. for create, search, find-by-id, update and delete operations.
 */
export class Result {
  /**
   * Gets or sets the data resulting from the operation.
   *
   * This property will has a value only if the operation was succeeded.
   */
  data = {};

  /**
   * Gets or sets the validation errors that preventing the operation from being proceeded.
   *
   * This property wont has value if the operation was succeeded.
   */
  validationErrors = [];

  /**
   * Indicates whether the entity requested by the user is not exist.
   *
   * This property is mandatory in query-single-entity e.g. `findById` methods,
   * if the entity not exists the `isNotFound` property should be set to `true`.
   */
  isNotFound = '';

  /**
   * Gets or sets an exception that may occurs during the processing of the operation.
   *
   * This property wont has value if the operation was succeeded.
   */
  error = {};
}
