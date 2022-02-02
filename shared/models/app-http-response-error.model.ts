/**
 * Represents an app http error that should be sent within a failed request's response.
 *
 * @summary All error members are optional but the more details the server sends back to the client the more easy it becomes to fix the error.
 */
// export const AppHttpResponseError = {
//   /**
//    * Gets or sets the application-specific code for this error.
//    */
//   code: '',

//   /**
//    * Gets or sets the name of the source that causes this error.
//    *
//    * Usually it's the name of the property that causes the error.
//    *
//    * The property maybe a nested property,
//    * in this case use e.g. if we are validating a `Person` object use `address.postalCode` instead of `postalCode`.
//    */
//   source: '',

//   /**
//    * Gets or sets a generic title of the problem.
//    */
//   title: '',

//   /**
//    * Gets or sets a more descriptive details for the problem, unlike the generic @field title.
//    */
//   detail: '',
// };
export class AppHttpResponseError {
  /**
   * Gets or sets the application-specific code for this error.
   */
  static code: string;

  /**
   * Gets or sets the name of the source that causes this error.
   *
   * Usually it's the name of the property that causes the error.
   *
   * The property maybe a nested property,
   * in this case use e.g. if we are validating a `Person` object use `address.postalCode` instead of `postalCode`.
   */
  static source: string;

  /**
   * Gets or sets a generic title of the problem.
   */
  static title: string;

  /**
   * Gets or sets a more descriptive details for the problem, unlike the generic @field title.
   */
  static detail: string;
}
