import ACTION_TYPES from './ActionTypes'

const initialState = {

    getUnauthUserSent: false,
    getUnauthUserError: null,
    unauthUser: null,

    signUpSent:false,
    signUpError: null

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

        case ACTION_TYPES.SIGN_UP_SENT: {
            return {
                ...state,
                signUpSent: true
            }
        }

        case ACTION_TYPES.SIGN_UP_SUCCESS: {
            return {
                ...state,
                signUpSent: false,
                signUpError: null
            }
        }

        case ACTION_TYPES.SIGN_UP_FAIL: {
            return {
                ...state,
                signUpSent: false,
                signUpError: action.error
            }
        }

        default:
            return state

    }
}