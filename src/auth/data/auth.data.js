import { Hash } from '../../../shared/util/hash.util';
import userModel from '../model/user.model';

/**
 * The auth data-access service that includes the functionalities to create and read a user .
 */
export default class AuthDataAccess {
  /**
   * Creates a new user based on the provided data-model.
   * @param data The data-model to create the new asset.
   * @param userId the id of the logged user
   */
  static async createUser(data) {
    let result;
    try {
      const hashPassword = await Hash.hash(data.password);
      const user = {
        name: data.name,
        email: data.email,
        password: hashPassword,
      };
      await userModel.create(user);
      return (result = user);
    } catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
}
