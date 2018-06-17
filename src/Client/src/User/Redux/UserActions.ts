import { Api } from '../../Utils'
import ACTION_TYPES from './ActionTypes'

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