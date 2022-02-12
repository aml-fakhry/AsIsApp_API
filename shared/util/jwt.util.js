import jsonwebtoken from 'jsonwebtoken';
import { config } from '../../config/development.js';

/**
 * A helper that provides a set of json web token utility methods.
 */
export class JWT {
  /**
   * Generates and returns a signed json web token based on the provided data.
   * @param id The id of the access token.
   * @param userId The id of the user that owns the access token.
   * @param roleId The id of the user role that owns the access token.
   */
  static async genToken(id, userId, roleId) {
    const options = {
      expiresIn: config.JWT_LIFE_TIME,
    };

    const payload = {
      id,
      userId,
      roleId,
    };

    return jsonwebtoken.sign(payload, config.JWT_PRIVATE_KEY, options);
  }

  /**
   * Verifies then Decodes and returns the given token if it was valid otherwise returns `null`.
   * @param token The json web token to be decoded.
   * @param ignoreExpiration if `true` do not validate the expiration of the token, default to `false` and the expiration will be validated.
   */
  static async verifyAndDecode(token, ignoreExpiration = false) {
    try {
      return jsonwebtoken.verify(token, config.JWT_PRIVATE_KEY, { ignoreExpiration });
    } catch (error) {
      return null;
    }
  }
}
