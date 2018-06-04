/**
 * Utils for strings.
 */
class Strings {

    private constructor() {

    }

    /**
     * RFC 5322 Official Standard for email.
     */
    public static readonly EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    /**
     * Check if string is email.
     * @param string Source.
     * @returns String is email.
     */
    public static isEmail(string: string): boolean {
        return Strings.EMAIL_PATTERN.test(string)
    }

}

export default Strings