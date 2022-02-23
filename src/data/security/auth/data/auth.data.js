import { Result } from '../../../../../shared/models/data-result.model.js';
import { AppErrorCode } from '../../../../../shared/models/app-error-code.model.js';
import { AppError } from '../../../../../shared/models/app-error.model.js';
import accessTokenModel from '../model/access-token.model.js';
import userModel from '../../users/model/user.model.js';

/**
 * The auth data-access service that includes the functionalities to create and read a user .
 */
export default class AuthDataAccess {
  /**
   * Creates a new access token based on the provided data-model.
   * @param data The data-model to create the new access token.
   */
  static async createAccessToken(data) {
    const result = Result;

    try {
      //#region validate data-model

      /** The user that the access token will belong to. */
      const user = await userModel.findById(data.userId);

      /* Make sure that user is exists in the database. */
      if (!user) {
        result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'userId',
            title: AppError.RelatedEntityNotFound,
            detail: `User not exist`,
          },
        ];
        return result;
      }
      //#endregion

      const accessToken = await accessTokenModel.create({
        issuedAt: data.issuedAt,
        expiresAt: data.expiresAt,
        userId: data.userId,
      });

      result.data = (await this.findAccessTokenById(accessToken._id)).data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Finds the access token with the given id.
   * @param id The id of the access token.
   */
  static async findAccessTokenById(id) {
    const result = Result;

    try {
      result.data = await accessTokenModel.findById(id);
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
