import Axios, { AxiosPromise as Promise } from 'axios'

import Config from '../Constants/Config'

const API_URL = Config.API_URL

/**
 * Class for communication with server.
 */
class Api {

    private constructor() {

    }

    /**
     * Get unauth user by email.
     * @param email Email of user.
     */
    public static getUnauthUser(email: string): Promise<IBaseUser> {
        return new Promise((resolve, reject) => {
            Axios.get(API_URL + 'users/unauth/' + email).then(response => {
                resolve(response.data.user)
            })
        })
    }

    /**
     * Register new user.
     * @param email Email of user.
     * @param password Password of user.
     */
    public static signUp(email: string, password: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            Axios.post(API_URL + 'users/add', { email, password }).then(response => {
                resolve(response.data.user)
            })
        })
    }

}

export default Api