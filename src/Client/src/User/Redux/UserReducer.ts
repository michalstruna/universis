import ACTION_TYPES from './ActionTypes'

const initialState = {

    getUnauthUserSent: false,
    getUnauthUserError: null,
    unauthUser: null

}

export default function (state = initialState, action: any) {
    switch (action.type) {

        case ACTION_TYPES.GET_UNAUTH_USER_SENT:
            return {
                ...state,
                getUnauthUserSent: true,
                getUnauthUserError: null,
                unauthUser: null,
            }

        case ACTION_TYPES.GET_UNAUTH_USER_SUCCESS:
            return {
                ...state,
                getUnauthUserSent: false,
                getUnauthUserError: null,
                unauthUser: action.user
            }

        case ACTION_TYPES.GET_UNAUTH_USER_FAIL:
            return {
                ...state,
                getUnauthUserSent: false,
                getUnauthUserError: action.error,
                unauthUser: null
            }

        default:
            return state

    }
}