import { Api, Redux, Request } from '../../Utils'
import ActionTypes from './ActionTypes'

/**
 * Actions for users.
 */
class UserActions {

    public static getUnauthUser = (email: string) => (
        Redux.asyncAction(
            Request.get<any>('users', { email, limit: 1 }), // TODO: ISimpleUser[].
            ActionTypes.GET_UNAUTH_USER
        )
    )

    /**
     * Register new user.
     * @param {string} email
     * @param {string} password
     * @returns {(dispatch) => Promise<void>}
     */
    public static signUp = (email: string, password: string) => (
        dispatch => {
            dispatch({ type: ActionTypes.SIGN_UP_SENT })

            return Api.signUp(email, password).then(user => {
                dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, user })
            }).catch(error => {
                dispatch({ type: ActionTypes.SIGN_UP_FAIL, error })
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