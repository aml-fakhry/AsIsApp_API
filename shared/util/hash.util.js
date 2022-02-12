import bcrypt from 'bcrypt';
import { config } from '../../config/development.js';

/**
 * A helper that provides a set of hashing utility methods.
 */
export class Hash {
  /**
   * Generates and returns the hashed version of the given data.
   * @param data The data to be hashed.
   * @example const hashedPassword = await Hash.hash('123456');
   */
  static async hash(data) {
    const salt = await bcrypt.genSalt(config.HASHING_SALT_ROUNDS);
    return bcrypt.hash(data, salt);
  }

  /**
   * Determines if the given plain data and hashed data are the same.
   * @param plainData The plain data to be compared against the hashed version.
   * @param hashedData The hashed version to be compared against the plain data.
   * @example Hash.compare('my plain string', 'my hashed string');
   *
   */
  static async compare(plainData, hashedData) {
    return bcrypt.compare(plainData, hashedData);
  }
}
