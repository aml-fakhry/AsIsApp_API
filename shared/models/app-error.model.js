/**
 * The application-specific errors.
 */
export const AppError = {
  /** Un-authenticated error. */
  UnAuthenticated: 'User is not authenticated',

  /** Access denied or forbidden error. */
  Forbidden: 'Access denied or forbidden',

  /** Internal server error. */
  InternalServerError: 'Internal server error',

  /** The field is required error. */
  IsRequired: 'The field is required',

  /** The field type is invalid. */
  InvalidType: 'The field type is invalid',

  /** The field type is String and its length is invalid. */
  InvalidLength: 'The field type is String and its length is invalid',

  /** The entity field value already exists in another entity. */
  ValueExists: 'The entity field value already exists in another entity',

  /** The entity can't be deleted due to its existing relations with other entities. */
  CantBeDeleted: `The entity can't be deleted due to its existing relations with other entities`,

  /**
   * The related entity isn't found,
   * @summary e.g. you are trying to create a new product in a category which is not exists in the database.
   */
  RelatedEntityNotFound: `The related entity isn't found, e.g. you are trying to create a new product in a category which is not exists in the database`,

  /** The value is not correct or doesn't meets the expected value criteria. */
  IncorrectValue: `The value is not correct or doesn't meets the expected value criteria`,

  /** The value can't be changed due to system criteria. */
  CantBeChanged: `The value can't be changed due to system criteria`,
};
