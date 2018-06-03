import Urls from '../Constants/Urls'

/**
 * Utils for url.
 */
class Url {

    /**
     * @var URLS All local urls.
     */
    public static URLS = Urls

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
    private static getPage(url: string): string {
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

}

export default Url