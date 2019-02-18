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
     * Password must contains 6+ chars.
     */
    public static readonly PASSWORD_PATTERN = /^.{6,}$/

    /**
     * Check if string is email.
     * @param string Source.
     * @returns String is email.
     */
    public static isEmail = (string: string): boolean => {
        return Strings.EMAIL_PATTERN.test(string)
    }

    /**
     * Check if string is password.
     * @param string Source.
     * @returns String is password.
     */
    public static isPassword = (string: string): boolean => {
        return Strings.PASSWORD_PATTERN.test(string)
    }

    /**
     * Convert thisText
     * @param string TextInCamelCase.
     * @returns TEXT_IN_UPPER_CASE.
     */
    public static camelToUpper(string: string): string {
        return string.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '')
    }

    /**
     * Set first character of string upper case.
     * @param string Source string.
     * @returns Capitalized string.
     */
    public static capitalize(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    /**
     * Return part of string before first occurrence of char.
     * @param string Source string.
     * @param char Delimiter of prefix.
     * @returns String before delimiter.
     */
    public static getPrefix(string: string, char: string): string {
        return string.split(char)[0]
    }

}

export default Strings