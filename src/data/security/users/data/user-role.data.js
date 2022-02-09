import { Result } from '../../../../../shared/models/data-result.model';
import userRoleModel from '../model/user-role.model';

/**
 * The user roles data-access service that includes the functionalities to read user roles.
 */
export class UserRolesDataAccess {
  /**
   * Gets all the user roles registered on the system.
   */
  static async getAll() {
    Result;
    try {
      Result.data = await userRoleModel.find().populate('users');
      Result.isNotFound = !Result.data;
    } catch (error) {
      Result.error = error;
    }
    return Result;
  }
}
