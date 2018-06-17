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
    public static getUnauthUser(email: string): Promise<IUnauthUser> {
        return Axios.get(API_URL + 'user/unauth/' + email)
    }

}

export default Api