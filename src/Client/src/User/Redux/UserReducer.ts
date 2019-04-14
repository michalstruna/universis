import ActionTypes from './ActionTypes'
import { Cookies, Redux } from '../../Utils'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        unauthUser: {},
        identity: { payload: Cookies.getJson(Cookies.KEYS.IDENTITY) } || {},
        messages: Redux.EMPTY_ASYNC_ENTITY,
        newMessage: Redux.EMPTY_ASYNC_ENTITY,
        deletedMessage: Redux.EMPTY_ASYNC_ENTITY,
        onlineUsers: [],
        isChatSticky: true
    }
)