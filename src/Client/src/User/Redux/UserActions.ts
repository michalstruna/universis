import { Redux, Request, Url, Cookies } from '../../Utils'
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
            ActionTypes.GET_UNAUTH_USER,
            { unauthUser: Request.get<IBaseUser[]>('users', { email, limit: 1 }).then(Request.unwind) },
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
            ActionTypes.LOGIN,
            { identity: Request.post<IUserIdentity>('login', { email, password }) }, // TODO: Another data? First will be always async request.
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

        return Redux.setAction(
            ActionTypes.LOGOUT,
            { identity: Redux.EMPTY_ASYNC_ENTITY },
            () => Url.push({ pathname: Url.URLS.LOGIN })
        )
    }

    /**
     * Register new user.
     * @param {string} email
     * @param {string} password
     * @returns {(dispatch) => Promise<void>}
     */
    public static signUp = (email: string, password: string) => (
        Redux.asyncAction(
            ActionTypes.SIGN_UP,
            { signUp: Request.post('users', { email, password }) }
        )
    )

}

export default UserActions