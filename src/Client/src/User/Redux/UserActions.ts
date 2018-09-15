import { Api, Redux, Request } from '../../Utils'
import ActionTypes from './ActionTypes'

/**
 * Actions for users.
 */
class UserActions {

    /**
     * Get unauth user.
     * @param email Email of user.
     */
    public static getUnauthUser = (email: string) => (
        Redux.asyncAction(
            Request.get<IBaseUser>('users', { email, limit: 1 }), // TODO: ISimpleUser[].
            ActionTypes.GET_UNAUTH_USER
        )
    )


    /**
     * Login user.
     * @param email Email of user.
     * @param password Password of user.
     */
    public static login = (email: string, password: string) => (
        Redux.asyncAction(
            Request.post<IUserIdentity>('login', { email, password }),
            ActionTypes.LOGIN
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

}

export default UserActions