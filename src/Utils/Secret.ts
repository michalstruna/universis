import * as Bcrypt from 'bcrypt'

/**
 * Utils for encryption and decryption.
 */
class Secret {

    private constructor() {

    }

    /**
     * Apply hash function to string.
     * @param text Source string.
     * @param saltOrRounds Salt or count of hash functions. (optional, default 10)
     * @returns Hash.
     */
    public static hash(text: string, saltOrRounds: string | number = 10): Promise<string> {
        return Bcrypt.hash(text, saltOrRounds)
    }

    /**
     * Check if hash of text is equal to hash.
     * @param text Source text.
     * @param hash Required hash.
     * @returns Promise with boolean.
     */
    public static compare(text: string, hash: string): Promise<boolean> {
        return Bcrypt.compare(text, hash)
    }

}

export default Secret