/**
 * Interface for user model.
 */
declare interface IUserModel {

    /**
     * Log in user.
     * @param email Email of user.
     * @param password Password of user.
     * @returns Promise with user identity.
     */
    logInUser(email: string, password: string): Promise<IUserIdentity>

    /**
     * Get all users.
     * @param token Authentication token.
     * @returns Promise with list of users.
     */
    getUsers(token: string): Promise<IShortUser[]>

    /**
     * Get all online users.
     * @param token Authentication token.
     * @returns Promise with list of users.
     */
    getOnlineUsers(token: string): Promise<IShortUser[]>

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
     * @returns Promise with count of removed users.
     */
    removeUserById(userId: string, token: string): Promise<number>

    /**
     *
     * @param {string} email
     * @returns {Promise<IUnauthUser>}
     */
    getUnauthUserByEmail(email: string): Promise<IUnauthUser>

}