/**
 * The application-specific error codes.
 */
export const AppErrorCode = {
  /** Un-authenticated code. */
  UnAuthenticated: 1,

  /** Access denied or forbidden code. */
  Forbidden: 2,

  /** Internal server code. */
  InternalServerError: 3,

  /** The field is required code. */
  IsRequired: 4,

  /** The field type is invalid. */
  InvalidType: 5,

  /** The field type is String and its length is invalid. */
  InvalidLength: 6,

  /** The entity field value already exists in another entity. */
  ValueExists: 7,

  /** The entity can't be deleted due to its existing relations with other entities. */
  CantBeDeleted: 8,

  /**
   * The related entity isn't found,
   * @summary e.g. you are trying to create a new product in a category which is not exists in the database.
   */
  RelatedEntityNotFound: 9,

  /** The value is not correct or doesn't meets the expected value criteria. */
  IncorrectValue: 10,

  /** The value can't be changed due to system criteria. */
  CantBeChanged: 11,
};
