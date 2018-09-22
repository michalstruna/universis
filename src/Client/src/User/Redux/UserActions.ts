import { Api, Redux, Request, Url, Cookies } from '../../Utils'
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
            Request.get<IBaseUser[]>('users', { email, limit: 1 }).then(Request.unwind),
            ActionTypes.GET_UNAUTH_USER,
            userIdentity => Url.push({ pathname: userIdentity ? Url.URLS.LOGIN : Url.URLS.SIGN_UP })
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
            ActionTypes.LOGIN,
            identity => {
                Cookies.set(Cookies.KEYS.IDENTITY, identity, Cookies.EXPIRATIONS.IDENTITY)
                Url.push({ pathname: Url.URLS.HOME })
            }
        )
    )

    /**
     * Logout user.
     */
    public static logout = () => {
        Cookies.remove(Cookies.KEYS.IDENTITY)
        Url.push({ pathname: Url.URLS.LOGIN })

        return { type: ActionTypes.LOGOUT, _set: { identity: null } }
    }

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