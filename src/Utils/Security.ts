import * as Bcrypt from 'bcrypt'
import * as JWT from 'jsonwebtoken'

import { Config } from '../Constants'

/**
 * Utils for security.
 */
class Security {

    /**
     * Apply hash to text.
     * @param text Source text.
     * @returns Promise with hash.
     */
    public static hash(text: string): Promise<string> {
        return Bcrypt.hash(text, Config.security.hash.rounds)
    }

    /**
     * Compare secret text with hashed secret.
     * @param secret Secret.
     * @param hashedSecret Hashed secret.
     * @returns Promise with secret is authenticated.
     */
    public static isAuthenticated(secret: string, hashedSecret: string): Promise<boolean> {
        return Bcrypt.compare(secret, hashedSecret)
    }

    /**
     * Sign any data and transform it to token.
     * @param payload Any data.
     * @returns Promise with token.
     */
    public static sign(payload: Universis.Map<any>): Promise<string> {
        return new Promise((resolve, reject) => (
            JWT.sign(payload, Config.security.token.secret, {
                expiresIn: Config.security.token.expiration
            }, (error, token) => error ? reject(error) : resolve(token))
        ))
    }

}

export default Security