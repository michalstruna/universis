import Axios, { AxiosPromise } from 'axios'

import Config from '../Constants/Config'
import { Store } from '../../System'

const API_URL = Config.API_URL

interface IRequestBody {
    [name: string]: any
}

interface IRequestQuery {
    [name: string]: string | number
}

interface IRequestHeader {
    headers: {
        [name: string]: string
    }
}

/**
 * Class for create requests to server.
 * Access-Token will be added to each request automatically.
 * API url will be added to each URI automatically.
 */
class Request {

    /**
     * Send GEt request to server.
     * @param path URL.
     * @param query Query parameters. (optional)
     * @returns Promise with response body.
     */
    public static get<T>(path: string, query: IRequestQuery = {}): Promise<T> {
        return Request.process<T>(
            Axios.get(
                API_URL + path,
                { params: query, ...Request.getHeader() }
            )
        )
    }

    /**
     * Send GEt request to server.
     * @param path URL.
     * @param body Request body. (optional)
     * @param query Query parameters. (optional)
     * @returns Promise with response body.
     */
    public static post<T>(path: string, body: IRequestBody = {}, query: IRequestQuery = {}): Promise<T> {
        return Request.process<T>(
            Axios.post(
                API_URL + path,
                body,
                { params: query, ...Request.getHeader() }
            )
        )
    }

    /**
     * Send GEt request to server.
     * @param path URL.
     * @param body Request body. (optional)
     * @param query Query parameters. (optional)
     * @returns Promise with response body.
     */
    public static put<T>(path: string, body: IRequestBody = {}, query: IRequestQuery = {}): Promise<T> {
        return Request.process<T>(
            Axios.put(
                API_URL + path,
                body,
                { params: query, ...Request.getHeader() }
            )
        )
    }

    /**
     * Send DELETE request to server.
     * @param path URL.
     * @param query Query parameters. (optional)
     * @returns Promise with response body.
     */
    public static delete<T>(path: string, query: IRequestQuery = {}): Promise<T> {
        return Request.process<T>(
            Axios.delete(
                API_URL + path,
                { params: query, ...Request.getHeader() }
            )
        )
    }

    /**
     * Process Axios promise and convert it to promise.
     * @param request Request Axios promise.
     * @returns Promise.
     */
    private static process<T>(request: AxiosPromise<T>): Promise<T> {
        return new Promise((resolve, reject) => (
            request
                .then(response => resolve(response.data as T))
                .catch(error => reject(error))
        ))
    }

    /**
     * Get header with token of currently logged user.
     * @returns Header object.
     */
    private static getHeader(): IRequestHeader {
        const identity = Store.getState().user.identity
        return { headers: { 'Access-Token': identity ? identity.token : null } }
    }

}

export default Request