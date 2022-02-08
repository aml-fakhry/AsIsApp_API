declare namespace Express {
  export interface Request {
    /**
     * Gets or sets the user that owns the current http request.
     */
    user: {
      /**
       * Gets or sets the id of the user.
       */
      userId: number;

      /**
       * Gets or sets the id of the user's json web token.
       */
      jwtId: string;
    };
  }

  export interface Response {
    /**
     * Gets or sets the user that owns the current http request.
     */
    user: {
      /**
       * Gets or sets the id of the user.
       */
      userId: number;
    };
  }
}
