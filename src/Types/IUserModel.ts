/**
 * Interface for user model.
 */
declare interface IUserModel {

    /**
     * Log in user.
     * @param email Email of user.
     * @param password Password of user.
     * @returns Promise with user identity.
     * @returns Promise with 500 code (internal server error), if there is error in DB.
     * @returns Promise with 404 code (not found), if there is no user with the email.
     * @returns Promise with 401 code (unauthorized), if password is incorrect.
     */
    logInUser(email: string, password: string): Promise<IUserIdentity>

    /**
     * Get all users.
     * @param token Authentication token.
     * @returns Promise with list of users.
     */
    getUsers(token: string): Promise<IBaseUser[]>

    /**
     * Get all online users.
     * @param token Authentication token.
     * @returns Promise with list of users.
     */
    getOnlineUsers(token: string): Promise<IBaseUser[]>

    /**
     * Get user by his ID.
     * @param {string} userId User's ID.
     * @param token Authentication token.
     * @returns Promise with user.
     */
    getUserById(userId: string, token: string): Promise<IUser>

    /**
     * Register user.
     * @param user New user.
     * @param token Authentication token.
     * @return Empty promise.
     * @returns Promise with 500 code (internal server error), if there is error in DB.
     */
    addUser(user: IUser, token: string): Promise<void>

    /**
     * Update user.
     * @param user New user.
     * @param token Authentication token.
     * @returns Empty promise.
     */
    updateUser(user: IUser, token: string): Promise<void>

    /**
     * Remove user by his ID.
     * @param userId User's ID
     * @param token Authentication token.
     * @returns Promise with removed user.
     */
    removeUserById(userId: string, token: string): Promise<IUser>

    /**
     * Get unauth user by email.
     * @param email Email of user.
     * @returns Promise with unauth user, if user exists.
     * @returns Promise with null, if user is not exists.
     * @returns Promise with 406 code (not accepted), if email is not in RegExp for email.
     * @returns Promise with 500 code (internal server error), if there is error in DB.
     */
    getUnauthUserByEmail(email: string): Promise<IBaseUser>

}