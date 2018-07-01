import { Api } from '../../Utils'
import ACTION_TYPES from './ActionTypes'
import { AxiosPromise as Promise } from 'axios'
import Axios from 'axios'

/**
 * Actions for users.
 */
class UserActions {

    /**
     * Get unauth user by email.
     * @param email Email of user.
     */
    public static getUnauthUserByEmail = (email: string) => (
        dispatch => {
            dispatch({ type: ACTION_TYPES.GET_UNAUTH_USER_SENT })

            return Api.getUnauthUser(email).then(user => {
                dispatch({ type: ACTION_TYPES.GET_UNAUTH_USER_SUCCESS, user })
            }).catch(error => {
                dispatch({ type: ACTION_TYPES.GET_UNAUTH_USER_FAIL, error })
            })
        }
    )

    /**
     * Register new user.
     * @param {string} email
     * @param {string} password
     * @returns {(dispatch) => Promise<void>}
     */
    public static signUp = (email: string, password: string) => (
        dispatch => {
            dispatch({ type: ACTION_TYPES.SIGN_UP_SENT })

            return Api.signUp(email, password).then(user => {
                dispatch({ type: ACTION_TYPES.SIGN_UP_SUCCESS, user })
            }).catch(error => {
                dispatch({ type: ACTION_TYPES.SIGN_UP_FAIL, error })
            })
        }
    )

    /**
     * Login user.
     * @param email
     * @param password
     */
    public static login = (email: string, password: string) => (
        dispatch => {
            // TODO: Login.
        }
    )

}

export default UserActions