/**
 * Interface for security model.
 */
declare interface ISecurityModel {

    /**
     * Authenticate user a get its identity.
     * @param email Email of user.
     * @param secret Security string like password.
     * @returns User's identity.
     */
    authenticate(email: string, secret: string): Promise<IUserIdentity>

    /**
     * Apply hash to text.
     * @param text Source text.
     * @returns Promise with hash.
     */
    hash(text: string): Promise<string>

    /**
     * Check if password is true password of user.
     * @param secret Currently compared secret string.
     * @param hashedSecret Hashed current secret string of user.
     * @returns Promise with password is valid.
     */
    isAuthenticated(secret, hashedSecret): Promise<boolean>

    /**
     * Sign any data and transform it to token.
     * @param payload Any data.
     * @returns Promise with token.
     */
    sign(payload: IObject<any>): Promise<string>

    /**
     * Get data from token.
     * @param token Token.
     * @returns Promise with data from token.
     * @returns Promise with error NOT_FOUND, if token doesn't exist.
     * @returns Promise with error INVALID, if token is invalid.
     */
    unsign(token: string): Promise<IObject<any>>

}