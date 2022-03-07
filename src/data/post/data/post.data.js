import { Result } from '../../../../shared/models/data-result.model.js';
import postModel from '../model/post.model.js';
import { AppError } from '../../../../shared/models/app-error.model.js';
import { AppErrorCode } from '../../../../shared/models/app-error-code.model.js';
import UserDataAccess from './../../security/users/data/user.data.js';

/**
 * The post data-access service that includes the functionalities to create and read a post .
 */
export default class postDataAccess {
  /**
   * Creates a new post based on the provided data-model.
   * @param data The data-model to create the new post.
   */
  static async create(data, userId) {
    const result = new Result();
    try {
      const user = (await UserDataAccess.findById(userId)).data;
      console.log({ userId });
      console.log({ user });
      if (!user?.isActive) {
        result.validationErrors = [
          {
            code: AppErrorCode.Forbidden,
            source: 'user',
            title: AppError.Forbidden,
            detail: `User is blocked`,
          },
        ];
        return result;
      }

      const post = await postModel.create({
        username: data.username,
        content: data.content,
        userId,
      });
      console.log({ post });
      result.data = (await this.findById(post._id)).data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the post with the given id.
   * @param postId The id in post.
   */
  static async findById(postId) {
    const result = new Result();

    try {
      result.data = await postModel.findById(postId).populate('userId');
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
