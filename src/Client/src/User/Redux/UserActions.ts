import { Redux, Request, Url, Urls, Cookies } from '../../Utils'
import ActionTypes from './ActionTypes'

/**
 * Get unauth user.
 * @param email Email of user.
 */
export const getUnauthUser = (email: string) => (
    Redux.asyncAction(
        ActionTypes.GET_UNAUTH_USER,
        {
            unauthUser: (
                Request
                    .get<IBaseUser[]>('users', { email, limit: 1 })
                    .then(Request.unwind)
                    .then(Request.setDefault({ email }))
            )
        },
        userIdentity => Url.push({ pathname: '_id' in userIdentity ? Urls.LOGIN : Urls.SIGN_UP })
    )
)

/**
 * Login user.
 * @param email Email of user.
 * @param password Password of user.
 */
export const login = (email: string, password: string) => (
    Redux.asyncAction(
        ActionTypes.LOGIN,
        { identity: Request.post<IUserIdentity>('login', { email, password }) }, // TODO: Another data? First will be always async request.
        identity => {
            Cookies.set(Cookies.KEYS.IDENTITY, identity, Cookies.EXPIRATIONS.IDENTITY)
            Url.push({ pathname: Urls.HOME })
        }
    )
)

/**
 * Logout user.
 */
export const logout = () => {
    Cookies.remove(Cookies.KEYS.IDENTITY)

    return Redux.setAction(
        ActionTypes.LOGOUT,
        { identity: Redux.EMPTY_ASYNC_ENTITY },
        () => Url.push({ pathname: Urls.LOGIN })
    )
}

/**
 * Register new user.
 * @param {string} email
 * @param {string} password
 */
export const signUp = (email: string, password: string) => (
    Redux.asyncAction(
        ActionTypes.SIGN_UP,
        { signUp: Request.post('users', { email, password }) },
        () => Url.push({ pathname: Urls.LOGIN })
    )
)