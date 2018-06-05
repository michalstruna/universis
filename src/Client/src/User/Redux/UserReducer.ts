import ACTION_TYPES from './ActionTypes'

const initialState = {

    getUnauthIdentitySent: false,
    getUnauthIdentityError: null,
    unauthIdentity: null

}

export default function (state = initialState, action: any) {
    switch (action.type) {

        case ACTION_TYPES.GET_UNAUTH_IDENTITY_SENT:
            return {
                ...state,
                getUnauthIdentitySent: true,
                getUnauthIdentityError: null,
                unauthIdentity: null,
            }

        case ACTION_TYPES.GET_UNAUTH_IDENTITY_SUCCESS:
            return {
                ...state,
                getUnauthIdentitySent: false,
                getUnauthIdentityError: null,
                unauthIdentity: action.user
            }

        case ACTION_TYPES.GET_UNAUTH_IDENTITY_FAIL:
            return {
                ...state,
                getUnauthIdentitySent: false,
                getUnauthIdentityError: action.error,
                unauthIdentity: null
            }

        default:
            return state

    }
}