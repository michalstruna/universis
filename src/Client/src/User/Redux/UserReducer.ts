import ActionTypes from './ActionTypes'
import { Cookies, Redux } from '../../Utils'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        unauthUser: Redux.EMPTY_ASYNC_ENTITY,
        identity: { payload: Cookies.getJson(Cookies.KEYS.IDENTITY) } || {},
        messages: Redux.EMPTY_ASYNC_ENTITY,
        newMessage: Redux.EMPTY_ASYNC_ENTITY,
        deletedMessage: Redux.EMPTY_ASYNC_ENTITY,
        onlineUsers: [],
        isChatSticky: true,
        unreadMessages: 0,
        userByToken: Redux.EMPTY_ASYNC_ENTITY,
        resetEmail: Redux.EMPTY_ASYNC_ENTITY
    }
)