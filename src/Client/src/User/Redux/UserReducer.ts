import { Cookies, Redux } from '../../Utils'

export default Redux.createReducer({
    unauthUser: {},
    identity: Cookies.getJson(Cookies.KEYS.IDENTITY) || null
})