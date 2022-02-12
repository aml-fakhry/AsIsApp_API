import { Result } from '../../../../../shared/models/data-result.model.js';
import userRoleModel from '../model/user-role.model.js';

/**
 * The user roles data-access service that includes the functionalities to read user roles.
 */
export class UserRolesDataAccess {
  /**
   * Gets all the user roles registered on the system.
   */
  static async getAll() {
    const result = Result;
    try {
      result.data = await userRoleModel.find().populate('users');
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
