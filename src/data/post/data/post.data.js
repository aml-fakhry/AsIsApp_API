import { Result } from '../../../../shared/models/data-result.model.js';
import postModel from '../model/post.model.js';
import { AppError } from '../../../../shared/models/app-error.model.js';
import { AppErrorCode } from '../../../../shared/models/app-error-code.model.js';
import UserDataAccess from './../../security/users/data/user.data.js';
import userModel from '../../security/users/model/user.model.js';

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

      /**
       * Create post.
       * update and push new post to user posts.
       */
      const post = await postModel.create({
        username: user.username,
        content: data.content,
        // $push: {
        //   posts: { postId: post._id, post: post.content, createdAt: post.createdAt },
        // },
        userId,
      });

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
      result.data = await postModel.findById(postId).populate('userId', '-password -email').sort({ createdAt: -1 });
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Find all posts.
   * @param userId logged in user id.
   */
  static async getAllPosts(userId) {
    const result = new Result();

    try {
      /**
       * Gets logged in user.
       */
      const user = (await UserDataAccess.findById(userId)).data;
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

      result.data = await postModel.find().populate('userId', '-password -email').sort({ createdAt: -1 });
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Find all user posts.
   * @param userId logged in user id.
   */
  static async getAllUserPosts(userId) {
    const result = new Result();

    try {
      /**
       * Gets logged in user.
       */
      const user = (await UserDataAccess.findById(userId)).data;
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

      result.data = await postModel
        .find({ userId: userId })
        .populate('userId', '-password -email')
        .sort({ createdAt: -1 });
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Add like to posts functionality.
   *  @param postId the post id.
   *  @param userId logged in user id.
   */

  static async addLike(postId, userId) {
    const result = new Result();
    try {
      /**
       * Get logged in user data.
       */
      const user = (await UserDataAccess.findById(userId)).data;

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

      //#region validation

      /**
       * Get  liked post.
       */
      const post = (await this.findById(postId)).data;

      if (!post._id) {
        result.validationErrors = [
          {
            code: AppErrorCode.IncorrectValue,
            source: 'post',
            title: AppError.IncorrectValue,
            detail: `post not found.`,
          },
        ];
        return result;
      } else if (post.likes.find((like) => like.userId == userId)) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'post.*.likes',
            title: AppError.ValueExists,
            detail: `user already liked this post before.`,
          },
        ];
        return result;
      }

      //#endregion

      /**
       * Update total likes in posts.
       */
      const updatedPost = await postModel.findOneAndUpdate(
        {
          _id: postId,
          // 'likes.username': { $ne: post.likes.username },
        },
        {
          $inc: { totalLikes: 1 },
          $push: {
            likes: { username: user.username, userId: userId },
          },
        },

        { new: true }
      );

      console.log({ updatedPost });

      result.data = updatedPost;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
