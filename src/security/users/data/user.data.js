import userModel from '../model/user.model';
import { Result } from '../../../../shared/models/data-result.model';
import { AppErrorCode } from '../../../../shared/models/app-error-code.model';
import { AppError } from '../../../../shared/models/app-error.model';
import userRoleModel from '../model/user-role.model';
import { Hash } from '../../../../shared/util/hash.util';

/**
 * The user data-access service that includes the functionalities to create and read a user .
 */
export default class UserDataAccess {
  /**
   * Creates a new user based on the provided data-model.
   * @param data The data-model to create the new user.
   */
  static async createUser(data) {
    const result = Result;
    try {
      /* Make sure that userRole is exists in the database. */
      const [nameExist, emailExist, userRole] = await Promise.all([
        userModel.findOne({ name: data.name }),
        userModel.findOne({ email: data.email }),
        userRoleModel.findById(data.userRoleId),
      ]);

      /** Check if code is already exists in database. */
      if (nameExist) {
        return (result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: AppError.ValueExists,
            detail: `Name already exists`,
          },
        ]);
      } else if (emailExist) {
        return (result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'email',
            title: AppError.ValueExists,
            detail: `Email already exists`,
          },
        ]);
      } else if (!userRole) {
        return (result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'userRoleId',
            title: AppError.RelatedEntityNotFound,
            detail: `User role not exist`,
          },
        ]);
      }

      /**
       * Hash user's password.
       * Set user object.
       */
      const hashPassword = await Hash.hash(data.password);

      /* create employee.reward and deduction */
      const user = await userModel.create({
        name: data.name,
        email: data.email,
        password: hashPassword,
        userRoleId: data.userRoleId,
      });

      return (result.data = (await this.findById(user._id)).data);
    } catch (error) {
      console.log(error);
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the user with the given id.
   * @param userId The id in user.
   */
  static async findById(userId) {
    const result = Result;

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
    const result = Result;

    try {
      const user = await Database.Users.findOne({ where: { username: username.toString() } });

      /**
       * Check user existence, password validity & allowance to log in the system.
       */
      if (!user || !(await Hash.compare(password, user.password)) || user.isSystemUser === true) {
        result.isNotFound = true;
        return result;
      } else if (!user?.isActive) {
        result.validationErrors = [
          {
            code: AppErrorCode.Forbidden,
            source: 'userId',
            title: AppError.Forbidden,
            detail: `SECURITY.USER.USER_IS_BLOCKED`,
          },
        ];
        return result;
      }

      result.data = (await this.findById(user.id)).data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
