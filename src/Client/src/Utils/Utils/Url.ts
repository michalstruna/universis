import { history } from '../../index'

/**
 * Utils for url.
 */
class Url {

    /**
     * Separator of url parts.
     */
    private static SEPARATOR: string = '/'

    private constructor() {

    }

    /**
     * Remove slashes from begin and end of url.
     * @param url
     * @return Url without slashes.
     */
    private static trim(url: string): string {
        return url.replace(/^\//, '').replace(/\/$/, '')
    }

    /**
     * Parse URL and split it to paths. '/some/path/' returns ['some', 'path'].
     * @param url
     * @return List of parts of path.
     */
    private static parse(url: string): string[] {
        return Url.trim(url).split(Url.SEPARATOR)
    }

    /**
     * Returns first part of path of url.
     * @param url
     * @return Page url.
     */
    public static getPage(url: string): string {
        return Url.parse(url)[0]
    }

    /**
     * Check if urls are in same page.
     * @param url1
     * @param url2
     * @return url1 and url2 are urls of same page.
     */
    public static equalsPage(url1: string, url2: string): boolean {
        return Url.getPage(url1) === Url.getPage(url2)
    }

    /**
     * Change current location.
     * @param location Current location.
     * @param target Object with optional pathname and query parameters.
     * @returns New location.
     */
    public static link(location: Universis.Redux.Location, target: Universis.Redux.LocationTarget): string {
        const pathname = target.pathname || location.pathname
        let query = location.search || ''

        if (target.query) {
            for (const key in target.query) {
                query = Url.setQuery(key, target.query[key], query)
            }
        }

        return pathname.replace(/\?/, '') + '?' + query.replace(/^\?/, '')
    }

    /**
     * Push new location to history.
     * @param target New location.
     */
    public static push(target: Universis.Redux.LocationTarget): void {
        history.push(Url.link(history.location, target))
    }


    /**
     * Replace last location to new location in history.
     * @param target New location.
     */
    public static replace(target: Universis.Redux.LocationTarget): void {
        history.replace(Url.link(history.location, target))
    }


    /**
     * Get value of query parameter.
     * @param key Name of query parameter.
     * @param source Source query string. (optional, default current browser location)
     * @returns Value of query parameter.
     */
    public static getQuery(key: string, source: string = history.location.search): string {
        const utils = new URLSearchParams(source)
        return utils.get(key)
    }

    /**
     * Get parsed value of query parameter.
     * @param key Name of query parameter.
     * @param source Source query string. (optional, default current browser location)
     * @returns JSON value of query parameter.
     */
    public static getJsonQuery(key: string, source: string = history.location.search): any {
        const query = Url.getQuery(key, source)

        try {
            return JSON.parse(query)
        } catch (error) {
            return null
        }
    }

    /**
     * Check, if query parameter is in query string.
     * @param key Name of query parameter.
     * @param source Source query string. (optional, default current browser location)
     * @returns Parameter is in query string.
     */
    public static hasQuery(key: string, source: string = history.location.search): boolean {
        const utils = new URLSearchParams(source)
        return utils.has(key)
    }

    /**
     * Add query parameter to query string.
     * @param key Name of query parameter.
     * @param source Source query string. (optional, default current browser location)
     * @param  value Value of new parameter.
     * @returns New query string.
     */
    public static setQuery(key: string, value: string, source: string = history.location.search): string {
        const utils = new URLSearchParams(source)

        if (value === null) {
            utils.delete(key)
        } else {
            utils.set(key, value)
        }

        return utils.toString()
    }

    /**
     * Remove query parameter from query string.
     * @param key Name of query parameter.
     * @param source Source query string. (optional, default current browser location)
     * @returns New query string.
     */
    public static removeQuery(key: string, source: string = history.location.search): string {
        const utils = new URLSearchParams(source)
        utils.delete(key)
        return utils.toString()
    }

}

export default Url

export { default as Urls } from '../Constants/Urls'
export { default as Queries } from '../Constants/Queries'