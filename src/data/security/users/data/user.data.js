import { Result } from '../../../../../shared/models/data-result.model.js';
import { AppErrorCode } from '../../../../../shared/models/app-error-code.model.js';
import { AppError } from '../../../../../shared/models/app-error.model.js';
import userRoleModel from '../model/user-role.model.js';
import { Hash } from '../../../../../shared/util/hash.util.js';
import { UserRoles } from '../model/roles.model.js';
import userModel from '../model/user.model.js';

/**
 * The user data-access service that includes the functionalities to create and read a user .
 */
export default class UserDataAccess {
  /**
   * Creates a new user based on the provided data-model.
   * @param data The data-model to create the new user.
   */
  static async createUser(data) {
    const result = new Result();
    try {
      /* Make sure that userRole is exists in the database. */
      const [nameExist, emailExist, /* userRole */ auditorRole] = await Promise.all([
        userModel.findOne({ username: data.username }),
        userModel.findOne({ email: data.email }),
        /* userRoleModel.findById(data.userRoleId), */
        userRoleModel.findOne({ key: UserRoles.AUDITOR }),
      ]);

      /** Check if code is already exists in database. */
      if (nameExist) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'username',
            title: AppError.ValueExists,
            detail: `User name already exists`,
          },
        ];
        return result;
      } else if (emailExist) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'email',
            title: AppError.ValueExists,
            detail: `Email ${emailExist.email} already exists`,
          },
        ];
        return result;
      } /* else if (!userRole) {
        result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'userRoleId',
            title: AppError.RelatedEntityNotFound,
            detail: `User role not exist`,
          },
        ];
        return result;
      } */

      /**
       * Hash user's password.
       * Set user object.
       */
      const hashPassword = await Hash.hash(data.password);

      /* create employee.reward and deduction */
      const user = await userModel.create({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: hashPassword,
        gender: data.gender,
        userRoleId: auditorRole._id /* data.userRoleId ?? */,
      });

      result.data = (await this.findById(user._id)).data;
    } catch (error) {
      result.error = error;
      console.log({ error });
    }
    return result;
  }

  /**
   * Finds the user with the given id.
   * @param userId The id in user.
   */
  static async findById(userId) {
    const result = new Result();
    try {
      result.data = await userModel.findById(userId).populate('userRoleId');
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the user with the given `username` and `password`.
   * @param username The username of the user.
   * @param password The password of the user.
   */
  static async findByCredentials(username, password) {
    const result = new Result();

    try {
      const user = await userModel.findOne({ username: username });

      /**
       * Check user existence, password validity & allowance to log in the system.
       */
      if (!user || !(await Hash.compare(password, user.password))) {
        result.isNotFound = true;
        return result;
      } else if (!user?.isActive) {
        return (result.validationErrors = [
          {
            code: AppErrorCode.Forbidden,
            source: 'userId',
            title: AppError.Forbidden,
            detail: `SECURITY.USER.USER_IS_BLOCKED`,
          },
        ]);
      }

      result.data = (await this.findById(user._id)).data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
