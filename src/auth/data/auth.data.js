import { Hash } from '../../../shared/util/hash.util';
import userModel from '../model/user.model';
import { Result } from '../../../shared/models/data-result.model';
import { AppErrorCode } from '../../../shared/models/app-error-code.model';
import { AppError } from '../../../shared/models/app-error.model';

/**
 * The auth data-access service that includes the functionalities to create and read a user .
 */
export default class AuthDataAccess {
  /**
   * Creates a new user based on the provided data-model.
   * @param data The data-model to create the new user.
   */
  static async createUser(data) {
    const result = Result;
    try {
      const [nameExist, emailExist] = await Promise.all([
        userModel.findOne({ name: data.name }),
        userModel.findOne({ email: data.email }),
      ]);

      /** Check if code is already exists in database. */
      if (nameExist) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: AppError.ValueExists,
            detail: `Name already exists`,
          },
        ];
        return result;
      } else if (emailExist) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'email',
            title: AppError.ValueExists,
            detail: `Email already exists`,
          },
        ];
        return result;
      }

      /**
       * Hash user's password.
       * Set user object.
       */
      const hashPassword = await Hash.hash(data.password);
      const user = {
        name: data.name,
        email: data.email,
        password: hashPassword,
      };

      /* create employee.reward and deduction */
      await userModel.create(user);

      return (result.data = user);
    } catch (error) {
      console.log(error);
      result.error = error;
    }
    return result;
  }
}
