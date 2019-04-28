import { Redux, Request, Url, Urls, Cookies } from '../../Utils'
import ActionTypes from './ActionTypes'
import { Sockets } from '../../System'

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
                    .get<Universis.User.Simple[]>('users', { email, limit: 1 })
                    .then(Request.unwind)
                    .then(Request.setDefault({ email }))
            )
        },
        userIdentity => Url.push({ pathname: '_id' in userIdentity ? Urls.LOGIN : Urls.SIGN_UP })
    )
)

/**
 * Clear unauth user.
 */
export const clearUnauthUser = () => (
    Redux.setAction(
        ActionTypes.CLEAR_UNAUTH_USER,
        { unauthUser: { $set: Redux.EMPTY_ASYNC_ENTITY } }
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
        { identity: Request.post<Universis.User.Identity>('login', { email, password }) }, // TODO: Another data? First will be always async request.
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
    Sockets.logout()
    Cookies.remove(Cookies.KEYS.IDENTITY)

    return Redux.setAction(
        ActionTypes.LOGOUT,
        { identity: Redux.EMPTY_ASYNC_ENTITY },
        () => Url.replace({ pathname: Urls.HOME })
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

/**
 * Get list of messages.
 * @param limit Max. messages.
 */
export const getMessages = (limit: number) => (
    Redux.asyncAction(
        ActionTypes.GET_MESSAGES,
        { messages: Request.get(`notifications`, { limit, sort: 'date', reverse: true }) }
    )
)

/**
 * Add message.
 * @param message
 */
export const addMessage = (message: Universis.Message.New) => (
    Redux.asyncAction(
        ActionTypes.ADD_MESSAGE,
        { newMessage: Request.post(`messages`, message) }
    )
)

/**
 * Remove message.
 * @param messageId
 */
export const receiveRemoveMessage = (messageId: string) => (
    Redux.setAction(
        ActionTypes.RECEIVE_REMOVE_MESSAGE,
        { messages: { payload: { $remove: message => message._id === messageId } } }
    )
)

/**
 * Receive message.
 * @param message
 */
export const receiveMessage = (message: Universis.Notification) => (
    Redux.setAction(
        ActionTypes.RECEIVE_MESSAGE,
        { messages: { payload: { $add: message } }, unreadMessages: { $inc: 1 } }
    )
)

/**
 * Receive online users.
 * @param users
 */
export const receiveOnlineUsers = (users: Universis.User.Simple[]) => (
    Redux.setAction(
        ActionTypes.RECEIVE_ONLINE_USERS,
        { onlineUsers: { $set: users } }
    )
)

/**
 * Receive that new user connects.
 * @param user
 */
export const receiveConnection = (user: Universis.User.Simple) => (
    Redux.setAction(
        ActionTypes.RECEIVE_CONNECTION,
        { onlineUsers: { $add: user } }
    )
)

/**
 * Receive that new user disconnects.
 * @param user
 */
export const receiveDisconnection = (user: Universis.User.Simple) => (
    Redux.setAction(
        ActionTypes.RECEIVE_DISCONNECTION,
        { onlineUsers: { $remove: onlineUser => onlineUser ? onlineUser._id === user : !user } }
    )
)

/**
 * Toggle sticky chat. If chat is sticky, on new message scroll bottom.
 * @param isChatSticky
 */
export const toggleStickyChat = (isChatSticky: boolean) => (
    Redux.toggleAction(
        ActionTypes.TOGGLE_STICKY_CHAT,
        { isChatSticky, unreadMessages: 0 }
    )
)

/**
 * Send reset password email by userId.
 * @param userId
 */
export const sendResetPasswordEmail = (userId: string) => (
    Redux.asyncAction(
        ActionTypes.SEND_RESET_PASSWORD_EMAIL,
        { resetEmail: Request.post(`users/${userId}/reset-password`) }
    )
)

/**
 * Get user by token.
 * @param token Token.
 */
export const getUserByToken = (token: string) => (
    Redux.asyncAction(
        ActionTypes.GET_USER_BY_TOKEN,
        { userByToken: Request.get(`users/tokens/${token}`) }
    )
)

/**
 * Edit user by token.
 * @param token
 * @param data
 */
export const editUserByToken = (token: string, data: Universis.Map<any>) => (
    Redux.asyncAction(
        ActionTypes.EDIT_USER_BY_TOKEN,
        { editUser: Request.put(`users/tokens/${token}`, data) }
    )
)

/**
 * Receive user login.
 * @param user
 */
export const receiveLogin = (user: Universis.User) => (
    Redux.setAction(
        ActionTypes.RECEIVED_LOGIN,
        { onlineUsers: { $remove: onlineUser => !onlineUser, $add: user } }
    )
)

/**
 * Receive user logout.
 * @param user
 */
export const receiveLogout = (user: Universis.User) => (
    Redux.setAction(
        ActionTypes.RECEIVED_LOGOUT,
        { onlineUsers: { $remove: onlineUser => onlineUser && onlineUser._id === user._id, $add: null } }
    )
)