import ActionTypes from './ActionTypes'
import { Cookies, Redux } from '../../Utils'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        unauthUser: {},
        identity: Cookies.getJson(Cookies.KEYS.IDENTITY) || null
    }
)