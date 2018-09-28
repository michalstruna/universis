import Urls from '../Constants/Urls'
import Queries from '../Constants/Queries'
import { history } from '../../index'

/**
 * Utils for url.
 */
class Url {

    /**
     * @var URLS All local urls.
     */
    public static URLS = Urls
    public static QUERIES = Queries

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
    private static parse(url: string | Location): string[] {
        if (typeof url === 'string') {
            return Url.trim(url).split(Url.SEPARATOR)
        } else {
            return Url.trim(url.pathname).split(Url.SEPARATOR)
        }
    }

    /**
     * Returns first part of path of url.
     * @param url
     * @return Page url.
     */
    public static getPage(url: string | Location): string {
        return Url.parse(url)[0]
    }

    /**
     * Convert url to absolute form: /absolute/url.
     * @param url
     * @return Absolute url.
     */
    public static toAbsolute(url: string): string {
        return Url.SEPARATOR + Url.trim(url)
    }

    /**
     * Check if urls are same.
     * @param url1
     * @param url2
     * @return url1 and url2 are same url.
     */
    public static equals(url1: string, url2: string): boolean {
        return Url.trim(url1) === Url.trim(url2)
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
     * Check if url is url of main page.
     */
    public static isMainPage(url: string): boolean {
        return Url.equalsPage(Urls.HOME, url)
    }

    /**
     * Get query parameter from query string.
     * @param queryString Query string.
     * @param key Name of parameter.
     * @returns Value of parameter from query string.
     */
    public static getQuery(queryString: string, key: string): string {
        const utils = new URLSearchParams(queryString)
        return utils.get(key)
    }

    /**
     * Remove query parameter from query string.
     * @param queryString Query string.
     * @param  key Name of parameter to remove.
     * @returns New query string.
     */
    public static removeQuery(queryString: string, key: string): string {
        const utils = new URLSearchParams(queryString)
        utils.delete(key)
        return utils.toString()
    }

    /**
     * Add query parameter to query string.
     * @param queryString Current query string.
     * @param key Name of new parameter.
     * @param  value Value of new parameter.
     * @returns New query string.
     */
    public static setQuery(queryString: string, key: string, value: string): string {
        const utils = new URLSearchParams(queryString)

        if (value === null) {
            utils.delete(key)
        } else {
            utils.set(key, value)
        }

        return utils.toString()
    }

    /**
     * Check, if query parameter is in query string.
     * @param queryString Query string.
     * @param key Name of parameter.
     * @returns Parameter is in query string.
     */
    public static hasQuery(queryString: string, key: string): boolean {
        const utils = new URLSearchParams(queryString)
        return utils.has(key)
    }

    /**
     * Change current location.
     * @param location Current location.
     * @param target Object with optional pathname and query parameters.
     * @returns New location.
     */
    public static link(location: ILocation, target: ILocationTarget): string {
        const pathname = target.pathname || location.pathname
        let query = location.search || ''

        if (target.query) {
            for (const key in target.query) {
                query = Url.setQuery(query, key, target.query[key])
            }
        }

        return pathname + query
    }

    /**
     * Push new location to history.
     * @param target New location.
     */
    public static push(target: ILocationTarget): void {
        history.push(Url.link(history.location, target))
    }


    /**
     * Replace last location to new location in history.
     * @param target New location.
     */
    public static replace(target: ILocationTarget): void {
        history.replace(Url.link(history.location, target))
    }

}

export default Url