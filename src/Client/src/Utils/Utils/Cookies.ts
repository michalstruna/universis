import * as Cookie from 'js-cookie'

import CookieKeys from '../Constants/Cookies'
import CookieExpirations from '../Constants/CookieExpirations'
import Dates from '../../../../Utils/Dates'

/**
 * Utils for cookies.
 */
class Cookies {

    /**
     * All cookie keys.
     */
    static KEYS = CookieKeys

    /**
     * All expirations.
     */
    static EXPIRATIONS = CookieExpirations

    /**
     * Set cookie.
     * @param key Name of cookie.
     * @param value Value of cookie.
     * @param expiration Expiration in minutes.
     */
    public static set(key: string, value: any, expiration: number): void {
        Cookie.set(key, value, {
            expires: Cookies.minutesExpiration(expiration)
        })
    }

    /**
     * Get cookie string.
     * @param key Name of cookie.
     * @returns String value of cookie.
     */
    public static get(key: string): string {
        return Cookie.get(key)
    }

    /**
     * Get cookie and parse number.
     * @param key Name of cookie.
     * @returns Number value of cookie.
     */
    public static getNumber(key: string): number {
        return parseFloat(Cookie.get(key))
    }

    /**
     * Get JSON cookie.
     * @param key Name of cookie.
     * @returns JSON value of cookie.
     */
    public static getJson<T>(key: string): T {
        return Cookie.getJSON(key) as T
    }

    /**
     * Remove cookie.
     * @param key Name of cookie.
     */
    public static remove(key: string): void {
        Cookie.remove(key)
    }

    /**
     * Get date of expiration.
     * @param count Count of minutes.
     * @returns Date of expiration.
     */
    private static minutesExpiration(count): Date {
        return new Date(Dates.add(count, Dates.MINUTE))
    }

}

export default Cookies